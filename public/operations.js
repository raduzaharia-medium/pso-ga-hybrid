import { pickRandomNumber, createRandomArray } from "./random.js";
import { memoize, same } from "./tools.js";

export const crossover = (parent1, parent2, crossPoint) => [
  ...parent1.slice(0, crossPoint),
  ...parent2.slice(crossPoint, parent2.length),
];

export const mutate = (individual, rate) =>
  individual.map((e) =>
    Math.random() < rate ? e * Math.random() + Math.random() : e
  );

export const fitness = memoize((individual) => {
  const sum = individual.reduceRight((result, e) => result + e, 0);
  return Math.abs(sum - 50);
});

export const pickBest = (...args) =>
  args.reduceRight(
    (result, e) => (fitness(result) < fitness(e) ? result : e),
    args[0]
  );

export const createChild = (parent1, parent2, mutationRate) => {
  if (same(parent1, parent2)) return createRandomArray(parent1.length);

  const crossPoint = pickRandomNumber(parent1.length);
  const child = crossover(parent1, parent2, crossPoint);
  const mutant = mutate(child, mutationRate);

  return pickBest(parent1, parent2, child, mutant);
};

export const pickRandom = (population) =>
  population[pickRandomNumber(population.length - 1)];

export const approach = (parent1, parent2, best) =>
  parent1.map((e, index) =>
    Math.abs(
      e +
        2 * Math.random() * (best[index] - e) +
        2 * Math.random() * (parent2[index] - e)
    )
  );

export const nextGeneration = (population, best, globalBest, mutationRate) =>
  population.map((element) =>
    Math.random() < 0.5
      ? createChild(element, pickRandom(population), mutationRate)
      : approach(element, pickRandom(best), globalBest)
  );

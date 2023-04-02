import { createRandomArray, createRandomMatrix } from "./random.js";
import { pickBest, nextGeneration, fitness } from "./operations.js";
import { createStatusRow } from "./tools.js";

let population = createRandomMatrix(500, 20);
let best = createRandomMatrix(500, 20);
let globalBest = createRandomArray(20);

for (let i = 0; i < 50; i++) {
  population = nextGeneration(population, best, globalBest, 0.4);

  for (let j = 0; j < population.length; j++) {
    if (fitness(population[j]) < fitness(best[j])) best[j] = population[j];
    if (fitness(best[j]) < fitness(globalBest)) globalBest = best[j];
  }

  const row = createStatusRow(globalBest);
  document.querySelector("main").appendChild(row);
}

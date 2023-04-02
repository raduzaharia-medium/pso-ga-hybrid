import { createRandomMatrix } from "./random.js";
import { pickBest, nextGeneration } from "./operations.js";
import { createStatusRow } from "./tools.js";

let population = createRandomMatrix(500, 20);

for (let i = 0; i < 50; i++) {
  population = nextGeneration(population, 0.4);

  const best = pickBest(...population);
  const row = createStatusRow(best);

  document.querySelector("main").appendChild(row);
}

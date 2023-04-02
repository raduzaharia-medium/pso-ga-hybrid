import { fitness } from "./operations.js";

export const memoize = (func) => {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (!cache[key]) cache[key] = func(...args);
    return cache[key];
  };
};

export const same = (a, b) => a.every((v, i) => v === b[i]);
export const roundAll = (array) => array.map((e) => e.toFixed(2));

export const createStatusRow = (element) => {
  const rounded = roundAll(element);
  const result = document.createElement("p");
  const values = document.createElement("span");
  const meter = document.createElement("meter");

  meter.min = 0;
  meter.max = 50;
  meter.value = (50 - fitness(element)).toFixed(2);
  meter.style.width = "100%";
  meter.style.height = "100%";
  values.innerText = `${rounded.join(" ")}: ${(50 - fitness(element)).toFixed(
    2
  )}`;

  result.style.display = "grid";
  result.style.gridTemplateColumns = "5em 1fr";
  result.style.columnGap = "1em";

  result.appendChild(meter);
  result.appendChild(values);

  return result;
};

import Benchmark from "benchmark";

import { format as dateFnsFpFormat } from "date-fns/fp/index.js";
import speedDate from "speed-date";

const speedDateFormatter = speedDate("Q_YYYY");
const benchmarks = {
  "speed-date": (date) => speedDateFormatter(date),
  "date-fns/fp": (date) => dateFnsFpFormat("Q_yyyy", date),
  custom: (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const quarter = Math.floor(month / 3) + 1;
    return `${quarter}_${year}`;
  },
};

const now = new Date();

console.table(
  Object.fromEntries(
    Object.entries(benchmarks).map(([name, fn]) => [name, fn(now)])
  )
);

Object.entries(benchmarks)
  .reduce(
    (suite, [name, fn]) =>
      suite.add(name, () => {
        fn(new Date());
      }),
    new Benchmark.Suite("Date Format", {})
  )
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("");
    console.log(
      `🏁 🏁 🏁 '${this.filter("fastest").map(
        "name"
      )}' is the fastest. 🏁 🏁 🏁`
    );
  })
  .run({ async: true });

import Benchmark from "benchmark";

import { format as dateFnsFpFormat } from "date-fns/fp/index.js";
import DateFormatter from "fast-date-format";
import speedDate from "speed-date";

const dateFormatter = new DateFormatter("MMM_YYYY");
const speedDateFormatter = speedDate("MMM_YYYY");

const d = new Date();

const monthLookup = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const benchmarks = {
  "fast-date-format": (date) => dateFormatter.format(date),
  "speed-date": (date) => speedDateFormatter(date),
  "date-fns/fp": (date) => dateFnsFpFormat("MMM_yyyy", date),
  custom: (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${monthLookup[month]}_${year}`;
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

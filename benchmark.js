import dateFormat from "dateformat";

import Benchmark from "benchmark";
import moment from "moment";

import format from "date-format";
import fecha from "fecha";
import speedDate from "speed-date";
import { format as dateFnsTzFormat } from "date-fns-tz";
import { format as dateFnsFormat } from "date-fns";
import {
  format as dateFnsFpFormat,
  lightFormat as dateFnsLightFormat,
} from "date-fns/fp/index.js";
import DateFormatter from "fast-date-format";

const DATE_FORMAT = "YYYY.MM.DDTHH:mm:ss,SSS ZZ";
const DATE_FNS_FORMAT = "yyyy.MM.dd'T'HH:mm:ss,SSS XXX";
const dateFormatter = new DateFormatter(DATE_FORMAT);
const speedDateFormatter = speedDate(DATE_FORMAT);
const dateFnsFPFormatter = dateFnsFpFormat(DATE_FNS_FORMAT);
const dateFnsFPLightFormatter = dateFnsLightFormat("yyyy.MM.dd'T'HH:mm:ss,SSS");

const benchmarks = {
  moment: (date) => moment(date).format(DATE_FORMAT),
  "date-format": (date) => format("yyyy.MM.ddThh:mm:ss,SSS O", date),
  dateFormat: (date) => dateFormat(date, "yyyy.mm.dd'T'HH:MM:ss,l o"),
  "fast-date-format": (date) => dateFormatter.format(date),
  fecha: (date) => fecha.format(date, DATE_FORMAT),
  "speed-date": (date) => speedDateFormatter(date),
  "date-fns-tz": (date) => dateFnsTzFormat(date, DATE_FNS_FORMAT),
  "date-fns": (date) => dateFnsFormat(date, DATE_FNS_FORMAT),
  "date-fns/fp": (date) => dateFnsFpFormat(DATE_FNS_FORMAT, date),
  "date-fns/fp (precompiled)": (date) => dateFnsFPFormatter(date),
  "date-fns/fp/lightFormat": (date) =>
    dateFnsLightFormat("yyyy.MM.dd'T'HH:mm:ss,SSS", date),
  "date-fns/fp/lightFormat (precompiled)": (date) =>
    dateFnsFPLightFormatter(date),
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

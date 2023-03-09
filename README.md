# benchmark-date-formatting

## Setup & Run

```sh
npm install

node .
```

## Results

```
┌───────────────────────────────────────┬──────────────────────────────────┐
│                (index)                │              Values              │
├───────────────────────────────────────┼──────────────────────────────────┤
│                moment                 │ '2023.03.09T10:18:18,873 -0600'  │
│              date-format              │ '2023.03.09T10:18:18,873 -06:00' │
│              dateFormat               │ '2023.03.09T10:18:18,873 -0600'  │
│           fast-date-format            │ '2023.03.09T10:18:18,873 -06:00' │
│                 fecha                 │ '2023.03.09T10:18:18,873 -0600'  │
│              speed-date               │ '2023.03.09T10:18:18,873 -0600'  │
│              date-fns-tz              │ '2023.03.09T10:18:18,873 -06:00' │
│               date-fns                │ '2023.03.09T10:18:18,873 -06:00' │
│              date-fns/fp              │ '2023.03.09T10:18:18,873 -06:00' │
│       date-fns/fp (precompiled)       │ '2023.03.09T10:18:18,873 -06:00' │
│        date-fns/fp/lightFormat        │    '2023.03.09T10:18:18,873'     │
│ date-fns/fp/lightFormat (precompiled) │    '2023.03.09T10:18:18,873'     │
└───────────────────────────────────────┴──────────────────────────────────┘
moment x 343,344 ops/sec ±0.42% (94 runs sampled)
date-format x 425,305 ops/sec ±0.26% (90 runs sampled)
dateFormat x 190,080 ops/sec ±0.72% (96 runs sampled)
fast-date-format x 1,350,805 ops/sec ±0.38% (96 runs sampled)
fecha x 274,423 ops/sec ±0.50% (94 runs sampled)
speed-date x 1,495,064 ops/sec ±0.28% (95 runs sampled)
date-fns-tz x 123,388 ops/sec ±0.29% (96 runs sampled)
date-fns x 153,037 ops/sec ±0.28% (96 runs sampled)
date-fns/fp x 143,342 ops/sec ±0.44% (92 runs sampled)
date-fns/fp (precompiled) x 140,116 ops/sec ±0.44% (94 runs sampled)
date-fns/fp/lightFormat x 276,697 ops/sec ±0.93% (86 runs sampled)
date-fns/fp/lightFormat (precompiled) x 263,688 ops/sec ±0.83% (91 runs sampled)

🏁 🏁 🏁 'speed-date' is the fastest. 🏁 🏁 🏁
```

### Summary Analysis

- date-fns has a "light" formatter, which is almost 2x faster: https://date-fns.org/v2.29.3/docs/lightFormat
- There's a "precompile" strategy mentioned here: https://github.com/date-fns/date-fns/issues/423
  - This was never implemented has no effect on anything
- https://github.com/gosquared/speed-date is the fastest, every time

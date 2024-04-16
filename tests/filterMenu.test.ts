import { applyMenuFilter } from "../src/components/Filter/components/FilterMenu/filterMenu";

const values = [
  {
    count: 312,
    key: "normal",
    label: "Normal",
    selected: false,
  },
  {
    count: 0,
    key: "abscess",
    label: "abscess",
    selected: false,
  },
  {
    count: 3,
    key: "acoustic neuroma",
    label: "acoustic neuroma",
    selected: true,
  },
  {
    count: 3,
    key: "acute kidney failure",
    label: "acute kidney failure",
    selected: true,
  },
  {
    count: 3,
    key: "acute kidney tubular necrosis",
    label: "acute kidney tubular necrosis",
    selected: true,
  },
  {
    count: 3,
    key: "alcohol abuse",
    label: "alcohol abuse",
    selected: true,
  },
  {
    count: 3,
    key: "Alzheimer disease",
    label: "Alzheimer disease",
    selected: true,
  },
  {
    count: 3,
    key: "amyotrophic lateral sclerosis",
    label: "amyotrophic lateral sclerosis",
    selected: true,
  },
  {
    count: 1,
    key: "anxiety disorder",
    label: "anxiety disorder",
    selected: true,
  },
  {
    count: 3,
    key: "aplastic anemia",
    label: "aplastic anemia",
    selected: true,
  },
  {
    count: 3,
    key: "arthritis",
    label: "arthritis",
    selected: true,
  },
  {
    count: 3,
    key: "asthma",
    label: "asthma",
    selected: true,
  },
  {
    count: 222,
    key: "atherosclerosis",
    label: "atherosclerosis",
    selected: false,
  },
  {
    count: 222,
    key: "atrial fibrillation",
    label: "atrial fibrillation",
    selected: true,
  },
  {
    count: 222,
    key: "benign prostatic hyperplasia",
    label: "benign prostatic hyperplasia",
    selected: true,
  },
];

test("applyMenuFilter", () => {
  expect(applyMenuFilter(values, "ro").map(({ value }) => value)).toStrictEqual(
    [values[2], values[4], values[7], values[12], values[14]]
  );
});

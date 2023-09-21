import { CatImages } from "../apis/types";

export function formatApiData(data: CatImages[]) {
  let count = 1;
  const gridOne: CatImages[] = [];
  const gridTwo: CatImages[] = [];
  const gridThree: CatImages[] = [];

  data.forEach((d, i) => {
    if (count === 1) {
      gridOne.push(d);
      count += 1;
    } else if (count === 2) {
      gridTwo.push(d);
      count += 1;
    } else if (count === 3) {
      gridThree.push(d);
      count = 1;
    }
  });

  return [{ 0: gridOne }, { 1: gridTwo }, { 2: gridThree }];
}

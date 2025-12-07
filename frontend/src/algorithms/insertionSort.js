export function insertionNextStep(arr, i, j) {
  let a = [...arr];

  if (j > 0 && a[j] < a[j - 1]) {
    [a[j], a[j - 1]] =
      [a[j - 1], a[j]];
    return { updatedArray: a, nextI: i, nextJ: j - 1 };
  }
  return { updatedArray: a, nextI: i+1, nextJ: i+1 };
}

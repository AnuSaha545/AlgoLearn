export function selectionNextStep(arr, i, j, minIndex) {
  let a = [...arr];
  if (j < a.length) {
    if (a[j] < a[minIndex])
      minIndex = j;
    return {
      updatedArray: a,
      nextI: i,
      nextJ: j + 1,
      minIndex
    };
  }

  [a[i], a[minIndex]] = [a[minIndex], a[i]];
  return {
    updatedArray: a,
    nextI: i + 1,
    nextJ: i + 2,
    minIndex: i + 1
  };
}

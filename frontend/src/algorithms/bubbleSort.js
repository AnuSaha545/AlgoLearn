export function bubbleNextStep(arr, i, j) {
  let a = [...arr];
  if (a[j] > a[j + 1])
    [a[j], a[j + 1]] = [a[j + 1], a[j]];
  return { updatedArray: a };
}

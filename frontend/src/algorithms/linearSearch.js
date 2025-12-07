export function linearNextStep(arr, index, target) {

  if (index >= arr.length)
    return { done:true, found:false };
  if (arr[index] === target)
    return { done:true, found:true };
  return {
    done:false,
    found:false,
    nextIndex:index+1
  };
}

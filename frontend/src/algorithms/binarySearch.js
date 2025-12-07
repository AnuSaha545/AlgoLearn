export function binaryNextStep(arr, low, high, target) {
  if (low > high)
    return { done:true, found:false };
  let mid = Math.floor((low+high)/2);
  if (arr[mid] === target)
    return { done:true, found:true, mid };
  if (arr[mid] < target)
    return {
      done:false,
      found:false,
      mid,
      nextLow: mid+1,
      nextHigh: high
    };

  return {
    done:false,
    found:false,
    mid,
    nextLow: low,
    nextHigh: mid-1
  };
}

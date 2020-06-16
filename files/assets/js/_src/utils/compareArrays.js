// compare two (object-) arrays
export function compareArrays(arr1 = [], arr2 = [], props = []) {
  return arr1.length === arr2.length && arr1.every((item, i) => {
    let same = true;

    if (props && Array.isArray(props) && props.length) {
      for (const prop of props) {
        if (arr1[i][prop] !== arr2[i][prop]) {
          same = false;
          break;
        }
      }
    }
    else {
      same = arr1[i] === arr2[i];
    }
    return same;
  });
}

export default compareArrays;

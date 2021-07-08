let longestPalindrome = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  
  let arr = str.split(" ").sort(function(a, b){
    if (a.length > b.length) {
      return -1
    } else {
      return 1
    }
  });

  if (arr.length === 1) {
    return str.length
  }

  let isvalid = true;
  let longest = 0;
  let idx;

  for(let i = 0; i < arr.length; i++) {
    let length = arr[i].length
    for(let j = 0; j <= Math.floor(length/2); j++){
      if(arr[i][j] !== arr[i][length-1-j]) {
        isvalid = false;
        break;
      }
    }
    if (isvalid) {
      longest = length
      idx = i
      break;
    }
    isvalid = true
  }
  console.log(arr[idx])
  let firstidx = str.indexOf(arr[idx])
  let lastidx = firstidx + longest-1

  const additionalCheck = (fidx, lidx, str, result) => {
    if (str[fidx] !== str[lidx] || lidx >= str.length) {
      return result;
    }
    
    result = str[fidx] + result + str[lidx]

    return additionalCheck(fidx-1, lidx+1, str, result)
  }

  return additionalCheck(firstidx-1, lastidx+1, str, arr[idx]).length;
};

console.log(longestPalindrome('My dad is a racecar athlete'))
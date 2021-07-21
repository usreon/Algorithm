// 좌표평면 위의 두 점 사이의 거리를 계산하는 함수입니다.
function calculateDistance(p1, p2) {
  const yDiff = p2[0] - p1[0];
  const xDiff = p2[1] - p1[1];
  return Math.round(Math.sqrt(Math.pow(yDiff, 2) + Math.pow(xDiff, 2))*100);
}

const TSP = function (places) {
  // TODO: 여기에 코드를 작성합니다.
  let queue = [...places];

  let result = Number.MAX_SAFE_INTEGER

  const dfs = (distance, pvs, arr, times) => {
    let queue = [...arr];
    let tillDis = distance
    if (times === places.length) {
      return distance;
    }

    for (let i = 0; i < queue.length; i++) {
      let cur = queue.splice(i, 1)[0]

      if (pvs.length === 0) {
        dfs(distance, cur, queue, times)
      } else {
        distance += calculateDistance(pvs, cur)
        let dis = dfs(distance, cur, queue, times+1)
        if (dis && result > dis) {
          result = dis
        
        }
      }
      queue = [...arr]
      distance = tillDis
    }

    return null;

  }

  while (queue.length > 0) {
    queue.shift()
    dfs(0, [], places, 1);
    
  }

  return result;
};
placesToVisit = [
  [0, 100],
  [3, 4],
  [58, 34],
  [22, 35],
  [-151, -132],
  [130, -33],
];

console.log(TSP(placesToVisit))
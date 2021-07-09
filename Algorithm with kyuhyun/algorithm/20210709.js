const countIslands = function (grid) {
  // TODO: 여기에 코드를 작성합니다.

  //반복문 -> 1이 나올때 네 방향을 체크 
  //-> 큐에 해당방향으로 진행했을 떄 1인 지점을 저장(최대 4방향이 저장됨)
  //-> 연결된 1을 모두 탐색할 때 결과값+1 
  //-> 수색했전 지점들은 따로 관리해 다음 반복을 진행 할 때 해당지점을 방문했다면 탐색하지 않음

  let visited = new Array(grid.length).fill(false)
  .map((_) => new Array(grid[0].length).fill(false));
  let result = 0;


  const check = (y, x) => {
    
    if (y >= 0 && y < visited.length && x >= 0 && x < visited[0].length) {
  
      if (grid[y][x] === '1' && visited[y][x] === false) {

        visited[y][x] = true;
        let right = check(y, x+1)
        let down = check(y+1, x)
        let left = check(y, x-1)
        let up = check(y-1, x)

        if (right || down || left || up) {
          return true;
        } else if (!right && !down && !left && !up){
          return 1;
        } 
      } else if (grid[y][x] === '0' && visited[y][x] === false){
        visited[y][x] = '0'
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
    
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (visited[i][j] === false) {
        result += check(i, j)
        
      }
    }
  }
  console.log(result)
  console.log(visited)
  return result
  
};
grid = [
  ['0','1','0','1','0','1'],
  ['1','0','1','0','1','0'],
  ['0','1','0','1','0','1'],
  ['1','0','1','0','1','0'],
  ['0','1','0','1','0','1']
];

countIslands(grid)
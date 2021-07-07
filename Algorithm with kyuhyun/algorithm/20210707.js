const jobAllocation = function (jobs, wokersNum) {
  // TODO: 여기에 코드를 작성합니다.

  //  자연수 배열을 n개의 연속 구간으로 나눌 때, 합이 가장 큰 구간의 합을 sum이라고 합시다. 
  //  sum이 가장 작아지는 분배에서의 sum을 구해야 합니다.
  let maxcount = jobs.length - wokersNum + 1;
  // (jobs, workersNum)으로 표기하면, (jobs는 작업량이 아닌 작업의 인덱스만 표기한다고 한다)
  // 처음은 ([0, 1, 2, 3, 4], 3)인 상태이다.
  //  1) 첫번째 작업자가 1개의 작업을 하고 나머지 작업을 2명이 작업
  //    => ([1, 2, 3, 4], 2)
  //  2) 첫번째 작업자가 2개의 작업을 하고 나머지 작업을 2명이 작업
  //    => ([2, 3, 4], 2)
  //  3) 첫번째 작업자가 3개의 작업을 하고 나머지 작업을 2명이 작업
  //    => ([3, 4], 2)
  // 아래 두 가지 경우를 통해, 문제가 중복되어 계산된다는 것을 알 수 있다. 
  // memoization 사용
  let memo = [];



  // 전체작업자의 경우의 수를 기억할 배열생성
  for (let i = 0; i < wokersNum; i++) {
    memo.push(new Array(jobs.length).fill(0))
  }
  //  1-1) 첫번째 작업자가 1개의 작업을 하고, 그 다음 작업자가 2개의 작업을 한 경우
  //    => ([3, 4], 1)
  //  2-1) 첫번째 작업자가 2개의 작업을 하고, 그 다음 작업자가 1개의 작업을 한 경우
  //    => ([3, 4], 1)
  // ----> 마지막 작업자의 경우의수는 앞의 작업자들의 작업분배와 상관없이 같은 경우가 생김.
  // ----> 이 같은 경우를 저장해서 중복계산을 피한다.
  let sum = 0;
  for (let j = jobs.length-1; j >= jobs.length-maxcount; j--) {
    sum+=jobs[j]     
    memo[wokersNum-1][j] = sum
  }

  // 재귀적으로 모든 경우의 수에 대해서 최소값을 구하기 위한 함수
  const dfs = (workerIdx, jobIdx, jobs, leftWorker) => {

    // 해당하는 경우의 수가 저장 되어있으면 그 값을 리턴
    if(memo[workerIdx][jobIdx] !== 0) {
      return memo[workerIdx][jobIdx]
    }

    let sum = 0;
    //계산가능한 최대 값을 우선 최소값으로 지정
    let min = Number.MAX_SAFE_INTEGER;

    for (let i = jobIdx; i < jobs.length-leftWorker; i++) {
      sum += jobs[i];
      //첫번째 작업자가 하나의 일만 했을 경우 부터 체크
      //두번째 작업자는 그 다음의 작업 하나만 했을 경우 체크
      //... 마지막 작업자는 나머지 작업을 모두 수행 
        //(이 경우는 이미 위에서 체크를 해두었기 때문에 베이스케이스에서 바로 리턴됨)
      //마지막작업자와 그 전 작업자의 최대값을 구함
      let max = Math.max(sum, dfs(workerIdx+1, i+1, jobs, leftWorker-1))

      //이전의 최소값과 바로 위에서 구한 최대값 중 최소값을 구함
      //반복문을 돌면서 모든 경우의 수에 대해 체크하면서 최소값이 바뀜
      min = Math.min(min, max)
    }
    
    //반복문이 모두 실행되었을 때 해당 작업자의 경우의 수에서 최소값이 나왔기 때문에 값을 기억해야한다.
    //이전 두명이상의 작업자의 총 작업량이 같은경우 해당 경우의 수가 한번 더 계산되기때문에
    memo[workerIdx][jobIdx] = min
    //첫번째 작업자가 최대작업수를 수행했을때가 마지막경우의 수가 되고
    //첫번째 작업자의 반복문이 끝나면 최종결과를 리턴한다.
    return min

  }

  return dfs(0, 0, jobs, wokersNum-1)


};

console.log(jobAllocation( [10, 2, 3, 4, 16, 10, 10],4)) // ---> 19
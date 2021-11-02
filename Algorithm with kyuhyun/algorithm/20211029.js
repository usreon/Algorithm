/**
 *  프로그래머스 > 정렬 > K번째 수
 */

function solution(array, commands) {
    var answer = [];

    for (let i = 0; i < commands.length; i++) {
        let arr = [];
        let [start, end, target] = [...commands[i]]
        for (let j = start-1; j <= end-1; j++) {
            arr.push(array[j])
        }
        arr.sort((a, b) => a-b)
        answer.push(arr[target-1])
    }

    return answer;
}

console.log(solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]))
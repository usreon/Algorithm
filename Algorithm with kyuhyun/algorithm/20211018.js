/* 
프로그래머스>스택/큐>프린터
*/

function solution(priorities, location) {
    var answer = 0;

    //추적하는 문서의 중요도와 위치체크
    let target = priorities[location];
    priorities[location] = 0;
    
    //출력이 완료된 문서 스택
    let stack = [];

    //가장 최근에 출력된 문서가 타겟일 경우 while문 종료
    while (stack[stack.length-1] !== 0) {
        let max = Math.max(...priorities, target);
        let current = priorities.shift();
        //우선순위가 맞으면 출력
        if (current !== 0 && current === max) {
            stack.push(current)
        } else if (current === 0 && target === max) {
            stack.push(current)
        } else {
            //우선순위가 다르면 순서 마지막으로 배치
            priorities.push(current)
        }
    }

    //출력된 문서의 길이를 반환
    answer = stack.length
    return answer;
}

console.log(solution([1, 1, 9, 1, 1, 1], 0))
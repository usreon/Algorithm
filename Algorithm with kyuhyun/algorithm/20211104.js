/**
 *  프로그래머스 > 정렬 > H-Index
 */
 function solution(citations) {
    var answer = 0;
    
    citations.sort((a, b) => b-a)
    let max = (citations.length > citations[0]) ? citations[0] : citations.length;
    while (max > 0) {
        let check = citations[max-1]
        if (check >= max) {
            answer = max
            break;
        } else {
            max--
        }
    }

    return answer;
}


console.log(solution([3, 0, 6, 1, 5]))


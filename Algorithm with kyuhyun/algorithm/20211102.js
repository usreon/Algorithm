/**
 *  프로그래머스 > 정렬 > 가장 큰 수
 */
 function solution(numbers) {
    var answer = '';
    
    answer = numbers.map((el) => `${el}`).sort((a, b) => {

        if (a+b > b+a) {
            return -1
        } else if (a+b < b+a) {
            return 1
        } else {
            return 0
        }
        // if (a.length === b.length) {
        //     return Number(b) - Number(a) 
        // } else {
            
        //     let length = (a.length > b.length) ? a.length : b.length
        //     let num;
        //     for (let i = 0; i < length; i++) {
        //         if (a[i] !== b[i]) {

        //             if (num) {
        //                 return b.length - a.length
        //             } else {
        //                 return  Number(b[i]) - Number(a[i])
        //             }
                    
        //         } else if (i === 0) {
        //             num = Number(a[i])
        //         }
        //     }

        //     let number = Number(a[0])
        //     let long = (a.length > b.length) ? "a" : "b"
        //     if (long === "a") {
        //         for (let i = 0; i < a.length; i++) {
        //             if (Number(a[i]) !== number) {
        //                 return Number(b[0]) - Number(a[i])
        //             }
        //         }
        //     } else {
        //         for (let i = 0; i < b.length; i++) {
        //             if (Number(b[i]) !== number) {
        //                 return Number(b[i]) - Number(a[0])
        //             }
        //         }
        //     }

        // }
    }).reduce((pre, cur) => {
        return pre+cur
    })

    return Number(answer);
}

console.log(solution([0, 0, 0, 0, 0]))
/**
 *  leetcode > heap(priority queue) > 1337. The K Weakest Rows in a Matrix
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
 var kWeakestRows = function(mat, k) {
    let arr = mat.map((row, idx) => {
        let count = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 0) {
                break;
            } else {
                count++
            }
        }
        return [idx, count];
    })

    return arr.sort((a, b) => {
        if (a[1] !== b[1]) {
            return a[1]-b[1]
        } else {
            return a[0]-b[0]
        }
    }).map((el) => el[0]).splice(0, k)

};

let mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]]

let k = 3

console.log(kWeakestRows(mat, k))
/**
 * leetcode > heap(priority queue) > 506. Relative Ranks
 * @param {number[]} score
 * @return {string[]}
 */
 var findRelativeRanks = function(score) {

    let arr = score.map((value, key) => value = {key, value}).sort((a, b) => b.value-a.value)
    let result = new Array(score.length).fill(0);
    for (let i = 0; i < arr.length; i++) {
        let idx = arr[i].key
        switch (i) {
            case 0 : result[idx] = "Gold Medal"
                break;
            case 1 : result[idx] = "Silver Medal"
                break;
            case 2 : result[idx] = "Bronze Medal"
                break;
            default : result[idx] = `${i+1}`
                break;
        }
    }

    return result
};

let score = [10,3,8,9,4]

console.log(findRelativeRanks(score))
/**
 * leetcode > heap(priority queue) > 1464. Maximum Product of Two Elements in an Array
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = function(nums) {

    if (nums.length === 2) {
        return (nums[0]-1)*(nums[1]-1)
    }

    let heap = new Array(nums.length+1).fill(0);
    let heapsize = 0;
    function insert (data) {
        if (heapsize === 0) {
            heap[1] = data;
            heapsize++
        } else {
            heapsize++
            let idx = heapsize;
            heap[idx] = data;

            let parentIdx = parseInt(idx/2);
            
            while(parentIdx > 0) {

                if (heap[parentIdx] < heap[idx]) {
                    let tmp = heap[parentIdx];
                    heap[parentIdx] = heap[idx];
                    heap[idx] = tmp;
                } else {
                    break;
                }
                idx = parentIdx;
                parentIdx = parseInt(parentIdx/2);
            }
        }
    }

    for (let i = 0; i < nums.length; i++) {
        insert(nums[i])
    }
    let a = heap[1]
    let b = (heap[2] > heap[3]) ? heap[2] : heap[3]

    return (a-1)*(b-1)
};
 

console.log(maxProduct([
    10, 90, 30, 20, 30, 20,
    67, 37, 54, 34, 24, 99,
    89, 14, 25, 97
  ]))
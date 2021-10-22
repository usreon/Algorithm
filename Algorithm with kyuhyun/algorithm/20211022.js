/**
 *  leetcode > heap(priority queue) > 1046. Last Stone Weight
 * @param {number[]} stones
 * @return {number}
 */
const lastStoneWeight = function(stones) {
    // Max Heap 구현
    class Heap {
        constructor() {
            this.heap = [0];
        }
        getLeftChildIndex (parentIndex) {
            return parentIndex * 2 
        }
        getRightChildIndex (parentIndex) {
            return parentIndex * 2 + 1
        }
        getParentIndex (childIndex) {
            return Math.floor((childIndex)/2)
        }
        peek () {
            return this.heap[1]
        }
        insert (value) {    
            this.heap.push(value);
            this.heapifyUp();
        }
        heapifyUp () {
            let index = this.heap.length-1;
            const lastInsertedValue = this.heap[index];

            while (index > 1) {
                const parentIndex = this.getParentIndex(index);

                if (this.heap[parentIndex] < lastInsertedValue) {
                    this.heap[index] = this.heap[parentIndex]
                    index = parentIndex;
                } else {
                    break;
                }

            }
            this.heap[index] = lastInsertedValue;
        }

        remove () {
            const count = this.heap.length;
            const rootValue = this.heap[1];
            if (count <= 1) {
                return undefined;
            }
            if (count === 2) {
                this.heap = [0]
            } else {
                this.heap[1] = this.heap.pop();
                this.heapifyDown()
            }
            return rootValue;
        }
        heapifyDown () {
            let index = 1;
            const count = this.heap.length;
            const rootValue = this.heap[1];

            while (this.getLeftChildIndex(index) < count) {
                const leftChildIndex = this.getLeftChildIndex(index);
                const rightChildIndex = this.getRightChildIndex(index);

                const biggestChildIndex = 
                (rightChildIndex < count && this.heap[rightChildIndex] > this.heap[leftChildIndex]) ?
                rightChildIndex :
                leftChildIndex
                
                if (this.heap[biggestChildIndex] > rootValue) {
                    this.heap[index] = this.heap[biggestChildIndex]
                    
                    index = biggestChildIndex;
                } else {
                    break;
                }
            }
            this.heap[index] = rootValue;
        }

    }
    
    let heap = new Heap();

    for (let i = 0; i < stones.length; i++) {
        heap.insert(stones[i])
    }
    
    while (heap.heap.length > 2) {

        let firstStone = heap.remove()
        let secondStone = heap.remove()

        let result = firstStone - secondStone
        if (result) {
            heap.insert(result)
        } 
    }

    if (heap.heap.length === 1) {
        return 0
    } else {
        return heap.peek()
    }

};

let stones = [2,7,4,1,8,1]
console.log(lastStoneWeight(stones))
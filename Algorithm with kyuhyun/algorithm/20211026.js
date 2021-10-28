/* 
프로그래머스 > 힙(heap) > 이중우선순위큐
min-max heap구현
*/

class minmaxHeap {
    constructor() {
        this.heap = [];
    }
    size () {
        return this.heap.length;
    } 
    getMin () {
        if (this.size() === 0) {
            return null
        }
        return this.heap[0]
    }
    getMax () {
        let idx = this.getMaxIndex()
        if (idx === -1) {
            return null
        } 
        return this.heap[idx]
    }
    insert (value) {
        this.heap.push(value)
        let index = this.heap.length-1
        this.bubbleUp(index);
    }
    removeMin() {
        let minValue = this.heap[0];
        if (this.size() >= 2) {
            this.heap[0] = this.heap.pop()
            this.trickleDown(0)
            return minValue
        } else {
            minValue = this.heap.pop()
            this.trickleDown(0)
            return minValue
        }
        
    }
    removeMax() {   
        let maxIndex = this.getMaxIndex();
        if (maxIndex === -1) {
            return null
        }

        let maxValue = this.heap[maxIndex];
        if (this.size() >= 3) {
            this.heap[maxIndex] = this.heap.pop()
            this.trickleDown(maxIndex);
            return maxValue;
        } else {
            maxValue = this.heap.pop()
            this.trickleDown(maxIndex)
            return maxValue
        }
        
       
        
    }
    getMaxIndex() {
        switch (this.heap.length) {
            case 0 :
                return -1
            case 1 :
                return 0
            case 2 : 
                return 1
            default : 
                if (this.heap[1] > this.heap[2]) {
                    return 1
                } else {
                    return 2
                }   
        }
    }
    trickleDown (index) {
        if (this.isMinLevel(index)) {
            this.trickleDownMin(index)
        } else {
            this.trickleDownMax(index)
        }
    }
    trickleDownMin (index) {
        let compareIdx = this.getSmallestIndexOfChildren(index);
        if (compareIdx !== -1) {
            if (this.isGrandChild(index, compareIdx) && this.heap[index] > this.heap[compareIdx]) {
                this.swap(index, compareIdx)
                if (this.heap[compareIdx] > this.heap[Math.floor((compareIdx-1)/2)]) {
                    this.swap(compareIdx, Math.floor((compareIdx-1)/2))
                }
                this.trickleDownMin(compareIdx)
            } else if (this.isChild(index, compareIdx) && this.heap[index] > this.heap[compareIdx]) {
                this.swap(index, compareIdx)
            }
        }
        
    }
    trickleDownMax (index) {
        let compareIdx = this.getBiggestIndexOfChildren(index);
        if (compareIdx !== -1) {
            if (this.isGrandChild(index, compareIdx) && this.heap[index] < this.heap[compareIdx]) {
                this.swap(index, compareIdx)
                if (this.heap[compareIdx] < this.heap[Math.floor((compareIdx-1)/2)]) {
                    this.swap(compareIdx, Math.floor((compareIdx-1)/2))
                }
                this.trickleDownMax(compareIdx)
            } else if (this.isChild(index, compareIdx) && this.heap[index] < this.heap[compareIdx]) {
                this.swap(index, compareIdx)
            }
        }
    }
    isGrandChild (parent, grandChild) {
        if (parent*4+3 <= grandChild && grandChild <= parent*4+6) {
            return true
        } else {
            return false
        }

    }
    isChild (parent, child) {
        if (parent*2+1 <= child && child <= parent*2+2) {
            return true
        } else {
            return false
        }
    }
    getChildren(index) {
        return [index*2+1, index*2+2, index*4+3, index*4+4, index*4+5, index*4+6]
    }
    getSmallestIndexOfChildren (index) {
        let indexSize = this.heap.length-1;
        let children = this.getChildren(index)

        let minValue = undefined
        let minIndex = undefined

        for (let i = 0; i < children.length; i++) {
            if (i === 0 && indexSize < children[i]) {
                return -1
            } else if (!minValue && !minIndex) {
                minValue = this.heap[children[i]]
                minIndex = children[i]
            } else if (minValue > this.heap[children[i]]) {
                minValue = this.heap[children[i]]
                minIndex = children[i]
            }
        }

        return minIndex
    }
    getBiggestIndexOfChildren (index) {
        let indexSize = this.heap.length-1;
        let children = this.getChildren(index)

        let maxValue = undefined
        let maxIndex = undefined

        for (let i = 0; i < children.length; i++) {
            if (indexSize < children[i]) {
                return -1
            } else if (!maxValue && !maxIndex) {
                maxValue = this.heap[children[i]]
                maxIndex = children[i]
            } else if (maxValue < this.heap[children[i]]) {
                maxValue = this.heap[children[i]]
                maxIndex = children[i]
            }
        }

        return maxIndex
    }

    isMinLevel(index) {
        return this.getLevel(index) % 2 === 0
    }
    getLevel(index) {
        return Math.floor(Math.log2(index+1))
    }
    bubbleUp (index) {
        if (index < 1) {
            return;
        }
        let compareIdx = Math.floor((index-1)/2)
        if (this.isMinLevel(index)) {
            if (this.heap[index] > this.heap[compareIdx]) {
                this.swap(index, compareIdx)
                this.bubbleUpMax(compareIdx)
            } else {
                this.bubbleUpMin(index)
            }
        } else {
            if (this.heap[index] < this.heap[compareIdx]) {
                this.swap(index, compareIdx)
                this.bubbleUpMin(compareIdx)
            } else {
                this.bubbleUpMax(index)
            }
        }
    }
    bubbleUpMax (index) {
        if (index < 3) {
            return;
        }
        let compareIdx = Math.floor((index-3)/4)
        if (this.heap[index] > this.heap[compareIdx]) {
            this.swap(index, compareIdx)
            this.bubbleUpMax(compareIdx)
        }
    }
    bubbleUpMin (index) {
        if (index < 3) {
            return;
        }
        let compareIdx = Math.floor((index-3)/4)
        if (this.heap[index] < this.heap[compareIdx]) {
            this.swap(index, compareIdx)
            this.bubbleUpMin(compareIdx)
        }
    }
    swap (index, compareIdx) {
        [this.heap[index], this.heap[compareIdx]] = [this.heap[compareIdx], this.heap[index]]
    }
}

function solution(operations) {
    var answer = [];

    const heap = new minmaxHeap();
    for (let i = 0; i < operations.length; i++) {
        let arr = operations[i].split(" ");
        let order = arr[0];
        let number = Number(arr[1]);
        if (order === "I") {
            heap.insert(number);
        } else {
            if (number === 1) {
                heap.removeMax();
            } else {
                heap.removeMin();
            }
        }

    }
    answer = [heap.getMax() ? heap.getMax() : 0 , heap.getMin() ? heap.getMin() : 0 ]
    return answer;
}

console.log(solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]))

console.log(solution(["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"]))
/* 
프로그래머스 > 힙(heap) > 디스크 컨트롤러
SJF(Shortest Job First) 스케쥴링알고리즘
*/
class Heap {
    constructor() {
        this.heap = [];
    }
    getLeftChildIndex (parentIndex) {
        return parentIndex * 2 + 1
    }
    getRightChildIndex (parentIndex) {
        return parentIndex * 2 + 2
    }
    getParentIndex (childIndex) {
        return Math.floor((childIndex-1)/2)
    }
    peek () {
        return this.heap[0]
    }
    insert (key, value) { 
        let node = {key, value}   
        this.heap.push(node);
        this.heapifyUp();
    }
    heapifyUp () {
        let index = this.heap.length-1;
        const lastInsertedNode = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            //부모노드의 key값이 마지막에 삽입된 노드의 키값보다 크다면
            //부모의 자리를 계속해서 아래로 내린다.
            if (this.heap[parentIndex].value > lastInsertedNode.value) {
                this.heap[index] = this.heap[parentIndex]
                index = parentIndex;
            } else {
                break;
            }

        }
        this.heap[index] = lastInsertedNode;
    }

    remove () {
        const count = this.heap.length;
        const rootValue = this.heap[0];
        if (count <= 0) {
            return undefined;
        }
        if (count === 1) {
            this.heap = []
        } else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown()
        }
        return rootValue;
    }
    heapifyDown () {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];

        //계속해서 왼쪽 자식이 있을때 까지 검사한다.
        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            //오른쪽자식이 있다면 키로 더 작은값을 찾는다
            //없다면 왼쪽자식의 인덱스를 사용한다.
            const smallestChildIndex = 
            (rightChildIndex < count && this.heap[rightChildIndex].value < this.heap[leftChildIndex].value) 
            ? rightChildIndex 
            : leftChildIndex
            
            if (this.heap[smallestChildIndex].value < rootNode.value) {
                this.heap[index] = this.heap[smallestChildIndex] 
                index = smallestChildIndex;
            } else {
                break;
            }
        }
        this.heap[index] = rootNode;
    }

}

function solution(jobs) {
    var answer = 0;
    let alltask = jobs.length;
    // 작업의 요청이 들어온 순서대로 처리한다.
        // 작업의 요청이 동시에 들어왔다면 가장 작은 크기부터 처리한다. 
 
    jobs.sort((a, b) => a[0] - b[0])

    let queue = new Heap();
    let init = jobs[0];
    let current = init[0];
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i][0] === current) {
            queue.insert(...jobs.shift())
            i--
        } else {
            break;
        }
    }
    
    let result = [];
    while (queue.heap.length > 0) {
        
        let task = queue.remove();
        result.push(current+task.value-task.key)
    
        if (current < task.key) {
            current = task.key
        } else {
            current += task.value
        }
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i][0] <= current) {
                queue.insert(...jobs.shift())
                
                i--
            } else if (queue.heap.length === 0) {
                let [key, value] = jobs.shift()
                queue.insert(key, value)
                current = key
                i--
            } else {
                break;
            }
            
        }     
    }

    answer = Math.floor(result.reduce((pre, cur) => pre+cur)/alltask)
   
    return answer;
}
// console.log(solution([[1000, 1000]]), 1000)
console.log(solution([[0, 10], [2, 12], [9, 19], [15, 17]]),25)
// console.log(solution([[24, 10], [28, 39], [43, 20], [37, 5], [47, 22], [20, 47], [15, 2], [15, 34], [35, 43], [26, 1]]),72)
// console.log(solution([[24, 10], [28, 39], [43, 20], [37, 5], [47, 22], [20, 47], [15, 34], [15, 2], [35, 43], [26, 1]]),72)

// console.log(solution([[1, 9], [1, 4], [1, 5], [1, 7], [1, 3]]),13)

// console.log(solution([[0, 1], [0, 1], [0, 1]] ),2)
// console.log(solution([[0, 5], [1, 2], [5, 5]]), 6)
// console.log(solution([[0, 3], [1, 9], [500, 6]]), 6)

/* 
프로그래머스 > 스택/큐 > 다리를 지나는 트럭
*/
//최대 250.79ms (테스트케이스 기준)
function solution(bridge_length, weight, truck_weights) {
    var answer = 0;

    let untilWhen = truck_weights.length
    let [stack, trucksOnBridge, timesForTrucks, onBridge] = [[], [], [], 0]

    while (stack.length < untilWhen) {
        let truck;
        if (timesForTrucks.length > 0) {
            for (let time in timesForTrucks) {
                timesForTrucks[time]++
            }
            answer++ 
        } else {
            answer++
        }
        if (timesForTrucks[0] > bridge_length) {
            let doneTruck = trucksOnBridge.shift()
            stack.push(doneTruck);
            onBridge-=doneTruck;
            timesForTrucks.shift();
        }
        if (onBridge + truck_weights[0] <= weight) {
            truck = truck_weights.shift();
            trucksOnBridge.push(truck);
            onBridge += truck;
            timesForTrucks.push(1)  
        }
    }
    return answer;
}

console.log(solution(2, 10, [7,4,5,6]))
console.log(solution(100, 100, [10,10,10,10,10,10,10,10,10,10]))

/*
개선가능한 부분
- 다리에 올라갈 수 있는 총 무게가 초과되어 더이상 트럭이 올라올 수 없을때,
가장 앞의 트럭을 도착하기 직전으로 시간을 더한다.

개선 후 모든케이스 0.4ms이하 (테스트케이스 기준)
*/

function solution2(bridge_length, weight, truck_weights) {
    var answer = 0;

    let untilWhen = truck_weights.length
    let [stack, truckStates, onBridge] = [[], [], 0]

    while (stack.length < untilWhen) {
        if (truckStates[0] && truckStates[0][1] === answer) {
            let exitingTruck = truckStates.shift();
            onBridge-=exitingTruck[0]
            stack.push(exitingTruck[0])
        }

        
        if (onBridge + truck_weights[0] <= weight) {
            let truck = truck_weights.shift();
            onBridge+=truck;
            truckStates.push([truck, answer+bridge_length]);
        } else {
            //타임워프
            answer = truckStates[0] ? truckStates[0][1]-1 : answer
        }
        answer++
        console.log(truckStates, answer)
        
    }
    return answer;
}

console.log(solution2(2, 10, [7,4,5,6]))
console.log(solution2(100, 100, [10,10,10,10,10,10,10,10,10,10]))
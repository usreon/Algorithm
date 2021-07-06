//프로그래머스 스택 , 큐 -> 프린터 

function solution(priorities, location) {
  
    const newPriorities = priorities.slice()
    let result = 0;
    
    while(true){
        
        let first  = newPriorities[0]
        let max = 0
        //가장 높은 우선순위 

        if(newPriorities.length ===1){
            result++
            break
        }
        //무한루프 방지용 

        for(let i =0;i<newPriorities.length -1;i++){
           max = Math.max(max , newPriorities[i]); 
        }
        //가장 높은 우선순위 찾기
        

        if(max !==first){
            //max 가 0번째 가 아니면
            newPriorities.push(newPriorities.shift())
            //0번째를 가장 뒤로 보낸다.
            if(location===0) location = newPriorities.length-1
            //0번째가 location 이면 location 을 newPriorities의 길이로 재할당
            else location--  
            //아니면 location 당기기
        }else{
            //0번째가 우선순위가 가장 높을 때
            newPriorities.shift()   
            //출력
            result++
            //순번을 올린다.
            if(location ===0)break
            //0번째가 location 일때 루프 종료
            else location--
            //아니면 location 당기기
        }
    }
    return result

}

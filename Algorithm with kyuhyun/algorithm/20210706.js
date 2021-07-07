const decompression = function (image) {
  // TODO: 여기에 코드를 작성합니다.

  const recursive = (Ys, Xs, Ye, Xe) => {

    //베이스케이스
      //1x1크기의 정사각형이 될 때 시작지점과 끝지점이 같으므로,
    if (Ys === Ye) {
      return `${image[Ys][Xs]}`;
    } 
   
    //중간값을 구해서 쪼개짐 4분면 각각의 시작과 끝지점에사용한다.
    let Ym = parseInt((Ys+Ye)/2)
    let Xm = parseInt((Xs+Xe)/2)
    

    let leftup = recursive(Ys, Xs, Ym, Xm)
    //시작지점의 x좌표(image[y][x])는 중간값에 1을 더해줘야한다.
    let rightup = recursive(Ys, Xm+1, Ym, Xe)
    //시작지점의 y좌표(image[y][x])는 중간값에 1을 더해줘야한다.
    let leftdown = recursive(Ym+1, Xs, Ye, Xm)
    //시작지점의 y, x좌표(image[y][x])는 중간값에 1을 더해줘야한다.
    let rightdown = recursive(Ym+1, Xm+1, Ye, Xe)
    
    
    let result = leftup + rightup + leftdown + rightdown

    //결과값이 '0000' 이거나 '1111'이면 '0' 혹은 '1'을 반환한다.
      //상위의 결과값도 같게되면 동일하게 '0' 혹은 '1'을 반환한다.
    if (result === '0000') return '0'
    if (result === '1111') return '1'

     //결과값이 위의 두 경우 이외일 경우 'x'에 결과값을 이어붙인다. ex)'x1001'
    return 'X'+ result

  }

  let start = 0;
  let end = image.length-1;
  return recursive(start, start, end, end)

};

image = [
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 1],
];

console.log(decompression(image))
const canvas =document.getElementById("jsCanvas");
/*캔버스를 먼저 가져와 준다 */
let painting =false;
/*현재 그림 그리는중인지(클릭중인지) 파악하는 변수*/

function onMouseMove(event){/*캔버스가 있는 경우 실행된다, 캔버스내의 좌표값인 offset을 가져온다*/
    const x = event.offsetX;
    const y = event.offsetY;
    
}
function onMouseDown(event){
    painting =true;
    /*클릭시 활성화*/
}

function stopPainting(){
    painting=false;
    /*페인팅 상대 중지*/
}


function onMouseUp(event){
    stopPainting();
    /*손때면 다시 비활성화*/
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    /*캔버스가 있는지 확인 있다면 해당 함수 실행*/
    canvas.addEventListener("mousedown",onMouseDown);
    /*마우스 클릭시 발생하는 이벤트 추가*/
    canvas.addEventListener("mouseup",onMouseUp);
    /*마우스에서 손때면 그림 그려지고있는거 활성화 종료해야하니*/
    canvass.addEventListener("mouseleave", stopPainting);
    /*작업도중 커서가 캔버스 밖으로 나갈경우 역시 활성화 중지*/
}
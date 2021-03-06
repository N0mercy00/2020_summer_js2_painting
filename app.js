const canvas =document.getElementById("jsCanvas");
/*캔버스를 먼저 가져와 준다 */

const ctx= canvas.getContext("2d");
/*캔버스 내부 픽셀들을 다루기 위해서 context 선언
context는 캔버스 내부에서 픽셀들을 다루기 위한 것들*/

const colors=document.getElementsByClassName("jsColor");
/*html에서 클래스 아이디를 준 각각의 색을 가져오기 위한 코드*/

const range = document.getElementById("jsRange");
/*붓크기를 조절하기 위해 html에서 jsRange라는 아이디를 가진 요소를 가져온다*/

const mode = document.getElementById("jsMode");
/*버튼 모드 변경을 위한 버튼 아이디 요소 가져온다*/

const saveBtn = document.getElementById("jsSave");
/*세이브 버튼 가져와야지*/

const INITIAL_COLOR="#2c2c2c";

const CANVAS_SIZE=700;
/*색 촉기화*/

canvas.width= CANVAS_SIZE;
canvas.height= CANVAS_SIZE;
/*pixel modifier 선언 얘 없으면 작동안해*/

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
/*캔버스 배경 초기화*/

ctx.strokeStyle=INITIAL_COLOR;
/*캔버스 내부 색을 칠하기 위해 사용되는 strokeStyle*/
ctx.fillStyle=INITIAL_COLOR;
/*캔버스 채우기 색 초기화*/
ctx.lineWidth=2.5;
/*붓 두께 */

/*
ctx.fillStyle="green";
ctx.fillRect(50,20,100,49);
//fill 기능 구현을 위한 프로토타입 (사용X) 원리만 보는거
//fillStyle은 색을 담당해주고 fillRect은 시작 좌표, 크기 만큼 색칠해준다
*/

let painting =false;
/*현재 그림 그리는중인지(클릭중인지) 속성값 갖는 변수*/

let filling = false;
/*현재 그리기 모드가 채우기인지 그리기인지 속성값 갖는 변수*/

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    /*캔버스가 있는 경우 실행된다, 캔버스내의 좌표값인 offset을 가져온다*/

    if(!painting){
        ctx.beginPath();/*사용할 path 생성*/
        ctx.moveTo(x,y);/*시작점 기준*/
        /*페인팅 비활성화시 페인ㅇ팅을 위한 path 사전생성?*/
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
        /*lineTo = 이전 위치의 path와 현위치를 이어서 path 만든다
        stroke 색 칠한다 (그린다)
        */
    }  
}
/*canvas는 html5의 한 요소 캔버스 내부안에 있는 픽셀을 다룰수 있다.
사용하기 위해서는 먼저 css와 실제 픽셀을 다루는 윈도우가 어느 사이즈인지 각각 width height 를 줘야한다.
또한 내부의 픽셀을 다루기 위하여 context도 가져야 한다.
ctx.strokeStyle은 그릴 선이 갖는 색을 지정해준다.

클릭하지 않고 캔버스위에서 마우스를 움직이는 경우 path를 시작한다. path란 선이다.
그렇게 만든 선 (path)를 마우스의 x,y 좌표로 이동시키는것. 즉 클릭을 안하고 마우스를 움직이는 상태에도 
눈에 보이지 않을뿐  마우스를 따라 path가 만들어지고 있다.
클릭을 하게 되면 페인팅 값이 참이 되고 클릭하기 직전의 위치에서 클릭을 유지하는 동안의 마우스 위치까지 
색이 칠해진다.

선을 그린다는것 = 시작 좌표에서 종료 좌표까지 색을 칠한다는것.
시작점은 클릭하기 바로 직전(클릭하려는 위치와 동일) moveTO로 x,y 좌표가 지정되고
클릭하는 순간 (painting=true) 현재 마우스의 좌표까지 색이 칠해진다
*/



function stopPainting(){
    painting=false;
    /*페인팅 상대 중지*/
}

function onMouseUp(event){
    stopPainting();
    /*손때면 다시 비활성화*/
}

function handleColorClick(event){
    const color =event.target.style.backgroundColor;//클릭된 컬러의 속성값을 가져온다
    ctx.strokeStyle=color; //context 색을 바꿔준다 (override)
    //즉 오버로드를 통해서 타겟(클릭된) 속성에 맞는 값으로 strokeStyle을 변경 (색바꿔준다는뜻)

    ctx.fillStyle =color;
    //컬러 누르면 채우기 색도 변경해주기
}
/*컬러를 눌렀을때 실행되는 함수 색을 바꿔주는 기능을 한다*/

function handleRangeChange(event){
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth=size;
}
/*range 변경시 바꿔주는 함수*/

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint"

    }
}
/*모드 변경*/

function handleCanvasClick(){
    if(filling===true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
    
}
/*채우기 함수*/

function handleCM(event){
    event.preventDefault();//우클릭 방지 코드
}
//context 메뉴 관리하는 함수 우클릭 방지

function handleSaveClick(){
    //캔버스의 내용물을 image로 얻는게 1단계
    const image= canvas.toDataURL();
    //console.log(image);
    
    const link=document.createElement("a");
    //해당링크를 다운로드 하라는  html태그 생성
    
    link.href=image;
    link.download = "PaintJS[EXPORT]";
    //두줄은 다운로드 하는 코드 

    link.click();
    //이제 거짓클릭을 만드는거야


}
/*저장 기능 함수*/

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    /*캔버스가 있는지 확인 있다면 해당 함수 실행*/
    canvas.addEventListener("mousedown",startPainting);
    /*마우스 클릭시 발생하는 이벤트 추가*/
    canvas.addEventListener("mouseup",stopPainting);
    /*마우스에서 손때면 그림 그려지고있는거 활성화 종료해야하니*/
    canvas.addEventListener("mouseleave", stopPainting);
    /*작업도중 커서가 캔버스 밖으로 나갈경우 역시 활성화 중지*/
    canvas.addEventListener("click",handleCanvasClick);
    /*채우기모드에서 캔버스를 클릭했을때 이벤트 리스너*/
    canvas.addEventListener("contextmenu",handleCM);
    /*이미지 우클릭했을때 나오는 창 없애는거*/
}

Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick));
/*각 컬러들을 배열로 가져와서 각각에 클릭 이벤트 리스너를 달아주는코드*/
/*여기 적힌 color는 왜 colors가 아니고 color냐??
저건 걍 배열요소 대표하는 이름 이름을 감자로 바꿔도 작동 잘된다 */

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}
let minutes = 25;

let seconds = 0;


let timerInterval = null;


let running = false;



const timer =
document.getElementById("timer");



const studyTime =
document.getElementById("studyTime");



const startBtn =
document.getElementById("startBtn");



const pauseBtn =
document.getElementById("pauseBtn");



const resetBtn =
document.getElementById("resetBtn");



const plusTime =
document.getElementById("plusTime");



const minusTime =
document.getElementById("minusTime");







function updateTimer(){


let m =
minutes < 10
?
"0"+minutes
:
minutes;



let s =
seconds < 10
?
"0"+seconds
:
seconds;



timer.innerHTML =
m + ":" + s;



}







function startTimer(){



if(running)
return;



running=true;



timerInterval =
setInterval(function(){



if(seconds===0){



if(minutes===0){



clearInterval(timerInterval);



running=false;



alert(
"Hoàn thành Pomodoro!"
);



localStorage.setItem(
"pomodoroDone",
"true"
);



return;


}



minutes--;


seconds=59;



}

else{


seconds--;


}




updateTimer();



},1000);




}










function pauseTimer(){



clearInterval(timerInterval);



running=false;



}











function resetTimer(){



clearInterval(timerInterval);



running=false;



minutes =
Number(
studyTime.innerHTML
);



seconds=0;



updateTimer();



}









plusTime.onclick=function(){



if(!running){



minutes +=5;



studyTime.innerHTML =
minutes;



updateTimer();



}



};









minusTime.onclick=function(){



if(!running && minutes>5){



minutes-=5;



studyTime.innerHTML =
minutes;



updateTimer();



}



};










startBtn.onclick=function(){



startTimer();



};








pauseBtn.onclick=function(){



pauseTimer();



};








resetBtn.onclick=function(){



resetTimer();



};






updateTimer();
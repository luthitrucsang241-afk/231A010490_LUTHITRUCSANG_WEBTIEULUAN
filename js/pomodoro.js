let minutes = 25;

let seconds = 0;

let timerInterval = null;

let running = false;



const timer = document.getElementById("timer");

const studyTime = document.getElementById("studyTime");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");

const plusTime = document.getElementById("plusTime");

const minusTime = document.getElementById("minusTime");





function updateTimer(){


    let m = String(minutes).padStart(2,"0");

    let s = String(seconds).padStart(2,"0");


    if(timer){

        timer.innerHTML =
        m + ":" + s;

    }


}







function startTimer(){


    if(running)
        return;


    running = true;



    timerInterval =
    setInterval(()=>{


        if(seconds === 0){


            if(minutes === 0){


                clearInterval(timerInterval);


                running = false;


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

            seconds = 59;


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







if(plusTime){


    plusTime.onclick=function(){


        if(!running){


            minutes += 5;


            studyTime.innerHTML =
            minutes;


            updateTimer();


        }


    };


}








if(minusTime){


    minusTime.onclick=function(){


        if(!running && minutes > 5){


            minutes -= 5;


            studyTime.innerHTML =
            minutes;


            updateTimer();


        }


    };


}








if(startBtn){


    startBtn.onclick=function(){

        startTimer();

    };


}






if(pauseBtn){


    pauseBtn.onclick=function(){

        pauseTimer();

    };


}






if(resetBtn){


    resetBtn.onclick=function(){

        resetTimer();

    };


}







updateTimer();

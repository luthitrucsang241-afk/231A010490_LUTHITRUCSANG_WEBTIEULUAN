document.addEventListener("DOMContentLoaded", function () {

    loadAchievement();

});



/*
=============================
GET DATA FROM LOCAL STORAGE
=============================
*/


function getData(key, defaultValue = []) {

    let data = localStorage.getItem(key);

    if (!data) {

        return defaultValue;

    }


    try {

        return JSON.parse(data);

    }

    catch {

        return defaultValue;

    }

}





/*
=============================
LOAD ALL ACHIEVEMENT
=============================
*/


function loadAchievement() {


    let todoData =
        getData("todoData");


    let calendarData =
        getData("calendarData");


    let pomodoroData =
        getData("pomodoroData");


    let dailyGoalData =
        getData("dailyGoalData");



    let todoCompleted =
        countTodo(todoData);



    let studyTime =
        calculateStudyTime(calendarData);



    let studyStreak =
        calculateStreak(calendarData);



    let pomodoroCompleted =
        countPomodoro(pomodoroData);



    let dailyGoalsCompleted =
        countDailyGoal(dailyGoalData);



    updateBadges({

        todoCompleted,

        studyStreak,

        studyTime,

        pomodoroCompleted

    });



    updateProgress({

        pomodoroCompleted,

        studyTime,

        dailyGoalsCompleted

    });


}






/*
=============================
TODO
=============================
*/


function countTodo(data) {


    if (!Array.isArray(data)) {

        return 0;

    }



    return data.filter(todo => {


        return (

            todo.completed === true ||

            todo.status === "completed" ||

            todo.done === true

        );


    }).length;


}






/*
=============================
CALENDAR STUDY TIME
=============================
*/


function calculateStudyTime(data) {


    if (!Array.isArray(data)) {

        return 0;

    }


    return data.reduce((total,item)=>{


        return total + Number(item.studyTime || 0);


    },0);


}







/*
=============================
STUDY STREAK
=============================
*/


function calculateStreak(data){


    if(!Array.isArray(data) || data.length===0){

        return 0;

    }



    let dates = data.map(item=>{


        return new Date(item.date)
        .toISOString()
        .split("T")[0];


    });



    dates =
    [...new Set(dates)]
    .sort()
    .reverse();



    let streak = 1;



    for(let i=0;i<dates.length-1;i++){


        let current =
        new Date(dates[i]);



        let previous =
        new Date(dates[i+1]);



        let diff =
        (current-previous)
        /
        (1000*60*60*24);



        if(diff===1){

            streak++;

        }

        else{

            break;

        }


    }



    return streak;


}








/*
=============================
POMODORO
=============================
*/


function countPomodoro(data){


    if(!Array.isArray(data)){

        return 0;

    }



    let count=0;



    data.forEach(item=>{


        if(item.completed){

            count++;

        }



        else if(item.status==="completed"){

            count++;

        }


    });



    return count;


}







/*
=============================
DAILY GOALS
=============================
*/


function countDailyGoal(data){


    if(!Array.isArray(data)){

        return 0;

    }



    return data.filter(item=>{


        return (

            item.completed===true ||

            item.status==="completed" ||

            item.done===true

        );


    }).length;



}









/*
=============================
BADGES
=============================
*/


function updateBadges(data){


    let badges =
    document.querySelectorAll(".badge");



    if(!badges.length){

        return;

    }




    let result=[


        {

            unlock:
            data.todoCompleted>=10

        },



        {

            unlock:
            data.studyStreak>=7

        },



        {

            unlock:
            data.todoCompleted>=50

        },



        {

            unlock:
            data.studyTime>=200

        }



    ];






    badges.forEach((badge,index)=>{


        if(!result[index]) return;



        let status =
        badge.querySelector("span");



        if(result[index].unlock){



            badge.classList.remove("locked");



            if(status){


                status.dataset.vn =
                "✓ Đã đạt";


                status.dataset.en =
                "✓ Completed";


                updateText(status);


            }



        }



        else{


            badge.classList.add("locked");



            if(status){


                status.dataset.vn =
                "🔒 Chưa đạt";


                status.dataset.en =
                "🔒 Locked";


                updateText(status);


            }


        }



    });


}








/*
=============================
PROGRESS BAR
=============================
*/


function updateProgress(data){



    let bars =
    document.querySelectorAll(".bar");



    let progress=[


        {

            current:data.pomodoroCompleted,

            target:50

        },


        {

            current:data.studyTime,

            target:200

        },


        {

            current:data.dailyGoalsCompleted,

            target:30

        }


    ];





    bars.forEach((bar,index)=>{


        let value =
        progress[index];



        if(!value){

            return;

        }



        let percent =
        Math.min(
            value.current/value.target*100,
            100
        );



        let line =
        bar.querySelector("i");



        if(line){


            line.style.width =
            percent+"%";


        }




        let text =
        bar.querySelector(".progress-value");



        if(text){


            text.innerHTML =
            value.current
            +
            " / "
            +
            value.target;


        }



    });



}








/*
=============================
LANGUAGE SUPPORT
=============================
*/


function updateText(element){


    let lang =
    localStorage.getItem("language")
    ||
    "vi";



    if(lang==="en"){


        element.innerHTML =
        element.dataset.en;


    }

    else{


        element.innerHTML =
        element.dataset.vn;


    }


}

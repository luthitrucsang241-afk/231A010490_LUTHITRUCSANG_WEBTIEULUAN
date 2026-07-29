/* =====================================
   STUDY FOCUS MAIN SCRIPT
   Theme + Language + Setting + Pomodoro
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const theme =
    localStorage.getItem("theme")
    || "light";


    const language =
    localStorage.getItem("language")
    || "vi";



    applyTheme(theme);

    applyLanguage(language);

    loadUserProfile();

    setupSettingMenu();

    setupPomodoro();


});





/* ===============================
   SETTING MENU
================================ */


function setupSettingMenu(){


    const btn =
    document.querySelector(".setting-btn");


    const menu =
    document.querySelector(".setting-dropdown");



    if(!btn || !menu)
        return;



    btn.onclick=function(e){


        e.stopPropagation();


        menu.classList.toggle("show");


    };



    document.addEventListener("click",()=>{


        menu.classList.remove("show");


    });



    menu.onclick=function(e){

        e.stopPropagation();

    };


}







/* ===============================
   THEME
================================ */


function changeTheme(theme){


    localStorage.setItem(
        "theme",
        theme
    );


    applyTheme(theme);


}





function applyTheme(theme){


    document.body.classList.remove(
        "light",
        "dark"
    );


    document.body.classList.add(
        theme
    );


}











/* ===============================
   LANGUAGE SYSTEM FIX
================================ */


function changeLanguage(lang){


    localStorage.setItem(
        "language",
        lang
    );


    applyLanguage(lang);


    window.dispatchEvent(
        new Event("languageChanged")
    );


}







function applyLanguage(lang){



    document.documentElement.lang =
    lang;



    document
    .querySelectorAll("[data-vn]")
    .forEach(element=>{


        if(lang==="en"){


            element.innerHTML =
            element.dataset.en;


        }
        else{


            element.innerHTML =
            element.dataset.vn;


        }


    });





    document
    .querySelectorAll("[data-vn-placeholder]")
    .forEach(element=>{


        if(lang==="en"){


            element.placeholder =
            element.dataset.enPlaceholder;


        }
        else{


            element.placeholder =
            element.dataset.vnPlaceholder;


        }


    });




}













/* ===============================
   USER PROFILE SYNC
================================ */


function loadUserProfile(){



    const user =

    JSON.parse(
        localStorage.getItem("userProfile")
    );



    if(!user)
        return;




    const welcome =
    document.getElementById(
        "welcomeUser"
    );



    const avatar =
    document.getElementById(
        "avatar"
    );







    if(welcome && user.name){


        welcome.innerHTML =
        user.name;


    }






    if(avatar && user.avatar){


        avatar.src =
        user.avatar;


    }



}













/* ===============================
   POMODORO TIMER
================================ */


let timer;


let time = 1500;


let running=false;








function setupPomodoro(){


    const display =
    document.querySelector(".pomodoro h3");



    if(!display)
        return;



    updateTimer(display);



    const buttons =
    document.querySelectorAll(
        ".pomodoro button"
    );



    if(buttons.length>=2){


        buttons[0].onclick=function(){


            startPomodoro(display);


        };



        buttons[1].onclick=function(){


            resetPomodoro(display);


        };


    }



}







function startPomodoro(display){


    if(running)
        return;



    running=true;



    timer=setInterval(()=>{


        time--;


        updateTimer(display);



        if(time<=0){


            clearInterval(timer);


            running=false;


            alert(
            localStorage.getItem("language")==="en"
            ?
            "Pomodoro completed!"
            :
            "Hoàn thành Pomodoro!"
            );


            time=1500;


        }



    },1000);



}









function resetPomodoro(display){


    clearInterval(timer);


    running=false;


    time=1500;


    updateTimer(display);



}









function updateTimer(display){



    let minutes =

    Math.floor(
        time/60
    );



    let seconds =

    time%60;



    display.innerHTML =

    String(minutes)
    .padStart(2,"0")

    +

    ":"

    +

    String(seconds)
    .padStart(2,"0");



}







/* ===============================
   AUTO SYNC LANGUAGE ALL PAGE
================================ */


window.addEventListener(
"languageChanged",
()=>{


    const lang =
    localStorage.getItem("language")
    ||"vi";


    applyLanguage(lang);


});
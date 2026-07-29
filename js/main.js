/* =====================================
   STUDY FOCUS MAIN SCRIPT
   Theme + Language + Setting + Profile
   + Pomodoro
===================================== */


/* ===============================
   DOM CONTENT LOADED
================================ */

document.addEventListener("DOMContentLoaded", () => {


    /* ===============================
       LOAD SAVED SETTINGS
    ================================ */

    const theme =
        localStorage.getItem("theme")
        || "light";


    const language =
        localStorage.getItem("language")
        || "vi";


    /* ===============================
       APPLY SETTINGS
    ================================ */

    applyTheme(theme);

    applyLanguage(language);


    /* ===============================
       OTHER SYSTEMS
    ================================ */

    loadUserProfile();

    setupSettingMenu();

    setupPomodoro();


    /* ===============================
       DASHBOARD SYNC
    ================================ */

    if (
        typeof updateStudyDashboard ===
        "function"
    ) {

        updateStudyDashboard();

    }


});





/* ===============================
   SETTING MENU
================================ */

function setupSettingMenu() {


    const btn =
        document.querySelector(
            ".setting-btn"
        );


    const menu =
        document.querySelector(
            ".setting-dropdown"
        );


    /* ===============================
       CHECK ELEMENT
    ================================ */

    if (
        !btn ||
        !menu
    ) {

        return;

    }


    /* ===============================
       OPEN / CLOSE SETTING
    ================================ */

    btn.addEventListener(
        "click",
        function (e) {


            e.stopPropagation();


            menu.classList.toggle(
                "show"
            );


        }
    );


    /* ===============================
       CLOSE WHEN CLICK OUTSIDE
    ================================ */

    document.addEventListener(
        "click",
        function () {


            menu.classList.remove(
                "show"
            );


        }
    );


    /* ===============================
       KEEP MENU OPEN
       WHEN CLICK INSIDE
    ================================ */

    menu.addEventListener(
        "click",
        function (e) {


            e.stopPropagation();


        }
    );


}






/* ===============================
   THEME SYSTEM
================================ */


/* ===============================
   CHANGE THEME
================================ */

function changeTheme(theme) {


    /* ===============================
       SAVE THEME
    ================================ */

    localStorage.setItem(
        "theme",
        theme
    );


    /* ===============================
       APPLY THEME
    ================================ */

    applyTheme(theme);


    /* ===============================
       CLOSE SETTING MENU
    ================================ */

    const menu =
        document.querySelector(
            ".setting-dropdown"
        );


    if (menu) {

        menu.classList.remove(
            "show"
        );

    }


}






/* ===============================
   APPLY THEME
================================ */

function applyTheme(theme) {


    /* ===============================
       REMOVE OLD THEME
    ================================ */

    document.body.classList.remove(
        "light",
        "dark"
    );


    /* ===============================
       ADD NEW THEME
    ================================ */

    document.body.classList.add(
        theme
    );


}






/* ===============================
   LANGUAGE SYSTEM
================================ */


/* ===============================
   CHANGE LANGUAGE
================================ */

function changeLanguage(lang) {


    /* ===============================
       SAVE LANGUAGE
    ================================ */

    localStorage.setItem(
        "language",
        lang
    );


    /* ===============================
       APPLY LANGUAGE
    ================================ */

    applyLanguage(lang);


    /* ===============================
       UPDATE OTHER SYSTEMS
    ================================ */

    window.dispatchEvent(
        new Event(
            "languageChanged"
        )
    );


    /* ===============================
       CLOSE SETTING MENU
    ================================ */

    const menu =
        document.querySelector(
            ".setting-dropdown"
        );


    if (menu) {

        menu.classList.remove(
            "show"
        );

    }


}






/* ===============================
   APPLY LANGUAGE
================================ */

function applyLanguage(lang) {


    /* ===============================
       UPDATE HTML LANGUAGE
    ================================ */

    document.documentElement.lang =
        lang;


    /* ===============================
       UPDATE TEXT
       data-vn / data-en
    ================================ */

    document
        .querySelectorAll(
            "[data-vn]"
        )
        .forEach(
            element => {


                if (
                    lang === "en"
                ) {


                    /* ===============================
                       ENGLISH
                    ================================ */

                    if (
                        element.dataset.en
                    ) {

                        element.innerHTML =
                            element.dataset.en;

                    }


                }

                else {


                    /* ===============================
                       VIETNAMESE
                    ================================ */

                    if (
                        element.dataset.vn
                    ) {

                        element.innerHTML =
                            element.dataset.vn;

                    }


                }


            }
        );



    /* ===============================
       UPDATE PLACEHOLDER
       data-vn-placeholder
       data-en-placeholder
    ================================ */

    document
        .querySelectorAll(
            "[data-vn-placeholder]"
        )
        .forEach(
            element => {


                if (
                    lang === "en"
                ) {


                    if (
                        element.dataset.enPlaceholder
                    ) {

                        element.placeholder =
                            element.dataset.enPlaceholder;

                    }


                }

                else {


                    if (
                        element.dataset.vnPlaceholder
                    ) {

                        element.placeholder =
                            element.dataset.vnPlaceholder;

                    }


                }


            }
        );


}






/* ===============================
   USER PROFILE SYNC
================================ */

function loadUserProfile() {


    /* ===============================
       CURRENT USER
    ================================ */

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );


    /* ===============================
       USER PROFILE
    ================================ */

    const userProfile =
        JSON.parse(
            localStorage.getItem(
                "userProfile"
            )
        );


    /* ===============================
       SELECT USER
    ================================ */

    const user =
        currentUser ||
        userProfile;


    if (
        !user
    ) {

        return;

    }


    /* ===============================
       GET ELEMENTS
    ================================ */

    const welcome =
        document.getElementById(
            "welcomeUser"
        );


    const avatar =
        document.getElementById(
            "avatar"
        );


    /* ===============================
       GET USERNAME
    ================================ */

    const userName =
        user.fullname ||
        user.name ||
        user.username;


    /* ===============================
       DISPLAY USERNAME
    ================================ */

    if (
        welcome &&
        userName
    ) {


        welcome.innerHTML =
            "Xin chào 👋 " +
            userName;


    }


    /* ===============================
       DISPLAY AVATAR
    ================================ */

    if (
        avatar &&
        user.avatar
    ) {


        avatar.src =
            user.avatar;


    }


}






/* ===============================
   POMODORO FALLBACK
   Chỉ hoạt động nếu trang
   có .pomodoro
================================ */


/* ===============================
   POMODORO VARIABLES
================================ */

let timer;

let time = 1500;

let running = false;






/* ===============================
   SETUP POMODORO
================================ */

function setupPomodoro() {


    const display =
        document.querySelector(
            ".pomodoro h3"
        );


    /* ===============================
       KHÔNG CÓ POMODORO
       TRÊN TRANG
    ================================ */

    if (
        !display
    ) {

        return;

    }


    /* ===============================
       INITIAL TIMER
    ================================ */

    updateTimer(
        display
    );


    /* ===============================
       GET BUTTONS
    ================================ */

    const buttons =
        document.querySelectorAll(
            ".pomodoro button"
        );


    /* ===============================
       START + RESET
    ================================ */

    if (
        buttons.length >= 2
    ) {


        buttons[0].onclick =
            function () {


                startPomodoro(
                    display
                );


            };


        buttons[1].onclick =
            function () {


                resetPomodoro(
                    display
                );


            };


    }


}






/* ===============================
   START POMODORO
================================ */

function startPomodoro(display) {


    /* ===============================
       PREVENT MULTIPLE TIMER
    ================================ */

    if (
        running
    ) {

        return;

    }


    running = true;


    /* ===============================
       START COUNTDOWN
    ================================ */

    timer =
        setInterval(
            () => {


                time--;


                updateTimer(
                    display
                );


                /* ===============================
                   TIMER COMPLETED
                ================================ */

                if (
                    time <= 0
                ) {


                    clearInterval(
                        timer
                    );


                    running = false;


                    /* ===============================
                       LANGUAGE ALERT
                    ================================ */

                    alert(

                        localStorage.getItem(
                            "language"
                        ) === "en"

                            ?

                            "Pomodoro completed!"

                            :

                            "Hoàn thành Pomodoro!"

                    );


                    /* ===============================
                       RESET TIME
                    ================================ */

                    time = 1500;


                    updateTimer(
                        display
                    );


                }


            },

            1000

        );


}






/* ===============================
   RESET POMODORO
================================ */

function resetPomodoro(display) {


    clearInterval(
        timer
    );


    running = false;


    time = 1500;


    updateTimer(
        display
    );


}






/* ===============================
   UPDATE TIMER
================================ */

function updateTimer(display) {


    const minutes =

        Math.floor(
            time / 60
        );


    const seconds =

        time % 60;


    display.innerHTML =

        String(minutes)
            .padStart(
                2,
                "0"
            )

        +

        ":"

        +

        String(seconds)
            .padStart(
                2,
                "0"
            );


}






/* ===============================
   AUTO SYNC LANGUAGE
   ALL PAGE
================================ */

window.addEventListener(
    "languageChanged",
    () => {


        const lang =
            localStorage.getItem(
                "language"
            )
            || "vi";


        /* ===============================
           APPLY LANGUAGE AGAIN
        ================================ */

        applyLanguage(
            lang
        );


        /* ===============================
           UPDATE DASHBOARD
        ================================ */

        if (
            typeof updateStudyDashboard ===
            "function"
        ) {

            updateStudyDashboard();

        }


    }
);

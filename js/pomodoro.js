/* ================= POMODORO ================= */

document.addEventListener("DOMContentLoaded", function () {


    /* ================= BIẾN THỜI GIAN ================= */

    let minutes = 25;

    let seconds = 0;

    let timerInterval = null;

    let running = false;



    /* ================= LẤY PHẦN TỬ HTML ================= */

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



    /* ================= KIỂM TRA PHẦN TỬ ================= */

    if (
        !timer ||
        !studyTime ||
        !startBtn ||
        !pauseBtn ||
        !resetBtn ||
        !plusTime ||
        !minusTime
    ) {

        console.error(
            "Không tìm thấy đầy đủ các phần tử Pomodoro trong dashboard.html"
        );

        return;

    }



    /* ================= HIỂN THỊ TIMER ================= */

    function updateTimer() {


        const m =
            String(minutes).padStart(2, "0");


        const s =
            String(seconds).padStart(2, "0");


        timer.textContent =
            m + ":" + s;


    }



    /* ================= HIỂN THỊ SỐ PHÚT ================= */

    function updateStudyTime() {


        studyTime.textContent =
            minutes;


    }



    /* ================= BẮT ĐẦU ================= */

    function startTimer() {


        if (running) {

            return;

        }


        running = true;


        timerInterval =
            setInterval(function () {


                if (
                    minutes === 0 &&
                    seconds === 0
                ) {


                    clearInterval(
                        timerInterval
                    );


                    timerInterval =
                        null;


                    running = false;


                    localStorage.setItem(
                        "pomodoroDone",
                        "true"
                    );


                    alert(
                        "Hoàn thành Pomodoro!"
                    );


                    return;

                }



                if (seconds > 0) {


                    seconds--;


                }
                else {


                    if (minutes > 0) {


                        minutes--;

                        seconds = 59;


                    }


                }



                updateTimer();


            }, 1000);


    }



    /* ================= DỪNG ================= */

    function pauseTimer() {


        if (
            timerInterval !== null
        ) {


            clearInterval(
                timerInterval
            );


            timerInterval =
                null;


        }


        running = false;


    }



    /* ================= RESET ================= */

    function resetTimer() {


        clearInterval(
            timerInterval
        );


        timerInterval =
            null;


        running = false;


        minutes =
            Number(
                studyTime.textContent
            );


        seconds = 0;


        updateTimer();


    }



    /* ================= TĂNG 5 PHÚT ================= */

    plusTime.addEventListener(
        "click",
        function (event) {


            event.preventDefault();


            if (running) {

                return;

            }


            minutes += 5;


            updateStudyTime();


            updateTimer();


        }
    );



    /* ================= GIẢM 5 PHÚT ================= */

    minusTime.addEventListener(
        "click",
        function (event) {


            event.preventDefault();


            if (running) {

                return;

            }


            if (minutes > 5) {


                minutes -= 5;


                updateStudyTime();


                updateTimer();


            }


        }
    );



    /* ================= NÚT BẮT ĐẦU ================= */

    startBtn.addEventListener(
        "click",
        function (event) {


            event.preventDefault();


            startTimer();


        }
    );



    /* ================= NÚT DỪNG ================= */

    pauseBtn.addEventListener(
        "click",
        function (event) {


            event.preventDefault();


            pauseTimer();


        }
    );



    /* ================= NÚT RESET ================= */

    resetBtn.addEventListener(
        "click",
        function (event) {


            event.preventDefault();


            resetTimer();


        }
    );



    /* ================= KHỞI TẠO ================= */

    updateStudyTime();

    updateTimer();


});

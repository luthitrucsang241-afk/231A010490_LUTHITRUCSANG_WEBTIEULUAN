/* =========================================================
   POMODORO
   Lưu dữ liệu học thực tế vào localStorage
   Chỉ ghi nhận khi hoàn thành Pomodoro
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           BIẾN THỜI GIAN
        ===================================================== */


        let minutes = 25;

        let seconds = 0;

        let timerInterval = null;

        let running = false;



        /* =====================================================
           THỜI GIAN BAN ĐẦU
        ===================================================== */


        let initialMinutes = 25;



        /* =====================================================
           LẤY PHẦN TỬ HTML
        ===================================================== */


        const timer =
            document.getElementById(
                "timer"
            );


        const studyTime =
            document.getElementById(
                "studyTime"
            );


        const startBtn =
            document.getElementById(
                "startBtn"
            );


        const pauseBtn =
            document.getElementById(
                "pauseBtn"
            );


        const resetBtn =
            document.getElementById(
                "resetBtn"
            );


        const plusTime =
            document.getElementById(
                "plusTime"
            );


        const minusTime =
            document.getElementById(
                "minusTime"
            );



        /* =====================================================
           KIỂM TRA PHẦN TỬ
        ===================================================== */


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



        /* =====================================================
           HÀM LẤY DỮ LIỆU HỌC TỪ LOCALSTORAGE
        ===================================================== */


        function getStudyData() {

            try {

                const data =
                    localStorage.getItem(
                        "studyTimeData"
                    );


                if (!data) {

                    return [];

                }


                const parsedData =
                    JSON.parse(
                        data
                    );


                if (
                    Array.isArray(
                        parsedData
                    )
                ) {

                    return parsedData;

                }


                return [];

            }

            catch (error) {

                console.error(
                    "Không thể đọc dữ liệu học tập:",
                    error
                );

                return [];

            }

        }



        /* =====================================================
           LƯU DỮ LIỆU HỌC VÀO LOCALSTORAGE
           
           Mỗi ngày chỉ có 1 bản ghi.
           Nếu học nhiều Pomodoro trong cùng ngày
           thì cộng dồn thời gian.
        ===================================================== */


        function recordStudyTime(
            completedMinutes
        ) {


            const minutesStudied =
                Number(
                    completedMinutes
                );


            if (
                !Number.isFinite(
                    minutesStudied
                )
                ||
                minutesStudied <= 0
            ) {

                return;

            }



            const now =
                new Date();



            /* =============================================
               LẤY NGÀY HIỆN TẠI
               Dạng: YYYY-MM-DD
            ============================================= */


            const year =
                now.getFullYear();



            const month =
                String(
                    now.getMonth() + 1
                )
                    .padStart(
                        2,
                        "0"
                    );



            const day =
                String(
                    now.getDate()
                )
                    .padStart(
                        2,
                        "0"
                    );



            const today =
                year +
                "-" +
                month +
                "-" +
                day;



            /* =============================================
               LẤY DỮ LIỆU CŨ
            ============================================= */


            const studyData =
                getStudyData();



            /* =============================================
               KIỂM TRA NGÀY ĐÃ CÓ DỮ LIỆU CHƯA
            ============================================= */


            const existingItem =
                studyData.find(

                    function (
                        item
                    ) {

                        return (
                            item.date ===
                            today
                        );

                    }

                );



            /* =============================================
               NẾU ĐÃ HỌC TRONG NGÀY
               → CỘNG THÊM THỜI GIAN
            ============================================= */


            if (
                existingItem
            ) {

                existingItem.minutes =
                    Number(
                        existingItem.minutes ||
                        0
                    )
                    +
                    minutesStudied;


                existingItem.sessions =
                    Number(
                        existingItem.sessions ||
                        0
                    )
                    +
                    1;

            }



            /* =============================================
               NẾU CHƯA HỌC TRONG NGÀY
               → TẠO BẢN GHI MỚI
            ============================================= */


            else {

                studyData.push({

                    date:
                        today,

                    minutes:
                        minutesStudied,

                    sessions:
                        1

                });

            }



            /* =============================================
               SẮP XẾP THEO NGÀY
               CŨ → MỚI
            ============================================= */


            studyData.sort(

                function (
                    a,
                    b
                ) {

                    return (
                        new Date(
                            a.date
                        )
                        -
                        new Date(
                            b.date
                        )
                    );

                }

            );



            /* =============================================
               LƯU VÀO LOCALSTORAGE
            ============================================= */


            localStorage.setItem(

                "studyTimeData",

                JSON.stringify(
                    studyData
                )

            );



            console.log(
                "Đã lưu thời gian học:",
                minutesStudied,
                "phút"
            );

        }



        /* =====================================================
           HIỂN THỊ TIMER
        ===================================================== */


        function updateTimer() {

            const m =
                String(
                    minutes
                )
                    .padStart(
                        2,
                        "0"
                    );


            const s =
                String(
                    seconds
                )
                    .padStart(
                        2,
                        "0"
                    );


            timer.textContent =
                m +
                ":" +
                s;

        }



        /* =====================================================
           HIỂN THỊ SỐ PHÚT
        ===================================================== */


        function updateStudyTime() {

            studyTime.textContent =
                initialMinutes;

        }



        /* =====================================================
           BẮT ĐẦU POMODORO
        ===================================================== */


        function startTimer() {


            if (
                running
            ) {

                return;

            }



            running =
                true;



            timerInterval =
                setInterval(

                    function () {


                        /* =====================================
                           POMODORO HOÀN THÀNH
                        ===================================== */


                        if (
                            minutes === 0 &&
                            seconds === 0
                        ) {


                            clearInterval(
                                timerInterval
                            );


                            timerInterval =
                                null;


                            running =
                                false;



                            /* =================================
                               LƯU THỜI GIAN HỌC THỰC TẾ
                            ================================= */


                            recordStudyTime(
                                initialMinutes
                            );



                            /* =================================
                               THÔNG BÁO
                            ================================= */


                            alert(
                                "Hoàn thành Pomodoro! Thời gian học đã được lưu vào thống kê."
                            );


                            return;

                        }



                        /* =====================================
                           GIẢM GIÂY
                        ===================================== */


                        if (
                            seconds > 0
                        ) {

                            seconds--;

                        }



                        /* =====================================
                           GIẢM PHÚT
                        ===================================== */


                        else {


                            if (
                                minutes > 0
                            ) {

                                minutes--;

                                seconds =
                                    59;

                            }

                        }



                        updateTimer();


                    },

                    1000

                );

        }



        /* =====================================================
           TẠM DỪNG
        ===================================================== */


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


            running =
                false;

        }



        /* =====================================================
           RESET
        ===================================================== */


        function resetTimer() {


            if (
                timerInterval !== null
            ) {

                clearInterval(
                    timerInterval
                );

            }


            timerInterval =
                null;


            running =
                false;


            minutes =
                initialMinutes;


            seconds =
                0;


            updateTimer();

        }



        /* =====================================================
           TĂNG 5 PHÚT
        ===================================================== */


        plusTime.addEventListener(

            "click",

            function (
                event
            ) {


                event.preventDefault();


                if (
                    running
                ) {

                    return;

                }


                initialMinutes +=
                    5;


                minutes =
                    initialMinutes;


                seconds =
                    0;


                updateStudyTime();


                updateTimer();


            }

        );



        /* =====================================================
           GIẢM 5 PHÚT
        ===================================================== */


        minusTime.addEventListener(

            "click",

            function (
                event
            ) {


                event.preventDefault();


                if (
                    running
                ) {

                    return;

                }


                if (
                    initialMinutes > 5
                ) {


                    initialMinutes -=
                        5;


                    minutes =
                        initialMinutes;


                    seconds =
                        0;


                    updateStudyTime();


                    updateTimer();

                }

            }

        );



        /* =====================================================
           NÚT BẮT ĐẦU
        ===================================================== */


        startBtn.addEventListener(

            "click",

            function (
                event
            ) {


                event.preventDefault();


                startTimer();

            }

        );



        /* =====================================================
           NÚT TẠM DỪNG
        ===================================================== */


        pauseBtn.addEventListener(

            "click",

            function (
                event
            ) {


                event.preventDefault();


                pauseTimer();

            }

        );



        /* =====================================================
           NÚT RESET
        ===================================================== */


        resetBtn.addEventListener(

            "click",

            function (
                event
            ) {


                event.preventDefault();


                resetTimer();

            }

        );



        /* =====================================================
           KHỞI TẠO
        ===================================================== */


        updateStudyTime();

        updateTimer();


    }

);
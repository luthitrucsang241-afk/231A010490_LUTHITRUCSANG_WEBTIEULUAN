document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAchievement();

    }
);



// =========================================================
// LOAD ACHIEVEMENT
// =========================================================

function loadAchievement() {

    const todoData =
        getTodoData();


    const pomodoroData =
        getPomodoroData();


    const dailyGoalData =
        getDailyGoalsData();


    // Không gọi refreshLearningStreak() ở đây.
    // Streak chỉ được cập nhật khi Pomodoro hoàn thành thật.
    const streakData =
        getLearningStreakData();


    const todoCompleted =
        countTodo(
            todoData
        );


    const pomodoroCompleted =
        countPomodoro(
            pomodoroData
        );


    const studyTime =
        calculateStudyTime();


    const dailyGoalsCompleted =
        countDailyGoal(
            dailyGoalData
        );


    updateStreak(
        streakData
    );


    updateBadges({

        todoCompleted,

        studyStreak:
            Number(
                streakData.currentStreak || 0
            ),

        studyTime,

        pomodoroCompleted

    });


    updateProgress({

        pomodoroCompleted,

        studyTime,

        dailyGoalsCompleted

    });

}



// =========================================================
// STUDY TIME
// Tính tổng thời gian học thật từ studyTime
// =========================================================

function calculateStudyTime() {

    const data =
        getStudyTimeData();


    if (
        !Array.isArray(data)
    ) {

        return 0;

    }


    const totalMinutes =
        data.reduce(

            function (
                total,
                item
            ) {

                const minutes =
                    Number(
                        item.minutes
                    );


                if (
                    Number.isFinite(
                        minutes
                    )
                    &&
                    minutes > 0
                ) {

                    return (
                        total +
                        minutes
                    );

                }


                const studyTime =
                    Number(
                        item.studyTime
                    );


                if (
                    Number.isFinite(
                        studyTime
                    )
                    &&
                    studyTime > 0
                ) {

                    return (
                        total +
                        (
                            studyTime *
                            60
                        )
                    );

                }


                return total;

            },

            0

        );


    return totalMinutes / 60;

}



// =========================================================
// TODO
// =========================================================

function countTodo(data) {

    if (
        !Array.isArray(data)
    ) {

        return 0;

    }


    return data.filter(

        function (todo) {

            return (

                todo.completed === true ||

                todo.status ===
                    "completed" ||

                todo.done === true

            );

        }

    ).length;

}



// =========================================================
// POMODORO
// Chỉ đếm Pomodoro đã hoàn thành thật
// =========================================================

function countPomodoro(data) {

    if (
        !Array.isArray(data)
    ) {

        return 0;

    }


    return data.filter(

        function (item) {

            return (

                item.completed === true ||

                item.status ===
                    "completed"

            );

        }

    ).length;

}



// =========================================================
// DAILY GOALS
// =========================================================

function countDailyGoal(data) {

    if (
        !Array.isArray(data)
    ) {

        return 0;

    }


    return data.filter(

        function (item) {

            return (

                item.completed === true ||

                item.status ===
                    "completed" ||

                item.done === true

            );

        }

    ).length;

}



// =========================================================
// LEARNING STREAK
// =========================================================

function updateStreak(data) {

    const currentElement =
        document.getElementById(
            "currentStreak"
        );


    const bestElement =
        document.getElementById(
            "bestStreak"
        );


    const messageElement =
        document.getElementById(
            "streakMessage"
        );


    if (
        !data
    ) {

        return;

    }


    const current =
        Number(
            data.currentStreak || 0
        );


    const best =
        Number(
            data.bestStreak || 0
        );


    const lang =
        localStorage.getItem(
            "language"
        )
        ||
        "vi";



    // =====================================================
    // CURRENT STREAK
    // =====================================================

    if (currentElement) {

        if (
            lang === "en"
        ) {

            currentElement.textContent =
                current +
                (
                    current === 1
                    ? " day"
                    : " days"
                );

        }

        else {

            currentElement.textContent =
                current +
                " ngày";

        }

    }



    // =====================================================
    // BEST STREAK
    // =====================================================

    if (bestElement) {

        if (
            lang === "en"
        ) {

            bestElement.textContent =
                best +
                (
                    best === 1
                    ? " day"
                    : " days"
                );

        }

        else {

            bestElement.textContent =
                best +
                " ngày";

        }

    }



    // =====================================================
    // STREAK MESSAGE
    // =====================================================

    if (
        messageElement
    ) {

        if (
            current === 0
        ) {

            messageElement.dataset.vn =
                "Hoàn thành một Pomodoro hôm nay để bắt đầu lại chuỗi học tập.";


            messageElement.dataset.en =
                "Complete a Pomodoro today to start your learning streak again.";

        }



        else if (
            current >= 100
        ) {

            messageElement.dataset.vn =
                "🏆 Chuỗi đặc biệt 100 ngày! Hãy tiếp tục duy trì!";


            messageElement.dataset.en =
                "🏆 Special 100-day streak! Keep it going!";

        }



        else if (
            current >= 30
        ) {

            messageElement.dataset.vn =
                "🔥 Tuyệt vời! Bạn đã duy trì chuỗi 1 tháng!";


            messageElement.dataset.en =
                "🔥 Amazing! You have maintained a 1-month streak!";

        }



        else if (
            current >= 7
        ) {

            messageElement.dataset.vn =
                "🔥 Tuyệt vời! Bạn đã duy trì chuỗi 1 tuần!";


            messageElement.dataset.en =
                "🔥 Great! You have maintained a 1-week streak!";

        }



        else {

            messageElement.dataset.vn =
                "Tiếp tục hoàn thành Pomodoro mỗi ngày để duy trì chuỗi.";


            messageElement.dataset.en =
                "Keep completing Pomodoros every day to maintain your streak.";

        }


        updateText(
            messageElement
        );

    }

}



// =========================================================
// BADGES
// =========================================================

function updateBadges(data) {

    const badges =
        document.querySelectorAll(
            ".badge"
        );


    if (
        !badges.length
    ) {

        return;

    }


    const result = [

        // Beginner
        {
            unlock:
                data.pomodoroCompleted >=
                10
        },


        // Silver
        {
            unlock:
                data.studyStreak >=
                7
        },


        // Gold
        {
            unlock:
                data.pomodoroCompleted >=
                100
        },


        // Master
        {
            unlock:
                data.studyTime >=
                500
        }

    ];



    badges.forEach(

        function (
            badge,
            index
        ) {

            if (
                !result[index]
            ) {

                return;

            }


            const status =
                badge.querySelector(
                    "span"
                );


            if (
                result[index].unlock
            ) {

                badge.classList.remove(
                    "locked"
                );


                if (
                    status
                ) {

                    status.dataset.vn =
                        "✓ Đã đạt";


                    status.dataset.en =
                        "✓ Completed";


                    updateText(
                        status
                    );

                }

            }



            else {

                badge.classList.add(
                    "locked"
                );


                if (
                    status
                ) {

                    status.dataset.vn =
                        "🔒 Chưa đạt";


                    status.dataset.en =
                        "🔒 Locked";


                    updateText(
                        status
                    );

                }

            }

        }

    );

}



// =========================================================
// PROGRESS BAR
// =========================================================

function updateProgress(data) {

    const bars =
        document.querySelectorAll(
            ".bar"
        );


    const progress = [

        // Pomodoro
        {
            current:
                Number(
                    data.pomodoroCompleted || 0
                ),

            target:
                50
        },


        // Study Time
        {
            current:
                Number(
                    data.studyTime || 0
                ),

            target:
                200
        },


        // Daily Goals
        {
            current:
                Number(
                    data.dailyGoalsCompleted || 0
                ),

            target:
                30
        }

    ];



    bars.forEach(

        function (
            bar,
            index
        ) {

            const value =
                progress[index];


            if (
                !value
            ) {

                return;

            }


            const percent =
                Math.min(

                    (
                        value.current /
                        value.target
                    )
                    *
                    100,

                    100

                );



            const line =
                bar.querySelector(
                    "i"
                );


            if (
                line
            ) {

                line.style.width =
                    percent +
                    "%";

            }



            const text =
                bar.querySelector(
                    ".progress-value"
                );


            if (
                text
            ) {

                const lang =
                    localStorage.getItem(
                        "language"
                    )
                    ||
                    "vi";



                if (
                    index === 1
                ) {

                    if (
                        lang === "en"
                    ) {

                        text.textContent =
                            value.current.toFixed(1) +
                            " / " +
                            value.target +
                            " hours";

                    }

                    else {

                        text.textContent =
                            value.current.toFixed(1) +
                            " / " +
                            value.target +
                            " giờ";

                    }

                }



                else {

                    text.textContent =
                        value.current +
                        " / " +
                        value.target;

                }

            }

        }

    );

}



// =========================================================
// LANGUAGE
// =========================================================

function updateText(element) {

    const lang =
        localStorage.getItem(
            "language"
        )
        ||
        "vi";


    if (
        lang === "en"
    ) {

        element.innerHTML =
            element.dataset.en;

    }

    else {

        element.innerHTML =
            element.dataset.vn;

    }

}
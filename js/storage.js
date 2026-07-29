// =========================================================
// STUDY FOCUS - STORAGE SYSTEM
// Vị trí: js/storage.js
// =========================================================


// =========================================================
// STORAGE CORE
// =========================================================

const StudyStorage = {

    save(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    },


    load(key, defaultValue = []) {

        const data =
            localStorage.getItem(key);


        if (!data) {

            return defaultValue;

        }


        try {

            return JSON.parse(data);

        }

        catch (error) {

            return defaultValue;

        }

    },


    remove(key) {

        localStorage.removeItem(key);

    }

};




// =========================================================
// USER
// =========================================================

function saveUser(user) {

    StudyStorage.save(
        "currentUser",
        user
    );

}



function getUser() {

    const currentUser =
        StudyStorage.load(
            "currentUser",
            null
        );


    if (currentUser) {

        return currentUser;

    }


    const userProfile =
        StudyStorage.load(
            "userProfile",
            null
        );


    if (userProfile) {

        return userProfile;

    }


    return {

        fullname: "",

        username: "",

        email: "",

        avatar: ""

    };

}




// =========================================================
// CURRENT USER ID
// Mỗi tài khoản có một vùng dữ liệu riêng
// =========================================================

function getCurrentUserId() {

    const user =
        getUser();


    if (
        user &&
        user.id !== undefined &&
        user.id !== null &&
        String(user.id).trim() !== ""
    ) {

        return String(user.id);

    }


    if (
        user &&
        user.email &&
        String(user.email).trim() !== ""
    ) {

        return String(user.email)
            .trim()
            .toLowerCase();

    }


    if (
        user &&
        user.username &&
        String(user.username).trim() !== ""
    ) {

        return String(user.username)
            .trim()
            .toLowerCase();

    }


    if (
        user &&
        user.fullname &&
        String(user.fullname).trim() !== ""
    ) {

        return String(user.fullname)
            .trim()
            .toLowerCase();

    }


    return "guest";

}




// =========================================================
// USER-SPECIFIC STORAGE
// =========================================================

function getUserStorageKey(key) {

    return (
        key +
        "_" +
        getCurrentUserId()
    );

}



function saveUserData(
    key,
    data
) {

    StudyStorage.save(

        getUserStorageKey(key),

        data

    );

}



function getUserData(
    key,
    defaultValue = []
) {

    return StudyStorage.load(

        getUserStorageKey(key),

        defaultValue

    );

}




// =========================================================
// USERS
// =========================================================

function getUsers() {

    return StudyStorage.load(

        "users",

        []

    );

}



function saveUsers(data) {

    StudyStorage.save(

        "users",

        data

    );

}




// =========================================================
// CALENDAR
// =========================================================

function getCalendarData() {

    return getUserData(

        "calendar",

        []

    );

}



function saveCalendarData(data) {

    saveUserData(

        "calendar",

        data

    );

}




// =========================================================
// POMODORO
// =========================================================

function getPomodoroData() {

    return getUserData(

        "pomodoro",

        []

    );

}



function savePomodoroData(data) {

    saveUserData(

        "pomodoro",

        data

    );

}




// =========================================================
// TODO
// =========================================================

function getTodoData() {

    return getUserData(

        "todo",

        []

    );

}



function saveTodoData(data) {

    saveUserData(

        "todo",

        data

    );

}




// =========================================================
// DAILY GOALS
// =========================================================

function getDailyGoalsData() {

    return getUserData(

        "dailyGoals",

        []

    );

}



function saveDailyGoalsData(data) {

    saveUserData(

        "dailyGoals",

        data

    );

}




// =========================================================
// STUDY TIME
// =========================================================

function getStudyTimeData() {

    return getUserData(

        "studyTime",

        []

    );

}



function saveStudyTimeData(data) {

    saveUserData(

        "studyTime",

        data

    );

}




// =========================================================
// LEARNING STREAK
// =========================================================

function getLearningStreakData() {

    return getUserData(

        "learningStreak",

        {

            currentStreak: 0,

            bestStreak: 0,

            lastStudyDate: "",

            todayCompleted: false,

            updatedAt: ""

        }

    );

}



function saveLearningStreakData(data) {

    saveUserData(

        "learningStreak",

        data

    );

}




// =========================================================
// SETTINGS
// =========================================================

function saveSettings(data) {

    StudyStorage.save(

        "settings",

        data

    );

}



function getSettings() {

    return StudyStorage.load(

        "settings",

        {

            theme: "light",

            language: "vi",

            volume: 80,

            notification: true

        }

    );

}




// =========================================================
// FAVORITE QUOTES
// =========================================================

function getFavoriteQuotes() {

    return getUserData(

        "favoriteQuotes",

        []

    );

}



function saveFavoriteQuotes(data) {

    saveUserData(

        "favoriteQuotes",

        data

    );

}




// =========================================================
// DATE
// Lấy ngày hiện tại theo local timezone
// =========================================================

function getLocalDateString(
    date = new Date()
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (

        year +

        "-" +

        month +

        "-" +

        day

    );

}




// =========================================================
// DATE DIFFERENCE
// =========================================================

function getDateDifference(
    firstDate,
    secondDate
) {

    const first =
        new Date(
            firstDate +
            "T00:00:00"
        );


    const second =
        new Date(
            secondDate +
            "T00:00:00"
        );


    return Math.round(

        (
            second -
            first
        )
        /
        (
            1000 *
            60 *
            60 *
            24
        )

    );

}




// =========================================================
// GET REAL STUDY DATES
// Chỉ lấy những ngày có Pomodoro hoàn thành thật
// =========================================================

function getCompletedStudyDates() {

    const pomodoroData =
        getPomodoroData();


    if (
        !Array.isArray(
            pomodoroData
        )
    ) {

        return [];

    }


    const dates =
        pomodoroData

            .filter(

                function (item) {

                    return (

                        item &&
                        (
                            item.completed === true ||
                            item.status === "completed"
                        )

                    );

                }

            )

            .map(

                function (item) {

                    return item.date;

                }

            )

            .filter(

                function (date) {

                    return (

                        typeof date === "string" &&
                        date.trim() !== ""

                    );

                }

            );


    return [
        ...new Set(
            dates
        )
    ];

}




// =========================================================
// CALCULATE REAL LEARNING STREAK
// Tính dựa trên ngày có Pomodoro hoàn thành thật
// =========================================================

function calculateLearningStreak() {

    const dates =
        getCompletedStudyDates();


    if (
        !dates.length
    ) {

        return {

            currentStreak: 0,

            bestStreak: 0,

            lastStudyDate: "",

            todayCompleted: false,

            updatedAt:
                new Date().toISOString()

        };

    }



    const sortedDates =
        dates

            .filter(

                function (date) {

                    return (
                        !isNaN(
                            new Date(
                                date +
                                "T00:00:00"
                            ).getTime()
                        )
                    );

                }

            )

            .sort();



    if (
        !sortedDates.length
    ) {

        return {

            currentStreak: 0,

            bestStreak: 0,

            lastStudyDate: "",

            todayCompleted: false,

            updatedAt:
                new Date().toISOString()

        };

    }



    // =====================================================
    // TÍNH BEST STREAK
    // =====================================================

    let bestStreak =
        1;


    let temporaryStreak =
        1;



    for (
        let i = 1;
        i < sortedDates.length;
        i++
    ) {

        const difference =
            getDateDifference(

                sortedDates[
                i - 1
                ],

                sortedDates[
                i
                ]

            );



        if (
            difference === 1
        ) {

            temporaryStreak += 1;

        }

        else {

            temporaryStreak = 1;

        }



        if (
            temporaryStreak >
            bestStreak
        ) {

            bestStreak =
                temporaryStreak;

        }

    }



    // =====================================================
    // TÍNH CURRENT STREAK
    // Chỉ tính chuỗi đang liên tục đến hôm nay
    // =====================================================

    const today =
        getLocalDateString();


    const lastStudyDate =
        sortedDates[
        sortedDates.length - 1
        ];


    const daysFromToday =
        getDateDifference(

            lastStudyDate,

            today

        );


    let currentStreak =
        0;



    // Nếu lần học cuối không phải hôm nay
    // thì kiểm tra xem có phải hôm qua không.
    // Nếu cách hơn 1 ngày thì streak hiện tại = 0.

    if (
        daysFromToday === 0
        ||
        daysFromToday === 1
    ) {

        currentStreak = 1;


        for (
            let i =
                sortedDates.length - 1;

            i > 0;

            i--
        ) {

            const difference =
                getDateDifference(

                    sortedDates[
                    i - 1
                    ],

                    sortedDates[
                    i
                    ]

                );


            if (
                difference === 1
            ) {

                currentStreak += 1;

            }

            else {

                break;

            }

        }

    }



    const todayCompleted =
        sortedDates.includes(
            today
        );



    return {

        currentStreak,

        bestStreak,

        lastStudyDate,

        todayCompleted,

        updatedAt:
            new Date().toISOString()

    };

}




// =========================================================
// UPDATE LEARNING STREAK
// Chỉ gọi khi Pomodoro hoàn thành thật
// =========================================================

function updateLearningStreak() {

    const streak =
        calculateLearningStreak();


    saveLearningStreakData(

        streak

    );


    return streak;

}




// =========================================================
// RESET / REFRESH LEARNING STREAK
// Không tự cộng streak.
// Chỉ đồng bộ lại dữ liệu từ Pomodoro thật.
// =========================================================

function refreshLearningStreak() {

    return updateLearningStreak();

}




// =========================================================
// RECORD STUDY TIME
// Chỉ gọi khi Pomodoro hoàn thành
// =========================================================

function recordStudyTime(minutes) {

    const studyMinutes =
        Number(
            minutes
        );


    if (
        !Number.isFinite(
            studyMinutes
        )
        ||
        studyMinutes <= 0
    ) {

        return;

    }



    const today =
        getLocalDateString();



    let studyData =
        getStudyTimeData();



    if (
        !Array.isArray(
            studyData
        )
    ) {

        studyData = [];

    }



    let todayRecord =
        studyData.find(

            function (item) {

                return (
                    item.date ===
                    today
                );

            }

        );



    if (
        todayRecord
    ) {

        todayRecord.minutes =
            Number(
                todayRecord.minutes ||
                0
            )
            +
            studyMinutes;


        todayRecord.studyTime =
            todayRecord.minutes /
            60;


        todayRecord.updatedAt =
            new Date().toISOString();


        todayRecord.pomodoroCount =
            Number(
                todayRecord.pomodoroCount ||
                0
            )
            +
            1;

    }



    else {

        studyData.push({

            date:
                today,

            minutes:
                studyMinutes,

            studyTime:
                studyMinutes /
                60,

            pomodoroCount:
                1,

            updatedAt:
                new Date().toISOString()

        });

    }



    saveStudyTimeData(

        studyData

    );




    // =====================================================
    // CẬP NHẬT POMODORO
    // Đây là dữ liệu nguồn chính cho thành tích
    // =====================================================

    let pomodoroData =
        getPomodoroData();



    if (
        !Array.isArray(
            pomodoroData
        )
    ) {

        pomodoroData = [];

    }



    pomodoroData.push({

        id:
            Date.now(),

        date:
            today,

        minutes:
            studyMinutes,

        completed:
            true,

        status:
            "completed",

        completedAt:
            new Date().toISOString()

    });



    savePomodoroData(

        pomodoroData

    );




    // =====================================================
    // CẬP NHẬT STREAK
    // Chỉ sau khi Pomodoro đã được ghi nhận hoàn thành
    // =====================================================

    updateLearningStreak();

}
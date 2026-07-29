/* =====================================
   STUDY DATA SYSTEM
   Study Time + Learning Streak
===================================== */


/* ===============================
   USER DATA KEY
================================ */

function getCurrentUserDataKey() {

    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!user) {

        return null;

    }


    const userId =
        user.id ||
        user.email ||
        user.username;


    if (!userId) {

        return null;

    }


    return String(userId);

}





/* ===============================
   STORAGE KEY
================================ */

function getStudyDataStorageKey() {

    const userId =
        getCurrentUserDataKey();


    if (!userId) {

        return null;

    }


    return "studyData_" + userId;

}





/* ===============================
   DEFAULT DATA
================================ */

function getDefaultStudyData() {

    return {

        currentStreak: 0,

        bestStreak: 0,

        lastStudyDate: null,

        todayCompleted: false,

        updatedAt: null,

        totalStudyMinutes: 0,

        dailyStudy: {},

        pomodoroSessions: []

    };

}





/* ===============================
   LOAD STUDY DATA
================================ */

function getStudyData() {

    const storageKey =
        getStudyDataStorageKey();


    if (!storageKey) {

        return getDefaultStudyData();

    }


    let data =
        JSON.parse(
            localStorage.getItem(storageKey)
        );


    if (!data) {

        data =
            getDefaultStudyData();


        saveStudyData(data);


        return data;

    }


    const defaultData =
        getDefaultStudyData();


    data =
        Object.assign(
            defaultData,
            data
        );


    if (
        !data.dailyStudy ||
        typeof data.dailyStudy !== "object"
    ) {

        data.dailyStudy = {};

    }


    if (
        !Array.isArray(
            data.pomodoroSessions
        )
    ) {

        data.pomodoroSessions = [];

    }


    return data;

}





/* ===============================
   SAVE STUDY DATA
================================ */

function saveStudyData(data) {

    const storageKey =
        getStudyDataStorageKey();


    if (!storageKey) {

        return;

    }


    data.updatedAt =
        new Date().toISOString();


    localStorage.setItem(

        storageKey,

        JSON.stringify(data)

    );

}





/* ===============================
   LOCAL DATE
================================ */

function getStudyLocalDate(date = new Date()) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return (

        year +

        "-" +

        month +

        "-" +

        day

    );

}





/* ===============================
   DATE DIFFERENCE
================================ */

function getStudyDateDifference(
    date1,
    date2
) {

    const first =
        new Date(
            date1 + "T00:00:00"
        );


    const second =
        new Date(
            date2 + "T00:00:00"
        );


    return Math.round(

        (
            second -
            first
        ) /

        86400000

    );

}





/* ===============================
   UPDATE LEARNING STREAK
================================ */

function updateLearningStreak() {

    const data =
        getStudyData();


    const today =
        getStudyLocalDate();


    /*
       Nếu hôm nay đã được tính
       thì không cộng thêm.
    */

    if (
        data.lastStudyDate === today
    ) {

        data.todayCompleted = true;


        saveStudyData(data);


        return data;

    }



    /*
       Học lần đầu
    */

    if (
        !data.lastStudyDate
    ) {

        data.currentStreak = 1;

    }


    else {

        const difference =
            getStudyDateDifference(

                data.lastStudyDate,

                today

            );


        /*
           Học liên tục:
           Hôm nay = hôm qua + 1
        */

        if (
            difference === 1
        ) {

            data.currentStreak += 1;

        }


        /*
           Bỏ lỡ ít nhất 1 ngày
        */

        else if (
            difference > 1
        ) {

            data.currentStreak = 1;

        }


        /*
           Trường hợp ngày không hợp lệ
        */

        else if (
            difference < 0
        ) {

            return data;

        }

    }



    /*
       Cập nhật Best Streak
    */

    if (
        data.currentStreak >
        data.bestStreak
    ) {

        data.bestStreak =
            data.currentStreak;

    }



    /*
       Lưu ngày học cuối
    */

    data.lastStudyDate =
        today;


    data.todayCompleted =
        true;


    saveStudyData(data);


    return data;

}





/* ===============================
   RECORD STUDY TIME
================================ */

function recordStudyTime(minutes) {

    minutes =
        Number(minutes);


    if (
        !Number.isFinite(minutes) ||
        minutes <= 0
    ) {

        return false;

    }


    const data =
        getStudyData();


    const today =
        getStudyLocalDate();


    /*
       Cộng tổng thời gian học
    */

    data.totalStudyMinutes +=
        minutes;



    /*
       Cộng thời gian học hôm nay
    */

    if (
        !data.dailyStudy[today]
    ) {

        data.dailyStudy[today] = 0;

    }


    data.dailyStudy[today] +=
        minutes;



    /*
       Ghi nhận một phiên Pomodoro
    */

    data.pomodoroSessions.push({

        date: today,

        minutes: minutes,

        completedAt:
            new Date().toISOString()

    });



    /*
       Cập nhật Streak
       Chỉ gọi một lần cho
       mỗi ngày học.
    */

    updateLearningStreak();



    /*
       Lưu dữ liệu
    */

    saveStudyData(data);


    /*
       Cập nhật giao diện
    */

    updateStudyDashboard();


    return true;

}





/* ===============================
   FORMAT STUDY TIME
================================ */

function formatStudyMinutes(minutes) {

    minutes =
        Number(minutes) || 0;


    const hours =
        Math.floor(
            minutes / 60
        );


    const remainingMinutes =
        minutes % 60;


    if (
        hours > 0
    ) {

        return (

            hours +

            " giờ " +

            remainingMinutes +

            " phút"

        );

    }


    return (

        remainingMinutes +

        " phút"

    );

}





/* ===============================
   GET STREAK MESSAGE
================================ */

function getStreakBadge(streak) {

    streak =
        Number(streak) || 0;


    if (
        streak >= 100
    ) {

        return "🔥 100+ ngày";

    }


    if (
        streak >= 30
    ) {

        return "🔥 1 tháng";

    }


    if (
        streak >= 7
    ) {

        return "🔥 1 tuần";

    }


    return (

        "🔥 " +

        streak +

        " ngày"

    );

}





/* ===============================
   UPDATE DASHBOARD
================================ */

function updateStudyDashboard() {

    const data =
        getStudyData();


    const today =
        getStudyLocalDate();



    /*
       TODAY STUDY
    */

    const todayMinutes =
        Number(
            data.dailyStudy[today] || 0
        );



    /*
       TOTAL STUDY
    */

    const totalMinutes =
        Number(
            data.totalStudyMinutes || 0
        );



    /*
       CURRENT STREAK
    */

    const currentStreak =
        Number(
            data.currentStreak || 0
        );



    /*
       BEST STREAK
    */

    const bestStreak =
        Number(
            data.bestStreak || 0
        );



    /*
       ELEMENTS
    */

    const todayStudy =
        document.getElementById(
            "todayStudy"
        );


    const totalStudy =
        document.getElementById(
            "totalStudy"
        );


    const streakText =
        document.getElementById(
            "streakText"
        );


    const bestStreakText =
        document.getElementById(
            "bestStreakText"
        );


    const streakBadge =
        document.getElementById(
            "streakBadge"
        );


    const streakMessage =
        document.getElementById(
            "streakMessage"
        );



    /*
       DISPLAY TODAY
    */

    if (
        todayStudy
    ) {

        todayStudy.innerText =
            formatStudyMinutes(
                todayMinutes
            );

    }



    /*
       DISPLAY TOTAL
    */

    if (
        totalStudy
    ) {

        totalStudy.innerText =
            formatStudyMinutes(
                totalMinutes
            );

    }



    /*
       DISPLAY CURRENT STREAK
    */

    if (
        streakText
    ) {

        streakText.innerText =

            "🔥 " +

            currentStreak +

            " ngày";

    }



    /*
       DISPLAY BEST STREAK
    */

    if (
        bestStreakText
    ) {

        bestStreakText.innerText =

            "🏆 " +

            bestStreak +

            " ngày";

    }



    /*
       DISPLAY BADGE
    */

    if (
        streakBadge
    ) {

        if (
            currentStreak > 0
        ) {

            streakBadge.innerText =
                getStreakBadge(
                    currentStreak
                );

        }
        else {

            streakBadge.innerText =
                "🔥 0 ngày";

        }

    }



    /*
       DISPLAY MESSAGE
    */

    if (
        streakMessage
    ) {

        if (
            currentStreak === 0
        ) {

            streakMessage.innerText =

                "Chưa có ngày học nào. Hãy bắt đầu học hôm nay!";

        }

        else if (
            data.lastStudyDate &&
            data.lastStudyDate !== today
        ) {

            const difference =
                getStudyDateDifference(

                    data.lastStudyDate,

                    today

                );


            if (
                difference > 1
            ) {

                streakMessage.innerText =

                    "Chuỗi đã bị gián đoạn. Bắt đầu lại từ hôm nay!";

            }

            else {

                streakMessage.innerText =

                    "Tiếp tục học hôm nay để duy trì chuỗi.";

            }

        }

        else {

            streakMessage.innerText =

                "Tiếp tục học hôm nay để duy trì chuỗi.";

        }

    }

}





/* ===============================
   UPDATE DASHBOARD EVENT
================================ */

window.addEventListener(

    "studyDataUpdated",

    function () {

        updateStudyDashboard();

    }

);





/* ===============================
   INITIAL LOAD
================================ */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        updateStudyDashboard();

    }

);
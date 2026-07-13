// ================= STORAGE SYSTEM =================


const StudyStorage = {

    save(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    },


    load(key, defaultValue = []) {

        const data = localStorage.getItem(key);


        if (!data) {

            return defaultValue;

        }


        try {

            return JSON.parse(data);

        }

        catch(error) {

            return defaultValue;

        }

    },


    remove(key) {

        localStorage.removeItem(key);

    }



};




// ================= USER =================


function saveUser(user){


    StudyStorage.save(
        "user",
        user
    );


}




function getUser(){


    return StudyStorage.load(
        "user",
        {

            name:"",
            email:"",
            username:"",
            avatar:""

        }
    );


}




// ================= CALENDAR =================


function getCalendarData(){


    return StudyStorage.load(
        "calendar",
        []
    );


}




function saveCalendarData(data){


    StudyStorage.save(
        "calendar",
        data
    );


}





// ================= POMODORO =================


function getPomodoroData(){


    return StudyStorage.load(
        "pomodoro",
        []
    );


}




function savePomodoroData(data){


    StudyStorage.save(
        "pomodoro",
        data
    );


}





// ================= TODO =================


function getTodoData(){


    return StudyStorage.load(
        "todo",
        []
    );


}




function saveTodoData(data){


    StudyStorage.save(
        "todo",
        data
    );


}





// ================= DAILY GOALS =================


function getDailyGoalsData(){


    return StudyStorage.load(
        "dailyGoals",
        []
    );


}




function saveDailyGoalsData(data){


    StudyStorage.save(
        "dailyGoals",
        data
    );


}





// ================= STUDY TIME =================


function getStudyTimeData(){


    return StudyStorage.load(
        "studyTime",
        []
    );


}




function saveStudyTimeData(data){


    StudyStorage.save(
        "studyTime",
        data
    );


}





// ================= SETTINGS =================


function saveSettings(data){


    StudyStorage.save(
        "settings",
        data
    );


}





function getSettings(){


    return StudyStorage.load(
        "settings",
        {

            theme:"light",
            language:"vi",
            volume:80,
            notification:true

        }
    );


}
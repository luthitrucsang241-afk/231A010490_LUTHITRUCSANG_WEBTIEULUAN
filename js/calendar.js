document.addEventListener("DOMContentLoaded", () => {

    const user =
        localStorage.getItem("currentUser") || "guest";

    const storageKey =
        "studyCalendar_" + user;


    let calendarData =
        JSON.parse(localStorage.getItem(storageKey)) || {
            schedules: []
        };


    let currentMonth =
        new Date().getMonth();

    let currentYear =
        new Date().getFullYear();


    let editId = null;


    const sessions = [
        {
            vn: "Sáng",
            en: "Morning"
        },
        {
            vn: "Chiều",
            en: "Afternoon"
        },
        {
            vn: "Tối",
            en: "Evening"
        }
    ];


    const weekDays = [
        {
            vn: "Thứ 2",
            en: "Monday"
        },
        {
            vn: "Thứ 3",
            en: "Tuesday"
        },
        {
            vn: "Thứ 4",
            en: "Wednesday"
        },
        {
            vn: "Thứ 5",
            en: "Thursday"
        },
        {
            vn: "Thứ 6",
            en: "Friday"
        },
        {
            vn: "Thứ 7",
            en: "Saturday"
        },
        {
            vn: "Chủ nhật",
            en: "Sunday"
        }
    ];



    function saveData() {

        localStorage.setItem(
            storageKey,
            JSON.stringify(calendarData)
        );

    }




    function createId() {

        return Date.now();

    }




    function getLanguage() {

        return localStorage.getItem("language") || "vi";

    }





    function text(vn, en) {

        return getLanguage() === "en"
            ? en
            : vn;

    }





    function formatDate(date) {


        if (!date)
            return "";


        const d =
            new Date(date);


        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")
            }/${d.getFullYear()}`;

    }







    function addSchedule() {


        const date =
            document.getElementById("studyDate").value;


        const session =
            document.getElementById("studySession").value;


        const subject =
            document.getElementById("subject").value;


        const content =
            document.getElementById("content").value;


        const note =
            document.getElementById("note").value;


        const studyTime =
            Number(
                document.getElementById("studyTime").value
            );



        if (
            !date ||
            !subject
        ) {

            alert(
                text(
                    "Vui lòng nhập ngày và môn học",
                    "Please enter date and subject"
                )
            );

            return;

        }




        const d =
            new Date(date);



        let day =
            d.getDay();


        day =
            day === 0 ? 6 : day - 1;




        const item = {

            id: createId(),

            date,

            day: weekDays[day].vn,

            session,

            subject,

            content,

            note,

            studyTime,

            completed: true

        };



        calendarData.schedules.push(item);



        saveData();


        clearInput();


        renderAll();


    }







    function clearInput() {


        [
            "studyDate",
            "subject",
            "content",
            "note",
            "studyTime"
        ]
            .forEach(id => {

                const el =
                    document.getElementById(id);

                if (el)
                    el.value = "";

            });


    }





    function deleteSchedule(id) {


        calendarData.schedules =
            calendarData.schedules.filter(
                item => item.id !== id
            );


        saveData();


        renderAll();


    }






    function editSchedule(id) {


        const item =
            calendarData.schedules.find(
                x => x.id === id
            );


        if (!item)
            return;



        editId = id;



        document.getElementById("studyDate").value =
            item.date;


        document.getElementById("studySession").value =
            item.session;


        document.getElementById("subject").value =
            item.subject;


        document.getElementById("content").value =
            item.content;


        document.getElementById("note").value =
            item.note;


        document.getElementById("studyTime").value =
            item.studyTime;


        document.querySelector(".schedule-form")
            .scrollIntoView({
                behavior: "smooth"
            });


    }






    function updateSchedule() {


        if (!editId)
            return addSchedule();



        const item =
            calendarData.schedules.find(
                x => x.id === editId
            );



        item.date =
            document.getElementById("studyDate").value;


        item.session =
            document.getElementById("studySession").value;


        item.subject =
            document.getElementById("subject").value;


        item.content =
            document.getElementById("content").value;


        item.note =
            document.getElementById("note").value;


        item.studyTime =
            Number(
                document.getElementById("studyTime").value
            );



        editId = null;


        saveData();


        clearInput();


        renderAll();


    }






    window.addSchedule =
        addSchedule;


    window.editSchedule =
        editSchedule;


    window.deleteSchedule =
        deleteSchedule;


    window.updateSchedule =
        updateSchedule;

    /* =========================
RENDER WEEK CALENDAR
========================= */


    function renderWeekCalendar() {


        const box =
            document.getElementById("weekCalendar");


        if (!box)
            return;


        box.innerHTML = "";



        const header =
            document.createElement("div");


        header.className =
            "schedule-grid";



        let html = `

        <div class="schedule-head"
        data-vn="Buổi"
        data-en="Session">

        Buổi

        </div>

        `;



        weekDays.forEach(day => {

            html += `

            <div class="schedule-head">

            <span
            data-vn="${day.vn}"
            data-en="${day.en}">

            ${day.vn}

            </span>

            </div>

            `;

        });



        html += `</div>`;



        box.innerHTML = html;



        const grid =
            document.createElement("div");


        grid.className =
            "schedule-grid";



        sessions.forEach(session => {


            grid.innerHTML += `

            <div class="schedule-day">

            <span
            data-vn="${session.vn}"
            data-en="${session.en}">

            ${session.vn}

            </span>

            </div>

            `;



            weekDays.forEach(day => {


                const list =
                    calendarData.schedules.filter(
                        item =>

                            item.day === day.vn
                            &&
                            item.session === session.vn

                    );



                let content = "";



                list.forEach(item => {


                    content += `

                    <div class="event-box">


                    <b>
                    📘 ${item.subject}
                    </b>


                    <p>
                    📝 ${item.content}
                    </p>


                    <p>
                    ⏱ ${item.studyTime || 0}h
                    </p>


                    <p>
                    ${item.note || ""}
                    </p>



                    <button onclick="editSchedule(${item.id})"
                    data-vn="Sửa"
                    data-en="Edit">

                    Sửa

                    </button>



                    <button onclick="deleteSchedule(${item.id})"
                    data-vn="Xóa"
                    data-en="Delete">

                    Xóa

                    </button>


                    </div>

                    `;


                });



                grid.innerHTML += `

                <div class="schedule-cell">

                ${content}

                </div>

                `;



            });



        });



        box.appendChild(grid);


    }






    /* =========================
       WEEKLY STUDY SCHEDULE
    ========================= */


    function renderWeeklySchedule() {


        let old =
            document.getElementById(
                "weeklyStudyTable"
            );


        if (old)
            old.remove();




        const card =
            document.createElement("section");


        card.className = "card";


        card.id =
            "weeklyStudyTable";



        let html = `


        <h2
        data-vn="Thời khóa biểu học tập tuần"
        data-en="Weekly Study Schedule">

        Thời khóa biểu học tập tuần

        </h2>



        <div class="schedule-table">

        <table>


        <tr>


        <th>
        #
        </th>



        ${weekDays.map(day => `

        <th>

        <span
        data-vn="${day.vn}"
        data-en="${day.en}">

        ${day.vn}

        </span>


        </th>

        `).join("")}


        </tr>



        `;




        sessions.forEach(session => {


            html += `

            <tr>


            <td>

            <span
            data-vn="${session.vn}"
            data-en="${session.en}">

            ${session.vn}

            </span>


            </td>

            `;




            weekDays.forEach(day => {


                let list =
                    calendarData.schedules.filter(
                        item =>

                            item.day === day.vn
                            &&
                            item.session === session.vn

                    );



                html += `

                <td>


                ${list.map(
                    item =>
                        `📘 ${item.subject}`
                ).join("<br>")
                    }


                </td>


                `;



            });



            html += "</tr>";


        });




        html += `

        </table>

        </div>

        `;



        card.innerHTML =
            html;



        document.querySelector(".main")
            .insertBefore(
                card,
                document.querySelector(".main")
                    .children[3]
            );



    }








    /* =========================
       MONTH CALENDAR
    ========================= */



    function renderMonth() {


        const box =
            document.getElementById(
                "monthCalendar"
            );


        const title =
            document.getElementById(
                "monthTitle"
            );



        if (!box)
            return;




        const monthName =
            new Date(
                currentYear,
                currentMonth
            )
                .toLocaleString(
                    getLanguage() === "en"
                        ? "en-US"
                        : "vi-VN",
                    {
                        month: "long",
                        year: "numeric"
                    }
                );



        if (title)
            title.innerText =
                monthName;




        box.innerHTML = "";



        const days =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();




        for (
            let i = 1;
            i <= days;
            i++
        ) {


            let date =
                `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;



            let has =
                calendarData.schedules
                    .some(
                        x => x.date === date
                    );



            box.innerHTML += `

            <div class="day ${has ? "event" : ""
                }">


            ${i}


            ${has
                    ? "🔥"
                    : ""
                }


            </div>

            `;


        }


    }






    window.changeMonth = function (value) {


        currentMonth += value;



        if (currentMonth > 11) {

            currentMonth = 0;
            currentYear++;

        }



        if (currentMonth < 0) {

            currentMonth = 11;
            currentYear--;

        }



        renderMonth();


    }
    /* =========================
       STUDY STREAK
    ========================= */


    function renderStreak() {


        const fire =
            document.getElementById(
                "streakFire"
            );


        const text =
            document.getElementById(
                "streakText"
            );



        if (!fire || !text)
            return;



        const dates =
            [
                ...new Set(
                    calendarData.schedules
                        .map(
                            item => item.date
                        )
                )
            ]
                .sort();



        let streak =
            calculateStreak(dates);



        fire.innerHTML =
            "🔥".repeat(
                streak || 1
            );



        text.innerHTML =
            streak
                ?
                `${streak} ${getLanguage() === "en"
                    ?
                    "days study streak"
                    :
                    "ngày học liên tục"
                }`
                :
                text(
                    "Chưa có lịch học",
                    "No study record"
                );



    }







    function calculateStreak(dates) {


        if (
            !dates.length
        )
            return 0;



        let max = 1;

        let current = 1;



        for (
            let i = 1;
            i < dates.length;
            i++
        ) {


            const previous =
                new Date(
                    dates[i - 1]
                );


            const now =
                new Date(
                    dates[i]
                );



            const diff =
                (
                    now - previous
                )
                /
                86400000;



            if (diff === 1) {

                current++;

                max =
                    Math.max(
                        max,
                        current
                    );

            }
            else {

                current = 1;

            }


        }


        return max;


    }








    /* =========================
       STUDY TIME
    ========================= */


    function renderStudyTime() {


        const today =
            document.getElementById(
                "todayStudy"
            );


        const total =
            document.getElementById(
                "totalStudy"
            );



        if (!today || !total)
            return;



        const now =
            new Date()
                .toISOString()
                .split("T")[0];



        let todayTime = 0;

        let totalTime = 0;



        calendarData.schedules
            .forEach(
                item => {


                    totalTime +=
                        Number(
                            item.studyTime || 0
                        );



                    if (
                        item.date === now
                    ) {

                        todayTime +=
                            Number(
                                item.studyTime || 0
                            );

                    }


                }
            );




        today.innerText =
            todayTime
                ?
                `${todayTime} ${getLanguage() === "en"
                    ? "hours"
                    : "giờ"
                }`
                :
                (
                    getLanguage() === "en"
                        ?
                        "No study time today"
                        :
                        "Chưa có thời gian học hôm nay"
                );




        total.innerText =
            `${totalTime} ${getLanguage() === "en"
                ? "hours"
                : "giờ"
            }`;



    }







    /* =========================
       LANGUAGE SYSTEM
    ========================= */



    function updateLanguage() {



        const lang =
            getLanguage();



        document
            .querySelectorAll(
                "[data-vn]"
            )
            .forEach(
                el => {


                    el.innerText =
                        lang === "en"
                            ?
                            el.dataset.en
                            :
                            el.dataset.vn;


                }
            );




        document
            .querySelectorAll(
                "[data-vn-placeholder]"
            )
            .forEach(
                el => {


                    el.placeholder =
                        lang === "en"
                            ?
                            el.dataset.enPlaceholder
                            :
                            el.dataset.vnPlaceholder;


                }
            );



        renderAll();


    }






    window.changeLanguage =
        function (lang) {

            localStorage.setItem(
                "language",
                lang
            );


            updateLanguage();

        };








    /* =========================
       RENDER ALL
    ========================= */


    function renderAll() {


        renderWeekCalendar();


        renderWeeklySchedule();


        renderMonth();


        renderStreak();


        renderStudyTime();


        updateLanguage();


    }






    /* =========================
       BUTTON SAVE EDIT
    ========================= */


    const addButton =
        document.querySelector(
            "button[onclick='addSchedule()']"
        );



    if (addButton) {


        addButton.onclick =
            function () {


                if (editId) {

                    updateSchedule();

                }
                else {

                    addSchedule();

                }


            };


    }






    renderAll();



});
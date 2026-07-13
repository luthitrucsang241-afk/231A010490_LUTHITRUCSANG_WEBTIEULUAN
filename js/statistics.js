document.addEventListener("DOMContentLoaded", function () {


    loadStatistics();


    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");


    createYearOptions();


    yearSelect.addEventListener("change", function(){

        renderMonthlyChart();

    });



    monthSelect.addEventListener("change", function(){

        renderMonthlyChart();

    });


});





/*
==============================
GET CALENDAR DATA
==============================
*/


function getCalendarData(){


    let data = localStorage.getItem("calendarData");


    if(!data){

        return [];

    }


    try{

        return JSON.parse(data);

    }

    catch{

        return [];

    }


}





/*
==============================
MAIN LOAD
==============================
*/


function loadStatistics(){


    let data = getCalendarData();


    renderDailyChart(data);


    renderDayStatistics(data);


    createYearOptions();


    renderMonthlyChart();


}





/*
==============================
VERTICAL DAILY CHART
==============================
*/


function renderDailyChart(data){


    const chart =
    document.getElementById("dailyChart");


    const empty =
    document.getElementById("dailyEmpty");



    chart.innerHTML="";



    if(data.length===0){


        chart.style.display="none";

        empty.style.display="block";


        return;

    }



    chart.style.display="flex";

    empty.style.display="none";





    data.forEach(item=>{


        let time =
        Number(item.studyTime)||0;



        let box =
        document.createElement("div");


        box.className="vertical-item";



        let bar =
        document.createElement("div");


        bar.className="vertical-bar";



        let height =
        Math.min(time*30,220);



        bar.style.height =
        height+"px";



        let label =
        document.createElement("span");


        label.className="chart-label";


        let date =
        new Date(item.date);



        label.innerHTML =
        date.getDate()
        +
        "/"
        +
        (date.getMonth()+1);



        let hour =
        document.createElement("small");


        hour.innerHTML =
        time+"h";



        box.appendChild(bar);

        box.appendChild(label);

        box.appendChild(hour);



        chart.appendChild(box);



    });



}






/*
==============================
STUDY DAYS STATISTICS
==============================
*/


function renderDayStatistics(data){


    const chart =
    document.getElementById("dayChart");


    const empty =
    document.getElementById("dayEmpty");



    chart.innerHTML="";



    if(data.length===0){


        chart.style.display="none";

        empty.style.display="block";


        return;

    }



    empty.style.display="none";

    chart.style.display="flex";



    let now =
    new Date();



    let week =
    0;



    let month =
    0;



    data.forEach(item=>{


        let d =
        new Date(item.date);



        let diff =
        (now-d)
        /
        (1000*60*60*24);



        if(diff<=7){

            week++;

        }



        if(
            d.getMonth()
            ===
            now.getMonth()
            &&
            d.getFullYear()
            ===
            now.getFullYear()
        ){

            month++;

        }



    });



    createHorizontalBar(
        chart,
        "This Week",
        week
    );


    createHorizontalBar(
        chart,
        "This Month",
        month
    );



}





function createHorizontalBar(
    parent,
    title,
    value
){



    let item =
    document.createElement("div");


    item.className =
    "horizontal-item";



    let max =
    Math.max(value,30);



    item.innerHTML = `


    <div class="horizontal-title">

        <span>${title}</span>

        <span>${value} days</span>

    </div>


    <div class="horizontal-bar">

        <div class="horizontal-fill"
        style="width:${value/max*100}%">

        </div>

    </div>


    `;



    parent.appendChild(item);



}







/*
==============================
YEAR SELECT
==============================
*/


function createYearOptions(){


    const select =
    document.getElementById("yearSelect");


    if(!select) return;



    select.innerHTML="";



    let data =
    getCalendarData();



    let years =
    new Set();



    data.forEach(item=>{


        let y =
        new Date(item.date)
        .getFullYear();


        years.add(y);


    });



    if(years.size===0){


        let year =
        new Date()
        .getFullYear();



        years.add(year);


    }




    years.forEach(y=>{


        let option =
        document.createElement("option");


        option.value=y;


        option.textContent=y;


        select.appendChild(option);


    });



}






/*
==============================
MONTH YEAR CHART
==============================
*/


function renderMonthlyChart(){


    const chart =
    document.getElementById("monthChart");


    const empty =
    document.getElementById("monthEmpty");



    chart.innerHTML="";



    let data =
    getCalendarData();



    let year =
    Number(
        document.getElementById("yearSelect").value
    );



    let month =
    document.getElementById("monthSelect").value;



    let filtered =
    data.filter(item=>{


        let d =
        new Date(item.date);



        if(
            d.getFullYear()
            !==
            year
        ){

            return false;

        }



        if(month && 
        d.getMonth()+1 !== Number(month)){

            return false;

        }



        return true;



    });





    if(filtered.length===0){


        chart.style.display="none";

        empty.style.display="block";


        return;


    }



    chart.style.display="grid";

    empty.style.display="none";




    let months = {};



    filtered.forEach(item=>{


        let d =
        new Date(item.date);



        let m =
        d.getMonth()+1;



        months[m] =
        (months[m]||0)
        +
        Number(item.studyTime);



    });




    Object.keys(months)
    .forEach(m=>{


        let box =
        document.createElement("div");


        box.className =
        "month-item";



        let h =
        months[m];



        let height =
        Math.min(h*2,120);



        box.innerHTML=`

        <div>
        ${getMonthName(m)}
        </div>


        <div class="month-bar">

        <span style="
        height:${height}px">
        </span>

        </div>


        <div>
        ${h} hours
        </div>

        `;



        chart.appendChild(box);



    });



}






function getMonthName(month){


    let lang =
    localStorage.getItem("language")
    ||
    "vi";



    const vn=[
        "",
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
    ];



    const en=[
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];



    return lang==="en"
    ?
    en[month]
    :
    vn[month];


}
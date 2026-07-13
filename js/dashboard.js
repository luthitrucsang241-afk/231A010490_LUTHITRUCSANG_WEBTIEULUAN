document.addEventListener("DOMContentLoaded",()=>{


function formatTime(seconds){

    if(isNaN(seconds))
        return "00:00";


    let min=Math.floor(seconds/60);

    let sec=Math.floor(seconds%60);


    return String(min).padStart(2,"0")
    +":"
    +String(sec).padStart(2,"0");

}




// ================= WHITE NOISE =================


const noiseSelect=document.getElementById("noiseSelect");

const noisePlayer=document.getElementById("noisePlayer");

const noisePlay=document.getElementById("noisePlay");

const noisePause=document.getElementById("noisePause");

const noiseStop=document.getElementById("noiseStop");

const noiseBack=document.getElementById("noiseBack");

const noiseForward=document.getElementById("noiseForward");

const noiseVolumeDown=document.getElementById("noiseVolumeDown");

const noiseVolumeUp=document.getElementById("noiseVolumeUp");

const noiseProgress=document.getElementById("noiseProgress");

const noiseVolume=document.getElementById("noiseVolume");

const noiseVolumeValue=document.getElementById("noiseVolumeValue");

const noiseSpeed=document.getElementById("noiseSpeed");

const noiseCurrent=document.getElementById("noiseCurrent");

const noiseDuration=document.getElementById("noiseDuration");



if(noisePlayer){

    noisePlayer.loop=true;

    noisePlayer.volume=0.75;

}



if(noiseSelect){


noiseSelect.onchange=()=>{


    noisePlayer.src=noiseSelect.value;

    noisePlayer.loop=true;

    noisePlayer.play();


    localStorage.setItem(
        "noise",
        noiseSelect.value
    );


};



let savedNoise=localStorage.getItem("noise");


if(savedNoise){

    noiseSelect.value=savedNoise;

    noisePlayer.src=savedNoise;

}


}



if(noisePlay){

noisePlay.onclick=()=>{

    noisePlayer.play();

};

}



if(noisePause){

noisePause.onclick=()=>{

    noisePlayer.pause();

};

}



if(noiseStop){

noiseStop.onclick=()=>{

    noisePlayer.pause();

    noisePlayer.currentTime=0;

};

}



if(noiseBack){

noiseBack.onclick=()=>{

    noisePlayer.currentTime-=10;

};

}



if(noiseForward){

noiseForward.onclick=()=>{

    noisePlayer.currentTime+=10;

};

}



if(noiseVolumeDown){

noiseVolumeDown.onclick=()=>{


    noisePlayer.volume=Math.max(
        0,
        noisePlayer.volume-0.1
    );


    noiseVolume.value=
    noisePlayer.volume*100;


    noiseVolumeValue.innerHTML=
    Math.round(
        noisePlayer.volume*100
    )+"%";


};

}



if(noiseVolumeUp){

noiseVolumeUp.onclick=()=>{


    noisePlayer.volume=Math.min(
        1,
        noisePlayer.volume+0.1
    );


    noiseVolume.value=
    noisePlayer.volume*100;


    noiseVolumeValue.innerHTML=
    Math.round(
        noisePlayer.volume*100
    )+"%";


};

}




if(noiseVolume){

noiseVolume.oninput=()=>{


    noisePlayer.volume=
    noiseVolume.value/100;


    noiseVolumeValue.innerHTML=
    noiseVolume.value+"%";


};

}




if(noiseSpeed){

noiseSpeed.onchange=()=>{


    noisePlayer.playbackRate=
    noiseSpeed.value;


};

}




if(noisePlayer){


noisePlayer.onloadedmetadata=()=>{


    noiseDuration.innerHTML=
    formatTime(
        noisePlayer.duration
    );


};



noisePlayer.ontimeupdate=()=>{


    noiseCurrent.innerHTML=
    formatTime(
        noisePlayer.currentTime
    );


    noiseProgress.value=
    (
        noisePlayer.currentTime/
        noisePlayer.duration
    )*100;


};


}




if(noiseProgress){

noiseProgress.oninput=()=>{


    noisePlayer.currentTime=
    (
        noiseProgress.value/100
    )
    *
    noisePlayer.duration;


};

}









// ================= VIDEO =================


const videoSelect=document.getElementById("videoSelect");

const studyVideo=document.getElementById("studyVideo");

const youtubeVideo=document.getElementById("youtubeVideo");


const videoPlay=document.getElementById("videoPlay");

const videoPause=document.getElementById("videoPause");

const videoStop=document.getElementById("videoStop");

const videoBack=document.getElementById("videoBack");

const videoForward=document.getElementById("videoForward");


const videoVolume=document.getElementById("videoVolume");


const videoVolumeDown=
document.getElementById("videoVolumeDown");


const videoVolumeUp=
document.getElementById("videoVolumeUp");


const videoSpeed=document.getElementById("videoSpeed");

const videoProgress=document.getElementById("videoProgress");


const videoFullscreen=
document.getElementById("videoFullscreen");


const videoPip=
document.getElementById("videoPip");


const videoCurrent=
document.getElementById("videoCurrent");


const videoDuration=
document.getElementById("videoDuration");





if(studyVideo){

    studyVideo.loop=true;

    studyVideo.volume=1;

}




if(videoSelect){


videoSelect.onchange=()=>{


if(videoSelect.value==="youtube"){


    studyVideo.pause();

    studyVideo.style.display="none";

    youtubeVideo.style.display="block";


    youtubeVideo.src=
    "https://www.youtube.com/embed/jfKfPfyJRdk";


}

else{


    youtubeVideo.src="";


    youtubeVideo.style.display="none";


    studyVideo.style.display="block";


    studyVideo.play();


}



};



}







if(videoPlay){

videoPlay.onclick=()=>{

    studyVideo.play();

};

}



if(videoPause){

videoPause.onclick=()=>{

    studyVideo.pause();

};

}



if(videoStop){

videoStop.onclick=()=>{

    studyVideo.pause();

    studyVideo.currentTime=0;

};

}



if(videoBack){

videoBack.onclick=()=>{

    studyVideo.currentTime-=10;

};

}



if(videoForward){

videoForward.onclick=()=>{

    studyVideo.currentTime+=10;

};

}







// VIDEO VOLUME BUTTON


if(videoVolumeDown){


videoVolumeDown.onclick=()=>{


    studyVideo.volume=
    Math.max(
        0,
        studyVideo.volume-0.1
    );


    videoVolume.value=
    studyVideo.volume*100;


};


}




if(videoVolumeUp){


videoVolumeUp.onclick=()=>{


    studyVideo.volume=
    Math.min(
        1,
        studyVideo.volume+0.1
    );


    videoVolume.value=
    studyVideo.volume*100;


};


}






if(videoVolume){


videoVolume.oninput=()=>{


    studyVideo.volume=
    videoVolume.value/100;


};


}





if(videoSpeed){


videoSpeed.onchange=()=>{


    studyVideo.playbackRate=
    videoSpeed.value;


};


}





if(videoProgress){


videoProgress.oninput=()=>{


    studyVideo.currentTime=
    (
        videoProgress.value/100
    )
    *
    studyVideo.duration;


};


}





if(studyVideo){



studyVideo.onloadedmetadata=()=>{


    videoDuration.innerHTML=
    formatTime(
        studyVideo.duration
    );


};





studyVideo.ontimeupdate=()=>{


    videoCurrent.innerHTML=
    formatTime(
        studyVideo.currentTime
    );



    videoProgress.value=
    (
        studyVideo.currentTime/
        studyVideo.duration
    )*100;


};



}





if(videoFullscreen){


videoFullscreen.onclick=()=>{


    studyVideo.requestFullscreen();


};


}






if(videoPip){


videoPip.onclick=async()=>{


try{


await studyVideo.requestPictureInPicture();


}
catch(e){}


};


}



});
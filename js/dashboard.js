document.addEventListener("DOMContentLoaded", () => {


    // =========================================================
    // HÀM ĐỊNH DẠNG THỜI GIAN
    // =========================================================


    function formatTime(seconds) {


        if (isNaN(seconds) || !isFinite(seconds)) {

            return "00:00";

        }


        let min =
            Math.floor(seconds / 60);


        let sec =
            Math.floor(seconds % 60);


        return String(min).padStart(2, "0")
            + ":"
            + String(sec).padStart(2, "0");


    }





    // =========================================================
    // WEATHER
    // =========================================================


    const weather =
        document.getElementById("weather");


    if (weather) {


        weather.innerHTML =
            "Đang tải thời tiết...";


        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current=temperature_2m,weather_code&timezone=Asia%2FHo_Chi_Minh"
        )


        .then(response => {


            if (!response.ok) {

                throw new Error(
                    "Weather API Error"
                );

            }


            return response.json();


        })


        .then(data => {


            if (
                !data.current ||
                typeof data.current.temperature_2m === "undefined"
            ) {

                throw new Error(
                    "Weather data not found"
                );

            }


            const temp =
                data.current.temperature_2m;


            const code =
                data.current.weather_code;


            let status =
                "☀️ Trời quang";



            if (code === 0) {

                status =
                    "☀️ Trời quang";

            }


            else if (
                code === 1 ||
                code === 2
            ) {

                status =
                    "🌤 Có mây";

            }


            else if (code === 3) {

                status =
                    "☁️ Nhiều mây";

            }


            else if (
                code === 45 ||
                code === 48
            ) {

                status =
                    "🌫 Có sương mù";

            }


            else if (
                code >= 51 &&
                code <= 57
            ) {

                status =
                    "🌦 Mưa phùn";

            }


            else if (
                code >= 61 &&
                code <= 67
            ) {

                status =
                    "🌧 Có mưa";

            }


            else if (
                code >= 71 &&
                code <= 77
            ) {

                status =
                    "❄️ Có tuyết";

            }


            else if (
                code >= 80 &&
                code <= 82
            ) {

                status =
                    "🌦 Mưa rào";

            }


            else if (
                code >= 95 &&
                code <= 99
            ) {

                status =
                    "⛈ Có dông";

            }



            weather.innerHTML =
                `${status}<br>${temp}°C`;


        })


        .catch(error => {


            console.error(
                "Không thể tải dữ liệu thời tiết:",
                error
            );


            weather.innerHTML =
                "⚠️ Không thể tải thời tiết";


        });


    }






    // =========================================================
    // WHITE NOISE / ÂM THANH THƯ GIÃN
    // =========================================================


    const noiseSelect =
        document.getElementById("noiseSelect");


    const noisePlayer =
        document.getElementById("noisePlayer");


    const noisePlay =
        document.getElementById("noisePlay");


    const noisePause =
        document.getElementById("noisePause");


    const noiseStop =
        document.getElementById("noiseStop");


    const noiseBack =
        document.getElementById("noiseBack");


    const noiseForward =
        document.getElementById("noiseForward");


    const noiseVolumeDown =
        document.getElementById("noiseVolumeDown");


    const noiseVolumeUp =
        document.getElementById("noiseVolumeUp");


    const noiseProgress =
        document.getElementById("noiseProgress");


    const noiseVolume =
        document.getElementById("noiseVolume");


    const noiseVolumeValue =
        document.getElementById("noiseVolumeValue");


    const noiseSpeed =
        document.getElementById("noiseSpeed");


    const noiseCurrent =
        document.getElementById("noiseCurrent");


    const noiseDuration =
        document.getElementById("noiseDuration");





    // =========================================================
    // CÀI ĐẶT MẶC ĐỊNH
    // =========================================================


    if (noisePlayer) {

        noisePlayer.loop = true;

        noisePlayer.volume = 0.75;

        noisePlayer.playbackRate = 1;

    }





    // =========================================================
    // CHỌN ÂM THANH
    // =========================================================


    if (noiseSelect && noisePlayer) {


        noiseSelect.addEventListener(
            "change",
            () => {


                const selectedSound =
                    noiseSelect.value;


                if (!selectedSound) {


                    noisePlayer.pause();


                    noisePlayer.removeAttribute(
                        "src"
                    );


                    noisePlayer.load();


                    return;


                }



                noisePlayer.src =
                    selectedSound;


                noisePlayer.load();


                noisePlayer.play()
                    .catch(error => {


                        console.log(
                            "Trình duyệt yêu cầu người dùng bấm Phát:",
                            error
                        );


                    });



                localStorage.setItem(
                    "noise",
                    selectedSound
                );


            }
        );




        const savedNoise =
            localStorage.getItem("noise");



        if (savedNoise) {


            const savedOption =
                noiseSelect.querySelector(
                    `option[value="${CSS.escape(savedNoise)}"]`
                );


            if (savedOption) {


                noiseSelect.value =
                    savedNoise;


                noisePlayer.src =
                    savedNoise;


            }


        }


    }






    // =========================================================
    // PHÁT
    // =========================================================


    if (noisePlay && noisePlayer) {


        noisePlay.onclick = () => {


            if (!noisePlayer.src) {


                if (noiseSelect) {


                    noiseSelect.focus();


                }


                return;


            }


            noisePlayer.play();


        };


    }






    // =========================================================
    // TẠM DỪNG
    // =========================================================


    if (noisePause && noisePlayer) {


        noisePause.onclick = () => {


            noisePlayer.pause();


        };


    }






    // =========================================================
    // DỪNG
    // =========================================================


    if (noiseStop && noisePlayer) {


        noiseStop.onclick = () => {


            noisePlayer.pause();


            noisePlayer.currentTime =
                0;


        };


    }






    // =========================================================
    // TUA LÙI 10 GIÂY
    // =========================================================


    if (noiseBack && noisePlayer) {


        noiseBack.onclick = () => {


            noisePlayer.currentTime =
                Math.max(
                    0,
                    noisePlayer.currentTime - 10
                );


        };


    }






    // =========================================================
    // TUA TIẾN 10 GIÂY
    // =========================================================


    if (noiseForward && noisePlayer) {


        noiseForward.onclick = () => {


            if (
                isFinite(
                    noisePlayer.duration
                )
            ) {


                noisePlayer.currentTime =
                    Math.min(
                        noisePlayer.duration,
                        noisePlayer.currentTime + 10
                    );


            }


        };


    }






    // =========================================================
    // GIẢM ÂM LƯỢNG
    // =========================================================


    if (
        noiseVolumeDown &&
        noisePlayer
    ) {


        noiseVolumeDown.onclick = () => {


            let currentVolume =
                Math.max(
                    0,
                    noisePlayer.volume - 0.1
                );


            noisePlayer.volume =
                currentVolume;



            if (noiseVolume) {


                noiseVolume.value =
                    Math.round(
                        currentVolume * 100
                    );


            }



            if (noiseVolumeValue) {


                noiseVolumeValue.innerHTML =
                    Math.round(
                        currentVolume * 100
                    ) + "%";


            }


        };


    }






    // =========================================================
    // TĂNG ÂM LƯỢNG
    // =========================================================


    if (
        noiseVolumeUp &&
        noisePlayer
    ) {


        noiseVolumeUp.onclick = () => {


            let currentVolume =
                Math.min(
                    1,
                    noisePlayer.volume + 0.1
                );


            noisePlayer.volume =
                currentVolume;



            if (noiseVolume) {


                noiseVolume.value =
                    Math.round(
                        currentVolume * 100
                    );


            }



            if (noiseVolumeValue) {


                noiseVolumeValue.innerHTML =
                    Math.round(
                        currentVolume * 100
                    ) + "%";


            }


        };


    }






    // =========================================================
    // THANH ÂM LƯỢNG
    // =========================================================


    if (
        noiseVolume &&
        noisePlayer
    ) {


        noiseVolume.oninput = () => {


            const volume =
                Number(
                    noiseVolume.value
                ) / 100;


            noisePlayer.volume =
                volume;



            if (noiseVolumeValue) {


                noiseVolumeValue.innerHTML =
                    noiseVolume.value + "%";


            }


        };


    }






    // =========================================================
    // TỐC ĐỘ PHÁT
    // =========================================================


    if (
        noiseSpeed &&
        noisePlayer
    ) {


        noiseSpeed.onchange = () => {


            noisePlayer.playbackRate =
                Number(
                    noiseSpeed.value
                );


            localStorage.setItem(
                "noiseSpeed",
                noiseSpeed.value
            );


        };



        const savedSpeed =
            localStorage.getItem(
                "noiseSpeed"
            );



        if (savedSpeed) {


            noiseSpeed.value =
                savedSpeed;


            noisePlayer.playbackRate =
                Number(savedSpeed);


        }


    }






    // =========================================================
    // KHI ÂM THANH TẢI XONG
    // =========================================================


    if (noisePlayer) {


        noisePlayer.onloadedmetadata =
            () => {


                if (noiseDuration) {


                    noiseDuration.innerHTML =
                        formatTime(
                            noisePlayer.duration
                        );


                }


            };



        noisePlayer.ontimeupdate =
            () => {


                if (noiseCurrent) {


                    noiseCurrent.innerHTML =
                        formatTime(
                            noisePlayer.currentTime
                        );


                }



                if (
                    noiseProgress &&
                    noisePlayer.duration &&
                    isFinite(
                        noisePlayer.duration
                    )
                ) {


                    noiseProgress.value =
                        (
                            noisePlayer.currentTime /
                            noisePlayer.duration
                        ) * 100;


                }


            };


    }






    // =========================================================
    // THANH TIẾN TRÌNH ÂM THANH
    // =========================================================


    if (
        noiseProgress &&
        noisePlayer
    ) {


        noiseProgress.oninput = () => {


            if (
                noisePlayer.duration &&
                isFinite(
                    noisePlayer.duration
                )
            ) {


                noisePlayer.currentTime =
                    (
                        Number(
                            noiseProgress.value
                        ) / 100
                    )
                    *
                    noisePlayer.duration;


            }


        };


    }







    // =========================================================
    // VIDEO
    // =========================================================


    const videoSelect =
        document.getElementById(
            "videoSelect"
        );


    const studyVideo =
        document.getElementById(
            "studyVideo"
        );


    const youtubeVideo =
        document.getElementById(
            "youtubeVideo"
        );


    const videoPlay =
        document.getElementById(
            "videoPlay"
        );


    const videoPause =
        document.getElementById(
            "videoPause"
        );


    const videoStop =
        document.getElementById(
            "videoStop"
        );


    const videoBack =
        document.getElementById(
            "videoBack"
        );


    const videoForward =
        document.getElementById(
            "videoForward"
        );


    const videoVolume =
        document.getElementById(
            "videoVolume"
        );


    const videoVolumeDown =
        document.getElementById(
            "videoVolumeDown"
        );


    const videoVolumeUp =
        document.getElementById(
            "videoVolumeUp"
        );


    const videoSpeed =
        document.getElementById(
            "videoSpeed"
        );


    const videoProgress =
        document.getElementById(
            "videoProgress"
        );


    const videoFullscreen =
        document.getElementById(
            "videoFullscreen"
        );


    const videoPip =
        document.getElementById(
            "videoPip"
        );


    const videoCurrent =
        document.getElementById(
            "videoCurrent"
        );


    const videoDuration =
        document.getElementById(
            "videoDuration"
        );






    if (studyVideo) {


        studyVideo.loop = true;


        studyVideo.volume = 1;


        studyVideo.playbackRate = 1;


    }






    // =========================================================
    // CHỌN VIDEO
    // =========================================================


    if (videoSelect) {


        videoSelect.onchange = () => {


            if (
                videoSelect.value ===
                "youtube"
            ) {


                if (studyVideo) {


                    studyVideo.pause();


                    studyVideo.style.display =
                        "none";


                }



                if (youtubeVideo) {


                    youtubeVideo.style.display =
                        "block";


                    youtubeVideo.src =
                        "https://www.youtube.com/embed/jfKfPfyJRdk";


                }


            }


            else {


                if (youtubeVideo) {


                    youtubeVideo.src =
                        "";


                    youtubeVideo.style.display =
                        "none";


                }



                if (studyVideo) {


                    studyVideo.style.display =
                        "block";


                }


            }


        };


    }






    // =========================================================
    // VIDEO PLAY
    // =========================================================


    if (
        videoPlay &&
        studyVideo
    ) {


        videoPlay.onclick = () =>
            studyVideo.play();


    }






    // =========================================================
    // VIDEO PAUSE
    // =========================================================


    if (
        videoPause &&
        studyVideo
    ) {


        videoPause.onclick = () =>
            studyVideo.pause();


    }






    // =========================================================
    // VIDEO STOP
    // =========================================================


    if (
        videoStop &&
        studyVideo
    ) {


        videoStop.onclick = () => {


            studyVideo.pause();


            studyVideo.currentTime =
                0;


        };


    }






    // =========================================================
    // VIDEO BACK
    // =========================================================


    if (
        videoBack &&
        studyVideo
    ) {


        videoBack.onclick = () => {


            studyVideo.currentTime =
                Math.max(
                    0,
                    studyVideo.currentTime - 10
                );


        };


    }






    // =========================================================
    // VIDEO FORWARD
    // =========================================================


    if (
        videoForward &&
        studyVideo
    ) {


        videoForward.onclick = () => {


            if (
                isFinite(
                    studyVideo.duration
                )
            ) {


                studyVideo.currentTime =
                    Math.min(
                        studyVideo.duration,
                        studyVideo.currentTime + 10
                    );


            }


        };


    }






    // =========================================================
    // VIDEO VOLUME
    // =========================================================


    if (
        videoVolume &&
        studyVideo
    ) {


        videoVolume.oninput = () => {


            studyVideo.volume =
                Number(
                    videoVolume.value
                ) / 100;


        };


    }






    // =========================================================
    // VIDEO VOLUME DOWN
    // =========================================================


    if (
        videoVolumeDown &&
        studyVideo
    ) {


        videoVolumeDown.onclick = () => {


            let currentVolume =
                Math.max(
                    0,
                    studyVideo.volume - 0.1
                );


            studyVideo.volume =
                currentVolume;


            if (videoVolume) {


                videoVolume.value =
                    Math.round(
                        currentVolume * 100
                    );


            }


        };


    }






    // =========================================================
    // VIDEO VOLUME UP
    // =========================================================


    if (
        videoVolumeUp &&
        studyVideo
    ) {


        videoVolumeUp.onclick = () => {


            let currentVolume =
                Math.min(
                    1,
                    studyVideo.volume + 0.1
                );


            studyVideo.volume =
                currentVolume;


            if (videoVolume) {


                videoVolume.value =
                    Math.round(
                        currentVolume * 100
                    );


            }


        };


    }






    // =========================================================
    // VIDEO SPEED
    // =========================================================


    if (
        videoSpeed &&
        studyVideo
    ) {


        videoSpeed.onchange = () => {


            studyVideo.playbackRate =
                Number(
                    videoSpeed.value
                );


        };


    }






    // =========================================================
    // VIDEO METADATA
    // =========================================================


    if (studyVideo) {


        studyVideo.onloadedmetadata =
            () => {


                if (videoDuration) {


                    videoDuration.innerHTML =
                        formatTime(
                            studyVideo.duration
                        );


                }


            };



        studyVideo.ontimeupdate =
            () => {


                if (videoCurrent) {


                    videoCurrent.innerHTML =
                        formatTime(
                            studyVideo.currentTime
                        );


                }



                if (
                    videoProgress &&
                    studyVideo.duration &&
                    isFinite(
                        studyVideo.duration
                    )
                ) {


                    videoProgress.value =
                        (
                            studyVideo.currentTime /
                            studyVideo.duration
                        ) * 100;


                }


            };


    }






    // =========================================================
    // VIDEO PROGRESS
    // =========================================================


    if (
        videoProgress &&
        studyVideo
    ) {


        videoProgress.oninput = () => {


            if (
                studyVideo.duration &&
                isFinite(
                    studyVideo.duration
                )
            ) {


                studyVideo.currentTime =
                    (
                        Number(
                            videoProgress.value
                        ) / 100
                    )
                    *
                    studyVideo.duration;


            }


        };


    }






    // =========================================================
    // FULLSCREEN
    // =========================================================


    if (
        videoFullscreen &&
        studyVideo
    ) {


        videoFullscreen.onclick = () => {


            if (
                studyVideo.requestFullscreen
            ) {


                studyVideo.requestFullscreen();


            }


        };


    }






    // =========================================================
    // PICTURE IN PICTURE
    // =========================================================


    if (
        videoPip &&
        studyVideo
    ) {


        videoPip.onclick = async () => {


            try {


                if (
                    document.pictureInPictureElement
                ) {


                    await document.exitPictureInPicture();


                    return;


                }



                if (
                    document.pictureInPictureEnabled &&
                    studyVideo.requestPictureInPicture
                ) {


                    await studyVideo.requestPictureInPicture();


                }


            }


            catch (error) {


                console.error(
                    "Picture in Picture không khả dụng:",
                    error
                );


            }


        };


    }


});
document.addEventListener("DOMContentLoaded", () => {


    // ================= HÀM ĐỊNH DẠNG THỜI GIAN =================

    function formatTime(seconds) {

        if (isNaN(seconds)) {
            return "00:00";
        }


        let min = Math.floor(seconds / 60);

        let sec = Math.floor(seconds % 60);


        return String(min).padStart(2, "0")
            + ":"
            + String(sec).padStart(2, "0");

    }





    // ================= WEATHER =================
    // Vị trí: Phần tải và hiển thị thời tiết Dashboard

    const weather = document.getElementById("weather");


    if (weather) {

        // Hiển thị trạng thái đang tải trong lúc chờ API
        weather.innerHTML = "Đang tải thời tiết...";


        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current=temperature_2m,weather_code&timezone=Asia%2FHo_Chi_Minh"
        )

        .then(response => {

            if (!response.ok) {
                throw new Error("Weather API Error");
            }

            return response.json();

        })

        .then(data => {

            // Kiểm tra dữ liệu API có tồn tại hay không
            if (
                !data.current ||
                typeof data.current.temperature_2m === "undefined"
            ) {

                throw new Error("Weather data not found");

            }


            const temp =
                data.current.temperature_2m;


            const code =
                data.current.weather_code;


            let status =
                "☀️ Trời quang";


            // Trời quang
            if (code === 0) {

                status = "☀️ Trời quang";

            }

            // Có mây nhẹ
            else if (code === 1 || code === 2) {

                status = "🌤 Có mây";

            }

            // Nhiều mây
            else if (code === 3) {

                status = "☁️ Nhiều mây";

            }

            // Sương mù
            else if (
                code === 45 ||
                code === 48
            ) {

                status = "🌫 Có sương mù";

            }

            // Mưa phùn
            else if (
                code >= 51 &&
                code <= 57
            ) {

                status = "🌦 Mưa phùn";

            }

            // Mưa
            else if (
                code >= 61 &&
                code <= 67
            ) {

                status = "🌧 Có mưa";

            }

            // Tuyết
            else if (
                code >= 71 &&
                code <= 77
            ) {

                status = "❄️ Có tuyết";

            }

            // Mưa rào
            else if (
                code >= 80 &&
                code <= 82
            ) {

                status = "🌦 Mưa rào";

            }

            // Mưa lớn / dông
            else if (
                code >= 95 &&
                code <= 99
            ) {

                status = "⛈ Có dông";

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





    // ================= WHITE NOISE =================

    const noiseSelect = document.getElementById("noiseSelect");

    const noisePlayer = document.getElementById("noisePlayer");

    const noisePlay = document.getElementById("noisePlay");

    const noisePause = document.getElementById("noisePause");

    const noiseStop = document.getElementById("noiseStop");

    const noiseBack = document.getElementById("noiseBack");

    const noiseForward = document.getElementById("noiseForward");

    const noiseVolumeDown = document.getElementById("noiseVolumeDown");

    const noiseVolumeUp = document.getElementById("noiseVolumeUp");

    const noiseProgress = document.getElementById("noiseProgress");

    const noiseVolume = document.getElementById("noiseVolume");

    const noiseVolumeValue = document.getElementById("noiseVolumeValue");

    const noiseSpeed = document.getElementById("noiseSpeed");

    const noiseCurrent = document.getElementById("noiseCurrent");

    const noiseDuration = document.getElementById("noiseDuration");





    if (noisePlayer) {

        noisePlayer.loop = true;

        noisePlayer.volume = 0.75;

    }





    if (noiseSelect) {

        noiseSelect.onchange = () => {

            noisePlayer.src =
                noiseSelect.value;


            noisePlayer.play();


            localStorage.setItem(
                "noise",
                noiseSelect.value
            );

        };



        let saved =
            localStorage.getItem("noise");


        if (saved) {

            noiseSelect.value = saved;

            noisePlayer.src = saved;

        }

    }





    if (noisePlay) {

        noisePlay.onclick = () =>
            noisePlayer.play();

    }





    if (noisePause) {

        noisePause.onclick = () =>
            noisePlayer.pause();

    }





    if (noiseStop) {

        noiseStop.onclick = () => {

            noisePlayer.pause();

            noisePlayer.currentTime = 0;

        };

    }





    if (noiseBack) {

        noiseBack.onclick = () => {

            noisePlayer.currentTime =
                Math.max(
                    0,
                    noisePlayer.currentTime - 10
                );

        };

    }





    if (noiseForward) {

        noiseForward.onclick = () => {

            noisePlayer.currentTime += 10;

        };

    }





    if (noiseVolumeDown) {

        noiseVolumeDown.onclick = () => {

            let currentVolume =
                Math.max(
                    0,
                    noisePlayer.volume - 0.1
                );


            noisePlayer.volume =
                currentVolume;


            noiseVolume.value =
                Math.round(currentVolume * 100);


            noiseVolumeValue.innerHTML =
                noiseVolume.value + "%";

        };

    }





    if (noiseVolumeUp) {

        noiseVolumeUp.onclick = () => {

            let currentVolume =
                Math.min(
                    1,
                    noisePlayer.volume + 0.1
                );


            noisePlayer.volume =
                currentVolume;


            noiseVolume.value =
                Math.round(currentVolume * 100);


            noiseVolumeValue.innerHTML =
                noiseVolume.value + "%";

        };

    }





    if (noiseVolume) {

        noiseVolume.oninput = () => {

            noisePlayer.volume =
                noiseVolume.value / 100;


            noiseVolumeValue.innerHTML =
                noiseVolume.value + "%";

        };

    }





    if (noiseSpeed) {

        noiseSpeed.onchange = () => {

            noisePlayer.playbackRate =
                Number(noiseSpeed.value);

        };

    }





    if (noisePlayer) {

        noisePlayer.onloadedmetadata = () => {

            noiseDuration.innerHTML =
                formatTime(
                    noisePlayer.duration
                );

        };




        noisePlayer.ontimeupdate = () => {

            noiseCurrent.innerHTML =
                formatTime(
                    noisePlayer.currentTime
                );


            if (noisePlayer.duration) {

                noiseProgress.value =
                    (
                        noisePlayer.currentTime /
                        noisePlayer.duration
                    ) * 100;

            }

        };

    }





    if (noiseProgress) {

        noiseProgress.oninput = () => {

            noisePlayer.currentTime =
                (
                    noiseProgress.value / 100
                )
                *
                noisePlayer.duration;

        };

    }





    // ================= VIDEO =================

    const videoSelect =
        document.getElementById("videoSelect");

    const studyVideo =
        document.getElementById("studyVideo");

    const youtubeVideo =
        document.getElementById("youtubeVideo");

    const videoPlay =
        document.getElementById("videoPlay");

    const videoPause =
        document.getElementById("videoPause");

    const videoStop =
        document.getElementById("videoStop");

    const videoBack =
        document.getElementById("videoBack");

    const videoForward =
        document.getElementById("videoForward");

    const videoVolume =
        document.getElementById("videoVolume");

    const videoVolumeDown =
        document.getElementById("videoVolumeDown");

    const videoVolumeUp =
        document.getElementById("videoVolumeUp");

    const videoSpeed =
        document.getElementById("videoSpeed");

    const videoProgress =
        document.getElementById("videoProgress");

    const videoFullscreen =
        document.getElementById("videoFullscreen");

    const videoPip =
        document.getElementById("videoPip");

    const videoCurrent =
        document.getElementById("videoCurrent");

    const videoDuration =
        document.getElementById("videoDuration");





    if (studyVideo) {

        studyVideo.loop = true;

    }





    if (videoSelect) {

        videoSelect.onchange = () => {


            if (videoSelect.value === "youtube") {


                studyVideo.pause();

                studyVideo.style.display =
                    "none";


                youtubeVideo.style.display =
                    "block";


                youtubeVideo.src =
                    "https://www.youtube.com/embed/jfKfPfyJRdk";


            }

            else {


                youtubeVideo.src =
                    "";


                youtubeVideo.style.display =
                    "none";


                studyVideo.style.display =
                    "block";

            }

        };

    }





    if (videoPlay) {

        videoPlay.onclick = () =>
            studyVideo.play();

    }





    if (videoPause) {

        videoPause.onclick = () =>
            studyVideo.pause();

    }





    if (videoStop) {

        videoStop.onclick = () => {

            studyVideo.pause();

            studyVideo.currentTime = 0;

        };

    }





    if (videoBack) {

        videoBack.onclick = () => {

            studyVideo.currentTime -= 10;

        };

    }





    if (videoForward) {

        videoForward.onclick = () => {

            studyVideo.currentTime += 10;

        };

    }





    if (videoVolume) {

        videoVolume.oninput = () => {

            studyVideo.volume =
                videoVolume.value / 100;

        };

    }





    if (videoVolumeDown) {

        videoVolumeDown.onclick = () => {

            let currentVolume =
                Math.max(
                    0,
                    studyVideo.volume - 0.1
                );


            studyVideo.volume =
                currentVolume;


            videoVolume.value =
                Math.round(
                    currentVolume * 100
                );

        };

    }





    if (videoVolumeUp) {

        videoVolumeUp.onclick = () => {

            let currentVolume =
                Math.min(
                    1,
                    studyVideo.volume + 0.1
                );


            studyVideo.volume =
                currentVolume;


            videoVolume.value =
                Math.round(
                    currentVolume * 100
                );

        };

    }





    if (videoSpeed) {

        videoSpeed.onchange = () => {

            studyVideo.playbackRate =
                Number(videoSpeed.value);

        };

    }





    if (studyVideo) {

        studyVideo.onloadedmetadata = () => {

            videoDuration.innerHTML =
                formatTime(
                    studyVideo.duration
                );

        };




        studyVideo.ontimeupdate = () => {

            videoCurrent.innerHTML =
                formatTime(
                    studyVideo.currentTime
                );


            if (studyVideo.duration) {

                videoProgress.value =
                    (
                        studyVideo.currentTime /
                        studyVideo.duration
                    ) * 100;

            }

        };

    }





    if (videoProgress) {

        videoProgress.oninput = () => {

            studyVideo.currentTime =
                (
                    videoProgress.value / 100
                )
                *
                studyVideo.duration;

        };

    }





    if (videoFullscreen) {

        videoFullscreen.onclick = () => {

            studyVideo.requestFullscreen();

        };

    }





    if (videoPip) {

        videoPip.onclick = async () => {


            try {

                await studyVideo.requestPictureInPicture();

            }

            catch (e) {

                console.error(
                    "Picture in Picture không khả dụng:",
                    e
                );

            }

        };

    }


});
// 控制音乐的播放
module.exports = (function () {
    let $scope = $(document.body)
    function audioControl() {
        // 创建一个audio对象 默认状态是暂停
        this.audio = new Audio()
        this.status = 'pause'
        this.autoPlay()
    }
    audioControl.prototype = {

        autoPlay: function () {
            $(this.audio).on("ended", function () {
                $scope.find(".nextBtn").trigger("click");
            })
        },
        // 播放
        play() {
            this.audio.play();
            this.status = 'play';
        },
        // 暂停
        pause() {
            this.audio.pause();
            this.status = 'pause';
        },
        // 获取音乐资源
        getAudio(src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo(time) {
            this.audio.currentTime = time
            this.audio.play()
        }
    }
    return audioControl
})()

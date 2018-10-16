// 进度条模块
module.exports = (function () {
    let $scope = $(document.body),
        curDuration,//当前歌曲的总时间
        frameId,
        startTime,
        lastPer = 0;
    // 渲染每一首歌的时间
    function renderAllTime(time) {
        // 点下一首歌曲的时候 开始时间的百分比置0
        lastPer = 0
        curDuration = time
        // 将时间格式进行转换
        time = formatTime(time)
        $scope.find('.all-time').html(time)
    }
    // 将时间格式进行转换
    function formatTime(t) {
        t = Math.floor(t)
        let m = Math.floor(t / 60)
        let s = t - m * 60;
        if (m < 10) {
            m = '0' + m
        }
        if (s < 10) {
            s = '0' + s
        }
        return m + ':' + s
    }
    // 当音乐开始播放的时候就调用start
    // 开始时间
    function start(p) {
        cancelAnimationFrame(frameId);
        lastPer = p == undefined ? lastPer : p
        startTime = new Date().getTime()
        function frame() {
            let curTime = new Date().getTime()
            let percent = lastPer + (curTime - startTime) / (curDuration * 1000)
            if (percent <= 1) {
                updata(percent)
                frameId = requestAnimationFrame(frame)
            } else {
                cancelAnimationFrame(frameId)
            }
        }
        frame();
    }
    // 更新区域：左侧时间 进度条运动
    function updata(per) {
        let curTime = curDuration * per
        curTime = formatTime(curTime)
        $scope.find('.start-time').html(curTime)
        // 进度条跟着变化
        let perX = (per - 1) * 100 + '%'
        $scope.find('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    }
    // 停止计时 暂停的时间调用
    function stop() {
        cancelAnimationFrame(frameId)
        let stopTime = new Date().getTime()
        // 存暂停时的百分比
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000)

    }
    return {
        renderAllTime,
        start,
        stop,
        updata
    }
})()

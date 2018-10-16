import '../css/index.less'
import render from './render'
import audioControl from './audioControl'
import controlManger from './controlManger'
import pro from './pro'
import playList from './playList'

let $scope = $(document.body)
let songList;
//index 当前歌曲索引为0，上一首-1 下一首+1 
let index = 0;
let control
let audio = new audioControl()


function bindEvent() {
    // 自定义一个事件 改变歌曲的都在这执行
    $scope.on('play:change', function (e, index) {
        audio.getAudio(songList[index].audio)
        if (audio.status == 'play') {
            pro.start(0)
            audio.play()
        }
        pro.renderAllTime(songList[index].duration)
        render(songList[index])
    })
    // 上一首歌曲 
    $scope.on('click', '.prevBtn', function () {
        index = control.prev()
        // render(songList[index])
        $scope.trigger('play:change', index)
        if (audio.status == "play") {
            pro.start(0);
        } else {
            pro.updata(0);
        }
    })
    // 下一首歌曲
    $scope.on('click', '.nextBtn', function () {
        index = control.next()
        // render(songList[index])
        $scope.trigger('play:change', index)
        if (audio.status == "play") {
            pro.start(0);
        } else {
            pro.updata(0);
        }
    }),
        // 点击播放按钮 切换状态
        $scope.on('click', '.playBtn', function () {
            if (audio.status == 'play') {
                audio.pause()
                pro.stop()
            } else {
                audio.play()
                pro.start()
            }
            $(this).toggleClass('pause')
        })
    // 点击播放列表
    $scope.on('click', '.listBtn', function () {
        if (!($('.play-list').attr('class') == 'play-list show')) {
            playList.show(control, audio)
        } else {
            $('.play-list').removeClass('show')
        }
    })
    // 点击收藏
    $('.likeBtn').on('click', function () {
        songList[index].isLike = songList[index].isLike == true ? false : true
        if (songList[index].isLike) {
            $('.likeBtn').addClass('liking')
        } else {
            $('.likeBtn').removeClass('liking')
        }
    })
}
// 实现拖拽
function bindTouch() {
    // 给小圆点拖拽
    let $slider = $scope.find('.slider-pointer'),
        offset = $scope.find('.pro-bottom').offset(),
        left = offset.left,
        width = $scope.find('.pro-bottom').width();
    $slider.on('touchstart', function () {
        pro.stop()
    }).on('touchmove', function (e) {
        // 当移动的时候会获得新的百分比,然后更新页面
        let x = e.changedTouches[0].clientX
        let per = (x - left) / width
        if (per > 0 && per <= 1) {
            pro.updata(per)
        }
    }).on('touchend', function (e) {
        let x = e.changedTouches[0].clientX
        let per = (x - left) / width
        if (per > 0 && per <= 1) {
            let curTime = per * songList[control.index].duration
            audio.playTo(curTime)
            $scope.find('.playBtn').addClass('pause')
            audio.status = 'play'
            pro.start(per)
        }
    })
}
getData('../mock/data.json')
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            render(data[0])
            songList = data;
            control = new controlManger(index, songList.length)
            bindEvent()
            bindTouch()
            playList.renderList(songList)
            $scope.trigger('play:change', 0)
        },
        error: function () {
            console.log('error')
        }
    })
}


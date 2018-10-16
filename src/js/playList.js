module.exports = (function () {
    let $scope = $(document.body);
    let control;
    // 列表模板
    let $playList = $(`
        <div class="play-list">
            <div class="play-header">播放列表</div>
            <ul class="list-wrapper"></ul>
        </div>
    `)
    //渲染播放列表dom
    function renderList(songList) {
        var html = '';
        for (var i = 0; i < songList.length; i++) {
            html += "<li><h3 >" + songList[i].song + "-<span>" + songList[i].singer + "</span></h3></li>"
        }
        $playList.find("ul").html(html);
        $scope.append($playList);
    }
    //展示列表
    function show(controlmanager, audio) {
        control = controlmanager;
        $playList.addClass("show");
        signSong(control.index);
        bindEvent(audio);
    }
    // 点击列表歌曲
    function bindEvent(audio) {
        $playList.find("li").on("click", function () {
            var index = $(this).index();
            signSong(index);
            audio.status = 'play'
            $scope.trigger("play:change", [index, true]);
            $scope.find(".playBtn").addClass("pause");
            setTimeout(function () {
                $playList.removeClass("show")
            }, 200);
        })
    }
    function signSong(index) {
        $playList.find(".sign").removeClass("sign");
        $playList.find("ul li").eq(index).addClass("sign");
    }
    return {
        renderList,
        show
    }
})()
import gaussBlur from './gaussBlur'

export default (function () {
    let $scope = $(document.body)
    function renderImg(src) {
        let img = new Image()
        img.src = src
        img.onload = function () {
            gaussBlur.blurImg(img, $scope)
            $scope.find(".song-img img").attr("src", src);
        }
    }
    function renderInfo(data) {

        var html = `
        <div class="singer-name">${data.singer}</div>
        <div class="song-name">${data.song}</div>
        <div class="album-name">${data.album}</div>`
        $scope.find('.song-info').html(html)
    }
    function renderLike(isLike) {
        if (isLike) {
            $scope.find('.likeBtn').addClass('liking')
        } else {
            $scope.find('.likeBtn').removeClass('liking')
        }
    }
    return function (data) {
        renderImg(data.image)
        renderInfo(data)
        renderLike(data.isLike)
    }
})()



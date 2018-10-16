// 上一首、下一首
module.exports = (function () {
    function controlManger(index, len) {
        this.index = index;
        this.len = len;
    }
    controlManger.prototype = {
        // 上一首
        prev() {
            return this.getIndex(-1);
        },
        // 下一首
        next() {
            return this.getIndex(1);
        },
        // 处理index值
        getIndex(val) {
            let index = this.index;
            let len = this.len;
            // 当前index=0,按下next键后,  0 + 3 + 1 = 4 % 3 = 1 index从0到1
            let curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    return controlManger
})()


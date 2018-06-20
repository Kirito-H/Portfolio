var myScroll,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction () {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.getElementById('goodsDe');

        el.className = 'goods-de';

        myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    var mc = document.querySelector('.main-con');
    var $wrapper = document.getElementById('wrapper');

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = 'tip01';
                $wrapper.className = 'hide';
                mc.style.paddingBottom = '10px';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip tip01';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开我就开始更新咯...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = 'tip01';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拖我，查看图文详情 ^_^';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading tip01';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '奋力加载中...';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
//        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);
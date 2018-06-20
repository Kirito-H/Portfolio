function maskShow() {
    var windowHeight = $(window).height(), //获取当前窗口高度
        documentHeight = $(document).height(); //获取当前文档高度
    var mask = $(".mask"),
        maskH = (windowHeight > documentHeight) ? windowHeight : documentHeight;
    mask.css({"height": maskH + "px"});
    mask.fadeIn(100);
}

$(function () {
    //弹出框相对于窗口居中(垂直&水平)显示函数
    function center(elem) {
        var winHeight = $(window).height(), //获取当前窗口高度
            docWidth = $(document).width(), //获取当前文档宽度
            popupHeight = elem.height(), //获取弹出层高度
            popupWidth = elem.width(), //获取弹出层宽度
            scrollHeight = $(document).scrollTop(), //距文档顶部高度
            posiTop = (winHeight - popupHeight) / 2 + scrollHeight, //垂直居中
            posiLeft = (docWidth - popupWidth) / 2; //水平居中
        elem.css({"top": posiTop + "px", "left": posiLeft + "px"});
    }

    $(".btn-draw").click(function () {
        setTimeout(function () {
            maskShow();
            var noPrize = $("#noPrize");
            noPrize.fadeIn(100);
            center(noPrize);
        }, 13000);
    });
    $(".outbox .btn01, .outbox .btn02").click(function(){
        $(".mask, .outbox").fadeOut(100);
    });
});
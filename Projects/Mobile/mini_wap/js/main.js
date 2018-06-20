$(function () {
    var closeThiBox = function(elem) {
        $('.mask').hide(0);
        $(elem).hide(0);
    };

    function showThiBox(elem) {
        var w, h, mt, ml;
        $('.mask').show(0);
        $(elem).show(0);
        w = $(elem).width();
        h = $(elem).height();
        mt = h / 2;
        ml = w / 2;
        $(elem).css({'margin-top': -mt, 'margin-left': -ml});
    }

    var showTab = function (elem1, elem2) {
        var index = elem1.attr('data-index'),
            $elem = $(elem2);
        $elem.each(function () {
            if($(this).attr('data-index') == index) {
                $elem.hide(0);
                $(this).show(0);
            }
        });
    };

    //go to top
    $('.btnToTop').click(function () {
        $('html, body').scrollTop(0);
    });

    //选项切换
    $(".opt01").click(function () {
        $(this).addClass("selected").siblings('.opt01').removeClass("selected");
    });
    $(".opt02").click(function () {
        $(this).addClass("curr").siblings('.opt02').removeClass("curr");
    });
    $(".opt03").click(function () {
        $(this).addClass("selected").siblings('.opt03').removeClass("selected");
    });
    $('.pakg-opts .opt02').click(function () {
        showTab($(this), '.pakg-de');
    });
    $('.prod-nav .item').click(function () {
        $(this).addClass('curr').siblings('.item').removeClass('curr');
        showTab($(this), '.index .prod-list');
    });

    //查看/隐藏商品详情
    $(".btnLoadMore").bind('click', function() {
        var goodsDe = $("#goodsDe"),
            customServ = $('#customServ');
        $(this).toggleClass('curr');
        $(this).siblings('.btnLoadMore').removeClass('curr');
        switch ($(this).attr('id')) {
            case 'goodsDeTrig':
                customServ.slideUp(100);
                goodsDe.slideToggle(100);
                break;
            case 'customServTrig':
                goodsDe.slideUp(100);
                customServ.slideToggle(100);
                break;
        }
    });

    //选号
    $('.num-list02 .opt03').click(function () {
        var num = $(this).find('.num').text(),
            info = $(this).find('.info').text(),
            $selNum = $('#selectedNum'),
            $selInfo = $('#selectedInfo');
        $selNum.text(num);
        $selInfo.text(info);
    });

    $('#agrMentTrig').bind('click', function() {
        showThiBox('#agreementDe');
    });
    $('.close01').bind('click', function() {
        closeThiBox('.thickbox');
    });
});
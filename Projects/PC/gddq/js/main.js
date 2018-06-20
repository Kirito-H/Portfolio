Zepto(function($){
    var eve;
    if($.touchend){
        eve = 'touchend'
    } else {
        eve = 'click'
    }
    $('.folding:first-child .cate-tit').addClass('fold');
    $('.folding .cate-tit').on(eve, function () {
        var $cateTit = $('.folding .cate-tit'),
            index = $cateTit.index($(this)),
            $cateList = $('.cate-list'),
            $currList = $cateList.eq(index);
        $cateTit.not($(this)).removeClass('fold');
        $(this).addClass('fold');
        $cateList.removeClass('visible');
        $currList.toggleClass('visible');
    });
    $('.opt01').on(eve, function () {
        var dPrice = $(this).attr('data-price');
        var $price = $('#tcPrice');
        $(this).addClass('curr').siblings('.opt01').removeClass('curr');
        $price.text(dPrice);
    });

    var docWd = document.documentElement.clientWidth;
    if(docWd >= 720) {
        $('.zc-page .banner-img').each(function () {
            var str = $(this).attr('src');
            var strNew = str.replace(/(images\/)/,'$1big/');
            $(this).attr('src', strNew);
        });
        $('#goodsDe').children('img').each(function () {
            var str = $(this).attr('data-original');
            var strNew = str.replace(/(prod_details\/)/,'$1bigger/');
            $(this).attr('data-original', strNew);
        });
    }
});
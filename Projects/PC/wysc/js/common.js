$(function(){
    (function() {
        var $hasSubM = $('.nav .has-subM');
        $hasSubM.hover(function () {
            var index = $(this).index('.has-subM'),
                wd = $(this).outerWidth(),
                posL = $(this).position().left,
                subM = $('.submenu').eq(index);
            $(this).addClass('hover');
            subM.css({'left': posL + 'px', 'width': wd - 2 + 'px'}).addClass('show');
        }, function () {
            var index = $(this).index('.has-subM'),
                subM = $('.submenu').eq(index);
            subM.removeClass('show');
            $hasSubM.eq(index).removeClass('hover');
            
            subM.hover(function () { //hack IE6
                $(this).addClass('show');
                $hasSubM.eq(index).addClass('hover');
            }, function () {
                $(this).removeClass('show');
                $hasSubM.eq(index).removeClass('hover');
            });
        });
    })();

    //switch options
    $(".phone_opts .sel_c").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    });
});
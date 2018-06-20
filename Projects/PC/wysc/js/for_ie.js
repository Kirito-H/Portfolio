$(function(){
    $('.category .item').hover(function () {
        $(this).find('.cate_img').animate({"bottom": 0}, 200);
        $(this).find('.arrow-r').animate({"right": "55px"}, 200);
    }, function () {
        $(this).find('.cate_img').animate({"bottom": "-10px"}, 200);
        $(this).find('.arrow-r').animate({"right": "65px"}, 200);
    });
});
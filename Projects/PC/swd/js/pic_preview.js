//==================商品图片预览=====================
$(function () {
  var tempLength = 0; //临时变量,当前移动的长度
  var viewNum = 5; //设置每次显示图片的个数量
  var moveNum = 2; //每次移动的数量
  var moveTime = 300; //移动速度,毫秒
  var scrollDiv = $(".spec-scroll .goods-piclist"); //进行移动动画的容器
  var scrollItems = $(".spec-scroll .goods-piclist li"); //移动容器里的集合
  var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
  var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度

  scrollItems.hover(function () {
    var $img = $(this).find('img'),
      src = $img.attr('src');
    $("#preview").find(".previewImg img").attr("src", src);
    scrollItems.find('img').removeClass('hover');
    $img.addClass('hover');
  });

  //下一张
  $(".spec-scroll .next").bind("click", function () {
    if (tempLength < countLength) {
      if ((countLength - tempLength) > moveLength) {
        scrollDiv.animate({left: "-=" + moveLength + "px"}, moveTime);
        tempLength += moveLength;
      } else {
        scrollDiv.animate({left: "-=" + (countLength - tempLength) + "px"}, moveTime);
        tempLength += (countLength - tempLength);
      }
    }
  });

  //上一张
  $(".spec-scroll .prev").bind("click", function () {
    if (tempLength > 0) {
      if (tempLength > moveLength) {
        scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
        tempLength -= moveLength;
      } else {
        scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
        tempLength = 0;
      }
    }
  });
});
//==================商品图片预览=====================
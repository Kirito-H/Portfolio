
//==================幻灯片图片预览函数==================
//鼠标经过预览图片函数
function preview(img) {
    var $previewImg = $('#preview').find('#imgZoom img');
    $previewImg.attr('src', $(img).attr('src'));
    //$previewImg.attr('jqimg',$(img).attr('bimg'));
}

//图片预览小图移动效果,页面加载时触发
$(function(){
	var tempLength = 0, //临时变量,当前移动的长度
	    viewNum = 4, //设置每次显示图片的个数量
	    moveNum = 1, //每次移动的数量
	    moveTime = 300, //移动速度,毫秒
	    scrollDiv = $(".spec-scroll .items ul"), //进行移动动画的容器
	    scrollItems = $(".spec-scroll .items ul li"), //移动容器里的集合
        scrollItemLink = $('.spec-scroll .items li>a'),
	    moveLength = scrollItems.eq(0).width() * moveNum, //计算每次移动的长度
        countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
	  
	//下一张
	$(".spec-scroll .next").bind("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});

    scrollItemLink.bind({
        click: function () {
            return false;
        },
        mouseenter: function () {
            var scrollImg = $(this).find('img');
            var zoomLink = $(this).attr('href');
            scrollImg.addClass('curr');
            scrollItemLink.not(this).find('img').removeClass('curr');
            preview(scrollImg);
            $('#imgZoom').attr('href', zoomLink);
        }
    });
});
//==================幻灯片图片预览函数==================
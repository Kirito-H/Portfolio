//这是我的就在开奖的倒计时倒计时方法
(function ($) {
    var div = document.createElement('div'),
        rposition = /([^ ]*) (.*)/;
    if (div.style.backgroundPositionX !== '') {
        $(['X', 'Y']).each(function (i, letter) {
            var property = 'backgroundPosition' + letter,
                isX = letter == 'X';
            $.cssHooks[property] = {
                set: function (elem, value) {
                    var current = elem.style.backgroundPosition;
                    elem.style.backgroundPosition = (isX ? value + ' ' : '' ) + (current ? current.match(rposition)[isX + 1] : '0') + (isX ? '' : ' ' + value);
                },
                get: function (elem, computed) {
                    var current = computed ? $.css(elem, 'backgroundPosition') : elem.style.backgroundPosition;
                    return current.match(rposition)[!isX + 1];
                }
            };
            $.fx.step[property] = function (fx) {
                $.cssHooks[property].set(fx.elem, fx.now + fx.unit);
            }
        });
    }
    div = null;
})(jQuery);

$(document).ready(function () {
    $(".show>ol>li:eq(0)").css('backgroundPositionY', (81 * 5));
    $(".show>ol>li:eq(1)").css('backgroundPositionY', (81 * 4));
    $(".show>ol>li:eq(2)").css('backgroundPositionY', (81 * 3));
    var pduan = 0; //定义用于判断弹出框的参数。
    //随机产生数字
    function numRand() {
        var _arr = ["121", "223", "122", "244", "565", "636", "177", "535", "755", "484", "151", "252", "414", "244", "545", "686", "771", "776", "557", "414", "117", "228", "787", "474", "553", "626", "787", "222", "551", "424", "363", "848", "323", "858", "323", "828", "343", "828", "332", "883", "121", "252", "343", "474", "355", "566", "717", "418", "458", "355"];
        var x = _arr.length; //中奖上限
        var y = 1;
        var _rand = parseInt(Math.random() * (x - y + 1) + y);
        pduan = _rand; //将随机数复制弹出框来
        var rand = parseInt(_arr[_rand - 1]);
        return rand;
    }

    var isBegin = false;
    var u = 246;
    var _shu = $('#szhongjshu').text();
    $('.btn-draw').on("click", function () {
        //if($("#result_key").val()!=='999'){
        //alert("您还没续约宽带,请续约后在抽奖!!!");return;
        //}
        var guenling = $(".ltime").text();
        var showItem = $(".show>ol>li");
        if (guenling == "0") {
            centerPopup('fail_div');//gei_div //抽奖为0的时候层
        } else {
            //--------转盘-----------
            if (isBegin) return false;
            isBegin = true;
            showItem.css('backgroundPositionY', 0);
            //var result = numRand();//中奖返回的结果数
            var result = parseInt("999");//如果不想随机的话就直接用数组
            //$('#res').text('result = ' + result);
            var num_arr = (result + '').split('');
            showItem.each(function (index) {
                var _num = $(this);
                setTimeout(function () {
                    _num.animate({
                        backgroundPositionY: (u * 50) - (u * num_arr[index])
                    }, {
                        duration: 6000 + index * 3000,
                        complete: function () {
                            if (index == 2) isBegin = false;
                        }
                    });
                }, index * 300);
            });
        }
    });
});
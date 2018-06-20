$(function($){
    var eve;
    if($.touchend){
        eve = 'touchend'
    } else {
        eve = 'click'
    }

    var center = function center(elem) {
        var winHeight = $(window).height(), //获取当前窗口高度
            winWidth = $(window).width(), //获取当前窗口宽度
            popupHeight = elem.height(), //获取弹出层高度
            popupWidth = elem.width(), //获取弹出层宽度
            scrollHeight = document.documentElement.scrollTop || document.body.scrollTop, //距文档顶部高度
            posiTop = (winHeight - popupHeight)/2 + scrollHeight, //垂直居中
            posiLeft = (winWidth - popupWidth)/2; //水平居中
        elem.css({"top" : posiTop + "px", "left" : posiLeft + "px"});
    };

    //全局变量
    var $tsP = $('.ts-price'),
        $iptvP = $('#iptv-pack'),
        $gxP = $('#gxkd-price'),
        $phoneP = $('.phone-price'),
        $modP = $('.mod-price'),
        $vc = $('#viceCard'),
        $priceSum = $('#priceSum'),
        $priceSumM = $('#priceSumMon'),
        $vcPrice = $('#vcPrice'),
        $sjtcP = $('#sjtcPrice'),
        $wifiP = $('#wifiPackPrice'),
        $cleanNetY = $('#cleanNet-y'),
        $cleanNetM = $('#cleanNet-m'),
        $watcherY = $('#watcher-y'),
        $watcherM = $('#watcher-m'),
        $camP = $('#camPrice');

    //计算总价格
    var sum = function () {
        var pSum = 0, pSumM = 0,
            tsPrice = parseFloat($tsP.text()),
            iptvPrice = parseFloat($iptvP.attr('data-url')),
            gxPrice = parseFloat($gxP.text()),
            phonePrice = parseFloat($phoneP.text()),
            modPrice = parseFloat($modP.text()),
            vcPrice = parseFloat($vc.val()) * 10,
            wifiPrice = parseFloat($wifiP.text()),
            cleanP_y = parseFloat($cleanNetY.find('.cleanNet-p').text()),
            cleanP_m = parseFloat($cleanNetM.find('.cleanNet-p').text()),
            watcherP_y = parseFloat($watcherY.find('.watcher-p').text()),
            watcherP_m = parseFloat($watcherM.find('.watcher-p').text()),
            camPrice = parseFloat($camP.attr('data-url'));

        pSum = tsPrice + iptvPrice + gxPrice + phonePrice + modPrice +wifiPrice;
        pSumM = parseFloat($sjtcP.text()) + vcPrice;

        if($cleanNetY.is(':visible')) {
            pSum += cleanP_y
        } else {
            pSumM += cleanP_m
        }
        if($watcherY.is(':visible')) {
            pSum += (watcherP_y + camPrice)
        } else {
            pSumM += (watcherP_m + camPrice)
        }

        $priceSum.text(pSum);
        $priceSumM.text(pSumM);
    };

    sum();
    $vcPrice.text($vc.val() * 10);

    $('.step1 label[for^="pack"], .step1 .inp-rad01').on(eve, function () {
        var dPrice = $(this).parents('.item').attr('data-tsPrice');
        $tsP.text(dPrice);
        sum();
    });

    $('.sec-step .btn01').on(eve, function () {
        var $btnDone = $(this).siblings('.btn-done'),
            $parent = $(this).parents('.sec-step'),
            kdDataP = $('.opt01.curr').attr('data-kdprice'),
            phoneP = $('#btnChoosePhone').attr('data-url');

        $(this).fadeOut(0);
        $(this).siblings('.btn01').fadeOut(0);
        $btnDone.addClass('show');
        $parent.find('.opt-mask').fadeIn(0);

        if($parent.hasClass('step1')){
            //$('.step2').fadeIn(0);
        } else if($parent.hasClass('step2')){
            //$('.step3').fadeIn(0);
            $modP.text(199);
            $iptvP.text('机顶盒￥399');
            $iptvP.attr('data-url', 399);
            sum();
        } else if($parent.hasClass('step3')){
            $gxP.text(kdDataP);
            $phoneP.text(phoneP);
            $modP.text(199);
            $vc.val($vc.val());
            sum();
        }

        if($(this).hasClass('btn01-3')) {
            $btnDone.find('.txt').text('已放弃');
            if($parent.hasClass('step2')){
                $iptvP.text('￥0');
                $iptvP.attr('data-url', 0);
                sum();
            } else if($parent.hasClass('step3')) {
                $gxP.text(0);
                $phoneP.text(0);
                $modP.text(0);
                $vc.val(0);
                sum();
            } else if($parent.hasClass('step4')) {
                $('.table01 .opt03').removeClass('selected');
                $wifiP.text(0);
                $camP.attr('data-url', 0);
                $watcherY.fadeOut(0).find('.watcher-p').text(0);
                $watcherM.fadeOut(0).find('.watcher-p').text(0);
                $cleanNetY.fadeOut(0).find('.cleanNet-p').text(0);
                $cleanNetM.fadeOut(0).find('.cleanNet-p').text(0);
                sum();
            }
        }

        if($('.step1 .btn-done').hasClass('show') && $('.step2 .btn-done').hasClass('show') && $('.step3 .btn-done').hasClass('show') && $('.step4 .btn-done').hasClass('show')){
            $('#btnOrder').removeClass('btn03-false').attr('href', 'http://mini189.cn/');
        }
    });
    $('.sec-step .btn-done').on(eve, function () {
        var txt = $(this).find('.txt'),
            $parent = $(this).parents('.sec-step');
        $(this).removeClass('show');
        txt.text('已领取');
        $(this).siblings('.btn01').fadeIn(100);
        $parent.find('.opt-mask').fadeOut(0);
        $('#btnOrder').addClass('btn03-false').attr('href', '#!');
    });

    $('.opt01').on(eve, function () {
        var kdPrice = $(this).attr('data-kdPrice'),
            tsPrice = $(this).attr('data-tsPrice'),
            modPrice = $(this).attr('data-modPrice'),
            $optTs = $('#opt-ts'),
            sjtcPrice = $(this).find('.sjtc-price').text();

        $(this).addClass('curr').siblings('.opt01').removeClass('curr');
        $tsP.text(tsPrice);
        $('.gxkd-price').text(kdPrice);
        $modP.text(modPrice);
        sum();

        if(kdPrice) {
            if(kdPrice == 720){
                $optTs.fadeIn(100);
            } else {
                $optTs.fadeOut(100);
            }
        }

        $sjtcP.text(sjtcPrice);
    });
    $('.opt02').on(eve, function () {
        $('.step1 .opt-mask').fadeOut(0);
        $('.step1 .btn-done').removeClass('show').siblings('.btn01').fadeIn(100).attr('href', '#step3');
    });
    //第四重礼
    $('.table01 .opt03').on(eve, function () {
        var $bro = $(this).parents('tr').siblings('tr').find('.opt03'),
            name1 = $(this).attr('name'),
            wifiPackP = $(this).parents('tr').find('.wifiPack-p').text(),
            $packP = $(this).parents('tr').find('.packPrice'),
            packPrice = $packP.text();

        $bro.each(function () {
            if($(this).attr('name') == name1) {
                $(this).removeClass('selected');
            }
        });
        $(this).toggleClass('selected');

        if($(this).parents('.table01').attr('id') == 'tbLiBao1') {
            if($(this).hasClass('selected')){
                $wifiP.text(wifiPackP);
                sum();
            } else {
                $wifiP.text(0);
                sum();
            }
        }

        if($(this).parents('.table01').attr('id') == 'tbLiBao2') {

            if($(this).attr('name') == 'watcher') {

                if($(this).hasClass('selected')) {

                    $camP.attr('data-url', 300);

                    if($packP.hasClass('packPriceM')) {
                        $watcherY.fadeOut(0);
                        $watcherM.fadeIn(0).find('.watcher-p').text(packPrice);
                        sum();
                    } else {
                        $watcherM.fadeOut(0);
                        $watcherY.fadeIn(0).find('.watcher-p').text(packPrice);
                        sum();
                    }

                } else {
                    $camP.attr('data-url', 0);
                    $watcherY.fadeOut(0).find('.watcher-p').text(0);
                    $watcherM.fadeOut(0).find('.watcher-p').text(0);
                    sum();
                }

            } else if($(this).attr('name') == 'cleanNet') {

                if($(this).hasClass('selected')) {

                    if($packP.hasClass('packPriceM')) {
                        $cleanNetY.fadeOut(0);
                        $cleanNetM.fadeIn(0).find('.cleanNet-p').text(packPrice);
                        sum();
                    } else {
                        $cleanNetM.fadeOut(0);
                        $cleanNetY.fadeIn(0).find('.cleanNet-p').text(packPrice);
                        sum();
                    }

                } else {
                    $cleanNetY.fadeOut(0).find('.cleanNet-p').text(0);
                    $cleanNetM.fadeOut(0).find('.cleanNet-p').text(0);
                    sum();
                }

            }
        }
    });

    //数量增加操作
    $(".btnPlus").on(eve, function () {
        if(parseInt($vc.val()) < 1){
            $vc.val(parseInt($vc.val()) + 1);
        }
        sum();
        $vcPrice.text($vc.val() * 10);
    });
    //数量减少操作
    $(".btnMinus").on(eve, function () {
        if(parseInt($vc.val()) > 0){
            $vc.val(parseInt($vc.val()) - 1);
        }
        sum();
        $vcPrice.text($vc.val() * 10);
    });

    //重选号码
    $('#reChooseNum').on(eve, function () {
        $(this).fadeOut(100).siblings('.btn04').text('选择号码').removeClass('btn04-2');
    });
    //重选手机
    $('#reChoosePhone').on(eve, function () {
        $(this).fadeOut(0);
        $('#btnChoosePhone').text('选择手机').removeClass('btn04-2');
        $('#btnNoNeedPhone').fadeIn(100);
        $phoneP.text(0);
        sum();
    });

    //选择手机
    $('#btnChoosePhone').on(eve, function () {
        $('.mask, #tbChoosePhone').fadeIn(100);
        center($("#tbChoosePhone"));
    });
    $(".close04, .thickbox01 .btn08-2").on(eve, function () {
        $(".mask, .thickbox01").fadeOut(200);
    });
    $('#tbChoosePhone').find('.phone_list01 .item').on(eve, function(){
        $(this).addClass('selected').siblings('.item').removeClass('selected');
    });
    $('#btnSubmitPhone').on(eve, function () {
        var currPhItem = $('.phone_list01 .item.selected'),
            txt = currPhItem.find('.phoneName').text(),
            phonePrice = currPhItem.find('.phonePrice').text();
        $('#btnChoosePhone').text(txt).addClass('btn04-2').attr('data-url', phonePrice)
            .siblings('#btnNoNeedPhone').fadeOut(50)
            .siblings('#reChoosePhone').fadeIn(50);
        $phoneP.text(phonePrice);
        sum();
        $('#btnNoNeedPhone').removeClass('selected');
    });
    //不需要手机
    $('#btnNoNeedPhone').on(eve, function () {
        $('.mask, #warmTip1').fadeIn(100);
        center($("#warmTip1"));
        $(this).addClass('selected');
    });
    $('.btn-close').on(eve, function () {
        $('.mask, .thickbox02').fadeOut(100);
    });

    //选择号码
    $('#btnChooseNum').on(eve, function () {
        $('.mask, #chooseNumBox').fadeIn(200);
        center($('#chooseNumBox'));
    });
    $('.xhimg-close').on(eve, function () {
        $('.mask, #chooseNumBox').fadeOut(200);
    });
    $('.xh-list li').on(eve, function () {
        $(this).addClass('xh-select').siblings().removeClass('xh-select');
        var t1 = $(this).find('.xu-phonenumber').text();
        $('.xh-has .xh-hasnumber').text(t1);
        $('.xh-has').fadeIn(200);
    });
    $('.xh-numberclose').on(eve, function () {
        $('.xh-has').fadeOut(0);
        $('.xh-list li').removeClass('xh-select');
    });
    $('.xh-three li').on(eve, function () {
        $(this).addClass('xh-choice-three').siblings().removeClass('xh-choice-three');
    });
    $('#btnSubmitNum').on(eve, function () {
        if($('.xh-has').is(':hidden')) {
            alert('请选择号码!');
        } else {
            $('.mask, #chooseNumBox').fadeOut(0);
            var t2 = $('.xh-list li.xh-select .xu-phonenumber').text();
            $('#btnChooseNum').text(t2).addClass('btn04-2').siblings('#reChooseNum').fadeIn(100);
        }
    });

    //分享计划规则
    $('.floor7').bind('click', function(){
        $('.floor8').toggle();
        $('.floor7 .icon01').toggleClass('fold');
    });

    //比一比
    $('#toCompare').click(function(){
        $('#compInput').fadeOut(0);
        $('#compResult').fadeIn(200);
    });
    $('.btn-byb').click(function () {
        var $comp = $(this).siblings('.sec_compare');
        if($comp.is(':hidden')){
            $comp.fadeIn(0).animate({'margin-left': 0}, 300);
        } else {
            $comp.animate({'margin-left': '-939px'}, 300).fadeOut(0);
        }
    });
    $('.sec_compare .close04').click(function () {
        var $comp = $(this).parents('.sec_compare');
        $comp.animate({'margin-left': '-939px'}, 300).fadeOut(0);
    });

    //右侧导购浮条
    $("#btnExpand").click(function(){
        $(".floatBar02").animate({"right":"-123"}, 200).fadeOut(0);
        $(".floatBar02_m").fadeIn(200);
    });
    $(".floatBar02_m .link_serv").click(function(){
        $(".floatBar02_m").fadeOut(100);
        $(".floatBar02").fadeIn(0).animate({"right":"0"}, 200);
    });
    //返回顶部
    $(".goToTop, .toTop").click(function(){
        $("html , body").animate({scrollTop:0},200);
        return false;
    });

    //点亮小区
    //$('#btnCX').bind('click', function () {
    //    $('.mask, #toLightUp').fadeIn(100);
    //    center($('#toLightUp'));
    //});

    //cx页左边栏
    $('.sidebar .btn-fold').bind('click', function () {
        $(".sidebar").animate({"left":"-168"}, 200).fadeOut(0);
        $(".sidebar-m").fadeIn(200);
    });
    $(".sidebar-m .btn-expand").bind('click', function(){
        $(".sidebar-m").fadeOut(100);
        $(".sidebar").fadeIn(0).animate({"left":"0"}, 200);
    });

    //弹框：升级查询-当前进程
    var $currStage = $('.stage-wrap .stage.curr'),
        currStageIndex = $currStage.index('.stage');
    $currStage.prevAll('.stage').addClass('done');
    $('.stage-wrap .progress-bar').css({
        'width': ((currStageIndex + 1) * 86 + (currStageIndex * 70) + 'px')
    });
    $('.currStage').text($currStage.text());

    //第四重礼提示框
    var showTip = function (elem) {
        var id = "#" + elem.attr('data-target');
        $('.mask').fadeIn(100);
        $(id).fadeIn(100);
        center($(id));
    };
    $('.table01 .hasTip').on(eve, function () {
        showTip($(this));
    });
    $('.tipBox .btn-close02').on(eve, function () {
        $('.mask, .tipBox').fadeOut(100);
    });

    //暂不能办理光纤提速提示弹框
    $('#btnCX').bind('click', function () {
        $('.mask, #ts_notQualified').fadeIn(100);
        center($('#ts_notQualified'));
    });

    //分享得话费
    $('#btnToShare').on(eve, function () {
        $('.mask, #tB_share1').fadeIn(100);
        center($('#tB_share1'));
    });
    $('#btnGenerator').on(eve, function () {
        $('#tB_share1').fadeOut(100);
        $('#tB_share2').fadeIn(100);
        center($('#tB_share2'));
    });
});
/**
 * common functions
 */

//触发a:active
document.body.addEventListener('touchstart', function () {});

//监测横竖屏
function watchScreenOrientation() {
  var winW = window.innerWidth,
      winH = window.innerHeight,
      portrait = false,
      landscape = false;
  (winW > winH) ? (landscape = true) : (portrait = true);
  if(portrait) {
    $('body').addClass('toLandscape');
  } else {
    $('body').removeClass('toLandscape');
  }
}
//watchScreenOrientation();
//window.addEventListener("orientationchange",watchScreenOrientation,false);

//为金额添加逗号分隔符
function addCommas(val) {
  var aIntNum = val.toString().split('.');
  if (aIntNum[0].length >= 4) {
    aIntNum[0] = aIntNum[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  //处理小数位
  // if (aIntNum[1] && aIntNum[1].length >= 4) {
  //   aIntNum[1] = aIntNum[1].replace(/(\d{3})/g, '$1 ');
  // }
  return aIntNum.join('.');
}

//控制输入框只能输入数字并且只能输入2位(位数可按需设置)小数
function checkInputNum(obj) {
  obj.value = obj.value.replace(/[^\d\.]/g, '');

  if(!/^\d*(\.\d{0,2})?$/.test(obj.value)) {
    //console.log('只能输入数字，小数点后只能保留两位');
    obj.setAttribute('maxlength', obj.value.length-1);
    obj.value = obj.value.slice(0, -1);
  } else {
    obj.setAttribute('maxlength', ''); //maxlength属性值可按需设置
  }
}

//获取验证码
function countDown() {
  var t = setInterval(function () {
    var $cd = $('.countDown'),
        _t = parseInt($cd.text());
    $cd.text(--_t);
  }, 1000);
  setTimeout(function () {
    clearInterval(t);
    $('.getVerifyCode').removeClass('verifing disabled').html('获取验证码');
  }, 60000);
}

//获取协议内容
function getAgreement(opts) {
  var $popupEle = $(opts.target),
    $cont = $popupEle.find('.content').find('.content-block'),
    agreement = $.ajax({
      url: opts.url,
      async: false
    });
  $cont.html(agreement.responseText);
}

//公用弹框
function closeSpecModal(modal){
  var _modal = modal || ".sp-modal";
  $(_modal).find(".sp-modal-cont, .sp-modal-overlay").removeClass("show");
  setTimeout(function(){
    $(_modal).hide();
  },300);
}
function specModal(modal_elem, tapOverlayToClose/*, modal_time*/) {
  // var _modal_time = modal_time || 300;
  tapOverlayToClose = tapOverlayToClose || false;
  $(modal_elem).show();
  setTimeout(function(){
    $(modal_elem).find(".sp-modal-cont, .sp-modal-overlay").addClass("show");
  },100);
  if(tapOverlayToClose) {
    $(modal_elem).find('.sp-modal-overlay').addClass('closable');
  }
  $(modal_elem).find(".sp-modal-close, .sp-modal-overlay.closable").on("click", function() {
    closeSpecModal(modal_elem);

    // var $modal =$(this).parents(".sp-modal");
    // $modal.find(".sp-modal-cont, .sp-modal-overlay").removeClass("show");
    // setTimeout(function(){
    //   $modal.hide();
    // },_modal_time);
  });
}

$(function () {
  //页面左上角返回按钮
  $('.back').on('click', function () {
    if($(this).parents('.popup').length > 0) {
      return false;
    }

    var _event = $(this).attr('data-event'); //当点击返回按钮需要做其他处理时, 便加上属性data-event="1"
    if(_event && (_event == 1)) {
      return false;
    } else {
      window.history.go(-1);
    }
  });

  //当按钮不可用时使其不可跳转
  $('a, [class*="btn"]').on('click', function(e) {
    if($(this).hasClass('disabled')) {
      e.preventDefault();
    }
  });

  //清空输入框
  $('.y-inp-txt').on('keyup', function () {
    if($(this).val() != '') {
      $(this).addClass('clearable').siblings('.y-clear').show();
    } else {
      $(this).removeClass('clearable').siblings('.y-clear').hide();
    }
  });
  $('.y-clear').on('click', function () {
    var $target = $(this).siblings('.y-inp-txt');
    $(this).hide();
    $target.val('').focus();
  });

  //float bar
  $('.floatBar').on('click', function () {
    $(this).toggleClass('expanded');
  });
  (function getTime() {
    var theDate = new Date(),
        currMon = theDate.getMonth() + 1,
        currDate = theDate.getDate(),
        currHour = theDate.getHours(),
        currMin = theDate.getMinutes(),
        $pa = $('.floatBar'),
        $currDate = $pa.find('.current-date'),
        $currTime = $pa.find('.current-time');

    if(currMon < 10) { currMon = '0' + currMon }
    if(currDate < 10) { currDate = '0' + currDate }
    if(currHour < 10) { currHour = '0' + currHour }
    if(currMin < 10) { currMin = '0' + currMin }

    $currDate.text(currMon + '/' + currDate);
    $currTime.text(currHour + ':' + currMin);

    setTimeout(getTime, 1000);
  })();

  //close popup
  $(".close-popup, .closeThePopup").on("click", function () {
    var _target = $(this).attr('data-popup');
    if(_target) {
      $.closeModal(_target);
    } else {
      $.closeModal('.popup');
    }
    $('.popup-overlay').removeClass('modal-overlay-visible');
  });
  $('.closeThePopup').on("click", function () {
    var count = 0;
    $('.popup').each(function () {
      if($(this).css('display') != 'none') {
        count++;
      }
    });
    if(count > 0) {
      $('.popup-overlay').addClass('modal-overlay-visible');
    }
  });

});
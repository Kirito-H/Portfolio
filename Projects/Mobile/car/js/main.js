//触发a:active
document.body.addEventListener('touchstart', function () {});

var evt = $.tap ? 'tap' : 'click';
var scrollT;
var prevD = function (event) {
  event.preventDefault();
};

var toast = function (text) {
  $('.toast').remove();
  var $toast = '<div class="toast"><div class="toast-mask"></div><div class="toast-inner">' + text + '</div></div>';
  $('body').append($toast);
  setTimeout(function () {
    $('.toast').remove();
  }, 2000);
};
//持续显示toast
var toastKeep = function (info) {
  var $toast = '<div class="toast"><div class="toast-mask"></div><div class="toast-inner">' + info + '</div></div>';
  $('body').append($toast);
};
//移除toast
var removeToast = function () {
  var $t = $('.toast');
  if ($t) {
    $t.remove();
  }
};

//等待加载
var loading = function (text) {
  var loadMsg = '<div class="tAc"><img src="images/loading.gif" alt="" class="loading"><p>' + (text || '') + '</p></div>';
  toastKeep(loadMsg);
};
//加载完成
var loadingDone = function (text) {
  var doneMsg = '<div class="tAc"><i class="weui_icon_success i-tip-succ"></i><p>' + (text || '') + '</p></div>';
  toast(doneMsg);
};
//移除加载等待
var removeLoading = function () {
  var $t = $('.toast');
  if ($t) {
    $t.remove();
  }
};

//modal
function showModal(modal){
  var $modal = $(modal);
  $modal.show();
  $("body").bind("touchmove",function(event){event.preventDefault();});
  $(".ch-modal-cont").wrapInner("<div class='ch-modal-wrap'></div>");
  setTimeout(function(){
    $modal.addClass("ch-modal-show");
  },300);
}
function closeModal(){
  $(".ch-modal").removeClass("ch-modal-show");
  $("body").unbind("touchmove");
  setTimeout(function(){
    $(".ch-modal").hide();
  },300);
}
$(".ch-modal-close, .modal-close").on("click",function(){
  closeModal();
});

//panel
function showPanel(target) {
  $('html, body').addClass('ov');
  $('.mask').show().css('opacity', 1);
  $(target).show();
  setTimeout(function () {
    $(target).addClass('visible');
  }, 100);
}
function hidePanel(target) {
  $('html, body').removeClass('ov');
  $('.mask').css('opacity', 0);
  $(target).removeClass('visible');
  setTimeout(function () {
    $('.mask').hide();
    $(target).hide();
  }, 300);
}



//对话框方法
function $alert(settings){
    var options={
      title:"确认了吗？",
      lbtn:"取消",
      rbtn:"",
      ahide:function(){
        $(".ch-alert").addClass("ch-alert-hide");
        $("body").unbind("touchmove");
        setTimeout(function(){
            $(".ch-alert").remove();
        },300);
      },
      aok:function(){
        // options.ahide();
      }
    };
    $.extend(options,settings);
    $("body").bind("touchmove",function(event){event.preventDefault();});
    if(options.rbtn.length>0){
      $("body").append('<div class="ch-alert"><div class="ch-alert-overlay"></div><div class="ch-alert-cont"><p>'+options.title+'</p><div class="ch-alert-bottom"><a class="ch-alert-close" href="javascript:;">'+options.lbtn+'</a><a class="ch-alert-ok" href="javascript:;">'+options.rbtn+'</a></div></div></div>');
    }else{
      $("body").append('<div class="ch-alert"><div class="ch-alert-overlay"></div><div class="ch-alert-cont"><p>'+options.title+'</p><div class="ch-alert-bottom"><a class="ch-alert-close" href="javascript:;">'+options.lbtn+'</a></div></div></div>');
    }
    $(".ch-alert").show();
    setTimeout(function(){
        $(".ch-alert").addClass("ch-alert-show");
    },300);

    $(".ch-alert").on("click",".ch-alert-bottom a", options.ahide);
    $(".ch-alert").on("click",".ch-alert-ok", options.aok);
};

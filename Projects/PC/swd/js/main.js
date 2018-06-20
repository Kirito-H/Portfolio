$(function(){
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
  var closeThiBox = function(elem) {
    $('.mask').hide(0);
    $(elem).hide(0);
  };
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

  //goods-list
  $('.goods-list .goods-name').attr('title', function () { return $(this).text(); });

  //thickbox
  $('.thickbox .close').click(function () { closeThiBox('.thickbox'); });
  $('.putOnSale').click(function () {
    if($(this).hasClass('done')) return;
    $('.tipBox .cont').html('<img src="images/tick.png" alt=""/> <span>上架成功</span>');
    showThiBox('.tipBox');
    $(this).addClass('done').text('已上架');
    setTimeout(function () {
      $('.tipBox, .mask').fadeOut(200);
    }, 1500);
  });
  $('.addToProdMng').click(function () {
    if($(this).hasClass('done')) return;
    $('.tipBox .cont').html('<img src="images/tick.png" alt=""/> <span>添加成功</span>');
    showThiBox('.tipBox');
    $(this).addClass('done').text('已添加');
    setTimeout(function () {
      $('.tipBox, .mask').fadeOut(200);
    }, 1500);
  });

  //sec-goodsDe
  $('.opt01').click(function () {
    $(this).toggleClass('selected');
  });
  $('.goods-opt-de .btn03').click(function () {
    if($(this).hasClass('toReceiveGoods')) {
      $(this).addClass('btn03-2 toDelGoods').removeClass('toReceiveGoods').text('删除商品');
    } else if($(this).hasClass('toDelGoods')) {
      $(this).removeClass('btn03-2 toDelGoods').addClass('toReceiveGoods').text('领取商品');
    }
  });
  $('.goodsDe-nav .nav-item').click(function () {
    $(this).addClass('curr').siblings('.nav-item').removeClass('curr');
    showTab($(this), '.goodsInfo-de li');
  });

  //data-list
  $('.data-list tr').click(function () {
    var $cheB =  $(this).find(':checkbox.cheB-Item');
    $cheB.click();
  });
  $('.data-list :checkbox').click(function () {
    var e = arguments.callee.caller.arguments[0] || event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
      e.stopPropagation();  // for Mozilla and webkit
    } else if (window.event) {
      window.event.cancelBubble = true;  // for IE
    }
  });
  $('.data-list .selectAll').click(function () {
    var $cheB =  $('.data-list').find(':checkbox.cheB-Item');
    if(this.checked) {
      $cheB.prop('checked', true);
    } else {
      $cheB.prop('checked', false);
    }
  });
  $('.data-list .partTxt .i-edit').on('click', function () {
    var txt = $(this).siblings('.txt').text(),
      $inp = $('.data-list .partEdit > input');
    $(this).parent('.partTxt').hide(0).siblings('.partEdit').show(0);
    $inp.val(txt);
  });
  $('.data-list .partEdit .i-done').on('click', function () {
    var val = $(this).siblings('input').val(),
      $txt = $('.data-list .partTxt .txt');
    $(this).parent('.partEdit').hide(0).siblings('.partTxt').show(0);
    $txt.text(val);
  });
  $('.data-list .funcDele').on('click', function () {
    $(this).parents('tr').remove();
  });
  $('.sec-prodEdit .nextStepTrig').on('click', function () {
    $('.step1-wrap').fadeOut(50);
    $('.step2-wrap').fadeIn(100);
    $(this).fadeOut(50);
  });

  //店铺装修（Shop Renovation）=======================
  $('.sec-renovation .btnUpload .inp-file01').on('click', function () {
    if($(this).parent().hasClass('editable')) {
      $(this).siblings('.btn01').removeClass('btn01-2').addClass('btn01-7').text('上传');
      $(this).parent().removeClass('editable');
    } else {
      $(this).siblings('.btn01').removeClass('btn01-7').addClass('btn01-2').text('修改');
      $(this).parent().addClass('editable');
    }
  });
  $('.btnSave').on('click', function () {
    $(this).parent('.part-bef').hide(0).siblings('.part-aft').show(0);
  });
  $('.btnReedit').on('click', function () {
    $(this).parent('.part-aft').hide(0).siblings('.part-bef').show(0);
  });
  //addItem
  var n = $('.inp-txt03.theFirst').val();
  $('.slideRenov .toAddItem').on('click', function () {
    var tmpl = $('<div class="sub-sec01"> <p class="para-item"> <span>广告顺序：</span><input class="inp-txt03 sp2" type="text" value="' + (++n) +'"/> <a class="fz16 c01 ml5 btnDelete" href="javascript:;">删除</a> </p > <p class="para-item"><span>标题：</span><input class="inp-txt03" type="text"/></p> <div class="img-preview"></div> <p class="para-item"> <span class="btnUpload vb"> <a class="btn01 btn01-7 mr10" href="javascript:;">上传</a> <input type="file" class="inp-file01"/> </span> <span class="tip-txt">建议尺寸 750x350</span> </p> <p class="para-item"> <span>对应链接：</span> <span class="part-bef"> <select class="select01 mr5"> <option value="0">请选择</option> </select> <select class="select01 mr5"> <option value="0">请选择</option> </select> <a class="fz16 c02 mr5 btnSave" href="javascript:;">保存</a> <a class="fz16 c01 btnCancle" href="javascript:;">取消</a> </span> <span class="part-aft"> <input type="text" class="inp-txt03 sp3 mr5"/><a href="javascript:;" class="fz16 c01 btnReedit">修改</a> </span> </p > </div>');
    var $funcBar = $(this).parent('.func-bar');
    tmpl.insertBefore($funcBar);
  });
  $('.slideRenov').on('click', '.btnDelete', function () {
    $(this).parents('.sub-sec01').remove();
    n--;
  });
  $('.navRenov .toAddItem').on('click', function () {
    var tmpl = $('<div class="sub-sec01"><p class="para-item"><span>专区位置：</span><input class="inp-txt03 sp2" type="text" value="4"/><a class="fz16 c01 ml5 btnDelete" href="javascript:;">删除</a></p><p class="para-item"><span>专区标题：</span><input class="inp-txt03" type="text" value="团购专区"/></p><p class="para-item sp2"><span>对应链接：</span><span class="part-bef"><select class="select01 mr5"><option value="0">请选择</option></select><a class="fz16 c02 mr5 btnSave" href="javascript:;">保存</a><a class="fz16 c01 btnCancle" href="javascript:;">取消</a></span><span class="part-aft"><input type="text" class="inp-txt03 sp3 mr5"/><a href="javascript:;" class="fz16 c01 btnReedit">修改</a></span></p></div>');
    var $funcBar = $(this).parent('.func-bar');
    tmpl.insertBefore($funcBar);
    $funcBar.fadeOut(100);
  });
  $('.navRenov').on('click', '.btnDelete', function () {
    $(this).parents('.sub-sec01').remove();
    n--;
  });
});
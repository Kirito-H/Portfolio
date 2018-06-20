$(function () {
  var closeThiBox = function (elem) {
    $('.mask').hide(0);
    $(elem).hide(0);
  };
  function showThiBox(elem) {
    var w, h, mt, ml;
    $('.mask').show(0);
    $(elem).show(0);
    w = $(elem).width();
    h = $(elem).height();
    mt = h / 2;
    ml = w / 2;
    //$(elem).css({'margin-top': -mt, 'margin-left': -ml});
  }
  var showTab = function (elem1, elem2) {
    var index = elem1.attr('data-index'),
      $elem = $(elem2);
    $elem.each(function () {
      if ($(this).attr('data-index') == index) {
        $elem.hide(0);
        $(this).show(0);
      }
    });
  };

  $('.renovTrig').on('click', function () {
    $('.renovTrig').removeClass('active');
    $(this).addClass('active');
    if(!($(this).hasClass('sp2'))) {
      $(this).find('.editTrig').addClass('active');
    }
  });
});
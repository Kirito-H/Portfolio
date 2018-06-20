/*钱端车游戏*/
function computeAngle(e, t) {
  return 180 * Math.atan2(e, t) / Math.PI
}
function cssRotate(e, t) {
  e.css({
    "-webkit-transform": "rotate(" + t + "deg) scaleZ(1)",
    "-moz-transform": "rotate(" + t + "deg) scaleZ(1)",
    "-ms-transform": "rotate(" + t + "deg) scaleZ(1)",
    "-o-transform": "rotate(" + t + "deg) scaleZ(1)",
    transform: "rotate(" + t + "deg) scaleZ(1)"
  });
}
//?
function vecNorm(e, t) {
  var i = 1 / Math.sqrt(e * e + t * t);
  return {x: e * i, y: t * i}
}
function vecSize(e, t) {
  return Math.sqrt(e * e + t * t)
}
function getScrollTop() {
  if ("undefined" != typeof pageYOffset) return pageYOffset;
  var e = document.body, t = document.documentElement;
  return t = t.clientHeight ? t : e, t.scrollTop
}
//小车移动时使页面跟随滚动
function scrollToTrace() {
  var winH = window.innerHeight,
      docH = document.body.clientHeight,
      curScrT = getScrollTop(),
      carT = $qdCar.getBoundingClientRect().top,
      carH = $qdCar.getBoundingClientRect().height;

  //fix bug: 修复小车从上往下走时页面不跟随小车滚动的问题
  if(carObj.moveCourse > 0) {
    curScrT = getScrollTop() + 1;
    if( getIphoneDeviceInfo().device == 'iPhone 6 plus' || (getIphoneDeviceInfo().device == 'iPhone 6s plus' && (getIphoneDeviceInfo().osMainVer >= 10 && getIphoneDeviceInfo().osMidVer >= 1 && getIphoneDeviceInfo().osSubVer >= 1)) ) {
      curScrT = getScrollTop() + 3
    }
  }

  if( ((carT+carH/3) > winH/2) && (carObj.moveCourse < 0) || ((carT+carH/3) < winH/2) && (carObj.moveCourse > 0) ) {
    if(carT < winH/5 || carT > winH*4/5) {
      var nScrT = curScrT + (carT+carH/3 - winH/2);
      if(nScrT < 0) {
        nScrT = 0
      }
      if(nScrT > winH) {
        nScrT = docH
      }
      //document.body.scrollTop = nScrT;
      window.scrollTo(0, nScrT);
    }
    return false
  } else if((carT+carH/3) != winH/2) {
    //document.body.scrollTop = curScrT + carObj.moveCourse;
    window.scrollTo(0, curScrT + carObj.moveCourse);
    // $("#scoutDbg").html('curScrT: ' + curScrT + ", carObj.moveCourse: " + carObj.moveCourse);
  }
}
function isAndroid(){
  var ua = navigator.userAgent.toLowerCase();
  return !!(/android/.test(ua));
}
//获取iPhone设备型号 & 系统
var getIphoneDeviceInfo = function() {
  var ua = navigator.userAgent.toLowerCase(),
      tgt_str = 'devicemodel=iphone',
      ip_index = ua.indexOf(tgt_str),
      sub_str = ua.substring(ip_index + tgt_str.length),
      end_ind = sub_str.indexOf(')'),
      result = {},
      tmp_arr = [],
      device,
      os_str = 'iphone os',
      os_index = ua.indexOf(os_str),
      os_sub_str = ua.substring(os_index + os_str.length),
      os_end_ind = os_sub_str.indexOf(' like');
  //获取手机设备对应版本
  result.version = sub_str.substring(0, end_ind);
  tmp_arr = result.version.split(',');
  result.ipMainVer = tmp_arr[0];
  result.ipSubVer = tmp_arr[1];
  if (result.version === '1,1') { device = 'iPhone 1G' }
  if (result.version === '1,2') { device = 'iPhone 3G' }
  if (result.version === '2,1') { device = 'iPhone 3GS' }
  if (result.version === '3,1') { device = 'iPhone 4(GSM)' }
  if (result.version === '3,3') { device = 'iPhone 4(CDMA)' }
  if (result.version === '4,1') { device = 'iPhone 4s' }
  if (result.version === '5,1') { device = 'iPhone 5(GSM)' }
  if (result.version === '5,2') { device = 'iPhone 5(CDMA)' }
  if (result.version === '5,3' || result.version === '5,4') { device = 'iPhone 5c' }
  if (result.version === '6,1' || result.version === '6,2') { device = 'iPhone 5s' }
  if (result.version === '7,1') { device = 'iPhone 6 plus' }
  if (result.version === '7,2') { device = 'iPhone 6' }
  if (result.version === '8,1') { device = 'iPhone 6s' }
  if (result.version === '8,2') { device = 'iPhone 6s plus' }
  if (result.version === '8,4') { device = 'iPhone SE' }

  //获取手机系统版本
  result.os_version = os_sub_str.substring(0, os_end_ind);
  tmp_arr = result.os_version.split('_');
  result.os_mainVer = tmp_arr[0];
  result.os_midVer = tmp_arr[1];
  result.os_subVer = tmp_arr[2];

  return {
    device: device,
    ipMainVer: result.ipMainVer,
    ipSubVer: result.ipSubVer,
    osVersion: result.os_version,
    osMainVer: result.os_mainVer,
    osMidVer: result.os_midVer,
    osSubVer: result.os_subVer
  }
};

//?
function carAffinityLen(e) {
  var t = e.movePoints[e.moveIndex],
    i = t.x - e.pos.x,
    n = t.y - e.pos.y;
  return vecSize(i, n)
}
//?
function carAffinitySwitchLen(e) {
  var t = e.rad * e.vel;
  if(t < e.rad) {
    return t = e.rad
  } else if(t > 2 * e.rad) {
    return t = 2 * e.rad
  } else {
    return t
  }
  //原写法：
  //return t < e.rad && (t = e.rad), t > 2 * e.rad && (t = 2 * e.rad), t
}
function carAffinitySwitch(e) {
  if(e.aimIndex == e.moveIndex) {
    var _carHd_x = $qdCar.getBoundingClientRect().left + $qdCar.getBoundingClientRect().width/2,
        _carHd_y = $qdCar.offsetTop,
        _aimP_x = getPoints()[e.aimIndex].x,
        _aimP_y = getPoints()[e.aimIndex].y;

    if(e.moveCourse > 0) {

      if ( ((e.aimIndex == $('.stage-2').data('index') || e.aimIndex == $('.stage-4').data('index')) && _carHd_x > _aimP_x) || ((e.aimIndex == $('.stage-3').data('index')) && _carHd_x*.9 < _aimP_x) || ((e.aimIndex == $('.stage-5').data('index')) && _carHd_y >= getPoints()[e.aimIndex-2].y) ) {
        e.stopSignal = 1;
      }

    } else {

      if ( ((e.aimIndex == $('.stage-2').data('index') || e.aimIndex == $('.stage-4').data('index')) && _carHd_x*.95 < _aimP_x) || ((e.aimIndex == $('.stage-3').data('index')) && _carHd_x > _aimP_x) || (e.aimIndex == $('.stage-1').data('index') && _carHd_y*1.25 < _aimP_y) ) {
        e.stopSignal = 1;
      }

    }
  } else {
    e.moveIndex += e.moveCourse;
    // $("#scoutDbg").html("c.movePointsCount: " + e.movePointsCount + "  c.aimIndex: " + e.aimIndex + "  c.vel: " + e.vel + "  c.rad: " + e.rad + "  c.pos.x: " + e.pos.x + "  c.pos.y: " + e.pos.y);
    // console.log("c.vec.x: " + e.vec.x + "  c.vec.y: " + e.vec.y);
    if(e.moveIndex < 0) {
      e.moveIndex = 0
    } else if(e.moveIndex >= e.movePointsCount) {
      e.moveIndex = e.movePointsCount - 1
    }
  }
  //原写法：
  //e.aimIndex == e.moveIndex ? e.stopSignal = 1 : (e.moveIndex += e.moveCourse), $("#scoutDbg").html("c.moveIndex: " + e.moveIndex + "  c.aimIndex: " + e.aimIndex + "  c.moveCourse: " + e.moveCourse + "  w.moveCourse: " + tgtPtIndex), e.moveIndex < 0 && e.moveIndex < 0, e.moveIndex >= e.movePointsCount && (e.moveIndex = e.movePointsCount - 1)
}
function carUpdateAffinity(e) {
  var t = carAffinityLen(e),
    i = carAffinitySwitchLen(e);
  if(i > t) {
    carAffinitySwitch(e)
  }
}
function carSetOut(e) {
  e.stopSignal = 0;
  carUpdateAffinity(e);
}
function carApplyNewAim(e, t) {
  e.moveCourse = (t >= e.moveIndex) ? 1 : -1;
  var i = e.aimIndex;
  e.aimIndex = t;
  if(i != t) {
    carSetOut(e);
  }
}
function carCheckWindowPos(e) {
  carApplyNewAim(e, tgtPtIndex);
  //原写法：
  // var t = getScrollTop();
  // t || (t = 0);
  // var i = window.innerHeight;
  // i || (i = document.documentElement.clientHeight), i || (i = 500);
  // e.scrollTop = t;
  // e.scrollBot = t + i;
  // e.scrollWh = i;
  // t += i / 2;
  // for (var n = e.aimIndex, o = 0, s = 0; s < e.movePoints.length - 1; s++) {
  //   var a = e.movePoints[s].y,
  //     r = e.movePoints[s + 1].y;
  //   if (t >= a && r >= t) {
  //     n = s; o = t;
  //     break
  //   }
  // }
  // var l = o - e.prevScrollTop,
  //   c = n - e.aimIndex;
  // if(!(1 != e.aimIndex && 0 != e.aimIndex && 0 >= l * c)) {
  //   e.prevScrollTop = o;
  //   carApplyNewAim(e, n, o);
  // }
}

function carInit(e) {
  e.dom = $("#qdCar");
  e.domLand = $("#road");
  e.movePoints = getPoints();
  e.movePointsCount = e.movePoints.length;
}
function carMoveTo(e) {
  var t = Math.round(e.scrollTop - e.pos.y), i = Math.round(e.scrollTop + e.scrollWh - e.pos.y), n = 0;
  if(t > 150) {
    n = 1
  }
  if(-250 > i) {
    n = -1
  }
  if(n) {
  //原写法:
  //if (t > 150 && (n = 1), -250 > i && (n = -1), n) {
    e.moveIndex += n;
    var o = e.movePoints[e.moveIndex],
      s = e.movePoints[e.moveIndex + n];
    e.pos.x = o.x;
    e.pos.y = o.y;
    var a = s.x - o.x,
      r = s.y - o.y,
      l = vecSize(a, r),
      c = {x: a / l, y: r / l};
    e.vec.x = c.x;
    e.vec.y = c.y;
    e.vec = vecNorm(e.vec.x, e.vec.y);
  }
}
function carMove(e, t) {
  carUpdateAffinity(e);
  //carMoveTo(e, e.aimIndex);
  var i = e.movePoints[e.moveIndex];
  if(e.stopSignal) {
    i = e.movePoints[e.moveIndex + e.moveCourse];
    if(!i) {
      i = e.movePoints[e.moveIndex]
    }
  }
  //原写法:
  //e.stopSignal && (i = e.movePoints[e.moveIndex + e.moveCourse]), i || (i = e.movePoints[e.moveIndex]);
  var n = i.x - e.pos.x,
    o = i.y - e.pos.y,
    s = vecSize(n, o),
    a = {x: n / s, y: o / s};
  // console.log(e.moveIndex, 'i.x: ' + i.x + ', i.y: ' + i.y);
  // console.log('e.pos.x_o: ' + e.pos.x + ', e.pos.y_o: ' + e.pos.y);
  // console.log("vecSize(n,o): "+s);
  // console.log("a.x: "+ a.x + ', a.y: ' + a.y);
  if(!e.stopSignal) {
    e.vel += .1;
    //控制最大速率, e.vel值越大速度越快
    if(e.vel > 6) {
      e.vel = 6
    }
  } else {
    e.vel *= .9;
    if(e.vel < 0) {
      e.vel = 0
    }
  }
  // console.log('e.vel: ' + e.vel);
  if(s > 2) { //s的值似乎一直都大于2
  //原写法:
  //if (e.stopSignal || (e.vel += .1, e.vel > 6 && (e.vel = 6)), e.stopSignal && (e.vel *= .9, e.vel < 0 && (e.vel = 0)), s > 2) {
    var r = 0, l = .021; //l值影响小车旋转角度时的平滑度及准确度, 值越大越不平滑, 值太小时旋转角度不准
    if (e.stopSignal) {
      r = l * Math.max(0, e.vel);
      // console.log('r: ' + r);
    } else {
      var c = e.vec.x - a.x,
        d = e.vec.y - a.y,
        u = vecSize(c, d);
      if(1 > u) {
        u = 1
      }
      Math.max(u, e.vel); //?
      // console.log(u>e.vel ? ('u: '+u) : ('e.vel: '+e.vel));
      r = l * Math.max(1, e.vel);
      if(r > 1) {
        r = 1
      }
      if(0 > r) {
        r = 0
      }
      // console.log('r: ' + r);
      //原写法:
      // 1 > u && (u = 1), Math.max(u, e.vel), r = l * Math.max(1, e.vel), r > 1 && (r = 1), 0 > r && (r = 0);
    }
    //r值的变化每一轮都是一样的
    //'* r'使小车在点与点之间移动的时候转得比较平滑
    // console.log('e.vec.x_o: ' + e.vec.x + ', e.vec.y_o: ' + e.vec.y);
    e.vec.x = e.vec.x * (1 - r) + a.x * r;
    e.vec.y = e.vec.y * (1 - r) + a.y * r;
    //e.vec = vecNorm(e.vec.x, e.vec.y); //这句以及上面两句的'* r'是处理平滑掉头的
    // console.log('a.x: ' + a.x + ', a.y: ' + a.y);
    // console.log('e.vec.x: ' + e.vec.x + ', e.vec.y: ' + e.vec.y);
    e.angle = computeAngle(e.vec.x, e.vec.y);
    cssRotate(e.dom, -e.angle);
  }
  //去掉'* e.vel'的话车会便很慢而且停不下来
  e.pos.x += e.vec.x * e.vel * t;
  e.pos.y += e.vec.y * e.vel * t;
  // console.log('e.pos.x: ' + e.pos.x + ', e.pos.y: ' + e.pos.y);
  // console.log('car.x: ' + $qdCar.getBoundingClientRect().left + ', car.y: ' + $qdCar.getBoundingClientRect().top);
  // console.log('carHfWh: ' + carHfWh + ', carHfHt: ' + carHfHt)
}
function foo() {
  if(isAndroid()) {
    carMove(carObj, 1);
  } else if(getIphoneDeviceInfo().ipMainVer >= 8) {
    carMove(carObj, .8);
  } else {
    carMove(carObj, 1.2);
  }
  var n = Math.floor(carObj.pos.x),
    o = Math.floor(carObj.pos.y),
    s = n - Math.floor(carHfWh),
    a = o - Math.floor(carHfHt);
  // console.log('car.left: ' + s + ', car.top: ' + a);
  scoutDom.style.left = s + "px";
  scoutDom.style.top = a + "px";
  scrollToTrace();
  if(!carObj.stopSignal) {
    window.requestAnimationFrame ? requestAnimationFrame(foo) : setTimeout("foo()", 16.7);
  } else {
    var nT = setInterval(function () {
      scrollToTrace();
    }, 16.7);
    setTimeout(function () {
      clearInterval(nT)
    }, 1800)
  }
}
function qdCarGo(startStage, endStage, callback) {
  //参数startStage表示启动时所在关卡, endStage为停车关卡
  if(/*endStage == 1 || */startStage == endStage/* || startStage == 5*/) {
    return false;
  }

  var _callback = callback || function () { },
    $startStg = $('.stage-' + startStage),
    $endStg = $('.stage-' + endStage),
    stInd = $startStg.data('index'),
    endInd = $endStg.data('index');
  tgtPtIndex = endInd;

  carObj.stopSignal = 0;
  carObj.vel = 0;
  carObj.aimIndex = endInd;

  foo();
  carCheckWindowPos(carObj);
  carObj.dom.addClass('moving');
  if(isAndroid()) {
    $('.stage').addClass('stop');
  }

  //判断是否已停车
  var v_x1, v_x2, v_y1, v_y2, int;
  int = setInterval(function () {
    v_x1 = $qdCar.offsetLeft;
    v_y1 = $qdCar.offsetTop;
    setTimeout(function () {
      v_x2 = $qdCar.offsetLeft;
      v_y2 = $qdCar.offsetTop;
    }, 400);
    if (v_x1 == v_x2 && v_y2 == v_y1) {
      carObj.dom.removeClass('moving');
      if(isAndroid()) {
        $('.stage').removeClass('stop');
      }

      //停车后执行回调
      callback && _callback();
      clearInterval(int);
    }
  }, 400);
}

var $qdCar = document.getElementById('qdCar'),
  $$qdCar = $('#qdCar'),
  // yy = isAndroid() ? 1/3 : 0.43,
  carHfWh = $qdCar.getBoundingClientRect().width * .43,
  carHfHt = $qdCar.getBoundingClientRect().height / 3;

//获得赛道路标点的坐标
function getPoints() {
  var points = [],
      //stage points dom
      $p1 = document.getElementById('stagePoint1'), $p2 = document.getElementById('stagePoint2'), $p3 = document.getElementById('stagePoint3'), $p4 = document.getElementById('stagePoint4'), $p5 = document.getElementById('stagePoint5'),

      //road marks dom
      $rdMk1 = document.getElementById('roadMark1'), $rdMk2 = document.getElementById('roadMark2'), $rdMk3 = document.getElementById('roadMark3'), $rdMk4 = document.getElementById('roadMark4'), $rdMk5 = document.getElementById('roadMark5'), $rdMk6 = document.getElementById('roadMark6'), $rdMk7 = document.getElementById('roadMark7'), $rdMk8 = document.getElementById('roadMark8'), $rdMk9 = document.getElementById('roadMark9'), $rdMk10 = document.getElementById('roadMark10'), $rdMk11 = document.getElementById('roadMark11'), $rdMk12 = document.getElementById('roadMark12'), $rdMk13 = document.getElementById('roadMark13'), $rdMk14 = document.getElementById('roadMark14'), $rdMk15 = document.getElementById('roadMark15'), $rdMk16 = document.getElementById('roadMark16'), $rdMk17 = document.getElementById('roadMark17'), $rdMk18 = document.getElementById('roadMark18'), $rdMk19 = document.getElementById('roadMark19'), $rdMk20 = document.getElementById('roadMark20'), $rdMk21 = document.getElementById('roadMark21'), $rdMk22 = document.getElementById('roadMark22'), $rdMk23 = document.getElementById('roadMark23'), $rdMk24 = document.getElementById('roadMark24'), $rdMk25 = document.getElementById('roadMark25'), $rdMk26 = document.getElementById('roadMark26'), $rdMk27 = document.getElementById('roadMark27'), $rdMk28 = document.getElementById('roadMark28'), $rdMk29 = document.getElementById('roadMark29'), $rdMk30 = document.getElementById('roadMark30'), $rdMk31 = document.getElementById('roadMark31'), $rdMk32 = document.getElementById('roadMark32'), $rdMk33 = document.getElementById('roadMark33'), $rdMk34 = document.getElementById('roadMark34'), $rdMk35 = document.getElementById('roadMark35'), $rdMk36 = document.getElementById('roadMark36'), $rdMk37 = document.getElementById('roadMark37'), $rdMk38 = document.getElementById('roadMark38'), $rdMk39 = document.getElementById('roadMark39'), $rdMk40 = document.getElementById('roadMark40'), $rdMk41 = document.getElementById('roadMark41'), $rdMk42 = document.getElementById('roadMark42'), $rdMk43 = document.getElementById('roadMark43'), $rdMk44 = document.getElementById('roadMark44'), $rdMk45 = document.getElementById('roadMark45'), $rdMk46 = document.getElementById('roadMark46'), $rdMk47 = document.getElementById('roadMark47'), $rdMk48 = document.getElementById('roadMark48'), $rdMk49 = document.getElementById('roadMark49'), $rdMk50 = document.getElementById('roadMark50'),

      //stage points
      origin_p = {x: $qdCar.offsetLeft + carHfWh, y: $qdCar.offsetTop + carHfHt},  //起点
      stage1_p = {x: $p1.offsetLeft, y: $p1.offsetTop}, stage2_p = {x: $p2.offsetLeft, y: $p2.offsetTop}, stage3_p = {x: $p3.offsetLeft, y: $p3.offsetTop}, stage4_p = {x: $p4.offsetLeft, y: $p4.offsetTop}, stage5_p = {x: $p5.offsetLeft, y: $p5.offsetTop},
      //road mark points
      rdMk1_p = {x: $rdMk1.offsetLeft, y: $rdMk1.offsetTop}, rdMk2_p = {x: $rdMk2.offsetLeft, y: $rdMk2.offsetTop}, rdMk3_p = {x: $rdMk3.offsetLeft, y: $rdMk3.offsetTop}, rdMk4_p = {x: $rdMk4.offsetLeft, y: $rdMk4.offsetTop}, rdMk5_p = {x: $rdMk5.offsetLeft, y: $rdMk5.offsetTop}, rdMk6_p = {x: $rdMk6.offsetLeft, y: $rdMk6.offsetTop}, rdMk7_p = {x: $rdMk7.offsetLeft, y: $rdMk7.offsetTop}, rdMk8_p = {x: $rdMk8.offsetLeft, y: $rdMk8.offsetTop}, rdMk9_p = {x: $rdMk9.offsetLeft, y: $rdMk9.offsetTop}, rdMk10_p = {x: $rdMk10.offsetLeft, y: $rdMk10.offsetTop}, rdMk11_p = {x: $rdMk11.offsetLeft, y: $rdMk11.offsetTop}, rdMk12_p = {x: $rdMk12.offsetLeft, y: $rdMk12.offsetTop}, rdMk13_p = {x: $rdMk13.offsetLeft, y: $rdMk13.offsetTop}, rdMk14_p = {x: $rdMk14.offsetLeft, y: $rdMk14.offsetTop}, rdMk15_p = {x: $rdMk15.offsetLeft, y: $rdMk15.offsetTop}, rdMk16_p = {x: $rdMk16.offsetLeft, y: $rdMk16.offsetTop}, rdMk17_p = {x: $rdMk17.offsetLeft, y: $rdMk17.offsetTop}, rdMk18_p = {x: $rdMk18.offsetLeft, y: $rdMk18.offsetTop}, rdMk19_p = {x: $rdMk19.offsetLeft, y: $rdMk19.offsetTop}, rdMk20_p = {x: $rdMk20.offsetLeft, y: $rdMk20.offsetTop}, rdMk21_p = {x: $rdMk21.offsetLeft, y: $rdMk21.offsetTop}, rdMk22_p = {x: $rdMk22.offsetLeft, y: $rdMk22.offsetTop}, rdMk23_p = {x: $rdMk23.offsetLeft, y: $rdMk23.offsetTop}, rdMk24_p = {x: $rdMk24.offsetLeft, y: $rdMk24.offsetTop}, rdMk25_p = {x: $rdMk25.offsetLeft, y: $rdMk25.offsetTop}, rdMk26_p = {x: $rdMk26.offsetLeft, y: $rdMk26.offsetTop}, rdMk27_p = {x: $rdMk27.offsetLeft, y: $rdMk27.offsetTop}, rdMk28_p = {x: $rdMk28.offsetLeft, y: $rdMk28.offsetTop}, rdMk29_p = {x: $rdMk29.offsetLeft, y: $rdMk29.offsetTop}, rdMk30_p = {x: $rdMk30.offsetLeft, y: $rdMk30.offsetTop}, rdMk31_p = {x: $rdMk31.offsetLeft, y: $rdMk31.offsetTop}, rdMk32_p = {x: $rdMk32.offsetLeft, y: $rdMk32.offsetTop}, rdMk33_p = {x: $rdMk33.offsetLeft, y: $rdMk33.offsetTop}, rdMk34_p = {x: $rdMk34.offsetLeft, y: $rdMk34.offsetTop}, rdMk35_p = {x: $rdMk35.offsetLeft, y: $rdMk35.offsetTop}, rdMk36_p = {x: $rdMk36.offsetLeft, y: $rdMk36.offsetTop}, rdMk37_p = {x: $rdMk37.offsetLeft, y: $rdMk37.offsetTop}, rdMk38_p = {x: $rdMk38.offsetLeft, y: $rdMk38.offsetTop}, rdMk39_p = {x: $rdMk39.offsetLeft, y: $rdMk39.offsetTop}, rdMk40_p = {x: $rdMk40.offsetLeft, y: $rdMk40.offsetTop}, rdMk41_p = {x: $rdMk41.offsetLeft, y: $rdMk41.offsetTop}, rdMk42_p = {x: $rdMk42.offsetLeft, y: $rdMk42.offsetTop}, rdMk43_p = {x: $rdMk43.offsetLeft, y: $rdMk43.offsetTop}, rdMk44_p = {x: $rdMk44.offsetLeft, y: $rdMk44.offsetTop}, rdMk45_p = {x: $rdMk45.offsetLeft, y: $rdMk45.offsetTop}, rdMk46_p = {x: $rdMk46.offsetLeft, y: $rdMk46.offsetTop}, rdMk47_p = {x: $rdMk47.offsetLeft, y: $rdMk47.offsetTop}, rdMk48_p = {x: $rdMk48.offsetLeft, y: $rdMk48.offsetTop}, rdMk49_p = {x: $rdMk49.offsetLeft, y: $rdMk49.offsetTop}, rdMk50_p = {x: $rdMk50.offsetLeft, y: $rdMk50.offsetTop};

  points = [stage1_p, rdMk1_p, rdMk2_p, rdMk3_p, rdMk48_p, rdMk4_p, rdMk5_p, rdMk6_p, rdMk7_p, rdMk8_p, rdMk9_p, rdMk10_p, rdMk11_p, rdMk47_p, stage2_p, rdMk12_p, rdMk13_p, rdMk14_p, rdMk15_p, rdMk16_p, rdMk17_p, rdMk18_p, rdMk19_p, rdMk20_p, rdMk21_p, rdMk45_p, rdMk46_p, stage3_p, rdMk22_p, rdMk23_p, rdMk24_p, rdMk25_p, rdMk26_p, rdMk27_p, rdMk28_p, rdMk29_p, rdMk30_p, rdMk31_p, rdMk32_p, stage4_p, rdMk33_p, rdMk34_p, rdMk35_p, rdMk36_p, rdMk37_p, rdMk38_p, rdMk39_p, rdMk49_p, rdMk50_p, rdMk40_p, rdMk41_p, rdMk42_p, rdMk43_p, rdMk44_p, stage5_p];

  return points;
}

//初始化
var carObj = {
      pos: getPoints()[0],  //起始点
      vec: {x: 0, y: 1},  //?
      vel: 2,  //速率
      rad: 40,  //弧度
      dom: 0,
      movePoints: 0, //移动点合集
      movePointsCount: 0, //移动点总数
      moveIndex: 0, //当前移动点
      moveCourse: 0, //表示方向，1为从上到下，-1为往回走
      aimIndex: 1, //目标点
      stopSignal: 0,
      domLand: 0
    },
  scoutDom = document.getElementById("qdCar"),
  tgtPtIndex = 0;
carInit(carObj);

//添加礼品图标
function addGift(tgtStage, link) {
  //tgtStage: 目标关卡(数字); link: 跳转链接
  var $tgtStage = $('.stage-' + tgtStage),
      gift_dom = '<span class="gift"></span>';
  $tgtStage.find('.bd').append(gift_dom);
  $tgtStage.on(evt, '.gift', function () {
    window.location.href = link;
  });
}
//移除礼品图标
function removeGift(tgtStage) {
  //tgtStage: 目标关卡(数字)
  var $tgtStage = $('.stage-' + tgtStage);
  $tgtStage.find('.gift').remove();
}

$(function () {
  // addGift(3, '#!');

  $('.stage').on(evt, function (event) {
    if(event.target.className.indexOf('gift') >= 0) {
      return false
    }

    var $active = $('.stage.active'),
        startStg = $active.data('stage'),
        endStg = $(this).data('stage');

    //状态class说明: moving-车正在移动中
    if($$qdCar.hasClass('moving') || startStg == endStg/* || startStg == 5 || endStg == 1 || $pa.hasClass('done')*/) {
      return false;
    }

    console.log('当前关卡: '+$active.data('stage'), ', 启动关卡: '+startStg, ', 目标关卡: '+endStg);
    $active.removeClass('active');
    $(this).removeClass('ready').addClass('active');
    //
    qdCarGo(startStg, endStg, function () {
      console.log('done')
    });
  }).on(evt, '.gift', function () {
    console.log('gift for u');
  });
});
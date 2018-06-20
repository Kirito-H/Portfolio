// JavaScript Document
//创建html5元素 for IE6,7,8
var elems = ['section','article','nav','header','footer','aside','menu','figure','figcaption','time','mark','details','summary','hgroup','dialog'];
for (var i = 0, j = elems.length; i < j; i++) {
	document.createElement(elems [i]);
}


$(document).ready(function(){
	$(".frinput input").each(function() {
		
		var thisVal = $(this).val();
		if (thisVal != "") {
			$(this).siblings("small").hide();
		} else {
			$(this).siblings("small").show();
		}
		$(this).focus(function() {
			
				
			$(this).siblings("small").hide();
			
		}).blur(function() {
			var val = $(this).val();
			if (val != "") {
				$(this).siblings("small").hide();
			
				if($("#checkIcon").css("display")!="block")
				$(this).siblings("a").show();
					
			} else {
				$(this).siblings("small").show();

				$(this).siblings("a").hide();

			}
		});
	});
	$(".setting").click(function(){
		if($('.usertic').css("display")=="none"){
			$(".usertic").css("display","block");
		}
		else{
			$('.usertic').css("display","none");
		}
	});
	$(".user").click(function(){
		if($('.usertic').css("display")=="none"){
			$(".usertic").css("display","block");
		}
		else{
			$('.usertic').css("display","none");
		}
	});
	
  $("#nav ul li:nth-child(1)").click(function(){
	     $("#nav ul li:nth-child(1)").addClass('hover');
	 	 $("#item1").css("display","block");
		 $("#item1").nextAll().css('display','none');
		 $("#nav ul li").nextAll().removeClass('hover');
	});
	
  $("#nav ul li:nth-child(2)").click(function(){
	     $("#nav ul li:nth-child(2)").addClass('hover');
	 	 $("#item2").css("display","block");
		 $("#item2").prevAll().css('display','none');
		 $("#nav ul li:nth-child(2)").prevAll().removeClass('hover');
		 $("#item2").nextAll().css('display','none');
		 $("#nav ul li:nth-child(2)").nextAll().removeClass('hover');
	});
	
	$("#nav ul li:nth-child(3)").click(function(){
	     $("#nav ul li:nth-child(3)").addClass('hover');
	 	 $("#item3").css("display","block");
		 $("#item3").prevAll().css('display','none');
		 $("#nav ul li:nth-child(3)").prevAll().removeClass('hover');
		 $("#item3").nextAll().css('display','none');
		 $("#nav ul li:nth-child(3)").nextAll().removeClass('hover');
	});
	
	$("#nav ul li:nth-child(4)").click(function(){
	     $("#nav ul li:nth-child(4)").addClass('hover');
	 	 $("#item4").css("display","block");
		 $("#item4").prevAll().css('display','none');
		 $("#nav ul li:nth-child(4)").prevAll().removeClass('hover');
		 $("#item4").nextAll().css('display','none');
		 $("#nav ul li:nth-child(4)").nextAll().removeClass('hover');
	});
	$("#nav ul li:nth-child(5)").click(function(){
	     $("#nav ul li:nth-child(5)").addClass('hover');
	 	 $("#item5").css("display","block");
		 $("#item5").prevAll().css('display','none');
		 $("#nav ul li:nth-child(5)").prevAll().removeClass('hover');
		 $("#item5").nextAll().css('display','none');
		 $("#nav ul li:nth-child(5)").nextAll().removeClass('hover');
	});
	$("#nav ul li:nth-child(6)").click(function(){
	     $("#nav ul li:nth-child(6)").addClass('hover');
	 	 $("#item6").css("display","block");
		 $("#item6").prevAll().css('display','none');
		 $("#nav ul li:nth-child(6)").prevAll().removeClass('hover');
		 $("#item6").nextAll().css('display','none');
		 $("#nav ul li:nth-child(6)").nextAll().removeClass('hover');
	});
	$("#nav ul li:nth-child(7)").click(function(){
	     $("#nav ul li:nth-child(7)").addClass('hover');
	 	 $("#item7").css("display","block");
		 $("#item7").prevAll().css('display','none');
		 $("#nav ul li:nth-child(7)").prevAll().removeClass('hover');
		 $("#item7").nextAll().css('display','none');
		 $("#nav ul li:nth-child(7)").nextAll().removeClass('hover');
	});
	$("#nav ul li:nth-child(8)").click(function(){
	     $("#nav ul li:nth-child(8)").addClass('hover');
	 	 $("#item8").css("display","block");
		 $("#item8").prevAll().css('display','none');
		 $("#nav ul li:nth-child(8)").prevAll().removeClass('hover');
		 $("#item8").nextAll().css('display','none');
		 $("#nav ul li:nth-child(8)").nextAll().removeClass('hover');
	});
	$("#nav ul li:nth-child(9)").click(function(){
	     $("#nav ul li:nth-child(9)").addClass('hover');
	 	 $("#item9").css("display","block");
		 $("#item9").prevAll().css('display','none');
		 $("#nav ul li:nth-child(9)").prevAll().removeClass('hover');
	});
	
/*	$(".contentleft ul li").hover(
	  function () {
		$(this).addClass("hover1");
		$(this).children().css("color","#FFF");
	  },
	  function () {
		$(this).removeClass("hover1");
		$(this).children().css("color","#a8a8a8");
	  }
	);*/
	
	/*$(".contentleft ul li").click(function(){
		//alert("aaaa");
		$(this).addClass("hover1");
		$(this).children().css("color","#FFF");
		$(this).siblings().removeClass("hover1");
		$(this).siblings().children().css("color","#a8a8a8");
	});*/
	
	
	$("#secondli").click(function(){
		//alert("aaaa");
		$(this).addClass("hover1");
		$("#secondietm1").css("display","none");
		$('#triangle').removeClass("triangleRight");
		$('#triangle').removeClass("triangleDown");
		$('#triangle').addClass("triangleRight1");
		$(this).children().css("color","#FFF");
		$(this).siblings().removeClass("hover1");
		$(this).siblings().children().css("color","#a8a8a8");
	});
	$("#thirdli").click(function(){
		//alert("aaaa");
		$(this).addClass("hover1");
		$("#secondietm1").css("display","none");
		$('#triangle').removeClass("triangleRight");
		$('#triangle').removeClass("triangleDown");
		$('#triangle').addClass("triangleRight1");
		$(this).children().css("color","#FFF");
		$(this).siblings().removeClass("hover1");
		$(this).siblings().children().css("color","#a8a8a8");
	});
	
	$("#fourthli").click(function(){
		//alert("aaaa");
		$('#firstli').addClass("hover1");
		$('#firstli').children().css("color","#FFF");
		$(this).removeClass("hover1");

	});
	/*var height = $(window).height();
	height = height - 200;
	$(".conentscrool").css("height",height);*/
	/*var width = $(window).width();
	width = width - 220;
	$(".conentRight").css("width",width);*/
	
	$('#pdgl').click(function(){
		if($('#secondietm1').css("display")=="none"){
			$("#secondietm1").css("display","block");
			$('#triangle').removeClass('triangleRight');
			$('#triangle').removeClass("triangleRight1");
			$('#triangle').addClass('triangleDown');
		}
		else{
			$('#secondietm1').css("display","none");
			$('#triangle').removeClass('triangleDown');
			$('#triangle').removeClass("triangleRight1");
			$('#triangle').addClass('triangleRight');
		}
	});
	$("#secondietm1 li").click(function(){
		$(this).addClass("hover3");
		$(this).children().css("color","#667787");
		$(this).siblings().removeClass("hover3");
		$(this).siblings().children().css("color","#a8a8a8");
	});
	
	
	$('#itm8pdgl').click(function(){
		if($('#itm8seconditm').css("display")=="none"){
			$("#itm8seconditm").css("display","block");
			$('#itm8triangle').removeClass('triangleRight');
			$('#itm8triangle').removeClass("triangleRight1");
			$('#itm8triangle').addClass('triangleDown');
		}
		else{
			$('#itm8seconditm').css("display","none");
			$('#itm8triangle').removeClass('triangleDown');
			$('#itm8triangle').removeClass("triangleRight1");
			$('#itm8triangle').addClass('triangleRight');
		}
	});
	$("#itm8seconditm li").click(function(){
		$(this).addClass("hover3");
		$(this).children().css("color","#667787");
		$(this).siblings().removeClass("hover3");
		$(this).siblings().children().css("color","#a8a8a8");
	});
	
	$("#itm8secondli").click(function(){
		//alert("aaaa");
		$('#itm8firstli').addClass("hover1");
		$('#itm8firstli').children().css("color","#FFF");
		$(this).removeClass("hover1");

	});
});
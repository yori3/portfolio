

//スムーズスクロール
	$('header a[href^="#"]').on('click',function(){
		var targetName=$(this).attr('href');
		
		var windowWidth = $(window).width();
		if(windowWidth <= 600){//スマホ用
			if($('header').hasClass('fixed')){//ヘッダーが画面にフィックスしてるとき
				var targetPos=$(targetName).offset().top - 50;
				$('html,body').animate({scrollTop:targetPos},800);
				return false;
			} else{//ヘッダーが画面にフィックスしてないとき
				var targetPos=$(targetName).offset().top - 132;
				$('html,body').animate({scrollTop:targetPos},1500);
				return false;
			}
		} else{//PC用
			if($('header').hasClass('fixed')){//ヘッダーが画面にフィックスしてるとき
				var targetPos=$(targetName).offset().top - 100;
				$('html,body').animate({scrollTop:targetPos},800);
				return false;
			} else{//ヘッダーが画面にフィックスしてないとき
				var targetPos=$(targetName).offset().top - 188;
				$('html,body').animate({scrollTop:targetPos},1500);
				return false;
			}
		}
		
	});
	
$('#totopBtn').hide();
 //スクロールイベントスタート
$(window).scroll(function(){
			
	var mainHeight = $('#main').height();//mainの高さ取得

	if($(window).scrollTop() > mainHeight){//スクロールmeinをこえたとき
			$('#totopBtn').slideDown('fast');
			$('header').addClass('fixed');
	} else {//mainより上にいるとき
			$('#totopBtn').slideUp('fast');
			$('header').removeClass('fixed');
	}
			 
	$('#totopBtn').css({//totopボタンを画面にフィックスさせる
			'position':'fixed',
			'bottom': '30px',
			'right':'30px'
	});	
		
	var scrVal = $(window).scrollTop();
	var pOffset = $('#profile').offset().top;
	
	if(scrVal >= (pOffset - 200)){//自分の写真のアニメーション
		$('#mydata').delay(300).addClass('scrollIn');
	} else{
		$('#mydata').removeClass('scrollIn');
	}
	
	//mainの背景のパララックス
	$('#main_wrapper').css('background-position',(scrVal * 1.1)+'px center,'+ (scrVal * 1.0)+'px '+(scrVal * 1.0)+'px');
	
	$('#main_wrapper p,#main_wrapper ul').css('opacity',1 - (scrVal / 400));
	
	$('#main').css('opacity',1 - (scrVal / 800));
	
	//ナビゲーションンの現在地表示
	var arrId = ['#profile','#works','#contact','footer'];//それぞれの位置を配列にする
	
	for(i=0;i<3;i++){//要素の数だけ繰り返し
		currentNav(i);
	}
	
	function currentNav(id){
		var currentPos = $(arrId[id]).offset().top - 200;//要素の位置取得
		var currentPos2 = $(arrId[(id+1)]).offset().top - 200;//次の要素の位置取得
		
		if(scrVal >= currentPos && scrVal < currentPos2){
			$('#nav li:nth-child(' + (id+1) + ') a').addClass('current');//線を付ける
			$(arrId[id]).stop().animate({opacity:'1'},500);//要素をフェードイン
		} else{
			$('#nav li:nth-child(' + (id+1) + ') a').removeClass('current');//線を外す
			$(arrId[id]).stop().animate({opacity:'0'},500);
		}
	}

});//スクロールイベント終わり
	 
	
//トップボタン
$('#totopBtn a').on('click',function(){
	$('html,body').animate({scrollTop:0},600);
	return false;
});

//経歴表示
var mydataWidth = $('#mydata img').css('width');
$('#mydata').css('width',mydataWidth);
$('#history').css('width',mydataWidth);
//スマホ用イベント
$('#photo').on('touchstart',function(){
	$('#history').stop().animate({'top':'0px'},'slow');
});
$('#history').on('touchstart',function(){
	$('#history').stop().animate({'top':'220px'},'slow');
});
	
	
//worksのモーダル
var imglist = $('#work_other li a').map(function(){
	return $(this).attr('href');
}).get();

var liNum = $('#work_other li').length;

for(i=0;i<liNum;i++){
	$('ul.image').append('<li><img src="' + imglist[i] + '"></li>');
}

$('#work_other li a').on('click',function(){
	var currentImg = $(this).attr('href');
	$('.modal').fadeIn(1000);
	$('.image li').hide();
	$('.image img[src="' + currentImg + '"]').parent('li').show();
	$('body').css({'overflow':'hidden'});
	setTimeout(function(){
		modalWidth();
	},100);
	return false;
});

$('.hide').on('click',function(){
	$('.modal').fadeOut(1000);
	$('body').css({'overflow':'auto'});
});

$('.next').on('click',function(){
	var lastModal = $('.image').find(':last');
	if($(lastModal).is(':visible')){
		$('.image li:visible').fadeOut(500);
		$('.image li:first').delay(501).fadeIn(500);
	} else{
		$('.image li:visible').fadeOut(500);
		$('.image li:visible').next('li').delay(501).fadeIn(500);
	}
	setTimeout(function(){
		modalWidth();
	},510);
});

$('.prev').on('click',function(){
	var firstModal = $('.image').find(':first');
	if($(firstModal).is(':visible')){
		$('.image li:visible').fadeOut(500);
		$('.image li:last').delay(501).fadeIn(500);
	} else{
		$('.image li:visible').fadeOut(500);
		$('.image li:visible').prev('li').delay(501).fadeIn(500);
	}
	setTimeout(function(){
		modalWidth();
	},510);
});

function modalWidth(){
	var imgWidth = $('.image li:visible').children('img').width();
	var imgHeight = $('.image li:visible').children('img').height();
	$('.modal-wrapper').css({
			'width':imgWidth,
			'left':'calc((100% - ' + imgWidth + 'px) / 2)',
			'top':'calc((100% - ' + imgHeight + 'px) / 2)'
	});
}

//要素挿入
$('#main').wrapInner('<div id="main_wrapper">');

//レスポンス時メニューボタン
$(window).on('load resize',function(){
	
	var windowWidth = $(window).width();
	
	if(windowWidth <= 600){
		$('#nav').addClass('slidenav');
		$('#nav').before('<div id="toggle"><a href="#"><span class="menuBtn"></span></a></div>');
		$('#nav').css('display','none');
		$('#toggle a').click(function(){
			$('.slidenav').stop().animate({width:'toggle'},500);
			$('.menuBtn').toggleClass('on');
			return false;
		});
		$('#nav a[href^="#"]').click(function(){
			$('.slidenav').stop().animate({width:'hide'},500);
			$('.menuBtn').removeClass('on');
			return false;
		});
	} else{
		$('#nav').removeClass('slidenav');
		$('#nav').css('display','block');
		$('#toggle').css('display','none');
	}
});


$('.loader').delay(4500).fadeOut(1000);
$('.svgImg').delay(3800).fadeOut(900);
setTimeout(function(){
	$('html,body').css({'overflow':'auto'});
},8000);


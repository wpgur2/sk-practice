
//top버튼 (맨위로가면 숨기기)
$(function() {
    $('.topBtn').click(function() {
        $('html, body').stop().animate({ scrollTop: 0 }, 'slow');
    });
});

//모바일
$(function(){
    //모바일 햄버거 버튼 클릭
    $(".mNav").click(function(){
    var mMenu = $('.mMenu');
    if(mMenu.hasClass('on')){
        mMenu.removeClass('on');
        $('#header').css('display','block');
        $("body").css("overflow", "auto");
    }else{
        mMenu.addClass('on');
        $('#header').css('display','none');
        $("body").css("overflow", "hidden");
    }
    });

    // x버튼 클릭
    $('.xbtn').on('click', function(e){
        $(".mNav").click();
    });

    //li 클릭하면 색변함
    $(".mGnb>li").click(function() {
        var color = $(this).find("a");
        
        if (color.hasClass("active")) {
            color.removeClass("active"); 
        } else {
            color.addClass("active"); 
        }
    });
    //아코디언메뉴
    $('.mGnb>li').click(function(){
        $('.mSubMenu').slideUp();
        if($(this).children('.mSubMenu').is(':visible')){
            $(this).children('.mSubMenu').slideUp();
        }else{
            $(this).children('.mSubMenu').slideDown();
        }
    });
});


//nav메뉴 누르면 서브메뉴 나타나고 다시 누르면 없어짐
$(function() {
    var menu= $('nav>.gnb>li>a');
    var subM = $('.subMenu');

    menu.click(function(e) {
        e.preventDefault();

        if (subM.is(':visible')) {
            subM.slideUp(300);
            $('#header').removeClass('active');
            $('#header').removeClass('open');
        } else {
            subM.slideDown(300);
            $('#header').addClass('active');
            $('#header').addClass('open');
        }
    });
});

//스크롤내리면 메뉴없어지고 올리면 메뉴 나타남
$(function(){
    var wHeight = $(window).height();
    var dHeight = $(document).height();
    var headerHeight = $("#header").outerHeight();
    var lastScrollTop = 0;
    var moveScroll;

    $(window).scroll(function(event){ //스크롤을 감지
        moveScroll = true;
    });

    setInterval(function(){ //스크롤이 감지가 되면 0,25마다 실행
        if(moveScroll){
            hasScroll();
            moveScroll = false;
        }
    },250);

    function hasScroll(){
        var wScroll = $(this).scrollTop();  //현재 스크롤 값

        if( wScroll > lastScrollTop && wScroll > headerHeight ){
                //스크롤을 내렸을 때 
                $("#header").addClass("on");
        }else {
                //스크롤을 올렸을 때 
                if(wScroll + wHeight < dHeight) {
                    $("#header").removeClass("on");
                }
        }
        lastScrollTop = wScroll;
    }
});

//스크롤시 한 섹션 이동 브라우저가 특정사이즈가되면 적용x
$(function(){
    function responsiveFunction() {
        if (window.innerWidth < 900) {
            removeScrollEvent();
        } else {
            addScrollEvent();
        }
    }

    function addScrollEvent() {
        $(window).on('mousewheel', handleMouseWheel);
    }

    function removeScrollEvent() {
        $(window).off('mousewheel', handleMouseWheel);
    }

    function handleMouseWheel(e) {
        var delta = e.originalEvent.deltaY;
            if (delta > 0) {
                $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() +  $(window).height()
                }, 550); 
            } else {
                $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() -  $(window).height()
                }, 550); 
            }
    }
    responsiveFunction();

    window.addEventListener('resize', responsiveFunction);
});

$(function(){
    //오른쪽 dot메뉴
    var dot = $("#dot > ul > li");
    var nav = $('nav ul li');
    var contents = $("#contents > div");
    var enterprise= $('.enterprise li');
    
    dot.click(function(e){
        e.preventDefault();
        var target = $(this);
        var index = target.index();
        var section = contents.eq(index);
        var offset = section.offset().top;
        $("html,body").stop().animate({ scrollTop:offset },700);
    });


    //스크롤하면 active추가
    $(window).scroll(function(){
        //top버튼 누르면 맨위로감
        var top = $(window).scrollTop(); 
        var windowHeight = $(window).height();

        if (top == 0) {
            $('.topBtn').css('display','none')
        } else {
            $('.topBtn').css('display','block')
        }
        
        //dot메뉴에 엑티브추가
        var wScroll = $(this).scrollTop();
        
        if(wScroll >= contents.eq(0).offset().top){
            dot.removeClass("active");
            dot.eq(0).addClass("active");
        }
        if(wScroll >= contents.eq(1).offset().top){
            dot.removeClass("active");
            dot.eq(1).addClass("active");
        }
        if(wScroll >= contents.eq(2).offset().top){
            dot.removeClass("active");
            dot.eq(2).addClass("active");
        }
        if(wScroll >= contents.eq(3).offset().top){
            dot.removeClass("active");
            dot.eq(3).addClass("active");
        }
        if(wScroll >= contents.eq(4).offset().top){
            dot.removeClass("active");
            dot.eq(4).addClass("active");
        }
        if(wScroll >= contents.eq(5).offset().top){
            dot.removeClass("active");
            dot.eq(5).addClass("active");
        }

        //text animation
        if(wScroll >=contents.eq(1).offset().top -$(window).height()/3){
            contents.eq(1).addClass('show');
        }
        if(wScroll >=contents.eq(2).offset().top -$(window).height()/3){
            contents.eq(2).addClass('show');
        }
        if(wScroll >=contents.eq(4).offset().top -$(window).height()/3){
            enterprise.each(function(){
                $(this).addClass('show');
            });
        }
    });
});
//section1에 opacity 1로 바꿈 
$(function(){
    var text1 = $('.mainText>h2');
    text1.animate({ opacity: 1 }, 100);

    var text2 = $('.mainText>p');
    text2.animate({ opacity: 1 }, 400);
});

//뉴스 롤링기능
$(document).ready(function(){
	var height =  $(".news").height();
	var num = $(".rolling li").length;
	var max = height * num;
	var move = 0;
	function noticeRolling(){
		move += height;
		$(".rolling").animate({"top":-move},600,function(){
			if( move >= max ){
				$(this).css("top",0);
				move = 0;
			};
		});
	};
	noticeRollingOff = setInterval(noticeRolling,3000);
	$(".rolling").append($(".rolling li").first().clone());
});

    

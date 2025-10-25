

jQuery(document).ready(function($) {
  
  setTimeout(function() { 
    localStorage.setItem('preloader', 'false');
  }, 1801);

  if(localStorage.getItem("preloader") == 'false') {
    $('.preloader').hide();
  }
  
  // window.onload = function () {
  //   window.scrollTo(0, 0);
  // };

  // Image.svg to svg code
  jQuery('.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');
  });

  var lastScrollTop = 0;
  var wHeight = $( window ).height() * 0.68;
  var reverseWHeight = $( window ).height() - wHeight;

  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if(st > 400) {
      if (st > lastScrollTop){
        $('.header').addClass('hide');
        $('.default-anchor').removeClass('top');
      } else {
        $('.header').removeClass('hide');
        $('.default-anchor').addClass('top');
      }
      lastScrollTop = st;
    }

    if($('.hero').length) {
      var elementHeight = $(this).height();
      $('.hero').css({
        opacity: function() {
          return (elementHeight - st) / elementHeight;
        }
      });
      // var translate = (elementHeight - st) / elementHeight;
      // $('.hero').css({transform: 'translateY(-' + translate +'%)'});
    }

    if($('.banner').length) {
      var elementHeight = $(this).height();
      var elementTop = $('.banner').offset().top;
      var newPoint = st - elementTop + elementHeight*0.8;
      var mnojetel = Math.pow(newPoint, 0.3);
      $('.banner').css({
        opacity: function() {
          return 1 - (elementTop - newPoint*mnojetel) / elementTop;
        }
      });
    }

    if($('.minuses').length) {
      $( ".minuses-list-item:not(:first-child)" ).each(function( index ) {
        if(st + wHeight > $(this).offset().top) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    }

    if($('.wiki-title').length) {
      var elementHeight = $(this).height();
      var translate = (elementHeight - st) / elementHeight;
      if(translate < 0.193168) {
        translate = 0.193;
      }
      if(window.matchMedia('(max-width: 1400px)').matches){
        if(translate < 0.3) {
          translate = 0.3;
        }
      }
      if(window.matchMedia('(max-width: 768px)').matches){
        if(translate < 0.55) {
          translate = 0.55;
        }
      }
      $('.wiki-title').css({transform: 'scale(' + translate +')'});
    }

    if($('.wiki-logo').length) {
      var elementTop = $('.wiki').offset().top;

      if(st + wHeight > elementTop) {
        $('.wiki-logo').css({
          opacity: function() {
            var elementHeight = $('.wiki').height() / 2;
            return (elementHeight - st) / elementHeight;
          }
        });
      }
    }

    if($('.default-nav').length) {
      if(st + $( window ).height() > $('.default').offset().top + $('.default').outerHeight()) {
        $('.default-nav').addClass('stop');
      } else {
        $('.default-nav').removeClass('stop');
      }

      $(".default-content-item-head").each(function () {

        if (st > $(this).offset().top - 97) {
          var blockId = $(this).attr("id");
          $(".default-nav-item").removeClass("active");
          $(".default-anchor-item").removeClass("active");
          $('.default-nav-item[href^="#' + blockId + '"]').addClass("active");
          $('[data-anchor^="' + blockId + '"]').addClass("active");
        }
      });

      $(".anchor-block").each(function () {
        if (st > $(this).offset().top - 97) {
          var blockId = $(this).attr("id");
          $(".default-anchor-item-list a").removeClass("active");
          $('.default-anchor-item-list a[href^="#' + blockId + '"]').addClass("active");
        }
      });

      if(st < $('.default-content').offset().top - 96) {
        $(".default-nav-item").removeClass("active");
      }
    }

    if($('.default_single').length) {
      st = st + ($( window ).height()*0.5);
      var c = $('.lines-top').offset().top,
      d = $('.lines-top').height(),
      scrollPercent = ((st-c) / (d)) * 100;
      $('.lines-top .line-current').css('height', scrollPercent + '%');

      if(st > c) {
        var c2 = $('.lines-mid').offset().top,
        d2 = $('.lines-mid').height(),
        scrollPercent = ((st-c2) / (d2)) * 100;
        $('.lines-mid .line-current').css('height', scrollPercent + '%');
      }

      if(st > c2) {
        var c3 = $('.lines-bot').offset().top,
        d3 = $('.lines-bot').height(),
        scrollPercent = ((st-c3) / (d3 / 2)) * 100;
        $('.lines-bot .line-current').css('height', scrollPercent + '%');
      }
      
    }

    if($('.who').length) {
      st = st + ($( window ).height()*0.7);
      
      $('.who-line').each(function(){
        var c = $(this).offset().top,
        d = $(this).height(),
        scrollPercent = ((st-c) / (d)) * 100;
  
        if(st > c) {
          $(this).find('.who-line__current').css('height', scrollPercent + '%');
        } else {
          $(this).find('.who-line__current').css('height', 0 + '%');
        }
      });
    }
  });


  if(window.matchMedia('(max-width: 768px)').matches){
    $('.features').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
    $('.features').find('.primary-btn').addClass('body-12mu').removeClass('body-14mu');
    $('.faq').find('.body-18mp').addClass('body-16mp').removeClass('body-18mp');
    $('.faq').find('.h3').addClass('h5').removeClass('h3');
    $('.minuses').find('.h4').addClass('h5').removeClass('h4');
    $('.files').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
    $('.wiki').find('.body-18mp').addClass('body-16mp').removeClass('body-18mp');
    $('.s404').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
    $('.form').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
    $('.info').find('.body-18mp').addClass('body-16rp').removeClass('body-18mp');
    $('.default-wrap').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
    $('.default-wrap').find('.body-18bp').addClass('body-16bp').removeClass('body-18bp');
    $('.input-file').find('.body-16rp').addClass('body-14rp').removeClass('body-16rp');
  }
  if(window.matchMedia('(max-width: 1400px)').matches){
    $('.footer').find('.body-14m').addClass('body-12m').removeClass('body-14m');
  }
  $(window).on('resize', function() {
    if(window.matchMedia('(max-width: 768px)').matches){
      $('.features').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
      $('.features').find('.primary-btn').addClass('body-12mu').removeClass('body-14mu');
      $('.faq').find('.body-18mp').addClass('body-16mp').removeClass('body-18mp');
      $('.faq').find('.h3').addClass('h5').removeClass('h3');
      $('.minuses').find('.h4').addClass('h5').removeClass('h4');
      $('.files').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
      $('.wiki').find('.body-18mp').addClass('body-16mp').removeClass('body-18mp');
      $('.s404').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
      $('.form').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
      $('.info').find('.body-18mp').addClass('body-16rp').removeClass('body-18mp');
      $('.default-wrap').find('.body-18rp').addClass('body-16rp').removeClass('body-18rp');
      $('.default-wrap').find('.body-18bp').addClass('body-16bp').removeClass('body-18bp');
      $('.input-file').find('.body-16rp').addClass('body-14rp').removeClass('body-16rp');
    }
    if(window.matchMedia('(max-width: 1400px)').matches){
      $('.footer').find('.body-14m').addClass('body-12m').removeClass('body-14m');
    }
  });


  $('.faq-content-item').not('.active').hide();
  $(document).on("click", ".faq-nav-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".faq")
        .find(".faq-content-item")
        .hide()
        .eq($(this).index())
        .fadeIn();
  });

  $('.news-tab-item').not('.active').hide();
  $(document).on("click", ".news .news-nav-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".news")
        .find(".news-tab-item")
        .hide()
        .eq($(this).index())
        .fadeIn();
  });

  $('.posts-tab-item').not('.active').hide();
  $(document).on("click", ".posts .news-nav-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".posts")
        .find(".posts-tab-item")
        .hide()
        .eq($(this).index())
        .fadeIn();
  });

  if($('.ice').length) {
    document.addEventListener("mousemove", parallax);
    function parallax(event) {
      this.querySelectorAll(".ice").forEach((shift) => {
        const position = shift.getAttribute("value");
        const x = (window.innerWidth - event.pageX * position) / 90;
        const y = (window.innerHeight - event.pageY * position) / 90;
  
        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  }

  if($('.wiki-logo').length) {
    document.addEventListener("mousemove", parallax);
    function parallax(event) {
      this.querySelectorAll(".wiki-logo").forEach((shift) => {
        const position = shift.getAttribute("value");
        const x = (window.innerWidth - event.pageX * position) / 90;
        const y = (window.innerHeight - event.pageY * position) / 90;
  
        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    }
  }

  $(".menu-btn").on('click', function () {
    $('#menuModal').arcticmodal();
  });

  $(".stories-item").on('click', function () {
    $(this).addClass('active');
    $('#storiesModal').arcticmodal({
      beforeClose: function(data, el) {
        $('.stories-swiper-slide video').trigger('pause');
      },
    });
  });
  
  $(".steps-btn").on('click', function () {
    $('#stepsModal').arcticmodal();
  });

  //Потом сделать на всю карточку
  // $(".video-link").on('click', function () {
  //   $('#videoModal').arcticmodal();
  // });

  $(".create-btn").on('click', function () {
    $('#createModal').arcticmodal();
  });

  $(".aut-btn").on('click', function () {
    $('#autModal').arcticmodal();
  });

  $(".change-btn").on('click', function () {
    let login = $(this).data('login');
    $('input[name=changePassword]').val(login);
    $('#changeModal').arcticmodal();
  });

  $(".pay-btn").on('click', function () {
    $('#payModal').arcticmodal();
  });

  $(".promo-btn").on('click', function () {
    $('#promoModal').arcticmodal();
  });

  $('#payModal .main-btn').on('click', function () {
    $('#payModal').arcticmodal('close');
    $('#paySucModal').arcticmodal();
  });

  $('.payment-btn').on('click', function () {
    $('#paymentSucModal').arcticmodal();
  });

  $('.chat-add').on('click', function () {
    $('#chatModal').arcticmodal();
  });

  $('#promoModal .main-btn').on('click', function () {
    $('#promoModal').arcticmodal('close');
    $('#promoSucModal').arcticmodal();
  });

  $(".item-btn").on('click', function () {
    let item = $(this).data('item');
    $('input[name=itemName]').val(item);
    let counts = $(this).data('counts');
    $('.count-all').attr('data-all-counts', counts);
    $('#sendModal').arcticmodal();
  });
  

  $('#sendModal .main-btn').on('click', function () {
    $('#sendModal').arcticmodal('close');
    $('#sendSucModal').arcticmodal();
  });

  $(".banner_animation").on('mousedown', function () {
    $('.banner-bgafter').addClass('active');
  });
  $(".banner_animation").on('mouseup', function () {
    $('.banner-bgafter').removeClass('active');
  });

  $(".parrent-item").on('click', function () {
    $(this).toggleClass('closed');
    $(this).siblings('.sub-menu').toggle(400);
  });

  $('.account').addClass('open');
  $(".menu-account-btn").on('click', function () {
    $(this).toggleClass('active');
    $('.account').toggleClass('open');
    $('.account-nav').toggleClass('hide');
    $('.account-nav').toggleClass('open');
    $(".parrent-item").addClass('closed');
    $('.sub-menu').hide(400);
  });

  $(".footer-mid-partners-item").hover(
    function() {
      $(this).removeClass('hover');
    }, function() {
      $(this).addClass('hover');
    }
  );

  new WOW({
    // mobile: false,
  }).init();


  var storiesSwiper = new Swiper('.stories-swiper', {
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    updateOnWindowResize: true,
    spaceBetween: 0,
    allowTouchMove: true,
    initialSlide: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    on: {
      click() {
        storiesSwiper.slideTo(this.clickedIndex);    
      },
    },
    breakpoints: {
      991: {
        allowTouchMove: false,
      },
    }
  });

  storiesSwiper.on('slideChangeTransitionEnd', function(){
    $('.stories-swiper-slide video').trigger('pause');
    $("video").one("pause", function() {
      this.currentTime = 0;
      this.volume = 0.7;
    }); 
    $('.stories-swiper-slide').eq(storiesSwiper.activeIndex).find('video').trigger('play');
    $('.stories-item').eq(storiesSwiper.activeIndex).addClass('active');
  });

  $(".stories-item").on('click', function () {
    storiesSwiper.slideTo($(this).index());
    $('.stories-swiper-slide video').trigger('pause');
    $("video").one("pause", function() {
      this.currentTime = 0;
      this.volume = 0.7;
    }); 
    $('.stories-swiper-slide').eq(storiesSwiper.activeIndex).find('video').trigger('play');
  });


  /*
   ** Anchor scroll
   */
   $('a[href^="#"]').click(function(){

    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
      var space = 96;
      if(window.matchMedia('(max-width: 768px)').matches){
        space = 36;
      }
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top - space}, 900); 
    }
    return false;
  });

  
  // var listTitles = [];
  var postSwiper = [];
  var tClass = "h7 ";
  if(window.matchMedia('(max-width: 1400px)').matches){
    tClass = "h8 ";
  }
  $('.posts-tab-item').each(function(i) {
    var this_ID = $(this).attr('id');
    var titles = [];

    $('#'+this_ID+' .posts-swiper .posts-swiper-item').each(function () {
      var title = $(this).find('p').text();
      titles.push(title);
    });

     postSwiper[i] = new Swiper('#'+this_ID+' .posts-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 48,
      direction: 'vertical',
      centeredSlides: true,
      loop: true,
      allowTouchMove: false,
      mousewheel: {
        releaseOnEdges: true,
      },
      pagination: {
        el: '#'+this_ID+' .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
        
        renderBullet: function (index, className) {
          return '<div class="'+ tClass + className + '">' + (titles[index]) + '</div>';
        },
      },
      breakpoints: {
        1400: {
          spaceBetween: 128,
        }
      }
    });
  });
  
  


  $(document).on('click', '.plus, .minus', function () {
		var qty = $(this).closest('.number-wrap');
		var val = parseFloat(qty.find('input').val());
		var max = parseFloat(qty.find('input').attr('max'));
		var min = parseFloat(qty.find('input').attr('min'));
		var step = 1;

      if ($(this).is('.plus')) {
        if (max && max <= val) {
          qty.find('input').val(max);
        } else {
          qty.find('input').val(val + step);
        }
      } 
      
      if ($(this).is('.minus')) {
        if (min && min >= val) {
          qty.find('input').val(min);
        } else if (val > min) {
          qty.find('input').val(val - step);
        }
      }

      qty.find('input').trigger('change');
	});

  $('.number-wrap input').on('change', function () {
		var val = parseFloat($(this).val());
		var max = parseFloat($(this).attr('max'));
		var min = parseFloat($(this).attr('min'));

    if(val >= max) {
      $(this).val(max);
    }

    if(val <= min) {
      $(this).val(min);
    }
	});


  $('.profile-tab-item').not('.active').hide();
  $(document).on("click", ".profile-nav-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".account")
        .find(".profile-tab-item")
        .hide()
        .eq($(this).index())
        .fadeIn();
  });

  $(document).on("click", ".payments-list-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
  });

  $('#chatModal .input-file input[type=file]').on('change', function(){
    let file = this.files[0];
    $('.file-btn-text').text(file.name);

    if(file){
      $(".file-preview").attr("src", URL.createObjectURL(file)).addClass('active');
      $('.file-remove').addClass('active');
    }
  });

  
  $('.file-remove').on("click", function () {
    $(this).removeClass('active');
    $(".file-preview").removeClass('active');
    $('#chatModal .input-file input[type=file]').val('');
    $('.file-btn-text').text('Файл не выбран');
  });

  $('.account-chat-right-tab').not('.active').hide();
  $(document).on("click", ".account-chat-list-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".account-chat")
        .find(".account-chat-right-tab")
        .hide().removeClass('active')
        .eq($(this).index())
        .fadeIn().addClass('active');
  });

  $(document).on("click", ".back-chat", function () {
    $('.account-chat-list-item').removeClass('active');
    $(".account-chat-right-tab").hide().removeClass('active');
  });

  $(document).on("click", ".user", function () {
    $('.user-modal').toggleClass('active');
  });

  $(document).on("click", ".back-chat", function () {
    $('.account-chat-list-item').removeClass('active');
    $(".account-chat-right-tab").hide().removeClass('active');
  });

  $(document).click(function(event) {
    if (!$(event.target).is(".user")) {
      $('.user-modal').removeClass('active');
    }
  });

  $('.payments-list_col').find('.payments-list-item').hide();
  $('.pay-title').hide();
  $('.payments-list_filter .payments-list-item').on( 'click', function() {
      var filterValue = $(this).attr('data-filter');
      var titleValue = $(this).attr('data-title');
      $('.pay-title').text(titleValue);
      $('.pay-title').fadeIn();
      $('.payments-list_col').find('.payments-list-item').removeClass('show active');
      $('.payments-list_col').find(filterValue).addClass('show');
  });

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);


if($('.banner_animation').length) {
  const rippleSettings = {
    maxSize: 100,
    animationSpeed: 5,
    strokeColor: [148, 217, 255],
  };
  
  const canvasSettings = {
    blur: 8,
    ratio: 1,
  };
  
  function Coords(x, y) {
    this.x = x || null;
    this.y = y || null;
  }
  
  const Ripple = function Ripple(x, y, circleSize, ctx) {
    this.position = new Coords(x, y);
    this.circleSize = circleSize;
    this.maxSize = rippleSettings.maxSize;
    this.opacity = 1;
    this.ctx = ctx;
    this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
      ${Math.floor(rippleSettings.strokeColor[1])},
      ${Math.floor(rippleSettings.strokeColor[2])},
      ${this.opacity})`;
  
    this.animationSpeed = rippleSettings.animationSpeed;
    this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
  };
  
  Ripple.prototype = {
    update: function update() {
      this.circleSize = this.circleSize + this.animationSpeed;
      this.opacity = this.opacity - this.opacityStep;
      this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
        ${Math.floor(rippleSettings.strokeColor[1])},
        ${Math.floor(rippleSettings.strokeColor[2])},
        ${this.opacity})`;
    },
    draw: function draw() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.arc(this.position.x, this.position.y, this.circleSize, 0,
        2 * Math.PI);
      this.ctx.stroke();
    },
    setStatus: function setStatus(status) {
      this.status = status;
    },
  };
  
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const ripples = [];
  
  const height = $('.banner').outerHeight()*2;
  const width = document.body.clientWidth;
  
  const rippleStartStatus = 'start';
  
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  
  canvas.style.filter = `blur(${canvasSettings.blur}px)`;
  
  canvas.width = width * canvasSettings.ratio;
  canvas.height = height * canvasSettings.ratio;
  
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  let animationFrame;
  
  // Add GUI settings
  // const addGuiSettings = () => {
  //   const gui = new dat.GUI();
  //   gui.add(rippleSettings, 'maxSize', 0, 1000).step(1);
  //   gui.add(rippleSettings, 'animationSpeed', 1, 30).step(1);
  //   gui.addColor(rippleSettings, 'strokeColor');
  
  //   const blur = gui.add(canvasSettings, 'blur', 0, 20).step(1);
  //   blur.onChange((value) => {
  //     canvas.style.filter = `blur(${value}px)`;
  //   });
  // };
  
  // addGuiSettings();
  
  // Function which is executed on mouse hover on canvas
  const canvasMouseOver = (e) => {
    const x = e.clientX * canvasSettings.ratio;
    const y = e.clientY * canvasSettings.ratio;
    ripples.unshift(new Ripple(x, y, 2, ctx));
  };
  
  const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const length = ripples.length;
    for (let i = length - 1; i >= 0; i -= 1) {
      const r = ripples[i];
  
      r.update();
      r.draw();
  
      if (r.opacity <= 0) {
        ripples[i] = null;
        delete ripples[i];
        ripples.pop();
      }
    }
    animationFrame = window.requestAnimationFrame(animation);
  };
  
  animation();
  canvas.addEventListener('mousemove', canvasMouseOver);
}


  function generatePrefix(length = 2) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let prefix = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * possible.length);
        prefix += possible.charAt(randomIndex);
    }

    return prefix;
  }

  $('#prefix').val(generatePrefix());

  $('.prefix-btn').on('click', function (event) {
    event.preventDefault();
    const prefix = generatePrefix();
    $('#prefix').val(prefix);
  });

  

  $(".pass-btn").on('click', function () {
    let passInput = $(this).parent().find('input');
    $(this).toggleClass('active');
    if (passInput.attr('type') == "password") {
      passInput.attr('type', 'text');
    } else {
      passInput.attr('type', 'password');
    }
  });

  $(".settings-btn").on('click', function () {
    $('.settings-btn').not($(this)).removeClass('active');
    $('.settings-wrap').not($(this).siblings()).removeClass('active');
    $(this).toggleClass('active').siblings().toggleClass('active');
  });

  $(document).click(function(){
    $('.settings-btn, .settings-wrap').removeClass('active');
  });
  $(".settings-btn").click(function(e){
    e.stopPropagation();
  });

  $(".count-all").on('click', function () {
    let counts = $(this).data('all-counts');
    $('input[name=itemCounts]').val(counts);
    const input = $(this).parent().find('.form-input');
    input.val(parseInt(counts));
  });

  $(".file-image").on('dragenter', function(ev) {
    $(".file-image").addClass("drag");
  });

  $(".file-image").on('dragleave', function(ev) {
    $(".file-image").removeClass("drag");
  });

  $(".file-image").on('drop', function(ev) {
    // Dropping files
    ev.preventDefault();
    ev.stopPropagation();

    if(ev.originalEvent.dataTransfer){
      if(ev.originalEvent.dataTransfer.files.length) {
        var droppedFiles = ev.originalEvent.dataTransfer.files;
        for(var i = 0; i < droppedFiles.length; i++)
        {
          console.log(droppedFiles[i]);
          // $('#chatModal .input-file input[type=file]').val(droppedFiles[i].name);
          $('#chatModal .input-file input[type=file]').prop("files", droppedFiles).trigger('change');
        }
      }
    }

    $(".file-image").removeClass("drag");
    return false;
  });

  $(".file-image").on('dragover', function(ev) {
      ev.preventDefault();
  });

  $('.spoiler').on("click", function () {
    $(this).find(".spoiler__content").toggle('400');
    $(this)
        .toggleClass("active")
        .siblings()
        .removeClass("active")
        .find(".spoiler__content")
        .hide('400');
  });

  $(document).on("click", ".tabs__nav-item:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".tabs")
        .find(".tabs__item")
        .hide().removeClass('active')
        .eq($(this).index())
        .fadeIn().addClass('active');
  });

  if($('.tabs__nav').length) {
    const container = document.querySelector('.tabs__nav');
                
    let startY;
    let startX;
    let scrollLeft;
    let scrollTop;
    let isDown;
    
    container.addEventListener('mousedown',e => mouseIsDown(e));  
    container.addEventListener('mouseup',e => mouseUp(e))
    container.addEventListener('mouseleave',e=>mouseLeave(e));
    container.addEventListener('mousemove',e=>mouseMove(e));
    
    function mouseIsDown(e){
      isDown = true;
      startY = e.pageY - container.offsetTop;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop; 
    }
    function mouseUp(e){
      isDown = false;
    }
    function mouseLeave(e){
      isDown = false;
    }
    function mouseMove(e){
      if(isDown){
        e.preventDefault();
        //Move vertcally
        const y = e.pageY - container.offsetTop;
        const walkY = y - startY;
        container.scrollTop = scrollTop - walkY;
    
        //Move Horizontally
        const x = e.pageX - container.offsetLeft;
        const walkX = x - startX;
        container.scrollLeft = scrollLeft - walkX;
    
      }
    }
  }

  var lineSwiper = new Swiper(".who__swiper", {
    loop: true,
    spaceBetween: 32,
    slidesPerView: 'auto',
    speed: 3000,
    allowTouchMove: false,
    centeredSlides: true,
    autoplay: {
      delay: 0,
      enabled: true,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      768: {
        spaceBetween: 64,
      },
    }
  });
});

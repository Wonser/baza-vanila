$(document).ready( function() {
  let galleryThumbs = new Swiper('.roadmap__images', {
    spaceBetween: 12,
    slidesPerView: 'auto',
    loop: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centeredSlides: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".roadmap .swiper-pagination",
      // clickable: true,
      dynamicBullets: true, 
      dynamicMainBullets: 1,
    },
    breakpoints: {
      991: {
        spaceBetween: 10,
        allowTouchMove: false,
        direction: 'vertical',
        freeMode: true,
      },
    }
  });
  let galleryTop = new Swiper('.roadmap__content', {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    speed: 400,
    autoplay: {
      delay: 2750,
      disableOnInteraction: false,
    },
    breakpoints: {
      991: {
        allowTouchMove: false,
      },
    }
  });


  $('.version-card').on('click', function(){
    $(this).toggleClass('active').siblings().removeClass('active');
  });
}); 
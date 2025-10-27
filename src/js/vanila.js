$(document).ready( function() {

  let galleryTop = new Swiper('.roadmap__content', {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: ".desktop-pagination .swiper-pagination",
      clickable: true,
      dynamicBullets: true, 
      dynamicMainBullets: 1,
    },
    breakpoints: {
      991: {
        autoplay: true,
      },
    }
  });
  let galleryThumbs = new Swiper('.roadmap__images', {
    spaceBetween: 12,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      991: {
        slidesPerView: 1,
        spaceBetween: 10,
        direction: 'vertical',
      },
    },
    pagination: {
      el: ".roadmap__images .swiper-pagination",
      clickable: true,
      dynamicBullets: true, 
      dynamicMainBullets: 1,
    },
    // thumbs: {
    //   swiper: galleryTop,
    // },
  });
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;

  $('.version-card').on('click', function(){
    $(this).toggleClass('active').siblings().removeClass('active');
  });

  $('.way__item-name').hover(function(){
    $(this).parent().addClass('current').siblings().addClass('hide');
  }, function(){
    $(this).parent().removeClass('current').siblings().removeClass('hide');
  });


  var audio = $('#myAudio')[0]; // Get the native HTML audio element
  var playPauseBtn = $('#play-pause-btn');
  var progressBar = $('#progress-bar');
  var currentTimeSpan = $('#current-time');
  var durationSpan = $('#duration');
  var volumeBar = $('#volume-bar');

  // Play/Pause functionality
  playPauseBtn.on('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.toggleClass('pause');
    } else {
        audio.pause();
        playPauseBtn.toggleClass('pause');
    }
  });

  // Update progress bar and time display
  $(audio).on('timeupdate', function() {
      var percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.val(percentage);
      progressBar.css('background-size', progressBar.val() + '% 100%');
      var currentMinutes = Math.floor(audio.currentTime / 60);
      var currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
      currentTimeSpan.text((currentMinutes < 10 ? '0' : '') + currentMinutes + ':' + (currentSeconds < 10 ? '0' : '') + currentSeconds);
  });

  // Set duration when metadata is loaded
  $(audio).on('loadedmetadata', function() {
      var durationMinutes = Math.floor(audio.duration / 60);
      var durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
      durationSpan.text((durationMinutes < 10 ? '0' : '') + durationMinutes + ':' + (durationSeconds < 10 ? '0' : '') + durationSeconds);
  });

  // Seek functionality
  progressBar.on('change', function() {
      var time = audio.duration * (progressBar.val() / 100);
      audio.currentTime = time;
  });

  progressBar.on('input', function() {
      progressBar.css('background-size', progressBar.val() + '% 100%');
  });

  // Volume control
  volumeBar.on('input', function() {
      audio.volume = volumeBar.val() / 100;
      volumeBar.css('background-size', volumeBar.val() + '% 100%');

      if(volumeBar.val() == 0) {
        $('.volume-icon').addClass('hide');
      } else {
        $('.volume-icon').removeClass('hide');
      }
  });

  $('.volume-icon').on('click', function(){
    if($(this).hasClass('hide')) {
      $(this).removeClass('hide');
      volumeBar.val(50).trigger('input');
    } else {
      $(this).addClass('hide');
      volumeBar.val(0).trigger('input');
    }
  });

  // Handle audio ending
  $(audio).on('ended', function() {
      progressBar.val(0);
      currentTimeSpan.text('0:00');
  });

  $('.faq-vanila__timecode').on('click', function(){
    audio.currentTime = $(this).data('time');
  });
}); 
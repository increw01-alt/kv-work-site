/* kv-work.co.kr 메인 스크립트 — 기존 인라인 스크립트를 정리해 통합 */
(function () {
  'use strict';

  // 헤더 스크롤 시 배경 변경
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('header .hd').addClass('on');
    } else {
      $('header .hd').removeClass('on');
    }
  });

  // PC/모바일 공통 헤더 메뉴 선택 표시
  $('.select').on('click', function () {
    $('.select').removeClass('select_on');
    $(this).addClass('select_on');
  });

  // (모바일에선 푸터에) 파트너사이트 메뉴 펼치기
  $('.site_btn_wrap').on('click', function () {
    $('.site_list').slideToggle();
  });

  try {
    // 모바일 헤더 메뉴 가로 스크롤
    new Swiper('.mob_header', {
      slidesPerView: 2.5,
      centeredSlides: false,
      scrollbar: { el: '.mob_header .swiper-scrollbar', hide: true },
      breakpoints: { 700: { slidesPerView: 4.5 } }
    });

    // 창업상담신청 영역 슬라이더
    var bullet = ['상품권 매매업', '쇼핑몰 창업', '쇼핑몰 구축 지원'];
    new Swiper('.cont5', {
      speed: 1000,
      pagination: {
        el: '.cont5 .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + bullet[index] + '</span></div>';
        }
      }
    });

    // 취급상품권 종류 슬라이더
    new Swiper('.gift', {
      spaceBetween: 30,
      slidesPerView: 'auto',
      loop: true,
      loopedSlides: 1,
      loopAdditionalSlides: 1,
      autoplay: { delay: 2000, disableOnInteraction: false }
    });

    // 가맹안내 모바일 슬라이더
    new Swiper('.consultation', {
      spaceBetween: 300,
      slidesPerView: 1,
      speed: 1500,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.consultation .swiper-pagination', type: 'fraction' },
      navigation: {
        nextEl: '.consultation .swiper-button-next',
        prevEl: '.consultation .swiper-button-prev'
      }
    });
  } catch (e) {
    console.error('Swiper init error:', e);
  }

  if (window.AOS) {
    AOS.init({ duration: 1000, offset: 300, once: true, disable: false });
  }
})();

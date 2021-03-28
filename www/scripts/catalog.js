$(document).ready(function() {
    $('.js-nav-elem__link').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let active = $this.closest('.js-nav-elem').hasClass('active');

        if(!active) {
            $this.closest('.js-nav-elem').addClass('active');
            $this.find('span').text('Свернуть');
        } else {
            $this.closest('.js-nav-elem').removeClass('active');
            $this.find('span').text('Смотреть все');
        }
    });


    var isSaidbarNav = $('.js-saidbar-nav').is(':visible');
    if (isSaidbarNav) {
        $('.saidbar-nav__prev').on('click', function (e) {
            e.preventDefault();
            let $this = $(this);
            $('.saidbar-nav__item').removeClass('active-nav-saidbar');
            $this.closest('.saidbar-nav__item').addClass('active-nav-saidbar');
        });
    }
});
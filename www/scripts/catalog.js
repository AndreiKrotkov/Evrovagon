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
});
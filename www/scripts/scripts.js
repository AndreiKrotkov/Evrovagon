$(document).ready(function() {
    var windowWidth = document.documentElement.clientWidth;
    window.addEventListener('scroll', function() {
        if(windowWidth >= 1200 && pageYOffset >= 80) {
            $('.head').addClass('js-fix-menu-desc');
        } else {
            $('.head').removeClass('js-fix-menu-desc');
        }

        if(windowWidth >=768 && windowWidth <= 1200 && pageYOffset >= 80) {
            $('.head').addClass('js-fix-menu-tablet');
            console.log(windowWidth)
        } else {
            $('.head').removeClass('js-fix-menu-tablet');
        }

        if(windowWidth < 768 && pageYOffset > 80) {
            $('.head').addClass('js-fix-menu-mobile');
            $('.js-menu-btn-mobile').text('');
        } else {
            $('.head').removeClass('js-fix-menu-mobile');
            $('.js-menu-btn-mobile').text('Меню');
        }
    });

    // стрелка вверх
    $(function () {
        $(window).scroll(function () {
            // Если отступ сверху больше 250px то показываем кнопку "Наверх"
            if ($(this).scrollTop() > 250) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });

        /** При нажатии на кнопку мы перемещаемся к началу страницы */
        $('#toTop').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });


    // Слайдер
    $('.js-slider-card').slick({
        adaptiveHeight: true,
        nextArrow: "<div class=\"slider-next\"></div>",
        prevArrow: "<div class=\"slider-prev\"></div>",
    });

    // смена текста в блоке materials - ссылка на новости
    if(windowWidth > 767) {
        $('.js-all-news').text('Читать все новости');
    }

    // маркеры на домике при < 480
    if(windowWidth > 319 && windowWidth < 479) {
        $('.js-mark').on('click', function () {
            let $this = $(this);
            $this.find('.mark-text').slideToggle();
        })
    };

    // Поле поиска
    $('.js-search').on('click', function (e) {
        $('.js-fl-close').removeClass('fl-close');
        $('.nav-search').show(300);
        $('.nav-result-search').show(300);
    });
    $('.js-fl-close').on('click', function () {
        let $this = $(this);
        $this.addClass('fl-close');
        $('.nav-search').hide(300);
        $('.nav-result-search').hide(300);
        document.getElementById("searchNav").value = "";
    })

    $('#searchNav').on('input paste',  function (e) {
        console.log('Ввод в поле поиска')
    })

    // Попап формы обратного вызова
    $('.js-callback').on('click', function() {
        $.fancybox.open($('#callBackPopup'), {
            touch: false,
            beforeClose : function () {
                $('.js-form-inp-name').val('').removeClass('pop-form--error');
                $('.js-form-inp-tel').val('').removeClass('pop-form--error');
            }
        });
    });

    // ховер имен на полях формы
    $('.js-form-inp-name').focus(function(){
        $('.js-form-name--focus').addClass('inp-name-focus');
    }).blur(function(){
        let $this = $(this);
        if($this.val() === ''){
            $('.js-form-name--focus').removeClass('inp-name-focus');
        }
    });
    $('.js-form-inp-tel').focus(function(){
        $('.js-form-tel--focus').addClass('inp-name-focus');
    }).blur(function(){
        let $this = $(this);
        if($this.val() === ''){
            $('.js-form-tel--focus').removeClass('inp-name-focus');
        }
    });

    // Валидация формы в попапе
    function checkValid () {
        let $form = $('#formPopup');
        let $formSection = $('.section-form');
        let $successForm = $('.section-success');
        let $errorForm = $('.section-error');
        let $inputName = $form.find('.js-form-inp-name');
        let $inputTel = $form.find('.js-form-inp-tel');
        let $checkInput = false;

        if($inputName.val().length < 2 ) {
            $inputName.addClass('pop-form--error');
        } else {
            $inputName.removeClass('pop-form--error');
            $checkInput = true;
        }

        if($inputTel.val().length <= 11 ) {
            $inputTel.addClass('pop-form--error');
        } else {
            $inputTel.removeClass('pop-form--error');
            $checkInput = true;
        }

        if($checkInput) {
            console.log('форма валидна, запрос ушел');
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                method: "POST",
                dataType: "json",
                data: {
                    'name': $inputName.val(),
                    'phone': $inputTel.val(),
                },
                success: function (data) {
                    $formSection.slideUp(100);
                    $successForm.show(200);
                },
                error: function () {
                    $formSection.slideUp(100);
                    $errorForm.show(200);
                }
            });
        } else {
            console.log('форма НЕ валидна!!!');
        }
    };

    // Проверка полей на валидность
    $('.js-form-inp-name').on('click input paste change',  function (e) {
        let $this = $(this);
        if($this.val().length < 2 ) {
            $this.addClass('pop-form--error');
        } else {
            $this.removeClass('pop-form--error');
        }
    });
    $('.js-form-inp-tel').on('click input paste change',  function (e) {
        let $this = $(this);
        if($this.val().length <= 11) {
            $this.addClass('pop-form--error');
        } else {
            $this.removeClass('pop-form--error');
        }
    });

    // Проверка формы на валидность
    $('.js-pop-form-btn').on('click', function (e) {
        e.preventDefault();
        checkValid();
    })
    // END validation


//    Menu mobile
    $('.js-menu-btn-mobile').on('click', function () {
        $('.js-field-close-one').css({
            "transform":"rotate(45deg)",
            "width":"2px",
            "opacity": "1"
        })
        $('.js-field-close-two').css({
            "transform":"rotate(-45deg)",
            "width":"2px",
            "opacity": "1"
        })
        $('.menu-content').css({
            "height": "100vh"
        })
        $('body').addClass('menu-mob-open');
    })

    // Закрытие меню
    $('.js-menu-close').on('click', function () {
        let $this = $(this);
        $this.find('.js-field-close-one').css({
            "transform":"rotate(180deg)",
            "width":"0",
            "opacity": "0"
        })
        $this.find('.js-field-close-two').css({
            "transform":"rotate(-180deg)",
            "width":"0",
            "opacity": "0"
        })
        $('body').removeClass('menu-mob-open');
    })


    $('.js-menu-btn-desc').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let active = $this.parent().hasClass('menu-desc-open');

        if(!active) {
            $this.parent().addClass('menu-desc-open');
            $('.js-menu-categories-desc').show(300);
        } else {
            $this.parent().removeClass('menu-desc-open');
            $('.js-menu-categories-desc').hide(300);
        }
    })


    $( ".js-menu-elem__item" ).hover(function(e) {
        let $this = $(this);
        $this.addClass('hover-active');
    }, function(){
        let $this = $(this);
        $this.removeClass('hover-active');
    });


});



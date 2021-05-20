$(document).ready(function() {
    var windowWidth = document.documentElement.clientWidth;
    let popupEnter = $('#popupEnter');
    let formEnter = $('#popupEnter').find('form');
    let inputEmailFormEnter = formEnter.find('input[name = popupEmail]');
    let inputPasswFormEnter = formEnter.find('input[name = popupPassw]');
    let formSection = popupEnter.find('.js-section-form');
    let formSuccess = popupEnter.find('.js-section-success');
    let formError = popupEnter.find('.js-section-error');

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

    $('.js-rel-prod').slick({
        // adaptiveHeight: true,
        nextArrow: "<div class=\"slider-next\"></div>",
        prevArrow: "<div class=\"slider-prev\"></div>",
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                  slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                  slidesToScroll: 1
                }
            }
        ]
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
    $('.js-callback').on('click', function(e) {
        e.preventDefault();
        $.fancybox.open($('#callBackPopup'), {
            touch: false,
            beforeClose : function () {
                $('.js-form-inp-name').val('').removeClass('pop-form--error');
                $('.js-form-inp-tel').val('').removeClass('pop-form--error');
            }
        });
    });
    // Попап формы обратного вызова
    $('.js-enter').on('click', function(e) {
        e.preventDefault();
        $.fancybox.open($('#popupEnter'), {
            touch: false,
            afterLoad : function () {
                let formEnter = $('#popupEnter').find('form');
                let inputEmailFormEnter = formEnter.find('input[name = popupEmail]');

                $('.js-enter-lk').removeClass('show-enter');
                inputEmailFormEnter.closest('.js-input-focus').addClass('active');
            },
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
        let $form = $('#formCallback');
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

    formEnter.submit(function(e) {
        e.preventDefault();
        let $form = $(this);
        let checkFormValid;

        inputPasswFormEnter.val().length < 6 ? inputPasswFormEnter.closest('.wrp__input-form').addClass('error-inp') : inputPasswFormEnter.closest('.wrp__input-form').removeClass('error-inp');
        inputEmailFormEnter.val().length < 3 ? inputEmailFormEnter.closest('.wrp__input-form').addClass('error-inp') : inputEmailFormEnter.closest('.wrp__input-form').removeClass('error-inp');

        checkFormValid = $form.find('.wrp__input-form').hasClass('error-inp');

        console.log(checkFormValid);
        if(!checkFormValid) {
            let dataFormEnter = $form.serialize();
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                method: "POST",
                dataType: "json",
                data: {
                    'dataFormEnter': dataFormEnter,
                },
                success: function (res) {
                    if(res) {
                        formSection.slideUp(100);
                        formSuccess.show(200);
                    } else {
                        formError.show(200);
                    }
                },
                error: function () {
                    // formError.show(200);
                }
            });

        } else {
            checkFormValid = false;
        }
    });

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
    });

    // Закрытие меню
    $('.js-menu-close').on('click', function () {
        let $this = $(this);
        $this.find('.js-field-close-one').css({
            "transform":"rotate(180deg)",
            "width":"0",
            "opacity": "0"
        });
        $this.find('.js-field-close-two').css({
            "transform":"rotate(-180deg)",
            "width":"0",
            "opacity": "0"
        });
        $('body').removeClass('menu-mob-open');
    });


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
    });


    $( ".js-menu-elem__item" ).hover(function(e) {
        let $this = $(this);
        $this.addClass('hover-active');
    }, function(){
        let $this = $(this);
        $this.removeClass('hover-active');
    });

//    Каталог
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
    // if (isSaidbarNav) {
        $('.saidbar-nav__prev').on('click', function (e) {
            e.preventDefault();
            let $this = $(this)
            let active = $this.closest('.saidbar-nav__item').hasClass('active-nav-saidbar');
            if(!active) {
                $('.saidbar-nav__item').removeClass('active-nav-saidbar');
                $this.closest('.saidbar-nav__item').addClass('active-nav-saidbar');
            } else {
                $this.closest('.saidbar-nav__item').removeClass('active-nav-saidbar');
            }
        });
    // }

    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 220
        }, 400);
        return false;
    });

    // Каталог детальная
    $('.js-nav-pre').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.closest('.wrp__saidbar-nav').toggleClass('active');
    });

    // Универсальная функция по навешиванию класса active на списки типа аккордеон
    $('.js-item-prev').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.closest('.js-item-anchor').toggleClass('active');
    });

    $('.js-price-list-title').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        $this.toggleClass('open-pre-title');
    });

    // Фокус на инпутах
    $('.js-input-focus').on('click', function (e) {
        let $this = $(this);
        $this.addClass('active')
    });

    // Валидация формы Регистрации
    let $formReg = $('#formReg');
    let $formInputName = $formReg.find('input[name=firstName]');
    let $formInputPhone = $formReg.find('input[name=phone]');
    let $formInputEmail = $formReg.find('input[name=email]');
    let $formInputPasswFirst = $formReg.find('input[name=passwFirst]');
    let $formInputPasswLast = $formReg.find('input[name=passwLast]');

    $formReg.submit(function(e) {
        e.preventDefault();
        let $form = $(this);
        let checkFormValid;

        $formInputName.val().length < 2 ? $formInputName.closest('.wrp__input-form').addClass('error-inp') : $formInputName.closest('.wrp__input-form').removeClass('error-inp');
        $formInputPhone.val().length < 16 ? $formInputPhone.closest('.wrp__input-form').addClass('error-inp') : $formInputPhone.closest('.wrp__input-form').removeClass('error-inp');
        $formInputEmail.val().length < 3 ? $formInputEmail.closest('.wrp__input-form').addClass('error-inp') : $formInputEmail.closest('.wrp__input-form').removeClass('error-inp');

        if ($formInputPasswFirst.val().length < 6 || $formInputPasswLast.val().length < 6
            && $formInputPasswFirst.val() !== $formInputPasswLast.val()) {
            $formInputPasswFirst.closest('.wrp__input-form').addClass('error-inp');
            $formInputPasswLast.closest('.wrp__input-form').addClass('error-inp');
        } else {
            $formInputPasswFirst.closest('.wrp__input-form').removeClass('error-inp');
            $formInputPasswLast.closest('.wrp__input-form').removeClass('error-inp');
        }

        $formInputPasswLast.on('keyup', function () {
            if ($(this).val() !== $formInputPasswFirst.val()) {
                $('.js-error-passw').addClass('show-error-passw');
            } else {
                $('.js-error-passw').removeClass('show-error-passw');
            }
        });

        checkFormValid = $formReg.find('.wrp__input-form').hasClass('error-inp');

        console.log(checkFormValid);
        if(!checkFormValid) {
            $form.serialize()
        } else {
            checkFormValid = false;
        }
    });


    // Валидация формы обратной связи
    let feedBackForm = $('#feedBackForm');
    let $feedBackInputName = feedBackForm.find('input[name=firstName]');
    let $feedBackInputPhone = feedBackForm.find('input[name=phone]');
    let $feedBackInputEmail = feedBackForm.find('input[name=email]');
    let $feedBackInputTextarea = feedBackForm.find('textarea[name=textarea]');

    feedBackForm.submit(function(e) {
        e.preventDefault();
        let $form = $(this);
        let checkFormValid;

        $feedBackInputName.val().length < 2 ? $feedBackInputName.closest('.wrp__input-form').addClass('error-inp') : $feedBackInputName.closest('.wrp__input-form').removeClass('error-inp');
        $feedBackInputPhone.val().length < 16 ? $feedBackInputPhone.closest('.wrp__input-form').addClass('error-inp') : $feedBackInputPhone.closest('.wrp__input-form').removeClass('error-inp');
        $feedBackInputEmail.val().length < 3 ? $feedBackInputEmail.closest('.wrp__input-form').addClass('error-inp') : $feedBackInputEmail.closest('.wrp__input-form').removeClass('error-inp');
        $feedBackInputTextarea.val().length < 3 ? $feedBackInputTextarea.closest('.wrp__input-form').addClass('error-inp') : $feedBackInputTextarea.closest('.wrp__input-form').removeClass('error-inp');

        checkFormValid = $form.find('.wrp__input-form').hasClass('error-inp');

        console.log(checkFormValid);
        if(!checkFormValid) {
            $form.serialize()
        } else {
            checkFormValid = false;
        }
    });

    $('.js-pass-show-first').on('click', function () {
        let $passwFirst = $('.js-pass-check-first');

        $passwFirst.toggleClass('type-text');
        if($passwFirst.hasClass('type-text')) {
            $passwFirst.attr('type','text');
        } else {
            $passwFirst.attr('type','password');
        }
    });

    $('.js-pass-show-last').on('click', function () {
        let $passwLast = $('.js-pass-check-last');

        $passwLast.toggleClass('type-text');
        if($passwLast.hasClass('type-text')) {
            $passwLast.attr('type','text');
        } else {
            $passwLast.attr('type','password');
        }
    });

    $('.js-input-mask').on('click', function () {
        $(this).inputmask("+7 999-999-99-99")
    });


    $('.js-contact__lk').on('click', function () {
        $(this).closest('.js-enter-lk').toggleClass('show-enter');
    });

    $('.js-cast-select').selectpicker();

});



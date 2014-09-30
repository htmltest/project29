var speedSlider     = 500;  // скорость прокрутки слайдера
var periodSlider    = 5000; // период автоматической прокрутки слайдера (0 - автопрокрутки нет)
var timerSlider     = null;

var speedDevelopmentSlider  = 500;  // скорость прокрутки слайдера в разработках
var periodDevelopmentSlider = 5000; // период автоматической прокрутки слайдера в разработках (0 - автопрокрутки нет)
var timerDevelopmentSlider  = null;

(function($) {

    $(document).ready(function() {

        // определение touch-устройств
        if (Modernizr.touch) {
            $('.side-ctrl').click(function() {
                $('.side-inner').addClass('hover');
            });

            $('.main, .content, .banner, .map').click(function() {
                $('.side-inner').removeClass('hover');
            });
        } else {
            $('.side').addClass('side-hover');
            $('.main').each(function() {
                $('.main').mousewheel(function(event, delta) {
                    if (delta < 0) {
                        $('.main-ctrl a.active').next().click();
                    } else {
                        $('.main-ctrl a.active').prev().click();
                    }
                });
            });
        }

        // слайдер
        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            var newHTML = '';
            curSlider.find('li').each(function() {
                newHTML += '<a href="#"><span></span></a>';
            });
            curSlider.find('.slider-ctrl').html(newHTML);
            curSlider.find('.slider-ctrl a:first').addClass('active');

            if (curSlider.find('li').length > 1 && periodSlider > 0) {
                timerSlider = window.setTimeout(sliderNext, periodSlider);
            }
        });

        function sliderNext() {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex == curSlider.find('ul li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                $('.slider-ctrl a.active').removeClass('active');
                $('.slider-ctrl a').eq(newIndex).addClass('active');
                curSlider.find('ul li').eq(curIndex).css({'z-index': 1, 'opacity': 1});
                curSlider.find('ul li').eq(newIndex).css({'z-index': 'auto', 'left': 0, 'top': 0}).css({'opacity': 1});
                curSlider.find('ul li').eq(curIndex).animate({'opacity': 0}, speedSlider, function() {
                    curSlider.data('disableAnimation', true);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(sliderNext, periodSlider);
                    }
                });
            }
        }

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = $('.slider-ctrl a').index($(this));

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                $('.slider-ctrl a.active').removeClass('active');
                $('.slider-ctrl a').eq(newIndex).addClass('active');
                curSlider.find('ul li').eq(curIndex).css({'z-index': 1, 'opacity': 1});
                curSlider.find('ul li').eq(newIndex).css({'z-index': 'auto', 'left': 0, 'top': 0}).css({'opacity': 1});
                curSlider.find('ul li').eq(curIndex).animate({'opacity': 0}, speedSlider, function() {
                    curSlider.data('disableAnimation', true);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(sliderNext, periodSlider);
                    }
                });
            }

            e.preventDefault();
        });

        // слайдер в разработках
        $('.development-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            if (curSlider.find('li').length > 1 && periodDevelopmentSlider > 0) {
                timerDevelopmentSlider = window.setTimeout(nextDevelopmentSlider, periodDevelopmentSlider);
            }
        });

        function nextDevelopmentSlider() {
            window.clearTimeout(timerDevelopmentSlider);
            timerDevelopmentSlider = null;

            var curSlider = $('.development-slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex++;
                var isLast = false;
                if (curIndex == curSlider.find('li').length) {
                    isLast = true;
                    var curWidth = curSlider.find('li:first').width();
                    curSlider.find('ul').append('<li style="width:' + curWidth + 'px">' + curSlider.find('li:first').html() + '</li>');
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, speedDevelopmentSlider, function() {
                    if (isLast) {
                        curIndex = 0;
                        curSlider.find('ul').css({'left': 0});
                        curSlider.find('li:last').remove();
                    }

                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                    if (periodDevelopmentSlider > 0) {
                        timerDevelopmentSlider = window.setTimeout(nextDevelopmentSlider, periodDevelopmentSlider);
                    }
                });
            }
        }

        $('.development-next').click(function(e) {
            nextDevelopmentSlider();

            e.preventDefault();
        });

        $('.development-prev').click(function(e) {
            window.clearTimeout(timerDevelopmentSlider);
            timerDevelopmentSlider = null;

            var curSlider = $('.development-slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex--;

                var isFirst = false;
                if (curIndex == -1) {
                    isFirst = true;
                    var curWidth = curSlider.find('li:first').width();
                    curSlider.find('ul').prepend('<li style="width:' + curWidth + 'px">' + curSlider.find('li:last').html() + '</li>');
                    curSlider.find('ul').css({'left': -curSlider.find('li:first').width()});
                    curIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, speedDevelopmentSlider, function() {
                    if (isFirst) {
                        curSlider.find('li:first').remove();
                        curIndex = curSlider.find('li').length - 1;
                        curSlider.find('ul').css({'left': -curIndex * curSlider.find('li:first').width()});
                    }

                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                    if (periodDevelopmentSlider > 0) {
                        timerDevelopmentSlider = window.setTimeout(nextDevelopmentSlider, periodDevelopmentSlider);
                    }
                });
            }

            e.preventDefault();
        });

        $('.news-slider').each(function() {
            $(this).data('curIndex', 0);
        });

        $('.news-ctrl').on('click', '.news-ctrl-content a', function(e) {
            var curSlider = $('.news-slider');
            var curIndex = $('.news-ctrl-content a').index($(this));
            curSlider.data('curIndex', curIndex);
            $('.news-ctrl-content a').removeClass('active');
            $(this).addClass('active');
            curSlider.find('ul').animate({'left': -curIndex * curSlider.width()});

            e.preventDefault();
        });

        $('.main-ctrl a').click(function(e) {
            var curIndex = $('.main-ctrl a').index($(this));

            $.scrollTo($('.main-block').eq(curIndex), 500, {axis: 'y'});
            $('.main-ctrl a').removeClass('active');
            $(this).addClass('active');

            e.preventDefault();
        });

        $('.map-detail-link a').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);
            $('.map-text').toggleClass('map-text-open');

            e.preventDefault();
        });

        $('body').on('click', '.sert-list a, .service-top a, .structure-item-name a, .service-link, .service-order-link a', function(e) {
            if ($('.window').length > 0) {
                windowClose();
            }
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                windowOpen(html);
            })
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        $('.side-inner, .side-main, .side-submenu, .side-ctrl').css({'height': $('.side').height()});

        $('.banner-inner').each(function() {
            var curBlock = $(this);
            $('.banner-img, .banner-content').css({'height': curBlock.parent().height()});
            $('.banner-img').width(curBlock.width());
        });

        $('.main-blocks').each(function() {
            $('.main-block').css({'min-height': $(window).height()});
        });

        $('.slider-content').each(function() {
            $('.slider-content ul, .slider-content ul li, .slider-img').height($(window).height());
        });

        $('.development').each(function() {
            $('.development-img').height($(window).height());
        });

        $('.development-slider').each(function() {
            var curWidth = $('.development-slider').width();
            $('.development-slider-content ul li').width(curWidth);
            $('.development-slider-content ul').width(curWidth * ($('.development-slider-content ul li').lenght + 1));
            $('.development-slider-content ul').css({'left': -$('.development-slider').data('curIndex') * curWidth});
        });

        $('.about').each(function() {
            $('.about-img').height($(window).height());
        });

        $('.politic').each(function() {
            $('.politic-img').height($(window).height());
        });

        $('.img-max').each(function() {
            var curImg = $(this);

            var curWidth = curImg.parent().width();
            var curHeight = curImg.parent().height();

            curImg.css({'width': 'auto', 'height': 'auto'});
            var curImgWidth = curImg.width();
            var curImgHeight = curImg.height();

            var newImgWidth = curWidth;
            var newImgHeight = curImgHeight * newImgWidth / curImgWidth;

            if (newImgHeight < curHeight) {
                newImgHeight = curHeight;
                newImgWidth = curImgWidth * newImgHeight / curImgHeight;
            }

            curImg.css({'width': newImgWidth, 'height': newImgHeight, 'left': '50%', 'top': '50%', 'margin-left': -newImgWidth / 2, 'margin-top': -newImgHeight / 2});
        });

        $('.news-slider').each(function() {
            var curWidth = $(this).width() / 4;
            if ($(window).width() <= 1100) {
                curWidth = $(this).width() / 3;
            }
            if ($(window).width() <= 940) {
                curWidth = $(this).width() / 2;
            }
            if ($(window).width() <= 768) {
                curWidth = $(this).width();
            }
            $('.news-slider li').width(curWidth);
            $('.news-slider ul').width(curWidth * $('.news-slider li').length);
            var countPages = Math.ceil($('.news-slider li').length / 4);
            if ($(window).width() <= 1100) {
                countPages = Math.ceil($('.news-slider li').length / 3);
            }
            if ($(window).width() <= 940) {
                countPages = Math.ceil($('.news-slider li').length / 2);
            }
            if ($(window).width() <= 768) {
                countPages = $('.news-slider li').length;
            }
            var htmlPages = '';
            for (var i = 0; i < countPages; i++) {
                htmlPages += '<a href="#"><span></span></a>';
            }
            $('.news-ctrl-content').html(htmlPages);
            $('.news-ctrl-content a:first').addClass('active');
            $('.news-slider ul').css({'left': 0});
            $('.news-slider').data('curIndex', 0);
        });

        $('.main-ctrl').each(function() {
            $('.main-ctrl').css({'margin-top': -$('.main-ctrl').height() / 2, 'right': $(window).width() - $('.main').width() - Number($('.main').css('margin-left').replace(/px/, '')) + 22});
        });

    });

    // открытие окна
    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();

        $('body').css({'height': windowHeight, 'overflow-y': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div><a href="#" class="window-close-bottom">Закрыть</a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').load(function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-loading').remove();
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-loading').remove();
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close, .window-close-bottom').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);
    }

    function windowPosition() {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();

        if (windowWidth > 1000) {
            $('.window-container').width(1000);
        } else {
            $('.window-container').width(windowWidth);
        }

        if ($('.window-container').width() > windowWidth - 40) {
            $('.window-container').css({'margin-left': 20, 'left': 'auto'});
            $('.window-overlay').width($('.window-container').width() + 40);
        } else {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        }

        if ($('.window-container').height() > windowHeight - 40) {
            $('.window-container').css({'margin-top': 20, 'top': 'auto'});
            $('.window-overlay').height($('.window-container').height() + 40);
        } else {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        }
    }

    // обработка Esc после открытия окна
    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    // закрытие окна
    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto'});
        $('body').css({'height': 'auto', 'overflow-y': 'visible'});
        $(window).scrollTop($('.wrapper').data('scrollTop'));
    }

})(jQuery);
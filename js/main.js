jQuery(function($) {

    var $body = $('html, body');
    var $mainNav = $('.main-nav');

    $(window).load(function(){
        $('.preloader').remove();
    });

    var slideHeight = $(window).height();
    $('#home-slider .item').css('height', slideHeight);

    $(window).resize(function() {
        $('#home-slider .item').css('height', slideHeight);
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop()>slideHeight ){
            $mainNav.addClass('navbar-fixed-top');
        } else {
            $mainNav.removeClass('navbar-fixed-top');
        }
    });

    $(window).scroll(function(event) {
        Scroll();
    });

    $('.navbar-collapse ul li a').on('click', function() {
        $body.animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
        return false;
    });

    function Scroll() {
        var contentTop = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        $('.navbar-collapse').find('.scroll a').each(function() {
            contentTop.push( $( $(this).attr('href') ).offset().top);
        });
        $.each(contentTop, function(i) {
            if (winTop > contentTop[i] - rangeTop){
                $('.navbar-collapse li.scroll')
                    .removeClass('active')
                    .eq(i).addClass('active');
            }
        })
    }

    $('#tohash').on('click', function(){
        $body.animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
        return false;
    });

    new WOW().init();
    smoothScroll.init();

    // Progress Bar
    $('#about').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function() {
                $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
            });
            $(this).unbind('inview');
        }
    });

    // Countdown
    $('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });

    // Portfolio Single View
    $('#portfolio').on('click','.folio-read-more',function(event){
        event.preventDefault();
        var link = $(this).data('single_url');
        var full_url = '#portfolio-single-wrap',
            parts = full_url.split("#"),
            trgt = parts[1],
            target_top = $("#"+trgt).offset().top;

        $body.animate({scrollTop:target_top}, 600);
        $('#portfolio-single').slideUp(500, function(){
            $(this).load(link,function(){
                $(this).slideDown(500);
            });
        });
    });

    // Close Portfolio Single View
    $('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
        event.preventDefault();
        var full_url = '#portfolio',
            parts = full_url.split("#"),
            trgt = parts[1],
            target_offset = $("#"+trgt).offset(),
            target_top = target_offset.top;
        $body.animate({scrollTop:target_top}, 600);
        $("#portfolio-single").slideUp(500);
    });

    // Contact form
    var $form = $('#main-contact-form');
    $form.submit(function(event) {

        event.preventDefault();

        var $form_status = $('<div class="form_status"></div>');
        var showSuccess = function () {
            $form_status.html('<p class="text-success">I will contact you as soon as possible !</p>').delay(4000).fadeOut(400, function () {
                $(this).remove();
            });
        };

        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
            beforeSend: function() {
                $form.prepend( $form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
            },
            error: showSuccess
        }).done(showSuccess);
    });
});

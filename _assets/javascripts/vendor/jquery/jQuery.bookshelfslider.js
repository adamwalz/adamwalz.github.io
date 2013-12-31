/*
 * Bookshelf Slider jQuery Plugin - v1.5
 * Author: Sergio Valle
 * Date: Mar 26, 2012
 *
 * If you have questions, suggestions or any issue in the code, please email me through
 * my codecanyon user profile >> http://codecanyon.net/user/srvalle
*/


(function($){

  $.bookshelfSlider = function(selector, settings) {

    //parameters
    if ( settings ){$.extend($.bookshelfSlider.config, settings);}

    var $bsc = $.bookshelfSlider.config;

    // ----------------------------------------------
    // declare variables
    // ----------------------------------------------

    var $panel_slider = $(selector + " .panel_slider");
    var $arrow_menu = $(selector + ' #arrow_menu');
    var $slide_animate = $(selector + " .slide_animate");
    var $button_bar = $(selector + " .button_bar");
    var $buttons_container = $(selector + " .buttons_container"); //buttons_align

    if (navigator.userAgent.match(/msie/i) && navigator.userAgent.match(/7/)) { var is_ie7 = true; }
    if (navigator.userAgent.match(/msie/i) && navigator.userAgent.match(/8/)) { var is_ie8 = true; }

    // ----------------------------------------------
    // set interface width/height and positions
    // ----------------------------------------------

    //panel and panel bar size, panel title, button size
    $panel_slider.width($bsc.item_width);
    $panel_slider.height($bsc.item_height);
    $slide_animate.width($panel_slider.width());
    $slide_animate.height($bsc.item_height + 5000);
    $button_bar.css('margin-left', $bsc.buttons_margin);

    if (!is_ie7) {
      switch ($bsc.buttons_align) {
        case 'left':
          $buttons_container.css('float', 'left');
          break;

        case 'center':
          var widthButtons = 0;
          $(selector + ' .button_bar').each(function() {
            widthButtons += $(this).width() + $bsc.buttons_margin;
          });
          widthButtons += 20;
          var percent = parseInt((widthButtons / $panel_slider.width()) * 100);
          $buttons_container.css('width', percent + '%');
          break;

        case 'right':
          $buttons_container.css('float', 'right');
          $buttons_container.css('margin-right', $bsc.buttons_margin);
          break;
      }
    }

    $(selector + " .panel_bar").width($bsc.item_width);
    $(selector + " .panel_title").width($bsc.item_width);
    $(selector + " .product").css('margin-right', $bsc.product_margin);

    //arrow initial position
    var marginLeft = parseInt($button_bar.css("margin-left"));

    var arrow_menu_pos = $(selector + " #btn1").position().left + marginLeft + ($(selector + " #btn1").width() / 2) - 10;
    $arrow_menu.css('left', arrow_menu_pos );
    $arrow_menu.show();

    $(selector + ' .panel_items').css('width', '99999');

    //selected title
    if ($bsc.show_selected_title) {
      $(selector + ' .selected_title_box').show();
      $(selector + ' .selected_title').text( $('#btn1').text() );
    }

    $(selector + ' .products_box').css('margin-left', $bsc.products_box_margin_left );

    //each product
    $(selector + ' .product').each(function(i) {
      var $prod = $(this);

      if ($prod.attr("title") != "" && $prod.attr("title") != "undefined") {
        var has_title = true;
      } else {
        var has_title = false;
      }

      var img = $prod.children('img');

      i++;
      //add title
      if (has_title && $bsc.product_show_title) {
        $prod.append("<div class='product_title' id='title_"+i+"'><p>"+$prod.attr('title')+"</p></div>");
        var the_title = $(selector + " #title_"+i);
        var the_title_top = img.height() - ( $(the_title).height() / 2 );
        the_title.css({ left: ( $prod.width() - the_title.width() - 6 ) / 2, top: the_title_top });

        //product title > textcolor, bgcolor
        the_title.css({ color: $bsc.product_title_textcolor, background: $bsc.product_title_bgcolor + 'image-url(bookshelf/style/title_product_bg.png) repeat' });
      }

      //mouse over
      $prod.mouseenter(function() {
        //title
        $(the_title).css({ overflow: 'visible', 'max-height': 80 });

        //icons
        $(selector + ' #i_zoom_' + i).css({'background-position': '-24px 0'});
        $(selector + ' #i_play_' + i).css({'background-position': '-72px 0'});
        $(selector + ' #i_link_' + i).css({'background-position': '-120px 0'});
        $(selector + ' #i_iframe_' + i).css({'background-position': '-168px 0'});

      }).mouseleave(function() {

        //title
        $(the_title).css({ overflow: 'hidden', 'max-height': 11 });

        //icons
        $(selector + ' #i_zoom_' + i).css({'background-position': '0 0'});
        $(selector + ' #i_play_' + i).css({'background-position': '-48px 0'});
        $(selector + ' #i_link_' + i).css({'background-position': '-96px 0'});
        $(selector + ' #i_iframe_' + i).css({'background-position': '-144px 0'});
      });

      //add class
      $prod.children('img').addClass("img_thumb");

      //add effects
      var data_type = $prod.attr('data-type');

      if (data_type == 'book') {
        $prod.append("<img class='fx_book' id='b_" + i + "' + src='asset-path("bookshelf/style/book_fx.png")' />");

        if ( is_ie7 ) {
          $(selector + ' #b_' + i).css({'height': img.height() + 4, 'top': $prod.height() - img.height() - 4 });
        } else {
          $(selector + ' #b_' + i).css({'height': img.height(), 'top': $prod.height() - img.height()});
        }
      } else if (data_type == 'magazine') {
        $prod.append("<img class='fx_magazine' id='m_" + i + "' + src='asset-path("bookshelf/style/magazine_fx.png")' />");

        if ( is_ie7 ) {
          $(selector + ' #m_' + i).css({'height': img.height() + 4, 'top': $prod.height() - img.height() - 4});
        } else {
          $(selector + ' #m_' + i).css({'height': img.height(), 'top': $prod.height() - img.height()});
        }
      } else if (data_type == 'cd') {
        $prod.append("<img class='fx_cd' id='cd_" + i + "' + src='asset-path("bookshelf/style/cd_fx.png")' />");

        if ( is_ie7 ) {
          $(selector + ' #cd_' + i).css({'height': img.height() + 4, 'top': $prod.height() - img.height() - 4});
        } else {
          $(selector + ' #cd_' + i).css({'height': img.height(), 'top': $prod.height() - img.height()});
        }
      } else if (data_type == 'dvd') {
        $prod.append("<img class='fx_cd' id='dvd_" + i + "' + src='asset-path("bookshelf/style/dvd_fx.png")' />");

        if ( is_ie7 ) {
          $(selector + ' #dvd_' + i).css({'height': img.height() + 4, 'top': $prod.height() - img.height() - 4});
        } else {
          $(selector + ' #dvd_' + i).css({'height': img.height(), 'top': $prod.height() - img.height()});
        }
      }

      //add shadow
      $prod.append("<img class='fx_shadow' id='shd_" + i + "' + src='asset-path("bookshelf/style/shadow_fx.png")' />");

      //add icons
      if ($bsc.show_icons) {
        var data_url = $prod.attr('data-url');
        var data_popup = $prod.attr('data-popup');

        if ( data_url != undefined ) {

          var is_ie = (is_ie7) ? 2 : 0;

          if ( data_popup == 'true' && (data_url.indexOf('.jpg') != -1 || data_url.indexOf('.gif') != -1 || data_url.indexOf('.png') != -1) ) {
            $prod.append("<div class='icons_sprite' id='i_zoom_" + i + "'></div>");

            var $i_zoom = $(selector + ' #i_zoom_' + i);
            $i_zoom.css({'background-position': '0 0',
                   'left': ((img.width() - $i_zoom.width()) / 2) + is_ie,
                   'top': ($prod.height() - img.height() / 2 - ($i_zoom.height() / 2)) - is_ie,
                   'opacity': 1});

          } else if ( data_popup == 'true' && (data_url.indexOf('youtube.com') != -1 || data_url.indexOf('vimeo.com') != -1) ) {
            $prod.append("<div class='icons_sprite' id='i_play_" + i + "'></div>");

            var $i_play = $(selector + ' #i_play_' + i);
            $i_play.css({'background-position': '-48px 0',
                         'left': ((img.width() - $i_play.width()) / 2) + is_ie,
                         'top': ($prod.height() - img.height() / 2 - ($i_play.height() / 2)) - is_ie,
                         'opacity': 1});

          } else if ( data_popup == 'true' && (data_url != '' && data_url != undefined) ) {
            $prod.append("<div class='icons_sprite' id='i_iframe_" + i + "'></div>");

            var $i_iframe = $(selector + ' #i_iframe_' + i);
            $i_iframe.css({'background-position': '-144px 0',
                         'left': ((img.width() - $i_iframe.width()) / 2) + is_ie,
                         'top': ($prod.height() - img.height() / 2 - ($i_iframe.height() / 2)) - is_ie,
                         'opacity': 1});

          } else if ( data_url != '' && data_url != undefined ) {
            $prod.append("<div class='icons_sprite' id='i_link_" + i + "'></div>");

            var $i_link = $(selector + ' #i_link_' + i);
            $i_link.css({'background-position': '-96px 0',
                         'left': ((img.width() - $i_link.width()) / 2) + is_ie,
                         'top': ($prod.height() - img.height() / 2 - ($i_link.height() / 2)) - is_ie,
                         'opacity': 1});
          }

        }//if data_url != undefined
      }//add icons

      //positions
      if ( $prod.height() != img.height() ) {

        //position top
        var diff = $prod.height() - img.height();

        if ( is_ie7 ) {
          img.css('top', diff - 4);

          //shadow position
          $(selector + ' #shd_' + i).css({'height': img.height() + 4, 'left': img.width() + 4, 'top': diff - 4});

        } else {

          img.css('top', diff);

          //shadow position
          $(selector + ' #shd_' + i).css({'height': img.height(), 'left': img.width(), 'top': diff});
        }

        if (has_title && $bsc.product_show_title) {
          $(the_title).css('top', ($prod.height() - $(the_title).height() / 2) );
        }
      }

    });//each product


    // -------------------------------
    // click menu buttons - bottom
    // -------------------------------

    var left_pos = 0;
    var current_position_x = 0;

    $button_bar.click(function(e) {

      e.preventDefault();

      var $btn = $(this);

      //stop if the button has been clicked
      if (global_page-1 == $btn.index()) return false;

      if ( parseInt($slide_animate.css('top')) != 0 ) {

        $slide_animate.animate(
          { top: 0, opacity: 1 }, {
            duration: 300
          });
      }

      var btn_id = $btn.attr('id');
      var btn_current = $(selector + " #" + btn_id);
      var btn_position = btn_current.position();
      var btn_width = btn_current.width();

      //arrow position / animate
      var x = btn_position.left + marginLeft + (btn_width / 2) - 10;
      $arrow_menu
        .animate(
          { left: x }, {
            duration: $bsc.arrow_duration,
            easing: $bsc.arrow_easing,
            complete: function() { // callback

              //selected title
              if ($bsc.show_selected_title) $(selector + ' .selected_title').text( btn_current.text() );
            }
          });

      //set item position x
      current_position_x = parseInt($(selector + " .panel_slider").css('width')) * $btn.index();

      //slide positions
      left_pos = -current_position_x;

      // items animate
      $slide_animate
        .animate(
          { left: left_pos, top: 0 }, { //px
            duration: $bsc.slide_duration,
            easing: $bsc.slide_easing,
            complete: function() {}
          });


      //navigation more minus
      page_next_prev = 0;
      $icon_more.css('opacity', .3);
      $icon_minus.css('opacity', .3);

      global_page = $btn.index() + 1;

      //add in array vertical navigation options
      if(more_page_arr[0] == undefined) {
        $($slide_animate).each(function(j) {
          more_page_arr[j] = navigationMore();
          global_page++;
        });
        global_page = $btn.index() + 1;
      }

      if ( more_page_arr[$btn.index()] ) {
        $icon_more.css('opacity', 1);
        $more_minus_box.show();
        $more_minus_box.fadeTo("normal",1);
        $(selector + ' .panel_slider').mouseenter(function() { $more_minus_box.show(); $more_minus_box.fadeTo("normal",1); }).mouseleave(function() { $more_minus_box.hide(); });
      } else {
        $more_minus_box.hide();
      }

    });//click menu buttons - bottom


    // --------------------------------------------
    // more minus navigation
    // --------------------------------------------

    var global_page = 0;
    var page_next_prev = 0;
    var more_page_arr = [];

    $(selector + ' .panel_slider').append("<div id='more_minus_box'><input type='button' id='icon_minus' /><input type='button' id='icon_more' /></div>");
    var $more_minus_box = $(selector + ' #more_minus_box');
    var $icon_more = $(selector + ' #icon_more');
    var $icon_minus = $(selector + ' #icon_minus');

    function navigationMore() {
      var last_child = $(selector + ' #products_box_' + global_page + ' .product:last-child');
      var last_child_pos = last_child.height() + last_child.offset().top;
      var panel_slider_pos = $panel_slider.height() + $panel_slider.offset().top;

      if (last_child_pos - 143 < panel_slider_pos) { $icon_more.css('opacity', .3); }
      if (last_child_pos > panel_slider_pos) { return true; } else { return false; }
    }

    function navigationMinus() {
      var first_child = $(selector + ' #products_box_' + global_page + ' .product:first-child');
      var first_child_pos = first_child.offset().top;
      var initial_position = $panel_slider.offset().top;

      if (first_child_pos + 143 > initial_position) { $icon_minus.css('opacity', .3); }
      if (first_child_pos < initial_position) { return true; } else { return false; }
    }

    $icon_minus.click(function(e) {

      if ( $icon_minus.css('opacity') != 1 ) return;
      $(this).attr("disabled", "disabled");

      var minus_page = navigationMinus();
      if (!minus_page) {
        return;
      }

      page_next_prev -= 143;
      $icon_more.css('opacity', 1);

      // items animate
      $slide_animate
        .animate(
          { left: left_pos, top: -page_next_prev }, {
            duration: $bsc.slide_duration/2,
            easing: $bsc.slide_easing,
            complete: function() {
              $icon_minus.removeAttr("disabled");
            }
          });

    });//#icon_minus click

    $icon_more.click(function(e) {

      if ( $icon_more.css('opacity') != 1 ) return;

      $(this).attr("disabled", "disabled");

      var more_page = navigationMore();
      if (!more_page) {
        return;
      }

      page_next_prev += 143;
      $icon_minus.css('opacity', 1);

      // items animate
      $slide_animate
        .animate(
          { left: left_pos, top: -page_next_prev }, {
            duration: $bsc.slide_duration/2,
            easing: $bsc.slide_easing,
            complete: function() {
              $icon_more.removeAttr("disabled");
            }
          });

    });//#icon_more click


    // -------------------------------
    // click menu top
    // -------------------------------

    $(selector + ' .show_hide_titles').click(function(e) {
      e.preventDefault();
      if ( $(selector + ' .product_title').css('opacity') == 1 ) {
        $(selector + ' .product_title').stop().animate({'opacity': 0}, 400);
        $(this).css({'opacity': .5});
      } else {
        $(selector + ' .product_title').stop().animate({'opacity': 1}, 500);
        $(this).css({'opacity': 1});
      }
    });

    $(selector + ' .show_hide_icons').click(function(e) {
      e.preventDefault();
      if ( $(selector + ' .icons_sprite').css('opacity') == 1 ) {
        $(selector + ' .icons_sprite').stop().animate({'opacity': 0}, 400);
        $(this).css({'opacity': .5});
      } else {
        $(selector + ' .icons_sprite').stop().animate({'opacity': 1}, 400);
        $(this).css({'opacity': 1});
      }
    });

    // -------------------------------
    // click load popup
    // -------------------------------


    $(selector + ' .product').click(function(e) {

      e.preventDefault();

      var $p = $(this);

      var data_url = $p.attr('data-url');
      var data_popup = $p.attr('data-popup');

      if (data_popup != 'true') {
        ////if (data_url == undefined || data_url == '' ) { return; } else { location.href = data_url; return; }
        if (data_url == undefined || data_url == '' ) { return; } else { window.open(data_url, '_blank'); return; }
      }
      if ( data_popup == 'true' && (data_url == undefined || data_url == '') ) return;

      //add mask_popup
      $('body').append('<div id="mask_popup"></div>');
      $('body').append('<div id="popup_info"></div>');
      $('#popup_info').append("<img id='preload_icon' src='asset-path("bookshelf/style/preload.gif")' />");

      var $mask = $('#mask_popup');
      var $popup = $('#popup_info');

      //Get width / height
      var winWidth = $(window).width();
      var winHeight = $(window).height();
      var docHeight = $(document).height();

      $mask.css({'width': winWidth,'height': docHeight});
      $mask.fadeIn(400);
      $mask.fadeTo("normal",0.7);


      //popup
      $popup.css({'top': winHeight / 2 - $popup.height() / 2 , 'left': winWidth / 2 - $popup.width() / 2});


      var is_img = ( data_url.indexOf('.jpg') != -1 || data_url.indexOf('.gif') != -1 || data_url.indexOf('.png') != -1 ) ? true : false;
      var is_youtube = ( data_url.indexOf('youtube.com') != -1 ) ? true : false;
      var is_vimeo = ( data_url.indexOf('vimeo.com') != -1 ) ? true : false;
      var is_content = ( data_url.indexOf('.jpg') == -1 && data_url.indexOf('.gif') == -1 && data_url.indexOf('.png') == -1 && !is_vimeo && !is_youtube ) ? true : false;

      if (is_img) {
        var this_item = $p;

        if ( is_ie7 || is_ie8 ) {
          var img = $("<img />").attr('src', data_url + "?" + new Date().getTime());
        } else {
          var img = $("<img />").attr('src', data_url);
        }

        img.load(function() {
          popupCenterAnimate(this.width, this.height, img, this_item);
          $(img).hide();
        });

      } else if (is_youtube) {

        var str_id = data_url.split("?v=");
        var str_params = "?autohide=2&amp;autoplay=1&amp;controls=1&amp;disablekb=0&amp;fs=1&amp;hd=0&amp;loop=0&amp;rel=1&amp;showinfo=0&amp;showsearch=1&amp;wmode=transparent&amp;enablejsapi=1";
        var str_iframe = '<iframe class="video_player" width="' + $bsc.video_width_height[0] + '" height="' + $bsc.video_width_height[1] + '" frameborder="0" src="http://www.youtube.com/embed/' + str_id[1] + str_params + '"></iframe>';

        popupCenterAnimate($bsc.video_width_height[0], $bsc.video_width_height[1], str_iframe, $p);

      } else if (is_vimeo) {

        var str_id = data_url.split("/").pop();
        var str_iframe = '<iframe class="video_player" src="http://player.vimeo.com/video/' + str_id +  '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" width="' + $bsc.video_width_height[0] + '" height="' + $bsc.video_width_height[1] + '" frameborder="0"></iframe>';

        popupCenterAnimate($bsc.video_width_height[0], $bsc.video_width_height[1], str_iframe, $p);

      } else if (is_content) {

        if ( data_url.indexOf('?') != -1 ) {
          var query = data_url.split("?size=").pop().split("&");
          var size = query[0].split("x");
          var w = parseInt(size[0]), h = parseInt(size[1]);
        } else {
          var w = $bsc.iframe_width_height[0], h = $bsc.iframe_width_height[1];
        }

        var str_iframe = '<iframe id="iframe_content" src="' + data_url +  '" width="' + w + '" height="' + h + '" frameborder="0"></iframe>';

        popupCenterAnimate(w, h, str_iframe, $p);
      }


      // ------------------------------------
      // popup center animate / append item
      // ------------------------------------

      function popupCenterAnimate(w,h,str,this_elem) {

        var $popup = $('#popup_info');

        $popup.delay(100).animate({ 'top': winHeight / 2 - $popup.height() / 2,  'left': winWidth / 2 - $popup.width() / 2 }, 400, function() {
          $('#preload_icon').remove();
        });

        var posX = (winWidth / 2 - w / 2);
        var posY = (winHeight / 2 - h / 2);

        $popup.delay(100).animate({'height': h, 'width': w, 'top': posY,  'left': posX }, 400, function() {

          //add img/video
          $popup.append(str);
          $(str).fadeIn(600);


          //show title in popup
          if ($bsc.show_title_in_popup) {
            var prod_title = "";
            if ($(this_elem).attr("popup-title") != "" && $(this_elem).attr("popup-title") != "undefined")
              var prod_title = $(this_elem).attr("popup-title");
            else if ($(this_elem).attr("title") != "" && $(this_elem).attr("title") != "undefined")
              var prod_title = $(this_elem).attr("title");

            //$popup.append("<div id='popup_title'>" + prod_title + "</div>");
            $popup.append("<div id='popup_title'><div id='bs_close_button'></div>" + prod_title + "</div>");
            var padd = parseInt($popup.css('padding-left'));
            $("#popup_title").css({ 'width': w + padd, 'top': -(padd*2), 'left': 0});
            ////$("#bs_popup_title").css({ 'width': w + padd, 'top': -(padd*2) - 2 , 'left': 0});

            //popup title fade
            $("#popup_title").fadeIn(400);
            $("#popup_title").fadeTo("normal",1);

            //btn close
            $('#bs_close_button').click(function () {
              $('#mask_popup').hide();
              $('#mask_popup').remove();
              $('#popup_info').remove();
            });
          }

        });

      }


      // -------------------------------
      // click mask_popup
      // -------------------------------

      $('#mask_popup').click(function () {
        $('#mask_popup').hide();
        $('#mask_popup').remove();
        $('#popup_info').remove();
      });

    });


    $(selector + ' #btn1').trigger('click');



    // -------------------------------
    // Resize functions
    // -------------------------------

    function resizeEnd() {
      if (new Date() - rtime < delta) {
        setTimeout(resizeEnd, delta);
      } else {
        timeout = false;

        //redefined positions and values.
        global_page = 0;
        more_page_arr[0] = undefined;
        $(selector + " .slide_animate").css('top', 0);
        $(selector + ' #btn1').trigger('click');
      }
    }

    var rtime = new Date(1, 1, 2000, 12,00,00);
    var timeout = false;
    var delta = 200;

    $(window).resize(function() {

      rtime = new Date();
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd, delta);
      }


      //panels resize
      if ( $(selector).width() > $(window).width() ) {
        $(selector).width( $(window).width() );
        $(selector + " .slide_animate").width( $(selector + ' .panel_slider').width() );

        var current_left_pos = $(selector + ' .panel_slider').width() * (global_page - 1);
        $(selector + " .slide_animate").css( 'left', -current_left_pos);
      }

      if ( $(selector).width() <= $(window).width() ) {
        $(selector).width( '100%' );
        $(selector + " .slide_animate").width( $(selector + ' .panel_slider').width() );

        var current_left_pos = $(selector + ' .panel_slider').width() * (global_page - 1);
        $(selector + " .slide_animate").css( 'left', -current_left_pos);
      }


      //popup resize
      if ( $(selector).width() > $('#popup_info').width() ) {
        var $popup = $('#popup_info');
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var docHeight = $(document).height();

        $popup.css({'top': winHeight / 2 - $popup.height() / 2 , 'left': winWidth / 2 - $popup.width() / 2});

        var $mask = $('#mask_popup');
        $mask.css({'width': winWidth,'height': winHeight});
      }
    });


    return this;
  };


  // default config
  $.bookshelfSlider.config = {
    'item_width': 355,
    'item_height': 320,
    'products_box_margin_left': 20,
    'product_title_textcolor': '#ffffff',
    'product_title_bgcolor': '#c33b4e',
    'product_margin': 30,
    'product_show_title': true,
    'show_title_in_popup': true,
    'show_selected_title': true,
    'show_icons': true,
    'buttons_margin': 10,
    'buttons_align': 'center',
    'slide_duration': 1000,
    'slide_easing': 'easeInOutExpo',
    'arrow_duration': 800,
    'arrow_easing': 'easeInOutExpo',
    'video_width_height': [500,290],
    'iframe_width_height': [400,300]
  };

})(jQuery);

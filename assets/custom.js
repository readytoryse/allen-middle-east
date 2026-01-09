import { EVENTS, publish } from '@archetype-themes/utils/pubsub'
import { Slideshow } from '@archetype-themes/scripts/modules/slideshow'
import { defaultTo } from '@archetype-themes/scripts/helpers/utils'
import Modals from '@archetype-themes/scripts/modules/modal'

$(document).ready(function () {
  
Shopify.Currency = (function () {
  var moneyFormat = '${{amount}}'
  var superScript = theme && theme.settings && theme.settings.superScriptPrice

  function formatMoney(cents, format) {
    if (!format) {
      format = theme.settings.moneyFormat
    }

    if (typeof cents === 'string') {
      cents = cents.replace('.', '')
    }
    var value = ''
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/
    var formatString = format || moneyFormat

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultTo(precision, 2)
      thousands = defaultTo(thousands, ',')
      decimal = defaultTo(decimal, '.')

      if (isNaN(number) || number == null) {
        return 0
      }

      number = (number / 100.0).toFixed(precision)

      var parts = number.split('.')
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands)
      var centsAmount = parts[1] ? decimal + parts[1] : ''

      return dollarsAmount + centsAmount
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2)

        if (superScript && value && value.includes('.')) {
          value = value.replace('.', '<sup>') + '</sup>'
        }

        break
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0)
        break
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',')

        if (superScript && value && value.includes(',')) {
          value = value.replace(',', '<sup>') + '</sup>'
        }

        break
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',')
        break
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ')
        break
    }

    return formatString.replace(placeholderRegex, value)
  }

  function getBaseUnit(variant) {
    if (!variant) {
      return
    }

    if (!variant.unit_price_measurement || !variant.unit_price_measurement.reference_value) {
      return
    }

    return variant.unit_price_measurement.reference_value === 1
      ? variant.unit_price_measurement.reference_unit
      : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit
  }

  return {
    formatMoney: formatMoney,
    getBaseUnit: getBaseUnit
  }
})()
  
  equalheight('.home_featured_collection .product-grid-item .grid-item__content .grid-item__link .grid-product__title');
  $('body').on('click','.videoTV_wrp .mute-video',function(e){
    e.preventDefault()
    var $this = $(this),
    video = $this.siblings('video.main-video')[0];
    // console.log('video',video)
    if ($this.hasClass('muted-on')) {
      $this.addClass('muted-off').removeClass('muted-on');
      video.muted = false; // unmute the video
      // video.prop('muted',true)
     } else {
      $this.removeClass('muted-off').addClass('muted-on');
      video.muted = true; // mute the video
      // video.prop('muted',false)
     }
  })
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("a.backTpTop").addClass('top_show')
    } else {
      $("a.backTpTop").removeClass('top_show')
    }
  });
  $("a.backTpTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  var url_string = window.location.href;
  try {
    if (url_string.indexOf('#') > -1) {
      var $div = $("#" + url_string.split('#')[1]);
      $('body,html').animate({ scrollTop: $div.offset().top - 450 }, 1300);
      $(`[data-remodal-id="${url_string.split('#')[1]}"]`).find('.remodal-close').trigger('click')
    } else { }
  }
  catch {
  }
  //Product Manual International lang dropdown logic
  $('body').on('change', '#country_code', function (e) {
    var first_option = $(this).find('option:first');
    first_option.attr('disabled',true)
    var cc = $(this).val();
    $(`.product-manuals dd`).hide();
    $(`.product-manuals dt`).hide();
    $(`.product-manuals .title`).hide()
    if(cc == 'all'){      
      $(`.product-manuals dt`).show();
      $(`.product-manuals .title`).show()
    }
    else if(cc == 'en'){
      $(`.product-manuals dt[data-code="all"]`).show()
      $(`.product-manuals .title`).show()
    }
    else{
      $(`.product-manuals dd[data-code="${cc}"]`).show()
      $(`.product-manuals dt[data-code="${cc}"]`).show()

    }
  })

  //Videos lang dropdown logic
  $('body').on('change', '#js-custom-lang-selector', function (e) {
    var cc = $(this).val();
    var d = document.querySelectorAll(`[data-disclosure-input][name="locale_code"]`);
    d.forEach(element => {
      element.value = cc;
    });
    $("#localization_form-toolbar").submit();

  })
  var faqAccordion = {
    init: function () {
      var flg = 0;
      var $faqHeading = $('.faqAccordion > dt > button');
      $('.faqAccordion > dd').attr('aria-hidden', true);
      $faqHeading.attr('aria-expanded', false);
      $faqHeading.on('click', function () {
        if ($(this).parent().next().is(":visible")) {
          $('.faqAccordion > dd').slideUp();
          $('.faqAccordion > dd').removeClass('active-faq');
        }
        else {

          $('.faqAccordion > dd').removeClass('active-faq');
          $('.faqAccordion > dd').not($(this).parent().next()).slideUp();
          $(this).parent().next().slideDown();
          $(this).parent().next().addClass('active-faq');

        }
      });
      $faqHeading.on('keydown', function (event) {
        var keyCode = event.keyCode || e.which;
        if (keyCode === 13) {
          //         $(this).trigger('activate');
        }
      });
    }
  }

  faqAccordion.init();
})
if($('.product-description-container').length){
     $('.product-description-container').each(function() {
  var descriptionContainer = $(this);
  var descriptionContent = descriptionContainer.find('.product-description-content');
  var readMoreBtn = descriptionContainer.find('.read-more a');
  var height = 110; // Set the initial height
  var fullHeight = descriptionContent[0].scrollHeight; // Get the full height of the content

  // Function to toggle between "Read More" and "Read Less" text
  function toggleReadMore() {
    if (descriptionContainer.hasClass('expanded')) {
      readMoreBtn.text('...Read More');
    } else {
      readMoreBtn.text('Read Less');
    }
  }

  // Function to toggle between full and partial content
  function toggleContent() {
    if (fullHeight > 80) {
      descriptionContainer.toggleClass('expanded');
      descriptionContent.animate({
        height: (descriptionContainer.hasClass('expanded')) ? height : fullHeight
      });
      toggleReadMore();
    } else {
      descriptionContent.animate({ height: fullHeight });
      readMoreBtn.hide();
    }
  }

  toggleContent();
  readMoreBtn.on('click', toggleContent);
});

   }
if ($('body').hasClass('template-product') || $('body').hasClass('page-resource-pdp')) {  
  $('body').on('click','.usp_icon',function(){
    var target = $(this).data('target');
    var target_div = $('.' + target);
    if(target_div.length){
      var scroll_val = target_div.offset().top,
      header_height = $('.header-section').height();
      $('html, body').animate({
          scrollTop: scroll_val - header_height
      }, 1000);
    }
  })


  // $('body').on('click','a.product__thumb',function(e){
  //   e.preventDefault()
  //   console.log('evemt lcdvnsfbjsbd')
  // })
  // Readmore PDP functionality start   
}
$('body').on('click', '.videoTV_main .icon_play', function (e) {
    e.preventDefault()
    if (!$(this).hasClass('icon_loop_play')) {
      var parent = $(this).parents('.main-video-wrapp');
      if (parent.hasClass('video-play')) {
        $(this).siblings('video').trigger('pause');
        $(this).parents('.main-video-wrapp').removeClass('video-play');
      } else {
        $(this).siblings('video').trigger('play');
        $(this).parents('.main-video-wrapp').addClass('video-play');
      }
    }
  })


//PLP all logic starts
if ($(`[data-section-type="collection-template"]`).length) {
  $('body').on('change','.js-plp-variant-selector select',function(e){
  // $(`.js-plp-variant-selector select`).on('change', function (e) {
    // console.log('variant change')
    var val = $(this).val(), selected_opt = $('option:selected', $(this)),
      firstOpt = $('option:eq(1)', $(this)),
      parent = $(this).parents('.grid-item'), productBlock = parent.find(`product-grid-item`);
      // console.log('value',$(this).val())
     if($(this).val() != ''){
        parent.find('.js-add-to-cart').removeAttr('disabled').removeClass('btn_gray').addClass('btn_black btn_hover_red')
       parent.find('.js-add-to-cart').attr('data-variant-id',$(this).val())
      }else{
        parent.find('.js-add-to-cart').removeClass('btn_black btn_hover_red').addClass('btn_gray')
       parent.find('.js-add-to-cart').attr('disabled',true)
      }
      var isAvail = '';
     if (val.length > 0) {
       isAvail = JSON.parse(selected_opt.attr('data-available'));
     }
     // console.log('sale price',selected_opt.attr('data-compare-price'))
     var price_html = `<div class="grid-product__price">             
        <span class="grid-product__price--current">            
        <span aria-hidden="true" class="grid-product__price--from">${theme.Currency.formatMoney(selected_opt.attr('data-price'))}</span>
        <span class="visually-hidden"><span>from</span>${theme.Currency.formatMoney(selected_opt.attr('data-price'))}</span>
        </span></div>`; 
      if(selected_opt.attr('data-compare-price') != 'false'){
      price_html = `<div class="grid-product__price">              
        <span class="grid-product__price--current sale_price">
        <span aria-hidden="true" class="grid-product__price--from">${theme.Currency.formatMoney(selected_opt.attr('data-price'))}</span>
        <span class="visually-hidden"><span>from</span> ${theme.Currency.formatMoney(selected_opt.attr('data-price'))}</span>
        </span><span class="visually-hidden">Regular price</span>
                      <span class="grid-product__price--original ">
        <span aria-hidden="true">${theme.Currency.formatMoney(selected_opt.attr('data-compare-price'))}</span>
        <span class="visually-hidden">${theme.Currency.formatMoney(selected_opt.attr('data-compare-price'))}</span>
        </span></div>`;
          if (selected_opt.attr('data-saving') != 'false') {
            const savings_html = `<span class="grid-product__price--savings">Save ${selected_opt.attr('data-saving')}</span>`;
            price_html = price_html.replace('</div>', savings_html + '</div>');  // Append savings before closing div
          }
      }
    // console.log('Price Html', price_html )
    if (val.length > 0) {
      // console.log('selected_opt', isAvail)
      productBlock.find(`.grid__image-ratio img`).attr('src', selected_opt.attr(`data-variant-img`)).attr('srcset', selected_opt.attr(`data-variant-img`))
      // productBlock.find(`.grid-product__price--current span`).html(theme.Currency.formatMoney(selected_opt.attr('data-price')));
      productBlock.find('.grid-item__meta-secondary').empty().html(price_html)
      productBlock.find(`.grid-item__link`).attr('href', selected_opt.attr(`data-url`));
      productBlock.find(`.js-moreinfo`).attr('href', selected_opt.attr(`data-url`));
      // !isAvail ? productBlock.find(`.js-add-to-cart`).attr('disabled', true).text('Sold Out').removeClass('btn_black btn_hover_red').addClass('btn_gray') : productBlock.find(`.js-add-to-cart`).removeAttr('disabled').text('Add to cart');
       var addToCartButton = productBlock.find(`.js-add-to-cart`);
      var preSaleText = addToCartButton.data('presale');
       if (!isAvail) {
          addToCartButton
            .attr('disabled', true)
            .text('Sold Out')
            .removeClass('btn_black btn_hover_red')
            .addClass('btn_gray');
        } else {
          addToCartButton
            .removeAttr('disabled')
            .text(addToCartButton.hasClass('presale') ? preSaleText : 'Add to cart');
        }

    }
    else {
      var isAvail = JSON.parse(firstOpt.attr('data-available'));
      productBlock.find(`.grid__image-ratio img`).attr('src', firstOpt.attr(`data-variant-img`)).attr('srcset', firstOpt.attr(`data-variant-img`));
      productBlock.find(`.grid-item__link`).attr('href', firstOpt.attr(`data-url`));
      productBlock.find(`.js-moreinfo`).attr('href', firstOpt.attr(`data-url`));
      // !isAvail ? productBlock.find(`.js-add-to-cart`).attr('disabled', true) : productBlock.find(`.js-add-to-cart`).text('Add to cart');
      var addToCartButton = productBlock.find(`.js-add-to-cart`);
      var preSaleText = addToCartButton.data('presale');
      if (!isAvail) {
        addToCartButton.attr('disabled', true);
      } else {
        addToCartButton.text(addToCartButton.hasClass('presale') ? preSaleText : 'Add to cart');
      }
    }
  })
  //PLP ATC button logic
  $('body').on('click',`button.js-add-to-cart`,function(e){
  // $(`button.js-add-to-cart`).on('click', function (e) {
    e.preventDefault();
    var varId = $(this).attr('data-variant-id'), btn = $(this);
    btn.addClass('btn--loading');
    const data = {
      items: [
        {
          id: varId,
          quantity: 1,
          ...(btn.hasClass('presale') && { properties: { _preorder: 'true' } })
        }
      ]
    }
    const endpoint = 'cart/add.js'
    fetch(window.Shopify.routes.root + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 422 || data.status === 'bad_request') {
          if (data.description) {
            alert(data.description)
          }
        } else {
          publish(EVENTS.ajaxProductAdded, {
            detail: {
              product: data,
              addToCartBtn: btn
            }
          })
        }

        btn.removeClass('btn--loading')
        var product_list_limit1 = parseInt(window.product_list_limit),
        products_per_page1 = parseInt(window.products_per_page);
        var upsell_slider_config1 = {
          dots: true,
          arrows: false,
          easing: "linear",
          slidesToShow: products_per_page1,
          slidesToScroll: products_per_page1,
          cssEase: "ease",
          infinite: false,
          loop: false,
        };
        $(".js-upsell-slider").slick(upsell_slider_config1);
        // $(".js-upsell-slider").slick('refresh');
      })
  })

  //PLP Fit rack or not logic starts
  const user_rack_finder_data = JSON.parse(localStorage.getItem("user_rack_finder_data"));
  // if(user_rack_finder_data && user_rack_finder_data.vehicleInfo != null){
  //   if(user_rack_finder_data.vehicleInfo.spareTire){
  //     setTimeout(()=>{
  //       $(`input[id='tagInput-filter.p.m.custom.filter_has_rear_spare_tire_-1']`).eq(0).trigger('click')        
  //     },2000)
  //   }
  // }
  var product_id = $('.product-page').data('product-id');
    var excludeType = ['Accessories','Acessories','Gift Card','Part','Trailer','Trailer/Jogger'];
  if( excludeType.includes(prodType) != false){
    $('.pdp_rack_finder').addClass('hide')
  }
  if (user_rack_finder_data != null) {
    if($('body').hasClass('template-product') && user_rack_finder_data.rackFinderData != null){
      var fit_product = user_rack_finder_data.rackFinderData.filter((item)=>{return item.id == product_id}),
        all_products = user_rack_finder_data.rackFinderData.filter((item)=>{return item.id != product_id}),
        firstFourProducts = all_products.slice(0, 4),
       prodType = $('.product__main-photos').data('product-type');
      if( excludeType.includes(prodType) == false){
      document.addEventListener('recommendations:loaded', function(event) {
       recommendationChange(user_rack_finder_data)
      })
      }
      if( excludeType.includes(prodType) == false){
        if(fit_product.length){
          $('.product-page .rack-fit-badge .item-fit-on').addClass('active')
        }else{
          $('.product-page .rack-fit-badge .item-fit-off').addClass('active')
        }
      }
    }
    if (user_rack_finder_data.rackFinderData != null) {
      plpRackFit()
       document.addEventListener('collection:reloaded', function(event) {
         console.log('plp loaded')
         plpRackFit()
      })
    } 
    function plpRackFit(){
      let plpProds = document.querySelectorAll('product-grid-item');    
      if(plpProds)
      {
      plpProds.forEach(element => {
        var prodId = Number(element.getAttribute('data-product-id')),
        prodType = element.getAttribute('data-product-type'),
        excludeType = ['Accessories','Acessories','Gift Card','Part','Trailer','Trailer/Jogger'];

        let matchedProd = user_rack_finder_data.rackFinderData.filter((v) => { return v.id == prodId });
        if (element.querySelector('.rack-fit-badge')) {
          element.querySelector('.rack-fit-badge').classList.remove('hide');
          if( excludeType.includes(prodType) == false){
            if (matchedProd.length) {
              element.querySelector('.rack-fit-badge .item-fit-on').classList.add('active');
            }
            else {
              element.querySelector('.rack-fit-badge .item-fit-off').classList.add('active');
            }
          }
        }
      });
     } 
    }

     function recommendationChange(user_rack_finder_data){
        var all_products = user_rack_finder_data.rackFinderData.filter((item)=>{return item.id != product_id}),
        firstFourProducts = all_products.slice(0, 4),
        clone_grid = $('.product-recommendations-placeholder .new-grid .grid-item').first().clone();
        $('.product-recommendations-placeholder .new-grid').empty() 
        var clonedItems = '';
       firstFourProducts.forEach((item)=>{
          let words = item.tags.split(', ');
          // console.log('item.tags',item.tags)
          let discountTag = words.filter(word => word.toLowerCase().includes('discount:'));
         clone_grid.find('.grid-product__title').text(item.title)
         clone_grid.find('.grid__image-ratio img').attr('srcset',item.image.src).attr('src',item.image.src)
         clone_grid.find('.grid-product__secondary-image img').attr('srcset',item.images[1].src).attr('src',item.images[1].src)
         clone_grid.find('.js-moreinfo').attr('href','/products/'+item.handle)         
         clone_grid.find('a.grid-item__link').attr('href','/products/'+item.handle)
         clone_grid.find('.js-plp-variant-selector select').empty().append(`<option value=''>Select ${item.options[0].name}</option>`)
         clone_grid.find('.rack-fit-badge .item-fit-on').addClass('active');
         var options = ''
         var price_html =''
         item.variants.forEach((variant)=>{
           var discount_per = false;
         if(discountTag.length > 0 && theme.settings.show_tagbase_discount){
             variantIsOnSale = true;
            var discount_per = discountTag[0].split(':')[1].match(/\d+/)[0],            
            varComparePrice = variant.price,
            varPrice = Math.round((variant.price - (variant.price * (discount_per / 100))) * 100) / 100,
              discount_per = discount_per + '%'
          }
           var compare_price = false,
             price = variant.price;
           if(variant.compare_at_price != null){
             compare_price = variant.compare_at_price;
           }
           if(discountTag.length > 0 && theme.settings.show_tagbase_discount && theme.settings.show_save_amount){
             compare_price = variant.price;
             price = varPrice;
           }
            var variantImageSrc = item.images.find(image => image.id === variant.image_id)?.src || '';
            var available = variant.inventory_quantity > 0?true:false;
           options += `<option value="${variant.id}" data-saving="${discount_per}" data-price="${price}" data-compare-price="${compare_price}" data-variant-img="${variantImageSrc}" data-available="${available}">${variant.title}</option>`;
          })
         if(discountTag.length > 0 ){
            var variantIsOnSale = true,
            discount_per = discountTag[0].split(':')[1].match(/\d+/)[0],            
            varComparePrice = item.variants[0].price,
            varPrice = item.variants[0].price - (item.variants[0].price * (discount_per/100));
          }

          price_html += `<div class="grid-product__price">             
            <span class="grid-product__price--current">            
            <span aria-hidden="true" class="grid-product__price--from">${Shopify.Currency.formatMoney(item.variants[0].price)}</span>
            <span class="visually-hidden"><span>from</span>${Shopify.Currency.formatMoney(item.variants[0].price)}</span>
            </span></div>`; 
          if(item.variants[0].compare_at_price != null){
               price_html = ''
                price_html += `<div class="grid-product__price">              
                <span class="grid-product__price--current sale_price">
                <span aria-hidden="true" class="grid-product__price--from">${Shopify.Currency.formatMoney(item.variants[0].price)}</span>
                <span class="visually-hidden"><span>from</span> ${Shopify.Currency.formatMoney(item.variants[0].price)}</span>
                </span><span class="visually-hidden">Regular price</span>
                              <span class="grid-product__price--original ">
                <span aria-hidden="true">${Shopify.Currency.formatMoney(item.variants[0].compare_at_price)}</span>
                <span class="visually-hidden">${Shopify.Currency.formatMoney(item.variants[0].compare_at_price)}</span>
                </span></div>`;
          }
          if(discountTag.length > 0 && theme.settings.show_tagbase_discount && theme.settings.show_save_amount){
                price_html = ''
                price_html += `<div class="grid-product__price">              
                <span class="grid-product__price--current sale_price">
                <span aria-hidden="true" class="grid-product__price--from">${Shopify.Currency.formatMoney(varPrice * 100)}</span>
                <span class="visually-hidden"><span>from</span> ${Shopify.Currency.formatMoney(varPrice * 100)}</span>
                </span><span class="visually-hidden">Regular price</span>
                              <span class="grid-product__price--original ">
                <span aria-hidden="true">${Shopify.Currency.formatMoney(item.variants[0].price)}</span>
                <span class="visually-hidden">${Shopify.Currency.formatMoney(item.variants[0].price)}</span>
                </span><span class="grid-product__price--savings">Save ${discount_per}%</span></div>`;
          }
         clone_grid.find('.grid-item__meta-secondary').empty().append(price_html)
         clone_grid.find('.js-plp-variant-selector').removeClass('hide')
         clone_grid.find('.js-add-to-cart').attr('disabled',true).removeClass('btn_hover_red btn_black').addClass('btn_gray')
         clone_grid.find('.js-plp-variant-selector select').append(options)
         clone_grid.find('.stamped-fa').each((i,item)=>{
           $(item).removeClass('stamped-fa-star-o').addClass('stamped-fa-star')
         })
         var wrappedHtml = `<is-land class="grid-item grid-product grid-product-image-breathing-room--true" on:idle="" ready="">${clone_grid.html()}</is-land>`;
         clonedItems += wrappedHtml;
       })
         $('.product-recommendations-placeholder .new-grid').append(clonedItems)
    }
  }

} //PLP all logic ends
$('body').on('click','.rackfinder_btn',function(){
  $(this).toggleClass('finder-open')
  $('.rack-finder-tool-wrapper').toggleClass('rackfinder_show')  
  $('.rack-finder-tool-wrapper').slideToggle();
})
if($(window).width() < 769){
  var home_plp_slider = $('.home-plp_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    swipe: true,
    arrows: false,
    draggable: true,
  });
  var home_plp_prev = $('.home-plp_slider').next('div.btn-wrap').find('.prev-btn'),
  home_plp_next = $('.home-plp_slider').next('div.btn-wrap').find('.next-btn')
  home_plp_prev.click(function () {
		home_plp_slider.slick("slickPrev");
	});
	home_plp_next.click(function () {
		home_plp_slider.slick("slickNext");
	});
}

  var slidesToShow = $('.home-featured-slder').data('desktop-view'),
  slideToScroll = 1;
  if($(window).width() < 769){
    slidesToShow = $('.home-featured-slder').data('mobile-view')
    slideToScroll = 2
  }
  var defaults = {    
    slidesToShow: slidesToShow,
    slidesToScroll: slideToScroll,
    dots: true,
    infinite: true,
    swipe: true,
    arrows: false
  }
  
  var fldefaults = {
    adaptiveHeight: false,
    avoidReflow: true,
    draggable: true,
    pageDots: true,
    prevNextButtons: true,
    cellAlign:"left"
  }
 var home_sliders = document.querySelectorAll('.compatible-featured-slder');
  var flickityInstances = [];
  
  // Initialize Flickity on each slider element and store the instances
  if(home_sliders.length > 0){
    home_sliders.forEach(function(sliderElement) {
      var flickityInstance = new Slideshow(sliderElement, fldefaults);  // Initialize Flickity (make sure Slideshow initializes Flickity)
      flickityInstances.push(flickityInstance);
    });
  }
  
  document.addEventListener('variant:change', function(event) {
    var variant = event.detail.variant.id;
  
    // Update visibility of elements based on the variant change
    if($('.product-installation').length){
      $('.product-installation').addClass('hide');
      $('#video-' + variant).removeClass('hide');
    }
    if($('.installation_pdf').length){
      $('.installation_pdf').addClass('hide');
      $('#pdf-' + variant).removeClass('hide');
    }
    if($('.compatible_parts').length){
      $('.compatible_parts').addClass('hide');
      $('#compatible-' + variant).removeClass('hide');
    }
  
    // Resize all Flickity sliders after variant change
    flickityInstances.forEach(function(instance) {
       equalheight('.home_featured_collection .product-grid-item .grid-item__content .grid-item__link .grid-product__title');
      instance.resize(); // Resize the Flickity instance
    });
  });

  var home_featured_slider = $('.home-featured-slder').slick(defaults);  
  var home_featured_prev = $('.home-featured-slder').next('div.btn-wrap').find('.prev-btn'),
  home_featured_next = $('.home-featured-slder').next('div.btn-wrap').find('.next-btn');  
  home_featured_prev.click(function () {
		home_featured_slider.slick("slickPrev");
	});
	home_featured_next.click(function () {
		home_featured_slider.slick("slickNext");
	});

  // Custom review widget start
  var productId = null;
  if($('body').hasClass('template-product') || $('body').hasClass('page-resource-pdp')){
    productId = $('.page-content--partial').data('product-id');
  }
  var review_limit = $('.testimonials_main').data('review-limit');
  // console.log('review',review_limit)
  const requestOptions = {
    method: "POST",
    headers: new Headers({
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9,en-IN;q=0.8",
      "content-type": "application/json",
      "cookie": "_hjSessionUser_2144817=eyJpZCI6IjYyM2Q3MDZiLTY5MGItNTMwNi1hZjViLTFhMWM4ZjU1ZTBlYiIsImNyZWF0ZWQiOjE3MTI1NzUzNjQ4MTksImV4aXN0aW5nIjp0cnVlfQ==; stamped_c_81039=s_id=81039&r_id=136569495&w_id=WidgetCarousel",
      "origin": "https://allen.bike",
      "priority": "u=1, i",
      "referer": "https://allen.bike/",
      "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0"
    }),
    body: JSON.stringify({
      "data": [{
        "type": "carousel",
        "reviewIds": null,
        "productId": productId,
        "productBrand": "",
        "limitWords": "",
        "random": "false",
        "isFillEmpty": "false",
        "apiKey": "pubkey-2SC145O78bDcv6m0sxx0Lsy004P5y4",
        "sId": 81039,
        // "skip": 50,
        "minRating": "5",
        "isWithPhotos": false,
        "tags": "",
        "isSyndication": true,
        "elementId": "1",
        "referralCode": null
      }]
    })
  };
  
  var ele = document.querySelectorAll('.testimonials-slider')[0];
   function handleReview(){
      console.log('custom_featured_reviews',window.custom_featured_reviews)
      let reviews = window.custom_featured_reviews;
      var reviewHtml = '';
      var filteredReviews = reviews.filter(review => review.reviewMessage).slice(0, review_limit);
      if($('body').hasClass('template-index')){
       filteredReviews = reviews
          .filter(review => review.reviewMessage && !review.productName.toUpperCase().includes('PART'))
          .slice(0, review_limit);
      }
      filteredReviews.forEach((review,i)=>{
        // console.log('review',review)
        var authorNameParts = review.author.split(' ');
        var authorPlaceholder = '';
        if (authorNameParts.length > 1) {
          authorPlaceholder = authorNameParts[0][0] + authorNameParts[1][0];
        } else {
          authorPlaceholder = authorNameParts[0].substring(0, 2);
        }
        // Convert to uppercase for consistency
        var title = review.reviewTitle;
        if($('body').hasClass('template-index')){
          title = review.productName;
        }

      authorPlaceholder = authorPlaceholder.toUpperCase();
        reviewHtml += `<div class="testimonials-slide">
            <blockquote class="testimonials-slider__text">
             <div class="product_img">
              <img loading="lazy" width="185" height="185" data-animape="fadein" class="animape animape-visible" src="${review.productImageUrl}">
             </div>
              <div class="testimonial-pro-name">${title}</div>
                <span class="testimonial-stars">★★★★★</span>
                <div class="rte-setting text-spacing author_desc">
                  <p>${review.reviewMessage}</p>
                </div>
                <div class="author_placeholder hide">${authorPlaceholder}</div>
                <cite>${review.author}</cite>
                <div class="testimonials__info">${review.location}</div>
            </blockquote>
            </div>`
      })
      ele.innerHTML = ''; 
      ele.insertAdjacentHTML('beforeend', reviewHtml); 
      var defaults = {
        adaptiveHeight: true,
        avoidReflow: true,
        draggable: true,
        pageDots: false,
        prevNextButtons: true
      }
      if(reviews.length >= 5){
      var slide = new Slideshow(ele, defaults)
      }
      else if(reviews.length == 0){
        $('.review-widget').hide();
      }
      else{
        $(ele).addClass('hasnoSlider')
      }
    }
  $(document).ready(function() {
    if($('body').hasClass('template-product') || $('body').hasClass('template-index')){
      handleReview();
    }
    var defaults = {
        cellAlign: 'right',
        adaptiveHeight: true,
        avoidReflow: true,
        draggable: true,
        pageDots: false,
        prevNextButtons: true
      }
    if($(window).width() < 769 && $('.feature-logo-grid').length){
     var slide = new Slideshow($('.feature-logo-grid')[0], defaults)
    }
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var user_rack_finder_data = JSON.parse(localStorage.getItem("user_rack_finder_data"));
    var msg = '';
    
    if(user_rack_finder_data != null){
      if(user_rack_finder_data.vehicleInfo && window.customer){
        var customerId = window.customerId;
        var jsonParam = {
          year: user_rack_finder_data.vehicleInfo.year,
          makeId: user_rack_finder_data.vehicleInfo.makeId,
          modelId: user_rack_finder_data.vehicleInfo.modelId,
          body_id: user_rack_finder_data.vehicleInfo.body_id,
          spareTire: user_rack_finder_data.vehicleInfo.spareTire,
          hitch: user_rack_finder_data.vehicleInfo.hitch
        };
        customerMeta(jsonParam,customerId,msg=false);
      }
    }else{
      $('.grid__item .save_edit').addClass('hide')
      $('.product-grid__container .vehicle-title').addClass('hide')
    }
  
    if (/android/i.test(userAgent)) {
      $('body').on('click', '.apromotion_main', function() {
        var android_link = $(this).data('android-link');
        if (android_link) {
          window.location.href = android_link; 
        }
      });
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      $('body').on('click', '.apromotion_main', function() {
        var ios_link = $(this).data('ios-link');
        if (ios_link) {
          window.location.href = ios_link;  
        }
      });
    }
    if(window.customer){
      $('.list_items #saveButton').addClass('hide');
      $('.list_items #AddVehicle').removeClass('hide');
    }else{
      $('.list_items #saveButton').removeClass('hide');
      $('.list_items #AddVehicle').addClass('hide');
    }
    $('body').on('click','#saveButton',function(){
      var $this = $(this),
        parents = $this.parents('.list_items');
      var current_year = $("#year_select option:selected").val() || null,
        current_make_id = $("#make_select option:selected").val() || null,
        current_model_id = $("#model_select option:selected").val() || null,
        current_body_id = $("#bodytype_select option:selected").val() || null,
        spareTire = $(`input[name="mobile_hitch"]:checked`).val() || false,
        HitchTire = $(`input[name="mobile_spare_tire"]:checked`).val() || false;
      if (
        (current_year && current_make_id && current_model_id && current_body_id) || 
        (spareTire || HitchTire)
      ) {
        var jsonParam = {
          year: current_year,
          makeId: current_make_id,
          modelId: current_model_id,
          body_id: current_body_id,
          spareTire: spareTire,
          hitch: HitchTire
        };
        var user_rack_finder_data = {
          vehicleInfo: jsonParam
        };
      }else{
        if(parents.length && !window.customer){
          window.location.href = "https://shopify.com/10180788283/account";
        }else{
          $('.save_err_msg').removeClass('hidden')
        }
      }    
      if(user_rack_finder_data != undefined){
        localStorage.setItem("user_rack_finder_data", JSON.stringify(user_rack_finder_data));
        // $(document).trigger("CustomEventFormSubmit");
        if(window.customer){
          var customerId = window.customerId;
           if (
              (current_year && current_make_id && current_model_id && current_body_id) || 
              (spareTire || HitchTire)
            ){
             customerMeta(jsonParam,customerId,msg=true,$this);
           }
        }else{
          window.location.href = "https://shopify.com/10180788283/account";
        }
      }
    })
    function customerMeta(jsonParam, customerId ,msg,$this) { 
        if(msg){
          $('#saveButton svg').addClass('hidden');
          $this.find('.default_text , .titles').addClass('hidden');
          $('#saveButton .default_text ,#saveButton svg').addClass('hidden')
          $this.find('.saving_text').removeClass('hidden')  
        } 
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "ASP.NET_SessionId=e1cum2vglaxoyqzh3thue0rd");
        const formdata = new FormData();
        formdata.append("customer", customerId);
        const metaVal = [{
            year: jsonParam.year,
            makeId: jsonParam.makeId,
            modelId: jsonParam.modelId,
            body_id: jsonParam.body_id,
            hitch: jsonParam.hitch || false,
            sparetire: jsonParam.spareTire || false,
            default: true
        }];
        formdata.append("meta_val", JSON.stringify(metaVal));
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow"
        };
        
        fetch("https://rack-finder.allen.bike/utility/updateCustomerMeta", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            // console.log('success data saved')
            if(msg){
              $this.find('.saving_text').addClass('hidden') 
              $('#saveButton .default_text').removeClass('hidden').text('Your car has been saved');
              $('#saveButton .titles').removeClass('hidden').text('Your car has been saved');
              setTimeout(()=>{
                $('#saveButton svg').removeClass('hidden')
                $('#saveButton .default_text').text('Save car');
                $('#saveButton .titles').text('save your car search')
              },1500)
            }
          })
          .catch((error) => console.error(error));
      }   


  });
  
  
  // Custom review widget end
// Initialize Fancybox with event listeners
if ($('body').hasClass('template-product') || $('body').hasClass('page-resource-pdp')) {
  $("[data-fancybox]").fancybox({
    afterShow: function(instance, current) {
      const video = current.$content.find('video').get(0);  // Get the video DOM element
      if (video) {
        video.muted = true; 
        video.play();  
      }
    }
  });
}


 (function($) {
 	'use strict';

 	var defaults = {
 		align: {
 			x: 'center',
 			y: 'center'
 		},

 		handlers: {},

 		offset: {
 			left: 0,
 			top: 0
 		}
 	};

 	var methods = {
 		show: function() {
 			var $this = $(this);

 			$this.addClass('active');
 			$this.find('.taggd-item-hover').addClass('show');
 		},

 		hide: function() {
 			var $this = $(this);
 			$this.removeClass('active');
 			$this.find('.taggd-item-hover').removeClass('show');
 		},

 		toggle: function() {
 			var $hover = $(this).next();
 			console.log($hover)

 			if($hover.hasClass('show')) {
 				methods.hide.call(this);
 			} else {
 				methods.show.call(this);
 			}
 		}
 	};


	/****************************************************************
	 * TAGGD
	 ****************************************************************/

	 var Taggd = function(element, options, data) {
	 	var _this = this;

	 	this.element = $(element);
	 	this.options = $.extend(true, {}, defaults, options);
	 	this.data = data;

	 	this.initWrapper();

	 	this.addDOM();
	 	this.updateDOM();

	 	$(window).resize(function() {
	 		_this.updateDOM();
	 	});
	 };


	/****************************************************************
	 * INITIALISATION
	 ****************************************************************/

	 Taggd.prototype.initWrapper = function() {
	 	var wrapper = $('<div class="taggd-wrapper" />');
	 	this.element.wrap(wrapper);

	 	this.wrapper = this.element.parent('.taggd-wrapper');
	 };


	/****************************************************************
	 * DATA MANAGEMENT
	 ****************************************************************/

	 Taggd.prototype.addData = function(data) {
	 	if($.isArray(data)) {
	 		this.data = $.merge(this.data, data);
	 	} else {
	 		this.data.push(data);
	 	}

	 	this.addDOM();
	 	this.updateDOM();
	 };

	 Taggd.prototype.setData = function(data) {
	 	this.data = data;

	 	this.addDOM();
	 	this.updateDOM();
	 };

	 Taggd.prototype.clear = function() {
	 	this.wrapper.find('.taggd-item, .taggd-item-hover').remove();
	 };


	/****************************************************************
	 * TAGS MANAGEMENT
	 ****************************************************************/

	 Taggd.prototype.iterateTags = function(a, yep) {
	 	var func;

	 	if($.isNumeric(a)) {
	 		func = function(i, e) { return a === i; };
	 	} else if(typeof a === 'string') {
	 		func = function(i, e) { return $(e).is(a); }
	 	} else if($.isArray(a)) {
	 		func = function(i, e) {
	 			var $e = $(e);
	 			var result = false;

	 			$.each(a, function(ai, ae) {
	 				if(
	 					i === ai ||
	 					e === ae ||
	 					$e.is(ae)
	 					) {
	 					result = true;
	 				return false;
	 			}
	 		});

	 			return result;
	 		}
	 	} else if(typeof a === 'object') {
	 		func = function(i, e) {
	 			var $e = $(e);
	 			return $e.is(a);
	 		};
	 	} else if($.isFunction(a)) {
	 		func = a;
	 	} else if(!a) {
	 		func = function() { return true; }
	 	} else return this;

	 	this.wrapper.find('.taggd-item').each(function(i, e) {
	 		if(typeof yep === 'function' && func.call(this, i, e)) {
	 			yep.call(this, i, e);
	 		}
	 	});

	 	return this;
	 };

	 Taggd.prototype.show = function(a) {
	 	return this.iterateTags(a, methods.show);
	 };

	 Taggd.prototype.hide = function(a) {
	 	return this.iterateTags(a, methods.hide);
	 };

	 Taggd.prototype.toggle = function(a) {
	 	return this.iterateTags(a, methods.toggle);
	 };

	/****************************************************************
	 * CLEANING UP
	 ****************************************************************/

	 Taggd.prototype.dispose = function() {
	 	this.clear();
	 	this.element.unwrap(this.wrapper);
	 };


	/****************************************************************
	 * SEMI-PRIVATE
	 ****************************************************************/

	 Taggd.prototype.addDOM = function() {
	 	var _this = this;

	 	this.clear();
	 	this.element.css({ height: 'auto', width: 'auto' });

	 	var height = this.element.height();
	 	var width = this.element.width();

	 	$.each(this.data, function(i, v) {
	 		var $item = $('<span />');
	 		var $item2 = $('<span />');
	 		var $hover,$sub_text;

	 		if(
	 			v.x > 1 && v.x % 1 === 0 &&
	 			v.y > 1 && v.y % 1 === 0
	 			) {
	 			v.x = v.x / width;
	 		v.y = v.y / height;
	 	}

	 	if(typeof v.attributes === 'object') {
	 		$item.attr(v.attributes);
	 	}

	 	$item.attr({
	 		'data-x': v.x,
	 		'data-y': v.y
	 	});

	 	$item.css('position', 'absolute');
	 	$item.addClass('taggd-item-wrapper');
	 	var te = $('<span />').addClass('taggd-item active');
	 	$item.append(te);
	 	_this.wrapper.append($item);
	 	// console.log('item',$item)
	 	if(typeof v.text === 'string' && v.text.length > 0) {
	 		$hover = $('<span class="taggd-item-hover show"  />').html(v.text);

	 		if(typeof v.sub_text === 'string' && v.sub_text.length > 0) {
	 			$hover = $('<span class="taggd-item-hover show" style="position: absolute;" />').html(v.text + "<span class='sub_text'> "+v.sub_text+"</span>");
	 		}
	 		$hover.attr({
	 			'data-x': v.x,
	 			'data-y': v.y
	 		});
	 		// $item2.append($hover);
	 		$item.append($hover);
	 	}

	 	if(typeof _this.options.handlers === 'object') {
	 		$.each(_this.options.handlers, function(event, func) {
	 			var handler;

	 			if(typeof func === 'string' && methods[func]) {
	 				handler = methods[func];
	 			} else if(typeof func === 'function') {
	 				handler = func;
	 			}

	 			$item.on(event, function(e) {
	 				if(!handler) return;
	 				handler.call($item, e, _this.data[i]);
	 			});
	 		});
	 	}
	 });

	 	this.element.removeAttr('style');
	 };

	 Taggd.prototype.updateDOM = function() {
	 	var _this = this;

	 	this.wrapper.removeAttr('style').css({
	 		height: this.element.height(),
	 		width: this.element.width()
	 	});

	 	this.wrapper.find('span').each(function(i, e) {
	 		var $el = $(e);

	 		var left = $el.attr('data-x') * _this.element.width();
	 		var top = $el.attr('data-y') * _this.element.height();

	 		if($el.find('span').hasClass('taggd-item')) {
	 			$el.css({
	 				left: left - $el.outerWidth(true) / 2,
	 				top: top - $el.outerHeight(true) / 2
	 			});
	 		} 
	 		// else if($el.hasClass('taggd-item-hover')) {
	 		// 	if(_this.options.align.x === 'center') {
	 		// 		left -= $el.outerWidth(true) / 2;
	 		// 	} else if(_this.options.align.x === 'right') {
	 		// 		left -= $el.outerWidth(true);
	 		// 	}

	 		// 	if(_this.options.align.y === 'center') {
	 		// 		top -= $el.outerHeight(true) / 2;
	 		// 	} else if(_this.options.align.y === 'bottom') {
	 		// 		top -= $el.outerHeight(true);
	 		// 	}

	 		// 	$el.attr('data-align', $el.outerWidth(true));

	 		// 	$el.css({
	 		// 		left: left + _this.options.offset.left,
	 		// 		top: top + _this.options.offset.top
	 		// 	});
	 		// }
	 	});
	 };


	/****************************************************************
	 * JQUERY LINK
	 ****************************************************************/

	 $.fn.taggd = function(options, data) {
	 	return new Taggd(this, options, data);
	 };
   
	})(jQuery);

if(options != undefined && data != undefined){
    // console.log(options,data)
    $("#default-tag-left-image-1").taggd(options[0], data[0]);
    $("#default-tag-right-image-1").taggd(options[1], data[1]);

    $("#default-tag-left-image-mobile-1").taggd(options[0], data[0]);
    $("#default-tag-right-image-mobile-1").taggd(options[1], data[1]);
  }
// console.log('data',$('.rack-tool-page').length , $('body').attr('class').indexOf('collection')>-1 , $('body').attr('class').indexOf('product')>-1)
 if(window.disclaimer_popup){
  if($('.page-rack-finder-tool-2').length){
    // console.log('Cookies.get',Cookies.get('rack_disclaimer_popup'))
     if(Cookies.get('rack_disclaimer_popup')){   
      }else{  
        $('.ctm_popup_main').show();     
      }
  $('.ctm_popup_btn , .ctm-close-popup').on('click',function(){
        Cookies.set('rack_disclaimer_popup', 'disabled', {
          expires: 7
        });
    $('.ctm_popup_main').hide();
  })
  }
 }


var Youtube = (function () {
    'use strict';

    var video, results;

    var getThumb = function (url, size) {
        if (url === null) {
            return '';
        }
        size    = (size === null) ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
    };

    return {
        thumb: getThumb
    };
}());

$(document).ready(function(){
  // if($('.product-installation').length){
  //   var installation_video = $('.product-installation a').data('video'),
  //   instaltion_tumb = Youtube.thumb(installation_video, 'big');
  //   $('.product-installation').find('img').attr('src',instaltion_tumb);
  // }
  if($('.empty-poster').length){
    $('.empty-poster').each((i,item)=>{
      var url = $(item).data('video');
      var thumb = Youtube.thumb(url, 'big');
      $(item).find('img').attr('src',thumb)
      // console.log('i',thumb)
    })
  }
  $('.ctm_popup .ctm_overlay ,.ctm_popup .close_popup').on('click',function(){
      $('.ctm_popup').removeClass('show')
      if($('.ctm_popup').find('video.model_video').length){
        $('.ctm_popup').find('.model_video source').attr('src','')
        $('.ctm_popup').find('video.model_video').trigger('pause')
      }
  })
    // Call the function on document ready to handle the initial state
    $(document).ready(function() {
      titleClone();
    });
    
    // Handle window resize with the same condition
    $(window).resize(function() {
      titleClone();
    });

 })
  function titleClone() {
    // Check if the body has the 'page-resource-pdp' class and if window width is less than 798
    if ($('body').hasClass('page-resource-pdp') && $(window).width() < 769) {
      // Check if the cloned element already exists to prevent duplication
      if ($('.cloned-product-title').length === 0) {
        // Clone the .product_title element
        var clonedTitle = $('.product_title').first().clone();
        clonedTitle.removeClass('small--hide')
        clonedTitle.addClass('cloned-product-title'); // Add a class to the cloned element for future reference
  
        // Append the cloned element next to the .breadcrumb
        $('.breadcrumb').after(clonedTitle);
      }
    } else {
      // If the condition is not met, remove the cloned title
      $('.cloned-product-title').remove();
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the class 'store-button'
    var buttons = document.querySelectorAll('.app-download');

    // Loop through each button and add a click event listener
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Prevent default anchor link behavior
            event.preventDefault();

            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Detect iOS devices
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                window.location.href = 'https://apps.apple.com/us/app/allen/id1530680276';  // Replace with actual Apple App Store link
            }
            // Detect Android devices
            else if (/android/i.test(userAgent)) {
                window.location.href = 'https://play.google.com/store/apps/details?id=bikeandroid.allen.sports&hl=en';  // Replace with actual Google Play Store link
            }
            // If neither iOS nor Android, show alert
            else {
                 window.location.href = 'https://apps.apple.com/us/app/allen/id1530680276'; 
            }
        });
    });
    let searchParams = new URLSearchParams(window.location.search);
    let source = searchParams.get('source');
    if(source == 'external'){
      $('.resource-wrapper').remove()
      $('.shopify-section-group-footer-group a[href]').each(function() {
          var link = $(this);
          var href = link.attr('href');
          if (href == '/' || href == 'https://allen.bike') {
              link.attr('href', 'javascript:;');
          }
      });
    }
});


$(document).ready(function(){
  document.addEventListener('ajaxProduct:added',function (evt) {offer_product_fun()})
  document.addEventListener('cart:updated',function (evt) {offer_product_fun()})
  if(window.offer_popup){
    offer_product_fun()
  }
  offer_product_fun()
})
var Model = new Modals('offerPopup', 'modal--square')
function offer_product_fun(){
  fetch('/cart.js')
    .then((response) => response.json())
    .then((cart) => {
      var freeGift = cart.items.filter(
        (item) => item.properties["_free_gift"] == "true"
      );
      const isThreshold = window.offer_value === 'thresold';
      const meetsCondition = isThreshold ? cart.total_price > window.offer_threasold : cart.items.some(item => item.product_id == window.main_product);
      if($('.offer-modal').data('count') > 0){
        if (window.offer_value === 'thresold' || (window.offer_value === 'product' && window.main_product != null)) {
          console.log('meetsCondition',meetsCondition)
        
          if (window.offer_type === 'collection' && window.offer_popup && meetsCondition && freeGift.length === 0) {
            setTimeout(() => Model.open(), 200);
          } 
          else if (window.offer_type === 'single_product' && window.free_product != null && window.offer_popup && meetsCondition && freeGift.length === 0) {
            addFreeProduct(window.free_product);
          } 
          else if ((!meetsCondition && freeGift.length > 0) || (!window.offer_popup && freeGift.length > 0)) {
            removeFreegift(freeGift[0].key);
          }
        }
      }else{
        if ((!meetsCondition && freeGift.length > 0) || (!window.offer_popup && freeGift.length > 0)) {
            removeFreegift(freeGift[0].key);
        }
      }
    })
}
function removeFreegift(id){
  const data = {
      id: id,
      quantity: 0
  };
    const endpoint = 'cart/change.js'
    fetch(window.Shopify.routes.root + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 422 || data.status === 'bad_request') {
          if (data.description) {
            alert(data.description)
          }
        } else {
          publish(EVENTS.ajaxProductAdded, {detail: {product: data,addToCartBtn: btn}})
        }
      })
}

// Get all radio buttons with name 'group'
const radioButtons = document.querySelectorAll('.offer-popup input[name="group"]');
const dealAddButton = document.querySelector('.js-deal-add');

// Add event listener for the radio buttons
radioButtons.forEach(radio => {
  radio.addEventListener('change', function() {
    // When a radio button is selected, remove the 'disabled' attribute
    dealAddButton.removeAttribute('disabled');
    dealAddButton.classList.add('btn_red')
  });
});
document.body.addEventListener('click', function(e) {
  // Check if the clicked element has the class 'js-deal-add'
  if (e.target && e.target.classList.contains('js-deal-add')) {
    e.preventDefault();
    const id = document.querySelector('.offer-wrapper input:checked') ? document.querySelector('.offer-wrapper input:checked').value : null;
    e.target.classList.add('btn--loading');
    addFreeProduct(id);
    const radioButtons = document.querySelectorAll('input[name="group"]');
    radioButtons.forEach(radio => {
      if (radio.checked) {
        radio.checked = false;
      }
    });
    e.target.setAttribute('disabled', 'true');
    e.target.classList.remove('btn_red')
  }
});


function addFreeProduct(id) {
  const data = {
      items: [
        {
          id: id,
          quantity: 1,
          properties: { _free_gift: 'true' }
        }
      ]
    }
    const endpoint = 'cart/add.js'
    fetch(window.Shopify.routes.root + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        Model.close();
        $('.js-deal-add').removeClass('btn--loading')
        if (data.status === 422 || data.status === 'bad_request') {
          if (data.description) {
            alert(data.description)
          }
        } else {
          publish(EVENTS.ajaxProductAdded, {detail: {product: data,addToCartBtn: btn}})
        }
      })
}
  (function () {
        var fromPath = '/pages/product-manuals/sb-05';
        var toPath   = '/pages/product-manuals-sb-05';

        if (window.location.pathname === fromPath) {
          window.location.replace(toPath);
        }
      })();

async function get_country_code() {
  var countries = ['pl', 'nl', 'fr', 'it', 'mt', 'be', 'de', 'se', 'es', 'gb', 'us', 'cl', 'kw', 'bh', 'om', 'qa', 'sa', 'sg', 'cr', 'mx', 'ca', 'co', 'au', 'ae'];
  var user_country_region = Cookies.get("user_country_region");
  if (user_country_region == undefined) {
    return await fetch("/browsing_context_suggestions.json")
      .then((response) => response.json())
      .then((data) => {
        var user_country_region = data.detected_values.country.handle;
        // console.log('user_country_region',user_country_region.toLowerCase())
         if ($.inArray(user_country_region.toLowerCase(), countries) === -1) {
             user_country_region = 'US';
           
      Cookies.set("prod_country", 'US', {
          expires: 30,
          domain: ".allen.bike",
      });
          } 
        // console.log('usert',user_country_region)
        Cookies.set("user_country_region", user_country_region, {
          expires: 30,
          domain: ".allen.bike",
        });
        $('.region-wrapper .region').text(user_country_region);
        
        return user_country_region;
      });
  } else {
    $('.region-wrapper .region').text(user_country_region);
    return user_country_region;
  }
}


let searchParams = new URLSearchParams(window.location.search);
Cookies.set("goto_region_back",'');
let cc = searchParams.get('cc');
let goto_cc = searchParams.get('rt');
let noreturn = searchParams.get('noreturn');
var eu_countries = [
  "at", "be", "bg", "hr", "cy", "cz", "dk", "ee", "fi", 
  "fr", "de", "gr", "hu", "ie", "it", "lv", "lt", "lu", 
  "mt", "nl", "pl", "pt", "ro", "sk", "si", "es", "se"
];
var default_country = Cookies.get('user_country_region');
var prod_country = Cookies.get('prod_country');

//back to original store based on existing coutrny code/cookie
if(prod_country != undefined && $.inArray(prod_country.toLowerCase(), eu_countries) > -1 && noreturn == undefined){
  console.log('go for EU')
  window.location.href = 'https://eu.allen.bike';
}
else if(prod_country != undefined && prod_country.toLowerCase() =='gb' && noreturn == undefined){
  console.log('go for UK')
  window.location.href = 'https://uk.allen.bike';
}
if(goto_cc != null){
  $('.header-flag-wrapper').hide()
}

var goto_region_back = Cookies.get("goto_region_back");
//start condition if customer come from EU store/ UK store
if (goto_cc != null && $.inArray(goto_cc, eu_countries) === -1 && goto_cc != 'GB' && goto_cc != 'uk' && goto_cc != 'JP') {
  cc = 'US';
  Cookies.set("goto_region_back",'eu');
  param(goto_cc)
}else if(goto_cc != null &&  goto_region_back == '' && goto_cc == 'GB' || goto_cc == 'uk'){
  cc = 'US';
  Cookies.set("goto_region_back",'uk');
  param('uk')
}
else if(goto_cc == 'jp' || goto_cc == 'JP'){
  cc = 'US';
  Cookies.set("goto_region_back",'jp');
  param(goto_cc)
}
else if(goto_region_back == 'eu'){
  cc = 'US';
  Cookies.set("goto_region_back",'eu');
  param(goto_cc)
}
else if(goto_region_back == 'uk'){
  cc = 'US';
  Cookies.set("goto_region_back",'uk');
  param(goto_cc)
}
else{
  Cookies.set("goto_region_back",'')
}
console.log('goto_cc',goto_cc,'eu-country',$.inArray(goto_cc, eu_countries),'goto_region_back',Cookies.get("goto_region_back"))
if(goto_region_back == 'eu' || goto_region_back == 'uk'){
    change_url(goto_region_back)    
}
else if(Cookies.get("goto_region_back") == 'jp'){
  change_url(Cookies.get("goto_region_back"))
}
//end condition if customer come from EU store/ UK store


// Add parameter if customer come from other store
function param(par) {
  var exclude_urls = [
    '/pages/allencare',
    '/pages/rack-finder',
    '/blogs/stories',
    '/pages/product-manuals',
    '/pages/video-library',
    '/pages/faqs',
    '/pages/register-your-product',
    '/pages/make-a-return',
    '/pages/find-a-seller',
    '/pages/comparison-locking-hitch-racks-deluxe-vs-premium',
    '/pages/contact-us',
    '/pages/terms-of-use'
  ];
  $('a').not('.ctm_popup_btn').each(function() {
    var link = $(this);
    var href = link.attr('href');
    
    if (href) {
      var separator = href.includes('?') ? '&' : '?';
    var newHref = href + separator + 'rt=' + goto_cc + '&noreturn=true';
      link.attr('href', newHref);
    }
  });
}
// change url if customer come from other store(Update all header and footer links)
function change_url(goto_region_back) {
  console.log('goto_region_back',goto_region_back)
  var exclude_urls = [
    '/pages/allencare',
    '/collections/parts',
    '/pages/rack-finder',
    '/blogs/stories',
    '/pages/product-manuals',
    '/pages/video-library',
    '/pages/faqs',
    '/pages/register-your-product',
    '/pages/make-a-return',
    '/pages/find-a-seller',
    '/pages/comparison-locking-hitch-racks-deluxe-vs-premium',
    '/pages/contact-us',
    '/pages/terms-of-use'
  ];
    var theme_id_eu = window.eu_theme_id; // Theme ID for 'eu'
    var previewLinkEU = (theme_id_eu)?'&preview_theme_id=' + theme_id_eu:'';
    var theme_id_uk = window.uk_theme_id; // Theme ID for 'uk'
    var previewLinkUK = (theme_id_uk)?'&preview_theme_id=' + theme_id_uk:'';
    var theme_id_jp = window.jp_theme_id; // Theme ID for 'uk'
    var previewLinkJP = (theme_id_jp)?'&preview_theme_id=' + theme_id_jp:'';

    $('a.site-header__logo-link, .site-nav__item a').each(function() {
        var link = $(this);
        var href = link.attr('href');

        var exclude = exclude_urls.some(function(exclude_url) {
            return href && href.includes(exclude_url);
        });
        if (!exclude) {
            if (href && href.startsWith('/')) {
                // Update URL for internal links starting with '/'
                var url = 'https://' + goto_region_back + '.allen.bike' + href;
                if (goto_region_back === 'eu') {
                    url += (url.includes('?') ? '&' : '?')  + 'cc=' + goto_cc + previewLinkEU;
                } else if (goto_region_back === 'uk') {
                    url += (url.includes('?') ? '&' : '?') + 'cc=' + goto_cc + previewLinkUK;
                } else if (goto_region_back === 'jp') {
                    url += (url.includes('?') ? '&' : '?') + 'cc=' + goto_cc + previewLinkJP;
                }
                link.attr('href', url);
            } else if (href && href.startsWith('http') && href.includes('allen.bike')) {
                // Update URL for absolute links containing 'allen.bike'
                var url = href.replace('allen.bike', goto_region_back + '.allen.bike');
                if (goto_region_back === 'eu') {
                    url += (url.includes('?') ? '&' : '?') + 'cc=' + goto_cc + previewLinkEU;
                } else if (goto_region_back === 'uk') {
                    url += (url.includes('?') ? '&' : '?') + 'cc=' + goto_cc + previewLinkUK ;
                }else if (goto_region_back === 'jp') {
                    url += (url.includes('?') ? '&' : '?') + 'cc=' + goto_cc + previewLinkJP ;
                }
                link.attr('href', url);
            }
        }
    });
}

if(cc != null){
  Cookies.set("user_country_region", cc, {
    expires: 7,
    domain: ".allen.bike",
  });
}

async function CountrySelector(data) {
    var Country = await get_country_code();
    var CountryEle = $(`.country_list_ul div[data-co='${Country}']`).eq(0).clone();
    $(`.country_list_ul div[data-co='${Country}'] a`).addClass('se-co_under');
    CountryEle.find('.selected-country.default_select').removeClass('hide');
    CountryEle.find('.selected-country.js_select').remove();
    CountryEle.find('a').addClass('se-country')
    $('.deafult-country , .pop-deafult-country').empty().append(CountryEle)
  
    // Hide ATC button
    if(Country != "US"){
      $('.add-to-cart').remove()
    }else{
      $('.btn_pay_with').remove()
    }
}
CountrySelector()
$('body').on('click','.flag-wrapper',function(e){
  e.preventDefault();
  let countryDiv = this.querySelector(".country_div");
  let round_svg = document.querySelector(
    ".flag-wrapper div a.se-country svg.rest-of-world"
  );
  var $this = $(this);
  countryDiv.classList.toggle("is_open");
  if (countryDiv.classList.contains("is_open")) {
    $($this.find('span.right')[0]).removeClass('icon-down-arrow').addClass('icon-up-arrow')
    if (round_svg) {
      round_svg.classList.remove("white");
      round_svg.classList.add("black");
    }
  } else {
    $($this.find('span.right')[0]).removeClass('icon-up-arrow').addClass('icon-down-arrow')
    if (round_svg) {
      round_svg.classList.remove("black");
      round_svg.classList.add("white");
    }
  }
});

$('body').on('click','.country_list_ul div',function(e){
  e.preventDefault();
  var $this = $(this),
    parent = $this.parents('.flag-wrapper'),
    link = $this.find('a').attr('href');
    var country = $this.attr('data-co');
    Cookies.set("prod_country", country, {
        expires: 90,
        domain: ".allen.bike",
    });
   var prev_country_code = Cookies.get("user_country_region"),
    prev_country_name = $(`.country_list_ul div[data-co="${prev_country_code}"]`).find('span.js_select').eq(0).text();
    if(parent.hasClass('pop-flag-wrapper')){
      var cloned = $this.clone();
      $(cloned).find('.default_select').removeClass('hide');
      $(cloned).find('.js_select').addClass('hide');
      $(cloned).find('a').addClass('se-country');
      // console.log('clone',cloned)
      // $this.find('.selected-country.default_select').removeClass('hide');
      // $this.find('.selected-country.js_select').remove();
      $this.find('a').addClass('se-country');
      parent.find('.deafult-country').empty().append(cloned);
      $('#Co_confirm').attr('data-href',link)
      Cookies.set("user_country_region", country, {
          expires: 30,
          domain: ".allen.bike",
        });
      }
    else{
      var country = $this.attr('data-co');
      Cookies.set("user_country_region", country, {
          expires: 30,
          domain: ".allen.bike",
        });
      if(link.includes('uk.') || link.includes('eu.') || link.includes('jp.')){
        $('.country-redirect-description strong').text(prev_country_name)
            $.fancybox.open({
              src  : '#country_redirect', // The modal content to display
              type : 'inline', // The content type (inline element)
              opts : {
                touch: false, // Disable touch gestures like swipe on mobile
                closeClickOutside: false // Disable closing the modal by clicking outside
              }
            });
        $('.country-redirect-description').find('a').attr('href',link);
        // window.location.href = link;
      }else{
        window.location.reload();
      }
    }
})

// On body click close dropdown
$('body').on('click',function(event){
    let flagWrapper = document.querySelector(".flag-wrapper");
    let popWraper = document.querySelector(".pop-flag-wrapper");
    let country_Div = document.querySelector(".country_div");
    
    // Check if the click was outside the flag-wrapper
    if (!flagWrapper.contains(event.target) && !popWraper.contains(event.target) ) {
      // event.preventDefault();
      if (country_Div) {
        $('.deafult-country').find('span.right').addClass('icon-down-arrow').removeClass('icon-up-arrow')
        country_Div.classList.remove("is_open");
        let round_svg = document.querySelector(
          ".flag-wrapper div a.se-country svg.rest-of-world"
        );
        if (round_svg) {
          round_svg.classList.remove("black");
          round_svg.classList.add("white");
        }
       }
   }
})
if(window.redirection_popup){
popupCall();
}
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
async function popupCall() {
  var country_popup = Cookies.get("country_popup");
  if (country_popup == undefined ) {
    var Country = await get_country_code();
    modal.classList.add('show');
    $("body").css("overflow", "hidden");
      var link = $(`div[data-co="${Country}"]`).eq(0).find('a').attr('href');
      $('#Co_confirm').attr('data-href',link)
  }
};
if(span){
  span.onclick = function () {
      Cookies.set("country_popup",true, {
          expires: 30,
          domain: ".allen.bike",
      })
     modal.classList.remove('show');
     $("body").css("overflow", "auto");
  };
}
$('body').on('click','#Co_confirm',function(){
    // console.log('link',$(this).data('href'))
    var link = $(this).data('href');
    modal.classList.remove('show');
    $("body").css("overflow", "auto");
    Cookies.set("country_popup",true, {
        expires: 30,
        domain: ".allen.bike",
    })
    if($(this).data('href').includes('uk.') || $(this).data('href').includes('eu.') || $(this).data('href').includes('jp.')){
      window.location.href = link;
    }else{
      window.location.reload();
    }
})

var country_popup = {
  init: function(){
      country_popup.open();
  },
  open: function(ele){
    modal.classList.remove('show');
   $("body").css("overflow", "auto");
      setTimeout( function() {
        $('[data-remodal-id=country_redirect]').remodal().open();
      });
    $('body').on('click','.country-redirect-description a',function(e){
      // e.preventDefault()
      let country_code = ele.attr("data-co");
      Cookies.set("user_country_region", country_code, {
          expires: 30,
          domain: ".allen.bike",
      });
      //prod cookie
      Cookies.set("prod_country", country_code, {
          expires: 30,
          domain: ".allen.bike",
      });
    Cookies.set("country_popup",true, {
        expires: 30,
        domain: ".allen.bike",
    })
      // window.location.href = link.href;
    })
  }
}

document.addEventListener('variant:change', (e)=>{
  var id = $(e.target).find(`input[name='id']`).val();
   cataLoglinkButton(id);
});
// async function AtcHide(event){
//   console.log('event',event)
// }
async function cataLoglinkButton(id) {
  let user_country_regionLink = await get_country_code();
  let elements = document.getElementsByClassName("get_Co-but");
  let found = false;
  let newElement;
  let elementsToMove = [];
  $('.link_buttons').empty();
  for (let i = 0; i < elements.length; i++) {
    var current_id = id?id:$('.current-variant').data('variant');
    elements[i].classList.add("hide");
    if ($(`div[data-current='current-${current_id}-${user_country_regionLink}']`).length) {
      $(`div[data-current='current-${current_id}-${user_country_regionLink}']`).removeClass('hide')

      found = true;
      if(!$(elements[i]).hasClass('hide')){
        var cloned = $(elements[i]).clone();
        cloned.removeClass('hide');
        // elementsToMove.push(elements[i]);
        elementsToMove.push(cloned);
        
      }
      $(`div[data-current='current-${current_id}-${user_country_regionLink}']`).addClass('hide')

      // Add the current element to the elementsToMove array
    } else {
      elements[i].classList.add("hide");
      $(`div.get_Co-but[data-country-code='${user_country_regionLink}']`).removeClass('hide')
      if(!$(elements[i]).hasClass('hide')){
        var cloned = $(elements[i]).clone();
        cloned.removeClass('hide');
        elementsToMove.push(cloned);
        
      }
      $(`div.get_Co-but[data-country-code='${user_country_regionLink}']`).addClass('hide')
    }
    if (user_country_regionLink === "US") {
      elements[i].classList.add("hide");
      $('.link_buttons').hide();
       $('#theHead').addClass('hide')
    }else{
      $('#theHead').removeClass('hide') 
    }
  }
  // If newElement is not created yet, create it and append it to the parent of the first element
  $('.link_buttons').empty();
  // console.log('elementsToMove',elementsToMove)
  if ($('.link_buttons').length) {   
    // Move all elements in elementsToMove to newElement
    for (let i = 0; i < elementsToMove.length; i++) {
       $('.link_buttons').append(elementsToMove[i]);
    }
  }
  elementsToMove = [];
}
cataLoglinkButton(null);


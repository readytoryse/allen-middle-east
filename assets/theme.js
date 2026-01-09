
/*
@license
  Expanse by Archetype Themes (https://archetypethemes.co)
  Access unminified JS in assets/theme.js

  Use this event listener to run your own JS outside of this file.
  Documentation - https://archetypethemes.co/blogs/expanse/javascript-events-for-developers

  document.addEventListener('page:loaded', function() {
    // Page has loaded and theme assets are ready
  });
*/
const getMobileOS = () => {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
    "MacIntel",
  ].includes(navigator.platform);
};
  $(document).ready( function(){
   if (getMobileOS()) {
      document.body.classList.add("is-ios-device");
    } else {
      document.body.classList.remove("is-ios-device");
    }
    // Get OS
    var os = ["iphone", "ipad", "windows", "mac", "linux"];
    var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join("|")));
    if (match) {
      $("body").addClass(match[0]);
    }
  })

if (console && console.log) {
  console.log("Expanse theme (" + theme.settings.themeVersion + ") by ARCHΞTYPE | Learn more at https://archetypethemes.co");
}
(function($) {
  $.extend($.expr[':'], {
    'off-top': function(el) {
      return $(el).offset().top < $(window).scrollTop();
    },
    'off-right': function(el) {
      return $(el).offset().left + $(el).outerWidth() - $(window).scrollLeft() > $(window).width();
    },
    'off-bottom': function(el) {
      return $(el).offset().top + $(el).outerHeight() - $(window).scrollTop() > $(window).height();
    },
    'off-left': function(el) {
      return $(el).offset().left < $(window).scrollLeft();
    },
    'off-screen': function(el) {
      return $(el).is(':off-top, :off-right, :off-bottom, :off-left');
    }
  });
})(jQuery);

(function () {
  "use strict";

  if (window.Shopify && window.Shopify.theme && navigator && navigator.sendBeacon && window.Shopify.designMode) {
    navigator.sendBeacon('https://api.archetypethemes.co/api/beacon', new URLSearchParams({
      shop: window.Shopify.shop,
      themeName: window.theme && window.theme.settings && `${window.theme.settings.themeName} v${window.theme.settings.themeVersion}`,
      role: window.Shopify.theme.role,
      route: window.location.pathname,
      themeId: window.Shopify.theme.id,
      themeStoreId: window.Shopify.theme.theme_store_id || 0,
      isThemeEditor: !!window.Shopify.designMode
    }))
  }

  theme.customerTemplates = function() {
    checkUrlHash();
    initEventListeners();
    resetPasswordSuccess();
    customerAddressForm();
  
    function checkUrlHash() {
      var hash = window.location.hash;
  
      // Allow deep linking to recover password form
      if (hash === '#recover') {
        toggleRecoverPasswordForm();
      }
    }
  
    function toggleRecoverPasswordForm() {
      var passwordForm = document.getElementById('RecoverPasswordForm').classList.toggle('hide');
      var loginForm = document.getElementById('CustomerLoginForm').classList.toggle('hide');
    }
  
    function initEventListeners() {
      // Show reset password form
      var recoverForm = document.getElementById('RecoverPassword');
      if (recoverForm) {
        recoverForm.addEventListener('click', function(evt) {
          evt.preventDefault();
          toggleRecoverPasswordForm();
        });
      }
  
      // Hide reset password form
      var hideRecoverPassword = document.getElementById('HideRecoverPasswordLink');
      if (hideRecoverPassword) {
        hideRecoverPassword.addEventListener('click', function(evt) {
          evt.preventDefault();
          toggleRecoverPasswordForm();
        });
      }
    }
  
    function resetPasswordSuccess() {
      var formState = document.querySelector('.reset-password-success');
  
      // check if reset password form was successfully submitted
      if (!formState) {
        return;
      }
  
      // show success message
      document.getElementById('ResetSuccess').classList.remove('hide');
    }
  
    function customerAddressForm() {
      var newAddressForm = document.getElementById('AddressNewForm');
      var addressForms = document.querySelectorAll('.js-address-form');
  
      if (!newAddressForm || !addressForms.length) {
        return;
      }
  
      // Country/province selector can take a short time to load
      setTimeout(function() {
        document.querySelectorAll('.js-address-country').forEach(el => {
          var countryId = el.dataset.countryId;
          var provinceId = el.dataset.provinceId;
          var provinceContainerId = el.dataset.provinceContainerId;
  
          new Shopify.CountryProvinceSelector(
            countryId,
            provinceId,
            {
              hideElement: provinceContainerId
            }
          );
        });
      }, 1000);
  
      // Toggle new/edit address forms
      document.querySelectorAll('.address-new-toggle').forEach(el => {
        el.addEventListener('click', function() {
          newAddressForm.classList.toggle('hide');
        });
      });
  
      document.querySelectorAll('.address-edit-toggle').forEach(el => {
        el.addEventListener('click', function(evt) {
          var formId = evt.currentTarget.dataset.formId;
          document.getElementById('EditAddress_' + formId).classList.toggle('hide');
        });
      });
  
      document.querySelectorAll('.address-delete').forEach(el => {
        el.addEventListener('click', function(evt) {
          var formId = evt.currentTarget.dataset.formId;
          var confirmMessage = evt.currentTarget.dataset.confirmMessage;
  
          if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
            if (Shopify) {
              Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
            }
          }
        })
      });
    }
  };
  

  /*============================================================================
    Things that don't require DOM to be ready
  ==============================================================================*/

  /*============================================================================
    Things that require DOM to be ready
  ==============================================================================*/
  function DOMready(callback) {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

  DOMready(function () {
    if (theme.settings.isCustomerTemplate) {
      theme.customerTemplates();
    }

    document.dispatchEvent(new CustomEvent("page:loaded"));
  });
})();

equalheight = function(container){
var currentTallest = 0,
  currentRowStart = 0,
  rowDivs = new Array(),
  $el,
  topPosition = 0;
 jQuery(container).each(function() {
  $el = jQuery(this);
  jQuery($el).height('auto')
  topPostion = $el.position().top;
   if (currentRowStart != topPostion) {
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
    rowDivs.length = 0; // empty the array
    currentRowStart = topPostion;
    currentTallest = $el.height();
    rowDivs.push($el);
   } else {
    rowDivs.push($el);
    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

/*******************************   Captch Code Implementatio JS ***************************/
if (is_home == "page.find-seller" || is_home == "page.contact" || is_home =="page.register-product" || is_home=='page.ambassadors-program' ){
  var actCallback = function (response) {
    $('.contact-form input[type="submit"]').prop("disabled", false);
    $('.Ambassador-form button[type="submit"]').removeAttr("disabled");
    $('#re-captcha').remove();
  };
  var expCallback = function() {
    $('.contact-form input[type="submit"]').prop("disabled", true);
    $('.Ambassador-form button[type="submit"]').removeAttr("disabled");
  };

  var onloadCallback = function () {
    var widget = grecaptcha.render(document.getElementById("re-captcha"), {
      'sitekey' : "6LdetsgpAAAAAGhkg4J7OqyAESe2iU6swxuv728O", // Sitekey, Retrieving from reCaptcha
      'theme': "light",
      'callback' : actCallback,
      'expired-callback': expCallback,
    });
  }
  }
  
/*******************************   End Captch Code Implementatio JS ***************************/
function iniThankUSlider(){
  if($('.thanks_insta_feed_slide').length > 6){
    var opts = {
      infinite: true,
      centerMode: true,
      slidesToShow: 4,
      centerPadding: '10%',
      slidesToScroll: 1,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: '20%',
        }
      },
      
      ]
    };
  if($('.thanks_insta_feed_inner').hasClass('slick-initialized')){
    $('.thanks_insta_feed_inner').slick('unslick');
  }
  $('.thanks_insta_feed_inner').slick(opts)
  }
}
if($('body').hasClass('page-thank-you')){
   iniThankUSlider();
}
 // $('.thanku-msg-2').hide();
 //            $('.thanku-msg').show();
// iniThankUSlider();
/*============================================================================
    Jquery Validation JS
  ==============================================================================*/

!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){t.extend(t.fn,{validate:function(e){if(this.length){var i=t.data(this[0],"validator");return i||(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.on("click.validate",":submit",function(e){i.submitButton=e.currentTarget,t(this).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(this).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.on("submit.validate",function(e){function s(){var s,n;return i.submitButton&&(i.settings.submitHandler||i.formSubmitted)&&(s=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),!i.settings.submitHandler||(n=i.settings.submitHandler.call(i,i.currentForm,e),s&&s.remove(),void 0!==n&&n)}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,s()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):s():(i.focusInvalid(),!1)})),i)}e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){var e,i,s;return t(this[0]).is("form")?e=this.validate().form():(s=[],e=!0,i=t(this[0].form).validate(),this.each(function(){(e=i.element(this)&&e)||(s=s.concat(i.errorList))}),i.errorList=s),e},rules:function(e,i){var s,n,r,a,o,l,h=this[0];if(null!=h&&(!h.form&&h.hasAttribute("contenteditable")&&(h.form=this.closest("form")[0],h.name=this.attr("name")),null!=h.form)){if(e)switch(n=(s=t.data(h.form,"validator").settings).rules,r=t.validator.staticRules(h),e){case"add":t.extend(r,t.validator.normalizeRule(i)),delete r.messages,n[h.name]=r,i.messages&&(s.messages[h.name]=t.extend(s.messages[h.name],i.messages));break;case"remove":return i?(l={},t.each(i.split(/\s/),function(t,e){l[e]=r[e],delete r[e]}),l):(delete n[h.name],r)}return(a=t.validator.normalizeRules(t.extend({},t.validator.classRules(h),t.validator.attributeRules(h),t.validator.dataRules(h),t.validator.staticRules(h)),h)).required&&(o=a.required,delete a.required,a=t.extend({required:o},a)),a.remote&&(o=a.remote,delete a.remote,a=t.extend(a,{remote:o})),a}}}),t.extend(t.expr.pseudos||t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){var i=t(e).val();return null!==i&&!!t.trim(""+i)},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:void 0===i?e:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(new RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(t)))},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(e,i){9===i.which&&""===this.elementValue(e)||-1!==t.inArray(i.keyCode,[16,17,18,20,35,36,37,38,39,40,45,144,225])||(e.name in this.submitted||e.name in this.invalid)&&this.element(e)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(s):t(e).addClass(i).removeClass(s)},unhighlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(s):t(e).removeClass(i).addClass(s)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}."),step:t.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var e,i=this.groups={};function s(e){!this.form&&this.hasAttribute("contenteditable")&&(this.form=t(this).closest("form")[0],this.name=t(this).attr("name"));var i=t.data(this.form,"validator"),s="on"+e.type.replace(/^validate/,""),n=i.settings;n[s]&&!t(this).is(n.ignore)&&n[s].call(i,this,e)}t.each(this.settings.groups,function(e,s){"string"==typeof s&&(s=s.split(/\s/)),t.each(s,function(t,s){i[s]=e})}),e=this.settings.rules,t.each(e,function(i,s){e[i]=t.validator.normalizeRule(s)}),t(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",s).on("click.validate","select, option, [type='radio'], [type='checkbox']",s),this.settings.invalidHandler&&t(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){var i,s,n=this.clean(e),r=this.validationTargetFor(n),a=this,o=!0;return void 0===r?delete this.invalid[n.name]:(this.prepareElement(r),this.currentElements=t(r),(s=this.groups[r.name])&&t.each(this.groups,function(t,e){e===s&&t!==r.name&&(n=a.validationTargetFor(a.clean(a.findByName(t))))&&n.name in a.invalid&&(a.currentElements.push(n),o=a.check(n)&&o)}),i=!1!==this.check(r),o=o&&i,this.invalid[r.name]=!i,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),t(e).attr("aria-invalid",!i)),o},showErrors:function(e){if(e){var i=this;t.extend(this.errorMap,e),this.errorList=t.map(this.errorMap,function(t,e){return{message:t,element:i.findByName(e)[0]}}),this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var e=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(e)},resetElements:function(t){var e;if(this.settings.unhighlight)for(e=0;t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,""),this.findByName(t[e].name).removeClass(this.settings.validClass);else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e,i=0;for(e in t)void 0!==t[e]&&null!==t[e]&&!1!==t[e]&&i++;return i},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(t){t.not(this.containers).text(""),this.addWrapper(t).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var s=this.name||t(this).attr("name");return!s&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=t(this).closest("form")[0],this.name=s),!(s in i||!e.objectLength(t(this).rules()))&&(i[s]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.split(" ").join(".");return t(this.settings.errorElement+"."+e,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([])},reset:function(){this.resetInternals(),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i,s,n=t(e),r=e.type;return"radio"===r||"checkbox"===r?this.findByName(e.name).filter(":checked").val():"number"===r&&void 0!==e.validity?e.validity.badInput?"NaN":n.val():(i=e.hasAttribute("contenteditable")?n.text():n.val(),"file"===r?"C:\\fakepath\\"===i.substr(0,12)?i.substr(12):(s=i.lastIndexOf("/"))>=0?i.substr(s+1):(s=i.lastIndexOf("\\"))>=0?i.substr(s+1):i:"string"==typeof i?i.replace(/\r/g,""):i)},check:function(e){e=this.validationTargetFor(this.clean(e));var i,s,n,r,a=t(e).rules(),o=t.map(a,function(t,e){return e}).length,l=!1,h=this.elementValue(e);if("function"==typeof a.normalizer?r=a.normalizer:"function"==typeof this.settings.normalizer&&(r=this.settings.normalizer),r){if("string"!=typeof(h=r.call(e,h)))throw new TypeError("The normalizer should return a string value.");delete a.normalizer}for(s in a){n={method:s,parameters:a[s]};try{if("dependency-mismatch"===(i=t.validator.methods[s].call(this,h,e,n.parameters))&&1===o){l=!0;continue}if(l=!1,"pending"===i)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(!i)return this.formatAndAdd(e,n),!1}catch(t){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+n.method+"' method.",t),t instanceof TypeError&&(t.message+=".  Exception occurred when checking element "+e.id+", check the '"+n.method+"' method."),t}}if(!l)return this.objectLength(a)&&this.successList.push(e),!0},customDataMessage:function(e,i){return t(e).data("msg"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase())||t(e).data("msg")},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(e,i){"string"==typeof i&&(i={method:i});var s=this.findDefined(this.customMessage(e.name,i.method),this.customDataMessage(e,i.method),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i.method],"<strong>Warning: No message defined for "+e.name+"</strong>"),n=/\$?\{(\d+)\}/g;return"function"==typeof s?s=s.call(this,i.parameters,e):n.test(s)&&(s=t.validator.format(s.replace(n,"{$1}"),i.parameters)),s},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e);this.errorList.push({message:i,element:t,method:e.method}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e,i;for(t=0;this.errorList[t];t++)i=this.errorList[t],this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var s,n,r,a,o=this.errorsFor(e),l=this.idOrName(e),h=t(e).attr("aria-describedby");o.length?(o.removeClass(this.settings.validClass).addClass(this.settings.errorClass),o.html(i)):(s=o=t("<"+this.settings.errorElement+">").attr("id",l+"-error").addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(s=o.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(s):this.settings.errorPlacement?this.settings.errorPlacement.call(this,s,t(e)):s.insertAfter(e),o.is("label")?o.attr("for",l):0===o.parents("label[for='"+this.escapeCssMeta(l)+"']").length&&(r=o.attr("id"),h?h.match(new RegExp("\\b"+this.escapeCssMeta(r)+"\\b"))||(h+=" "+r):h=r,t(e).attr("aria-describedby",h),(n=this.groups[e.name])&&(a=this,t.each(a.groups,function(e,i){i===n&&t("[name='"+a.escapeCssMeta(e)+"']",a.currentForm).attr("aria-describedby",o.attr("id"))})))),!i&&this.settings.success&&(o.text(""),"string"==typeof this.settings.success?o.addClass(this.settings.success):this.settings.success(o,e)),this.toShow=this.toShow.add(o)},errorsFor:function(e){var i=this.escapeCssMeta(this.idOrName(e)),s=t(e).attr("aria-describedby"),n="label[for='"+i+"'], label[for='"+i+"'] *";return s&&(n=n+", #"+this.escapeCssMeta(s).replace(/\s+/g,", #")),this.errors().filter(n)},escapeCssMeta:function(t){return t.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(e){return this.checkable(e)&&(e=this.findByName(e.name)),t(e).not(this.settings.ignore)[0]},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+this.escapeCssMeta(e)+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return!this.dependTypes[typeof t]||this.dependTypes[typeof t](t,e)},dependTypes:{boolean:function(t){return t},string:function(e,i){return!!t(e,i.form).length},function:function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,t(e).addClass(this.settings.pendingClass),this.pending[e.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],t(e).removeClass(this.settings.pendingClass),i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.submitButton&&t("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e,i){return i="string"==typeof i&&i||"remote",t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,{method:i})})},destroy:function(){this.resetForm(),t(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},s=t(e).attr("class");return s&&t.each(s.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},normalizeAttributeRule:function(t,e,i,s){/min|max|step/.test(i)&&(null===e||/number|range|text/.test(e))&&(s=Number(s),isNaN(s)&&(s=void 0)),s||0===s?t[i]=s:e===i&&"range"!==e&&(t[i]=!0)},attributeRules:function(e){var i,s,n={},r=t(e),a=e.getAttribute("type");for(i in t.validator.methods)"required"===i?(""===(s=e.getAttribute(i))&&(s=!0),s=!!s):s=r.attr(i),this.normalizeAttributeRule(n,a,i,s);return n.maxlength&&/-1|2147483647|524288/.test(n.maxlength)&&delete n.maxlength,n},dataRules:function(e){var i,s,n={},r=t(e),a=e.getAttribute("type");for(i in t.validator.methods)s=r.data("rule"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase()),this.normalizeAttributeRule(n,a,i,s);return n},staticRules:function(e){var i={},s=t.data(e.form,"validator");return s.settings.rules&&(i=t.validator.normalizeRule(s.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(s,n){if(!1!==n){if(n.param||n.depends){var r=!0;switch(typeof n.depends){case"string":r=!!t(n.depends,i.form).length;break;case"function":r=n.depends.call(i,i)}r?e[s]=void 0===n.param||n.param:(t.data(i.form,"validator").resetElements(t(i)),delete e[s])}}else delete e[s]}),t.each(e,function(s,n){e[s]=t.isFunction(n)&&"normalizer"!==s?n(i):n}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].replace(/[\[\]]/g,"").split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(null!=e.min&&null!=e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),null!=e.minlength&&null!=e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,s){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==s?s:t.validator.messages[e],i.length<3&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,s){if(!this.depend(s,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var n=t(i).val();return n&&n.length>0}return this.checkable(i)?this.getLength(e,i)>0:e.length>0},email:function(t,e){return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},url:function(t,e){return this.optional(e)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString())},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)},number:function(t,e){return this.optional(e)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},minlength:function(e,i,s){var n=t.isArray(e)?e.length:this.getLength(e,i);return this.optional(i)||n>=s},maxlength:function(e,i,s){var n=t.isArray(e)?e.length:this.getLength(e,i);return this.optional(i)||n<=s},rangelength:function(e,i,s){var n=t.isArray(e)?e.length:this.getLength(e,i);return this.optional(i)||n>=s[0]&&n<=s[1]},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||t<=i},range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},step:function(e,i,s){var n,r=t(i).attr("type"),a="Step attribute on input type "+r+" is not supported.",o=new RegExp("\\b"+r+"\\b"),l=function(t){var e=(""+t).match(/(?:\.(\d+))?$/);return e&&e[1]?e[1].length:0},h=function(t){return Math.round(t*Math.pow(10,n))},u=!0;if(r&&!o.test(["text","number","range"].join()))throw new Error(a);return n=l(s),(l(e)>n||h(e)%h(s)!=0)&&(u=!1),this.optional(i)||u},equalTo:function(e,i,s){var n=t(s);return this.settings.onfocusout&&n.not(".validate-equalTo-blur").length&&n.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){t(i).valid()}),e===n.val()},remote:function(e,i,s,n){if(this.optional(i))return"dependency-mismatch";n="string"==typeof n&&n||"remote";var r,a,o,l=this.previousValue(i,n);return this.settings.messages[i.name]||(this.settings.messages[i.name]={}),l.originalMessage=l.originalMessage||this.settings.messages[i.name][n],this.settings.messages[i.name][n]=l.message,s="string"==typeof s&&{url:s}||s,o=t.param(t.extend({data:e},s.data)),l.old===o?l.valid:(l.old=o,r=this,this.startRequest(i),(a={})[i.name]=e,t.ajax(t.extend(!0,{mode:"abort",port:"validate"+i.name,dataType:"json",data:a,context:r.currentForm,success:function(t){var s,a,o,h=!0===t||"true"===t;r.settings.messages[i.name][n]=l.originalMessage,h?(o=r.formSubmitted,r.resetInternals(),r.toHide=r.errorsFor(i),r.formSubmitted=o,r.successList.push(i),r.invalid[i.name]=!1,r.showErrors()):(s={},a=t||r.defaultMessage(i,{method:n,parameters:e}),s[i.name]=l.message=a,r.invalid[i.name]=!0,r.showErrors(s)),l.valid=h,r.stopRequest(i,h)}},s)),"pending")}}});var e,i={};return t.ajaxPrefilter?t.ajaxPrefilter(function(t,e,s){var n=t.port;"abort"===t.mode&&(i[n]&&i[n].abort(),i[n]=s)}):(e=t.ajax,t.ajax=function(s){var n=("mode"in s?s:t.ajaxSettings).mode,r=("port"in s?s:t.ajaxSettings).port;return"abort"===n?(i[r]&&i[r].abort(),i[r]=e.apply(this,arguments),i[r]):e.apply(this,arguments)}),t});

/*==========================End Jquery Validation JS================================== */

/*============================================================================
 * bootstrap3-typeahead.js v4.0.2
 * https://github.com/bassjobsen/Bootstrap-3-Typeahead
  ==============================================================================*/
!function(t,e){"use strict";"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):e(t.jQuery)}(this,function(t){"use strict";var e=function(i,s){this.$element=t(i),this.options=t.extend({},e.defaults,s),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.select=this.options.select||this.select,this.autoSelect="boolean"!=typeof this.options.autoSelect||this.options.autoSelect,this.highlighter=this.options.highlighter||this.highlighter,this.render=this.options.render||this.render,this.updater=this.options.updater||this.updater,this.displayText=this.options.displayText||this.displayText,this.itemLink=this.options.itemLink||this.itemLink,this.itemTitle=this.options.itemTitle||this.itemTitle,this.followLinkOnSelect=this.options.followLinkOnSelect||this.followLinkOnSelect,this.source=this.options.source,this.delay=this.options.delay,this.theme=this.options.theme&&this.options.themes&&this.options.themes[this.options.theme]||e.defaults.themes[e.defaults.theme],this.$menu=t(this.options.menu||this.theme.menu),this.$appendTo=this.options.appendTo?t(this.options.appendTo):null,this.fitToElement="boolean"==typeof this.options.fitToElement&&this.options.fitToElement,this.shown=!1,this.listen(),this.showHintOnFocus=("boolean"==typeof this.options.showHintOnFocus||"all"===this.options.showHintOnFocus)&&this.options.showHintOnFocus,this.afterSelect=this.options.afterSelect,this.afterEmptySelect=this.options.afterEmptySelect,this.addItem=!1,this.value=this.$element.val()||this.$element.text(),this.keyPressed=!1,this.focused=this.$element.is(":focus")};e.prototype={constructor:e,setDefault:function(t){if(this.$element.data("active",t),this.autoSelect||t){var e=this.updater(t);e||(e=""),this.$element.val(this.displayText(e)||e).text(this.displayText(e)||e).change(),this.afterSelect(e)}return this.hide()},select:function(){var t=this.$menu.find(".active").data("value");if(this.$element.data("active",t),this.autoSelect||t){var e=this.updater(t);e||(e=""),this.$element.val(this.displayText(e)||e).text(this.displayText(e)||e).change(),this.afterSelect(e),this.followLinkOnSelect&&this.itemLink(t)?(document.location=this.itemLink(t),this.afterSelect(e)):this.followLinkOnSelect&&!this.itemLink(t)?this.afterEmptySelect(e):this.afterSelect(e)}else this.afterEmptySelect(e);return this.hide()},updater:function(t){return t},setSource:function(t){this.source=t},show:function(){var e,i=t.extend({},this.$element.position(),{height:this.$element[0].offsetHeight}),s="function"==typeof this.options.scrollHeight?this.options.scrollHeight.call():this.options.scrollHeight;if(this.shown?e=this.$menu:this.$appendTo?(e=this.$menu.appendTo(this.$appendTo),this.hasSameParent=this.$appendTo.is(this.$element.parent())):(e=this.$menu.insertAfter(this.$element),this.hasSameParent=!0),!this.hasSameParent){e.css("position","fixed");var o=this.$element.offset();i.top=o.top,i.left=o.left}var n=t(e).parent().hasClass("dropup")?"auto":i.top+i.height+s,h=t(e).hasClass("dropdown-menu-right")?"auto":i.left;return e.css({top:n,left:h}).show(),!0===this.options.fitToElement&&e.css("width",this.$element.outerWidth()+"px"),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(e){if(this.query=void 0!==e&&null!==e?e:this.$element.val(),this.query.length<this.options.minLength&&!this.options.showHintOnFocus)return this.shown?this.hide():this;var i=t.proxy(function(){t.isFunction(this.source)&&3===this.source.length?this.source(this.query,t.proxy(this.process,this),t.proxy(this.process,this)):t.isFunction(this.source)?this.source(this.query,t.proxy(this.process,this)):this.source&&this.process(this.source)},this);clearTimeout(this.lookupWorker),this.lookupWorker=setTimeout(i,this.delay)},process:function(e){var i=this;return e=t.grep(e,function(t){return i.matcher(t)}),(e=this.sorter(e)).length||this.options.addItem?(e.length>0?this.$element.data("active",e[0]):this.$element.data("active",null),"all"!=this.options.items&&(e=e.slice(0,this.options.items)),this.options.addItem&&e.push(this.options.addItem),this.render(e).show()):this.shown?this.hide():this},matcher:function(t){return~this.displayText(t).toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(t){for(var e,i=[],s=[],o=[];e=t.shift();){var n=this.displayText(e);n.toLowerCase().indexOf(this.query.toLowerCase())?~n.indexOf(this.query)?s.push(e):o.push(e):i.push(e)}return i.concat(s,o)},highlighter:function(t){var e=this.query;if(""===e)return t;var i,s=t.match(/(>)([^<]*)(<)/g),o=[],n=[];if(s&&s.length)for(i=0;i<s.length;++i)s[i].length>2&&o.push(s[i]);else(o=[]).push(t);e=e.replace(/[\(\)\/\.\*\+\?\[\]]/g,function(t){return"\\"+t});var h,a=new RegExp(e,"g");for(i=0;i<o.length;++i)(h=o[i].match(a))&&h.length>0&&n.push(o[i]);for(i=0;i<n.length;++i)t=t.replace(n[i],n[i].replace(a,"<strong>$&</strong>"));return t},render:function(e){var i=this,s=this,o=!1,n=[],h=i.options.separator;return t.each(e,function(t,i){t>0&&i[h]!==e[t-1][h]&&n.push({__type:"divider"}),!i[h]||0!==t&&i[h]===e[t-1][h]||n.push({__type:"category",name:i[h]}),n.push(i)}),e=t(n).map(function(e,n){if("category"==(n.__type||!1))return t(i.options.headerHtml||i.theme.headerHtml).text(n.name)[0];if("divider"==(n.__type||!1))return t(i.options.headerDivider||i.theme.headerDivider)[0];var h=s.displayText(n);return(e=t(i.options.item||i.theme.item).data("value",n)).find(i.options.itemContentSelector||i.theme.itemContentSelector).addBack(i.options.itemContentSelector||i.theme.itemContentSelector).html(i.highlighter(h,n)),i.options.followLinkOnSelect&&e.find("a").attr("href",s.itemLink(n)),e.find("a").attr("title",s.itemTitle(n)),h==s.$element.val()&&(e.addClass("active"),s.$element.data("active",n),o=!0),e[0]}),this.autoSelect&&!o&&(e.filter(":not(.dropdown-header)").first().addClass("active"),this.$element.data("active",e.first().data("value"))),this.$menu.html(e),this},displayText:function(t){return void 0!==t&&void 0!==t.name?t.name:t},itemLink:function(t){return null},itemTitle:function(t){return null},next:function(e){var i=this.$menu.find(".active").removeClass("active").next();i.length||(i=t(this.$menu.find(t(this.options.item||this.theme.item).prop("tagName"))[0])),i.addClass("active");var s=this.updater(i.data("value"));this.$element.val(this.displayText(s)||s)},prev:function(e){var i=this.$menu.find(".active").removeClass("active").prev();i.length||(i=this.$menu.find(t(this.options.item||this.theme.item).prop("tagName")).last()),i.addClass("active");var s=this.updater(i.data("value"));this.$element.val(this.displayText(s)||s)},listen:function(){this.$element.on("focus.bootstrap3Typeahead",t.proxy(this.focus,this)).on("blur.bootstrap3Typeahead",t.proxy(this.blur,this)).on("keypress.bootstrap3Typeahead",t.proxy(this.keypress,this)).on("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead",t.proxy(this.input,this)).on("keyup.bootstrap3Typeahead",t.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown.bootstrap3Typeahead",t.proxy(this.keydown,this));var e=t(this.options.item||this.theme.item).prop("tagName");"ontouchstart"in document.documentElement?this.$menu.on("touchstart",e,t.proxy(this.touchstart,this)).on("touchend",e,t.proxy(this.click,this)):this.$menu.on("click",t.proxy(this.click,this)).on("mouseenter",e,t.proxy(this.mouseenter,this)).on("mouseleave",e,t.proxy(this.mouseleave,this)).on("mousedown",t.proxy(this.mousedown,this))},destroy:function(){this.$element.data("typeahead",null),this.$element.data("active",null),this.$element.unbind("focus.bootstrap3Typeahead").unbind("blur.bootstrap3Typeahead").unbind("keypress.bootstrap3Typeahead").unbind("propertychange.bootstrap3Typeahead input.bootstrap3Typeahead").unbind("keyup.bootstrap3Typeahead"),this.eventSupported("keydown")&&this.$element.unbind("keydown.bootstrap3-typeahead"),this.$menu.remove(),this.destroyed=!0},eventSupported:function(t){var e=t in this.$element;return e||(this.$element.setAttribute(t,"return;"),e="function"==typeof this.$element[t]),e},move:function(t){if(this.shown)switch(t.keyCode){case 9:case 13:case 27:t.preventDefault();break;case 38:if(t.shiftKey)return;t.preventDefault(),this.prev();break;case 40:if(t.shiftKey)return;t.preventDefault(),this.next()}},keydown:function(e){17!==e.keyCode&&(this.keyPressed=!0,this.suppressKeyPressRepeat=~t.inArray(e.keyCode,[40,38,9,13,27]),this.shown||40!=e.keyCode?this.move(e):this.lookup())},keypress:function(t){this.suppressKeyPressRepeat||this.move(t)},input:function(t){var e=this.$element.val()||this.$element.text();this.value!==e&&(this.value=e,this.lookup())},keyup:function(t){if(!this.destroyed)switch(t.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:if(!this.shown||this.showHintOnFocus&&!this.keyPressed)return;this.select();break;case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide()}},focus:function(t){this.focused||(this.focused=!0,this.keyPressed=!1,this.options.showHintOnFocus&&!0!==this.skipShowHintOnFocus&&("all"===this.options.showHintOnFocus?this.lookup(""):this.lookup())),this.skipShowHintOnFocus&&(this.skipShowHintOnFocus=!1)},blur:function(t){this.mousedover||this.mouseddown||!this.shown?this.mouseddown&&(this.skipShowHintOnFocus=!0,this.$element.focus(),this.mouseddown=!1):(this.select(),this.hide(),this.focused=!1,this.keyPressed=!1)},click:function(t){t.preventDefault(),this.skipShowHintOnFocus=!0,this.select(),this.$element.focus(),this.hide()},mouseenter:function(e){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),t(e.currentTarget).addClass("active")},mouseleave:function(t){this.mousedover=!1,!this.focused&&this.shown&&this.hide()},mousedown:function(t){this.mouseddown=!0,this.$menu.one("mouseup",function(t){this.mouseddown=!1}.bind(this))},touchstart:function(e){e.preventDefault(),this.$menu.find(".active").removeClass("active"),t(e.currentTarget).addClass("active")},touchend:function(t){t.preventDefault(),this.select(),this.$element.focus()}};var i=t.fn.typeahead;t.fn.typeahead=function(i){var s=arguments;return"string"==typeof i&&"getActive"==i?this.data("active"):this.each(function(){var o=t(this),n=o.data("typeahead"),h="object"==typeof i&&i;n||o.data("typeahead",n=new e(this,h)),"string"==typeof i&&n[i]&&(s.length>1?n[i].apply(n,Array.prototype.slice.call(s,1)):n[i]())})},e.defaults={source:[],items:8,minLength:1,scrollHeight:0,autoSelect:!0,afterSelect:t.noop,afterEmptySelect:t.noop,addItem:!1,followLinkOnSelect:!1,delay:0,separator:"category",theme:"bootstrap3",themes:{bootstrap3:{menu:'<ul class="typeahead dropdown-menu" role="listbox"></ul>',item:'<li><a class="dropdown-item" href="#" role="option"></a></li>',itemContentSelector:"a",headerHtml:'<li class="dropdown-header"></li>',headerDivider:'<li class="divider" role="separator"></li>'},bootstrap4:{menu:'<div class="typeahead dropdown-menu" role="listbox"></div>',item:'<button class="dropdown-item" role="option"></button>',itemContentSelector:".dropdown-item",headerHtml:'<h6 class="dropdown-header"></h6>',headerDivider:'<div class="dropdown-divider"></div>'}}},t.fn.typeahead.Constructor=e,t.fn.typeahead.noConflict=function(){return t.fn.typeahead=i,this},t(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(e){var i=t(this);i.data("typeahead")||i.typeahead(i.data())})});

//product register js

 function register($form) {
   $.ajax({
     type: $form.attr('method'),
     url: $form.attr('action'),
     data: $form.serialize(),
     cache: false,
     dataType: 'json',
     contentType: 'application/json; charset=utf-8',
     error: function (err) {  },
     success: function (data) {
       console.log($form.serialize())
       if (data.result === 'success') {
         // Yeahhhh Success
         console.log(data.msg)
       } else {
         // Something went wrong, do something to notify the user.
         console.log(data.msg)
       }
     }
   })
 };
 $('form.contact-form.register-product input[type="submit"]').on('click',function(e){
   if($('#contactFormNewsletter').prop('checked')){
     $("input#mce-EMAIL").val($("input#contactFormEmail").val());
//      console.log($('#contactFormNewsletter').prop('checked'))
     var $form = $('#product-register-subscribe-form')
     register($form)
   }
   else{}
 })
 
 
$("form.contact-form.register-product").validate({
    rules: {
      name: "required",
      phone: {
        required: true,
        number: true
      },
      email: {
        required: true,
        email: true
      },
      address: {
        required: true
      },
      city: {
        required: true
      },
      stateProvince: {
        required: true        
      },
      postalCode: {
        required: true
      },
      country:"required",
      purchaseLocation:"required",
      model:"required",
      poNumber:"required",
      packagingDate:{
        required:true,
        date:true
      },
      agreement: "required"
    },
    messages: {
      name: "Please enter fullname",
      phone: {
        required: "Please enter phone number",
        number: "Please enter digits"
      },
      email: {
        required: "Please enter email address",
        email: "Please enter valid email address"
      },
      address: {
        required: "Please enter address"
      },
      city: {
        required: "Please enter city"
      },
      stateProvince: {
        required: "Please select state"
      },
      postalCode: {
        required: "Please enter zipcode"
      },
      country:"Please enter country",
      purchaseLocation:"Please enter purchase location",
      model:"Please select product model",
      poNumberDate:"Please enter PO number",
      purchaseDate:{
        required:"Please enter package date",
        date:"Please enter date"
      },
      agreement: "Please select our terms"
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        error.insertAfter($(element).parents('.form-choice-controler'));
      } else {
        // something else if it's not a checkbox
         element.after(error); // default error placement
      }
    },
    submitHandler: function(form) {
//       console.log($(form).serialize())
       const formData0 = new FormData(form);
      if (formData0.get("favorite_item") !== "") {
        // Form submission is spam
        console.log('Form submission is spam')
        return;
      }
      $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize(),
        beforeSend: function() {
          $('.submit-area .loader').show();$('.submit-area input[type="submit"]').attr('disabled','disabled').addClass('disabled');
        },
        success: function(response) {
//           console.log(response)
          if(response.success==true){
            $('.submit-area .loader').hide();$('.submit-area input[type="submit"]').removeAttr('disabled','disabled').removeClass('disabled');
//             $('.thanku-msg').show();
            $(form).trigger('reset');
            // $(form).hide();
            // $('.thanku-msg').show();
            window.location.href='/pages/thank-you';

// //             $('body,html').animate({ scrollTop: $('.thanku-msg').offset().top-450}, 1300);
//             $(form).hide();
//             $('.thanku-msg').hide(function () {
//               $('.thanku-msg').show(function () {});
//             });
//             setTimeout(function () {
//               $('.thanku-msg').hide(function () {
//                 $(form).show(function () {});
//               });
//             }, 15000);
            
          }else if(response.error==true){ 
          }
        },
        error: function() {
           $('.submit-area .loader').hide();$('.submit-area input[type="submit"]').removeAttr('disabled','disabled').removeClass('disabled');
//             $('.thanku-msg').show();
            $(form).trigger('reset');
            // $(form).hide();
            // $('.thanku-msg').show();
            window.location.href='/pages/thank-you';
          $('.submit-area .loader').show();$('.submit-area input[type="submit"]').attr('disabled','disabled').addClass('disabled');
        }
      });
    }	
  });

//Ambassador form js

if($('body').hasClass('page-ambassadors-program')){
  
  $(function() {
      $( "#my_date_picker" ).datepicker({
        autoHide: true
      });
    console.log("new")
  });
var form = $("form.Ambassador-form");
  form.validate({
    ignore:[],
    rules:{
      'fullname':"required",
      'mailing_address1':"required",
      'dob':"required",
      'email_address': {
        required: true,
        email: true
      },
      "why_do_you":"required"
    },
    messages:{
      'fullname': "Please enter Fullname",
      'mailing_address1':"Please enter Mailing address",
      'dob':"Please select Date of Birth",
      'email_address': {
        required: "Please enter an Email address",
        email: "Please enter valid Email address"
      },
      'why_do_you':'Please enter why do you want to be an allen ambassador',
      'city':'Please enter City',
      'state':'Please enter State/Province',
      'zipcode':'Please enter Postal/Zip code',
    },
    errorElement: "em",
    submitHandler: function(form) {
//       console.log($(form).serialize())
      const formData = new FormData(form);
      console.log('formData.get("favorite_color")',formData.get("favorite_color"))
      if (formData.get("favorite_color") !== "") {
        // Form submission is spam
        return;
      }
      $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize(),
        beforeSend: function() {
          $('.submit-center button[type="submit"]').attr('disabled','disabled').addClass('disabled').text('Submitting...');
        },
        success: function(response) {
          console.log(response)
          if(response.success==true){
            $('.submit-center button[type="submit"]').removeAttr('disabled','disabled').removeClass('disabled').text('Submit');
            $(form).trigger('reset');
            $(form).hide();
            $('.footer-warning').hide();
            // if(response.exists==false){
            //   $('.thanku-msg-2').hide();
            //   $('.thanku-msg').show();
            // }else{
            //   $('.thanku-msg-2').show();
            //   $('.thanku-msg').hide();
            // }
            $('.thanku-msg-2').hide();
            $('.thanku-msg').show();
            iniThankUSlider();
          }else if(response.error==true){ 
          }
        },
        error: function() {
          $('.submit-center button[type="submit"]').attr('disabled','disabled').addClass('disabled');
        }
      });
    }
  })
}
// product return form js
if($('body').hasClass('page-return-form')){
  var form = $("form#return-form");
  form.validate({
    ignore: [],
    rules: {
      'contact[name]': "required",
      'contact[phone]': {
        required: true,
        number: true
      },
      'contact[email]': {
        required: true,
        email: true
      },
      'contact[address]': {
        required: true
      },
      'contact[city]': {
        required: true
      },
      'contact[stateProvince]': {
        required: true        
      },
     'contact[postalCode]': {
        required: true
      },
      'contact[country]':"required",
      'contact[order_number]':"required",
      'contact[item_no_1]':"required",
      agreement: "required"
    },
    messages: {
      'contact[name]': "Please enter fullname",
      'contact[phone]': {
        required: "Please enter phone number",
        number: "Please enter digits"
      },
      'contact[email]': {
        required: "Please enter email address",
        email: "Please enter valid email address"
      },
      'contact[address]': {
        required: "Please enter address"
      },
      'contact[city]': {
        required: "Please enter city"
      },
      'contact[stateProvince]': {
        required: "Please select state"
      },
      'contact[postalCode]': {
        required: "Please enter zipcode"
      },
      'contact[country]':"Please enter country",
      'contact[order_number]':"Please enter Order Number",
      'contact[item_no_1]':"Please enter Item number",
      agreement: "Please select our terms"
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        error.insertAfter($(element).parents('.form-choice-controler'));
      } else {
        // something else if it's not a checkbox
        element.after(error); // default error placement
      }
    }
  });
  var testing =false;

  $("input#Ordernumber").on('blur',function(e){
  	 $("form#return-form input#return_form_subject").val("Return Request for Order #"+$(this).val());
  })
  $('input.submit-return-form').click(function(e) {
    $("form#return-form input#return_form_subject").val("Return Request for Order #"+$("input#Ordernumber").val());
    e.preventDefault();
    const formData0 = new FormData($(form)[0]);
    if (formData0.get("favorite_size") !== "") {
      // Form submission is spam
      console.log('Form submission is spam')
      return;
    }
    console.log($(form).serialize())
    if(form.valid()){
      $.ajax({
        url: "https://allenapps.allen.bike/Returns/SubmitReturn",
        type: "POST",
        data: $(form).serialize(),
        beforeSend: function() {
          $('.submit-area .loader').show();$('.submit-area input[type="submit"]').attr('disabled','disabled').addClass('disabled');
        },
        success: function(response) {
          testing =true;
          console.log($(form).serialize());
          $('.submit-area .loader').hide();$('.submit-area input[type="submit"]').removeAttr('disabled','disabled').removeClass('disabled');
            $(form).hide();
            $('.thanku-msg').show();
            form.attr('action','/contact');
            form.submit();
          // if(response.success==true){
          //   $('.submit-area .loader').hide();$('.submit-area input[type="submit"]').removeAttr('disabled','disabled').removeClass('disabled');
          //   $(form).hide();
          //   $('.thanku-msg').show();
          //   form.attr('action','/contact');
          //   form.submit();
          // }else if(response.error==true){ 
          // }
          return true;
        },
        error: function() {
          testing=false;
          $('.submit-area .loader').show();$('.submit-area input[type="submit"]').attr('disabled','disabled').addClass('disabled');
        }
      });
    }
    return testing;
  });

}
     var divcount= 2;
    $('.submit-additional-item').click(function(){

      var main_parent = $('<div>').attr({'class':'main_parent_'+divcount+' sixteen columns omega form-control adding_main'});
      var parent1 = $('<div>').attr({'class':'contactitemno'});  
      var txt1 = $('<input type="text">').attr({'class':'form-control','id':'contactItemNo_'+divcount+'','name':'contact[item_no_'+divcount+']','placeholder':'Item # to return'});
      var clrform = $('<span>').attr({'class':'remove-form fa fa-times','data-count':''+divcount+'','data-remove-ele':'main_parent_'+divcount+'' });
      parent1.append(txt1);
      parent1.append(clrform);
//       $('.submit-additional-item').before(parent1);
      var txt2 = $('<textarea>').attr({'class':'form-control','id':'contactreturn_'+divcount+'','name':'contact[return_reason_'+divcount+']','placeholder':'Return reason'});
//       var parent2 = $('<div>').attr({'class':'contactitemno'});
      parent1.append(txt2);
//       $('.submit-additional-item').before(parent1);
      var txt3 = $('<textarea>').attr({'class':'form-control','id':'contactaddcomment_'+divcount+'','name':'contact[additional_comments_'+divcount+']','placeholder':'Additional Comments'});
//       var parent3 = $('<div>').attr({'class':'contactitemno'});
      parent1.append(txt3);
      main_parent.append(parent1);
      $(this).parent().before(main_parent);
      divcount++;
      
    });
     $(document).ready(function(){
       $('body').on('mouseenter','form.contact-form.return-form .contactitemno span.remove-form.fa.fa-times',function(){
         $(this).parents('.contactitemno').addClass('border-box')
       });
       $('body').on('mouseleave','form.contact-form.return-form .contactitemno span.remove-form.fa.fa-times',function(){
         $(this).parents('.contactitemno').removeClass('border-box')
       });
      $('body').on('click','form.contact-form.return-form .contactitemno span.remove-form.fa.fa-times',function(){
        var remove_ele = $(this).data('remove-ele');
//         console.log(remove_ele);
        $('.'+remove_ele).remove();       
      }); 
     })
    
     $(document).ready(function(){
       $('body').on('mouseenter','form.contact-form.return-form .contactitemno span.remove-form.fa.fa-times',function(){
         $(this).parents('.contactitemno').addClass('border-box')
       });
       $('body').on('mouseleave','form.contact-form.return-form .contactitemno span.remove-form.fa.fa-times',function(){
         $(this).parents('.contactitemno').removeClass('border-box')
       });
      $('body').on('click','form.contact-form.return-form .contactitemno span.remove-form.fa.fa-times',function(){
        var remove_ele = $(this).data('remove-ele');
//         console.log(remove_ele);
        $('.'+remove_ele).remove();       
      }); 
     })
    if($('body').hasClass('blog') || $('body').hasClass('page-where-we-are-riding')){
      $('.coutry-select select').on('change',function(){
        $this = $(this);
        var countryData = $this.val()
        $('.tabs li').each(function (index, el) {
            $(el).find('a').removeClass('active')
        });
        $('.tabs li').eq(0).find('a').addClass('active');

        const $ourHolder = $('.all_stories_wrapper');
        if (countryData === '') {
        // show all our items
        $ourHolder.children('div.article').show(); 
      } else {
        // hide all elements that don't share ourClass
        $ourHolder.children('div:not([data-country="'+countryData+'"])').hide();
        // show all elements that do share countryData
        $ourHolder.children('div[data-country="'+countryData+'"]').show();
      }
      })
    $('.tabs li a').click(function() {
      // store anything commonly called in variables to speed up your code
      const $this = $(this)
      const ourClass = $this.attr('data-category');
      const $ourHolder = $('.all_stories_wrapper');
      // reset the active class on all the buttons
      $('.tabs li a').removeClass('active');
      // update the active state on our clicked button
      $this.addClass('active');

      if (ourClass === 'all') {
        // show all our items
        $ourHolder.children('div.article').show(); 
      } else {
        // hide all elements that don't share ourClass
        $ourHolder.children('div:not([data-category="'+ourClass+'"])').hide();
        // show all elements that do share ourClass
        $ourHolder.children('div[data-category="'+ourClass+'"]').show();
      }
      return false;
    });
  }
/*
 *  Remodal - v1.1.0
 *  Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */

!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof exports?b(a,require("jquery")):b(a,a.jQuery||a.Zepto)}(this,function(a,b){"use strict";function c(a){if(w&&"none"===a.css("animation-name")&&"none"===a.css("-webkit-animation-name")&&"none"===a.css("-moz-animation-name")&&"none"===a.css("-o-animation-name")&&"none"===a.css("-ms-animation-name"))return 0;var b,c,d,e,f=a.css("animation-duration")||a.css("-webkit-animation-duration")||a.css("-moz-animation-duration")||a.css("-o-animation-duration")||a.css("-ms-animation-duration")||"0s",g=a.css("animation-delay")||a.css("-webkit-animation-delay")||a.css("-moz-animation-delay")||a.css("-o-animation-delay")||a.css("-ms-animation-delay")||"0s",h=a.css("animation-iteration-count")||a.css("-webkit-animation-iteration-count")||a.css("-moz-animation-iteration-count")||a.css("-o-animation-iteration-count")||a.css("-ms-animation-iteration-count")||"1";for(f=f.split(", "),g=g.split(", "),h=h.split(", "),e=0,c=f.length,b=Number.NEGATIVE_INFINITY;e<c;e++)d=parseFloat(f[e])*parseInt(h[e],10)+parseFloat(g[e]),d>b&&(b=d);return b}function d(){if(b(document.body).height()<=b(window).height())return 0;var a,c,d=document.createElement("div"),e=document.createElement("div");return d.style.visibility="hidden",d.style.width="100px",document.body.appendChild(d),a=d.offsetWidth,d.style.overflow="scroll",e.style.width="100%",d.appendChild(e),c=e.offsetWidth,d.parentNode.removeChild(d),a-c}function e(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)||(c=b(document.body),a=parseInt(c.css("padding-right"),10)+d(),c.css("padding-right",a+"px"),e.addClass(f))}}function f(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)&&(c=b(document.body),a=parseInt(c.css("padding-right"),10)-d(),c.css("padding-right",a+"px"),e.removeClass(f))}}function g(a,b,c,d){var e=k("is",b),f=[k("is",u.CLOSING),k("is",u.OPENING),k("is",u.CLOSED),k("is",u.OPENED)].join(" ");a.$bg.removeClass(f).addClass(e),a.$overlay.removeClass(f).addClass(e),a.$wrapper.removeClass(f).addClass(e),a.$modal.removeClass(f).addClass(e),a.state=b,!c&&a.$modal.trigger({type:b,reason:d},[{reason:d}])}function h(a,d,e){var f=0,g=function(a){a.target===this&&f++},h=function(a){a.target===this&&0===--f&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())};b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].on(r,g).on(s,h)}),a(),0===c(e.$bg)&&0===c(e.$overlay)&&0===c(e.$wrapper)&&0===c(e.$modal)&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())}function i(a){a.state!==u.CLOSED&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(b,c){a[c].off(r+" "+s)}),a.$bg.removeClass(a.settings.modifier),a.$overlay.removeClass(a.settings.modifier).hide(),a.$wrapper.hide(),f(),g(a,u.CLOSED,!0))}function j(a){var b,c,d,e,f={};for(a=a.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,","),b=a.split(","),e=0,c=b.length;e<c;e++)b[e]=b[e].split(":"),d=b[e][1],("string"==typeof d||d instanceof String)&&(d="true"===d||"false"!==d&&d),("string"==typeof d||d instanceof String)&&(d=isNaN(d)?d:+d),f[b[e][0]]=d;return f}function k(){for(var a=q,b=0;b<arguments.length;++b)a+="-"+arguments[b];return a}function l(){var a,c,d=location.hash.replace("#","");if(d){try{c=b('[data-remodal-id="'+d+'"]')}catch(e){}c&&c.length&&(a=b[p].lookup[c.data(p)],a&&a.settings.hashTracking&&a.open())}else n&&n.state===u.OPENED&&n.settings.hashTracking&&n.close()}function m(a,c){var d=b(document.body),e=d,f=this;f.settings=b.extend({},t,c),f.index=b[p].lookup.push(f)-1,f.state=u.CLOSED,f.$overlay=b("."+k("overlay")),null!==f.settings.appendTo&&f.settings.appendTo.length&&(e=b(f.settings.appendTo)),f.$overlay.length||(f.$overlay=b("<div>").addClass(k("overlay")+" "+k("is",u.CLOSED)).hide(),e.append(f.$overlay)),f.$bg=b("."+k("bg")).addClass(k("is",u.CLOSED)),f.$modal=a.addClass(q+" "+k("is-initialized")+" "+f.settings.modifier+" "+k("is",u.CLOSED)).attr("tabindex","-1"),f.$wrapper=b("<div>").addClass(k("wrapper")+" "+f.settings.modifier+" "+k("is",u.CLOSED)).hide().append(f.$modal),e.append(f.$wrapper),f.$wrapper.on("click."+q,'[data-remodal-action="close"]',function(a){a.preventDefault(),f.close()}),f.$wrapper.on("click."+q,'[data-remodal-action="cancel"]',function(a){a.preventDefault(),f.$modal.trigger(v.CANCELLATION),f.settings.closeOnCancel&&f.close(v.CANCELLATION)}),f.$wrapper.on("click."+q,'[data-remodal-action="confirm"]',function(a){a.preventDefault(),f.$modal.trigger(v.CONFIRMATION),f.settings.closeOnConfirm&&f.close(v.CONFIRMATION)}),f.$wrapper.on("click."+q,function(a){var c=b(a.target);c.hasClass(k("wrapper"))&&f.settings.closeOnOutsideClick&&f.close()})}var n,o,p="remodal",q=a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.NAMESPACE||p,r=b.map(["animationstart","webkitAnimationStart","MSAnimationStart","oAnimationStart"],function(a){return a+"."+q}).join(" "),s=b.map(["animationend","webkitAnimationEnd","MSAnimationEnd","oAnimationEnd"],function(a){return a+"."+q}).join(" "),t=b.extend({hashTracking:!0,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnOutsideClick:!0,modifier:"",appendTo:null},a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.DEFAULTS),u={CLOSING:"closing",CLOSED:"closed",OPENING:"opening",OPENED:"opened"},v={CONFIRMATION:"confirmation",CANCELLATION:"cancellation"},w=function(){var a=document.createElement("div").style;return void 0!==a.animationName||void 0!==a.WebkitAnimationName||void 0!==a.MozAnimationName||void 0!==a.msAnimationName||void 0!==a.OAnimationName}(),x=/iPad|iPhone|iPod/.test(navigator.platform);m.prototype.open=function(){var a,c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&(a=c.$modal.attr("data-remodal-id"),a&&c.settings.hashTracking&&(o=b(window).scrollTop(),location.hash=a),n&&n!==c&&i(n),n=c,e(),c.$bg.addClass(c.settings.modifier),c.$overlay.addClass(c.settings.modifier).show(),c.$wrapper.show().scrollTop(0),c.$modal.focus(),h(function(){g(c,u.OPENING)},function(){g(c,u.OPENED)},c))},m.prototype.close=function(a){var c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&(c.settings.hashTracking&&c.$modal.attr("data-remodal-id")===location.hash.substr(1)&&(location.hash="",b(window).scrollTop(o)),h(function(){g(c,u.CLOSING,!1,a)},function(){c.$bg.removeClass(c.settings.modifier),c.$overlay.removeClass(c.settings.modifier).hide(),c.$wrapper.hide(),f(),g(c,u.CLOSED,!1,a)},c))},m.prototype.getState=function(){return this.state},m.prototype.destroy=function(){var a,c=b[p].lookup;i(this),this.$wrapper.remove(),delete c[this.index],a=b.grep(c,function(a){return!!a}).length,0===a&&(this.$overlay.remove(),this.$bg.removeClass(k("is",u.CLOSING)+" "+k("is",u.OPENING)+" "+k("is",u.CLOSED)+" "+k("is",u.OPENED)))},b[p]={lookup:[]},b.fn[p]=function(a){var c,d;return this.each(function(e,f){d=b(f),null==d.data(p)?(c=new m(d,a),d.data(p,c.index),c.settings.hashTracking&&d.attr("data-remodal-id")===location.hash.substr(1)&&c.open()):c=b[p].lookup[d.data(p)]}),c},b(document).ready(function(){b('body').on("click","[data-remodal-target]",function(a){a.preventDefault();var c=a.currentTarget,d=c.getAttribute("data-remodal-target"),e=b('[data-remodal-id="'+d+'"]');b[p].lookup[e.data(p)].open()}),b('body').find("."+q).each(function(a,c){var d=b(c),e=d.data("remodal-options");e?("string"==typeof e||e instanceof String)&&(e=j(e)):e={},d[p](e)}),b('body').on("keydown."+q,function(a){n&&n.settings.closeOnEscape&&n.state===u.OPENED&&27===a.keyCode&&n.close()}),b(window).on("hashchange."+q,l)})});


/****************************************************************
 * jQuery Taggd
 * A helpful plugin that helps you adding 'tags' on images.
 *
 * Copyright (C) 2014 Tim Severien
 * License: MIT
 ****************************************************************/

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
	 	console.log($item)
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
   // console.log("yes!")
	})(jQuery);


$('.product-comparison select.product_type').change(function() {
   // set the window's location property to the value of the option the user has selected
   window.location = $(this).val();
 }); 
 var delay = 0;
 var clickCounter = 0;
 var loadProductCompare = function(){
   var mobile_item_opend=false;
   $('a.mobile-show-features').unbind('click').bind('click',function(e){
     $('.product-compare-section.mobile_only ul.mobile-feature-list-wrapper').toggle();
     if(mobile_item_opend==true){
       $('.product-compare-mobile-container').removeClass('mobile-tag-position').addClass('mobile-tag-position');
     }
   })

   $('.product-compare-section.mobile_only .product-compare-feature .features-list ul.mobile-feature-list-wrapper li.mobile-feature-list').click(function(){
     mobile_item_opend=true;
     if(mobile_item_opend==true){
       $('.product-compare-mobile-container').removeClass('mobile-tag-position').addClass('mobile-tag-position');
     }
     var feature = $(this).data('title');
     $('.product-compare-section.mobile_only .features-list ul.mobile-feature-list-wrapper li.mobile-feature-list').removeClass('active');
     $(this).addClass('active');
     var parent = $('.product-compare-mobile-container');
     parent.find('.product-compare-deluxe .deluxe-parts-images .image_wrapper').hide(delay)
     parent.find('.product-compare-premium .premium-parts-images .image_wrapper').hide(delay)
     parent.find('.product-compare-deluxe .deluxe-parts-images .image_wrapper[data-title="'+feature+'"]').show(delay)
     parent.find('.product-compare-premium .premium-parts-images .image_wrapper[data-title="'+feature+'"]').show(delay)
   })
 }
 if($(window).width() <= 1024){
   loadProductCompare();
 }
 $(window).resize(function(){
   if($(window).width() <= 1024){
     loadProductCompare();
   }
 });

   
 
 $('.product-compare-feature .features-list ul li.feature-list-title').mouseenter(function(){
//    console.log( "mouse enter" )
   var feature = $(this).data('title');
   $('.features-list ul li.feature-list-title').removeClass('active');
   $(this).addClass('active');
	var parent = $('.product-compare-section.product-compare-details');
   parent.find('.product-compare-deluxe .deluxe-parts-images .image_wrapper').hide();
   parent.find('.product-compare-premium .premium-parts-images .image_wrapper').hide();
   parent.find('.product-compare-deluxe .deluxe-parts-images .image_wrapper[data-title="'+feature+'"]').show();
   parent.find('.product-compare-premium .premium-parts-images .image_wrapper[data-title="'+feature+'"]').show();
 })

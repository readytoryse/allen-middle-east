const $ = jQuery;
// const appURL = "https://9cba-103-250-166-217.ngrok-free.app/api/rack/";
const appURL = "https://rack-finder.allen.bike/api/rack/";
const ending_year = new Date().getFullYear() + 1;
const starting_year = 1975;
const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
window.getData = async function (url = "", data = {}, header = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: header,
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
};
String.prototype.imgURL = function (size) {
  // remove any current image size then add the new image size
  return this.replace(
    /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
    "."
  ).replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
    return "_" + size + match;
  });
};
// example
//'//cdn.shopify.com/s/files/1/0087/0462/products/shirt14.jpeg?v=1309278311'.imgURL('medium');
//   // alternatively, if you don't want to use a polyfil
//   function imgURL(src, size) {
//     // remove any current image size then add the new image size
//     return src
//       .replace(/_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g, '.')
//       .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function(match) {
//         return '_'+size+match;
//       })
//     ;
//   }
$(document).ready(function () {
  var checkfit = urlParams.get("checkfit");
  if(checkfit == 'true' || checkfit == true){
  // console.log('checkfit',checkfit)
    setTimeout(()=>{
      $('a[data-goto-step="1"]:eq(0)').trigger('click');
    },150)

  }
  $("body").on("click", "[data-goto-step]", function (e) {
    e.preventDefault();
    var stepNo = $(this).attr("data-goto-step"),
      currentStepNo = $(this).attr("data-current-step");
    var $step = $(`[data-step="${stepNo}"]`),
      $currentStep = $(`[data-step="${currentStepNo}"]`);
    // console.log($currentStep)
    if ($step.length > 0) {
      $currentStep.hide();
      $step.show();
    }
  });
  var yr_drpdn = $("#year_select");
  var current_year = -1;
  yr_drpdn.empty();
  yr_drpdn.append($("<option>").text("SELECT YEAR").val(""));
  for (let index = ending_year; index > starting_year; index--) {
    if (current_year == index) {
      yr_drpdn.append($("<option>").attr("value", index).attr("selected", "selected").text(index));
    } else {
      yr_drpdn.append($("<option>").attr("value", index).text(index));
    }
  }
  yr_drpdn.on("change", function () {
    var current_val = parseInt($(this).val());
    setModelsDropdown(current_val);
  });
  var current_make_id = 0,
    current_model_id = 0,
    current_body_id = 0;
  setBodytypesDropdown();

  function setModelsDropdown(year) {
    var car_select = $("#make_select");
    car_select.empty();
    car_select.append($("<option>").text("loading..."));
    var params = `${appURL}GetMakes?year=${year}`;
    // console.log("params", params);
    window.getData(params).then(function (res) {
      car_select.empty();
      car_select.append($("<option>").text("Select Make").val(""));
      // console.log('res',res)
      if (res.Message == undefined) {
        $.each(res, function (index, item) {
          if (current_make_id == item.id) {
            car_select.append($("<option>").attr("value", item.id).text(item.make_title).attr("selected", "selected"));
          } else {
            car_select.append($("<option>").attr("value", item.id).text(item.make_title));
          }
        });
        // console.log(submit_counter)
        if (current_make_id != false && submit_counter < 4) {
          car_select.trigger("change");
          submit_counter++;
          $(document).trigger("CustomEventFormSubmit", [submit_counter]);
        } else {
          $(document).trigger("CustomEventFormSubmit", [0]);
        }
      }
      // console.log(current_make_id, submit_counter);
    });
    var drpdn = $("#model_select");
    $("body").on("change", "#make_select", function () {
      var make_id = parseFloat($(this).val()),
        year_id = parseInt($("#year_select").val());
      drpdn.empty();
      drpdn.append($("<option>").text("loading..."));
      var params = `${appURL}GetModels?year=${year}&make_id=${make_id}`;
      window.getData(params).then(function (res) {
        drpdn.empty();
        drpdn.append($("<option>").text("select model").val(""));
        if (res.Message == undefined) {
          $.each(res, function (index, item) {
            if (current_model_id == item.id) {
              drpdn.append($("<option>").attr("value", item.id).text(item.model_title).attr("selected", "selected"));
            } else {
              drpdn.append($("<option>").attr("value", item.id).text(item.model_title));
            }
          });
          // console.log(submit_counter)
          if (current_model_id != false && submit_counter < 4) {
            drpdn.trigger("change");
            submit_counter++;
            $(document).trigger("CustomEventFormSubmit", [submit_counter]);
          } else {
            $(document).trigger("CustomEventFormSubmit", [0]);
          }
        }
      });
    });
  }

  function setBodytypesDropdown() {
    var drpdn = $("#bodytype_select");
    $("body").on("change", "#model_select", function () {
      var make_id = parseFloat($("#make_select").val()),
        model_id = parseInt($("#model_select").val());
      drpdn.empty();
      drpdn.append($("<option>").text("loading..."));
      var params = `${appURL}GetBodyTypes?make_id=${make_id}&model_id=${model_id}`;
      window.getData(params).then(function (res) {
        drpdn.empty();
        // console.log('bodytypes.length',res.length)
        if (res.length > 0 && res.length > 1) {
          drpdn.append($("<option>").text(" body type").attr("value", 0));
          $(".bodytype_selector").removeClass("hidden");
          drpdn.removeClass('opt-selected');
        } else {
          // console.log('drpdn',drpdn)
          drpdn.addClass('opt-selected');
        }
        if (res.Message == undefined) {
          $.each(res, function (index, item) {
            // console.log(item)
            if (current_body_id == item.body_id) {
              drpdn.append($("<option>").attr("value", item.body_id).text(item.title).attr("selected", "selected"));
            } else {
              drpdn.append($("<option>").attr("value", item.body_id).text(item.title));
            }
          });
          //Body type dropdown is Optional
          if (current_model_id != false && submit_counter < 4) {
            drpdn.trigger("change");
            submit_counter++;
            $(document).trigger("CustomEventFormSubmit", [submit_counter]);
          }
          // console.log(current_model_id, submit_counter);
        }
      });
    });
    $("body").on("change", "#bodytype_select", function () {
      var body_id = parseFloat($("#bodytype_select").val());
      if (current_body_id != false && submit_counter < 4) {
        updateURL("body_id", body_id);
        submit_counter++;
        setTimeout(function () {
          $(document).trigger("CustomEventFormSubmit", [submit_counter]);
        }, 150);
      }
    });
  }
  $("body").on("change", 'input[name="hitch_on_vehicle"]', function (e) {
    $(".hitch-sizes").toggle();
    var v = $(this).prop('checked');
    if (v) {
      dropdownseelcted = dropdownseelcted + 3;
    } else {
      dropdownseelcted = dropdownseelcted - 3;
    }
    if (dropdownseelcted >= 3) {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).attr('disabled', 'disabled');
    }
  });
  $("body").on("change", 'input[name="has_rear_spare_tire"]', function (e) {
    var v = $(this).prop('checked');
    if (v) {
      dropdownseelcted = dropdownseelcted + 3;
    } else {
      dropdownseelcted = dropdownseelcted - 3;
    }
    if (dropdownseelcted >= 3) {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).attr('disabled', 'disabled');
    }
  });
  // $(document).on('CustomEventFormSubmit',function(e){
  //   console.log(e);
  // })
  var dropdownseelcted = 0;
  // $("body").on("change", 'select#year_select', function (e) {
  //   var v = $(this).val();
  //   if(v){
  //     dropdownseelcted = dropdownseelcted+1;
  //   }
  //   else{
  //     dropdownseelcted = dropdownseelcted-1;
  //   }
  //   console.log(dropdownseelcted)
  // })
  // $("body").on("change", 'select#make_select', function (e) {
  //   var v = $(this).val();
  //   if(v){
  //     dropdownseelcted = dropdownseelcted+1;
  //   }
  //   else{
  //     dropdownseelcted = dropdownseelcted-1;
  //   }
  //   console.log(dropdownseelcted)
  // })
  // $("body").on("change", 'select#model_select', function (e) {
  //   var v = $(this).val();
  //   if(v){
  //     dropdownseelcted = dropdownseelcted+1;
  //   }
  //   else{
  //     dropdownseelcted = dropdownseelcted-1;
  //   }
  //   console.log(dropdownseelcted)
  // })
  $("body").on("change", 'select.form_control:not(#bodytype_select)', function (e) {
    console.log('here change')
    var v = $(this).val();
    // 
    $(this).removeClass('opt-selected');
    // console.log(v,$(this))
    if (v) {
      $(this).addClass('opt-selected');
      dropdownseelcted = dropdownseelcted + 1;
    } else {
      dropdownseelcted = dropdownseelcted - 1;
    }
    // console.log(dropdownseelcted)
    if (dropdownseelcted >= 3) {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).attr('disabled', 'disabled');
    }
    // console.log('submit_counter',submit_counter)
  });
  $("body").on("change", 'select#bodytype_select', function (e) {
    var v = $(this).val();
    // console.log(v,typeof(v))
    if (v != "0") {
      $(this).addClass('opt-selected');
      dropdownseelcted = dropdownseelcted + 1;
    } else {
      $(this).removeClass('opt-selected');
      dropdownseelcted = dropdownseelcted - 1;
    }
    // console.log(dropdownseelcted)
    if (dropdownseelcted >= 3) {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.pdp_step_main .pdp_step_right .btns[type=submit]`).attr('disabled', 'disabled');
    }
    // console.log('submit_counter 2',submit_counter)
  });
  $("body").on("click", ".js-toggle-div", function (e) {
    var $content = $(this).siblings(".content");
    $(this).toggleClass("active");
    $content.toggle();
  });
  $("form#fitmentSearch").on("submit", function (e) {
    e.preventDefault();
    var $submitBtn = $(this).find('input[type="submit"]');
    // console.log($submitBtn)
    const variant_id = $("#variant_id").val();
    var urlSku = urlParams.get("sku");
    var year_select = $("#year_select option:selected");
    var car_select = $("#make_select option:selected");
    var model_select = $("#model_select option:selected");
    var bodytype_select = $("#bodytype_select option:selected");
    var year_value = parseInt(year_select.val());
    var car_value = parseFloat(car_select.val());
    var model_value = parseFloat(model_select.val());
    var bodytype_val = parseFloat(bodytype_select.val());
    var hitch_size = $(`input[name="hitch_size"]:checked`).val();
    // var SpareTire = $("input[name=has_rear_spare_tire]").prop("checked");
    var SpareTire = $("input[name='has_rear_spare_tire']:checked").val() ? $("input[name='has_rear_spare_tire']:checked").val() : 'no';
    var HitchTire = $("input[name='hitch_on_vehicle']").prop("checked");
    var hitch_param = "";
    if (HitchTire) {
      hitch_param = `&hitch=true&hitch_size=${hitch_size}`;
    }
    var hitSubmit = false;
    var params = `?year=${year_value}&make_id=${car_value}&model_id=${model_value}&spareTire=${SpareTire}${hitch_param}`;
    // console.log(year_select.val(), car_select.val(), model_select.val(), bodytype_select.val());
    var mmyb_hitch = 0;
    if (year_select.val() && car_select.val() && model_select.val() && bodytype_select.val()) {
      params = `?year=${year_value}&make_id=${car_value}&model_id=${model_value}&body_id=${parseFloat(

        $("#bodytype_select").val()

      )}&spareTire=${SpareTire}${hitch_param}`;
      hitSubmit = true;
      mmyb_hitch = 0;
    } else if (HitchTire && hitch_size && SpareTire) {
      params = `?year=${0}&make_id=${0}&model_id=${0}&body_id=${parseFloat(

        $("#bodytype_select").val()

      )}&spareTire=${SpareTire}${hitch_param}`;
      hitSubmit = true;
      mmyb_hitch = 1;
    } else {
      hitSubmit = false;
      alert("Please select Year, Make Model and Body or Hitch Size and Spare Tire to proceed.");
      return false;
    }
    console.log("hitSubmit", hitSubmit, "mmyb_hitch: ", mmyb_hitch, ' params: ', params);
    // let previousState = sessionStorage.getItem();
    if (hitSubmit) {
      $submitBtn.val("Submitting...").attr("disabled", "disabled");
      window.getData(appURL + "GetProducts" + params).then(function (res) {
        // console.log(res);
        $submitBtn.val("Submit").removeAttr("disabled");
        var res;
        var correctSKU = $("#shopify_sku").val();
        ({
          res,
          mmyb_hitch
        } = showResult(res, HitchTire, hitch_size, SpareTire, mmyb_hitch, correctSKU));
      });
    } else {
      alert("Please select Year, Make, Model or Hitch size to proceed");
      return false;
    }
  });
  const productSku = urlParams.get("sku").toUpperCase();
  fetch(appURL + "Get_wp_prodicts?sku=" + productSku, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      var data = JSON.parse(result);
      var correctSKU_found = false;
      var externalSku = false;
      if (data.externalSku) {
        $("#shopify_sku").val(data.externalSku.ShopifyVariantSku)
        correctSKU_found = true;
        externalSku = true;
      }
      else {
        $("#shopify_sku").val(productSku)
        correctSKU_found = true;
      }
      var product = data.product;
      console.log(correctSKU_found);
      if (product && product.variants && correctSKU_found == true) {
        var productSku2 = $("#shopify_sku").val();
        var getVariant = product.variants.filter((v) => {
          return v.sku == productSku2;
        });
        // console.log(getVariant);
        var img_count = 0;
        if (getVariant.length > 0) {
          $('.dummy_content_main').css({
            'display': 'none'
          });
          $('.pdp_step_main.step1').show();
          $(".pro_title, .js-productTitle").text(product.title);
          var prodDesc = product.body_html.replaceAll("Allen's",'');
          $(".pro_desc").html(prodDesc);
          var featuredImg = product.images[0].src;
          $("#variant_id").val(getVariant[0].id);
          featuredImg = featuredImg.imgURL("800x");
          if (externalSku) {

            let img = data.externalSku.image_url;
            var imgSrc = img.imgURL("800x");
            var swiperSlide = $("<div>").attr("class", "swiper-slide");
            swiperSlide.append($(`<div class="slider__image"><img src="${img.imgURL("100x")}" alt="" lodaing="lazy" /></div>`));
            img_count = 1;
            // $(".slider__thumbs .swiper-wrapper").append(swiperSlide);
            var swiperSlide2 = $("<div>").attr("class", "swiper-slide");
            swiperSlide2.append($(`<div class="slider__image"><img src="${imgSrc}" alt="" lodaing="lazy" /></div>`));
            // console.log(swiperSlide)
            $(".slider__images .swiper-wrapper").append(swiperSlide2);
          }
          else {
            img_count = 0;
            for (const key in product.images) {
              let img = product.images[key];
              img_count = img_count + 1;
              var imgSrc = img.src.imgURL("500x");
              var swiperSlide = $("<div>").attr("class", "swiper-slide");
              swiperSlide.append($(`<div class="slider__image"><img src="${img.src.imgURL("100x")}" alt="" lodaing="lazy" /></div>`));
              $(".slider__thumbs .swiper-wrapper").append(swiperSlide);
              var swiperSlide2 = $("<div>").attr("class", "swiper-slide");
              swiperSlide2.append($(`<div class="slider__image"><img src="${imgSrc}" alt="" lodaing="lazy" /></div>`));
              // console.log(swiperSlide)
              $(".slider__images .swiper-wrapper").append(swiperSlide2);
            }
          }
          if(img_count>1){
            $('.slider__col').addClass('show-thumbs')
          }
          else{
            $('.slider__col').addClass('hide-thumbs')
          }

          setTimeout(() => {
            const sliderThumbs = new Swiper(".slider__thumbs .swiper-container", {
              direction: "vertical", // Ð²ÐµÑ€Ñ‚Ð¸ÐºÐ°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ°
              slidesPerView: 4, // Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ Ð¿Ð¾ 3 Ð¿Ñ€ÐµÐ²ÑŒÑŽ
              spaceBetween: 24, // Ñ€Ð°ÑÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð¼ÐµÐ¶Ð´Ñƒ ÑÐ»Ð°Ð¹Ð´Ð°Ð¼Ð¸
              navigation: {
                nextEl: ".slider__next", // ÐºÐ½Ð¾Ð¿ÐºÐ° Next
                prevEl: ".slider__prev", // ÐºÐ½Ð¾Ð¿ÐºÐ° Prev
              },
              loop: false,
              freeMode: true,
              breakpoints: {

                0: {
                  direction: "horizontal", // Ð³Ð¾Ñ€Ð¸Ð·Ð¾Ð½Ñ‚Ð°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ°
                  spaceBetween: 12,
                  slidesPerView: 4,
                },
                768: {
                  direction: "vertical", // Ð²ÐµÑ€Ñ‚Ð¸ÐºÐ°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ°
                  spaceBetween: 32,
                },
              },
            });
            const sliderImages = new Swiper(".slider__images .swiper-container", {
              direction: "horizontal", // Ð²ÐµÑ€Ñ‚Ð¸ÐºÐ°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ°
              loop: false,
              slidesPerView: 1,
              spaceBetween: 32, // Ñ€Ð°ÑÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð¼ÐµÐ¶Ð´Ñƒ ÑÐ»Ð°Ð¹Ð´Ð°Ð¼Ð¸
              mousewheel: false, // Ð¼Ð¾Ð¶Ð½Ð¾ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‡Ð¸Ð²Ð°Ñ‚ÑŒ Ð¸Ð·Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ ÐºÐ¾Ð»Ñ‘ÑÐ¸ÐºÐ¾Ð¼ Ð¼Ñ‹ÑˆÐ¸
              navigation: {
                nextEl: ".slider__next", // ÐºÐ½Ð¾Ð¿ÐºÐ° Next
                prevEl: ".slider__prev", // ÐºÐ½Ð¾Ð¿ÐºÐ° Prev
              },
              grabCursor: true, // Ð¼ÐµÐ½ÑÑ‚ÑŒ Ð¸ÐºÐ¾Ð½ÐºÑƒ ÐºÑƒÑ€ÑÐ¾Ñ€Ð°
              thumbs: {
                swiper: sliderThumbs, // ÑƒÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ð¸Ð¼Ñ Ð¿Ñ€ÐµÐ²ÑŒÑŽ ÑÐ»Ð°Ð¹Ð´ÐµÑ€Ð°
              },
              breakpoints: {
                0: {
                  direction: "horizontal", // Ð³Ð¾Ñ€Ð¸Ð·Ð¾Ð½Ñ‚Ð°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ°
                },
                768: {
                  direction: "horizontal", // Ð²ÐµÑ€Ñ‚Ð¸ÐºÐ°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ°
                },
              },
            });
          }, 700);
        } else {
          // window.location.href='/';
          $('.dummy_content_main').hide();
          $('.pdp_dummy').show();
          $('.pdp_step_main.step1').hide();
        }
      } else {
        // window.location.href='/';
        $('.dummy_content_main').hide();
        $('.pdp_dummy').show();
        $('.pdp_step_main.step1').hide();
      }
    })
    .catch((error) => console.error(error));
});

function showResult(res, HitchTire, hitch_size, SpareTire, mmyb_hitch, urlSku) {
  var mapped_skus = res.mapped_skus;
  var resultMatch = false;
  if (HitchTire && hitch_size && SpareTire) {
    mmyb_hitch = 1;
  }
  if (mmyb_hitch == 0) {
    if (mapped_skus.length > 0) {
      var s = mapped_skus.filter((s) => {
        return s.key_item == urlSku;
      });
      if (s.length > 0 && s[0].key_value == "YES") {
        resultMatch = true;
      }
    }
  } else {
    var hitchProducts = res.hitchProducts;
    for (let index = 0; index < hitchProducts.length; index++) {
      const element = hitchProducts[index];
      var hitchProduct = JSON.parse(element.productJson);
      var res = hitchProduct.variants.filter((v) => {
        return v.sku == urlSku;
      });
      if (res.length > 0) {
        resultMatch = true;
        break;
      }
    }
  }
  console.log("matched?", resultMatch);
  $(`[data-step]`).hide();
  if (resultMatch) {
    $(`[data-step="2"]`).show();
  } else {
    $(`[data-step="3"]`).show();
  }
  return {
    res,
    mmyb_hitch
  };
}
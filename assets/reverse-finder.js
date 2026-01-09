const $ = jQuery;
// const appURL = "https://9cba-103-250-166-217.ngrok-free.app/api/rack/";
const appURL = "https://rack-finder.allen.bike/api/rack/";
const ending_year = new Date().getFullYear() + 1;
const starting_year = 1975;
const requestOptions = {
  method: "GET",
  redirect: "follow",
};
var user_rack_finder_data0 = JSON.parse(localStorage.getItem("user_rack_finder_data"));
if($('body').hasClass('page-resource-pdp')){
  user_rack_finder_data0 = null;
}
var new_current_year = false,
new_current_make_id = false,
new_current_model_id = false,
new_current_body_id = false,
new_spareTire = false,
new_hitch = false;
let submit_counter = 0;
var showReverceRackFinder = true;
// console.log('user_rack_finder_data0',user_rack_finder_data0.vehicleInfo)
if(user_rack_finder_data0 != null){
  if(user_rack_finder_data0.vehicleInfo != null)
    showReverceRackFinder = false;
  {
    new_current_year = user_rack_finder_data0.vehicleInfo.year;
    new_current_make_id = user_rack_finder_data0.vehicleInfo.makeId;
    new_current_model_id = user_rack_finder_data0.vehicleInfo.modelId;
    new_current_body_id = user_rack_finder_data0.vehicleInfo.body_id;
    new_spareTire = user_rack_finder_data0.vehicleInfo.spareTire;
    new_hitch = user_rack_finder_data0.vehicleInfo.hitch;
  }
  // console.log('vehicle data',user_rack_finder_data0.vehicleInfo)
}
// console.log('reverse',showReverceRackFinder)
if(showReverceRackFinder == false && !$('body').hasClass('page-resource-pdp')){
  $('.icon-does-it-fit-my-car').hide();
  $('.pdp_rack_finder').hide();
}
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
$(document).ready(function () {
// console.log('new_current_year',new_current_year,'new_current_make_id',new_current_make_id,'new_current_model_id',new_current_model_id,'new_current_body_id',new_current_body_id)
  setYearDropdown()
  function setYearDropdown() {
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
  var yr_drpdn = $("#reverse_year_select");
  yr_drpdn.empty();
  yr_drpdn.append($("<option>").text("SELECT YEAR").val(""));
  for (let index = ending_year; index > starting_year; index--) {
    if (new_current_year == index) {
      yr_drpdn.append(
        $("<option>")
          .attr("value", index)
          .attr("selected", "selected")
          .text(index)
      );
    } else {
      yr_drpdn.append($("<option>").attr("value", index).text(index));
    }
  }
  if(new_current_year != false){
    setTimeout(()=>{
      $('#reverse_year_select').trigger('change')    
    },500)
  }
  yr_drpdn.on("change", function () {
    var current_val = parseInt($(this).val());
    setModelsDropdown(current_val);
  });
  setBodytypesDropdown();
}
  var current_make_id = 0,
    current_model_id = 0,
    current_body_id = 0;

  function setModelsDropdown(year) {
    var car_select = $("#reverse_make_select");
    car_select.removeClass('disabled')
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
          if (new_current_make_id == item.id) {
            car_select.append($("<option>").attr("value", item.id).text(item.make_title).attr("selected", "selected"));
          } else {
            car_select.append($("<option>").attr("value", item.id).text(item.make_title));
          }
        });
        // console.log(submit_counter)
        if (new_current_make_id != false) {
          car_select.trigger("change");
          submit_counter++;
        //   $(document).trigger("CustomEventFormSubmit", [submit_counter]);
        } else {
        //   $(document).trigger("CustomEventFormSubmit", [0]);
        }
      }
      // console.log(current_make_id, submit_counter);
    });
    var drpdn = $("#reverse_model_select");
    $("body").on("change", "#reverse_make_select", function () {
      var make_id = parseFloat($(this).val()),
        year_id = parseInt($("#reverse_year_select").val());
      drpdn.removeClass('disabled');
      drpdn.empty();
      drpdn.append($("<option>").text("loading..."));
      var params = `${appURL}GetModels?year=${year}&make_id=${make_id}`;
      window.getData(params).then(function (res) {
        drpdn.empty();
        drpdn.append($("<option>").text("select model").val(""));
        if (res.Message == undefined) {
          $.each(res, function (index, item) {
            if (new_current_model_id == item.id) {
              drpdn.append($("<option>").attr("value", item.id).text(item.model_title).attr("selected", "selected"));
            } else {
              drpdn.append($("<option>").attr("value", item.id).text(item.model_title));
            }
          });
          // console.log(submit_counter)
          if (new_current_model_id != false) {
            drpdn.trigger("change");
            submit_counter++;
            // $(document).trigger("CustomEventFormSubmit", [submit_counter]);
          } else {
            // $(document).trigger("CustomEventFormSubmit", [0]);
          }
        }
      });
    });
  }

  function setBodytypesDropdown() {
    var drpdn = $("#reverse_bodytype_select");
    $("body").on("change", "#reverse_model_select", function () {
      var make_id = parseFloat($("#reverse_make_select").val()),
        model_id = parseInt($("#reverse_model_select").val());
      drpdn.empty();
      drpdn.removeClass('disabled');
      drpdn.append($("<option>").text("loading..."));
      var params = `${appURL}GetBodyTypes?make_id=${make_id}&model_id=${model_id}`;
      window.getData(params).then(function (res) {
        drpdn.empty();
        drpdn.append($("<option>").text(" body type").attr("selected", "selected").attr("value", ''));
        $.each(res, function (index, item) {
        if(res.length == 1){
          drpdn.append(
             $("<option>")
              .attr("value", item.body_id)
              .text(item.title)
              .attr("selected", "selected")
          );
          $('#reverse_bodytype_select').trigger('change')
        }
        else if (new_current_body_id == item.body_id) {
          drpdn.append(
            $("<option>")
              .attr("value", item.body_id)
              .text(item.title)
              .attr("selected", "selected")
          );
          $('#reverse_bodytype_select').trigger('change')
        } else {
          drpdn.append(
            $("<option>").attr("value", item.body_id).text(item.title)
          );
        }
      });
      });
    });
    var count = 0;
    $("body").on("change", "#reverse_bodytype_select", function () {
      count++;
      // console.log('count',count)
      var body_id = parseFloat($("#reverse_bodytype_select").val());
      if (new_current_body_id != false && count == 1) {
        // updateURL("body_id", body_id);
        submit_counter++;
        setTimeout(function () {
          $('#reverse_fitmentSearch').trigger('submit')
          // $(document).trigger("CustomEventFormSubmit", [submit_counter]);
        }, 150);
      }else if(count >= 2){
        $('.rack_submits input[name="submit"]').val('re-submit')
      }
    });
  }
  $("body").on("change", 'input[name="reverse_hitch_on_vehicle"]', function (e) {
    $(".hitch-sizes").toggle();
    var v = $(this).prop('checked');
    if (v) {
      dropdownseelcted = dropdownseelcted + 3;
    } else {
      dropdownseelcted = dropdownseelcted - 3;
    }
    if (dropdownseelcted >= 3) {
      $(`.reverse_finder .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.reverse_finder .btns[type=submit]`).attr('disabled', 'disabled');
    }
  });
  $("body").on("change", 'input[name="reverse_has_rear_spare_tire"]', function (e) {
    var v = $(this).prop('checked');
    if (v) {
      dropdownseelcted = dropdownseelcted + 3;
    } else {
      dropdownseelcted = dropdownseelcted - 3;
    }
    if (dropdownseelcted >= 3) {
      $(`.reverse_finder .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.reverse_finder .btns[type=submit]`).attr('disabled', 'disabled');
    }
  });
  // $(document).on('CustomEventFormSubmit',function(e){
  //   console.log(e);
  // })
  var dropdownseelcted = 0;
  $("body").on("change", 'select.form_control:not(#reverse_bodytype_select)', function (e) {
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
      $(`.reverse_finder .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.reverse_finder .btns[type=submit]`).attr('disabled', 'disabled');
    }
    // console.log('submit_counter',submit_counter)
  });
  $("body").on("change", 'select#reverse_bodytype_select', function (e) {
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
      $(`.reverse_finder .btns[type=submit]`).removeAttr('disabled');
    } else {
      $(`.reverse_finder .btns[type=submit]`).attr('disabled', 'disabled');
    }
    // console.log('submit_counter 2',submit_counter)
  });
  if (new_spareTire != false) {
    $("[name='reverse_has_rear_spare_tire']").trigger("click");
  }
  if(new_hitch != false){
    $("[name='reverse_hitch_on_vehicle']").trigger("click");    
  }
  $("form#reverse_fitmentSearch").on("submit", function (e) {
    e.preventDefault();
    // console.log('submit auto')
    $(`div[data-step='3']`).hide();
    $(`div[data-step='2']`).hide();
    $(this).find('.form-error').addClass('hidden')
    var $submitBtn = $(this).find('input[type="submit"]');
    // console.log($submitBtn)
    const variant_id = $("#variant_id").val();
    var urlSku = urlParams.get("sku");
    var reverse_year_select = $("#reverse_year_select option:selected");
    var car_select = $("#reverse_make_select option:selected");
    var reverse_model_select = $("#reverse_model_select option:selected");
    var reverse_bodytype_select = $("#reverse_bodytype_select option:selected");
    var year_value = parseInt(reverse_year_select.val());
    var car_value = parseFloat(car_select.val());
    var model_value = parseFloat(reverse_model_select.val());
    var bodytype_val = parseFloat(reverse_bodytype_select.val());
    var reverse_hitch_size = $(`input[name="reverse_hitch_size"]:checked`).val();
    // var SpareTire = $("input[name=reverse_has_rear_spare_tire]").prop("checked");
    var SpareTire = $("input[name='reverse_has_rear_spare_tire']:checked").val() ? $("input[name='reverse_has_rear_spare_tire']:checked").val() : 'no';
    var HitchTire = $("input[name='reverse_hitch_on_vehicle']").prop("checked");
    var hitch_param = "";
    if (HitchTire) {
      hitch_param = `&hitch=true&reverse_hitch_size=${reverse_hitch_size}`;
    }
    var hitSubmit = false;
    var params = `?year=${year_value}&make_id=${car_value}&model_id=${model_value}&spareTire=${SpareTire}${hitch_param}`;
    // console.log(reverse_year_select.val(), car_select.val(), reverse_model_select.val(), reverse_bodytype_select.val());
    var mmyb_hitch = 0;
    if (reverse_year_select.val() && car_select.val() && reverse_model_select.val() && reverse_bodytype_select.val()) {
      params = `?year=${year_value}&make_id=${car_value}&model_id=${model_value}&body_id=${parseFloat(

        $("#reverse_bodytype_select").val()

      )}&spareTire=${SpareTire}${hitch_param}`;
      hitSubmit = true;
      mmyb_hitch = 0;
    } else if (HitchTire && reverse_hitch_size && SpareTire) {
      params = `?year=${0}&make_id=${0}&model_id=${0}&body_id=${parseFloat(

        $("#reverse_bodytype_select").val()

      )}&spareTire=${SpareTire}${hitch_param}`;
      hitSubmit = true;
      mmyb_hitch = 1;
    } else {
      hitSubmit = false;
      $(this).find('.form-error').removeClass('hidden')
    //   alert("Please select Year, Make Model and Body or Hitch Size and Spare Tire to proceed.");
      return false;
    }
    // console.log("hitSubmit", hitSubmit, "mmyb_hitch: ", mmyb_hitch, ' params: ', params);
    // let previousState = sessionStorage.getItem();
    var sku = $('variant-sku').text();
    // console.log('current sku',sku)
    if (hitSubmit) {
      $submitBtn.val("Submitting...").attr("disabled", "disabled");
      window.getData(appURL + "GetProducts" + params).then(function (res) {
        $submitBtn.val("Submit").removeAttr("disabled");
        var res;
        // console.log('res.mapped_skus',res.mapped_skus)
       if(res.mapped_skus.length){
          for (let i = 0; i < res.mapped_skus.length; i++) {
              let item = res.mapped_skus[i];
              if(sku.trim() === item.key_item.trim()){
                  console.log('item', item);
                  if(item.key_value == 'YES'){
                      $(`div[data-step='2']`).show();
                      $(`div[data-step='3']`).hide();
                      break;  // Exits the loop when a match is found
                  } else {
                      $(`div[data-step='3']`).show();
                      $(`div[data-step='2']`).hide();
                  }
              } else {
                  $(`div[data-step='3']`).show();
                  $(`div[data-step='2']`).hide();
              }
          }
      } else {
          $(`div[data-step='3']`).show();
          $(`div[data-step='2']`).hide();
      }

      });
    } else {
        $(this).find('.form-error').removeClass('hidden')
      return false;
    }
  });  
});
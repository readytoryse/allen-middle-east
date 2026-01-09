import { EVENTS, publish } from "@archetype-themes/utils/pubsub";
var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
Shopify.formatMoneyCustom = function (cents, format) {
  if (typeof cents == "string") {
    cents = cents.replace(".", "");
  }
  var value = "";
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || this.money_format;

  function defaultOption(opt, def) {
    return typeof opt == "undefined" ? def : opt;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    var parts = number.split("."),
      dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands),
      cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
$.urlParam = function (name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
};
const starting_year = 1983;
const result_msg =
  " Options that fit your vehicle. Please use the drop down to select capacity.";
const ending_year = new Date().getFullYear() + 1;
var tmp = [];
function getDistinct(t) {
  let e = [],
    n = {};
  for (let i in t) (objTitle = t[i].id), (n[objTitle] = t[i]);
  for (i in n) e.push(n[i]);
  return e;
}

function getChkvalues($ele) {
  return $ele
    .map(function () {
      return $(this).val();
    })
    .toArray();
}
String.prototype.imgURL = function (size) {
  // remove any current image size then add the new image size
  return this.replace(
    /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
    "."
  ).replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
    return "_" + size + match;
  });
};
window.mainResults = {};
window.mainHitchResults = {};
window.product_filters = {};
window.allSpareTiresHitch = {};
const filter_icons = {
  "allen-easy":
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/Asset_1_2.svg?v=1725432715",
  compact:
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/compact-new.png?v=1671077363",
  "light-weight":
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/light-weight-new.png?v=1671077363",
  "tilt-rack":
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/tilt-rack-new.png?v=1671077363",
  "secure-locking":
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/secure-locking-new.png?v=1671077363",
  "hitch-mounted":
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/hitch-mounted-new.png?v=1671077363",
  "tray-rack":
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/tray-rack-new.png?v=1671077363",
  electric:
    "https://cdn.shopify.com/s/files/1/0101/8078/8283/files/Bolt_35x35.png?v=1670998027",
};
const bikes_name = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
};
const product_html = `<div class="product-wrapper  {{filter_class}} ">
   <div class="product-container-wrapper">
      <a href="{{product_url}}" class="product_image__container">
         <img src="{{product_image}}" alt="product_image"> 
         <div class="icon-image-wrapper">
            {{product_filters}}
         </div>
      </a>
      <div class="product_detail__container">
         <div class="inner__container">
            <div class="modal_price">
               <span class="hidden product_price_number">{{product_price_number}}</span>
               <p class="price">{{product_price}}</p>
            </div>
            <a href="{{product_url}}" class="product_title">
               <h2 class="product-name">{{product_title}}</h2>
            </a>
            <div class="pre-title">
               <p>{{product_sku}}</p>
            </div>
            <div class="product-reviews mobile_hidden"><a href="{{product_url}}" target="_blank"><span class="stamped-badge" data-rating="5.0" data-lang="" aria-label="Rated 5.0 out of 5 stars"><span class="stamped-starrating stamped-badge-starrating" aria-hidden="true"><i class="stamped-fa stamped-fa-star" style="color:#ab2231 !important;" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" style="color:#ab2231 !important;" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" style="color:#ab2231 !important;" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" style="color:#ab2231 !important;" aria-hidden="true"></i><i class="stamped-fa stamped-fa-star" style="color:#ab2231 !important;" aria-hidden="true"></i></span><span class="stamped-badge-caption" data-reviews="6" data-rating="5.0" data-label="reviews" aria-label="6 reviews" data-version="2"><span style="display:none;"> Reviews</span></span></span></a></div>
            <div class="pro_description mobile_hidden">
               <article class="js-readmore">{{product_description}}</article>
            </div>
            <div class="product-bottom-wrapper">
            <div class="grid-product__price"><span class="visually-hidden">Regular price</span>
              {{ product_price_wrapp}}
            </div>
               <div class="selection-wrapper mobile_hidden">
                  <div class="selection-chkbox">
                     <select name="cars" id="cars" class="variant-dropdown" data-variants='{{variants_json}}' data-variants_images_json='{{variants_images_json}}'>
                        {{product_variants}}
                     </select>
                     <span class="item-fit-on active">Item Fits Your Car</span>
                  </div>
                  <div class="product-imp-text">
                       <p>{{hitch_status}}</p>
                  </div>
               </div>
               <div class="atc-link ">
               <button class="atc-link-btn btn btn_normal btn_gray " data-variant={{data_variant}} style="">add to cart</button>
               <a class="btn js-moreinfo btn--secondary btn_normal btn_transparent_black btn_hover_black" href="{{product_url}}">More Info</a></div>
            </div>
         </div>
      </div>
   </div>
   <div class="compare_check">
      <span>compare</span> 
      <div class="compare_chkbox"> <input type="checkbox" name="compare_chkbox" id="compare_chkbox" value="comapre_chkbox"></div>
   </div>
</div>`;

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

var user_rack_finder_data0 = JSON.parse(
  localStorage.getItem("user_rack_finder_data")
);
var current_year = parseInt($.urlParam("year")) || false;
var current_make_id = parseInt($.urlParam("make_id")) || false;
var current_model_id = parseInt($.urlParam("model_id")) || false;
var current_body_id = parseInt($.urlParam("body_id")) || false;
if (
  current_year == false &&
  current_make_id == false &&
  current_model_id == false &&
  current_body_id == false &&
  $("body").hasClass("rack-finder-page")
) {
  $("body").removeClass("show-data");
} else {
  $("body").addClass("show-data");
}

var new_current_year = false,
  new_current_make_id = false,
  new_current_model_id = false,
  new_current_body_id = false;
let submit_counter = 0;
// console.log('user_rack_finder_data0',user_rack_finder_data0.vehicleInfo)
if (current_year == false && user_rack_finder_data0 != null) {
  if (user_rack_finder_data0.vehicleInfo != null) {
    current_year = user_rack_finder_data0.vehicleInfo.year;
    current_make_id = user_rack_finder_data0.vehicleInfo.makeId;
    current_model_id = user_rack_finder_data0.vehicleInfo.modelId;
    current_body_id = user_rack_finder_data0.vehicleInfo.body_id;
  }
}
let hasPageLoaded = false;
// if(current_year != false && current_make_id != false && current_model_id != false && current_body_id != false){
//   hasPageLoaded=true;
// }
// console.log('load current_body_id',current_body_id)
if (user_rack_finder_data0 != null) {
  let vehicleInfo = user_rack_finder_data0.vehicleInfo;
  if (vehicleInfo && is_home != "page.rack-finder-tool-2") {
    current_year = vehicleInfo.year;
    current_make_id = vehicleInfo.makeId;
    current_model_id = vehicleInfo.modelId;
    current_body_id = vehicleInfo.body_id;
    submit_counter = 1;
  }
}
let search_hit_count = 0;
function manageSearchBtn() {
  // console.log('fun call')
  var year_select = $("#year_select option:selected").text();
  var car_select = $("#make_select option:selected").text();
  var model_select = $("#model_select option:selected").text();
  var bodytype_val = $("#bodytype_select option:selected").text();
  // if (bodytype_val != 'body type') {
  //   $("#clearButton").addClass("green-btn");
  //   $("#clearButton span.text").text("Re-Submit");
  // } else {
  //   $("#clearButton").removeClass("green-btn");
  //   $("#clearButton span.text").text("Submit");
  // }
}
function updateURL(param, newVal) {
  var url = new URL(window.location.href);
  var search_params = url.searchParams;

  // new value of "id" is set to "101"
  search_params.set(param, newVal);

  // change the search property of the main url
  url.search = search_params.toString();

  // the new url string
  var new_url = url.toString();
  // console.log('search_params',search_params)

  // output : http://demourl.com/path?id=101&topic=main
  // console.log('new_url',new_url);
  const stateObj = { foo: "bar" };
  history.pushState(stateObj, "", new_url);
}
function getUrlParam(param) {
  const paramValue = new URLSearchParams(window.location.search).get(param);
  return paramValue !== null ? paramValue : null;
}
var yearChangeCount = 0;
if ($("body").hasClass("rack-finder-page")) {
  yearChangeCount = -1;
}
function setYearDropdown() {
  var user_rack_finder_data0 = JSON.parse(
      localStorage.getItem("user_rack_finder_data")
    ),
    yearData = null;
  if (user_rack_finder_data0 != null) {
    if (user_rack_finder_data0.vehicleInfo != null) {
      yearData = user_rack_finder_data0.vehicleInfo.year;
    }
  }
  if (yearParam != null || user_rack_finder_data0 != null) {
    new_current_year = true;
  }
  var yr_drpdn = $("#year_select");
  yr_drpdn.empty();
  yr_drpdn.append($("<option>").text("select year").val(""));
  for (let index = ending_year; index > starting_year; index--) {
    if (current_year == index) {
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
  var yearParam = getUrlParam("year");
  if ((yearParam != null || new_current_year) && yearData != null) {
    setTimeout(() => {
      yr_drpdn[0].dispatchEvent(new Event("change"));
    }, 200);
  }

  yr_drpdn.on("change", function () {
    yearChangeCount++;
    var current_val = parseInt($(this).val());
    if (user_rack_finder_data0 == null) {
      updateURL("year", current_val);
    }
    setMakeDropdown(current_val, yearChangeCount);
  });
}
var makeChangeCount = 0;
if ($("body").hasClass("rack-finder-page")) {
  makeChangeCount = -1;
}
function setMakeDropdown(year, yearChangeCount) {
  makeChangeCount++;
  var car_select = $("#make_select");
  car_select.removeClass("disabled");
  car_select.empty();
  car_select.append($("<option>").text("loading..."));
  var params = `${API_URL}GetMakes?year=${year}`;
  window.getData(params).then(function (res) {
    car_select.empty();
    // console.log('yearChangeCount',yearChangeCount)
    if (yearChangeCount >= 2) {
      car_select.append($("<option value=''>").text("Select Make"));
    } else {
      car_select.append(
        $("<option value=''>").text("Select Make").attr("selected", "selected")
      );
    }
    // console.log('current_make_id', current_make_id);
    $.each(res, function (index, item) {
      if (current_make_id == item.id && yearChangeCount < 2) {
        car_select.append(
          $("<option>")
            .attr("value", item.id)
            .text(item.make_title)
            .attr("selected", "selected")
        );
      } else {
        car_select.append(
          $("<option>").attr("value", item.id).text(item.make_title)
        );
      }
    });
    var MakeParam = getUrlParam("make_id");
    var user_rack_finder_data0 = JSON.parse(
      localStorage.getItem("user_rack_finder_data")
    );
    console.log('makeChangeCount',makeChangeCount)
    if (
      (MakeParam != null || user_rack_finder_data0 != null) &&
      makeChangeCount <= 2
    ) {
      car_select.trigger("change");
    } else {
      $("#model_select").empty();
      $("#bodytype_select").empty();
      $("#model_select").append(
        $("<option>")
          .text("select model")
          .attr("selected", "selected")
          .attr("value", "")
      );
      $("#bodytype_select").append(
        $("<option>")
          .text(" body type")
          .attr("selected", "selected")
          .attr("value", "")
      );
    }
  });

  var drpdn = $("#model_select");
  $("body").on("change", "#make_select", function () {
    makeChangeCount++;
    // console.log('change makeChangeCount',makeChangeCount)
    drpdn.removeClass("disabled");
    new_current_make_id = true;
    var make_id = parseFloat($(this).val()),
      year_id = parseInt($("#year_select").val());
    drpdn.empty();
    drpdn.append($("<option>").text("loading..."));
    var params = `${API_URL}GetModels?year=${year}&make_id=${make_id}`;
    window.getData(params).then(function (res) {
      drpdn.empty();
      drpdn.append(
        $("<option>")
          .text("select model")
          .attr("selected", "selected")
          .attr("value", "")
      );
      $.each(res, function (index, item) {
        if (current_model_id == item.id) {
          drpdn.append(
            $("<option>")
              .attr("value", item.id)
              .text(item.model_title)
              .attr("selected", "selected")
          );
        } else {
          drpdn.append(
            $("<option>").attr("value", item.id).text(item.model_title)
          );
        }
      });
      var ModelParam = getUrlParam("model_id");
      var user_rack_finder_data0 = JSON.parse(
        localStorage.getItem("user_rack_finder_data")
      );
      if (
        ModelParam != null ||
        (user_rack_finder_data0 != null && yearChangeCount < 2)
      ) {
        drpdn.trigger("change");
      }
    });
    if (user_rack_finder_data0 == null) {
      updateURL("make_id", make_id);
    }

    manageSearchBtn();
  });
}
vehicleData();
function vehicleData() {
  var year_select = $("#year_select option:selected").text();
  var car_select = $("#make_select option:selected").text();
  var model_select = $("#model_select option:selected").text();
  var bodytype_val = $("#bodytype_select option:selected").text();

  var vehicle_text = $(
    ".collection-filter__item h3.vehicle-title , .vehicle-title"
  ).children("strong");
  var vehicle_replaceble_text =
    year_select + " " + car_select + " " + model_select + " " + bodytype_val;
  var announceBar = $(".announcement-slider__content").eq(0);
  if (
    $("#year_select option:selected").val() != "" &&
    $("#make_select option:selected").val() != "" &&
    $("#model_select option:selected").val != "" &&
    $("#bodytype_select option:selected").val() != ""
  ) {
    vehicle_text.empty().text(vehicle_replaceble_text);
    $("h3.vehicle-title").removeClass("hide");
    let classIN = document.querySelector(".home-rack-finder-app");
    if (classIN) {
      if (announceBar) {
        announceBar
          .empty()
          .html(`<p>MY CAR: <strong>${vehicle_replaceble_text}</strong></p>`);
      }
    }
  } else {
    $("h3.vehicle-title").addClass("hide");
  }
}
function setBodytypesDropdown() {
  var drpdn = $("#bodytype_select");
  $("body").on("change", "#model_select", function () {
    drpdn.removeClass("disabled");
    new_current_model_id = true;
    // console.log('OnModel','new_current_year',new_current_year,'new_current_make_id',new_current_make_id,'new_current_model_id',new_current_model_id,'new_current_body_id',new_current_body_id)
    var make_id = parseFloat($("#make_select").val()),
      model_id = parseInt($("#model_select").val());
    drpdn.empty();
    drpdn.append(
      $("<option>")
        .text(" body type")
        .attr("selected", "selected")
        .attr("value", "")
    );
    var model_text = $("#model_select option:selected").text();
    if (model_text != "select model") {
      drpdn.empty();
      drpdn.append($("<option>").text("loading..."));
      var params = `${API_URL}GetBodyTypes?make_id=${make_id}&model_id=${model_id}`;
      window.getData(params).then(function (res) {
        drpdn.empty();
        drpdn.append(
          $("<option>")
            .text(" body type")
            .attr("selected", "selected")
            .attr("value", "")
        );
        $(".bodytype_selector").removeClass("hidden");
        $.each(res, function (index, item) {
          if (res.length == 1) {
            drpdn.empty();
            drpdn.append($("<option>").text(" body type").attr("value", ""));
            drpdn.append(
              $("<option>")
                .attr("value", item.body_id)
                .text(item.title)
                .attr("selected", "selected")
            );
            $("#bodytype_select").trigger("change");
          } else if (current_body_id == item.body_id) {
            drpdn.append(
              $("<option>")
                .attr("value", item.body_id)
                .text(item.title)
                .attr("selected", "selected")
            );
            $("#bodytype_select").trigger("change");
          } else {
            drpdn.append(
              $("<option>").attr("value", item.body_id).text(item.title)
            );
            if ($("body").hasClass("rack-finder-page")) {
              setTimeout(() => {
                manageSearchBtn();
                // $('#bodytype_select').trigger('change')
              }, 200);
            }
          }
        });

        //Body type dropdown is Optional
        // vehicleData();
        var yearParam = getUrlParam("year"),
          MakeParam = getUrlParam("make_id"),
          ModelParam = getUrlParam("model_id");
        var user_rack_finder_data0 = JSON.parse(
          localStorage.getItem("user_rack_finder_data")
        );
        if (
          (yearParam != null && MakeParam != null && ModelParam != null) ||
          user_rack_finder_data0 == null
        ) {
          drpdn.trigger("change");
        }
      });
    }
    if (user_rack_finder_data0 == null) {
      updateURL("model_id", model_id);
    }
  });
  // For printing the vehicle data in to the plp page
  var body_count = 0;
  $("body").on("change", "#bodytype_select", function () {
    yearChangeCount++;
    // vehicleData()
    body_count++;
    var body_id = parseFloat($("#bodytype_select").val());
    if (body_id != "") {
      new_current_body_id = true;
    }
    if (user_rack_finder_data0 == null) {
      updateURL("body_id", body_id);
    }
    var body_type = parseInt($.urlParam("body_id")) || false;
    // console.log('current_body_id',body_count , body_type)
    // console.log('yearChangeCount',yearChangeCount)
    if (yearChangeCount < 3) {
      vehicleData();
    }
    if (body_type != false && $("body").hasClass("rack-finder-page")) {
      // console.log('if submit using body drop',body_count)
      if (body_count == 2 && $("body").hasClass("show-data")) {
        // console.log('inner if')
        $(document).trigger("CustomEventFormSubmit");
      } else if ($("body").hasClass("show-data") && body_count <= 3) {
        // console.log('inner else')
        $("#clearButton span").text("re-submit");
      }
    } else if (
      body_type == false &&
      body_count <= 3 &&
      $("body").hasClass("rack-finder-page")
    ) {
      // console.log('outer else')
      $("#clearButton span").text("re-submit");
    }
  });
}
let isMobileHitchChecked = false;
var hitch_cheked = 0;
$(document).ready(function () {
  //Dropdown and Checkbox change event code
  $(document).on(
    "change",
    ".dropdown_value, input[name='mobile_hitch'], input[name='mobile_spare_tire']",
    function (event) {
      hitch_cheked++;
      // console.log('hitc',hitch_cheked)
      // console.log('change here change')
      var val = $(this).val();
      var year_select = $("#year_select");
      var car_select = $("#make_select");
      var model_select = $("#model_select");
      var year_value = parseInt(year_select.val());
      var car_value = parseFloat(car_select.val());
      var model_value = parseFloat(model_select.val());
      var bodytype_val = parseFloat($("#bodytype_select").val());
      var selected_val =
        year_value + " " + car_value + " " + model_value + " " + bodytype_val;
      var hasYMM = 0,
        hasHitch = false,
        hasSpareTire = false;

      if ($("input[name='mobile_hitch']:checked").val() == "yes") {
        hasHitch = true;
      } else {
        hasHitch = false;
      }

      if ($("input[name='mobile_spare_tire']:checked").val() == "yes") {
        hasSpareTire = true;
      } else {
        hasSpareTire = false;
      }
      if (selected_val.indexOf("NaN") == -1) {
        hasYMM = true;
      } else {
        hasYMM = false;
      }
      var enable_btn = false,
        hasLocalData = false;
      var user_rack_finder_data0 = JSON.parse(
        localStorage.getItem("user_rack_finder_data")
      );
      if (user_rack_finder_data0 != null) {
        if (user_rack_finder_data0.vehicleInfo != null) {
          hasLocalData = true;
        }
      }
      // console.log(selected_val, hasYMM, "hasHitch: ", hasHitch);
      // console.log(selected_val, selected_val.indexOf("NaN"));
      if (hasYMM == false && hasHitch == false && hasSpareTire == false) {
        enable_btn = false;
        // console.log("here 1");
        // return false;
      } else if (
        (hasHitch == true || hasSpareTire == true) &&
        selected_val.indexOf("NaN") == -1
      ) {
        enable_btn = true;
        // console.log("here 2");
      } else if (
        (hasHitch == true || hasSpareTire == true) &&
        selected_val.indexOf("NaN") == 0
      ) {
        enable_btn = true;
        // console.log("here 3");
      } else if (
        (hasHitch == true || hasSpareTire == true) &&
        selected_val.indexOf("NaN") > 0
      ) {
        enable_btn = false;
        // console.log("here 4");
      } else {
        // console.log("else here");
        enable_btn = true;
      }
      if (hasLocalData) {
        enable_btn = true;
      }
      // console.log('hasLocalData',hasLocalData,'enable_btn',enable_btn)
      if (enable_btn == true) {
        $("#clearButton").removeAttr("disabled").removeClass("disabled");
      } else {
        $("#clearButton").attr("disabled", "disabled").addClass("disabled");
      }
      // manageSearchBtn();
    }
  );
  $(document).on("click", ".jplist-reset-btn", function () {
    $(`input[name="filter_no_of_bikes[]"]`)
      .removeClass("jplist-selected")
      .prop("checked", false);
    $(".bike-4,.bike-5").parents(".checkbox").removeClass("disabled");
    $(`input[name="filter_no_of_bikes[]"]`).trigger("change");
    $(`.checkbox input, input[name="hitch_on_vehicle"]`).prop("checked", false);
    $(".jplist-selected").removeClass("jplist-selected");
    // console.log(window.allResults);
    printResults(window.allResults);
  });
  $(document).on("change", ".js-class-filter", function () {
    var $this = $(this),
      classs_selected = $(".js-class-filter.jplist-selected").val(),
      $checked = $this.prop("checked");
    // console.log(classs_selected);
    setTimeout(function () {
      if (classs_selected == "undefined" || classs_selected == undefined) {
        $(".bike-1,.bike-3,.bike-4,.bike-5")
          .parents(".checkbox")
          .removeClass("disabled");
      }
      if (
        classs_selected != undefined &&
        classs_selected == "filter_hitch_class-class-1"
      ) {
        if (classs_selected == "filter_hitch_class-class-1") {
          $(".bike-1,.bike-2").parents(".checkbox").removeClass("disabled");
          $(".bike-3").parents(".checkbox").addClass("disabled");
        }
        $(".bike-4,.bike-5").parents(".checkbox").addClass("disabled");
      }
      if (
        classs_selected != undefined &&
        classs_selected == "filter_hitch_class-class-2"
      ) {
        if (classs_selected == "filter_hitch_class-class-2") {
          $(".bike-1").parents(".checkbox").addClass("disabled");
          $(".bike-2,.bike-3").parents(".checkbox").removeClass("disabled");
        }
        $(".bike-4,.bike-5").parents(".checkbox").addClass("disabled");
      }
    }, 300);
  });
  $(document).on("change", ".hitch-size-chk", function () {
    var $this = $(this),
      val = $this.val(),
      $checked = $this.prop("checked"),
      selected_class = $(".js-class-filter.jplist-selected").val();
    // console.log(val, $checked);

    $(`input[name="filter_no_of_bikes[]"]`)
      .removeClass("jplist-selected")
      .prop("checked", false);
    // $(`input[name="filter_no_of_bikes[]"]`).trigger("change");
    $(".bike-1,.bike-3,.bike-4,.bike-5")
      .parents(".checkbox")
      .removeClass("disabled");
    $(".variant-dropdown")
      .find(
        `option[data-no-of-bike*="3 Bike"],option[data-no-of-bike*="4 Bike"], option[data-no-of-bike*="5 Bike"]`
      )
      .removeAttr("disabled")
      .removeAttr("selected");
    // $(".variant-dropdown").find("option:eq(0)").attr("selected", "selected");
    if (val == "1 ¼") {
      $(".variant-dropdown").each(function (i, ele) {
        $("option", $(ele)).removeAttr("selected");
        $(ele).find("option:eq(0)").attr("selected", "selected");
      });
      $(".variant-dropdown").trigger("change");
      if ($checked == true) {
        $(".class-label").addClass("active");
        $("ul.hitch-class-list").addClass("active");
        if (selected_class == "filter_hitch_class-class-1") {
          $(".bike-3").parents(".checkbox").addClass("disabled");
        }
        if (selected_class == "filter_hitch_class-class-2") {
          $(".bike-1").parents(".checkbox").addClass("disabled");
        }
        $(".bike-4,.bike-5").parents(".checkbox").addClass("disabled");
      } else {
        $("ul.hitch-class-list,.class-label").removeClass("active");
        $(".bike-1,.bike-3,.bike-4,.bike-5")
          .parents(".checkbox")
          .removeClass("disabled");
      }
    } else {
      $(".hitch-class-chk").prop("checked", false);
      $(".hitch-class-chk").removeClass("jplist-selected");
      $(`.class-label`).removeClass("active");
      // $("#mobile-filter-hitch_size_1").trigger("change");
      $("ul.hitch-class-list").removeClass("active");
      $(".bike-1,.bike-3,.bike-4,.bike-5")
        .parents(".checkbox")
        .removeClass("disabled");
    }
  });

  // $(".js-sticky-sidebar-filter").theiaStickySidebar({
  //   additionalMarginTop: 120,
  // });

  if (current_year == false) {
    $("option:eq(0)", $("#year_select")).attr("selected", "selected");
    // yr_drpdn.trigger('change');
  }

  //Code for Page load events
  setYearDropdown();
  setBodytypesDropdown();
  if ($.urlParam("spareTire") != null) {
    var spareTire = JSON.parse($.urlParam("spareTire"));
    if (spareTire) {
      $("#mobile_spare_tire_yes").prop("checked", true).trigger("click");
      submit_counter++;
      setTimeout(function () {
        // console.log('sopare tire checked')
        $(document).trigger("CustomEventFormSubmit", [submit_counter]);
      }, 150);
    }
  }

  if (
    $.urlParam("hitch") != null ||
    (user_rack_finder_data0 != null && is_home != "page.rack-finder-tool-2")
  ) {
    var hitch = JSON.parse($.urlParam("hitch"));
    // console.log('user_rack_finder_data0.vehicleInfo',user_rack_finder_data0)
    if (
      user_rack_finder_data0 != null &&
      is_home != "page.rack-finder-tool-2"
    ) {
      if (user_rack_finder_data0.vehicleInfo != null) {
        hitch = user_rack_finder_data0.vehicleInfo.hitch;
      }
    }
    if (hitch) {
      $("#mobile_hitch_yes").prop("checked", true).trigger("change");
      submit_counter++;
      setTimeout(function () {
        // console.log('hitch checked')
        $(document).trigger("CustomEventFormSubmit", [submit_counter]);
      }, 150);
    }
  }
  if (
    $.urlParam("spareTire") != null ||
    (user_rack_finder_data0 != null && is_home != "page.rack-finder-tool-2")
  ) {
    var spareTire = JSON.parse($.urlParam("spareTire"));
    if (
      user_rack_finder_data0 != null &&
      is_home != "page.rack-finder-tool-2"
    ) {
      if (user_rack_finder_data0.vehicleInfo != null) {
        spareTire = user_rack_finder_data0.vehicleInfo.spareTire;
      }
    }
    if (spareTire) {
      $("#mobile_spare_tire_yes").attr("checked", "checked").trigger("click");
    }
  }
  var car_select = $(".car-name-select").children().not(":first");
  var model_select = $(".model-select").children().not(":first");
  car_select.hide();
  model_select.hide();
  //mobile functionality

  $(document).on("CustomEventFormSubmit", function (e, arg1) {
    // console.log("body_count", arg1);
    if (
      new_current_year &&
      new_current_make_id &&
      new_current_model_id &&
      new_current_body_id
    ) {
      $("#clearButton").prop("disabled", false);
      $("#clearButton").removeClass("loading");
      console.log("form submitted");
      $("#fitmentSearch").trigger("submit");
    } else if (JSON.parse($.urlParam("spareTire")) == true && arg1 == 1) {
      $("#clearButton").prop("disabled", false);
      $("#clearButton").removeClass("loading");
      $("#fitmentSearch").trigger("submit");
    } else if (JSON.parse($.urlParam("hitch")) == true && arg1 == 1) {
      $("#clearButton").prop("disabled", false);
      $("#clearButton").removeClass("loading");
      $("#fitmentSearch").trigger("submit");
    }
  });

  var custome_btn = $(".filter-custom-button").html();
  $(".svg-down svg").on("click", function () {
    if ($(".rack-finder-tool-wrapper").hasClass("open-filter")) {
      $(".rack-finder-tool-wrapper").removeClass("open-filter");
    } else {
      $(".rack-finder-tool-wrapper").addClass("open-filter");
    }
  });
  $(".filter-custom-button").on("click", function () {
    var $this = $(this);
    // $this.children('.filter-btn-wrapper').hide();
    $(".filter-wrapper").addClass("show-filter");
    $this.addClass("close-filter-btn");
  });
  $("body").on("click", ".close-filter", function () {
    $(".js-sticky-sidebar-filter").removeClass("filter_show");
  });

  //mobile functionality end
  function get_hitch() {
    var s = false;
    if ($("input[name='hitch_on_vehicle']:eq(1)").prop("checked")) {
      s = $("input[name='hitch_size']:checked").val();
    } else {
      s = false;
    }
    return s;
  }

  //product description readmore/readless functionality end

  //Option Slection

  $(".year-select").on("change", function () {
    new_current_year = true;
    var $this = $(this);
    $this.children("option:first").removeAttr("selected");
    var model_first_option = $(".model-select").children("option:first");
    model_first_option.attr("selected", "selected");
    model_select.hide();
    var car_first_option = $(".car-name-select").children("option:first");
    car_first_option.attr("selected", "selected");
    var data_year = $(this).children("option:selected").text();
    $(car_select).each(function () {
      if ($(this).data("year") == data_year) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  $(".car-name-select").on("change", function () {
    new_current_make_id = true;
    $(this).children("option:first").removeAttr("selected");
    var first_option = $(".model-select").children("option:first");
    first_option.attr("selected", "selected");
    var data_car_name = $(this).children("option:selected").text();
    $(model_select).each(function () {
      if ($(this).data("car-name") == data_car_name) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  $(".model-select").on("change input propertychange", function () {
    $(this).children("option:first").removeAttr("selected");
  });

  //Option Selction End

  //Chage Text and show hide filter button

  // $('.see-result').on('click',function(){
  //   var $this = $(this);

  // })

  window.allResults = {};
  window.removeDuplicates = function (arrayIn) {
    const result = [];
    const map = new Map();
    for (const item of arrayIn) {
      if (!map.has(item.product.id)) {
        map.set(item.product.id, true); // set any value to Map
        result.push({
          product: item.product,
          isHitch: item.isHitch,
          isSpare: item.isSpare,
          filter_data: item.filter_data,
          dbProductId: item.dbProductId,
        });
      }
    }
    return result;
  };
  function printResults(final_result, params = null, productTranslations = []) {
    // console.log("productTranslations", productTranslations);
    var currentLocale = document.body.getAttribute("lang") || "en";
    var unq_final_result = window.removeDuplicates(final_result);
    var result_wrapper = $("[data-result-wrapper]");
    var filter_list = $(".filter-list>ul"),
      result_count = $("[data-result-count]");
    result_wrapper.empty();

    // console.log("unq_final_result", unq_final_result);
    $.each(unq_final_result, function (index, item) {
      var product = item.product;
      // console.log(item);
      var varoptinName = product.options[0].name;
      var options = "";
      var getOptionaName =
        productTranslations?.length > 0
          ? productTranslations.filter(
              (t) =>
                t?.product_id === item?.dbProductId &&
                t?.trans_key === "name" &&
                t?.product_title == varoptinName &&
                t?.object_type == "productOption"
            )[0]?.trans_val ?? varoptinName
          : varoptinName;
      options = `<option value selected>Select ${getOptionaName}</option>`;
      $.each(product.variants, function (index, variant) {
        let words = product.tags.split(', ');
          console.log('product.tags', product.tags)
      let discountTag = words.filter(word => word.toLowerCase().includes('discount:'));
      var price_html = "";
        var discount_per = false
       // if(discountTag.length > 0 ){
       //    discount_per = discountTag[0].split(':')[1].match(/\d+/)[0];        
       //    var varComparePrice = variant.price,
       //    varPrice = Math.round((variant.price - (variant.price * (discount_per / 100))) * 100) / 100,
       //    discount_per = discount_per + '%'
       //  }  
         if (discountTag.length > 0) {
            var discount_per = discountTag[0].split(':')[1].match(/\d+/)[0];        
            var varComparePrice = variant.price;
            var varPrice = (variant.price - (variant.price * (discount_per / 100))).toFixed(2);
            var discount_per_display = discount_per + '%';
            
            // console.log('var price', varPrice);
        }  
        var isMapped = mapped_skus.filter((v) => {
          return v.key_item == variant.sku && v.key_value == "YES";
        })[0];
        // console.log(isMapped);
        var opt_disabled = "";
        var getVariantTitle =
          productTranslations?.length > 0
            ? productTranslations.filter(
                (t) =>
                  t?.product_id === item?.dbProductId &&
                  t?.trans_key === "option1" &&
                  t?.product_title == variant.title
              )[0]?.trans_val ?? variant.title
            : variant.title;
        var price = variant.price,
          compare_at_price = variant.compare_at_price;
          if(discountTag.length > 0 && theme.settings.show_tagbase_discount && theme.settings.show_save_amount){
            price = varPrice,
          compare_at_price = variant.price;
          }else{
            discount_per = false;
          }
        if (item.isHitch == false) {
          if (isMapped != undefined) {
            // opt_disabled = "disabled";
            // console.log('getVariantTitle',getVariantTitle)
            options += `<option data-price="${price}" data-savings="${discount_per}" data-compare-price="${compare_at_price}" value="${variant.id}" ${opt_disabled} data-sku="${variant.sku}" data-no-of-bike="${variant.title}">${getVariantTitle}</option>`;
          }
          else{
            options += `<option value="${variant.id}" data-savings="${discount_per}" data-sku="${variant.sku}" data-no-of-bike="${variant.title}" data-price="${price}" data-compare-price="${compare_at_price}">${getVariantTitle}</option>`;
          }
        } else {
          // console.log('getVariantTitle',getVariantTitle)
          options += `<option value="${variant.id}" data-savings="${discount_per}" data-sku="${variant.sku}" data-no-of-bike="${variant.title}" data-price="${price}" data-compare-price="${compare_at_price}">${getVariantTitle}</option>`;
        }
      });
      // console.log('options',options)
      var filter_html = "",
        filter_attr = "";
      var filter_class = "";
      if (item.isHitch == true) {
        filter_class += ` ${slugify("hitch_on_vehicle")} `;
      }
      // console.log('item.filter_data: ',item.filter_data)
      $.each(item.filter_data, function (key, filter_item) {
        // if(filter_item != 'false'){
        if (key == "filter_mounting_type") {
          var filter_cls = filter_item.split(",");
          for (let j1 = 0; j1 < filter_cls.length; j1++) {
            filter_class += ` ${slugify(filter_cls[j1])} `;
          }
        } else if (key == "filter_has_rear_spare_tire_") {
          // console.log('filter_has_rear_spare_tire_: ',filter_item)
          if (filter_item == "true") {
            filter_class += ` ${key}-${slugify(filter_item)} `;
          } else {
            filter_class += ` ${key}-false `;
          }
        } else if (key == "filter_features") {
          var filter_cls = filter_item.split(",");
          // console.log(filter_item,filter_cls)
          for (let j1 = 0; j1 < filter_cls.length; j1++) {
            filter_class += ` ${slugify(filter_cls[j1])} `;
            // console.log('filter',filter_cls[j1])
            filter_html += `<div class="icon-image" data-filter="${slugify(
              filter_cls[j1]
            )}"><img title="${filter_cls[j1]}" alt="${filter_cls[j1]}" src="${
              filter_icons["allen-easy"]
            }"></div><span>${filter_cls[j1]}</span>`;
          }
        } else if (key == "filter_no_of_bikes") {
          var b_no = filter_item.split(",");
          for (let j = 0; j < b_no.length; j++) {
            filter_class += ` bike-${bikes_name[b_no[j]]}`;
          }
        } else if (key == "filter_hitch_size") {
          var b_no = filter_item.split(",");
          for (let j = 0; j < b_no.length; j++) {
            if (b_no[j] == "1 ¼") {
              filter_class += ` filter_hitch_size-1-25 `;
            } else {
              filter_class += ` filter_hitch_size-${slugify(b_no[j])} `;
            }
          }
        } else if (key == "filter_hitch_class") {
          var b_no = filter_item.split(",");
          for (let j = 0; j < b_no.length; j++) {
            filter_class += `filter_hitch_class-${slugify(b_no[j])}`;
          }
        }
      });
      var hitch_status = "";
      if (item.filter_data.filter_hitch_size && item.filter_data.filter_hitch_size != "NA") {
        hitch_status = `*Fits ${
          item.filter_data.filter_hitch_size.toString().indexOf("1 ¼") > -1
            ? '1 1/4" & 2"'
            : '2"'
        } inch hitch receiver`;
      }
      // console.log('theme.Currency', product , 'here')
      let words = product.tags.split(', ');
          // console.log('item.tags',item.tags)
      let discountTag = words.filter(word => word.toLowerCase().includes('discount:'));
      var price_html = "";
       if(discountTag.length > 0 ){
          var discount_per = discountTag[0].split(':')[1].match(/\d+/)[0],            
          varComparePrice = product.variants[0].price,
          varPrice = Math.round((product.variants[0].price - (product.variants[0].price * (discount_per / 100))) * 100) / 100,
          discount_per = discount_per + '%'
        }     
      if (product.variants[0].compare_at_price != null) {
        price_html += `
         <div class="grid-product__price">
          <span class="visually-hidden">Sale price</span>
          <span class="grid-product__price--current">
            <span aria-hidden="true">${Shopify.formatMoneyCustom(
              product.variants[0].price,
              "${{amount}}"
            )}</span>
            <span class="visually-hidden">${Shopify.formatMoneyCustom(
              product.variants[0].price,
              "${{amount}}"
            )}</span>
          </span>
          <span class="visually-hidden">Regular price</span>
          <span class="grid-product__price--original">
            <span aria-hidden="true">${Shopify.formatMoneyCustom(
              product.variants[0].compare_at_price,
              "${{amount}}"
            )}</span>
            <span class="visually-hidden">${Shopify.formatMoneyCustom(
              product.variants[0].compare_at_price,
              "${{amount}}"
            )}</span>
          </span>
          </div>`;
      } else {
        price_html += `<span class="grid-product__price--current">
        <span aria-hidden="true" class="grid-product__price--from">${Shopify.formatMoneyCustom(
          product.variants[0].price,
          "${{amount}}"
        )}</span>
        <span class="visually-hidden"><span>from</span>${Shopify.formatMoneyCustom(
          product.variants[0].price,
          "${{amount}}"
        )}</span>
        </span>`;
      }
       if(discountTag.length > 0 && theme.settings.show_tagbase_discount && theme.settings.show_save_amount){
         price_html= '';
         price_html += `
         <div class="grid-product__price">
          <span class="visually-hidden">Sale price</span>
          <span class="grid-product__price--current">
            <span aria-hidden="true">${Shopify.formatMoneyCustom(
              varPrice * 100,
              "${{amount}}"
            )}</span>
            <span class="visually-hidden">${Shopify.formatMoneyCustom(
              varPrice * 100,
              "${{amount}}"
            )}</span>
          </span>
          <span class="visually-hidden">Regular price</span>
          <span class="grid-product__price--original">
            <span aria-hidden="true">${Shopify.formatMoneyCustom(
              product.variants[0].price,
              "${{amount}}"
            )}</span>
            <span class="visually-hidden">${Shopify.formatMoneyCustom(
              product.variants[0].price,
              "${{amount}}"
            )}</span>
          </span>
          <span class="product__price-savings on-sale">Save ${discount_per}</span>
          </div>`;
      }
      var product_url = `/products/${product.handle}`;
      // console.log("item: ", item);
      // console.log('product',product)
      var getTitle =
        productTranslations?.length > 0
          ? productTranslations.filter(
              (t) =>
                t?.product_id === item?.dbProductId && t?.trans_key === "title"
            )[0]?.trans_val ?? product.title
          : product.title;
      var getDescription =
        productTranslations?.length > 0
          ? productTranslations.filter(
              (t) =>
                t?.product_id === item?.dbProductId &&
                t?.trans_key === "body_html"
            )[0]?.trans_val ?? product.body_html
          : product.body_html;
      // (productTranslations.length>0)?( productTranslations.filter(t=>{return t.product_id== item.dbProductId && t.trans_key=='body_html'})[0]['trans_val'] ):product.body_html;
      // console.log('getTitle',getTitle)
      var htmlStr = product_html
        .replaceAll("{{product_image}}", product.image.src.imgURL("500x500"))
        .replaceAll("{{product_url}}", product_url)
        .replaceAll("{{product_price_number}}", product.variants[0].price)
        .replaceAll("{{ product_price_wrapp}}", price_html)
        .replaceAll(
          "{{product_price}}",
          Shopify.formatMoneyCustom(product.variants[0].price, "${{amount}}")
        )
        .replaceAll("{{product_title}}", getTitle)
        .replaceAll("{{variants_json}}", JSON.stringify(product.variants))
        .replaceAll("{{variants_images_json}}", JSON.stringify(product.images))
        .replaceAll("{{product_sku}}", product.variants[0].sku)
        .replaceAll("{{data_variant}}", product.variants[0].id)
        .replaceAll(
          "{{product_url}}",
          `/products/${product.handle}?#_stamped-main-widget`
        )
        .replaceAll("{{product_description}}", getDescription)
        .replaceAll("{{product_variants}}", options)
        .replaceAll("{{filter_class}}", filter_class)
        .replaceAll("{{hitch_status}}", hitch_status)
        .replaceAll("{{product_filters}}", filter_html);

      // console.log('htmlStr',htmlStr)

      result_wrapper.append(htmlStr);
      filter_list.empty();
    });
    var no_results = `<div class="no-results"><p>Currently there are no valid fitments in our database for your vehicle.  We would welcome the opportunity to review this further and see if there might be a rack available for your application.<br> Please click on <a href="/pages/contact-us">the link</a>  to contact our customer support team – please remember to include your vehicle make, model, and year.</p><p>Another option might be to have a receiver hitch installed on your vehicle, and to use one of our awesome <a href="/collections/hitch-racks/products/deluxe-hitch-rack">hitch mounted carriers</a></p></div>`;
    initFilterJSList();
    setTimeout(function () {
      if ($('.product-wrapper').length > 0) {
        result_count.text($('.product-wrapper').length + result_msg);
      } else {
        result_count.text("0 Options that fit your vehicle.");
        $(".hitch_count_lbl").empty().text(` (${0})`);
      }
      $("#result-wrapper").removeClass("jplist-hidden");
      if ($('.product-wrapper').length == 0) {
        $("#result-wrapper")
          .empty()
          .html(no_results)
          .removeClass("jplist-hidden");
      }
      // $("html, body").animate(
      //   {
      //     scrollTop: $("#main-result-area").offset().top - 100,
      //   },
      //   2000
      // );
      $("article.js-readmore").readmore({
        collapsedHeight: 50,
        speed: 500,
      });
    }, 800);

    // console.log('unq_final_result', params);
    //Store rackfinder result data to cookie for 30days
    var user_rack_finder_data = {
      vehicleInfo: params,
      rackFinderData: unq_final_result.map((v) => {
        return v.product;
      }),
    };
    // console.log('userData change',user_rack_finder_data)
    localStorage.setItem(
      "user_rack_finder_data",
      JSON.stringify(user_rack_finder_data)
    );
  }

  function renderResults(
    result_data,
    filter_result,
    mapped_skus,
    group1 = false,
    jsonParam,
    productTranslations
  ) {
    var showHitchProds = $("[name=mobile_hitch]").prop("checked") || false;
    var showSpareTires = $("[name=mobile_spare_tire]").prop("checked") || false;
    let result_wrapper = $("[data-result-wrapper]");
    let filter_list = $(".filter-list>ul");
    var result_count = $("[data-result-count]");
    result_wrapper.empty();
    // console.log(showHitchProds)
    if (showHitchProds) {
      $(".js-size-selection").addClass("active");
      $("input[name=hitch_on_vehicle]").prop("checked", true);
    } else {
      $(".js-size-selection").removeClass("active");
      $("input[name=hitch_on_vehicle]").prop("checked", false);
    }

    if (showSpareTires) {
      $("#mobile-filter-has_spare_tire_yes").prop("checked", true);
      $("#desktop-filter-has_spare_tire_yes").prop("checked", true);
      $("#mobile-filter-has_spare_tire_no").prop("checked", false);
      $("#desktop-filter-has_spare_tire_no").prop("checked", false);
    } else {
      $("#mobile-filter-has_spare_tire_yes").prop("checked", false);
      $("#desktop-filter-has_spare_tire_yes").prop("checked", false);
      $("#mobile-filter-has_spare_tire_no").prop("checked", false);
      $("#desktop-filter-has_spare_tire_no").prop("checked", false);
    }

    var final_result = result_data;
    var final_count = result_data.length;
    // console.log(group1,showHitchProds)
    if (group1 == false) {
      final_result = mainHitchResults;
    } else {
      final_result = mainResults;
      if (showHitchProds == true) {
        final_result = mainResults.concat(window.mainHitchResults);
      }
    }
    final_count = final_result.length;
    if (final_result.length > 0) {
      result_count.text(final_count + result_msg);
    } else {
      result_count.text("0 Options that fit your vehicle.");
      $(".hitch_count_lbl").empty().text(` (${0})`);
    }
    window.allResults = final_result;
    window.mapped_skus = mapped_skus;
    setTimeout(() => {
      printResults(final_result, jsonParam, productTranslations);
    }, 250);
  }
  $("body").on("change", 'input[name="filter_no_of_bikes[]"]', function (e) {
    var checked = $(this).val();
    if ($(this).is(":checked")) {
      tmp.push(checked);
    } else {
      tmp.splice($.inArray(checked, tmp), 1);
    }
    var no_of_bikes = getChkvalues($('[name="filter_no_of_bikes[]"]:checked'));
    // console.log(no_of_bikes);
    // $('[data-control-name="howmany"]').addClass("no-of-bikes-triggered");
    if (no_of_bikes.length == 0) {
      $("select.variant-dropdown option")
        .removeAttr("disabled")
        .removeClass("disabled");
    }
  });

  function initFilterJSList() {
    //delete all items from jplist collection
    $(".desktop-filter-wrapper").jplist({
      command: "empty",
    });
    $(".desktop-filter-wrapper").jplist({
      debug: !1,
      itemsBox: "#result-wrapper",
      itemPath: ".product-wrapper",
      panelPath: ".jplist-panel",
      deepLinking: false,
      redrawCallback: function (collection, $dataview, statuses) {
        setTimeout(() => {
          var count = $(".product-wrapper").length;
          // console.log('count',count);
          if ($("#result-wrapper").hasClass("jplist-hidden")) {
            $("[data-result-count]").text("0 Options that fit your vehicle.");
          } else {
            $("[data-result-count]").text(count + result_msg);
          }
        }, 250);
        var no_of_bikes = getChkvalues(
          $('[name="filter_no_of_bikes[]"]:checked')
        );
        var not_selected_bikes = getChkvalues(
          $(
            '[data-control-name="howmany"] input[type="checkbox"]:not([name="filter_no_of_bikes[]"]:checked)'
          )
        );
        setTimeout(function () {
          // console.log(tmp);
          var current_bike_selected = tmp[tmp.length - 1];
          // console.log(current_bike_selected);
          if (no_of_bikes.length > 0) {
            $.each($(".product-wrapper"), function (indx, ele) {
              var found_bike = false;
              var not_found_bikes = 0;
              var $var_drp = $(ele).find(`.variant-dropdown`);
              var str = `${current_bike_selected} Bike`;
              var $opt = $var_drp.find(`option[data-no-of-bike*="${str}"]`);
              if ($opt.length > 0) {
                found_bike = $opt;
              }
              if (found_bike != false) {
                $("option", $var_drp).removeAttr("selected");
                $("option", $var_drp)
                  .removeAttr("disabled")
                  .removeClass("disabled");
                if ($var_drp.length > 0 && $opt.length > 0) {
                  // console.log($opt, $opt.text());
                  $opt.attr("selected", "selected");
                  $var_drp.trigger("change");
                }
              }
            });
          }
          if (no_of_bikes.length == 0) {
            $.each($(".product-wrapper"), function (indx, ele) {
              var $var_drp = $(ele).find(`.variant-dropdown`);
              $var_drp.find(`option`).removeAttr("selected");
              $var_drp.find(`option[value=""]`).attr("selected", "selected");
              $var_drp.trigger("change");
            });
          }
          if (not_selected_bikes.length > 0 && no_of_bikes.length > 0) {
            $.each($(".product-wrapper"), function (indx, ele) {
              for (let bike of not_selected_bikes) {
                var str = `${bike} Bike`;
                var $var_drp = $(ele).find(`.variant-dropdown`);
                var $opt_disabled = $var_drp.find(
                  `option[data-no-of-bike*="${str}"]`
                );

                // console.log(str, $opt_disabled);
                $.each($opt_disabled, function (ix, opt_ele2) {
                  // console.log($(opt_ele2), $($(opt_ele2), $var_drp));
                  $(opt_ele2).attr("disabled", "disabled").addClass("disabled");
                });
              }
            });
          }
        }, 300);
        var classs_selected = $(".hitch-class-chk:checked").val();
        // console.log("class slected: ", classs_selected);
        if (classs_selected == "undefined" || classs_selected == undefined) {
          setTimeout(function () {
            $(".variant-dropdown")
              .find(
                `option[data-no-of-bike*="3 Bike"],option[data-no-of-bike*="4 Bike"], option[data-no-of-bike*="5 Bike"]`
              )
              .removeAttr("disabled");
          }, 400);
        }
        if (
          classs_selected != undefined &&
          classs_selected == "filter_hitch_class-class-1"
        ) {
          setTimeout(function () {
            $(".variant-dropdown")
              .find(
                `option[data-no-of-bike*="3 Bike"],option[data-no-of-bike*="4 Bike"], option[data-no-of-bike*="5 Bike"]`
              )
              .attr("disabled", "disabled");
          }, 300);
        }
        if (
          classs_selected != undefined &&
          classs_selected == "filter_hitch_class-class-2"
        ) {
          setTimeout(function () {
            $(".variant-dropdown")
              .find(
                `option[data-no-of-bike*="1 Bike"],option[data-no-of-bike*="4 Bike"], option[data-no-of-bike*="5 Bike"]`
              )
              .attr("disabled", "disabled");
          }, 300);
        }
      },
    });
  }
  if ($.urlParam("year") != "0") {
    if (
      $.urlParam("year") != null &&
      $.urlParam("make_id") != null &&
      $.urlParam("model_id") != null &&
      $.urlParam("spareTire") != null &&
      $.urlParam("hitch") != null
    ) {
      $("#year_select").val($.urlParam("year")).trigger("change");
    }
  }
  $(document).on("click", "a#resetButton", function (e) {
    e.preventDefault();
    $(".rack-fit-badge").addClass("hide");
    $(".announcement-slider__content strong").empty();
    // $('#year_select').find('option:not(:first)').remove();
    $("body").removeClass("show-data");
    $("#year_select").prop("selectedIndex", 0);
    $("#make_select").find("option:not(:first)").remove();
    $("#make_select").addClass("disabled").prop("selectedIndex", 0);
    $("#model_select").find("option:not(:first)").remove();
    $("#model_select").addClass("disabled").prop("selectedIndex", 0);
    $("#bodytype_select").find("option:not(:first)").remove();
    $("#bodytype_select").addClass("disabled").prop("selectedIndex", 0);
    $("#clearButton").prop("disabled", true);
    $('input[name="mobile_hitch"]').prop("checked", false);
    $('input[name="mobile_spare_tire"]').prop("checked", false);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("year");
    params.delete("make_id");
    params.delete("model_id");
    params.delete("body_id");
    params.delete("spareTire");
    params.delete("hitch");

    // Update the URL without reloading the page
    const newUrl = url.origin + url.pathname + "?" + params.toString();
    window.history.replaceState({}, "", newUrl);

    // Get the current cookie data from local storage (assuming it's stored under 'cookieName')
    const cookieData = JSON.parse(
      localStorage.getItem("user_rack_finder_data")
    );

    // Check if cookieData exists and contains vehicleInfo
    if (cookieData) {
      // Remove the 'vehicleInfo' key
      // delete cookieData.vehicleInfo;

      // Save the updated object back to local storage
      localStorage.removeItem("user_rack_finder_data");
    }
  });
  $(document).ready(function () {
    $(".features-wrapper.features_buttons button.icon-title").on(
      "click",
      function () {
        $(this).parent().toggleClass("button_is_selected");
      }
    );
  });
  $("form#fitmentSearch").on("submit", function (e) {
    e.preventDefault();
    $(`[data-control-action="filter"] input`)
      .removeAttr("checked")
      .prop("checked", false);
    $(".button_is_selected").removeClass("button_is_selected");
    $(".jplist-selected").removeClass("jplist-selected");
    // $form = $(this).serializeArray();
    let isHome = $(this).hasClass("js-rack-finder-page") ? false : true;

    var year_select = $("#year_select");
    var car_select = $("#make_select");
    var model_select = $("#model_select");
    var year_value = parseInt(year_select.val());
    var car_value = parseFloat(car_select.val());
    var model_value = parseFloat(model_select.val());
    var bodytype_val = parseFloat($("#bodytype_select").val());
    var vehicle_text = $("h3.vehicle-title").children("strong");
    var vehicle_replaceble_text =
      year_value + " " + car_value + " " + model_value + " " + bodytype_val;
    var vehicle_replaceble_value =
      year_select.find("option:selected").text() +
      " " +
      car_select.find("option:selected").text() +
      " " +
      model_select.find("option:selected").text() +
      " " +
      $("#bodytype_select option:selected").text();

    var group1 = false;
    vehicle_text.empty();
    var user_rack_finder_data0 = JSON.parse(
      localStorage.getItem("user_rack_finder_data")
    );

    var url_current_year = parseInt($.urlParam("year")) || false;
    var url_current_make_id = parseInt($.urlParam("make_id")) || false;
    var url_current_model_id = parseInt($.urlParam("model_id")) || false;
    var url_current_body_id = parseInt($.urlParam("body_id")) || false;

    var current_year = false,
      current_make_id = false,
      current_model_id = false,
      current_body_id = false;
    // return true;
    // console.log('user_rack_finder_data0',user_rack_finder_data0.vehicleInfo)
    if (user_rack_finder_data0 != null) {
      if (user_rack_finder_data0.vehicleInfo != null) {
        current_year = user_rack_finder_data0.vehicleInfo.year;
        current_make_id = user_rack_finder_data0.vehicleInfo.makeId;
        current_model_id = user_rack_finder_data0.vehicleInfo.modelId;
        current_body_id = user_rack_finder_data0.vehicleInfo.body_id;
      }
    }

    (current_year = $("#year_select option:selected").val() || false),
      (current_make_id = $("#make_select option:selected").val() || false),
      (current_model_id = $("#model_select option:selected").val() || false),
      (current_body_id = $("#bodytype_select option:selected").val() || false);

    // console.log('check',$('input#mobile_hitch_yes').prop("checked"))
    var hitch_cheked = $("input#mobile_hitch_yes").prop("checked"),
      spare_checked = $("input#mobile_spare_tire_yes").prop("checked");

    if (
      (url_current_body_id != false &&
        url_current_make_id != false &&
        url_current_model_id != false &&
        url_current_year != false) ||
      (current_year != false &&
        current_make_id != false &&
        current_model_id != false &&
        current_body_id != false) ||
      hitch_cheked ||
      spare_checked
    ) {
      $("#clearButton .text").text("Loading");
      $("#clearButton").addClass("loading");
      $(".form-error").addClass("hidden");
      $("body").addClass("show-data");
    } else {
      $(".form-error").removeClass("hidden");
      return;
    }
    if (
      (current_year != false &&
        current_make_id != false &&
        current_model_id != false &&
        current_body_id != false) ||
      hitch_cheked ||
      spare_checked
    ) {
      $("#clearButton .text").text("Loading");
      $("#clearButton").addClass("loading");
      $(".form-error").addClass("hidden");
    } else {
      $(".form-error").removeClass("hidden");
      return true;
    }
    if (
      ($("body").hasClass("rack-finder-page") &&
        current_year != "" &&
        current_make_id != "" &&
        current_model_id != "" &&
        $("#bodytype_select option:selected").val() != "") ||
      hitch_cheked ||
      spare_checked
    ) {
      $("#clearButton .text").text("Loading");
      $("#clearButton").addClass("loading");
      $(".form-error").addClass("hidden");
      vehicleData();
    } else if ($("body").hasClass("rack-finder-page")) {
      $("#clearButton .text").text("submit");
      $(".form-error").removeClass("hidden");
      return true;
    }
    // console.log('current_body_id',current_body_id)
    if (isNaN(year_value) && isNaN(car_select) && isNaN(model_select)) {
      group1 = false;
    } else {
      group1 = true;
    }
    var params = `?year=${year_value}&make_id=${car_value}&model_id=${model_value}&spareTire=${SpareTire}&hitch=${HitchTire}`;

    var SpareTire = $("input[name=mobile_spare_tire]").prop("checked");
    var HitchTire = $("input[name=mobile_hitch]").prop("checked");
    // HitchTire = true;
    // console.log(group1);
    if (group1 == false) {
      vehicle_text.empty();
      params = `?year=${0}&make_id=${0}&model_id=${0}&body_id=${parseFloat(
        $("#bodytype_select").val()
      )}&spareTire=${SpareTire}&hitch=${HitchTire}`;
    } else {
      params = `?year=${year_value}&make_id=${car_value}&model_id=${model_value}&body_id=${parseFloat(
        $("#bodytype_select").val()
      )}&spareTire=${SpareTire}&hitch=${HitchTire}`;
      vehicle_text.text(vehicle_replaceble_value);
    }
    // console.log("params: ", params);
    // console.log('isHome', isHome);
    const stateObj = { foo: "bar" };
    const locale = document.body.getAttribute("lang") || "en";
    history.pushState(stateObj, "", params);
    var jsonParam = {
      year: year_value,
      makeId: car_value,
      modelId: model_value,
      body_id: parseFloat($("#bodytype_select").val()),
      spareTire: spareTire,
      hitch: HitchTire,
    };
    if (isHome) {
      window.location.href = `/pages/rack-finder${params}&locale=${locale}`;
    } else {
      var final_arr = [],
        final_arr2 = [],
        final_arr3 = [],
        mapped_skus = [];

      // console.log(params)
      window
        .getData(API_URL + "getProducts" + params + `&locale=${locale}`)
        .then(function (res) {
          search_hit_count++;
          $("#clearButton .text").text("Submit");
          $("#clearButton").removeClass("loading");
          $("a#resetButton").css({ display: "flex" });
          // console.log(res)
          if (res.mapped_skus.length > 0) {
            mapped_skus = res.mapped_skus;
          }
          if (res.carProducts.length > 0) {
            for (let index = 0; index < res.carProducts.length; index++) {
              var tmp_json = JSON.parse(res.carProducts[index].productJson);
              final_arr.push({
                product: tmp_json,
                isHitch: false,
                isSpare: false,
                dbProductId: res.carProducts[index].product_id,
              });
            }
          }

          if (res.hitchProducts.length > 0) {
            $("#hitch_count_lbl")
              .empty()
              .text(` (${res.hitchProducts.length})`);
            for (let index = 0; index < res.hitchProducts.length; index++) {
              var tmp_json = JSON.parse(res.hitchProducts[index].productJson);
              final_arr2.push({
                product: tmp_json,
                isHitch: JSON.parse(res.hitchProducts[index].hitch_status),
                isSpare: JSON.parse(res.hitchProducts[index].spareTireStatus),
                dbProductId: res.hitchProducts[index].product_id,
              });
            }
          }

          for (let index = 0; index < res.allSpareTiresHitch.length; index++) {
            var tmp_json = JSON.parse(
              res.allSpareTiresHitch[index].productJson
            );
            final_arr3.push({
              product: tmp_json,
              isHitch: JSON.parse(res.allSpareTiresHitch[index].hitch_status),
              isSpare: JSON.parse(
                res.allSpareTiresHitch[index].spareTireStatus
              ),
              dbProductId: res.allSpareTiresHitch[index].product_id,
            });
          }
          // console.log(res)
          // var UniqueNames= getDistinct(final_arr);
          let uniquePeopleStrings = new Set(final_arr.map(JSON.stringify));
          let uniquePeopleStringsArray = Array.from(uniquePeopleStrings);
          let uniquePeopleObjects = uniquePeopleStringsArray.map(JSON.parse);
          let filter_result = res.product_filters;
          let all_filters = res.all_filters;
          window.mainResults = uniquePeopleObjects;
          window.mainHitchResults = final_arr2;
          window.allSpareTiresHitch = final_arr3;

          $.each(uniquePeopleObjects, function (inx, item) {
            var product = item.product;
            var filter_arr = {};
            if (res.product_filters.length > 0) {
              $.each(filter_result, function (index, filter_item) {
                if (filter_item.product_title == product.title) {
                  filter_arr[filter_item.filter_key] = filter_item.meta_val;
                }
              });
            }
            item.filter_data = filter_arr;
          });
          $.each(all_filters, function (i, db_filter) {
            $.each(window.mainResults, function (n, item) {
              var product = item.product;
              // console.log('item.filter_data 1',item.filter_data)
              if (!item.filter_data.hasOwnProperty(db_filter.filter_key)) {
                item.filter_data[db_filter.filter_key] = "NA";
              }
            });
          });
          //hitch Results
          console.log('window.mainHitchResults',window.mainHitchResults)
          $.each(window.mainHitchResults, function (inx, item) {
            var product = item.product;
            var filter_arr = {};
            if (res.product_filters.length > 0) {
              $.each(filter_result, function (index, filter_item) {
                if (filter_item.product_title == product.title) {
                  filter_arr[filter_item.filter_key] = filter_item.meta_val;
                }
              });
            }
            item.filter_data = filter_arr;
          });
          // $.each(all_filters, function (i, db_filter) {
          //   $.each(window.mainHitchResults, function (n, item) {
          //     var product = item.product;
          //     if (!item.filter_data.hasOwnProperty(db_filter.filter_key)) {
          //     console.log("product: ",product.title,'db_filter.filter_key: ',db_filter.filter_key,'item.filter_data: ',item.filter_data)
          //       item.filter_data[db_filter.filter_key] = "NA";
          //     }
          //   });
          // });

          // window.mainHitchResults.forEach((item) => {
          //   console.log('Hitch item: ',item.filter_data, 'all_filters: ',all_filters)
          // })

          // Iterate over the array and update filter_data
          window.mainHitchResults.forEach(item => {
              const updatedFilterData = all_filters.reduce((acc, filter) => {
                  acc[filter.filter_key] = item.filter_data[filter.filter_key] || "NA";
                  return acc;
              }, {});
          
              Object.assign(item.filter_data, updatedFilterData);
              // console.log('updatedFilterData',updatedFilterData)
          });

          // console.log('final window.mainHitchResults',window.mainHitchResults)

          //SpareHitch Results
          $.each(window.allSpareTiresHitch, function (inx, item) {
            var product = item.product;
            // Object.assign(item.filter_data, {});
            item.filter_data = {};
            var filter_arr = {};
            if (res.product_filters.length > 0) {
              $.each(filter_result, function (index, filter_item) {
                // console.log('filter_item.product_title == product.title',(filter_item.product_title == product.title),filter_item.product_title , product.title)
                if (filter_item.product_title == product.title) {
                  filter_arr[filter_item.filter_key] = filter_item.meta_val;
                }
              });
            }
            // console.log(product.title,'filter_arr',filter_arr)
            // item.filter_data = filter_arr;
            Object.assign(item.filter_data, filter_arr);
          });

          $.each(all_filters, function (i, db_filter) {
            // console.log('db_filter.filter_key: ',db_filter.filter_key)
            $.each(window.allSpareTiresHitch, function (n, item) {
              var product = item.product;
              if (!item.filter_data.hasOwnProperty(db_filter.filter_key)) {
              // console.log('item.filter_data 3',item.filter_data)
                item.filter_data[db_filter.filter_key] = "NA";
              }
            });
          });
          
          // console.log('window.allSpareTiresHitch',window.allSpareTiresHitch)
          

          // window.allSpareTiresHitch.forEach((item) => {
          //   console.log('sparetire item: ',item)
          // })


          window.product_filters = res.product_filters;
          // console.log(window.product_filters)
          var width = $(window).width();
          if (width < 799) {
            $(".open-filter").removeClass("open-filter");
            $(".filter-custom-button").show();
          } else {
            // $('.open-filter').removeClass('open-filter')
            $(".filter-custom-button").hide();
          }
          // console.log('window.mainResults',window.mainResults);
          renderResults(
            window.mainResults,
            window.product_filters,
            mapped_skus,
            group1,
            jsonParam,
            res.productTranslations
          );

          $(".filter-wrapper").addClass("show-filter");
        });

      if (vehicle_replaceble_text.includes("undefined") == false) {
        $(".mobile-filter-wrapper").removeClass("mobile_hide");
      } else {
        alert("Please Slect All Option");
      }
    }
  });
  $(window).on("resize", function () {
    var width = $(window).width();
    if (width < 799) {
    } else {
      $(".filter-custom-button").hide();
    }
  });

  //Change Text and show hide filter button End

  $(".inner-title-wrapper").on("click", function () {
    var $this = $(this).parents(".list-items");
    if ($this.hasClass("active")) {
      $this.removeClass("active");
    } else {
      $this.addClass("active");
    }
  });

  //Remove Filter

  $(".remove-filter").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    var filter = $this.parents("li");
    filter.remove();
  });
  //Remove Filter End

  //Hitch on Vehicle
  $("body").on("change", "input[name='hitch_on_vehicle'], input[name='mobile-filter-filter_has_rear_spare_tire_']", function (e) {
    // console.log('here we go')
    $(`.hitch-class-chk`).removeClass("jplist-selected");
    $(`.hitch-class-chk`).prop("checked", false).trigger("change");
    $(`.hitch-size-chk`).removeClass("jplist-selected");
    $(`.hitch-size-chk`).prop("checked", false).trigger("change");


    var year_select = $("#year_select");
    var car_select = $("#make_select");
    var model_select = $("#model_select");
    var year_value = parseInt(year_select.val());
    var car_value = parseFloat(car_select.val());
    var model_value = parseFloat(model_select.val());
    var bodytype_val = parseFloat($("#bodytype_select").val());

    var group1 = false;
    if (isNaN(year_value) && isNaN(car_select) && isNaN(model_select)) {
      group1 = false;
    } else {
      group1 = true;
    }
    console.log('group1',group1)
    
    var hitchSize = $('input[name="hitch_size"]:checked').val();
    var HitchTireFlag = $("input[name='hitch_on_vehicle']").prop("checked");
    var SpareTireFlag = $("input[name='mobile-filter-filter_has_rear_spare_tire_']").prop("checked");
    var no_of_bikes = $('input[name="filter_no_of_bikes[]"]:checked')
      .map(function () {
        return $(this).val();
      })
      .toArray();
    var mounting_types = $('input[name="mounting_type_list[]"]:checked')
      .map(function () {
        return $(this).val();
      })
      .toArray();
    var HitchTire = false;
    // if ($(this).prop("checked") == false) {
    //   $("#mobile_hitch_yes").prop("checked", false);
    //   $("#mobile_hitch_no").prop("checked", false);
    //   $("#desktop-filter-hitch_size_1,#desktop-filter-hitch_size_2").prop(
    //     "checked",
    //     false
    //   );
    //   $(".js-size-selection").removeClass("active");
    //   var tempArr = HitchTireFlag
    //     ? window.mainResults.concat(allSpareTiresHitch)
    //     : window.mainResults;
    //   var data = window.mainResults;
    // } else {
    //   HitchTire = true;
    //   var tempArr = HitchTireFlag
    //     ? window.mainResults.concat(allSpareTiresHitch)
    //     : window.mainResults;
    //   $("#mobile_hitch_yes").prop("checked", true);
    //   $("#mobile_hitch_no").prop("checked", false);
    //   $(".js-size-selection").addClass("active");
    //   var data = $.grep(tempArr, function (element, index) {
    //     return element.isHitch == true;
    //   });
    // }

    // if(SpareTireFlag ){
    //   var tempArr = SpareTireFlag
    //     ? window.mainResults.concat(allSpareTiresHitch)
    //     : window.mainResults;
    //   // $("#mobile_hitch_yes").prop("checked", true);
    //   // $("#mobile_hitch_no").prop("checked", false);
    //   $(".js-size-selection").addClass("active");
    //   var data = $.grep(tempArr, function (element, index) {
    //     return element.isSpare == true;
    //   });
    // }
    // else{
    //   var tempArr = SpareTireFlag
    //     ? window.mainResults.concat(allSpareTiresHitch)
    //     : window.mainResults;
    //   var data = $.grep(tempArr, function (element, index) {
    //     return element.isSpare == false;
    //   });
    // }


    
    var tempArr = window.mainResults.concat(allSpareTiresHitch);
    //Hitch yes, SpareTire No: Show the spare tire hitch rack along with all other hitch racks, we want them to be aware this exists in case they may or may not have a spare tire, and this rack will fit with or without a spare tire.
    if(HitchTireFlag == true && SpareTireFlag == false){
      // console.log('1')
      $("#mobile_hitch_yes").prop("checked", true);
      $("#mobile_hitch_no").prop("checked", false);
      $(".js-size-selection").addClass("active");
      var data = $.grep(tempArr, function (element, index) {
        return element.isHitch == true;
      });
    }
    //Hitch Yes, Spare Tire Yes: ONLY show the hitch racks for spare tires, do not show the non-hitch racks
    else if(HitchTireFlag == true && SpareTireFlag == true){
      // console.log('2')
      $("#mobile_hitch_yes").prop("checked", true);
      $("#mobile_hitch_no").prop("checked", false);
      $(".js-size-selection").addClass("active");
      var data = $.grep(tempArr, function (element, index) {
        return element.isHitch == true && element.isSpare == true;
      });
    }
    //Hitch No, Spare Tire Yes: Show all spare tire rack with or without hitch.
    else if(HitchTireFlag == false && SpareTireFlag == true){
      // console.log('3')
      $("#mobile_hitch_yes").prop("checked", false);
      $("#mobile_hitch_no").prop("checked", false);
      $(".js-size-selection").removeClass("active");
      if(group1 == false){
        var data = $.grep(tempArr, function (element, index) {
          return element.isSpare == true;
        });
      }
      else{
        tempArr = window.mainResults;
        var data = $.grep(tempArr, function (element, index) {
          return element.isSpare == true;
        });
      }
    }
    else{
      //Hitch No, Spare tire No: Do not show any of the spare tire racks.
      // console.log('4')
      $("#mobile_hitch_yes").prop("checked", false);
      $("#mobile_hitch_no").prop("checked", false);
      $(".js-size-selection").removeClass("active");
      if(group1 == false){
        var data = $.grep(tempArr, function (element, index) {
          return element.isHitch == false && element.isSpare == false;
        });
      }
      else{
        // console.log('4 here')
        tempArr = allSpareTiresHitch;
        // tempArr = window.mainResults;
        var data = $.grep(tempArr, function (element, index) {
          return element.isHitch == false && element.isSpare == false;
        });
      }
      
    }
    
    var current_year = $("#year_select option:selected").val();
    var current_make_id = $("#make_select option:selected").val();
    var current_model_id = $("#model_select option:selected").val();
    var current_body_id = $("#bodytype_select option:selected").val();
    // return true;
    // console.log('user_rack_finder_data0',user_rack_finder_data0.vehicleInfo)
    if (current_year == false && user_rack_finder_data0 != null) {
      if (user_rack_finder_data0.vehicleInfo != null) {
        current_year = user_rack_finder_data0.vehicleInfo.year;
        current_make_id = user_rack_finder_data0.vehicleInfo.makeId;
        current_model_id = user_rack_finder_data0.vehicleInfo.modelId;
        current_body_id = user_rack_finder_data0.vehicleInfo.body_id;
      }
    }
    var spareTire = false;
    // console.log('spare tire',$('input[name="mobile_spare_tire"]:checked').val())
    if ($('input[name="mobile_spare_tire"]:checked').val() == true) {
      spareTire = true;
    }

    var jsonParam = {
      year: current_year,
      makeId: current_make_id,
      modelId: current_model_id,
      body_id: current_body_id,
      spareTire: spareTire,
      hitch: HitchTire,
    };
    // console.log("ready final data", data);
    // return true
    printResults(data, jsonParam);
  });

  // initFilter()

  $("body").on("click", "[data-reset-filter]", function (e) {
    e.preventDefault();
    $('input[type="radio"],input[type="checkbox"]')
      .removeAttr("checked")
      .prop("checked", false);
    $(".js-size-selection").removeClass("active");
    var HitchTireFlag = $("input[name=mobile_hitch]").prop("checked");
    var tempArr = HitchTireFlag
      ? window.mainResults.concat(mainHitchResults)
      : window.mainResults;
    // console.log(tempArr);
    if (!tempArr) {
      tempArr = allSpareTiresHitch;
    }
    printResults(tempArr);
  });

  $("body").on("click", ".js-view-icon", function (e) {
    e.preventDefault();
    var view = $(this).attr("data-view");
    $("body").attr("data-filter-view", view);
  });

  $(".filter-btn-wrapper").on("click", function () {
    var $filter = $(".js-sticky-sidebar-filter");
    console.log("filyter", $filter);
    if ($filter.hasClass("filter_show")) {
      $filter.removeClass("filter_show");
    } else {
      $filter.addClass("filter_show");
    }
  });

  $("body").on("change", ".variant-dropdown", function (e) {
    $(this).removeClass("error");
    console.log('this',$(this).find('option:selected').attr('data-savings'),$(this).val())
    var $parent = $(this).parents(".product-container-wrapper");
    var variant_json = JSON.parse($(this).attr("data-variants"));
    var variant_imgs = JSON.parse($(this).attr("data-variants_images_json"));
    if ($(this).val() != "") {
      $parent
        .find(".atc-link-btn")
        .removeAttr("disabled")
        .removeClass("btn_gray")
        .addClass("btn_black btn_hover_red");
    } else {
      $parent
        .find(".atc-link-btn")
        .removeClass("btn_black btn_hover_red")
        .addClass("btn_gray")
        .attr("disabled", true);
    }

    var selected_opt = $("option:selected", $(this));
    // console.log(selected_opt.val());
    if (selected_opt.val().length > 0) {
      var selcted_var = variant_json.filter(function (v) {
        return v.id == selected_opt.val();
      });
      var variant_meta = product_variants.filter(function (v) {
        return v.id == parseFloat(selected_opt.val());
      })[0];
      if (selcted_var) {
        var price_html = "";
        if (selcted_var[0].compare_at_price != null) {
          price_html += `
          <div class="grid-product__price">
            <span class="visually-hidden">Sale price</span>
            <span class="grid-product__price--current">
              <span aria-hidden="true">${Shopify.formatMoneyCustom(
                selcted_var[0].price,
                "${{amount}}"
              )}</span>
              <span class="visually-hidden">${Shopify.formatMoneyCustom(
                selcted_var[0].price,
                "${{amount}}"
              )}</span>
            </span>
            <span class="visually-hidden">Regular price</span>
            <span class="grid-product__price--original">
              <span aria-hidden="true">${Shopify.formatMoneyCustom(
                selcted_var[0].compare_at_price,
                "${{amount}}"
              )}</span>
              <span class="visually-hidden">${Shopify.formatMoneyCustom(
                selcted_var[0].compare_at_price,
                "${{amount}}"
              )}</span>
            </span>
            </div>`;
        } else {
          price_html += `<span class="grid-product__price--current">
          <span aria-hidden="true" class="grid-product__price--from">${Shopify.formatMoneyCustom(
            selcted_var[0].price,
            "${{amount}}"
          )}</span>
          <span class="visually-hidden"><span>from</span>${Shopify.formatMoneyCustom(
            selcted_var[0].price,
            "${{amount}}"
          )}</span>
          </span>`;
        }
        var price = $(this).find('option:selected').attr('data-price'),
          compare_price = $(this).find('option:selected').attr('data-compare-price');
         if($(this).find('option:selected').attr('data-savings') != 'false'){   
           price_html = ''
          price_html += `
          <div class="grid-product__price">
            <span class="visually-hidden">Sale price</span>
            <span class="grid-product__price--current">
              <span aria-hidden="true">${Shopify.formatMoneyCustom(
                price,
                "${{amount}}"
              )}</span>
              <span class="visually-hidden">${Shopify.formatMoneyCustom(
                price,
                "${{amount}}"
              )}</span>
            </span>
            <span class="visually-hidden">Regular price</span>
            <span class="grid-product__price--original">
              <span aria-hidden="true">${Shopify.formatMoneyCustom(
                compare_price,
                "${{amount}}"
              )}</span>
              <span class="visually-hidden">${Shopify.formatMoneyCustom(
                compare_price,
                "${{amount}}"
              )}</span>
            </span>
            <span class="product__price-savings on-sale">Save 25%</span>
            </div>`;
         }
        // console.log('selcted_var',price_html)
        $parent.find(".grid-product__price").html(price_html);
        $parent.find(".modal_price").addClass("visible");
        $parent.find(".pre-title").addClass("visible");
        $parent
          .find(".modal_price .product_price_number")
          .html(selcted_var[0].price);
        $parent.find(".modal_price p").html("$" + selcted_var[0].price);
        $parent.find(".pre-title p").html(selcted_var[0].sku);
        $parent.find(".atc-link-btn").attr("data-variant", selcted_var[0].id);
        var img_obj = variant_imgs.filter((i) => {
          return i.variant_ids.indexOf(selcted_var[0].id) > -1;
        })[0];
        if (img_obj != undefined) {
          $parent
            .find(".product_image__container>img")
            .attr("src", img_obj.src.imgURL("500x500"));
        }
        if (variant_meta != undefined) {
          $parent.find(".product-imp-text").addClass("visible");
          $parent
            .find(".product-imp-text p")
            .html(
              `*Fits ${
                variant_meta.meta_val.toString().indexOf("1 ¼") > -1
                  ? '1 1/4" & 2"'
                  : '2"'
              } inch hitch receiver`
            );
        } else {
          $parent.find(".product-imp-text").removeClass("visible");
        }
      } else {
        $parent.find(".modal_price").removeClass("visible");
        $parent.find(".pre-title").removeClass("visible");
        $parent.find(".product-imp-text").removeClass("visible");
      }
    } else {
      $parent.find(".modal_price").removeClass("visible");
      $parent.find(".pre-title").removeClass("visible");
      $parent.find(".product-imp-text").removeClass("visible");
    }
  });
  function getUpsell() {
    fetch(window.location.pathname + "?ts=" + Date.now()).then((res) => {
      var section = $(res.header);
      var cloned_upsll = section.find(".js-minicart-upsell").clone();
      console.log($(cloned_upsll).find(".upsell-slide"));
      $("#Minicart-mySidebar .js-minicart-upsell")
        .empty()
        .html(cloned_upsll)
        .show();
    });
  }
  $("body").on("click", ".atc-link-btn", function (e) {
    var $this = $(this);
    var $parent = $(this).parents(".product_detail__container");
    var $select = $parent.find("select.variant-dropdown");
    $select.removeClass("error");
    if ($("option:selected", $select).val().length > 0) {
      $this.text("Adding...");
      var id = parseFloat($(this).attr("data-variant"));
      $.ajax({
        url: "/cart/add.js",
        dataType: "json",
        cache: false,
        type: "post",
        data: { id: id, quantity: 1 },
        success: function (cart) {
          $this.text("Added to cart");
          publish(EVENTS.ajaxProductAdded, {
            detail: {
              product: cart,
              addToCartBtn: null,
            },
          });
          setTimeout(function () {
            $this.text("Add to cart");
            $("body").trigger("refreshCart");
            if ($("#header").is(":visible")) {
              $(".cart_container .cart_content").show();
              $("#Minicart-mySidebar").css("transform", "translateX(0px)");
              $("#myOverlay").fadeIn();
            } else if ($(".sticky_nav--stick").length) {
              $(".cart_container .cart_content").show();
              $("#Minicart-mySidebar").css("transform", "translateX(0px)");
              $("#myOverlay").fadeIn();
            } else {
              $(".cart_container .cart_content").show();
              $("#Minicart-mySidebar").css("transform", "translateX(0px)");
              $("#myOverlay").fadeIn();
            }
          }, 500);
        },
      });
    } else {
      $select.addClass("error");
      return false;
    }
  });
});

fetch("/collections/products?view=alt-ajax")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    if ($("#js-rack-filter-wrapper").length) {
      const parser = new DOMParser(),
        dom = parser.parseFromString(data, "text/html"),
        newContent = document.querySelector("#js-rack-filter-wrapper"); // Get the content to replace
      // console.log('newContent',)

      // if (newContent) {
      //   $('#js-rack-filter-wrapper').append(dom.body.innerHTML); // Set the new content
      // } else {
      //   console.warn('#js-rack-filter-wrapper not found in fetched data.');
      // }
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

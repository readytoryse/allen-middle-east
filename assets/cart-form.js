import "@archetype-themes/scripts/config";
import "@archetype-themes/scripts/modules/cart-api";
import QtySelector from "@archetype-themes/scripts/modules/quantity-selectors";
import "@archetype-themes/scripts/helpers/currency";

/*============================================================================
  CartForm
  - Prevent checkout when terms checkbox exists
  - Listen to quantity changes, rebuild cart (both widget and page)
==============================================================================*/
var upSell = function () {
  //upsell js
  fetch(window.Shopify.routes.root + "cart.js")
    .then((response) => response.json())
    .then((cart) => {
      if (is_home == "cart") var $cart = $("#CartPageForm");
      else var $cart = $(".site-header__drawer-animate form");

      var found_upsell_product = [];
      var product_list_limit = parseInt(window.product_list_limit),
        products_per_page = parseInt(window.products_per_page);
      $.each(cart.items, function (index, product) {
        var found_upsell = false;
        // console.log(cart.items);
        $.each(window.upsell_products, function (index, ele) {
          if (product.product_id == ele.upsell_parent_id) {
            found_upsell = true;
            found_upsell_product.push(ele);
            // console.log(found_upsell_product)
          }
        });
      });
      // console.log(found_upsell_product)
      found_upsell_product = getDistinct_variants(found_upsell_product);

      var upsellCount = found_upsell_product;
      var last_upsell = [];

      var upsell_slider_config = {
        dots: true,
        arrows: false,
        easing: "linear",
        slidesToShow: products_per_page,
        slidesToScroll: products_per_page,
        cssEase: "ease",
        infinite: false,
        loop: false,
      };
      $.each(found_upsell_product, function (inx, ele) {
        var matching = false;
        $.each(cart.items, function (index, product) {
          if (product.variant_id == ele.upsell_variant_id) {
            matching = true;
          }
        });
        if (matching == false) {
          last_upsell.push(ele);
        }
      });
      // console.log(last_upsell)
      last_upsell = getDistinct_variants(last_upsell);
      if (last_upsell.length > product_list_limit) {
        upsellCount = last_upsell.slice(0, product_list_limit);
      } else {
        upsellCount = last_upsell;
      }
      // console.log(upsellCount)
      if (upsellCount.length > 0) {
        $(".js-minicart-upsell").show();
        var str_upsell = ``;
        $.each(upsellCount, function (index, ele) {
          var title = ele.upsell_title;
          // console.log(title)
          var prod_link = "";
          if (ele.upsell_variants_size > 1) {
            prod_link = `<a class="red-btn btn add-product" href="${ele.upsell_url}">SEE OPTIONS</a>`;
          } else {
            prod_link = `<a class="red-btn btn js-add-product" href="javascript:;" data-variant-id="${ele.upsell_variant_id}">ADD+</a>`;
          }
          str_upsell += `<div class="one-third column upsell-slide">
                <div class="product-slider-inner-box">
                <div class="product-box">
                  <a href="${ele.upsell_url}">
                    <img src="${ele.upsell_image}" />
                    <div class="product-content">
                        <h2 class="product-name">${ele.upsell_title}</h2>
                        <div class="modal_price">
                            <p class="price">${ele.upsell_price}</p>
                        </div>
                    </div>
                  </a>
                </div>
                ${prod_link}
                </div>
                </div>`;
        });
        if ($(".js-upsell-slider").hasClass("slick-initialized")) {
          $(".js-upsell-slider").slick("unslick");
        }
        $(".js-upsell-wrapper").empty().append(str_upsell);
        if($(".js-upsell-wrapper .one-third").length > 3){
           $(".js-upsell-slider").slick(upsell_slider_config)
           $(".js-upsell-slider").slick('refresh'); 
        }
      } else {
        $(".js-upsell-wrapper").empty();
        $(".js-minicart-upsell").hide();
      }
    });
  // upsell js end
};
$(document).ready(function(){
    upSell()      
})
export default class CartForm {
  constructor(form) {
    this.selectors = {
      products: "[data-products]",
      qtySelector: ".js-qty__wrapper",
      discounts: "[data-discounts]",
      savings: "[data-savings]",
      subTotal: "[data-subtotal]",

      cartBubble: ".cart-link__bubble",
      cartNote: '[name="note"]',
      termsCheckbox: ".cart__terms-checkbox",
      checkoutBtn: ".cart__checkout",
    };

    this.classes = {
      btnLoading: "btn--loading",
    };

    this.config = {
      requiresTerms: false,
    };

    if (!form) {
      return;
    }

    this.form = form;
    this.wrapper = form.parentNode;
    this.location = form.dataset.location;
    this.namespace = ".cart-" + this.location;
    this.products = form.querySelector(this.selectors.products);
    this.submitBtn = form.querySelector(this.selectors.checkoutBtn);

    this.discounts = form.querySelector(this.selectors.discounts);
    this.savings = form.querySelector(this.selectors.savings);
    this.subtotal = form.querySelector(this.selectors.subTotal);
    this.termsCheckbox = form.querySelector(this.selectors.termsCheckbox);
    this.noteInput = form.querySelector(this.selectors.cartNote);

    this.cartItemsUpdated = false;

    if (this.termsCheckbox) {
      this.config.requiresTerms = true;
    }

    this.init();
  }

  init() {
    this.initQtySelectors();

    document.addEventListener(
      "cart:quantity" + this.namespace,
      this.quantityChanged.bind(this)
    );

    this.form.on("submit" + this.namespace, this.onSubmit.bind(this));

    if (this.noteInput) {
      this.noteInput.addEventListener("change", function () {
        const newNote = this.value;
        theme.cart.updateNote(newNote);
      });
    }

    // Dev-friendly way to build the cart
    document.addEventListener(
      "cart:build",
      function () {
        this.buildCart();
      }.bind(this)
    );
  }

  reInit() {
    this.initQtySelectors();
  }
  onSubmit(evt) {
    this.submitBtn.classList.add(this.classes.btnLoading);

    /*
      Checks for drawer or cart open class on body element
      and then stops the form from being submitted. We are also
      checking against a custom property, this.cartItemsUpdated = false.

      Error is handled in the quantityChanged method

      For Expanse/Fetch/Gem/Vino quick add, if an error is present it is alerted
      through the add to cart fetch request in quick-add.js.

      Custom property this.cartItemsUpdated = false is reset in cart-drawer.js for
      Expanse/Fetch/Gem/Vino when using quick add
    */

    if (
      (document.documentElement.classList.contains("js-drawer-open") &&
        this.cartItemsUpdated) ||
      (document.documentElement.classList.contains("cart-open") &&
        this.cartItemsUpdated)
    ) {
      this.submitBtn.classList.remove(this.classes.btnLoading);
      evt.preventDefault();
      return false;
    }

    if (this.config.requiresTerms) {
      if (this.termsCheckbox.checked) {
        // continue to checkout
      } else {
        alert(theme.strings.cartTermsConfirmation);
        this.submitBtn.classList.remove(this.classes.btnLoading);
        evt.preventDefault();
        return false;
      }
    }
    upSell();
  }

  /*============================================================================
    Query cart page to get markup
  ==============================================================================*/
  _parseProductHTML(text) {
    const html = document.createElement("div");
    html.innerHTML = text;

    return {
      items: html.querySelector(".cart__items"),
      discounts: html.querySelector(".cart__discounts"),
    };
  }

  buildCart() {
    upSell();
    return theme.cart.getCartProductMarkup().then(this.cartMarkup.bind(this));
  }

  cartMarkup(text) {
    const markup = this._parseProductHTML(text);
    const items = markup.items;
    const count = parseInt(items.dataset.count);
    const subtotal = items.dataset.cartSubtotal;
    const savings = items.dataset.cartSavings;

    this.updateCartDiscounts(markup.discounts);
    this.updateSavings(savings);

    if (count > 0) {
      this.wrapper.classList.remove("is-empty");
    } else {
      this.wrapper.classList.add("is-empty");
    }

    this.updateCount(count);

    // Append item markup
    this.products.innerHTML = "";
    this.products.append(items);

    // Update subtotal
    this.subtotal.innerHTML = theme.Currency.formatMoney(
      subtotal,
      theme.settings.moneyFormat
    );

    this.reInit();

    if (Shopify && Shopify.StorefrontExpressButtons) {
      Shopify.StorefrontExpressButtons.initialize();
    }
    var that = this;
    //upsell js
    fetch(window.Shopify.routes.root + "cart.js")
      .then((response) => response.json())
      .then((cart) => {
        $("body").on("click", ".js-add-product", function (e) {
          // e.preventDefault();
          var $this = $(this);
          $this.text("ADDING...");
          var id = parseFloat($(this).attr("data-variant-id"));

          $.ajax({
            url: "/cart/add.js",
            dataType: "json",
            cache: false,
            type: "post",
            data: { id: id, quantity: 1 },
            success: function (cart) {
              $this.text("ADDED TO CART");
              setTimeout(function () {
                $this.text("ADD+");
                that.buildCart();
               window.dispatchEvent(new Event('resize'));
              }, 500);
            },
          });
        });
      });
  }

  updateCartDiscounts(markup) {
    if (!this.discounts) {
      return;
    }
    this.discounts.innerHTML = "";
    this.discounts.append(markup);
  }

  /*============================================================================
    Quantity handling
  ==============================================================================*/
  initQtySelectors() {
    this.form.querySelectorAll(this.selectors.qtySelector).forEach((el) => {
      const selector = new QtySelector(el, {
        namespace: this.namespace,
        isCart: true,
      });
    });
  }

  quantityChanged(evt) {
    const key = evt.detail[0];
    const qty = evt.detail[1];
    const el = evt.detail[2];

    if (!key || !qty) {
      return;
    }

    // Disable qty selector so multiple clicks can't happen while loading
    if (el) {
      el.classList.add("is-loading");
    }

    theme.cart
      .changeItem(key, qty)
      .then(
        function (cart) {
          const parsedCart = JSON.parse(cart);

          if (parsedCart.status === 422) {
            alert(parsedCart.message);
          } else {
            const updatedItem = parsedCart.items.find(
              (item) => item.key === key
            );

            // Update cartItemsUpdated property on object so we can reference later
            if (
              updatedItem &&
              (evt.type === "cart:quantity.cart-cart-drawer" ||
                evt.type === "cart:quantity.cart-header")
            ) {
              this.cartItemsUpdated = true;
            }

            if (
              (updatedItem && evt.type === "cart:quantity.cart-cart-drawer") ||
              (updatedItem && evt.type === "cart:quantity.cart-header")
            ) {
              if (updatedItem.quantity !== qty) {
              }
              // Reset property on object so that checkout button will work as usual
              this.cartItemsUpdated = false;
            }

            if (parsedCart.item_count > 0) {
              this.wrapper.classList.remove("is-empty");
            } else {
              this.wrapper.classList.add("is-empty");
            }
          }

          this.buildCart();

          document.dispatchEvent(
            new CustomEvent("cart:updated", {
              detail: {
                cart: parsedCart,
              },
            })
          );
        }.bind(this)
      )
      .catch(function (XMLHttpRequest) {});
  }

  /*============================================================================
    Update elements of the cart
  ==============================================================================*/
  updateSubtotal(subtotal) {
    this.form.querySelector(this.selectors.subTotal).innerHTML =
      theme.Currency.formatMoney(subtotal, theme.settings.moneyFormat);
  }

  updateSavings(savings) {
    if (!this.savings) {
      return;
    }

    if (savings > 0) {
      const amount = theme.Currency.formatMoney(
        savings,
        theme.settings.moneyFormat
      );
      this.savings.classList.remove("hide");
      this.savings.innerHTML = theme.strings.cartSavings.replace(
        "[savings]",
        amount
      );
    } else {
      this.savings.classList.add("hide");
    }
  }

  updateCount(count) {
    const countEls = document.querySelectorAll(".cart-link__bubble-num");

    if (countEls.length) {
      countEls.forEach((el) => {
        el.innerText = count;
      });
    }

    // show/hide bubble(s)
    const bubbles = document.querySelectorAll(this.selectors.cartBubble);
    if (bubbles.length) {
      if (count > 0) {
        bubbles.forEach((b) => {
          b.classList.add("cart-link__bubble--visible");
        });
      } else {
        bubbles.forEach((b) => {
          b.classList.remove("cart-link__bubble--visible");
        });
      }
    }
  }
}

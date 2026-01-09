import { EVENTS, publish, subscribe } from '@archetype-themes/utils/pubsub'

class BlockBuyButtons extends HTMLElement {
  connectedCallback() {
    this.addEventListener('submit', this.handleSubmit.bind(this))

    this.variantChangeUnsubscriber = subscribe(
      `${EVENTS.variantChange}:${this.dataset.productId}`,
      this.handleVariantChange.bind(this)
    )
    this.cartType = this.dataset.cartType
  }

  disconnectedCallback() {
    this.variantChangeUnsubscriber()
  }

  handleVariantChange({ detail }) {
    const { html, variant } = detail

    var productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`)
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonSpan = productForm.querySelector('[name="add"] > span');    
    // Store the original button text
    if(addButton){
    let originalText = addButtonSpan.dataset.originalText || addButtonSpan.textContent;    
    if (!addButtonSpan.dataset.originalText) {
      addButtonSpan.dataset.originalText = originalText;
    }
    }
    var allSelected = true;
    var missingOptions = [];

    document.querySelectorAll('.variant-input-wrap').forEach(function(div) {
        if (div) {
          const optionLabel =  div.querySelector('input[type="radio"]').getAttribute('name');

          // Find the checked div input in this variant group
          const checkedInput = div.querySelector('input[type="radio"]:checked');
    
          if (!checkedInput) {
            // If an option isn't selected, mark it as missing
            missingOptions.push(optionLabel);
            allSelected = false;
          }
          // Perform any action with the selected values
        } 
        if(allSelected == false){
          addButtonSpan.textContent = 'Select - ' + missingOptions.join(', ');
        }
    });
    if (!variant && allSelected) {
      this.toggleAddButton(true, this.getLocales().unavailable)
      setTimeout(()=>{
        $('#esc-oos-form').remove()
        addButton.classList.remove('hide')
      },200)
      return
    }
    if(variant && variant.available){
      setTimeout(()=>{
        $('#esc-oos-form').remove()
        addButton.classList.remove('hide')
      },200)
    }
    this.updateVariantInput(variant)
    this.renderProductInfo(html)
  }

  renderProductInfo(html) {
    if(html != null){
      const addButtonUpdated = html.getElementById(`ProductSubmitButton-${this.dataset.sectionId}`)
  
      if (addButtonUpdated) {
        this.toggleAddButton(addButtonUpdated.hasAttribute('disabled'), this.getLocales().soldOut)
      }
    }
  }

  getLocales() {
    this.locales = this.locales || JSON.parse(this.querySelector('[type="application/json"]').textContent)
    return this.locales
  }

  toggleAddButton(disable = true, text) {
    const productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`)

    if (!productForm) return

    const addButton = productForm.querySelector('[name="add"]')
    const addButtonText = productForm.querySelector('[name="add"] > span')

    if (!addButton) return
    if (disable) {
      addButton.setAttribute('disabled', 'disabled')
      addButton.classList.add('hide');
      if (text) addButtonText.textContent = text
      addButton.classList.add('btn_gray')
      addButton.classList.remove('btn_hover_red')
    } else {
      addButton.removeAttribute('disabled')
      addButton.classList.remove('btn_gray')
      addButton.classList.remove('hide');
      addButton.classList.add('btn_hover_red')
      if(addButton.classList.contains('preorder')){
         addButtonText.textContent = this.getLocales().preorder
      }else{
       addButtonText.textContent = this.getLocales().addToCart
      }
    }
  }

  updateVariantInput(variant) {
    const productForms = this.querySelectorAll(
      `#product-form-${this.dataset.sectionId}, #product-form-installment-${this.dataset.sectionId}`
    )
    if(variant){
      productForms.forEach((productForm) => {
        const input = productForm.querySelector('input[name="id"]')
        input.value = variant.id
  
        input.dispatchEvent(new Event('change', { bubbles: true }))
      })
    }
  }

  async handleSubmit(event) {
    if (this.cartType == 'page') return

    event.preventDefault()
    var productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`),
    value = productForm.querySelector(`input[name='id']`).value,
    variant_title = this.getAttribute('data-variant-title');
    var addButtonText = productForm.querySelector('[name="add"] > span').textContent
    
     if(value == ''){
       alert('Please ' + addButtonText )
       return false
     }
    
    this.disableAddToCartButton()

    try {
      const responseJson = await this.addVariantToCart()

      publish(EVENTS.ajaxProductAdded, {
        detail: {
          product: responseJson,
          addToCartBtn: this.querySelector(`#ProductSubmitButton-${this.dataset.sectionId}`)
        }
      })
    } catch (error) {
      this.handleError(error)
    } finally {
      this.enableAddToCartButton()
    }
  }

  handleError(error) {
    if (!error.description) {
      console.warn(error)
      return
    }

    let form = this.querySelector('form')
    let errors = this.querySelector('form .errors')

    if (errors) errors.remove()

    let errorDiv = document.createElement('div')
    errorDiv.classList.add('errors', 'text-center')

    if (typeof error.description === 'object') {
      errorDiv.textContent = error.message
    } else {
      errorDiv.textContent = error.description
    }

    form.append(errorDiv)

    publish(EVENTS.ajaxProductError, {
      detail: {
        errorMessage: error.description
      }
    })
  }

  async addVariantToCart() {    
    var productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`);

      const formData = this.getFormDataWithSections()

      const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: formData
      })

      if (!response.ok) {
        throw await response.json()
      }

      return response.json()
  }

  async fetchCart() {
    return (await fetch(`${window.Shopify.routes.root}cart.js`)).json()
  }

  getFormDataWithSections() {
    const productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`)
    const formData = new FormData(productForm)

    formData.set('sections_url', `${window.Shopify.routes.root}variants/${productForm.id.value}`)

    return formData
  }

  enableAddToCartButton() {
    const productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`)

    if (!productForm) return

    const addButton = productForm.querySelector('[name="add"]')
    addButton.removeAttribute('aria-busy')
    addButton.classList.remove('btn--loading')
  }

  disableAddToCartButton() {
    const productForm = this.querySelector(`#product-form-${this.dataset.sectionId}`)
    const errors = this.querySelector('form .errors')

    if (errors) errors.remove()
    if (!productForm) return

    const addButton = productForm.querySelector('[name="add"]')
    addButton.setAttribute('aria-busy', 'true')
    addButton.classList.add('btn--loading')
  }
}

customElements.define('block-buy-buttons', BlockBuyButtons)

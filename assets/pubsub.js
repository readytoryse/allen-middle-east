export function subscribe(eventName, callback) {
  let cb = (event) => callback(event)

  document.addEventListener(eventName, cb)

  return function unsubscribe() {
    document.removeEventListener(eventName, cb)
  }
}

export function publish(eventName, options) {
  document.dispatchEvent(new CustomEvent(eventName, options))
}

export const EVENTS = {
  variantChange: 'variant:change',
  collectionLoaded:'collection:reloaded',
  recommendationLoaded:'recommendations:loaded',
  ajaxProductError: 'ajaxProduct:error',
  ajaxProductAdded: 'ajaxProduct:added',
  testimonials_loaded: 'testimonials:loaded',
  cartUpdated:'cart:updated'
}

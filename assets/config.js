export const config = {
  bpSmall: false,
  youTubeReady: false,
  vimeoReady: false,
  vimeoLoading: false,
  mediaQuerySmall: 'screen and (max-width: ' + 769 + 'px)',
  isTouch:
    'ontouchstart' in window ||
    (window.DocumentTouch && window.document instanceof DocumentTouch) ||
    window.navigator.maxTouchPoints ||
    window.navigator.msMaxTouchPoints
      ? true
      : false
}

// Trigger events when going between breakpoints
config.bpSmall = matchMedia(config.mediaQuerySmall).matches
matchMedia(config.mediaQuerySmall).addListener(function (mql) {
  if (mql.matches) {
    config.bpSmall = true
    document.dispatchEvent(new CustomEvent('matchSmall'))
  } else {
    config.bpSmall = false
    document.dispatchEvent(new CustomEvent('unmatchSmall'))
  }
})

// TODO: remove the code below; export config variables from this module only like the ones above
/**
 * Default config
 * Defines global theme configuration
 * This can be overriden at the theme level
 */

import '@archetype-themes/scripts/helpers/init-globals'
window.theme = window.theme || {}
window.Shopify = window.Shopify || {}

theme.config = {
  bpSmall: false,
  hasSessionStorage: true,
  hasLocalStorage: true,
  mediaQuerySmall: 'screen and (max-width: ' + 769 + 'px)',
  youTubeReady: false,
  vimeoReady: false,
  vimeoLoading: false,
  isTouch:
    'ontouchstart' in window ||
    (window.DocumentTouch && window.document instanceof DocumentTouch) ||
    window.navigator.maxTouchPoints ||
    window.navigator.msMaxTouchPoints
      ? true
      : false,
  stickyHeader: false,
  rtl: document.documentElement.getAttribute('dir') == 'rtl' ? true : false
}

if (theme.config.isTouch) {
  document.documentElement.className += ' supports-touch'
}

// Filters clone for mobile
theme.filtersPrime = null

theme.isStorageSupported = function (type) {
  // Return false if we are in an iframe without access to sessionStorage
  if (window.self !== window.top) {
    return false
  }

  var testKey = 'test'
  var storage
  if (type === 'session') {
    storage = window.sessionStorage
  }
  if (type === 'local') {
    storage = window.localStorage
  }

  try {
    storage.setItem(testKey, '1')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

;(function () {
  'use strict'

  /*============================================================================
    Things that don't require DOM to be ready
  ==============================================================================*/
  theme.config.hasSessionStorage = theme.isStorageSupported('session')
  theme.config.hasLocalStorage = theme.isStorageSupported('local')

  // Trigger events when going between breakpoints
  theme.config.bpSmall = matchMedia(theme.config.mediaQuerySmall).matches
  matchMedia(theme.config.mediaQuerySmall).addListener(function (mql) {
    if (mql.matches) {
      theme.config.bpSmall = true
      document.dispatchEvent(new CustomEvent('matchSmall'))
    } else {
      theme.config.bpSmall = false
      document.dispatchEvent(new CustomEvent('unmatchSmall'))
    }
  })

  /*============================================================================
    Things that require DOM to be ready
  ==============================================================================*/
  function DOMready(callback) {
    if (document.readyState != 'loading') callback()
    else document.addEventListener('DOMContentLoaded', callback)
  }

  DOMready(function () {
    
    initMobileNav();
    hoverMenu();
    theme.initGlobals()

    document.dispatchEvent(new CustomEvent('page:loaded'))
  })
  function hoverMenu() {
    var detailsEl = document.querySelectorAll('[data-section-type="header"] details[data-hover="true"]')
    detailsEl.forEach((detail) => {
      const summary = detail.querySelector('summary')
      const summaryLink = summary.dataset.link

      summary.addEventListener('click', (e) => {
        e.preventDefault()

        if (!detail.hasAttribute('open')) {
          detail.setAttribute('open', '')
          detail.setAttribute('aria-expanded', 'true')
        } else {
          window.location.href = summaryLink
        }
      })

      detail.addEventListener('focusout', (e) => {
        const isChild = detail.contains(e.relatedTarget)

        if (!isChild) {
          detail.removeAttribute('open')
          detail.setAttribute('aria-expanded', 'false')
        }
      })

      detail.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detail.hasAttribute('open')) {
          detail.removeAttribute('open')
          detail.setAttribute('aria-expanded', 'false')
          summary.focus()
        }
      })

      detail.addEventListener('mouseover', () => {
        if (!detail.hasAttribute('open')) {
          detail.setAttribute('open', '')
          detail.setAttribute('aria-expanded', 'true')
        }
      })

      detail.addEventListener('mouseleave', () => {
        if (detail.hasAttribute('open')) {
          detail.removeAttribute('open')
          detail.setAttribute('aria-expanded', 'false')
        }
      })
    })
  }
  function initMobileNav() {
    document.body.addEventListener('click', function (e) {
      const trigger = e.target.closest('.mobile-nav-trigger');
      const cartBtn = e.target.closest('.mobile-cart');
      const closeCartBtn = e.target.closest('.custom-js-close-header-cart');
    
      if (trigger) {
        document.documentElement.classList.toggle('mobile-nav-open');
        trigger.classList.toggle('is-active');
        document.getElementById('MobileNav')?.classList.toggle('is-active');
        document.querySelector('.site-header__cart')?.classList.remove('is-active');
        document.body.classList.remove('cart-open');
      }
    
      if (cartBtn) {
        e.preventDefault();
        document.documentElement.classList.remove('mobile-nav-open');
        document.querySelector('.mobile-nav-trigger')?.classList.remove('is-active');
        document.getElementById('MobileNav')?.classList.remove('is-active');
        document.querySelector('.site-header__cart')?.classList.toggle('is-active');
        document.body.classList.toggle('cart-open');
        window.dispatchEvent(new Event('resize'));
      }
    
      if (closeCartBtn) {
        e.preventDefault();
        document.querySelector('.site-header__cart')?.classList.remove('is-active');
        document.body.classList.remove('cart-open');
      }
    });


    const selectors = {
      wrapper: '.slide-nav__wrapper',
      nav: '.slide-nav',
      childList: '.slide-nav__dropdown',
      subNavToggleBtn: '.js-toggle-submenu',
      openBtn: '.mobile-nav-trigger'
    };
  
    const classes = {
      isActive: 'is-active'
    };
  
    const defaults = {
      isOpen: false,
      menuLevel: 1,
      inHeader: false
    };
  
    const wrapper = document.querySelector(selectors.wrapper);
    const nav = document.querySelector(selectors.nav);
  
    function setWrapperHeight(height) {
      if (wrapper) {
        wrapper.style.height = height + 'px';
      }
    }
  
    function goToSubnav(target, currentTarget) {
      const targetMenu = nav.querySelector(`${selectors.childList}[data-parent="${target}"]`);
  
      if (targetMenu) {
        defaults.menuLevel = parseInt(targetMenu.dataset.level, 10);
  
        // Hide level 3 menus if moving to level 2
        if (defaults.menuLevel === 2) {
          nav.querySelectorAll(`${selectors.childList}[data-level="3"]`).forEach((list) => {
            list.classList.remove(classes.isActive);
          });
        }
  
        targetMenu.classList.toggle(classes.isActive);
        currentTarget.classList.toggle('js-active-submenu');
        setWrapperHeight(targetMenu.offsetHeight);
      } else {
        // Reset to top level
        defaults.menuLevel = 1;
        if (wrapper) wrapper.removeAttribute('style');
        nav.querySelectorAll(selectors.childList).forEach((list) => {
          list.classList.remove(classes.isActive);
        });
      }
  
      if (wrapper) {
        wrapper.dataset.level = defaults.menuLevel;
      }
    }
  
    // Attach click listeners to submenu toggle buttons
    document.querySelectorAll(selectors.subNavToggleBtn).forEach((btn) => {
      btn.addEventListener('click', function () {
        const target = btn.dataset.target;
        goToSubnav(target, btn);
      });
    });
  
    // Optional: attach open/close behavior if needed
    const openBtn = document.querySelector(selectors.openBtn);
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        defaults.isOpen = !defaults.isOpen;
        document.documentElement.classList.toggle('mobile-nav-open');
        openBtn.classList.toggle('is-active');
        nav.classList.toggle('is-active');
      });
    }
  }
  
})()
















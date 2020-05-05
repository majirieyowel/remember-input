'use strict';

/**
 * Generate initial array with elements as objects
 */
var elements = function elements(selector) {
  var elements = parentWrap(selector).querySelectorAll("input, select, textarea");
  return Array.prototype.map.call(elements, function (node) {
    return {
      node: node
    };
  });
};
var parentWrap = function parentWrap(selector) {
  return document.querySelector(".".concat(selector));
};
var elementExists = function elementExists(selector) {
  return !!parentWrap(selector);
};
var isForm = function isForm(selector) {
  return parentWrap(selector).tagName.toLowerCase() === 'form';
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function slugify(string) {
  var a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  var b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  var p = new RegExp(a.split("").join("|"), "g");
  return string.toString().toLowerCase().replace(/\s+/g, "") // Replace spaces with ''
  .replace(p, function (c) {
    return b.charAt(a.indexOf(c));
  }) // Replace special characters
  .replace(/&/g, "") // Replace & with ''
  .replace(/-/g, "") // Replace - with ''
  .replace(/[^\w\-]+/g, "") // Remove all non-word characters
  .replace(/\-\-+/g, "") // Replace multiple - with ''
  .replace(/^-+/, "") // Trim - from start of text
  .replace(/-+$/, ""); // Trim - from end of text
}

function pageSlug() {
  var url = window.location;
  var slugName = url.hostname + url.pathname.substr(0, 40);
  return "rememberjs_" + slugify(slugName);
}

var localStorageKey = pageSlug();
/**
 * Check local storage supported on device
 * 
 * @return boolean
 */

var isSupported = function isSupported() {
  return typeof Storage === "undefined";
};
/**
 * Fetch raw unparsed data from local storage
 * 
 * @return string|null
 */

var getRawFromStorage = function getRawFromStorage() {
  return localStorage.getItem(localStorageKey);
};
/**
 * Commit a key value pair to storage
 * @param {string} key 
 * @param {string} value 
 * 
 * @return void
 */


var addToStorage = function addToStorage(key, value) {
  var localObject = localStorage.getItem(localStorageKey);

  if (!localObject) {
    var newLocalObject = _defineProperty({}, key, value);

    localStorage.setItem(localStorageKey, JSON.stringify(newLocalObject));
    return;
  }

  var parsedLocalObject = JSON.parse(localObject);
  parsedLocalObject[key] = value;
  localStorage.setItem(localStorageKey, JSON.stringify(parsedLocalObject));
};
/**
 * Fetch key from stored localstorage string
 * @param {string} key
 * 
 * @return string|null
 */

var getFromStorage = function getFromStorage(key) {
  var localObject = getRawFromStorage();

  if (localObject) {
    var parsedLocalObject = JSON.parse(localObject);
    return parsedLocalObject[key];
  }

  return null;
};
/**
 * Clear stored data for specific page
 * 
 * @return void
 */

var clearStorage = function clearStorage() {
  localStorage.removeItem(localStorageKey);
};
/**
 * Get all stored data in json format\
 * 
 * return object|null
 */

var getStorageJson = function getStorageJson() {
  var localObject = getRawFromStorage();

  if (localObject) {
    return JSON.parse(getRawFromStorage());
  }

  return null;
};

var Checkbox = function Checkbox(node) {
  var key = node.getAttribute("name");
  var value = getFromStorage(key);

  if (value) {
    node.checked = extractBoolean(value);
  }
};
var Radio = function Radio(node) {
  var key = node.getAttribute("name");
  var value = getFromStorage(key);

  if (value) {
    if (value == node.value) {
      return node.checked = true;
    }

    node.checked = false;
  }
};
var DefaultDisplay = function DefaultDisplay(node) {
  var key = node.getAttribute("name");
  var value = getFromStorage(key);

  if (value) {
    node.value = value;
  }
};

function extractBoolean(value) {
  return value === 'true';
}

/**
 * Private variables
 */

var $inputElements = [];
/**
 * Default options
 */

var options = {
  selector: "remember-input",
  storeTrigger: "change",
  clearOnSubmit: false,
  handleSubmit: true,
  onSubmit: function onSubmit() {
    console.warn("Define a callback to handle for submission.");
  },
  disabledLocalStorage: false,
  exclude: [],
  disabled: false
};
var allowedStoreEventsTriggers = ["change"];

var addStoreListener = function addStoreListener(triggerevent) {
  $inputElements.forEach(function (_ref) {
    var node = _ref.node;

    if (node.name === '' || node.name === null) {
      console.warn("A ".concat(node.tagName.toLowerCase(), " element with no name attribute was found. This input value will not be remembered"));
      return;
    }

    node.addEventListener(triggerevent, function (event) {
      var name = event.target.name;

      if (options.exclude.indexOf(name) > -1) {
        return;
      }

      switch (event.target.tagName.toLowerCase()) {
        case "input":
          switch (event.target.type) {
            case "checkbox":
              var checked = event.target.checked ? "true" : "false";
              addToStorage(name, checked);
              break;

            case "file":
            case "file":
            case "reset":
            case "button":
              // Do nothing
              break;

            default:
              addToStorage(name, event.target.value);
              break;
          }

          break;

        default:
          addToStorage(event.target.name, event.target.value);
          break;
      }
    });
  });
};

var submitForm = function submitForm() {
  if (options.clearOnSubmit) {
    clearStorage();
  }

  parentWrap(options.selector).submit();
};

var addSubmitListener = function addSubmitListener() {
  if (isForm(options.selector)) {
    parentWrap(options.selector).addEventListener("submit", function (e) {
      e.preventDefault();
      options.onSubmit(e, getStorageJson(), submitForm);
    });
    return;
  }

  console.error("Element with classname \"".concat(options.selector, "\" is not a form"));
};

var clearOnSubmitClick = function clearOnSubmitClick() {
  parentWrap(options.selector).addEventListener("submit", function () {
    clearStorage();
  });
};

var displayStoredData = function displayStoredData() {
  $inputElements.forEach(function (_ref2) {
    var node = _ref2.node;

    switch (node.tagName.toLowerCase()) {
      case "input":
        switch (node.type) {
          case "checkbox":
            Checkbox(node);
            break;

          case "radio":
            Radio(node);
            break;

          default:
            DefaultDisplay(node);
            break;
        }

        break;

      default:
        DefaultDisplay(node);
        break;
    }
  });
};

var init = function init(settings) {
  options = Object.assign(options, settings);
  /**
   * Check selector Exists in document
   */

  if (!elementExists(options.selector)) {
    console.error("class \"".concat(options.selector, "\" not found"));
    return;
  }
  /**
   * Create initial array with elements
   */


  $inputElements = elements(options.selector);
  /**
   * Local storage support
   */

  if (!options.disabledLocalStorage && isSupported()) {
    console.info("Storage is not supported on this browser");
    options.disabledLocalStorage = true;
  }
  /**
   * Do not init plugin when disabled option is set or storage not supported
   */


  if (options.disabled || isSupported()) {
    return disabled();
  }

  displayStoredData();

  if (allowedStoreEventsTriggers.indexOf(options.storeTrigger) === -1) {
    console.warn("Store event trigger \"".concat(options.storeTrigger, "\" is invalid falling back to default"));
    addStoreListener("change");
  } else {
    addStoreListener(options.storeTrigger);
  }

  if (options.handleSubmit) {
    addSubmitListener();
  }

  if (!options.handleSubmit && options.clearOnSubmit) {
    clearOnSubmitClick();
  }
};

var index = {
  init: init
};

module.exports = index;

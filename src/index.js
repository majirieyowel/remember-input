import {
  elements,
  elementExists,
  parentWrap,
  isForm,
} from "./helpers/elements";
import {
  isSupported,
  addToStorage,
  clearStorage,
  getStorageJson,
} from "./libs/storage";
import { Radio, Checkbox, DefaultDisplay } from "./helpers/display";

/**
 * Private variables
 */

let $inputElements = [];

/**
 * Default options
 */
let options = {
  selector: "remember-input",
  storeTrigger: "change",
  clearOnSubmit: false,
  handleSubmit: true,
  onSubmit: function () {
    console.warn("Define a callback to handle for submission.");
  },
  disabledLocalStorage: false,
  exclude: [],
  disabled: false,
};

let allowedStoreEventsTriggers = ["change"];

const disable = function () {};

const addStoreListener = (triggerevent) => {
  $inputElements.forEach(({ node }) => {
    
    if (node.name === '' || node.name === null) {
      console.warn(
        `A ${node.tagName.toLowerCase()} element with no name attribute was found. This input value will not be remembered`
      );
      return;
    }

    node.addEventListener(triggerevent, (event) => {
      let name = event.target.name;

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

const submitForm = () => {
  if (options.clearOnSubmit) {
    clearStorage();
  }
  parentWrap(options.selector).submit();
};

const addSubmitListener = () => {
  if (isForm(options.selector)) {
    parentWrap(options.selector).addEventListener("submit", (e) => {
      e.preventDefault();

      options.onSubmit(e, getStorageJson(), submitForm);
    });

    return;
  }

  console.error(`Element with classname "${options.selector}" is not a form`);
};

const clearOnSubmitClick = () => {
  parentWrap(options.selector).addEventListener("submit", () => {
    clearStorage();
  });
};

const displayStoredData = () => {
  $inputElements.forEach(({ node }) => {
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

const init = function init(settings) {
  options = Object.assign(options, settings);

  /**
   * Check selector Exists in document
   */
  if (!elementExists(options.selector)) {
    console.error(`class "${options.selector}" not found`);
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
    console.info(`Storage is not supported on this browser`);
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
    console.warn(
      `Store event trigger "${options.storeTrigger}" is invalid falling back to default`
    );
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

export default {
  init,
};

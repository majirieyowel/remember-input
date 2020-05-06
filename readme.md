# remember-input
___
[![NPM version](https://img.shields.io/npm/v/remember-input.svg)](https://www.npmjs.com/package/remember-input) [![license](https://img.shields.io/npm/l/remember-input.svg?style=flat-square)](https://github.com/majirieyowel/remember-input/blob/master/LICENSE)
[![Twitter Follow](https://img.shields.io/twitter/follow/ajebogang.svg?style=social)](https://twitter.com/ajebogang)

Remember form inputs even after a page refresh.

## Demo
[demo](https://majirieyowel.github.io/remember-input/demo/)
___
## ⚙ Installation

### Basic
##### CDN
Add script right before closing `</body>` tag, and initialize plugin:
```html
  <script src="https://cdn.jsdelivr.net/npm/remember-input@1.0.0/dist/remember-input.min.js"></script>
  
  <script>
    Remember.init();
  </script>
```
##### Using Node Package Manager (NPM)
Install `remember-input` package:
```bash
npm install remember-input --save
```
Import package and initialize:
```javascript
import Remember from 'remember-input'

 Remember.init()
```
___

## 🤔 How to use it?

Add class `remember-input` to the form element
```html
<!-- Make sure each input has a unique name attribute -->
  <form class="remember-input">
        <input type="text" name="firstname" />
        <input type="checkbox" name="agree" />
        <button type="submit">Submit</submit>
  </form>
```

### Initialize plugin:
```js
Remember.init();
// You can also pass an optional settings object
// below listed default settings
Remember.init({
  // Global settings:
  selector: "remember-input" // class applied to form elements
  storeTrigger: "change" // Event that trigger input saving "change, keyup, keydown"
  clearOnSubmit: false // Clear the stored data when form is submitted
  handleSubmit: false // if true plugin will handle form submission via the onsubmit function
  onSubmit: function (e, data, callback) {} // handles form submission
  exclude: [] // name attributes to be excluded from storage
  disabled: false // disable plugin
});
```
___
## 🌟 Examples
##### Handle form submission with plugin:
To handle form submission with plugin set handleSubmit option in settings to true and define an onSubmit function. This function has access to the event, data and callback passed down to it.
__event__: The submit event.
__data__: The form information stored in local storage and returned as json object.
__callback__: callback function to eventually submit the form.
```js

Remember.init({
  clearOnSubmit: true,
  handleSubmit: true,
  onSubmit: function (e, data, callback) {
      // Do what u want here
      
      callback(); // to eventually submit the form
  }
});
```

##### Exclude input field:
You can exclude input field whose value you don't want to remember eg passwords, card information
```js

Remember.init({
  exclude: ['password', 'card']
});
```
___

## Caveats
#### setting: `storeTrigger`
`keyup` and `keydown` settings option for storeTrigger may not trigger saving for some input elements like radio or checkbox.

___

## ❔Questions

If you found a bug, have a question or an idea, please check [Remember-input contribution guide](CONTRIBUTING.md) and don't hesitate to create new issues.
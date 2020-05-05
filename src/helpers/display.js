import { getFromStorage } from "../libs/storage";

export const Checkbox = (node) => {
  var key = node.getAttribute("name");

  var value = getFromStorage(key);

  if (value) {
    node.checked = extractBoolean(value);
  }
};

export const Radio = (node) => {        
        
    var key = node.getAttribute("name");

    var value = getFromStorage(key);

    if (value) {

        if (value == node.value) {
            return node.checked = true;
        }
        node.checked = false;
    }
}


export const DefaultDisplay = (node) => {

    var key = node.getAttribute("name");

    var value = getFromStorage(key);

    if (value) {
        
        node.value = value;
    }


}


function extractBoolean(value) {

    return value === 'true'
}
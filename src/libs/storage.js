import pageSlug from "../helpers/pageSlug";

const localStorageKey = pageSlug();

/**
 * Check local storage supported on device
 * 
 * @return boolean
 */
export const isSupported = () => typeof Storage === "undefined";

/**
 * Fetch raw unparsed data from local storage
 * 
 * @return string|null
 */
const getRawFromStorage = () => {
  return localStorage.getItem(localStorageKey);
};

/**
 * Commit a key value pair to storage
 * @param {string} key 
 * @param {string} value 
 * 
 * @return void
 */
export const addToStorage = (key, value) => {
  var localObject = localStorage.getItem(localStorageKey);

  if (!localObject) {
    var newLocalObject = {
      [key]: value,
    };

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
export const getFromStorage = (key) => {
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
export const clearStorage = () => {
  localStorage.removeItem(localStorageKey);
};

/**
 * Get all stored data in json format\
 * 
 * return object|null
 */
export const getStorageJson = () => {
  var localObject = getRawFromStorage();

  if (localObject) {
   return JSON.parse(getRawFromStorage());
  }

  return null;
};

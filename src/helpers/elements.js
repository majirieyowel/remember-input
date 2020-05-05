/**
 * Generate initial array with elements as objects
 */
export const elements = (selector) => {
  const elements = parentWrap(selector).querySelectorAll("input, select, textarea");
  return Array.prototype.map.call(elements, (node) => ({ node }));
};

export const parentWrap = (selector) =>  document.querySelector(`.${selector}`);

export const elementExists = (selector) =>  !! parentWrap(selector);

export const isForm = (selector) =>  {

  return parentWrap(selector).tagName.toLowerCase() === 'form'
  
}


console.log(`I was loaded at ${Date(Date.now()).toString()}`);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')

// Get the html select element
var select = document.getElementById('product-selection');

select.value = product;
// create references to DOM elements
let myForm = document.getElementById('myForm');
let inpText = document.getElementById('inpText');
let txtMsg = document.getElementById('txtMsg');

myForm.addEventListener('submit', submitForm);

function submitForm(event) {
  // stop the default behaviour of submitting a form
  // which is to reset the page  
  event.preventDefault();

  // call the palindrome checker
  let isPalindrome = palindrome(inpText.value);
  
  if(isPalindrome) {
    txtMsg.textContent = "We have a palindrome!!"
  } else {
    txtMsg.textContent = "Sorry, that is not a palindrome."
  }
}  // function submitForm

function palindrome(str) {
  let rv = false;

  // regular expression to match any character
  // that is NOT A-Z or a-z or 0-9 ...    
  let regex = /[^A-Z^a-z^0-9]/gi;
  // ... and replace it with an empty string
  str = str.replaceAll(regex, "");

  // split string into an array 
  // then reverse the order of the array
  // and then join array elements back into a string
  let revStr = str.split("").reverse().join("");

  if (str.toLowerCase() === revStr.toLowerCase()) {
    rv = true;
  }

  return rv;
}  // function palindrome


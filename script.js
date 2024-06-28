// create references to DOM elements
let myForm = document.getElementById('myForm');
let inpText = document.getElementById('inpText');
let txtMsg = document.getElementById('txtMsg');

myForm.addEventListener('submit', async (e) => {
  await submitForm(e);
});

async function submitForm(event) {
  // stop the default behaviour of submitting a form
  // which is to reset the page  
  event.preventDefault();

  // call the palindrome checker
  let isPalindrome = palindrome(inpText.value);

  if (isPalindrome) {
    txtMsg.textContent = "We have a palindrome!!"
    await savePalindrome(inpText.value);
    await getPalindromes();
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

async function savePalindrome(word) {
  let resp = await fetch('http://localhost:8000/palindrome', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word })
  });
}

async function getPalindromes() {
  let resp = await fetch('http://localhost:8000/palindrome');
  let respJson = await resp.json();
  console.log(respJson);
  return respJson;
}

async function deletePalindromes() {
  let resp = await fetch('http://localhost:8000/palindrome', {
    method: "DELETE"
  });
  let respJson = await resp.json();
  console.log(respJson);
}


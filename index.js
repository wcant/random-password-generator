
// Figma file: https://www.figma.com/file/nLQ8548OqNU3OHt7ocfMm1/Random-Password-Generator-(Copy)?node-id=0%3A1

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
    "/"];

const form = document.querySelector("form");
const passwordFields = Array.from(
  document.querySelectorAll(".passwords input")
);

passwordFields.map((field) =>
  field.addEventListener("click", handlePasswordClick)
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const els = e.target.elements;
  const nChars = parseInt(els.numchars.value);
  const hasNumbers = els.numbers.checked;
  const hasSymbols = els.symbols.checked;

  passwordFields.map((field) => {
    field.value = generatePassword(nChars, hasNumbers, hasSymbols);
  });
});

function generatePassword(nChars, hasNumbers, hasSymbols) {
  //  Not only should each character to be random, but also
  //  each character should have equal probability of being
  //  a letter, number, or symbol
  let password = "";
  for (let char = 0; char < nChars; char++) {
    // Fill an array with the possible characters
    const possibleChars = [];
    possibleChars.push(getRandomAlphabet());
    if (hasNumbers) possibleChars.push(getRandomNumber());
    if (hasSymbols) possibleChars.push(getRandomSymbol());

    // randomly select one and append to the password
    const randomNum = Math.floor(Math.random() * possibleChars.length);
    password += possibleChars[randomNum];
  }
  return password;
}

function getRandomAlphabet() {
  const randomNum = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomNum];
}

function getRandomNumber() {
  const randomNum = Math.floor(Math.random() * numbers.length);
  return numbers[randomNum];
}

function getRandomSymbol() {
  const randomNum = Math.floor(Math.random() * symbols.length);
  return symbols[randomNum];
}

async function handlePasswordClick(e) {
  try {
    await navigator.clipboard.writeText(e.target.value);
    console.log("successfully wrote to clipboard");
  } catch (error) {
    console.log(error);
  }
}


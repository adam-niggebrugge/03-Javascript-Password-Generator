var password = {
  characterLengthMin  : 8,
  characterLengthMax  : 128,
  specialCharacter    : false,
  numberCharacter     : false,
  lowerCaseCharacter  : false,
  upperCaseCharacter  : false,
  generatedPassword   : "",
  requestedLength     : 8,
  generatePassword
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
var password = generatePassword();
var passwordText = document.querySelector("#password");

passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function askUser(){

}

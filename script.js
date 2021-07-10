//Object to hold all the elements and functions of the password
let password = {
  //store the possible selections
  allowedUpperCase      : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  allowedLowerCase      : ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"],
  allowedNumbers        : ["0","1","4","7","2","5","8","3","6","9"],
  allowedSpecials       : [".","<",">",",",":",";","?","/","!","@","#","$","%","^","*","(",")","+","-","\&","\"","\'","\\"],
  characterLengthMin    : 8,
  characterLengthMax    : 128,
  isSpecialCharacter    : false,
  isNumberCharacter     : false,
  isLowerCaseCharacter  : false,
  isUpperCaseCharacter  : false,
  randomPassword      : "",
  requestedLength     : 8,
  generatePassword: function(){
      //Prompt the user through window domain. First question is of length
      this.requestedLength  = window.prompt("How many characters long should the password be? Minimum 8, Maximum 128")
      
      if(parseInt(this.requestedLength) < 8){
        this.requestedLength  = window.prompt("Too short, Minimum length 8, Maximum 128. Please specify character length?")
      }else if(this.requestedLength > 128) {
        this.requestedLength  = window.prompt("Too long, Minimum length 8, Maximum 128. Please specify character length?")
      }
  
  
  
  }

  

}

// Assignment Code
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
 password.generatePassword();
let passwordText = document.querySelector("#password");

passwordText.value = password.randomPassword;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function askUser(){

}

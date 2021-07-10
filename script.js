//Object to hold all the elements and functions of the password
let password = {
  //store the possible selections
  allowedUpperCase      : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  allowedLowerCase      : ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"],
  allowedNumbers        : ["0","1","4","7","2","5","8","3","6","9"],
  allowedSpecials       : [".","<",">",",",":",";","?","/","!","@","#","$","%","^","*","(",")","+","-","\&","\"","\'","\\"],
  characterLengthMin    : 8,    //create constant, in for possible changes in password length minimum, change in a single spot
  characterLengthMax    : 128,  //create constant, in for possible changes in password length maximum, change in a single spot
  isSpecialCharacter    : false,
  isNumberCharacter     : false,
  isLowerCaseCharacter  : false,
  isUpperCaseCharacter  : false,
  randomPassword      : "",  //initialize as empty string
  requestedLength     : this.characterLengthMin,   //initialized with the minimum length required
  generatePassword: function(){
      //Prompt the user through window domain. First question is of length
      this.requestedLength  = window.prompt("How many characters long should the password be? Minimum "+this.characterLengthMin+", Maximum "+this.characterLengthMax);
      
      //Hold the user in a loop til they enter a valid length
      do {
        if(parseInt(this.requestedLength) < this.characterLengthMin){
          this.requestedLength  = window.prompt("Too short, Minimum "+this.characterLengthMin+", Maximum "+this.characterLengthMax+". Please specify character length?");
        }else if(this.requestedLength > this.characterLengthMax) {
          this.requestedLength  = window.prompt("Too long, Minimum "+this.characterLengthMin+", Maximum "+this.characterLengthMax+". Please specify character length?");
        }
      }while(this.requestedLength < this.characterLengthMin || this.requestedLength > this.characterLengthMax)
  
  
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

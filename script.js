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
      //step into the length of the desired password
      this.determineUsersLength();
      //step into finding what characters are acceptable
      this.determineAcceptableCharacters();
  },

  //No inputs, allows user to access this.requestedLength variable and set it between this.characterLengthMin and this.characterLengthMax
  determineUsersLength: function(){
      //Prompt the user through window domain. First question is of length
      this.requestedLength  = window.prompt("How many characters long should the password be? Minimum "+this.characterLengthMin+", Maximum "+this.characterLengthMax);
      
      //Hold the user in a loop til they enter a valid length
      do {
        //too short?
          if(parseInt(this.requestedLength) < this.characterLengthMin){
            this.requestedLength  = window.prompt("Too short, Minimum "+this.characterLengthMin+", Maximum "+this.characterLengthMax+". Please specify character length?");
        //too long?
          }else if(this.requestedLength > this.characterLengthMax) {
            this.requestedLength  = window.prompt("Too long, Minimum "+this.characterLengthMin+", Maximum "+this.characterLengthMax+". Please specify character length?");
        // not a number   
          }else if(isNaN(this.requestedLength)){
            this.requestedLength  = window.prompt("Not a number. Please enter a value between "+this.characterLengthMin+" and "+this.characterLengthMax+".");
          }
      }while(this.requestedLength < this.characterLengthMin || this.requestedLength > this.characterLengthMax || isNaN(this.requestedLength))
  
  },
  
  //determine the type of characters the user wants in the password
  determineAcceptableCharacters: function(){
      if(confirm("Do you want the password to contain alphabetic lower case characters?")){
        this.isLowerCaseCharacter = true;  
      }
      if(confirm("Do you want the password to contain alphabetic upper case characters?")){
        this.isUpperCaseCharacter = true;      
      }
      if(confirm("Do you want the password to contain numeric characters?")){
        this.isNumberCharacter = true;      
      }
      if(confirm("Do you want the password to contain special characters?")){
        this.isSpecialCharacter = true;      
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

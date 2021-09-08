// Assignment Code
const generateBtn = document.querySelector("#generate");
const isLowerCaseEl = document.querySelector("#isLowerCaseCheck");
const isUpperCaseEl = document.querySelector("#isUpperCaseCheck");
const isSpecialCharEl = document.querySelector("#isSpecialCharCheck");
const isNumberCharEl = document.querySelector("#isNumberCharCheck");
const passwordSizeEl = document.querySelector("#passwordSize");
const passwordSizeLabel = document.querySelector("#validSizeLabel");

const characterLengthMin = 8;    //create constant, in for possible changes in password length minimum, change in a single spot
const  characterLengthMax = 128;  //create constant, in for possible changes in password length maximum, change in a single spot


//Object to hold all the elements and functions of the password
const password = {
  //store the possible selections
  allowedUpperCase      : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  allowedLowerCase      : ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"],
  allowedNumbers        : ["0","1","4","7","2","5","8","3","6","9"],
  allowedSpecials       : [".","<",">",",",":",";","?","!","@","#","$","%","^","*","+","-"],
  //ensure the password always contains at least one character from each requested set
  guaranteedCharacters  : [],
  //this array will append the allowed character arrays for the majority of the randomly selected
  requestedCharacterSet : [],
  //User toggles these as desired
  isSpecialCharacter    : false,
  isNumberCharacter     : false,
  isLowerCaseCharacter  : false,
  isUpperCaseCharacter  : false,
  //string to return for display
  randomPassword      : "",  //initialize as empty string
  requestedLength     : this.characterLengthMin,   //initialized with the minimum length required
  //Main method that calls all the sub methods to give the user the desired password
  generatePassword: function(){
       //initalize the variables to ensure that repeated attempts are clean sets, found during debugging that these were not being reset
       this.randomPassword = "";
       this.requestedCharacterSet.splice(0, this.requestedCharacterSet.length);
       this.guaranteedCharacters.splice(0, this.guaranteedCharacters.length);
       this.isLowerCaseCharacter = false;
       this.isUpperCaseCharacter = false;
       this.isNumberCharacter = false;
       this.isSpecialCharacter = false;
      //set the desired length of the password
      this.requestedLength = parseInt(passwordSizeEl.value);
      this.determineAcceptableCharacters();
      //step into putting a random set of characters together to be returned to the user
      this.determinePassword();
      
  },
  //determine the type of characters the user wants in the password
  determineAcceptableCharacters: function(){
     
    if(isLowerCaseEl.checked){
      this.isLowerCaseCharacter = true; 
      this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedLowerCase));
      this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedLowerCase);
    }
    if(isUpperCaseEl.checked){
      this.isUpperCaseCharacter = true;  
      this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedUpperCase));
      this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedUpperCase);  
    }
    if(isNumberCharEl.checked){
      this.isNumberCharacter = true; 
      this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedNumbers));
      this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedNumbers);   
    }
    if(isSpecialCharEl.checked){
      this.isSpecialCharacter = true;   
      this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedSpecials));
      this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedSpecials);  
    }

  },

  //concat the password together from the acceptable character list, accepts arrays in for what the
  determinePassword: function(){
    //Temporary string to hold partial random string that will be connected to the guaranteedCharacters array
    let partialPassword = "";
    //develop a set of cases for ensuring that each character type is included at least once for the password
    //based on the length of the guaranteedCharacters array, if only one, no need to use guaranteedCharacters
    //every other case will loop through the allowed character length concating to the password with final values coming from
    //the guaranteedCharacters array
    switch (this.guaranteedCharacters.length){
        case 1:
            this.randomPassword =  this.concatPasswordCharacters(0);
            break;
        case 2:
            partialPassword =  this.concatPasswordCharacters(2);
            //.join method of array used to concat to the partial password
            this.randomPassword = partialPassword.concat(this.guaranteedCharacters.join(''));
            break;
        case 3:
            partialPassword =  this.concatPasswordCharacters(3);
            //.join method of array used to concat to the partial password
            this.randomPassword = partialPassword.concat(this.guaranteedCharacters.join(''));
            break;
        case 4:
            partialPassword =  this.concatPasswordCharacters(4);
            //.join method of array used to concat to the partial password
            this.randomPassword = partialPassword.concat(this.guaranteedCharacters.join(''));
            break;
    }
  },

  //accepts parameter reducer which is to limit the loop to be less that of the guaranteed character array length
  concatPasswordCharacters: function(reducer){
      let concatRandomString = "";
      for(let i = 0; i < (this.requestedLength - parseInt(reducer)); i++){
         concatRandomString = concatRandomString.concat(this.randomCharacterSelector(this.requestedCharacterSet));
      }
      return concatRandomString;
  },
  
  //select random characters from the array given
  randomCharacterSelector: function(x){
    //take the given array and randomly select a position the corresponds with arrays length      
    let selector = Math.floor(Math.random() * x.length);
    return x[parseInt(selector)];
  },
  
}

// Write password to the #password input
//modified password as an object to be called
function writePassword() {
  //review inputs before execution. Each function handles errors by exiting program execution with empty returns
  if(validateCharactersRequested() && validateLength()){
    const passwordText = document.querySelector("#password");
    passwordText.value = "...generating...";
    password.generatePassword();
    passwordText.value = password.randomPassword;
  }

}

function validateLength() {

    //Prompt the user through window domain. First question is of length
    let sizeChecker  = 0;
    sizeChecker = passwordSizeEl.value;
   
    if(parseInt(sizeChecker) < characterLengthMin){
      passwordSizeLabel.innerHTML = `Too short, Minimum ${characterLengthMin}, Maximum ${characterLengthMax}.`;
      passwordSizeLabel.setAttribute("class", 'error');
      return false;
    }else if(parseInt(sizeChecker) > characterLengthMax) {
      passwordSizeLabel.innerHTML = `Too long, Minimum ${characterLengthMin}, Maximum ${characterLengthMax}.`;
      passwordSizeLabel.setAttribute("class", 'error');
      return false;

    // not a number   
    }else if(isNaN(sizeChecker)){
      passwordSizeLabel.innerHTML =  `Not a number! Please enter a value between ${characterLengthMin} and ${characterLengthMax}.`;
      passwordSizeLabel.setAttribute("class", 'error');
      return false;

    }else if(sizeChecker === ""){
      passwordSizeLabel.innerHTML = `No value entered!! Please enter a value between ${characterLengthMin} and ${characterLengthMax}.`;
      passwordSizeLabel.setAttribute("class", 'error');
      return false;

    } else {
      passwordSizeLabel.innerHTML =  `Good`;
      passwordSizeLabel.setAttribute("class", 'cust-valid');
      return true;
    }
}



function validateCharactersRequested(){
  if(!isNumberCharEl.checked && !isLowerCaseEl.checked && !isSpecialCharEl.checked && !isUpperCaseEl.checked){
    alert("You select no character types, must toggle at least one set of character types to make a password.") 
    return false;
  } else {
    return true;
  }
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
passwordSizeEl.addEventListener("keyup", validateLength);



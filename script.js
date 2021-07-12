//Object to hold all the elements and functions of the password
let password = {
  //store the possible selections
  allowedUpperCase      : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
  allowedLowerCase      : ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"],
  allowedNumbers        : ["0","1","4","7","2","5","8","3","6","9"],
  allowedSpecials       : [".","<",">",",",":",";","?","/","!","@","#","$","%","^","*","(",")","+","-","\&","\"","\'","\\"],
  //ensure the password always contains at least one character from each requested set
  guaranteedCharacters  : [],
  //this array will append the allowed character arrays for the majority of the randomly selected
  requestedCharacterSet : [],
  //Constants
  characterLengthMin    : 8,    //create constant, in for possible changes in password length minimum, change in a single spot
  characterLengthMax    : 128,  //create constant, in for possible changes in password length maximum, change in a single spot
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
      //step into the length of the desired password
      this.determineUsersLength();
      //step into finding what characters are acceptable
      this.determineAcceptableCharacters();
      //confirm inputs for generation
      if(this.userConfirms()){
        //step into putting a random set of characters together to be returned to the user
        this.determinePassword();
      }else{
        window.alert("Exiting password generation. Please press button to generate a password.");
      }
      
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
          }else if(this.requestedLength === ""){
            this.requestedLength  = window.prompt("No value entered. Please enter a value between "+this.characterLengthMin+" and "+this.characterLengthMax+".");
          }
      }while(this.requestedLength < this.characterLengthMin || this.requestedLength > this.characterLengthMax || isNaN(this.requestedLength));
      
  },
  
  //determine the type of characters the user wants in the password
   determineAcceptableCharacters: function(){
     
      if(confirm("Do you want the password to contain alphabetic lower case characters?")){
        this.isLowerCaseCharacter = true; 
        this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedLowerCase));
        this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedLowerCase);
      }
      if(confirm("Do you want the password to contain alphabetic upper case characters?")){
        this.isUpperCaseCharacter = true;  
        this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedUpperCase));
        this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedUpperCase);  
      }
      if(confirm("Do you want the password to contain numeric characters?")){
        this.isNumberCharacter = true; 
        this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedNumbers));
        this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedNumbers);   
      }
      if(confirm("Do you want the password to contain special characters?")){
        this.isSpecialCharacter = true;   
        this.guaranteedCharacters.push(this.randomCharacterSelector(this.allowedSpecials));
        this.requestedCharacterSet = this.requestedCharacterSet.concat(this.allowedSpecials);  
      }
      
      if(!this.isLowerCaseCharacter && !this.isUpperCaseCharacter && !this.isNumberCharacter && !this.isSpecialCharacter){
         alert("You said NO to ALL possible characters, must accept at least one set of character types to make the password.") 
         this.determineAcceptableCharacters(); //call itself if all acceptable character sets are marked as being false. they can be stuck in this loop until they read what is going on ;)
      }


  },
  //concat the password together from the acceptable character list, accepts arrays in for what the
  determinePassword: function(){
        //Temporary string to hold partial random string that will be connected to the guaranteedCharacters array
        var partialPassword = "";
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
      var concatRandomString = "";
      for(let i = 0; i < (this.requestedLength - parseInt(reducer)); i++){
         concatRandomString = concatRandomString.concat(this.randomCharacterSelector(this.requestedCharacterSet));
      }
      return concatRandomString;
  },
  
  //select random characters from the array given
  randomCharacterSelector: function(x){
    //take the given array and randomly select a position the corresponds with arrays length      
    var selector = Math.floor(Math.random() * x.length);
    return x[parseInt(selector)];
  },
  //Informs the user that password generation will start based on the following
  userConfirms: function(){
      //Initialize empty string to display the characters chosen before generation
      var stringOfAcceptableCharaterTypes = "";
      
      if(this.isLowerCaseCharacter){
        stringOfAcceptableCharaterTypes = "lower case alphabetic";
      } 
      //either first part is true or not true, if not true the upper will be first confirmed characters to display in output message   
      if(this.isUpperCaseCharacter && !this.isLowerCaseCharacter){
        stringOfAcceptableCharaterTypes = "upper case alphabetic";        
      }else if(this.isUpperCaseCharacter && (this.isNumberCharacter || this.isSpecialCharacter)){
      //potentially numbers and specials are available with lower case already being true and checking if upper is true append with comma
        stringOfAcceptableCharaterTypes = stringOfAcceptableCharaterTypes.concat(", upper case alphbetic");
      }else if(this.isUpperCaseCharacter && !this.isNumberCharacter && !this.isSpecialCharacter){
      //no numbers and specials are available with lower case already being true and checking if upper is true append with and
        stringOfAcceptableCharaterTypes = stringOfAcceptableCharaterTypes.concat(" and upper case alphbetic");
      }
      //either first part is true or not true, if not true the upper will be first confirmed characters to display in output message   
      if(this.isNumberCharacter && !this.isLowerCaseCharacter && !this.isUpperCaseCharacter && !this.isSpecialCharacter){
          stringOfAcceptableCharaterTypes = "numeric";        
      }else if(this.isNumberCharacter && this.isSpecialCharacter && !this.isLowerCaseCharacter && !this.isUpperCaseCharacter){
        //only numbers and specials are available 
          stringOfAcceptableCharaterTypes = "numeric and special";
      }else if(this.isNumberCharacter && (this.isLowerCaseCharacter || this.isUpperCaseCharacter) && !this.isSpecialCharacter){
        //numbers but no specials are available with lower case or upper case already being true append an "and ""
          stringOfAcceptableCharaterTypes = stringOfAcceptableCharaterTypes.concat(" and numeric");
      }else if(this.isNumberCharacter && (this.isLowerCaseCharacter || this.isUpperCaseCharacter) && this.isSpecialCharacter){
        //either upper, lower or both are being selected
        stringOfAcceptableCharaterTypes = stringOfAcceptableCharaterTypes.concat(", numeric and special");
      }else if(this.isSpecialCharacter && (this.isLowerCaseCharacter || this.isUpperCaseCharacter)){
        //either upper, lower or both are being selected
        stringOfAcceptableCharaterTypes = stringOfAcceptableCharaterTypes.concat(" and special");
      }else if(this.isSpecialCharacter && !this.isLowerCaseCharacter && !this.isUpperCaseCharacter){
        //either upper, lower or both are being selected
        stringOfAcceptableCharaterTypes = "special";
      }
      //return true or false to if condition which will exit out of generating a password
      return confirm("Password will be "+this.requestedLength+" characters long and contain "+stringOfAcceptableCharaterTypes+" characters. Do you wish to proceed?");
      
  }

}

// Assignment Code
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
//modified password as an object to be called
function writePassword() {
 password.generatePassword();
 let passwordText = document.querySelector("#password");

 passwordText.value = password.randomPassword;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);



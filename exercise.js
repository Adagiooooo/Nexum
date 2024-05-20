var noOfQuestions;

var answers = [];
var title="";
var timerChoice, timerDuration;
//conversion variables
var noOfDigits;
var numSystem1,numSystem2;
var questions = [];
var fractionConfirm;
//arithmetic variables
var firstNoOfDigits,secondNoOfDigits,base,operations;
var firstDigitQuestion = [];
var secondDigitQuestion = [];

///numberSystems
var decimal = ["0","1","2","3","4","5","6","7","8","9"];
var binary = ["0","1"];
var octal = ["1","2","3","4","5","6","7"];
var hexadecimal = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

function startConversion(){
    title = "Conversion";
    questions = [];
    noOfQuestions= parseInt(convQuestions.value)
    noOfDigits = parseInt(convDigits.value);
    numSystem1 = from.value;
    numSystem2 = to.value;
    if(convfracYes.checked){
        fractionConfirm = "yes";
    }
    else if (convfracNo.checked){
        fractionConfirm ="no";
    }
    

    if (isNaN(noOfQuestions) || isNaN(noOfDigits)){
        alert("Fill in all the details needed first!");
    }
    else{
    if (convYes.checked){
        timerChoice = "yes";
        timerDuration=parseInt(convDuration.value);
    }
    else if (convNo.checked){
        timerChoice ="no";
        timerDuration="";
        
    }
    for(let i=0; i<noOfQuestions; i++){
        questions[i]="";
        
        for(let j=0; j<noOfDigits; j++){
            switch(numSystem1){
            case "Decimal":
                questions[i] += decimal[Math.floor(Math.random() * 10)];
                break;
            case "Binary":
                questions[i] += binary[Math.floor(Math.random() * 2)];
                break;
            case "Octal":
                questions[i] += octal[Math.floor(Math.random() * 7)];
                break;
            case "Hexadecimal":
                questions[i] += hexadecimal[Math.floor(Math.random() * 15)];
                break;
            }
        }
        if (fractionConfirm == "yes"){
            questions[i] += ".";
            for(let k = 0; k < 2; k++){
                switch(numSystem1){
                    case "Decimal":
                        questions[i] += decimal[Math.floor(Math.random() * 10)];
                        break;
                    case "Binary":
                        questions[i] += binary[Math.floor(Math.random() * 2)];
                        break;
                    case "Octal":
                        questions[i] += octal[Math.floor(Math.random() * 8)];
                        break;
                    case "Hexadecimal":
                        questions[i] += hexadecimal[Math.floor(Math.random() * 16)];
                        break;
                }
            }
            var ans;
            switch(numSystem1){
                case "Decimal":
                    var decimalNumber = parseFloat(questions[i]);
                    ans = decimalConvert(decimalNumber, numSystem2);
                    answers[i] = fix(ans);
                    break;
                case "Binary":
                    var binaryNumber = parseFloat(questions[i], 2);
                    ans = binaryConvert(binaryNumber, numSystem2)
                    answers[i] = fix(ans);
                    break;
                case "Octal":
                    var octalNumber = parseFloat(questions[i], 8);
                    ans = octalConvert(octalNumber, numSystem2);
                    answers[i] = fix(ans);
                    break;
                case "Hexadecimal":
                    var hexadecimalNumber = parseFloat(questions[i], 16);
                    ans = hexadecimalConvert(hexadecimalNumber, numSystem2);
                    answers[i] = fix(ans);
                    break;
            }
        }
        else{
        switch(numSystem1){
            case "Decimal":
                var decimalNumber = parseInt(questions[i]);
                answers[i] = decimalConvert(decimalNumber, numSystem2);
                break;
            case "Binary":
                var binaryNumber = parseInt(questions[i], 2);
                answers[i] = binaryConvert(binaryNumber, numSystem2);
                break;
            case "Octal":
                var octalNumber = parseInt(questions[i], 8);
                answers[i] = octalConvert(octalNumber, numSystem2);
                break;
            case "Hexadecimal":
                var hexadecimalNumber = parseInt(questions[i], 16);
                answers[i] = hexadecimalConvert(hexadecimalNumber, numSystem2);
                break;
        }
        }
        }
        
    localStorage.setItem('title',title);
    localStorage.setItem('noOfQuestions',noOfQuestions);
    localStorage.setItem('timerDuration',timerDuration);
    localStorage.setItem('questions',questions);
    localStorage.setItem('convertFrom',numSystem1);
    localStorage.setItem('convertTo',numSystem2);
    localStorage.setItem('answers', answers);

    console.log(noOfQuestions + " " + noOfDigits);
    console.log(numSystem1 + " " + numSystem2);
    console.log(timerChoice);
    console.log(questions);
    console.log(answers);
    window.location.href = 'Exercise_Exam.html';
    }
}
////////////////conversion of numbers
function fix(number) {
    return Math.round(number * 100) / 100;
}
var answer;
function decimalConvert(num, convertTo){
    switch(convertTo){
        case "Binary":
            answer = num.toString(2);
            break;
        case "Octal":
            answer = num.toString(8);
            break;
        case "Hexadecimal":
            answer = num.toString(16).toUpperCase();
            break;
    }
    return answer;
}

function binaryConvert(num, convertTo) {
    var answer;
    switch (convertTo) {
        case "Decimal":
            answer = num.toString(10);
            break;
        case "Octal":
            answer = num.toString(8);
            break;
        case "Hexadecimal":
            answer = num.toString(16).toUpperCase();
            break;
    }
    return answer;
}
function octalConvert(num, convertTo) {
    var answer;
    switch (convertTo) {
        case "Decimal":
            answer = num.toString(10);
            break;
        case "Binary":
            answer = num.toString(2);
            break;
        case "Hexadecimal":
            answer = num.toString(16).toUpperCase();
            break;
    }
    return answer;
}
function hexadecimalConvert(num, convertTo) {
    var answer;
    switch (convertTo) {
        case "Decimal":
            answer = num.toString(10);
            break;
        case "Binary":
            answer = num.toString(2);
            break;
        case "Octal":
            answer = num.toString(8);
            break;
    }
    return answer;
}
var num1, num2;
function startArithmetic(){
    title = "Arithmetic";
    firstDigitQuestion = [];
    secondDigitQuestion = [];
    noOfQuestions= parseInt(arithQuestions.value);
    firstNoOfDigits = parseInt(arithFirstNo.value);
    secondNoOfDigits = parseInt(arithSecondNo.value);
    if (isNaN(noOfQuestions) || isNaN(firstNoOfDigits) || isNaN(secondNoOfDigits)){
        alert("Fill in all the details needed first!");
    }
    else{
    base = givenBase.value;
    operations = operation.value;

    if (arithYes.checked){
        timerChoice = "yes";
        timerDuration=parseInt(arithDuration.value);
    }
    else if (arithNo.checked){
        timerChoice ="no";
        timerDuration="";
    }
    else{
        alert("Select a timer");
    }
    for(let i=0; i<noOfQuestions; i++){
        firstDigitQuestion[i]="";
        secondDigitQuestion[i]="";
        for(let j=0; j<firstNoOfDigits; j++){
            switch(base){
                case "Decimal":
                firstDigitQuestion[i] += decimal[Math.floor(Math.random() * 10)];
                break;
            case "Binary":
                firstDigitQuestion[i] += binary[Math.floor(Math.random() * 2)];
                break;
            case "Octal":
                firstDigitQuestion[i] += octal[Math.floor(Math.random() * 7)];
                break;
            case "Hexadecimal":
                firstDigitQuestion[i] += hexadecimal[Math.floor(Math.random() * 15)];
                break;
            }
        }
    
        for(let k=0; k<secondNoOfDigits; k++){
            switch(base){
                case "Decimal":
                    secondDigitQuestion[i] += decimal[Math.floor(Math.random() * 10)];
                    break;
                case "Binary":
                    secondDigitQuestion[i] += binary[Math.floor(Math.random() * 2)];
                    break;
                case "Octal":
                    secondDigitQuestion[i] += octal[Math.floor(Math.random() * 7)];
                    break;
                case "Hexadecimal":
                    secondDigitQuestion[i] += hexadecimal[Math.floor(Math.random() * 15)];
                   break;
            }
        }
        switch(base){
            case "Decimal": 
                answers[i] = arithmeticSolve(operations, parseInt(firstDigitQuestion[i]), parseInt(secondDigitQuestion[i])).toString(10);
                break;
            case "Binary":
                num1 = parseInt(firstDigitQuestion[i], 2);
                num2 = parseInt(secondDigitQuestion[i], 2);
                answers[i] = arithmeticSolve(operations, num1, num2).toString(2);
                break;
            case "Octal":
                num1 = parseInt(firstDigitQuestion[i], 8);
                num2 = parseInt(secondDigitQuestion[i], 8);
                answers[i] = arithmeticSolve(operations, num1, num2).toString(8);
                break;
            case "Hexadecimal":
                num1 = parseInt(firstDigitQuestion[i], 16);
                num2 = parseInt(secondDigitQuestion[i], 16);
                answers[i] = arithmeticSolve(operations, num1, num2).toString(16).toUpperCase();
                break;
        }

    }
    localStorage.setItem('title',title);
    localStorage.setItem('noOfQuestions',noOfQuestions);
    localStorage.setItem('firstDigitQuestion',firstDigitQuestion);
    localStorage.setItem('secondDigitQuestion',secondDigitQuestion);
    localStorage.setItem('base',base);
    localStorage.setItem('operations',operations);
    localStorage.setItem('timerDuration',timerDuration);
    localStorage.setItem('answers', answers);

    console.log(noOfQuestions + " " + firstNoOfDigits +" "+ secondNoOfDigits);
    console.log(base + " " + operations);
    console.log(timerChoice);
    console.log("First Digit "+firstDigitQuestion);
    console.log("Second Digit "+secondDigitQuestion);
    console.log("Answer "+ answers);

    window.location.href = 'Exercise_Exam.html';
    }
}

function arithmeticSolve(operations, num1, num2){
    var answer;
    switch(operations){
        case "Addition":
            answer = num1 + num2;
            break;
        case "Subtraction":
            answer = num1 - num2;
            break;
        case "Multiplication":
            answer = num1 * num2;
            break;
        case "Division":
            answer = num1 / num2;
            break;
    }
    return answer;
}
        
                    
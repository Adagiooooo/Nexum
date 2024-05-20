    function ConvertAll(){

        const firstBaseID = document.getElementById('firstBase');
        const secondBaseID = document.getElementById('secondBase');
        const firstNumberID = document.getElementById('firstNumber');
        const secondNumberID = document.getElementById('secondNumber');
        const operationID = document.getElementById('operation');
        const binOutputID = document.getElementById('binOutput');
        const decOutputID = document.getElementById('decOutput');
        const octOutputID = document.getElementById('octOutput');
        const hexaOutputID = document.getElementById('hexaOutput');

        let decFirstNum = toDecimal(parseFloat(firstNumberID.value), parseFloat(firstBaseID.value));
        let decSecondNum = toDecimal(parseFloat(secondNumberID.value), parseFloat(secondBaseID.value));
        
        console.log(decFirstNum[0], operationID.value, decSecondNum[0]);
        let decAnswer = Operate(decFirstNum[0], operationID.value, decSecondNum[0]);

        let binAnswer = decimalToChosen(decAnswer, 2);
        let octAnswer = decimalToChosen(decAnswer, 8);
        let hexaAnswer = decimalToChosen(decAnswer, 16);

        decOutputID.value = decAnswer;
        binOutputID.value = binAnswer;
        octOutputID.value = octAnswer;
        hexaOutputID.value = hexaAnswer;

    }
    // for operations
    function Operate(firstNumber, operation, secondNumber ){

        switch(operation){
            case 'add':   return firstNumber + secondNumber;
                break;
            case 'min':   return firstNumber - secondNumber; 
                break; 
            case 'mul':   return firstNumber * secondNumber;
                break;
            case 'div':   return firstNumber / secondNumber;
                break;
            case 'mod':   return firstNumber % secondNumber;
                break;
            default: break;                    
        }
    }
    function returnRegex(base) {
        switch (base) {
            case 2:
                return /^[01.]+$/;
            case 8:
                return /^[0-7.]+$/;
            case 16:
                return /^[0-9A-Fa-f.]+$/;
            default:
                return /^[0-9.]+$/;
        }
    }

    function decimalToChosen(num, numbase){
        let rem = 0;
        let whole = Math.floor(num);
        let fracPart = num - whole;
        let result = "";
        let calc ="";
        let resultArray = ["", ""];
    
        if (num === 0) {
            return "0";
        }
    
        while (whole > 0) {
            rem = whole % numbase;
            whole = Math.floor(whole / numbase);
            if (numbase == 16){
                rem = numberHexEquivalent(rem.toString());
            }
            result = rem + result;  
        }
    
        if (fracPart > 0) // handles fractional part (if there's any)
            {
                result += "." + convertFracPart(fracPart, numbase);
            }
    
        resultArray[0] = result;
        resultArray[1] = calc;
        return resultArray;
    
    }
    
    function convertFracPart(num, numbase) {
        let precision = 10; // how many decimals will be (Ex. 0.1232456789)
        let rem = 0;
        let result = "";
        
        while (precision > 0 && num > 0) {
            num *= numbase; 
            rem = Math.floor(num); 
            num -= rem; 
            if (numbase === 16){  
              rem = numberHexEquivalent(rem.toString());
            }
            result += rem;
            precision--;
        }
        return result;
    }
 
        function toDecimal(numStr, base){ //converting from other NS to Decimal NS
            if (numStr === "") {
            return ["", ""]; // Return default values
            }
            let baseRegex = returnRegex(base);
            let decimalNumber = 0;
            let power = 0;
            let wholeFormula="";
            let fracFormula = "";
            let finalFormula ="";

           //   let num = parseFloat(numStr);
          //  let parts = numStr.split('.');
             
            
            
    
           numStr = numStr.toString();
           let parts = numStr.split('.'); // dividing into two parts 
            
    
            if (baseRegex.test(numStr)){

        /*        
            let i = 0;
            let power = parts[0].length;
            console.log("power: " + power);

            while(i < numStr.length ){
                power--;
                let digit = base != 16 ? numStr[i] : letterHexEquivalent(numStr[i]);
                digit = parseInt(digit);

                console.log("digit: " + digit)
                decimalNumber += digit * Math.pow(base, power);
                console.log("decimal number " + decimalNumber);
                i++;     
                }  
            return [decimalNumber, ""];
                

*/

                
                
                // check if the input is valid for the chosen ns (Ex. 10102 can't be binary)
                for (let i = parts[0].length - 1; i >= 0; i--) {
                        let digit = parseInt(parts[0][i]);
                            if (base == 16){
                                digit = parseInt(letterHexEquivalent(parts[0][i]));
                            }
    
                        decimalNumber += digit * Math.pow(base, power);
                        wholeFormula = `(${digit} × ${base}<sup>${power}</sup>) + ${wholeFormula}`;
                          
                        power++;
                }
                if (parts.length > 1) {
                    power = -1;
                        for (let i = 0; i < parts[1].length; i++) {
                            let digit = parseInt(parts[1][i]);
    
                                if (base == 16){
                                digit = parseInt(letterHexEquivalent(parts[1][i]));
                                }
    
                            decimalNumber += digit * Math.pow(base, power);
                            fracFormula = `${fracFormula} + (${digit} × ${base}<sup>${power}</sup>))`;
                            power--;
                        }            
                }
                wholeFormula = wholeFormula.slice(0, -2); // remove +
                fracFormula = fracFormula.slice(0, -2);
                finalFormula = `(${numStr})<sub>${base}</sub> = ${wholeFormula} ${fracFormula} = (${decimalNumber})<sub>10</sub>`; // Final formula representation
                return [decimalNumber, finalFormula]; // Return an array containing decimalNumber and formula
                
            }
            else{
               return ["", ""];
            }
        }
    
        function numberHexEquivalent(rem) {
            switch (rem) {
                case "10": return "A";
                case "11": return "B";
                case "12": return "C";
                case "13": return "D";
                case "14": return "E";
                case "15": return "F";
                default: return rem; 
            }
        }     
    
        function letterHexEquivalent(hex){
            switch (hex.toUpperCase()) {
                    case "A": return "10";
                    case "B": return "11";
                    case "C": return "12";
                    case "D": return "13";
                    case "E": return "14";
                    case "F": return "15";
                    default: return hex; 
            }   
        }
    
    
    

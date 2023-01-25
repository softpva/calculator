class Calculator {
    prevOpTxtElm = document.querySelector("[data-prev]");
    currOpTxtElm = document.querySelector("[data-curr]");
    expression = '';
    isolatedNumber= '';
    pressedEqual = false;

    

    constructor(){
        this.clear;
        this.opNumBtEventListener();
        // this.opBtEventListener();
    }

    store() { }

    restore() { }

    clear() {
        this.currOpTxtElm = '';
        this.prevOpTxtElm = '';        
    }

    delete() { }

    appendToIsoletedNumber(val){     
        if (this.pressedEqual){
            this.expression = '';
            this.isolatedNumber = '';
            this.pressedEqual = false;
        }    
        if ((val === '-' && this.isolatedNumber === '') || Number.isInteger(parseInt(val)) || val === '.'){
            if (val === '.' && this.isolatedNumber.includes('.'))  
                return;
            this.isolatedNumber += val.toString();
        } else {            
            this.appendToExpression(val);
        }        
        this.show();
    }

    appendToExpression(val) {
        console.log(val);
        console.log(this.expression);        
        this.expression += this.isolatedNumber.toString();
        this.isolatedNumber = ''
        if (val === '='){
            this.isolatedNumber = eval(this.expression).toString();
            console.log(this.isolatedNumber);
            // this.expression = '';
            this.show();
            this.pressedEqual = true
            return;
        }
        this.expression += val.toString();        
    }

    appOp(op){
        this.expression = this.expression.toString() + op.toString();
        console.log(this.expression);
    } 

    opNumBtEventListener() {        
        document.querySelectorAll("[data-num], [data-op]" ).forEach(button => {
            button.addEventListener('click', () => {
                this.appendToIsoletedNumber(button.textContent);
                // this.show();
            })
        })
    }

    show() {
        this.prevOpTxtElm.innerText = this.expression;
        this.currOpTxtElm.innerText = this.isolatedNumber;
    }

    chooseOp() { }

    calculate() { }

    valInfixOp(numOp){
        return false;
    }

    
}

// const numBt = document.querySelectorAll("[data-num]");

// Unifed to only data-op and transfer to class:
// const opBt = document.querySelectorAll("[data-op]");
const equalsBt = document.querySelector("[data-equals]");
const storeBt = document.querySelector("[data-store]");
const restoreBt = document.querySelector("[data-restore]");
const clearBt = document.querySelector("[data-clear]");
const delBt = document.querySelector("[data-del]");

// transfer to constructor or class fields:
// const prevOpTxt = document.querySelector("[data-prev]");
// const currOpTxt = document.querySelector("[data-curr]");

// const calc = new Calculator(prevOpTxt, currOpTxt);
const calc = new Calculator();

// numBt.forEach(button => {
//     button.addEventListener('click', () => {
//         calc.appNum(button.textContent);
//         calc.show();
//     })
// });

class Calculator {
    prevOpTxtElm = document.querySelector("[data-prev]");
    currOpTxtElm = document.querySelector("[data-curr]");
    expression = '';
    isolNum= '';

    

    constructor(){
        this.clear;
        this.numBtEventListener();
        this.opBtEventListener();
    }

    store() { }

    restore() { }

    clear() {
        this.currOpTxtElm = '';
        this.prevOpTxtElm = '';        
    }

    delete() { }

    appToIsolNumb(num){

        


    }

    appNum(num) {
        console.log("Last char: " + this.expression[this.expression.length-1] + " " + "Number: " + num);
        if (num === '.' && this.expression.includes('.')) return;
        this.expression = this.expression.toString() + num.toString();
        console.log(this.expression);
    }

    appOp(op){
        this.expression = this.expression.toString() + op.toString();
        console.log(this.expression);
    } 

    numBtEventListener() {
        document.querySelectorAll("[data-num]").forEach(button => {
            button.addEventListener('click', () => {
                this.appNum(button.textContent);
                this.show();
            })
        })
    }

    opBtEventListener() {
        document.querySelectorAll("[data-op]").forEach(button => {
            button.addEventListener('click', () => {
                this.appOp(button.textContent);
                this.show();
            })
        })
    }

    show() {
        this.currOpTxtElm.innerText = this.expression;
    }

    chooseOp(op) { }

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

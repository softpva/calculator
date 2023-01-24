class Calculator {
    #prevOpTxt = document.querySelector("[data-prev]");
    #currOpTxt = document.querySelector("[data-curr]");
    #currOp = '';
    #operation;

    // constructor(prevOpTxt, currOpTxt) {
    //     this.clear();
    //     this.#prevOpTxt = prevOpTxt;
    //     this.#currOpTxt = currOpTxt;
    //     this.numBtEventListener();
    // }

    constructor(){
        this.clear;
        this.numBtEventListener();
    }

    store() { }

    restore() { }

    clear() {
        this.#currOpTxt = '';
        this.#prevOpTxt = '';
        this.#operation = undefined;
    }

    delete() { }

    appNum(num) {
        if (num === '.' && this.#currOp.includes('.')) return;
        this.#currOp = this.#currOp.toString() + num.toString();
        console.log(this.#currOp);
    }

    chooseOp(op) { }

    calculate() { }

    show() {
        this.#currOpTxt.innerText = this.#currOp;
        // this.#prevOpTxt.innerText = eval("15 / 3 + 5 * 2 + 9 ** (1/2)");
    }

    numBtEventListener() {
        document.querySelectorAll("[data-num]").forEach(button => {
            button.addEventListener('click', () => {
                this.appNum(button.textContent);
                this.show();
            })
        })
    }
}

// const numBt = document.querySelectorAll("[data-num]");

// Unifed to only data-op and transfer to class:
const opBt = document.querySelectorAll("[data-op]");
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

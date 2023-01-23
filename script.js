class Calculator{
    
    constructor(prevOpTxt,currOpTxt){
        this.clear();
        this.prevOpTxt = prevOpTxt;
        this.currOpTxt = currOpTxt;
        this.currOp = '';        
    }       

    store(){}

    restore(){}

    clear(){
        this.currOpTxt = '';
        this.prevOpTxt = '';
        this.operation = undefined;
    }

    delete(){}

    appNum(num){
        if (num === '.' && this.currOp.includes('.')) return;
        this.currOp = this.currOp.toString() + num.toString();
        console.log(this.currOp);
    }    

    chooseOp(op){}

    calculate(){}

    show(){
        this.currOpTxt.innerText = this.currOp;
    }
}


const numBt = document.querySelectorAll("[data-num]");
const opBt = document.querySelectorAll("[data-op]");
const equalsBt = document.querySelector("[data-equals]");
const storeBt = document.querySelector("[data-store]");
const restoreBt = document.querySelector("[data-restore]");
const clearBt = document.querySelector("[data-clear]");
const delBt = document.querySelector("[data-del]");
const prevOpTxt = document.querySelector("[data-prev]");
const currOpTxt = document.querySelector("[data-curr]");



const calc = new Calculator(prevOpTxt,currOpTxt);

numBt.forEach(button => {
    button.addEventListener('click',() => {
        calc.appNum(button.textContent);
        calc.show();
    })
});

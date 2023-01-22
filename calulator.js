export default class Calculator{
    
    constructor(prevOpTxt,currOpTxt){
        this.prevOpTxt = prevOpTxt;
        this.currOpTxt = currOpTxt;
        this.clear();
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
        this.currOp = this.currOp.toString() + num.toString();
    }

    chooseOp(op){}

    calculate(){}

    show(){
        this.currOpTxt.innerText = this.currOp;
    }
}
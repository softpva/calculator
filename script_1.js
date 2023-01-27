class Calculator {
    expressionTextElement = document.querySelector("[data-expression]");
    currentTextElement = document.querySelector("[data-curr]");
    expression = '';
    isolatedNumber = '0';
    pressedEqual = false;
    countParenthesis = 0;

    constructor() {
        this.clearAll();
        this.buttonEventListener();
    }

    store() { }

    restore() { }

    clearAll() {
        this.currentTextElement.innerText = '0';
        this.expressionTextElement.innerText = '';
        this.expression = '';
        this.isolatedNumber = '0';
        this.countParenthesis = 0;
    }

    delete() { }

    appendToIsoletedNumber(val) {
        if (this.pressedEqual) {
            this.expression = '';
            this.pressedEqual = false;
        }
        if ((val === '-' && this.isolatedNumber === '')
            || Number.isInteger(parseInt(val)) || val === '.') {
            if (val === '.' && this.isolatedNumber.includes('.')) {
                return;
            }
            if (this.isolatedNumber[0] === '0') {
                this.isolatedNumber = '';
            }
            this.isolatedNumber += val.toString();
        } else {
            this.appendToExpression(val);
        }
        this.show();
    }

    appendToExpression(val) {
        if (this.expression[0] === '0') {
            this.expression = '';
        }
        if (this.isolatedNumber === '0') {
            this.isolatedNumber = '';
        } 
        this.expression += this.isolatedNumber.toString();
        this.isolatedNumber = ''       
        if (isNaN(this.expression[this.expression.length - 1])){ 
            if (this.expression[this.expression.length - 1] !== '-'
            || this.expression[this.expression.length - 1] !== '('){
                return;
            }
        }   
        if (val === '=') {
            this.calculate();
            return;
        }
        if (val === 'AC') {
            this.clearAll();
            return;
        }
        if (val === 'DEL') {
            this.isolatedNumber = '';
            this.currentTextElement.innerText = '0';
            return;
        }
        if (val === '(') {
            this.countParenthesis += 1;
        }
        if (val === ')' && this.countParenthesis > 0) {
            this.countParenthesis -= 1;
        }        
        this.expression += val.toString();
        return;
    }

    calculate() {
        console.log(this.countParenthesis);
        if (this.countParenthesis > 0) {
            for (let i = 0; i < this.countParenthesis; i++) {
                this.expression += ')';
            }
            this.countParenthesis = 0;
        }
        console.log(this.expression);
        this.isolatedNumber = eval(this.expression).toString();
        // this.show();
        this.pressedEqual = true
        return;
    }
    
    appOp(op) {
        this.expression = this.expression.toString() + op.toString();
    }

    buttonEventListener() {
        document.querySelectorAll("[data-num], [data-op]").forEach(button => {
            button.addEventListener('click', () => {
                this.appendToIsoletedNumber(button.textContent);
            })
        })
    }

    show() {
        this.expressionTextElement.innerText = this.expression;
        this.currentTextElement.innerText = this.isolatedNumber;
    }

    chooseOp() { }



    valInfixOp(numOp) {
        return false;
    }
}

const calc = new Calculator();
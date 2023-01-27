class Calculator {
    expressionTextElement = document.querySelector("[data-expression]");
    numberTextElement = document.querySelector("[data-current]");
    expression = '';
    number = '0';

    constructor() {
        this.clearAll();
        this.buttonEventListener();
    }

    appendToNumber(val) {
        if (this.expression[this.expression.length - 1] === '=') {
            this.expression = '';
            this.number = '0'
        }
        if (this.expression[this.expression.length - 1] === ')') return;
        if (this.number[0] === '0') this.number = '';
        if (val === '-' && this.number.includes('-')) appendToExpression(val);
        if (val === '.' && this.number.includes('.')) return;
        if ((val === '-' && this.number === '')
            || Number.isInteger(parseInt(val))
            || val === '.') {
            this.number += val.toString();
        } else {
            this.appendToExpression(val);
        }
        this.show();
    }

    appendToExpression(op) {
        if (this.expression.includes('=')) this.expression = '';
        if (this.number[0] === '0') this.number = '';
        this.expression += this.number.toString();
        this.number = '0';
        let lastCharExpr = this.expression[this.expression.length - 1];
        // exp: 2*(2+3)+5/4   ok  
        // exp: 2(2+4) -> 2*(2+4) ok
        if (isNaN(lastCharExpr)) {
            if (op === '('|| lastCharExpr === ')') {}
            else return;            
        }else if (op === '(') op='*(';

        this.expression += op.toString();
        console.log(this.expression);
        this.show();
    }

    doCommand(com) {
        if (com === '=') this.doWhenEqualSign();
        this.show();
    }

    doWhenEqualSign() {
        this.expression += this.number;
        this.number = eval(this.expression).toString();
        this.expression += '=';
        return;
    }

    buttonEventListener() {
        document.querySelectorAll("[data-num], [data-minus]").forEach(button => {
            button.addEventListener('click', () => {
                this.appendToNumber(button.textContent);
            })
        })
        document.querySelectorAll("[data-op]").forEach(button => {
            button.addEventListener('click', () => {
                this.appendToExpression(button.textContent);
            })
        })
        document.querySelectorAll("[data-com]").forEach(button => {
            button.addEventListener('click', () => {
                this.doCommand(button.textContent);
            })
        })
    }

    clearAll() {

    }

    show() {
        this.expressionTextElement.innerText = this.expression;
        this.numberTextElement.innerText = this.number;
    }
}

const calc = new Calculator();

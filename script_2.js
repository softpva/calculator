class Calculator {
    expressionTextElement = document.querySelector("[data-expression]");
    numberTextElement = document.querySelector("[data-current]");
    inMemory = document.querySelector("[data-mr");
    expression = '';
    number = '0';
    openedParenthesis = 0;
    memory = '0';

    constructor() {
        this.clearAll();
        this.buttonEventListener();
    }

    appendToNumber(val) {
        let lastCharExpr = this.expression[this.expression.length - 1];
        if (lastCharExpr === '=') {
            if (val === '-') {
                this.expression = this.number + val;
                this.number = '0';
                this.show();
                return;
            }
            this.expression = '';
            this.number = '0'
        }
        if (lastCharExpr === ')') return;
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
        // exp: 2*(2+3)+5/4= 11.25   ok  
        // exp: 2(2+4 -> 2*(2+4) = 12 ok 
        // exp: -(2+3 = -5 ok  
        // exp: 1-(2+3)*3= -14 ok     
        // exp: .25*4 = 1 ok  
        if (isNaN(lastCharExpr)) {
            if (op === '(' || lastCharExpr === ')') { }
            else return;
        } else if (op === '(') {
            op = '*(';
            this.openedParenthesis++;
        }
        if (op === '(') this.openedParenthesis++;
        if (op === ')') this.openedParenthesis--;
        if (op === ')' && this.openedParenthesis <= 0) return;
        // if (op === ')') {
        //     if (this.expression.includes('(')) {
        //         if (this.openedParenthesis > 0) { }
        //         else return;
        //     } else return;
        // }
        this.expression += op.toString();
        console.log(this.expression + "     Parenthesis:" + this.openedParenthesis);
        this.show();
    }

    doCommand(com) {
        if (com === '=') this.doWhenEqualSign();
        if (com === 'AC') this.clearAll();
        if (com === 'DEL') this.delete();
        if (com === 'MS') this.setMemory();
        this.show();

    }

    setMemory() {
        if (this.number === '0') {
            this.memory = this.number;
            this.inMemory.innerHTML = "MR";
            return;
        }
        this.memory = this.number;
        this.inMemory.innerHTML = `MR<br/><div class="mem">${this.memory.slice(0, 10)}</div>`;
    }

    doWhenEqualSign() {
        if (this.number === '0') this.number = '';
        this.expression += this.number;
        if (this.openedParenthesis > 0) {
            for (let i = 0; i < this.openedParenthesis; i++) {
                this.expression += ')';
            }
        } 
        this.openedParenthesis = 0;
        console.log(this.expression);
        this.number = eval(this.expression).toString();
        // this.number = eval(" 1 + 2 * ( - 3 + 4 ) ")
        this.number = parseFloat(this.number).toPrecision(15);
        this.number = parseFloat(this.number);
        this.expression += '=';
        return;
    }

    clearRightZeros(str) {

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
        this.expression = '';
        this.number = '0';
        this.openedParenthesis = 0;
        return;
    }

    delete() {
        if (this.number !== '0') {
            this.number = this.number.slice(0, this.number.length - 1);
            if (this.number === '') this.number = '0';
            return;
        }
        if (this.expression !== '') {
            if (this.expression[this.expression.length - 1] === '=') {
                this.expression = this.expression.slice(0, this.expression.length - 2);
            }
            this.expression = this.expression.slice(0, this.expression.length - 1);
        }
    }

    show() {
        this.expressionTextElement.innerText = this.expression;
        this.numberTextElement.innerText = this.number;
    }
}

const calc = new Calculator();


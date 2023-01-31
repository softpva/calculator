class Calculator {
    e_expression = document.querySelector("[data-expression]");
    e_number = document.querySelector("[data-current]");
    e_memory = document.querySelector("[data-mr]");
    s_expression = '';
    s_number = '0';
    n_countParenth = 0;
    s_memory = '0';

    constructor() {
        this.clearAll();
        this.buttonEventListener();
    }

    appendToNumber(val) {
        let lastCharExpr = this.s_expression[this.s_expression.length - 1];
        if (lastCharExpr === '=') {
            if (val === '-') {
                this.s_expression = this.s_number + val;
                this.s_number = '0';
                this.show();
                return;
            }
            this.s_expression = '';
            this.s_number = '0'
        }
        if (lastCharExpr === ')') return;
        if (this.s_number[0] === '0') this.s_number = '';  //---
        if (val === '-' && this.s_number.includes('-')) appendToExpression(val);
        if (val === '.' && this.s_number.includes('.')) return; //--
        if ((val === '-' && this.s_number === '')
            || Number.isInteger(parseInt(val))
            || val === '.') {
            this.s_number += val.toString();
        } else {
            this.appendToExpression(val);
        }
        this.show();
    }

    buildNumber(num){
        if (!this.b_isAValidNumber(num)) return;
        this.s_number += num;
        this.show();
        console.log(this.s_number);
    }

    b_isAValidNumber(num){
        // let c_last = this.s_expression[this.s_expression.length - 1];
        if(this.s_number.includes('.') && num === '.') return false;
        if(this.s_number[0] === '' && num === '0') return false; // ! octal
        if(this.s_number[0] === '0') this.s_number = ''; // ! octal too
        return true;
    }

    b_isAValidOperator(op){
        // c_last = this.s_expression[this.s_expression.length - 1];
        return true;

    }

    buildExpression(op){
        if (this.s_expression.includes('=')) this.s_expression = '';
        if (!this.b_isAValidOperator(op)) return;
        this.s_expression = this.s_expression + this.s_number + ' ';
        this.s_expression = this.s_expression + op + ' ';
        this.s_number = '0';
        this.show();
        console.log(this.s_expression);
    }

    appendToExpression(op) {
        if (this.s_expression.includes('=')) this.s_expression = '';
        if (this.s_number[0] === '0') this.s_number = '';
        this.s_expression += this.s_number.toString();
        this.s_number = '0';
        let lastCharExpr = this.s_expression[this.s_expression.length - 1];
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
            this.n_countParenth++;
        }
        if (op === '(') this.n_countParenth++;
        if (op === ')') this.n_countParenth--;
        if (op === ')' && this.n_countParenth <= 0) return;
        // if (op === ')') {
        //     if (this.expression.includes('(')) {
        //         if (this.openedParenthesis > 0) { }
        //         else return;
        //     } else return;
        // }
        this.s_expression += op.toString();
        console.log(this.s_expression + "     Parenthesis:" + this.n_countParenth);
        this.show();
    }

    doCommand(com) {
        if (com === '=') this.doWhenEqualSign();
        if (com === 'AC') this.clearAll();
        if (com === 'DEL') this.delete();
        if (com === 'MS') this.setMemory();
        if (com === '+/-') this.changeSignal();
        this.show();
    }

    changeSignal(){
        this.s_number = (parseFloat(this.s_number)*-1).toString();
    }

    setMemory() {
        if (this.s_number === '0') {
            this.s_memory = this.s_number;
            this.e_memory.innerHTML = "MR";
            return;
        }
        this.s_memory = this.s_number;
        this.e_memory.innerHTML = `MR<br/><div class="mem">${this.s_memory.slice(0, 10)}</div>`;
    }

    doWhenEqualSign() {
        if (this.s_number === '0') this.s_number = '';
        this.s_expression += this.s_number;
        if (this.n_countParenth > 0) {
            for (let i = 0; i < this.n_countParenth; i++) {
                this.s_expression += ')';
            }
        } 
        this.n_countParenth = 0;
        console.log(this.s_expression);
        this.s_number = eval(this.s_expression).toString();
        // this.number = eval(" 1 + 2 * ( - 3 + 4 ) ")
        this.s_number = parseFloat(this.s_number).toPrecision(15);
        this.s_number = parseFloat(this.s_number);
        this.s_expression += ' =';
        return;
    }

    buttonEventListener() {
        document.querySelectorAll("[data-num]").forEach(button => {
            button.addEventListener('click', () => {
                this.buildNumber(button.textContent);
            })
        })
        document.querySelectorAll("[data-op]").forEach(button => {
            button.addEventListener('click', () => {
                this.buildExpression(button.textContent);
            })
        })
        document.querySelectorAll("[data-com]").forEach(button => {
            button.addEventListener('click', () => {
                this.doCommand(button.textContent);
            })
        })
    }

    clearAll() {
        this.s_expression = '';
        this.s_number = '0';
        this.n_countParenth = 0;
        return;
    }

    delete() {
        if (this.s_number !== '0') {
            this.s_number = this.s_number.slice(0, this.s_number.length - 1);
            if (this.s_number === '') this.s_number = '0';
            return;
        }
        if (this.s_expression !== '') {
            if (this.s_expression[this.s_expression.length - 1] === '=') {
                this.s_expression = this.s_expression.slice(0, this.s_expression.length - 2);
            }
            this.s_expression = this.s_expression.slice(0, this.s_expression.length - 1);
        }
    }

    show() {
        this.e_expression.innerText = this.s_expression;
        this.e_number.innerText = this.s_number;
    }
}

const calc = new Calculator();


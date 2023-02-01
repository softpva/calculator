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

    buildNumber(num) {
        if (this.s_number.includes('.') && num === '.') return;
        if (this.s_number[0] === '0') this.s_number = '';
        this.s_number += num;        
        this.show();
        console.log("Number: " + this.s_number);
    }

    buildExpression(op) {        
        if (this.s_expression.includes('=')) this.s_expression = '';
        let c_penult = this.s_expression.slice(-2, -1);
        if (c_penult === ')' && this.n_countParenth !== '0') this.s_expression+= '* ';
        if (this.s_number[0] !== '0') this.s_expression += (this.s_number + ' ');        
        c_penult = this.s_expression.slice(-2, -1);
        if (isNaN(c_penult) && (op != '(' && op != ')')) return; // <----
        if (!isNaN(c_penult) && op == '(') op = '* (';
        if (c_penult === ')')
        console.log("Parenth before: " + this.n_parenthesis());
        if (op == ')' && this.n_parenthesis() === 0) return;    
        this.s_expression += (op + ' ');
        this.s_number = '0';
        this.show();
        console.log("Expr: " + this.s_expression);   
        console.log("Parenth after: " + this.n_parenthesis());     
    }

    n_parenthesis() {
        return ((this.s_expression.match(/\(/g) || []).length - (this.s_expression.match(/\)/g) || []).length);
    }

    doCommand(com) {
        if (com === '=') this.equalPressed();
        if (com === 'AC') this.clearAll();
        if (com === 'DEL') this.delete();
        if (com === 'MS') this.setMemory();
        if (com === '+/-') this.changeSignal();
        this.show();
    }

    equalPressed() {
        if (this.s_number === '0') this.s_number = '';
        this.s_expression += (this.s_number + ' ');
        if (this.n_countParenth > 0)
            for (let i = 0; i < this.n_countParenth; i++) this.s_expression += ') ';
        this.n_countParenth = 0;
        console.log("After Equal: " + this.s_expression);
        this.s_number = eval(this.s_expression).toString();
        this.s_number = parseFloat(parseFloat(this.s_number).toPrecision(15));
        this.s_expression += '= ';
        return;
    }

    changeSignal() {
        this.s_number = (parseFloat(this.s_number) * -1).toString();
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
}

const calc = new Calculator();


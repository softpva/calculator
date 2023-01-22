import Calculator from "./calulator";

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
        calc.appNum(button.innerHTML);
        calc.show();
    })
});

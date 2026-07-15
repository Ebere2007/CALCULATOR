let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('.button');

let string = "";
let arr = Array.from(buttons);

// Safer alternative to eval(): only allows numbers, decimals, and basic math operators
function safeEval(str) {
    // Only allow digits, decimal points, and basic math operators
    if (!/^[0-9+\-*/.() ]+$/.test(str)) {
        throw new Error("Invalid characters in expression");
    }
    // Strip redundant leading zeros (e.g. "005" -> "5") so strict mode
    // doesn't misread them as legacy octal literals. Decimals like "0.5"
    // are left untouched since the zero isn't followed directly by a digit.
    const sanitized = str.replace(/\b0+(?=\d)/g, "");
    return Function(`"use strict"; return (${sanitized})`)();
}
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '=') {
            if (string === "") return; // nothing to evaluate, avoid flashing "Error"
            try {
                string = safeEval(string).toString();
                input.value = string;
            } catch (err) {
                input.value = "Error";
                string = "";
            }
        }
        else if (e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if (e.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else{
          string += e.target.innerHTML;
          input.value = string;
        }

    })
})

let color1 = document.querySelector('.color1');
let color2 = document.querySelector('.color2');
let body = document.querySelector('body');

color1.addEventListener('click', () => {
    color2.style.display = 'block';
    color1.style.display = 'none';
    body.style.background = 'linear-gradient(to right, #FF0000, #000000)';
});
color2.addEventListener('click', () => {
    color2.style.display = 'none';
    color1.style.display = 'block';
    body.style.background = 'linear-gradient(135deg, rgba(0, 225, 206, 0.8) 0%, rgba(87, 68, 173, 0.8) 100%)';
})
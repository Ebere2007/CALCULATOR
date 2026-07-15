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
    return Function(`"use strict"; return (${str})`)();
}
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '=') {
            try {
                string = safeEval(string);
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
const display = document.querySelector('.display');
const tempDisplay = document.createElement('p')

const numButton = document.querySelectorAll('.operand')
const operationButton = document.querySelectorAll('.operator')
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal')
const previousText = document.querySelector('.previous')
const currentText = document.querySelector('.current')
const deleteButton = document.querySelector('.delete')



let currentNumber = '';
let previousOperand = '';
let operator;

function displayText() {
    numButton.forEach(btn => {
        btn.addEventListener('click', () => {
            currentNumber === 0 ? currentNumber = "" : '' ;
            if (btn.textContent === '.' && currentNumber.includes('.')) {
                return
            } 
            currentNumber += btn.textContent.toString()
            updateDisplay()  
        })
        
    })

    let tempNum = currentNumber;

    operationButton.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentNumber === '') {
                return;
            }
            operator = btn.textContent
            operate()
            updateDisplay()
        })
    })

    deleteButton.addEventListener('click', () => {
        let temp;
        if (currentNumber === "You Can't Divide by 0") {
            currentNumber = 0
            temp = currentNumber
        }else {
            temp = currentNumber.toString().slice(0,-1)
        }

        if (temp === '' || temp === '0') {
            temp = 0
            currentNumber = temp
            updateDisplay()
        } else {
            currentNumber = parseFloat(temp);
            updateDisplay()
        }


    })

    clearButton.addEventListener('click', () => {
        currentNumber = '';
        previousOperand ='';
        operator = null;
        updateDisplay()
    })
}

function operate() {
    if(currentNumber ==='') {
        return
    } if (previousOperand !== '') {
        calculateResults()
    }

    previousOperand = `${currentNumber} ${operator}`
    currentNumber = ''
}

function calculateResults() {
    let curr = parseFloat(currentNumber);
    let prev = parseFloat(previousOperand);
    let results;

    if(isNaN(prev) || isNaN(curr)) {
        return;
    }
    operator === "+"? results = prev + curr
    : operator === "-" ? results = prev - curr
    : operator === "*" ? results = prev * curr
    : operator === "÷" && curr === 0 ? results = "You Can't Divide by 0"
    : operator === "÷" ? results = prev / curr

    : '';

    currentNumber = results;
    operator = null;
    previousOperand = ''
    
}

equalButton.addEventListener('click', () => {
    calculateResults()
    updateDisplay()
})

displayText()

function updateDisplay() {
    currentText.textContent = currentNumber
    previousText.textContent = previousOperand
}
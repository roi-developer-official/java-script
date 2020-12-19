pure function - a function that dont cause side effects.
the funciton dont chagne sfuff inside it.
changing a variable that is outside of the function also calls causing side effects.

function createTaxCalculator(tax){
    function calculateTax(amount){
        return amount * tax;
    }
    return calculcatedTax;
}

factory functions:
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomtTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(4));
console.log(calculateIncomtTaxAmount(40));

closures: every function in js is a closure.




import { expect } from 'chai';
import { Given, When, Then, World, setWorldConstructor } from 'cucumber'
import { Calculator } from '../../src/calculator';

declare module 'cucumber' {
    interface World {
        calculator: Calculator;
        actual: number;
        log(message: string): void;
    }
}

class CalculatorWorld implements World {
    calculator: Calculator;
    actual: number;
    log(message: string): void {
        console.log(`\n${message}`); //just an example in order to add capabilities in world
    }
}

setWorldConstructor(CalculatorWorld);

Given('a calculator', function() {
    this.log('Given a calculator');
    this.calculator = new Calculator();
});

When('I add {int} and {int}', function(number1: number, number2: number) {
    this.log(`When I add ${number1} and ${number2}`);

    this.actual = this.calculator.Add(number1, number2);
});

Then("the result is {int}", function(expected: number) {
    this.log(`Then the result is ${expected}`);

    expect(this.actual).be.equal(expected);
});

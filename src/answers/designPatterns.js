// 1. Singleton Pattern
// Create a Singleton class that ensures only one instance exists.
// The class should have a getInstance() static method that always
// returns the same instance.
// --- Examples
//   const s1 = Singleton.getInstance();
//   const s2 = Singleton.getInstance();
//   s1 === s2 // true
//   s1.data = 'test';
//   s2.data // 'test'
export class Singleton {}

// 2. Observer Pattern
// Create an EventEmitter class that implements the observer pattern.
// It should have methods: on(event, callback), emit(event, data), off(event, callback)
// --- Examples
//   const emitter = new EventEmitter();
//   const callback = (data) => console.log(data);
//   emitter.on('test', callback);
//   emitter.emit('test', 'hello'); // logs 'hello'
//   emitter.off('test', callback);
//   emitter.emit('test', 'world'); // nothing logged
export class EventEmitter {}

// 3. Factory Pattern
// Create a VehicleFactory that can create different types of vehicles.
// The factory should have a static method createVehicle(type, options)
// that returns instances of Car or Motorcycle classes.
// --- Examples
//   const car = VehicleFactory.createVehicle('car', { doors: 4 });
//   car.type // 'car'
//   car.doors // 4
//   const bike = VehicleFactory.createVehicle('motorcycle', { engine: '600cc' });
//   bike.type // 'motorcycle'
//   bike.engine // '600cc'
export class VehicleFactory {}

// 4. Module Pattern
// Create a Counter module using the revealing module pattern.
// It should expose increment, decrement, and getValue methods
// while keeping the count variable private.
// --- Examples
//   Counter.increment();
//   Counter.increment();
//   Counter.getValue(); // 2
//   Counter.decrement();
//   Counter.getValue(); // 1
//   Counter.count; // undefined (private)
export const Counter = (function () {
  // Implement revealing module pattern here
})();

// 5. Strategy Pattern
// Create a Calculator class that uses different calculation strategies.
// It should accept a strategy object with an execute method.
// --- Examples
//   const addStrategy = { execute: (a, b) => a + b };
//   const multiplyStrategy = { execute: (a, b) => a * b };
//   const calc = new Calculator(addStrategy);
//   calc.calculate(5, 3); // 8
//   calc.setStrategy(multiplyStrategy);
//   calc.calculate(5, 3); // 15
export class Calculator {}

// 6. Decorator Pattern
// Create a Coffee class and decorators that can add features.
// Base coffee costs $2. Milk adds $0.5, Sugar adds $0.3.
// Each decorator should wrap the previous object.
// --- Examples
//   let coffee = new Coffee();
//   coffee.cost(); // 2
//   coffee = new MilkDecorator(coffee);
//   coffee.cost(); // 2.5
//   coffee = new SugarDecorator(coffee);
//   coffee.cost(); // 2.8
export class Coffee {}
export class MilkDecorator {}
export class SugarDecorator {}

// 7. Command Pattern
// Create a RemoteControl that can execute and undo commands.
// Commands should implement execute() and undo() methods.
// --- Examples
//   const light = new Light();
//   const turnOn = new LightOnCommand(light);
//   const turnOff = new LightOffCommand(light);
//   const remote = new RemoteControl();
//   remote.setCommand(turnOn);
//   remote.pressButton(); // light turns on
//   remote.pressUndo(); // light turns off
export class RemoteControl {}
export class Light {}
export class LightOnCommand {}
export class LightOffCommand {}

// 8. Proxy Pattern
// Create a BankAccount proxy that logs all transactions.
// The proxy should have the same interface as BankAccount
// but add logging functionality.
// --- Examples
//   const account = new BankAccount(100);
//   const proxy = new BankAccountProxy(account);
//   proxy.deposit(50); // logs: "Depositing 50" then performs operation
//   proxy.getBalance(); // 150
//   proxy.withdraw(30); // logs: "Withdrawing 30" then performs operation
export class BankAccount {}
export class BankAccountProxy {}

// 9. Chain of Responsibility Pattern
// Create a support ticket system where tickets are handled by
// different levels (Level1, Level2, Level3) based on priority.
// Each handler should either process the ticket or pass it to the next handler.
// --- Examples
//   const level1 = new Level1Handler();
//   const level2 = new Level2Handler();
//   const level3 = new Level3Handler();
//   level1.setNext(level2).setNext(level3);
//   level1.handle({ priority: 'low', issue: 'password reset' }); // handled by Level1
//   level1.handle({ priority: 'high', issue: 'server down' }); // handled by Level3
export class BaseHandler {}
export class Level1Handler {}
export class Level2Handler {}
export class Level3Handler {}

// 10. State Pattern
// Create a TrafficLight class that changes behavior based on its current state.
// States: Red (next: Green), Green (next: Yellow), Yellow (next: Red)
// --- Examples
//   const light = new TrafficLight();
//   light.getState(); // 'Red'
//   light.change(); // changes to Green
//   light.getState(); // 'Green'
//   light.change(); // changes to Yellow
//   light.getState(); // 'Yellow'
//   light.change(); // changes back to Red
export class TrafficLight {}

// 11. Builder Pattern
// Create a URLBuilder that constructs URLs step by step.
// It should have methods: protocol(), host(), path(), query(), build()
// --- Examples
//   const url = new URLBuilder()
//     .protocol('https')
//     .host('api.example.com')
//     .path('/users/123')
//     .query('include', 'profile')
//     .query('format', 'json')
//     .build();
//   // url === 'https://api.example.com/users/123?include=profile&format=json'
export class URLBuilder {}

// 12. Adapter Pattern
// Create an adapter that makes an old PaymentProcessor work with a new PaymentGateway interface.
// The new interface expects processPayment(amount, cardNumber)
// The old processor has makePayment(cardNumber, amount)
// --- Examples
//   const oldProcessor = new OldPaymentProcessor();
//   const adapter = new PaymentAdapter(oldProcessor);
//   adapter.processPayment(100, '1234-5678'); // adapts to old interface
export class OldPaymentProcessor {
  makePayment(cardNumber, amount) {
    return `Processed $${amount} with card ${cardNumber}`;
  }
}
export class PaymentAdapter {}

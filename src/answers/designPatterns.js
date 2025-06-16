// ==========================================
// CREATIONAL PATTERNS
// ==========================================
// Patterns that deal with object creation mechanisms

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

// 2. Factory Pattern
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

// 3. Builder Pattern
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

// 4. Abstract Factory Pattern
// Create an Abstract Factory that produces families of related UI components.
// Create factories for different themes (Light and Dark) that can create
// buttons and inputs with consistent styling within each theme family.
// --- Examples
//   const lightFactory = new LightThemeFactory();
//   const lightButton = lightFactory.createButton('Submit');
//   const lightInput = lightFactory.createInput('text');
//   lightButton.render(); // 'Light Button: Submit'
//   lightInput.render(); // 'Light Input: text'
//
//   const darkFactory = new DarkThemeFactory();
//   const darkButton = darkFactory.createButton('Cancel');
//   const darkInput = darkFactory.createInput('password');
//   darkButton.render(); // 'Dark Button: Cancel'
//   darkInput.render(); // 'Dark Input: password'
export class UIComponentFactory {}
export class LightThemeFactory {}
export class DarkThemeFactory {}
export class LightButton {}
export class DarkButton {}
export class LightInput {}
export class DarkInput {}

// ==========================================
// STRUCTURAL PATTERNS
// ==========================================
// Patterns that deal with object composition

// 5. Decorator Pattern
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

// 6. Adapter Pattern
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

// 7. Proxy Pattern
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

// 8. Facade Pattern
// Create a ComputerFacade that provides a simplified interface to start a computer.
// The facade should hide the complexity of individual subsystems (CPU, Memory, HardDrive)
// and provide a simple startComputer() method that coordinates all subsystems.
// --- Examples
//   const computer = new ComputerFacade();
//   computer.startComputer(); // "Computer started successfully"
//
//   const cpu = new CPU();
//   cpu.freeze(); // "CPU frozen"
//   cpu.jump(100); // "CPU jumped to address 100"
//   cpu.execute(); // "CPU executing"
//
//   const memory = new Memory();
//   memory.load(200, "data"); // "Loaded data at address 200"
//
//   const hardDrive = new HardDrive();
//   hardDrive.read(300, 50); // "Read 50 sectors starting from 300"
export class ComputerFacade {}
export class CPU {}
export class Memory {}
export class HardDrive {}

// ==========================================
// BEHAVIORAL PATTERNS
// ==========================================
// Patterns that focus on communication between objects

// 9. Observer Pattern
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

// 10. Strategy Pattern
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

// 11. Command Pattern
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

// 12. Chain of Responsibility Pattern
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

// 13. State Pattern
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

// 14. Mediator Pattern
// Create a ChatRoom mediator that coordinates communication between users.
// Users should not communicate directly with each other, but through the mediator.
// The mediator should handle message routing and maintain user lists.
// --- Examples
//   const chatRoom = new ChatRoom();
//   const alice = new User('Alice');
//   const bob = new User('Bob');
//   const charlie = new User('Charlie');
//
//   chatRoom.addUser(alice);
//   chatRoom.addUser(bob);
//   chatRoom.addUser(charlie);
//
//   alice.sendMessage('Hello everyone!'); // Message sent to Bob and Charlie
//   bob.sendPrivateMessage('Hi Alice!', alice); // Private message to Alice only
//   chatRoom.broadcast('Server message', 'System'); // System broadcast to all users
export class ChatRoom {}
export class User {}

// ==========================================
// MODULE PATTERNS
// ==========================================
// JavaScript-specific patterns for code organization

// 15. Module Pattern
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

// 16. Mixin Pattern
// Create mixins that add flying and swimming capabilities to different animal classes.
// Mixins should be reusable objects that can be applied to multiple classes.
// Use Object.assign() to mix behaviors into class prototypes.
// --- Examples
//   class Bird {
//     constructor(name) { this.name = name; }
//   }
//   class Fish {
//     constructor(name) { this.name = name; }
//   }
//   class Duck {
//     constructor(name) { this.name = name; }
//   }
//
//   applyMixin(Bird, CanFly);
//   applyMixin(Fish, CanSwim);
//   applyMixin(Duck, CanFly, CanSwim);
//
//   const eagle = new Bird('Eagle');
//   const salmon = new Fish('Salmon');
//   const mallard = new Duck('Mallard');
//
//   eagle.fly(); // 'Eagle is flying at altitude 0'
//   salmon.swim(); // 'Salmon is swimming at depth 0'
//   mallard.fly(); // 'Mallard is flying at altitude 0'
//   mallard.swim(); // 'Mallard is swimming at depth 0'
export const CanFly = {};
export const CanSwim = {};
export function applyMixin(targetClass, ...mixins) {}
export class Bird {}
export class Fish {}
export class Duck {}

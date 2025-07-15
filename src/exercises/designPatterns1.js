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
// It should have methods: addProtocol(), addHost(), addPath(), addQuery(), build()
// --- Examples
//   const url = new URLBuilder()
//     .addProtocol('https')
//     .addHost('api.example.com')
//     .addPath('/users/123')
//     .addQuery('include', 'profile')
//     .addQuery('format', 'json')
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

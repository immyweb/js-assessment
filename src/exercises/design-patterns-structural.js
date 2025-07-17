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

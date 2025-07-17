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
export class Coffee {
  cost() {
    return 2;
  }
}

class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }
}

export class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 0.5;
  }
}

export class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 0.3;
  }
}

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
export class PaymentAdapter {
  constructor(oldProcessor) {
    this.oldProcessor = oldProcessor;
  }

  processPayment(amount, cardNumber) {
    return this.oldProcessor.makePayment(cardNumber, amount);
  }
}

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
export class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    return (this.balance += amount);
  }

  getBalance() {
    return this.balance;
  }

  withdraw(amount) {
    return (this.balance -= amount);
  }
}

export class BankAccountProxy {
  constructor(account) {
    this.account = account;
  }

  deposit(amount) {
    console.log(`Depositing ${amount}`);
    this.account.deposit(amount);
  }

  getBalance() {
    return this.account.getBalance();
  }

  withdraw(amount) {
    console.log(`Withdrawing ${amount}`);
    this.account.withdraw(amount);
  }
}

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
export class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  startComputer() {
    this.cpu.freeze();
    this.cpu.jump(100);
    this.cpu.execute();
    this.memory.load(200, 'data');
    this.hardDrive.read(300, 50);
    return 'Computer started successfully';
  }
}
export class CPU {
  freeze() {
    return 'CPU frozen';
  }

  jump(address) {
    return `CPU jumped to address ${address}`;
  }

  execute() {
    return 'CPU executing';
  }
}

export class Memory {
  load(address, data) {
    return `Loaded ${data} at address ${address}`;
  }
}

export class HardDrive {
  read(sector1, sector2) {
    return `Read ${sector2} sectors starting from ${sector1}`;
  }
}

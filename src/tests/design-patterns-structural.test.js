import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  Coffee,
  MilkDecorator,
  SugarDecorator,
  BankAccount,
  BankAccountProxy,
  OldPaymentProcessor,
  PaymentAdapter,
  ComputerFacade,
  CPU,
  Memory,
  HardDrive
} from '../exercises/design-patterns-structural';

describe('Design Patterns', () => {
  // ==========================================
  // STRUCTURAL PATTERNS TESTS
  // ==========================================

  describe('STRUCTURAL PATTERNS', () => {
    describe('5. Decorator Pattern - Coffee', () => {
      it('should return base coffee cost', () => {
        const coffee = new Coffee();

        expect(coffee.cost()).toBe(2);
      });

      it('should add milk decorator cost', () => {
        let coffee = new Coffee();
        coffee = new MilkDecorator(coffee);

        expect(coffee.cost()).toBe(2.5);
      });

      it('should add sugar decorator cost', () => {
        let coffee = new Coffee();
        coffee = new SugarDecorator(coffee);

        expect(coffee.cost()).toBe(2.3);
      });

      it('should chain multiple decorators', () => {
        let coffee = new Coffee();
        coffee = new MilkDecorator(coffee);
        coffee = new SugarDecorator(coffee);

        expect(coffee.cost()).toBe(2.8);
      });

      it('should work with decorators in different order', () => {
        let coffee = new Coffee();
        coffee = new SugarDecorator(coffee);
        coffee = new MilkDecorator(coffee);

        expect(coffee.cost()).toBe(2.8);
      });
    });

    describe('6. Adapter Pattern - PaymentAdapter', () => {
      it('should adapt new interface to old processor', () => {
        const oldProcessor = new OldPaymentProcessor();
        const adapter = new PaymentAdapter(oldProcessor);

        const result = adapter.processPayment(100, '1234-5678');

        expect(result).toBe('Processed $100 with card 1234-5678');
      });

      it('should maintain the same result as direct old processor call', () => {
        const oldProcessor = new OldPaymentProcessor();
        const adapter = new PaymentAdapter(oldProcessor);

        const directResult = oldProcessor.makePayment('1234-5678', 100);
        const adaptedResult = adapter.processPayment(100, '1234-5678');

        expect(adaptedResult).toBe(directResult);
      });

      it('should work with different amounts and card numbers', () => {
        const oldProcessor = new OldPaymentProcessor();
        const adapter = new PaymentAdapter(oldProcessor);

        const result = adapter.processPayment(250.5, '9876-5432');

        expect(result).toBe('Processed $250.5 with card 9876-5432');
      });
    });

    describe('7. Proxy Pattern - BankAccount', () => {
      let consoleSpy;

      beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      });

      it('should log deposit operations', () => {
        const account = new BankAccount(100);
        const proxy = new BankAccountProxy(account);

        proxy.deposit(50);

        expect(consoleSpy).toHaveBeenCalledWith('Depositing 50');
        expect(proxy.getBalance()).toBe(150);
      });

      it('should log withdrawal operations', () => {
        const account = new BankAccount(100);
        const proxy = new BankAccountProxy(account);

        proxy.withdraw(30);

        expect(consoleSpy).toHaveBeenCalledWith('Withdrawing 30');
        expect(proxy.getBalance()).toBe(70);
      });

      it('should maintain same interface as original account', () => {
        const account = new BankAccount(100);
        const proxy = new BankAccountProxy(account);

        expect(typeof proxy.deposit).toBe('function');
        expect(typeof proxy.withdraw).toBe('function');
        expect(typeof proxy.getBalance).toBe('function');
      });
    });

    describe('8. Facade Pattern - ComputerFacade', () => {
      it('should provide a simplified interface to start computer', () => {
        const computer = new ComputerFacade();
        const result = computer.startComputer();

        expect(result).toBe('Computer started successfully');
      });

      it('should coordinate all subsystems during startup', () => {
        const computer = new ComputerFacade();

        // Create spies for individual subsystem methods
        const cpuSpy = vi
          .spyOn(CPU.prototype, 'freeze')
          .mockReturnValue('CPU frozen');
        const jumpSpy = vi
          .spyOn(CPU.prototype, 'jump')
          .mockReturnValue('CPU jumped to address 100');
        const executeSpy = vi
          .spyOn(CPU.prototype, 'execute')
          .mockReturnValue('CPU executing');
        const memorySpy = vi
          .spyOn(Memory.prototype, 'load')
          .mockReturnValue('Loaded data at address 200');
        const hardDriveSpy = vi
          .spyOn(HardDrive.prototype, 'read')
          .mockReturnValue('Read 50 sectors starting from 300');

        computer.startComputer();

        // Verify that the facade coordinates all subsystems
        expect(cpuSpy).toHaveBeenCalled();
        expect(jumpSpy).toHaveBeenCalledWith(100);
        expect(executeSpy).toHaveBeenCalled();
        expect(memorySpy).toHaveBeenCalledWith(200, 'data');
        expect(hardDriveSpy).toHaveBeenCalledWith(300, 50);

        // Restore original methods
        cpuSpy.mockRestore();
        jumpSpy.mockRestore();
        executeSpy.mockRestore();
        memorySpy.mockRestore();
        hardDriveSpy.mockRestore();
      });

      it('should allow direct access to individual subsystems', () => {
        const cpu = new CPU();
        const memory = new Memory();
        const hardDrive = new HardDrive();

        expect(cpu.freeze()).toBe('CPU frozen');
        expect(cpu.jump(100)).toBe('CPU jumped to address 100');
        expect(cpu.execute()).toBe('CPU executing');
        expect(memory.load(200, 'data')).toBe('Loaded data at address 200');
        expect(hardDrive.read(300, 50)).toBe(
          'Read 50 sectors starting from 300'
        );
      });

      it('should hide complexity from client code', () => {
        const computer = new ComputerFacade();

        // Client only needs to call one simple method
        expect(typeof computer.startComputer).toBe('function');

        // Client doesn't need to know about individual subsystems
        const result = computer.startComputer();
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
      });

      it('should handle subsystem coordination properly', () => {
        const cpu = new CPU();
        const memory = new Memory();
        const hardDrive = new HardDrive();

        // Test individual subsystem methods work correctly
        expect(cpu.freeze()).toContain('CPU frozen');
        expect(cpu.jump(500)).toContain('CPU jumped to address 500');
        expect(cpu.execute()).toContain('CPU executing');
        expect(memory.load(1000, 'test data')).toContain(
          'Loaded test data at address 1000'
        );
        expect(hardDrive.read(2000, 100)).toContain(
          'Read 100 sectors starting from 2000'
        );
      });

      it('should provide a unified interface for complex operations', () => {
        const computer = new ComputerFacade();

        // The facade should provide a simple interface that hides complexity
        expect(computer.startComputer).toBeDefined();
        expect(typeof computer.startComputer).toBe('function');

        // Multiple calls should work consistently
        expect(computer.startComputer()).toBe('Computer started successfully');
        expect(computer.startComputer()).toBe('Computer started successfully');
      });
    });
  });
});

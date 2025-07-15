import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  Singleton,
  VehicleFactory,
  Coffee,
  MilkDecorator,
  SugarDecorator,
  BankAccount,
  BankAccountProxy,
  URLBuilder,
  OldPaymentProcessor,
  PaymentAdapter,
  UIComponentFactory,
  LightThemeFactory,
  DarkThemeFactory,
  LightButton,
  DarkButton,
  LightInput,
  DarkInput,
  ComputerFacade,
  CPU,
  Memory,
  HardDrive
} from '../exercises/designPatterns1.js';

describe('Design Patterns', () => {
  // ==========================================
  // CREATIONAL PATTERNS TESTS
  // ==========================================

  describe('CREATIONAL PATTERNS', () => {
    describe('1. Singleton Pattern', () => {
      it('should return the same instance when getInstance is called multiple times', () => {
        const s1 = Singleton.getInstance();
        const s2 = Singleton.getInstance();

        expect(s1).toBe(s2);
      });

      it('should share data between instances', () => {
        const s1 = Singleton.getInstance();
        const s2 = Singleton.getInstance();

        s1.data = 'test';
        expect(s2.data).toBe('test');
      });

      it('should not allow direct instantiation', () => {
        expect(() => new Singleton()).toThrow();
      });
    });

    describe('2. Factory Pattern - VehicleFactory', () => {
      it('should create a car with correct properties', () => {
        const car = VehicleFactory.createVehicle('car', { doors: 4 });

        expect(car.type).toBe('car');
        expect(car.doors).toBe(4);
      });

      it('should create a motorcycle with correct properties', () => {
        const bike = VehicleFactory.createVehicle('motorcycle', {
          engine: '600cc'
        });

        expect(bike.type).toBe('motorcycle');
        expect(bike.engine).toBe('600cc');
      });

      it('should throw error for unknown vehicle type', () => {
        expect(() => VehicleFactory.createVehicle('plane', {})).toThrow();
      });
    });

    describe('3. Builder Pattern - URLBuilder', () => {
      it('should build a complete URL', () => {
        const url = new URLBuilder()
          .addProtocol('https')
          .addHost('api.example.com')
          .addPath('/users/123')
          .addQuery('include', 'profile')
          .addQuery('format', 'json')
          .build();

        expect(url).toBe(
          'https://api.example.com/users/123?include=profile&format=json'
        );
      });

      it('should build URL without queries', () => {
        const url = new URLBuilder()
          .addProtocol('http')
          .addHost('localhost')
          .addPath('/home')
          .build();

        expect(url).toBe('http://localhost/home');
      });

      it('should build URL without path', () => {
        const url = new URLBuilder()
          .addProtocol('https')
          .addHost('example.com')
          .build();

        expect(url).toBe('https://example.com');
      });

      it('should support method chaining', () => {
        const builder = new URLBuilder();

        expect(builder.addProtocol('https')).toBe(builder);
        expect(builder.addHost('example.com')).toBe(builder);
        expect(builder.addPath('/test')).toBe(builder);
        expect(builder.addQuery('key', 'value')).toBe(builder);
      });

      it('should handle multiple query parameters', () => {
        const url = new URLBuilder()
          .addProtocol('https')
          .addHost('api.test.com')
          .addQuery('param1', 'value1')
          .addQuery('param2', 'value2')
          .addQuery('param3', 'value3')
          .build();

        expect(url).toBe(
          'https://api.test.com/?param1=value1&param2=value2&param3=value3'
        );
      });
    });

    describe('4. Abstract Factory Pattern - UI Component Factory', () => {
      it('should create light theme components with consistent styling', () => {
        const lightFactory = new LightThemeFactory();
        const lightButton = lightFactory.createButton('Submit');
        const lightInput = lightFactory.createInput('text');

        expect(lightButton.render()).toBe('Light Button: Submit');
        expect(lightInput.render()).toBe('Light Input: text');
      });

      it('should create dark theme components with consistent styling', () => {
        const darkFactory = new DarkThemeFactory();
        const darkButton = darkFactory.createButton('Cancel');
        const darkInput = darkFactory.createInput('password');

        expect(darkButton.render()).toBe('Dark Button: Cancel');
        expect(darkInput.render()).toBe('Dark Input: password');
      });

      it('should maintain theme consistency across different component types', () => {
        const lightFactory = new LightThemeFactory();
        const darkFactory = new DarkThemeFactory();

        const lightButton = lightFactory.createButton('Test');
        const lightInput = lightFactory.createInput('email');
        const darkButton = darkFactory.createButton('Test');
        const darkInput = darkFactory.createInput('email');

        // Light theme components should all contain 'Light'
        expect(lightButton.render()).toContain('Light');
        expect(lightInput.render()).toContain('Light');

        // Dark theme components should all contain 'Dark'
        expect(darkButton.render()).toContain('Dark');
        expect(darkInput.render()).toContain('Dark');
      });

      it('should create different component types through the same factory interface', () => {
        const factory = new LightThemeFactory();

        const button1 = factory.createButton('Save');
        const button2 = factory.createButton('Delete');
        const input1 = factory.createInput('username');
        const input2 = factory.createInput('password');

        expect(button1.render()).toBe('Light Button: Save');
        expect(button2.render()).toBe('Light Button: Delete');
        expect(input1.render()).toBe('Light Input: username');
        expect(input2.render()).toBe('Light Input: password');
      });

      it('should allow switching between factory families', () => {
        let factory = new LightThemeFactory();
        let button = factory.createButton('Click Me');
        expect(button.render()).toContain('Light');

        // Switch to dark theme factory
        factory = new DarkThemeFactory();
        button = factory.createButton('Click Me');
        expect(button.render()).toContain('Dark');
      });

      it('should implement the abstract factory interface consistently', () => {
        const lightFactory = new LightThemeFactory();
        const darkFactory = new DarkThemeFactory();

        // Both factories should have the same methods
        expect(typeof lightFactory.createButton).toBe('function');
        expect(typeof lightFactory.createInput).toBe('function');
        expect(typeof darkFactory.createButton).toBe('function');
        expect(typeof darkFactory.createInput).toBe('function');
      });

      it('should handle empty or special input values', () => {
        const factory = new LightThemeFactory();

        const emptyButton = factory.createButton('');
        const emptyInput = factory.createInput('');

        expect(emptyButton.render()).toBe('Light Button: ');
        expect(emptyInput.render()).toBe('Light Input: ');
      });
    });
  });

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

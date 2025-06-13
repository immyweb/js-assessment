import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  Singleton,
  EventEmitter,
  VehicleFactory,
  Counter,
  Calculator,
  Coffee,
  MilkDecorator,
  SugarDecorator,
  RemoteControl,
  Light,
  LightOnCommand,
  LightOffCommand,
  BankAccount,
  BankAccountProxy,
  BaseHandler,
  Level1Handler,
  Level2Handler,
  Level3Handler,
  TrafficLight,
  URLBuilder,
  OldPaymentProcessor,
  PaymentAdapter
} from '../exercises/designPatterns.js';

describe('Design Patterns', () => {
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

  describe('2. Observer Pattern - EventEmitter', () => {
    let emitter;

    beforeEach(() => {
      emitter = new EventEmitter();
    });

    it('should register and emit events', () => {
      const callback = vi.fn();

      emitter.on('test', callback);
      emitter.emit('test', 'hello');

      expect(callback).toHaveBeenCalledWith('hello');
    });

    it('should support multiple callbacks for the same event', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      emitter.on('test', callback1);
      emitter.on('test', callback2);
      emitter.emit('test', 'data');

      expect(callback1).toHaveBeenCalledWith('data');
      expect(callback2).toHaveBeenCalledWith('data');
    });

    it('should remove callbacks with off method', () => {
      const callback = vi.fn();

      emitter.on('test', callback);
      emitter.emit('test', 'hello');
      expect(callback).toHaveBeenCalledTimes(1);

      emitter.off('test', callback);
      emitter.emit('test', 'world');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call callbacks for different events', () => {
      const callback = vi.fn();

      emitter.on('test1', callback);
      emitter.emit('test2', 'data');

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('3. Factory Pattern - VehicleFactory', () => {
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

  describe('4. Module Pattern - Counter', () => {
    beforeEach(() => {
      // Reset counter state if possible
      while (Counter.getValue() > 0) {
        Counter.decrement();
      }
      while (Counter.getValue() < 0) {
        Counter.increment();
      }
    });

    it('should increment and return correct value', () => {
      Counter.increment();
      Counter.increment();

      expect(Counter.getValue()).toBe(2);
    });

    it('should decrement and return correct value', () => {
      Counter.increment();
      Counter.increment();
      Counter.decrement();

      expect(Counter.getValue()).toBe(1);
    });

    it('should keep count variable private', () => {
      expect(Counter.count).toBeUndefined();
    });

    it('should have increment, decrement, and getValue methods', () => {
      expect(typeof Counter.increment).toBe('function');
      expect(typeof Counter.decrement).toBe('function');
      expect(typeof Counter.getValue).toBe('function');
    });
  });

  describe('5. Strategy Pattern - Calculator', () => {
    it('should use addition strategy', () => {
      const addStrategy = { execute: (a, b) => a + b };
      const calc = new Calculator(addStrategy);

      expect(calc.calculate(5, 3)).toBe(8);
    });

    it('should use multiplication strategy', () => {
      const multiplyStrategy = { execute: (a, b) => a * b };
      const calc = new Calculator(multiplyStrategy);

      expect(calc.calculate(5, 3)).toBe(15);
    });

    it('should change strategy dynamically', () => {
      const addStrategy = { execute: (a, b) => a + b };
      const multiplyStrategy = { execute: (a, b) => a * b };
      const calc = new Calculator(addStrategy);

      expect(calc.calculate(5, 3)).toBe(8);

      calc.setStrategy(multiplyStrategy);
      expect(calc.calculate(5, 3)).toBe(15);
    });

    it('should work with custom strategies', () => {
      const subtractStrategy = { execute: (a, b) => a - b };
      const calc = new Calculator(subtractStrategy);

      expect(calc.calculate(10, 3)).toBe(7);
    });
  });

  describe('6. Decorator Pattern - Coffee', () => {
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

  describe('7. Command Pattern', () => {
    it('should execute and undo light commands', () => {
      const light = new Light();
      const turnOn = new LightOnCommand(light);
      const turnOff = new LightOffCommand(light);
      const remote = new RemoteControl();

      expect(light.isOn).toBe(false);

      remote.setCommand(turnOn);
      remote.pressButton();
      expect(light.isOn).toBe(true);

      remote.pressUndo();
      expect(light.isOn).toBe(false);

      remote.setCommand(turnOff);
      remote.pressButton();
      expect(light.isOn).toBe(false);

      remote.pressUndo();
      expect(light.isOn).toBe(true);
    });

    it('should track command history for undo operations', () => {
      const light = new Light();
      const turnOn = new LightOnCommand(light);
      const remote = new RemoteControl();

      remote.setCommand(turnOn);
      remote.pressButton();
      remote.pressButton();

      expect(light.isOn).toBe(true);

      remote.pressUndo();
      expect(light.isOn).toBe(false);

      remote.pressUndo();
      expect(light.isOn).toBe(true);
    });
  });

  describe('8. Proxy Pattern - BankAccount', () => {
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

  describe('9. Chain of Responsibility Pattern', () => {
    it('should handle low priority tickets at Level 1', () => {
      const level1 = new Level1Handler();
      const level2 = new Level2Handler();
      const level3 = new Level3Handler();

      level1.setNext(level2).setNext(level3);

      const result = level1.handle({
        priority: 'low',
        issue: 'password reset'
      });
      expect(result).toContain('Level1');
    });

    it('should handle high priority tickets at Level 3', () => {
      const level1 = new Level1Handler();
      const level2 = new Level2Handler();
      const level3 = new Level3Handler();

      level1.setNext(level2).setNext(level3);

      const result = level1.handle({ priority: 'high', issue: 'server down' });
      expect(result).toContain('Level3');
    });

    it('should handle medium priority tickets at Level 2', () => {
      const level1 = new Level1Handler();
      const level2 = new Level2Handler();
      const level3 = new Level3Handler();

      level1.setNext(level2).setNext(level3);

      const result = level1.handle({ priority: 'medium', issue: 'bug report' });
      expect(result).toContain('Level2');
    });

    it('should return chain methods for fluent interface', () => {
      const level1 = new Level1Handler();
      const level2 = new Level2Handler();

      const result = level1.setNext(level2);
      expect(result).toBe(level2);
    });
  });

  describe('10. State Pattern - TrafficLight', () => {
    it('should start in Red state', () => {
      const light = new TrafficLight();

      expect(light.getState()).toBe('Red');
    });

    it('should transition from Red to Green', () => {
      const light = new TrafficLight();

      light.change();
      expect(light.getState()).toBe('Green');
    });

    it('should transition from Green to Yellow', () => {
      const light = new TrafficLight();

      light.change(); // Red -> Green
      light.change(); // Green -> Yellow
      expect(light.getState()).toBe('Yellow');
    });

    it('should transition from Yellow to Red', () => {
      const light = new TrafficLight();

      light.change(); // Red -> Green
      light.change(); // Green -> Yellow
      light.change(); // Yellow -> Red
      expect(light.getState()).toBe('Red');
    });

    it('should cycle through all states correctly', () => {
      const light = new TrafficLight();
      const states = [];

      states.push(light.getState());
      light.change();
      states.push(light.getState());
      light.change();
      states.push(light.getState());
      light.change();
      states.push(light.getState());

      expect(states).toEqual(['Red', 'Green', 'Yellow', 'Red']);
    });
  });

  describe('11. Builder Pattern - URLBuilder', () => {
    it('should build a complete URL', () => {
      const url = new URLBuilder()
        .protocol('https')
        .host('api.example.com')
        .path('/users/123')
        .query('include', 'profile')
        .query('format', 'json')
        .build();

      expect(url).toBe(
        'https://api.example.com/users/123?include=profile&format=json'
      );
    });

    it('should build URL without queries', () => {
      const url = new URLBuilder()
        .protocol('http')
        .host('localhost')
        .path('/home')
        .build();

      expect(url).toBe('http://localhost/home');
    });

    it('should build URL without path', () => {
      const url = new URLBuilder()
        .protocol('https')
        .host('example.com')
        .build();

      expect(url).toBe('https://example.com');
    });

    it('should support method chaining', () => {
      const builder = new URLBuilder();

      expect(builder.protocol('https')).toBe(builder);
      expect(builder.host('example.com')).toBe(builder);
      expect(builder.path('/test')).toBe(builder);
      expect(builder.query('key', 'value')).toBe(builder);
    });

    it('should handle multiple query parameters', () => {
      const url = new URLBuilder()
        .protocol('https')
        .host('api.test.com')
        .query('param1', 'value1')
        .query('param2', 'value2')
        .query('param3', 'value3')
        .build();

      expect(url).toBe(
        'https://api.test.com?param1=value1&param2=value2&param3=value3'
      );
    });
  });

  describe('12. Adapter Pattern - PaymentAdapter', () => {
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
});

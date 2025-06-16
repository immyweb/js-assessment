import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
  HardDrive,
  ChatRoom,
  User,
  CanFly,
  CanSwim,
  applyMixin,
  Bird,
  Fish,
  Duck
} from '../exercises/designPatterns.js';

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

  // ==========================================
  // BEHAVIORAL PATTERNS TESTS
  // ==========================================

  describe('BEHAVIORAL PATTERNS', () => {
    describe('9. Observer Pattern - EventEmitter', () => {
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

    describe('10. Strategy Pattern - Calculator', () => {
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

    describe('11. Command Pattern', () => {
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

    describe('12. Chain of Responsibility Pattern', () => {
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

        const result = level1.handle({
          priority: 'high',
          issue: 'server down'
        });
        expect(result).toContain('Level3');
      });

      it('should handle medium priority tickets at Level 2', () => {
        const level1 = new Level1Handler();
        const level2 = new Level2Handler();
        const level3 = new Level3Handler();

        level1.setNext(level2).setNext(level3);

        const result = level1.handle({
          priority: 'medium',
          issue: 'bug report'
        });
        expect(result).toContain('Level2');
      });

      it('should return chain methods for fluent interface', () => {
        const level1 = new Level1Handler();
        const level2 = new Level2Handler();

        const result = level1.setNext(level2);
        expect(result).toBe(level2);
      });
    });

    describe('13. State Pattern - TrafficLight', () => {
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

    describe('14. Mediator Pattern - ChatRoom', () => {
      let chatRoom;
      let alice, bob, charlie;
      let consoleSpy;

      beforeEach(() => {
        chatRoom = new ChatRoom();
        alice = new User('Alice');
        bob = new User('Bob');
        charlie = new User('Charlie');
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockRestore();
      });

      it('should add users to the chat room', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);

        expect(chatRoom.getUsers()).toContain(alice);
        expect(chatRoom.getUsers()).toContain(bob);
        expect(chatRoom.getUsers()).toHaveLength(2);
      });

      it('should remove users from the chat room', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.removeUser(alice);

        expect(chatRoom.getUsers()).not.toContain(alice);
        expect(chatRoom.getUsers()).toContain(bob);
        expect(chatRoom.getUsers()).toHaveLength(1);
      });

      it('should allow users to send messages through the mediator', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);

        alice.sendMessage('Hello everyone!');

        // Bob and Charlie should receive the message, but not Alice
        expect(bob.getMessages()).toContain('Alice: Hello everyone!');
        expect(charlie.getMessages()).toContain('Alice: Hello everyone!');
        expect(alice.getMessages()).not.toContain('Alice: Hello everyone!');
      });

      it('should allow private messaging between users', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);

        bob.sendPrivateMessage('Hi Alice!', alice);

        // Only Alice should receive the private message
        expect(alice.getMessages()).toContain('Bob (private): Hi Alice!');
        expect(charlie.getMessages()).not.toContain('Bob (private): Hi Alice!');
        expect(bob.getMessages()).not.toContain('Bob (private): Hi Alice!');
      });

      it('should allow system broadcasts to all users', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);

        chatRoom.broadcast('Server maintenance in 5 minutes', 'System');

        // All users should receive the system message
        expect(alice.getMessages()).toContain(
          'System: Server maintenance in 5 minutes'
        );
        expect(bob.getMessages()).toContain(
          'System: Server maintenance in 5 minutes'
        );
        expect(charlie.getMessages()).toContain(
          'System: Server maintenance in 5 minutes'
        );
      });

      it('should prevent users from communicating directly', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);

        // Users should communicate through the mediator, not directly
        expect(alice.chatRoom).toBe(chatRoom);
        expect(bob.chatRoom).toBe(chatRoom);

        // Users should not have direct references to other users
        expect(alice.sendMessage).toBeDefined();
        expect(typeof alice.sendMessage).toBe('function');
      });

      it('should handle empty chat room gracefully', () => {
        alice.setChatRoom(chatRoom);

        // Sending message to empty chat room should not crash
        expect(() => alice.sendMessage('Hello?')).not.toThrow();
      });

      it('should maintain user message history', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);

        alice.sendMessage('First message');
        bob.sendMessage('Second message');
        alice.sendMessage('Third message');

        expect(bob.getMessages()).toHaveLength(2); // Should have Alice's two messages
        expect(alice.getMessages()).toHaveLength(1); // Should have Bob's one message
      });

      it('should support user identification in messages', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);

        alice.sendMessage('Test message');

        expect(bob.getMessages()[0]).toContain('Alice:');
        expect(bob.getMessages()[0]).toContain('Test message');
      });

      it('should handle user removal during active chat', () => {
        chatRoom.addUser(alice);
        chatRoom.addUser(bob);
        chatRoom.addUser(charlie);

        alice.sendMessage('Before removal');
        chatRoom.removeUser(bob);
        alice.sendMessage('After removal');

        // Charlie should receive both messages
        expect(charlie.getMessages()).toContain('Alice: Before removal');
        expect(charlie.getMessages()).toContain('Alice: After removal');

        // Bob should only have the first message
        expect(bob.getMessages()).toContain('Alice: Before removal');
        expect(bob.getMessages()).not.toContain('Alice: After removal');
      });
    });
  });

  // ==========================================
  // MODULE PATTERNS TESTS
  // ==========================================

  describe('MODULE PATTERNS', () => {
    describe('15. Module Pattern - Counter', () => {
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

    describe('16. Mixin Pattern - Animal Behaviors', () => {
      it('should apply flying mixin to Bird class', () => {
        applyMixin(Bird, CanFly);
        const eagle = new Bird('Eagle');

        expect(typeof eagle.fly).toBe('function');
        expect(eagle.fly()).toContain('Eagle is flying');
        expect(eagle.fly()).toContain('altitude 0');
      });

      it('should apply swimming mixin to Fish class', () => {
        applyMixin(Fish, CanSwim);
        const salmon = new Fish('Salmon');

        expect(typeof salmon.swim).toBe('function');
        expect(salmon.swim()).toContain('Salmon is swimming');
        expect(salmon.swim()).toContain('depth 0');
      });

      it('should apply multiple mixins to Duck class', () => {
        applyMixin(Duck, CanFly, CanSwim);
        const mallard = new Duck('Mallard');

        expect(typeof mallard.fly).toBe('function');
        expect(typeof mallard.swim).toBe('function');
        expect(mallard.fly()).toContain('Mallard is flying');
        expect(mallard.swim()).toContain('Mallard is swimming');
      });

      it('should allow setting and getting altitude for flying animals', () => {
        applyMixin(Bird, CanFly);
        const hawk = new Bird('Hawk');

        hawk.setAltitude(1000);
        expect(hawk.getAltitude()).toBe(1000);
        expect(hawk.fly()).toContain('altitude 1000');
      });

      it('should allow setting and getting depth for swimming animals', () => {
        applyMixin(Fish, CanSwim);
        const tuna = new Fish('Tuna');

        tuna.setDepth(50);
        expect(tuna.getDepth()).toBe(50);
        expect(tuna.swim()).toContain('depth 50');
      });

      it('should not interfere with original class methods', () => {
        applyMixin(Bird, CanFly);
        const robin = new Bird('Robin');

        expect(robin.name).toBe('Robin');
        expect(typeof robin.fly).toBe('function');
      });

      it('should apply mixins to multiple instances independently', () => {
        applyMixin(Duck, CanFly, CanSwim);
        const duck1 = new Duck('Duck1');
        const duck2 = new Duck('Duck2');

        duck1.setAltitude(100);
        duck2.setAltitude(200);

        expect(duck1.getAltitude()).toBe(100);
        expect(duck2.getAltitude()).toBe(200);
        expect(duck1.fly()).toContain('altitude 100');
        expect(duck2.fly()).toContain('altitude 200');
      });

      it('should handle mixins with overlapping method names gracefully', () => {
        applyMixin(Duck, CanFly, CanSwim);
        const duck = new Duck('TestDuck');

        // Both mixins might have a 'move' method - last one should win
        expect(typeof duck.fly).toBe('function');
        expect(typeof duck.swim).toBe('function');
      });

      it('should allow selective mixin application', () => {
        // Apply only flying to one class
        applyMixin(Bird, CanFly);
        const eagle = new Bird('Eagle');

        // Apply only swimming to another class
        applyMixin(Fish, CanSwim);
        const shark = new Fish('Shark');

        expect(typeof eagle.fly).toBe('function');
        expect(typeof eagle.swim).toBe('undefined');
        expect(typeof shark.swim).toBe('function');
        expect(typeof shark.fly).toBe('undefined');
      });

      it('should preserve mixin state per instance', () => {
        applyMixin(Duck, CanFly, CanSwim);
        const duck1 = new Duck('Duck1');
        const duck2 = new Duck('Duck2');

        duck1.setAltitude(500);
        duck1.setDepth(10);
        duck2.setAltitude(300);
        duck2.setDepth(20);

        expect(duck1.getAltitude()).toBe(500);
        expect(duck1.getDepth()).toBe(10);
        expect(duck2.getAltitude()).toBe(300);
        expect(duck2.getDepth()).toBe(20);
      });

      it('should work with inheritance and mixins together', () => {
        class Penguin extends Bird {
          constructor(name) {
            super(name);
            this.species = 'penguin';
          }
        }

        applyMixin(Penguin, CanSwim);
        const pingu = new Penguin('Pingu');

        expect(pingu.name).toBe('Pingu');
        expect(pingu.species).toBe('penguin');
        expect(typeof pingu.swim).toBe('function');
        expect(pingu.swim()).toContain('Pingu is swimming');
      });

      it('should handle empty mixin application gracefully', () => {
        const originalBird = new Bird('TestBird');
        applyMixin(Bird); // No mixins provided
        const newBird = new Bird('TestBird2');

        expect(newBird.name).toBe('TestBird2');
        expect(typeof newBird.fly).toBe('undefined');
      });
    });
  });
});

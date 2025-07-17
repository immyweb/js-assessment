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
export class EventEmitter {
  constructor() {
    this.observers = new Map();
  }

  on(event, callback) {
    const callbacks = this.observers.get(event) || [];
    this.observers.set(event, [...callbacks, callback]);
  }

  emit(event, data) {
    if (this.observers.has(event)) {
      const callbacks = this.observers.get(event);
      callbacks.forEach((cb) => {
        cb(data);
      });
    }
  }

  off(event, callback) {
    if (this.observers.has(event)) {
      const callbacks = this.observers.get(event);
      const updatedCallbacks = callbacks.filter((cb) => cb !== callback);
      this.observers.set(event, updatedCallbacks);
    }
  }
}

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
export class Calculator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  calculate(num1, num2) {
    return this.strategy.execute(num1, num2);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }
}

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
export class RemoteControl {
  constructor() {
    this.command = null;
    this.commandHistory = [];
  }

  setCommand(command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
    this.commandHistory.push(this.command);
  }

  pressUndo() {
    if (this.commandHistory.length > 0) {
      const lastCommand = this.commandHistory.pop(); // Get last command

      lastCommand.undo();
    }
  }
}

export class Light {
  constructor() {
    this.isOn = false;
  }

  on() {
    this.isOn = true;
  }

  off() {
    this.isOn = false;
  }
}

export class LightOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.on();
  }

  undo() {
    this.light.off();
  }
}

export class LightOffCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.off();
  }

  undo() {
    this.light.on();
  }
}

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
export class BaseHandler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // Return the handler that was set as next
  }

  handle(ticket) {
    return 'No handler available for this ticket';
  }
}

export class Level1Handler extends BaseHandler {
  handle(ticket) {
    if (ticket.priority === 'low') {
      return 'Level1';
    } else if (this.nextHandler) {
      return this.nextHandler.handle(ticket);
    } else {
      return super.handle(ticket);
    }
  }
}

export class Level2Handler extends BaseHandler {
  handle(ticket) {
    if (ticket.priority === 'medium') {
      return 'Level2';
    } else if (this.nextHandler) {
      return this.nextHandler.handle(ticket);
    } else {
      return super.handle(ticket);
    }
  }
}

export class Level3Handler extends BaseHandler {
  handle(ticket) {
    if (ticket.priority === 'high') {
      return 'Level3';
    } else if (this.nextHandler) {
      return this.nextHandler.handle(ticket);
    } else {
      return super.handle(ticket);
    }
  }
}

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
export class TrafficLight {
  constructor() {
    // Initialize the state cache
    this.stateCache = {
      Red: null,
      Green: null,
      Yellow: null
    };

    // Set initial state
    this.currentState = this.getStateInstance('Red');
  }

  // Get or create a state instance
  getStateInstance(stateName) {
    if (!this.stateCache[stateName]) {
      // Create new state if not in cache
      switch (stateName) {
        case 'Red':
          this.stateCache[stateName] = new RedState(this);
          break;
        case 'Green':
          this.stateCache[stateName] = new GreenState(this);
          break;
        case 'Yellow':
          this.stateCache[stateName] = new YellowState(this);
          break;
      }
    }
    // Return cached instance
    return this.stateCache[stateName];
  }

  getState() {
    return this.currentState.state;
  }

  change() {
    // Let the current state determine the next state name
    const nextStateName = this.currentState.getNextStateName();

    // Get the next state instance from cache
    this.currentState = this.getStateInstance(nextStateName);
  }
}

class RedState {
  constructor(trafficLight) {
    this.state = 'Red';
    this.trafficLight = trafficLight;
  }

  getNextStateName() {
    return 'Green';
  }

  change() {
    this.trafficLight.currentState =
      this.trafficLight.getStateInstance('Green');
  }
}

class YellowState {
  constructor(trafficLight) {
    this.state = 'Yellow';
    this.trafficLight = trafficLight;
  }

  getNextStateName() {
    return 'Red';
  }

  change() {
    this.trafficLight.currentState = this.trafficLight.getStateInstance('Red');
  }
}

class GreenState {
  constructor(trafficLight) {
    this.state = 'Green';
    this.trafficLight = trafficLight;
  }

  getNextStateName() {
    return 'Yellow';
  }

  change() {
    this.trafficLight.currentState =
      this.trafficLight.getStateInstance('Yellow');
  }
}

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
export class ChatRoom {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    user.chatRoom = this;
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  removeUser(user) {
    if (this.users.includes(user)) {
      const updatedUsers = this.users.filter((name) => name !== user);
      this.users = updatedUsers;
    } else {
      return `${user} does not exist!`;
    }
  }

  broadcast(message, sender) {
    this.users.forEach((user) => {
      if (user.name !== sender) {
        user.receiveMessage(message, sender);
      }
    });
  }
}

export class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
    this.messages = [];
  }

  getMessages() {
    return this.messages;
  }

  sendMessage(message) {
    this.chatRoom.broadcast(message, this.name);
  }

  receiveMessage(message, sender, type) {
    if (type === 'private') {
      this.messages.push(`${sender} (private): ${message}`);
    } else {
      this.messages.push(`${sender}: ${message}`);
    }
  }

  sendPrivateMessage(message, user) {
    if (this.chatRoom.users.includes(user)) {
      const recepiant = this.chatRoom.users.find((u) => u.name === user.name);
      recepiant.receiveMessage(message, this.name, 'private');
    } else {
      return `${user} does not exist!`;
    }
  }
}

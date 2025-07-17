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

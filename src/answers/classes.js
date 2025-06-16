/**
 * For each of the following exercises, write a function or class that returns
 * the correct result.
 *
 * These exercises focus on ES6 classes, prototypes, and inheritance concepts.
 * You'll need to understand constructors, methods, inheritance, and the prototype chain.
 */

/**
 * Create a Person class with a constructor that accepts name and age.
 * Add a greet method that returns "Hello, I'm {name} and I'm {age} years old"
 *
 * const person = new Person('Alice', 25);
 * person.greet() // "Hello, I'm Alice and I'm 25 years old"
 */
export class Person {
  // TODO: Implement Person class
}

/**
 * Create a Student class that extends Person and adds a grade property.
 * Override the greet method to include the grade.
 * Add a study method that returns "{name} is studying"
 *
 * const student = new Student('Bob', 20, 'A');
 * student.greet() // "Hello, I'm Bob and I'm 20 years old. My grade is A"
 * student.study() // "Bob is studying"
 */
export class Student extends Person {
  // TODO: Implement Student class
}

/**
 * Create a Media class with title, duration, and play methods.
 * Create Book and AudioBook classes that extend Media.
 * Book should add pages property, AudioBook should add narrator property.
 * Override play method appropriately for each type.
 *
 * const book = new Book('1984', 300, 328);
 * book.play() // "Reading 1984"
 * const audiobook = new AudioBook('Dune', 850, 'Scott Brick');
 * audiobook.play() // "Playing Dune narrated by Scott Brick"
 */
export class Media {
  // TODO: Implement Media class
}

export class Book extends Media {
  // TODO: Implement Book class
}

export class AudioBook extends Media {
  // TODO: Implement AudioBook class
}

/**
 * Create a Calculator class with private fields for current value.
 * Add methods: add, subtract, multiply, divide, getValue, reset.
 * Use private fields to encapsulate the internal state.
 *
 * const calc = new Calculator();
 * calc.add(5).multiply(2).subtract(3); // method chaining
 * calc.getValue() // 7
 * calc.reset();
 * calc.getValue() // 0
 */
export class Calculator {
  // TODO: Implement Calculator class with private field and method chaining
}

/**
 * Create a constructor function Animal (old-style, not class) that accepts name and species.
 * Add a speak method to the prototype that returns "{name} makes a sound"
 *
 * const dog = new Animal('Rex', 'dog');
 * dog.speak() // "Rex makes a sound"
 */
export function Animal(name, species) {
  // TODO: Implement constructor function
}

// TODO: Add speak method to Animal prototype

/**
 * Create a Dog constructor that inherits from Animal using prototype chain.
 * Override the speak method to return "{name} barks"
 *
 * const dog = new Dog('Rex');
 * dog.speak() // "Rex barks"
 * dog instanceof Animal // true
 * dog instanceof Dog // true
 */
export function Dog(name) {
  // TODO: Implement Dog constructor with inheritance
}

// TODO: Set up prototype inheritance for Dog

/**
 * Create a Logger class that demonstrates static methods and properties.
 * Add static methods: log(message), warn(message), error(message).
 * Track total log count with a static property.
 * Add static method getLogCount() to retrieve total logs.
 *
 * Logger.log('Hello');
 * Logger.warn('Warning');
 * Logger.getLogCount() // 2
 */
export class Logger {
  // TODO: Implement Logger class with static methods and properties
}

/**
 * Create a Task class with id, title, completed properties.
 * Add static method getNextId() that returns incremental IDs.
 * Add instance methods: complete(), incomplete(), toggle().
 *
 * const task1 = new Task('Learn JavaScript');
 * task1.id // 1
 * const task2 = new Task('Practice coding');
 * task2.id // 2
 * task1.complete();
 * task1.completed // true
 */
export class Task {
  // TODO: Implement Task class with static ID generation
}

/**
 * Create a Shape class with area method that throws error (abstract method).
 * Create Rectangle and Circle classes that extend Shape and implement area.
 *
 * const rect = new Rectangle(5, 10);
 * rect.area() // 50
 * const circle = new Circle(3);
 * circle.area() // Math.PI * 9
 */
export class Shape {
  // TODO: Implement abstract Shape class
}

export class Rectangle extends Shape {
  // TODO: Implement Rectangle class
}

export class Circle extends Shape {
  // TODO: Implement Circle class
}

/**
 * Create a Validator mixin that adds validation capabilities to any class.
 * The mixin should add validate() and addRule(rule) methods.
 * Rules should be functions that return true/false.
 *
 * class User {}
 * const ValidatedUser = addValidation(User);
 * const user = new ValidatedUser();
 * user.addRule((obj) => obj.name && obj.name.length > 0);
 * user.name = 'John';
 * user.validate() // true
 */
export function addValidation(BaseClass) {
  // TODO: Implement mixin that adds validation capabilities
}

/**
 * Create a method that demonstrates method binding and context.
 * Return an object with a name property and methods that show different this contexts.
 *
 * const obj = createContextDemo('Alice');
 * obj.regularMethod() // "Alice"
 * const detached = obj.regularMethod;
 * detached() // undefined (lost context)
 * obj.boundMethod() // "Alice" (always bound)
 * obj.arrowMethod() // "Alice" (lexically bound)
 */
export function createContextDemo(name) {
  // TODO: Create object demonstrating this context with different binding methods
}

/**
 * Create a factory function that creates objects with prototype chain.
 * Should create objects that inherit from a common prototype with shared methods.
 *
 * const person1 = createPersonWithPrototype('Alice', 25);
 * const person2 = createPersonWithPrototype('Bob', 30);
 * person1.greet() // "Hello, I'm Alice"
 * person1.__proto__ === person2.__proto__ // true (shared prototype)
 */
export function createPersonWithPrototype(name, age) {
  // TODO: Create factory with prototype chain
}

/**
 * Create a function that demonstrates prototype chain traversal.
 * Should return an array of all property names found in the prototype chain.
 *
 * getPrototypeChain(obj) // ['prop1', 'prop2', 'toString', 'valueOf', ...]
 */
export function getPrototypeChain(obj) {
  // TODO: Traverse prototype chain and collect property names
}

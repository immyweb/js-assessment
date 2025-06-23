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
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
  }
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
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old. My grade is ${this.grade}`;
  }

  study() {
    return `${this.name} is studying`;
  }
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
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
  }

  play() {}
}

export class Book extends Media {
  constructor(title, duration, pages) {
    super(title, duration);
    this.pages = pages;
  }

  play() {
    return `Reading ${this.title}`;
  }
}

export class AudioBook extends Media {
  constructor(title, duration, narrator) {
    super(title, duration);
    this.narrator = narrator;
  }

  play() {
    return `Playing ${this.title} narrated by ${this.narrator}`;
  }
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
  _currentValue = 0;

  add(num) {
    this._currentValue += num;
    return this;
  }

  subtract(num) {
    this._currentValue -= num;
    return this;
  }

  multiply(num) {
    this._currentValue *= num;
    return this;
  }

  divide(num) {
    this._currentValue /= num;
    return this;
  }

  getValue() {
    return this._currentValue;
  }

  reset() {
    this._currentValue = 0;
    return this;
  }
}

/**
 * Create a constructor function Animal (old-style, not class) that accepts name and species.
 * Add a speak method to the prototype that returns "{name} makes a sound"
 *
 * const dog = new Animal('Rex', 'dog');
 * dog.speak() // "Rex makes a sound"
 */
export function Animal(name, species) {
  this.name = name;
  this.species = species;
}

// TODO: Add speak method to Animal prototype
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

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
  Animal.call(this, name);
}

// TODO: Set up prototype inheritance for Dog
Object.setPrototypeOf(Dog.prototype, Animal.prototype);
Dog.prototype.speak = function () {
  return `${this.name} barks`;
};

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
  static count = 0;

  static log(message) {
    this.count++;
    return message;
  }

  static warn(message) {
    this.count++;
    return message;
  }

  static error(message) {
    this.count++;
    return message;
  }

  static getLogCount() {
    return this.count;
  }
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
  static currentId = 0;

  constructor(title) {
    this.title = title;
    this.completed = false;
    this.id = Task.getNextId();
  }

  static getNextId() {
    return ++this.currentId;
  }

  complete() {
    this.completed = true;
  }

  incomplete() {
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
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
  area() {
    throw new Error('');
  }
}

export class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

export class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
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
  return class extends BaseClass {
    constructor(...args) {
      super(...args);
      this.rules = [];
    }

    addRule(rule) {
      this.rules.push(rule);
    }

    validate() {
      return this.rules.every((rule) => rule(this));
    }
  };
}

/**
 * Create a mixin function that adds logging capabilities to any class.
 * The mixin should add log() and getLogs() methods to instances.
 *
 * class TestClass {
 *   constructor(name) { this.name = name; }
 * }
 * const LoggableClass = addLogging(TestClass);
 * const instance = new LoggableClass('test');
 * instance.log('Hello');
 * instance.log('World');
 * instance.getLogs() // ['Hello', 'World']
 */
export function addLogging(BaseClass) {
  return class extends BaseClass {
    constructor(...args) {
      super(...args);
      this.logs = [];
    }

    log(message) {
      this.logs.push(message);
    }

    getLogs() {
      return this.logs;
    }
  };
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
  const obj = {
    name,

    regularMethod() {
      return this && this.name;
    },

    boundMethod: function () {
      return this.name;
    },

    arrowMethod: () => {
      return obj.name;
    }
  };

  // Bind the boundMethod to ensure it always has the correct context
  obj.boundMethod = obj.boundMethod.bind(obj);

  return obj;
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
const personPrototype = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

export function createPersonWithPrototype(name, age) {
  const person = Object.create(personPrototype);
  person.name = name;
  person.age = age;

  return person;
}

/**
 * Create a function that demonstrates prototype chain traversal.
 * Should return an array of all property names found in the prototype chain.
 *
 * getPrototypeChain(obj) // ['prop1', 'prop2', 'toString', 'valueOf', ...]
 */
export function getPrototypeChain(obj) {
  const properties = [];
  let current = obj;

  // Traverse the prototype chain until we reach null
  while (current !== null) {
    // Get all property names from current object/prototype
    Object.getOwnPropertyNames(current).forEach((prop) => {
      if (!properties.includes(prop)) {
        properties.push(prop);
      }
    });

    // Move up the prototype chain
    current = Object.getPrototypeOf(current);
  }

  return properties;
}

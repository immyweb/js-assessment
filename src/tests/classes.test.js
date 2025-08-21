import { describe, it, expect, beforeEach } from 'vitest';
import {
  Person,
  Student,
  Media,
  Book,
  AudioBook,
  Calculator,
  Animal,
  Dog,
  Logger,
  Task,
  Shape,
  Rectangle,
  Circle,
  addValidation,
  createContextDemo,
  createPersonWithPrototype,
  getPrototypeChain
} from '../exercises/classes.js';

describe('Class and Prototype Exercises', () => {
  describe('Person class', () => {
    it('should create person with name and age', () => {
      const person = new Person('Alice', 25);

      expect(person.name).toBe('Alice');
      expect(person.age).toBe(25);
    });

    it('should have greet method', () => {
      const person = new Person('Alice', 25);

      expect(person.greet()).toBe("Hello, I'm Alice and I'm 25 years old");
    });

    it('should be instance of Person', () => {
      const person = new Person('Alice', 25);

      expect(person instanceof Person).toBe(true);
    });
  });

  describe('Student class', () => {
    it('should extend Person class', () => {
      const student = new Student('Bob', 20, 'A');

      expect(student instanceof Student).toBe(true);
      expect(student instanceof Person).toBe(true);
      expect(student.name).toBe('Bob');
      expect(student.age).toBe(20);
      expect(student.grade).toBe('A');
    });

    it('should override greet method', () => {
      const student = new Student('Bob', 20, 'A');

      expect(student.greet()).toBe(
        "Hello, I'm Bob and I'm 20 years old. My grade is A"
      );
    });

    it('should have study method', () => {
      const student = new Student('Bob', 20, 'A');

      expect(student.study()).toBe('Bob is studying');
    });
  });

  describe('Media inheritance', () => {
    it('should create media with title and duration', () => {
      const media = new Media('Test Media', 120);

      expect(media.title).toBe('Test Media');
      expect(media.duration).toBe(120);
    });

    it('should have play method', () => {
      const media = new Media('Test Media', 120);

      expect(typeof media.play).toBe('function');
    });

    it('should create Book that extends Media', () => {
      const book = new Book('1984', 300, 328);

      expect(book instanceof Book).toBe(true);
      expect(book instanceof Media).toBe(true);
      expect(book.title).toBe('1984');
      expect(book.duration).toBe(300);
      expect(book.pages).toBe(328);
    });

    it('should create AudioBook that extends Media', () => {
      const audiobook = new AudioBook('Dune', 850, 'Scott Brick');

      expect(audiobook instanceof AudioBook).toBe(true);
      expect(audiobook instanceof Media).toBe(true);
      expect(audiobook.title).toBe('Dune');
      expect(audiobook.duration).toBe(850);
      expect(audiobook.narrator).toBe('Scott Brick');
    });

    it('should override play method appropriately', () => {
      const book = new Book('1984', 300, 328);
      const audiobook = new AudioBook('Dune', 850, 'Scott Brick');

      expect(book.play()).toBe('Reading 1984');
      expect(audiobook.play()).toBe('Playing Dune narrated by Scott Brick');
    });
  });

  describe('Calculator class', () => {
    it('should create calculator with initial value', () => {
      const calc = new Calculator();

      expect(calc.getValue()).toBe(0);
    });

    it('should support method chaining', () => {
      const calc = new Calculator();
      const result = calc.add(5).multiply(2).subtract(3);

      expect(result).toBe(calc); // should return this for chaining
      expect(calc.getValue()).toBe(7);
    });

    it('should have all required methods', () => {
      const calc = new Calculator();

      expect(typeof calc.add).toBe('function');
      expect(typeof calc.subtract).toBe('function');
      expect(typeof calc.multiply).toBe('function');
      expect(typeof calc.divide).toBe('function');
      expect(typeof calc.getValue).toBe('function');
      expect(typeof calc.reset).toBe('function');
    });

    it('should handle reset correctly', () => {
      const calc = new Calculator();
      calc.add(10);
      calc.reset();

      expect(calc.getValue()).toBe(0);
    });

    it('should not allow direct access to private value', () => {
      const calc = new Calculator();

      // Should not be able to access private field directly
      expect(calc.value).toBeUndefined();
    });
  });

  describe('Animal constructor function', () => {
    it('should create animal with name and species', () => {
      const animal = new Animal('Rex', 'dog');

      expect(animal.name).toBe('Rex');
      expect(animal.species).toBe('dog');
    });

    it('should have speak method on prototype', () => {
      const animal = new Animal('Rex', 'dog');

      expect(animal.speak()).toBe('Rex makes a sound');
      expect(Animal.prototype.speak).toBeDefined();
    });

    it('should be instance of Animal', () => {
      const animal = new Animal('Rex', 'dog');

      expect(animal instanceof Animal).toBe(true);
    });
  });

  describe('Dog constructor function', () => {
    it('should inherit from Animal', () => {
      const dog = new Dog('Rex');

      expect(dog instanceof Dog).toBe(true);
      expect(dog instanceof Animal).toBe(true);
      expect(dog.name).toBe('Rex');
    });

    it('should override speak method', () => {
      const dog = new Dog('Rex');

      expect(dog.speak()).toBe('Rex barks');
    });

    it('should have proper prototype chain', () => {
      const dog = new Dog('Rex');

      expect(Object.getPrototypeOf(Dog.prototype)).toBe(Animal.prototype);
    });
  });

  describe('Logger class', () => {
    beforeEach(() => {
      // Reset log count if possible
      if (Logger.reset) {
        Logger.reset();
      }
    });

    it('should have static methods', () => {
      expect(typeof Logger.log).toBe('function');
      expect(typeof Logger.warn).toBe('function');
      expect(typeof Logger.error).toBe('function');
      expect(typeof Logger.getLogCount).toBe('function');
    });

    it('should track total log count', () => {
      const initialCount = Logger.getLogCount() || 0;

      Logger.log('Test message');
      Logger.warn('Warning message');

      expect(Logger.getLogCount()).toBe(initialCount + 2);
    });

    it('should log different types of messages', () => {
      // Just test that methods can be called without error
      expect(() => Logger.log('Info')).not.toThrow();
      expect(() => Logger.warn('Warning')).not.toThrow();
      expect(() => Logger.error('Error')).not.toThrow();
    });
  });

  describe('Task class', () => {
    it('should create task with title and auto-generated ID', () => {
      const task = new Task('Learn JavaScript');

      expect(task.title).toBe('Learn JavaScript');
      expect(typeof task.id).toBe('number');
      expect(task.completed).toBe(false);
    });

    it('should generate incremental IDs', () => {
      const task1 = new Task('Task 1');
      const task2 = new Task('Task 2');

      expect(task2.id).toBe(task1.id + 1);
    });

    it('should have completion methods', () => {
      const task = new Task('Learn JavaScript');

      task.complete();
      expect(task.completed).toBe(true);

      task.incomplete();
      expect(task.completed).toBe(false);

      task.toggle();
      expect(task.completed).toBe(true);
    });
  });

  describe('Shape inheritance', () => {
    it('should throw error for abstract Shape area method', () => {
      const shape = new Shape();

      expect(() => shape.area()).toThrow();
    });

    it('should calculate Rectangle area', () => {
      const rectangle = new Rectangle(5, 10);

      expect(rectangle.area()).toBe(50);
      expect(rectangle instanceof Shape).toBe(true);
    });

    it('should calculate Circle area', () => {
      const circle = new Circle(3);

      expect(circle.area()).toBeCloseTo(Math.PI * 9, 5);
      expect(circle instanceof Shape).toBe(true);
    });
  });

  describe('addValidation mixin', () => {
    it('should add validation methods to class', () => {
      class TestClass {}
      const ValidatedClass = addValidation(TestClass);
      const instance = new ValidatedClass();

      expect(typeof instance.validate).toBe('function');
      expect(typeof instance.addRule).toBe('function');
    });

    it('should validate using rules', () => {
      class User {}
      const ValidatedUser = addValidation(User);
      const user = new ValidatedUser();

      user.addRule((obj) => obj.name && obj.name.length > 0);

      expect(user.validate()).toBe(false);
      user.name = 'John';
      expect(user.validate()).toBe(true);
    });

    it('should require all rules to pass', () => {
      class TestClass {}
      const ValidatedClass = addValidation(TestClass);
      const instance = new ValidatedClass();

      instance.addRule(() => true);
      instance.addRule(() => false);

      expect(instance.validate()).toBe(false);
    });

    it('should pass with no rules', () => {
      class TestClass {}
      const ValidatedClass = addValidation(TestClass);
      const instance = new ValidatedClass();

      expect(instance.validate()).toBe(true);
    });
  });

  describe('createContextDemo', () => {
    it('should create object with name', () => {
      const obj = createContextDemo('Alice');

      expect(obj.name).toBe('Alice');
    });

    it('should have methods with different context behavior', () => {
      const obj = createContextDemo('Alice');

      expect(typeof obj.regularMethod).toBe('function');
      expect(typeof obj.boundMethod).toBe('function');
      expect(typeof obj.arrowMethod).toBe('function');
    });

    it('should demonstrate context binding', () => {
      const obj = createContextDemo('Alice');

      // Regular method should work when called on object
      expect(obj.regularMethod()).toBe('Alice');

      // Bound method should work even when detached
      const detachedBound = obj.boundMethod;
      expect(detachedBound()).toBe('Alice');
    });

    it('should show context loss with regular method', () => {
      const obj = createContextDemo('Alice');
      const detachedRegular = obj.regularMethod;

      // Should return undefined when context is lost
      expect(detachedRegular()).toBeUndefined();
    });

    it('should demonstrate arrow method lexical binding', () => {
      const obj = createContextDemo('Alice');

      // Arrow method should work when called on object
      expect(obj.arrowMethod()).toBe('Alice');

      // Arrow method should work even when detached (lexically bound)
      const detachedArrow = obj.arrowMethod;
      expect(detachedArrow()).toBe('Alice');
    });
  });

  describe('createPersonWithPrototype', () => {
    it('should create person objects', () => {
      const person = createPersonWithPrototype('Alice', 25);

      expect(person.name).toBe('Alice');
      expect(person.age).toBe(25);
    });

    it('should have greet method', () => {
      const person = createPersonWithPrototype('Alice', 25);

      expect(typeof person.greet).toBe('function');
      expect(person.greet()).toBe("Hello, I'm Alice");
    });

    it('should share prototype between instances', () => {
      const person1 = createPersonWithPrototype('Alice', 25);
      const person2 = createPersonWithPrototype('Bob', 30);

      expect(Object.getPrototypeOf(person1)).toBe(
        Object.getPrototypeOf(person2)
      );
    });

    it('should have methods on prototype, not instance', () => {
      const person = createPersonWithPrototype('Alice', 25);

      expect(person.hasOwnProperty('greet')).toBe(false);
      expect(Object.getPrototypeOf(person).hasOwnProperty('greet')).toBe(true);
    });
  });

  describe('getPrototypeChain', () => {
    it('should return array of property names', () => {
      const obj = { prop1: 'value1' };
      const properties = getPrototypeChain(obj);

      expect(Array.isArray(properties)).toBe(true);
      expect(properties).toContain('prop1');
    });

    it('should include inherited properties', () => {
      const obj = { prop1: 'value1' };
      const properties = getPrototypeChain(obj);

      // Should include Object.prototype methods
      expect(properties).toContain('toString');
      expect(properties).toContain('valueOf');
    });

    it('should work with custom prototype chain', () => {
      const parent = { parentProp: 'parent' };
      const child = Object.create(parent);
      child.childProp = 'child';

      const properties = getPrototypeChain(child);

      expect(properties).toContain('childProp');
      expect(properties).toContain('parentProp');
    });

    it('should handle null prototype', () => {
      const obj = Object.create(null);
      obj.prop = 'value';

      const properties = getPrototypeChain(obj);

      expect(properties).toContain('prop');
      expect(properties).not.toContain('toString');
    });
  });
});

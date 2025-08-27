// ==========================================
// MODULE PATTERNS
// ==========================================
// JavaScript-specific patterns for code organization

// 15. Module Pattern
// Create a Counter module using the revealing module pattern.
// It should expose increment, decrement, and getValue methods
// while keeping the count variable private.
// --- Examples
//   Counter.increment();
//   Counter.increment();
//   Counter.getValue(); // 2
//   Counter.decrement();
//   Counter.getValue(); // 1
//   Counter.count; // undefined (private)
export const Counter = (function () {
  // Implement revealing module pattern here
})();

// 16. Mixin Pattern
// Create mixins that add flying and swimming capabilities to different animal classes.
// Mixins should be reusable objects that can be applied to multiple classes.
// Use Object.assign() to mix behaviors into class prototypes.
// --- Examples
//   class Bird {
//     constructor(name) { this.name = name; }
//   }
//   class Fish {
//     constructor(name) { this.name = name; }
//   }
//   class Duck {
//     constructor(name) { this.name = name; }
//   }
//
//   applyMixin(Bird, CanFly);
//   applyMixin(Fish, CanSwim);
//   applyMixin(Duck, CanFly, CanSwim);
//
//   const eagle = new Bird('Eagle');
//   const salmon = new Fish('Salmon');
//   const mallard = new Duck('Mallard');
//
//   eagle.fly(); // 'Eagle is flying at altitude 0'
//   salmon.swim(); // 'Salmon is swimming at depth 0'
//   mallard.fly(); // 'Mallard is flying at altitude 0'
//   mallard.swim(); // 'Mallard is swimming at depth 0'
export const CanFly = {};

export const CanSwim = {};

export function applyMixin(targetClass, ...mixins) {}

export class Bird {
  constructor(name) {
    this.name = name;
  }
}

export class Fish {
  constructor(name) {
    this.name = name;
  }
}

export class Duck {
  constructor(name) {
    this.name = name;
  }
}

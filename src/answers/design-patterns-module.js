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
  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }

  function getValue() {
    return count;
  }

  return {
    increment,
    decrement,
    getValue
  };
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
export const CanFly = {
  altitude: 0,

  fly: function () {
    return `${this.name} is flying at altitude ${this.altitude}`;
  },

  setAltitude: function (altitude) {
    this.altitude = altitude;
  },

  getAltitude: function () {
    return this.altitude;
  }
};

export const CanSwim = {
  depth: 0,

  swim: function () {
    return `${this.name} is swimming at depth ${this.depth}`;
  },

  setDepth: function (depth) {
    this.depth = depth;
  },

  getDepth: function () {
    return this.depth;
  }
};

export function applyMixin(targetClass, ...mixins) {
  // Only apply mixins if they are provided
  if (mixins && mixins.length > 0) {
    mixins.forEach((mixin) => {
      Object.assign(targetClass.prototype, mixin);
    });
  }
}

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

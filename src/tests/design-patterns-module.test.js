import { describe, it, expect, beforeEach } from 'vitest';

import {
  Counter,
  CanFly,
  CanSwim,
  applyMixin,
  Bird,
  Fish,
  Duck
} from '../exercises/design-patterns-module';

describe('Design Patterns', () => {
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
    });
  });
});

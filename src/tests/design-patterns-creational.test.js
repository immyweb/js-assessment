import { describe, it, expect } from 'vitest';
import {
  Singleton,
  VehicleFactory,
  URLBuilder,
  LightThemeFactory,
  DarkThemeFactory
} from '../exercises/design-patterns-creational';

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
          .addProtocol('https')
          .addHost('api.example.com')
          .addPath('/users/123')
          .addQuery('include', 'profile')
          .addQuery('format', 'json')
          .build();

        expect(url).toBe(
          'https://api.example.com/users/123?include=profile&format=json'
        );
      });

      it('should build URL without queries', () => {
        const url = new URLBuilder()
          .addProtocol('http')
          .addHost('localhost')
          .addPath('/home')
          .build();

        expect(url).toBe('http://localhost/home');
      });

      it('should build URL without path', () => {
        const url = new URLBuilder()
          .addProtocol('https')
          .addHost('example.com')
          .build();

        expect(url).toBe('https://example.com');
      });

      it('should support method chaining', () => {
        const builder = new URLBuilder();

        expect(builder.addProtocol('https')).toBe(builder);
        expect(builder.addHost('example.com')).toBe(builder);
        expect(builder.addPath('/test')).toBe(builder);
        expect(builder.addQuery('key', 'value')).toBe(builder);
      });

      it('should handle multiple query parameters', () => {
        const url = new URLBuilder()
          .addProtocol('https')
          .addHost('api.test.com')
          .addQuery('param1', 'value1')
          .addQuery('param2', 'value2')
          .addQuery('param3', 'value3')
          .build();

        expect(url).toBe(
          'https://api.test.com/?param1=value1&param2=value2&param3=value3'
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
});

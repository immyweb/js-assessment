// ==========================================
// CREATIONAL PATTERNS
// ==========================================
// Patterns that deal with object creation mechanisms

// 1. Singleton Pattern
// Create a Singleton class that ensures only one instance exists.
// The class should have a getInstance() static method that always
// returns the same instance.
// --- Examples
//   const s1 = Singleton.getInstance();
//   const s2 = Singleton.getInstance();
//   s1 === s2 // true
//   s1.data = 'test';
//   s2.data // 'test'
export class Singleton {}

// 2. Factory Pattern
// Create a VehicleFactory that can create different types of vehicles.
// The factory should have a static method createVehicle(type, options)
// that returns instances of Car or Motorcycle classes.
// --- Examples
//   const car = VehicleFactory.createVehicle('car', { doors: 4 });
//   car.type // 'car'
//   car.doors // 4
//   const bike = VehicleFactory.createVehicle('motorcycle', { engine: '600cc' });
//   bike.type // 'motorcycle'
//   bike.engine // '600cc'
export class VehicleFactory {}

// 3. Builder Pattern
// Create a URLBuilder that constructs URLs step by step.
// It should have methods: addProtocol(), addHost(), addPath(), addQuery(), build()
// --- Examples
//   const url = new URLBuilder()
//     .addProtocol('https')
//     .addHost('api.example.com')
//     .addPath('/users/123')
//     .addQuery('include', 'profile')
//     .addQuery('format', 'json')
//     .build();
//   // url === 'https://api.example.com/users/123?include=profile&format=json'
export class URLBuilder {}

// 4. Abstract Factory Pattern
// Create an Abstract Factory that produces families of related UI components.
// Create factories for different themes (Light and Dark) that can create
// buttons and inputs with consistent styling within each theme family.
// --- Examples
//   const lightFactory = new LightThemeFactory();
//   const lightButton = lightFactory.createButton('Submit');
//   const lightInput = lightFactory.createInput('text');
//   lightButton.render(); // 'Light Button: Submit'
//   lightInput.render(); // 'Light Input: text'
//
//   const darkFactory = new DarkThemeFactory();
//   const darkButton = darkFactory.createButton('Cancel');
//   const darkInput = darkFactory.createInput('password');
//   darkButton.render(); // 'Dark Button: Cancel'
//   darkInput.render(); // 'Dark Input: password'
export class UIComponentFactory {}
export class LightThemeFactory {}
export class DarkThemeFactory {}
export class LightButton {}
export class DarkButton {}
export class LightInput {}
export class DarkInput {}

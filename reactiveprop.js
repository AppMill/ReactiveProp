addReactiveProperty = (o, propName) => {
  // Need special treatment if property already exists
  if (o.hasOwnProperty(propName)) Throw new Error('prop already exists');

  // Create the Symbol (key)
  let pSymbol = Symbol.for(propName);
  
  // Populate the property with a Reactive Variable
  // Using the Symbol as the key so it's not enumerable / readily available
  o[pSymbol] = new ReactiveVar();
  
  // Create the enumerated property with getter and setter
  Object.defineProperty(o,
                        propName,
                        {
    // we want the property to be enumerable
    enumerable: true,
    
    // In the setter, we call the ReactiveVar.set() which triggers the reactive context
    set: function(x) {
      let pSymbol = Symbol.for(propName);
      this[pSymbol].set(x);
    },
    
    get: function() {
      let pSymbol = Symbol.for(propName);
      return this[pSymbol].get();
    }
    
  });

  return o;
}
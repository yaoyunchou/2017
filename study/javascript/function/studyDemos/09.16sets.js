/**
 * Created by yaoyc on 2017/2/14.
 */
(function () {
	"use strict";
	/**
	 * 定义一个extend的方法
	 * @param o
	 * @param p
	 */
	var extend = (function() {
		var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable","toLocaleString"];
		// Assign the return value of this function
		// First check for the presence of the bug before patching it.
		for(var p in {toString:null}) {
			// If we get here, then the for/in loop works correctly and we return
			// a simple version of the extend() function
			return function extend(o) {
				for(var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for(var prop in source) o[prop] = source[prop];
				}
				return o;
			};
		}
		// If we get here, it means that the for/in loop did not enumerate
		// the toString property of the test object. So return a version
		// of the extend() function that explicitly tests for the nonenumerable
		// properties of Object.prototype.
		return function patched_extend(o) {
			for(var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				// Copy all the enumerable properties
				for(var prop in source) o[prop] = source[prop];
				
				// And now check the special-case properties
				for(var j = 0; j < protoprops.length; j++) {
					prop = protoprops[j];
					if (source.hasOwnProperty(prop)) o[prop] = source[prop];
				}
			}
			return o;
		};
	}());
	
	/**
	 *
	 * @constructor
	 */
	function Set() {          // This is the constructor
		this.values = {};     // The properties of this object hold the set
		this.n = 0;           // How many values are in the set
		this.add.apply(this, arguments);  // All arguments are values to add
	}
	
	/**
	 *
	 * @returns {Set}
	 */
	Set.prototype.add = function () {
		for (var i = 0; i < arguments.length; i++) {  // For each argument
			var val = arguments[i];                  // The value to add to the set
			var str = Set._v2s(val);                 // Transform it to a string
			if (!this.values.hasOwnProperty(str)) {  // If not already in the set
				this.values[str] = val;              // Map string to value
				this.n++;                            // Increase set size
			}
		}
		return this;                                 // Support chained method calls
	};

// Remove each of the arguments from the set.
	Set.prototype.remove = function () {
		for (var i = 0; i < arguments.length; i++) {  // For each argument
			var str = Set._v2s(arguments[i]);        // Map to a string
			if (this.values.hasOwnProperty(str)) {   // If it is in the set
				delete this.values[str];             // Delete it
				this.n--;                            // Decrease set size
			}
		}
		return this;                                 // For method chaining
	};

// Return true if the set contains value; false otherwise.
	Set.prototype.contains = function (value) {
		return this.values.hasOwnProperty(Set._v2s(value));
	};

// Return the size of the set.
	Set.prototype.size = function () {
		return this.n;
	};

// Call function f on the specified context for each element of the set.
	Set.prototype.foreach = function (f, context) {
		for (var s in this.values) {
			if (this.values.hasOwnProperty(s)) {
				f.call(context, this.values[s]);  // Call f on the value
			}
		}
	};
	
	Set.prototype.speak = function(){ console.log(this.member);};

// This internal function maps any JavaScript value to a unique string.
	Set._v2s = function (val) {
		function objectId(o) {
			var prop = "|**objectid**|";   // Private property name for storing ids
			if (!o.hasOwnProperty(prop))   // If the object has no id
				o[prop] = Set._v2s.next++; // Assign it the next available
			return o[prop];                // Return the id
		}
		
		switch (val) {
			case undefined:
				return 'u';          // Special primitive
			case null:
				return 'n';          // values get single-letter
			case true:
				return 't';          // codes.
			case false:
				return 'f';
			default:
				switch (typeof val) {
					case 'number':
						return '#' + val;    // Numbers get # prefix.
					case 'string':
						return '"' + val;    // Strings get " prefix.
					default:
						return '@' + objectId(val); // Objs and funcs get @
				}
		}
	};
	Set._v2s.next = 100;
	/**
	 * 定义一个初始化的方法
	 * @param p
	 * @returns {*}
	 */
	function inherit(p) {
		if (p === null) {
			throw TypeError();
		} // p must be a non-null object
		if (Object.create) {
			// If Object.create() is defined...
			return Object.create(p);      //    then just use it.
		}
		var t = typeof p;                 // Otherwise do some more type checking
		if (t !== "object" && t !== "function") {
			throw TypeError();
		}
		// Define a dummy constructor function.
		function f() {
			
		}
		
		// 将原型对象指向p.
		f.prototype = p;
		// Use f() to create an "heir" of p.
		return new f();
	}
	
	/**
	 * 定义一个创建子类广场方法
	 * @param {object} superclass 父类
	 * @param {object} constructor 构造器
	 * @param methods  方法
	 * @param statics
	 * @returns {object|*}
	 */
	function defineSubclass(superclass,  // Constructor of the superclass
	                        constructor, // The constructor for the new subclass
	                        methods,     // Instance methods: copied to prototype
	                        statics)     // Class properties: copied to constructor
	{
		// Set up the prototype object of the subclass
		constructor.prototype = inherit(superclass.prototype);
		constructor.prototype.constructor = constructor;
		// Copy the methods and statics as we would for a regular class
		if (methods) {
			extend(constructor.prototype, methods);
		}
		if (statics) {
			extend(constructor, statics);
		}
		// Return the class
		return constructor;
	}
	
// We can also do this as a method of the superclass constructor
	Function.prototype.extend = function (constructor, methods, statics) {
		return defineSubclass(this, constructor, methods, statics);
	};
// A convenient function that can be used for any abstract method
	function abstractmethod() { throw new Error("abstract method"); }
	
	/*
	 * The AbstractSet class defines a single abstract method, contains().
	 */
	function AbstractSet() { throw new Error("Can't instantiate abstract classes");}
	AbstractSet.prototype.contains = abstractmethod;
	
	/*
	 * NotSet is a concrete subclass of AbstractSet.
	 * The members of this set are all values that are not members of some
	 * other set. Because it is defined in terms of another set it is not
	 * writable, and because it has infinite members, it is not enumerable.
	 * All we can do with it is test for membership.
	 * Note that we're using the Function.prototype.extend() method we defined
	 * earlier to define this subclass.
	 */
	var NotSet = AbstractSet.extend(
		function NotSet(set) { this.set = set; },
		{
			contains: function(x) { return !this.set.contains(x); },
			toString: function(x) { return "~" + this.set.toString(); },
			equals: function(that) {
				return that instanceof NotSet && this.set.equals(that.set);
			}
		}
	);
	
	
	/*
	 * AbstractEnumerableSet is an abstract subclass of AbstractSet.
	 * It defines the abstract methods size() and foreach(), and then implements
	 * concrete isEmpty(), toArray(), to[Locale]String(), and equals() methods
	 * on top of those. Subclasses that implement contains(), size(), and foreach()
	 * get these five concrete methods for free.
	 */
	var AbstractEnumerableSet = AbstractSet.extend(
		function() { throw new Error("Can't instantiate abstract classes"); },
		{
			size: abstractmethod,
			foreach: abstractmethod,
			isEmpty: function() { return this.size() == 0; },
			toString: function() {
				var s = "{", i = 0;
				this.foreach(function(v) {
					if (i++ > 0) s += ", ";
					s += v;
				});
				return s + "}";
			},
			toLocaleString : function() {
				var s = "{", i = 0;
				this.foreach(function(v) {
					if (i++ > 0) s += ", ";
					if (v == null) s += v; // null & undefined
					else s += v.toLocaleString(); // all others
				});
				return s + "}";
			},
			toArray: function() {
				var a = [];
				this.foreach(function(v) { a.push(v); });
				return a;
			},
			equals: function(that) {
				if (!(that instanceof AbstractEnumerableSet)) return false;
				// If they don't have the same size, they're not equal
				if (this.size() != that.size()) return false;
				// Now check whether every element in this is also in that.
				try {
					this.foreach(function(v) {if (!that.contains(v)) throw false;});
					return true;  // All elements matched: sets are equal.
				} catch (x) {
					if (x === false) return false; // Sets are not equal
					throw x; // Some other exception occurred: rethrow it.
				}
			}
		});
	
	/*
	 * SingletonSet is a concrete subclass of AbstractEnumerableSet.
	 * A singleton set is a read-only set with a single member.
	 */
	var SingletonSet = AbstractEnumerableSet.extend(
		function SingletonSet(member) { this.member = member; },
		{
			contains: function(x) {  return x === this.member; },
			size: function() { return 1; },
			foreach: function(f,ctx) { f.call(ctx, this.member); }
		}
	);
	
	
	/*
	 * AbstractWritableSet is an abstract subclass of AbstractEnumerableSet.
	 * It defines the abstract methods add() and remove(), and then implements
	 * concrete union(), intersection(), and difference() methods on top of them.
	 */
	var AbstractWritableSet = AbstractEnumerableSet.extend(
		function() { throw new Error("Can't instantiate abstract classes"); },
		{
			add: abstractmethod,
			remove: abstractmethod,
			union: function(that) {
				var self = this;
				that.foreach(function(v) { self.add(v); });
				return this;
			},
			intersection: function(that) {
				var self = this;
				this.foreach(function(v) { if (!that.contains(v)) self.remove(v);});
				return this;
			},
			difference: function(that) {
				var self = this;
				that.foreach(function(v) { self.remove(v); });
				return this;
			}
		});
	
	/*
	 * An ArraySet is a concrete subclass of AbstractWritableSet.
	 * It represents the set elements as an array of values, and uses a linear
	 * search of the array for its contains() method. Because the contains()
	 * method is O(n) rather than O(1), it should only be used for relatively
	 * small sets. Note that this implementation relies on the ES5 Array methods
	 * indexOf() and forEach().
	 */
	var ArraySet = AbstractWritableSet.extend(
		function ArraySet() {
			this.values = [];
			this.add.apply(this, arguments);
		},
		{
			contains: function(v) { return this.values.indexOf(v) != -1; },
			size: function() { return this.values.length; },
			foreach: function(f,c) { this.values.forEach(f, c); },
			add: function() {
				for(var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					if (!this.contains(arg)) this.values.push(arg);
				}
				return this;
			},
			remove: function() {
				for(var i = 0; i < arguments.length; i++) {
					var p = this.values.indexOf(arguments[i]);
					if (p == -1) continue;
					this.values.splice(p, 1);
				}
				return this;
			}
		}
	);
	var arraySet = new ArraySet('yao');
	
})();
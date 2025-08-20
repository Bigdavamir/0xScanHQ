/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.1",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		}
		if ( nodeType === 1 || nodeType === 11 ) {
			return elem.textContent;
		}
		if ( nodeType === 9 ) {
			return elem.documentElement.textContent;
		}
		if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors
	// (see trac-13936).
	// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
	// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
	if ( documentElement.msMatchesSelector &&

		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;
find.tokenize = tokenize;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Re-enable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "box-sizing:content-box;border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is `display: block`
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this
			.on( "mouseenter", fnOver )
			.on( "mouseleave", fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var t=!0,n=!1,o=null,d={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function i(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function s(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function u(e){t=!1}function a(){document.addEventListener("mousemove",c),document.addEventListener("mousedown",c),document.addEventListener("mouseup",c),document.addEventListener("pointermove",c),document.addEventListener("pointerdown",c),document.addEventListener("pointerup",c),document.addEventListener("touchmove",c),document.addEventListener("touchstart",c),document.addEventListener("touchend",c)}function c(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,document.removeEventListener("mousemove",c),document.removeEventListener("mousedown",c),document.removeEventListener("mouseup",c),document.removeEventListener("pointermove",c),document.removeEventListener("pointerdown",c),document.removeEventListener("pointerup",c),document.removeEventListener("touchmove",c),document.removeEventListener("touchstart",c),document.removeEventListener("touchend",c))}document.addEventListener("keydown",function(n){n.metaKey||n.altKey||n.ctrlKey||(i(e.activeElement)&&s(e.activeElement),t=!0)},!0),document.addEventListener("mousedown",u,!0),document.addEventListener("pointerdown",u,!0),document.addEventListener("touchstart",u,!0),document.addEventListener("visibilitychange",function(e){"hidden"===document.visibilityState&&(n&&(t=!0),a())},!0),a(),e.addEventListener("focus",function(e){var n,o,u;i(e.target)&&(t||(n=e.target,o=n.type,"INPUT"===(u=n.tagName)&&d[o]&&!n.readOnly||"TEXTAREA"===u&&!n.readOnly||n.isContentEditable))&&s(e.target)},!0),e.addEventListener("blur",function(e){var t;i(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(o),o=window.setTimeout(function(){n=!1},100),(t=e.target).hasAttribute("data-focus-visible-added")&&(t.classList.remove("focus-visible"),t.removeAttribute("data-focus-visible-added")))},!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(e){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!=typeof document&&e(document)});
//# sourceMappingURL=focus-visible.min.js.map

/*!
 * Bootstrap NES v3.4.7 (https://herodevs.com/)
 * Copyright 2025 HeroDevs, Inc
 * Licensed under the HeroDevs NES License license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(){"use strict";var t=jQuery.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1==t[0]&&9==t[1]&&t[2]<1||3<t[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(n){"use strict";n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||n(i).trigger(n.support.transition.end)},t),this},n(function(){n.support.transition=function(){var t,e=document.createElement("bootstrap"),i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(t in i)if(e.style[t]!==undefined)return{end:i[t]};return!1}(),n.support.transition&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict";var e='[data-dismiss="alert"]',r=function(t){s(t).on("click",e,this.close)};r.VERSION="3.4.7",r.TRANSITION_DURATION=150,r.prototype.close=function(t){var e=s(this),i=e.attr("data-target"),n=(i||(i=e.attr("href"),i=s.bs.helpers.extractSelector(i)),i="#"===i?[]:i,s(document).find(i));function o(){n.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),(n=n.length?n:e.closest(".alert")).trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(n.removeClass("in"),s.support.transition&&n.hasClass("fade")?n.one("bsTransitionEnd",o).emulateTransitionEnd(r.TRANSITION_DURATION):o())};var t=s.fn.alert;s.fn.alert=function(i){return this.each(function(){var t=s(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new r(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=r,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,r.prototype.close)}(jQuery),function(a){"use strict";var n=function(t,e){this.$element=a(t),this.options=a.extend({},n.DEFAULTS,e),this.isLoading=!1};function i(i){return this.each(function(){var t=a(this),e=t.data("bs.button");e||t.data("bs.button",e=new n(this,"object"==typeof i&&i)),"toggle"==i?e.toggle():i&&e.setState(i)})}n.hasPurifyWarningShown=!1,n.VERSION="3.4.7",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(i){var n="disabled",o=this.$element,s=o.is("input")?"val":"html",r=o.data();i+="Text",null==r.resetText&&o.data("resetText",o[s]()),setTimeout(a.proxy(function(){var t=a.bs.helpers.getPurifier(),e=(null==r[i]?this.options:r)[i],t=t?t.sanitize(e):e;o[s](t),"loadingText"==i?(this.isLoading=!0,o.addClass(n).attr(n,n).prop(n,!0)):this.isLoading&&(this.isLoading=!1,o.removeClass(n).removeAttr(n).prop(n,!1))},this),0)},n.prototype.toggle=function(){var t,e=!0,i=this.$element.closest('[data-toggle="buttons"]');i.length?("radio"==(t=this.$element.find("input")).prop("type")?(t.prop("checked")&&(e=!1),i.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==t.prop("type")&&(t.prop("checked")!==this.$element.hasClass("active")&&(e=!1),this.$element.toggleClass("active")),t.prop("checked",this.$element.hasClass("active")),e&&t.trigger("change")):(this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active"))};var t=a.fn.button;a.fn.button=i,a.fn.button.Constructor=n,a.fn.button.noConflict=function(){return a.fn.button=t,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=a(t.target).closest(".btn");i.call(e,"toggle"),a(t.target).is('input[type="radio"], input[type="checkbox"]')||(t.preventDefault(),(e.is("input,button")?e:e.find("input:visible,button:visible").first()).trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){a(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(h){"use strict";var d=function(t,e){this.$element=h(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",h.proxy(this.keydown,this)),"hover"!=this.options.pause||"ontouchstart"in document.documentElement||this.$element.on("mouseenter.bs.carousel",h.proxy(this.pause,this)).on("mouseleave.bs.carousel",h.proxy(this.cycle,this))};function s(o){return this.each(function(){var t=h(this),e=t.data("bs.carousel"),i=h.extend({},d.DEFAULTS,t.data(),"object"==typeof o&&o),n="string"==typeof o?o:i.slide;e||t.data("bs.carousel",e=new d(this,i)),"number"==typeof o?e.to(o):n?e[n]():i.interval&&e.pause().cycle()})}d.VERSION="3.4.7",d.TRANSITION_DURATION=600,d.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},d.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},d.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(h.proxy(this.next,this),this.options.interval)),this},d.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},d.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);return("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap?e:(e=(i+("prev"==t?-1:1))%this.$items.length,this.$items.eq(e))},d.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},d.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&h.support.transition&&(this.$element.trigger(h.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},d.prototype.next=function(){if(!this.sliding)return this.slide("next")},d.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},d.prototype.slide=function(t,e){var i,n,o,s=this.$element.find(".item.active"),r=e||this.getItemForDirection(t,s),e=this.interval,a="next"==t?"left":"right",l=this;return r.hasClass("active")?this.sliding=!1:(i=r[0],n=h.Event("slide.bs.carousel",{relatedTarget:i,direction:a}),this.$element.trigger(n),n.isDefaultPrevented()?void 0:(this.sliding=!0,e&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),n=h(this.$indicators.children()[this.getItemIndex(r)]))&&n.addClass("active"),o=h.Event("slid.bs.carousel",{relatedTarget:i,direction:a}),h.support.transition&&this.$element.hasClass("slide")?(r.addClass(t),"object"==typeof r&&r.length&&r[0].offsetWidth,s.addClass(a),r.addClass(a),s.one("bsTransitionEnd",function(){r.removeClass([t,a].join(" ")).addClass("active"),s.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(o)},0)}).emulateTransitionEnd(d.TRANSITION_DURATION)):(s.removeClass("active"),r.addClass("active"),this.sliding=!1,this.$element.trigger(o)),e&&this.cycle(),this))};var t=h.fn.carousel,e=(h.fn.carousel=s,h.fn.carousel.Constructor=d,h.fn.carousel.noConflict=function(){return h.fn.carousel=t,this},function(t){var e,i=h(this),n=i.attr("href"),o=h.bs.helpers.extractSelector(n),o=i.attr("data-target")||o,o=h(document).find(o);o.hasClass("carousel")?(e=h.extend({},o.data(),i.data()),(i=i.attr("data-slide-to"))&&(e.interval=!1),s.call(o,e),i&&o.data("bs.carousel").to(i),t.preventDefault()):/^javascript:/.test(n)&&(window.console.warn("Potential XSS attack detected. Aborting."),t.preventDefault())});h(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),h(window).on("load",function(){h('[data-ride="carousel"]').each(function(){var t=h(this);s.call(t,t.data())})})}(jQuery),function(o){"use strict";var s=function(t,e){this.$element=o(t),this.options=o.extend({},s.DEFAULTS,e),this.$trigger=o('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function i(t){t=t.attr("data-target")||(t=t.attr("href"))&&t.replace(/.*(?=#[^\s]+$)/,"");return o(document).find(t)}function r(n){return this.each(function(){var t=o(this),e=t.data("bs.collapse"),i=o.extend({},s.DEFAULTS,t.data(),"object"==typeof n&&n);!e&&i.toggle&&/show|hide/.test(n)&&(i.toggle=!1),e||t.data("bs.collapse",e=new s(this,i)),"string"==typeof n&&e[n]()})}s.VERSION="3.4.7",s.TRANSITION_DURATION=350,s.DEFAULTS={toggle:!0},s.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},s.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(t&&t.length&&(n=t.data("bs.collapse"))&&n.transitioning)){var e=o.Event("show.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){t&&t.length&&(r.call(t,"hide"),n||t.data("bs.collapse",null));var i=this.dimension(),e=(this.$element.removeClass("collapse").addClass("collapsing")[i](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1,function(){this.$element.removeClass("collapsing").addClass("collapse in")[i](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")});if(!o.support.transition)return e.call(this);var n=o.camelCase(["scroll",i].join("-"));this.$element.one("bsTransitionEnd",o.proxy(e,this)).emulateTransitionEnd(s.TRANSITION_DURATION)[i](this.$element[0][n])}}}},s.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=o.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var t=this.dimension(),e=(this.$element[t](this.$element[t]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1,function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")});if(!o.support.transition)return e.call(this);this.$element[t](0).one("bsTransitionEnd",o.proxy(e,this)).emulateTransitionEnd(s.TRANSITION_DURATION)}}},s.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},s.prototype.getParent=function(){return o(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(o.proxy(function(t,e){e=o(e);this.addAriaAndCollapsedClass(i(e),e)},this)).end()},s.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=o.fn.collapse;o.fn.collapse=r,o.fn.collapse.Constructor=s,o.fn.collapse.noConflict=function(){return o.fn.collapse=t,this},o(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=o(this),t=(e.attr("data-target")||t.preventDefault(),i(e)),e=t.data("bs.collapse")?"toggle":e.data();r.call(t,e)})}(jQuery),function(o){"use strict";var s='[data-toggle="dropdown"]',n=function(t){o(t).on("click.bs.dropdown",this.toggle)};function r(t){var e=t.attr("data-target"),e=(e||(e=t.attr("href"),e=/#[A-Za-z]/.test(e)&&o.bs.helpers.extractSelector(e)),"#"!==e?o(document).find(e):null);return e&&e.length?e:t.parent()}function a(n){n&&3===n.which||(o(".dropdown-backdrop").remove(),o(s).each(function(){var t=o(this),e=r(t),i={relatedTarget:this};!e.hasClass("open")||n&&"click"==n.type&&/input|textarea/i.test(n.target.tagName)&&o.contains(e[0],n.target)||(e.trigger(n=o.Event("hide.bs.dropdown",i)),n.isDefaultPrevented())||(t.attr("aria-expanded","false"),e.removeClass("open").trigger(o.Event("hidden.bs.dropdown",i)))}))}n.VERSION="3.4.7",n.prototype.toggle=function(t){var e=o(this);if(!e.is(".disabled, :disabled")){var i=r(e),n=i.hasClass("open");if(a(),!n){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&o(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(o(this)).on("click",a);n={relatedTarget:this};if(i.trigger(t=o.Event("show.bs.dropdown",n)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(o.Event("shown.bs.dropdown",n))}return!1}},n.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=o(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=r(e),n=i.hasClass("open");if(!n&&27!=t.which||n&&27==t.which)return 27==t.which&&i.find(s).trigger("focus"),e.trigger("click");n=i.find(".dropdown-menu li:not(.disabled):visible a");n.length&&(e=n.index(t.target),38==t.which&&0<e&&e--,40==t.which&&e<n.length-1&&e++,n.eq(e=~e?e:0).trigger("focus"))}}};var t=o.fn.dropdown;o.fn.dropdown=function(i){return this.each(function(){var t=o(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new n(this)),"string"==typeof i&&e[i].call(t)})},o.fn.dropdown.Constructor=n,o.fn.dropdown.noConflict=function(){return o.fn.dropdown=t,this},o(document).on("click.bs.dropdown.data-api",a).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,n.prototype.toggle).on("keydown.bs.dropdown.data-api",s,n.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",n.prototype.keydown)}(jQuery),function(s){"use strict";var r=function(t,e){this.options=e,this.$body=s(document.body),this.$element=s(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,s.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function a(n,o){return this.each(function(){var t=s(this),e=t.data("bs.modal"),i=s.extend({},r.DEFAULTS,t.data(),"object"==typeof n&&n);e||t.data("bs.modal",e=new r(this,i)),"string"==typeof n?e[n](o):i.show&&e.show(o)})}r.VERSION="3.4.7",r.TRANSITION_DURATION=300,r.BACKDROP_TRANSITION_DURATION=150,r.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},r.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},r.prototype.show=function(i){var n=this,t=s.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',s.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){n.$element.one("mouseup.dismiss.bs.modal",function(t){s(t.target).is(n.$element)&&(n.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t=s.support.transition&&n.$element.hasClass("fade"),e=(n.$element.parent().length||n.$element.appendTo(n.$body),n.$element.show().scrollTop(0),n.adjustDialog(),t&&n.$element[0].offsetWidth,n.$element.addClass("in"),n.enforceFocus(),s.Event("shown.bs.modal",{relatedTarget:i}));t?n.$dialog.one("bsTransitionEnd",function(){n.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(r.TRANSITION_DURATION):n.$element.trigger("focus").trigger(e)}))},r.prototype.hide=function(t){t&&t.preventDefault(),t=s.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),s(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),s.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",s.proxy(this.hideModal,this)).emulateTransitionEnd(r.TRANSITION_DURATION):this.hideModal())},r.prototype.enforceFocus=function(){s(document).off("focusin.bs.modal").on("focusin.bs.modal",s.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},r.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",s.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},r.prototype.resize=function(){this.isShown?s(window).on("resize.bs.modal",s.proxy(this.handleUpdate,this)):s(window).off("resize.bs.modal")},r.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},r.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},r.prototype.backdrop=function(t){var e,i=this,n=this.$element.hasClass("fade")?"fade":"";this.isShown&&this.options.backdrop?(e=s.support.transition&&n,this.$backdrop=s(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",s.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),t&&(e?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(r.BACKDROP_TRANSITION_DURATION):t())):!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),n=function(){i.removeBackdrop(),t&&t()},s.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(r.BACKDROP_TRANSITION_DURATION):n()):t&&t()},r.prototype.handleUpdate=function(){this.adjustDialog()},r.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},r.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},r.prototype.checkScrollbar=function(){var t,e=window.innerWidth;e||(e=(t=document.documentElement.getBoundingClientRect()).right-Math.abs(t.left)),this.bodyIsOverflowing=document.body.clientWidth<e,this.scrollbarWidth=this.measureScrollbar()},r.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10),o=(this.originalBodyPad=document.body.style.paddingRight||"",this.scrollbarWidth);this.bodyIsOverflowing&&(this.$body.css("padding-right",t+o),s(this.fixedContent).each(function(t,e){var i=e.style.paddingRight,n=s(e).css("padding-right");s(e).data("padding-right",i).css("padding-right",parseFloat(n)+o+"px")}))},r.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),s(this.fixedContent).each(function(t,e){var i=s(e).data("padding-right");s(e).removeData("padding-right"),e.style.paddingRight=i||""})},r.prototype.measureScrollbar=function(){var t=document.createElement("div"),e=(t.className="modal-scrollbar-measure",this.$body.append(t),t.offsetWidth-t.clientWidth);return this.$body[0].removeChild(t),e};var t=s.fn.modal;s.fn.modal=a,s.fn.modal.Constructor=r,s.fn.modal.noConflict=function(){return s.fn.modal=t,this},s(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=s(this),i=e.attr("href"),n=e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,""),o=s(document).find(n),n=o.data("bs.modal")?"toggle":s.extend({remote:!/#/.test(i)&&i},o.data(),e.data());e.is("a")&&t.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),a.call(o,n,this)})}(jQuery),function(f){"use strict";var n=["sanitize","whiteList","sanitizeFn"],u=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],t={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},g=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,m=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function o(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);if(!document.implementation||!document.implementation.createHTMLDocument)return(i=f.bs.helpers.getPurifier())?i.sanitize(t):t;for(var i=document.implementation.createHTMLDocument("sanitization"),n=(i.body.innerHTML=t,f.map(e,function(t,e){return e})),o=f(i.body).find("*"),s=0,r=o.length;s<r;s++){var a=o[s],l=a.nodeName.toLowerCase();if(-1===f.inArray(l,n))a.parentNode.removeChild(a);else for(var h=f.map(a.attributes,function(t){return t}),d=[].concat(e["*"]||[],e[l]||[]),p=0,c=h.length;p<c;p++)!function(t,e){var i=t.nodeName.toLowerCase();if(-1!==f.inArray(i,e))return-1===f.inArray(i,u)||Boolean(t.nodeValue.match(g)||t.nodeValue.match(m));for(var n=f(e).filter(function(t,e){return e instanceof RegExp}),o=0,s=n.length;o<s;o++)if(i.match(n[o]))return 1}(h[p],d)&&a.removeAttribute(h[p].nodeName)}return i.body.innerHTML}var l=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};l.VERSION="3.4.7",l.TRANSITION_DURATION=150,l.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:t},l.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=f(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&f(document).find(f.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),o=n.length;o--;){var s,r=n[o];"click"==r?this.$element.on("click."+this.type,this.options.selector,f.proxy(this.toggle,this)):"manual"!=r&&(s="hover"==r?"mouseleave":"focusout",this.$element.on(("hover"==r?"mouseenter":"focusin")+"."+this.type,this.options.selector,f.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,f.proxy(this.leave,this)))}this.options.selector?this._options=f.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},l.prototype.getDefaults=function(){return l.DEFAULTS},l.prototype.getOptions=function(t){var e,i=this.$element.data();for(e in i)i.hasOwnProperty(e)&&-1!==f.inArray(e,n)&&delete i[e];return(t=f.extend({},this.getDefaults(),i,t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.sanitize&&(t.template=o(t.template,t.whiteList,t.sanitizeFn)),t},l.prototype.getDelegateOptions=function(){var i={},n=this.getDefaults();return this._options&&f.each(this._options,function(t,e){n[t]!=e&&(i[t]=e)}),i},l.prototype.enter=function(t){var e=t instanceof this.constructor?t:f(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),f(t.currentTarget).data("bs."+this.type,e)),t instanceof f.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in";else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},l.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},l.prototype.leave=function(t){var e=t instanceof this.constructor?t:f(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),f(t.currentTarget).data("bs."+this.type,e)),t instanceof f.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},l.prototype.show=function(){var e,t,i,n,o,s,r,a=f.Event("show.bs."+this.type);this.hasContent()&&this.enabled&&(this.$element.trigger(a),o=f.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]),!a.isDefaultPrevented())&&o&&(a=(e=this).tip(),o=this.getUID(this.type),this.setContent(),a.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&a.addClass("fade"),o="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,(r=(t=/\s?auto?\s?/i).test(o))&&(o=o.replace(t,"")||"top"),a.detach().css({top:0,left:0,display:"block"}).addClass(o).data("bs."+this.type,this),this.options.container?a.appendTo(f(document).find(this.options.container)):a.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type),t=this.getPosition(),i=a[0].offsetWidth,n=a[0].offsetHeight,r&&(r=o,s=this.getPosition(this.$viewport),o="bottom"==o&&t.bottom+n>s.bottom?"top":"top"==o&&t.top-n<s.top?"bottom":"right"==o&&t.right+i>s.width?"left":"left"==o&&t.left-i<s.left?"right":o,a.removeClass(r).addClass(o)),s=this.getCalculatedOffset(o,t,i,n),this.applyPlacement(s,o),r=function(){var t=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==t&&e.leave(e)},f.support.transition&&this.$tip.hasClass("fade")?a.one("bsTransitionEnd",r).emulateTransitionEnd(l.TRANSITION_DURATION):r())},l.prototype.applyPlacement=function(t,e){var i=this.tip(),n=i[0].offsetWidth,o=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),r=parseInt(i.css("margin-left"),10),s=(isNaN(s)&&(s=0),isNaN(r)&&(r=0),t.top+=s,t.left+=r,f.offset.setOffset(i[0],f.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in"),i[0].offsetWidth),r=i[0].offsetHeight,a=("top"==e&&r!=o&&(t.top=t.top+o-r),this.getViewportAdjustedDelta(e,t,s,r)),e=(a.left?t.left+=a.left:t.top+=a.top,/top|bottom/.test(e)),n=e?2*a.left-n+s:2*a.top-o+r,s=e?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(n,i[0][s],e)},l.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},l.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=o(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},l.prototype.hide=function(t){var e=this,i=f(this.$tip),n=f.Event("hide.bs."+this.type);function o(){"in"!=e.hoverState&&i.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(n),!n.isDefaultPrevented())return i.removeClass("in"),f.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",o).emulateTransitionEnd(l.TRANSITION_DURATION):o(),this.hoverState=null,this},l.prototype.fixTitle=function(){var t=this.$element;!t.attr("title")&&"string"==typeof t.attr("data-original-title")||t.attr("data-original-title",t.attr("title")||"").attr("title","")},l.prototype.hasContent=function(){return this.getTitle()},l.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,n=e.getBoundingClientRect(),e=(null==n.width&&(n=f.extend({},n,{width:n.right-n.left,height:n.bottom-n.top})),window.SVGElement&&e instanceof window.SVGElement),e=i?{top:0,left:0}:e?null:t.offset(),t={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},i=i?{width:f(window).width(),height:f(window).height()}:null;return f.extend({},n,t,i,e)},l.prototype.getCalculatedOffset=function(t,e,i,n){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-n,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-n/2,left:e.left-i}:{top:e.top+e.height/2-n/2,left:e.left+e.width}},l.prototype.getViewportAdjustedDelta=function(t,e,i,n){var o,s,r={top:0,left:0};return this.$viewport&&(o=this.options.viewport&&this.options.viewport.padding||0,s=this.getPosition(this.$viewport),/right|left/.test(t)?(t=e.top-o-s.scroll,n=e.top+o-s.scroll+n,t<s.top?r.top=s.top-t:n>s.top+s.height&&(r.top=s.top+s.height-n)):(t=e.left-o,n=e.left+o+i,t<s.left?r.left=s.left-t:n>s.right&&(r.left=s.left+s.width-n))),r},l.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},l.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},l.prototype.tip=function(){if(this.$tip||(this.$tip=f(this.options.template),1==this.$tip.length))return this.$tip;throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!")},l.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},l.prototype.enable=function(){this.enabled=!0},l.prototype.disable=function(){this.enabled=!1},l.prototype.toggleEnabled=function(){this.enabled=!this.enabled},l.prototype.toggle=function(t){var e=this;t&&!(e=f(t.currentTarget).data("bs."+this.type))&&(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),f(t.currentTarget).data("bs."+this.type,e)),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},l.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},l.prototype.sanitizeHtml=function(t){return o(t,this.options.whiteList,this.options.sanitizeFn)};var e=f.fn.tooltip;f.fn.tooltip=function(n){return this.each(function(){var t=f(this),e=t.data("bs.tooltip"),i="object"==typeof n&&n;!e&&/destroy|hide/.test(n)||(e||t.data("bs.tooltip",e=new l(this,i)),"string"==typeof n&&e[n]())})},f.fn.tooltip.Constructor=l,f.fn.tooltip.noConflict=function(){return f.fn.tooltip=e,this}}(jQuery),function(o){"use strict";var s=function(t,e){this.init("popover",t,e)};if(!o.fn.tooltip)throw new Error("Popover requires tooltip.js");s.VERSION="3.4.7",s.DEFAULTS=o.extend({},o.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((s.prototype=o.extend({},o.fn.tooltip.Constructor.prototype)).constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t,e=this.tip(),i=this.getTitle(),n=this.getContent();this.options.html?(t=typeof n,this.options.sanitize&&(i=this.sanitizeHtml(i),"string"==t)&&(n=this.sanitizeHtml(n)),e.find(".popover-title").html(i),e.find(".popover-content").children().detach().end()["string"==t?"html":"append"](n)):(e.find(".popover-title").text(i),e.find(".popover-content").children().detach().end().text(n)),e.removeClass("fade top bottom left right in"),e.find(".popover-title").html()||e.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=o.fn.popover;o.fn.popover=function(n){return this.each(function(){var t=o(this),e=t.data("bs.popover"),i="object"==typeof n&&n;!e&&/destroy|hide/.test(n)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof n&&e[n]())})},o.fn.popover.Constructor=s,o.fn.popover.noConflict=function(){return o.fn.popover=t,this}}(jQuery),function(o){"use strict";function n(t,e){this.$body=o(document.body),this.$scrollElement=o(t).is(document.body)?o(window):o(t),this.options=o.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",o.proxy(this.process,this)),this.refresh(),this.process()}function e(i){return this.each(function(){var t=o(this),e=t.data("bs.scrollspy");e||t.data("bs.scrollspy",e=new n(this,"object"==typeof i&&i)),"string"==typeof i&&e[i]()})}n.VERSION="3.4.7",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,i="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),o.isWindow(this.$scrollElement[0])||(i="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=o(this),t=t.data("target")||t.attr("href"),e=/^#./.test(t)&&o(t);return e&&e.length&&e.is(":visible")?[[e[i]().top+n,t]]:null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),n=this.options.offset+i-this.$scrollElement.height(),o=this.offsets,s=this.targets,r=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),n<=e)return r!=(t=s[s.length-1])&&this.activate(t);if(r&&e<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)r!=s[t]&&e>=o[t]&&(o[t+1]===undefined||e<o[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){this.activeTarget=t,this.clear();t=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',t=o(t).parents("li").addClass("active");(t=t.parent(".dropdown-menu").length?t.closest("li.dropdown").addClass("active"):t).trigger("activate.bs.scrollspy")},n.prototype.clear=function(){o(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=o.fn.scrollspy;o.fn.scrollspy=e,o.fn.scrollspy.Constructor=n,o.fn.scrollspy.noConflict=function(){return o.fn.scrollspy=t,this},o(window).on("load.bs.scrollspy.data-api",function(){o('[data-spy="scroll"]').each(function(){var t=o(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.7",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t,e,i,n=this.element,o=n.closest("ul:not(.dropdown-menu)"),s=n.data("target");s||(s=n.attr("href"),s=r.bs.helpers.extractSelector(s)),n.parent("li").hasClass("active")||(t=o.find(".active:last a"),e=r.Event("hide.bs.tab",{relatedTarget:n[0]}),i=r.Event("show.bs.tab",{relatedTarget:t[0]}),t.trigger(e),n.trigger(i),i.isDefaultPrevented())||e.isDefaultPrevented()||(i=r(document).find(s),this.activate(n.closest("li"),o),this.activate(i,i.parent(),function(){t.trigger({type:"hidden.bs.tab",relatedTarget:n[0]}),n.trigger({type:"shown.bs.tab",relatedTarget:t[0]})}))},a.prototype.activate=function(t,e,i){var n=e.find("> .active"),o=i&&r.support.transition&&(n.length&&n.hasClass("fade")||!!e.find("> .fade").length);function s(){n.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),o?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}n.length&&o?n.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),n.removeClass("in")};var t=r.fn.tab,i=(r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this},function(t){t.preventDefault(),e.call(r(this),"show")});r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(r){"use strict";var a=function(t,e){this.options=r.extend({},a.DEFAULTS,e);e=this.options.target===a.DEFAULTS.target?r(this.options.target):r(document).find(this.options.target);this.$target=e.on("scroll.bs.affix.data-api",r.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",r.proxy(this.checkPositionWithEventLoop,this)),this.$element=r(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(i){return this.each(function(){var t=r(this),e=t.data("bs.affix");e||t.data("bs.affix",e=new a(this,"object"==typeof i&&i)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.7",a.RESET="affix affix-top affix-bottom",a.DEFAULTS={offset:0,target:window},a.prototype.getState=function(t,e,i,n){var o,s=this.$target.scrollTop(),r=this.$element.offset(),a=this.$target.height();return null!=i&&"top"==this.affixed?s<i&&"top":"bottom"==this.affixed?null!=i?!(s+this.unpin<=r.top)&&"bottom":!(s+a<=t-n)&&"bottom":(r=(o=null==this.affixed)?s:r.top,null!=i&&s<=i?"top":null!=n&&t-n<=r+(o?a:e)&&"bottom")},a.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(a.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},a.prototype.checkPositionWithEventLoop=function(){setTimeout(r.proxy(this.checkPosition,this),1)},a.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,n=e.bottom,o=Math.max(r(document).height(),r(document.body).height()),e=("object"!=typeof e&&(n=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof n&&(n=e.bottom(this.$element)),this.getState(o,t,i,n));if(this.affixed!=e){null!=this.unpin&&this.$element.css("top","");var i="affix"+(e?"-"+e:""),s=r.Event(i+".bs.affix");if(this.$element.trigger(s),s.isDefaultPrevented())return;this.affixed=e,this.unpin="bottom"==e?this.getPinnedOffset():null,this.$element.removeClass(a.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==e&&this.$element.offset({top:o-t-n})}};var t=r.fn.affix;r.fn.affix=i,r.fn.affix.Constructor=a,r.fn.affix.noConflict=function(){return r.fn.affix=t,this},r(window).on("load",function(){r('[data-spy="affix"]').each(function(){var t=r(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery),function(i){"use strict";i.bs=i.bs||{},i.bs.helpers=i.bs.helpers||{};var e=i.bs.helpers.extractSelector,n=i.bs.helpers.getPurifier,o=i.bs.helpers.hasShownPurifyWarning;i.bs.helpers.noConflict=function(){var t={extractSelector:i.bs.helpers.extractSelector,getPurifier:i.bs.helpers.getPurifier,hasShownPurifyWarning:i.bs.helpers.hasShownPurifyWarning};return i.bs.helpers.extractSelector=e,i.bs.helpers.getPurifier=n,i.bs.helpers.hasShownPurifyWarning=o,t},i.bs.helpers.extractSelector=function(t){var e;return t&&(-1===(e=t.lastIndexOf("#"))||(e=t.slice(e),/\s/.test(e))?t:e)},i.bs.helpers.hasShownPurifyWarning=!1,i.bs.helpers.getPurifier=function(){var t=window.DOMPurify,e=void 0!==t&&t.sanitize;return e||i.bs.helpers.hasShownPurifyWarning||(window.console.warn("Could not locate DOMPurify to sanitize content. This warning will only show once."),i.bs.helpers.hasShownPurifyWarning=!0),e?t:null}}(jQuery);
"use strict";
window.listeners = {};
window.listeners.general = {};

/**
 * Listener function
 * to add a listener to several namespaces deliver the namespace parameter as array
 */
function addTolisteners(namespace, listener_obj) {
	try {
		if (typeof namespace === 'object') {
			for (i = 0; i < namespace.length; i++) {
				if (typeof window.listeners[namespace[i]] === 'undefined') {
					window.listeners[namespace[i]] = {};
				}
			}
		} else {
			if (typeof window.listeners[namespace] === 'undefined') {
				window.listeners[namespace] = {};
			}
		}

		if (namespace == 'general' && typeof window.listeners.general[listener_obj.name] != 'undefined') {
			throw new Error('Can\'t override general listener!');
		}

		if (typeof listener_obj.name === 'string' && typeof listener_obj.method === 'function') {
			if (typeof namespace === 'object') {
				for (i = 0; i < namespace.length; i++) {
					if (typeof window.listeners[namespace[i]][listener_obj.name] === 'function') {
						throw new Error('Can\'t override listener function! Choose another name. (namespace: ' + namespace[i] + ', function: ' + listener_obj.name + ')');
					} else {
						window.listeners[namespace[i]][listener_obj.name] = listener_obj.method;
					}
				}
			} else {
				window.listeners[namespace][listener_obj.name] = listener_obj.method;
			}
		}
	} catch (Error) {
		console.log(Error.message);
	}
	//console.info(window.listeners);
}

function callListeners(namespace) {
	// General listeners
	for (var listener in window.listeners.general) {
			window.listeners.general[listener]();
		}

	if (typeof namespace === 'object') {
		for (var i in namespace) {
			if (namespace.hasOwnProperty(i)) {
				callListener(namespace[i].trim());
			}
		}
	}
	else {
		callListener(namespace.trim());
	}
}

function callListener(listener) {
	if (typeof listener === 'string' && listener.length > 0) {
		for (var i in window.listeners[listener]) {
			window.listeners[listener][i]();
		}
	}
}

function getFirstNamespace() {
	var namespace = getNamespace();
	if (namespace.length) {
		return namespace[0];
	} else {
		return '';
	}
}

function getNamespace() {
	// All the body classes
	var namespace = $.uniqueSort($("body").attr("class").trim().split(" "));

	// Clean empty spaces in array
	namespace = $.grep(namespace, function(n, i) {
		return n.trim();
	});

	return namespace;
}

function inNamespace(namespace) {
	return $(document.body).hasClass(namespace);
}

/**
 *
 * @author Krzysztof Wojnarowski
 *
 * This class provides validation for upload library used in project
 */


/**
 * Validator class handles validation of file inputs
 * @param {object} config - configuration object
 * @returns {undefined}
 */
function fileUploadValidator(config) {
	var self = this;
	self.config = config;
	self.validators = config.validators;
	self.activeValidators = [];
	self.errors = new Array();
	self.fieldsForValidation = new Array();

	/**
	 *
	 * @param {Array} files
	 * @returns {undefined}
	 */
	self.validateFiles = function (files) {
		self.fieldsForValidation = files;
		if (self.fieldsForValidation.length) {
			self.validate();
		} else {
			self.addError(translations.application_upload_error_choose_file);
		}
	};
	/**
	 * Validates file fields with given name
	 * @returns {undefined}
	 */
	self.validate = function () {
		var fileInputList = self.fieldsForValidation;
		var fileInputIndex = 0;

		for (fileInputIndex; fileInputIndex < fileInputList.length; fileInputIndex++) {

			var inputData = self._buildInputData(fileInputList[fileInputIndex]);
			if (!inputData) {
				return false;
			}

			self._validateSingleInput(inputData);
		}

	};
	/**
	 * performs validaton of single input Element
	 * @param {type} inputData
	 * @returns {undefined}
	 */
	self._validateSingleInput = function (inputData) {
		for (var validatorIndex in self.activeValidators) {
			if (self.activeValidators.hasOwnProperty(validatorIndex)) {
				self._validateSingleValidator(self.activeValidators[validatorIndex], inputData);
			}
		}
	};
	/**
	 * Performs single, input validator on given input
	 * @param {type} validator
	 * @param {type} inputData
	 * @returns {undefined}
	 */
	self._validateSingleValidator = function (validator, inputData) {
		if (validator.allowedExtensions.indexOf(inputData.extension.toLowerCase()) === -1) {
			validator.onExtensionError(self);
		}

		if (validator.maxSize < inputData.fileSize) {
			validator.onSizeError(self);
		}
	};
	/**
	 * extaracts data from input and returns them as an object
	 * @param {type} htmlInput
	 * @returns {fileUploadValidator.self._buildInputData.inputData}
	 */
	self._buildInputData = function (file) {
		var inputData = {};
		if (typeof file !== "object") {
			self.config.onFileMissing(self);
			return false;
		}
		inputData.extension = file.name.split(".").pop();
		inputData.fileSize = file.size;
		return inputData;

	};
	/**
	 * Add validator to list of active validators
	 * @param {type} validatorName
	 * @returns {fileUploadValidator}
	 */
	self.activateValidator = function (validatorName) {

		var validatorExist = false;
		for (var i = 0; i < Object.keys(self.validators).length; i++) {
			if (self.validators[i].name == validatorName) {
				self.activeValidators.push(self.validators[i]);
				validatorExist = true;
				break;
			}
		}
		if (!validatorExist) {
			self.config.onValidatorMissing(self);
		}

		return self;
	};
	self.deactivateValidator = function (validatorName) {
		for (var i = 0; i < self.activeValidators.length; i++) {
			if (self.activeValidators[i].name === validatorName) {
				self.activeValidators.splice(i, 1);
				break;
			}
		}
	};
	/**
	 * renders validation errors
	 * @param {type} destinationObject - jQuery wrapped html element containing errors
	 * @returns {boolean}
	 */
	self.renderValidationErrors = function (destinationObject, $elToFocusOnError) {
		destinationObject.children().remove();
		for (var i = 0; i < self.errors.length; i++) {
			destinationObject.append("<div class='upload-error'><span class=\"label label-danger\">" + self.errors[i] + "</span></div>");
		}
		if (self.errors.length > 0) {
            if ($elToFocusOnError) {
                $elToFocusOnError.trigger("focus");
            }
			return false;
		}
		//self.errors = new Array();
		return true;
	};

	self.addError = function (errorMessage) {
		self.errors.push(errorMessage);
	};

}
/**
 * bulds default config basing on given validation patterns list
 * @param {Array} pattern
 * @returns {Object}
 */
fileUploadValidator.buildValidatorConfigFromPattern = function (pattern) {
	var validatorsConfig = new Object;
	validatorsConfig.validators = new Array();

	for (var i = 0; i < pattern.length; i++) {
		var singleValidator = new Object();

		singleValidator = pattern[i];
		singleValidator.onSizeError = function (owner) {
			owner.addError(translations.application_upload_error_too_big_file);
		};
		singleValidator.onExtensionError = function (owner) {
			owner.addError(translations.application_upload_error_wrong_extension);
		};
		validatorsConfig.validators.push(singleValidator);
	}
	validatorsConfig.onFileMissing = function (owner) {
		owner.addError(translations.application_upload_error_choose_file);
	};
	validatorsConfig.onValidatorMissing = function (owner) {
		owner.addError(translations.application_upload_choose_category);
	};
	return validatorsConfig;
};

// ajax upload
(function($) {
    function log() {
        if (typeof console != "undefined" && typeof console.log == "function") {
            Array.prototype.unshift.call(arguments, "[Ajax Upload]");
            console.log(Array.prototype.join.call(arguments, " "))
        }
    }

    function addEvent(el, type, fn) {
        if (el.addEventListener) {
			if (typeof type === "object") {
				for (var i=0, iLen=type.length; i<iLen; i++) {
					el.addEventListener(type[i], fn, false);
				}
			} else {
				el.addEventListener(type, fn, false);
			}
		} else if (el.attachEvent) {
			el.attachEvent("on" + type, function() {
				fn.call(el)
			});
		}
        else throw new Error("not supported or DOM not loaded");
    }

    function addResizeEvent(fn) {
        var timeout;
        addEvent(window, "resize", function() {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(fn, 100)
        })
    }
    if (document.documentElement.getBoundingClientRect) var getOffset = function(el) {
        var box = el.getBoundingClientRect();
        var doc = el.ownerDocument;
        var body = doc.body;
        var docElem = doc.documentElement;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var zoom = 1;
        if (body.getBoundingClientRect) {
            var bound = body.getBoundingClientRect();
            zoom = (bound.right - bound.left) / body.clientWidth
        }
        if (zoom > 1) {
            clientTop = 0;
            clientLeft = 0
        }
        var top = box.top / zoom + (window.pageYOffset || docElem && docElem.scrollTop / zoom || body.scrollTop / zoom) - clientTop,
            left = box.left / zoom + (window.pageXOffset || docElem && docElem.scrollLeft / zoom || body.scrollLeft / zoom) - clientLeft;
        return {
            top: top,
            left: left
        }
    };
    else var getOffset = function(el) {
        var top = 0,
            left = 0;
        do {
            top += el.offsetTop || 0;
            left += el.offsetLeft || 0;
            el = el.offsetParent
        } while (el);
        return {
            left: left,
            top: top
        }
    };

    function getBox(el) {
        var left, right, top, bottom;
        var offset = getOffset(el);
        left = offset.left;
        top = offset.top;
        right = left + el.offsetWidth;
        bottom = top + el.offsetHeight;
        return {
            left: left,
            right: right,
            top: top,
            bottom: bottom
        }
    }

    function addStyles(el, styles) {
        for (var name in styles)
            if (styles.hasOwnProperty(name)) el.style[name] = styles[name]
    }

    function copyLayout(from, to) {
        var box = getBox(from);
        addStyles(to, {
            position: "absolute",
            left: box.left + "px",
            top: box.top + "px",
            width: from.offsetWidth + "px",
            height: from.offsetHeight + "px"
        })
    }
    var toElement = function() {
        var div = document.createElement("div");
        return function(html) {
            div.innerHTML = html;
            var el = div.firstChild;
            return div.removeChild(el)
        }
    }();
    var getUID = function() {
        var id = 0;
        return function() {
            return "ValumsAjaxUpload" + id++
        }
    }();

    function fileFromPath(file) {
        return file.replace(/.*(\/|\\)/, "")
    }

    function getExt(file) {
        return -1 !== file.indexOf(".") ? file.replace(/.*[.]/, "") : ""
    }

    function hasClass(el, name) {
        var re = new RegExp("\\b" + name + "\\b");
        return re.test(el.className)
    }

    function addClass(el, name) {
        if (!hasClass(el, name)) el.className += " " + name
    }

    function removeClass(el, name) {
        var re = new RegExp("\\b" + name + "\\b");
        el.className = el.className.replace(re, "")
    }

    function removeNode(el) {
        el.parentNode.removeChild(el)
    }
    window.AjaxUpload = function(button, options) {
        this._settings = {
            action: "upload.php",
            name: "userfile",
            data: {},
            autoSubmit: true,
            responseType: false,
            hoverClass: "hover",
            disabledClass: "disabled",
            onChange: function(file, extension) {},
            onSubmit: function(file, extension) {},
            onComplete: function(file, response) {}
        };
        for (var i in options)
            if (options.hasOwnProperty(i)) this._settings[i] = options[i];
        if (button.jquery) button = button[0];
        else if (typeof button == "string") {
            if (/^#.*/.test(button)) button = button.slice(1);
            button = document.getElementById(button)
        }
        if (!button || button.nodeType !== 1) throw new Error("Please make sure that you're passing a valid element");
        if (button.nodeName.toUpperCase() == "A") addEvent(button, "click", function(e) {
            if (e && e.preventDefault) e.preventDefault();
            else if (window.event) window.event.returnValue = false
        });
        this._button = button;
        this._input = null;
        this._disabled = false;
        this.enable();
        this._rerouteClicks()
    };
    AjaxUpload.prototype = {
        setData: function(data) {
            this._settings.data = data
        },
        disable: function() {
            addClass(this._button, this._settings.disabledClass);
            this._disabled = true;
            var nodeName = this._button.nodeName.toUpperCase();
            if (nodeName == "INPUT" || nodeName == "BUTTON") this._button.setAttribute("disabled", "disabled");
            if (this._input) this._input.parentNode.style.visibility = "hidden"
        },
        enable: function() {
            removeClass(this._button, this._settings.disabledClass);
            this._button.removeAttribute("disabled");
            this._disabled = false
        },
        _createInput: function() {
            var self = this;
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("name", this._settings.name);
            input.setAttribute("id", this._settings.name);
            input.setAttribute("tabindex", "-1");
            addStyles(input, {
                position: "absolute",
                right: 0,
                margin: 0,
                padding: 0,
                fontSize: "480px",
                cursor: "pointer"
            });
            const lbl = document.createElement("label");
            lbl.htmlFor = this._settings.name;
            lbl.innerHTML = this._settings.name; // any text - to get rid of audit errors
            var div = document.createElement("div");
            addStyles(div, {
                display: "block",
                position: "absolute",
                overflow: "hidden",
                margin: 0,
                padding: 0,
                opacity: 0,
                direction: "ltr",
                zIndex: 2147483583
            });
            if (div.style.opacity !== "0") {
                if (typeof div.filters == "undefined") throw new Error("Opacity not supported by the browser");
                div.style.filter = "alpha(opacity=0)"
            }
            addEvent(input, "change", function() {
                if (!input || input.value === "") return;
                var file = fileFromPath(input.value);
                if (false === self._settings.onChange.call(self, file, getExt(file))) {
                    self._clearInput();
                    return
                }
                if (self._settings.autoSubmit) self.submit();
            });
			// Simple way do check for touchdevice
			if ('ontouchstart' in document.documentElement !== true) {
				addEvent(input, ['mouseover', 'touchstart'], function() {
					addClass(self._button, self._settings.hoverClass)
				});
				addEvent(input, ['mouseout', 'touchend'], function() {
					removeClass(self._button, self._settings.hoverClass);
					input.parentNode.style.visibility = "hidden"
				});
			}

            div.appendChild(lbl);
            div.appendChild(input);
            div.setAttribute("aria-hidden", "true");
            document.body.appendChild(div);
            this._input = input
        },
        _clearInput: function() {
            if (!this._input) return;
            removeNode(this._input.parentNode);
            this._input = null;
            this._createInput();
            removeClass(this._button, this._settings.hoverClass)
        },
        _rerouteClicks: function() {
            var self = this;
            if (self._disabled) return;
            if (!self._input) self._createInput();

            addEvent(self._button, ['mouseover', 'touchstart'], function() {
                var div = self._input.parentNode;
                copyLayout(self._button, div);
                div.style.visibility = "visible"
            });

			// Make the upload button accessible for keyboard users too
            addEvent(self._button, ['click'], function() {
                self._input.click();
            });
        },
        _createIframe: function() {
            var id = getUID();
            var iframe = toElement('<iframe src="javascript:false;" name="' + id + '" />');
            iframe.setAttribute("id", id);
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            return iframe
        },
        _createForm: function(iframe) {
            var settings = this._settings;
            var form = toElement('<form method="post" enctype="multipart/form-data"></form>');
            form.setAttribute("action", settings.action);
            form.setAttribute("target", iframe.name);
            form.style.display = "none";
            document.body.appendChild(form);
            for (var prop in settings.data)
                if (settings.data.hasOwnProperty(prop)) {
                    var el = document.createElement("input");
                    el.setAttribute("type", "hidden");
                    el.setAttribute("name", prop);
                    el.setAttribute("value", settings.data[prop]);
                    form.appendChild(el)
                }
            return form
        },
        _getResponse: function(iframe, file) {
            var toDeleteFlag = false,
                self = this,
                settings = this._settings;
            addEvent(iframe, "load", function() {
                if (iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" || iframe.src == "javascript:'<html></html>';") {
                    if (toDeleteFlag) setTimeout(function() {
                        removeNode(iframe)
                    }, 0);
                    return
                }
                var doc = iframe.contentDocument ? iframe.contentDocument : window.frames[iframe.id].document;
                if (doc.readyState && doc.readyState != "complete") return;
                if (doc.body && doc.body.innerHTML == "false") return;
                var response;
                if (doc.XMLDocument) response = doc.XMLDocument;
                else if (doc.body) {
                    response = doc.body.innerHTML;
                    if (settings.responseType && settings.responseType.toLowerCase() == "json") {
                        if (doc.body.firstChild && doc.body.firstChild.nodeName.toUpperCase() == "PRE") response = doc.body.firstChild.firstChild.nodeValue;
                        if (response) response = eval("(" + response + ")");
                        else response = {}
                    }
                } else response = doc;
                settings.onComplete.call(self, file, response);
                toDeleteFlag = true;
                iframe.src = "javascript:'<html></html>';"
            })
        },
        submit: function() {
            var self = this,
                settings = this._settings;
            if (!this._input || this._input.value === "") return;
            var file = fileFromPath(this._input.value);
            if (false === settings.onSubmit.call(this, file, getExt(file))) {
                this._clearInput();
                return
            }
            var iframe = this._createIframe();
            var form = this._createForm(iframe);
            removeNode(this._input.parentNode);
            removeClass(self._button, self._settings.hoverClass);
            form.appendChild(this._input);
            form.submit();
            removeNode(form);
            form = null;
            removeNode(this._input);
            this._input = null;
            this._getResponse(iframe, file);
            this._createInput()
        },
        submitAjax: function() {
            /**
             * Send the data via Ajax
             *
             * The file object from the drop event must not be assigned to an element <input>. Only the user can select files;
             * you cannot dynamically change the files to be uploaded, since browsers deny this capability for JavaScript security reasons.
             *
             * @type {AjaxUpload}
             */
            var self = this,
                settings = this._settings,
                file,
                formData;

            if (typeof window.$(self._input).data('files') !== 'undefined' && window.$(self._input).data('files').length) {
                /**
                 * Take file from drop event
                 */
                file = window.$(self._input).data('files')[0];
            } else if (window.$(self._input)[0].files.length) {
                /**
                 * Take file FILE INPUT (regular)
                 */
                file = window.$(self._input)[0].files[0];
            } else {
                return
            }

            if (false === settings.onSubmit.call(this, file.name, getExt(file.name))) {
                this._clearInput();
                return
            }

            formData = new FormData();
            formData.append(window.$(self._input).attr('name'), file);
            for ( var key in settings.data ) {
                formData.append(key, settings.data[key]);
            }

            window.$.ajax({
                url: settings.action,
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function ( data ) {
                    /**
                     * Will also create new input field
                     */
                    settings.onComplete.call(self, file.name, data);
                },
                error: function () {
                    settings.onError();
                },
                complete: function () {
                    window.$(self._input.parentNode).remove();
                    self._input = null;
                }
            });
        }
    }
})();

/*
 * Can be used to create bootstrap windows via js on the fly
 *
 * @return returns the modal container jQuery object
 * @param modalParams: expects data object with the following structure:
 *      {
 *          "headline": "headline of the modal header and page title (when modal is shown)",
 *          "content": "content of the modal body. Can be either jQuery element from the current DOM or static text",
 *          "className": "some-additional-class" of a modal dialog
 *          "useExistingOpenedModal": "prevent creating a new modal if one is already is opened. The content, title and buttons will be replaced",
 *          "disableFocusOnShown": "prevent focusing the first focusable element when modal is shown e.g. jobad share modal",
 *          "keyboard": Closes the modal when escape key is pressed
 *          "backdrop": Includes a modal-backdrop element. Specify 'static' for a backdrop which doesn't close the modal on click.
 *          "buttons": [
 *              {
 *                  "content": "First button value",
 *                  "dismiss": true, // button should close modal
 *                  "primary": true, // primary button style
 *                  "className": "some-additional-class"
 *                  "callback": function () {
 *                      console.log("callback onclick button");
 *                  }
 *              },
 *              {
 *                  "content": "Second button value",
 *                  "dismiss": false,
 *                  "callback": function () {
 *                      console.log("callback onclick button");
 *                  }
 *              }
 *          ],
 *          "show": function () {
 *              console.log("some js function called on show callback of modal window");
 *          },
 *          "shown": function () {
 *              console.log("some js function called on shown callback of modal window");
 *          },
 *          "hide": function () {
 *              console.log("some js function called on hide callback of modal window");
 *          }
 *          "hidden": function () {
 *              console.log("some js function called on hidden callback of modal window");
 *          }
 *      }
 *
 */
function showStandardModal(modalParams) {
    if (!Object.keys(modalParams).length || "undefined" === typeof (window.standardModalTemplates)) {
        return false;
    }

    var $modalTpl = window.standardModalTemplates.$modalContainer,
        $modalBtnPrimaryTpl = window.standardModalTemplates.$btnPrimaryTemplate,
        $modalBtnDefaultTpl = window.standardModalTemplates.$btnDefaultTemplate;

    var modalId = $modalTpl.prop("id"),
        fallbackTargetToFocusOnHidden = $modalTpl.attr("data-js-fallback-target-to-focus-on-hidden");

    var $currentlyOpenedModal = $(window.$currentlyOpenedModal);

    // Reuse already existing opened modal and replace its content or create a clone
    var flUseExistingOpenedModal = ($currentlyOpenedModal.length && modalParams.useExistingOpenedModal);
    if (flUseExistingOpenedModal) {

        var $modal = $currentlyOpenedModal,
            $modalBody = $modal.find("[data-js-modal-body]"),
            $modalTitle = $modal.find("[data-js-modal-title]"),
            $modalFooter = $modal.find("[data-js-modal-footer]");

        // If there was a content object within the modal body, return it back to its parent
        returnContentBackToParent($modal);

        // Reset the modal content and the data
        $modalBody.empty();
        $modalTitle.empty();
        $modalFooter.empty();
    } else {

        var $modal = $modalTpl.clone(),
            $modalBody = $modal.find("[data-js-modal-body]"),
            $modalTitle = $modal.find("[data-js-modal-title]"),
            $modalFooter = $modal.find("[data-js-modal-footer]");

        /*
         * Set tooltip for the model close button icon
         */
        $modal.find("[data-js-modal-btn-close]").initTooltipsFromSrOnlyEl();

        /*
         * Set additional params that can exists in Bootstrap for modal
         */
        if (typeof modalParams.backdrop !== typeof undefined) {
            $modal.attr("data-backdrop", modalParams.backdrop);
        }
        if (typeof modalParams.keyboard !== typeof undefined) {
            $modal.attr("data-keyboard", modalParams.keyboard);
        }

        /*
         * Set initial actions for modal open (page title + focus inside of the modal)
         */
        $modal.on("shown.bs.modal", function () {
            moveFocusIntoModal($modal);
        });

        /*
         * Attach events - on show and on shown. Will be triggered only initially if 'useExistingOpenedModal'
         */
        if (typeof modalParams.show === "function") {
            $modal.on("show.bs.modal", modalParams.show);
        }

        if (typeof modalParams.shown === "function") {
            $modal.on("shown.bs.modal", modalParams.shown);
        }

        /*
         * Final actions, make sure to return the content the initial parent element, destroy the modal...
         */
        $modal.on("hidden.bs.modal", function () {
            var $modal = $(this);

            // If there was a content object within the modal body, return it back to its parent
            returnContentBackToParent($modal);

            // Make sure to return the focus to where it was before opening the modal
            var $previouslyFocusedElement = $($modal.data("modal-previouslyFocusedElement"));
            if (isFocusable($previouslyFocusedElement)) {
                $previouslyFocusedElement.trigger("focus");
            } else {
                // Use `.off("focusin.bs.modal")` to disable the "focus trap" while modal is still visible (transition)
                const $currentlyFocusedElement = $(document.activeElement);
                const focusAlreadyManagedBeforeTransitionEnd = $currentlyFocusedElement.length
                    && !$.contains($modal, $currentlyFocusedElement)
                    && $currentlyFocusedElement.is(":input,:header,a");
                if (!focusAlreadyManagedBeforeTransitionEnd) {
                    $(fallbackTargetToFocusOnHidden).trigger("focus");
                }
            }

            // Destroy the element
            $modal.remove();

            if (('undefined' !== typeof window.$currentlyOpenedModal) && ($modal.get(0) === window.$currentlyOpenedModal.get(0))) {
                delete window.$currentlyOpenedModal;
            }
        });
    }

    /*
     * Remember previously focused position (before opening the modal)
     */
    if ($currentlyOpenedModal.length && $currentlyOpenedModal.data("modal-previouslyFocusedElement")) {
        $modal.data("modal-previouslyFocusedElement", $currentlyOpenedModal.data("modal-previouslyFocusedElement"));
    } else {
        $modal.data("modal-previouslyFocusedElement", document.activeElement);
    }

    /*
     * Set the headline
     */
    if (modalParams.headline) {
        $modalTitle.html(modalParams.headline);
    }

    /*
     * Set the content (static HTML content or an existing $ object)
     * Save references to content object"s parent so that the object can return back there when not in modal anymore
     */
    if (modalParams.content) {
        if (typeof modalParams.content === "object") {
            $modal.data("modal-contentObjParent", modalParams.content.parent());
            $modal.data("modal-contentObj", modalParams.content);

            // Append the content into modal
            $modalBody.append(modalParams.content);
        } else {
            $modalBody.html(modalParams.content);
        }
    }

    /*
     * Set aria-describedby (e.g. to announce the specific content if there is nothing focusable within the modal)
     */
    if (modalParams.disableFocusOnShown && modalParams.ariaDescribedby) {
        $modal.attr("aria-describedby", modalParams.ariaDescribedby);
    }

    /*
     * Set the dialog class name
     */
    if (modalParams.className) {
        $modal.find("[ data-js-modal-dialog]").addClass(modalParams.className);
    }

    /*
     * Set the buttons
     */
    if (typeof modalParams.buttons !== "undefined" && Object.keys(modalParams.buttons).length) {
        for (var key in modalParams.buttons) {
            if (modalParams.buttons.hasOwnProperty(key)) {
                var $button = $modalBtnDefaultTpl.clone();
                if (modalParams.buttons[key].primary === true) {
                    var $button = $modalBtnPrimaryTpl.clone();
                }

                if (modalParams.buttons[key].content) {
                    $button.html(modalParams.buttons[key].content);
                }
                if (modalParams.buttons[key].dismiss === true) {
                    $button.attr("data-dismiss", "modal");
                }
                if (typeof (modalParams.buttons[key].callback) === "function") {
                    $button.on("click", modalParams.buttons[key].callback);
                }
                if (typeof (modalParams.buttons[key].className) === "string") {
                    $button.addClass(modalParams.buttons[key].className);
                }
                $modalFooter.append($button);
            }
        }
    } else {
        $modalFooter.empty();
    }

    /*
     * Attach events - on hide and on hidden
     * Keep in mind when using "useExistingOpenedModal" that all previously attached events will be fired too
     */
    if (typeof modalParams.hide === "function") {
        $modal.on("hide.bs.modal", modalParams.hide);
    }

    if (typeof modalParams.hidden === "function") {
        $modal.on("hidden.bs.modal", modalParams.hidden);
    }

    /*
     * Show the modal
     */
    var container = ($('main').length > 0) ? 'main' : document.body;
    if (!flUseExistingOpenedModal) {
        $currentlyOpenedModal.modal("hide");
        $modal.appendTo(container);
        $modal.modal("show");
    } else {
        // Trigger "modal show" event even if in this case no actual modal was created - the existing one was reused
        if (typeof modalParams.show === "function") {
            $.proxy(modalParams.show, $modal)();
        }

        moveFocusIntoModal($modal);
    }

    window.$currentlyOpenedModal = $modal;
    return $modal;

    /**
     * Returns the content back from the modal into the DOM where it was initially
     * @param $modal
     */
    function returnContentBackToParent($modal) {
        // The content object should return back there when not in modal anymore
        // This can break if content has not parent (e.g. dynamically created element detached form DOM)
        if ($modal.data("modal-contentObjParent") && $modal.data("modal-contentObjParent").length) {
            $modal.data("modal-contentObjParent").append($modal.data("modal-contentObj"));
            $modal.removeData("modal-contentObjParent");
            $modal.removeData("modal-contentObj");
        }
    }

    /**
     * Determines if a modal trigger element is focusable to be able to return there after it closes
     * @param $element
     * @returns {*|boolean|boolean}
     */
    function isFocusable($element) {
        if ($element.is(":hidden") || $element.is(":disabled")) {
            return false;
        }

        return $element.is(":input, a[href], area[href], iframe") || typeof ($element.attr("tabindex")) !== 'undefined';
    }

    /**
     * Accessibility: When modal is shown determine which element should be focused within the modal.
     * By default it focuses the first focusable element within the *modal body* or if it doesn't exits
     *   Then a first 'primary' button in the modal footer or if it doesn't exits
     *   Then a first 'default' button in the modal footer
     * Lastly, as a fallback, Bootstrap has it's own way of focusing a modal container if none of above works
     * or if 'disableFocusOnShown' param is used
     *
     * Accessible focus management rule:
     * Focus the modal when it opens and restore the focus to where it was before when it closes
     * @param $modal
     */
    function moveFocusIntoModal($modal) {
        if (!modalParams.disableFocusOnShown) {
            var $modalBody = $modal.find("[data-js-modal-body]");
            var firstFocusable = $modalBody.find(":input:visible").first();
            if (!firstFocusable.length) {
                var $modalFooter = $modal.find("[data-js-modal-footer]");
                firstFocusable = $modalFooter.find(":button.btn-primary").first();
                if (!firstFocusable.length) {
                    firstFocusable = $modalFooter.find(":button").first();
                }
                if (firstFocusable.length) {
                    firstFocusable.attr("aria-describedby", $modalBody.prop("id"));
                }
            }
            firstFocusable.trigger("focus");
        }
    }
}

function showLoadingModal(txtStrong, txtAdditional) {
    if (typeof window.activeLoadingModal !== 'undefined') {
        hideLoadingModal();
    }

    const $loadingModalBodyTpl = window.standardModalTemplates.$loadingModalBody,
          $loadingModalBody = $loadingModalBodyTpl.clone(),
          $loadingTxtStrongEl = $loadingModalBody.find('[data-js-loading-modal-txt-strong]'),
          $loadingTxtAdditionalEl = $loadingModalBody.find('[data-js-loading-modal-txt-additional]');

    if(txtStrong) {
        $loadingTxtStrongEl.text(txtStrong);
    }

    if(txtAdditional) {
        $loadingTxtAdditionalEl.text(txtAdditional);
    } else {
        $loadingTxtAdditionalEl.remove();
    }

    const modalData = {
        headline: window.translations.general_please_wait,
        content: $loadingModalBody.children(),
        className: 'loading-modal',
        backdrop: 'static',
        keyboard: false,
        disableFocusOnShown: true,
        ariaDescribedby: 'loading-modal-aria-describedby'
    }

    window.activeLoadingModal = showStandardModal(modalData);
    return window.activeLoadingModal;
}

function hideLoadingModal(returnFocusTo) {
    if (typeof window.activeLoadingModal === 'undefined') {
        return;
    }

    window.activeLoadingModal.off("focusin.bs.modal"); // deactivate the "focus trap"
    if (returnFocusTo) {
        $(window.activeLoadingModal).data("modal-previouslyFocusedElement", returnFocusTo)
    }
    window.activeLoadingModal.modal("hide");
    delete window.activeLoadingModal;
}

/**
 * Init function on DOM ready
 * Fetch the standard modal template and remove it from the DOM not to have duplicated IDs
 */
$(function () {
    var $modalContainer = $("[data-js-standard-modal-template]");
    if ($modalContainer.length) {
        $modalContainer.removeAttr("data-js-standard-modal-template")
            .prop("hidden", false)
            .removeClass("hidden")
            .detach();

        var $btnDefaultTemplate = $modalContainer.find("[data-js-modal-btn-default-template]");
        $btnDefaultTemplate.removeAttr("data-js-modal-btn-default-template")
            .detach();

        var $btnPrimaryTemplate = $modalContainer.find("[data-js-modal-btn-primary-template]");
        $btnPrimaryTemplate.removeAttr("data-js-modal-btn-primary-template")
            .detach();

        const $loadingModalBody = $("[data-js-loading-modal-body-template]");
        if ($loadingModalBody.length) {
            $loadingModalBody.removeAttr("data-js-loading-modal-body-template")
                .prop("hidden", false)
                .removeClass("hidden")
                .detach();
        }

        window.standardModalTemplates = {
            $modalContainer: $modalContainer,
            $btnDefaultTemplate: $btnDefaultTemplate,
            $btnPrimaryTemplate: $btnPrimaryTemplate,
            $loadingModalBody: $loadingModalBody
        };
    }
});

/* ==========================================================================
 Jobad share / forward modal

 * Share modal is generated dynamically on click because is triggered from:
 * (1) Search results list.
 * (2) Jobad view page actions upper button.
 * (3) Jobad view page actions footer button.
 ========================================================================== */
addTolisteners(['search_result', 'jobad', 'jobabo_overview'], {
    name: 'js-share-jobad',
    method: function () {
        if ($(document.body).hasClass('fl-jobad-external-preview') || typeof translations === 'undefined') {
            return;
        }

        var config = {
            jobadDataContainer: '[data-jobad-container]',
            jobadShareBtnSelector: '.js-share-jobad',
            jobadShareBtnTextSelector: '.js-text,.btn-icon-value',
            jobadDataIdAttr: 'data-jobad-id',
            jobadDataCodeAttr: 'data-jobad-code',
            jobadDataTitleAttr: 'data-jobad-title',
            jobadDataUriAttr: 'data-uri',
            jobadShareModal: {
                modalContainerWrapper: '[data-jobad-share-modal-wrapper]',
                modalContainer: '[data-jobad-share-modal]',
                modalErrorsContainer: '[data-jobad-share-errors]',
                shareLinkSelector: '[data-jobad-share-link]',
                shareFormSelector: '[data-jobad-share-form]',
                shareFldOwnEmailAttr: 'data-js-prefill-own-email',
                shareLinkTplAttr: 'data-jobad-share-link-tpl',
                shareLinkTplTitlePlaceholder: 'ZZZZZ_JS_JOBAD_TITLE_ENCODED_ZZZZZ',
                shareLinkTplLinkPlaceholder: 'ZZZZZ_JS_LINK_TO_SHARE_ZZZZZ'
            },
            remainingCharsTracking: {
                commentInput: '[data-remaining-chars-tracking]',
                countStatusPlaceholder: '[data-remaining-chars-value-placeholder]'
            }
        };

        // Globals
        var $jobadShareModalWrapper = $(config.jobadShareModal.modalContainerWrapper);
        var $jobadShareModal = $jobadShareModalWrapper.find(config.jobadShareModal.modalContainer);
        var $jobadShareForm = $jobadShareModalWrapper.find(config.jobadShareModal.shareFormSelector);
        var $jobadShareModalErrors = $jobadShareModalWrapper.find(config.jobadShareModal.modalErrorsContainer);
        var $commentInputField = $jobadShareModalWrapper.find(config.remainingCharsTracking.commentInput);
        var $commentRemainingCharsPlaceholder = $jobadShareModalWrapper.find(
            config.remainingCharsTracking.countStatusPlaceholder
        );
        var $commentInputFieldMaxChars = 0;

        if (inNamespace('jobad')) {
            jobadShareInitializeBtnText();
        } else {
            window.jobadShareInitializeBtnText = jobadShareInitializeBtnText;
        }
        jobadShareInitializeRemainingChars();
        jobadShareInitializeSubmitOnEnter();

        /**
         * Share button click handler
         */
        $(document).on('click', config.jobadShareBtnSelector, function (e) {
            var $clickedButton = $(this);
            var $jobadDataParent = $(config.jobadDataContainer); // page footer actions
            var $jobadDataParentPrecise = $clickedButton.closest(config.jobadDataContainer); // search result list
            if ($jobadDataParentPrecise.length) {
                $jobadDataParent = $jobadDataParentPrecise;
            }

            if (!$jobadDataParent.length) {
                return;
            }

            // Globals - jobad specific
            var jobadUri = $jobadDataParent.attr(config.jobadDataUriAttr);
            var jobadTitle = $jobadDataParent.attr(config.jobadDataTitleAttr);
            var jobadId = parseInt($jobadDataParent.attr(config.jobadDataIdAttr), 10);
            var jobadCode = $jobadDataParent.attr(config.jobadDataCodeAttr);

            var modalData = jobadSharePrepareModal();
            showStandardModal(modalData);

            e.preventDefault();
            return false;



            /**
             * Parse the modal and set share parameters dynamically.
             * This works with jobad view and also search result table.
             */
            function jobadSharePrepareModal() {
                var jobadTitleEncoded = encodeURIComponent(jobadTitle); // equivalent to rawurlencode()
                var linkToShare = encodeURIComponent(jobadUri);
                var $socialMediaLinks = $jobadShareModal.find(config.jobadShareModal.shareLinkSelector);
                $socialMediaLinks.each(function () {
                    var $socialMediaLink = $(this); // the template link with ZZZZZ placeholders
                    var socialMediaLinkHref = $socialMediaLink.attr(config.jobadShareModal.shareLinkTplAttr);
                    if (!socialMediaLinkHref) {
                        socialMediaLinkHref = $socialMediaLink.attr('href');
                        $socialMediaLink.attr(config.jobadShareModal.shareLinkTplAttr, socialMediaLinkHref);
                    }
                    var newSocialMediaLinkHref = socialMediaLinkHref
                            .replace(config.jobadShareModal.shareLinkTplTitlePlaceholder, jobadTitleEncoded)
                            .replace(config.jobadShareModal.shareLinkTplLinkPlaceholder, linkToShare);
                    $socialMediaLink.attr('href', newSocialMediaLinkHref);
                });

                var modalData = {
                    headline: translations.general_share_jobad,
                    content: $jobadShareModalWrapper.children(),
                    buttons: [
                        {
                            content: translations.general_close_dialog,
                            dismiss: true
                        },
                        {
                            content: translations.general_share,
                            dismiss: false,
                            primary: true,
                            className: 'js-modal-submit-btn',
                            callback: jobadShareFormSubmitBtnClicked
                        }
                    ],
                    show: jobadShareModalInitialize
                };
                return modalData;
            }

            /**
             * When modal is being opened
             */
            function jobadShareModalInitialize() {
                if ($jobadShareForm.length) {
                    // Clear errors
                    jobadShareClearErrors();

                    // Clear all text fields
                    jobadShareClearInputs();

                    // Reload captcha
                    jobadShareReloadRecaptcha();

                    // Recalculate remaining chars - call with specific context
                    $.proxy(jobadShareRecalculateRemainingChars, $commentInputField)();
                }
            }

            /**
             * When modal is being submitted
             */
            function jobadShareFormSubmitBtnClicked() {
                if (typeof window.captchaAddCallbackFunction !== 'undefined') {
                    // Cannot reuse existing captcha waiting logic because it relies on <form> and one submit event
                    window.captchaAddCallbackFunction(
                        jobadShareFormSubmit,
                        this,
                        $(this),
                        750
                    );
                    return;
                } else {
                    $.proxy(jobadShareFormSubmit, this)();
                }
            }

            /**
             * When modal is being submitted
             */
            function jobadShareFormSubmit() {
                if ($jobadShareForm.length) {
                    var $submitBtn = $(this);
                    if ($submitBtn.hasClass('disabled')) {
                        return;
                    }

                    // Populate and submit jobad share form
                    var formDataUserInput = $jobadShareForm.find(':input').serialize();
                    var formDataGeneric = {
                        'jobad_id': jobadId,
                        'send': true,
                        'specific': 'jobad',
                        'type': 'recommend',
                        '_csrf_token': window.globalConstants.csrfToken
                    };

                    // If URL contain jobad code then share link should too
                    var jobadCodeFromUrl = getUrlParameterByName('code', location.search);
                    if (jobadCodeFromUrl) {
                        formDataGeneric.jobad_code = jobadCodeFromUrl;
                    }
                    var formData = $.param(formDataGeneric) + '&' + formDataUserInput;

                    try {
                        $submitBtn.addClass('disabled');
                        $.post(
                            'inc/contact.php',
                            formData
                        ).done(function (response) {
                            jobadShareFormSubmitBtnClickedResponseHandler(response);
                            var response = JSON.parse(response);
                            $('[data-hook="mathCaptchaLabel"]').html(response['mathCaptchaLabel'])
                        }).fail(function () {
                            showGeneralErrorMessage();
                        }).always(function () {
                            $submitBtn.removeClass('disabled');
                        });
                    } catch (e) {
                        //console.log(e.message);
                    }
                }
                return false;
            }

            /**
             * show errors when any other way - close modal and show message
             * @param data response object (JSON)
             */
            function jobadShareFormSubmitBtnClickedResponseHandler(response) {
                var response = JSON.parse(response);
                if (response.status == true) {
                    var modalData = {
                        headline: translations.jobad_message_email_sent_title,
                        content: translations.jobad_message_email_sent,
                        buttons: [
                            {
                                content: translations.general_close_dialog,
                                dismiss: true,
                                primary: false
                            }
                        ]
                    };
                    showStandardModal(modalData);
                } else {
                    jobadShareClearErrors();
                    jobadShareReloadRecaptcha();
                    jobadShareSetErrors(response.error_input_names, response.error_panel_HTML);
                }
            }

            /**
             * Set form errors
             */
            function jobadShareSetErrors(errorInputsNames, errorPanelHtml) {
                // Set .has-error class and previous input values
                $.each(errorInputsNames, function (index, error_input_name) {
                    $jobadShareForm
                        .find('[data-js-error-key="' + error_input_name + '"]')
                        .addClass('js-form-group--has-error');
                });
                $jobadShareForm.find(".form-group").applyFormGroupValidationMarkup();

                // Set error panel
                $jobadShareModalErrors.prepend(errorPanelHtml);
                $jobadShareModalErrors.find("[data-sr-alert-ref]").srNotification();
            }

            /**
             * Clear form errors
             */
            function jobadShareClearErrors() {
                // Remove error panel
                $jobadShareModalErrors.empty();
                $jobadShareForm.find('.js-form-group--has-error').removeClass('js-form-group--has-error');
                $jobadShareForm.find(".form-group").applyFormGroupValidationMarkup();
            }

            /**
             * Clear form inputs
             */
            function jobadShareClearInputs() {
                $jobadShareForm.find(':input:not(:button,:submit)').val('');
                var $jobadShareOwnEmailField = $jobadShareForm.find('[' + config.jobadShareModal.shareFldOwnEmailAttr + ']');
                var jobadShareOwnEmailValue = $jobadShareOwnEmailField.attr(config.jobadShareModal.shareFldOwnEmailAttr);
                if (jobadShareOwnEmailValue) {
                    $jobadShareOwnEmailField.val(jobadShareOwnEmailValue);
                }
            }

            /**
             * reload recaptcha
             */
            function jobadShareReloadRecaptcha() {
                captchaInitialize();
                captchaReset(); // if already initialized
            }
        });

        /**
         * One time initialization - On script load
         * Tracking of the remaining characters
         */
        function jobadShareInitializeBtnText() {
            const $buttons = $(config.jobadShareBtnSelector);
            $buttons.attr({"lang": window.globalConstants.currentLangStr});
            $buttons.find(config.jobadShareBtnTextSelector).text(translations.general_share_jobad);
            $buttons.initTooltipsFromSrOnlyEl();
        }

        /**
         * One time initialization - On script load
         * Tracking of the remaining characters
         */
        function jobadShareInitializeRemainingChars() {
            if ($commentInputField.length && $commentRemainingCharsPlaceholder.length) {
                $commentInputFieldMaxChars = parseInt($commentInputField.attr('maxlength'));
                $commentInputField.on('keyup', jobadShareRecalculateRemainingChars);
            }
        }

        /**
         * Tracking of remaining chars in a comment message
         */
        function jobadShareRecalculateRemainingChars() {
            var currentCharsLength = $(this).val().length;
            $commentRemainingCharsPlaceholder.text($commentInputFieldMaxChars - currentCharsLength);
        }

        /**
         * One time initialization - On script load
         */
        function jobadShareInitializeSubmitOnEnter() {
            $jobadShareForm.on("submit", function(e) {
                e.preventDefault();
                $(".js-modal-submit-btn").trigger("click");
                return false;
            });
        }
    }
});

/* ==========================================================================
 Job merken / Job Bookmarking

 * Possible states of jobad mark button:
 * (1) Disabled + !LoggedIn - If a class `config.jobadMarkBtnNoLoginModalClass` is set to the button,
 * the button will be disabled when not LoggedIn. Otherwise the button will not
 * be disabled. User will be able to click the button to get the login modal.
 * (2) !Disabled + !LoggedIn - In jobad view the button will not be disabled but
 * there will be modal to suggest login
 * (3) !Bookmarked + LoggedIn - Will create bookmark on a click
 * (4) Bookmarked + LoggedIn - Will remove bookmark on a click
 ========================================================================== */
addTolisteners(['search_result', 'jobad', 'jobabo_overview'], {
    name: 'js-mark-jobad',
    method: function () {
        if ($(document.body).hasClass('fl-jobad-external-preview') || typeof translations === 'undefined') {
            return;
        }
        ;

        var config = {
            jobadDataContainer: '[data-jobad-container]',
            jobadMarkBtnSelector: '.js-mark-jobad',
            jobadMarkBtnNoLoginModalClass: 'js-mark-jobad-btn-no-login-modal',
            jobadDataIdAttr: 'data-jobad-id',
            jobadDataCodeAttr: 'data-jobad-code',
            jobadMarkAllMarkedJobadsDataAttr: 'data-all-marked-jobads',
            jobadMarkMarkedStateAttr: 'data-jobad-mark-marked',
            jobadMarkBtnIconSelector: '.glyphicons',
            jobadMarkBtnTextSelector: '.js-text',
            jobadMarkIconClass: 'glyphicons-bookmark',
            jobadMarkIconClassMarked: 'glyphicons-bookmark primary-color icon-stacked icon-ok',
            jobadMarkIconClassMarkedJobadView: 'glyphicons-bookmark',
            jobadMarkIconClassNotLoggedin: 'glyphicons-bookmark',
            jobadMarkIconClassLoading: 'animate-spinner glyphicons-refresh'
        };
        var allMarkedJobadIds = [];
        if (window.globalConstants.isLoggedIn) {
            var markedJobadsString = $('[' + config.jobadMarkAllMarkedJobadsDataAttr + ']')
                .attr(config.jobadMarkAllMarkedJobadsDataAttr);
            if (markedJobadsString) {
                allMarkedJobadIds = markedJobadsString.split(',').map(Number); // array of integers
            }
        }

        // Set the state to all the buttons (jobad + search result)
        var $allJobadMarkButtonsOnPage = $(config.jobadMarkBtnSelector);
        if (inNamespace('jobad') && $allJobadMarkButtonsOnPage.length) {
            var $jobadDataParent = $(config.jobadDataContainer);
            var jobadId = parseInt($jobadDataParent.attr(config.jobadDataIdAttr), 10);
            jobadMarkBtnCheckAndSetState($allJobadMarkButtonsOnPage, jobadId);
        } else {
            // Prepare globals to use by GJB datatable
            window.allMarkedJobadIds = allMarkedJobadIds;
            window.jobadMarkBtnSelector = config.jobadMarkBtnSelector;
            window.jobadMarkBtnCheckAndSetState = jobadMarkBtnCheckAndSetState;
        }

        $(document).on('click', config.jobadMarkBtnSelector, function (e) {
            var $clickedButton = $(this);
            if ($clickedButton.hasClass('disabled')) {
                return false;
            }

            var $jobadDataParent = $(config.jobadDataContainer); // page footer actions
            var $jobadDataParentPrecise = $clickedButton.closest(config.jobadDataContainer); // search result list
            if ($jobadDataParentPrecise.length) {
                $jobadDataParent = $jobadDataParentPrecise;
            }

            if (!$jobadDataParent.length) {
                return;
            }

            // Jobad view (two buttons) or search results (single button)?
            if (inNamespace('jobad')) {
                var $buttonsToUpdate = $(config.jobadMarkBtnSelector); // all buttons on the page
            } else {
                var $buttonsToUpdate = $clickedButton;
            }

            // Globals
            var jobadId = parseInt($jobadDataParent.attr(config.jobadDataIdAttr), 10);
            var jobadCode = $jobadDataParent.attr(config.jobadDataCodeAttr);

            // User not loged in?
            if (!window.globalConstants.isLoggedIn) {
                if (!$clickedButton.hasClass(config.jobadMarkBtnNoLoginModalClass)) {
                    jobadMarkShowMessageNotLoggedIn();
                }
                return false;
            }

            if (jobadCode) {
                if ($clickedButton.attr(config.jobadMarkMarkedStateAttr)) {
                    jobadMarkShowMessageDeleteMark(jobadCode, jobadId, $buttonsToUpdate);
                } else {
                    jobadMarkCreateBookmark(jobadCode, jobadId, $buttonsToUpdate);
                }
            }

            e.preventDefault();
            return false;
        });

        /**
         * Checks if passed jobad id is bookmarked and mark the state on the buttons
         */
        function jobadMarkBtnCheckAndSetState($buttons, jobadId) {
            if (window.globalConstants.isLoggedIn) {
                if ($.inArray(parseInt(jobadId, 10), allMarkedJobadIds) !== -1) {
                    jobadMarkBtnSetJobadMarkedState($buttons);
                } else {
                    jobadMarkBtnSetJobadNotMarkedState($buttons);
                }
            } else {
                jobadMarkBtnSetNotLoggedinState($buttons);
            }
        }

        function jobadMarkBtnSetJobadMarkedState($buttons) {
            const btnText = translations.general_jobad_marked;
            let jobadMarkIconClassMarked = config.jobadMarkIconClassMarked;
            if (inNamespace('jobad')) {
                jobadMarkIconClassMarked = config.jobadMarkIconClassMarkedJobadView;
            }
            $buttons.attr(config.jobadMarkMarkedStateAttr, true);
            $buttons.prop({
                "lang": window.globalConstants.currentLangStr // a11y: FE lang can differ from #jobad-container[lang]
            });
            $buttons.find(config.jobadMarkBtnTextSelector)
                .text(btnText);
            $buttons.find(config.jobadMarkBtnIconSelector)
                .removeClass(config.jobadMarkIconClass)
                .removeClass(config.jobadMarkIconClassNotLoggedin)
                .removeClass(config.jobadMarkIconClassLoading)
                .addClass(jobadMarkIconClassMarked);
            $buttons.initTooltipsFromSrOnlyEl();
        }

        function jobadMarkBtnSetJobadNotMarkedState($buttons) {
            const btnText = translations.general_jobad_mark;
            $buttons.removeAttr(config.jobadMarkMarkedStateAttr);
            $buttons.prop({
                "lang": window.globalConstants.currentLangStr
            });
            $buttons.find(config.jobadMarkBtnTextSelector)
                .text(btnText);
            $buttons.find(config.jobadMarkBtnIconSelector)
                .removeClass(config.jobadMarkIconClassMarked)
                .removeClass(config.jobadMarkIconClassNotLoggedin)
                .removeClass(config.jobadMarkIconClassLoading)
                .addClass(config.jobadMarkIconClass);
            $buttons.initTooltipsFromSrOnlyEl();
        }

        function jobadMarkBtnSetLoadingClass($buttons) {
            $buttons.find(config.jobadMarkBtnIconSelector)
                .removeClass(config.jobadMarkIconClass)
                .removeClass(config.jobadMarkIconClassMarked)
                .removeClass(config.jobadMarkIconClassNotLoggedin)
                .addClass(config.jobadMarkIconClassLoading);
        }

        function jobadMarkBtnSetNotLoggedinState($buttons) {
            const btnText = translations.general_jobad_mark;
            $buttons.attr(config.jobadMarkMarkedStateAttr, false);
            $buttons.prop({
                "lang": window.globalConstants.currentLangStr
            });
            $buttons.find(config.jobadMarkBtnTextSelector)
                .text(translations.general_jobad_mark);
            $buttons.find(config.jobadMarkBtnIconSelector)
                .removeClass(config.jobadMarkIconClass)
                .removeClass(config.jobadMarkIconClassMarked)
                .removeClass(config.jobadMarkIconClassLoading)
                .addClass(config.jobadMarkIconClassNotLoggedin);
            $buttons.initTooltipsFromSrOnlyEl();

            // Set buttons as disabled, unless those would stay enabled to open login modal
            if ($buttons.hasClass(config.jobadMarkBtnNoLoginModalClass)) {
                const btnTextDisabled = translations.general_jobad_mark_not_loggedin;
                $buttons.prop({
                    "lang": window.globalConstants.currentLangStr
                });
                $buttons.find(config.jobadMarkBtnTextSelector)
                    .text(btnTextDisabled);
                $buttons.addClass('disabled');
                $buttons.initTooltipsFromSrOnlyEl();
            }
        }

        function jobadMarkCreateBookmark(jobadCode, jobadId, $buttonsToUpdate) {
            if (!jobadCode) {
                showGeneralErrorMessage();
                return;
            }

            jobadMarkAjaxBeforeSend($buttonsToUpdate);

            try {
                $.post(
                        'inc/jobmerker.php',
                        {
                            ajax_createJobadBookmark: true,
                            jobadCode: jobadCode,
                            _csrf_token: window.globalConstants.csrfToken
                        }
                ).done(function (response) {
                    if (typeof response.success !== 'undefined' && response.success === true) {
                        allMarkedJobadIds.push(parseInt(jobadId));
                        jobadMarkShowMessageMarked();
                    } else {
                        showGeneralErrorMessage();
                    }
                }).fail(function () {
                    showGeneralErrorMessage();
                }).always(function () {
                    jobadMarkAjaxComplete($buttonsToUpdate, jobadId);
                });
            } catch (e) {
                //console.log(e.message);
            }
        }

        function jobadMarkDeleteJobadBookmarkAjax(jobadCode, jobadId, $buttonsToUpdate) {
            if (!jobadCode) {
                showGeneralErrorMessage();
                return;
            }

            jobadMarkAjaxBeforeSend($buttonsToUpdate);

            try {
                $.post(
                        'inc/jobmerker.php',
                        {
                            ajax_deleteJobadBookmark: true,
                            jobadCode: jobadCode,
                            _csrf_token: window.globalConstants.csrfToken
                        }
                ).done(function (response) {
                    if (typeof response.success !== 'undefined' && response.success === true) {
                        allMarkedJobadIds.splice(allMarkedJobadIds.indexOf(jobadId), 1);
                    } else {
                        showGeneralErrorMessage();
                    }
                }).fail(function () {
                    showGeneralErrorMessage();
                }).always(function () {
                    jobadMarkAjaxComplete($buttonsToUpdate, jobadId);
                });
            } catch (e) {
                //console.log(e.message);
            }
        }

        function jobadMarkAjaxBeforeSend($buttonsToUpdate) {
            // Prevent double clicks
            $buttonsToUpdate.addClass('disabled');

            // Add a loading spinner
            jobadMarkBtnSetLoadingClass($buttonsToUpdate);
        }
        function jobadMarkAjaxComplete($buttonsToUpdate, jobadId) {
            // Ajax complete
            $buttonsToUpdate.removeClass('disabled');

            // Remove a loading spinner if not replaced already (test in whitelabel)
            jobadMarkBtnCheckAndSetState($buttonsToUpdate, jobadId)
        }

        function jobadMarkShowMessageNotLoggedIn() {
            var modalData = {
                headline: translations.jobad_message_not_loggedin_title,
                content: translations.general_jobad_mark_not_loggedin,
                buttons: [
                    {
                        content: translations.general_close_dialog,
                        dismiss: true,
                        primary: false
                    },
                    {
                        content: translations.general_login,
                        dismiss: true,
                        primary: true,
                        callback: function () {
                            showLoginModal(getFirstNamespace());
                        }
                    }
                ]
            };
            showStandardModal(modalData);
        }

        function jobadMarkShowMessageMarked() {
            var modalData = {
                headline: translations.jobad_message_marked_title,
                content: translations.jobad_message_marked,
                buttons: [
                    {
                        content: translations.general_close_dialog,
                        dismiss: true,
                        primary: false
                    },
                    {
                        content: translations.jobad_message_marked_button,
                        dismiss: false,
                        primary: true,
                        callback: function () {
                            document.location.href = "index.php?ac=job_merker";
                        }
                    }
                ]
            };
            showStandardModal(modalData);
        }

        function jobadMarkShowMessageDeleteMark(jobadCode, jobadId, $buttonsToUpdate) {
            var modalData = {
                headline: translations.jobmerker_question_title,
                content: translations.jobmerker_message_question_jobad_mark_deletion,
                buttons: [
                    {
                        content: translations.general_no,
                        dismiss: true,
                        primary: false
                    },
                    {
                        content: translations.general_yes,
                        dismiss: true,
                        primary: true,
                        callback: function () {
                            jobadMarkDeleteJobadBookmarkAjax(jobadCode, jobadId, $buttonsToUpdate);
                        }
                    }
                ]
            };
            showStandardModal(modalData);
        }
    }
});

const printButton = document.getElementById('print-button')
if(printButton !== null) {
    printButton.addEventListener('click', () => window.print());
}

const logoutButton = document.getElementById('logout-button')
if (logoutButton !== null) {
    logoutButton.addEventListener('click', () => {
        if(typeof($idleTimeoutObj) !== undefined) {
            $idleTimeoutObj.logoutUser();
            return false;
        }
    })
}





/**

 DEPRECATED! (note from 2022-03) This file is to be removed in the future!

 BACKWARD COMPATIBILITY:

 * This is a copy of the latest state of the core styles/js for the old panel structure. Do not change it!
 * Used for backward compatibility when some panels in the project still use the old panel structure
 * CAN BE REMOVED IF you're 100% sure there aren't any panels that doesn't use the new markup ( `.panel--muz`)
 * Example: Old panel markup in XSL file; Custom customer panels which will not be updated from the core
 * Note: Custom js might need to be adjusted in customer project
 *
 * Note: Also see deprecated stuff in `panel_deprecated.js` and `panel_deprecated.less`.

 */

$(function () {
    /* From `functions.js` */
    $(document).on('click', '.panel-collapsible:not(.panel--muz) .panel-heading', function (event) {
        event.preventDefault();
        var target = event.currentTarget;
        var toggleIcon = $(target).find('.toggle-icon');
        if ((toggleIcon.length > 0) && toggleIcon.is(':visible')) {
            var panel = toggleIcon.parents('.panel');
            var trigger = $(target);
            var panelBody = panel.find('.panel-body');

            if (toggleIcon.hasClass('caret-down')) {
                panelBody.slideDown(function () {
                    panel.addClass('panel-open');
                    panel.removeClass('panel-closed');
                    trigger.attr('aria-expanded', true);
                });
                toggleIcon.removeClass('caret-down').addClass('caret-up');
            } else if (toggleIcon.hasClass('caret-up')) {
                panelBody.slideUp(function () {
                    panel.addClass('panel-closed');
                    panel.removeClass('panel-open');
                    trigger.attr('aria-expanded', false);
                });
                toggleIcon.removeClass('caret-up').addClass('caret-down');
            }
        }
    });

    /* From `jobad.js` */
    if (!$(document.body).hasClass('fl-jobad-external-preview')) {
        var $collapsiblePanels = $('.panel-collapsible:not(.panel--muz)');
        $collapsiblePanels.removeClass('panel-collapsible-disabled'); // LEGACY - backward compatibility
        $collapsiblePanels.find('[aria-disabled][tabindex]').removeAttr('aria-disabled tabindex');
        $collapsiblePanels.filter('.closed-on-init').find('.panel-heading').trigger('click');
    }
});
/*
 * General JS can be placed here.
 * Specific scripts for templates need to be placed beside the template named like the respective template.
 *
 * To generate the frontend.min.js file, with all js functions in it, please call
 * @todo: need to adjust the asset manager for caching
 */

var view;

/**
 * Get all elements by hook name.
 * @param hookName
 * @param scope
 * @param pseudoClassName
 * @returns {NodeListOf<Element>}
 */
function getElementsByHookName(hookName, scope, pseudoClassName)
{
  scope = ("undefined" === typeof scope) ? document : scope;
  const selector = _getHookSelector(hookName, pseudoClassName);
  return scope.querySelectorAll(selector);
}

/**
 * Get the first element by hook name. Otherwise NULL (Be careful!).
 * @param hookName
 * @param scope
 * @param pseudoClassName
 * @returns {Element}
 */
function getElementByHookName(hookName, scope, pseudoClassName)
{
  scope = ("undefined" === typeof scope) ? document : scope;
  const selector = _getHookSelector(hookName, pseudoClassName);
  return scope.querySelector(selector);
}

/**
 * Generates the hook selector. A helper function for actual getters.
 * @param hookName
 * @param pseudoClassName
 * @returns {string|boolean}
 */
function _getHookSelector(hookName, pseudoClassName)
{
  if ((typeof hookName !== "string") || (hookName.length < 3)) {
    return false;
  }

  let selector = "[data-hook~='" + hookName + "']";

  if ((typeof pseudoClassName === "string") && (pseudoClassName.length > 0)) {
    selector += ":" + pseudoClassName;
  }

  return selector;
}

/**
 * Get cookie.
 * @param name
 * @returns {string|null}
 */
function getCookie(name) {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

/**
 * Set cookie.
 * @param name
 * @param value
 * @param days
 */
function setCookie(name, value, days) {
  const d = new Date;
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}

/**
 * Delete cookie.
 * @param name
 */
function deleteCookie(name) {
  setCookie(name, "", -1);
}

function getView() {
  if ($('#breakpoint_helper_lg').is(':visible')) {
    return "lg";
  }
  if ($('#breakpoint_helper_md').is(':visible')) {
    return "md";
  }
  if ($('#breakpoint_helper_sm').is(':visible')) {
    return "sm";
  }
  if ($('#breakpoint_helper_xs').is(':visible')) {
    return "xs";
  }
}

function isViewExternal() {
  let viewExternal = false;

  if (
      (typeof window.globalConstants === "object")
      && (typeof window.globalConstants.viewExternal === "boolean")
  ) {
    viewExternal = window.globalConstants.viewExternal;
  }

  return viewExternal;
}

//add indexOf Function for ie8 and below
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function (elt /*, from*/) {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) {
      from += len;
    }

    for (; from < len; from++)
    {
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

if (!Object.keys) {
  Object.keys = function (obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

//$(function () {
//	window.parentIFrame.sendMessage({hasLogin:'true'});
//});

// Windows Phone Bootstrap Fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
      document.createTextNode('@-ms-viewport{width:auto!important}')
  );
  document.querySelector('head').appendChild(msViewportStyle);
}

function showGeneralErrorMessage() {
  var modalData = {
    "headline": translations.general_error_message,
    "content": translations.general_error_message_standard,
    "buttons": [
      {
        "content": translations.general_ok,
        "dismiss": true,
        "primary": true
      }
    ]
  };
  showStandardModal(modalData);
}

function showCsrfErrorMessage() {
  var modalDataCsrf = {
    "headline": translations.general_error_message,
    "content": translations.general_invalid_csrf,
    "buttons": [
      {
        "content": translations.general_ok,
        "dismiss": true,
        "primary": true
      }
    ]
  };
  showStandardModal(modalDataCsrf);
}

/*
 * Plugin to initialize tables for responsive view
 * adds the respective th content as data value to the td element
 */
$.fn.initResponsiveTable = function () {
  this.each(function() {
    var columnHeader = [];
    var $table = $(this);
    var $tableHead = $table.find('thead');

    if ($tableHead.length) {
      $tableHead.find('th').each(function() {
        var $th = $(this).clone(); // clone to be able to remove .sr-only class

        // remove .sr-only text from inside of the label text (if needed)
        $th.find('.sr-only').remove();

        /* Hint: Don't use `hidden-xs` as it will effectively remove the column header from screen readers */
        var value = ($th.hasClass("js-responsive-th-excluded")) ? "" : $th.text().trim();
        columnHeader.push(value);
      });

      for (var i = 0; i < columnHeader.length; i++) {
        if (columnHeader[i] != '') {
          $(this).find('td:nth-child(' + (i + 1) + ')').attr('data-column-title', columnHeader[i]);
        }
      }
    } else {
      throw 'No table head defined for responsive table';
    }
  });
};

/*
 * Open modal with login form
 */
function showLoginModal(showAfterValue, param) {
  // Automatically decide where to redirect after the login?
  if (typeof showAfterValue === typeof undefined)  {
    var showAfterValue = getFirstNamespace();
  }

  // Set where to redirect after the login? The idea: always to the previosly opened page, or to statuspage if logged-in from the homepage
  if (window.globalConstants.acDefault !== showAfterValue) {
    // Else it will be decided on the serverside (to default location or to the requested page that requires login)
    if ('jobad' == showAfterValue) {
      // Jobad id to redirect back - it must retain same URL params as before, either jobad_id or jobad_code
      var jobadId = parseInt($('input[name="jobad_id"]').val(), 10);
      var jobadCodeFromUrl = getUrlParameterByName('code', location.search);
      if (jobadCodeFromUrl) {
        param = jobadCodeFromUrl;
      } else {
        param = jobadId;
      }
    }
    addShowAfterLogin(showAfterValue, param);
  }

  // Set modal params
  var modalData = {
    "headline": translations.general_login,
    "content": $('#login-modal-body').children(),
    "buttons": [
      {
        "content": translations.general_close_dialog,
        "dismiss": true
      }
    ]
  };

  showStandardModal(modalData);
}

/*
 * Populate the login form with parameters for redirect after login
 */
function addShowAfterLogin(showAfterValue, param) {
  var $loginForm = $('.js-login-form');
  var $loginContainer = $loginForm.closest('.js-login-component');

  // Set showafter ac
  var $showAfterField = $loginForm.find('input[name="showafter"]');
  if (!$showAfterField.length) {
    $showAfterField = $('<input type="hidden" name="showafter">');
    $showAfterField.appendTo($loginForm);
  }
  var showAfterQueryString = 'index.php?showafter=' + showAfterValue;
  $showAfterField.attr('value', showAfterValue);

  // Set showafter ac params
  var $showAfterParamField = $loginForm.find('input[name="showafter_param"]');
  if (typeof param !== typeof undefined) {
    if (!$showAfterParamField.length) {
      $showAfterParamField = $('<input type="hidden" name="showafter_param">');
      $showAfterParamField.appendTo($loginForm);
    }
    showAfterQueryString += '&showafter_param=' + param;
    $showAfterParamField.attr('value', param);
  } else {
    $showAfterParamField.remove();
  }

  // SOML redirect after the login
  var $somlLinks = $loginContainer.find('.social-login-btn');
  $somlLinks.each(function() {
    var $somlLink = $(this);

    // Save the original href so we can overwrite the action if needed, same as above
    if ($somlLink.data('original-href')) {
      var somlAction = $somlLink.data('original-href');
    } else {
      var somlAction = $somlLink.attr('href');
      var somlActionAttr = 'href';
      if ($somlLink.attr('data-js-prepend-showafter-to') === 'onclick') {
        somlAction = $somlLink.attr('onclick');
        somlActionAttr = 'onclick';
      }
      $somlLink.data('original-href', somlAction);
      $somlLink.data('original-href-attr', somlActionAttr);
    }

    var somlActionWithRedirect = somlAction.replace('index.php?', showAfterQueryString + '&');
    $somlLink.attr($somlLink.data('original-href-attr'), somlActionWithRedirect);
  });

  // After registration redirect (similar to SOML)
  var $registrationLink = $loginContainer.find('.js-registration-link');
  $registrationLink.attr('href', showAfterQueryString + '&ac=register');
}

/**
 * Get the parameters of a given url
 *
 * @param {type} name
 * @param {type} url
 * @returns {String}
 */
function getUrlParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * jQuery plugin to trigger an "on" event after some delay
 * Usage example: $(window).on('resize', functionRef, 200);
 * https://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
 */
(function ($) {
  var methods = {on: $.fn.on, bind: $.fn.bind};
  $.each(methods, function (k) {
    $.fn[k] = function () {
      var args = [].slice.call(arguments),
          delay = args.pop(),
          fn = args.pop(),
          timer;

      args.push(function () {
        var self = this,
            arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(self, [].slice.call(arg));
        }, delay);
      });

      return methods[k].apply(this, isNaN(delay) ? arguments : args);
    };
  });
}(jQuery));

(function ($) {
  /**
   * MUZ formhandler plugin to prevent multiple sending of form requests
   * As callbackFunctionName can also be passed false
   *
   * @returns {jQuery}
   */
  $.fn.preventSendTwice = function (options) {
    var defaults = {
      formSelector: this,
      callbackFunctionName: 'disableFormButtonsAfterSubmit',
    };

    var options = $.extend(defaults, options);

    $(this).on('submit', function (e) {
      if (true === this.preventSendTwiceIsSubmitted) {
        e.preventDefault();
        return false;
      } else {
        this.preventSendTwiceIsSubmitted = true;
      }

      /**
       * Trigger callback function
       */
      if (options.callbackFunctionName) {
        setTimeout(function () {
          if (typeof window[options.callbackFunctionName]  === 'function') {
            window[options.callbackFunctionName](options.formSelector);
          }
        }, 100);
      }
      return true;
    });
    return this;
  };

  /**
   * Check if an element exists in array using a comparer function comparer : function(currentElement)
   *
   * @param comparer
   * @returns {boolean}
   */
  Array.prototype.inArray = function (comparer) {
    for (var i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true;
    }
    return false;
  };

  /**
   * Adds an element to the array if it does not already exist using a comparer function
   *
   * @param element
   * @param comparer
   */
  Array.prototype.pushIfNotExist = function (element, comparer) {
    if (!this.inArray(comparer)) {
      this.push(element);
    }
  };
}(jQuery));

/**
 * general function to disable and change button text used as callback by MUZ formhandler
 * only the disabled styles and ARIA is applied, but not actual disabled attribute as this will cause focus loss
 * @param form
 */
function disableFormButtonsAfterSubmit(form) {
  $(form).find(':button,:submit')
  .attr('aria-disabled', 'true')
  .addClass('disabled');
}

/**
 * `panel.tpl` and similar alerts are moved into an `aria-live` region after a short delay (IE issues).
 *  It effectively notifies a screen reader about the injected message.
 *  Why? Atm `aria-live` region must exist in the DOM and be empty on page load.
 *  Focusing the live alert? Imo not needed, but was requested by a11y auditors. Use `[data-sr-alert-focus-onload]`
 */
$.fn.srNotification = function () {
  return this.each(function (i, el) {
    if (!$(document.body).hasClass('layoutcheck')) {
      const $srNotification = $(el);
      if ($srNotification.data("pendingSrNotification")) {
        clearTimeout($srNotification.data("pendingSrNotification"));
      }

      $srNotification.data("pendingSrNotification", setTimeout(function () {
        const $content = $($srNotification.attr("data-sr-alert-ref"));
        if (!$content.length || !$srNotification.length) {
          return;
        }
        const shouldFocusOnload = $srNotification.is("[data-sr-alert-focus-onload]");
        const isOnloadWithValidSafeHashTarget = (window.location.hash.length
            && ("#" === window.location.hash.charAt(0))
            && $(window.location.hash).filter(':input:not(:button,:submit)').length
        );
        $srNotification.empty();

        $srNotification.append($content.remove().clone()); // Clone? IE 11 + NVDA Issues
        if (shouldFocusOnload && !isOnloadWithValidSafeHashTarget) {
          if (!$(document.activeElement).is(".focus-visible")) {
            $srNotification.on("focus", function () {
              $(this).removeClass("focus-visible");
            });
          }
          $srNotification.attr("tabindex", "-1");
          $srNotification.trigger("focus");
        }
      }, 750));
    }
  });
};

/**
 * Handles `aria-selected` attribute for tabs
 * By specification only `aria-selected` is allowed for tabs. But Bootstrap 3.x uses `aria-expanded` incorrectly
 * Can be removed after upgrade from Bootstrap 3.x to 4.x (along with HTML specified aria-expanded` attrs)
 */
$.fn.handleAriaExpandedSelected = function() {
  var _activate = $.fn.tab.Constructor.prototype.activate;
  $.fn.tab.Constructor.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active');
    _activate.apply(this, arguments);
    $active.find('[data-toggle="tab"]').removeAttr('aria-expanded').attr('aria-selected', false);
    element.find('[data-toggle="tab"]').removeAttr('aria-expanded').attr('aria-selected', true);
  };

  return this.each(function() {
    if ("tab" === $(this).attr("data-toggle")) {
      $(this).removeAttr('aria-expanded'); // If existed initially
      let $element = $(this).closest('li');
      if ($element.length) {
        if ($element.hasClass('active')) {
          $(this).attr('aria-selected', true);
        } else {
          $(this).attr('aria-selected', false);
        }
      }
    }
  });
};

/**
 * Item deletion which handles moving the focus to the next available delete button beforehand
 * Allows accessible focus management
 * Hints:
 * - Focus in modal must be handled before the modal is removed from the DOM. It returns to the trigger button
 * - Focus move to the next available item must be handled before fadeOut() transition is done (removing the current)
 * @param $currentContainerIterable Item container on which .next() and .prev() can be checked
 * @param deleteBtnSelector
 * @param callback
 */
function manageFocusAndDeleteItem($currentContainerIterable, deleteBtnSelector, callback) {
  const elToFocusFallbackSelector = "#skip-to-main-heading",
      $nextContainer = $currentContainerIterable.next(),
      $previousContainer = $currentContainerIterable.prev(),
      $previousContainerDeleteBtn = $previousContainer.find(deleteBtnSelector),
      $nextContainerDeleteBtn = $nextContainer.find(deleteBtnSelector),
      fadeOutDuration = 750,
      focusTimeoutBeforeFadeOutEnd = fadeOutDuration - 250;

  let $elToFocus = $();
  if ($nextContainerDeleteBtn.length) {
    $elToFocus = $nextContainerDeleteBtn;
  } else if ($previousContainerDeleteBtn.length) {
    $elToFocus = $previousContainerDeleteBtn;
  }

  if (!$elToFocus.length) {
    $elToFocus = $(elToFocusFallbackSelector);
  }

  $currentContainerIterable.find("[data-js-deletion-status-txt]").removeAttr("hidden");
  $(getElementsByHookName("tooltip-from-sr-only"), $currentContainerIterable.get(0)).initTooltipsFromSrOnlyEl(true);
  $currentContainerIterable.fadeOut(fadeOutDuration, function () {
    $(this).remove();
    if (typeof callback === "function") {
      callback();
    }
    if ("undefined" !== $currentContainerIterable.tooltip) {
      $currentContainerIterable.tooltip("hide");
      $elToFocus.tooltip("show"); // Re-render when the item jumps up after the deletion
    }
  });
  setTimeout(function() {
    $elToFocus.trigger("focus");
  }, focusTimeoutBeforeFadeOutEnd);
}

/**
 * Handles validation markup for given `.form-group` elements e.g. adding `.has-error` class,
 *  appending star `*` to required field labels etc.
 * @returns jQuery
 */
$.fn.applyFormGroupValidationMarkup = function() {
  applyMarkupForRequired(this);
  applyMarkupForInvalid(this);
  return this;

  /**
   * For invalid fields (form groups with `.js-form-group--has-error`):
   *  - Adds Bootstrap class
   *  - Adds an indicator e.g. exclamation icon onto invalid field `.control-label` (or into specified placeholder)
   *  - Adds ARIA markup
   *  - Adds ARIA reference between the form control and the error message (applicationform)
   * For all other fields (form groups):
   *  - Removes all the markup related to invalid fields
   *
   * Hint: Ignores radios and checkboxes - Makes no sense to mark `aria-invalid` (`aria-required` is sufficient)
   * @param $allFormGroups
   */
  function applyMarkupForInvalid($allFormGroups) {
    const $invalidFormGroups = $allFormGroups.filter(".js-form-group--has-error");
    $invalidFormGroups.each(function() {
      const $formGroup = $(this);

      // STEP: Bootstrap class
      $formGroup.addClass("has-error");

      // STEP: `aria-invalid`
      const $formControlToMarkInvalid = $formGroup.find(":input:not(:button,:submit,:radio,:checkbox)");
      if ($formControlToMarkInvalid.length) {
        $formControlToMarkInvalid.attr("aria-invalid", "true");
      }

      // STEP: Revert the state on change
      const $formControlToRevert = $formGroup.find(":radio,:checkbox,:input:not(:button,:submit)");
      if ($formControlToRevert.length) {
        $formControlToRevert.on("change", function () {
          revertMarkup($formGroup);
        });
      }

      // STEP: Error field indicator icon for color blind users
      let $indicatorPlaceholder = $formGroup.find("[data-error-indicator-placeholder]");
      const $dynamicallyAddedPlaceholder = $indicatorPlaceholder.filter("[data-js-added]").remove();
      $indicatorPlaceholder = $indicatorPlaceholder.not($dynamicallyAddedPlaceholder);
      if (!$indicatorPlaceholder.length) {
        $indicatorPlaceholder = $("<span data-error-indicator-placeholder data-js-added></span>");
        $formGroup.find(".control-label, label").first().append($indicatorPlaceholder);
      }
      if ($indicatorPlaceholder.length) {
        const indicator = "&nbsp;<span aria-hidden='true' class='glyphicons glyphicons-exclamation-sign'></span>";
        $indicatorPlaceholder.html(indicator);
      }

      // STEP: `aria-describedby` and sr alert - Only for application form atm. If needed adjust for other places
      const $formGroupWithErrTxt = $formGroup.has("[data-js-fld-error-txt]");
      if ($formGroupWithErrTxt.length) {
        const $formControl = $formGroupWithErrTxt.find(":input:visible:not(:button,:submit)");
        const formControlId = $formControl.prop("id");
        const $errTxtCont = $formGroupWithErrTxt.find("[data-js-fld-error-txt]");
        const errTextContId = "aria-label-fld-err-" + formControlId;
        $errTxtCont.prop("id", errTextContId);
        $formControl.attr("aria-describedby", errTextContId);

        const $dynamicallyInjectedCont = $errTxtCont.closest("[data-dynamically-injected-by-target-id]");
        const targetFormControlId = $dynamicallyInjectedCont.attr('data-dynamically-injected-by-target-id');
        if ($dynamicallyInjectedCont.length && (formControlId === targetFormControlId)) { // live alert only once and only for the affected input
          const $srAlertCont = $("<div>").insertAfter($errTxtCont);
          $srAlertCont.attr({
            "data-sr-alert-ref": "#" + errTextContId,
            "aria-live": "polite"
          });
          $srAlertCont.srNotification();
        }
      }
    });
    const $otherFormGroups = $allFormGroups.not($invalidFormGroups);
    $otherFormGroups.each(function() {
      const $formGroup = $(this);
      revertMarkup($formGroup);
    });

    function revertMarkup($formGroup) {
      $formGroup.removeClass("has-error");
      $formGroup.find(":input").removeAttr("aria-invalid");
      $formGroup.find("[data-error-indicator-placeholder]").empty();
    }
  }

  /**
   * For mandatory fields (form groups with `.js-form-group--is-mandatory` and `.js-form-group--is-block-mandatory`):
   *  - Adds ARIA markup
   *  - Adds an indicator e.g. star `*` onto mandatory field `.control-label` (or into specified placeholder)
   *
   * @param $allFormGroups
   */
  function applyMarkupForRequired($allFormGroups) {
    const $formGroups = $allFormGroups.filter(".js-form-group--is-mandatory, .js-form-group--is-block-mandatory");
    if ($formGroups.length) {
      $formGroups.each(function() {
        const $formGroup = $(this);
        const fldMandatoryIndicator = ($formGroup.hasClass('js-form-group--is-block-mandatory'))
            ? window.globalConstants.fldBlockMandatoryIndicator
            : window.globalConstants.fldMandatoryIndicator;

        // STEP: `aria-required`
        const $formControl = $formGroup.find(":input:not(:button,:submit)");
        if ($formControl.length) {
          $formControl.attr("aria-required", "true");
        }

        // STEP: Mandatory field indicator mark
        let $indicatorPlaceholder = $formGroup.find("[data-mandatory-indicator-placeholder]");
        const $dynamicallyAddedPlaceholder = $indicatorPlaceholder.filter("[data-js-added]").remove();
        $indicatorPlaceholder = $indicatorPlaceholder.not($dynamicallyAddedPlaceholder);
        if (!$indicatorPlaceholder.length) {
          $indicatorPlaceholder = $("<span data-mandatory-indicator-placeholder data-js-added></span>");
          $formGroup.find(".control-label, label").first().append($indicatorPlaceholder);
        }
        if ($indicatorPlaceholder.length) {
          $indicatorPlaceholder.html(fldMandatoryIndicator);
        }
      });
    }
  }
};

/**
 *  Popovers contained in a form field label
 *  They contain `.sr-only` element inside which is turned into a popover, but also read by screen reader as a label
 */
$.fn.initFormPopovers = function () {
  return this.each(function () {
    const popoverContent = $(this).find(".sr-only");
    if (popoverContent.length) {
      const popoverConfig = {
        container: "body",
        content: $(this).find(".sr-only").html(),
        placement: "bottom",
        trigger: "focus",
        html: true
      };
      const safariFocusIssueFix = {"tabindex": "0"};
      $(this).attr(safariFocusIssueFix).popover(popoverConfig);
    }
  });
}

/**
 * Turns the inner `.sr-only` text into a Bootstrap tooltip. Must be called on a focusable element (e.g. `<a>`)
 * If there are multiple `.sr-only` elements, only the first one is used (unless ´flNoHtml´ param is passed)
 * @param flNoHtml useful in cases where you want to concatenate multiple inner `.sr-only` elements into the string
 * @returns {$}
 */
$.fn.initTooltipsFromSrOnlyEl = function (flNoHtml) {
  if ("undefined" !== typeof $.fn.tooltip) {
    return this.each(function () {
      const $focusableEl = $(this);
      const $innerContentEl = $focusableEl.find(".sr-only").not("[hidden]"); // [hidden]? For delete/deleted switch
      if ($innerContentEl.length) {
        const tooltipContent = (flNoHtml ? $innerContentEl.text() : $innerContentEl.first().html());
        const alreadyExistingTooltip = $focusableEl.data("bs.tooltip");
        if (!alreadyExistingTooltip) {
          const config = {
            container: "body",
            title: tooltipContent,
            html: !flNoHtml,
            placement: "auto",
            trigger: "hover focus"
          };
          const safariFocusIssueFix = {"tabindex": "0"};
          $focusableEl.attr(safariFocusIssueFix);
          $focusableEl.tooltip(config);
        }  else {
          $focusableEl.attr('data-original-title', tooltipContent);
          $focusableEl.tooltip(alreadyExistingTooltip.tip().hasClass('in') ? 'show' : 'hide');
        }
      }
    });
  }
  return this;
}

/**
 * Closes the dropdown menu if one navigates away of it by pressing a TAB key
 * Hint: TAB `keypress` listener is specific in a way that `keydown` is on one element, and `keyup` on another
 */
$.fn.listenTabKeyToCloseDropdownOnLeave = function () {
  return this.each(function () {
    const $dropdownToggle = $(this);
    const $dropdown = $dropdownToggle.closest(".dropdown");
    const $dropdownMenu = $dropdown.find(".dropdown-menu");
    const $dropdownMenuItems = $dropdownMenu.find("a");
    $dropdownMenuItems.on("keydown", function (e) {
      const keyCodeForTab = 9;
      if (e.which === keyCodeForTab) {
        $(document.body).one("keyup", function (e) {
          const $currentlyFocusedEl = $(document.activeElement);
          if (!$dropdownMenu.has($currentlyFocusedEl).length) {
            $dropdownToggle.dropdown("toggle");
          }
        });
      }
    });
  });
}

/**
 * Accessibility: Makes buttons reacting on SPACE key (aside to defaults - ENTER key)
 * See expectations: <https://webaim.org/techniques/keyboard/>
 */
$.fn.listenSpaceKeyToEnterButtons = function ($elements) {
  $(document).on('keydown.spacebar', $elements, function(e) {
    const keyCodeForSpace = 32;
    const $target = $(e.currentTarget);
    if (e.which === keyCodeForSpace && !$target.hasClass('dropdown-toggle')) {
      e.preventDefault();
      $target.trigger("click");
      e.stopPropagation();
    }
  });
};

/**
 * Helper to close tooltips and popovers */
$.fn.closeTooltipsAndPopovers = function () {
  const $scope = this;
  return this.each(function () {
    if (("undefined" !== typeof $.fn.tooltip) || ("undefined" !== typeof $.fn.popover)) {
      const $openedTooltips = $scope.find('.tooltip');
      const $openedPopovers = $scope.find('.popover');

      if ($openedPopovers.length || $openedTooltips.length) {
        $openedTooltips.each(function () {
          const $tooltip = $(this);
          $tooltip.data('forceHideWithoutDelay', true);
          $tooltip.tooltip('hide');
        });
        $openedPopovers.each(function () {
          const $popover = $(this);
          $popover.data('forceHideWithoutDelay', true);
          $popover.popover('hide');
        });
      }
    }
  });
}

/**
 * Accessibility: Close tooltips and popovers on ESC key (WCAG 1.4.13)
 * Note: Using event capturing to cancel the propagation preventing the modal to close at first
 * Note: So only stopPropagation if any overlays exists, to execute those at first
 */
$.fn.listenEscKeyToCloseOverlays = function () {
  const $scope = this;
  return this.each(function () {
    $scope.get(0).addEventListener('keydown', function (e) {
      const key = e.key || e.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        const openedOverlaysCount = $scope.find('.tooltip, .popover').length;
        if (0 < openedOverlaysCount) {
          e.stopPropagation();
          $scope.closeTooltipsAndPopovers();
        }
      }
    }, true);
  });
};

/**
 * Extend Bootstrap: Prevent tooltips to manipulate `aria-describedby`. Here we use the inner `sr-only` instead!
 * Why? We are already using `aria-describedby` for different purposes (e.g. relation to delete button)
 * It also solves the duplicate announcements issue (due to `.sr-only` usage)
 */
$(function () {
  if ('undefined' === typeof $.fn.tooltip) {
    return;
  }

  const _bsTooltipShowOriginal = $.fn.tooltip.Constructor.prototype.show;
  $.fn.tooltip.Constructor.prototype.show = function (element, container, callback) {
    const ariaDescribedbyValBefore = this.$element.attr('aria-describedby');
    _bsTooltipShowOriginal.apply(this, arguments);
    if (ariaDescribedbyValBefore) {
      this.$element.attr('aria-describedby', ariaDescribedbyValBefore);
    } else {
      this.$element.removeAttr('aria-describedby');
    }
  }

  const _bsTooltipHideOriginal = $.fn.tooltip.Constructor.prototype.hide;
  $.fn.tooltip.Constructor.prototype.hide = function (callback) {
    const that = this;
    const ariaDescribedbyValBefore = this.$element.attr('aria-describedby');
    _bsTooltipHideOriginal.apply(this, arguments);
    this.$element.on('hidden.bs.tooltip', function () {
      if (ariaDescribedbyValBefore) {
        that.$element.attr('aria-describedby', ariaDescribedbyValBefore);
      }
    })
  }
});

/**
 * Extend Bootstrap: Prevents tooltips/popovers showing on focus unless the trigger is `:hover` or `:focus-visible`
 * Why? For mouse-only users it might be confusing to see such tooltips/popovers when if is no focus indication
 */
$(function () {
  if ('undefined' === typeof $.fn.tooltip || 'undefined' === typeof $.fn.popover) {
    return;
  }

  if ('undefined' === typeof window.applyFocusVisiblePolyfill) {
    throw new Error('Error: `focus-visible.min.js` polyfill must be loaded before `bootstrap.min.js`.');
  }

  const _bsTooltipShowOriginal = $.fn.tooltip.Constructor.prototype.show;
  $.fn.tooltip.Constructor.prototype.show = function (element, container, callback) {
    _bsTooltipShowOriginal.apply(this, arguments);
    hideIfFocusedButNotHoveredOrOutlined.apply(this);
  }

  const _bsPopoverShowOriginal = $.fn.popover.Constructor.prototype.show;
  $.fn.popover.Constructor.prototype.show = function (element, container, callback) {
    _bsPopoverShowOriginal.apply(this, arguments);
    hideIfFocusedButNotHoveredOrOutlined.apply(this);
  }

  function hideIfFocusedButNotHoveredOrOutlined() {
    if (0 > this.options.trigger.indexOf('hover')) {
      return;
    }

    const $thisTrigger = this.$element;
    const thisType = this.type;
    preventShowDespiteFocus($thisTrigger, thisType);
    if (this.inState.hover) {
      preventShowWhenHoverBecomesFocus($thisTrigger, thisType);
    }
  }

  function preventShowDespiteFocus($thisTrigger, thisType) {
    const isFocusWithoutOutline = document.activeElement === $thisTrigger.not(".focus-visible").get(0);
    if (isFocusWithoutOutline) {
      const mouseLeaveEvtNs = 'mouseleave.preventShowDespiteFocus';
      $thisTrigger.off(mouseLeaveEvtNs).one(mouseLeaveEvtNs, function () {
        $thisTrigger[thisType]('hide');
      });
      const blurEvtNs = 'blur.preventShowDespiteFocus';
      $thisTrigger.off(blurEvtNs).one(blurEvtNs, function () {
        $thisTrigger.off(mouseLeaveEvtNs);
      });

      if (!$thisTrigger.is(':hover')) {
        $thisTrigger.trigger(mouseLeaveEvtNs);
      }
    }
  }

  function preventShowWhenHoverBecomesFocus($thisTrigger, thisType) {
    const focusEvtNs = 'focus.whenHoverBecomesFocus';
    $thisTrigger.off(focusEvtNs).one(focusEvtNs, function () {
      preventShowDespiteFocus($thisTrigger, thisType);
    });
    const mouseLeaveEvtNs = 'mouseleave.whenHoverBecomesFocus';
    $thisTrigger.off(mouseLeaveEvtNs).one(mouseLeaveEvtNs, function () {
      $thisTrigger.off(focusEvtNs);
    });
  }
});

/**
 * Extend Bootstrap: A tooltip must remain open as long as a mouse cursor is over it
 * Introduces a small delay allowing the mouse cursor to leave without closing the tooltip, and hooks 'mouseleave' event
 */
$(function () {
  if ('undefined' === typeof $.fn.tooltip || 'undefined' === typeof $.fn.popover) {
    return;
  }

  const _bsTooltipAndPopoverHideOriginal = {
    'tooltip': $.fn.tooltip.Constructor.prototype.hide,
    'popover': $.fn.popover.Constructor.prototype.hide
  };
  $.fn.tooltip.Constructor.prototype.hide = bsTooltipAndPopoverHideWithDelay;
  $.fn.popover.Constructor.prototype.hide = bsTooltipAndPopoverHideWithDelay;

  const _bsTooltipAndPopoverShowOriginal = {
    'tooltip': $.fn.tooltip.Constructor.prototype.show,
    'popover': $.fn.popover.Constructor.prototype.show
  };
  $.fn.tooltip.Constructor.prototype.show = bsTooltipAndPopoverShowWithDelay;
  $.fn.popover.Constructor.prototype.show = bsTooltipAndPopoverShowWithDelay;

  function bsTooltipAndPopoverShowWithDelay() {
    const _self = this;
    const $thisToggle = this.$element.is(':focusable') ?
        this.$element :
        this.$element.closest(':focusable');
    _self.options.delay = 0; // reset any previously set delay

    clearTimeout(_self.timeoutShowDelay);
    _self.timeoutShowDelay = setTimeout(function() {
      const isToggleHoveredOrFocused = ($thisToggle.is(':hover') ||
          $thisToggle.is(':focus'));
      if (isToggleHoveredOrFocused) {
        _bsTooltipAndPopoverShowOriginal[_self.type].apply(_self);
        if ($thisToggle.attr('data-popover-form') !== undefined) {
          $(document).on('click focusout', function popoverHandler() {
            closePopovers();
            $(document).off('click focusout', popoverHandler);
          });
        } else {
          $thisToggle.one('mouseleave', function tooltipHandler() {
            closeTooltips();
          });
        }
      }
    }, 200);
  }

  function closeTooltips() {
    const $openedTooltips = document.querySelectorAll('.tooltip');
    if ($openedTooltips.length) {
      $openedTooltips.forEach(function(tooltip) {
        const $tooltip = $(tooltip);
        $tooltip.data('forceHideWithoutDelay', true);
        $tooltip.tooltip('hide');
      });
    }
  }

  function closePopovers() {
    const $openedPopovers = document.querySelectorAll('.popover');
    if ($openedPopovers.length) {
      $openedPopovers.forEach(function(popover) {
        const $popover = $(popover);
        $popover.data('forceHideWithoutDelay', true);
        $popover.popover('hide');
      });
    }
  }

  function bsTooltipAndPopoverHideWithDelay(callback) {
    if (true === this.tip().data('forceHideWithoutDelay')) {
      this.tip().removeData('forceHideWithoutDelay');
      _bsTooltipAndPopoverHideOriginal[this.type].apply(this, arguments);
      return;
    }
  }
});

/**
 * Extend Bootstrap: Makes tooltips and popovers that use `trigger:focus` to be able to toggle as well (toggletips)
 * Why? Otherwise, if there is `trigger:click` it might appear as if the button doesn't do anything e.g. benefit icons
 */
$(function () {
  if ('undefined' === typeof $.fn.tooltip || 'undefined' === typeof $.fn.popover) {
    return;
  }

  const _bsTooltipInitOriginal = $.fn.tooltip.Constructor.prototype.init;
  $.fn.tooltip.Constructor.prototype.init = function (type, element, options) {
    _bsTooltipInitOriginal.apply(this, arguments);
    initToggletip.apply(this);
  }

  const _bsPopoverInitOriginal = $.fn.popover.Constructor.prototype.init;
  $.fn.popover.Constructor.prototype.init = function (type, element, options) {
    _bsPopoverInitOriginal.apply(this, arguments);
    initToggletip.apply(this);
  }

  function initToggletip() {
    const $thisTrigger = this.$element;
    if (!$thisTrigger.is('[data-is-toggletip]') // Must be strictly toggle-tip. Otherwise, might not be appropriate
        || (0 > this.options.trigger.indexOf('hover'))
        || (-1 !== this.options.trigger.indexOf('click'))
        || (-1 !== this.options.trigger.indexOf('manual'))
    ) {
      return;
    }

    const self = this;
    const thisType = this.type;

    $thisTrigger.on('click', function () {
      const isShown = self.tip().hasClass('in');
      if (isShown) {
        self.tip().data('forceHideWithoutDelay', true);
      }
      $thisTrigger[thisType](isShown ? 'hide' : 'show');
    });

    const fnShowOriginal = self.show;
    self.show = function () {
      fnShowOriginal.apply(this, arguments);
      this.$element.attr('aria-pressed', 'true');
    }

    const fnHideOriginal = self.hide;
    self.hide = function (callback) {
      fnHideOriginal.apply(this, arguments);
      this.$element.attr('aria-pressed', 'false');
    }
  }
});

/**
 * Extend Bootstrap: Prevents .collapse to set `aria-expanded` on a DIV.collapse-body. Only on the trigger is required
 */
$(function () {
  if ('undefined' === typeof $.fn.collapse) {
    return;
  }

  var _show = $.fn.collapse.Constructor.prototype.show;
  $.fn.collapse.Constructor.prototype.show = function () {
    _show.apply(this, arguments);
    this.$element.removeAttr('aria-expanded');
  };
  var _hide = $.fn.collapse.Constructor.prototype.hide;
  $.fn.collapse.Constructor.prototype.hide = function () {
    _hide.apply(this, arguments);
    this.$element.removeAttr('aria-expanded');
  };
  var _addAriaAndCollapsedClass = $.fn.collapse.Constructor.prototype.addAriaAndCollapsedClass;
  $.fn.collapse.Constructor.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    _addAriaAndCollapsedClass.apply(this, arguments);
    $element.removeAttr('aria-expanded');
  };
});

/**
 * Extend jQuery: Enable `:focusable` selector
 */
(function ($) {
  function visible(element) {
    return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
      return $.css(this, 'visibility') === 'hidden';
    }).length;
  }

  function focusable(element, isTabIndexNotNaN) {
    var map, mapName, img, nodeName = element.nodeName.toLowerCase();
    if ('area' === nodeName) {
      map = element.parentNode;
      mapName = map.name;
      if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
        return false;
      }
      img = $('img[usemap=#' + mapName + ']')[0];
      return !!img && visible(img);
    }
    return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : 'a' === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && // the element and all of its ancestors must be visible
        visible(element);
  }

  $.extend($.expr[':'], {
    focusable: function (element) {
      return focusable(element, !isNaN($.attr(element, 'tabindex')));
    }
  });
})(jQuery);

/**
 * Extend Bootstrap: Enables circular looping through the modal in both directions with TAB and SHIFT+TAB
 */
$(function () {
  if ('undefined' === typeof $.fn.modal) {
    return;
  }

  var _enforceFocus = $.fn.modal.Constructor.prototype.enforceFocus;
  $.fn.modal.Constructor.prototype.enforceFocus = function (element, container, callback) {
    _enforceFocus.apply(this, arguments);
    const _self = this;
    var focusableChildren = this.$element.find(':focusable');
    $(document)
    .off('keydown.bs.modal')
    .on('keydown.bs.modal', function (event) {
      const $currentlyFocusedEl = $(document.activeElement);
      if (_self.isShown && event.shiftKey && event.which === 9 && !_self.$element.has($currentlyFocusedEl).length) {
        focusableChildren[focusableChildren.length - 1].focus();
        event.preventDefault();
      }
    });
  }

  var _hide = $.fn.modal.Constructor.prototype.hide;
  $.fn.modal.Constructor.prototype.hide = function (element, container, callback) {
    _hide.apply(this, arguments);
    $(document).off('keydown.bs.modal');
  }
});

/**
 * Sets `colspan` attribute matching the table header cells count to a specific table cell `<td>`
 */
$.fn.setColspan = function () {
  return this.each(function (i, el) {
    const $cell = $(el);
    const $headerRow = $cell.closest("table").find("thead th");
    const headerRowCount = $headerRow.length;
    $cell.prop("colspan", headerRowCount);
  });
};

$(function () {

	/* Init the markup of responsive tables */
	$('table.responsive').initResponsiveTable();

	/**
	 * Collect forms and attach MUZ formhandler plugin
	 */
	(function () {
		/**
		 * Adds all forms with names to an array. Forms with the same name are only added once to be able to handle the same events later.
		 * optional data attribute data-after-submit-callback can be a function name or false. Plugin default is 'disableFormButtonsAfterSubmit'
		 */
		var forms = [];
		$('form[data-hook~="prevent-send-twice"][name]').each(function (index, element) {
			var $selector = $(this);
			var element = {
				name: $selector.attr('name'),
				selector: 'form[data-hook~="prevent-send-twice"][name="' + $selector.attr('name') + '"]',
				callbackFunctionName: $selector.data('after-submit-callback')
			};

			forms.pushIfNotExist(element, function (e) {
				return e.name === element.name && e.text === element.text;
			});
		});

		/**
		 * Call preventSendTwice Plugin for all forms in forms array
		 */
		forms.forEach(function (element) {
			$(element.selector).preventSendTwice({
				callbackFunctionName: element.callbackFunctionName
			});
		});
	})();

    /* Communicate `panel.tpl` alerts to a screen reader using an `aria-live` region */
    $("[data-sr-alert-focus-onload]").srNotification();

    $("[data-toggle=tab]").handleAriaExpandedSelected();

    $(".form-group").applyFormGroupValidationMarkup();

    $("[data-popover-form]").initFormPopovers();

    $("[data-toggle=dropdown]").listenTabKeyToCloseDropdownOnLeave();

    $(document).listenSpaceKeyToEnterButtons('[role=button]');
    $(document).listenEscKeyToCloseOverlays();

    $(getElementsByHookName("tooltip-from-sr-only")).initTooltipsFromSrOnlyEl();

});

"use strict";

/**
 * Form traversing class - handless next/prev and go actions
 * @returns {undefined}
 */
function FormTraverser() {
	var self = this;
	self.currentPage = $("input#formpage").val();
	self.applicationToken = $("input[name=application_token]").val();
	/**
	 * List of sites that use dynamic application form
	 */
	self.applicationFormTemplates = new Array("application", "profile_application", "onspec_application");
	/**
	 * change page pointer one ahead
	 * @returns {_L3.FormTraverser}
	 */
	self.next = function () {
		self.currentPage++;
		return self;
	};
	/**
	 * Set page pointer one back
	 * @returns {_L3.FormTraverser}
	 */
	self.previous = function () {
		self.currentPage--;
		return self;
	};
	/**
	 * set page manually
	 * @param {type} pageId
	 * @returns {FormTraverser}
	 */
	self.setPage = function (pageId) {
		if (typeof pageId === "number" && parseInt(pageId) !== NaN)
			self.currentPage = pageId;
		return self;
	};
	/**
	 * go to page
	 * @returns {_L3.FormTraverser}
	 */
	self.go = function () {
		self.setAction().trigger("submit");
		return self;
	};

	self.setAction = function () {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		var action = window.location.origin + window.location.pathname +
			"?ac=application&page=" + self.currentPage +
			"&application_token=" + self.applicationToken;
		return $("#applicationForm").attr("action", action);
	};

	/**
	 * bind event handlers in order to be available only in selected actions
	 * @returns {undefined}
	 */
	self.bindHandlers = function () {
		var listenerObj = {
			"name": "standard",
			"method": applicationFormNavigationHandler(self)
		};
		for (var x in self.applicationFormTemplates) {
			addTolisteners(self.applicationFormTemplates[x], listenerObj);
		}
	};
}

/**
 * navigation handling
 * @param {type} owner
 * @returns {undefined}
 */
function applicationFormNavigationHandler(owner) {

	var formTraverser = owner;

	/**
	 * Next/previous page navigation
	 */
    $(getElementsByHookName("applicationform-btn-next")).on("click", function (e) {
        e.preventDefault();
        formTraverser.next().go();
    });

    $(getElementsByHookName("applicationform-btn-previous")).on("click", function (e) {
        e.preventDefault();
        formTraverser.previous().go();
    });
	$("#btn-save-application").on("click", function (e) {
		formTraverser.setAction();
	});

	$(".applicationform-tab").on("click", function (e) {
		e.preventDefault();
		formTraverser.setPage($(this).data("pagenumber")).go();
	});
}

/**
 * Accessibility note: Triggering `onchange` event immediately is a bad accessibility practice! But we definitely do
 *  want to keep it so that dependencies and errors are immediately updated and shown. For that reason we take care
 *  how and when to update the actual content and how to manage the focus afterwards
 * @param formSelector
 */
function attachFfwChangeBehavior(formSelector) {
    $(formSelector).on("change", ".field :input:not(.selectized)", fieldChangeBehaviorCallback);
    $(formSelector).on("change", ".dependency :input:not(.selectized)", dependencyChangeBehaviorCallback);
}

function attachFfwPlugins(containerSelector) {
	$(containerSelector).find('.date').find(':input').each(function () {
		var data = $(this).data();

		if (!data.datepicker && typeof($(this).data('date-pattern')) !== 'undefined') {
			var date_pattern = $(this).data('date-pattern').toLowerCase();
			var lang = window.globalConstants.currentLangStr;
			// global config
			var config = {
                outputFormat: date_pattern,
				autoclose: true,
				language: lang,
				startDate: null,
				todayBtn: 'linked',
                gainFocusOnConstruction: false,
                clearBtn: true
			};

            if (typeof ($(this).data('icons')) !== 'undefined') {
                config.openButtonIcon = $(this).data('icons');
            }

			// make picker useful using dateformat
			var days = date_pattern.indexOf('d') != -1 ? true : false;
			var months = date_pattern.indexOf('m') != -1 ? true : false;
			var years = date_pattern.indexOf('y') != -1 ? true : false;
			if (days) {
				startDate: '01/01/1900';
			} else if (months) {
				config.startView = 1;
				config.minViewMode = 1;
			} else if (years) {
				config.startView = 2;
				config.minViewMode = 2;
			}
			// initialize
			$(this).datepicker(config);
            $(this).parent().find('[data-toggle="tooltip-from-sr-only"]').initTooltipsFromSrOnlyEl();
		}
	});

    // build form popovers
    $(containerSelector).find("[data-popover-form]").initFormPopovers();

    if (typeof($.fn.selectize) !== 'undefined') {
        var selectizeOptions = {
            'selectedItemsDirection': 'up',
            'hideSelected': true
        };

        $(containerSelector).find(':input.multiple').each(function () {
            $(this).selectize(selectizeOptions);
            $(this).data('selectize')
                .on('dropdown_close', function () {
                    var $input = this.$input;
                    const isDependency = !!$input.closest(".dependency").length;
                    if (isDependency) {
                        dependencyChangeBehaviorCallback.call($input);
                    } else {
                        fieldChangeBehaviorCallback.call($input);
                    }
                });
        });
    }

    $(document).closeTooltipsAndPopovers();
    $(containerSelector).find(".form-group").applyFormGroupValidationMarkup();
    initButtonAddBlock(containerSelector);
}

function attachFfwClickBehavior(formSelector) {
	$(formSelector).on('click', '[data-hook="add-block-btn"]', function (e) {
		var $btnAddBlock = $(this);
		var $btnAddBlockCont = $btnAddBlock.closest('.add-multiblock');
		var $multiBlockCont = $btnAddBlock.closest('.multiblock-container');
		var application_token = $multiBlockCont.closest("form").find("input[name=application_token]").val();
		var maxBlocksLimit = parseInt($multiBlockCont.attr('data-maxblocks'));

		jQuery.ajax({
			type: 'POST',
			url: $btnAddBlock.attr('data-href'),
			dataType: "json",
			data: {
				type: "multiblock-add",
				application_token: application_token,
                _csrf_token: $('#_csrf_token').val()
			},
            beforeSend: function() {
                if ($btnAddBlock.hasClass("disabled")) {
                    return false;
                }
                $btnAddBlock.addClass("disabled");
            },
            success: function (data) {
                if ("undefined" === typeof data.content) {
                    showGeneralErrorMessage();
                    return;
                }

                const $allBlocks = $multiBlockCont.find(".multiblock-block");
                const $lastBlock = $allBlocks.last();

                // Append block
                const $currentBlock = $(data.content).insertAfter($lastBlock);
                attachFfwPlugins(formSelector);

                // Focus management
                const $elToFocus = $currentBlock.find(":input:visible").first();
                if ($elToFocus.length) {
                    $elToFocus.trigger("focus");
                }

                // Hide "Add Block" button
                if (($allBlocks.length + 1) >= maxBlocksLimit) {
                    $btnAddBlockCont.hide(0);
                }

                // Correct block ordinal numbers
                $multiBlockCont.find(".multiblock-block").each(function(i, block) {
                    $(block).find("[data-js-block-nr]").text(i + 1);
                });
            },
            complete: function () {
                $btnAddBlock.removeClass("disabled");
            }
		});
		return false;
	});

	$(formSelector).on('click', '[data-hook="remove-block-btn"]', function (e) {
		var $btnRemoveBlock = $(this);
		var $multiBlockCont = $btnRemoveBlock.closest('.multiblock-container');
		var $btnAddBlockCont = $multiBlockCont.find('.add-multiblock');
		var application_token = $multiBlockCont.closest("form").find("input[name=application_token]").val();

		var modalData = {
			headline: translations.applicationform_remove_multiblock,
			content: translations.applicationform_confirm_remove_multiblock,
			buttons: [
				{
					content: translations.general_no,
					dismiss: true,
					primary: false
				},
				{
					content: translations.general_yes,
					dismiss: true,
					primary: true,
					callback: function () {
						$.post(
							$btnRemoveBlock.attr('data-href'),
							{
								type: "multiblock-remove",
								application_token: application_token,
                                _csrf_token: $('#_csrf_token').val()
							},
							function (data) {
								if (data.element) {
                                    // Show "Add Block" button
                                    $btnAddBlockCont.show(0, function() {
                                        // Focus management
                                        const $elToFocus = $btnAddBlockCont.find("[data-hook='add-block-btn']").first();
                                        if ($elToFocus.length) {
                                            $elToFocus.trigger("focus");
                                        }

                                        // Remove the block
                                        $(data.element).remove();

                                        // Correct block ordinal numbers
                                        $multiBlockCont.find(".multiblock-block").each(function(i, block) {
                                            $(block).find("[data-js-block-nr]").text(i + 1);
                                        });
                                    });
								}
							},
							"json"
						);
					}
				}
			]
		};

		showStandardModal(modalData);

		e.preventDefault();
		return false;
	});
}

function fieldChangeBehaviorCallback() {
    const $input = $(this);

    const isDependency = !!$input.closest(".dependency").length;
    if (isDependency) {
        return true; // avoid duplicate request. Will be handled at higher level by `dependency` handler
    }

    const $elContainer = $input.closest(".field");
    const paramElement = $input.attr("name");
    const paramData = $input.closest(".field").find(":input").serializeArray();

    disableDatepickerIfPresent($input)
    requestContentUpdateOnlyOnce($elContainer, "live-validation", paramElement, paramData, $input);
}

function disableDatepickerIfPresent($input) {
    if ($input.hasClass('datepicker-input')) {
        $input.datepicker('disable');
    }
}

function dependencyChangeBehaviorCallback() {
    const $input = $(this);
    const $elContainer = $input.closest(".block");

    const paramElement = $elContainer.attr("id");
    const paramData = $elContainer.find(":input").serializeArray();
    requestContentUpdateOnlyOnce($elContainer, "dependency", paramElement, paramData, $input);
}

/**
 * Ensures the correct order of AJAX requests and cancelling previous outdated requests
 * A request and the content replacement is needed only once for the last triggered `onchange` event on the same element
 * Each other pending request in the series must be immediately cancelled if a new one is triggered
 * For example in case of `selects` where a user quickly browses through the options we want to make sure that we don't
 *  lose currently selected value by replacing it with the previous request and previously selected old value
 * @param $element
 * @param paramType
 * @param paramElement
 * @param paramData
 */
function requestContentUpdateOnlyOnce($element, paramType, paramElement, paramData, $onchangeTargetEl) {
    $.ajax({
        url: "inc/applicationform_dynamics_ajax.php",
        method: "POST",
        dataType: "json",
        data: {
            type: paramType,
            application_token: $element.closest("form").find("input[name=application_token]").val(),
            _csrf_token: $("#_csrf_token").val(),
            element: paramElement,
            data: paramData
        },
        beforeSend: function(jqXHR) {
            const previousPendingHandler = $element.data("pendingHandler");
            if (previousPendingHandler) {
                previousPendingHandler.abort();
            }
            $element.data("pendingHandler", jqXHR);
        },
        success: function (data, textStatus, jqXHR) {
            if ("undefined" === typeof data.content) {
                showGeneralErrorMessage();
                return;
            }
            manageFocusAndReplaceContent($element, data.content, $onchangeTargetEl.prop('id'));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (errorThrown && ("abort" !== errorThrown)) {
                showGeneralErrorMessage();
            }
        }
    });
}

/**
 * Handles the dynamic content replacement for `onchange` event (standard fields and entire blocks/dependencies)
 * We need to make sure to return the focus to where is was before the content replacement, if the focus was inside
 *  of the container which is going to be removed and replaced by the new content. Thus the focus will be lost
 * Likewise if the focus was on some other not-related element in the time of the replacement then we don't need it
 * It relies on the ID of the currently focused element to be able to re-focus it within the new content
 * Hint: It's not prefect. Focus can still be lost in some cases e.g. too quick traversing, updated dependencies etc.
 *  This is only a workaround so that we keep `onchange` event even though it's a bad accessibility practice
 */
function manageFocusAndReplaceContent($container, content, onchangeTargetId) {
    let idWhereToRestoreFocus;
    const currentlyFocusedElement = document.activeElement;
    const isFocusContainedInUpdatedContent = !!$container.has(currentlyFocusedElement).length;
    if (isFocusContainedInUpdatedContent && ("undefined" !== typeof currentlyFocusedElement.id)) {
        idWhereToRestoreFocus = currentlyFocusedElement.id;
    }

    const $newContent = $(content);
    $container.replaceWith($newContent);

    const $blockContainer = $newContent.closest(".block");
    $blockContainer.attr("data-dynamically-injected-by-target-id", onchangeTargetId);
    const blockContainerSelector = "#" + $blockContainer.attr('id');
    attachFfwPlugins(blockContainerSelector);

    if (idWhereToRestoreFocus) {
        const $elWhereToRestoreFocus = $("#" + idWhereToRestoreFocus);
        if ($elWhereToRestoreFocus.length) {
            $elWhereToRestoreFocus.trigger("focus");
        } else {
            // e.g. previously focused was dependency field which now does not exist anymore after the update
            const $elFallbackToFocus = $blockContainer.find(":input:visible:first");
            if ($elFallbackToFocus.length) {
                $elFallbackToFocus.trigger("focus");
            }
        }
    }
}

function attachFfwAjaxUpload(formSelector)
{
	const $uploadCategory = $(formSelector).find("[data-hook~='upload-category']");

	if ($uploadCategory.length === 0) {
		return true;
	}
	var validatorConfig = fileUploadValidator.buildValidatorConfigFromPattern(uploadValidationPattern);
	var uploadFiles = new Array();
	window.onUploadConditionsChange = function (changeProvider, files) {
		uploadFiles = [];

		// Firefox 1.0+
		var isFirefox = typeof InstallTrigger !== 'undefined';
		if (changeProvider === 'drop') {
			uploadFiles = files;
		} else if (isFirefox) {
			// Problematic section - we have to assign from the cloned object, otherwise the files would be assigned by ref and lost later on the way
			// NOTE: This does not work in any version of IE nor EDGE, Safari, iOS...
			var $uploadInputToClone = $('[name="btn-attachment"]');
			if ($uploadInputToClone.length) {
				var $clonedUploadInput = $uploadInputToClone.last().clone();
				uploadFiles = $clonedUploadInput.get(0).files;
			}
		} else if (upload._input !== null && typeof upload._input.files !== "undefined" && upload._input.files.length > 0) {
			uploadFiles = upload._input.files;
		} else if (upload._input !== null && upload._input.value.length > 0 && (navigator.appVersion.indexOf("MSIE 9.0") != -1 || navigator.appVersion.indexOf("MSIE 8.0") != -1)) {
			// IE Hack
			uploadFiles = new Array({
				"name": upload._input.value,
				"size": 0
			});
		}

        $(formSelector).find("[data-js-upload-success-msg]").remove();

		if(uploadFiles.length) {
			window.uploadValidator = new fileUploadValidator(validatorConfig);
			const fileType = $uploadCategory.val();
			window.uploadValidator.activateValidator(fileType);
			window.uploadValidator.validateFiles(uploadFiles);
			window.uploadValidator.renderValidationErrors($(formSelector).find('[data-js-upload-errors]'), $uploadCategory);
		}
	};

	$uploadCategory.on("change", function (e) {
		window.onUploadConditionsChange(e.currentTarget);
	});

	if ($(formSelector).find('#field-attachment').length !== 0) {
		////////////////////////////////////////////////////////////////////////////////
		$(function() {

			let $dragAndDropArea = $("#draganddrop-area");
			let $uploadArea = $(".upload-area");
			let dragCounter = 0;

			$uploadCategory.off("change.dragsupport").on("change.dragsupport", function() {
				if($(this).find(':selected').attr('value') !== undefined
					&& /^[a-z0-9._-]+$/.test($(this).find(':selected').attr('value'))
				){
					$dragAndDropArea.show("blind");
				} else {
					$dragAndDropArea.hide();
				}
			});

			// preventing page from redirecting
			$dragAndDropArea.off("dragover.dragsupport").on("dragover.dragsupport", function(e) {
				e.preventDefault();
				e.stopPropagation();
			});

			$dragAndDropArea.off("drop.dragsupport").on("drop.dragsupport", function(e) {
				e.preventDefault();
				e.stopPropagation();
			});

			// Drag over
			$uploadArea.off("dragover.dragsupport").on("dragover.dragsupport", function (e) {
				e.preventDefault();
				e.stopPropagation();
			});

			// Drag enter
			$uploadArea.off("dragenter.dragsupport").on("dragenter.dragsupport", function (e) {
				e.stopPropagation();
				e.preventDefault();
				if (dragCounter++ === 0) {
					$uploadArea.addClass("upload-area--dragenter");
				}
			});

			// Drag leave
			$uploadArea.off("dragleave.dragsupport").on("dragleave.dragsupport", function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (--dragCounter === 0) {
					$uploadArea.removeClass("upload-area--dragenter");
				}
			});

			// Drop
			$uploadArea.off("drop.dragsupport").on("drop.dragsupport", function (e) {
				e.preventDefault();
				e.stopPropagation();

				dragCounter = 0;
				$uploadArea.removeClass("upload-area--dragenter");

				$("input[name='btn-attachment']").last().data("files", e.originalEvent.dataTransfer.files);
				$("#start_file_upload_button").trigger("click", {
					action: "drop",
					files: e.originalEvent.dataTransfer.files
				});
			});

			// Open file selector on div click
			$("#uploadfile").off("click.dragsupport").on("click.dragsupport", function(){

				// file selected
				$("input[name='btn-attachment']").last().off("change.dragsupport").on("change.dragsupport", function(){
					setTimeout(function () {
						$("#start_file_upload_button").trigger("click");
					}, 250);

				});

				$("input[name='btn-attachment']").last().trigger("click");
			});

		});
		////////////////////////////////////////////////////////////////////////////////

		var upload = new AjaxUpload('upload_file', {
			action: 'inc/candidate_attachments.php',
			name: 'btn-attachment', // if ever renamed make sure to update candidate_attachments.php ( ! )
			hoverClass: 'hover',
			autoSubmit: false,
			onChange: function (file, ext) {
				window.onUploadConditionsChange(this);
			},
			onSubmit: function (file, ext) {
				this.disable();
                this.fileUploadLoadingModal = showFileUploadLoadingModal(file);
				$uploadCategory.prop('disabled', 'disabled');

				var data = {
					'category': $uploadCategory.val(),
					'application_token': $('input[name=application_token]').val(),
					'_csrf_token': $('#_csrf_token').val(),
					'action': 'upload'
				};
				if ($('#cv_parsing').length) {
					$.extend(data, {
						'cv_parsing': $('#cv_parsing').val()
					});
				}
				this.setData(data);
			},
			onError: function() {
                showGeneralErrorMessage();
			},
			onComplete: function (file, response) {
				if (!$('#cv_parsing').length) {
				    $('#field-attachment').replaceWith(response);
					$(formSelector).find('#field-attachment').replaceWith(response);
				} else {
					var modalData = {
						"headline": translations.applicationform_parsing,
						"content": translations.applicationform_parsing_info,
						"buttons": [
							{
								"content": translations.general_next,
								"primary": true,
								"callback": function () {
									$('#btn-next-tab').click();
								}
							}
						],
						"hidden": function () {
							$('#btn-next-tab').click();
						}
					};

					showStandardModal(modalData);
				}
				attachFfwAjaxUpload(formSelector);
				$(formSelector).find('table.responsive').initResponsiveTable();

                const $uploadCategory = $(formSelector).find('[data-hook~="upload-category"]');
                if (this.fileUploadLoadingModal) {
                    hideLoadingModal($uploadCategory.eq(0));
                }

				validatePdfDocumentHandler();
				if ($(formSelector).find('[data-js-upload-errors]').children().length === 0) {
                    showFileUploadSuccessMsg($(formSelector), file);
				}
			}
		});

		// attach click handler for file upload button
		$(formSelector).find('#start_file_upload_button').off().on('click', function (e, data) {
			e.preventDefault();

			if (typeof data != 'undefined' && data.action === 'drop') {
				window.onUploadConditionsChange('drop', data.files);
			} else {
				window.onUploadConditionsChange();
			}

			if (uploadValidator.errors.length === 0) {
				upload._input.files = uploadFiles;
				upload.submitAjax();

				let uploadArea = $(".upload-area");
				uploadArea.text(uploadArea.find('.cv-parsing').length > 0
					? translations.applicationform_cv_parsing_upload
					: translations.general_file_uploading);
				return;
			} else {
				window.uploadValidator.renderValidationErrors($(formSelector).find('[data-js-upload-errors]'), $uploadCategory);
			}
			return false;
		});

		// attach click handlers for file deletion
		$(formSelector).find('[data-hook~="attachment-delete-btn"]').on('click', function (e) {
			e.preventDefault();
			var $this = $(this);
			var href = $this.attr('href');

			var modalData = {
				headline: translations.applicationform_remove_attachment,
				content: translations.applicationform_confirm_remove_attachment,
				buttons: [
					{
						content: translations.general_no,
						dismiss: true,
						primary: false
					},
					{
						content: translations.general_yes,
						dismiss: true,
						primary: true,
                        callback: function () {
                            const $currentContainerIterable = $this.closest('[data-hook="attachment-item"]');
                            const deleteBtnSelector = '[data-hook~="attachment-delete-btn"]';
                            manageFocusAndDeleteItem($currentContainerIterable, deleteBtnSelector, function () {
                                // Remember the conditions to revert the focus after ajax replaces the content
                                const $currentlyFocused = $(document.activeElement);
                                const $currentlyFocusedParent = $currentlyFocused.closest('[data-hook="attachment-item"]');
                                let currentlyFocusedIndex = -1;
                                if ($currentlyFocusedParent.length) {
                                    currentlyFocusedIndex = $currentlyFocusedParent.index();
                                }

                                $.post(
                                    href,
                                    {
                                        action: "delete",
                                        '_csrf_token': $('#_csrf_token').val(),
                                        application_token: $('input[name=application_token]').val()
                                    },
                                    function (data) {
                                        if ('undefined' !== typeof $.fn.tooltip) {
                                            $currentlyFocused.tooltip('hide');
                                        }
                                        $(formSelector).find('#field-attachment').replaceWith(data);
                                        attachFfwAjaxUpload(formSelector);
                                        $(formSelector).find('table.responsive').initResponsiveTable();

                                        if (currentlyFocusedIndex >= 0) {
                                            const $attachmentItems = $(formSelector).find('[data-hook="attachment-item"]');
                                            const $attachmentItemToFocus = $attachmentItems.eq(currentlyFocusedIndex);
                                            $attachmentItemToFocus.find('[data-hook~="attachment-delete-btn"]').trigger('focus');
                                        } else {
                                            const $uploadCategory = $(formSelector).find('[data-hook~="upload-category"]');
                                            $uploadCategory.trigger('focus');
                                        }

                                    },
                                    "html"
                                );

                            });
                        }
					}
				]
			};

			showStandardModal(modalData);
			return false;
		});
	}

	$(getElementsByHookName("attachment-delete-btn")).initTooltipsFromSrOnlyEl();

    $("[data-js-set-colspan]").setColspan();
}

function validatePdfDocumentHandler()
{
	if (typeof pdfjsLib != "undefined" && window.globalConstants.isPdfCheckEnabled == 1 ) {
		$('input[name="btn-attachment"]').on('change', function(e) {
			$("#start_file_upload_button").prop("disabled", false);
			if (typeof $(this).get(0).files[0] != "undefined") {
				if (['application/pdf'].indexOf($(this).get(0).files[0].type) != -1) {
					$("#start_file_upload_button").attr("disabled", "disabled")
					var file_url = URL.createObjectURL($(this).get(0).files[0]);
					pdfjsLib.getDocument({url: file_url }).then(function(pdf_doc) {
						$("#start_file_upload_button").prop("disabled", false);
					}).catch(function(error) {
						window.uploadValidator.addError(translations.application_upload_error_file_is_protected)
						window.uploadValidator.renderValidationErrors($('[data-js-upload-errors]'), $(formSelector).find("[data-hook~='upload-category']"));
					});
				}
			}
		})
	}
}

// we create FormTraverser globally, and binding event handle
(function () {
	var applicationFormTraverser = new FormTraverser();
	applicationFormTraverser.bindHandlers();
}());

/**
 * Use modal as a loading indication to take advantage of focus management and focus trap
 * @param fileName
 */
function showFileUploadLoadingModal(fileName) {
    const txtStrong = fileName;
    const txtAdditional = window.translations.general_file_uploading;
    return showLoadingModal(txtStrong, txtAdditional);
}

/**
 * Show/Hide "Add Block" button. By default it's initially displayed
 * @param formSelector
 */
function initButtonAddBlock(formSelector) {
    $(formSelector).find('.multiblock-container').each(function(i, multiblock) {
        // Init: Hide "Add Block" button if max blocks limit was reached
        var $multiBlockCont = $(multiblock),
            $btnAddBlockCont = $multiBlockCont.find('.add-multiblock'),
            $allBlocks = $multiBlockCont.find('.multiblock-block'),
            maxBlocksLimit = parseInt($multiBlockCont.attr('data-maxblocks'));

        if ($allBlocks.length >= maxBlocksLimit) {
            $btnAddBlockCont.hide(0);
        }
    });
}

/**
 * Removes "hidden" from a skip link and appends the information about the current application page
 */
function setApplicationSkiplink() {
    const $linkCont = $("[data-js-applicationform-skiplink]");
    if ($linkCont.length) {
        const $link = $linkCont.find("a:first");
        const $heading = $($link.attr("data-href"));
        if ($heading.length) {
            $link.attr("href", $link.attr("data-href"));
            $linkCont.removeAttr("hidden");
            $link.text($link.text() + " - " + $heading.text());
        }
    }
}

/**
 * Sets the tooltip and screen reader description for the next/previous buttons
 */
function setButtonsDescription() {
    const $pages = $(getElementsByHookName("applicationform-page-tab"));
    const $currentPage = $pages.filter(".active");
    if ($currentPage.length && (translations && ("undefined" !== translations.applicationform_to_page))) {
        const $previousPage = $pages.eq($currentPage.index() - 1);
        if ($previousPage.length) {
            const $btnPrevious = $(getElementsByHookName("applicationform-btn-previous"));
            const description = translations.applicationform_to_page.replace("%s", $previousPage.attr("data-page-title"));
            if ($btnPrevious.length && (description && description.length)) {
                if ($btnPrevious.length) {
                    $(getElementByHookName("btn-previous-sr-only", $btnPrevious.get(0))).text(description);
                    $btnPrevious.initTooltipsFromSrOnlyEl();
                }
            }
        }
        const $nextPage = $pages.eq($currentPage.index() + 1);
        if ($nextPage.length) {
            const $btnNext = $(getElementsByHookName("applicationform-btn-next"));
            const description = translations.applicationform_to_page.replace("%s", $nextPage.attr("data-page-title"));
            if ($btnNext.length && (description && description.length)) {
                if ($btnNext.length) {
                    $(getElementByHookName("btn-next-sr-only", $btnNext.get(0))).text(description);
                    $btnNext.initTooltipsFromSrOnlyEl();
                }
            }
        }
    }
}

/**
 * Updates and displays a "success label" info and notifies a screen reader
 * @param $cont
 * @param fileName
 */
function showFileUploadSuccessMsg($cont, fileName) {
    $cont.find("[data-js-uploaded-file-name]").text(fileName);
    $cont.find("[data-js-upload-success-msg]").removeClass("hidden");
    $cont.find("[data-sr-alert-ref]").srNotification();
}

addTolisteners(['application', 'onspec_application', 'profile_application'], {
	name: 'standard',
	method: function () {
		attachFfwChangeBehavior('.ffw');
		attachFfwClickBehavior('.ffw');
		attachFfwAjaxUpload('.ffw');
		attachFfwPlugins('.ffw'); // datepicker, popovers etc.
		validatePdfDocumentHandler();

		/**
		 * Prevent POST Resubmit
		 */
		if (window.history.replaceState) {
			window.history.replaceState( null, null, window.location.href );
		}

        /**
         * Set a "skip link" to jump to applicationform content
         */
        setApplicationSkiplink();

        /**
         * Sets description tooltip for next/previous buttons
         */
        setButtonsDescription();
    }
});

addTolisteners('applicationstate', {
	name: 'standard',
	method: function () {
		//delete confirm
		$('.js-delete-application').on("click",function () {
			var candidateid = $(this).data('candidateid');

			if (candidateid > 0) {
				var modalData = {
					headline: translations.applicationstate_app_del,
					content: translations.applicationstate_delete_application,
					buttons: [
						{
							content: translations.general_no,
							dismiss: true,
							primary: false
						},
						{
							content: translations.general_yes,
							dismiss: true,
							primary: true,
							callback: function () {
								var csrf_token = $('#_csrf_token').val();
								$.post(
									'index.php',
									{
										ac: 'applicationstate',
										action: 'application_delete',
										del_candidate_id: candidateid,
										_csrf_token: csrf_token
									}
								).done(function (data) {
									data = JSON.parse(data);
									if (data.success == true) {
											document.location.href = 'index.php?ac=applicationstate';
									} else if (data.csrf_token_ok == false) {
											showCsrfErrorMessage();
									} else {
											showGeneralErrorMessage();
									}
								});
							}
						}
					]
				};

				showStandardModal(modalData);
			}
		});

		//show layer
		$(function () {
			if (Boolean($('input[name=jobad_inactive]').val()) == true) {
				var modalData = {
					headline: translations.general_jobad_inactive_title,
					content: translations.general_jobad_inactive,
					buttons: [
						{
							content: translations.general_close_dialog,
							dismiss: true,
							primary: true
						}
					]
				};

				showStandardModal(modalData);
			}
		});

		//showing status modal
		$("[data-js-status-help-btn]").on("click", function (ev) {
			var modalData = {
				headline: translations.general_status_definitions,
				content: $("[data-js-status-definitions-table-wrapper]").children(),
				disableFocusOnShown: true,
				buttons: [
					{
						content: translations.general_close_dialog,
						dismiss: true,
						primary: true
					}
				]
			};

			showStandardModal(modalData);
		});
	}
});

"use strict";

var opt = {
	name: 'applicationFormPreview',
	method: function () {
		$("#formpreview_foldAllPages").on("click", function (e) {
			$('#application-form-panel-group .collapse').collapse('hide');
		});
		$("#formpreview_unfoldAllPages").on("click", function (e) {
			$('#application-form-panel-group .collapse').collapse('show');
		});

        $(getElementsByHookName("application-submit-form")).one('submit', function (e) {
            if ($(e.currentTarget).find('[name="confirm_send"]').is(':focus')) {
                const txtStrong = window.translations.applicationform_sending_the_application;
                const txtAdditional = window.translations.applicationform_sending_the_application_please_wait;
                showLoadingModal(txtStrong, txtAdditional);
            } else {
                showLoadingModal();
            }
        });
	}
};

addTolisteners(['application', 'onspec_application'], opt);

addTolisteners('onspec_application', {
    name: 'onspec',
    method: function () {

        const organizationSelector = $('[data-hook="organization-select"]');

        if (organizationSelector.length > 0) {
            organizationSelector.change(function (evt) {
                var medialibOrganizationContent = $("#medialib_organization_content");
                organizationSelector.attr('disabled', true);

                try {
                    $.ajax({
                        url: 'onspec_organizations',
                        data: {
                            organization: $(this).val(),
                        },
                        type: 'GET',
                        async: true,

                        success: function (data, status) {
                            medialibOrganizationContent.fadeOut({
                                duration: "slow",
                                queue: false
                            }).slideUp("slow");
                            if (data) {
                                medialibOrganizationContent.html(data).fadeIn({
                                    duration: "slow",
                                    queue: false
                                }).css('display', 'none').slideDown("slow", function() {
                                    organizationSelector.removeAttr('disabled');
                                });
                            }
                        },
                        error : function(xhr, textStatus, errorThrown) {
                            organizationSelector.removeAttr('disabled');
                        }
                    })
                } catch (e) {
                }
                organizationSelector.removeAttr('disabled');

            })
        }
    }
});

addTolisteners(['event'], {
    name: 'invitation_list',
    method: function () {

        $('[data-hook=book]').on('click', function (e) {
            var participant_id = $(e.currentTarget).parents('[data-hook=event]').data('participant-id');
            var appointment_id = $(e.currentTarget).data('appointment-id');

            var data = {
                participant_id: participant_id,
                appointment_id: appointment_id
            };

            $('#processForm [name=participant_id]').val(participant_id);
            $('#processForm [name=appointment_id]').val(appointment_id);
            $('#processForm [name=action]').val('book');

            var modalData = {
                headline: translations.event_modal_headline,
                content: modalBooking,
                disableFocusOnShown: true,
                buttons: [
                    {
                        content: translations.event_modal_no,
                        dismiss: true,
                        primary: false
                    },
                    {
                        content: translations.event_modal_yes_booking,
                        dismiss: false,
                        primary: true,
                        callback: function () {
                            $('#processForm [name=comment]').val($('#event_modal_booking_comment').val());
                            $('#processForm').one('submit', function () {
                                const txtStrong = window.translations.event_modal_wait;
                                showLoadingModal(txtStrong);
                            }).trigger('submit');
                        }
                    }
                ],
                shown: function () {
                    $(this).find("[data-sr-alert-ref]").srNotification(); // standard_warning.tpl
                }
            };
            showStandardModal(modalData);
        });

        $('[data-hook=cancel]').on('click', function (e) {
            var participant_id = $(e.currentTarget).parents('[data-hook=event]').data('participant-id');
            var appointment_id = $(e.currentTarget).data('appointment-id');

            var data = {
                participant_id: participant_id,
                appointment_id: appointment_id
            };

            $('#processForm [name=participant_id]').val(participant_id);
            $('#processForm [name=appointment_id]').val(appointment_id);
            $('#processForm [name=action]').val('cancel');

            var modalData = {
                headline: translations.event_modal_cancel_headline,
                content: modalCancel,
                buttons: [
                    {
                        content: translations.event_modal_no,
                        dismiss: true,
                        primary: false
                    },
                    {
                        content: translations.event_modal_yes_cancel,
                        dismiss: false,
                        primary: true,
                        callback: function () {

                            $('#processForm [name=rejection_reason]').val($('#event_modal_cancel_select').val());
                            $('#processForm [name=comment]').val($('#event_modal_cancel_comment').val());

                            let formData = $('#processForm').find(':input').serialize();

                            try {
                                $.ajax({
                                    type: "POST",
                                    url: '?ac=event&acsub=process-data',
                                    data: formData,
                                    beforeSend: function (xhr, opts) {
                                        const txtStrong = window.translations.event_modal_wait;
                                        showLoadingModal(txtStrong);
                                    },
                                    success: function (response) {
                                        try {
                                            response = JSON.parse(response);
                                        } catch (err) {
                                            showGeneralErrorMessage();
                                            return;
                                        }

                                        if (response.status == true) {
                                            location.reload();
                                        } else {
                                            if (typeof response.error_input_names !== 'undefined' && typeof response.error_panel_HTML !== 'undefined') {
                                                modalData.disableFocusOnShown = true; // To focus the error panel instead
                                                modalData.shown = function () {
                                                    const $modal = $(this);

                                                    // Prefill / Re-Populate
                                                    $modal.find('#event_modal_cancel_select').val( $('#processForm [name=rejection_reason]').val());
                                                    $modal.find('#event_modal_cancel_comment').val($('#processForm [name=comment]').val());

                                                    // Set error fields
                                                    $.each(response.error_input_names, function (_index, error_input_name) {
                                                        $modal.find('[data-js-error-key="' + error_input_name + '"]')
                                                            .addClass('js-form-group--has-error');
                                                    });
                                                    $modal.find(".form-group").applyFormGroupValidationMarkup();

                                                    // Set error panel + sr notification
                                                    $modal.find('[data-event-cancel-errors]').prepend(response.error_panel_HTML);
                                                    window.location.hash = '';
                                                    $modal.find("[data-sr-alert-ref]").srNotification();
                                                }

                                                showStandardModal(modalData);
                                            } else {
                                                showGeneralErrorMessage();
                                                return;
                                            }
                                        }
                                    }
                                })
                            } catch (e) {
                                //console.log(e.message);
                            }
                        }
                    }
                ]
            };
            showStandardModal(modalData);
        });

        $('[data-hook=map]').on('click', function (e) {
            e.preventDefault();
            var event_id = $(e.currentTarget).data('event-map-id');
            var event_map_long = $(e.currentTarget).data('event-map-long');
            var event_map_lat = $(e.currentTarget).data('event-map-lat');

            let altText = '';
            let altTextSourceEl = getElementByHookName('event-location-details', e.currentTarget.closest('.event-panel-header'));
            if (altTextSourceEl) {
                altText = altTextSourceEl.textContent;
            }

            var data = {
                event_id: event_id,
                event_map_long: event_map_long,
                event_map_lat: event_map_lat
            };

            var modalData = {
                headline: translations.event_modal_map_headline,
                content: modalMap,
                buttons: [
                    {
                        content: translations.general_close,
                        dismiss: true,
                        primary: false
                    }
                ]
            };
            showStandardModal(modalData);

            let eventModalMap = document.querySelector('#standard-modal #modal-map-openstreet').innerHTML = "<div id='modal-map' style='width: 100%; height: 100%;'></div>";;
            if (eventModalMap) {
                let mapId = 'modal-map';

                // Render map
                let Mmap = L.map(mapId, {center: [event_map_lat, event_map_long], zoom: 8 });
                let markerOptions = {
                    icon: L.icon({
                        iconUrl: window.globalConstants.pathImages + 'map/img-map-pin.svg',
                        iconRetinaUrl: window.globalConstants.pathImages + 'map/img-map-pin.svg',
                        iconSize: [25, 25]
                    }),
                    favoriteJobIndicator: true,
                    alt: altText
                };
                let marker = L.marker([event_map_lat, event_map_long], markerOptions).addTo(Mmap);
                if (altText) {
                    marker.bindPopup(altText);
                }

                // Add an OpenStreetMap tile layer
                L.tileLayer(
                    window.globalConstants.osmTileLayerUrl,
                    {
                        maxZoom: 15,
                        detectRetina: true
                    }
                ).addTo(Mmap);

                $('#standard-modal').on('shown.bs.modal', function (e) {
                    Mmap.invalidateSize();
                });
            }

        });

        $.getJSON(window.globalConstants.pathJs + 'jobboard.config.json')
            .done(function(data) {
                if (data.configWidgetMapOpenstreet.defaults.osmTileLayerUrl) {
                    window.globalConstants.osmTileLayerUrl = data.configWidgetMapOpenstreet.defaults.osmTileLayerUrl;
                }
            });

        modalBooking = $('[data-hook=modal-booking]').html();
        modalCancel = $('[data-hook=modal-cancel]').html();
        modalMap = $('[data-hook=modal-eventmap]').html();
        let LMapArray = [];

        $('[data-hook=modal-booking]').remove();
        $('[data-hook=modal-cancel]').remove();

        hideElements('events');
        hideElements('readmore');

        initOSMEventMap();

        $('button[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            hideElements('readmore');

            if (LMapArray.length > 0) {
                LMapArray.forEach(function (map, i) {
                    map.invalidateSize(true);
                });
            }
        });

        /**
         * Show All Events
         * @param item
         */
        function showAllEventsButton(item) {
            item.querySelector('.showmore').addEventListener('click', function (e) {
                e.preventDefault();
                item.querySelectorAll('tbody tr').forEach(function (event, i){
                    event.classList.remove("hide");
                });

                const elToFocus = getElementByHookName('focus-here-on-showmore', item);
                if (elToFocus) {
                    elToFocus.setAttribute('tabindex', '-1');
                    elToFocus.focus();
                }

                item.querySelector('.showmore').classList.add("hide");
            })
        }

        /**
         * Show Readmore Text
         * @param item
         */
        function showReadMoreText (item) {
            item.querySelector('.showmore').addEventListener('click', function (e) {
                e.preventDefault();
                let eclipse = item.querySelector('.event-panel-header .eclipse');
                eclipse.classList.remove("eclipse");
                eclipse.style.height = 'auto';

                eclipse.setAttribute('tabindex', '-1');
                eclipse.focus();

                item.querySelector('.showmore').classList.add("hide")
            })
        }

        /**
         * Hide Elements (init Readmore & Showmore)
         */
        function hideElements(actionType) {
            const eventPanels = document.querySelectorAll('.event-panel');

            eventPanels.forEach(function(item, i) {
                //Hide Events
                if (actionType === "events") {
                    let cutRows = 3;
                    let rows = item.querySelectorAll('tbody tr')
                    if (rows.length > cutRows) {
                        rows.forEach(function (row, i) {
                            if ( i >= (cutRows)) {
                                row.classList.add("hide")
                                if ( i === (rows.length - 1)) {
                                    const htmlButtonString = "<button type='button' class='btn btn-default showmore'>" + translations.event_show_all_events + "</button>";
                                    const showMoreButton = document.createElement('div');
                                    showMoreButton.classList.add('btn-wrapper');
                                    showMoreButton.innerHTML = htmlButtonString.trim();
                                    item.querySelector('.event-panel-body').appendChild(showMoreButton);
                                    showAllEventsButton(item.querySelector('.event-panel-body'));
                                }
                            }
                        });
                        rows[cutRows].setAttribute('data-hook', 'focus-here-on-showmore');
                    }
                }

                if (actionType === "readmore") {

                    //Hide Readmore
                    let cutLines = 2;
                    let readMore = item.querySelector('.event-panel-header .info-location-notes');
                    if (!readMore) {
                        return;
                    }
                    let lineheight = parseInt(window.getComputedStyle(readMore).getPropertyValue('line-height'), 10);
                    let readMoreTxtLines = readMore.clientHeight / lineheight;

                    if (readMoreTxtLines > cutLines && !item.querySelector('.event-panel-header .wrapper-info .showmore')) {
                        const htmlTextString = "<div role='button' class='showmore'>" + translations.general_show_more + "</div>";
                        const showMoreText = document.createElement('div');
                        showMoreText.innerHTML = htmlTextString.trim();
                        readMore.style.height = lineheight * cutLines + 'px';
                        readMore.style.webkitLineClamp = cutLines;
                        readMore.classList.add('eclipse')
                        item.querySelector('.event-panel-header .wrapper-info').appendChild(showMoreText);
                        showReadMoreText(item);
                    }
                }
            })
        }

        function initOSMEventMap() {

            let eventPanels = document.querySelectorAll('.event-panel-header');

            eventPanels.forEach(function (event, i) {

                let eventMap = event.querySelector('.event-map');
                if (eventMap) {
                    let mapId = 'map-openstreet-' + eventMap.getAttribute('data-event-map-id');
                    let altText = '';
                    let altTextSourceEl = getElementByHookName('event-location-details', event);
                    if (altTextSourceEl) {
                        altText = altTextSourceEl.textContent;
                    }

                    // Render map
                    LMapArray[i] = L.map(mapId, {center: [eventMap.getAttribute('data-event-map-lat'), eventMap.getAttribute('data-event-map-long')], zoom: 15, keyboard: false });
                    let markerOptions = {
                        icon: L.icon({
                            iconUrl: window.globalConstants.pathImages + 'map/img-map-pin.svg',
                            iconRetinaUrl: window.globalConstants.pathImages + 'map/img-map-pin.svg',
                            iconSize: [25, 25]
                        }),
                        favoriteJobIndicator: true,
                        keyboard: false,
                        alt: altText
                    };
                    let marker = L.marker([eventMap.getAttribute('data-event-map-lat'), eventMap.getAttribute('data-event-map-long')], markerOptions).addTo(LMapArray[i]);

                    // Add an OpenStreetMap tile layer
                    L.tileLayer(
                        '//{s}.tiles.osmserver.milchundzucker.de/osm_tiles_colour/{z}/{x}/{y}.png',
                        {
                            maxZoom: 15,
                            detectRetina: true
                        }
                    ).addTo(LMapArray[i]);
                }
            });
        }
    }
});

window.captchaCallbackQueue = {};
window.captchaExecuteCallbackQueue = function() {
    $.each(window.captchaCallbackQueue, function(uniqueId) {
        window.captchaExecuteCallbackFunction(uniqueId);
    })
}

window.captchaExecuteCallbackFunction = function(uniqueId) {
    if (typeof window.captchaCallbackQueue.uniqueId !== 'undefined') {
        var callbackObj = window.captchaCallbackQueue.uniqueId;
        callbackObj.triggerBtn.removeClass('disabled').prop('disabled', false);
        $.proxy(callbackObj.fnc, callbackObj.context)();
        delete window.captchaCallbackQueue.uniqueId;
    }
}

window.captchaAddCallbackFunction = function(fnc, context, $triggerBtn, waitingTime) {
    if (typeof grecaptcha === 'undefined'
        || typeof grecaptcha.getResponse === 'undefined'
        || grecaptcha.getResponse()
    ) {
        $.proxy(fnc, context)();
        return;
    }

    var uniqueId = 'id' + (+new Date());
    $triggerBtn.addClass('disabled').prop('disabled', true);
    window.captchaCallbackQueue.uniqueId = {
        fnc: fnc,
        context: context,
        triggerBtn: $triggerBtn
    };

    setTimeout(function() {
        window.captchaExecuteCallbackFunction(uniqueId);
    }, waitingTime);
}

captchaInitialize = function(captchaPlaceholderId) {
    /**
     * This is to determine which `[type=submit]` button was pressed, if there are multiple
     */
    const prepareSubmitButtons = function() {
        const $submitButtons = $captchaPlaceholderEl.closest('form').find("[type=submit]");
        $submitButtons.removeAttr("data-clicked");
        $submitButtons.one("click", function(e) {
            $(e.currentTarget).attr("data-clicked", true);
        });
    }

	/**
	 * Helper function to get the submit button, also if the captca was already initialized
	 * at a time where the button did not exist in the DOM (for example with modals)
	 */
	var getSubmitButton = function() {
		if ($captchaPlaceholderEl.closest('form').find('[type=submit]').length) {
			var $submitButton = $captchaPlaceholderEl.closest('form').find('[type=submit]');
		}
		
		if (typeof ($submitButton) !== 'undefined') {
            const $clickedSubmitButton = $submitButton.filter("[data-clicked]");
            if ($clickedSubmitButton.length) {
                $submitButton = $clickedSubmitButton;
            }
			return $submitButton;
		}

		return false;
	}

	var getForm = function() {
		if ($captchaPlaceholderEl.closest('form').length) {
			var $form = $captchaPlaceholderEl.closest('form');
		}

		if (typeof ($form) !== 'undefined') {
			return $form;
		}

		return false;
	}

	if (typeof captchaPlaceholderId === typeof undefined) {
		captchaPlaceholderId = 'js-captcha-placeholder'; // the id specified in reCaptcha.tpl
	}

	var $captchaPlaceholderEl = $('#' + captchaPlaceholderId);
	var $inputCaptchaPublicKey = $('#js-captchaPublicKey');

	if (getForm()) {
        prepareSubmitButtons();
		$(getForm()).one('submit', function(e) {
			e.preventDefault();
			function submitForm() {
				getSubmitButton().prop('disabled', false);
				getSubmitButton().click();
			}
			function waitForCaptcha(){
				var debug = false;
				var maxCounter = 12;
				var waitTime = 250;
				if (typeof waitForCaptchaCounter === 'undefined') {
					waitForCaptchaCounter = 0;
				}
				waitForCaptchaCounter++;
				if (waitForCaptchaCounter > maxCounter) {
					if (debug) console.log('stop waiting');
					setTimeout(submitForm, 0);
					return;
				}
				if(grecaptcha.getResponse()){
                    if (debug) console.log('submit form');
					setTimeout(submitForm, 0);
				}
				else{
					setTimeout(waitForCaptcha, waitTime);
                    if (debug) console.log('wait for captcha response ' + (waitForCaptchaCounter*waitTime)/1000 + ' seconds'+ ' from ' + (maxCounter*waitTime)/1000 + ' seconds');
				}
			}
			waitForCaptcha();
		});
	}
	
	if (	
			$inputCaptchaPublicKey.length					// public key exists and is found
		&&	$captchaPlaceholderEl.length					// container placeholder exists
		&&	$captchaPlaceholderEl.children().length === 0	// placeholder element must be empty
		&&	(typeof grecaptcha !== typeof undefined)				// the lib is loaded
		&&	(typeof grecaptcha.getResponse !== typeof undefined)	// the lib is really loaded (not 'usercentrics')
	) {

		// Determine the captcha size (mobile or desktop?)
		var bootstrapViewport = getView();
		var captchaSize = (bootstrapViewport === 'xs') ? 'compact' : 'normal';
		// Render captcha
		var captchaId = grecaptcha.render(captchaPlaceholderId, {
			sitekey : $inputCaptchaPublicKey.val(),
			theme: $('#js-captchaTheme').val(),
			size: captchaSize,
			callback: function(response) {
				if ("function" === typeof captchaCallbackHook) {
					captchaCallbackHook(response);
				}

				//Enable submit button
				if (getSubmitButton()) {
					//getSubmitButton().prop('disabled', false);
				}
			}
		});

		return captchaId;
	}

	return false;
};

captchaReset = function(optWidgetId) {
    if (typeof grecaptcha !== typeof undefined) {
        try {
            grecaptcha.reset(optWidgetId);
        } catch (e) {
            // Just ignore: e.g. in Johanniter, the 'usercentrics' plugin imitates `grecaptcha` object, but it's not a real `grecaptcha`
        }
    }
};

"use strict";

addTolisteners('general', {
	name: 'error',
	method: function () {

	}
});
$(function () {
	//button that opens quick login modal
	$('.js-link-login').on('click', function () {
		showLoginModal();
		return false;
	});

    $("[data-js-login-logout-skiplink]").append(function() {
        let $linkToClone = $();
        const $loginLink = $(".js-link-login");
        if ($loginLink.length) {
            $linkToClone = $loginLink;
        } else {
            const $logoutLink = $(".js-link-logout");
            if ($logoutLink.length) {
                $linkToClone = $logoutLink;
            }
        }

        let $elToAppend = $();
        if ($linkToClone.length) {
            $(this).removeAttr("hidden");
            $elToAppend = $linkToClone.clone(true, true);
            $elToAppend.addClass("sr-only sr-only-focusable");
            $elToAppend.removeAttr("id");
        }

        if ($elToAppend.length) {
            return $elToAppend;
        }
        return false;
    });

});

function getBrowserDimension()
{
	return {
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	};
}

var smartphoneWidth = 768;
function isSmartphoneWidth(checkWidth)
{
	width = 0;
	ret = false;

	if (checkWidth !== null && typeof checkWidth !== 'undefined' && parseInt(checkWidth) !== Number.NaN) {
		width = checkWidth;
	} else {
		dim = getBrowserDimension();
		width = dim.width;
	}

	if (width < smartphoneWidth) {
		ret = true;
	}

	return ret;
}

"use strict";

addTolisteners('job_merker', {
	name: 'standard',
	method: function () {

		/********** jobad mark delete **********/
		$('.delete_jobad_mark').on("click", function () {
			var jobadCode = $(this).data('jobad-code');
			var modalData = {
				headline: translations.jobmerker_question_title,
				content: translations.jobmerker_message_question_jobad_mark_deletion,
				buttons: [
					{
						content: translations.general_no,
						dismiss: true,
						primary: false
					},
					{
						content: translations.general_yes,
						dismiss: true,
						primary: true,
						callback: function () {
							try {
								$.post(
										'inc/jobmerker.php',
										{
											ajax_deleteJobadBookmark: true,
											jobadCode: jobadCode,
											_csrf_token: window.globalConstants.csrfToken
										}
								).done(function () {
									jobMarkRemoveFromList(jobadCode);
								}).fail(function () {
									throw new Error(jobadCode);
								});
							} catch (e) {
								console.log('Jobad mark delte post:' + e.message);
							}
						}
					}
				]
			};

			showStandardModal(modalData);
		});

		/**
		 * remove item from table by jobad code
		 * @param jobadCode
		 */
		function jobMarkRemoveFromList(jobadCode) {
			var item = $('span[data-jobad-code="' + jobadCode + '"]');
			if (item.length > 0) {
                manageFocusAndDeleteItem(item.closest("tr"), ".delete_jobad_mark", emptyTableCheck);
			}
		}

		function emptyTableCheck() {
			var $jobMerkerTable = $('[data-job-merker-table]');
			var $jobMerkerTableRows = $jobMerkerTable.find('[data-job-merker-item-row]');

			if (!$jobMerkerTableRows.length) {
				var $jobMerkerTableEmptyRow = $jobMerkerTable.find('[data-job-merker-empty-row]');
				$jobMerkerTableEmptyRow.removeClass('hidden');
			}
		}
	}
});

addTolisteners(['jobabo', 'jobabo_edit'], {
    name: 'standard_jobabo',
    method: function () {
        var $jobaboForm = $('.js-jobabo-form').first();
        if ($jobaboForm.length) {
            var $jobaboFormSubmitBtn = $jobaboForm.find('.js-jobabo-form-submit-btn').first();

            $jobaboForm.find('#jobabo-search-physical-location-autocomplete').on('jbcsuggestgeojson_change_input_value', function () {
                /**
                 * Empty geo coordinates on change. These will be set by the callback function.
                 */
                gjb_resetGeoSuggestCoordinates();
                $(this).on('blur', function () {
                    /**
                     * Reset input that not match to _prepareDataPostalCode or _prepareDataLocationName (see jquery.jobboard.criterion.suggest.geojson.js)
                     * HINT: Eventlistener can only be added here, otherwise the eventlistener of jquery.jobboard.criterion.suggest.geojson.js will not be set.
                     * If later avalibe in gjb use this call:
                     * .on('jbcsuggestgeojson_reset', function () {
                     *    gjb_resetGeoSuggestCoordinates();
                     *  });
                     */
                    if (/^([0-9]{1,4})$/.test($(this).val().trim())) {
                        $(this).data('jobboardJobboardCriterionSuggestGeojson').reset();
                        gjb_resetGeoSuggestCoordinates();
                    };
                });
            }).on('jbcsuggestgeojson_change', function () {
                if (false === !!$(this).val()) {
                    /**
                     * Reset geo coordinates if field is empty and disable radius input.
                     * If later avalibe in gjb remove this part / use jbcsuggestgeojson_reset for gjb_resetGeoSuggestCoordinates
                     */
                    $(this).data('jobboardJobboardCriterionSuggestGeojson').reset();
                    gjb_resetGeoSuggestCoordinates();
                }
            });

            // Disable the "submit" button on click to prevent duplicated POSTs to be sent to the server
            if ($jobaboFormSubmitBtn.length) {
                $jobaboForm.on('submit', function () {
                    $jobaboFormSubmitBtn.on('mousedown', function () {
                        $(this).prop('disabled', true).addClass('disabled');
                    });
                    if (false === !!$jobaboForm.find('#jobabo-search-physical-location-autocomplete').val() ||
                        false === !!$jobaboForm.find('#search_criterion_longitude').val() ||
                        false === !!$jobaboForm.find('#search_criterion_latitude').val()) {
                        /**
                         * ignore incomplete input combination of coordinates and label
                         */

                        let criteria = $jobaboForm.find('#jobabo-search-physical-location-autocomplete').data('jobboardJobboardCriterionSuggestGeojson')

                        if (criteria !== undefined) {
                            criteria.reset();
                        }
                        gjb_resetGeoSuggestCoordinates();
                    }
                });
            }
        }

        /**
         * Enables/Disables form controls based on `radio` control selection
         */
        $("[data-js-toggle-scope]").each(function() {
            const $container = $(this);
            const $radios = $("[data-js-toggle-watch]");
            const $initiallyActiveRadio = $radios.filter(":checked");

            // To hide the mandatory field indicator for email if RSS type is selected
            const $fldMandatoryIndicators = $container.find("[data-mandatory-indicator-placeholder]");
            $fldMandatoryIndicators.each(function () {
                const $formGroup = $(this).closest(".form-group");
                const $formControl = $formGroup.find(":input:visible:not(:button)").first();
                const allowedValue = $formControl.attr("data-js-toggle-enabled-for");
                $(this).attr("data-js-toggle-visible-for", allowedValue);
            });

            toggleFormControls.call($initiallyActiveRadio);
            $radios.on("change", toggleFormControls);

            function toggleFormControls() {
                const $radio = $(this);
                const radioValue = $radio.val();
                const $elementsToToggle = $container.find("[data-js-toggle-enabled-for]");
                $elementsToToggle.each(function() {
                    const $elToToggle = $(this);
                    const allowedValue = $elToToggle.attr("data-js-toggle-enabled-for");
                    $elToToggle.prop("disabled", !(allowedValue === radioValue));
                });
                const $elementsToToggleVisibility = $container.find("[data-js-toggle-visible-for]");
                $elementsToToggleVisibility.each(function() {
                    const $elToToggle = $(this);
                    const allowedValue = $elToToggle.attr("data-js-toggle-visible-for");
                    $elToToggle.prop("hidden", !(allowedValue === radioValue));
                });
            }
        });
    }
});

/*******************************************************************************
 * global variable
 * to save if search was started
 * task: to avoid page jumping on clicking the pagination or sort
*******************************************************************************/
addTolisteners('jobabo_overview', {
	name: 'jobabo_overview',
	method: function () {
		$('.js-delete-jobabo').on("click", function (event) {
			event.preventDefault();
			var obj = $(event.currentTarget);
			var jobaboItem = obj.closest('.jobabo-item');
			var id = obj.data('id');
			var _csrf_token = $("#_csrf_token").val();
			if (id != null) {
				var modalData = {
					headline: translations.jobabo_delete_jobmarker_headline,
					content: translations.jobabo_delete_jobmarker,
					buttons: [
						{
							content: translations.general_no,
							dismiss: true,
							primary: false
						},
						{
							content: translations.general_yes,
							dismiss: true,
							primary: true,
							callback: function () {
								$.post(
										'index.php',
										{
											ac: 'jobabo',
											action: 'delete',
											jobabo_code: id,
											_csrf_token: _csrf_token
										},
										function (data) {
											if (data != 'ERROR') {
												/**
												 * Remove search result for this jobabo if exists
												 */
												if (id === $('.jobboard-container').data('code')) {
													$('.jobboard-container').remove();
												}

                                                manageFocusAndDeleteItem(jobaboItem, ".js-delete-jobabo", function() {
                                                    if ($('#jobabo-list .jobabo-item').length == 0) {
                                                        $('#empty-list').removeClass('hidden');
                                                    }
                                                });
											} else {
												alert(translations.jobabo_invalid_csrf);
											}
										}
								);

								
							}
						}
					]
				};

				showStandardModal(modalData);
			}
		});

		$('.js-jobabo-overview-search').on("click", function(e) {
			e.preventDefault();
			var $jobaboItemTableRow = $(this).closest('.jobabo-item');
			var $searchContainerPlaceholder = $('#jobabo-overview-search');
			var searchCriteria = $jobaboItemTableRow.data('search-criterion');
			var searchLocation = $jobaboItemTableRow.data('search-location');

			// Make jobabos table row active (+ reset others)
			$jobaboItemTableRow.closest('table').find('tr').removeClass('active');
			$jobaboItemTableRow.addClass('active');

			// Save $('.jobboard-container') template container as a global variable
			if(!window.$searchContainer) {
				window.$searchContainer = $searchContainerPlaceholder.find('.jobboard-container');

				window.$searchContainer.find('.js-gjb-hits').text('0');
				window.$searchContainer.detach();
				$searchContainerPlaceholder.removeClass('hidden');
			}

			// Remove existing $('.jobboard-container') containers and clone the new one from the template
			$('.jobboard-container').remove();
			var $newSearchContainer = window.$searchContainer.clone();

			// Prepare the search section
			$searchContainerPlaceholder.append($newSearchContainer);
			$newSearchContainer.data('code', $jobaboItemTableRow.data('code'));
			$searchContainerPlaceholder.find('.js-search-title').html($jobaboItemTableRow.data('title'));

			// Initialize $('.jobboard-container') and search...
			gjb_initJobaboOverviewSearch(searchCriteria, searchLocation);
		});
	}
});

"use strict";

const importPanelHtml = `
<div class="panel panel--muz panel-default">
  <h3 class="panel-heading">
    <button type="button" class="panel-heading__inner panel-heading__inner--toggle-btn collapsed" data-toggle="collapse" data-target="#panel-muz-651ff839980bc" aria-controls="panel-muz-651ff839980bc" aria-expanded="false">
            <span class="panel-title-container">
                <span class="panel-title">${translations.general_modal_panel_heading}</span>
            </span>
      <span class="panel-toggle-icon" aria-hidden="true"></span>
    </button>
  </h3>
  <div id="panel-muz-651ff839980bc" class="collapse">
    <div class="panel-body">
      <table class="table">
        <thead>
        <tr>
          <th>${translations.general_modal_table_heading}</th>
          <th>${translations.general_modal_table_body}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>${translations.general_modal_table_tr_personal_heading}</td>
          <td>${translations.general_modal_table_tr_personal_body}</td>
        </tr>
        <tr>
          <td>${translations.general_modal_table_tr_porsche_heading}</td>
          <td>${translations.general_modal_table_tr_porsche_body}</td>
        </tr>
        <tr>
          <td>${translations.general_modal_table_tr_training_heading}</td>
          <td>${translations.general_modal_table_tr_training_body}</td>
        </tr>
        <tr>
          <td>${translations.general_modal_table_tr_experience_heading}</td>
          <td>${translations.general_modal_table_tr_experience_body}</td>
        </tr>
        <tr>
          <td>${translations.general_modal_table_tr_qualification_heading}</td>
          <td>${translations.general_modal_table_tr_qualification_body}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

addTolisteners(['jobad', 'layoutcheck'], {
	name: 'jobad-standard',
	method: function () {
		/*	Jobad initialize
		================================================================== */
		// Do not trigger in BE preview or external boards
		if (!$(document.body).hasClass('fl-jobad-external-preview')) {
			initJobadStatisticsAndApplyBtn();
			initJobadCollapsiblePanels();
			disableButtonsForExpiredJobad();
            disableShareButtonForHiddenJobad();
            activateErrorModal();
            handleCheckErrorAfterReload();
		}

		// Trigger in any case
		initJobadBenefits();
	}

});


/* ==========================================================================
	Init base functions - statistics and apply button
========================================================================== */
function initJobadStatisticsAndApplyBtn() {

	// Only for Frontend ac=jobad (no BE or externals)
	var fl_shouldCountApplyStatistics = $('input[name=count_apply]').val();
	var fl_shouldCountViewStatistics = $('input[name=count_click]').val();

	// Write jobad view statistics
	if (fl_shouldCountViewStatistics) {
		countJobadView($('input[name=click_hash]').val());
	}

	// Assign jobad apply button
	var applyButtonsSelector = '.js-button-apply';

	/**
	 * Special apply-button handling for external usage (iframe content)
	 */
	if (window.globalConstants.viewExternal) {
		/**
		 * Convert button-tag to a-tag
		 */
		$(applyButtonsSelector).each(function() {
			let attributes = {
				"target": "_blank"
			};
			let buttonAttributes = $(this).prop('attributes');
			$.each(buttonAttributes, function() {
				attributes[this.name] = this.value;
			});
			if (!("href" in attributes)) {
				attributes["href"] = getJobAdURL();
			}

			let data = {
				"redirect": false
			};

			let $a = $("<a>").attr(attributes).data(data).html($(this).html());

			$(this).replaceWith($a);
		});
	}

    $(applyButtonsSelector).on('click', function (e, options) {
        if (!this.disabled) {
			options = options || {};

			if (!options.submit) {
                startSapImport(e);
            } else {
				if ($(applyButtonsSelector).data('redirect') === false) {
					if (fl_shouldCountApplyStatistics) {
						countJobadApply($('input[name=apply_hash]').val());
					}
					return true;
				} else {

					// Determine destination (href has the priority, otherwise generate a frontend <button> for the applicationform)
					var redirectUrlHref = $(this).prop('href');
					var redirectUrl = redirectUrlHref;
					if (!redirectUrl) {
						redirectUrl = getJobAdURL();
					}

					if (fl_shouldCountApplyStatistics) {

						// Disable clicked button and all other apply buttons on the page (if there are more)
						var $allApplyButtons = $(applyButtonsSelector);
						$allApplyButtons.addClass('disabled').prop('disabled', true);

						countJobadApply($('input[name=apply_hash]').val(), function() {
							jobadApplyRedirect(redirectUrl);
						});
					} else if (!redirectUrlHref) {
						jobadApplyRedirect(redirectUrl);
					} else {
						// Continue with link href and target="_blank", no need to wait for AJAX request
						return true;
					}
				}
			}
		}

		return false;
	});

	function getJobAdURL() {
		let ac = "login";
		if (window.globalConstants.isLoggedIn) {
			ac = "application";
		}

		let jobadId = parseInt($('input[name=jobad_id]').val(), 10);

		return "?ac=" + ac + "&jobad_id=" + jobadId;
	}

	// Write jobad view statistics
	function countJobadView(hash) {
		$.post('inc/ajax_save_jobad_statistic_view.php', {'hash': hash});
	}

	// Write jobad apply statistics
	function countJobadApply(hash, callback) {
		$.post('inc/ajax_save_jobad_statistic_apply.php', {'hash': hash}, callback);
	}

	// Apply link destination
	function jobadApplyRedirect(redirectUrl) {
		window.location.href = redirectUrl;
	}

    function startSapImport(e) {
        e.preventDefault();
        let checkResponse;

        if (
            !isIntranet
            || !e.currentTarget.classList.contains('include_apply_link')
        ) {
            return $(e.currentTarget).trigger(e.type, {'submit': true});
        }

        const response = $.ajax({
            type: 'POST',
            url: '/sapHrCheck',
            async: false
        });

        if (response.status !== 200) return handleCheckError();

        checkResponse = jQuery.parseJSON(response.responseText);

        if (checkResponse.checkError) {
            handleCheckError();
        } else if (checkResponse.success) {
            if (checkResponse.application_without_import) {
                $(e.currentTarget).trigger(e.type, {'submit': true});
            } else {
                sessionStorage.removeItem("check-errors-before");
                showSuccessModal(checkResponse);
            }
        } else {
            $(e.currentTarget).trigger(e.type, {'submit': true});
        }
    }

    function handleCheckError() {
        const errorAgain = parseSessionStrorageItem("check-errors-before");

        if (errorAgain >= 2) {
            showStandardModal({
                "headline": translations.general_fail,
                "content": translations.general_fail_text,
                "buttons": [
                    {
                        "content": translations.general_continue_to_application,
                        "dismiss": true,
                        "primary": true,
                    }
                ],
            });
        } else {
            sessionStorage.setItem("check-error", "true");
            location.reload();
        }
    }

    function showSuccessModal(checkResponse) {
        const modalData = {
            "headline": checkResponse.modal.subject,
            "content": checkResponse.modal.text + importPanelHtml,
            "buttons": [
                {
                    content: translations.general_with_import,
                    dismiss: true,
                    primary: true,
                    callback: function () {
                        const jobadId = parseInt($('input[name=jobad_id]').val(), 10);
                        window.location.href = '/sapHrConfirm?jobadId=' + jobadId
                    }
                }
            ]
        };
        showStandardModal(modalData);
    }
}

/* ==========================================================================
	Enable panels (not for external boards)
========================================================================== */
function initJobadCollapsiblePanels() {
    $(getElementsByHookName('panel--to-close-on-init')).find('.collapse').collapse('hide');
    $(getElementsByHookName('panel--is-collapsibility-switchable'))
        .removeClass('panel--collapsibility-disabled')
        .find('.collapse').collapse('show');
}

/* ==========================================================================
	Initialize benefit popovers
========================================================================== */
function initJobadBenefits() {
	var benefitIconSelector = '.js-benefit-popover-trigger';
	$(benefitIconSelector).attr('tabindex', '0').popover({
		trigger: 'focus hover', // Note: Benefit item must be focusable HTML element e.g. anchor, button, input. Don't combine 'focus click' together
		animation: true,
		placement: 'top',
		container: ($('main').length > 0) ? 'main' : document.body,
		template: '<div class="popover benefits-popover" role="tooltip"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"></div></div></div>'
	});
}

/* ==========================================================================
	disable share and bookmark buttons if jobad expired
========================================================================== */
function disableButtonsForExpiredJobad() {
	var fl_shouldDisableButtons = $('input[name=is_versioned_html]').val();
	if (fl_shouldDisableButtons) {
		var buttonSelectors = ['.js-mark-jobad', '.js-share-jobad', '.js-button-apply'];
		buttonSelectors.forEach(function (selector) {
			$(selector).attr('disabled', 'disabled');
			$(selector).addClass('disabled');
		});
	}
}

/* ==========================================================================
    Disable share button if jobad is hidden (Advertisement Type: "Job ad for no publishing")
========================================================================== */
function disableShareButtonForHiddenJobad() {
    const isHiddenPublication = $('input[name=is_hidden_publication]').val();
    if (isHiddenPublication) {
        $('.js-share-jobad').each(function () {
            $(this)
                .attr('disabled', 'disabled')
                .addClass('disabled');
        });
    }
}

/* ==========================================================================
    If coming from search_result, then restore last search if returning back in browser
    * https://stackoverflow.com/questions/30526811/change-the-back-button-url-in-browser
    * HINT: Execute before other listeners to have it available as fast as possible
========================================================================== */
(function setReturnUrlToRestoreLastSearch() {
    if ($(document.body).hasClass('jobad')
        && !$(document.body).hasClass('fl-jobad-external-preview')
    ) {
        if (window.history && window.history.pushState) {
            const referrer = document.referrer;
            if (referrer
                && referrer.length
                && (0 < referrer.indexOf("ac=search_result"))
            ) {
                const urlToRestoreSearch = document.location.pathname + '?ac=search_result&restoreLastSearch=1';
                history.pushState(null, null, document.location.href);
                window.addEventListener('popstate', function () {
                    if(!window.location.hash) {
                        document.location.href = urlToRestoreSearch;
                    }
                });
            }
        }
    }
})();

function activateErrorModal() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('import-error') === 'true') {
        showStandardModal({
            "headline": translations.general_import_fail,
            "content": translations.general_import_fail_text,
            "buttons": [
                {
                    "content": translations.general_continue_to_application,
                    "dismiss": true,
                    "primary": true,
                }
            ],
            "hide": () => {
                urlParams.delete('import-error')
                window.history.replaceState(null, '', 'index.php?' + urlParams.toString())
            }
        })
    }
}

function handleCheckErrorAfterReload() {
    const checkError = parseSessionStrorageItem("check-error");
    let checkErrosBefore = parseSessionStrorageItem("check-errors-before") ?? 0;

    if (checkError) {
        sessionStorage.removeItem("check-error");
        sessionStorage.setItem("check-errors-before", (++checkErrosBefore).toString());
        document.querySelector(".js-button-apply").click();
    }
}

function parseSessionStrorageItem (itemName) {
    return JSON.parse(sessionStorage.getItem(itemName));
}

/* global option, marker, google, G */

"use strict";

addTolisteners('layoutcheck', {
    name: 'standard',
    method: function() {
        // Popover examples (excl. benefits and form label popovers)
        $('[data-toggle="popover"]').popover();

        // Maps
        initOSMMap();
        initGoogleMap();

        // Modals
        initModals();

        // Selectize
        initSelectize();
    }
});

/********** Modals **********/
function initModals() {
    var modalTitle = 'Really want to do it?';
    var modalContent = '<p>It shows a modal in a respecive size.<br>' +
        'Small modal can have block buttons (edge-to-edge)' +
        '<br><br>' +
        'For more see <code>layoutcheck.js</code></p>';

    var modalData = {
        headline: modalTitle,
        content: modalContent,
        buttons: [
            {
                content: translations.general_close_dialog,
                dismiss: true,
                primary: false
            },
            {
                content: translations.general_ok,
                dismiss: true,
                primary: true
            }
        ]
    };
    var modalDataSm = {
        className: 'modal-sm',
        headline: modalTitle,
        content: modalContent,
        buttons: [
            {
                content: translations.general_ok,
                className: 'btn-block',
                dismiss: true,
                primary: true
            },
            {
                content: translations.general_close_dialog,
                className: 'btn-block',
                dismiss: true,
                primary: false
            }
        ]
    };
    var modalDataLg = {
        className: 'modal-lg',
        headline: modalTitle,
        content: modalContent,
        buttons: [
            {
                content: translations.general_close_dialog,
                dismiss: true,
                primary: false
            },
            {
                content: translations.general_ok,
                dismiss: true,
                primary: true
            }
        ]
    };
    var modalDataReuseExistingNext = {
        headline: 'Next modal title',
        content: 'This is another modal. There is a different button and a different title.',
        useExistingOpenedModal: true,
        buttons: [
            {
                content: translations.general_back,
                dismiss: true,
                primary: false,
                callback: function() {
                    showStandardModal(modalDataReuseExisting);
                }
            },
            {
                content: translations.general_close_dialog,
                dismiss: true,
                primary: true
            }
        ]
    };
    var modalDataReuseExisting = {
        headline: 'Modal inside of a modal',
        content: '<strong>Reuse existing modal.</strong><br>' +
            '(1) When clicked the primary button the modal should not close! The headline, content and buttons should get exchanged.<br>' +
            '(2) If any of the modals is closed the focus should be on the button which was used to open the initial modal.' +
            '<br><br>' +
            'Confirm to load the content of the next modal inside of the currently opened one.',
        useExistingOpenedModal: true, // This here is not required but I put it because of 'back' button in the next modal
        buttons: [
            {
                content: translations.general_close_dialog,
                dismiss: true,
                primary: false
            },
            {
                content: translations.general_next,
                dismiss: true,
                primary: true,
                callback: function() {
                    showStandardModal(modalDataReuseExistingNext);
                }
            }
        ]
    };
    var modalDataModalFromModal = {
        headline: 'Modal call from a modal',
        content: '<strong>Open another modal from an existing modal.</strong><br>' +
            '(1) Page title is now the headline of the currently opened modal.<br>' +
            '(2) When another modal is opened the page title should update.<br>' +
            '(3) When another modal is closed the page should revert to the initial state.<br>' +
            '(4) When another modal is closed the focus should be on the button which used to open the initial modal.' +
            '<br><br>' +
            'Confirm to open another modal.',
        buttons: [
            {
                content: translations.general_close_dialog,
                dismiss: true,
                primary: false
            },
            {
                content: translations.general_ok,
                dismiss: true,
                primary: true,
                callback: function() {
                    showStandardModal(modalData);
                }
            }
        ]
    };
    var modalDataContentInjection = {
        headline: 'Modal call from a modal',
        content: $('#modal-content-to-inject'),
        buttons: [
            {
                content: translations.general_close_dialog,
                dismiss: true,
                primary: false
            },
            {
                content: translations.general_ok,
                dismiss: true,
                primary: true
            }
        ]
    };
    var modalDataWithoutBackdrop = {
        headline: 'Modal without a backdrop',
        content: 'This modal has no backdrop',
        backdrop: false,
        buttons: [
            {
                content: translations.general_ok,
                dismiss: true,
                primary: true
            }
        ]
    };
    var modalDataWithStaticBackdrop = {
        headline: 'Modal with static backdrop and ESC key disabled',
        content: '(1) Static backdrop prevents closing the modal on click (<code>backdrop: "static"</code>).<br>' +
            '(2) Also it cannot be closed by pressing ESC key (<code>keyboard: false</code>)',
        backdrop: 'static',
        keyboard: false,
        buttons: [
            {
                content: translations.general_ok,
                dismiss: true,
                primary: true
            }
        ]
    };

    $('[data-hook=showStandardModal]').on('click', function() {
        showStandardModal(modalData);
    });
    $('[data-hook=showStandardModalSm]').on('click', function() {
        showStandardModal(modalDataSm);
    });
    $('[data-hook=showStandardModalLg]').on('click', function() {
        showStandardModal(modalDataLg);
    });
    $('[data-hook=modalDataReuseExisting]').on('click', function() {
        showStandardModal(modalDataReuseExisting);
    });
    $('[data-hook=modalDataModalFromModal]').on('click', function() {
        showStandardModal(modalDataModalFromModal);
    });
    $('[data-hook=modalDataContentInjection]').on('click', function() {
        showStandardModal(modalDataContentInjection);
    });
    $('[data-hook=modalDataWithStaticBackdrop]').on('click', function() {
        showStandardModal(modalDataWithStaticBackdrop);
    });
    $('[data-hook=modalDataWithoutBackdrop]').on('click', function() {
        showStandardModal(modalDataWithoutBackdrop);
    });
    $('[data-hook=modalDataLoading]').on('click', function() {
        showLoadingModal(
            'I am loading now and this will dismiss in a few seconds',
            window.translations.general_please_wait
        );
        setTimeout(function () {
           hideLoadingModal();
        }, 5000);
    });
}

/********** Maps **********/
function initOSMMap() {
    // All locations
    var markerLocations = [
        {
            lng: 5.5,
            lat: 49.5
        },
        {
            lng: 9.5,
            lat: 50.5
        },
        {
            lng: 10.5,
            lat: 50.5
        },
        {
            lng: 11.6,
            lat: 50.5
        },
        {
            lng: 11.6,
            lat: 50.5
        },
        {
            lng: 11.6,
            lat: 50.5
        },
        {
            lng: 5.5,
            lat: 49.5
        },
        {
            lng: 9.5,
            lat: 50.5
        },
        {
            lng: 10.5,
            lat: 50.5
        },
        {
            lng: 11.6,
            lat: 50.5
        },
        {
            lng: 11.6,
            lat: 50.5
        },
        {
            lng: 11.6,
            lat: 50.5
        },
        {
            lng: 12.6,
            lat: 50.5
        },
        {
            lng: 12.8,
            lat: 50.5
        },
        {
            lng: 13,
            lat: 50.5
        }
    ];

    // Openstreet map options
    var mapOptions = {
        attributionControl: false,
        zoom: 3,
        minZoom: 2,
        maxZoom: 16,

        // Interaction options
        scrollWheelZoom: true,

        // Control options
        zoomControl: false,
        worldCopyJump: true
    };

    // Set the center of the map (first item from locations list)
    mapOptions.center = L.latLng(markerLocations[0].lat, markerLocations[0].lng);

    // Render map
    var Lmap = L.map('map-openstreet', mapOptions);

    // Add an OpenStreetMap tile layer
    L.tileLayer(
            '//{s}.tiles.osmserver.milchundzucker.de/osm_tiles_colour/{z}/{x}/{y}.png',
            {
                maxZoom: mapOptions.maxZoom,
                subdomains: 'abcd',
                detectRetina: true
            }
    ).addTo(Lmap);

    L.control.attribution({
        prefix: '&copy; <a href="//www.openstreetmap.org/copyright/de" target="_blank">OpenStreetMap-Mitwirkende</a>'
    }).addTo(Lmap);

    // Create a new MarkerClusterGroup
    var cluster = L.markerClusterGroup({
        maxClusterRadius: 50, // A cluster will cover at most this many pixels from its center (Default = 80)
        iconCreateFunction: function (cluster) { // (Default = null)
            var c = cluster.getAllChildMarkers();
            var favoriteFlag = false;
            var locationFlag = false;
            var locationCount = 0;
            var count = cluster.getChildCount();
            var className = "jb-osm-icon-cluster";

            $(c).each(function () {
                if (parseInt(this.options.favoriteJobIndicator) === 1) {
                    favoriteFlag = true;
                    return false;
                }
                if (this.options.locationIndicator) {
                    locationFlag = true;
                    locationCount++;
                }
            });

            // Subtract location
            if (locationFlag) {
                count = count - locationCount;
            }
            // Special favorite icon
            if (favoriteFlag) {
                className += " jb-osm-icon-cluster-favorite";
            }
            if (count >= 10 && count < 1000) {
                className += " jb-osm-icon-cluster-middel";
            } else if (count >= 1000) {
                className += " jb-osm-icon-cluster-big";
            } else {
                className += " jb-osm-icon-cluster-small";
            }

            return new L.DivIcon({
                html: count < 1 ? '' : count,
                className: className,
                iconSize: new L.Point(40, 80)
            });
        },
        spiderfyOnMaxZoom: true
    });

    // Add markers
    var arrayOfLatLngs = [];
    var markerContent = '<h4><a href="javascript:void(0);" role="button" target="_blank">Trainee</a></h4><p>Trainee (m/w/d) im Bereich Personalentwicklung und Talentstrategie</p>';
    for (var i = 0; i < markerLocations.length; i++) {
        var mapMarkerLatLng = L.latLng(markerLocations[i].lat, markerLocations[i].lng);
        arrayOfLatLngs.push(mapMarkerLatLng);

        var markerOptions = {
            icon: L.icon({
                iconUrl: window.globalConstants.pathImages + 'map/img-map-pin.svg',
                iconRetinaUrl: window.globalConstants.pathImages + 'map/img-map-pin.svg',
                iconSize: [30, 30]
            }),
            favoriteJobIndicator: true
        };
        var marker = L.marker(mapMarkerLatLng, markerOptions);

        marker
            .on('click', function (event) {
                this.closePopup();
                this.unbindPopup();
                this.bindPopup(L.popup());
                this.setPopupContent(markerContent);
                this.openPopup();
            })
        cluster.addLayer(marker);
    }

    Lmap.addLayer(cluster);

    // Center map to see all markers in the map view
    if (markerLocations.length > 1) {
        var mapBounds = new L.LatLngBounds(arrayOfLatLngs);
        Lmap.fitBounds(mapBounds);
    }
}

function initGoogleMap() {
    var marker;
    var markerTitle = '<h4 class="layoutcheck-google-map">Trainee</h4> <p>Trainee (m/w/d) im Bereich Personalentwicklung und Talentstrategie</p>';
    var markerIcon = window.globalConstants.pathImages + 'map/img-map-pin.svg';
    var infoWindow = new google.maps.InfoWindow();

    var clusterMarkers = [
        new google.maps.Marker({
            position: new google.maps.LatLng(53.3, 13.8),
            icon: markerIcon,
            title: markerTitle
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(53.3, 13),
            icon: markerIcon,
            title: markerTitle
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(51.3, 13.8),
            icon: markerIcon,
            title: markerTitle
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(51.3, 13),
            icon: markerIcon,
            title: markerTitle
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(52.3, 11.5),
            icon: markerIcon,
            title: markerTitle
        })
    ];

    var gm_map = new google.maps.Map(
        document.getElementById('map-google'),
        {
            minZoom: 2,
            zoom: 5,
            center: new google.maps.LatLng(51.3, 13.4),
            maxZoom: 16
        }
     );

    var options_markerclusterer = {
        gridSize: 20,
        maxZoom: 20,
        zoomOnClick: false,
        styles: [
            {
                url: 'assets/images/map/img-cluster-sma.png',
                height: 46,
                width: 72,
                anchor: [23, 0],
                textColor: '#fff',
                textSize: 14
            },
            {
                url: 'assets/images/map/img-cluster-mid.png',
                height: 56,
                width: 87,
                anchor: [28, 0],
                textColor: '#fff',
                textSize: 14
            },
            {
                url: 'assets/images/map/img-cluster-big.png',
                height: 70,
                width: 116,
                anchor: [59, 0],
                textColor: '#fff',
                textSize: 14
            }
        ]
    };

    var markerCluster = new MarkerClusterer(gm_map, clusterMarkers, options_markerclusterer);

    google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
        var markers = cluster.getMarkers();
        var array = [];
        var num = 0;
        for (i = 0; i < markers.length; i++) {
            num++;
            array.push(markers[i].getTitle() + '<br>');
        }
    });

    for (i = 0; i < clusterMarkers.length; i++) {
        var marker = clusterMarkers[i];
        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                infoWindow.setContent(this.getTitle());
                infoWindow.open(gm_map, this);
            };
        })(marker));
    }
}

function layoutcheckGridColumns(columns, count) {
    var i;
    $('[data-hook="layoutcheck-autoclear"] .row').html('');
    for (i = 0; i < count; i++) {
        $('[data-hook="layoutcheck-autoclear"] .row').append('<div class="col-md-'+columns+'"></div>');
    }
    layoutcheckGridRandomText();
}
function layoutcheckGridToggleAutoclear(e) {
    $(e).toggleClass('btn-primary');
    $(e).toggleClass('btn-default');
    $('[data-hook="layoutcheck-autoclear"] > div').toggleClass('auto-clear');
}
function layoutcheckGridRandomText() {
    $('[data-hook="layoutcheck-autoclear"] div[class*=col-]').each(
        function(){
            $(this).html('');
            var i;
            for (i = 0; i < Math.floor( Math.random() * 200 ); i++) {
                $(this).append('lorem ');
            }
        }
    );
}

function initSelectize() {
    $('.selectize').each(function () {
        var options = {};
        var hideSelected = typeof($(this).data('hide-selected'));
        if (hideSelected !== 'undefined' && hideSelected === 'boolean') {
            options.hideSelected = $(this).data('hide-selected');
        }
        $(this).selectize(options);
    });
}

addTolisteners(['logindata', 'renew_password'], {
	name: 'standard',
	method: function () {
		//delete user account
		$('#js-delete-account').on('submit', function (e) {
			showDeleteAccountModal();
			return false;
		});

		function showDeleteAccountModal() {
			//first button in array must always have index 0!
			var modalData = {
				headline: translations.logindata_delete_account,
				content: translations.logindata_confirm_deletion,
				buttons: [
					{
						content: translations.general_yes,
						dismiss: false,
						primary: false,
						callback: function(e) {
							// unbind not to trigger onsubmit again
							$(e.target).addClass('disabled').prop('disabled', true);
							$('.js-deleteAccountModal-no').addClass('disabled').prop('disabled', true);
							$('#js-delete-account').off('submit').trigger("submit");
						}
					},
					{
						// Accessibility: It's probably OK to have a primary button "NO" here because deletion of the account is not a repetitive action so it should not be a problem
						content: translations.general_no,
						className: 'js-deleteAccountModal-no',
						dismiss: true,
						primary: true
					}
				]
			};

			showStandardModal(modalData);
		}
	}
});

addTolisteners('logindata', {
	name: 'soml_deletion',
	method: function () {
		$('.js-remove-social-media-link').on('click', function () {
			var $this = $(this);
			var networkId = $this.data('socialNetworkId');
			var _csrf_token = $("form#logindata").find("input[name='_csrf_token']").val();

			var fl_userAccountHasPasswordCreated = $this.closest('table').attr('data-user-account-has-password');
			let title = $this.attr('title')
			if (title === "") {
				title = $this.find('.sr-only').html()
			}
			if($('.js-remove-social-media-link').length <= 1 && !fl_userAccountHasPasswordCreated) {
				// Cannot delete your only network
				var modalDataSomlDeleteNotPossible = {
					"headline": title,
					"content": translations.social_login_delete_access_not_possible,
					"buttons": [
						{
							"content": translations.logindata_delete_account,
							"dismiss": true,
							"primary": false,
							"callback": function () {
								$('#js-delete-account-btn').trigger("click");
							}
						},
						{
							"content": translations.general_cancel,
							"dismiss": true,
							"primary": false
						},
						{
							"content": translations.logindata_generate_password,
							"dismiss": true,
							"primary": true,
							"callback": function () {
								location.href = "index.php?ac=create_password";
							}
						}
					]
				};
				showStandardModal(modalDataSomlDeleteNotPossible);
			}
			else {
				var modalDataSomlDelete = {
					"headline": title,
					"content": translations.social_login_delete_access_confirmation,
					"buttons": [
						{
							"content": translations.general_no,
							"dismiss": true,
							"primary": false
						},
						{
							"content": translations.general_yes,
							"dismiss": true,
							"primary": true,
							"callback": function () {
								$.post('index.php',
									{
										'ac': 'remove_social_media_link',
										'_csrf_token': _csrf_token,
										'link_id': networkId
									},
									function (data) {
										if (data.status === "ok") {
											location.reload();
										} else {
											var modalDataError = {
												"headline": translations.general_error_message,
												"buttons": [
													{
													"content": translations.general_ok,
													"dismiss": true,
													"primary": false
													}
												]
											}
											if (data.error === "csrf_error") {
												modalDataError.content = translations.general_invalid_csrf;
											} else {
												modalDataError.content = translations.general_error_message_standard;
											}

											showStandardModal(modalDataError);
										}
									}
								);
							}
						}

					]
				};
				showStandardModal(modalDataSomlDelete);
			}
		
			return false;
		});
	}}
);

addTolisteners("messages", {
    name: "messages",
    method: function () {
        $(getElementsByHookName("message-status-icon")).each(function () {
            if ('undefined' === typeof window.applyFocusVisiblePolyfill) {
                throw new Error('Error: `focus-visible.min.js` polyfill must be loaded before `bootstrap.min.js`.');
            }

            // Note: The clickable trigger is the entire panel heading, while the tooltip is only on the inner icon
            if ("undefined" !== typeof $.fn.tooltip) {
                const $thisIcon = $(this);
                const tooltipContent = $thisIcon.find(".sr-only").text();

                $thisIcon.tooltip({container: "body", title: tooltipContent});

                const $collapsibleParent = $thisIcon.closest(":button[aria-expanded]");
                if ($collapsibleParent.length) {
                    $collapsibleParent.on("focus.msgTooltip", function () {
                        if ($(this).is(".focus-visible")) {
                            $thisIcon.tooltip("show");
                        }
                    });
                    $collapsibleParent.on("blur.msgTooltip", function () {
                        $thisIcon.tooltip("hide");
                    });
                }
            }
        });

        $(getElementsByHookName("message-heading-onclick")).on("click", function () {
            const $messageCont = $(this).closest('[data-message-id]');
            const messageId = $messageCont.attr('data-message-id');

            if ($messageCont.hasClass('message--is-unread') && messageId) {
                $messageCont.removeClass('message--is-unread');

                $.post(
                    "index.php",
                    {
                        ac: "messages",
                        sub_ac: "set_read",
                        id: messageId,
                        _csrf_token: window.globalConstants.csrfToken
                    }
                );

                const $msgStatusIcon = $(getElementsByHookName("message-status-icon"));
                if ($msgStatusIcon.length && ("undefined" !== typeof $.fn.tooltip)) {
                    $msgStatusIcon.tooltip("hide");
                }
            }
        });

        $("[data-js-remove-message]").on("click", function () {
            const $messageItem = $(this).closest("tr");
            const messageId = $(this).attr("data-message-id");
            if (messageId) {
                const modalData = {
                    headline: translations.messages_delete_title,
                    content: translations.messages_delete_content,
                    buttons: [
                        {
                            content: translations.general_no,
                            dismiss: true,
                            primary: false
                        },
                        {
                            content: translations.general_yes,
                            dismiss: true,
                            primary: true,
                            callback: function () {
                                $.post(
                                    "index.php",
                                    {
                                        ac: "messages",
                                        sub_ac: "remove",
                                        id: messageId,
                                        _csrf_token: window.globalConstants.csrfToken
                                    }
                                ).done(function () {
                                    manageFocusAndDeleteItem($messageItem, "[data-js-remove-message]");
                                }).fail(function () {
                                    showGeneralErrorMessage();
                                });
                            }
                        }
                    ]
                };

                showStandardModal(modalData);
            }
        });

        $("[data-js-set-colspan]").setColspan();
    }
});

addTolisteners(["privacy_statements"], {
    name: "privacy_statements",
    method: function () {
        $(".js-privacy-statements-show").on("click", function (event) {
            event.preventDefault();

            let privacyStatementId = $(this).attr("href");
            let $privacyStatement = $(privacyStatementId);

            let privacyStatementTitle = $privacyStatement.children(".js-privacy-statements-title").text();
            let privacyStatementText = $privacyStatement.children(".js-privacy-statements-text").html();

            showStandardModal({
                "className": 'modal-lg',
                "disableFocusOnShown": true,
                "headline": privacyStatementTitle,
                "content": privacyStatementText,
                "buttons": [
                    {
                        "content": translations.general_ok,
                        "dismiss": true,
                        "primary": true
                    }
                ]
            });
        });
    }
});

addTolisteners('search_result', {
	name: 'standard_search_result',
	method: function () {
		/*	Init
		========================================================================== */
		$(window).on('resize', onSearchFormResize, 250);
		onSearchFormResize();

		// Disable form submit, only perform search via AJAX
		$('.js-job-search-form').on('submit', function(e) {
			window.location.href = "#skip-to-search-result-heading";
			e.preventDefault();
			return false;
		});

		// Button to generate jobabo from the current search
		$('.js-btn-create-jobabo').on('click', function (e) {
			// Since now the URL is getting updated, another idea would be just to take this dinamically generated URL
			var urlParams = gjb_getUrlParamsFromTheForm();
			if (typeof urlParams !== typeof undefined) {
				document.location.href = window.globalConstants.urlBase + 'index.php?ac=jobabo&use_criterions=true&' + urlParams;
			}
		});

        /**
         * infinite scroll for search results
         */
        if (window.globalConstants.layout === "terminal") {
            infiniteScroll().init();
        }
	}
});

/*	Resize actions (make search panel collapsible or the opposite)
========================================================================== */
function onSearchFormResize() {
    if (window.viewportBeforeResize !== getView()) {
        const $panel = $(getElementByHookName('sidebar-search-panel'));
        const collapsibiltiyDisabledClass = 'panel--collapsibility-disabled';

        const newViewport = getView();
        if (newViewport === 'xs') {
            $panel.removeClass(collapsibiltiyDisabledClass);
            $panel.find('.collapse').collapse('hide');
        } else if (newViewport === 'sm') {
            $panel.removeClass(collapsibiltiyDisabledClass);
            $panel.find('.collapse').collapse('show');
        } else if((newViewport === 'md' || newViewport === 'lg')) {
            $panel.addClass(collapsibiltiyDisabledClass);
            $panel.find('.collapse').collapse('show');
        }
        window.viewportBeforeResize = newViewport;
    }

    // If google map is set, resize it after display resize
    if($(':jobboard-jobboardGoogleMap').length > 0) {
        $(':jobboard-jobboardGoogleMap').jobboardGoogleMap('resize');
    }
}


let infiniteScroll = function () {

    let config = {
        "jobboardContainerSelector": ".jobboard-container",
        "jobboardInstanceSelector": ":jobboard-jobboardContainer",
        "jobboardPerPageSelector": "#paginationControl-bottom",
        "noticeSelector": "[data-js-hook='infiniteScrollNotice']",
        "spinnerSelector": "[data-js-hook='infiniteScrollSpinner']",
        "timeout": 500,
        "triggerSelector": "[data-js-hook='infiniteScrollTrigger']"
    }

    let state = {
        "itemsPerPage": 0,
        "loading": false,
        "page": 0,
        "pages": 0,
        "resultCount": 0
    }

    function init(customConfig) {
        if (typeof customConfig === "object") {
            $.extend(config, customConfig);
        }

        initResultChangeHandler();
        initScrollHandler();
    }

    function getCurrentContainerWidget() {
        let $jobboardInstance = $(config.jobboardInstanceSelector);
        return $jobboardInstance.jobboardContainer('option', 'current');
    }

    function setCurrentContainerWidget(currentContainerWidget) {
        let $jobboardInstance = $(config.jobboardInstanceSelector);
        $jobboardInstance.jobboardContainer('option', 'current', currentContainerWidget);
        $jobboardInstance.jobboardContainer();
    }

    function setStateLoading(loading) {
        state.loading = loading;

        let $notice = $(config.noticeSelector);
        let $spinner = $(config.spinnerSelector);

        $notice.hide();
        $spinner.hide();

        if (state.loading) {
            $spinner.show();
        } else if ((state.page === 1) && (state.pages > 1)) {
            $notice.show();
        }
    }

    function initResultChangeHandler() {
        $(config.jobboardContainerSelector).on("jbcontainerjobresult", function (event, data) {
            let currentContainerWidget = getCurrentContainerWidget();
            state.resultCount = data.SearchResult.SearchResultCountAll;
            state.page = currentContainerWidget.page;
            state.itemsPerPage = parseInt(currentContainerWidget.items_per_page);
            state.pages = Math.ceil(state.resultCount / state.itemsPerPage)

            setStateLoading(false);
        });
    }

    function initScrollHandler() {
        $(window).on("scroll", function () {
            if (
                (state.page === 1)
                && (state.pages > 1)
                && (state.loading === false)
            ) {
                let $trigger = $(config.triggerSelector);
                let triggerPositionTop = $trigger.offset().top || $(document).height();
                let scrollPositionTop = $(window).scrollTop() + $(window).height();
                if (triggerPositionTop < scrollPositionTop) {
                    loadMore();
                }
            }
        });
    }

    function loadMore() {
        setStateLoading(true);

        setTimeout(function () {
            let $jobboardPerPage = $(config.jobboardPerPageSelector);
            let jobboardPerPage = $jobboardPerPage.get(0);

            let index = jobboardPerPage.selectedIndex + 1;
            if (index < jobboardPerPage.length) {
                jobboardPerPage.selectedIndex = index;
            }

            $jobboardPerPage.trigger("change");
        }, config.timeout);
    }

    return {
        "init": init
    };
}

addTolisteners('statuspage', {
	name: 'statuspage',
	method: function () {
		$(function () {
			if (Boolean($('input[name=application_doublet]').val()) == true) {
				showMarkMessage(1);
			}
			if (Boolean($('input[name=application_doublet_onspec]').val()) == true) {
				showMarkMessage(2);
			}
			if (Boolean($('input[name=jobad_inactive]').val()) == true) {
				showMarkMessage(3);
			}
			if (Boolean($('input[name=application_form_failed]').val()) == true) {
				showMarkMessage(4);
			}

			function showMarkMessage(message_id) {
				var modalData = {
					headline: "",
					content: "",
					buttons: [
						{
							content: translations.general_close_dialog,
							dismiss: true,
							primary: false
						}
					]
				};

				switch (message_id) {
					case 1: // message doublet
						modalData.headline = translations.application_doublet_title;
						modalData.content = translations.application_doublet;
						break;
					case 2: // message doublet
						modalData.headline = translations.application_doublet_title;
						modalData.content = translations.application_doublet_onspec;
						break;
					case 3: // message jobad inactive
						modalData.headline = translations.general_jobad_inactive_title;
						modalData.content = translations.general_jobad_inactive;
						break;
					case 4:
						modalData.headline = translations.general_error_message;
						modalData.content = translations.general_error_message_standard;
						break;
				}

				showStandardModal(modalData);
			}
		});

		// handle talent profile (delete/extend)
		$('.js-handle-profile').on("click", function () {
			var profileAction = $(this).data('profile-action');
			var modalHeadline = '';
			var modalContent = '';

			if (profileAction === 'delete_profile') {
				modalHeadline = translations.talent_profile_delete_title;
				modalContent = translations.talent_profile_delete;
			}

			if (profileAction === 'extend_profile') {
				modalHeadline = translations.talent_profile_extend_approval_title;
				modalContent = translations.talent_profile_extend_approval;
			}

			var modalData = {
				headline: modalHeadline,
				content: modalContent,
				buttons: [
					{
						content: translations.general_no,
						dismiss: true,
						primary: false
					},
					{
						content: translations.general_yes,
						dismiss: true,
						primary: true,
						callback: function () {
							var csrfToken = $('#_csrf_token').val();
							$.post(
								'index.php',
								{
									ac: 'handle_profile',
									action: profileAction,
									_csrf_token: csrfToken
								}
							).done(function (data) {
								data = JSON.parse(data);
								if (data.success == true) {
									document.location.href = 'index.php?ac=statuspage';
								} else if (data.csrf_token_ok == false) {
									showCsrfErrorMessage();
								} else {
									showGeneralErrorMessage();
								}
							});
						}
					}
				]
			};

			showStandardModal(modalData);
		});
	}
});

addTolisteners(['travel_expenses_view'], {
    name: 'statuspage',
    method: function () {
        (function ($) {
            $(document).ready(function () {
                if ($('[data-questionnaire]').length > 0) {
                    var $questionnaireForm = $('[data-questionnaire]');
                    $questionnaireForm.questionnaire();

                    $questionnaireForm.on('questionnaire.load', function () {
                        prepareQuestionnaireForm($questionnaireForm);

                        // rename submit button
                        $questionnaireForm.find('button[type=submit]').html(translations.general_travel_submit_button);
                    });


                    $questionnaireForm.on('questionnaire.submit', function () {
                        window.location.href = window.globalConstants.urlBase + 'travel_expenses';
                    });
                }
            });
        })(jQuery);
    }
});

function prepareQuestionnaireForm($questionnaireForm) {
    //radios and checkboxes are written like bootstrap documentation, but we display them different so we need to do some changes
    var $checkerInputsOuter = $questionnaireForm.find('.radio-inline, .checkbox-inline');
    if ($checkerInputsOuter.length > 0) {
        $checkerInputsOuter.each(function (k, obj) {
            var $this = $(obj);

            //move input before label
            var $input = $this.children('input').detach();
            $input.insertBefore($this)
                //append id to input
                .attr('id', 'checker_' + k);

            //set label content
            var $label = $('<span class="label-content">').html(
                $this.html()
            );

            //append new label html
            $this.html($label)
                //remove .radio-inline class
                .removeAttr('class')
                //append for to label
                .attr('for', 'checker_' + k);
        });
    }

    jQuery('.checkbox').each(function (i, obj) {
        var el = jQuery(obj);
        var input = el.find('input').prependTo(el);
        el.find('label').attr('for', input.attr('id'));
    });

    $("input[type='checkbox']").addMissingLabels();

    //radios do not show correct text
    var $checkerInputsInner = $questionnaireForm.find('em');
    if ($checkerInputsInner.length > 0) {
        $checkerInputsInner.each(function (k, obj) {
            var $this = $(obj);
            if ($this.html() === "form.boolean.true") {
                $this.html(translations.general_yes);
            }
            if ($this.html() === "form.boolean.false") {
                $this.html(translations.general_no);
            }
        });
    }

    document.querySelectorAll('.selectpicker').forEach(function (element) {
        element.classList.remove('selectpicker');
    })
}

/**
 * Add labels to checkboxes without label.
 * @returns {DataTable.$}
 */
$.fn.addMissingLabels = function() {
    this.filter("input[type='checkbox']").each(function(index, element) {
        let $checkbox = $(element);

        if($checkbox.next("label").length === 0) {
            if ($checkbox.attr("id") === undefined) {
                $checkbox.attr("id", "checkbox" + (index + 1));
            }

            let $label = $("<label>", {
                "for": $checkbox.attr("id")
            }).html("&nbsp");

            let $span = $("<span>", {
                "class": "sr-only"
            }).text(translations.general_yes);

            $label.append($span);
            $checkbox.after($label);
        }
    })
    return this;
}

!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(self,(function(){return function(){var e={3099:function(e){e.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}},6077:function(e,t,n){var r=n(111);e.exports=function(e){if(!r(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype");return e}},1223:function(e,t,n){var r=n(5112),i=n(30),o=n(3070),a=r("unscopables"),u=Array.prototype;null==u[a]&&o.f(u,a,{configurable:!0,value:i(null)}),e.exports=function(e){u[a][e]=!0}},1530:function(e,t,n){"use strict";var r=n(8710).charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},5787:function(e){e.exports=function(e,t,n){if(!(e instanceof t))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return e}},9670:function(e,t,n){var r=n(111);e.exports=function(e){if(!r(e))throw TypeError(String(e)+" is not an object");return e}},4019:function(e){e.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},260:function(e,t,n){"use strict";var r,i=n(4019),o=n(9781),a=n(7854),u=n(111),s=n(6656),l=n(648),c=n(8880),f=n(1320),p=n(3070).f,h=n(9518),d=n(7674),v=n(5112),y=n(9711),g=a.Int8Array,m=g&&g.prototype,b=a.Uint8ClampedArray,x=b&&b.prototype,w=g&&h(g),E=m&&h(m),k=Object.prototype,A=k.isPrototypeOf,S=v("toStringTag"),F=y("TYPED_ARRAY_TAG"),T=i&&!!d&&"Opera"!==l(a.opera),C=!1,L={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},R={BigInt64Array:8,BigUint64Array:8},I=function(e){if(!u(e))return!1;var t=l(e);return s(L,t)||s(R,t)};for(r in L)a[r]||(T=!1);if((!T||"function"!=typeof w||w===Function.prototype)&&(w=function(){throw TypeError("Incorrect invocation")},T))for(r in L)a[r]&&d(a[r],w);if((!T||!E||E===k)&&(E=w.prototype,T))for(r in L)a[r]&&d(a[r].prototype,E);if(T&&h(x)!==E&&d(x,E),o&&!s(E,S))for(r in C=!0,p(E,S,{get:function(){return u(this)?this[F]:void 0}}),L)a[r]&&c(a[r],F,r);e.exports={NATIVE_ARRAY_BUFFER_VIEWS:T,TYPED_ARRAY_TAG:C&&F,aTypedArray:function(e){if(I(e))return e;throw TypeError("Target is not a typed array")},aTypedArrayConstructor:function(e){if(d){if(A.call(w,e))return e}else for(var t in L)if(s(L,r)){var n=a[t];if(n&&(e===n||A.call(n,e)))return e}throw TypeError("Target is not a typed array constructor")},exportTypedArrayMethod:function(e,t,n){if(o){if(n)for(var r in L){var i=a[r];i&&s(i.prototype,e)&&delete i.prototype[e]}E[e]&&!n||f(E,e,n?t:T&&m[e]||t)}},exportTypedArrayStaticMethod:function(e,t,n){var r,i;if(o){if(d){if(n)for(r in L)(i=a[r])&&s(i,e)&&delete i[e];if(w[e]&&!n)return;try{return f(w,e,n?t:T&&g[e]||t)}catch(e){}}for(r in L)!(i=a[r])||i[e]&&!n||f(i,e,t)}},isView:function(e){if(!u(e))return!1;var t=l(e);return"DataView"===t||s(L,t)||s(R,t)},isTypedArray:I,TypedArray:w,TypedArrayPrototype:E}},3331:function(e,t,n){"use strict";var r=n(7854),i=n(9781),o=n(4019),a=n(8880),u=n(2248),s=n(7293),l=n(5787),c=n(9958),f=n(7466),p=n(7067),h=n(1179),d=n(9518),v=n(7674),y=n(8006).f,g=n(3070).f,m=n(1285),b=n(8003),x=n(9909),w=x.get,E=x.set,k="ArrayBuffer",A="DataView",S="Wrong index",F=r.ArrayBuffer,T=F,C=r.DataView,L=C&&C.prototype,R=Object.prototype,I=r.RangeError,U=h.pack,O=h.unpack,_=function(e){return[255&e]},M=function(e){return[255&e,e>>8&255]},z=function(e){return[255&e,e>>8&255,e>>16&255,e>>24&255]},P=function(e){return e[3]<<24|e[2]<<16|e[1]<<8|e[0]},j=function(e){return U(e,23,4)},D=function(e){return U(e,52,8)},N=function(e,t){g(e.prototype,t,{get:function(){return w(this)[t]}})},B=function(e,t,n,r){var i=p(n),o=w(e);if(i+t>o.byteLength)throw I(S);var a=w(o.buffer).bytes,u=i+o.byteOffset,s=a.slice(u,u+t);return r?s:s.reverse()},q=function(e,t,n,r,i,o){var a=p(n),u=w(e);if(a+t>u.byteLength)throw I(S);for(var s=w(u.buffer).bytes,l=a+u.byteOffset,c=r(+i),f=0;f<t;f++)s[l+f]=c[o?f:t-f-1]};if(o){if(!s((function(){F(1)}))||!s((function(){new F(-1)}))||s((function(){return new F,new F(1.5),new F(NaN),F.name!=k}))){for(var W,H=(T=function(e){return l(this,T),new F(p(e))}).prototype=F.prototype,Y=y(F),G=0;Y.length>G;)(W=Y[G++])in T||a(T,W,F[W]);H.constructor=T}v&&d(L)!==R&&v(L,R);var Q=new C(new T(2)),$=L.setInt8;Q.setInt8(0,2147483648),Q.setInt8(1,2147483649),!Q.getInt8(0)&&Q.getInt8(1)||u(L,{setInt8:function(e,t){$.call(this,e,t<<24>>24)},setUint8:function(e,t){$.call(this,e,t<<24>>24)}},{unsafe:!0})}else T=function(e){l(this,T,k);var t=p(e);E(this,{bytes:m.call(new Array(t),0),byteLength:t}),i||(this.byteLength=t)},C=function(e,t,n){l(this,C,A),l(e,T,A);var r=w(e).byteLength,o=c(t);if(o<0||o>r)throw I("Wrong offset");if(o+(n=void 0===n?r-o:f(n))>r)throw I("Wrong length");E(this,{buffer:e,byteLength:n,byteOffset:o}),i||(this.buffer=e,this.byteLength=n,this.byteOffset=o)},i&&(N(T,"byteLength"),N(C,"buffer"),N(C,"byteLength"),N(C,"byteOffset")),u(C.prototype,{getInt8:function(e){return B(this,1,e)[0]<<24>>24},getUint8:function(e){return B(this,1,e)[0]},getInt16:function(e){var t=B(this,2,e,arguments.length>1?arguments[1]:void 0);return(t[1]<<8|t[0])<<16>>16},getUint16:function(e){var t=B(this,2,e,arguments.length>1?arguments[1]:void 0);return t[1]<<8|t[0]},getInt32:function(e){return P(B(this,4,e,arguments.length>1?arguments[1]:void 0))},getUint32:function(e){return P(B(this,4,e,arguments.length>1?arguments[1]:void 0))>>>0},getFloat32:function(e){return O(B(this,4,e,arguments.length>1?arguments[1]:void 0),23)},getFloat64:function(e){return O(B(this,8,e,arguments.length>1?arguments[1]:void 0),52)},setInt8:function(e,t){q(this,1,e,_,t)},setUint8:function(e,t){q(this,1,e,_,t)},setInt16:function(e,t){q(this,2,e,M,t,arguments.length>2?arguments[2]:void 0)},setUint16:function(e,t){q(this,2,e,M,t,arguments.length>2?arguments[2]:void 0)},setInt32:function(e,t){q(this,4,e,z,t,arguments.length>2?arguments[2]:void 0)},setUint32:function(e,t){q(this,4,e,z,t,arguments.length>2?arguments[2]:void 0)},setFloat32:function(e,t){q(this,4,e,j,t,arguments.length>2?arguments[2]:void 0)},setFloat64:function(e,t){q(this,8,e,D,t,arguments.length>2?arguments[2]:void 0)}});b(T,k),b(C,A),e.exports={ArrayBuffer:T,DataView:C}},1048:function(e,t,n){"use strict";var r=n(7908),i=n(1400),o=n(7466),a=Math.min;e.exports=[].copyWithin||function(e,t){var n=r(this),u=o(n.length),s=i(e,u),l=i(t,u),c=arguments.length>2?arguments[2]:void 0,f=a((void 0===c?u:i(c,u))-l,u-s),p=1;for(l<s&&s<l+f&&(p=-1,l+=f-1,s+=f-1);f-- >0;)l in n?n[s]=n[l]:delete n[s],s+=p,l+=p;return n}},1285:function(e,t,n){"use strict";var r=n(7908),i=n(1400),o=n(7466);e.exports=function(e){for(var t=r(this),n=o(t.length),a=arguments.length,u=i(a>1?arguments[1]:void 0,n),s=a>2?arguments[2]:void 0,l=void 0===s?n:i(s,n);l>u;)t[u++]=e;return t}},8533:function(e,t,n){"use strict";var r=n(2092).forEach,i=n(9341)("forEach");e.exports=i?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},8457:function(e,t,n){"use strict";var r=n(9974),i=n(7908),o=n(3411),a=n(7659),u=n(7466),s=n(6135),l=n(1246);e.exports=function(e){var t,n,c,f,p,h,d=i(e),v="function"==typeof this?this:Array,y=arguments.length,g=y>1?arguments[1]:void 0,m=void 0!==g,b=l(d),x=0;if(m&&(g=r(g,y>2?arguments[2]:void 0,2)),null==b||v==Array&&a(b))for(n=new v(t=u(d.length));t>x;x++)h=m?g(d[x],x):d[x],s(n,x,h);else for(p=(f=b.call(d)).next,n=new v;!(c=p.call(f)).done;x++)h=m?o(f,g,[c.value,x],!0):c.value,s(n,x,h);return n.length=x,n}},1318:function(e,t,n){var r=n(5656),i=n(7466),o=n(1400),a=function(e){return function(t,n,a){var u,s=r(t),l=i(s.length),c=o(a,l);if(e&&n!=n){for(;l>c;)if((u=s[c++])!=u)return!0}else for(;l>c;c++)if((e||c in s)&&s[c]===n)return e||c||0;return!e&&-1}};e.exports={includes:a(!0),indexOf:a(!1)}},2092:function(e,t,n){var r=n(9974),i=n(8361),o=n(7908),a=n(7466),u=n(5417),s=[].push,l=function(e){var t=1==e,n=2==e,l=3==e,c=4==e,f=6==e,p=7==e,h=5==e||f;return function(d,v,y,g){for(var m,b,x=o(d),w=i(x),E=r(v,y,3),k=a(w.length),A=0,S=g||u,F=t?S(d,k):n||p?S(d,0):void 0;k>A;A++)if((h||A in w)&&(b=E(m=w[A],A,x),e))if(t)F[A]=b;else if(b)switch(e){case 3:return!0;case 5:return m;case 6:return A;case 2:s.call(F,m)}else switch(e){case 4:return!1;case 7:s.call(F,m)}return f?-1:l||c?c:F}};e.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},6583:function(e,t,n){"use strict";var r=n(5656),i=n(9958),o=n(7466),a=n(9341),u=Math.min,s=[].lastIndexOf,l=!!s&&1/[1].lastIndexOf(1,-0)<0,c=a("lastIndexOf"),f=l||!c;e.exports=f?function(e){if(l)return s.apply(this,arguments)||0;var t=r(this),n=o(t.length),a=n-1;for(arguments.length>1&&(a=u(a,i(arguments[1]))),a<0&&(a=n+a);a>=0;a--)if(a in t&&t[a]===e)return a||0;return-1}:s},1194:function(e,t,n){var r=n(7293),i=n(5112),o=n(7392),a=i("species");e.exports=function(e){return o>=51||!r((function(){var t=[];return(t.constructor={})[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},9341:function(e,t,n){"use strict";var r=n(7293);e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},3671:function(e,t,n){var r=n(3099),i=n(7908),o=n(8361),a=n(7466),u=function(e){return function(t,n,u,s){r(n);var l=i(t),c=o(l),f=a(l.length),p=e?f-1:0,h=e?-1:1;if(u<2)for(;;){if(p in c){s=c[p],p+=h;break}if(p+=h,e?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;e?p>=0:f>p;p+=h)p in c&&(s=n(s,c[p],p,l));return s}};e.exports={left:u(!1),right:u(!0)}},5417:function(e,t,n){var r=n(111),i=n(3157),o=n(5112)("species");e.exports=function(e,t){var n;return i(e)&&("function"!=typeof(n=e.constructor)||n!==Array&&!i(n.prototype)?r(n)&&null===(n=n[o])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},3411:function(e,t,n){var r=n(9670),i=n(9212);e.exports=function(e,t,n,o){try{return o?t(r(n)[0],n[1]):t(n)}catch(t){throw i(e),t}}},7072:function(e,t,n){var r=n(5112)("iterator"),i=!1;try{var o=0,a={next:function(){return{done:!!o++}},return:function(){i=!0}};a[r]=function(){return this},Array.from(a,(function(){throw 2}))}catch(e){}e.exports=function(e,t){if(!t&&!i)return!1;var n=!1;try{var o={};o[r]=function(){return{next:function(){return{done:n=!0}}}},e(o)}catch(e){}return n}},4326:function(e){var t={}.toString;e.exports=function(e){return t.call(e).slice(8,-1)}},648:function(e,t,n){var r=n(1694),i=n(4326),o=n(5112)("toStringTag"),a="Arguments"==i(function(){return arguments}());e.exports=r?i:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),o))?n:a?i(t):"Object"==(r=i(t))&&"function"==typeof t.callee?"Arguments":r}},9920:function(e,t,n){var r=n(6656),i=n(3887),o=n(1236),a=n(3070);e.exports=function(e,t){for(var n=i(t),u=a.f,s=o.f,l=0;l<n.length;l++){var c=n[l];r(e,c)||u(e,c,s(t,c))}}},8544:function(e,t,n){var r=n(7293);e.exports=!r((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype}))},4994:function(e,t,n){"use strict";var r=n(3383).IteratorPrototype,i=n(30),o=n(9114),a=n(8003),u=n(7497),s=function(){return this};e.exports=function(e,t,n){var l=t+" Iterator";return e.prototype=i(r,{next:o(1,n)}),a(e,l,!1,!0),u[l]=s,e}},8880:function(e,t,n){var r=n(9781),i=n(3070),o=n(9114);e.exports=r?function(e,t,n){return i.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},9114:function(e){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},6135:function(e,t,n){"use strict";var r=n(7593),i=n(3070),o=n(9114);e.exports=function(e,t,n){var a=r(t);a in e?i.f(e,a,o(0,n)):e[a]=n}},654:function(e,t,n){"use strict";var r=n(2109),i=n(4994),o=n(9518),a=n(7674),u=n(8003),s=n(8880),l=n(1320),c=n(5112),f=n(1913),p=n(7497),h=n(3383),d=h.IteratorPrototype,v=h.BUGGY_SAFARI_ITERATORS,y=c("iterator"),g="keys",m="values",b="entries",x=function(){return this};e.exports=function(e,t,n,c,h,w,E){i(n,t,c);var k,A,S,F=function(e){if(e===h&&I)return I;if(!v&&e in L)return L[e];switch(e){case g:case m:case b:return function(){return new n(this,e)}}return function(){return new n(this)}},T=t+" Iterator",C=!1,L=e.prototype,R=L[y]||L["@@iterator"]||h&&L[h],I=!v&&R||F(h),U="Array"==t&&L.entries||R;if(U&&(k=o(U.call(new e)),d!==Object.prototype&&k.next&&(f||o(k)===d||(a?a(k,d):"function"!=typeof k[y]&&s(k,y,x)),u(k,T,!0,!0),f&&(p[T]=x))),h==m&&R&&R.name!==m&&(C=!0,I=function(){return R.call(this)}),f&&!E||L[y]===I||s(L,y,I),p[t]=I,h)if(A={values:F(m),keys:w?I:F(g),entries:F(b)},E)for(S in A)(v||C||!(S in L))&&l(L,S,A[S]);else r({target:t,proto:!0,forced:v||C},A);return A}},9781:function(e,t,n){var r=n(7293);e.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:function(e,t,n){var r=n(7854),i=n(111),o=r.document,a=i(o)&&i(o.createElement);e.exports=function(e){return a?o.createElement(e):{}}},8324:function(e){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},8113:function(e,t,n){var r=n(5005);e.exports=r("navigator","userAgent")||""},7392:function(e,t,n){var r,i,o=n(7854),a=n(8113),u=o.process,s=u&&u.versions,l=s&&s.v8;l?i=(r=l.split("."))[0]+r[1]:a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(i=r[1]),e.exports=i&&+i},748:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(e,t,n){var r=n(7854),i=n(1236).f,o=n(8880),a=n(1320),u=n(3505),s=n(9920),l=n(4705);e.exports=function(e,t){var n,c,f,p,h,d=e.target,v=e.global,y=e.stat;if(n=v?r:y?r[d]||u(d,{}):(r[d]||{}).prototype)for(c in t){if(p=t[c],f=e.noTargetGet?(h=i(n,c))&&h.value:n[c],!l(v?c:d+(y?".":"#")+c,e.forced)&&void 0!==f){if(typeof p==typeof f)continue;s(p,f)}(e.sham||f&&f.sham)&&o(p,"sham",!0),a(n,c,p,e)}}},7293:function(e){e.exports=function(e){try{return!!e()}catch(e){return!0}}},7007:function(e,t,n){"use strict";n(4916);var r=n(1320),i=n(7293),o=n(5112),a=n(2261),u=n(8880),s=o("species"),l=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),c="$0"==="a".replace(/./,"$0"),f=o("replace"),p=!!/./[f]&&""===/./[f]("a","$0"),h=!i((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,f){var d=o(e),v=!i((function(){var t={};return t[d]=function(){return 7},7!=""[e](t)})),y=v&&!i((function(){var t=!1,n=/a/;return"split"===e&&((n={}).constructor={},n.constructor[s]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return t=!0,null},n[d](""),!t}));if(!v||!y||"replace"===e&&(!l||!c||p)||"split"===e&&!h){var g=/./[d],m=n(d,""[e],(function(e,t,n,r,i){return t.exec===a?v&&!i?{done:!0,value:g.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:c,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),b=m[0],x=m[1];r(String.prototype,e,b),r(RegExp.prototype,d,2==t?function(e,t){return x.call(e,this,t)}:function(e){return x.call(e,this)})}f&&u(RegExp.prototype[d],"sham",!0)}},9974:function(e,t,n){var r=n(3099);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},5005:function(e,t,n){var r=n(857),i=n(7854),o=function(e){return"function"==typeof e?e:void 0};e.exports=function(e,t){return arguments.length<2?o(r[e])||o(i[e]):r[e]&&r[e][t]||i[e]&&i[e][t]}},1246:function(e,t,n){var r=n(648),i=n(7497),o=n(5112)("iterator");e.exports=function(e){if(null!=e)return e[o]||e["@@iterator"]||i[r(e)]}},8554:function(e,t,n){var r=n(9670),i=n(1246);e.exports=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return r(t.call(e))}},647:function(e,t,n){var r=n(7908),i=Math.floor,o="".replace,a=/\$([$&'`]|\d\d?|<[^>]*>)/g,u=/\$([$&'`]|\d\d?)/g;e.exports=function(e,t,n,s,l,c){var f=n+e.length,p=s.length,h=u;return void 0!==l&&(l=r(l),h=a),o.call(c,h,(function(r,o){var a;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(f);case"<":a=l[o.slice(1,-1)];break;default:var u=+o;if(0===u)return r;if(u>p){var c=i(u/10);return 0===c?r:c<=p?void 0===s[c-1]?o.charAt(1):s[c-1]+o.charAt(1):r}a=s[u-1]}return void 0===a?"":a}))}},7854:function(e,t,n){var r=function(e){return e&&e.Math==Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||function(){return this}()||Function("return this")()},6656:function(e){var t={}.hasOwnProperty;e.exports=function(e,n){return t.call(e,n)}},3501:function(e){e.exports={}},490:function(e,t,n){var r=n(5005);e.exports=r("document","documentElement")},4664:function(e,t,n){var r=n(9781),i=n(7293),o=n(317);e.exports=!r&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},1179:function(e){var t=Math.abs,n=Math.pow,r=Math.floor,i=Math.log,o=Math.LN2;e.exports={pack:function(e,a,u){var s,l,c,f=new Array(u),p=8*u-a-1,h=(1<<p)-1,d=h>>1,v=23===a?n(2,-24)-n(2,-77):0,y=e<0||0===e&&1/e<0?1:0,g=0;for((e=t(e))!=e||e===1/0?(l=e!=e?1:0,s=h):(s=r(i(e)/o),e*(c=n(2,-s))<1&&(s--,c*=2),(e+=s+d>=1?v/c:v*n(2,1-d))*c>=2&&(s++,c/=2),s+d>=h?(l=0,s=h):s+d>=1?(l=(e*c-1)*n(2,a),s+=d):(l=e*n(2,d-1)*n(2,a),s=0));a>=8;f[g++]=255&l,l/=256,a-=8);for(s=s<<a|l,p+=a;p>0;f[g++]=255&s,s/=256,p-=8);return f[--g]|=128*y,f},unpack:function(e,t){var r,i=e.length,o=8*i-t-1,a=(1<<o)-1,u=a>>1,s=o-7,l=i-1,c=e[l--],f=127&c;for(c>>=7;s>0;f=256*f+e[l],l--,s-=8);for(r=f&(1<<-s)-1,f>>=-s,s+=t;s>0;r=256*r+e[l],l--,s-=8);if(0===f)f=1-u;else{if(f===a)return r?NaN:c?-1/0:1/0;r+=n(2,t),f-=u}return(c?-1:1)*r*n(2,f-t)}}},8361:function(e,t,n){var r=n(7293),i=n(4326),o="".split;e.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==i(e)?o.call(e,""):Object(e)}:Object},9587:function(e,t,n){var r=n(111),i=n(7674);e.exports=function(e,t,n){var o,a;return i&&"function"==typeof(o=t.constructor)&&o!==n&&r(a=o.prototype)&&a!==n.prototype&&i(e,a),e}},2788:function(e,t,n){var r=n(5465),i=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(e){return i.call(e)}),e.exports=r.inspectSource},9909:function(e,t,n){var r,i,o,a=n(8536),u=n(7854),s=n(111),l=n(8880),c=n(6656),f=n(5465),p=n(6200),h=n(3501),d=u.WeakMap;if(a){var v=f.state||(f.state=new d),y=v.get,g=v.has,m=v.set;r=function(e,t){return t.facade=e,m.call(v,e,t),t},i=function(e){return y.call(v,e)||{}},o=function(e){return g.call(v,e)}}else{var b=p("state");h[b]=!0,r=function(e,t){return t.facade=e,l(e,b,t),t},i=function(e){return c(e,b)?e[b]:{}},o=function(e){return c(e,b)}}e.exports={set:r,get:i,has:o,enforce:function(e){return o(e)?i(e):r(e,{})},getterFor:function(e){return function(t){var n;if(!s(t)||(n=i(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}}},7659:function(e,t,n){var r=n(5112),i=n(7497),o=r("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||a[o]===e)}},3157:function(e,t,n){var r=n(4326);e.exports=Array.isArray||function(e){return"Array"==r(e)}},4705:function(e,t,n){var r=n(7293),i=/#|\.prototype\./,o=function(e,t){var n=u[a(e)];return n==l||n!=s&&("function"==typeof t?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(i,".").toLowerCase()},u=o.data={},s=o.NATIVE="N",l=o.POLYFILL="P";e.exports=o},111:function(e){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},1913:function(e){e.exports=!1},7850:function(e,t,n){var r=n(111),i=n(4326),o=n(5112)("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[o])?!!t:"RegExp"==i(e))}},9212:function(e,t,n){var r=n(9670);e.exports=function(e){var t=e.return;if(void 0!==t)return r(t.call(e)).value}},3383:function(e,t,n){"use strict";var r,i,o,a=n(7293),u=n(9518),s=n(8880),l=n(6656),c=n(5112),f=n(1913),p=c("iterator"),h=!1;[].keys&&("next"in(o=[].keys())?(i=u(u(o)))!==Object.prototype&&(r=i):h=!0);var d=null==r||a((function(){var e={};return r[p].call(e)!==e}));d&&(r={}),f&&!d||l(r,p)||s(r,p,(function(){return this})),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:h}},7497:function(e){e.exports={}},133:function(e,t,n){var r=n(7293);e.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},590:function(e,t,n){var r=n(7293),i=n(5112),o=n(1913),a=i("iterator");e.exports=!r((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,n="";return e.pathname="c%20d",t.forEach((function(e,r){t.delete("b"),n+=r+e})),o&&!e.toJSON||!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[a]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host}))},8536:function(e,t,n){var r=n(7854),i=n(2788),o=r.WeakMap;e.exports="function"==typeof o&&/native code/.test(i(o))},1574:function(e,t,n){"use strict";var r=n(9781),i=n(7293),o=n(1956),a=n(5181),u=n(5296),s=n(7908),l=n(8361),c=Object.assign,f=Object.defineProperty;e.exports=!c||i((function(){if(r&&1!==c({b:1},c(f({},"a",{enumerable:!0,get:function(){f(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},n=Symbol(),i="abcdefghijklmnopqrst";return e[n]=7,i.split("").forEach((function(e){t[e]=e})),7!=c({},e)[n]||o(c({},t)).join("")!=i}))?function(e,t){for(var n=s(e),i=arguments.length,c=1,f=a.f,p=u.f;i>c;)for(var h,d=l(arguments[c++]),v=f?o(d).concat(f(d)):o(d),y=v.length,g=0;y>g;)h=v[g++],r&&!p.call(d,h)||(n[h]=d[h]);return n}:c},30:function(e,t,n){var r,i=n(9670),o=n(6048),a=n(748),u=n(3501),s=n(490),l=n(317),c=n(6200)("IE_PROTO"),f=function(){},p=function(e){return"<script>"+e+"<\/script>"},h=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(e){}var e,t;h=r?function(e){e.write(p("")),e.close();var t=e.parentWindow.Object;return e=null,t}(r):((t=l("iframe")).style.display="none",s.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(p("document.F=Object")),e.close(),e.F);for(var n=a.length;n--;)delete h.prototype[a[n]];return h()};u[c]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(f.prototype=i(e),n=new f,f.prototype=null,n[c]=e):n=h(),void 0===t?n:o(n,t)}},6048:function(e,t,n){var r=n(9781),i=n(3070),o=n(9670),a=n(1956);e.exports=r?Object.defineProperties:function(e,t){o(e);for(var n,r=a(t),u=r.length,s=0;u>s;)i.f(e,n=r[s++],t[n]);return e}},3070:function(e,t,n){var r=n(9781),i=n(4664),o=n(9670),a=n(7593),u=Object.defineProperty;t.f=r?u:function(e,t,n){if(o(e),t=a(t,!0),o(n),i)try{return u(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},1236:function(e,t,n){var r=n(9781),i=n(5296),o=n(9114),a=n(5656),u=n(7593),s=n(6656),l=n(4664),c=Object.getOwnPropertyDescriptor;t.f=r?c:function(e,t){if(e=a(e),t=u(t,!0),l)try{return c(e,t)}catch(e){}if(s(e,t))return o(!i.f.call(e,t),e[t])}},8006:function(e,t,n){var r=n(6324),i=n(748).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},5181:function(e,t){t.f=Object.getOwnPropertySymbols},9518:function(e,t,n){var r=n(6656),i=n(7908),o=n(6200),a=n(8544),u=o("IE_PROTO"),s=Object.prototype;e.exports=a?Object.getPrototypeOf:function(e){return e=i(e),r(e,u)?e[u]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?s:null}},6324:function(e,t,n){var r=n(6656),i=n(5656),o=n(1318).indexOf,a=n(3501);e.exports=function(e,t){var n,u=i(e),s=0,l=[];for(n in u)!r(a,n)&&r(u,n)&&l.push(n);for(;t.length>s;)r(u,n=t[s++])&&(~o(l,n)||l.push(n));return l}},1956:function(e,t,n){var r=n(6324),i=n(748);e.exports=Object.keys||function(e){return r(e,i)}},5296:function(e,t){"use strict";var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!n.call({1:2},1);t.f=i?function(e){var t=r(this,e);return!!t&&t.enumerable}:n},7674:function(e,t,n){var r=n(9670),i=n(6077);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),t=n instanceof Array}catch(e){}return function(n,o){return r(n),i(o),t?e.call(n,o):n.__proto__=o,n}}():void 0)},288:function(e,t,n){"use strict";var r=n(1694),i=n(648);e.exports=r?{}.toString:function(){return"[object "+i(this)+"]"}},3887:function(e,t,n){var r=n(5005),i=n(8006),o=n(5181),a=n(9670);e.exports=r("Reflect","ownKeys")||function(e){var t=i.f(a(e)),n=o.f;return n?t.concat(n(e)):t}},857:function(e,t,n){var r=n(7854);e.exports=r},2248:function(e,t,n){var r=n(1320);e.exports=function(e,t,n){for(var i in t)r(e,i,t[i],n);return e}},1320:function(e,t,n){var r=n(7854),i=n(8880),o=n(6656),a=n(3505),u=n(2788),s=n(9909),l=s.get,c=s.enforce,f=String(String).split("String");(e.exports=function(e,t,n,u){var s,l=!!u&&!!u.unsafe,p=!!u&&!!u.enumerable,h=!!u&&!!u.noTargetGet;"function"==typeof n&&("string"!=typeof t||o(n,"name")||i(n,"name",t),(s=c(n)).source||(s.source=f.join("string"==typeof t?t:""))),e!==r?(l?!h&&e[t]&&(p=!0):delete e[t],p?e[t]=n:i(e,t,n)):p?e[t]=n:a(t,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&l(this).source||u(this)}))},7651:function(e,t,n){var r=n(4326),i=n(2261);e.exports=function(e,t){var n=e.exec;if("function"==typeof n){var o=n.call(e,t);if("object"!=typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},2261:function(e,t,n){"use strict";var r,i,o=n(7066),a=n(2999),u=RegExp.prototype.exec,s=String.prototype.replace,l=u,c=(r=/a/,i=/b*/g,u.call(r,"a"),u.call(i,"a"),0!==r.lastIndex||0!==i.lastIndex),f=a.UNSUPPORTED_Y||a.BROKEN_CARET,p=void 0!==/()??/.exec("")[1];(c||p||f)&&(l=function(e){var t,n,r,i,a=this,l=f&&a.sticky,h=o.call(a),d=a.source,v=0,y=e;return l&&(-1===(h=h.replace("y","")).indexOf("g")&&(h+="g"),y=String(e).slice(a.lastIndex),a.lastIndex>0&&(!a.multiline||a.multiline&&"\n"!==e[a.lastIndex-1])&&(d="(?: "+d+")",y=" "+y,v++),n=new RegExp("^(?:"+d+")",h)),p&&(n=new RegExp("^"+d+"$(?!\\s)",h)),c&&(t=a.lastIndex),r=u.call(l?n:a,y),l?r?(r.input=r.input.slice(v),r[0]=r[0].slice(v),r.index=a.lastIndex,a.lastIndex+=r[0].length):a.lastIndex=0:c&&r&&(a.lastIndex=a.global?r.index+r[0].length:t),p&&r&&r.length>1&&s.call(r[0],n,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)})),r}),e.exports=l},7066:function(e,t,n){"use strict";var r=n(9670);e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},2999:function(e,t,n){"use strict";var r=n(7293);function i(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},4488:function(e){e.exports=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e}},3505:function(e,t,n){var r=n(7854),i=n(8880);e.exports=function(e,t){try{i(r,e,t)}catch(n){r[e]=t}return t}},6340:function(e,t,n){"use strict";var r=n(5005),i=n(3070),o=n(5112),a=n(9781),u=o("species");e.exports=function(e){var t=r(e),n=i.f;a&&t&&!t[u]&&n(t,u,{configurable:!0,get:function(){return this}})}},8003:function(e,t,n){var r=n(3070).f,i=n(6656),o=n(5112)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,o)&&r(e,o,{configurable:!0,value:t})}},6200:function(e,t,n){var r=n(2309),i=n(9711),o=r("keys");e.exports=function(e){return o[e]||(o[e]=i(e))}},5465:function(e,t,n){var r=n(7854),i=n(3505),o="__core-js_shared__",a=r[o]||i(o,{});e.exports=a},2309:function(e,t,n){var r=n(1913),i=n(5465);(e.exports=function(e,t){return i[e]||(i[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.9.0",mode:r?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},6707:function(e,t,n){var r=n(9670),i=n(3099),o=n(5112)("species");e.exports=function(e,t){var n,a=r(e).constructor;return void 0===a||null==(n=r(a)[o])?t:i(n)}},8710:function(e,t,n){var r=n(9958),i=n(4488),o=function(e){return function(t,n){var o,a,u=String(i(t)),s=r(n),l=u.length;return s<0||s>=l?e?"":void 0:(o=u.charCodeAt(s))<55296||o>56319||s+1===l||(a=u.charCodeAt(s+1))<56320||a>57343?e?u.charAt(s):o:e?u.slice(s,s+2):a-56320+(o-55296<<10)+65536}};e.exports={codeAt:o(!1),charAt:o(!0)}},3197:function(e){"use strict";var t=2147483647,n=/[^\0-\u007E]/,r=/[.\u3002\uFF0E\uFF61]/g,i="Overflow: input needs wider integers to process",o=Math.floor,a=String.fromCharCode,u=function(e){return e+22+75*(e<26)},s=function(e,t,n){var r=0;for(e=n?o(e/700):e>>1,e+=o(e/t);e>455;r+=36)e=o(e/35);return o(r+36*e/(e+38))},l=function(e){var n,r,l=[],c=(e=function(e){for(var t=[],n=0,r=e.length;n<r;){var i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){var o=e.charCodeAt(n++);56320==(64512&o)?t.push(((1023&i)<<10)+(1023&o)+65536):(t.push(i),n--)}else t.push(i)}return t}(e)).length,f=128,p=0,h=72;for(n=0;n<e.length;n++)(r=e[n])<128&&l.push(a(r));var d=l.length,v=d;for(d&&l.push("-");v<c;){var y=t;for(n=0;n<e.length;n++)(r=e[n])>=f&&r<y&&(y=r);var g=v+1;if(y-f>o((t-p)/g))throw RangeError(i);for(p+=(y-f)*g,f=y,n=0;n<e.length;n++){if((r=e[n])<f&&++p>t)throw RangeError(i);if(r==f){for(var m=p,b=36;;b+=36){var x=b<=h?1:b>=h+26?26:b-h;if(m<x)break;var w=m-x,E=36-x;l.push(a(u(x+w%E))),m=o(w/E)}l.push(a(u(m))),h=s(p,g,v==d),p=0,++v}}++p,++f}return l.join("")};e.exports=function(e){var t,i,o=[],a=e.toLowerCase().replace(r,".").split(".");for(t=0;t<a.length;t++)i=a[t],o.push(n.test(i)?"xn--"+l(i):i);return o.join(".")}},6091:function(e,t,n){var r=n(7293),i=n(1361);e.exports=function(e){return r((function(){return!!i[e]()||"​᠎"!="​᠎"[e]()||i[e].name!==e}))}},3111:function(e,t,n){var r=n(4488),i="["+n(1361)+"]",o=RegExp("^"+i+i+"*"),a=RegExp(i+i+"*$"),u=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(a,"")),n}};e.exports={start:u(1),end:u(2),trim:u(3)}},1400:function(e,t,n){var r=n(9958),i=Math.max,o=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):o(n,t)}},7067:function(e,t,n){var r=n(9958),i=n(7466);e.exports=function(e){if(void 0===e)return 0;var t=r(e),n=i(t);if(t!==n)throw RangeError("Wrong length or index");return n}},5656:function(e,t,n){var r=n(8361),i=n(4488);e.exports=function(e){return r(i(e))}},9958:function(e){var t=Math.ceil,n=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?n:t)(e)}},7466:function(e,t,n){var r=n(9958),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},7908:function(e,t,n){var r=n(4488);e.exports=function(e){return Object(r(e))}},4590:function(e,t,n){var r=n(3002);e.exports=function(e,t){var n=r(e);if(n%t)throw RangeError("Wrong offset");return n}},3002:function(e,t,n){var r=n(9958);e.exports=function(e){var t=r(e);if(t<0)throw RangeError("The argument can't be less than 0");return t}},7593:function(e,t,n){var r=n(111);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},1694:function(e,t,n){var r={};r[n(5112)("toStringTag")]="z",e.exports="[object z]"===String(r)},9843:function(e,t,n){"use strict";var r=n(2109),i=n(7854),o=n(9781),a=n(3832),u=n(260),s=n(3331),l=n(5787),c=n(9114),f=n(8880),p=n(7466),h=n(7067),d=n(4590),v=n(7593),y=n(6656),g=n(648),m=n(111),b=n(30),x=n(7674),w=n(8006).f,E=n(7321),k=n(2092).forEach,A=n(6340),S=n(3070),F=n(1236),T=n(9909),C=n(9587),L=T.get,R=T.set,I=S.f,U=F.f,O=Math.round,_=i.RangeError,M=s.ArrayBuffer,z=s.DataView,P=u.NATIVE_ARRAY_BUFFER_VIEWS,j=u.TYPED_ARRAY_TAG,D=u.TypedArray,N=u.TypedArrayPrototype,B=u.aTypedArrayConstructor,q=u.isTypedArray,W="BYTES_PER_ELEMENT",H="Wrong length",Y=function(e,t){for(var n=0,r=t.length,i=new(B(e))(r);r>n;)i[n]=t[n++];return i},G=function(e,t){I(e,t,{get:function(){return L(this)[t]}})},Q=function(e){var t;return e instanceof M||"ArrayBuffer"==(t=g(e))||"SharedArrayBuffer"==t},$=function(e,t){return q(e)&&"symbol"!=typeof t&&t in e&&String(+t)==String(t)},V=function(e,t){return $(e,t=v(t,!0))?c(2,e[t]):U(e,t)},X=function(e,t,n){return!($(e,t=v(t,!0))&&m(n)&&y(n,"value"))||y(n,"get")||y(n,"set")||n.configurable||y(n,"writable")&&!n.writable||y(n,"enumerable")&&!n.enumerable?I(e,t,n):(e[t]=n.value,e)};o?(P||(F.f=V,S.f=X,G(N,"buffer"),G(N,"byteOffset"),G(N,"byteLength"),G(N,"length")),r({target:"Object",stat:!0,forced:!P},{getOwnPropertyDescriptor:V,defineProperty:X}),e.exports=function(e,t,n){var o=e.match(/\d+$/)[0]/8,u=e+(n?"Clamped":"")+"Array",s="get"+e,c="set"+e,v=i[u],y=v,g=y&&y.prototype,S={},F=function(e,t){I(e,t,{get:function(){return function(e,t){var n=L(e);return n.view[s](t*o+n.byteOffset,!0)}(this,t)},set:function(e){return function(e,t,r){var i=L(e);n&&(r=(r=O(r))<0?0:r>255?255:255&r),i.view[c](t*o+i.byteOffset,r,!0)}(this,t,e)},enumerable:!0})};P?a&&(y=t((function(e,t,n,r){return l(e,y,u),C(m(t)?Q(t)?void 0!==r?new v(t,d(n,o),r):void 0!==n?new v(t,d(n,o)):new v(t):q(t)?Y(y,t):E.call(y,t):new v(h(t)),e,y)})),x&&x(y,D),k(w(v),(function(e){e in y||f(y,e,v[e])})),y.prototype=g):(y=t((function(e,t,n,r){l(e,y,u);var i,a,s,c=0,f=0;if(m(t)){if(!Q(t))return q(t)?Y(y,t):E.call(y,t);i=t,f=d(n,o);var v=t.byteLength;if(void 0===r){if(v%o)throw _(H);if((a=v-f)<0)throw _(H)}else if((a=p(r)*o)+f>v)throw _(H);s=a/o}else s=h(t),i=new M(a=s*o);for(R(e,{buffer:i,byteOffset:f,byteLength:a,length:s,view:new z(i)});c<s;)F(e,c++)})),x&&x(y,D),g=y.prototype=b(N)),g.constructor!==y&&f(g,"constructor",y),j&&f(g,j,u),S[u]=y,r({global:!0,forced:y!=v,sham:!P},S),W in y||f(y,W,o),W in g||f(g,W,o),A(u)}):e.exports=function(){}},3832:function(e,t,n){var r=n(7854),i=n(7293),o=n(7072),a=n(260).NATIVE_ARRAY_BUFFER_VIEWS,u=r.ArrayBuffer,s=r.Int8Array;e.exports=!a||!i((function(){s(1)}))||!i((function(){new s(-1)}))||!o((function(e){new s,new s(null),new s(1.5),new s(e)}),!0)||i((function(){return 1!==new s(new u(2),1,void 0).length}))},3074:function(e,t,n){var r=n(260).aTypedArrayConstructor,i=n(6707);e.exports=function(e,t){for(var n=i(e,e.constructor),o=0,a=t.length,u=new(r(n))(a);a>o;)u[o]=t[o++];return u}},7321:function(e,t,n){var r=n(7908),i=n(7466),o=n(1246),a=n(7659),u=n(9974),s=n(260).aTypedArrayConstructor;e.exports=function(e){var t,n,l,c,f,p,h=r(e),d=arguments.length,v=d>1?arguments[1]:void 0,y=void 0!==v,g=o(h);if(null!=g&&!a(g))for(p=(f=g.call(h)).next,h=[];!(c=p.call(f)).done;)h.push(c.value);for(y&&d>2&&(v=u(v,arguments[2],2)),n=i(h.length),l=new(s(this))(n),t=0;n>t;t++)l[t]=y?v(h[t],t):h[t];return l}},9711:function(e){var t=0,n=Math.random();e.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++t+n).toString(36)}},3307:function(e,t,n){var r=n(133);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},5112:function(e,t,n){var r=n(7854),i=n(2309),o=n(6656),a=n(9711),u=n(133),s=n(3307),l=i("wks"),c=r.Symbol,f=s?c:c&&c.withoutSetter||a;e.exports=function(e){return o(l,e)||(u&&o(c,e)?l[e]=c[e]:l[e]=f("Symbol."+e)),l[e]}},1361:function(e){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},8264:function(e,t,n){"use strict";var r=n(2109),i=n(7854),o=n(3331),a=n(6340),u=o.ArrayBuffer;r({global:!0,forced:i.ArrayBuffer!==u},{ArrayBuffer:u}),a("ArrayBuffer")},2222:function(e,t,n){"use strict";var r=n(2109),i=n(7293),o=n(3157),a=n(111),u=n(7908),s=n(7466),l=n(6135),c=n(5417),f=n(1194),p=n(5112),h=n(7392),d=p("isConcatSpreadable"),v=9007199254740991,y="Maximum allowed index exceeded",g=h>=51||!i((function(){var e=[];return e[d]=!1,e.concat()[0]!==e})),m=f("concat"),b=function(e){if(!a(e))return!1;var t=e[d];return void 0!==t?!!t:o(e)};r({target:"Array",proto:!0,forced:!g||!m},{concat:function(e){var t,n,r,i,o,a=u(this),f=c(a,0),p=0;for(t=-1,r=arguments.length;t<r;t++)if(b(o=-1===t?a:arguments[t])){if(p+(i=s(o.length))>v)throw TypeError(y);for(n=0;n<i;n++,p++)n in o&&l(f,p,o[n])}else{if(p>=v)throw TypeError(y);l(f,p++,o)}return f.length=p,f}})},7327:function(e,t,n){"use strict";var r=n(2109),i=n(2092).filter;r({target:"Array",proto:!0,forced:!n(1194)("filter")},{filter:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},2772:function(e,t,n){"use strict";var r=n(2109),i=n(1318).indexOf,o=n(9341),a=[].indexOf,u=!!a&&1/[1].indexOf(1,-0)<0,s=o("indexOf");r({target:"Array",proto:!0,forced:u||!s},{indexOf:function(e){return u?a.apply(this,arguments)||0:i(this,e,arguments.length>1?arguments[1]:void 0)}})},6992:function(e,t,n){"use strict";var r=n(5656),i=n(1223),o=n(7497),a=n(9909),u=n(654),s="Array Iterator",l=a.set,c=a.getterFor(s);e.exports=u(Array,"Array",(function(e,t){l(this,{type:s,target:r(e),index:0,kind:t})}),(function(){var e=c(this),t=e.target,n=e.kind,r=e.index++;return!t||r>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:t[r],done:!1}:{value:[r,t[r]],done:!1}}),"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},1249:function(e,t,n){"use strict";var r=n(2109),i=n(2092).map;r({target:"Array",proto:!0,forced:!n(1194)("map")},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},7042:function(e,t,n){"use strict";var r=n(2109),i=n(111),o=n(3157),a=n(1400),u=n(7466),s=n(5656),l=n(6135),c=n(5112),f=n(1194)("slice"),p=c("species"),h=[].slice,d=Math.max;r({target:"Array",proto:!0,forced:!f},{slice:function(e,t){var n,r,c,f=s(this),v=u(f.length),y=a(e,v),g=a(void 0===t?v:t,v);if(o(f)&&("function"!=typeof(n=f.constructor)||n!==Array&&!o(n.prototype)?i(n)&&null===(n=n[p])&&(n=void 0):n=void 0,n===Array||void 0===n))return h.call(f,y,g);for(r=new(void 0===n?Array:n)(d(g-y,0)),c=0;y<g;y++,c++)y in f&&l(r,c,f[y]);return r.length=c,r}})},561:function(e,t,n){"use strict";var r=n(2109),i=n(1400),o=n(9958),a=n(7466),u=n(7908),s=n(5417),l=n(6135),c=n(1194)("splice"),f=Math.max,p=Math.min,h=9007199254740991,d="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!c},{splice:function(e,t){var n,r,c,v,y,g,m=u(this),b=a(m.length),x=i(e,b),w=arguments.length;if(0===w?n=r=0:1===w?(n=0,r=b-x):(n=w-2,r=p(f(o(t),0),b-x)),b+n-r>h)throw TypeError(d);for(c=s(m,r),v=0;v<r;v++)(y=x+v)in m&&l(c,v,m[y]);if(c.length=r,n<r){for(v=x;v<b-r;v++)g=v+n,(y=v+r)in m?m[g]=m[y]:delete m[g];for(v=b;v>b-r+n;v--)delete m[v-1]}else if(n>r)for(v=b-r;v>x;v--)g=v+n-1,(y=v+r-1)in m?m[g]=m[y]:delete m[g];for(v=0;v<n;v++)m[v+x]=arguments[v+2];return m.length=b-r+n,c}})},8309:function(e,t,n){var r=n(9781),i=n(3070).f,o=Function.prototype,a=o.toString,u=/^\s*function ([^ (]*)/,s="name";r&&!(s in o)&&i(o,s,{configurable:!0,get:function(){try{return a.call(this).match(u)[1]}catch(e){return""}}})},489:function(e,t,n){var r=n(2109),i=n(7293),o=n(7908),a=n(9518),u=n(8544);r({target:"Object",stat:!0,forced:i((function(){a(1)})),sham:!u},{getPrototypeOf:function(e){return a(o(e))}})},1539:function(e,t,n){var r=n(1694),i=n(1320),o=n(288);r||i(Object.prototype,"toString",o,{unsafe:!0})},4916:function(e,t,n){"use strict";var r=n(2109),i=n(2261);r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},9714:function(e,t,n){"use strict";var r=n(1320),i=n(9670),o=n(7293),a=n(7066),u="toString",s=RegExp.prototype,l=s.toString,c=o((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),f=l.name!=u;(c||f)&&r(RegExp.prototype,u,(function(){var e=i(this),t=String(e.source),n=e.flags;return"/"+t+"/"+String(void 0===n&&e instanceof RegExp&&!("flags"in s)?a.call(e):n)}),{unsafe:!0})},8783:function(e,t,n){"use strict";var r=n(8710).charAt,i=n(9909),o=n(654),a="String Iterator",u=i.set,s=i.getterFor(a);o(String,"String",(function(e){u(this,{type:a,string:String(e),index:0})}),(function(){var e,t=s(this),n=t.string,i=t.index;return i>=n.length?{value:void 0,done:!0}:(e=r(n,i),t.index+=e.length,{value:e,done:!1})}))},4723:function(e,t,n){"use strict";var r=n(7007),i=n(9670),o=n(7466),a=n(4488),u=n(1530),s=n(7651);r("match",1,(function(e,t,n){return[function(t){var n=a(this),r=null==t?void 0:t[e];return void 0!==r?r.call(t,n):new RegExp(t)[e](String(n))},function(e){var r=n(t,e,this);if(r.done)return r.value;var a=i(e),l=String(this);if(!a.global)return s(a,l);var c=a.unicode;a.lastIndex=0;for(var f,p=[],h=0;null!==(f=s(a,l));){var d=String(f[0]);p[h]=d,""===d&&(a.lastIndex=u(l,o(a.lastIndex),c)),h++}return 0===h?null:p}]}))},5306:function(e,t,n){"use strict";var r=n(7007),i=n(9670),o=n(7466),a=n(9958),u=n(4488),s=n(1530),l=n(647),c=n(7651),f=Math.max,p=Math.min;r("replace",2,(function(e,t,n,r){var h=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,d=r.REPLACE_KEEPS_$0,v=h?"$":"$0";return[function(n,r){var i=u(this),o=null==n?void 0:n[e];return void 0!==o?o.call(n,i,r):t.call(String(i),n,r)},function(e,r){if(!h&&d||"string"==typeof r&&-1===r.indexOf(v)){var u=n(t,e,this,r);if(u.done)return u.value}var y=i(e),g=String(this),m="function"==typeof r;m||(r=String(r));var b=y.global;if(b){var x=y.unicode;y.lastIndex=0}for(var w=[];;){var E=c(y,g);if(null===E)break;if(w.push(E),!b)break;""===String(E[0])&&(y.lastIndex=s(g,o(y.lastIndex),x))}for(var k,A="",S=0,F=0;F<w.length;F++){E=w[F];for(var T=String(E[0]),C=f(p(a(E.index),g.length),0),L=[],R=1;R<E.length;R++)L.push(void 0===(k=E[R])?k:String(k));var I=E.groups;if(m){var U=[T].concat(L,C,g);void 0!==I&&U.push(I);var O=String(r.apply(void 0,U))}else O=l(T,g,C,L,I,r);C>=S&&(A+=g.slice(S,C)+O,S=C+T.length)}return A+g.slice(S)}]}))},3123:function(e,t,n){"use strict";var r=n(7007),i=n(7850),o=n(9670),a=n(4488),u=n(6707),s=n(1530),l=n(7466),c=n(7651),f=n(2261),p=n(7293),h=[].push,d=Math.min,v=4294967295,y=!p((function(){return!RegExp(v,"y")}));r("split",2,(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=String(a(this)),o=void 0===n?v:n>>>0;if(0===o)return[];if(void 0===e)return[r];if(!i(e))return t.call(r,e,o);for(var u,s,l,c=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,y=new RegExp(e.source,p+"g");(u=f.call(y,r))&&!((s=y.lastIndex)>d&&(c.push(r.slice(d,u.index)),u.length>1&&u.index<r.length&&h.apply(c,u.slice(1)),l=u[0].length,d=s,c.length>=o));)y.lastIndex===u.index&&y.lastIndex++;return d===r.length?!l&&y.test("")||c.push(""):c.push(r.slice(d)),c.length>o?c.slice(0,o):c}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var i=a(this),o=null==t?void 0:t[e];return void 0!==o?o.call(t,i,n):r.call(String(i),t,n)},function(e,i){var a=n(r,e,this,i,r!==t);if(a.done)return a.value;var f=o(e),p=String(this),h=u(f,RegExp),g=f.unicode,m=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(y?"y":"g"),b=new h(y?f:"^(?:"+f.source+")",m),x=void 0===i?v:i>>>0;if(0===x)return[];if(0===p.length)return null===c(b,p)?[p]:[];for(var w=0,E=0,k=[];E<p.length;){b.lastIndex=y?E:0;var A,S=c(b,y?p:p.slice(E));if(null===S||(A=d(l(b.lastIndex+(y?0:E)),p.length))===w)E=s(p,E,g);else{if(k.push(p.slice(w,E)),k.length===x)return k;for(var F=1;F<=S.length-1;F++)if(k.push(S[F]),k.length===x)return k;E=w=A}}return k.push(p.slice(w)),k}]}),!y)},3210:function(e,t,n){"use strict";var r=n(2109),i=n(3111).trim;r({target:"String",proto:!0,forced:n(6091)("trim")},{trim:function(){return i(this)}})},2990:function(e,t,n){"use strict";var r=n(260),i=n(1048),o=r.aTypedArray;(0,r.exportTypedArrayMethod)("copyWithin",(function(e,t){return i.call(o(this),e,t,arguments.length>2?arguments[2]:void 0)}))},8927:function(e,t,n){"use strict";var r=n(260),i=n(2092).every,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("every",(function(e){return i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},3105:function(e,t,n){"use strict";var r=n(260),i=n(1285),o=r.aTypedArray;(0,r.exportTypedArrayMethod)("fill",(function(e){return i.apply(o(this),arguments)}))},5035:function(e,t,n){"use strict";var r=n(260),i=n(2092).filter,o=n(3074),a=r.aTypedArray;(0,r.exportTypedArrayMethod)("filter",(function(e){var t=i(a(this),e,arguments.length>1?arguments[1]:void 0);return o(this,t)}))},7174:function(e,t,n){"use strict";var r=n(260),i=n(2092).findIndex,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("findIndex",(function(e){return i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},4345:function(e,t,n){"use strict";var r=n(260),i=n(2092).find,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("find",(function(e){return i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},2846:function(e,t,n){"use strict";var r=n(260),i=n(2092).forEach,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("forEach",(function(e){i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},4731:function(e,t,n){"use strict";var r=n(260),i=n(1318).includes,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("includes",(function(e){return i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},7209:function(e,t,n){"use strict";var r=n(260),i=n(1318).indexOf,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("indexOf",(function(e){return i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},6319:function(e,t,n){"use strict";var r=n(7854),i=n(260),o=n(6992),a=n(5112)("iterator"),u=r.Uint8Array,s=o.values,l=o.keys,c=o.entries,f=i.aTypedArray,p=i.exportTypedArrayMethod,h=u&&u.prototype[a],d=!!h&&("values"==h.name||null==h.name),v=function(){return s.call(f(this))};p("entries",(function(){return c.call(f(this))})),p("keys",(function(){return l.call(f(this))})),p("values",v,!d),p(a,v,!d)},8867:function(e,t,n){"use strict";var r=n(260),i=r.aTypedArray,o=r.exportTypedArrayMethod,a=[].join;o("join",(function(e){return a.apply(i(this),arguments)}))},7789:function(e,t,n){"use strict";var r=n(260),i=n(6583),o=r.aTypedArray;(0,r.exportTypedArrayMethod)("lastIndexOf",(function(e){return i.apply(o(this),arguments)}))},3739:function(e,t,n){"use strict";var r=n(260),i=n(2092).map,o=n(6707),a=r.aTypedArray,u=r.aTypedArrayConstructor;(0,r.exportTypedArrayMethod)("map",(function(e){return i(a(this),e,arguments.length>1?arguments[1]:void 0,(function(e,t){return new(u(o(e,e.constructor)))(t)}))}))},4483:function(e,t,n){"use strict";var r=n(260),i=n(3671).right,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("reduceRight",(function(e){return i(o(this),e,arguments.length,arguments.length>1?arguments[1]:void 0)}))},9368:function(e,t,n){"use strict";var r=n(260),i=n(3671).left,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("reduce",(function(e){return i(o(this),e,arguments.length,arguments.length>1?arguments[1]:void 0)}))},2056:function(e,t,n){"use strict";var r=n(260),i=r.aTypedArray,o=r.exportTypedArrayMethod,a=Math.floor;o("reverse",(function(){for(var e,t=this,n=i(t).length,r=a(n/2),o=0;o<r;)e=t[o],t[o++]=t[--n],t[n]=e;return t}))},3462:function(e,t,n){"use strict";var r=n(260),i=n(7466),o=n(4590),a=n(7908),u=n(7293),s=r.aTypedArray;(0,r.exportTypedArrayMethod)("set",(function(e){s(this);var t=o(arguments.length>1?arguments[1]:void 0,1),n=this.length,r=a(e),u=i(r.length),l=0;if(u+t>n)throw RangeError("Wrong length");for(;l<u;)this[t+l]=r[l++]}),u((function(){new Int8Array(1).set({})})))},678:function(e,t,n){"use strict";var r=n(260),i=n(6707),o=n(7293),a=r.aTypedArray,u=r.aTypedArrayConstructor,s=r.exportTypedArrayMethod,l=[].slice;s("slice",(function(e,t){for(var n=l.call(a(this),e,t),r=i(this,this.constructor),o=0,s=n.length,c=new(u(r))(s);s>o;)c[o]=n[o++];return c}),o((function(){new Int8Array(1).slice()})))},7462:function(e,t,n){"use strict";var r=n(260),i=n(2092).some,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("some",(function(e){return i(o(this),e,arguments.length>1?arguments[1]:void 0)}))},3824:function(e,t,n){"use strict";var r=n(260),i=r.aTypedArray,o=r.exportTypedArrayMethod,a=[].sort;o("sort",(function(e){return a.call(i(this),e)}))},5021:function(e,t,n){"use strict";var r=n(260),i=n(7466),o=n(1400),a=n(6707),u=r.aTypedArray;(0,r.exportTypedArrayMethod)("subarray",(function(e,t){var n=u(this),r=n.length,s=o(e,r);return new(a(n,n.constructor))(n.buffer,n.byteOffset+s*n.BYTES_PER_ELEMENT,i((void 0===t?r:o(t,r))-s))}))},2974:function(e,t,n){"use strict";var r=n(7854),i=n(260),o=n(7293),a=r.Int8Array,u=i.aTypedArray,s=i.exportTypedArrayMethod,l=[].toLocaleString,c=[].slice,f=!!a&&o((function(){l.call(new a(1))}));s("toLocaleString",(function(){return l.apply(f?c.call(u(this)):u(this),arguments)}),o((function(){return[1,2].toLocaleString()!=new a([1,2]).toLocaleString()}))||!o((function(){a.prototype.toLocaleString.call([1,2])})))},5016:function(e,t,n){"use strict";var r=n(260).exportTypedArrayMethod,i=n(7293),o=n(7854).Uint8Array,a=o&&o.prototype||{},u=[].toString,s=[].join;i((function(){u.call({})}))&&(u=function(){return s.call(this)});var l=a.toString!=u;r("toString",u,l)},2472:function(e,t,n){n(9843)("Uint8",(function(e){return function(t,n,r){return e(this,t,n,r)}}))},4747:function(e,t,n){var r=n(7854),i=n(8324),o=n(8533),a=n(8880);for(var u in i){var s=r[u],l=s&&s.prototype;if(l&&l.forEach!==o)try{a(l,"forEach",o)}catch(e){l.forEach=o}}},3948:function(e,t,n){var r=n(7854),i=n(8324),o=n(6992),a=n(8880),u=n(5112),s=u("iterator"),l=u("toStringTag"),c=o.values;for(var f in i){var p=r[f],h=p&&p.prototype;if(h){if(h[s]!==c)try{a(h,s,c)}catch(e){h[s]=c}if(h[l]||a(h,l,f),i[f])for(var d in o)if(h[d]!==o[d])try{a(h,d,o[d])}catch(e){h[d]=o[d]}}}},1637:function(e,t,n){"use strict";n(6992);var r=n(2109),i=n(5005),o=n(590),a=n(1320),u=n(2248),s=n(8003),l=n(4994),c=n(9909),f=n(5787),p=n(6656),h=n(9974),d=n(648),v=n(9670),y=n(111),g=n(30),m=n(9114),b=n(8554),x=n(1246),w=n(5112),E=i("fetch"),k=i("Headers"),A=w("iterator"),S="URLSearchParams",F="URLSearchParamsIterator",T=c.set,C=c.getterFor(S),L=c.getterFor(F),R=/\+/g,I=Array(4),U=function(e){return I[e-1]||(I[e-1]=RegExp("((?:%[\\da-f]{2}){"+e+"})","gi"))},O=function(e){try{return decodeURIComponent(e)}catch(t){return e}},_=function(e){var t=e.replace(R," "),n=4;try{return decodeURIComponent(t)}catch(e){for(;n;)t=t.replace(U(n--),O);return t}},M=/[!'()~]|%20/g,z={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},P=function(e){return z[e]},j=function(e){return encodeURIComponent(e).replace(M,P)},D=function(e,t){if(t)for(var n,r,i=t.split("&"),o=0;o<i.length;)(n=i[o++]).length&&(r=n.split("="),e.push({key:_(r.shift()),value:_(r.join("="))}))},N=function(e){this.entries.length=0,D(this.entries,e)},B=function(e,t){if(e<t)throw TypeError("Not enough arguments")},q=l((function(e,t){T(this,{type:F,iterator:b(C(e).entries),kind:t})}),"Iterator",(function(){var e=L(this),t=e.kind,n=e.iterator.next(),r=n.value;return n.done||(n.value="keys"===t?r.key:"values"===t?r.value:[r.key,r.value]),n})),W=function(){f(this,W,S);var e,t,n,r,i,o,a,u,s,l=arguments.length>0?arguments[0]:void 0,c=this,h=[];if(T(c,{type:S,entries:h,updateURL:function(){},updateSearchParams:N}),void 0!==l)if(y(l))if("function"==typeof(e=x(l)))for(n=(t=e.call(l)).next;!(r=n.call(t)).done;){if((a=(o=(i=b(v(r.value))).next).call(i)).done||(u=o.call(i)).done||!o.call(i).done)throw TypeError("Expected sequence with length 2");h.push({key:a.value+"",value:u.value+""})}else for(s in l)p(l,s)&&h.push({key:s,value:l[s]+""});else D(h,"string"==typeof l?"?"===l.charAt(0)?l.slice(1):l:l+"")},H=W.prototype;u(H,{append:function(e,t){B(arguments.length,2);var n=C(this);n.entries.push({key:e+"",value:t+""}),n.updateURL()},delete:function(e){B(arguments.length,1);for(var t=C(this),n=t.entries,r=e+"",i=0;i<n.length;)n[i].key===r?n.splice(i,1):i++;t.updateURL()},get:function(e){B(arguments.length,1);for(var t=C(this).entries,n=e+"",r=0;r<t.length;r++)if(t[r].key===n)return t[r].value;return null},getAll:function(e){B(arguments.length,1);for(var t=C(this).entries,n=e+"",r=[],i=0;i<t.length;i++)t[i].key===n&&r.push(t[i].value);return r},has:function(e){B(arguments.length,1);for(var t=C(this).entries,n=e+"",r=0;r<t.length;)if(t[r++].key===n)return!0;return!1},set:function(e,t){B(arguments.length,1);for(var n,r=C(this),i=r.entries,o=!1,a=e+"",u=t+"",s=0;s<i.length;s++)(n=i[s]).key===a&&(o?i.splice(s--,1):(o=!0,n.value=u));o||i.push({key:a,value:u}),r.updateURL()},sort:function(){var e,t,n,r=C(this),i=r.entries,o=i.slice();for(i.length=0,n=0;n<o.length;n++){for(e=o[n],t=0;t<n;t++)if(i[t].key>e.key){i.splice(t,0,e);break}t===n&&i.push(e)}r.updateURL()},forEach:function(e){for(var t,n=C(this).entries,r=h(e,arguments.length>1?arguments[1]:void 0,3),i=0;i<n.length;)r((t=n[i++]).value,t.key,this)},keys:function(){return new q(this,"keys")},values:function(){return new q(this,"values")},entries:function(){return new q(this,"entries")}},{enumerable:!0}),a(H,A,H.entries),a(H,"toString",(function(){for(var e,t=C(this).entries,n=[],r=0;r<t.length;)e=t[r++],n.push(j(e.key)+"="+j(e.value));return n.join("&")}),{enumerable:!0}),s(W,S),r({global:!0,forced:!o},{URLSearchParams:W}),o||"function"!=typeof E||"function"!=typeof k||r({global:!0,enumerable:!0,forced:!0},{fetch:function(e){var t,n,r,i=[e];return arguments.length>1&&(y(t=arguments[1])&&(n=t.body,d(n)===S&&((r=t.headers?new k(t.headers):new k).has("content-type")||r.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),t=g(t,{body:m(0,String(n)),headers:m(0,r)}))),i.push(t)),E.apply(this,i)}}),e.exports={URLSearchParams:W,getState:C}},285:function(e,t,n){"use strict";n(8783);var r,i=n(2109),o=n(9781),a=n(590),u=n(7854),s=n(6048),l=n(1320),c=n(5787),f=n(6656),p=n(1574),h=n(8457),d=n(8710).codeAt,v=n(3197),y=n(8003),g=n(1637),m=n(9909),b=u.URL,x=g.URLSearchParams,w=g.getState,E=m.set,k=m.getterFor("URL"),A=Math.floor,S=Math.pow,F="Invalid scheme",T="Invalid host",C="Invalid port",L=/[A-Za-z]/,R=/[\d+-.A-Za-z]/,I=/\d/,U=/^(0x|0X)/,O=/^[0-7]+$/,_=/^\d+$/,M=/^[\dA-Fa-f]+$/,z=/[\u0000\t\u000A\u000D #%/:?@[\\]]/,P=/[\u0000\t\u000A\u000D #/:?@[\\]]/,j=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,D=/[\t\u000A\u000D]/g,N=function(e,t){var n,r,i;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return T;if(!(n=q(t.slice(1,-1))))return T;e.host=n}else if(X(e)){if(t=v(t),z.test(t))return T;if(null===(n=B(t)))return T;e.host=n}else{if(P.test(t))return T;for(n="",r=h(t),i=0;i<r.length;i++)n+=$(r[i],H);e.host=n}},B=function(e){var t,n,r,i,o,a,u,s=e.split(".");if(s.length&&""==s[s.length-1]&&s.pop(),(t=s.length)>4)return e;for(n=[],r=0;r<t;r++){if(""==(i=s[r]))return e;if(o=10,i.length>1&&"0"==i.charAt(0)&&(o=U.test(i)?16:8,i=i.slice(8==o?1:2)),""===i)a=0;else{if(!(10==o?_:8==o?O:M).test(i))return e;a=parseInt(i,o)}n.push(a)}for(r=0;r<t;r++)if(a=n[r],r==t-1){if(a>=S(256,5-t))return null}else if(a>255)return null;for(u=n.pop(),r=0;r<n.length;r++)u+=n[r]*S(256,3-r);return u},q=function(e){var t,n,r,i,o,a,u,s=[0,0,0,0,0,0,0,0],l=0,c=null,f=0,p=function(){return e.charAt(f)};if(":"==p()){if(":"!=e.charAt(1))return;f+=2,c=++l}for(;p();){if(8==l)return;if(":"!=p()){for(t=n=0;n<4&&M.test(p());)t=16*t+parseInt(p(),16),f++,n++;if("."==p()){if(0==n)return;if(f-=n,l>6)return;for(r=0;p();){if(i=null,r>0){if(!("."==p()&&r<4))return;f++}if(!I.test(p()))return;for(;I.test(p());){if(o=parseInt(p(),10),null===i)i=o;else{if(0==i)return;i=10*i+o}if(i>255)return;f++}s[l]=256*s[l]+i,2!=++r&&4!=r||l++}if(4!=r)return;break}if(":"==p()){if(f++,!p())return}else if(p())return;s[l++]=t}else{if(null!==c)return;f++,c=++l}}if(null!==c)for(a=l-c,l=7;0!=l&&a>0;)u=s[l],s[l--]=s[c+a-1],s[c+--a]=u;else if(8!=l)return;return s},W=function(e){var t,n,r,i;if("number"==typeof e){for(t=[],n=0;n<4;n++)t.unshift(e%256),e=A(e/256);return t.join(".")}if("object"==typeof e){for(t="",r=function(e){for(var t=null,n=1,r=null,i=0,o=0;o<8;o++)0!==e[o]?(i>n&&(t=r,n=i),r=null,i=0):(null===r&&(r=o),++i);return i>n&&(t=r,n=i),t}(e),n=0;n<8;n++)i&&0===e[n]||(i&&(i=!1),r===n?(t+=n?":":"::",i=!0):(t+=e[n].toString(16),n<7&&(t+=":")));return"["+t+"]"}return e},H={},Y=p({},H,{" ":1,'"':1,"<":1,">":1,"`":1}),G=p({},Y,{"#":1,"?":1,"{":1,"}":1}),Q=p({},G,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),$=function(e,t){var n=d(e,0);return n>32&&n<127&&!f(t,e)?e:encodeURIComponent(e)},V={ftp:21,file:null,http:80,https:443,ws:80,wss:443},X=function(e){return f(V,e.scheme)},K=function(e){return""!=e.username||""!=e.password},Z=function(e){return!e.host||e.cannotBeABaseURL||"file"==e.scheme},J=function(e,t){var n;return 2==e.length&&L.test(e.charAt(0))&&(":"==(n=e.charAt(1))||!t&&"|"==n)},ee=function(e){var t;return e.length>1&&J(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)},te=function(e){var t=e.path,n=t.length;!n||"file"==e.scheme&&1==n&&J(t[0],!0)||t.pop()},ne=function(e){return"."===e||"%2e"===e.toLowerCase()},re={},ie={},oe={},ae={},ue={},se={},le={},ce={},fe={},pe={},he={},de={},ve={},ye={},ge={},me={},be={},xe={},we={},Ee={},ke={},Ae=function(e,t,n,i){var o,a,u,s,l,c=n||re,p=0,d="",v=!1,y=!1,g=!1;for(n||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(j,"")),t=t.replace(D,""),o=h(t);p<=o.length;){switch(a=o[p],c){case re:if(!a||!L.test(a)){if(n)return F;c=oe;continue}d+=a.toLowerCase(),c=ie;break;case ie:if(a&&(R.test(a)||"+"==a||"-"==a||"."==a))d+=a.toLowerCase();else{if(":"!=a){if(n)return F;d="",c=oe,p=0;continue}if(n&&(X(e)!=f(V,d)||"file"==d&&(K(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=d,n)return void(X(e)&&V[e.scheme]==e.port&&(e.port=null));d="","file"==e.scheme?c=ye:X(e)&&i&&i.scheme==e.scheme?c=ae:X(e)?c=ce:"/"==o[p+1]?(c=ue,p++):(e.cannotBeABaseURL=!0,e.path.push(""),c=we)}break;case oe:if(!i||i.cannotBeABaseURL&&"#"!=a)return F;if(i.cannotBeABaseURL&&"#"==a){e.scheme=i.scheme,e.path=i.path.slice(),e.query=i.query,e.fragment="",e.cannotBeABaseURL=!0,c=ke;break}c="file"==i.scheme?ye:se;continue;case ae:if("/"!=a||"/"!=o[p+1]){c=se;continue}c=fe,p++;break;case ue:if("/"==a){c=pe;break}c=xe;continue;case se:if(e.scheme=i.scheme,a==r)e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query=i.query;else if("/"==a||"\\"==a&&X(e))c=le;else if("?"==a)e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query="",c=Ee;else{if("#"!=a){e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.path.pop(),c=xe;continue}e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,e.path=i.path.slice(),e.query=i.query,e.fragment="",c=ke}break;case le:if(!X(e)||"/"!=a&&"\\"!=a){if("/"!=a){e.username=i.username,e.password=i.password,e.host=i.host,e.port=i.port,c=xe;continue}c=pe}else c=fe;break;case ce:if(c=fe,"/"!=a||"/"!=d.charAt(p+1))continue;p++;break;case fe:if("/"!=a&&"\\"!=a){c=pe;continue}break;case pe:if("@"==a){v&&(d="%40"+d),v=!0,u=h(d);for(var m=0;m<u.length;m++){var b=u[m];if(":"!=b||g){var x=$(b,Q);g?e.password+=x:e.username+=x}else g=!0}d=""}else if(a==r||"/"==a||"?"==a||"#"==a||"\\"==a&&X(e)){if(v&&""==d)return"Invalid authority";p-=h(d).length+1,d="",c=he}else d+=a;break;case he:case de:if(n&&"file"==e.scheme){c=me;continue}if(":"!=a||y){if(a==r||"/"==a||"?"==a||"#"==a||"\\"==a&&X(e)){if(X(e)&&""==d)return T;if(n&&""==d&&(K(e)||null!==e.port))return;if(s=N(e,d))return s;if(d="",c=be,n)return;continue}"["==a?y=!0:"]"==a&&(y=!1),d+=a}else{if(""==d)return T;if(s=N(e,d))return s;if(d="",c=ve,n==de)return}break;case ve:if(!I.test(a)){if(a==r||"/"==a||"?"==a||"#"==a||"\\"==a&&X(e)||n){if(""!=d){var w=parseInt(d,10);if(w>65535)return C;e.port=X(e)&&w===V[e.scheme]?null:w,d=""}if(n)return;c=be;continue}return C}d+=a;break;case ye:if(e.scheme="file","/"==a||"\\"==a)c=ge;else{if(!i||"file"!=i.scheme){c=xe;continue}if(a==r)e.host=i.host,e.path=i.path.slice(),e.query=i.query;else if("?"==a)e.host=i.host,e.path=i.path.slice(),e.query="",c=Ee;else{if("#"!=a){ee(o.slice(p).join(""))||(e.host=i.host,e.path=i.path.slice(),te(e)),c=xe;continue}e.host=i.host,e.path=i.path.slice(),e.query=i.query,e.fragment="",c=ke}}break;case ge:if("/"==a||"\\"==a){c=me;break}i&&"file"==i.scheme&&!ee(o.slice(p).join(""))&&(J(i.path[0],!0)?e.path.push(i.path[0]):e.host=i.host),c=xe;continue;case me:if(a==r||"/"==a||"\\"==a||"?"==a||"#"==a){if(!n&&J(d))c=xe;else if(""==d){if(e.host="",n)return;c=be}else{if(s=N(e,d))return s;if("localhost"==e.host&&(e.host=""),n)return;d="",c=be}continue}d+=a;break;case be:if(X(e)){if(c=xe,"/"!=a&&"\\"!=a)continue}else if(n||"?"!=a)if(n||"#"!=a){if(a!=r&&(c=xe,"/"!=a))continue}else e.fragment="",c=ke;else e.query="",c=Ee;break;case xe:if(a==r||"/"==a||"\\"==a&&X(e)||!n&&("?"==a||"#"==a)){if(".."===(l=(l=d).toLowerCase())||"%2e."===l||".%2e"===l||"%2e%2e"===l?(te(e),"/"==a||"\\"==a&&X(e)||e.path.push("")):ne(d)?"/"==a||"\\"==a&&X(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&J(d)&&(e.host&&(e.host=""),d=d.charAt(0)+":"),e.path.push(d)),d="","file"==e.scheme&&(a==r||"?"==a||"#"==a))for(;e.path.length>1&&""===e.path[0];)e.path.shift();"?"==a?(e.query="",c=Ee):"#"==a&&(e.fragment="",c=ke)}else d+=$(a,G);break;case we:"?"==a?(e.query="",c=Ee):"#"==a?(e.fragment="",c=ke):a!=r&&(e.path[0]+=$(a,H));break;case Ee:n||"#"!=a?a!=r&&("'"==a&&X(e)?e.query+="%27":e.query+="#"==a?"%23":$(a,H)):(e.fragment="",c=ke);break;case ke:a!=r&&(e.fragment+=$(a,Y))}p++}},Se=function(e){var t,n,r=c(this,Se,"URL"),i=arguments.length>1?arguments[1]:void 0,a=String(e),u=E(r,{type:"URL"});if(void 0!==i)if(i instanceof Se)t=k(i);else if(n=Ae(t={},String(i)))throw TypeError(n);if(n=Ae(u,a,null,t))throw TypeError(n);var s=u.searchParams=new x,l=w(s);l.updateSearchParams(u.query),l.updateURL=function(){u.query=String(s)||null},o||(r.href=Te.call(r),r.origin=Ce.call(r),r.protocol=Le.call(r),r.username=Re.call(r),r.password=Ie.call(r),r.host=Ue.call(r),r.hostname=Oe.call(r),r.port=_e.call(r),r.pathname=Me.call(r),r.search=ze.call(r),r.searchParams=Pe.call(r),r.hash=je.call(r))},Fe=Se.prototype,Te=function(){var e=k(this),t=e.scheme,n=e.username,r=e.password,i=e.host,o=e.port,a=e.path,u=e.query,s=e.fragment,l=t+":";return null!==i?(l+="//",K(e)&&(l+=n+(r?":"+r:"")+"@"),l+=W(i),null!==o&&(l+=":"+o)):"file"==t&&(l+="//"),l+=e.cannotBeABaseURL?a[0]:a.length?"/"+a.join("/"):"",null!==u&&(l+="?"+u),null!==s&&(l+="#"+s),l},Ce=function(){var e=k(this),t=e.scheme,n=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(e){return"null"}return"file"!=t&&X(e)?t+"://"+W(e.host)+(null!==n?":"+n:""):"null"},Le=function(){return k(this).scheme+":"},Re=function(){return k(this).username},Ie=function(){return k(this).password},Ue=function(){var e=k(this),t=e.host,n=e.port;return null===t?"":null===n?W(t):W(t)+":"+n},Oe=function(){var e=k(this).host;return null===e?"":W(e)},_e=function(){var e=k(this).port;return null===e?"":String(e)},Me=function(){var e=k(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},ze=function(){var e=k(this).query;return e?"?"+e:""},Pe=function(){return k(this).searchParams},je=function(){var e=k(this).fragment;return e?"#"+e:""},De=function(e,t){return{get:e,set:t,configurable:!0,enumerable:!0}};if(o&&s(Fe,{href:De(Te,(function(e){var t=k(this),n=String(e),r=Ae(t,n);if(r)throw TypeError(r);w(t.searchParams).updateSearchParams(t.query)})),origin:De(Ce),protocol:De(Le,(function(e){var t=k(this);Ae(t,String(e)+":",re)})),username:De(Re,(function(e){var t=k(this),n=h(String(e));if(!Z(t)){t.username="";for(var r=0;r<n.length;r++)t.username+=$(n[r],Q)}})),password:De(Ie,(function(e){var t=k(this),n=h(String(e));if(!Z(t)){t.password="";for(var r=0;r<n.length;r++)t.password+=$(n[r],Q)}})),host:De(Ue,(function(e){var t=k(this);t.cannotBeABaseURL||Ae(t,String(e),he)})),hostname:De(Oe,(function(e){var t=k(this);t.cannotBeABaseURL||Ae(t,String(e),de)})),port:De(_e,(function(e){var t=k(this);Z(t)||(""==(e=String(e))?t.port=null:Ae(t,e,ve))})),pathname:De(Me,(function(e){var t=k(this);t.cannotBeABaseURL||(t.path=[],Ae(t,e+"",be))})),search:De(ze,(function(e){var t=k(this);""==(e=String(e))?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",Ae(t,e,Ee)),w(t.searchParams).updateSearchParams(t.query)})),searchParams:De(Pe),hash:De(je,(function(e){var t=k(this);""!=(e=String(e))?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",Ae(t,e,ke)):t.fragment=null}))}),l(Fe,"toJSON",(function(){return Te.call(this)}),{enumerable:!0}),l(Fe,"toString",(function(){return Te.call(this)}),{enumerable:!0}),b){var Ne=b.createObjectURL,Be=b.revokeObjectURL;Ne&&l(Se,"createObjectURL",(function(e){return Ne.apply(b,arguments)})),Be&&l(Se,"revokeObjectURL",(function(e){return Be.apply(b,arguments)}))}y(Se,"URL"),i({global:!0,forced:!a,sham:!o},{URL:Se})}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return function(){"use strict";function e(e,n){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return u=e.done,e},e:function(e){s=!0,a=e},f:function(){try{u||null==r.return||r.return()}finally{if(s)throw a}}}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(r),n.d(r,{Dropzone:function(){return b},default:function(){return A}}),n(2222),n(7327),n(2772),n(6992),n(1249),n(7042),n(561),n(8264),n(8309),n(489),n(1539),n(4916),n(9714),n(8783),n(4723),n(5306),n(3123),n(3210),n(2472),n(2990),n(8927),n(3105),n(5035),n(4345),n(7174),n(2846),n(4731),n(7209),n(6319),n(8867),n(7789),n(3739),n(9368),n(4483),n(2056),n(3462),n(678),n(7462),n(3824),n(5021),n(2974),n(5016),n(4747),n(3948),n(285);var o=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,r;return n=t,(r=[{key:"on",value:function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t),this}},{key:"emit",value:function(t){this._callbacks=this._callbacks||{};for(var n=this._callbacks[t],r=arguments.length,i=new Array(r>1?r-1:0),o=1;o<r;o++)i[o-1]=arguments[o];if(n){var a,u=e(n,!0);try{for(u.s();!(a=u.n()).done;){var s=a.value;s.apply(this,i)}}catch(e){u.e(e)}finally{u.f()}}return this.element&&this.element.dispatchEvent(this.makeEvent("dropzone:"+t,{args:i})),this}},{key:"makeEvent",value:function(e,t){var n={bubbles:!0,cancelable:!0,detail:t};if("function"==typeof window.CustomEvent)return new CustomEvent(e,n);var r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),r}},{key:"off",value:function(e,t){if(!this._callbacks||0===arguments.length)return this._callbacks={},this;var n=this._callbacks[e];if(!n)return this;if(1===arguments.length)return delete this._callbacks[e],this;for(var r=0;r<n.length;r++){var i=n[r];if(i===t){n.splice(r,1);break}}return this}}])&&i(n.prototype,r),t}();function a(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){s=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw o}}}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s={url:null,method:"post",withCredentials:!1,timeout:null,parallelUploads:2,uploadMultiple:!1,chunking:!1,forceChunking:!1,chunkSize:2e6,parallelChunkUploads:!1,retryChunks:!1,retryChunksLimit:3,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,thumbnailMethod:"crop",resizeWidth:null,resizeHeight:null,resizeMimeType:null,resizeQuality:.8,resizeMethod:"contain",filesizeBase:1e3,maxFiles:null,headers:null,clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,disablePreviews:!1,hiddenInputContainer:"body",capture:null,renameFilename:null,renameFile:null,forceFallback:!1,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictUploadCanceled:"Upload canceled.",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",dictFileSizeUnits:{tb:"TB",gb:"GB",mb:"MB",kb:"KB",b:"b"},init:function(){},params:function(e,t,n){if(n)return{dzuuid:n.file.upload.uuid,dzchunkindex:n.index,dztotalfilesize:n.file.size,dzchunksize:this.options.chunkSize,dztotalchunkcount:n.file.upload.totalChunkCount,dzchunkbyteoffset:n.index*this.options.chunkSize}},accept:function(e,t){return t()},chunksUploaded:function(e,t){t()},fallback:function(){var e;this.element.className="".concat(this.element.className," dz-browser-not-supported");var t,n=a(this.element.getElementsByTagName("div"),!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(/(^| )dz-message($| )/.test(r.className)){e=r,r.className="dz-message";break}}}catch(e){n.e(e)}finally{n.f()}e||(e=b.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(e));var i=e.getElementsByTagName("span")[0];return i&&(null!=i.textContent?i.textContent=this.options.dictFallbackMessage:null!=i.innerText&&(i.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(e,t,n,r){var i={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},o=e.width/e.height;null==t&&null==n?(t=i.srcWidth,n=i.srcHeight):null==t?t=n*o:null==n&&(n=t/o);var a=(t=Math.min(t,i.srcWidth))/(n=Math.min(n,i.srcHeight));if(i.srcWidth>t||i.srcHeight>n)if("crop"===r)o>a?(i.srcHeight=e.height,i.srcWidth=i.srcHeight*a):(i.srcWidth=e.width,i.srcHeight=i.srcWidth/a);else{if("contain"!==r)throw new Error("Unknown resizeMethod '".concat(r,"'"));o>a?n=t/o:t=n*o}return i.srcX=(e.width-i.srcWidth)/2,i.srcY=(e.height-i.srcHeight)/2,i.trgWidth=t,i.trgHeight=n,i},transformFile:function(e,t){return(this.options.resizeWidth||this.options.resizeHeight)&&e.type.match(/image.*/)?this.resizeImage(e,this.options.resizeWidth,this.options.resizeHeight,this.options.resizeMethod,t):t(e)},previewTemplate:'<div class="dz-preview dz-file-preview"> <div class="dz-image"><img data-dz-thumbnail/></div> <div class="dz-details"> <div class="dz-size"><span data-dz-size></span></div> <div class="dz-filename"><span data-dz-name></span></div> </div> <div class="dz-progress"> <span class="dz-upload" data-dz-uploadprogress></span> </div> <div class="dz-error-message"><span data-dz-errormessage></span></div> <div class="dz-success-mark"> <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Check</title> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path> </g> </svg> </div> <div class="dz-error-mark"> <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Error</title> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475"> <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path> </g> </g> </svg> </div> </div> ',drop:function(e){return this.element.classList.remove("dz-drag-hover")},dragstart:function(e){},dragend:function(e){return this.element.classList.remove("dz-drag-hover")},dragenter:function(e){return this.element.classList.add("dz-drag-hover")},dragover:function(e){return this.element.classList.add("dz-drag-hover")},dragleave:function(e){return this.element.classList.remove("dz-drag-hover")},paste:function(e){},reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(e){var t=this;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer&&!this.options.disablePreviews){e.previewElement=b.createElement(this.options.previewTemplate.trim()),e.previewTemplate=e.previewElement,this.previewsContainer.appendChild(e.previewElement);var n,r=a(e.previewElement.querySelectorAll("[data-dz-name]"),!0);try{for(r.s();!(n=r.n()).done;){var i=n.value;i.textContent=e.name}}catch(e){r.e(e)}finally{r.f()}var o,u=a(e.previewElement.querySelectorAll("[data-dz-size]"),!0);try{for(u.s();!(o=u.n()).done;)(i=o.value).innerHTML=this.filesize(e.size)}catch(e){u.e(e)}finally{u.f()}this.options.addRemoveLinks&&(e._removeLink=b.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'.concat(this.options.dictRemoveFile,"</a>")),e.previewElement.appendChild(e._removeLink));var s,l=function(n){return n.preventDefault(),n.stopPropagation(),e.status===b.UPLOADING?b.confirm(t.options.dictCancelUploadConfirmation,(function(){return t.removeFile(e)})):t.options.dictRemoveFileConfirmation?b.confirm(t.options.dictRemoveFileConfirmation,(function(){return t.removeFile(e)})):t.removeFile(e)},c=a(e.previewElement.querySelectorAll("[data-dz-remove]"),!0);try{for(c.s();!(s=c.n()).done;)s.value.addEventListener("click",l)}catch(e){c.e(e)}finally{c.f()}}},removedfile:function(e){return null!=e.previewElement&&null!=e.previewElement.parentNode&&e.previewElement.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){if(e.previewElement){e.previewElement.classList.remove("dz-file-preview");var n,r=a(e.previewElement.querySelectorAll("[data-dz-thumbnail]"),!0);try{for(r.s();!(n=r.n()).done;){var i=n.value;i.alt=e.name,i.src=t}}catch(e){r.e(e)}finally{r.f()}return setTimeout((function(){return e.previewElement.classList.add("dz-image-preview")}),1)}},error:function(e,t){if(e.previewElement){e.previewElement.classList.add("dz-error"),"string"!=typeof t&&t.error&&(t=t.error);var n,r=a(e.previewElement.querySelectorAll("[data-dz-errormessage]"),!0);try{for(r.s();!(n=r.n()).done;)n.value.textContent=t}catch(e){r.e(e)}finally{r.f()}}},errormultiple:function(){},processing:function(e){if(e.previewElement&&(e.previewElement.classList.add("dz-processing"),e._removeLink))return e._removeLink.innerHTML=this.options.dictCancelUpload},processingmultiple:function(){},uploadprogress:function(e,t,n){if(e.previewElement){var r,i=a(e.previewElement.querySelectorAll("[data-dz-uploadprogress]"),!0);try{for(i.s();!(r=i.n()).done;){var o=r.value;"PROGRESS"===o.nodeName?o.value=t:o.style.width="".concat(t,"%")}}catch(e){i.e(e)}finally{i.f()}}},totaluploadprogress:function(){},sending:function(){},sendingmultiple:function(){},success:function(e){if(e.previewElement)return e.previewElement.classList.add("dz-success")},successmultiple:function(){},canceled:function(e){return this.emit("error",e,this.options.dictUploadCanceled)},canceledmultiple:function(){},complete:function(e){if(e._removeLink&&(e._removeLink.innerHTML=this.options.dictRemoveFile),e.previewElement)return e.previewElement.classList.add("dz-complete")},completemultiple:function(){},maxfilesexceeded:function(){},maxfilesreached:function(){},queuecomplete:function(){},addedfiles:function(){}};function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw o}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return t&&h(e.prototype,t),n&&h(e,n),e}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?g(e):t}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(i,e);var t,n,r=(t=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=m(t);if(n){var i=m(this).constructor;e=Reflect.construct(r,arguments,i)}else e=r.apply(this,arguments);return y(this,e)});function i(e,t){var n,o,a;if(p(this,i),(n=r.call(this)).element=e,n.version=i.version,n.clickableElements=[],n.listeners=[],n.files=[],"string"==typeof n.element&&(n.element=document.querySelector(n.element)),!n.element||null==n.element.nodeType)throw new Error("Invalid dropzone element.");if(n.element.dropzone)throw new Error("Dropzone already attached.");i.instances.push(g(n)),n.element.dropzone=g(n);var u=null!=(a=i.optionsForElement(n.element))?a:{};if(n.options=i.extend({},s,u,null!=t?t:{}),n.options.previewTemplate=n.options.previewTemplate.replace(/\n*/g,""),n.options.forceFallback||!i.isBrowserSupported())return y(n,n.options.fallback.call(g(n)));if(null==n.options.url&&(n.options.url=n.element.getAttribute("action")),!n.options.url)throw new Error("No URL provided.");if(n.options.acceptedFiles&&n.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");if(n.options.uploadMultiple&&n.options.chunking)throw new Error("You cannot set both: uploadMultiple and chunking.");return n.options.acceptedMimeTypes&&(n.options.acceptedFiles=n.options.acceptedMimeTypes,delete n.options.acceptedMimeTypes),null!=n.options.renameFilename&&(n.options.renameFile=function(e){return n.options.renameFilename.call(g(n),e.name,e)}),"string"==typeof n.options.method&&(n.options.method=n.options.method.toUpperCase()),(o=n.getExistingFallback())&&o.parentNode&&o.parentNode.removeChild(o),!1!==n.options.previewsContainer&&(n.options.previewsContainer?n.previewsContainer=i.getElement(n.options.previewsContainer,"previewsContainer"):n.previewsContainer=n.element),n.options.clickable&&(!0===n.options.clickable?n.clickableElements=[n.element]:n.clickableElements=i.getElements(n.options.clickable,"clickable")),n.init(),n}return d(i,[{key:"getAcceptedFiles",value:function(){return this.files.filter((function(e){return e.accepted})).map((function(e){return e}))}},{key:"getRejectedFiles",value:function(){return this.files.filter((function(e){return!e.accepted})).map((function(e){return e}))}},{key:"getFilesWithStatus",value:function(e){return this.files.filter((function(t){return t.status===e})).map((function(e){return e}))}},{key:"getQueuedFiles",value:function(){return this.getFilesWithStatus(i.QUEUED)}},{key:"getUploadingFiles",value:function(){return this.getFilesWithStatus(i.UPLOADING)}},{key:"getAddedFiles",value:function(){return this.getFilesWithStatus(i.ADDED)}},{key:"getActiveFiles",value:function(){return this.files.filter((function(e){return e.status===i.UPLOADING||e.status===i.QUEUED})).map((function(e){return e}))}},{key:"init",value:function(){var e=this;"form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(i.createElement('<div class="dz-default dz-message"><button class="dz-button" type="button">'.concat(this.options.dictDefaultMessage,"</button></div>"))),this.clickableElements.length&&function t(){e.hiddenFileInput&&e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput),e.hiddenFileInput=document.createElement("input"),e.hiddenFileInput.setAttribute("type","file"),(null===e.options.maxFiles||e.options.maxFiles>1)&&e.hiddenFileInput.setAttribute("multiple","multiple"),e.hiddenFileInput.className="dz-hidden-input",null!==e.options.acceptedFiles&&e.hiddenFileInput.setAttribute("accept",e.options.acceptedFiles),null!==e.options.capture&&e.hiddenFileInput.setAttribute("capture",e.options.capture),e.hiddenFileInput.setAttribute("tabindex","-1"),e.hiddenFileInput.style.visibility="hidden",e.hiddenFileInput.style.position="absolute",e.hiddenFileInput.style.top="0",e.hiddenFileInput.style.left="0",e.hiddenFileInput.style.height="0",e.hiddenFileInput.style.width="0",i.getElement(e.options.hiddenInputContainer,"hiddenInputContainer").appendChild(e.hiddenFileInput),e.hiddenFileInput.addEventListener("change",(function(){var n=e.hiddenFileInput.files;if(n.length){var r,i=c(n,!0);try{for(i.s();!(r=i.n()).done;){var o=r.value;e.addFile(o)}}catch(e){i.e(e)}finally{i.f()}}e.emit("addedfiles",n),t()}))}(),this.URL=null!==window.URL?window.URL:window.webkitURL;var t,n=c(this.events,!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;this.on(r,this.options[r])}}catch(e){n.e(e)}finally{n.f()}this.on("uploadprogress",(function(){return e.updateTotalUploadProgress()})),this.on("removedfile",(function(){return e.updateTotalUploadProgress()})),this.on("canceled",(function(t){return e.emit("complete",t)})),this.on("complete",(function(t){if(0===e.getAddedFiles().length&&0===e.getUploadingFiles().length&&0===e.getQueuedFiles().length)return setTimeout((function(){return e.emit("queuecomplete")}),0)}));var o=function(e){if(function(e){if(e.dataTransfer.types)for(var t=0;t<e.dataTransfer.types.length;t++)if("Files"===e.dataTransfer.types[t])return!0;return!1}(e))return e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1};return this.listeners=[{element:this.element,events:{dragstart:function(t){return e.emit("dragstart",t)},dragenter:function(t){return o(t),e.emit("dragenter",t)},dragover:function(t){var n;try{n=t.dataTransfer.effectAllowed}catch(e){}return t.dataTransfer.dropEffect="move"===n||"linkMove"===n?"move":"copy",o(t),e.emit("dragover",t)},dragleave:function(t){return e.emit("dragleave",t)},drop:function(t){return o(t),e.drop(t)},dragend:function(t){return e.emit("dragend",t)}}}],this.clickableElements.forEach((function(t){return e.listeners.push({element:t,events:{click:function(n){return(t!==e.element||n.target===e.element||i.elementInside(n.target,e.element.querySelector(".dz-message")))&&e.hiddenFileInput.click(),!0}}})})),this.enable(),this.options.init.call(this)}},{key:"destroy",value:function(){return this.disable(),this.removeAllFiles(!0),(null!=this.hiddenFileInput?this.hiddenFileInput.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,i.instances.splice(i.instances.indexOf(this),1)}},{key:"updateTotalUploadProgress",value:function(){var e,t=0,n=0;if(this.getActiveFiles().length){var r,i=c(this.getActiveFiles(),!0);try{for(i.s();!(r=i.n()).done;){var o=r.value;t+=o.upload.bytesSent,n+=o.upload.total}}catch(e){i.e(e)}finally{i.f()}e=100*t/n}else e=100;return this.emit("totaluploadprogress",e,n,t)}},{key:"_getParamName",value:function(e){return"function"==typeof this.options.paramName?this.options.paramName(e):"".concat(this.options.paramName).concat(this.options.uploadMultiple?"[".concat(e,"]"):"")}},{key:"_renameFile",value:function(e){return"function"!=typeof this.options.renameFile?e.name:this.options.renameFile(e)}},{key:"getFallbackForm",value:function(){var e,t;if(e=this.getExistingFallback())return e;var n='<div class="dz-fallback">';this.options.dictFallbackText&&(n+="<p>".concat(this.options.dictFallbackText,"</p>")),n+='<input type="file" name="'.concat(this._getParamName(0),'" ').concat(this.options.uploadMultiple?'multiple="multiple"':void 0,' /><input type="submit" value="Upload!"></div>');var r=i.createElement(n);return"FORM"!==this.element.tagName?(t=i.createElement('<form action="'.concat(this.options.url,'" enctype="multipart/form-data" method="').concat(this.options.method,'"></form>'))).appendChild(r):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=t?t:r}},{key:"getExistingFallback",value:function(){for(var e=function(e){var t,n=c(e,!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(/(^| )fallback($| )/.test(r.className))return r}}catch(e){n.e(e)}finally{n.f()}},t=0,n=["div","form"];t<n.length;t++){var r,i=n[t];if(r=e(this.element.getElementsByTagName(i)))return r}}},{key:"setupEventListeners",value:function(){return this.listeners.map((function(e){return function(){var t=[];for(var n in e.events){var r=e.events[n];t.push(e.element.addEventListener(n,r,!1))}return t}()}))}},{key:"removeEventListeners",value:function(){return this.listeners.map((function(e){return function(){var t=[];for(var n in e.events){var r=e.events[n];t.push(e.element.removeEventListener(n,r,!1))}return t}()}))}},{key:"disable",value:function(){var e=this;return this.clickableElements.forEach((function(e){return e.classList.remove("dz-clickable")})),this.removeEventListeners(),this.disabled=!0,this.files.map((function(t){return e.cancelUpload(t)}))}},{key:"enable",value:function(){return delete this.disabled,this.clickableElements.forEach((function(e){return e.classList.add("dz-clickable")})),this.setupEventListeners()}},{key:"filesize",value:function(e){var t=0,n="b";if(e>0){for(var r=["tb","gb","mb","kb","b"],i=0;i<r.length;i++){var o=r[i];if(e>=Math.pow(this.options.filesizeBase,4-i)/10){t=e/Math.pow(this.options.filesizeBase,4-i),n=o;break}}t=Math.round(10*t)/10}return"<strong>".concat(t,"</strong> ").concat(this.options.dictFileSizeUnits[n])}},{key:"_updateMaxFilesReachedClass",value:function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")}},{key:"drop",value:function(e){if(e.dataTransfer){this.emit("drop",e);for(var t=[],n=0;n<e.dataTransfer.files.length;n++)t[n]=e.dataTransfer.files[n];if(t.length){var r=e.dataTransfer.items;r&&r.length&&null!=r[0].webkitGetAsEntry?this._addFilesFromItems(r):this.handleFiles(t)}this.emit("addedfiles",t)}}},{key:"paste",value:function(e){if(null!=(null!=(t=null!=e?e.clipboardData:void 0)?function(e){return e.items}(t):void 0)){var t;this.emit("paste",e);var n=e.clipboardData.items;return n.length?this._addFilesFromItems(n):void 0}}},{key:"handleFiles",value:function(e){var t,n=c(e,!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;this.addFile(r)}}catch(e){n.e(e)}finally{n.f()}}},{key:"_addFilesFromItems",value:function(e){var t=this;return function(){var n,r=[],i=c(e,!0);try{for(i.s();!(n=i.n()).done;){var o,a=n.value;null!=a.webkitGetAsEntry&&(o=a.webkitGetAsEntry())?o.isFile?r.push(t.addFile(a.getAsFile())):o.isDirectory?r.push(t._addFilesFromDirectory(o,o.name)):r.push(void 0):null==a.getAsFile||null!=a.kind&&"file"!==a.kind?r.push(void 0):r.push(t.addFile(a.getAsFile()))}}catch(e){i.e(e)}finally{i.f()}return r}()}},{key:"_addFilesFromDirectory",value:function(e,t){var n=this,r=e.createReader(),i=function(e){return"log",n=function(t){return t.log(e)},null!=(t=console)&&"function"==typeof t.log?n(t):void 0;var t,n};return function e(){return r.readEntries((function(r){if(r.length>0){var i,o=c(r,!0);try{for(o.s();!(i=o.n()).done;){var a=i.value;a.isFile?a.file((function(e){if(!n.options.ignoreHiddenFiles||"."!==e.name.substring(0,1))return e.fullPath="".concat(t,"/").concat(e.name),n.addFile(e)})):a.isDirectory&&n._addFilesFromDirectory(a,"".concat(t,"/").concat(a.name))}}catch(e){o.e(e)}finally{o.f()}e()}return null}),i)}()}},{key:"accept",value:function(e,t){this.options.maxFilesize&&e.size>1024*this.options.maxFilesize*1024?t(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(e.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):i.isValidFile(e,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",e)):this.options.accept.call(this,e,t):t(this.options.dictInvalidFileType)}},{key:"addFile",value:function(e){var t=this;e.upload={uuid:i.uuidv4(),progress:0,total:e.size,bytesSent:0,filename:this._renameFile(e)},this.files.push(e),e.status=i.ADDED,this.emit("addedfile",e),this._enqueueThumbnail(e),this.accept(e,(function(n){n?(e.accepted=!1,t._errorProcessing([e],n)):(e.accepted=!0,t.options.autoQueue&&t.enqueueFile(e)),t._updateMaxFilesReachedClass()}))}},{key:"enqueueFiles",value:function(e){var t,n=c(e,!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;this.enqueueFile(r)}}catch(e){n.e(e)}finally{n.f()}return null}},{key:"enqueueFile",value:function(e){var t=this;if(e.status!==i.ADDED||!0!==e.accepted)throw new Error("This file can't be queued because it has already been processed or was rejected.");if(e.status=i.QUEUED,this.options.autoProcessQueue)return setTimeout((function(){return t.processQueue()}),0)}},{key:"_enqueueThumbnail",value:function(e){var t=this;if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout((function(){return t._processThumbnailQueue()}),0)}},{key:"_processThumbnailQueue",value:function(){var e=this;if(!this._processingThumbnail&&0!==this._thumbnailQueue.length){this._processingThumbnail=!0;var t=this._thumbnailQueue.shift();return this.createThumbnail(t,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.thumbnailMethod,!0,(function(n){return e.emit("thumbnail",t,n),e._processingThumbnail=!1,e._processThumbnailQueue()}))}}},{key:"removeFile",value:function(e){if(e.status===i.UPLOADING&&this.cancelUpload(e),this.files=x(this.files,e),this.emit("removedfile",e),0===this.files.length)return this.emit("reset")}},{key:"removeAllFiles",value:function(e){null==e&&(e=!1);var t,n=c(this.files.slice(),!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;(r.status!==i.UPLOADING||e)&&this.removeFile(r)}}catch(e){n.e(e)}finally{n.f()}return null}},{key:"resizeImage",value:function(e,t,n,r,o){var a=this;return this.createThumbnail(e,t,n,r,!0,(function(t,n){if(null==n)return o(e);var r=a.options.resizeMimeType;null==r&&(r=e.type);var u=n.toDataURL(r,a.options.resizeQuality);return"image/jpeg"!==r&&"image/jpg"!==r||(u=k.restore(e.dataURL,u)),o(i.dataURItoBlob(u))}))}},{key:"createThumbnail",value:function(e,t,n,r,i,o){var a=this,u=new FileReader;u.onload=function(){e.dataURL=u.result,"image/svg+xml"!==e.type?a.createThumbnailFromUrl(e,t,n,r,i,o):null!=o&&o(u.result)},u.readAsDataURL(e)}},{key:"displayExistingFile",value:function(e,t,n,r){var i=this,o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(this.emit("addedfile",e),this.emit("complete",e),o){var a=function(t){i.emit("thumbnail",e,t),n&&n()};e.dataURL=t,this.createThumbnailFromUrl(e,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.thumbnailMethod,this.options.fixOrientation,a,r)}else this.emit("thumbnail",e,t),n&&n()}},{key:"createThumbnailFromUrl",value:function(e,t,n,r,i,o,a){var u=this,s=document.createElement("img");return a&&(s.crossOrigin=a),i="from-image"!=getComputedStyle(document.body).imageOrientation&&i,s.onload=function(){var a=function(e){return e(1)};return"undefined"!=typeof EXIF&&null!==EXIF&&i&&(a=function(e){return EXIF.getData(s,(function(){return e(EXIF.getTag(this,"Orientation"))}))}),a((function(i){e.width=s.width,e.height=s.height;var a=u.options.resize.call(u,e,t,n,r),l=document.createElement("canvas"),c=l.getContext("2d");switch(l.width=a.trgWidth,l.height=a.trgHeight,i>4&&(l.width=a.trgHeight,l.height=a.trgWidth),i){case 2:c.translate(l.width,0),c.scale(-1,1);break;case 3:c.translate(l.width,l.height),c.rotate(Math.PI);break;case 4:c.translate(0,l.height),c.scale(1,-1);break;case 5:c.rotate(.5*Math.PI),c.scale(1,-1);break;case 6:c.rotate(.5*Math.PI),c.translate(0,-l.width);break;case 7:c.rotate(.5*Math.PI),c.translate(l.height,-l.width),c.scale(-1,1);break;case 8:c.rotate(-.5*Math.PI),c.translate(-l.height,0)}E(c,s,null!=a.srcX?a.srcX:0,null!=a.srcY?a.srcY:0,a.srcWidth,a.srcHeight,null!=a.trgX?a.trgX:0,null!=a.trgY?a.trgY:0,a.trgWidth,a.trgHeight);var f=l.toDataURL("image/png");if(null!=o)return o(f,l)}))},null!=o&&(s.onerror=o),s.src=e.dataURL}},{key:"processQueue",value:function(){var e=this.options.parallelUploads,t=this.getUploadingFiles().length,n=t;if(!(t>=e)){var r=this.getQueuedFiles();if(r.length>0){if(this.options.uploadMultiple)return this.processFiles(r.slice(0,e-t));for(;n<e;){if(!r.length)return;this.processFile(r.shift()),n++}}}}},{key:"processFile",value:function(e){return this.processFiles([e])}},{key:"processFiles",value:function(e){var t,n=c(e,!0);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.processing=!0,r.status=i.UPLOADING,this.emit("processing",r)}}catch(e){n.e(e)}finally{n.f()}return this.options.uploadMultiple&&this.emit("processingmultiple",e),this.uploadFiles(e)}},{key:"_getFilesWithXhr",value:function(e){return this.files.filter((function(t){return t.xhr===e})).map((function(e){return e}))}},{key:"cancelUpload",value:function(e){if(e.status===i.UPLOADING){var t,n=this._getFilesWithXhr(e.xhr),r=c(n,!0);try{for(r.s();!(t=r.n()).done;)t.value.status=i.CANCELED}catch(e){r.e(e)}finally{r.f()}void 0!==e.xhr&&e.xhr.abort();var o,a=c(n,!0);try{for(a.s();!(o=a.n()).done;){var u=o.value;this.emit("canceled",u)}}catch(e){a.e(e)}finally{a.f()}this.options.uploadMultiple&&this.emit("canceledmultiple",n)}else e.status!==i.ADDED&&e.status!==i.QUEUED||(e.status=i.CANCELED,this.emit("canceled",e),this.options.uploadMultiple&&this.emit("canceledmultiple",[e]));if(this.options.autoProcessQueue)return this.processQueue()}},{key:"resolveOption",value:function(e){if("function"==typeof e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.apply(this,n)}return e}},{key:"uploadFile",value:function(e){return this.uploadFiles([e])}},{key:"uploadFiles",value:function(e){var t=this;this._transformFiles(e,(function(n){if(t.options.chunking){var r=n[0];e[0].upload.chunked=t.options.chunking&&(t.options.forceChunking||r.size>t.options.chunkSize),e[0].upload.totalChunkCount=Math.ceil(r.size/t.options.chunkSize)}if(e[0].upload.chunked){var o=e[0],a=n[0];o.upload.chunks=[];var u=function(){for(var n=0;void 0!==o.upload.chunks[n];)n++;if(!(n>=o.upload.totalChunkCount)){var r=n*t.options.chunkSize,u=Math.min(r+t.options.chunkSize,a.size),s={name:t._getParamName(0),data:a.webkitSlice?a.webkitSlice(r,u):a.slice(r,u),filename:o.upload.filename,chunkIndex:n};o.upload.chunks[n]={file:o,index:n,dataBlock:s,status:i.UPLOADING,progress:0,retries:0},t._uploadData(e,[s])}};if(o.upload.finishedChunkUpload=function(n,r){var a=!0;n.status=i.SUCCESS,n.dataBlock=null,n.xhr=null;for(var s=0;s<o.upload.totalChunkCount;s++){if(void 0===o.upload.chunks[s])return u();o.upload.chunks[s].status!==i.SUCCESS&&(a=!1)}a&&t.options.chunksUploaded(o,(function(){t._finished(e,r,null)}))},t.options.parallelChunkUploads)for(var s=0;s<o.upload.totalChunkCount;s++)u();else u()}else{for(var l=[],c=0;c<e.length;c++)l[c]={name:t._getParamName(c),data:n[c],filename:e[c].upload.filename};t._uploadData(e,l)}}))}},{key:"_getChunk",value:function(e,t){for(var n=0;n<e.upload.totalChunkCount;n++)if(void 0!==e.upload.chunks[n]&&e.upload.chunks[n].xhr===t)return e.upload.chunks[n]}},{key:"_uploadData",value:function(e,t){var n,r=this,o=new XMLHttpRequest,a=c(e,!0);try{for(a.s();!(n=a.n()).done;)n.value.xhr=o}catch(e){a.e(e)}finally{a.f()}e[0].upload.chunked&&(e[0].upload.chunks[t[0].chunkIndex].xhr=o);var u=this.resolveOption(this.options.method,e),s=this.resolveOption(this.options.url,e);o.open(u,s,!0),this.resolveOption(this.options.timeout,e)&&(o.timeout=this.resolveOption(this.options.timeout,e)),o.withCredentials=!!this.options.withCredentials,o.onload=function(t){r._finishedUploading(e,o,t)},o.ontimeout=function(){r._handleUploadError(e,o,"Request timedout after ".concat(r.options.timeout/1e3," seconds"))},o.onerror=function(){r._handleUploadError(e,o)},(null!=o.upload?o.upload:o).onprogress=function(t){return r._updateFilesUploadProgress(e,o,t)};var l={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};for(var f in this.options.headers&&i.extend(l,this.options.headers),l){var p=l[f];p&&o.setRequestHeader(f,p)}var h=new FormData;if(this.options.params){var d=this.options.params;for(var v in"function"==typeof d&&(d=d.call(this,e,o,e[0].upload.chunked?this._getChunk(e[0],o):null)),d){var y=d[v];if(Array.isArray(y))for(var g=0;g<y.length;g++)h.append(v,y[g]);else h.append(v,y)}}var m,b=c(e,!0);try{for(b.s();!(m=b.n()).done;){var x=m.value;this.emit("sending",x,o,h)}}catch(e){b.e(e)}finally{b.f()}this.options.uploadMultiple&&this.emit("sendingmultiple",e,o,h),this._addFormElementData(h);for(var w=0;w<t.length;w++){var E=t[w];h.append(E.name,E.data,E.filename)}this.submitRequest(o,h,e)}},{key:"_transformFiles",value:function(e,t){for(var n=this,r=[],i=0,o=function(o){n.options.transformFile.call(n,e[o],(function(n){r[o]=n,++i===e.length&&t(r)}))},a=0;a<e.length;a++)o(a)}},{key:"_addFormElementData",value:function(e){if("FORM"===this.element.tagName){var t,n=c(this.element.querySelectorAll("input, textarea, select, button"),!0);try{for(n.s();!(t=n.n()).done;){var r=t.value,i=r.getAttribute("name"),o=r.getAttribute("type");if(o&&(o=o.toLowerCase()),null!=i)if("SELECT"===r.tagName&&r.hasAttribute("multiple")){var a,u=c(r.options,!0);try{for(u.s();!(a=u.n()).done;){var s=a.value;s.selected&&e.append(i,s.value)}}catch(e){u.e(e)}finally{u.f()}}else(!o||"checkbox"!==o&&"radio"!==o||r.checked)&&e.append(i,r.value)}}catch(e){n.e(e)}finally{n.f()}}}},{key:"_updateFilesUploadProgress",value:function(e,t,n){if(e[0].upload.chunked){var r=e[0],i=this._getChunk(r,t);n?(i.progress=100*n.loaded/n.total,i.total=n.total,i.bytesSent=n.loaded):(i.progress=100,i.bytesSent=i.total),r.upload.progress=0,r.upload.total=0,r.upload.bytesSent=0;for(var o=0;o<r.upload.totalChunkCount;o++)r.upload.chunks[o]&&void 0!==r.upload.chunks[o].progress&&(r.upload.progress+=r.upload.chunks[o].progress,r.upload.total+=r.upload.chunks[o].total,r.upload.bytesSent+=r.upload.chunks[o].bytesSent);r.upload.progress=r.upload.progress/r.upload.totalChunkCount,this.emit("uploadprogress",r,r.upload.progress,r.upload.bytesSent)}else{var a,u=c(e,!0);try{for(u.s();!(a=u.n()).done;){var s=a.value;s.upload.total&&s.upload.bytesSent&&s.upload.bytesSent==s.upload.total||(n?(s.upload.progress=100*n.loaded/n.total,s.upload.total=n.total,s.upload.bytesSent=n.loaded):(s.upload.progress=100,s.upload.bytesSent=s.upload.total),this.emit("uploadprogress",s,s.upload.progress,s.upload.bytesSent))}}catch(e){u.e(e)}finally{u.f()}}}},{key:"_finishedUploading",value:function(e,t,n){var r;if(e[0].status!==i.CANCELED&&4===t.readyState){if("arraybuffer"!==t.responseType&&"blob"!==t.responseType&&(r=t.responseText,t.getResponseHeader("content-type")&&~t.getResponseHeader("content-type").indexOf("application/json")))try{r=JSON.parse(r)}catch(e){n=e,r="Invalid JSON response from server."}this._updateFilesUploadProgress(e,t),200<=t.status&&t.status<300?e[0].upload.chunked?e[0].upload.finishedChunkUpload(this._getChunk(e[0],t),r):this._finished(e,r,n):this._handleUploadError(e,t,r)}}},{key:"_handleUploadError",value:function(e,t,n){if(e[0].status!==i.CANCELED){if(e[0].upload.chunked&&this.options.retryChunks){var r=this._getChunk(e[0],t);if(r.retries++<this.options.retryChunksLimit)return void this._uploadData(e,[r.dataBlock]);console.warn("Retried this chunk too often. Giving up.")}this._errorProcessing(e,n||this.options.dictResponseError.replace("{{statusCode}}",t.status),t)}}},{key:"submitRequest",value:function(e,t,n){1==e.readyState?e.send(t):console.warn("Cannot send this request because the XMLHttpRequest.readyState is not OPENED.")}},{key:"_finished",value:function(e,t,n){var r,o=c(e,!0);try{for(o.s();!(r=o.n()).done;){var a=r.value;a.status=i.SUCCESS,this.emit("success",a,t,n),this.emit("complete",a)}}catch(e){o.e(e)}finally{o.f()}if(this.options.uploadMultiple&&(this.emit("successmultiple",e,t,n),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()}},{key:"_errorProcessing",value:function(e,t,n){var r,o=c(e,!0);try{for(o.s();!(r=o.n()).done;){var a=r.value;a.status=i.ERROR,this.emit("error",a,t,n),this.emit("complete",a)}}catch(e){o.e(e)}finally{o.f()}if(this.options.uploadMultiple&&(this.emit("errormultiple",e,t,n),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()}}],[{key:"initClass",value:function(){this.prototype.Emitter=o,this.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],this.prototype._thumbnailQueue=[],this.prototype._processingThumbnail=!1}},{key:"extend",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var i=0,o=n;i<o.length;i++){var a=o[i];for(var u in a){var s=a[u];e[u]=s}}return e}},{key:"uuidv4",value:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}}]),i}(o);b.initClass(),b.version="5.9.3",b.options={},b.optionsForElement=function(e){return e.getAttribute("id")?b.options[w(e.getAttribute("id"))]:void 0},b.instances=[],b.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return e.dropzone},b.autoDiscover=!0,b.discover=function(){var e;if(document.querySelectorAll)e=document.querySelectorAll(".dropzone");else{e=[];var t=function(t){return function(){var n,r=[],i=c(t,!0);try{for(i.s();!(n=i.n()).done;){var o=n.value;/(^| )dropzone($| )/.test(o.className)?r.push(e.push(o)):r.push(void 0)}}catch(e){i.e(e)}finally{i.f()}return r}()};t(document.getElementsByTagName("div")),t(document.getElementsByTagName("form"))}return function(){var t,n=[],r=c(e,!0);try{for(r.s();!(t=r.n()).done;){var i=t.value;!1!==b.optionsForElement(i)?n.push(new b(i)):n.push(void 0)}}catch(e){r.e(e)}finally{r.f()}return n}()},b.blockedBrowsers=[/opera.*(Macintosh|Windows Phone).*version\/12/i],b.isBrowserSupported=function(){var e=!0;if(window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a")){void 0!==b.blacklistedBrowsers&&(b.blockedBrowsers=b.blacklistedBrowsers);var t,n=c(b.blockedBrowsers,!0);try{for(n.s();!(t=n.n()).done;)t.value.test(navigator.userAgent)&&(e=!1)}catch(e){n.e(e)}finally{n.f()}}else e=!1;else e=!1;return e},b.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],r=new ArrayBuffer(t.length),i=new Uint8Array(r),o=0,a=t.length,u=0<=a;u?o<=a:o>=a;u?o++:o--)i[o]=t.charCodeAt(o);return new Blob([r],{type:n})};var x=function(e,t){return e.filter((function(e){return e!==t})).map((function(e){return e}))},w=function(e){return e.replace(/[\-_](\w)/g,(function(e){return e.charAt(1).toUpperCase()}))};b.createElement=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]},b.elementInside=function(e,t){if(e===t)return!0;for(;e=e.parentNode;)if(e===t)return!0;return!1},b.getElement=function(e,t){var n;if("string"==typeof e?n=document.querySelector(e):null!=e.nodeType&&(n=e),null==n)throw new Error("Invalid `".concat(t,"` option provided. Please provide a CSS selector or a plain HTML element."));return n},b.getElements=function(e,t){var n,r;if(e instanceof Array){r=[];try{var i,o=c(e,!0);try{for(o.s();!(i=o.n()).done;)n=i.value,r.push(this.getElement(n,t))}catch(e){o.e(e)}finally{o.f()}}catch(e){r=null}}else if("string"==typeof e){r=[];var a,u=c(document.querySelectorAll(e),!0);try{for(u.s();!(a=u.n()).done;)n=a.value,r.push(n)}catch(e){u.e(e)}finally{u.f()}}else null!=e.nodeType&&(r=[e]);if(null==r||!r.length)throw new Error("Invalid `".concat(t,"` option provided. Please provide a CSS selector, a plain HTML element or a list of those."));return r},b.confirm=function(e,t,n){return window.confirm(e)?t():null!=n?n():void 0},b.isValidFile=function(e,t){if(!t)return!0;t=t.split(",");var n,r=e.type,i=r.replace(/\/.*$/,""),o=c(t,!0);try{for(o.s();!(n=o.n()).done;){var a=n.value;if("."===(a=a.trim()).charAt(0)){if(-1!==e.name.toLowerCase().indexOf(a.toLowerCase(),e.name.length-a.length))return!0}else if(/\/\*$/.test(a)){if(i===a.replace(/\/.*$/,""))return!0}else if(r===a)return!0}}catch(e){o.e(e)}finally{o.f()}return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(e){return this.each((function(){return new b(this,e)}))}),b.ADDED="added",b.QUEUED="queued",b.ACCEPTED=b.QUEUED,b.UPLOADING="uploading",b.PROCESSING=b.UPLOADING,b.CANCELED="canceled",b.ERROR="error",b.SUCCESS="success";var E=function(e,t,n,r,i,o,a,u,s,l){var c=function(e){e.naturalWidth;var t=e.naturalHeight,n=document.createElement("canvas");n.width=1,n.height=t;var r=n.getContext("2d");r.drawImage(e,0,0);for(var i=r.getImageData(1,0,1,t).data,o=0,a=t,u=t;u>o;)0===i[4*(u-1)+3]?a=u:o=u,u=a+o>>1;var s=u/t;return 0===s?1:s}(t);return e.drawImage(t,n,r,i,o,a,u,s,l/c)},k=function(){function e(){p(this,e)}return d(e,null,[{key:"initClass",value:function(){this.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}},{key:"encode64",value:function(e){for(var t="",n=void 0,r=void 0,i="",o=void 0,a=void 0,u=void 0,s="",l=0;o=(n=e[l++])>>2,a=(3&n)<<4|(r=e[l++])>>4,u=(15&r)<<2|(i=e[l++])>>6,s=63&i,isNaN(r)?u=s=64:isNaN(i)&&(s=64),t=t+this.KEY_STR.charAt(o)+this.KEY_STR.charAt(a)+this.KEY_STR.charAt(u)+this.KEY_STR.charAt(s),n=r=i="",o=a=u=s="",l<e.length;);return t}},{key:"restore",value:function(e,t){if(!e.match("data:image/jpeg;base64,"))return t;var n=this.decode64(e.replace("data:image/jpeg;base64,","")),r=this.slice2Segments(n),i=this.exifManipulation(t,r);return"data:image/jpeg;base64,".concat(this.encode64(i))}},{key:"exifManipulation",value:function(e,t){var n=this.getExifArray(t),r=this.insertExif(e,n);return new Uint8Array(r)}},{key:"getExifArray",value:function(e){for(var t=void 0,n=0;n<e.length;){if(255===(t=e[n])[0]&225===t[1])return t;n++}return[]}},{key:"insertExif",value:function(e,t){var n=e.replace("data:image/jpeg;base64,",""),r=this.decode64(n),i=r.indexOf(255,3),o=r.slice(0,i),a=r.slice(i),u=o;return(u=u.concat(t)).concat(a)}},{key:"slice2Segments",value:function(e){for(var t=0,n=[];!(255===e[t]&218===e[t+1]);){if(255===e[t]&216===e[t+1])t+=2;else{var r=t+(256*e[t+2]+e[t+3])+2,i=e.slice(t,r);n.push(i),t=r}if(t>e.length)break}return n}},{key:"decode64",value:function(e){var t=void 0,n=void 0,r="",i=void 0,o=void 0,a="",u=0,s=[];for(/[^A-Za-z0-9\+\/\=]/g.exec(e)&&console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");t=this.KEY_STR.indexOf(e.charAt(u++))<<2|(i=this.KEY_STR.indexOf(e.charAt(u++)))>>4,n=(15&i)<<4|(o=this.KEY_STR.indexOf(e.charAt(u++)))>>2,r=(3&o)<<6|(a=this.KEY_STR.indexOf(e.charAt(u++))),s.push(t),64!==o&&s.push(n),64!==a&&s.push(r),t=n=r="",i=o=a="",u<e.length;);return s}}]),e}();k.initClass(),b._autoDiscoverFunction=function(){if(b.autoDiscover)return b.discover()},function(e,t){var n=!1,r=!0,i=e.document,o=i.documentElement,a=i.addEventListener?"addEventListener":"attachEvent",u=i.addEventListener?"removeEventListener":"detachEvent",s=i.addEventListener?"":"on",l=function r(o){if("readystatechange"!==o.type||"complete"===i.readyState)return("load"===o.type?e:i)[u](s+o.type,r,!1),!n&&(n=!0)?t.call(e,o.type||o):void 0};if("complete"!==i.readyState){if(i.createEventObject&&o.doScroll){try{r=!e.frameElement}catch(e){}r&&function e(){try{o.doScroll("left")}catch(t){return void setTimeout(e,50)}return l("poll")}()}i[a](s+"DOMContentLoaded",l,!1),i[a](s+"readystatechange",l,!1),e[a](s+"load",l,!1)}}(window,b._autoDiscoverFunction),window.Dropzone=b;var A=b}(),r}()}));
addTolisteners('document-transfer', {
    name: 'document-transfer',
    method: function () {
        $('[data-trigger="document-transfer-upload"]').on('click', function () {
            let candidateDocumentTransferId = $(this).data('cdt-id');
            let candidateId = $(this).data('candidate-id');
            let csrfToken = $('#_csrf_token').val();
            let defaultAcceptedFiles = '.pdf,.doc,.docx';
            let mimeTypes = $(this).data('mime-types');

            $('#document-transfer-upload-field').addClass('dropzone');
            prependDocumentTypeSelectBox($(this).data('upload-types'));

            // BOOTSTRAP INIT JS MODALS
            let modalData = {
                backdrop: 'static',
                headline: translations.document_upload_headline,
                content: $('[data-document-transfer-upload-modal-wrapper]').children(),
                buttons: [{
                    content: translations.general_cancel,
                    dismiss: true,
                    primary: false
                },
                {
                    content: translations.general_submit,
                    dismiss: false,
                    primary: true,
                    callback: function () {
                        documentTransferModalClearErrors();
                        let uploadType = $('#upload-type:not(:disabled) option:selected').val(),
                            errorMessages = {};

                        if (uploadType === '-none-') {
                            errorMessages['upload-type'] = 'document_upload_select_type';
                        }

                        const thisDropzone = Dropzone.forElement('#document-transfer-upload-field');
                        const errorKey = 'document-transfer-upload-field';
                        const pendingFiles = thisDropzone.getActiveFiles();
                        if (pendingFiles.length > 0) {
                            errorMessages[errorKey] = 'document_upload_pending_file';
                        } else {
                            const uploadedFiles =  thisDropzone.getFilesWithStatus(Dropzone.SUCCESS);
                            if (uploadedFiles.length <= 0) {
                                errorMessages[errorKey] = 'document_upload_select_file';
                            }
                        }

                        if (Object.keys(errorMessages).length > 0) {
                            documentTransferModalShowErrors(errorMessages, csrfToken);
                        } else {
                            // SUBMIT FORM TO INDEX.PHP
                            let submitBtn = $(this);

                            if (submitBtn.hasClass('disabled')) {
                                return;
                            }

                            const $thisModal = submitBtn.closest('.modal');
                            submitBtn.addClass('disabled');

                            $.ajax({
                                url: 'documents/upload',
                                type: 'POST',
                                data: {
                                    _csrf_token: csrfToken,
                                    candidateDocumentTransferId: candidateDocumentTransferId,
                                    candidateId: candidateId,
                                    uploadType: uploadType,
                                    action: 'send'
                                },
                                beforeSend: function () {
                                    $thisModal.data('fl-submit-in-progress', true);
                                    showLoadingModal(
                                        translations.document_upload_is_uploading,
                                        translations.document_upload_is_uploading_please_wait
                                    );
                                },
                                success: function (data) {
                                    data = $.parseJSON(data);

                                    if (data.success === true) {
                                        let successModalData = {
                                            headline: translations.general_successful_action,
                                            content: translations.document_upload_success,
                                            buttons: [{
                                                'primary': false,
                                                'dismiss': true,
                                                'content': translations.general_close,
                                                'callback': function () {
                                                    location.reload(); // To see the uploaded files (if the certian document-type enabled)
                                                }
                                            }]
                                        };
                                        showStandardModal(successModalData);
                                    } else {
                                        showGeneralErrorMessage();
                                    }
                                },
                                error: function () {
                                    showGeneralErrorMessage();
                                },
                                complete: function () {
                                    $thisModal.data('fl-submit-in-progress', false);
                                    submitBtn.removeClass('disabled');
                                    hideLoadingModal();
                                    destroyDropzone();
                                }
                            });
                        }
                    }
                }],
                'show': function () {
                    documentTransferModalClearErrors();

                    // INIT DROPZONE.JS FOR MODAL
                    $('#document-transfer-upload-field').dropzone({
                        acceptedFiles: defaultAcceptedFiles,
                        hiddenInputContainer: '#document-transfer-label',
                        autoProcessQueue: true,
                        autoDiscover: false,
                        url: 'documents/upload',
                        paramName: 'document_upload',
                        addRemoveLinks: true,
                        maxFiles: 1,
                        maxFilesize: 5,
                        maxTotalSize: 5,
                        params: {
                            // FILE UPLOAD DATA send to server
                            _csrf_token: csrfToken,
                            action: 'upload'
                        },
                        success: function (file, response) {
                            response = JSON.parse(response);

                            if (response['errors'] && response['errors'].length > 0) {
                                this.removeFile(file);
                                documentTransferModalShowErrors(response['errors'], csrfToken);
                                return;
                            }

                            // FILE UPLOAD DATA received from server
                            const $dzPreviewEl = $(file.previewElement);
                            $dzPreviewEl.attr('data-temp', response);
                            $dzPreviewEl.find('[data-dz-uploadprogress]').hide(0).html('');

                            const $thisModal = $dzPreviewEl.closest('.modal');
                            if (!$thisModal.has(document.activeElement).length) {
                                $dzPreviewEl.find('[data-dz-remove]').trigger('focus');
                            }

                            documentTransferModalClearErrors($(this.element).closest('.form-group'));
                        },
                        removedfile: function (file) {
                            let preview = $(document).find(file.previewElement);
                            preview.remove();

                            $.ajax({
                                url: 'documents/upload',
                                type: 'POST',
                                data: {
                                    // FILE DELETE DATA send to server
                                    _csrf_token: csrfToken,
                                    tmp_name: $(preview).attr('data-temp'),
                                    action: 'delete'

                                }
                            });
                        },
                        init: function () {
                            let dzButton = $(this.element).find('.dz-button');
                            if (dzButton.length > 0) {
                                dzButton.attr('aria-describedby', 'aria-hint-upload-size');
                            }

                            const $uploadType = $('#upload-type');
                            const thisDropzone = this;
                            if (!$uploadType.is(':disabled')) {
                                $uploadType.off('change.upload-type').on('change.upload-type', function () {
                                    let acceptedFiles = defaultAcceptedFiles;
                                    let uploadTypeVal = $uploadType.val();
                                    if (typeof mimeTypes[uploadTypeVal] !== 'undefined') {
                                        acceptedFiles = mimeTypes[uploadTypeVal].toString();
                                    }

                                    if ('-none-' !== uploadTypeVal) {
                                        $.each(thisDropzone.getAcceptedFiles(), function (key, file) {
                                            if (('undefined' !== typeof file.type) && !Dropzone.isValidFile(file, acceptedFiles)) {
                                                thisDropzone.removeFile(file);
                                            }
                                        });
                                    }

                                    $(thisDropzone.hiddenFileInput).attr('accept', acceptedFiles); // Because it's created/initialized already
                                    thisDropzone.options.acceptedFiles = acceptedFiles; // Because it will recreate itself via setupHiddenFileInput();
                                });
                            }

                            $.ajax({
                                url: 'documents/upload',
                                type: 'POST',
                                data: {
                                    // FILE RECOVER DATA received from server
                                    _csrf_token: csrfToken,
                                    action: 'reload'
                                }
                            }).done(function (data) {
                                $.each(data, function (key, value) {
                                    let mockFile = {name: value.file_name, size: value.file_size, accepted: true, status: Dropzone.SUCCESS};
                                    thisDropzone.emit('addedfile', mockFile);
                                    thisDropzone.emit('success', mockFile, key);
                                    thisDropzone.emit('complete', mockFile);
                                    thisDropzone.files.push(mockFile);
                                });
                            });

                            // FILE CHECK prevent duplicates
                            this.on('addedfile', async function (file) {
                                if (this.files.length > 0) {
                                    let error = false;
                                    let errorMessages = [];
                                    let totalSize = 0;

                                    // Check for maximum number of files.
                                    if (this.files.length > this.options.maxFiles) {
                                        error = true;
                                        errorMessages.push('document_upload_maximum_number_of_files');
                                    }

                                    // Check for duplicate file name and sum up file size.
                                    if (!error) {
                                        for (let i = 0; i < this.files.length - 1; i++) {
                                            if (this.files[i].name === file.name) {
                                                error = true;
                                                errorMessages.push('document_upload_duplicate');
                                                break;
                                            }

                                            totalSize += this.files[i].size;
                                        }
                                    }

                                    // Check for file size limit
                                    if (!error) {
                                        let maxFilesize = this.options.maxFilesize * Math.pow(this.options.filesizeBase, 2);

                                        if (file.size > maxFilesize) {
                                            error = true;
                                            errorMessages.push('document_upload_file_size_limit');
                                        }
                                    }

                                    // Check for total size limit
                                    if (!error) {
                                        totalSize += file.size;
                                        let maxTotalSize = this.options.maxTotalSize * Math.pow(this.options.filesizeBase, 2);

                                        if (totalSize > maxTotalSize) {
                                            error = true;
                                            errorMessages.push('document_upload_total_size_limit');
                                        }
                                    }

                                    if (!error && (!Dropzone.isValidFile(file, this.options.acceptedFiles))) {
                                        error = true;
                                        errorMessages.push('document_upload_invalid_file_type');
                                    }

                                    if (error) {
                                        this.removeFile(file);
                                        documentTransferModalShowErrors(errorMessages, csrfToken)
                                    } else {
                                        const $dzPreviewEl = $(file.previewElement);
                                        $dzPreviewEl.find('svg').attr('aria-hidden', 'true');
                                        $dzPreviewEl.find('[data-dz-remove]').trigger('focus');
                                        $dzPreviewEl.find('[data-dz-thumbnail]:not([alt])').attr('alt', '').hide(0);
                                        $dzPreviewEl.find('[data-dz-uploadprogress]').show(0)
                                            .html($('<span class="sr-only">').text(translations.document_upload_is_uploading));
                                    }
                                }
                            });

                            this.on('thumbnail', function (file, dataUrl) {
                                const $dzPreviewEl = $(file.previewElement);
                                $dzPreviewEl.find('[data-dz-thumbnail]').show(0);
                            });

                            this.on('reset', function () {
                                const $dzButton = $(this.element).find('.dz-button');
                                const $thisModal = $dzButton.closest('.modal');
                                if (!$thisModal.has(document.activeElement).length) {
                                    $dzButton.trigger('focus');
                                }
                            });
                        },
                        // language settings
                        dictDefaultMessage: translations.document_upload_here,
                        dictFileTooBig: translations.document_upload_too_big,
                        dictInvalidFileType: translations.document_upload_wrong_file,
                        dictRemoveFile: translations.document_upload_remove_file,
                        dictMaxFilesExceeded: translations.document_upload_file_limit,
                        dictCancelUpload: translations.general_cancel,
                        dictCancelUploadConfirmation: translations.document_upload_cancel_upload_confirmation,
                    });
                },
                'hide': function () {
                    // REMOVE DROPZONE.JS FILES FROM SERVER IF MODAL GET CLOSED
                    if (true !== $(this).data('fl-submit-in-progress')) {
                        destroyDropzone();
                    }
                }
            };

            showStandardModal(modalData);
        });

        function destroyDropzone()
        {
            if (!Dropzone.instances.length) {
                return;
            }

            let thisDropzone = Dropzone.forElement('#document-transfer-upload-field'),
                acceptedFiles = thisDropzone.getAcceptedFiles(); // All: Uploaded, Uploading, Queued...

            $.each(acceptedFiles, function (key, file) {
                let tmp_name = $(file.previewElement).attr('data-temp');

                $.ajax({
                    url: 'documents/upload',
                    type: 'POST',
                    data: {
                        // FILE DELETE DATA send to server
                        _csrf_token: $('#_csrf_token').val(),
                        tmp_name: tmp_name,
                        action: 'delete'
                    }
                });
            });

            thisDropzone.destroy();
        }

        function prependDocumentTypeSelectBox(attachmentTypes)
        {
            let attachmentTypesOptions = [];
            $.each(attachmentTypes, function (key, value) {
                attachmentTypesOptions.push('<option value="' + key + '">' + value + '</option>');
            });

            const $uploadTypeSelect = $('#document-transfer-upload-form').find('#upload-type');
            $uploadTypeSelect.prop('disabled', true);

            const $uploadTypeFormGroup = $uploadTypeSelect.closest('.form-group');
            $uploadTypeFormGroup.addClass('hidden');

            $uploadTypeSelect.find('option').slice(1).remove();
            if (attachmentTypesOptions.length > 0) {
                $uploadTypeSelect.append(attachmentTypesOptions.join(''));

                $uploadTypeSelect.prop('disabled', false);
                $uploadTypeFormGroup.removeClass('hidden');
            }
        }

        function documentTransferModalShowErrors(errorMessages, csrfToken)
        {
            $.ajax({
                url: 'documents/error',
                type: 'POST',
                data: {
                    _csrf_token: csrfToken,
                    errorMessages: errorMessages,
                }
            }).done(function (data) {
                $('[data-document-transfer-errors]').html(data)
                    .find('[data-sr-alert-ref]').srNotification();

                let form = $('#document-transfer-upload-form');
                $.each(errorMessages, function (index, value) {
                    form.find('[data-js-error-key="' + index + '"]')
                        .addClass('js-form-group--has-error');
                });
                form.find('.form-group').applyFormGroupValidationMarkup();
            });
        }

        function documentTransferModalClearErrors($FormGroups)
        {
            $('[data-document-transfer-errors]').empty();
            let $formGroups = $FormGroups;
            if (typeof $formGroups === 'undefined') {
                $formGroups = $('#document-transfer-upload-form').find('.form-group');
            }

            $formGroups.removeClass('js-form-group--has-error');
            $formGroups.applyFormGroupValidationMarkup();
        }
    }
});

$(function() {
    if (window.globalConstants.organization === 'pag') {

        let $activeElm = $();

        $('#main-drawer .js-link-login').addClass('btn btn-primary');

        $('.js-link-login').click(function() {

            $('#js-nav-backdrop').fadeOut();
            if ($activeElm.hasClass('has-arrow')){
                $('#js-nav').removeClass("show");
            } else {
                $('.has-arrow').removeClass('active');
                $('#js-nav').removeClass("show main");
            }
            $('body').removeClass('no-scroll');
        });

        $('.js-nav-toggle').click(function() {
            $activeElm = $('#side-drawer .navbar-nav').find('.active');

            if ($activeElm.hasClass('has-arrow')){
                $('#js-nav').addClass("main");
                // $('nav navbar-nav').focus(); // TODO: set the right focus
            } else {
                $('#js-nav').removeClass("main");
            }

            if ($(this).hasClass('login')) {
                $activeElm.removeClass('active');
                // $('nav navbar-nav').focus(); // TODO: set the right focus
                $('#js-nav').addClass("show main");
                $('.has-arrow').addClass('active');
            } else {
                // $('nav navbar-nav').focus(); // TODO: set the right focus
                $('#js-nav').addClass("show");
            }
            $('#js-nav-backdrop').fadeIn();
            $('body').addClass('no-scroll');
        });

        $('#js-nav-backdrop, .js-nav-close').click(function() {
            $('#js-nav-backdrop').fadeOut();

            if ($activeElm.hasClass('has-arrow')){
                $('#js-nav').removeClass("show");
            } else {
                $('.has-arrow').removeClass('active');
                $('#js-nav').removeClass("show main");
            }

            $('#sidebar-search-form').removeClass("show");
            $activeElm.addClass('active');
            $('body').removeClass('no-scroll');
        });

        $('.js-nav-back').click(function() {
            $('.has-arrow').removeClass('active');
            $('#js-nav').removeClass("main");
            $activeElm.addClass('active');
        });

        $(document).ready( function() {
            if ($('.has-arrow').hasClass('active')) {
                $('#js-nav').addClass("main");
            }
        });

        $('.has-arrow a').click(function(e) {
            $activeElm.removeClass('active');
            $('#js-nav').addClass("show main");
            $('.has-arrow').addClass('active');

            e.preventDefault();
            return false;
        });
    }
});

addTolisteners(['search_result'], {
    name: 'js-search_result-filter',
    method: function () {
        if (window.globalConstants.organization === 'pag') {
            $('.js-filter-toggle').click(function () {
                $('.jobboard-container').on('jbdatatable_rendering_finished', function () {
                    setTimeout(() => {
                        countFilter();
                    }, "500");
                })

                if (window.globalConstants.organization === 'pag') {
                    countFilter();
                    $('#js-nav-backdrop').fadeIn();
                    $('#js-nav').removeClass("show");
                    $('#sidebar-search-form').addClass("show");
                    $('body').addClass('no-scroll');
                    $('#btn_dosearch, .back-to-search, #btn_del_filter').click(function () {
                        countFilter();
                        $('#js-nav-backdrop').fadeOut();
                        $('#sidebar-search-form').removeClass("show");
                        $('body').removeClass('no-scroll');
                    });
                }
            })
        }
    }
});

let isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;

addTolisteners(['application_success'], {
    name: 'remove-uc-on-application',
    method: function () {
        if (window.globalConstants.organization === 'pag') {
            localStorage.setItem('reset_content', 'true');

            // #149600 - delay popup to avoid safari issues
            if (window.globalConstants.ratingUrl !== 'undefined') {

                // deactivate PWA bug
                if (window.globalConstants.platform === 'intranet' && isInStandaloneMode()) {return true}

                // #135301 - rating popup
                window.open(
                    window.globalConstants.ratingUrl,
                    'Porsche Feedback',
                    'width=639,height=519'
                );
            }
        }
    }
});

addTolisteners(['statuspage'], {
    name: 'remove-uc-on-application-statuspage',
    method: function () {
        if (
            window.globalConstants.organization === 'pag'
            && document.getElementsByClassName('application_sent_success').length > 0
        ) {
            localStorage.setItem('reset_content', 'true');

            // #149600 - delay popup to avoid safari issues
            if (window.globalConstants.ratingUrl !== 'undefined') {
                // deactivate PWA bug
                if (window.globalConstants.platform === 'intranet' && isInStandaloneMode()) {return true}

                // #135301 - rating popup
                window.open(
                    window.globalConstants.ratingUrl,
                    'Porsche Feedback',
                    'width=639,height=519'
                );
            }
        }
    }
});

addTolisteners(['jobad'], {
    name: 'jobad_header',
    method: function () {
        if (window.globalConstants.organization === 'pag') {
            initHeader();

            // #147657 - check if mobile version exists and swap to it, otherwise keep original
            if (window.screen.width <= 768) {
                const headerImage = document.getElementById('pag-header-image-new');
                const originalSrc = headerImage.src;

                const mobileSrc = originalSrc.replace(/(\.\w+)(\?.*)?$/, '_mobile$1$2');

                const mobileImage = new Image();
                mobileImage.src = mobileSrc;
                mobileImage.onload = function() {
                    headerImage.src = mobileSrc;
                };

                mobileImage.onerror = function() {
                    headerImage.src = originalSrc;
                };
            }
        }
    }
});

const initHeader = () => {
    const header = document.getElementById('jobad-header-new');
    const content = document.getElementsByTagName('article')[0];

    const computedStyle = window.getComputedStyle(header);
    const computedStyleContent = window.getComputedStyle(content);
    const screenWidth = document.documentElement.clientWidth;
    const headerMargin = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
    let headerWidth = screenWidth - headerMargin;
    let contentWidth = parseFloat(computedStyleContent.width);

    if (headerWidth > parseFloat(computedStyle.maxWidth)) {
        headerWidth = parseFloat(computedStyle.maxWidth);
    }

    let offset = (headerWidth - contentWidth) / 2 + parseFloat(computedStyle.marginLeft);

    header.style.width = `${headerWidth}px`
    header.style.transform = `translateX(-${offset}px)`;

    animateHeader(false);
}

window.addEventListener('resize', initHeader);

window.addEventListener('scroll', () => {
    const header = document.getElementById('jobad-header-new');
    const rect = header.getBoundingClientRect();
    const isTerminal = window.globalConstants.layout === 'terminal';

    let stuck;

    if (isTerminal) {
        stuck = window.scrollY > 1;
    } else {
        stuck = rect.top < 0;
    }

    if (stuck) {
        if (!header.classList.contains('stuck')) {
            header.classList.add('stuck');
            animateHeader(true);
        }
    } else {
        if (header.classList.contains('stuck')) {
            header.classList.remove('stuck');
            animateHeader(false);
        }
    }
});

const animateHeader = (hide) => {
    const opacityFrom = hide ? 1 : 0;
    const opacityTo = hide ? 0 : 1;

    const header = document.getElementById('jobad-header-new');

    header.animate(
        [{opacity: 0}, {opacity: 1}],
        {duration: 500, fill: 'forwards'}
    )

    const content = document.getElementsByTagName('hidden-stuck');
    content.forEach((item, i) => {
        item.animate(
            [{opacity: opacityFrom}, {opacity: opacityTo}],
            {duration: 200, fill: 'forwards'}
        )
    })
}

function countFilter() {
    window.globalConstants.filterCount = 0;

    if ($('#quicksearch_keyword')[0].value) {
        window.globalConstants.filterCount += 1
    }

    $('#sidebar-search-form select').each( function() {
        if ($(this).find('option[selected="selected"]').length > 0 && this.getAttribute('data-criterion') !== 'PublicationChannel.Code') {
            window.globalConstants.filterCount += 1
        }
    })

    if (window.globalConstants.filterCount > 0) {
        $('#js-filter-count').text('(' + (window.globalConstants.filterCount) + ')');
    } else {
        $('#js-filter-count').text('');
    }
}

/* ==========================================================================
 Jobad share / forward modal

 * Share modal is generated dynamically on click because is triggered from:
 * (1) Search results list.
 * (2) Jobad view page actions upper button.
 * (3) Jobad view page actions footer button.
 ========================================================================== */


addTolisteners(['search_result', 'jobad', 'jobabo_overview'], {
    name: 'js-share-jobad-update',
    method: function () {

        var config = {
            jobadShareBtnSelector: '.js-share-jobad',
            jobadShareModal: {
                modalFooter: '[data-js-modal-footer]',
                shareLinkSelector: '.js-modal-submit-btn',
            },
        };

        /**
         * Share button click handler
         */
        $(document).on('click', config.jobadShareBtnSelector, function (e) {
            $(config.jobadShareModal.modalFooter).find(config.jobadShareModal.shareLinkSelector).remove();
        });
    }
});

let previousElementInFocus = null;
document.addEventListener('keyup', function (event) {
  if (event.key === 'Tab') {
    previousElementInFocus?.classList.remove('keyboard-focus-visible');
    document.activeElement.classList.add('keyboard-focus-visible');
    previousElementInFocus = document.activeElement;
  }
})


addTolisteners(['application'], {
  name: 'application-init-selectize',
  method: function () {
    const selectizeObjects = $('.selectize');
    if(selectizeObjects.length > 0) {
      selectizeObjects.selectize({})
    }
  }
});

// #####################################################################################################################
// #### applicationform.js #############################################################################################
// #####################################################################################################################

// Fix loading dependencies for questions in application form.
// (Loading other questions that are dependent on other questions.)
const oldAttachFfwChangeBehavior = attachFfwChangeBehavior;
window.attachFfwChangeBehavior = (formSelector) => {
    oldAttachFfwChangeBehavior(formSelector)
    $(formSelector).on('change', '.field select.single', function (e)  {
        const isDependency = fieldChangeBehaviorCallback.bind(this)();
        if (isDependency) dependencyChangeBehaviorCallback.bind(this)();
    });
};

// Remove manual focus handling and recreate selectize elements because of replacing them
window.manageFocusAndReplaceContent = ($container, content, onchangeTargetId) => {
    let idWhereToRestoreFocus;
    const currentlyFocusedElement = document.activeElement;
    const isFocusContainedInUpdatedContent = !!$container.has(currentlyFocusedElement).length;
    if (isFocusContainedInUpdatedContent && ("undefined" !== typeof currentlyFocusedElement.id)) {
        idWhereToRestoreFocus = currentlyFocusedElement.id;
    }

    const $newContent = $(content);
    $container.replaceWith($newContent);

    const $blockContainer = $newContent.closest(".block");
    $blockContainer.attr("data-dynamically-injected-by-target-id", onchangeTargetId);
    const blockContainerSelector = "#" + $blockContainer.attr('id');
    attachFfwPlugins(blockContainerSelector);

    // recreate selectize elements
    const selectizeObjects = $('select.selectize:not(.selectized)');
    if(selectizeObjects.length > 0) {
        selectizeObjects.selectize({
            createOnBlur: true,
        })
    }

    if (idWhereToRestoreFocus) {
        const $elWhereToRestoreFocus = $("#" + idWhereToRestoreFocus);
        if ($elWhereToRestoreFocus.length) {
            $elWhereToRestoreFocus.trigger("focus");
        } else {
            // e.g. previously focused was dependency field which now does not exist anymore after the update
            const $elFallbackToFocus = $blockContainer.find(":input:visible:first");
            if ($elFallbackToFocus.length) {
                $elFallbackToFocus.trigger("focus");
            }
        }
    }
}

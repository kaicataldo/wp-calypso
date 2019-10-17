type CacheKeyFromArgs< O extends any[] > = ( ...args: O ) => string;

const defaultGetCacheKey: CacheKeyFromArgs< any[] > = ( ...args: any[] ) => args.join();

const isFunction = ( fn: any ): boolean => {
	return typeof fn === 'function';
};

const isObject = ( o: any ): o is object => {
	// Truthiness check is required because `typeof null === 'object'`.
	return o && typeof o === 'object';
};

/**
 * Generics
 *
 * S: State - the application state
 * D: Dependents - Array of dependent values returned by the DependentsSelector
 * R: Result of Selector
 * O: Other parameters that the computation and resulting CachedSelector are provided
 */

/**
 * DependentsSelector is a function that accepts a State (S) object and
 * returns an array of values to be used in the Selector as well
 * as the values used by the caching/memoization layer.
 */
type DependentsSelector< S, O extends any[], D extends any[] > = ( state: S, ...args: O ) => D;

/**
 * Function that computes a value based on the dependent values provided
 * by the DependentsSelector. It receives the values returned by
 * DependentsSelector as its first argument, the rest of the arguments
 * given to the computation are the same as the CachedSelector retured
 * by treeSelect.
 */
type Selector< D extends any[], R, O extends any[] > = ( dependents: D, ...args: O ) => R;

/**
 * The cached selector is the returned function from treeSelect. It should
 * have the same signature as Selector except it accepts the State as its
 * first argument instead of the result of DependentsSelector. The rest of
 * the other (O) arguments are the same provided to the Selector.
 */
type CachedSelector< S, R, O extends any[] > = ( state: S, ...args: O ) => R;

interface Options< O extends any[] > {
	/**
	 * Custom function to compute the cache key from the selector's `args` list
	 */
	getCacheKey?: CacheKeyFromArgs< O >;
}

/**
 * Returns a selector that caches values.
 *
 * @param  getDependents A Function describing the dependent(s) of the selector. Must return an array which gets passed as the first arg to the selector.
 * @param  selector      A standard selector for calculating cached result.
 * @param  options       Additional options
 * @return               Cached selector
 */
export default function treeSelect< S, D extends any[], R, O extends any[] >(
	getDependents: DependentsSelector< S, O, D >,
	selector: Selector< D, R, O >,
	options: Options< O > = {}
): CachedSelector< S, R, O > {
	if ( process.env.NODE_ENV !== 'production' ) {
		if ( ! isFunction( getDependents ) || ! isFunction( selector ) ) {
			throw new TypeError(
				'treeSelect: invalid arguments passed, selector and getDependents must both be functions'
			);
		}
	}

	let cache = new WeakMap();

	const { getCacheKey = defaultGetCacheKey } = options;

	const cachedSelector = function( state: S, ...args: O ) {
		const dependents = getDependents( state, ...args );

		if ( process.env.NODE_ENV !== 'production' ) {
			if ( getCacheKey === defaultGetCacheKey && args.some( isObject ) ) {
				throw new Error( 'Do not pass objects as arguments to a treeSelector' );
			}
		}

		// create a dependency tree for caching selector results.
		// this is beneficial over standard memoization techniques so that we can
		// garbage collect any values that are based on outdated dependents
		const leafCache = dependents.reduce( insertDependentKey, cache );

		const key = getCacheKey( ...args );
		if ( leafCache.has( key ) ) {
			return leafCache.get( key );
		}

		const value = selector( dependents, ...args );
		leafCache.set( key, value );
		return value;
	};

	cachedSelector.clearCache = () => {
		// WeakMap doesn't have `clear` method, so we need to recreate it
		cache = new WeakMap();
	};

	return cachedSelector;
}

/*
 * This object will be used as a WeakMap key if a dependency is a falsy value (null, undefined, ...)
 */
const NULLISH_KEY = {};

/*
 * First tries to get the value for the key.
 * If the key is not present, then inserts a new map and returns it
 *
 * Note: Inserts WeakMaps except for the last map which will be a regular Map.
 * The last map is a regular one because the the key for the last map is the string results of args.join().
 */
function insertDependentKey( map: any, key: any, currentIndex: number, arr: any[] ) {
	if ( key != null && Object( key ) !== key ) {
		throw new TypeError( 'key must be an object, `null`, or `undefined`' );
	}
	const weakMapKey = key || NULLISH_KEY;

	const existingMap = map.get( weakMapKey );
	if ( existingMap ) {
		return existingMap;
	}

	const newMap = currentIndex === arr.length - 1 ? new Map() : new WeakMap();
	map.set( weakMapKey, newMap );
	return newMap;
}

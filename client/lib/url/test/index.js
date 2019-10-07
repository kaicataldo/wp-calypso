/**
 * @format
 * @jest-environment jsdom
 */

/**
 * Internal dependencies
 */
import {
	isExternal,
	withoutHttp,
	addSchemeIfMissing,
	setUrlScheme,
	urlToSlug,
	resemblesUrl,
	omitUrlParams,
	decodeURIIfValid,
	decodeURIComponentIfValid,
} from '../';

describe( 'withoutHttp', () => {
	test( 'should return null if URL is not provided', () => {
		expect( withoutHttp() ).toBeNull();
	} );

	test( 'should return URL without initial http', () => {
		const urlWithHttp = 'http://example.com';
		const urlWithoutHttp = withoutHttp( urlWithHttp );

		expect( urlWithoutHttp ).toEqual( 'example.com' );
	} );

	test( 'should return URL without initial https', () => {
		const urlWithHttps = 'https://example.com';
		const urlWithoutHttps = withoutHttp( urlWithHttps );

		expect( urlWithoutHttps ).toEqual( 'example.com' );
	} );

	test( 'should return URL without initial http and query string if has any', () => {
		const urlWithHttpAndQueryString = 'http://example.com?foo=bar#anchor';
		const urlWithoutHttpAndQueryString = withoutHttp( urlWithHttpAndQueryString );

		expect( urlWithoutHttpAndQueryString ).toEqual( 'example.com?foo=bar#anchor' );
	} );

	test( "should return provided URL if it doesn't include http(s)", () => {
		const urlWithoutHttp = 'example.com';

		expect( withoutHttp( urlWithoutHttp ) ).toEqual( urlWithoutHttp );
	} );

	test( 'should return empty string if URL is empty string', () => {
		const urlEmptyString = '';

		expect( withoutHttp( urlEmptyString ) ).toEqual( '' );
	} );
} );

describe( 'isExternal', () => {
	test( 'should return false for relative path-only url', () => {
		const source = '/relative';

		const actual = isExternal( source );

		expect( actual ).toBe( false );
	} );

	test( 'should return false for relative query-only url', () => {
		const source = '?foo=bar';

		const actual = isExternal( source );

		expect( actual ).toBe( false );
	} );

	test( 'should return true for url without http', () => {
		const urlWithoutHttp = 'en.support.wordpress.com';
		const actual = isExternal( urlWithoutHttp );
		expect( actual ).toBe( true );
	} );

	test( 'should return true for url without http and path', () => {
		const urlWithoutHttp = 'en.support.wordpress.com/start';
		const actual = isExternal( urlWithoutHttp );
		expect( actual ).toBe( true );
	} );

	test( 'should return true for url without http and // path', () => {
		const urlWithoutHttp = 'en.support.wordpress.com//start';
		const actual = isExternal( urlWithoutHttp );
		expect( actual ).toBe( true );
	} );

	test( 'should return true for just external relative // path', () => {
		const urlWithoutHttp = '//manage';
		const actual = isExternal( urlWithoutHttp );
		expect( actual ).toBe( true );
	} );

	describe( 'with global.window (test against window.location.hostname)', () => {
		// window.location.hostname === 'example.com'
		test( 'should return false for for internal protocol-relative url', () => {
			const source = '//example.com';

			const actual = isExternal( source );

			expect( actual ).toBe( false );
		} );

		test( 'should return true for for external protocol-relative url', () => {
			const source = '//some-other-site.com';

			const actual = isExternal( source );

			expect( actual ).toBe( true );
		} );

		test( 'should return false for internal url', () => {
			const source = 'https://example.com';

			const actual = isExternal( source );

			expect( actual ).toBe( false );
		} );

		test( 'should return true for external url', () => {
			const source = 'https://not-example.com';

			const actual = isExternal( source );

			expect( actual ).toBe( true );
		} );

		test( 'should return false for internal path without http', () => {
			const urlWithoutHttp = 'example.com//me';
			const actual = isExternal( urlWithoutHttp );
			expect( actual ).toBe( false );
		} );

		test( 'should return true for internal but legacy path with http', () => {
			const urlWithoutHttp = 'http://example.com/manage';
			const actual = isExternal( urlWithoutHttp );
			expect( actual ).toBe( true );
		} );

		test( 'should return true for internal but legacy path without http', () => {
			const urlWithoutHttp = 'example.com/manage';
			const actual = isExternal( urlWithoutHttp );
			expect( actual ).toBe( true );
		} );

		test( 'should return true for subdomains', () => {
			const source = '//ns1.example.com';
			const actual = isExternal( source );
			expect( actual ).toBe( true );
		} );
	} );

	describe( 'without global.window (test against config hostname)', () => {
		test( 'should return false for internal protocol-relative url', () => {
			const source = '//calypso.localhost';

			const actual = isExternal( source );

			expect( actual ).toBe( false );
		} );

		test( 'should return true for external protocol-relative url', () => {
			const source = '//some-other-site.com';

			const actual = isExternal( source );

			expect( actual ).toBe( true );
		} );

		test( 'should return false for internal url', () => {
			const source = 'https://calypso.localhost/me';

			const actual = isExternal( source );

			expect( actual ).toBe( false );
		} );

		test( 'should return true for external url', () => {
			const source = 'https://not.localhost/me';

			const actual = isExternal( source );

			expect( actual ).toBe( true );
		} );
	} );
} );

describe( 'addSchemeIfMissing()', () => {
	test( 'should add scheme if missing', () => {
		const source = 'example.com/path';
		const expected = 'https://example.com/path';

		const actual = addSchemeIfMissing( source, 'https' );

		expect( actual ).toEqual( expected );
	} );

	test( 'should skip if scheme exists', () => {
		const source = 'https://example.com/path';
		const expected = 'https://example.com/path';

		const actual = addSchemeIfMissing( source, 'https' );

		expect( actual ).toEqual( expected );
	} );
} );

describe( 'setUrlScheme()', () => {
	test( 'should skip if scheme already set', () => {
		const source = 'http://example.com/path';
		const expected = 'http://example.com/path';

		const actual = setUrlScheme( source, 'http' );

		expect( actual ).toEqual( expected );
	} );

	test( 'should add scheme if missing', () => {
		const source = 'example.com/path';
		const expected = 'http://example.com/path';

		const actual = setUrlScheme( source, 'http' );

		expect( actual ).toEqual( expected );
	} );

	test( 'should replace scheme if different', () => {
		const source = 'https://example.com/path';
		const expected = 'http://example.com/path';

		const actual = setUrlScheme( source, 'http' );

		expect( actual ).toEqual( expected );
	} );
} );

describe( 'urlToSlug()', () => {
	test( 'should return null if URL is not provided', () => {
		expect( urlToSlug() ).toBeNull();
	} );

	test( 'should return null if URL is empty string', () => {
		const urlEmptyString = '';

		expect( urlToSlug( urlEmptyString ) ).toBeNull();
	} );

	test( 'should return URL without initial http', () => {
		const urlWithHttp = 'http://example.com';
		const urlWithoutHttp = urlToSlug( urlWithHttp );

		expect( urlWithoutHttp ).toEqual( 'example.com' );
	} );

	test( 'should return URL without initial https', () => {
		const urlWithHttps = 'https://example.com';
		const urlWithoutHttps = urlToSlug( urlWithHttps );

		expect( urlWithoutHttps ).toEqual( 'example.com' );
	} );

	test( 'should return URL without initial http and query string if has any', () => {
		const urlWithHttpAndQueryString = 'http://example.com?foo=bar#anchor';
		const urlWithoutHttpAndQueryString = urlToSlug( urlWithHttpAndQueryString );

		expect( urlWithoutHttpAndQueryString ).toEqual( 'example.com?foo=bar#anchor' );
	} );

	test( "should return provided URL if it doesn't include http(s)", () => {
		const urlWithoutHttp = 'example.com';

		expect( urlToSlug( urlWithoutHttp ) ).toEqual( urlWithoutHttp );
	} );

	test( 'should return a slug with forward slashes converted to double colons', () => {
		const urlWithHttp = 'http://example.com/example/test123';
		const urlWithoutHttp = urlToSlug( urlWithHttp );

		expect( urlWithoutHttp ).toEqual( 'example.com::example::test123' );
	} );
} );

describe( 'resemblesUrl()', () => {
	test( 'should detect a URL', () => {
		const source = 'http://example.com/path';
		expect( resemblesUrl( source ) ).toEqual( true );
	} );

	test( 'should detect a URL without protocol', () => {
		const source = 'example.com';
		expect( resemblesUrl( source ) ).toEqual( true );
	} );

	test( 'should detect a URL with a query string', () => {
		const source = 'http://example.com/path?query=banana&query2=pineapple';
		expect( resemblesUrl( source ) ).toEqual( true );
	} );

	test( 'should detect a URL with a short suffix', () => {
		const source = 'http://example.cc';
		expect( resemblesUrl( source ) ).toEqual( true );
	} );

	test( 'should return false with adjacent dots', () => {
		const source = '..com';
		expect( resemblesUrl( source ) ).toEqual( false );
	} );

	test( 'should return false with spaced dots', () => {
		const source = '. . .com';
		expect( resemblesUrl( source ) ).toEqual( false );
	} );

	test( 'should return false with a single dot', () => {
		const source = '.';
		expect( resemblesUrl( source ) ).toEqual( false );
	} );

	test( 'should return false if the string is not a URL', () => {
		const source = 'exampledotcom';
		expect( resemblesUrl( source ) ).toEqual( false );
	} );
} );

describe( 'omitUrlParams()', () => {
	describe( 'when no URL is supplied', () => {
		test( 'should return null if the string is not a URL', () => {
			const actual = omitUrlParams();
			const expected = null;
			expect( actual ).toEqual( expected );
		} );
	} );

	describe( 'when a URL is supplied', () => {
		describe( 'when no omitting params are supplied', () => {
			test( 'should return the URL without modification', () => {
				const url = 'http://example.com/path?query=banana&query2=pineapple&query3=avocado';
				const actual = omitUrlParams( url );
				const expected = 'http://example.com/path?query=banana&query2=pineapple&query3=avocado';
				expect( actual ).toEqual( expected );
			} );
		} );

		describe( 'when a single omitting param is supplied as a string', () => {
			test( 'should return the URL with that param removed', () => {
				const url = 'http://example.com/path?query=banana&query2=pineapple&query3=avocado';
				const param = 'query2';
				const actual = omitUrlParams( url, param );
				const expected = 'http://example.com/path?query=banana&query3=avocado';
				expect( actual ).toEqual( expected );
			} );
		} );

		describe( 'when an array of omitting params is supplied', () => {
			test( 'should return the URL with each of those params removed', () => {
				const url = 'http://example.com/path?query=banana&query2=pineapple&query3=avocado';
				const params = [ 'query', 'query2' ];
				const actual = omitUrlParams( url, params );
				const expected = 'http://example.com/path?query3=avocado';
				expect( actual ).toEqual( expected );
			} );
		} );
	} );
} );

describe( 'decodeURIIfValid', () => {
	test( 'should return an empty string when null is provided', () => {
		const encodedURI = null;
		const actual = decodeURIIfValid( encodedURI );
		const expected = '';
		expect( actual ).toEqual( expected );
	} );

	test( 'should return decoded URL when a valid URL with Unicode chars is provided', () => {
		const encodedURI = 'http://example.com/?x=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF';
		const actual = decodeURIIfValid( encodedURI );
		const expected = 'http://example.com/?x=こんにちは';
		expect( actual ).toEqual( expected );
	} );

	test( 'should return decoded URL when a valid URL with Unicode chars is provided as object', () => {
		const encodedURI = {
			toString: () => 'http://example.com/?x=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF',
		};
		const actual = decodeURIIfValid( encodedURI );
		const expected = 'http://example.com/?x=こんにちは';
		expect( actual ).toEqual( expected );
	} );

	test( 'should return the unmodified URL when an incorrectly-coded URL is provided', () => {
		const encodedURI = 'http://example.com/?x=%E3%%0000000';
		const actual = decodeURIIfValid( encodedURI );
		const expected = encodedURI;
		expect( actual ).toEqual( expected );
	} );
} );

describe( 'decodeURIComponentIfValid', () => {
	test( 'should return an empty string when null is provided', () => {
		const encodedURIComponent = null;
		const actual = decodeURIComponentIfValid( encodedURIComponent );
		const expected = '';
		expect( actual ).toEqual( expected );
	} );

	test( 'should return decoded component when a valid component with Unicode chars is provided', () => {
		const encodedURIComponent = '%3Fx%3D%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF';
		const actual = decodeURIComponentIfValid( encodedURIComponent );
		const expected = '?x=こんにちは';
		expect( actual ).toEqual( expected );
	} );

	test( 'should return decoded component when a valid component with Unicode chars is provided as object', () => {
		const encodedURIComponent = {
			toString: () => '%3Fx%3D%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF',
		};
		const actual = decodeURIComponentIfValid( encodedURIComponent );
		const expected = '?x=こんにちは';
		expect( actual ).toEqual( expected );
	} );

	test( 'should return the unmodified component when an incorrectly-coded component is provided', () => {
		const encodedURIComponent = '%3Fx%3D%E3%%0000000';
		const actual = decodeURIComponentIfValid( encodedURIComponent );
		const expected = encodedURIComponent;
		expect( actual ).toEqual( expected );
	} );
} );

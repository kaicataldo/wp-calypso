/**
 * Internal dependencies
 */
import localizeMonetaryAmount from '../src/localize-monetary-amount';

describe( 'localizeMonetaryAmount', function() {
	// US Locale
	it( 'en-us/USD, 0', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 0 ) ).toBe( '$0' );
	} );
	it( 'en-us/USD, 5', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 5 ) ).toBe( '$0.05' );
	} );
	it( 'en-us/USD, 50', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 50 ) ).toBe( '$0.50' );
	} );
	it( 'en-us/USD, 500', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 500 ) ).toBe( '$5' );
	} );
	it( 'en-us/USD, 1010', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 1010 ) ).toBe( '$10.10' );
	} );
	it( 'en-us/USD, 1337', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 1337 ) ).toBe( '$13.37' );
	} );
	it( 'en-us/USD, 5000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 5000 ) ).toBe( '$50' );
	} );
	it( 'en-us/USD, 50000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 50000 ) ).toBe( '$500' );
	} );
	it( 'en-us/USD, 500000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 500000 ) ).toBe( '$5,000' );
	} );
	it( 'en-us/USD, 5000000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 5000000 ) ).toBe( '$50,000' );
	} );
	it( 'en-us/USD, 50000000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 50000000 ) ).toBe( '$500,000' );
	} );
	it( 'en-us/USD, 500000000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', 500000000 ) ).toBe( '$5,000,000' );
	} );

	it( 'en-us/USD, -500000', function() {
		expect( localizeMonetaryAmount( 'en-us', 'USD', -500000 ) ).toBe( '-$5,000' );
	} );

	it( 'en-us/GBP, 123456', function() {
		expect( localizeMonetaryAmount( 'en-us', 'GBP', 123456 ) ).toBe( '£1,234.56' );
	} );
	it( 'en-us/JPY, 123456', function() {
		expect( localizeMonetaryAmount( 'en-us', 'JPY', 123456 ) ).toBe( '¥123,456' );
	} );
	it( 'en-us/EUR, 123456', function() {
		expect( localizeMonetaryAmount( 'en-us', 'EUR', 123456 ) ).toBe( '€1,234.56' );
	} );
	it( 'en-us/CAD, 123456', function() {
		expect( localizeMonetaryAmount( 'en-us', 'CAD', 123456 ) ).toBe( '$1,234.56\u00A0CAD' );
	} );

	// CA Locale
	it( 'en-ca/CAD, 0', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 0 ) ).toBe( '$0\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 5', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 5 ) ).toBe( '$0.05\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 50', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 50 ) ).toBe( '$0.50\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 500', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 500 ) ).toBe( '$5\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 1010', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 1010 ) ).toBe( '$10.10\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 1337', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 1337 ) ).toBe( '$13.37\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 5000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 5000 ) ).toBe( '$50\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 50000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 50000 ) ).toBe( '$500\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 500000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 500000 ) ).toBe( '$5\u00A0000\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 5000000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 5000000 ) ).toBe( '$50\u00A0000\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 50000000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 50000000 ) ).toBe( '$500\u00A0000\u00A0CAD' );
	} );
	it( 'en-ca/CAD, 500000000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', 500000000 ) ).toBe(
			'$5\u00A0000\u00A0000\u00A0CAD'
		);
	} );

	it( 'en-ca/CAD, -500000', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'CAD', -500000 ) ).toBe( '-$5\u00A0000\u00A0CAD' );
	} );

	it( 'en-ca/GBP, 123456', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'GBP', 123456 ) ).toBe( '£1\u00A0234.56' );
	} );
	it( 'en-ca/JPY, 123456', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'JPY', 123456 ) ).toBe( '¥123\u00A0456' );
	} );
	it( 'en-ca/EUR, 123456', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'EUR', 123456 ) ).toBe( '€1\u00A0234.56' );
	} );
	it( 'en-ca/USD, 123456', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'USD', 123456 ) ).toBe( '$1\u00A0234.56\u00A0USD' );
	} );
	it( 'en-ca/AUD, 123456', function() {
		expect( localizeMonetaryAmount( 'en-ca', 'AUD', 123456 ) ).toBe( '$1\u00A0234.56\u00A0AUD' );
	} );

	it( 'fr-ca/CAD, 0', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 0 ) ).toBe( '$0\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 5', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 5 ) ).toBe( '$0,05\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 50', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 50 ) ).toBe( '$0,50\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 500', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 500 ) ).toBe( '$5\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 1010', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 1010 ) ).toBe( '$10,10\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 1337', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 1337 ) ).toBe( '$13,37\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 5000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 5000 ) ).toBe( '$50\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 50000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 50000 ) ).toBe( '$500\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 500000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 500000 ) ).toBe( '$5\u00A0000\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 5000000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 5000000 ) ).toBe( '$50\u00A0000\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 50000000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 50000000 ) ).toBe( '$500\u00A0000\u00A0CAD' );
	} );
	it( 'fr-ca/CAD, 500000000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', 500000000 ) ).toBe(
			'$5\u00A0000\u00A0000\u00A0CAD'
		);
	} );

	it( 'fr-ca/CAD, -500000', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'CAD', -500000 ) ).toBe( '-$5\u00A0000\u00A0CAD' );
	} );

	it( 'fr-ca/GBP, 123456', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'GBP', 123456 ) ).toBe( '£1\u00A0234,56' );
	} );
	it( 'fr-ca/JPY, 123456', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'JPY', 123456 ) ).toBe( '¥123\u00A0456' );
	} );
	it( 'fr-ca/EUR, 123456', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'EUR', 123456 ) ).toBe( '€1\u00A0234,56' );
	} );
	it( 'fr-ca/USD, 123456', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'USD', 123456 ) ).toBe( '$1\u00A0234,56\u00A0USD' );
	} );
	it( 'fr-ca/AUD, 123456', function() {
		expect( localizeMonetaryAmount( 'fr-ca', 'AUD', 123456 ) ).toBe( '$1\u00A0234,56\u00A0AUD' );
	} );

	// AU Locale
	it( 'en-au/AUD, 0', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 0 ) ).toBe( '$0\u00A0AUD' );
	} );
	it( 'en-au/AUD, 5', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 5 ) ).toBe( '$0.05\u00A0AUD' );
	} );
	it( 'en-au/AUD, 50', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 50 ) ).toBe( '$0.50\u00A0AUD' );
	} );
	it( 'en-au/AUD, 500', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 500 ) ).toBe( '$5\u00A0AUD' );
	} );
	it( 'en-au/AUD, 5000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 5000 ) ).toBe( '$50\u00A0AUD' );
	} );
	it( 'en-au/AUD, 50000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 50000 ) ).toBe( '$500\u00A0AUD' );
	} );
	it( 'en-au/AUD, 500000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 500000 ) ).toBe( '$5\u00A0000\u00A0AUD' );
	} );
	it( 'en-au/AUD, 5000000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 5000000 ) ).toBe( '$50\u00A0000\u00A0AUD' );
	} );
	it( 'en-au/AUD, 50000000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 50000000 ) ).toBe( '$500\u00A0000\u00A0AUD' );
	} );
	it( 'en-au/AUD, 500000000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', 500000000 ) ).toBe(
			'$5\u00A0000\u00A0000\u00A0AUD'
		);
	} );

	it( 'en-au/AUD, -500000', function() {
		expect( localizeMonetaryAmount( 'en-au', 'AUD', -500000 ) ).toBe( '-$5\u00A0000\u00A0AUD' );
	} );

	it( 'en-au/GBP, 123456', function() {
		expect( localizeMonetaryAmount( 'en-au', 'GBP', 123456 ) ).toBe( '£1\u00A0234.56' );
	} );
	it( 'en-au/JPY, 123456', function() {
		expect( localizeMonetaryAmount( 'en-au', 'JPY', 123456 ) ).toBe( '¥123\u00A0456' );
	} );
	it( 'en-au/EUR, 123456', function() {
		expect( localizeMonetaryAmount( 'en-au', 'EUR', 123456 ) ).toBe( '€1\u00A0234.56' );
	} );
	it( 'en-au/USD, 123456', function() {
		expect( localizeMonetaryAmount( 'en-au', 'USD', 123456 ) ).toBe( '$1\u00A0234.56\u00A0USD' );
	} );
	it( 'en-au/CAD, 123456', function() {
		expect( localizeMonetaryAmount( 'en-au', 'CAD', 123456 ) ).toBe( '$1\u00A0234.56\u00A0CAD' );
	} );

	// IN Locale
	it( 'en-in/INR, 0', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 0 ) ).toBe( '₹0' );
	} );
	it( 'en-in/INR, 5', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 5 ) ).toBe( '₹0.05' );
	} );
	it( 'en-in/INR, 50', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 50 ) ).toBe( '₹0.50' );
	} );
	it( 'en-in/INR, 500', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 500 ) ).toBe( '₹5' );
	} );
	it( 'en-in/INR, 1337', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 1337 ) ).toBe( '₹13.37' );
	} );
	it( 'en-in/INR, 5000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 5000 ) ).toBe( '₹50' );
	} );
	it( 'en-in/INR, 50000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 50000 ) ).toBe( '₹500' );
	} );
	it( 'en-in/INR, 500000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 500000 ) ).toBe( '₹5,000' );
	} );
	it( 'en-in/INR, 5000000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 5000000 ) ).toBe( '₹50,000' );
	} );
	it( 'en-in/INR, 50000000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 50000000 ) ).toBe( '₹5,00,000' );
	} );
	it( 'en-in/INR, 500000000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', 500000000 ) ).toBe( '₹50,00,000' );
	} );

	it( 'en-in/INR, -500000', function() {
		expect( localizeMonetaryAmount( 'en-in', 'INR', -500000 ) ).toBe( '-₹5,000' );
	} );

	it( 'en-in/GBP, 123456789', function() {
		expect( localizeMonetaryAmount( 'en-in', 'GBP', 123456789 ) ).toBe( '£12,34,567.89' );
	} );
	it( 'en-in/JPY, 123456789', function() {
		expect( localizeMonetaryAmount( 'en-in', 'JPY', 123456789 ) ).toBe( '¥12,34,56,789' );
	} );
	it( 'en-in/EUR, 123456789', function() {
		expect( localizeMonetaryAmount( 'en-in', 'EUR', 123456789 ) ).toBe( '€12,34,567.89' );
	} );
	it( 'en-in/USD, 123456789', function() {
		expect( localizeMonetaryAmount( 'en-in', 'USD', 123456789 ) ).toBe( '$12,34,567.89\u00A0USD' );
	} );
	it( 'en-in/CAD, 123456789', function() {
		expect( localizeMonetaryAmount( 'en-in', 'CAD', 123456789 ) ).toBe( '$12,34,567.89\u00A0CAD' );
	} );
} );

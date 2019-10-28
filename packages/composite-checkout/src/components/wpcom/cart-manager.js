/**
 * External dependencies
 */
import { useState } from 'react';

import {
	replacePlanWithDifferentLength,
	adjustItemPricesForCountry,
	formatValueForCurrency,
} from './edit-cart';

const initialItems = [
	{
		label: 'WordPress.com Personal Plan',
		id: 'wpcom-personal',
		type: 'plan',
		amount: { currency: 'USD', value: 6000, displayValue: '$60' },
	},
	{
		label: 'Domain registration',
		subLabel: 'example.com',
		id: 'wpcom-domain',
		type: 'domain',
		amount: { currency: 'USD', value: 0, displayValue: '~~$17~~ 0' },
	},
];

// This is a simple shopping cart manager which allows CRUD operations
export function useShoppingCart() {
	const [ items, setItems ] = useState( initialItems );

	// Tax calculation must be performed outside checkout
	const lineItemTotalWithoutTax = items.reduce( ( sum, item ) => sum + item.amount.value, 0 );
	const taxRate = 0.09;
	const taxValue = taxRate * lineItemTotalWithoutTax;
	const taxItem = {
		label: 'Taxes',
		id: 'tax',
		type: 'tax',
		amount: {
			currency: 'USD',
			value: taxValue,
			displayValue: formatValueForCurrency( 'USD', taxValue ),
		},
	};
	const itemsWithTax = [ ...items, taxItem ];

	// The checkout itself does not trigger any events apart from success/failure
	const deleteItem = itemToDelete =>
		setItems( items.filter( item => item.id !== itemToDelete.id ) );
	const changePlanLength = ( plan, planLength ) =>
		setItems( replacePlanWithDifferentLength( items, planLength ) );
	const updatePricesForAddress = address =>
		setItems( adjustItemPricesForCountry( items, address.country ) );
	const addItem = item => setItems( [ ...items, item ] );

	// The total must be calculated outside checkout and need not be related to line items
	const lineItemTotal = itemsWithTax.reduce( ( sum, item ) => sum + item.amount.value, 0 );
	const currency = items.reduce( ( lastCurrency, item ) => item.amount.currency, 'USD' );
	const total = {
		label: 'Total',
		amount: {
			currency,
			value: lineItemTotal,
			displayValue: formatValueForCurrency( currency, lineItemTotal ),
		},
	};

	return {
		items,
		itemsWithTax,
		total,
		addItem,
		deleteItem,
		changePlanLength,
		updatePricesForAddress,
	};
}

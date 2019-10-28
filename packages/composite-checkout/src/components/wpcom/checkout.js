/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Checkout from '../checkout';
import { useShoppingCart } from './cart-manager';
import { UpSellCoupon } from './upsell';
import { OrderReview, OrderReviewCollapsed } from './order-review';

// These will only be shown if appropriate and can be used to disable certain payment methods for testing or other purposes.
const availablePaymentMethods = [ 'apple-pay', 'card', 'paypal', 'ebanx', 'ideal' ];

// These are used only for non-redirect payment methods
const onSuccess = () => console.log( 'Payment succeeded!' );
const onFailure = error => console.error( 'There was a problem with your payment', error );

// These are used only for redirect payment methods
const successRedirectUrl = window.location.href;
const failureRedirectUrl = window.location.href;

// This is the parent component which would be included on a host page
export default function WPCOMCheckout() {
	const {
		itemsWithTax,
		total,
		addItem,
		deleteItem,
		changePlanLength,
		updatePricesForAddress,
	} = useShoppingCart();

	// Some parts of the checkout can be customized
	const ReviewContent = () => (
		<OrderReview onDeleteItem={ deleteItem } onChangePlanLength={ changePlanLength } />
	);
	const reviewContentCollapsed = <OrderReviewCollapsed />;

	// Modification of the line items must be done outside checkout
	const quickStartItem = {
		label: 'Quick Start',
		id: 'quickstart',
		type: 'quickstart',
		amount: { currency: 'USD', value: 2500, displayValue: '~~$50~~ $25' },
	};
	const addQuickStart = () => addItem( quickStartItem );
	const upSell = <UpSellCoupon onClick={ addQuickStart } />;

	return (
		<Checkout
			locale={ 'US' }
			items={ itemsWithTax }
			total={ total }
			onChangeBillingContact={ updatePricesForAddress }
			availablePaymentMethods={ availablePaymentMethods }
			onSuccess={ onSuccess }
			onFailure={ onFailure }
			successRedirectUrl={ successRedirectUrl }
			failureRedirectUrl={ failureRedirectUrl }
			ReviewContent={ ReviewContent }
			reviewContentCollapsed={ reviewContentCollapsed }
			upSell={ upSell }
		/>
	);
}

/**
 * External dependencies
 */
import React from 'react';

export function UpSellCoupon( { onClick } ) {
	return (
		<div>
			<h4>Exclusive offer</h4>
			<p>Buy a quick start session and get 50% off.</p>
			<a href="#" onClick={ onClick }>
				Add to cart
			</a>
		</div>
	);
}

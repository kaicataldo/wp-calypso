/** @format */

/**
 * External dependencies
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Gridicon from 'components/gridicon';
import { snakeCase, includes } from 'lodash';

/**
 * Internal dependencies
 */
import { localize } from 'i18n-calypso';
import Card from 'components/card';
import NavItem from 'components/section-nav/item';
import NavTabs from 'components/section-nav/tabs';
import SectionNav from 'components/section-nav';
import SectionHeader from 'components/section-header';
import analytics from 'lib/analytics';
import { paymentMethodName, isPaymentMethodEnabled } from 'lib/cart-values';
import {
	detectWebPaymentMethod,
	getWebPaymentMethodName,
	WEB_PAYMENT_BASIC_CARD_METHOD,
	WEB_PAYMENT_APPLE_PAY_METHOD,
} from 'lib/web-payment';
import { abtest } from 'lib/abtest';

export class PaymentBox extends PureComponent {
	constructor() {
		super();
	}

	componentDidUpdate() {
		// If the current payment method is no longer in the available methods list, switch to the first one available.
		// Useful when some methods may be dropped based on payment option, like subscription length.
		if (
			this.props.paymentMethods &&
			! includes( this.props.paymentMethods, this.props.currentPaymentMethod )
		) {
			this.props.onSelectPaymentMethod( this.props.paymentMethods[ 0 ] );
		}
	}

	handlePaymentMethodChange = paymentMethod => {
		const onSelectPaymentMethod = this.props.onSelectPaymentMethod;
		return function() {
			analytics.ga.recordEvent( 'Upgrades', 'Switch Payment Method' );
			analytics.tracks.recordEvent( 'calypso_checkout_switch_to_' + snakeCase( paymentMethod ) );
			onSelectPaymentMethod( paymentMethod );
		};
	};

	getPaymentProviderLabel( method ) {
		let labelLogo = (
			<img
				src={ `/calypso/images/upgrades/${ method }.svg` }
				alt={ paymentMethodName( method ) }
				className={ `checkout__${ method }` }
			/>
		);

		let labelAdditionalText = '',
			webPaymentMethod = '';

		switch ( method ) {
			case 'credit-card':
				labelLogo = <Gridicon icon="credit-card" className="checkout__credit-card" />;
				labelAdditionalText = paymentMethodName( method );
				break;
			case 'ideal':
			case 'brazil-tef':
			case 'wechat':
				labelAdditionalText = paymentMethodName( method );
				break;

			case 'netbanking':
				labelLogo = <Gridicon icon="institution" className="checkout__institution" />;
				labelAdditionalText = paymentMethodName( method );
				break;

			case 'web-payment':
				webPaymentMethod = detectWebPaymentMethod();

				switch ( webPaymentMethod ) {
					case WEB_PAYMENT_BASIC_CARD_METHOD:
						labelLogo = <Gridicon icon="folder" />;
						labelAdditionalText = getWebPaymentMethodName( webPaymentMethod, this.props.translate );
						break;

					case WEB_PAYMENT_APPLE_PAY_METHOD:
						labelLogo = (
							<img
								src={ `/calypso/images/upgrades/apple-pay.svg` }
								alt={ getWebPaymentMethodName( webPaymentMethod, this.props.translate ) }
								className="checkout__apple-pay"
							/>
						);
						break;
				}

				break;
		}

		return (
			<div className="checkout__provider">
				{ labelLogo }
				{ labelAdditionalText }
			</div>
		);
	}

	paymentMethod( method ) {
		if ( ! isPaymentMethodEnabled( this.props.cart, method ) ) {
			return null;
		}

		return (
			<NavItem
				key={ method }
				className={ method }
				href=""
				onClick={ this.handlePaymentMethodChange( method ) }
				selected={ this.props.currentPaymentMethod === method }
				onKeyPress={ event => this.choosePaymentMethodWithKeyboard( event, method ) }
			>
				{ this.getPaymentProviderLabel( method ) }
			</NavItem>
		);
	}

	getPaymentMethods() {
		if ( ! this.props.paymentMethods ) {
			return null;
		}
		return this.props.paymentMethods.map( method => {
			return this.paymentMethod( method );
		} );
	}

	renderPaymentMethod = ( paymentMethods, isPaymentMethodTest, titleText ) => {
		if ( isPaymentMethodTest ) {
			return (
				<div className="payment-box__pm-test-wrapper">
					<h2 className="payment-box__pm-title">
						{ this.props.translate( 'Choose a payment method' ) }
					</h2>
					<ul className="payment-box__pm-wrapper">{ paymentMethods }</ul>
				</div>
			);
		}

		if ( paymentMethods ) {
			return (
				<SectionNav selectedText={ titleText }>
					<NavTabs>{ paymentMethods }</NavTabs>
				</SectionNav>
			);
		}

		return null;
	};

	choosePaymentMethodWithKeyboard = ( event, method ) => {
		const code = event.keyCode || event.which;
		if ( code === 13 ) {
			//13 is the enter keycode
			this.props.onSelectPaymentMethod( method );
		}
	};

	render() {
		const paymentMethods = this.getPaymentMethods();
		const isPaymentMethodTest = paymentMethods && abtest( 'checkoutPaymentTypes' ) === 'radios';
		const cardClass = classNames(
				'payment-box',
				this.props.classSet,
				isPaymentMethodTest && 'payment-box--payment-methods-test'
			),
			contentClass = classNames( 'payment-box__content', this.props.contentClassSet );

		const titleText = this.props.currentPaymentMethod
			? this.props.translate( 'Pay with %(paymentMethod)s', {
					args: {
						paymentMethod: paymentMethodName( this.props.currentPaymentMethod ),
					},
			  } )
			: this.props.translate( 'Loading…' );

		return (
			<div className="checkout__payment-box-container" key={ this.props.currentPage }>
				{ this.props.title ? <SectionHeader label={ this.props.title } /> : null }

				{ this.renderPaymentMethod( paymentMethods, isPaymentMethodTest, titleText ) }

				<Card className={ cardClass }>
					<div className="checkout__box-padding">
						{ isPaymentMethodTest && (
							<h2 className="checkout__payment-information-title">
								{ this.props.translate( 'Enter your payment information' ) }
							</h2>
						) }

						<div className={ contentClass }>{ this.props.children }</div>
					</div>
				</Card>
			</div>
		);
	}
}

PaymentBox.displayName = 'PaymentBox';

export default localize( PaymentBox );

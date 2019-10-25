/**
 * External dependencies
 */
import { getLocaleSlug } from 'i18n-calypso';
import moment from 'moment';

/**
 * Internal dependencies
 */
import treeSelect from '@automattic/tree-select';

// static empty array to ensure that empty return values from selectors are
// identical to each other ( rv1 === rv2 )
const EMPTY_SITE_DOMAINS = Object.freeze( [] );

/**
 * Return site domains getting from state object and
 * the given siteId
 *
 * @param {Object} state - current state object
 * @param {Number} siteId - site identificator
 * @return {Array} site domains
 */
export const getDomainsBySiteId = ( state, siteId ) => {
	if ( ! siteId ) {
		return EMPTY_SITE_DOMAINS;
	}

	return state.sites.domains.items[ siteId ] || EMPTY_SITE_DOMAINS;
};

/**
 * Return site domains getting from state object and
 * the given site object
 *
 * @param {Object} state - current state object
 * @param {Object} site - site object
 * @return {Array} site domains
 */
export const getDomainsBySite = ( state, site ) => {
	if ( ! site ) {
		return EMPTY_SITE_DOMAINS;
	}

	return getDomainsBySiteId( state, site.ID );
};

/**
 * Return requesting state for the given site
 *
 * @param {Object} state - current state object
 * @param {Number} siteId - site identifier
 * @return {Boolean} is site-domains requesting?
 */
export const isRequestingSiteDomains = ( state, siteId ) => {
	return state.sites.domains.requesting[ siteId ] || false;
};

/**
 * Returns decorated site domains with objects we don't want to store in Redux state tree.
 *
 * @param  {Object}  state  global state
 * @param  {Number}  siteId the site id
 * @return {?Object}        decorated site domains
 */
export const getDecoratedSiteDomains = treeSelect(
	( state, siteId ) => [ getDomainsBySiteId( state, siteId ) ],
	( [ domains ] ) => {
		if ( ! domains ) {
			return null;
		}

		const localeSlug = getLocaleSlug();

		return domains.map( domain => ( {
			...domain,
			// TODO: Remove moment dependency.
			// For now, since it's unclear whether locales are needed by any subscribers to this selector,
			// return moment instances with current locale information from `i18n-calypso` applied.
			autoRenewalMoment: domain.autoRenewalDate
				? moment( domain.autoRenewalDate ).locale( localeSlug )
				: null,
			registrationMoment: domain.registrationDate
				? moment( domain.registrationDate ).locale( localeSlug )
				: null,
			expirationMoment: domain.expiry ? moment( domain.expiry ).locale( localeSlug ) : null,
			transferAwayEligibleAtMoment: domain.transferAwayEligibleAt
				? moment( domain.transferAwayEligibleAt ).locale( localeSlug )
				: null,
			transferEndDateMoment: domain.transferStartDate
				? moment( domain.transferStartDate )
						.locale( localeSlug )
						.add( 7, 'days' )
				: null,
		} ) );
	}
);

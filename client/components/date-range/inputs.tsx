/**
 * External dependencies
 */
import React, { useRef, useCallback } from 'react';
import { noop } from 'lodash';
import uuidv4 from 'uuid/v4';
import { localize, LocalizeProps } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { useLocalizedMoment } from 'components/localized-moment';
import FormLabel from 'components/forms/form-label';
import FormTextInput from 'components/forms/form-text-input';
import SharedProps from './shared-props';

type StartOrEnd = 'Start' | 'End';

interface Props {
	startDateValue: string;
	endDateValue: string;
	startLabel: string | null | undefined;
	endLabel: string | null | undefined;
	onInputFocus: ( value: string | null | undefined, startOrEnd: StartOrEnd ) => void;
	onInputBlur: ( value: string | null | undefined, startOrEnd: StartOrEnd ) => void;
	onInputChange: ( value: string | null | undefined, startOrEnd: StartOrEnd ) => void;
}

export function DateRangeInputs( props: Props & SharedProps & LocalizeProps ) {
	const uniqueId = useRef( uuidv4() );

	const startDateID = `startDate-${ uniqueId }`;
	const endDateID = `endDate-${ uniqueId }`;

	const { onInputFocus, onInputBlur, onInputChange } = props;

	/**
	 * Handles input focus events with fixed arguments
	 * for consistency via partial application
	 * @param  startOrEnd one of "Start" or "End"
	 * @return the partially applied function ready to receive event data
	 */
	const handleInputFocus = useCallback(
		( startOrEnd: StartOrEnd ) => ( e: Event ) => {
			const { value } = e.target as HTMLInputElement;
			onInputFocus( value, startOrEnd );
		},
		[ onInputFocus ]
	);

	/**
	 * Handles input blur events with fixed arguments
	 * for consistency via partial application
	 * @param  startOrEnd one of "Start" or "End"
	 * @return the partially applied function ready to receive event data
	 */
	const handleInputBlur = useCallback(
		( startOrEnd: StartOrEnd ) => ( e: Event ) => {
			const { value } = e.target as HTMLInputElement;
			onInputBlur( value, startOrEnd );
		},
		[ onInputBlur ]
	);

	/**
	 * Handles input change events with fixed arguments
	 * for consistency via partial application
	 * @param  startOrEnd one of "Start" or "End"
	 * @return the partially applied function ready to receive event data
	 */
	const handleInputChange = useCallback(
		( startOrEnd: StartOrEnd ) => ( e: Event ) => {
			const { value } = e.target as HTMLInputElement;
			onInputChange( value, startOrEnd );
		},
		[ onInputChange ]
	);

	const moment = useLocalizedMoment();

	// => "MM/DD/YYYY" (or locale equivalent)
	const localeDateFormat = moment.localeData().longDateFormat( 'L' );

	// If we haven't received a actual date then don't show anything and utilise the placeholder
	// as it is supposed to be used
	const startValue = props.startDateValue !== localeDateFormat ? props.startDateValue : '';
	const endValue = props.endDateValue !== localeDateFormat ? props.endDateValue : '';

	return (
		<fieldset className="date-range__date-inputs">
			<legend className="date-range__date-inputs-legend">Start and End Dates</legend>
			<div className="date-range__date-inputs-inner">
				<div className="date-range__date-input date-range__date-input--from">
					<FormLabel htmlFor={ startDateID }>
						{ props.startLabel ||
							props.translate( 'From', {
								comment: 'DateRange text input label for the start of the date range',
							} ) }
					</FormLabel>
					<FormTextInput
						id={ startDateID }
						name={ startDateID }
						value={ startValue }
						onChange={ handleInputChange( 'Start' ) }
						onBlur={ handleInputBlur( 'Start' ) }
						onFocus={ handleInputFocus( 'Start' ) }
						placeholder={ localeDateFormat }
					/>
				</div>
				<div className="date-range__date-input date-range__date-input--to">
					<FormLabel htmlFor={ endDateID }>
						{ props.startLabel ||
							props.translate( 'To', {
								comment: 'DateRange text input label for the end of the date range',
							} ) }
					</FormLabel>
					<FormTextInput
						id={ endDateID }
						name={ endDateID }
						value={ endValue }
						onChange={ handleInputChange( 'End' ) }
						onBlur={ handleInputBlur( 'End' ) }
						onFocus={ handleInputFocus( 'End' ) }
						placeholder={ localeDateFormat }
					/>
				</div>
			</div>
		</fieldset>
	);
}

DateRangeInputs.defaultProps = {
	onInputChange: noop,
	onInputBlur: noop,
	onInputFocus: noop,
};

export default localize( DateRangeInputs );

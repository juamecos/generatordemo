import React, { userReducer, createContext } from 'react';
import * as RNLocalize from 'react-native-localize';
import {
	LocalizationAction,
	LocalizationContextActions,
	LocalizationContextType,
	LocalizationState,
} from './LocalizationContextTypes';

export const localizationInitialState: LocalizationState = {
	languageCode: 'en',
	currency: 'USD',
	countryCode: 'US',
	timeZone: 'America/New_York',
	uses24HourClock: false,
	bestAvailableLanguage: 'en_US',
	decimalSeparator: '.',
	groupingSeparator: ',',
	metricSystem: false,
};

export const LocalizationContext = createContext<LocalizationContextType>({
	languageCode: 'en',
	currency: 'USD',
	countryCode: 'US',
	timeZone: 'America/New_York',
	uses24HourClock: false,
	bestAvailableLanguage: 'en_US',
	decimalSeparator: '.',
	groupingSeparator: ',',
	metricSystem: false,
	getLanguage: () => {},
	changeLanguage: () => {},
	checkingLanguage: () => {},
});

export const LocalizationRef = React.createRef<LocalizationContextActions>();

const useLocalization = (): LocalizationContextType => {
	const context = React.useContext(LocalizationContext);
	if (!context) {
		throw new Error(
			'useLocalization must be inside an LocalizationProvider with a value'
		);
	}
	return context;
};

export default useLocalization;

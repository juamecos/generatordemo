export interface LocalizationState {
	languageCode: string | null;
	currency: string | null;
	countryCode: string | null;
	timeZone: string | null;
	uses24HourClock: boolean;
	bestAvailableLanguage: string | null;
	decimalSeparator: string | null;
	groupingSeparator: string | null;
	metricSystem: boolean;
}

export type LocalizationAction =
	| { type: 'GET_LANGUAGE' }
	| { type: 'CHANGE_LANGUAGE'; language: string | undefined | null }
	| { type: 'CHECKING_LANGUAGE' };

export type LocalizationPayload = string;

export interface LocalizationContextActions {
	getLanguage: () => void;
	changeLanguage: (language: LocalizationPayload) => void;
	checkingLanguage: () => void;
}

export interface LocalizationContextType
	extends LocalizationState,
		LocalizationContextActions {}

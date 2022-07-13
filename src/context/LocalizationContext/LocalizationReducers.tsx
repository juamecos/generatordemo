import reactotron from 'reactotron-react-native';
import {
	LocalizationAction,
	LocalizationState,
} from './LocalizationContextTypes';
import * as RNLocalize from 'react-native-localize';
import i18n from 'src/languages/i18n';

type localeType = Readonly<{
	languageCode: string;
	scriptCode?: string | undefined;
	countryCode: string;
	languageTag: string;
	isRTL: boolean;
}>[];

export const LocalizationReducer = (
	prevState: LocalizationState,
	action: LocalizationAction
) => {
	switch (action.type) {
		case 'GET_LANGUAGE':
			const language = i18n.language;
			reactotron.log('GET_LANGUAGE');
			return {
				...prevState,
				languageCode: language,
			};
		case 'CHANGE_LANGUAGE':
			i18n.changeLanguage(action.language);
			reactotron.log('CHANGE_LANGUAGE', action.language);
			return {
				...prevState,
				languageCode: action.language,
			};
		case 'CHECKING_LANGUAGE':
			reactotron.log('CHECKING_LANGUAGE');
			return {
				...prevState,
			};
		default:
			return prevState;
	}
};

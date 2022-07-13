// import the original type declarations
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import home from '../languages/en/home.json';
import homeES from '../languages/es/home.json';
import homeCS from '../languages/cs/home.json';
import test from '../languages/en/test.json';
import testES from '../languages/es/test.json';
import testCS from '../languages/cs/test.json';
import bottomTab from '../languages/en/bottomTab.json';
import bottomTabES from '../languages/es/bottomTab.json';
import bottomTabCS from '../languages/cs/bottomTab.json';
import * as RNLocalize from 'react-native-localize';

export const resources = {
	en: {
		home,
		test,
		bottomTab,
	},
	es: {
		home: homeES,
		test: testES,
		bottomTab: bottomTabES,
	},
	cs: {
		home: homeCS,
		test: testCS,
		bottomTab: bottomTabCS,
	},
} as const;

// type languageDetectorType = Module | NewableModule<Module> | Newable<Module>;

const languageDetector: any = {
	type: 'languageDetector',
	async: true,
	detect: (callback: (callback) => void) => {
		return callback(RNLocalize.getLocales()[0].languageCode);
	},
	init: () => {},
	cacheUserLanguage: () => {},
};

i18n
	.use(languageDetector)
	.use(initReactI18next)
	.init({
		compatibilityJSON: 'v3',
		lng: i18n.options.lng,
		fallbackLng: 'en',
		ns: ['home', 'test', 'bottomTab'],
		resources,
		// react: {
		// 	useSuspense: false,
		// },
		interpolation: {
			escapeValue: false,
		},
	});

export const translate = (key: string, ns: string) => {
	return i18n.t(key, { ns });
};

export default i18n;

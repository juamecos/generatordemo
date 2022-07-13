import React, { useReducer } from 'react';
import App from 'src/App';
import {
	localizationInitialState,
	LocalizationContext,
	LocalizationRef,
} from './LocalizationContext';
import { LocalizationContextActions } from './LocalizationContextTypes';
import { LocalizationReducer } from './LocalizationReducers';

export const LocalizationProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(
		LocalizationReducer,
		localizationInitialState
	);

	React.useEffect(() => {
		const initState = async () => {
			try {
				dispatch({ type: 'CHECKING_LANGUAGE' });
				dispatch({ type: 'GET_LANGUAGE' });
			} catch (error) {}
		};

		initState();
	}, []);

	React.useImperativeHandle(LocalizationRef, () => localizationActions);

	const localizationActions: LocalizationContextActions = React.useMemo(
		() => ({
			getLanguage: async () => {
				dispatch({ type: 'GET_LANGUAGE' });
			},
			changeLanguage: async () => {
				dispatch({ type: 'CHANGE_LANGUAGE' });
			},
			checkingLanguage: async () => {
				dispatch({ type: 'CHECKING_LANGUAGE' });
			},
		}),
		[]
	);

	return (
		<LocalizationContext.Provider value={{ ...state, ...localizationActions }}>
			<App />
		</LocalizationContext.Provider>
	);
};

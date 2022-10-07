import React, { FC, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from './FoundStoneCodeScreenStyle';
import { FoundStoneCodeScreenProps } from './FoundStoneCodeScreenProps';
import BackArrow from 'src/components/BackArrow';
import Text from 'src/components/Text';
import { TextInput } from 'react-native-gesture-handler';
import { Field } from 'formik';
import FormField from 'src/components/Forms/Field';
import FormContainer from 'src/components/Forms/FormContainer';
import { codeValidationSchema } from 'src/utils/ValidationSchema';
import SubmitButton from 'src/components/Forms/SubmitButton';
import {
	useCheckStoneByCodeLazyQuery,
	useOtpCheckMutation,
} from 'src/generated/graphql';
import Loader from 'src/components/Loader';
import Toast from 'react-native-toast-message';
import { useFound } from 'src/context/foundContext/foundContext';

interface IValues {
	code: string;
}
const FoundStoneCodeScreen: FC<FoundStoneCodeScreenProps> = ({
	route,
	navigation,
}) => {
	// From the previous screen

	// Context
	const { code, step, setFoundCode, setFoundStep } = useFound();

	// Custom hooks
	const [checkStoneByCode, { data, error, loading }] =
		useCheckStoneByCodeLazyQuery({
			fetchPolicy: 'network-only',
		});

	useEffect(() => {
		if (loading) return <Loader />;
		if (error) {
			console.log(error);
		}
		if (data) {
			Toast.show({
				type: data?.checkStoneByCode?.status ? 'success' : 'error',
				text1: data.checkStoneByCode?.message,
			});

			if (data?.checkStoneByCode?.stone?.code) {
				setFoundStep(step + 1);
				setFoundCode(data?.checkStoneByCode?.stone?.code);

				navigation?.navigate('FoundStoneMapScreen');
			}
		}

		return () => {
			setFoundStep(0);
			setFoundCode(null);
		};
	}, [data, error, loading]);

	// Internal state

	// Component JSX
	return (
		<SafeAreaView style={styles.screenContainer} testID='FoundStoneScreen'>
			<Text h2 title={`Did you find a stone?`} />
			<Text h4 title={`Please, add the code behind the stone`} />

			<FormContainer
				initialValues={{
					code: '',
				}}
				validationSchema={codeValidationSchema}
				onSubmit={async (values: IValues, { resetForm }: any) => {
					console.log('click');

					//TODO investigate the best way to build the code in the backend, probably username + 4-digits random hexa number

					try {
						await checkStoneByCode({
							variables: {
								code: values.code,
							},
						});
					} catch (err) {
						console.log(err);
					}
				}}
			>
				<View>
					<Field
						component={FormField}
						name='code'
						label='Code'
						keyboardType='default'
						textContentType='none'
					/>
				</View>

				<SubmitButton title='Submit' />
			</FormContainer>

			<BackArrow />
		</SafeAreaView>
	);
};

export default FoundStoneCodeScreen;

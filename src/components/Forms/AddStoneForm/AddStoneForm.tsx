import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { stoneValidationSchema } from 'src/utils/ValidationSchema';
import FormContainer from '../FormContainer';

import styles from './AddStoneFormStyle';

import FormField from 'src/components/Forms/Field';
import { Field } from 'formik';
import { spacing } from 'src/theme';
import SubmitButton from '../SubmitButton';
import { useStone } from 'src/context/stoneContext/stoneContext';
import DescriptionField from '../Fields/DescriptionField';
import { useNavigation } from '@react-navigation/native';

interface IValues {
	title: string;
	description: string;
}

const initialValuesObject: IValues = {
	title: '',
	description: '',
};

export type Props = {
	name?: string;
};

const AddStoneForm: React.FC<Props> = ({ ...props }) => {
	const { image, location, title, description, setInfo, setStep } = useStone();
	const { navigate } = useNavigation();

	useEffect(() => {
		console.log(
			'AddStoneForm: Location',
			location,
			'title',
			title,
			'description',
			description
		);

		return () => {};
	}, [title, description]);
	return (
		<View
			testID='AddStoneForm'
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: spacing.vertical.tiny,
			}}
		>
			<FormContainer
				testID='login-form-container'
				style={styles.container}
				initialValues={initialValuesObject}
				validationSchema={stoneValidationSchema}
				onSubmit={async (values: IValues, { resetForm }: any) => {
					console.log('esto es lo que llega al form onSumbit', values);
					if (!image.base64) {
						setStep(0);
						return;
					}
					setInfo(values);
					resetForm();
					setStep(3);
					navigate('PreviewScreen');
				}}
			>
				<Field
					component={FormField}
					autoCorrect={false}
					name='title'
					label='Title'
					onFocus={() => {
						console.log('focused');
					}}
					maxLength={64}
					autofocus
				/>
				<Field
					name='description'
					numberOfLines={4}
					component={DescriptionField}
					autoCorrect={false}
					label='Description'
					maxLength={200}
					autofocus
				/>

				<SubmitButton
					title={!title || !description ? 'Omit' : 'Submit'}
					styleButton={{
						width: '30%',
					}}
				/>
			</FormContainer>
		</View>
	);
};

export default AddStoneForm;

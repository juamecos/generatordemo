import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { stoneValidationSchema } from 'src/utils/ValidationSchema';
import FormContainer from '../FormContainer';

import styles from './AddStoneFormStyle';

import FormField from 'src/components/Forms/Field';
import { Field } from 'formik';
import { color, spacing } from 'src/theme';
import SubmitButton from '../SubmitButton';
import { useStone } from 'src/context/stoneContext/stoneContext';
import DescriptionField from '../Fields/DescriptionField';
import { useNavigation } from '@react-navigation/native';
import Title from 'src/components/Title';

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
	const { navigate } = useNavigation();
	const { image, location, title, description, setInfo, setStep } = useStone();

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
				// flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: spacing.vertical.tiny,
				backgroundColor: color.white,
				padding: spacing.horizontal.small,
				borderRadius: spacing.horizontal.small,
			}}
		>
			<Title title='Add a title and a description' />
			<FormContainer
				testID='login-form-container'
				style={styles.container}
				initialValues={initialValuesObject}
				validationSchema={stoneValidationSchema}
				onSubmit={async (values: IValues, { resetForm }: any) => {
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
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<SubmitButton
						title={'Omit'}
						buttonColor={color.secondary}
						styleButton={{
							width: '30%',
						}}
					/>
					<SubmitButton
						title={'Submit'}
						styleButton={{
							width: '30%',
						}}
					/>
				</View>
			</FormContainer>
		</View>
	);
};

export default AddStoneForm;

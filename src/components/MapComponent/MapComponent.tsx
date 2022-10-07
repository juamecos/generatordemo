import React, { useState, useEffect } from 'react';
import { MapEvent, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import styles from './MapComponentStyle';
import MapView from 'react-native-maps';
import { ILocation } from 'src/context/stoneContext/stoneContextTypes';
import { useStone } from '../../context/stoneContext/stoneContext';
import { SafeAreaView, View } from 'react-native';
import BackArrow from '../BackArrow';
import useGeolocation from 'src/hooks/useGeolocation';

import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import Text from '../Text';
import Toast from 'react-native-toast-message';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { color } from 'src/theme';
import { useFound } from 'src/context/foundContext/foundContext';

export type Props = {
	routeName?: string;
};

const MapComponent: React.FC<Props> = ({ routeName }) => {
	const { navigate } = useNavigation();
	const { location, step, setLocation, setStep } = useStone();
	const {
		step: foundStep,
		location: foundLocation,
		setFoundStep,
		setFoundLocation,
	} = useFound();

	const [marker, setMarker] = useState<ILocation | null>(null);
	const [region, setRegion] = useState<Region>();
	const { modalOpen, setModalOpen, toggleModal } = useModal();
	const { currentPosition, country, subdivision, locality } = useGeolocation();

	const initialRegion = {
		latitude: 49.2226667,
		latitudeDelta: 0.01,
		longitude: 16.624475,
		longitudeDelta: 0.01,
	};

	useEffect(() => {
		if (currentPosition) {
			setRegion({
				latitude: currentPosition.latitude,
				longitude: currentPosition.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			});
		}
		setModalOpen(true);
	}, []);

	useEffect(() => {}, []);

	const handleOnLongPress = async (e: MapEvent) => {
		if (routeName === 'LocationScreen') {
			setLocation(e.nativeEvent.coordinate);
		}
		if (routeName === 'FoundStoneMapScreen') {
			setFoundLocation(e.nativeEvent.coordinate);
		}

		setMarker(e.nativeEvent.coordinate);
	};

	const setUserCurrentLocation = () => {
		setModalOpen(false);

		if (currentPosition) {
			Toast.show({
				type: 'success',
				text1: 'Current position set as:',
				text2: `${country} - ${subdivision} - ${locality}`,
				visibilityTime: 5000,
			});
			if (routeName === 'LocationScreen') {
				setLocation(currentPosition);
			}
			if (routeName === 'FoundStoneMapScreen') {
				setFoundLocation(currentPosition);
			}
			setMarker(currentPosition);
		} else {
			Toast.show({
				type: 'error',
				text1: 'Cannot use your current possition',
				visibilityTime: 5000,
			});
		}
	};

	const onSetAgain = () => {
		setMarker(null);
		if (routeName === 'LocationScreen') {
			setLocation({
				latitude: 0,
				longitude: 0,
			});
		}
		if (routeName === 'FoundStoneMapScreen') {
			setFoundLocation({
				latitude: 0,
				longitude: 0,
			});
		}
	};

	const isContinueButtonDisabled = () => {
		if (
			routeName === 'FoundStoneMapScreen' &&
			foundLocation.latitude === 0 &&
			foundLocation.longitude === 0
		) {
			return true;
		}
		if (
			routeName === 'LocationScreen' &&
			location.latitude === 0 &&
			location.longitude === 0
		) {
			return true;
		}
		return false;
	};

	const onContinue = () => {
		if (routeName === 'FoundStoneMapScreen') {
			setFoundStep(foundStep + 1);
			navigate('ImagePickerScreen', { entity: 'Found' });
		}
		if (routeName === 'LocationScreen') {
			setStep(step + 1);
			navigate('DescriptionScreen');
		}
	};

	const tapMap = () => {
		setModalOpen(false);
		Toast.show({
			type: 'info',
			text1: 'Tap the map and hold to set where you left the stone',
			visibilityTime: 5000,
		});
	};
	return (
		<SafeAreaView>
			<MapView
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				style={styles.map}
				onLongPress={e => handleOnLongPress(e)}
				initialRegion={region ? region : initialRegion}
			>
				{marker !== null && (
					<Marker
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
					/>
				)}
			</MapView>
			<BackArrow />

			<View style={styles.buttonGroup}>
				<CustomButton
					medium
					rounded
					secondary
					title='Set again'
					onPress={() => onSetAgain()}
				/>
				<CustomButton
					medium
					rounded
					primary
					disabled={isContinueButtonDisabled()}
					title='Continue'
					onPress={async () => onContinue()}
				/>
			</View>
			<Modal
				isVisible={modalOpen}
				type='topModal'
				title={
					routeName === 'LocationScreen'
						? 'Where did you leave the stone?'
						: 'Where did you find the stone?'
				}
				handleClose={() => toggleModal()}
				acceptButton
				acceptButtonColor={color.secondary}
				acceptButtonTitle='Current location'
				acceptButtonOnPress={setUserCurrentLocation}
				cancelButton
				cancelButtonColor={color.primary}
				cancelButtonTitle='Tap in the map'
				cancelButtonOnPress={tapMap}
				closeButton={false}
			>
				<Text
					h4
					title='Use your current location or tap in the map the place where you left the stone'
				/>
			</Modal>
		</SafeAreaView>
	);
};

export default MapComponent;

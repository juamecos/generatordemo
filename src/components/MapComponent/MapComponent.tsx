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

export type Props = {
	name?: string;
};

const MapComponent: React.FC<Props> = () => {
	const { navigate } = useNavigation();
	const { location, step, setLocation, setStep } = useStone();
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
		console.log(e.nativeEvent.coordinate);

		setLocation(e.nativeEvent.coordinate);
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
			setLocation(currentPosition);
			setMarker(currentPosition);
		} else {
			Toast.show({
				type: 'error',
				text1: 'Cannot use your current possition',
				visibilityTime: 5000,
			});
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
					onPress={() => {
						setLocation(null);
						setMarker(null);
					}}
				/>
				<CustomButton
					medium
					rounded
					primary
					disabled={
						location.latitude === 0 && location.longitude === 0 ? true : false
					}
					title='Continue'
					onPress={async () => {
						setStep(step + 1);
						navigate('DescriptionScreen');
					}}
				/>
			</View>
			<Modal
				isVisible={modalOpen}
				type='topModal'
				title={'Where did you leave the stone?'}
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

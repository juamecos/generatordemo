import React, { useState, useEffect } from 'react';
import { MapEvent, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import styles from './MapComponentStyle';
import MapView from 'react-native-maps';
import { ILocation } from 'src/context/stoneContext/stoneContextTypes';
import { useStone } from '../../context/stoneContext/stoneContext';
import { View, SafeAreaView } from 'react-native';
import BackArrow from '../BackArrow';
import useGeolocation from 'src/hooks/useGeolocation';

export type Props = {
	name?: string;
};

const MapComponent: React.FC<Props> = ({ ...props }) => {
	const { image, setLocation } = useStone();
	const [marker, setMarker] = useState<ILocation | null>(null);
	const [region, setRegion] = useState<Region>();
	const { currentPosition } = useGeolocation();
	console.log('from Map', currentPosition);

	useEffect(() => {
		if (currentPosition) {
			setRegion({
				latitude: currentPosition.latitude,
				longitude: currentPosition.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			});
		}
	}, []);

	const handleOnLongPress = async (e: MapEvent) => {
		console.log(e.nativeEvent.coordinate);

		setLocation(e.nativeEvent.coordinate);
		setMarker(e.nativeEvent.coordinate);
	};
	return (
		<SafeAreaView>
			<MapView
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				style={styles.map}
				// onPress={e => console.log(e.nativeEvent)}
				onLongPress={e => handleOnLongPress(e)}
				region={region!}
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
		</SafeAreaView>
	);
};

export default MapComponent;

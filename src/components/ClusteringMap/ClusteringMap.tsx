import React, { useRef } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import styles from './ClusteringMapStyle';
import { IStone } from '../../interfaces/IStone';
import { StonesQuery } from 'src/generated/graphql';
import useGeolocation from 'src/hooks/useGeolocation';
import LoadingScreen from 'src/screens/LoadingScreen';
import IconText from '../IconText';
import { spacing } from 'src/theme';
import Title from '../Title';

const initialRegion = {
	latitude: 37.72825,
	longitude: -122.4324,
	latitudeDelta: 0.25,
	longitudeDelta: 0.15,
};
export type Props = {
	data: StonesQuery | undefined;
};

const ClusteringMap: React.FC<Props> = ({ data }) => {
	const stones = data?.stones?.stones;
	const { currentPosition, country, subdivision, locality } = useGeolocation();

	const mapRef = useRef<MapView>(null);

	// console.log(mapViewRef.current?.context);

	if (!currentPosition) {
		return <LoadingScreen />;
	}

	const initialRegion = {
		latitude: currentPosition.latitude,
		longitude: currentPosition.longitude,
		latitudeDelta: 1.5,
		longitudeDelta: 1.5,
	};

	return (
		<>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={initialRegion}
				showsCompass
				showsUserLocation
				showsScale
			>
				{stones &&
					stones?.length > 0 &&
					stones.map(stone => {
						return (
							<Marker
								key={stone?.id}
								coordinate={{
									latitude: stone?.latitude!,
									longitude: stone?.longitude!,
								}}
							/>
						);
					})}
			</MapView>
		</>
	);
};

export default ClusteringMap;

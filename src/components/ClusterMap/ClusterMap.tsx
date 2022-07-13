/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	LatLng,
	Callout,
	Region,
} from 'react-native-maps';
import useGeolocation from 'src/hooks/useGeolocation';
import styles from './ClusterMapStyle';
import LoadingScreen from 'src/screens/LoadingScreen';
import IconText from '../IconText';
import { color, spacing } from 'src/theme';
import { StonesQuery, useStonesQuery } from 'src/generated/graphql';

import Loader from '../Loader/Loader';
import Text from '../Text';
import Title from '../Title';
import { useNavigation } from '@react-navigation/native';
import useSupercluster, { UseSuperclusterArgument } from 'use-supercluster';
import Supercluster from 'supercluster';
import { BBox } from 'geojson';

export type Props = {
	data?: StonesQuery;
};

function debounce(func, timeout = 300) {
	let timer: any;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

const ClusterMap: React.FC<Props> = ({ data }) => {
	const { currentPosition, country, subdivision, locality } = useGeolocation();
	const { navigate } = useNavigation();

	const [zoomLevel, setZoomLevel] = useState<number>(10);
	const [bounds, setBounds] = useState<BBox>(null);
	const [initialCenter, setInitialCenter] = useState({
		latitude: 49.228762132706926,
		longitude: 16.629474610090256,
	});

	const mapViewRef = useRef<MapView>();

	const updateMap = async () => {
		try {
			const b = await mapViewRef.current?.getMapBoundaries();
			if (b) {
				setBounds([
					b.northEast?.longitude!,
					b.northEast?.latitude!,
					b.southWest?.longitude!,
					b.southWest?.latitude!,
				]);
			}
			const camera = await mapViewRef.current?.getCamera();
			if (camera) {
				setZoomLevel(camera.zoom);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onMove = useCallback(() => {
		updateMap();
	}, [mapViewRef]);

	// useEffect(() => {
	// 	updateMap();
	// }, [mapViewRef, bounds]);

	const stones = data?.stones?.stones!;

	type stonePoint = {
		type: 'Feature';
		properties: {
			cluster: boolean;
			id: number;
			image: string;
		};
		geometry: {
			type: 'Point';
			coordinates: number[];
		};
	};

	const points = stones.map(
		(stone: any): stonePoint => ({
			type: 'Feature',
			properties: { cluster: false, id: stone?.id!, image: stone?.image! },
			geometry: {
				type: 'Point',
				coordinates: [stone?.longitude!, stone?.latitude!],
			},
		})
	);

	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom: zoomLevel,
		options: { radius: 75, maxZoom: 20 },
	});

	console.log(clusters);

	const centerPosition = () => {
		mapViewRef.current?.animateCamera({
			center: { latitude, longitude },
			pitch: 0,
		});
	};

	const zoomOut = async () => {
		try {
			const camera = await mapViewRef.current?.getCamera();

			mapViewRef.current?.animateCamera({
				zoom: Math.round(camera?.zoom!) - 1,
			});
		} catch (err) {
			console.log(err);
		}
	};
	const zoomIn = async () => {
		try {
			const camera = await mapViewRef.current?.getCamera();
			mapViewRef.current?.animateCamera({
				zoom: Math.round(camera?.zoom!) + 1,
			});
		} catch (err) {
			console.log(err);
		}
	};

	if (!currentPosition) {
		return <LoadingScreen />;
	}

	const latitude = currentPosition?.latitude;
	const longitude = currentPosition?.longitude;

	return (
		<View testID='ClusterMap' style={styles.clusterMapWrapper}>
			<Title
				title={`${country} - ${subdivision} - ${locality}`}
				styleWrapper={{
					backgroundColor: color.transparent,
				}}
			/>

			<>
				<MapView
					ref={el => (mapViewRef.current = el!)}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					showsCompass
					showsUserLocation
					onMapLoaded={() => onMove()}
					onRegionChangeComplete={debounce(() => onMove(), 700)}
					showsMyLocationButton={false}
					initialRegion={{
						latitude,
						longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
				>
					{stones?.map((stone, index) => {
						return (
							<Marker
								key={index}
								coordinate={{
									latitude: stone?.latitude!,
									longitude: stone?.longitude!,
								}}
								onPress={() => {
									navigate('SingleStoneScreen', { id: stone?.id! });
								}}
							>
								<>
									<Image
										resizeMode='cover'
										resizeMethod='scale'
										source={{ uri: stone?.image! }}
										style={{
											width: 40,
											height: 40,
											borderRadius: 100,
										}}
									/>
								</>
							</Marker>
						);
					})}
				</MapView>

				<IconText
					iconName='compass'
					size={spacing.horizontal.medium}
					onPress={() => centerPosition()}
					style={{
						position: 'absolute',
						top: spacing.horizontal.medium,
						right: spacing.horizontal.tiny,
					}}
				/>
				<IconText
					size={spacing.horizontal.medium}
					iconName='add-circle-outline'
					iconColor={color.primary}
					onPress={() => zoomIn()}
					style={{
						position: 'absolute',
						bottom: spacing.vertical.medium + 75,
						right: spacing.horizontal.tiny,
					}}
				/>
				<IconText
					iconName='remove-circle-outline'
					size={spacing.horizontal.medium}
					iconColor={color.primary}
					onPress={() => zoomOut()}
					style={{
						position: 'absolute',
						bottom: spacing.vertical.medium,
						right: spacing.horizontal.tiny,
					}}
				/>
			</>
		</View>
	);
};

export default ClusterMap;

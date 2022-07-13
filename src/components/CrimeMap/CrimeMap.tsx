import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';

import useSWR from 'swr';
import { BBox, GeoJsonProperties } from 'geojson';
import styles from './CrimeMapStyle';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import useSupercluster from 'use-supercluster';
import Text from '../Text';
import { spacing } from '../../theme/spacing';
import { color } from '../../theme/color';
import IconText from '../IconText';
import useGeolocation from 'src/hooks/useGeolocation';

export type Props = {
	name?: string;
};

const fetcher = (...args) => fetch(...args).then(response => response.json());

function debounce(func, timeout = 300) {
	let timer: any;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

const CrimeMap: React.FC<Props> = ({ ...props }) => {
	const { currentPosition } = useGeolocation();
	// setup map
	const mapViewRef = useRef<MapView>();
	const [bounds, setBounds] = useState<BBox>([
		-1.1721199750900269, 52.59235676009953, -1.1103222146630287,
		52.66237747522885,
	]);
	const [zoom, setZoom] = useState(6);
	const centerPosition = () => {
		mapViewRef.current?.animateCamera({
			center: {
				latitude: currentPosition.latitude,
				longitude: currentPosition.longitude,
			},
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

	// load and format data

	const url =
		'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
	const { data, error } = useSWR(url, { fetcher });
	const crimes = data && !error ? data : [];
	const points = crimes.map(crime => ({
		type: 'Feature',
		properties: { cluster: false, crimeId: crime.id, category: crime.category },
		geometry: {
			type: 'Point',
			coordinates: [
				parseFloat(crime.location.longitude),
				parseFloat(crime.location.latitude),
			],
		},
	}));

	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});

	useEffect(() => {
		updateMap();
	}, [bounds, zoom]);

	const updateMap = async () => {
		try {
			const b = await mapViewRef.current?.getMapBoundaries();

			if (b) {
				setBounds([
					b.southWest?.longitude!,
					b.southWest?.latitude!,
					b.northEast?.longitude!,
					b.northEast?.latitude!,
				]);
			}
			const camera = await mapViewRef.current?.getCamera();
			if (camera) {
				setZoom(camera.zoom);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onMove = useCallback(() => {
		updateMap();
	}, []);

	const clusterDimensions = (points: [number], pointCount: number): number =>
		30 + (pointCount / points.length) * 30;

	return (
		<View testID='ClusterMap' style={styles.clusterMapWrapper}>
			<View>
				<MapView
					ref={el => (mapViewRef.current = el!)}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					showsUserLocation
					// onMapLoaded={() => updateMap()}
					onRegionChange={() => debounce(() => onMove(), 300)}
					// onRegionChangeComplete={() => onMove()}
					showsMyLocationButton={false}
					initialRegion={{
						latitude: 52.629729,
						longitude: -1.131592,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
				>
					{clusters &&
						clusters.map(cluster => {
							const [longitude, latitude] = cluster.geometry.coordinates;
							const { cluster: isCluster, point_count: pointCount } =
								cluster.properties;

							if (isCluster) {
								return (
									<Marker
										key={cluster.id}
										coordinate={{ latitude, longitude }}
										style={{ zIndex: pointCount + 1 }}
										onPress={() => {}}
									>
										<View
											style={{
												width: clusterDimensions(points, pointCount),
												height: clusterDimensions(points, pointCount),
												borderRadius: 2000,
												backgroundColor: 'blue',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Text h5 title={pointCount} textColor={'white'} />
										</View>
									</Marker>
								);
							}

							return (
								<Marker
									key={cluster.properties.crimeId}
									coordinate={{ latitude, longitude }}
								></Marker>
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
			</View>
		</View>
	);
};

export default CrimeMap;

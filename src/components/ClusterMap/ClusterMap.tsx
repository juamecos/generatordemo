/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './ClusterMapStyle';
import IconText from '../IconText';
import { color, spacing } from 'src/theme';
import { StonesQuery } from 'src/generated/graphql';

import Text from '../Text';
import debounce from 'src/utils/debounce';
import useClusterMap from 'src/hooks/useClusterMap';

export type Props = {
	data?: StonesQuery;
};

const ClusterMap: React.FC<Props> = () => {
	const {
		currentPosition,
		maxZoom,
		zoom,
		region,
		mapViewRef,
		points,
		clusters,
		supercluster,
		onMove,
		centerPosition,
		onMarkerPress,
		clusterDimensions,
	} = useClusterMap();

	useEffect(() => {
		onMove();
	}, []);
	useEffect(() => {
		if (currentPosition) {
			mapViewRef.current?.setCamera({
				center: {
					latitude: currentPosition.latitude,
					longitude: currentPosition.longitude,
				},
			});
		}
	}, []);
	useEffect(() => {
		if (currentPosition) {
			mapViewRef.current?.setCamera({
				center: {
					latitude: currentPosition.latitude,
					longitude: currentPosition.longitude,
				},
			});
		}
	}, [currentPosition]);

	useEffect(() => {
		onMove();
	}, [zoom]);

	const initialRegion = region
		? region
		: {
				latitude: 49.22014114375589,
				longitude: 16.62319488823414,
				latitudeDelta: 0.5,
				longitudeDelta: 0.5,
		  };

	return (
		<View testID='ClusterMap' style={styles.clusterMapWrapper}>
			<>
				<MapView
					ref={el => (mapViewRef.current = el!)}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					showsUserLocation
					onRegionChange={debounce(() => onMove(), 700)}
					showsMyLocationButton={false}
					initialRegion={initialRegion}
				>
					{clusters &&
						clusters.map(cluster => {
							const [longitude, latitude] = cluster.geometry.coordinates;

							const isCluster = cluster.properties?.cluster;
							const pointCount = cluster.properties?.point_count;

							if (isCluster) {
								return (
									<Marker
										key={cluster.id}
										coordinate={{ latitude, longitude }}
										style={{ zIndex: pointCount + 1 }}
										onPress={() => {
											const clusterId = Number(cluster.id);
											const expansionZoom = Math.min(
												supercluster?.getClusterExpansionZoom(clusterId),
												maxZoom
											);
											mapViewRef.current?.animateCamera(
												{
													center: { latitude, longitude },
													zoom: expansionZoom,
												},
												{ duration: 1000 }
											);
										}}
									>
										<View
											style={[
												styles.clusterCircle,
												{
													width: clusterDimensions(points, pointCount),
													height: clusterDimensions(points, pointCount),
												},
											]}
										>
											<Text h5 title={pointCount} textColor={'white'} />
										</View>
									</Marker>
								);
							}

							return (
								<Marker
									key={cluster.properties.id}
									coordinate={{ latitude, longitude }}
									onPress={() => onMarkerPress(cluster.properties.id)}
								/>
							);
						})}
				</MapView>

				<IconText
					iconName='compass'
					size={spacing.horizontal.medium}
					iconColor={color.primaryDarker}
					onPress={() => centerPosition()}
					style={{
						position: 'absolute',
						top: spacing.hp('1.8%'),
						right: spacing.hp('1.8%'),
					}}
				/>
			</>
		</View>
	);
};

export default ClusterMap;

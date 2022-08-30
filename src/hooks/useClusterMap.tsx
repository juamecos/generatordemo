import { useNavigation } from '@react-navigation/native';

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import MapView, { Region } from 'react-native-maps';
import { useStonesQuery } from 'src/generated/graphql';
import LoadingScreen from 'src/screens/LoadingScreen';
import useSupercluster from 'use-supercluster';
import useGeolocation from './useGeolocation';
import Toast from 'react-native-toast-message';
import { ILocation } from '../context/stoneContext/stoneContextTypes';
import Supercluster, {
	AnyProps,
	ClusterProperties,
	PointFeature,
} from 'supercluster';
import { BBox, GeoJsonProperties } from 'geojson';

type Props = {
	currentPosition: ILocation | undefined;
	maxZoom: number | undefined;
	initialZoom: number | undefined;
	zoom: number | undefined;
	bounds: BBox;
	region: Region | undefined;
	mapViewRef: React.MutableRefObject<MapView | undefined>;
	latitude: number | undefined;
	longitude: number | undefined;
	points: PointFeature<GeoJsonProperties>[];
	clusters: (
		| PointFeature<GeoJsonProperties>
		| PointFeature<ClusterProperties & AnyProps>
	)[];
	supercluster: Supercluster<GeoJsonProperties, AnyProps> | undefined;
	setZoom: Dispatch<SetStateAction<number>>;
	setBounds: Dispatch<SetStateAction<BBox>>;
	setRegion: Dispatch<SetStateAction<Region | undefined>>;
	onMove: () => Promise<void>;
	centerPosition: () => void;
	onMarkerPress: (id: number | string) => void;
	clusterDimensions: (points: [], pointCount: number) => number;
};

const useClusterMap = (): Props => {
	const { currentPosition } = useGeolocation();
	const { navigate } = useNavigation();
	const maxZoom = 20;
	const initialZoom = 7;
	const [zoom, setZoom] = useState<number>(initialZoom);
	const [bounds, setBounds] = useState<BBox>([
		16.42453171312809, 48.93189276089141, 16.82655293494463, 49.42246588469068,
	]);
	const [region, setRegion] = useState<Region>();

	const mapViewRef = useRef<MapView>();

	const onMove = useCallback(async () => {
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
		updateMap();
	}, []);

	const {
		data: dataStones,
		error: errorStones,
		loading: loadingStones,
	} = useStonesQuery({
		variables: {
			page: 1,
			itemsPage: 20,
		},
	});

	const stones =
		dataStones && !errorStones && !loadingStones
			? dataStones?.stones?.stones!
			: [];

	const points = stones.map(
		(stone): PointFeature<GeoJsonProperties> => ({
			type: 'Feature',
			properties: { cluster: false, id: stone?.id! },
			geometry: {
				type: 'Point',
				coordinates: [stone?.longitude!, stone?.latitude!],
			},
		})
	);

	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom },
	});

	const centerPosition = () => {
		const { latitude, longitude } = currentPosition;
		mapViewRef.current?.animateCamera({
			center: { latitude, longitude },
			pitch: 0,
		});
	};

	const onMarkerPress = (id: number | string) => {
		navigate('SingleStoneScreen', { id });
	};

	if (!currentPosition && !dataStones) {
		return <LoadingScreen />;
	}

	if (errorStones) {
		Toast.show({
			type: 'error',
			text1: 'Something went wrong loading Stones',
			text2: `${errorStones.message}`,
		});
	}

	const latitude = currentPosition?.latitude;
	const longitude = currentPosition?.longitude;

	const clusterDimensions = (points: [], pointCount: number): number =>
		30 + (pointCount / points.length) * 30;

	return {
		currentPosition,
		maxZoom,
		initialZoom,
		zoom,
		bounds,
		region,
		mapViewRef,
		latitude,
		longitude,
		points,
		clusters,
		supercluster,
		setZoom,
		setBounds,
		setRegion,
		onMove,
		centerPosition,
		onMarkerPress,
		clusterDimensions,
	};
};

export default useClusterMap;

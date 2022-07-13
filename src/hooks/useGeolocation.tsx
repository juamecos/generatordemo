import React, { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { usePermissions } from 'src/context/permissionsContext/permissionsContext';
import { ReverseGeolocationResult } from 'src/interfaces/ReverseGeolocationResult';
import i18n from 'src/languages/i18n';
import useSWR from 'swr';
import { ILocation } from '../context/stoneContext/stoneContextTypes';
import { useToast } from 'react-native-toast-notifications';
import LoadingScreen from 'src/screens/LoadingScreen';

const fetcher = (...args) => fetch(...args).then(response => response.json());

const useGeolocation = () => {
	const { locationStatus } = usePermissions();
	const language = i18n.language;
	const [country, setCountry] = useState('');
	const [subdivision, setSubdivision] = useState('');
	const [locality, setLocality] = useState('');
	const [currentPosition, setCurrentPosition] = useState<ILocation>();

	const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentPosition?.latitude}&longitude=${currentPosition?.longitude}&localityLanguage=${language}`;

	const { data, error } = useSWR<ReverseGeolocationResult, any, any>(
		url,
		fetcher
	);

	useEffect(() => {
		if (locationStatus === 'granted') {
			Geolocation.getCurrentPosition(
				async ({ coords }) => {
					setCurrentPosition({
						latitude: coords.latitude,
						longitude: coords.longitude,
					});
				},
				err => {
					// See error code charts below.
					console.log(err.code, err.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		}
	}, []);

	useEffect(() => {
		if (data) {
			setCountry(data.countryName);
			setSubdivision(data.principalSubdivision);
			setLocality(data.locality);
			setCurrentPosition({
				latitude: data.latitude,
				longitude: data.longitude,
			});
		}
	}, [data]);

	if (error) {
		console.log(error);
	}

	if (!data) {
		return <LoadingScreen />;
	}

	return {
		currentPosition,
		country,
		subdivision,
		locality,
		setCountry,
		setSubdivision,
		setLocality,
		setCurrentPosition,
	};
};

export default useGeolocation;

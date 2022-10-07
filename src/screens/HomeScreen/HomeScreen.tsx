import React, { FC, useRef, useState, useEffect } from 'react';

import style from './HomeScreenStyle';
import { HomeScreenProps } from './HomeScreenProps';
import {
	View,
	FlatList,
	ActivityIndicator,
	Animated,
	Pressable,
} from 'react-native';

import CountryPicker, {
	Country,
	CountryCode,
	Flag,
	FlagButton,
} from 'react-native-country-picker-modal';

import Card from 'src/components/Card';
import { IStone } from 'src/interfaces/IStone';
import { useStonesHook } from '../../hooks/useStones';
import { color } from 'src/theme';
import Text from 'src/components/Text';
import { spacing } from '../../theme/spacing';
import IconText from 'src/components/IconText';
import useModal from 'src/hooks/useModal';

import useGeolocation from '../../hooks/useGeolocation';

import { constants } from 'src/theme/constants';
import { useAnimation } from 'src/hooks/useAnimated';

import Modal from 'src/components/Modal';

type filterType = 'Newest' | 'Popular' | 'Nearest' | 'Country';

/**
 * Screen component description
 *
 * @returns Screen
 */
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
	const isMounted = useRef(true);
	const [filter, setFilter] = useState<filterType>('Newest');
	const [selectedCountryCode, setSelectedCountryCode] =
		useState<CountryCode>('CZ');
	const { countryCode: geoCountryCode } = useGeolocation();

	const { modalOpen, setModalOpen } = useModal();

	const flatListRef = useRef<FlatList>();
	const {
		stonesInfoPage,
		stonesArray,
		isFetching,
		handleOnSelected,
		moreItemsToShow,
		onRefresh,
		handleOnEndReached,
	} = useStonesHook();

	const { arrowTransform, showContent, toggleDropdown } = useAnimation();

	useEffect(() => {
		if (!selectedCountryCode) {
			setSelectedCountryCode(geoCountryCode);
		}
		return () => {
			isMounted.current = false;
		};
	}, [selectedCountryCode, geoCountryCode]);

	const renderItem = ({ item }: { item: IStone }) => (
		<Card data={item} handleOnSelected={handleOnSelected} />
	);

	const filters = [
		{
			title: 'Newest',
			iconName: 'hourglass',
			onPress: () => {
				setFilter('Newest');
				console.log('clock');
			},
		},
		{
			title: 'Popular',
			iconName: 'heart',
			onPress: () => {
				setFilter('Popular');
				console.log('clock');
			},
		},
		{
			title: 'Nearest',
			iconName: 'locate',
			onPress: () => {
				setFilter('Nearest');
				setSelectedCountryCode(geoCountryCode);
			},
		},
		{
			title: 'Country',
			iconName: 'earth',
			onPress: () => {
				setFilter('Country');

				setModalOpen(true);
			},
		},
	];

	const scrollUp = () =>
		flatListRef.current?.scrollToIndex({
			animated: true,
			index: 0,
			viewPosition: 0,
		});

	const renderListHeaderComponent = () => {
		return (
			!isFetching && (
				<>
					<View style={style.listHeader}>
						<Text h2 bold title={'LapixGame'} />

						{/* <FlagButton
							placeholder='Country'
							withEmoji
							withFlagButton
							countryCode={selectedCountryCode}
							onOpen={() => setModalOpen(true)}
						/> */}
						<Pressable
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								alignContent: 'center',
							}}
							onPress={() => setModalOpen(true)}
						>
							<Flag flagSize={18} countryCode={selectedCountryCode} />
							<Text h5 title={selectedCountryCode} />
						</Pressable>

						<Animated.View
							style={{
								transform: [
									{
										rotateZ: arrowTransform,
									},
								],
							}}
						>
							<IconText
								h5
								bottom
								iconName='options-outline'
								title='filter'
								onPress={() => toggleDropdown()}
							/>
						</Animated.View>
					</View>
					{showContent && (
						<View style={style.listHeaderFilters}>
							{filters.map((item, index) => {
								return (
									<IconText
										key={index}
										iconName={
											item.title === filter
												? item.iconName
												: `${item.iconName}-outline`
										}
										iconColor={
											item.title === filter
												? color.primary
												: color.primaryLighter
										}
										textColor={
											item.title === filter
												? color.primary
												: color.primaryLighter
										}
										bold={item.title === filter}
										bottom
										title={item.title}
										onPress={() => item.onPress()}
									/>
								);
							})}
						</View>
					)}
				</>
			)
		);
	};

	const renderListFooterComponent = () => {
		return moreItemsToShow ? (
			<>
				<ActivityIndicator
					style={{ height: 100, paddingVertical: 100, marginBottom: 50 }}
					size={50}
					color={color.secondary}
				/>
			</>
		) : (
			<View style={{ height: 200, marginVertical: spacing.vertical.tiny }}>
				<Text h4 textColor={color.white} title='No more items to show' />
			</View>
		);
	};

	const cardLength = constants.CARD_HEIGHT + constants.CARD_VERTICAL_MARGIN * 2;
	return (
		<View style={style.container} testID='HomeScreen'>
			{stonesArray.current && (
				<FlatList
					ref={el => (flatListRef.current = el!)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={style.feedContainer}
					data={stonesArray.current}
					initialNumToRender={3}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
					onRefresh={onRefresh}
					refreshing={isFetching}
					onEndReachedThreshold={0.4}
					onEndReached={handleOnEndReached}
					ListHeaderComponent={renderListHeaderComponent}
					ListFooterComponent={renderListFooterComponent}
					getItemLayout={(_, index) => ({
						length: cardLength,
						offset: cardLength * index,
						index,
					})}
				/>
			)}
			<IconText
				bottom
				iconName='arrow-up-outline'
				onPress={() => scrollUp()}
				iconColor={color.palette.white}
				style={style.upArrow}
			/>
			<Modal isVisible={modalOpen} handleClose={() => setModalOpen(false)}>
				<CountryPicker
					withFilter
					withCloseButton={false}
					translation='common'
					withModal={false}
					countryCode={selectedCountryCode}
					onSelect={onCountrySelect()}
					visible
				/>
			</Modal>
		</View>
	);

	function onCountrySelect(): ((country: Country) => void) | undefined {
		return country => {
			setSelectedCountryCode(country.cca2);
			setModalOpen(false);
		};
	}
};

export default HomeScreen;

import React, { FC } from 'react';

import style from './HomeScreenStyle';
import { HomeScreenProps } from './HomeScreenProps';
import { View, FlatList, ActivityIndicator } from 'react-native';

import Card from 'src/components/Card';
import { IStone } from 'src/interfaces/IStone';
import { useStonesHook } from '../../hooks/useStones';
import { color } from 'src/theme';
import Text from 'src/components/Text';
import { spacing } from '../../theme/spacing';
import IconText from 'src/components/IconText';
import useModal from 'src/hooks/useModal';

import useGeolocation from '../../hooks/useGeolocation';

/**
 * Screen component description
 *
 * @returns Screen
 */
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
	const {
		stonesInfoPage,
		stonesArray,
		isFetching,
		handleOnSelected,
		onRefresh,
		handleOnEndReached,
	} = useStonesHook();

	const { modalOpen, setModalOpen, toggleModal } = useModal();
	const { country, region } = useGeolocation();

	const renderItem = ({ item }: { item: IStone }) => (
		<Card data={item} handleOnSelected={handleOnSelected} />
	);

	const renderListHeaderComponent = () => {
		return (
			<View
				style={{
					backgroundColor: color.palette.white,
					minHeight: spacing.vertical.small,
					width: spacing.wp(95),
					marginVertical: spacing.vertical.micro,
					paddingVertical: spacing.vertical.micro,
					paddingHorizontal: spacing.vertical.micro,
					borderRadius: spacing.horizontal.micro,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					overflow: 'hidden',
					elevation: 3,
				}}
			>
				<Text h2 bold title={'LapixGame'} />
				<IconText
					h5
					bottom
					iconName='funnel-outline'
					title='filter'
					onPress={() => toggleModal()}
				/>
			</View>
		);
	};

	const renderListFooterComponent = () => {
		if (stonesInfoPage.current.page < stonesInfoPage.current.pages) {
			return (
				<>
					<ActivityIndicator
						style={{ height: 100 }}
						size={50}
						color={color.primaryDarker}
					/>
				</>
			);
		} else {
			return (
				<View style={{ marginBottom: spacing.vertical.tiny }}>
					<Text
						h4
						textColor={color.primaryDarker}
						title='No more items to show'
					/>
				</View>
			);
		}
	};
	return (
		<View style={style.container} testID='HomeScreen'>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={style.feedContainer}
				data={stonesArray.current}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				onRefresh={onRefresh}
				refreshing={isFetching}
				onEndReachedThreshold={0.4} // Thus a value of 0.5 will trigger onEndReached when the end of the content is within half the visible length of the list.
				onEndReached={handleOnEndReached}
				ListHeaderComponent={renderListHeaderComponent}
				ListFooterComponent={renderListFooterComponent}
			/>
			{isFetching ? (
				<>
					<ActivityIndicator
						style={{ height: 100 }}
						size={50}
						color={color.primaryDarker}
					/>
					<Text h5 title='Loading more stones' />
				</>
			) : (
				<Text h5 title='No more items to show' />
			)}
		</View>
	);
};

export default HomeScreen;

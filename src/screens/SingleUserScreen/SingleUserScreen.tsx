import React, { FC, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import style from './SingleUserScreenStyle';
import { SingleUserScreenProps } from './SingleUserScreenProps';
import IconText from 'src/components/IconText';
import { color, spacing } from 'src/theme';
import Avatar from 'src/components/Avatar';
import Text from 'src/components/Text';
import { useUserQuery, useUserProfileQuery } from '../../generated/graphql';
import BackArrow from 'src/components/BackArrow';
import Loader from 'src/components/Loader';
import { timeSince } from '../../utils/time';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FadeInImage from 'src/components/FadeInImage';
import ImageCarrousel from '../../components/ImageCarrousel/ImageCarrousel';

/**
 * Screen component description
 *
 * @returns Screen
 */
const SingleUserScreen: FC<SingleUserScreenProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params.params;
	const { userId } = initialParams;

	const { data, error, loading } = useUserProfileQuery({
		variables: {
			id: userId,
		},
	});

	if (loading) {
		return <Loader />;
	}

	if (error) {
		console.log(error);
	}

	const {
		avatar,
		userName,
		bio,
		country,
		registerDate,
		stones,
		likes,
		stoneCount,
		likeCount,
		foundCount,
	} = data?.user?.user;
	const registeredSince = timeSince('2021-07-02T05:48:21.949Z');

	const likesData = likes.map(element => {
		return {
			id: element.stone.id,
			image: element.stone.image,
		};
	});

	// Component JSX
	return (
		<SafeAreaView testID='SingleUserScreen'>
			<ScrollView>
				<View style={style.container}>
					<View style={style.infoSection}>
						<View style={style.userAvatarSection}>
							<Avatar avatar={avatar} size={30} />
							<Text h1 bold title={userName} style={style.userName} />
							<Text h4 title={country} />
						</View>
					</View>
					<View style={style.infoBoxWrapper}>
						<View style={[style.infoBox]}>
							<Text
								h2
								bold
								title={stoneCount}
								textColor={color.palette.white}
							/>
							<Text h4 title='Stones' textColor={color.palette.white} />
						</View>
						<View style={[style.infoBox]}>
							<Text h2 bold title={likeCount} textColor={color.palette.white} />
							<Text h4 title='Likes' textColor={color.palette.white} />
						</View>

						<View style={style.infoBox}>
							<Text h2 bold title='23' textColor={color.palette.white} />
							<Text h4 title='Found' textColor={color.palette.white} />
						</View>
					</View>
				</View>
				<View style={style.wrapper}>
					<ImageCarrousel data={stones} title='Stones' />
					<ImageCarrousel data={likesData} title='Likes' />
				</View>
				<BackArrow />
			</ScrollView>
		</SafeAreaView>
	);
};

export default SingleUserScreen;

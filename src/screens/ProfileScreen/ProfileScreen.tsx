/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import style from './ProfileScreenStyle';
import IconText from '../../components/IconText/IconText';
import Avatar from 'src/components/Avatar';
import Text from 'src/components/Text';
import { color, spacing } from 'src/theme';
import Title from 'src/components/Title';
import { useState } from 'react';
import { useAuth } from 'src/context/authContext/authContext';
import { ProfileStackProps } from 'src/navigation/ProfileStackNavigator/ProfileNavigator';
import { useUserQuery, useUserProfileQuery } from '../../generated/graphql';
import Loader from 'src/components/Loader';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const ProfileScreen: FC<ProfileStackProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context
	const { signOut } = useAuth();

	const { data, loading, error } = useUserProfileQuery({
		variables: { id: initialParams?.userId! },
	});

	// Internal state

	if (loading) {
		return <Loader />;
	}

	if (error) {
		console.log(error.message);
	}

	if (!data) {
		return null;
	}

	const user = data && data?.user?.user;

	const { userName, avatar, country, likeCount, stoneCount } = user;

	// Component JSX
	return (
		<SafeAreaView style={style.container} testID='ProfileScreen'>
			<ScrollView>
				{/* <Title title='Profile' /> */}

				<IconText
					bottom
					iconName='create-outline'
					style={style.editProfile}
					onPress={() => navigation?.navigate('EditProfileScreen')}
					iconColor={color.primary}
				/>

				<View style={style.userInfoSection}>
					<View style={style.userAvatarSection}>
						<Avatar avatar={avatar} size={25} />
					</View>
					<Text h1 bold title={userName} style={style.userName} />
					<Text h4 title={country} />
				</View>
				<View style={style.infoBoxWrapper}>
					<View style={[style.infoBox]}>
						<Text h2 bold title={stoneCount} textColor={color.palette.white} />
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
				<View style={style.menuWrapper}>
					<View style={style.menuContent}>
						<IconText
							bottom
							iconName='bookmark-outline'
							iconColor={color.palette.blue}
							textStyle={style.menuItemText}
							title='Favorites'
							style={style.menuItem}
						/>

						<IconText
							bottom
							iconName='arrow-redo-outline'
							iconColor={color.secondary}
							textStyle={style.menuItemText}
							title='Share'
							style={style.menuItem}
						/>

						<IconText
							bottom
							iconName='help-buoy-outline'
							iconColor={color.primary}
							textStyle={style.menuItemText}
							title='Support'
							style={style.menuItem}
						/>

						<IconText
							bottom
							iconName='settings-outline'
							iconColor={color.palette.grey}
							textStyle={style.menuItemText}
							title='Settings'
							style={style.menuItem}
						/>
						<IconText
							bottom
							iconName='create-outline'
							style={style.menuItem}
							title='Edit'
							onPress={() => navigation?.navigate('EditProfileScreen')}
							iconColor={color.palette.green}
							textStyle={style.menuItemText}
						/>
						<IconText
							bottom
							iconName='log-out-outline'
							iconColor={color.palette.red}
							textStyle={style.menuItemText}
							title='Logout'
							style={style.menuItem}
							onPress={() => signOut()}
						/>
					</View>
				</View>
			</ScrollView>
			<BackArrow />
		</SafeAreaView>
	);
};

export default ProfileScreen;

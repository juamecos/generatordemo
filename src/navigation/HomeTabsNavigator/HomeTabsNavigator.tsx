import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import HomeScreen from 'src/screens/HomeScreen';
import FindScreen from 'src/screens/FindScreen';
import NotificationsScreen from 'src/screens/NotificationsScreen';
import ProfileStackNavigator from '../ProfileStackNavigator';
import PermissionsScreen from 'src/screens/PermissionsScreen';
import IconText from 'src/components/IconText';
import { useNavigation } from '@react-navigation/native';
import { color, spacing } from 'src/theme';
import CustomTabBarButton from 'src/components/CustomTabBarButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePickerScreen from 'src/screens/ImagePickerScreen';
import { useUser } from 'src/context/userContext.tsx/userContext';
import { usePermissions } from 'src/context/permissionsContext/permissionsContext';
import { BlockUserMutationResult } from '../../generated/graphql';
import { shadow } from 'src/theme/shadow';
import Loader from 'src/components/Loader';
import { useStone } from '../../context/stoneContext/stoneContext';

export enum TabNames {
	Home = 'HomeScreen',
	Find = 'FindScreen',
	Add = 'AddStoneScreen',
	Notifications = 'NotificationsScreeen',
	Profile = 'ProfileScreen',
	Permissions = 'PermissionsScreen',
}

const Tab = createBottomTabNavigator();

const HomeTabsNavigator = () => {
	const { t } = useTranslation();
	const { navigate } = useNavigation();
	const { id } = useUser();

	const { step, image, setImage, setStep } = useStone();

	if (!id) return <Loader />;

	return (
		<Tab.Navigator
			initialRouteName={TabNames.Home}
			tabBarOptions={{
				showLabel: false,
				keyboardHidesTabBar: true,
				style: {
					position: 'absolute',
					bottom: spacing.vertical.micro,
					left: spacing.horizontal.micro,
					right: spacing.horizontal.micro,
					backgroundColor: color.palette.white,
					borderRadius: spacing.vertical.nano,
					height: spacing.vertical.small,
					...shadow.light,
				},
			}}
		>
			<Tab.Screen
				name={TabNames.Home}
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconText
							h5
							bottom
							iconName={focused ? 'home' : 'home-outline'}
							title={t('home', { ns: 'bottomTab' })}
							onPress={() => navigate(TabNames.Home)}
							iconColor={focused ? color.primaryDarker : color.text}
							textColor={focused ? color.primaryDarker : color.text}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={TabNames.Find}
				component={FindScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconText
							h5
							bottom
							iconName={focused ? 'search' : 'search-outline'}
							title={t('find', { ns: 'bottomTab' })}
							onPress={() => navigate(TabNames.Find)}
							iconColor={focused ? color.primaryDarker : color.text}
							textColor={focused ? color.primaryDarker : color.text}
						/>
					),
				}}
			/>
			{
				<Tab.Screen
					name={TabNames.Add}
					component={ImagePickerScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icon
								name='add'
								color={color.palette.white}
								size={spacing.vertical.small - spacing.vertical.micro}
								style={{
									paddingLeft: 1,
								}}
							/>
						),
						tabBarButton: props => (
							<CustomTabBarButton
								onPress={() =>
									navigate('ImagePickerScreen', {
										entity: 'Stone',
									})
								}
								children={props.children}
							/>
						),
					}}
				/>
			}
			<Tab.Screen
				name={TabNames.Notifications}
				component={NotificationsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconText
							h5
							bottom
							iconName={focused ? 'notifications' : 'notifications-outline'}
							title={t('notifications', { ns: 'bottomTab' })}
							onPress={() => navigate(TabNames.Notifications)}
							iconColor={focused ? color.primaryDarker : color.text}
							textColor={focused ? color.primaryDarker : color.text}
						/>
					),
					tabBarBadge: 3,
					tabBarBadgeStyle: {
						backgroundColor: color.secondary,
						color: color.textWhite,
					},
				}}
			/>

			<Tab.Screen
				name={TabNames.Profile}
				component={ProfileStackNavigator}
				options={{
					tabBarIcon: ({ focused }) => (
						<IconText
							h5
							bottom
							iconName={focused ? 'person' : 'person-outline'}
							title={t('profile', { ns: 'bottomTab' })}
							onPress={() => {
								navigate(TabNames.Profile, {
									screen: TabNames.Profile,
									params: { userId: id },
								});
							}}
							iconColor={focused ? color.primaryDarker : color.text}
							textColor={focused ? color.primaryDarker : color.text}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default HomeTabsNavigator;

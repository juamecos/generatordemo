import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const spacing = {
	horizontal: {
		nano: wp('1%'),
		micro: wp('2%'),
		tiny: wp('4%'),
		small: wp('8%'),
		medium: wp('12%'),
		large: wp('24%'),
		huge: wp('64%'),
		mega: wp('90%'),
		tera: wp('100%'),
	},
	vertical: {
		nano: hp('1%'),
		micro: hp('2%'),
		tiny: hp('4%'),
		small: hp('8%'),
		medium: hp('12%'),
		large: hp('24%'),
		mega: hp('90%'),
		tera: hp('100%'),
	},
	wp,
	hp,
};

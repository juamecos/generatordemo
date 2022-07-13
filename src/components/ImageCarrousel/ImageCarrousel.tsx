import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './ImageCarrouselStyle';
import { spacing } from '../../theme/spacing';
import Text from '../Text';
import { useNavigation } from '@react-navigation/native';

type ImageCarouselItem = {
	id: number | string;
	image: string | undefined;
};

export type Props = {
	data?: ImageCarouselItem[];
	title?: string;
};

const ImageCarrousel: React.FC<Props> = ({ data, title }) => {
	const { navigate } = useNavigation();
	return (
		<View testID='ImageCarrousel'>
			<Text h3 title={title} style={styles.title} />
			<FlatList
				data={data}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							style={styles.itemContent}
							activeOpacity={0.8}
							onPress={() => {
								console.log('imageCarrousel click in image', item.id);

								navigate('SingleStoneScreen', { id: item.id });
							}}
						>
							<Image
								source={{ uri: item.image }}
								style={styles.itemImage}
								resizeMode='cover'
							/>
						</TouchableOpacity>
					);
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				// keyExtractor={item => item.id}
			/>
		</View>
	);
};

export default ImageCarrousel;

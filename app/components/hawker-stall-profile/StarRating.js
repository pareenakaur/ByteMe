import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 


const StarRating = ({rating, size}) => {
    const starElements = [];
    const numberOfFullStars = Math.floor(rating);
    const fractionalPart = rating - numberOfFullStars;

    for (let i = 0; i < numberOfFullStars; i++) {
        starElements.push(
            <FontAwesome key={i} name="star" size={size} style={styles.selected} />
        );
    }

    // Add partially filled star based on the fractional part
    if (fractionalPart > 0) {
        const starName = fractionalPart < 0.25
        ? 'star-o'
        : fractionalPart < 0.75
            ? 'star-half-empty'
            : 'star';

        starElements.push(
        <FontAwesome key="partialStar" name={starName} size={size} style={styles.selected} />
        );
    }

    // Add empty stars to reach the maxRating
    const remainingEmptyStars = 5 - starElements.length;
    for (let i = 0; i < remainingEmptyStars; i++) {
        starElements.push(
        <FontAwesome key={`empty-${i}`} name="star-o" size={size} style={styles.unselected} />
        );
    }
    

    return (
        <View style={{ flexDirection: 'row' }}>
            {starElements}
        </View>
    );
}

export default StarRating;
  
const styles = StyleSheet.create({
    selected: {
        color: '#EB6C05',
    },
    unselected: {
        color: '#EB6C05',
    }
});
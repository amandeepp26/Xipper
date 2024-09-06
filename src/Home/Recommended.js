import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements'; // Adjust based on your icon library

const items = [
  {
    id: '1',
    imageUri:
      'https://i.pinimg.com/736x/b1/28/0d/b1280dc30198b9710e78928b5dd34ada.jpg',
    bookingText: 'Booking fast',
    rating: '4.2',
    ratingDescription: 'Very good',
    ratingsCount: '(120 Ratings)',
    originalPrice: '$200',
    discountedPrice: '$300',
    location: 'Viiavnaar Indore',
    name: 'Radisson Blue',
  },
  {
    id: '2',
    imageUri:
      'https://www.jaquar.com/images/thumbs/0043510_Thumbnail(460-360).png',
    bookingText: '30% Off',
    rating: '3.9',
    ratingDescription: 'Good',
    ratingsCount: '(89 Ratings)',
    originalPrice: '$2200',
    discountedPrice: '$1800',
    location: 'Palasia, Pune',
    name: 'Shreemaya',
  },
  // Add more items as needed
];

function Recommendation() {
  return (
    <ScrollView
      style={{marginHorizontal: -20, }}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {items.map(item => (
          <View key={item.id} style={{marginLeft: 20}}>
            <View>
              <Text style={styles.bookingText}>{item.bookingText}</Text>
              <View style={styles.iconContainer}>
                <Icon
                  name="heart-outline"
                  type="ionicon"
                  color={'#fff'}
                  size={20}
                />
                <Icon
                  name="ellipsis-vertical"
                  type="ionicon"
                  color={'#fff'}
                  size={20}
                />
              </View>
              <Image source={{uri: item.imageUri}} style={styles.itemImage} />
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.ratingDescription}>
                {item.ratingDescription}
              </Text>
              <Text style={styles.ratingsCount}>{item.ratingsCount}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.originalPriceText}>{item.originalPrice}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.locationText}>{item.location}</Text>
              <Text style={styles.discountedPriceText}>
                {item.discountedPrice}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bookingText: {
    backgroundColor: '#6D38C3',
    width: 'auto',
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 13,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 10,
    color: '#fff',
    fontSize: 14,
    paddingVertical: 2,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    flexDirection: 'row',
    top: 10,
    gap: 10,
  },
  itemImage: {
    width: 180,
    height: 220,
    borderRadius: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 5,
    alignItems: 'center',
  },
  ratingText: {
    backgroundColor: '#6D38C3',
    width: 'auto',
    zIndex: 1,
    paddingHorizontal: 7,
    borderRadius: 5,
    color: '#fff',
    fontSize: 13,
    paddingVertical: 2,
  },
  ratingDescription: {
    color: '#6D38C3',
    fontWeight: '500',
    fontSize: 12,
  },
  ratingsCount: {
    color: '#000',
    fontWeight: '500',
    fontSize: 12,
  },
  priceContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 16,
    color: '#000',
  },
  originalPriceText: {
    fontSize: 16,
    color: '#696969',
    textDecorationLine: 'line-through',
  },
  locationText: {
    fontSize: 16,
    color: '#696969',
  },
  discountedPriceText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Recommendation;

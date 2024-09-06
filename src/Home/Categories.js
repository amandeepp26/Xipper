import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';

const categories = [
  {
    id: '1',
    imageUri:
      'https://framerusercontent.com/images/YUEzeziP7rc0odjMYkXdE5tqWw.jpg',
    text: 'Travel',
  },
  {
    id: '2',
    imageUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXZxM9oJMgCXnxPeMhjA_sSlUDyEF7IQw-Q&s',
    text: 'Food',
  },
  {
    id: '3',
    imageUri:
      'https://cdn.shopify.com/s/files/1/0812/8997/files/dressing_table_in_bedroom_5_1024x1024.png?v=1695917365',
    text: 'Shopping',
  },
  {
    id: '4',
    imageUri:
      'https://www.carezindagi.com/uploaded-files/thumb-cache/member_129/thumb---doctor-at-home_5059.jpg',
    text: 'Health',
  },
];

function Category() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginHorizontal: -20,}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {categories.map(category => (
          <View
            key={category.id}
            style={{alignItems: 'center', marginLeft: 20}}>
            <Image source={{uri: category.imageUri}} style={styles.catImage} />
            <Text style={styles.categroyText}>{category.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  catImage: {
    width: 97,
    height: 97,
    borderRadius: 100,
    elevation: 2, // Android shadow
    backgroundColor: '#fff', // Required for shadow on Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: {width: 1, height: 10}, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow radius
  },
  categroyText: {fontSize: 15, color: '#000', marginTop: 7, fontWeight: '500'},
});

export default Category;

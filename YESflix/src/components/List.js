import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Card from './Card';

const List = ({navigation, title, content}) => {
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          horizontal={true}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 20,
  },
});

export default List;

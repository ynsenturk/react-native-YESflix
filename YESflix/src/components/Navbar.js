import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/Colors';
import {useNavigation} from '@react-navigation/native';

const Navbar = ({main}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      {main ? (
        <View style={styles.mainNav}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/yesflix.png')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name={'search-outline'} size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'chevron-back'} size={40} color={Colors.lightGray} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

Navbar.defaultProps = {
  main: false,
};

const styles = StyleSheet.create({
  mainNav: {
    //flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Navbar;

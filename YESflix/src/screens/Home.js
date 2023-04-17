import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {
  getDocumentaryMovies,
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import Carousel from 'react-native-snap-carousel';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <Image
        style={{height: dimensions.height / 1.5}}
        key={index}
        resizeMode="stretch"
        source={{uri: item}}
      />
    );
  };

  if (!loaded) return <ActivityIndicator size="large" />;
  if (error) return <Error />;

  return (
    <View>
      {/* Upcoming Movies */}
      <ScrollView>
        {moviesImages && (
          <View style={styles.sliderContainer}>
            <Carousel
              data={moviesImages}
              renderItem={_renderItem}
              sliderWidth={dimensions.width}
              itemWidth={dimensions.width}
              loop={true}
              autoplay={true}
            />
          </View>
        )}
        {/* Popular Movies */}
        {popularMovies && (
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title={'Popular Movies'}
              content={popularMovies}
            />
          </View>
        )}
        {/* Popular Tv Shows */}
        {popularTv && (
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title={'Popular Tv Shows'}
              content={popularTv}
            />
          </View>
        )}
        {/* Family Movies */}
        {familyMovies && (
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title={'Family Movies'}
              content={familyMovies}
            />
          </View>
        )}
        {/* Documentary Movies */}
        {documentaryMovies && (
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              title={'Documentary Movies'}
              content={documentaryMovies}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;

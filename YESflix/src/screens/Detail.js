import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import PlayButton from '../components/PlayButton';
import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/services';
import dateFormat from 'dateformat';
import Video from '../components/Video';

const placeholderImage = require('../../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  if (!loaded) return <ActivityIndicator size="large" />;

  return (
    <View>
      <ScrollView>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            movieDetail.poster_path
              ? {
                  uri:
                    'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path,
                }
              : placeholderImage
          }
        />
        <View style={styles.container}>
          <View style={styles.playButton}>
            <PlayButton handlePress={videoShown} />
          </View>
          <Text style={styles.movieTitle}>{movieDetail.title}</Text>
          {movieDetail.genres && (
            <View style={styles.genresContainer}>
              {movieDetail.genres.map(genre => {
                return (
                  <Text style={styles.genre} key={genre.id}>
                    {genre.name}
                  </Text>
                );
              })}
            </View>
          )}
          <StarRating
            disabled={true}
            maxStars={5}
            starSize={30}
            rating={movieDetail.vote_average / 2}
            fullStarColor={'gold'}
          />
          <Text style={styles.overview}>{movieDetail.overview}</Text>
          <Text style={styles.release}>
            {'Release date: ' +
              dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
          </Text>
        </View>
      </ScrollView>
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        visible={modalVisible}>
        <View style={styles.videoModal}>
          <Video onClose={videoShown} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 20,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;

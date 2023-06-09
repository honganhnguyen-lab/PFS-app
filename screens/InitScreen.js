import {View, Text, StyleSheet, Image} from 'react-native';

const InitScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{width: 200, height: 200}}>
        <Image
          source={{uri: '/Users/amie/CleanProject/assets/logo.png'}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </View>
  );
};
export default InitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0077C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

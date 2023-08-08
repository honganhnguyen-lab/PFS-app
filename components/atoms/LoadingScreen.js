import {Spinner, HStack, View} from 'native-base';
import {StyleSheet} from 'react-native';
export const LoadingScreen = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <HStack justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

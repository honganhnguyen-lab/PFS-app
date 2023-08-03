import {Heading, Image} from 'native-base';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

function DiscountSlider() {
  const width = Dimensions.get('window').width;
  const progressValue = useSharedValue(0);
  const colors = [
    '#26292E',
    '#899F9C',
    '#B3C680',
    '#5C6265',
    '#F5D399',
    '#F1F1F1',
  ];
  const ListImageDiscount = [require('../assets/discount5.png')];
  return (
    <View>
      <Carousel
        loop
        width={width * 0.9}
        height={200}
        autoPlay={true}
        data={ListImageDiscount}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        pagingEnabled={true}
        renderItem={({index, item}) => {
          return <CustomItem source={item} key={index} />;
        }}
      />
      {!!progressValue && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 100,
            alignSelf: 'center',
          }}>
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={true}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const PaginationItem = props => {
  const {animValue, index, length, backgroundColor, isRotate} = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const CustomItem = ({source}) => {
  return (
    <Animated.View style={{flex: 1, overflow: 'hidden'}}>
      <Animated.Image
        source={source}
        resizeMode="cover"
        style={{width: '100%', height: '100%', objectFit: 'contain'}}
      />
    </Animated.View>
  );
};

export default () => {
  return <DiscountSlider />;
};

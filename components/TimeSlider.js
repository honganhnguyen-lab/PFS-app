import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Slider} from '@react-native-assets/slider';
import {split} from 'lodash';
import {HStack, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const formatTime = value => {
  const hour = Math.floor(value / 2);
  const formatHour = hour < 10 ? `0${hour}` : `${hour}`;
  const minutes = 30 * Math.floor(value % 2);
  const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const time = `${formatHour}:${formatMinutes}`;
  return time;
};
const TimeSlider = ({
  title,
  onTimeChanged,
  initialTime,
  minimumValue,
  maximumValue,
}) => {
  const _onTimeChanged = useCallback(time => {
    onTimeChanged(formatTime(time));
  }, []);

  const parseTimeFromString = time => {
    if (time) {
      const splits = split(time, ':');
      if (splits.length !== 2) {
        return 0;
      }
      const hours = parseInt(splits[0], 10);
      const minutes = parseInt(splits[1], 10);

      return hours * 2 + (minutes > 0 ? 1 : 0);
    }
    return 0;
  };
  const [currentValue, setCurrentValue] = useState(
    parseTimeFromString(initialTime),
  );

  useEffect(() => {
    const value = parseTimeFromString(initialTime);
    console.log('abc');
    slider.current.setNativeProps({value: value});
  }, []);

  const slider = useRef();

  return (
    <View style={{flexDirection: 'column'}}>
      <HStack space={2} alignItems="center" style={{marginTop: 7}}>
        <Icon as={Ionicons} name="alarm-outline" color="#87ADB2" />
        <Text>{title}</Text>
      </HStack>
      <View style={{padding: 6, paddingLeft: 16, paddingRight: 16}}>
        <Slider
          ref={slider}
          value={currentValue} // set the current slider's value
          minimumValue={minimumValue ?? 14} // Minimum value
          maximumValue={maximumValue ?? 46} // Maximum value
          step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
          minimumTrackTintColor={'#559FA7'} // The track color before the current value
          maximumTrackTintColor={'#559FA7'} // The track color after the current value
          thumbTintColor="darkcyan" // The color of the slider's thumb
          thumbStyle={undefined} // Override the thumb's style
          trackStyle={undefined} // Override the tracks' style
          minTrackStyle={undefined} // Override the tracks' style for the minimum range
          maxTrackStyle={undefined} // Override the tracks' style for the maximum range
          vertical={false} // If true, the slider will be drawn vertically
          inverted={false} // If true, min value will be on the right, and max on the left
          enabled={true} // If false, the slider won't respond to touches anymore
          trackHeight={4} // The track's height in pixel
          thumbSize={15} // The thumb's size in pixel
          thumbImage={undefined} // An image that would represent the thumb
          slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
          onValueChange={undefined} // Called each time the value changed. The type is (value: number) => void
          onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
          onSlidingComplete={_onTimeChanged} // Called when the press is released. The type is (value: number) => void
          // eslint-disable-next-line react/no-unstable-nested-components
          CustomThumb={event => <Thumb value={event.value} />} // Provide your own component to render the thumb. The type is a component: ({ value: number }) => JSX.Element
          CustomMark={undefined} // Provide your own component to render the marks. The type is a component: ({ value: number; active: boolean }) => JSX.Element ; value indicates the value represented by the mark, while active indicates wether a thumb is currently standing on the mark
        />
      </View>
    </View>
  );
};

const Thumb = ({value}) => {
  return (
    <View style={[styles.timeContainer, {backgroundColor: '#559FA7'}]}>
      <Text style={styles.timeLabel}>{formatTime(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeLabel: {textAlign: 'center', color: 'white', fontWeight: 'bold'},
  timeContainer: {
    height: 24,
    width: 64,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
});

export default TimeSlider;

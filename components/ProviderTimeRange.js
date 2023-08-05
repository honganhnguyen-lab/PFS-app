import {HStack, View, Text, VStack, Icon, Select, Input} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ProviderTimeRange = ({dataProvider}) => {
  const enableScroll = () => this.setState({scrollEnabled: true});
  const disableScroll = () => this.setState({scrollEnabled: false});
  const weekSche = dataProvider?.weeklySchedule;
  const timeRange = dataProvider?.timeRange;
  const [start, end] = timeRange?.length > 0 ? timeRange.split('-') : '';
  const renderTextSchedule = () => {
    switch (weekSche) {
      case 'weekday':
        return 'Mon-Fri';
      case 'weekend':
        return 'Sat-Sun';
      case 'fullweek':
        return 'Mon-Sun';
      default:
    }
  };
  return (
    <VStack>
      <HStack
        justifyContent="center"
        alignItems="center"
        space={4}
        style={styles.textInfo}>
        <Input
          placeholder=""
          value={renderTextSchedule()}
          borderRadius="10"
          fontSize="16"
          fontWeight={600}
          variant="filled"
          isDisabled
          InputLeftElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="#559FA7"
              as={Ionicons}
              name="calendar-sharp"
            />
          }
        />
      </HStack>
      <HStack
        justifyContent="space-between"
        w="100%"
        space={2}
        style={styles.textInfo}>
        <VStack flex={1} space={2}>
          <Text fontSize={14} color={'#559FA7'} fontWeight={600}>
            Start time
          </Text>
          <Input
            placeholder=""
            value={start}
            borderRadius="10"
            fontSize="16"
            fontWeight={600}
            variant="filled"
            isDisabled
            InputLeftElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="#559FA7"
                as={Ionicons}
                name="alarm-sharp"
              />
            }
          />
        </VStack>
        <VStack flex={1} space={2}>
          <Text fontSize={14} color={'#559FA7'} fontWeight={600}>
            End time
          </Text>
          <Input
            placeholder=""
            value={end}
            borderRadius="10"
            fontSize="16"
            fontWeight={600}
            isDisabled
            variant="filled"
            InputLeftElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="#559FA7"
                as={Ionicons}
                name="alarm-sharp"
              />
            }
          />
        </VStack>
      </HStack>
    </VStack>
  );
};

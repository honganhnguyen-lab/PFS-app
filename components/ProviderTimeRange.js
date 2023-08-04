import {HStack, View, Text, VStack, Icon, Select, Input} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ProviderTimeRange = () => {
  const enableScroll = () => this.setState({scrollEnabled: true});
  const disableScroll = () => this.setState({scrollEnabled: false});
  return (
    <VStack>
      <HStack
        justifyContent="center"
        alignItems="center"
        space={4}
        style={styles.textInfo}>
        <Input
          placeholder=""
          value="Mon-Fri"
          borderRadius="10"
          fontSize="16"
          fontWeight={600}
          variant="filled"
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
        mt={2}
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
            value="09:00"
            borderRadius="10"
            fontSize="16"
            fontWeight={600}
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
        <VStack flex={1} space={2}>
          <Text fontSize={14} color={'#559FA7'} fontWeight={600}>
            End time
          </Text>
          <Input
            placeholder=""
            value="16:00"
            borderRadius="10"
            fontSize="16"
            fontWeight={600}
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

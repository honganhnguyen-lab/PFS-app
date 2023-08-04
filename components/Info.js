import {HStack, Avatar, Text, VStack, Icon} from 'native-base';
import {styles} from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const InfoBlock = ({info, address}) => {
  const defaultAddress =
    address?.length > 0 ? address : info?.location?.address;
  const trimText = text => {
    if (text?.length > 45) {
      return `${text.slice(0, 44)}...`;
    }
    return text;
  };
  return (
    <HStack
      style={styles.infoArea}
      alignItems="center"
      justifyContent="space-between">
      <HStack
        justifyContent="center"
        alignItems="center"
        space={4}
        style={styles.textInfo}>
        <Icon as={Ionicons} name="location-outline" color="black" />
        <VStack>
          <Text fontSize={12} color="#559FA7" fontWeight="600">
            My location
          </Text>
          <Text fontSize={12} fontWeight="600" width="60%">
            {trimText(defaultAddress)}
          </Text>
        </VStack>
      </HStack>
      <Avatar
        bg="#87ADB2"
        alignSelf="center"
        size="md"
        source={{
          uri: info?.avatar,
        }}>
        {info?.name?.charAt(0).toUpperCase() ?? 'PFS'}
      </Avatar>
    </HStack>
  );
};

import {HStack, Avatar, Text, VStack, Badge} from 'native-base';
import {styles} from '../style';

export const InfoBlock = ({info}) => {
  return (
    <HStack style={styles.infoArea} alignItems="center">
      <Avatar
        bg="#87ADB2"
        alignSelf="center"
        size="lg"
        source={{
          uri: info?.avatar,
        }}>
        {info?.name?.charAt(0).toUpperCase() ?? 'PFS'}
        <Avatar.Badge bg="green.500" />
      </Avatar>
      <VStack justifyContent="center" style={styles.textInfo}>
        <Text fontSize="xl" fontFamily={'LobsterTwo'} color={'white'}>
          Hello, {info?.name}
        </Text>
        <Badge style={styles.badge} colorScheme="success">
          {`${info?.role}`.toUpperCase()}
        </Badge>
      </VStack>
    </HStack>
  );
};

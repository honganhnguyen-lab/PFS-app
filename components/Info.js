import {HStack, Avatar, Text, VStack, Badge} from 'native-base';
import {styles} from '../style';

export const InfoBlock = ({info}) => {
  console.log('info', info.name);
  return (
    <HStack style={styles.infoArea} alignItems="center">
      <Avatar
        bg="amber.500"
        source={{
          uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}
        size="lg">
        NB
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

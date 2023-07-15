import {HStack, Avatar, Text, VStack, Badge, View, Center} from 'native-base';
import {styles} from '../style';

export const OutstandingProvider = ({info}) => {
  return (
    <Center w="100%" height={150} bg="white" rounded="md" shadow={3}>
      <VStack>
        <VStack>
          <HStack justifyContent="center" alignItems="center">
            <Center w="40%" height={150}>
              <Avatar
                bg="amber.500"
                source={{
                  uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
                size="lg">
                NB
                <Avatar.Badge bg="green.500" />
              </Avatar>
            </Center>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
};

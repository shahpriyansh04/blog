import { useAuth } from '../../utils/auth';
import Router from 'next/router';
import {
  Flex,
  Stack,
  Heading,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';

const User = () => {
  const auth = useAuth();
  if (auth.user == false) {
    Router.push('/user/login');
  }
  return (
    <Flex flexDirection="column" backgroundColor="#ffffff">
      <Stack spacing={2} justifyContent="center" alignItems="center" mt="5rem">
        <Heading mb="3rem" fontSize="7xl">
          LOGO
        </Heading>
        <Button
          onClick={(e) => {
            auth.signout();
          }}
        >
          LOGOUT
        </Button>
        <Stack spacing={5}>
          <Tabs colorScheme="black" isFitted variant="enclosed" isLazy>
            <TabList mb="1em" p="2rem">
              <Tab>Your Posts</Tab>
              <Tab>Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Flex>
  );
};
export default User;

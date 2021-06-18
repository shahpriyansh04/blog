import { useAuth } from '../../utils/auth';
import Router from 'next/router';
import {
  Flex,
  Stack,
  Heading,
  Button,
  Tabs,
  Tab,
  Box,
  TabList,
  TabPanels,
  ScaleFade,
  TabPanel
} from '@chakra-ui/react';

const User = () => {
  const auth = useAuth();
  if (auth.user == false) {
    Router.push('/user/login');
  }
  return (
    <Flex
      flexDirection="column"
      backgroundColor="#ffffff"
      justifyContent="center"
      alignItems="center"
    >
      <ScaleFade in={true} initialScale={1.5}>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mt="5rem"
        >
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
          <Flex>
            <Tabs
              align="center"
              colorScheme="black"
              isFitted
              size="lg"
              mt="2rem"
              variant="enclosed"
              isLazy
            >
              <TabList mb="1em" p="2rem">
                <Tab>Your Posts</Tab>
                <Tab>Account</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack justifyContent="center">
                    <Box>No Posts Created</Box>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Stack>
      </ScaleFade>
    </Flex>
  );
};
export default User;

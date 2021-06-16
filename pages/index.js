import Head from 'next/head';
import { auth } from 'firebase';
import Link from 'next/link';
import { Flex, Button, Divider, Icon, Text, Code } from '@chakra-ui/react';
import { useAuth } from '../utils/auth';

const Home = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        backgroundColor="#ffffff"
        justifyContent="center"
        flexDirection="column"
        borderRadius={10}
        border="red"
        justifyContent="center"
        alignItems="space-around"
        color="black"
      >
        <Flex alignItems="space-around" justifyContent="space-between" m="25px">
          <Flex ml="2rem" justifyContent="center" alignItems="center">
            <Text fontWeight="bold" fontSize="4xl" color="black">
              LOGO
            </Text>
          </Flex>
          <Flex mt="1rem">
            {/* <Link href="/"> */}
            <Button
              variant="ghost"
              size="lg"
              backgroundColor="#000000"
              overflow="scroll"
              color="#ffffff"
              opacity={0.98}
            >
              LOGIN
            </Button>
            {/* </Link> */}
            <Link href="/user/signup">
              <Button
                variant="outline"
                size="lg"
                backgroundColor="#000000"
                color="#ffffff"
                ml="1rem"
              >
                SIGNUP
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Divider borderColor="#000000" opacity={0.41} boxShadow={1} />
        <Flex alignItems="center" justifyContent="center" mt="6rem">
          <Text color="#000000">
            Current user: <Code>{auth?.user ? auth.user.email : 'None'}</Code>
          </Text>
          <Button
            onClick={(e) => {
              auth.signout();
            }}
          >
            LOGOUT
          </Button>
        </Flex>
        <Flex />
      </Flex>
    </div>
  );
};
export default Home;

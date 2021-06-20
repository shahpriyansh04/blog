import { useAuth } from '../../utils/auth';
import Router from 'next/router';
import { useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Button,
  Tabs,
  Tab,
  Box,
  Text,
  TabList,
  Skeleton,
  useToast,
  TabPanels,
  ScaleFade,
  TabPanel,
  Input,
  Textarea
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { createPost } from '../../utils/db';
const User = () => {
  const auth = useAuth();
  const toast = useToast();
  const [posts, setPosts] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (auth.user == false) {
    Router.push('/user/login');
  }

  const showToast = (status, message) => {
    toast.closeAll();
    toast({
      title: message,
      status: status,
      duration: 4000,
      isClosable: true
    });
  };

  const createNewPost = () => {
    createPost(title, description, auth.user.uid);
  };

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
        </Stack>
        <Stack>
          <Flex justifyContent="center" alignItems="center" size="lg">
            <Tabs
              align="center"
              colorScheme="black"
              isFitted
              fontSize="3rem"
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
                    {posts && (
                      <Skeleton height="20px" width="20px" size="lg"></Skeleton>
                    )}
                    <Box>
                      <Text>No Posts Created</Text>
                      <Button
                        variant="outline"
                        colorScheme="black"
                        onClick={onOpen}
                      >
                        + Add One
                      </Button>
                      <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Add New Post</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Input
                              mb="2rem"
                              type="text"
                              colorScheme="black"
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                              placeholder="Title"
                            ></Input>
                            <Textarea
                              placeholder="Description"
                              colorScheme="black"
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            ></Textarea>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              variant="outline"
                              mr="1rem"
                              colorScheme="black"
                              onClick={createNewPost}
                            >
                              POST
                            </Button>
                            <Button
                              variant="outline"
                              colorScheme="black"
                              onClick={onClose}
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <p>Coming Soon!</p>
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

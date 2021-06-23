import { useAuth } from '../../utils/auth';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Stack,
  Heading,
  BeatLoader,
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
  Textarea,
  Divider
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
import Link from 'next/link';
const User = () => {
  const auth = useAuth();

  const toast = useToast();
  const [posts, setPosts] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPostSubmitting, setIsPostSubmitting] = useState(false);

  if (auth.user == false) {
    Router.push('/user/login');
  }

  const showToast = (status, message) => {
    toast.closeAll();
    toast({
      title: message,
      size: 'md',
      status: status,
      duration: 4000,
      isClosable: true
    });
  };

  const getUserPosts = async () => {
    try {
      const userPosts = await axios
        .get('https://ancient-escarpment-14988.herokuapp.com//user/posts', {
          params: {
            userID: auth.user.uid
          }
        })
        .then((response) => {
          setPosts(response.data);
          log(posts);
        });
    } finally {
    }
  };

  const createNewPost = () => {
    createPost(title, description, auth.user.uid).then(() => {
      setIsPostSubmitting(false);
      onClose();
      setTitle('');
      setDescription('');
      showToast('success', 'Successfully created Post');
    });
  };

  const validatePost = () => {
    if (title && description) {
      setIsPostSubmitting(true);
      createNewPost();
    } else {
      if (!title) {
        showToast('error', 'Please enter a title');
      } else if (!description) {
        showToast('error', 'Please enter a description');
      } else {
        showToast('error', 'Please enter all the details');
      }
    }
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
                    {posts &&
                      posts.map((post) => {
                        return (
                          <Link href={'/post/' + post.id}>
                            <Stack spacing={4}>
                              <Flex
                                flexDirection="row"
                                backgroundColor="#ffffff"
                                justifyContent="center"
                                border="2px solid"
                                alignItems="stretch"
                              >
                                <Stack spacing={2}>
                                  <Flex flexDirection="column">
                                    <Text fontSize="3xl">{post.title}</Text>
                                    <Divider borderColor="blackAlpha.500" />
                                    <Text p="2.5rem" fontSize="xl">
                                      {post.description}
                                    </Text>
                                  </Flex>
                                </Stack>
                              </Flex>
                            </Stack>
                          </Link>
                        );
                      })}

                    <Box>
                      <Text>No Posts Created</Text>
                      <Button
                        variant="outline"
                        colorScheme="black"
                        onClick={onOpen}
                      >
                        + Add One
                      </Button>
                      <Button onClick={getUserPosts}>Get User Posts</Button>

                      <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Add New Post</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Input
                              mb="2rem"
                              type="text"
                              pt="0.5rem"
                              fontSize="1.5rem"
                              colorScheme="black"
                              justifyContent="center"
                              alignItems="center"
                              isDisabled={isPostSubmitting}
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                              placeholder="Title"
                            ></Input>
                            <Textarea
                              placeholder="Description"
                              colorScheme="black"
                              isDisabled={isPostSubmitting}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            ></Textarea>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              variant="outline"
                              mr="1rem"
                              p="1rem"
                              colorScheme="black"
                              isLoading={isPostSubmitting}
                              loadingText="Posting"
                              onClick={validatePost}
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

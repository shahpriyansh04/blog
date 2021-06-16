import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Link } from 'next/link';
import firebase from '../../utils/firebase';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import {
  Stack,
  Input,
  InputGroup,
  Flex,
  Heading,
  Text,
  Box,
  Collapse,
  Button,
  useToast,
  ScaleFade
} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react';
import { useAuth } from '../../utils/auth';
const Signup = () => {
  const auth = useAuth();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const [email, setEmail] = useState(false);

  const signinWithGoogle = async () => {
    try {
      await auth
        .signinWithGoogle()
        .then(() =>
          toast({
            title: 'Account created.',
            status: 'success',
            duration: 4000,
            isClosable: true
          })
        )
        .catch(() => {
          console.log('ERROR');
        });
    } catch (error) {
      console.log('ERRPR');
      toast({
        title: 'Account created.',
        description: 'Your account has been created successfully',
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  };

  const signinWithGithub = () => {
    return auth.signinWithGithub().catch((error) => {
      console.log(error.message);
      toast({
        title: 'Account with email already exists',
        status: 'info',
        duration: 4000,
        isClosable: true
      });
    });
  };

  const validateEmail = () => {};

  return (
    <Flex color="black" flexDirection="column" backgroundColor="#ffffff">
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
          <Stack spacing={2} mb="6rem" alignItems="center">
            <Text fontWeight="bold" fontSize="3xl">
              SIGNUP
            </Text>
            <Text>Already have an account, Login</Text>
          </Stack>
          <Stack
            spacing={6}
            pt="3rem"
            justifyContent="center"
            alignItems="stretch"
          >
            {email == false && (
              <Stack spacing={2}>
                <Button
                  border="3px solid"
                  padding="2rem"
                  variant="outline"
                  border="3px solid"
                  borderColor="black"
                  display="flex"
                  borderRadius="0"
                  onClick={signinWithGoogle}
                  alignItems="center"
                  dropShadow={15}
                >
                  <FcGoogle />
                  <Text pl="1rem" fontWeight="bold" fontSize="xl">
                    SIGNUP WITH GOOGLE
                  </Text>
                </Button>
                <Button
                  border="3px solid"
                  padding="2rem"
                  variant="outline"
                  border="3px solid"
                  borderColor="black"
                  display="flex"
                  borderRadius="0"
                  onClick={signinWithGithub}
                  alignItems="center"
                  dropShadow={15}
                >
                  <FaGithub />
                  <Text pl="1rem" fontWeight="bold" fontSize="xl">
                    SIGNUP WITH GITHUB
                  </Text>
                </Button>
                <Button
                  border="3px solid"
                  padding="2rem"
                  variant="outline"
                  border="3px solid"
                  borderColor="black"
                  display="flex"
                  borderRadius="0"
                  onClick={onToggle}
                  alignItems="center"
                  dropShadow={15}
                >
                  <FaGithub />
                  <Text pl="1rem" fontWeight="bold" fontSize="xl">
                    SIGNUP WITH EMAIL
                  </Text>
                </Button>
                <Collapse in={isOpen} animateOpacity>
                  <ScaleFade in={true}>
                    <Box mt="2rem">
                      <InputGroup
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Input
                          placeholder="EMAIL"
                          mb="2rem"
                          isRequired={true}
                        />

                        <Input
                          placeholder="PASSWORD"
                          mb="1.5rem"
                          isRequired={true}
                        />
                        <Button
                          variant="outline"
                          size="md"
                          border="3px solid"
                          borderColor="black"
                          width="9rem"
                          type="submit"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          SUBMIT
                        </Button>
                      </InputGroup>
                    </Box>
                  </ScaleFade>
                </Collapse>
              </Stack>
            )}
          </Stack>
        </Stack>
      </ScaleFade>
    </Flex>
  );
};

export default Signup;

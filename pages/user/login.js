import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import {
  AiOutlineGoogle,
  AiOutlineGithub,
  AiOutlineMail
} from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/react';
import {
  Stack,
  Input,
  InputGroup,
  Avatar,
  Flex,
  Heading,
  Text,
  Box,
  Collapse,
  Button,
  useToast,
  ScaleFade
} from '@chakra-ui/react';

import { useAuth } from '../../utils/auth';

const Login = () => {
  const auth = useAuth();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (auth.user) {
    Router.push('/user/');
  }

  const signinWithGoogle = async () => {
    startAuth();
    try {
      await auth
        .signinWithGoogle()
        .then(() => {
          showToast('success', 'Account created');
          Router.push('/user/');
        })
        .catch((error) => {
          showToast('info', 'Account with email already exists');
        });
    } finally {
      endAuth();
    }
  };
  const signinWithGithub = async () => {
    startAuth();
    try {
      await auth
        .signinWithGithub()
        .then(() => {
          showToast('success', 'Account created');
          Router.push('/user/');
        })

        .catch((error) => {
          showToast('info', 'Account with email already exists');
        });
    } finally {
      endAuth();
    }
  };

  const signinWithEmail = async () => {
    startAuth();
    try {
      await auth
        .signinWithEmail(email, password)
        .then(() => {
          Router.push('/user/');
        })
        .catch((error) => {
          showToast('info', 'Account with email already exists');
        });
    } finally {
      endAuth();
    }
  };
  const showToast = (status, message) => {
    toast.closeAll();
    toast({
      title: message,
      status: status,
      duration: 4000,
      isClosable: true
    });
  };

  const startAuth = () => {
    setIsSubmitting(true);
  };
  const endAuth = () => {
    setIsSubmitting(false);
    setEmail('');
    setPassword('');
  };
  return (
    <Flex color="black" flexDirection="column" backgroundColor="#ffffff">
      <ScaleFade in={true} initialScale={1.5}>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mt="5rem"
        >
          <Link href="/">
            <Heading mb="3rem" fontSize="7xl">
              LOGO
            </Heading>
          </Link>
          <Stack spacing={2} mb="6rem" alignItems="center">
            <Text fontWeight="bold" fontSize="3xl">
              LOGIN
            </Text>
            <Text>
              Dont have an account,{' '}
              <Link href="/user/signup">Create a new one here</Link>
            </Text>
          </Stack>

          <Stack
            spacing={6}
            pt="3rem"
            justifyContent="center"
            alignItems="stretch"
          >
            <Stack spacing={2}>
              <Button
                border="3px solid"
                padding="2rem"
                variant="outline"
                border="3px solid"
                borderColor="black"
                display="flex"
                borderRadius="0"
                isDisabled={isSubmitting}
                onClick={signinWithGoogle}
                alignItems="center"
                dropShadow={15}
              >
                <AiOutlineGoogle />
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
                isDisabled={isSubmitting}
                onClick={signinWithGithub}
                borderRadius="0"
                alignItems="center"
                dropShadow={15}
              >
                <AiOutlineGithub />
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
                isDisabled={isSubmitting}
                alignItems="center"
                dropShadow={15}
              >
                <AiOutlineMail />
                <Text pl="1rem" fontWeight="bold" fontSize="xl">
                  SIGNUP WITH EMAIL
                </Text>
              </Button>
            </Stack>

            <Stack>
              <Collapse in={isOpen} animateOpacity>
                {/* <ScaleFade in={true}> */}
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
                      value={email}
                      isDisabled={isSubmitting}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <Input
                      placeholder="PASSWORD"
                      mb="1.5rem"
                      value={password}
                      isDisabled={isSubmitting}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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
                      isDisabled={isSubmitting}
                      onClick={signinWithEmail}
                      alignItems="center"
                      justifyContent="center"
                    >
                      SUBMIT
                    </Button>
                  </InputGroup>
                </Box>
                {/* </ScaleFade> */}
              </Collapse>
            </Stack>
          </Stack>
          {/* <Stack justifyContent="center" alignItems="center" direction="column">
            <form onSubmit={handleUpload}>
              <input type="file" onChange={handleChange} />
              <button disabled={!file}>upload to firebase</button>
            </form>
          </Stack> */}
        </Stack>
      </ScaleFade>
    </Flex>
  );
};

export default Login;

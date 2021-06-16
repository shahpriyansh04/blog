import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
const Signup = () => {
  const auth = useAuth();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const signinWithGoogle = async () => {
    startAuth();
    try {
      await auth
        .signinWithGoogle()
        .then(() => showToast('success', 'Account created'))
        .catch((error) => {
          console.log(error.message);
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
        .then(() => showToast('success', 'Account created'))
        .catch((error) => {
          console.log(error.message);
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
          showToast('success', 'Account created');
        })
        .catch((error) => {
          console.log(error.message);
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

  const validateUser = async () => {
    if (email && password) {
      startAuth();
      if (validateEmail() && validatePassword()) {
        signinWithEmail();
      }
    } else {
      if (email || password) {
        if (!email) {
          showToast('error', 'Please enter email');
        } else {
          showToast('error', 'Please enter password');
        }
      } else {
        showToast('info', 'Please enter all the details');
      }
    }
  };
  const validatePassword = () => {
    if (!(password.length > 8)) {
      showToast('error', 'Invalid password');
    } else {
      return true;
    }
  };
  const validateEmail = () => {
    const re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (!re.test(email)) {
      showToast('error', 'Invalid Email');
    } else {
      return true;
    }
    // re.test(email) ? true : showToast('error', 'Invalid Email');
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
            <Stack spacing={2}>
              <Button
                border="3px solid"
                padding="2rem"
                variant="outline"
                border="3px solid"
                isDisabled={isSubmitting}
                borderColor="black"
                display="flex"
                borderRadius="0"
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
                isDisabled={isSubmitting}
                borderColor="black"
                display="flex"
                borderRadius="0"
                onClick={signinWithGithub}
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
                isDisabled={isSubmitting}
                onClick={onToggle}
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
                      isDisabled={isSubmitting}
                      value={password}
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
                      onClick={validateUser}
                      display="flex"
                      isDisabled={isSubmitting}
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
        </Stack>
      </ScaleFade>
    </Flex>
  );
};

export default Signup;

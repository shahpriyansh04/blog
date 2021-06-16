import '../styles/globals.css';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/roboto';
import '@fontsource/reem-kufi';

import { ProvideAuth } from '../utils/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '../styles/theme';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default MyApp;

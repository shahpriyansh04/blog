import '../styles/globals.css';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/roboto';
import '@fontsource/reem-kufi';
import 'focus-visible/dist/focus-visible';
import { Global, css } from '@emotion/react';
import { ProvideAuth } from '../utils/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '../styles/theme';

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      {/* <CSSReset /> */}
      <Global styles={GlobalStyles} />
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default MyApp;

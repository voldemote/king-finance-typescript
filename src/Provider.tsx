import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { COLORS, TEXT_SIZE } from './config/config';
import StoreProvider from './context/StoreContext';
import { Web3Provider } from './context/Web3Context';
import { SmoothProvider } from './provider/SmoothScroll';

interface ProviderProps {
  children: React.ReactNode;
}

const theme = {
  ...COLORS,
  ...TEXT_SIZE
};

export const Provider = ({ children }: ProviderProps) => {
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="light"
      />
      <StoreProvider>
        <Web3Provider>
          {/* {isDesktop && <SmoothProvider>{children}</SmoothProvider>} {!isDesktop && <>{children}</>} */}
          {children}
        </Web3Provider>
      </StoreProvider>
    </ThemeProvider>
  );
};

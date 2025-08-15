import ThemeProvider from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CenterProvider } from "./contexts/CenterContext";
import { ModalProvider } from "./contexts/ModalContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CenterProvider>
          <ModalProvider>{children}</ModalProvider>
        </CenterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;

import ThemeProvider from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CenterProvider } from "./contexts/CenterContext";
import { ModalProvider } from "./contexts/ModalContext";
import { UploadProvider } from "./contexts/UploadContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CenterProvider>
          <ModalProvider>
            <UploadProvider>{children}</UploadProvider>
          </ModalProvider>
        </CenterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;

import { createContext, useContext, useState } from "react";

const UploadContext = createContext();
const initialState = {
  uploading: false,
  progress: 44,
  error: null,
};

export const UploadProvider = ({ children }) => {
  const [uploadState, setUploadState] = useState(initialState);

  const resetUploadState = () => {
    setUploadState(initialState);
  };

  return (
    <UploadContext.Provider
      value={{ uploadState, setUploadState, resetUploadState }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);

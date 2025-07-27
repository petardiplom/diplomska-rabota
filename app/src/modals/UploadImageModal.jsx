import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  TextField,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import Dropzone from "../components/dropzone";
import { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { formatFileName, formatFileSize } from "../utils/stringUtils";
import { useUpload } from "../contexts/UploadContext";

const UploadImageModal = ({ open, onClose }) => {
  // const { centerId } = useCenter();
  const { uploadState, resetUploadState } = useUpload();
  // const { uploadImage } = useUploadImage();
  const [ls, setLs] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLs((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    // try {
    //   if (selectedFile && centerId) {
    //     // const url = await uploadImage(selectedFile, centerId, "gallery");
    //   }
    // } catch (error) {
    //   console.log("ERRROR", error);
    // }
  };

  useEffect(() => {
    return () => resetUploadState();
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload image</DialogTitle>
      <DialogContent dividers>
        <TextField
          name="name"
          value={ls.name}
          onChange={handleChange}
          label="Name"
          placeholder="Beautiful landscape"
          sx={{ mb: 2 }}
          fullWidth
          required
        />
        <TextField
          name="description"
          value={ls.description}
          onChange={handleChange}
          label="Description"
          placeholder="Breakthrough of mountains"
          sx={{ mb: 2 }}
          multiline
          minRows={2}
          fullWidth
          required
        />
        <Dropzone setSelected={setSelectedFile} />
        {selectedFile && (
          <Box
            sx={{
              mt: 2,
              padding: 2,
              background: "#f1f1f1",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1.2fr 8fr",
              }}
            >
              <ImageIcon sx={{ fontSize: 64 }} color="info" />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                overflow="hidden"
              >
                <Typography sx={{ overflow: "hidden" }}>
                  {formatFileName(selectedFile?.name)}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="end"
                >
                  <Typography color="text.secondary" variant="body2">
                    {formatFileSize(selectedFile?.size)}
                  </Typography>
                  <Typography textAlign="end" variant="body2">
                    {uploadState.progress}%
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box paddingLeft={1}>
              <LinearProgress variant="determinate" value={44}></LinearProgress>
            </Box>
          </Box>
        )}
        {uploadState.error && (
          <Typography color="red">Error: {uploadState.error}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploadState.uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={uploadState.uploading}
          variant="contained"
          color="primary"
        >
          {uploadState.uploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadImageModal;

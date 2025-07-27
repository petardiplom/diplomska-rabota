import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const MAX_SIZE_ALLOWED = 2 * 1024 * 1024;

const Dropzone = ({ setSelected }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelected(file);
      }
    },
    [setSelected]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
      multiple: false,
      maxSize: MAX_SIZE_ALLOWED,
    });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed lightgray",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the image here...</Typography>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <AddPhotoAlternateIcon fontSize="large" color="disabled" />
            <Typography mt={1}>
              Drag & drop or click to upload an image
            </Typography>
          </Box>
        )}
        {fileRejections.length > 0 && (
          <Typography sx={{ color: "red" }}>File too large, max 2MB</Typography>
        )}
        {/* {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            marginTop: 10,
            width: 200,
            maxHeight: 200,
            objectFit: "cover",
          }}
        />
      )} */}
      </Box>
    </>
  );
};

export default Dropzone;

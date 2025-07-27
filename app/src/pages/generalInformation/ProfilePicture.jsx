import { Box } from "@mui/material";

const ProfilePicture = ({ center }) => {
  return (
    <Box m={3} height="100%">
      <Box
        height="inherit"
        display="flex"
        alignItems="baseline"
        justifyContent="center"
      >
        <img
          src={center.image_url || "/default_image.jpg"}
          style={{
            width: 250,
            height: 250,
            borderRadius: "10px",
          }}
          alt={center.name || "profile img"}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = "/default_image.jpg";
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfilePicture;

import { Paper, Box, Typography, Grid } from "@mui/material";
import { useCenter } from "../../contexts/CenterContext";
import GeneralFields from "./GeneralFields";
import ProfilePicture from "./ProfilePicture";

const GeneralInformation = () => {
  const { center } = useCenter();

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h4">General Information</Typography>
        <Grid container>
          <Grid size={{ lg: 6, md: 6, xs: 12 }}>
            <GeneralFields center={center} />
          </Grid>
          <Grid size={{ lg: 6, md: 6, xs: 12 }}>
            <ProfilePicture center={center} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GeneralInformation;

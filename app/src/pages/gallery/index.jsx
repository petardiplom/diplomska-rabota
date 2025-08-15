import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { useModal } from "../../contexts/ModalContext";
import { useCenterGallery } from "../../hooks/apiHooks/useCenters";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";

const images = [
  {
    id: 1,
    title: "Beautiful Landscape",
    description: "A breathtaking view of mountains during sunset.",
    imageUrl: "/landscape.jpg",
  },
  {
    id: 2,
    title: "City Skyline",
    description: "The city lights up as the night falls.",
    imageUrl: "/skyline.jpg",
  },
  {
    id: 3,
    title: "Forest Path",
    description: "A serene path through a dense forest.",
    imageUrl: "/forest.jpg",
  },
  {
    id: 4,
    title: "Beach Vibes",
    description: "Relaxing beach with golden sand and blue water.",
    imageUrl: "/beach.jpg",
  },
  {
    id: 5,
    title: "Snowy Peaks",
    description: "Crisp air and white mountain tops.",
    imageUrl: "/mountains.jpg",
  },
];

const Gallery = () => {
  const { openModal } = useModal();

  const { isLoading, isError, refetch } = useCenterGallery();

  const handleOpen = (image) => {
    openModal("previewImage", {
      selectedImage: image,
    });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent refetch={refetch} />;
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">Gallery</Typography>
          <Button
            onClick={() => {
              openModal("uploadImage");
            }}
          >
            Add image
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {images.map((item) => (
            <Card
              sx={{
                maxWidth: 250,
                height: "auto",
                display: "flex",
                flexDirection: "column",
              }}
              key={item.id}
            >
              <CardMedia
                component="img"
                height="180"
                image={item.imageUrl}
                alt={item.title}
                sx={{
                  width: 250,
                  height: 180,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(item)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginTop: "auto" }}>
                <Box width="100%" display="flex" justifyContent="end">
                  <Button>Delete</Button>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Gallery;

import { Box, Button, Container } from "@mui/material";
import { useCenters } from "../hooks/apiHooks/useCenters";
import CenterCardList from "../components/center/CenterCardList";
import { useEffect, useState } from "react";
import { useModal } from "../contexts/ModalContext";
import Spinner from "../components/spinner/Spinner";
import { useCenter } from "../contexts/CenterContext";
import { useAuth } from "../contexts/AuthContext";

const ITEMS_PER_PAGE = 8;

const Centers = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCenters();
  const { dbUser } = useAuth();
  const { resetCenter } = useCenter();
  const { openModal } = useModal();

  const handleCreateCenter = () => {
    openModal("addCenter");
  };

  useEffect(() => {
    resetCenter();
  }, [resetCenter]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Something went wrong ...</p>;
  }

  const paginated = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "end" }}>
          <Button
            onClick={handleCreateCenter}
            color="primary"
            variant="contained"
            disabled={dbUser?.role !== "owner"}
          >
            ADD CENTER
          </Button>
        </Box>
        <CenterCardList
          centers={paginated}
          page={page}
          totalPages={Math.ceil(data.length / ITEMS_PER_PAGE)}
          onPageChange={setPage}
        />
      </Container>
    </>
  );
};

export default Centers;

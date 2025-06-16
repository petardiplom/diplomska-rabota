import { Box, Button, Container } from '@mui/material';
import { useAddCenter, useCenters } from '../hooks/apiHooks/useCenters';
import CenterCardList from '../components/center/CenterCardList';
import { useState } from 'react';
import { useModal } from '../contexts/ModalContext';

const ITEMS_PER_PAGE = 8;

const Centers = () => {

  const [page, setPage] = useState(1);


  const { data, isLoading, isError } = useCenters();
  const { openModal } = useModal();


  const handleCreateCenter = () => {
    openModal('addCenter');
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Something went wrong ...</p>;
  }



  // const data1 = Array.from({ length: 26 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Center ${i + 1}`,
  //   description: `This is the description for Center ${i + 1}.`,
  //   image: i % 3 === 0 ? `https://i.pravatar.cc/300?img=${i}` : null, // Every 3rd has an image
  // }));
  const paginated = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: "end" }}>
          <Button onClick={handleCreateCenter} color="primary" variant='contained'>ADD CENTER</Button>
        </Box>
        <CenterCardList
          centers={paginated}
          page={page}
          totalPages={Math.ceil(data.length / ITEMS_PER_PAGE)}
          onPageChange={setPage} />
      </Container>
    </>
  );
};

export default Centers;
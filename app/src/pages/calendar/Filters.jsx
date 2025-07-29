import { Button } from "@mui/material";
import SelectOption from "../../components/forms/SelectOption";
import { useModal } from "../../contexts/ModalContext";

const Filters = () => {
  const { openModal } = useModal();
  return (
    <>
      <SelectOption
        label="Customer"
        value={null}
        options={[]}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Staff"
        value={null}
        options={[]}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Service"
        value={null}
        options={[]}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Subservice"
        value={null}
        options={[]}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="small"
        onClick={() => openModal("createReservation")}
      >
        Reservation
      </Button>
    </>
  );
};

export default Filters;

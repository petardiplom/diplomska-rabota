import { Button } from "@mui/material";
import SelectOption from "../../components/forms/SelectOption";
import { useModal } from "../../contexts/ModalContext";
import { useCustomers } from "../../hooks/apiHooks/useCustomers";

const Filters = () => {
  const { openModal } = useModal();

  const { data: customers } = useCustomers();

  return (
    <>
      <SelectOption
        label="Customer"
        value={""}
        options={
          customers
            ? customers.map((customer) => ({
                id: customer.id,
                label: `${customer.email} - (${customer.firstname} ${customer.lastname})`,
              }))
            : []
        }
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Staff"
        value={""}
        options={[]}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Service"
        value={""}
        options={[]}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Subservice"
        value={""}
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

import { Button } from "@mui/material";
import SelectOption from "../../components/forms/SelectOption";
import { useModal } from "../../contexts/ModalContext";
import { useCustomers } from "../../hooks/apiHooks/useCustomers";
import { useServices } from "../../hooks/apiHooks/useServices";
import { useSubservices } from "../../hooks/apiHooks/useSubservices";
import { useStaff } from "../../hooks/apiHooks/useStaff";
import Spinner from "../../components/spinner/Spinner";

const Filters = () => {
  const { openModal } = useModal();

  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: subservices, isLoading: subservicesLoading } = useSubservices();
  const { data: staff, isLoading: staffLoading } = useStaff();

  const isLoading =
    customersLoading || servicesLoading || subservicesLoading || staffLoading;
  if (isLoading) {
    return <Spinner open={isLoading} />;
  }

  const customersOptions =
    customers.map((customer) => ({
      id: customer.id,
      label: `${customer.email} - (${customer.firstname} ${customer.lastname})`,
    })) || [];

  const servicesOptions =
    services.map((service) => ({
      id: service.id,
      label: service.name,
    })) || [];

  const subservicesOptions =
    subservices.map((subservice) => ({
      id: subservice.id,
      label: subservice.name,
    })) || [];

  const staffOptions =
    staff.map((staff) => ({
      id: staff.id,
      label: staff.email,
    })) || [];

  return (
    <>
      <SelectOption
        label="Customer"
        options={customersOptions}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Staff"
        options={staffOptions}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Service"
        options={servicesOptions}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <SelectOption
        label="Subservice"
        options={subservicesOptions}
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

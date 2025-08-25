import { useState } from "react";
import { Box, Button } from "@mui/material";
import SelectOption from "../forms/SelectOption";
import { useCustomers } from "../../hooks/apiHooks/useCustomers";
import LoadingComponent from "../LoadingComponent";
import { useAddSubscription } from "../../hooks/apiHooks/useSessions";

const AddSubscription = ({ sessionId, resetStep }) => {
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { mutate } = useAddSubscription();
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const handleAdd = () => {
    mutate(
      { sessionId, customerId: selectedCustomer },
      {
        onSuccess: () => {
          resetStep();
        },
      }
    );
  };

  if (customersLoading) {
    return <LoadingComponent />;
  }

  const customersOptions =
    customers?.map((customer) => ({
      value: customer.id,
      label: `${customer.email} - (${customer.firstname} ${customer.lastname})`,
    })) || [];

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <SelectOption
        required
        fullWidth
        label="Customer"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        options={customersOptions}
      />
      <Button
        variant="contained"
        onClick={handleAdd}
        disabled={!selectedCustomer}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddSubscription;

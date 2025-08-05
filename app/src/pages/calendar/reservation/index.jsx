import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { QontoConnector, QontoStepIcon } from "./stepperComponents";
import SelectOption from "../../../components/forms/SelectOption";
import { useCustomers } from "../../../hooks/apiHooks/useCustomers";
import { useServices } from "../../../hooks/apiHooks/useServices";
import { useSubservices } from "../../../hooks/apiHooks/useSubservices";
import { useStaff } from "../../../hooks/apiHooks/useStaff";
import LoadingComponent from "../../../components/LoadingComponent";
import { printDateTime } from "../../../utils/printUtils";

const steps = ["Customer", "Service", "Subservice", "Staff", "Time period"];

const CreateReservation = () => {
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: subservices, isLoading: subservicesLoading } = useSubservices();
  const { data: staff, isLoading: staffLoading } = useStaff();

  const [activeStep, setActiveStep] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubservice, setSelectedSubservice] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  useEffect(() => {
    setSelectedSubservice("");
  }, [selectedService]);

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCustomer("");
    setSelectedService("");
    setSelectedSubservice("");
    setSelectedStaff("");
  };

  const getLabel = useCallback(
    (list, id, key = "name") =>
      list?.find((item) => item.id === id)?.[key] || "",
    []
  );

  const isStepComplete = [
    !!selectedCustomer,
    !!selectedService,
    !!selectedSubservice,
    !!selectedStaff,
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SelectOption
            label="Customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            options={customersOptions}
          />
        );
      case 1:
        return (
          <SelectOption
            label="Service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            options={servicesOptions}
          />
        );
      case 2:
        return (
          <SelectOption
            label="Subservice"
            value={selectedSubservice}
            onChange={(e) => setSelectedSubservice(e.target.value)}
            options={subservicesOptions}
          />
        );
      case 3:
        return (
          <SelectOption
            value={selectedStaff}
            label="Staff"
            onChange={(e) => setSelectedStaff(e.target.value)}
            options={staffOptions}
          />
        );
      default:
        return null;
    }
  };

  if (
    customersLoading ||
    servicesLoading ||
    subservicesLoading ||
    staffLoading
  ) {
    return <LoadingComponent />;
  }

  const customersOptions =
    customers?.map((customer) => ({
      value: customer.id,
      label: `${customer.email} - (${customer.firstname} ${customer.lastname})`,
    })) || [];

  const servicesOptions =
    services?.map((service) => ({
      value: service.id,
      label: service.name,
    })) || [];

  const subservicesOptions =
    subservices
      ?.filter((x) => x.service_id === selectedService)
      ?.map((subservice) => ({
        value: subservice.id,
        label: subservice.name,
      })) || [];

  const staffOptions =
    staff?.map((staff) => ({
      value: staff.id,
      label: staff.email,
    })) || [];

  const today = new Date();
  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1, py: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={isStepComplete[index]}>
            <StepLabel slots={{ stepIcon: QontoStepIcon }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4} display="flex" gap={4} flexDirection="column">
        {activeStep === steps.length ? (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Completed
            </Typography>
            <Button sx={{ mt: 2 }} onClick={handleReset}>
              Reset
            </Button>
          </Box>
        ) : (
          <>{getStepContent(activeStep)}</>
        )}
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            borderRadius: 1,
            backgroundColor: "background.paper",
            border: 1,
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Your Selection
          </Typography>

          <Divider sx={{ mb: 1.5 }} />

          <Grid container spacing={2}>
            {[
              {
                label: "Customer",
                value: getLabel(customers, selectedCustomer, "email"),
              },
              { label: "Service", value: getLabel(services, selectedService) },
              {
                label: "Subservice",
                value: getLabel(subservices, selectedSubservice),
              },
              {
                label: "Staff",
                value: getLabel(staff, selectedStaff, "email"),
              },
              { label: "Time period", value: printDateTime(today) },
            ].map((item) => (
              <Grid size={6} key={item.label}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body2">{item.value || "—"}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="end">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              color="secondary"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
              disabled={!isStepComplete[activeStep]}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateReservation;

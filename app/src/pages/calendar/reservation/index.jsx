import { useState, useCallback } from "react";
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
import { useSubserviceStaff } from "../../../hooks/apiHooks/useStaff";
import LoadingComponent from "../../../components/LoadingComponent";
import {
  printDateTime,
  printPrice,
  printTime,
  printInputDate,
} from "../../../utils/printUtils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MyDatePicker from "../../../components/forms/MyDatePicker";
import { parse, addMinutes, format, getISODay } from "date-fns";
import {
  useCenterSchedule,
  useStaffSchedule,
} from "../../../hooks/apiHooks/useCenterSchedule";
import { useTimeslots } from "../../../hooks/apiHooks/useTimeslots";
import { useCreateReservation } from "../../../hooks/apiHooks/useReservations";

const steps = ["Customer | Service | Subservice", "Staff | Time period"];

const disabledDays = (date, disabledDays = []) => {
  const day = getISODay(date);
  return disabledDays.includes(day);
};

const CreateReservation = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubservice, setSelectedSubservice] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const { mutate: createReservation } = useCreateReservation();

  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: subservices, isLoading: subservicesLoading } = useSubservices();
  const { data: centerSchedule, isLoading: centerScheduleLoading } =
    useCenterSchedule();

  const { data: staff, isLoading: staffLoading } =
    useSubserviceStaff(selectedSubservice);

  const { data: staffSchedule, isLoading: staffScheduleLoading } =
    useStaffSchedule(selectedStaff);

  const { data: timeslotOptions = [], isLoading: timeslotsLoading } =
    useTimeslots(selectedDate, selectedStaff, selectedSubservice);

  const handleFinish = () => {
    const data = {
      customer_id: selectedCustomer,
      subservice_id: selectedSubservice,
      staff_id: selectedStaff,
      price: subserviceObject.price,
      duration: subserviceObject.duration,
      date: printInputDate(selectedDate),
      timeslot: selectedTimeslot,
    };
    createReservation(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const getLabel = useCallback(
    (list, id, key = "name") =>
      list?.find((item) => item.id === id)?.[key] || "",
    []
  );

  const isStepComplete = [
    !!selectedCustomer && !!selectedService && !!selectedSubservice,
    !!selectedStaff && !!selectedDate && !!selectedTimeslot,
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <SelectOption
              required
              label="Customer"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              options={customersOptions}
            />
            <SelectOption
              required
              label="Service"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                setSelectedSubservice("");
              }}
              options={servicesOptions}
            />

            <SelectOption
              required
              label="Subservice"
              value={selectedSubservice}
              onChange={(e) => {
                setSelectedSubservice(e.target.value);
                setSelectedStaff("");
                setSelectedTimeslot("");
                setSelectedDate(null);
              }}
              options={subservicesOptions}
              noOptionsMessage="Selected service has no subservices"
            />
          </>
        );
      case 1:
        return (
          <>
            <SelectOption
              required
              value={selectedStaff}
              label="Staff"
              onChange={(e) => setSelectedStaff(e.target.value)}
              options={staffOptions}
              disabled={staffLoading}
              noOptionsMessage="Selected subservice has no staff"
            />

            <MyDatePicker
              label="Date"
              disabled={centerScheduleLoading || staffScheduleLoading}
              disablePast={true}
              value={selectedDate}
              shouldDisableDate={(date) =>
                disabledDays(
                  date,
                  [...(centerSchedule || []), ...(staffSchedule || [])]
                    ?.filter((x) => x.is_closed === true)
                    .map((y) => y.day_of_week)
                )
              }
              onChange={(val) => {
                setSelectedDate(val);
                setSelectedTimeslot("");
              }}
            />
            <SelectOption
              required
              label="Time slots"
              disabled={timeslotsLoading}
              value={selectedTimeslot}
              onChange={(e) => setSelectedTimeslot(e.target.value)}
              options={timeslotOptions.map((x) => {
                const print = printTime(x.start);
                return {
                  value: print,
                  label: print,
                };
              })}
              noOptionsMessage="No available timeslots"
            />
          </>
        );
      default:
        return null;
    }
  };

  if (
    customersLoading ||
    servicesLoading ||
    subservicesLoading ||
    centerScheduleLoading
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

  const subserviceObject = selectedSubservice
    ? subservices?.find((x) => x.id === selectedSubservice) || {}
    : {};

  const selectedDateTime =
    selectedDate && selectedTimeslot
      ? parse(
          `${format(selectedDate, "yyyy-MM-dd")} ${selectedTimeslot}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        )
      : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                {
                  label: "Service",
                  value: getLabel(services, selectedService),
                },
                {
                  label: "Subservice",
                  value: getLabel(subservices, selectedSubservice),
                },
                {
                  label: "Price & Duration",
                  value:
                    Object.keys(subserviceObject).length &&
                    `${printPrice(subserviceObject.price)} for ${
                      subserviceObject.duration
                    } minutes`,
                },
                {
                  label: "Staff",
                  value: getLabel(staff, selectedStaff, "email"),
                },
                {
                  label: "Time period",
                  value:
                    selectedDateTime &&
                    `${printDateTime(selectedDateTime)} - ${printTime(
                      addMinutes(selectedDateTime, subserviceObject.duration)
                    )}`,
                },
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
                onClick={
                  activeStep === steps.length - 1 ? handleFinish : handleNext
                }
                disabled={!isStepComplete[activeStep]}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateReservation;

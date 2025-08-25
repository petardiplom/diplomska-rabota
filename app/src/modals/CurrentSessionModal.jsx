import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { useStaff } from "../hooks/apiHooks/useStaff";
import { useState } from "react";
import { useCancelSession } from "../hooks/apiHooks/useSessions";

import Fields from "../components/reservations_sessions/Fields";
import SubscriptionList from "../components/reservations_sessions/SubscriptionList";
import AddSubscription from "../components/reservations_sessions/AddSubscription";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const STEP = { initial: "initial", add: "add", cancel: "cancel" };

// const fakeSubscriptions = [
//   {
//     id: 1,
//     session_id: 101,
//     customer_email: "marko.test1@example.com",
//     status: "active",
//     created_at: "2025-08-20T14:35:00+02:00",
//     cancelled_at: null,
//     cancelled_by: null,
//   },
//   {
//     id: 2,
//     session_id: 102,
//     customer_email: "ana.test2@example.com",
//     status: "cancelled",
//     created_at: "2025-08-18T09:15:00+02:00",
//     cancelled_at: "2025-08-19T11:42:00+02:00",
//     cancelled_by: "admin@example.com",
//   },
//   {
//     id: 3,
//     session_id: 103,
//     customer_email: "ivana.test3@example.com",
//     status: "active",
//     created_at: "2025-08-21T17:50:00+02:00",
//     cancelled_at: null,
//     cancelled_by: null,
//   },
//   {
//     id: 4,
//     session_id: 104,
//     customer_email: "stefan.test4@example.com",
//     status: "cancelled",
//     created_at: "2025-08-15T12:00:00+02:00",
//     cancelled_at: "2025-08-16T08:30:00+02:00",
//     cancelled_by: "support@example.com",
//   },
// ];

const getTitle = (step, event) => {
  let title = `${event.title} - ${event.subservice_name}`;

  if (step === STEP.cancel) {
    title = "Confirm cancellation";
  } else if (step === "add") {
    title = "Add subscription";
  }
  return title;
};

const CurrentSessionModal = ({ open, onClose, event }) => {
  const [step, setStep] = useState(STEP.initial); // initial, cancel, add

  const { mutate } = useCancelSession();

  const { data: staff } = useStaff();

  const handleCancel = () => {
    mutate(
      { sessionId: event.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const cancelledBy = staff?.find((x) => x.id === event.cancelled_by);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{getTitle(step, event)}</DialogTitle>
      <DialogContent dividers>
        {step === STEP.cancel ? (
          <Typography variant="body1">
            Are you sure you want to cancel this session?
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column">
            <Fields event={event} cancelledBy={cancelledBy} />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography variant="subtitle2" color="textSecondary">
                Subscriptions
              </Typography>
              <Button
                size="small"
                color="primary"
                disabled={!!event.cancelled_at}
                startIcon={step !== STEP.add ? <AddIcon /> : <RemoveIcon />}
                onClick={() =>
                  setStep(step === STEP.add ? step.initial : STEP.add)
                }
              >
                Subscription
              </Button>
            </Box>
            {step === STEP.add && (
              <AddSubscription
                sessionId={event.session_id}
                resetStep={() => setStep(STEP.initial)}
              />
            )}
            <SubscriptionList sessionId={event.session_id} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="row" gap={1}>
          {step === STEP.cancel ? (
            <>
              <Button
                key="confirm-button"
                onClick={handleCancel}
                color="error"
                disabled={event.status === "cancelled"}
              >
                Confirm
              </Button>
              <Button
                key="decline-button"
                onClick={() => setStep(STEP.initial)}
              >
                Decline
              </Button>
            </>
          ) : (
            <>
              <Button
                key="cancel-button"
                onClick={() => setStep(STEP.cancel)}
                color="error"
                disabled={event.status === "cancelled"}
              >
                Cancel session
              </Button>
              <Button key="close-button" onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CurrentSessionModal;

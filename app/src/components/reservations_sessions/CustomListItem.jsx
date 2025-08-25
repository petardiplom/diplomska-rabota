import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useCancelSubscription } from "../../hooks/apiHooks/useSessions";

const getColor = (status) => {
  if (status === "active") {
    return "success";
  }
  if (status === "cancelled") {
    return "error";
  }
  return "primary";
};

const CustomListItem = ({ subscriptionId, sessionId, name, status }) => {
  const { mutate } = useCancelSubscription();

  const [confirm, setConfirm] = useState(false);

  const handleCancel = () => {
    mutate(
      { subscriptionId, sessionId },
      {
        onSuccess: () => {
          setConfirm(false);
        },
      }
    );
  };

  return (
    <Box
      borderBottom="1px solid lightgray"
      width="100%"
      padding={0.5}
      marginTop={0.5}
      marginBottom={0.5}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" alignItems="start">
        <Typography variant="subtitle2" color="textSecondary">
          {name}
        </Typography>
        <Typography variant="subtitle2" color={getColor(status)}>
          {status}
        </Typography>
      </Box>
      {confirm ? (
        <>
          <Box display="flex" gap={1}>
            <Button
              key="sub-confirm-button"
              size="small"
              variant="text"
              color="error"
              disabled={status === "cancelled"}
              onClick={handleCancel}
            >
              Confirm
            </Button>
            <Button
              key="sub-decline-button"
              size="small"
              variant="text"
              color="primary"
              disabled={status === "cancelled"}
              onClick={() => setConfirm(false)}
            >
              Decline
            </Button>
          </Box>
        </>
      ) : (
        <Button
          key="sub-cancel-button"
          size="small"
          variant="text"
          color="error"
          disabled={status === "cancelled"}
          onClick={() => setConfirm(true)}
        >
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default CustomListItem;

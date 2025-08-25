import { Box, List, Typography } from "@mui/material";
import CustomListItem from "./CustomListItem";
import { useSessionSubscriptions } from "../../hooks/apiHooks/useSessions";

const SubscriptionList = ({ sessionId }) => {
  const { data: subscriptions, isLoading } = useSessionSubscriptions(sessionId);
  return (
    <Box margin={1}>
      <Box style={{ maxHeight: 300, overflow: "auto" }}>
        <List>
          {!isLoading && subscriptions.length > 0 ? (
            subscriptions.map((x) => (
              <CustomListItem
                key={x.id}
                subscriptionId={x.id}
                sessionId={sessionId}
                name={x.customer_email}
                status={x.status}
              />
            ))
          ) : (
            <Typography variant="subtitle2" textAlign="center">
              There are no active subscriptions
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default SubscriptionList;

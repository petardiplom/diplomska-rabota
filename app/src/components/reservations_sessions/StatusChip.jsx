import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const StatusChip = ({ status }) => {
  return (
    <Chip
      icon={status === "active" ? <CheckCircleIcon /> : <CancelIcon />}
      size="small"
      color={status === "active" ? "success" : "error"}
      label={status === "active" ? "Active" : "Cancelled"}
      sx={{ width: "auto" }}
    />
  );
};

export default StatusChip;

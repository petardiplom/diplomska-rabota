import { Box, Pagination, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CenterCardItem from "./CenterCardItem";

const CenterCardList = ({ centers, page, totalPages, onPageChange }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const columns = isSmall ? 1 : isMedium ? 4 : 2;

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${columns}, 1fr)`}
        gap={3}
      >
        {centers.map((center) => (
          <CenterCardItem key={center.id} center={center} />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => onPageChange(value)}
          color="primary"
          size={isSmall ? "small" : "medium"}
        />
      </Box>
    </Box>
  );
};

export default CenterCardList;

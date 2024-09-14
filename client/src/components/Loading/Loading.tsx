import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Box className="loader-container">
      <CircularProgress size={"5em"} />
    </Box>
  );
};

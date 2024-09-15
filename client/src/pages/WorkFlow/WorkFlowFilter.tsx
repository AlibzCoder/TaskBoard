import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useGetAllUsersQuery } from "../../store/middlewares/createApiReducer";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentUserFilter } from "../../store/slices/userSlice";

const WorkFlowFilter = () => {
  const dispatch = useDispatch();
  const {
    data: usersList = [],
    isLoading: isLoadingUsersList,
    refetch: refetchAllUsersList,
  } = useGetAllUsersQuery();

  const userstate = useAppSelector((state) => state.user);
  
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: "0.5em",
        px: 3,
        py: 1,
        my: 1,
      }}
    >
      <Typography style={{ marginRight: "0.75em" }}>Assigned To : </Typography>
      <Select
        variant="standard"
        value={userstate.currentUserFilter || "all"}
        label="Assigned To"
        onChange={(e) => dispatch(setCurrentUserFilter(e.target.value))}
      >
        <MenuItem value={"all"}>All</MenuItem>
        {usersList.map((item) => (
          <MenuItem value={item.username}>{userstate.user?.username === item.username ? "@Me" : item.fullName}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};
export default WorkFlowFilter;

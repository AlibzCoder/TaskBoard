import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  useAddTaskMutation,
  useGetAllUsersQuery,
  useGetDefinedStatusesQuery,
} from "../../store/middlewares/createApiReducer";
import { Loading } from "../../components/Loading/Loading";
import { useState } from "react";
import { blue } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  minHeight: "50vh",
  bgcolor: "background.paper",
  borderRadius: "1em",
  border: "none",
  outline: "none",
  boxShadow: 24,
};

const AddWorkItemModal = (props: { open: boolean; onClose: () => void }) => {
  const userstate = useAppSelector((state) => state.user);
  const { data: usersList = [], isLoading: isLoadingUsersList } =
    useGetAllUsersQuery();
  const { isLoading: isLoadingTasksStatuses } = useGetDefinedStatusesQuery();

  const [assignedToUser, setAssignedToUser] = useState<string | any>(
    userstate.user?.id
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimation, setEstimation] = useState<any>();

  const [error, setError] = useState("");

  const [addTask, { isLoading: isWaitingForAddTask }] = useAddTaskMutation();

  function handleAddTask() {
    const user = usersList.find((u) => u.id === assignedToUser);
    if (!title || (typeof title === "string" && title.trim().length < 0))
      return setError("Please Enter Title");
    if (
      !description ||
      (typeof description === "string" && description.trim().length < 0)
    )
      return setError("Please Enter Description");
    if (!user) return setError("Unknown Error, Please try Again");

    const payload = {
      title,
      description,
      estimation: !estimation ? 0 : estimation,
      userName: user.username,
    };
    addTask(payload).then(() => {
      if (props.onClose) props.onClose();
    });
  }

  const isLoading =
    isLoadingTasksStatuses || isLoadingUsersList || isWaitingForAddTask;

  return (
    <Modal {...props}>
      <Box sx={style}>
        {isLoading ? (
          <Box className="loading-overlay">
            <Loading />
          </Box>
        ) : (
          <></>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            p: 6,
            pt: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            style={{ marginBottom: "1em" }}
          >
            Create New Task
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="work-item-modal-form-assigned-to-label">
              Assigned To
            </InputLabel>
            <Select
              labelId="work-item-modal-form-assigned-to-label"
              value={assignedToUser}
              label="Assigned To"
              onChange={(e) => setAssignedToUser(e.target.value)}
            >
              {usersList.map((item) => (
                <MenuItem value={item.id}>
                  {userstate.user?.id === item.id ? "@Me" : item.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              onChange={({ target }) => {
                setEstimation(target.value);
              }}
              value={estimation}
              type="number"
              variant="standard"
              size="small"
              label="Estimation"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              onChange={({ target }) => {
                setTitle(target.value);
              }}
              value={title}
              type="text"
              variant="standard"
              size="small"
              label="Title"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              onChange={({ target }) => {
                setDescription(target.value);
              }}
              value={description}
              type="text"
              multiline={true}
              rows={8}
              variant="standard"
              size="small"
              label="Description"
            />
          </FormControl>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            style={{ backgroundColor: blue.A700 }}
            onClick={handleAddTask}
          >
            Save
          </Button>
          {error ? (
            <Typography component="span" color="error">
              {error}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
export default AddWorkItemModal;

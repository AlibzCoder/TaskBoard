import {
  Autocomplete,
  Box,
  Button,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  WorkItemModalContentProps,
  WorkItemModalProps,
} from "../../types/compoentProps";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DisplableEditTextField from "../../components/DisplableEditTextField";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useMemo, useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
  getRelativeDate,
  IsArray,
} from "../../util";
import { blue, lightBlue } from "@mui/material/colors";
import {
  useDeleteTaskMutation,
  useGetAllUsersQuery,
  useGetDefinedStatusesQuery,
  useUpdateTaskMutation,
} from "../../store/middlewares/createApiReducer";
import { useAppSelector } from "../../hooks/reduxHooks";
import { UpdateTaskRequestModel } from "../../types/api";
import { Loading } from "../../components/Loading/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  minHeight: "50vh",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
};

const WorkItemModalContent = (props: WorkItemModalContentProps) => {
  const { workFlowSteps, workItem, doCose } = props;
  const {
    _id,
    title,
    effort,
    estimation,
    description,
    assignedTo,
    createdDate,
    lastUpdatedDate,
    completedDate,
    status,
    user,
  } = workItem;

  const userstate = useAppSelector((state) => state.user);
  const {
    data: usersList = [],
    isLoading: isLoadingUsersList,
    refetch: refetchAllUsersList,
  } = useGetAllUsersQuery();
  const {
    data: tasksStatuses,
    isLoading: isLoadingTasksStatuses,
    refetch: refetchDefinedStatuses,
  } = useGetDefinedStatusesQuery();

  const [assignedToUser, setAssignedToUser] = useState<string | any>(user);
  const [wordkItemState, setWorkItemState] = useState(status);

  const [edittedTitle, setEditedTitle] = useState(title);
  const [edittedDescription, setEditedDescription] = useState(description);
  const [edittedEffort, setEditedEffort] = useState(effort);
  const [edittedEstimation, setEditedEstimation] = useState(estimation);


  const currentWorkStateOptions = useMemo(
    () => findWorkStepByStatusOrLabel(workItem.status),
    [wordkItemState]
  );


  const [updateTask, { isLoading: isWaitingForTaskUpdate }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isWaitingForTaskDelete }] = useDeleteTaskMutation();


  const handleUpdateTask = () => {
    let payload : UpdateTaskRequestModel = {
      param: {
        id: _id
      }
    };
    if(assignedToUser !== user && assignedToUser) payload = {...payload, userName: assignedToUser};
    if(wordkItemState !== status && wordkItemState) payload = {...payload, status: wordkItemState};
    if(edittedTitle !== title && edittedTitle) payload = {...payload, title: edittedTitle};
    if(edittedDescription !== description && edittedDescription) payload = {...payload, description: edittedDescription};
    if(edittedEffort !== effort && edittedEffort) payload = {...payload, effort: edittedEffort};
    if(edittedEstimation !== estimation && edittedEstimation) payload = {...payload, estimation: edittedEstimation};
    if(Object.keys(payload).length > 1){
      updateTask(payload).then(()=>{
        if(doCose) doCose(false)
      })
    }
  }

  const handleDeleteTask = () => {
    deleteTask({
      param: {
        id: _id
      }
    }).then(()=>{
      if(doCose) doCose(false)
    })
  }

  function findWorkStepByStatusOrLabel(input: string | any) {
    if (input && typeof input === "string" && input.length > 0) {
      const item = workFlowSteps.find((step) => step.id === wordkItemState);
      if (item) return item;
    }
    return workFlowSteps[0];
  }

  const isLoading = isLoadingTasksStatuses || isLoadingUsersList || isWaitingForTaskDelete || isWaitingForTaskUpdate

  return (
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
          height: "1em",
          bgcolor: currentWorkStateOptions?.color,
        }}
      ></Box>
      <Box sx={{ p: 4, pt: 2 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingBottom: "0.5em",
            borderBottom: "1px solid  rgb(51 51 51 / 20%)",
          }}
        >
          <AssignmentOutlinedIcon
            fontSize="large"
            style={{
              marginRight: "0.25em",
              color: currentWorkStateOptions?.color,
            }}
          />
          <Box
            style={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              whiteSpace: "pre",
              width: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title={getRelativeDate(createdDate)} placement="right">
                <Typography
                  component="span"
                  fontSize="0.75em"
                  style={{ lineHeight: 1.25, opacity: 0.65, display: "table" }}
                >
                  Created At : {formatDate(createdDate, "mm/dd/yyyy")}
                </Typography>
              </Tooltip>
              <span> - </span>
              <Tooltip
                title={getRelativeDate(lastUpdatedDate)}
                placement="right"
              >
                <Typography
                  component="span"
                  fontSize="0.75em"
                  style={{ lineHeight: 1.25, opacity: 0.65, display: "table" }}
                >
                  Last Updated : {formatDate(lastUpdatedDate, "mm/dd/yyyy")}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{ width: "100%", display: "flex", alignItems: "flex-end" }}
            >
              <DisplableEditTextField
                shouldExtend={true}
                style={{
                  maxWidth: "95%",
                }}
                typographyProps={{
                  id: "modal-modal-title",
                  variant: "h6",
                  component: "h2",
                  style: { lineHeight: 1, margin: 0 },
                  children: edittedTitle,
                }}
                textFieldProps={{
                  style: {},
                  onChange: (e) => {
                    let value = e.target.value;
                    if (typeof value === "string" && value.length > 0) {
                      value = value.replace(/\s{2,}/g, " ");
                      value.trim();
                    }
                    setEditedTitle(value);
                  },
                  variant: "standard",
                  value: edittedTitle,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 25%",
            gap: "2em",
            marginTop: "1em",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 20%",
            }}
          >
            <DisplableEditTextField
              style={{
                maxWidth: "100%",
                width: "100%",
              }}
              typographyProps={{
                style: { lineHeight: 1, margin: 0 },
                children: edittedDescription,
              }}
              textFieldProps={{
                multiline: true,
                rows: 7,
                onChange: (e) => {
                  let value = e.target.value;
                  if (typeof value === "string" && value.length > 0) {
                    value = value.replace(/\s{2,}/g, " ");
                    value.trim();
                  }
                  setEditedDescription(value);
                },
                variant: "standard",
                value: edittedDescription,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.75em",
                height: "2.25em",
              }}
            >
              <Button
                startIcon={<DeleteOutlineIcon />}
                variant="contained"
                color="error"
                style={{margin:"0 1em"}}
                onClick={handleDeleteTask}
              >
                Remove
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ backgroundColor: blue.A700 }}
                onClick={handleUpdateTask}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid  rgb(51 51 51 / 20%)",
              gap: "0.5em",
              marginTop: "0.5em",
            }}
          >
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
              <InputLabel id="work-item-modal-form-state-label">
                State
              </InputLabel>
              <Select
                labelId="work-item-modal-form-state-label"
                value={wordkItemState}
                label="State"
                onChange={(e) => setWorkItemState(e.target.value)}
              >
                {tasksStatuses ? (
                  tasksStatuses.enum.map((item) => (
                    <MenuItem value={item}>
                      {capitalizeFirstLetter(item)}
                    </MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
            {wordkItemState === "completed" && completedDate ? (
              <Tooltip title={getRelativeDate(completedDate)} placement="right">
                <Typography
                  component="span"
                  fontSize="0.75em"
                  style={{ lineHeight: 1.25, opacity: 0.65, display: "table" }}
                >
                  Created At : {formatDate(completedDate, "mm/dd/yyyy")}
                </Typography>
              </Tooltip>
            ) : (
              <></>
            )}
            <TextField
              onChange={({ target }) => {
                setEditedEffort(target.value);
              }}
              value={edittedEffort}
              type="number"
              variant="standard"
              size="small"
              label="Effort"
              style={{
                margin: '0.25em 0 0.75em 0'
              }}
            />
            <TextField
              onChange={({ target }) => {
                setEditedEstimation(target.value);
              }}
              value={edittedEstimation}
              type="number"
              variant="standard"
              size="small"
              label="Estimation"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const WorkItemModal = (props: WorkItemModalProps) => {
  const { content, ...otherProps } = props;
  return (
    <Modal {...otherProps}>
      {content ? <WorkItemModalContent doCose={props.onClose} {...content} /> : <></>}
    </Modal>
  );
};
export default WorkItemModal;

import {
  Autocomplete,
  Box,
  Button,
  Fab,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  WorkItemModalContentProps,
  WorkItemModalProps,
} from "../../types/compoentProps";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DisplableEditTextField from "../../components/DisplableEditTextField";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useMemo, useState } from "react";
import { formatDate, getRelativeDate, IsArray } from "../../util";
import { blue, lightBlue } from "@mui/material/colors";

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
  const { workFlowSteps, workItem, users } = props;
  const {
    title,
    effort,
    estimation,
    description,
    assignedTo,
    createdDate,
    lastUpdatedDate,
    completedDate,
  } = workItem;

  const currentWorkState = useMemo(
    () => findWorkStepByStatusOrLabel(workItem.status),
    [workItem]
  );

  const [edittedAssignedTo, setEditedAssignedTo] = useState<string | any>(
    assignedTo
  );
  const [edittedTitle, setEditedTitle] = useState(title);
  const [edittedDescription, setEditedDescription] = useState(description);
  const [edittedEffort, setEditedEffort] = useState(effort);
  const [edittedEstimation, setEditedEstimation] = useState(estimation);
  const [edittedWorkState, setEditedWorkState] = useState(currentWorkState);

  const workflowStatesNames = useMemo(
    () =>
      IsArray(workFlowSteps)
        ? workFlowSteps.map((item) => item.shortLabel)
        : edittedWorkState?.shortLabel
        ? [edittedWorkState.shortLabel]
        : [],
    [workFlowSteps]
  );
  const userNames = useMemo(
    () =>
      IsArray(users)
        ? users.map((item) => item.name)
        : assignedTo
        ? [assignedTo]
        : [],
    [users]
  );

  function findWorkStepByStatusOrLabel(input: string | any) {
    if (input && typeof input === "string" && input.length > 0) {
      const item = workFlowSteps.find(
        (step) =>
          step.id.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
          step.label.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      );
      console.log(item);
      if (item) return item;
    }
    return workFlowSteps[0];
  }

  return (
    <Box sx={style}>
      <Box
        sx={{
          width: "100%",
          height: "1em",
          bgcolor: edittedWorkState?.color,
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
              color: edittedWorkState?.color,
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
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ backgroundColor: blue.A700 }}
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
            <Autocomplete
              disablePortal
              options={userNames}
              sx={{ width: "100%", p: 0 }}
              value={edittedAssignedTo}
              onChange={(event: any, newValue: string | null) => {
                setEditedAssignedTo(newValue);
              }}
              inputValue={edittedAssignedTo}
              renderInput={(params: object | any) => (
                <TextField
                  {...params}
                  variant="standard"
                  size="small"
                  label="Assigned To"
                />
              )}
            />
            <Autocomplete
              disablePortal
              options={workflowStatesNames}
              sx={{ width: "100%", p: 0 }}
              value={edittedWorkState?.shortLabel}
              onChange={(event: any, newValue: string | null) => {
                setEditedWorkState(findWorkStepByStatusOrLabel(newValue));
              }}
              inputValue={edittedWorkState?.shortLabel}
              renderInput={(params: object | any) => (
                <TextField
                  {...params}
                  variant="standard"
                  size="small"
                  label="State"
                />
              )}
            />
            {edittedWorkState.id === "completed" && completedDate ? (
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
      {content ? <WorkItemModalContent {...content} /> : <></>}
    </Modal>
  );
};
export default WorkItemModal;

import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Truncate } from "../../util";
import { WorkflowListItemComponentProps } from "../../types/compoentProps";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export default function WorkflowListItem(
  props: WorkflowListItemComponentProps
) {
  const { item, workFlowStep, onClick } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.25 : 1,
    color: workFlowStep.color,
  };

  const title = Truncate(item?.title || "", 25);
  const description = Truncate(item?.description || "", 150);

  return (
    <Box
      key={item._id}
      sx={{ mb: 2 }}
      className="workflow-task-item-wrapper"
      ref={setNodeRef}
      style={style}
      onClick={() => {
        console.log(onClick);
        if (onClick)
          onClick({
            item,
            workFlowStep,
          });
      }}
    >
      <ListItem className="workflow-task-item">
        <Box className="workflow-task-item-title">
          <AssignmentOutlinedIcon
            fontSize="small"
            style={{
              marginRight: "0.25em",
              color: workFlowStep.color,
            }}
          />
          <ListItemText primary={title} />
        </Box>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              >
                Assigned To {item?.assignedTo}
              </Typography>
              {` — `} {description}
            </React.Fragment>
          }
        />
        <ListItemText secondary={`Effort : ${item?.effort || 0}`} />
      </ListItem>
      <Box className="workflow-task-item-drag-handle">
        <IconButton color="inherit" {...attributes} {...listeners}>
          <DragHandleIcon fontSize={"small"} />
        </IconButton>
      </Box>
    </Box>
  );
}

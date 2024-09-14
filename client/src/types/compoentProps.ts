import React from "react";
import { TaskItem, User, WorkflowStep } from "./todos";
import { TextFieldProps, TypographyProps } from "@mui/material";

export interface WorkflowListProps extends React.ComponentProps<"ul"> {
  workFlowItem: WorkflowStep;
  workFlowTasks: WorkflowListItemProps[];
  itemOnClick?: (e: WorkflowListItemComponentProps | any) => void;
}

export interface WorkflowListItemProps extends TaskItem {
  assignedTo: string;
}

export interface DraggableWrapperProps extends React.ComponentProps<"div"> {
  dragId: number | string | any;
  data?: object | any;
}
export interface SortableWrapperProps extends React.ComponentProps<"div"> {
  dragId: number | string | any;
  data?: object | any;
}

export interface WorkItemModalProps {
  content: WorkItemModalContentProps | null;
  open: boolean;
  onClose: (e: boolean) => any;
}
export interface WorkflowListItemComponentProps {
  workFlowStep: WorkflowStep;
  item: WorkflowListItemProps;
  onClick?: (e: WorkflowListItemComponentProps | any) => void;
}

export interface DisplableEditTextFieldProps
  extends React.ComponentProps<"div"> {
  textFieldProps: TextFieldProps;
  typographyProps: TypographyProps;
  shouldExtend?: boolean
}

export interface WorkItemModalContentProps {
  workItem: WorkflowListItemProps;
  workFlowSteps: WorkflowStep[];
  users: User[]
}

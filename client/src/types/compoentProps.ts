import React from "react";
import { TaskItem, WorkflowStep } from "./todos";
import { TextFieldProps, TypographyProps } from "@mui/material";
import UserModel from "./UserModel";

export interface WorkflowListProps extends React.ComponentProps<"ul"> {
  workFlowItem: WorkflowStep;
  workFlowTasks: TaskItem[];
  itemOnClick?: (e: WorkflowListItemComponentProps | any) => void;
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
  item: TaskItem;
  onClick?: (e: WorkflowListItemComponentProps | any) => void;
}

export interface DisplableEditTextFieldProps
  extends React.ComponentProps<"div"> {
  textFieldProps: TextFieldProps;
  typographyProps: TypographyProps;
  shouldExtend?: boolean;
}

export interface WorkItemModalContentProps {
  workItem: TaskItem;
  workFlowSteps: WorkflowStep[];
  users: UserModel[];
  doCose?: (e: boolean) => void;
}

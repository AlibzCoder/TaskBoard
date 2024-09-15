export interface TaskItem {
  _id: string;
  user: string;
  title?: string;
  description?: string;
  status: string;
  createdDate: string | Date | any;
  completedDate?: string | Date | any;
  lastUpdatedDate?: string | Date | any;
  effort?: number | any;
  estimation?: number | any;
  assignedTo?: string;
}
export interface WorkflowStep {
  id: string;
  label: string;
  shortLabel: string;
  color: any | object | string;
  canAdd: boolean;
}
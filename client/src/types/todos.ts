export interface TaskItem {
  id: string;
  user: string;
  title?: string;
  description?: string;
  status: string;
  createdDate: string | Date | any;
  completedDate?: string | Date | any;
  lastUpdatedDate?: string | Date | any;
  effort?: number | any;
  estimation?: number | any;
}
export interface WorkflowStep {
  id: string;
  label: string;
  shortLabel: string;
  color: any | object | string;
  canAdd: boolean;
}
export interface User{
  id: number | string,
  name: string
}
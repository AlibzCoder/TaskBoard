import List from "@mui/material/List";
import { IconButton, ListSubheader } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { WorkflowListProps } from "../../types/compoentProps";
import WorkflowListItem from "./WorkFlowListItem";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddWorkItemModal from "./AddWorkItemModal";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useGetAllTodosQuery } from "../../store/middlewares/createApiReducer";

export default function WorkflowList(props: WorkflowListProps) {
  const { workFlowItem, workFlowTasks } = props;

  const [openAddModal, setOpenAddModal] = useState(false);
  const { currentUserFilter } = useAppSelector((state) => state.user);
  const getTodoFilter = useMemo(
    () =>
      currentUserFilter !== "All" && currentUserFilter
        ? { userName: currentUserFilter }
        : {},
    [currentUserFilter]
  );
  const {
    data: tasksList,
    isLoading: isLoadingTasks,
    refetch: refetchTasks,
  } = useGetAllTodosQuery(getTodoFilter);

  const { setNodeRef } = useDroppable({
    id: workFlowItem.id,
  });
  return (
    <>
      <List
        className="workflow-list-container"
        sx={{ bgcolor: "background.paper" }}
        subheader={
          <ListSubheader
            component="div"
            style={{
              backgroundColor: workFlowItem.color,
              color: "#FFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {workFlowItem?.label}
            {workFlowItem?.canAdd ? (
              <IconButton
                color="primary"
                style={{ color: "#FFF" }}
                onClick={() => setOpenAddModal(true)}
              >
                <AddCircleOutlineOutlinedIcon fontSize={"small"} />
              </IconButton>
            ) : (
              <></>
            )}
          </ListSubheader>
        }
      >
        <SortableContext
          id={workFlowItem.id}
          items={workFlowTasks}
          strategy={verticalListSortingStrategy}
        >
          <div className="workflow-list-container-droppable" ref={setNodeRef}>
            {workFlowTasks.map((item, key) => (
              <WorkflowListItem
                key={`${workFlowItem?.id}_${key}_item`}
                item={item}
                onClick={props.itemOnClick}
                workFlowStep={workFlowItem}
              />
            ))}
          </div>
        </SortableContext>
      </List>
      {workFlowItem?.canAdd ? (
        <AddWorkItemModal
          open={openAddModal}
          onClose={() => {
            refetchTasks()
            setOpenAddModal(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

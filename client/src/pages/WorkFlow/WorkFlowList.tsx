import List from "@mui/material/List";
import { Box, IconButton, ListSubheader, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  WorkflowListItemProps,
  WorkflowListProps,
} from "../../types/compoentProps";
import WorkflowListItem from "./WorkFlowListItem";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem";

export default function WorkflowList(props: WorkflowListProps) {
  const { workFlowItem, workFlowTasks } = props;

  const { setNodeRef } = useDroppable({
    id: workFlowItem.id,
  });
  return (
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
            <IconButton color="primary">
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
  );

  // return (
  //   <SortableContext items={workFlowTasks}>
  //     <List
  //       className="workflow-list-container"
  //       sx={{ bgcolor: "background.paper" }}
  // subheader={
  //   <ListSubheader
  //     component="div"
  //     style={{
  //       display: "flex",
  //       justifyContent: "space-between",
  //       alignItems: "center",
  //     }}
  //   >
  //     {workFlowItem?.label}
  //     {workFlowItem?.canAdd ? (
  //       <IconButton color="primary">
  //         <AddCircleOutlineOutlinedIcon fontSize={"small"} />
  //       </IconButton>
  //     ) : (
  //       <></>
  //     )}
  //   </ListSubheader>
  // }
  //     >
  //       {workFlowTasks.map(
  //         (item: WorkflowListItemProps | object | any, key) => (
  //           <SortableItem
  //             dragId={`${workFlowItem?.id}`}
  //             id={`${workFlowItem?.id}`}
  //             key={`${workFlowItem?.id}_${key}_draggable`}
  //             data={item}
  //           >
  //             <WorkflowListItem
  //               key={`${workFlowItem?.id}_${key}_item`}
  //               id={`${workFlowItem?.id}_${key}`}
  //               item={item}
  //             />
  //           </SortableItem>
  //         )
  //       )}
  //     </List>
  //   </SortableContext>
  // );
}

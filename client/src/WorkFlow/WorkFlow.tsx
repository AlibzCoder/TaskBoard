import { Box, Container, Grid2 } from "@mui/material";
import {
  DraggableWrapperProps,
  WorkflowListItemComponentProps,
  WorkflowListItemProps,
  WorkItemModalContentProps,
} from "../types/compoentProps";
import WorkflowList from "./WorkFlowList";
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import WorkflowListItem from "./WorkFlowListItem";
import { IsArray, IsNumber } from "../util";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { blue, blueGrey, green, lightBlue } from "@mui/material/colors";
import WorkItemModal from "./WorkItemModal";
import { User } from "../types/todos";

const users : User[] = [
  {
    id : "669e96bb4d9227963c59855d",
    name: "Ali"
  },
  {
    id : "669e96bb4d9227963c59855",
    name: "Ayub"
  },
  {
    id : "669e96bb4d9227963c5985",
    name: "Hossein"
  },
  {
    id : "669e96bb4d9227963c598",
    name: "John Doe"
  },
  {
    id : "669e96bb4d9227963c59",
    name: "Morteza"
  },
]

const WorkFlowSteps = [
  {
    id: "created",
    label: "New Tasks",
    shortLabel: "New",
    color: blueGrey[600],
    canAdd: true,
  },
  {
    id: "active",
    label: "Active Tasks",
    shortLabel: "Active",
    color: lightBlue[600],
    canAdd: false,
  },
  {
    id: "reviewed",
    label: "Reviewed Tasks",
    shortLabel: "Reviewed",
    color: green.A700,
    canAdd: false,
  },
  {
    id: "completed",
    label: "Completed Tasks",
    shortLabel: "Completed",
    color: blue.A700,
    canAdd: false,
  },
];

const data: {
  created: WorkflowListItemProps[];
  active: WorkflowListItemProps[];
  reviewed: WorkflowListItemProps[];
  completed: WorkflowListItemProps[];
} = {
  created: [
    {
      id: "669eb9114e5deac99426abdf",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: "2024-07-22T19:54:57.213Z",
      estimation: 10,
    },
    {
      id: "669eb9114e5deac99426abd",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
    {
      id: "669eb9114e5deac99426ab",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
    {
      id: "669eb9114e5deac99426a",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
    {
      id: "669eb9114e5deac99426",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
    {
      id: "669eb9114e5deac9942",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
    {
      id: "669eb9114e5deac994",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
    {
      id: "669eb9114e5deac99",
      user: "669e96bb4d9227963c59855d",
      assignedTo: "Ali",
      title: "Get to Work",
      description: "Fuck this life",
      status: "created",
      createdDate: "2024-07-22T19:54:57.213Z",
      lastUpdatedDate: "2024-07-22T19:54:57.213Z",
      completedDate: null,
      estimation: 10,
    },
  ],
  active: [],
  reviewed: [],
  completed: [],
};

export default function Workflow(props: any) {
  const [workflowStepsData, setWorkflowStepsData] = useState(data);
  const [currentModalItem, setCurrentModalItem] =
    useState<WorkItemModalContentProps | null>(null);
  const [currentModalItemOpen, setCurrentModalItemOpen] = useState(false);
  const [currentDragItem, setCurrentDragItem] = useState<
    null | DraggableWrapperProps | any
  >(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function openItem(itemProps: WorkflowListItemComponentProps) {
    console.log(itemProps)
    setCurrentModalItem({
      workItem: itemProps.item,
      workFlowSteps: WorkFlowSteps,
      users: users
    });
    setCurrentModalItemOpen(true);
  }

  function getCurrentDraggingItem(eventActiveItem: object | any) {
    if (
      eventActiveItem.data?.current &&
      eventActiveItem.data.current?.sortable
    ) {
      const containerId = eventActiveItem.data.current.sortable
        .containerId as keyof typeof workflowStepsData;
      const itemIndex = eventActiveItem.data.current.sortable.index;
      if (
        IsNumber(itemIndex) &&
        Object.keys(workflowStepsData).includes(containerId) &&
        workflowStepsData[containerId][itemIndex]
      ) {
        const item: WorkflowListItemProps =
          workflowStepsData[containerId][itemIndex];
        if (item) {
          return {
            item,
            workFlowStep: WorkFlowSteps.find((step) => (item.status = step.id)),
          };
        }

        return { item };
      }
    }
    return null;
  }
  function getContainerId(id: string | any) {
    if (Object.keys(workflowStepsData).includes(id)) return id;
    return Object.keys(workflowStepsData).find((key) =>
      workflowStepsData[key as keyof typeof workflowStepsData].find(
        (item) => item.id === id
      )
    );
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    setCurrentDragItem(getCurrentDraggingItem(active));
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    let activeContainerId: keyof typeof workflowStepsData | any;
    let overContainerId: keyof typeof workflowStepsData | any;
    if (active && active?.id) activeContainerId = getContainerId(active.id);
    if (over && over?.id) overContainerId = getContainerId(over.id);

    if (
      !Object.keys(workflowStepsData).includes(activeContainerId) ||
      !Object.keys(workflowStepsData).includes(overContainerId) ||
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
      return;
    }

    setWorkflowStepsData((workflowSteps) => {
      const activeContainer = activeContainerId as keyof typeof workflowSteps;
      const overContainer = overContainerId as keyof typeof workflowSteps;
      const activeItems = workflowSteps[activeContainer];
      const overItems = workflowSteps[overContainer];

      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);
      return {
        ...workflowSteps,
        [activeContainer]: [
          ...workflowSteps[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...workflowSteps[overContainer].slice(0, overIndex),
          workflowSteps[activeContainer][activeIndex],
          ...workflowSteps[overContainer].slice(
            overIndex,
            workflowSteps[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    let activeContainerId: keyof typeof workflowStepsData | any;
    let overContainerId: keyof typeof workflowStepsData | any;
    if (active && active?.id) activeContainerId = getContainerId(active.id);
    if (over && over?.id) overContainerId = getContainerId(over.id);
    if (
      !Object.keys(workflowStepsData).includes(activeContainerId) ||
      !Object.keys(workflowStepsData).includes(overContainerId) ||
      !activeContainerId ||
      !overContainerId
    ) {
      return;
    }
    const activeIndex = workflowStepsData[
      activeContainerId as keyof typeof workflowStepsData
    ].findIndex((task) => task.id === active.id);
    const overIndex = workflowStepsData[
      overContainerId as keyof typeof workflowStepsData
    ].findIndex((task) => task.id === over?.id);

    if (activeIndex !== overIndex) {
      setWorkflowStepsData((workflowSteps) => ({
        ...workflowSteps,
        [overContainerId as keyof typeof workflowStepsData]: arrayMove(
          workflowSteps[overContainerId as keyof typeof workflowStepsData],
          activeIndex,
          overIndex
        ),
      }));
    }

    setCurrentDragItem(null);
  };
  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Container fixed>
        <Grid2
          className="workflow-devider-container"
          container
          spacing={WorkFlowSteps.length}
        >
          {WorkFlowSteps.map((workflowListItem) => {
            return (
              <WorkflowList
                key={workflowListItem.id}
                id={workflowListItem.id}
                workFlowItem={workflowListItem}
                workFlowTasks={
                  workflowStepsData[workflowListItem.id as keyof typeof data]
                }
                itemOnClick={openItem}
              />
            );
          })}
          <DragOverlay dropAnimation={dropAnimation}>
            {currentDragItem ? (
              <WorkflowListItem
                key={`${currentDragItem.id}_overlay`}
                {...currentDragItem}
              />
            ) : null}
          </DragOverlay>
        </Grid2>
        <WorkItemModal
          content={currentModalItem}
          open={currentModalItemOpen}
          onClose={() => setCurrentModalItemOpen(false)}
        />
      </Container>
    </DndContext>
  );
}

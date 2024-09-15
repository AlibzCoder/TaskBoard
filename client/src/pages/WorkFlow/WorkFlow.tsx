import { Box, Container, Grid2 } from "@mui/material";
import {
  WorkflowListItemComponentProps,
  WorkItemModalContentProps,
} from "../../types/compoentProps";
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
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import WorkflowListItem from "./WorkFlowListItem";
import { capitalizeFirstLetter, IsArray } from "../../util";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { blue, blueGrey } from "@mui/material/colors";
import WorkItemModal from "./WorkItemModal";
import { TaskItem, WorkflowStep } from "../../types/todos";
import {
  useGetAllTodosQuery,
  useGetAllUsersQuery,
  useGetDefinedStatusesQuery,
  useUpdateTaskMutation,
} from "../../store/middlewares/createApiReducer";
import { WorkFlowStepsColors } from "../../util/consts";
import { Loading } from "../../components/Loading/Loading";
import WorkFlowFilter from "./WorkFlowFilter";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function Workflow() {
  const [workflowStepsData, setWorkflowStepsData] = useState<{
    [key: string]: TaskItem[];
  }>({});
  const [currentModalItem, setCurrentModalItem] =
    useState<WorkItemModalContentProps | null>(null);
  const [currentModalItemOpen, setCurrentModalItemOpen] = useState(false);
  const [currentDragItem, setCurrentDragItem] =
    useState<WorkflowListItemComponentProps | null>(null);

  const { currentUserFilter } = useAppSelector((state) => state.user);

  const {
    data: usersList = [],
    isLoading: isLoadingUsersList
  } = useGetAllUsersQuery();

  const {
    data: tasksStatuses,
    isLoading: isLoadingTasksStatuses
  } = useGetDefinedStatusesQuery();

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

  const [updateTask, { isLoading: isWaitingForTaskUpdate }] = useUpdateTaskMutation();


  useEffect(() => {
    if (tasksList && tasksStatuses) {
      const mappedList: {
        [key: string]: TaskItem[];
      } = {};
      tasksStatuses?.enum.forEach((status: keyof typeof mappedList) => {
        mappedList[status] = tasksList?.filter(
          (item) => item.status === status
        );
      }, {});
      setWorkflowStepsData(mappedList);
    }
  }, [tasksList, tasksStatuses]);

  const mappedTasksStatuses: WorkflowStep[] = useMemo(() => {
    if (
      !isLoadingTasksStatuses &&
      tasksStatuses &&
      IsArray(tasksStatuses?.enum)
    ) {
      return tasksStatuses?.enum.map((item, i) => ({
        id: item,
        label: `${
          tasksStatuses.default === item
            ? "New"
            : capitalizeFirstLetter(`${item}`)
        } Tasks`,
        shortLabel: capitalizeFirstLetter(`${item}`),
        color:
          i === 0
            ? blueGrey[600]
            : i === tasksStatuses?.enum.length - 1
            ? blue.A700
            : WorkFlowStepsColors[i],
        canAdd: tasksStatuses.default === item,
      }));
    }
    return [];
  }, [tasksStatuses]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function openItem(itemProps: WorkflowListItemComponentProps) {
    setCurrentModalItem({
      workItem: itemProps.item,
      workFlowSteps: mappedTasksStatuses,
      users: usersList,
    });
    setCurrentModalItemOpen(true);
  }

  function getCurrentDraggingItem(
    eventActiveItem: object | any
  ): WorkflowListItemComponentProps | null {
    if (
      eventActiveItem.data?.current &&
      eventActiveItem.data.current?.sortable
    ) {
      const containerId = eventActiveItem.data.current.sortable
        .containerId as keyof typeof workflowStepsData;

      if (
        Object.keys(workflowStepsData).includes(`${containerId}`) &&
        workflowStepsData[containerId]
      ) {
        const item: TaskItem | undefined = workflowStepsData[containerId].find(
          (item) => item._id === eventActiveItem.id
        );
        if (item) {
          return {
            item,
            workFlowStep:
              mappedTasksStatuses.find((step) => (item.status === step.id)) ||
              mappedTasksStatuses[0],
          };
        }
      }
    }
    return null;
  }
  function getContainerId(id: string | any) {
    if (Object.keys(workflowStepsData).includes(id)) return id;
    return Object.keys(workflowStepsData).find((key) =>
      workflowStepsData[key as keyof typeof workflowStepsData].find(
        (item) => item._id === id
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
        (item) => item._id === active.id
      );
      const overIndex = overItems.findIndex((item) => item._id !== over?.id);

      return {
        ...workflowSteps,
        [activeContainer]: [
          ...workflowSteps[activeContainer].filter(
            (item) => item._id !== active.id
          ),
        ],
        [overContainer]: [
          ...workflowSteps[overContainer].slice(0, overIndex),
          {
            ...workflowSteps[activeContainer][activeIndex],
            status: `${overContainer}`,
          },
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
    ].findIndex((task) => task._id === active.id);
    const overIndex = workflowStepsData[
      overContainerId as keyof typeof workflowStepsData
    ].findIndex((task) => task._id === over?.id);

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
    if (currentDragItem?.item && currentDragItem?.item.status !== overContainerId) {
      updateTask({
        status: overContainerId,
        param: {
          id : currentDragItem?.item._id
        }
      })
    }
    setCurrentDragItem(null);
  };
  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const isLoading =
    isLoadingTasksStatuses || isLoadingUsersList || isLoadingTasks || isWaitingForTaskUpdate;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Container fixed>
        <WorkFlowFilter />
        <Grid2
          className="workflow-devider-container"
          container
          spacing={mappedTasksStatuses.length}
        >
          {isLoading ? (
            <Box className="loading-overlay">
              <Loading />
            </Box>
          ) : (
            <></>
          )}
          {mappedTasksStatuses.map((workflowListItem) => {
            return (
              <WorkflowList
                key={workflowListItem.id}
                id={workflowListItem.id}
                workFlowItem={workflowListItem}
                workFlowTasks={
                  workflowStepsData[
                    workflowListItem.id as keyof typeof workflowStepsData
                  ] || []
                }
                itemOnClick={openItem}
              />
            );
          })}
          <DragOverlay dropAnimation={dropAnimation}>
            {currentDragItem ? (
              <WorkflowListItem
                key={`${currentDragItem.item?._id}_overlay`}
                {...currentDragItem}
              />
            ) : null}
          </DragOverlay>
        </Grid2>
        <WorkItemModal
          content={currentModalItem}
          open={currentModalItemOpen}
          onClose={() => {
            refetchTasks()
            setCurrentModalItemOpen(false)
          }}
        />
      </Container>
    </DndContext>
  );
}

import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable";
import Workflow from "./WorkFlow/WorkFlow";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function App() {
  const [activeDragItemId, setActiveDragItemId] = useState<any | null>(null);

  return (
    <>
      <div className="main">
        <Workflow />
        <DndContext
          onDragStart={(e) => setActiveDragItemId(e?.active?.id)}
          onDragEnd={() => setActiveDragItemId(null)}
        >
        </DndContext>
      </div>
    </>
  );
}

export default App;

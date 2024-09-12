import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable";

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
        <DndContext
          onDragStart={(e) => setActiveDragItemId(e?.active?.id)}
          onDragEnd={() => setActiveDragItemId(null)}
        >
          <Container fixed>
            <Box
              border="1px solid #def1fb"
              borderRadius={"0.5em"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5em 0",
                backgroundColor: "rgb(255 255 255 / 50%)",
              }}
            >
              <Masonry columns={4} spacing={2}>
                {heights.map((height, id) => (
                  <Draggable key={id} id={id}>
                    <Item key={id} sx={{ height }}>
                      Item {id + 1}
                    </Item>
                  </Draggable>
                ))}
              </Masonry>
              <DragOverlay>
                {activeDragItemId ? (
                  <Item key={activeDragItemId}>
                    Item {activeDragItemId + 1}
                  </Item>
                ) : null}
              </DragOverlay>
            </Box>
          </Container>
        </DndContext>
      </div>
    </>
  );
}

export default App;

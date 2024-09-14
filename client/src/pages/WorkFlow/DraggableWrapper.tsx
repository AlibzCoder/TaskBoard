import {useDraggable} from '@dnd-kit/core';
import { DraggableWrapperProps } from '../../types/compoentProps';



export default function DraggableWrapper(props : DraggableWrapperProps) {
  const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
    id: props.dragId,
    data: props.data,
  });
  
  return (
    <div style={isDragging ? {opacity : 0.25} : {}} ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
import { createContext } from "react";

interface UIContextProps {
  sidemenuOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  setIsAdding: (add: boolean) => void;
  handleStartDragging: () => void;
  handleEndDragging: () => void;
}

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

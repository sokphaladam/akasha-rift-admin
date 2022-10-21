import React from "react";

export interface DialogProps {
  isShow: boolean;
  content: React.ReactNode;
  confirmLabel?: string;
  title?: string;
  result?: boolean;
}

export const DialogContext = React.createContext<{
  dialog: DialogProps;
  setDialog: (e: DialogProps) => void;
}>({
  dialog: {
    isShow: false,
    content: <></>,
  },
  setDialog: (e: DialogProps) => {},
});

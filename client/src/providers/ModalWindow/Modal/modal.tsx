import React, { createContext, useCallback, useContext, useState } from 'react';
import { ModalWindow } from './ModalWindow';

export interface ModalWindowShowProps {
  onApply(value: any): boolean;
  title: string;
  dialogText?: string | React.ReactNode;
}

export interface ModalWindowInterface {
  show(confirmShowProps: ModalWindowShowProps): void;
  setData(data: any): void
}

type PropsType = {
  children: React.ReactNode;
}

const Context = createContext<ModalWindowInterface | undefined>(undefined);

export const ModalWindowProvider: React.FC<PropsType> = ({ children }) => {
  const [dialogParams, setdialogParams] = useState<ModalWindowShowProps | null>(null);
  const [data, setData] = useState();

  const handleClose = () => {
    setdialogParams(null);
  };

  const handleShow = useCallback((data: ModalWindowShowProps) => {
    setdialogParams(data);
  }, []);

  const handleApply = () => {
    if (dialogParams?.onApply(data) !== false)
      handleClose();
  };

  const params: ModalWindowInterface = {
    show: handleShow,
    setData
  };

  return (
    <Context.Provider value={params}>
      <ModalWindow
        onSuccess={handleApply}
        title={dialogParams?.title}
        backdrop="static"
        show={!!dialogParams}
        handleClose={handleClose}
        dialogText={dialogParams?.dialogText}
      />
      {children}
    </Context.Provider>
  );
};

export const useModalWindow = () => useContext(Context) as ModalWindowInterface;
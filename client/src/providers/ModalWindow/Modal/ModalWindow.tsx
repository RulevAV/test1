import { useEffect } from "react"

interface ModalProps {
  onSuccess(): void;
  title?: string;
  show: boolean;
  handleClose(): void;
  backdrop?: "static";
  dialogText?: string | React.ReactNode;
}

export const ModalWindow = ({ onSuccess, title, show, handleClose, backdrop, dialogText }: ModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        handleClose()
        break
    }
  }

  const onBackdrop = () => {
    if (!(backdrop === "static")) {
      handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!show) return null;

  return <div className="modal" onClick={onBackdrop}>
    <div className="modal-dialog" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <span className="modal-close" onClick={handleClose}>
          &times;
        </span>
      </div>
      <div className="modal-body">
        <div className="modal-content">{dialogText}</div>
      </div>
      <div className="modal-footer">
        <button onClick={onSuccess}>Сохранить</button>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    </div>
  </div>
}
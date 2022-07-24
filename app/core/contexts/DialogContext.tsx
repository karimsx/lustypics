import React, { useState } from 'react';
import { Dialog } from "@mui/material"

type ProviderContext = readonly [(option: DialogOption) => void, () => void]

const EMPTY_FUNC = () => {}
const DialogContext = React.createContext<ProviderContext>([EMPTY_FUNC, EMPTY_FUNC])
export const useDialog = () => React.useContext(DialogContext)

interface DialogParams {
  children: React.ReactNode
  disableEscapeKeyDown?: boolean
  fullScreen?: boolean
  onClose?: () => void
  onExited?: () => void
  open: boolean
}
type DialogOption = Omit<DialogParams, "open">
type DialogContainerProps = DialogParams & {
  onClose: () => void
}

function DialogContainer(props: DialogContainerProps) {
  const { children, open, onClose, ...other } = props

  return (
    <Dialog open={open} onClose={onClose} {...other}>
      {children}
    </Dialog>
  )
}

export interface DialogProviderProps {
  children: any
}

export default function DialogProvider({ children }: DialogProviderProps) {
  const [dialogs, setDialogs] = useState<DialogParams[]>([])
  const createDialog = (option: DialogOption) => {
    const dialog = { ...option, open: true }
    setDialogs((dialogs) => [...dialogs, dialog])
  }
  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop()
      if (!latestDialog) return dialogs
      if (latestDialog.onClose) latestDialog.onClose()
      return [...dialogs].concat({ ...latestDialog, open: false })
    })
  }
  const contextValue = React.useRef([createDialog, closeDialog] as const)

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => {
        const { onClose, ...dialogParams } = dialog
        return <DialogContainer key={i} onClose={closeDialog} {...dialogParams} />
      })}
    </DialogContext.Provider>
  )
}

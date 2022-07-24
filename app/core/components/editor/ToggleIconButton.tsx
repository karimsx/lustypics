import { IconButton } from '@mui/material'

export interface ToggleIconButtonProps {
  [k: string]: any
  children: any
  other?: any
  toggled: boolean
}

export const ToggleIconButton = ({
  children,
  toggled,
  ...other
}: ToggleIconButtonProps): JSX.Element => {
  return (
    <IconButton color={toggled ? 'primary' : undefined}  {...other}>
      {children}
    </IconButton>
  )
}

export default ToggleIconButton

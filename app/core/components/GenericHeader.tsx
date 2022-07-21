import { Box, Container, Typography, useTheme } from "@mui/material"

export interface GenericHeaderProps {
  primaryText: string
  secondaryText?: string
}

export const GenericHeader = ({ primaryText, secondaryText }: GenericHeaderProps) => {
  const theme = useTheme()

  return (
    <Box py={2} sx={{ backgroundColor: theme.palette.primary.light }}>
      <Container sx={{ color: "common.white" }}>
        <Typography mt={4} pb={1} variant="h3">
          {primaryText}
        </Typography>

        <Typography pb={3} variant="h6">
          {secondaryText}
        </Typography>
      </Container>
    </Box>
  )
}

// @mui
import { styled } from "@mui/material/styles"
import { Box, Card, Avatar, Divider, Typography, Stack } from "@mui/material"
// utils
import cssStyles from "../../core/utils/cssStyles"
import { fShortenNumber } from "../../core/utils/formatNumber"
// @types
// components
import Image from "../../core/components/Image"
import SocialsButton from "../../core/components/SocialsButton"
import SvgIconStyle from "../../core/components/SvgIconStyle"

// ----------------------------------------------------------------------

const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
}))

// ----------------------------------------------------------------------

type Props = {
  user: any,
  showBio?: boolean
}

export default function UserCard({ user, showBio }: Props) {
  const { name, cover, bio, follower, totalPost, avatarUrl, following } = user

  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: "auto",
            position: "absolute",
            color: "background.paper",
          }}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />
        <OverlayStyle />
        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {name}
      </Typography>

      {showBio && <Typography mb={2} variant="body2" sx={{ mx: 2, color: "text.secondary" }}>
        {bio}
      </Typography>}




      <Divider sx={{ borderStyle: "dashed" }} />

      <Box sx={{ py: 3, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: "text.disabled" }}>
            Follower
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: "text.disabled" }}>
            Following
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(following)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: "text.disabled" }}>
            Total Galleries
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(totalPost)}</Typography>
        </div>
      </Box>
    </Card>
  )
}

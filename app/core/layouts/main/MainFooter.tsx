// next
import NextLink from "next/link"
// @mui
import { styled } from "@mui/material/styles"
import { Grid, Link, Divider, Container, Typography, Stack } from "@mui/material"
// routes
import { PATH_PAGE } from "../../routes/paths"
// components
import Logo from "../../components/Logo"
import SocialsButton from "../../components/SocialsButton"

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: "Get in touch",
    children: [
      { name: "About us", href: PATH_PAGE.about },
      { name: "Contact us", href: PATH_PAGE.contact },
      { name: "FAQs", href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: "Legal",
    children: [
      { name: "Terms and Condition", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Child Protection", href: "#" },
      { name: "Addiction help", href: "#" },

    ],
  },
  {
    headline: "Contact",
    children: [
      { name: "lustypics@protonmail.com", href: "#" },
    ],
  },
]

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
}))

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography color={"primary"} variant={"h3"}> LustyPics </Typography>
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              The next generation adult image sharing, for all your desires <br/>
              The best and hight resolution  amateur, professional, fetish, and all other categories available on lustypic.com
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <NextLink key={link.name} href={link.href} passHref>
                      <Link color="inherit" variant="body2" sx={{ display: "block" }}>
                        {link.name}
                      </Link>
                    </NextLink>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          © 2021. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  )
}

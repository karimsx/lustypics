import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "app/blitz-client"
import PrimaryAppBar from "app/core/components/AppBar"
import { TabsContext } from "@mui/base"
import "./main.css"
// import styles
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"
import NotistackProvider from "app/core/components/NotistackProvider"
import ThemeProvider from "app/core/theme"
import { MotionLazyContainer } from "app/core/components/animate"
import ThemeColorPresets from "app/core/components/ThemeColorPresets"
import ThemeLocalization from "app/core/components/ThemeLocalization"
import RtlLayout from "app/core/components/RtlLayout"
import { ChartStyle } from "app/core/components/chart"
import Settings from "app/core/components/settings"
import ProgressBar from "app/core/components/ProgressBar"
import DialogProvider from "app/core/contexts/DialogContext"
import { QueryClient } from "@blitzjs/rpc"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <ThemeProvider>
        <NotistackProvider>
          <MotionLazyContainer>
            <ThemeColorPresets>
              <ThemeLocalization>
                <RtlLayout>
                  <ChartStyle />
                  <Settings />
                  <ProgressBar />

                  <DialogProvider>
                    <PrimaryAppBar />

                    <Component {...pageProps} />
                  </DialogProvider>
                </RtlLayout>
              </ThemeLocalization>
            </ThemeColorPresets>
          </MotionLazyContainer>
        </NotistackProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)

// contexts/trackers.jsx

import React, {useState, useEffect, createContext} from 'react';
import Router from 'next/router'
import ReactGA from "react-ga";
import useAuth from "../hooks/useAuth";

const TrackingID = 'G-04PTG4FY21';
const TrackingContext = createContext({});

function TrackingProvider(props: any) {
  const { userIdThatMightChange } = props
  const { user } = useAuth()


  const [analytics, setAnalytics] = useState({
    isInitialized: false,
    hasUser: false,
    trackers: ['myDefaultTracker']
  })

  const handleRouteChange = (url: string)  => {
    ReactGA.set({ page:  url }, analytics.trackers);
    ReactGA.pageview(url, analytics.trackers);
  };

  useEffect(() => {
    const { isInitialized, hasUser, trackers } = analytics


    if (!isInitialized) {
      ReactGA.initialize(TrackingID, {
        gaOptions: {
          userId: user?.id,
        }
      })

      Router.events.on('routeChangeComplete', handleRouteChange);
      setAnalytics(prev  => ({
        ...prev,
        isInitialized:  true,
        hasUser:  Boolean(user?.id)
      }));

    } else if (isInitialized && !hasUser) {
      ReactGA.set({ userId: user?.id }, trackers)

      setAnalytics(prev  => ({
        ...prev,
        hasUser:  Boolean(user?.id)
      }));
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [userIdThatMightChange])

  return <TrackingContext.Provider {...props} />
}

const  useTracking = () =>  React.useContext(TrackingContext);

export { TrackingProvider, useTracking };

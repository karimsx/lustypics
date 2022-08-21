import { Swiper as SwiperElement, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Controller, A11y, Keyboard, Swiper } from "swiper"

import "swiper/css"
import { Box, IconButton } from "@mui/material"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { useEffect, useState } from "react"
import { Close } from "@mui/icons-material"

export const FullScreenSwiper = ({ children, hidden, onClose, currentIndex }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [swiper, setSwiper] = useState<Swiper>()

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey, false)
    return () => document.removeEventListener("keydown", handleEscapeKey, false)
  }, [])

  useEffect(() => {
    if (swiper && currentIndex >= 0) {
      swiper.slideTo(currentIndex)
    }
  }, [swiper, currentIndex])

  const handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
      onClose()
    }
  }

  return (
    <Box
      sx={{
        position: "absolute",
        opacity: hidden ? 0 : 1,
        display: hidden ? "none" : "block",
        top: 0,
        left: 0,
        zIndex: 10,
        p: 0,
        m: 0,
        backgroundColor: "rgba(0,0,0,.9)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", right: 10, top: 10, zIndex: 11 }}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <SwiperElement
        modules={[Navigation, Pagination, A11y, Keyboard]}
        style={{
          width: "calc(100vw - 15px)",
          height: "100vh",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        navigation
        keyboard
        pagination
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {children}
      </SwiperElement>
    </Box>
  )
}

export default FullScreenSwiper

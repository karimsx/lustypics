import { useTranslation } from "react-i18next"
// @mui
import { enUS, deDE, frFR } from "@mui/material/locale"

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg",
  },
  {
    label: "German",
    value: "de",
    systemValue: deDE,
    icon: "https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg",
  },
  {
    label: "French",
    value: "fr",
    systemValue: frFR,
    icon: "https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg",
  },
]

export default function useLocales() {
  const { i18n, t: translate } = useTranslation()
  let currentLang
  let langStorage

  if (typeof window !== "undefined") {
    langStorage = localStorage.getItem("i18nextLng")
  }

  currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1]

  const handleChangeLanguage = async (newlang: string) => {
    await i18n.changeLanguage(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  }
}

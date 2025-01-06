import { type Handle, redirect, type RequestEvent } from "@sveltejs/kit"
import { initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors"
import type { Locales } from "$i18n/i18n-types.js"
import { detectLocale, i18n, isLocale } from "$i18n/i18n-util"
import { loadAllLocales } from "$i18n/i18n-util.sync"
import * as i18nUtils from "$i18n/utils"

loadAllLocales()

const L = i18n()

function getPreferredLocale({ request, cookies }: RequestEvent): Locales {
    const locale = i18nUtils.getLocaleFromCookie(cookies)

    if (locale && isLocale(locale)) return locale

    return detectLocale(initAcceptLanguageHeaderDetector(request))
}

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.locale = "fr"
    event.locals.LL = L.fr

    const { locale: currentLocale, rest: pathname } = i18nUtils.getCurrentLocale(event)

    if (!currentLocale || !currentLocale && !event.url.pathname.startsWith('/[lang]'))
        throw redirect(307, `/${getPreferredLocale(event)}/dashboard`)

    if (!isLocale(currentLocale))
        throw redirect(307, `/${getPreferredLocale(event)}/${currentLocale}/${pathname || ""}`)


    const locale = currentLocale || getPreferredLocale(event)

    event.locals.locale = locale
    event.locals.LL = L[locale]
    return resolve(event, { transformPageChunk: ({ html }) => html.replace("%lang%", locale) })
}
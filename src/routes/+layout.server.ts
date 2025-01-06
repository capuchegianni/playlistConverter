import type { LayoutServerLoad } from './$types'
import * as i18nUtils from "$i18n/utils";

export const load: LayoutServerLoad = ({ locals: { locale }, cookies }) => {
    i18nUtils.setLocaleCookie(locale, cookies)

    return { locale }
}
import type { RequestEvent, Cookies } from "@sveltejs/kit";
import { base } from "$app/paths";

export function setLocaleCookie(locale: string, cookies: Cookies) {
    cookies.set("locale", locale, { path: "/", expires: new Date("9999-12-31"), secure: false });
}

export function getLocaleFromCookie(cookies: Cookies): string | undefined {
    return cookies.get("locale");
}

type ParsedPathname = {
    locale?: string;
    rest?: string;
};

function parsePathname(url: URL): ParsedPathname {
    const [, locale, ...rest] = url.pathname.replace(new RegExp(`^${base}`), "").split("/");

    return { locale, rest: rest.join("/") + url.search };
}

export function getCurrentLocale({ url }: RequestEvent): ParsedPathname {
    return parsePathname(url);
}

export function replaceLocaleInUrl(url: URL, locale: string): string {
    url.search = "";

    const newPathname = `/${locale}/${parsePathname(url).rest || ""}`;
    const newUrl = new URL(url.toString());

    newUrl.pathname = base + newPathname;
    return newUrl.toString();
}

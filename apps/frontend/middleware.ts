import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { i18n } from "./i18n-config";

acceptLanguage.languages(i18n.locales);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next|graphql/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export function middleware(req: any) {

  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = i18n.defaultLocale;

  // Redirect if lng in path is not supported
  if (
    !i18n.locales.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = i18n.locales.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer)
      response.cookies.set(cookieName as any, lngInReferer as any);
    return response;
  }

  return NextResponse.next();
}

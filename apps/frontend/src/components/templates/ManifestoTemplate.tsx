"use client";

import { Manifesto } from "../client/features/Manifesto";
import { CheckSync } from "../client/features/CheckSync";
import { Suspense } from "react";
import { LanguagesDropdown } from "../client/features/LanguagesDropdown";
import { ErrorBoundary } from "react-error-boundary";
import { GET_LANGUAGES_QUERY } from "../../requests/queries/getLanguagesListQuery";
import { useBackgroundQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_MANIFEST_VERSIONS_COMPARISON } from "../../requests/queries/getManifestVersionsComparisonQuery";
import { i18n } from "../../../i18n-config";
import { GET_MANIFEST_TEXT } from "../../requests/queries/getManifestTextQuery";

export const ManifestoTemplate = ({ lang }: any) => {
  const [languagesQuery] = useBackgroundQuery(GET_LANGUAGES_QUERY, {
    queryKey: `languages-${lang}`,
    fetchPolicy: "cache-first",
  });

  const [manifestoVersionsComparisonQuery] = useBackgroundQuery(
    GET_MANIFEST_VERSIONS_COMPARISON,
    {
      queryKey: `manifestoVersions-${lang}`,
      variables: {
        locale: lang as any,
        defaultLocale: i18n.defaultLocale as any,
      },
      fetchPolicy: "cache-first",
    }
  );

  const [manifestTextQuery, { refetch: refetchManifestoText }] =
    useBackgroundQuery(GET_MANIFEST_TEXT, {
      queryKey: `manifestText-${lang}`,
      variables: {
        locale: lang as any,
      },
      fetchPolicy: "cache-first",
    });

  return (
    <div className="flex flex-col">
      <div className="z-11 mb-6 w-full items-start justify-between font-mono lg:mb-4 lg:flex">
        <div className="w-auto items-center justify-start gap-3 lg:flex">
          <ErrorBoundary
            fallback={<div className="text-xxs text-black">Couldnt load data</div>}
          >
            <Suspense fallback={<div className="text-xxs text-black">Loading...</div>}>
              <LanguagesDropdown lang={lang} queryRef={languagesQuery} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<div>Couldnt load data</div>}>
            <Suspense fallback={<div className="text-xxs text-black">Loading...</div>}>
              <CheckSync
                lang={lang}
                queryRef={manifestoVersionsComparisonQuery}
                refetchManifestoText={refetchManifestoText}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <div className="z-5 mb-4 flex flex-col gap-4 pt-4">
        {lang === "en" && (
          <div className="mb-4 flex">
            <div className="markdown-body">
              <p>
                We are pleased to introduce a collaborative manifesto, which
                provides an opportunity for individuals to contribute their
                ideas and insights to the decentralization concept. We also
                extend an invitation to artists to offer their perspectives on
                how tokenomics can be implemented and how the business can be
                structured to accommodate their specific requirements. This
                collaborative approach aims to facilitate the development of a
                decentralized framework that aligns effectively with the needs
                and expectations of both contributors and artists.
              </p>
              <p>
                If you want{" "}
                <a href="https://github.com/syncArt/manifesto"> collaborate</a>{" "}
                and you&quot;re not familiar with github click{" "}
                <a href="https://www.loom.com/share/955fdcb13424487eaeebe297a13b8aa5?sid=dbc89fca-c591-4c33-adaa-bf9c50655e18">
                  {" "}
                  here
                </a>{" "}
                for a tutorial
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <p className="mb-0 flex text-xs font-bold text-black">MANIFESTO:</p>
          <div className="flex rounded-md bg-[#D9D9D9] px-8 py-10">
            <ErrorBoundary fallback={<div>Couldnt load data</div>}>
              <Suspense fallback={<div className="text-black">Loading...</div>}>
                <Manifesto queryRef={manifestTextQuery} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

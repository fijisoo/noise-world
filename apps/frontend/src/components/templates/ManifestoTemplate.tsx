import { Suspense } from "react";
import { LanguagesDropdown } from "../client/features/LanguagesDropdown";
import { ErrorBoundary } from "react-error-boundary";

import dynamic from "next/dynamic";
import { getManifestoDiff } from "../../requests/actions/getManifestoDiff";
import { getLanguages } from "../../requests/actions/getLanguages";
import { getManifestoText } from "../../requests/actions/getManifestoText";
import { CheckSync } from "../client/features/CheckSync";
import { patchManifestoAndRevalidate } from "../../requests/actions/patchManifestoAndRevalidate";

const Manifesto = dynamic(() =>
  import("../client/features/Manifesto").then((data) => data.Manifesto)
);

export const ManifestoTemplate = async ({ lang }: any) => {
  const manifestoDiffData = getManifestoDiff({ lang });
  const languagesData = getLanguages();
  const manifestoData = getManifestoText({ lang });

  const [manifestoDiff, languages, manifesto] = await Promise.all([
    manifestoDiffData,
    languagesData,
    manifestoData,
  ]);

  return (
    <div className="flex flex-col">
      <div className="z-11 mb-6 w-full items-start justify-between font-mono lg:mb-4 lg:flex">
        <div className="w-auto items-center justify-start gap-3 lg:flex">
          <LanguagesDropdown languages={languages} lang={lang} />
          <CheckSync
            manifestoDiff={manifestoDiff}
            lang={lang}
            patchManifestoAndRevalidate={patchManifestoAndRevalidate}
          />
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
                <Manifesto manifesto={manifesto} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

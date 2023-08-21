"use client";

import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { i18n } from "../../../i18n-config";
import { useState } from "react";

export default function CheckSync({
  lang,
  queryRef,
  refetchManifestoText,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useReadQuery(queryRef);

  const toExtract = data as any;

  const { enManifesto: enManifestoData, xManifesto: xManifestoData } =
    toExtract || { enManifesto: null, xManifesto: null };

  const ejectFromData = (data: any) => {
    return data?.data?.[0]?.attributes?.version;
  };

  const enManifestoVersion = ejectFromData(enManifestoData);
  const xManifestoVersion = ejectFromData(xManifestoData);

  const handleSync = async () => {
    setIsLoading(true);
    await fetch(
      `https://noise-world-lambdas-vercel.vercel.app/api/functions/pushManifestIntlToStrapi?locale=${lang}`
    ).then((data) => {
      refetchManifestoText();
      setIsLoading(false);
    });
  };

  const checkIfStale = xManifestoVersion !== enManifestoVersion;

  if (lang === i18n.defaultLocale) {
    return (
      <div className="ml-4 inline-block">
        <a target="_blank" href="https://github.com/syncArt/manifesto">
          Collaborate
        </a>
      </div>
    );
  }

  return (
    <div className="ml-4 inline-block">
      {checkIfStale ? (
        <button onClick={handleSync}>
          {isLoading ? "please wait..." : "sync!"}
        </button>
      ) : (
        <p>is synced</p>
      )}
    </div>
  );
}

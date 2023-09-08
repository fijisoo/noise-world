"use client";

import { useState } from "react";
import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { i18n } from "../../../../i18n-config";

export const CheckSync = ({ lang, queryRef, refetchManifestoText }: any) => {
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
      `${process.env.NEXT_PUBLIC_API_FUNCTIONS_URL}pushManifestIntlToStrapi?locale=${lang}`
    ).then((data) => {
      refetchManifestoText();
      setIsLoading(false);
    });
  };

  const checkIfStale = xManifestoVersion !== enManifestoVersion;

  if (lang === i18n.defaultLocale) {
    return (
      <div className="ml-4 inline-block text-xs font-bold">
        <a target="_blank" href="https://github.com/syncArt/manifesto">
          Collaborate
        </a>
      </div>
    );
  }

  return (
    <div className="text-xs ml-4 inline-block">
      {checkIfStale ? (
        <button onClick={handleSync}>
          {isLoading ? "please wait..." : "sync!"}
        </button>
      ) : (
        <p>is synced</p>
      )}
    </div>
  );
};

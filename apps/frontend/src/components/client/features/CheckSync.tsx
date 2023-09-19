"use client";

import { useState } from "react";
import { i18n } from "../../../../i18n-config";

export const CheckSync = ({
  manifestoDiff,
  lang,
  patchManifestoAndRevalidate,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const data = manifestoDiff?.data;

  const { enManifesto: enManifestoData, xManifesto: xManifestoData } = data || {
    enManifesto: null,
    xManifesto: null,
  };

  const ejectFromData = (data: any) => {
    return data?.data?.[0]?.attributes?.version;
  };

  const enManifestoVersion = ejectFromData(enManifestoData);
  const xManifestoVersion = ejectFromData(xManifestoData);

  const handleSync = async () => {
    setIsLoading(true);
    await patchManifestoAndRevalidate({
      lang,
    }).then(() => {
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
    <div className="ml-4 inline-block text-xs">
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

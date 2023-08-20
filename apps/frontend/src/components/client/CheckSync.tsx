"use client";

import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { i18n } from "../../../i18n-config";

export default function CheckSync({
  lang,
  queryRef,
  refetchManifestoText,
}: any) {
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
    await fetch(
      `https://noise-world-lambdas-vercel.vercel.app/api/functions/pushManifestIntlToStrapi?locale=${lang}`
    ).then((data) => {
      refetchManifestoText();
      console.log("xxx", data);
    });
  };

  const checkIfStale = xManifestoVersion !== enManifestoVersion;

  if (lang === i18n.defaultLocale) {
    return (
      <div>
        <a target="_blank" href="https://github.com/syncArt/manifesto">
          Collaborate
        </a>
      </div>
    );
  }

  return (
    <div>
      {checkIfStale ? (
        <button onClick={handleSync}>sync!</button>
      ) : (
        <p>is synced</p>
      )}
    </div>
  );
}

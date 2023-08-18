"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_MANIFEST_VERSIONS_COMPARISON } from "../../requests/queries/getManifestVersionsComparisonQuery";
import { i18n } from "../../../i18n-config";

export default function CheckSync({ lang }: any) {
  const langVar = lang || i18n.defaultLocale;

  const data = useSuspenseQuery(GET_MANIFEST_VERSIONS_COMPARISON, {
    variables: {
      locale: langVar as any,
      defaultLocale: i18n.defaultLocale as any,
    },
    skip: !langVar,
  });

  const { enManifesto: enManifestoData, xManifesto: xManifestoData } = (
    data as any
  )?.data;

  const ejectFromData = (data: any) => {
    return data?.data?.[0]?.attributes?.version;
  };

  const enManifestoVersion = ejectFromData(enManifestoData);
  const xManifestoVersion = ejectFromData(xManifestoData);

  const handleSync = async () => {
    const x = await fetch(
      `https://noise-world-lambdas.vercel.app/api/functions/pushManifestIntlToStrapi?locale=${lang}`
    );

    console.log("xxx", x);
  };

  const checkIfStale = xManifestoVersion !== enManifestoVersion;

  return (
    <div>
      {checkIfStale ? (
        <button onClick={handleSync}>Sync!</button>
      ) : (
        <p>is synced</p>
      )}
    </div>
  );
}

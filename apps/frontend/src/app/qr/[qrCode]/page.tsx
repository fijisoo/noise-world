import { QrCodeTemplate } from "../../../components/templates/QrCodeTemplate";

export default async function Page({ params: { qrCode } }: any) {
  return <QrCodeTemplate qrCode={qrCode} />;
}

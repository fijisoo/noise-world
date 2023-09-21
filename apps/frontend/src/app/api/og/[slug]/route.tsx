import { NextRequest, ImageResponse } from "next/server";
import { getBlogPost } from "../../../../requests/actions/getBlogPost";

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { pathname } = url;
  const slug = pathname.split("/")[3];
  const id = slug.slice("-s:" as any)[0];
  const { data } = await getBlogPost({ id: id });

  const {
    title,
    featuredImage,
    ogImageExternalUrl,
    ogImageInternalUrl: ogImageInternal,
  } = (data as any)?.strapi_blog?.data?.attributes;
  const featuredImageUrl = featuredImage?.data?.attributes?.url;
  const ogImageInternalUrl = ogImageInternal?.data?.attributes?.url;

  if (!slug) {
    return new ImageResponse(<>{"THIS PAGE DOES NOT EXIST"}</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={ogImageExternalUrl || ogImageInternalUrl || featuredImageUrl}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />
        <svg
          style={{
            zIndex: 2,
          }}
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2000_229)">
            <rect width="1200" height="630" fill="none" />
            <path d="M601.5 0H1200V632H839L601.5 0Z" fill="#E8FF3E" />
            <path
              d="M773.35 90.547L755.562 72.8022L773.35 42L791.138 72.8022L773.35 90.547Z"
              fill="black"
            />
            <path
              d="M722 135.076L748.179 90.547L765.967 108.292V135.076H722Z"
              fill="black"
            />
            <path
              d="M801.207 91.4707L783.419 109.215V136H827.386L801.207 91.4707Z"
              fill="black"
            />
            <path
              d="M1073.12 88.2306H1060.66C1060.43 86.6196 1059.97 85.1886 1059.27 83.9377C1058.57 82.6678 1057.66 81.5875 1056.57 80.6967C1055.47 79.8059 1054.2 79.1235 1052.75 78.6497C1051.33 78.1759 1049.79 77.939 1048.12 77.939C1045.1 77.939 1042.48 78.6876 1040.24 80.1849C1038 81.6633 1036.27 83.824 1035.04 86.6669C1033.8 89.491 1033.19 92.9215 1033.19 96.9586C1033.19 101.109 1033.8 104.597 1035.04 107.421C1036.29 110.245 1038.03 112.377 1040.27 113.817C1042.51 115.258 1045.09 115.978 1048.03 115.978C1049.68 115.978 1051.21 115.76 1052.61 115.324C1054.03 114.888 1055.29 114.253 1056.39 113.419C1057.49 112.567 1057.64 112.526 1059.07 110.648C1059.94 109.496 1061.12 107.012 1061.12 107.012L1070.78 113.913C1069.19 116.472 1067.42 113.751 1070.7 113.96C1069.43 116.424 1067.71 118.632 1065.55 120.584C1063.41 122.517 1060.85 124.052 1057.87 125.189C1054.92 126.308 1051.57 126.867 1047.83 126.867C1042.64 126.867 1037.99 125.692 1033.9 123.341C1029.82 120.991 1026.6 117.589 1024.23 113.135C1021.88 108.681 1020.7 103.289 1020.7 96.9586C1020.7 90.6092 1021.9 85.2075 1024.28 80.7535C1026.67 76.2995 1029.92 72.9069 1034.01 70.5756C1038.11 68.2254 1042.71 67.0503 1047.83 67.0503C1051.21 67.0503 1054.34 67.5242 1057.22 68.4718C1060.12 69.4195 1062.69 70.8031 1064.93 72.6226C1067.16 74.4231 1068.98 76.6312 1070.39 79.2467C1071.81 81.8623 1072.72 84.8569 1073.12 88.2306Z"
              fill="black"
            />
            <path
              d="M1060.69 88.1669H1073.14C1073.37 89.7779 1073.84 91.2089 1074.54 92.4598C1075.24 93.7297 1076.14 94.81 1077.24 95.7008C1078.34 96.5916 1079.61 97.2739 1081.05 97.7478C1082.47 98.2216 1084.02 98.4585 1085.69 98.4585C1088.7 98.4585 1091.33 97.7099 1093.56 96.2126C1095.8 94.7342 1097.54 92.5735 1098.77 89.7306C1100 86.9065 1100.62 83.476 1100.62 79.4389C1100.62 75.2882 1100 71.8008 1098.77 68.9768C1097.52 66.1527 1095.77 64.0205 1093.54 62.58C1091.3 61.1396 1088.71 60.4194 1085.77 60.4194C1084.12 60.4194 1082.6 60.6373 1081.19 61.0732C1079.77 61.5092 1078.51 62.1441 1077.41 62.978C1076.31 63.8309 1076.16 63.8712 1074.73 65.7495C1073.87 66.9013 1072.68 69.385 1072.68 69.385L1063.02 62.4847C1064.61 59.9251 1066.38 62.6464 1063.1 62.4379C1064.37 59.974 1066.09 57.7659 1068.25 55.8137C1070.39 53.8805 1072.95 52.3453 1075.93 51.2081C1078.89 50.0898 1082.24 49.5307 1085.97 49.5307C1091.17 49.5307 1095.81 50.7058 1099.91 53.056C1103.98 55.4062 1107.21 58.8083 1109.58 63.2623C1111.93 67.7164 1113.1 73.1086 1113.1 79.4389C1113.1 85.7883 1111.91 91.19 1109.52 95.644C1107.13 100.098 1103.89 103.491 1099.79 105.822C1095.7 108.172 1091.09 109.347 1085.97 109.347C1082.6 109.347 1079.47 108.873 1076.58 107.926C1073.68 106.978 1071.11 105.594 1068.88 103.775C1066.64 101.974 1064.82 99.7663 1063.42 97.1508C1061.99 94.5352 1061.08 91.5406 1060.69 88.1669Z"
              fill="black"
            />
            <path
              d="M886.536 84.6511C886.309 82.3577 885.332 80.5761 883.607 79.3063C881.881 78.0364 879.54 77.4015 876.582 77.4015C874.572 77.4015 872.875 77.6858 871.491 78.2544C870.107 78.804 869.045 79.5716 868.305 80.5572C867.585 81.5428 867.225 82.661 867.225 83.9119C867.187 84.9543 867.405 85.8641 867.879 86.6412C868.372 87.4183 869.045 88.0911 869.898 88.6597C870.751 89.2093 871.737 89.6927 872.856 90.1096C873.975 90.5076 875.169 90.8488 876.44 91.1331L881.673 92.384C884.214 92.9526 886.546 93.7107 888.669 94.6584C890.793 95.6061 892.632 96.7717 894.187 98.1553C895.742 99.5389 896.946 101.169 897.799 103.045C898.671 104.922 899.117 107.073 899.136 109.499C899.117 113.062 898.207 116.151 896.405 118.767C894.623 121.364 892.044 123.382 888.669 124.822C885.313 126.244 881.265 126.955 876.525 126.955C871.823 126.955 867.727 126.235 864.238 124.794C860.768 123.354 858.057 121.221 856.104 118.397C854.17 115.554 853.156 112.039 853.061 107.85H864.978C865.11 109.802 865.67 111.432 866.656 112.74C867.661 114.029 868.997 115.005 870.666 115.668C872.353 116.312 874.259 116.635 876.383 116.635C878.468 116.635 880.279 116.331 881.815 115.725C883.37 115.118 884.574 114.275 885.427 113.195C886.28 112.114 886.707 110.873 886.707 109.47C886.707 108.163 886.318 107.063 885.541 106.172C884.782 105.282 883.664 104.524 882.185 103.898C880.725 103.273 878.933 102.704 876.809 102.192L870.467 100.6C865.556 99.4062 861.679 97.5393 858.834 94.9996C855.99 92.4598 854.578 89.0388 854.597 84.7364C854.578 81.2111 855.516 78.1312 857.412 75.4967C859.327 72.8622 861.953 70.8057 865.291 69.3274C868.628 67.849 872.42 67.1099 876.667 67.1099C880.99 67.1099 884.763 67.849 887.987 69.3274C891.229 70.8057 893.751 72.8622 895.552 75.4967C897.353 78.1312 898.283 81.1826 898.339 84.6511H886.536Z"
              fill="black"
            />
            <path
              d="M904.006 67.9059H917.8L931.082 92.981H931.651L944.933 67.9059H958.727L937.482 105.547V126.13H925.252V105.547L904.006 67.9059Z"
              fill="black"
            />
            <path
              d="M1014.17 67.9059V126.13H1003.54L978.196 89.4842H977.769V126.13H965.454V67.9059H976.262L1001.4 104.524H1001.92V67.9059H1014.17Z"
              fill="black"
            />
            <path
              d="M1115.01 106.116V62.4474H1126.75V70.0666H1127.21C1128 67.3563 1129.34 65.3093 1131.22 63.9257C1133.09 62.5232 1135.26 61.8219 1137.7 61.8219C1138.31 61.8219 1138.96 61.8598 1139.66 61.9356C1140.37 62.0114 1140.98 62.1157 1141.51 62.2484V72.9948C1140.94 72.8243 1140.16 72.6726 1139.15 72.54C1138.15 72.4073 1137.23 72.341 1136.39 72.341C1134.61 72.341 1133.02 72.7295 1131.62 73.5066C1130.23 74.2647 1129.13 75.3261 1128.32 76.6907C1127.52 78.0554 1127.12 79.6285 1127.12 81.4101V106.116H1115.01Z"
              fill="black"
            />
            <path
              d="M1173.2 62.4474V71.5449H1146.9V62.4474H1173.2ZM1152.87 51.9852H1164.98V92.6967C1164.98 93.815 1165.15 94.6868 1165.5 95.3123C1165.84 95.9188 1166.31 96.3452 1166.92 96.5916C1167.54 96.838 1168.26 96.9612 1169.08 96.9612C1169.65 96.9612 1170.22 96.9138 1170.79 96.8191C1171.35 96.7054 1171.79 96.6201 1172.09 96.5632L1174 105.575C1173.39 105.765 1172.54 105.983 1171.44 106.229C1170.34 106.495 1169 106.656 1167.43 106.713C1164.51 106.826 1161.95 106.438 1159.75 105.547C1157.57 104.656 1155.87 103.273 1154.66 101.396C1153.45 99.5199 1152.85 97.1508 1152.87 94.2888V51.9852Z"
              fill="black"
            />
            <path
              d="M1086.39 91.5998C1083.75 91.5998 1081.54 90.6964 1079.77 88.8895C1077.99 87.0479 1077.07 84.824 1077 82.218C1076.97 79.6119 1077.89 77.4402 1079.77 75.7028C1081.64 73.9307 1083.85 73.0446 1086.39 73.0446C1088.96 73.0446 1091.19 73.948 1093.06 75.7549C1094.94 77.5618 1095.84 79.7161 1095.77 82.218C1095.74 83.9553 1095.29 85.5364 1094.42 86.961C1093.58 88.3857 1092.45 89.515 1091.03 90.3489C1089.64 91.1829 1088.09 91.5998 1086.39 91.5998Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_2000_229">
              <rect width="1200" height="630" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div
          style={{
            position: "absolute",
            right: 20,
            bottom: 4,
            zIndex: 3,
            fontWeight: "bold",
          }}
        >
          NEW BLOG POST
        </div>
        <div
          style={{
            position: "absolute",
            right: 25,
            maxWidth: 400,
            fontSize: "34px",
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "right",
            top: 170,
            zIndex: 3,
            fontWeight: "900",
            outline: "1px solid black",
            strokeWidth: "1px",
            stroke: "black",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

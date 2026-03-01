import { Font } from "@react-pdf/renderer";

export function registerFonts() {
  Font.register({
    family: "Noto Sans JP",
    fonts: [
      {
        src: "https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Regular.otf",
        fontWeight: "normal",
      },
      {
        src: "https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Bold.otf",
        fontWeight: "bold",
      },
    ],
  });
}

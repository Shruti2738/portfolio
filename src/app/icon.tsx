import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#5E233C",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#CDBF98",
          fontWeight: 900,
          fontFamily: "sans-serif",
          borderRadius: 2,
        }}
      >
        SR
      </div>
    ),
    {
      ...size,
    }
  );
}

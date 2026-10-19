import { ImageResponse } from "next/og";

export const alt = "Shruti Ravikumar - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#5E233C",
          color: "#CDBF98",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "360px",
            height: "100%",
            backgroundColor: "#533B26",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "24px",
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "4px",
              backgroundColor: "#886945",
            }}
          />
          <span>B.Tech CSE · IIITDM Kancheepuram</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h1
            style={{
              fontSize: "96px",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            SHRUTI
            <br />
            RAVIKUMAR
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#EFE8D2",
              margin: "24px 0 0 0",
              maxWidth: "800px",
            }}
          >
            Building systems that see, think, and ship.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #886945",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#EFE8D2",
          }}
        >
          <span>AI · Computer Vision · Robotics · DevOps</span>
          <span>shrutirj307@gmail.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

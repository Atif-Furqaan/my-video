import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Background = () => {
  const frame = useCurrentFrame();

  const orb1X = 160 + Math.sin(frame / 90) * 80;
  const orb1Y = 180 + Math.cos(frame / 120) * 60;
  const orb2X = 940 + Math.cos(frame / 100) * 100;
  const orb2Y = 440 + Math.sin(frame / 80) * 80;
  const orb3X = 600 + Math.sin(frame / 110 + 1) * 100;
  const orb3Y = 550 + Math.cos(frame / 95) * 70;

  return (
    <AbsoluteFill style={{ backgroundColor: "#06060f", overflow: "hidden" }}>
      {/* Subtle dot grid for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Purple orb — drifts top-left */}
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.48) 0%, transparent 70%)",
          left: orb1X - 310,
          top: orb1Y - 310,
          filter: "blur(55px)",
        }}
      />

      {/* Cyan orb — drifts right */}
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.28) 0%, transparent 70%)",
          left: orb2X - 360,
          top: orb2Y - 360,
          filter: "blur(62px)",
        }}
      />

      {/* Indigo orb — drifts bottom-center */}
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
          left: orb3X - 260,
          top: orb3Y - 260,
          filter: "blur(50px)",
        }}
      />
    </AbsoluteFill>
  );
};

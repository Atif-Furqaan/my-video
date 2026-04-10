import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SubtitleLine } from "../SubtitleLine";

const LINE1 = ["FOLLOW", "FOR", "MORE"];
const LINE2 = ["SPACE", "FACTS"];

export const OutroScene = () => {
  const frame = useCurrentFrame();

  // Gentle breathing pulse on the whole block
  const pulse = 1 + Math.sin(frame / 14) * 0.013;

  // Tagline fades up after main words
  const taglineOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const taglineY = interpolate(frame, [55, 75], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Glowing ring pulse behind the text block
  const ringOpacity = interpolate(frame, [20, 45], [0, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/outro.wav")} volume={0.9} />

      {/* Soft glow ring behind words */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, transparent 70%)",
          opacity: ringOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* "FOLLOW FOR MORE" */}
      <div
        style={{
          display: "flex",
          gap: 28,
          transform: `scale(${pulse})`,
        }}
      >
        {LINE1.map((word, i) => {
          const delay = i * 7;
          const wordOpacity = interpolate(
            frame,
            [delay, delay + 20],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          const wordY = interpolate(frame, [delay, delay + 20], [-32, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                display: "inline-block",
                fontSize: 82,
                fontWeight: 900,
                fontFamily,
                color: "#ffffff",
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* "SPACE FACTS" — gradient accent */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 8,
          transform: `scale(${pulse})`,
        }}
      >
        {LINE2.map((word, i) => {
          const delay = 22 + i * 9;
          const wordOpacity = interpolate(
            frame,
            [delay, delay + 20],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          const wordY = interpolate(frame, [delay, delay + 20], [-32, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                display: "inline-block",
                fontSize: 82,
                fontWeight: 900,
                fontFamily,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 36,
          fontSize: 19,
          fontFamily,
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        New facts every day
      </div>

      <SubtitleLine
        words={["Follow", "for", "more", "amazing", "space", "facts"]}
      />
    </AbsoluteFill>
  );
};

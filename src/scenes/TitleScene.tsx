import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SubtitleLine } from "../SubtitleLine";

const TITLE = "SPACE IS WILD";

export const TitleScene = () => {
  const frame = useCurrentFrame();

  const subtitleOpacity = interpolate(frame, [58, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleY = interpolate(frame, [58, 78], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lineScale = interpolate(frame, [68, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/title.wav")} volume={0.9} />

      {/* Staggered letter drop-in */}
      <div style={{ display: "flex", alignItems: "baseline" }}>
        {TITLE.split("").map((char, i) => {
          const delay = i * 3;
          const letterOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const letterY = interpolate(frame, [delay, delay + 18], [-44, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          if (char === " ") {
            return (
              <span
                key={i}
                style={{ width: 34, display: "inline-block" }}
              />
            );
          }

          return (
            <span
              key={i}
              style={{
                opacity: letterOpacity,
                transform: `translateY(${letterY}px)`,
                fontSize: 116,
                fontWeight: 900,
                fontFamily,
                color: "#ffffff",
                display: "inline-block",
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Glowing cyan divider line */}
      <div
        style={{
          width: 440,
          height: 3,
          background:
            "linear-gradient(to right, transparent, #06b6d4, transparent)",
          transform: `scaleX(${lineScale})`,
          marginTop: 18,
          marginBottom: 22,
          borderRadius: 2,
        }}
      />

      {/* "5 Mind-Blowing Facts" tagline */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 22,
          fontFamily,
          fontWeight: 600,
          color: "#06b6d4",
          letterSpacing: 10,
          textTransform: "uppercase",
        }}
      >
        5 Mind-Blowing Facts
      </div>

      <SubtitleLine
        words={[
          "Space",
          "is",
          "wild.",
          "Here",
          "are",
          "5",
          "mind-blowing",
          "facts.",
        ]}
      />
    </AbsoluteFill>
  );
};

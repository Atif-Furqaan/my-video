import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SubtitleLine } from "../SubtitleLine";

type Props = {
  factNumber: string;
  headlineWords: string[];
  statValue: string;
  statLabel: string;
  accentColor: string;
  subtitleWords: string[];
  audioFile: string;
  isCounter?: boolean;
  counterTarget?: number;
};

const WORD_START = 20;
const FRAMES_PER_WORD = 8;

export const FactScene = ({
  factNumber,
  headlineWords,
  statValue,
  statLabel,
  accentColor,
  subtitleWords,
  audioFile,
  isCounter = false,
  counterTarget = 0,
}: Props) => {
  const frame = useCurrentFrame();

  // Fact badge slides in from the left
  const badgeX = interpolate(frame, [0, 22], [-180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const badgeOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Top accent line draws across
  const lineWidth = interpolate(frame, [2, 30], [0, 1100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Stat appears after all words revealed (dynamic based on word count)
  const statStartFrame =
    WORD_START + headlineWords.length * FRAMES_PER_WORD + 6;

  const statScale = interpolate(
    frame,
    [statStartFrame, statStartFrame + 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    }
  );
  const statOpacity = interpolate(
    frame,
    [statStartFrame, statStartFrame + 18],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Counter animates from 0 to target
  const counterProgress = interpolate(
    frame,
    [statStartFrame + 3, statStartFrame + 40],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  const counterDisplay =
    counterTarget < 20
      ? (counterProgress * counterTarget).toFixed(1)
      : Math.round(counterProgress * counterTarget).toString();

  const displayStat = isCounter ? counterDisplay : statValue;

  return (
    <AbsoluteFill
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 90px",
      }}
    >
      <Audio src={staticFile(audioFile)} volume={0.9} />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 90,
          height: 3,
          width: lineWidth,
          background: `linear-gradient(to right, ${accentColor}, transparent)`,
          borderRadius: 2,
        }}
      />

      {/* Fact number badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `translateX(${badgeX}px)`,
          fontSize: 16,
          fontFamily,
          fontWeight: 700,
          color: accentColor,
          letterSpacing: 7,
          marginBottom: 32,
          textTransform: "uppercase",
        }}
      >
        FACT #{factNumber}
      </div>

      {/* Headline — word by word reveal */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 16px",
          maxWidth: 940,
          marginBottom: 48,
        }}
      >
        {headlineWords.map((word, i) => {
          const wordStart = WORD_START + i * FRAMES_PER_WORD;
          const wordOpacity = interpolate(
            frame,
            [wordStart, wordStart + 10],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          const wordY = interpolate(
            frame,
            [wordStart, wordStart + 10],
            [26, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );

          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                display: "inline-block",
                fontSize: 52,
                fontWeight: 800,
                fontFamily,
                color: "#ffffff",
                lineHeight: 1.25,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Big stat with gradient text */}
      <div
        style={{
          opacity: statOpacity,
          transform: `scale(${statScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            fontFamily,
            background: `linear-gradient(135deg, ${accentColor} 0%, #ffffff 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            display: "inline-block",
          }}
        >
          {displayStat}
        </div>
        <div
          style={{
            fontSize: 19,
            fontWeight: 700,
            fontFamily,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 7,
            marginTop: 12,
            textTransform: "uppercase",
          }}
        >
          {statLabel}
        </div>
      </div>

      <SubtitleLine words={subtitleWords} />
    </AbsoluteFill>
  );
};

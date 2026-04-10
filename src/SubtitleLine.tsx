import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "./fonts";

type Props = {
  words: string[];
};

export const SubtitleLine = ({ words }: Props) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [10, 22, 132, 145], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spread words evenly from frame 10 to 132
  const totalHighlightFrames = 122;
  const framesPerWord = totalHighlightFrames / words.length;
  const relativeFrame = frame - 10;
  const currentWordIndex = Math.max(
    0,
    Math.min(words.length - 1, Math.floor(relativeFrame / framesPerWord))
  );

  return (
    <AbsoluteFill
      style={{
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 44,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 960,
          gap: "0 10px",
          fontSize: 27,
          fontFamily,
          fontWeight: 700,
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              color:
                i === currentWordIndex ? "#fbbf24" : "rgba(255,255,255,0.6)",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

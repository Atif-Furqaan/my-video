import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "./Background";
import { TitleScene } from "./scenes/TitleScene";
import { FactScene } from "./scenes/FactScene";
import { OutroScene } from "./scenes/OutroScene";

const SCENE = 150; // frames per scene (5 seconds at 30fps)
const TRANS = 20;  // frames for each fade transition

const timing = linearTiming({ durationInFrames: TRANS });

// Total = 6 scenes × 150 − 5 transitions × 20 = 800 frames (26.67s)

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      {/* Background is always visible, lives outside the TransitionSeries */}
      <Background />

      <TransitionSeries>
        {/* ── Scene 1: Title ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <TitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* ── Scene 2: Light from the Sun ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <FactScene
            factNumber="01"
            headlineWords={[
              "Light",
              "takes",
              "8",
              "minutes",
              "to",
              "reach",
              "Earth",
              "from",
              "the",
              "Sun",
            ]}
            statValue="8.0"
            statLabel="minutes from the Sun"
            accentColor="#06b6d4"
            audioFile="audio/fact01.wav"
            subtitleWords={[
              "Light",
              "takes",
              "8",
              "minutes",
              "to",
              "reach",
              "Earth",
              "from",
              "the",
              "Sun",
            ]}
            isCounter
            counterTarget={8}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* ── Scene 3: Stars vs Sand ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <FactScene
            factNumber="02"
            headlineWords={[
              "More",
              "stars",
              "exist",
              "than",
              "grains",
              "of",
              "sand",
              "on",
              "every",
              "beach",
            ]}
            statValue="2 TRILLION"
            statLabel="galaxies in the universe"
            accentColor="#f59e0b"
            audioFile="audio/fact02.wav"
            subtitleWords={[
              "More",
              "stars",
              "exist",
              "than",
              "grains",
              "of",
              "sand",
              "on",
              "every",
              "beach",
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* ── Scene 4: Venus Day ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <FactScene
            factNumber="03"
            headlineWords={[
              "A",
              "day",
              "on",
              "Venus",
              "is",
              "longer",
              "than",
              "its",
              "year",
            ]}
            statValue="243"
            statLabel="Earth days — one Venus day"
            accentColor="#a855f7"
            audioFile="audio/fact03.wav"
            subtitleWords={[
              "A",
              "day",
              "on",
              "Venus",
              "is",
              "longer",
              "than",
              "its",
              "whole",
              "year",
            ]}
            isCounter
            counterTarget={243}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* ── Scene 5: Universe Age ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <FactScene
            factNumber="04"
            headlineWords={[
              "The",
              "universe",
              "is",
              "13.8",
              "billion",
              "years",
              "old",
            ]}
            statValue="13.8B"
            statLabel="years old"
            accentColor="#f43f5e"
            audioFile="audio/fact04.wav"
            subtitleWords={[
              "The",
              "universe",
              "is",
              "13.8",
              "billion",
              "years",
              "old",
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* ── Scene 6: Outro ── */}
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

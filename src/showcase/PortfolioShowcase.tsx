import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Atmosphere, Grain } from "./components/Atmosphere";
import { ChatChapter, EleveChapter, PulseOpsChapter } from "./scenes/Chapters";
import { OutroScene } from "./scenes/OutroScene";
import { RecordScene } from "./scenes/RecordScene";
import { StackScene } from "./scenes/StackScene";
import { StatementScene } from "./scenes/StatementScene";
import { TitleScene } from "./scenes/TitleScene";
import { C } from "./theme";

// 52s at 30fps. One shared atmosphere runs underneath; each scene brings its
// own entrance and exit, so the room never cuts — only the content changes.
export const SHOWCASE_DURATION = 1560;

export const PortfolioShowcase: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: C.night }}>
      <Atmosphere />

      <Sequence name="Title" durationInFrames={120} premountFor={fps}>
        <TitleScene />
      </Sequence>
      <Sequence name="Statement" from={120} durationInFrames={150} premountFor={fps}>
        <StatementScene />
      </Sequence>
      <Sequence name="01 PulseOps" from={270} durationInFrames={270} premountFor={fps}>
        <PulseOpsChapter />
      </Sequence>
      <Sequence name="02 Real-Time Chat" from={540} durationInFrames={270} premountFor={fps}>
        <ChatChapter />
      </Sequence>
      <Sequence name="03 Elevé" from={810} durationInFrames={270} premountFor={fps}>
        <EleveChapter />
      </Sequence>
      <Sequence name="Stack" from={1080} durationInFrames={180} premountFor={fps}>
        <StackScene />
      </Sequence>
      <Sequence name="Record" from={1260} durationInFrames={150} premountFor={fps}>
        <RecordScene />
      </Sequence>
      <Sequence name="Outro" from={1410} durationInFrames={150} premountFor={fps}>
        <OutroScene />
      </Sequence>

      <Grain />
    </AbsoluteFill>
  );
};

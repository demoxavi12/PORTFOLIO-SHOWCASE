import "./index.css";
import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { Portfolio } from "./Portfolio";
import { PortfolioShowcase } from "./showcase/PortfolioShowcase";
import { ChatChapter, EleveChapter, PulseOpsChapter } from "./showcase/scenes/Chapters";
import { OutroScene } from "./showcase/scenes/OutroScene";
import { RecordScene } from "./showcase/scenes/RecordScene";
import { StackScene } from "./showcase/scenes/StackScene";
import { StatementScene } from "./showcase/scenes/StatementScene";
import { TitleScene } from "./showcase/scenes/TitleScene";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
      <Composition
        id="Portfolio"
        component={Portfolio}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Each scene of the showcase, previewable on its own (transparent background). */}
      <Folder name="Showcase-Scenes">
        <Composition id="Showcase-Title" component={TitleScene} durationInFrames={120} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-Statement" component={StatementScene} durationInFrames={150} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-PulseOps" component={PulseOpsChapter} durationInFrames={270} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-Chat" component={ChatChapter} durationInFrames={270} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-Eleve" component={EleveChapter} durationInFrames={270} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-Stack" component={StackScene} durationInFrames={180} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-Record" component={RecordScene} durationInFrames={150} fps={30} width={1920} height={1080} />
        <Composition id="Showcase-Outro" component={OutroScene} durationInFrames={150} fps={30} width={1920} height={1080} />
      </Folder>
      <Composition
        id="PortfolioShowcase"
        component={PortfolioShowcase}
        durationInFrames={1560}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

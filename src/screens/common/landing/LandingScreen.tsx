import { useHistory } from "react-router";

import { Slideshow } from "../../../components/slideshow/Slideshow";
import { useMemo } from "react";
import { OurMission } from "./mission/OurMission";
import { Showcase } from "./showcase/Showcase";
import { Header } from "../../../components/header/Header";
import { Footer } from "./footer/Footer";

export const LandingScreen = () => {
  const history = useHistory();

  const renderSlideShow = () => {
    const firstPicture = () => {
      return "https://api.luminoso.tech/cdn/70a9c8ec-d5d0-40d3-854e-9cca90342edf";
    };

    const secondPicture = () => {
      return "https://api.luminoso.tech/cdn/4282084d-fb24-421d-963f-ed38881d5ea5";
    };

    const thirdPicture = () => {
      return "https://api.luminoso.tech/cdn/36b31188-cae0-4187-8bcb-f055bffd65c8";
    };

    return (
      <Slideshow
        slides={[
          {
            picture: firstPicture(),
            text: "FOR ALL SKIN TYPES",
          },
          {
            picture: secondPicture(),
            text: "PURE | NATURAL | SIMPLE",
          },
          {
            picture: thirdPicture(),
            text: "SMALL BATCH",
          },
        ]}
      />
    );
  };

  const renderShowcase = useMemo(() => {
    return <Showcase />;
  }, []);

  const renderMission = useMemo(() => {
    return <OurMission />;
  }, []);

  const renderHeader = useMemo(() => {
    return <Header />;
  }, []);

  const renderFooter = useMemo(() => {
    return <Footer />;
  }, []);

  const children = (
    <>
      {renderHeader}
      {renderSlideShow()}
      {renderShowcase}
      {renderMission}
      {renderFooter}
    </>
  );

  return <div>{children}</div>;
};

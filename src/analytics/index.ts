import ReactGA from "react-ga4";
import reportWebVitals from "@/analytics/reportWebVitals";

ReactGA.initialize(
  [
    {
      trackingId: "G-447NXS4TVX"
    }
  ],
  {
    legacyDimensionMetric: false,
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  }
);

reportWebVitals(({ name, delta, id }) => {
  ReactGA.ga("send", "event", {
    eventCategory: "Web Vitals",
    eventAction: name,
    eventLabel: id,
    eventValue: Math.round(name === "CLS" ? delta * 1000 : delta),
    nonInteraction: true,
    transport: "beacon"
  });
});

export default ReactGA;

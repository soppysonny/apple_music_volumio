import React from "react";
import { createRoot } from "react-dom/client";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import { FocusStyleManager } from "@blueprintjs/core";

import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import "./s/index.css";
import App from "./App";

const MusicKit = window.MusicKit;
// MusicKit Developer Token - 有效期至 2026/7/30
const REACT_APP_DEV_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdMNktQUjRUS1AifQ.eyJpc3MiOiI3S0hTNFI4VjM5IiwiaWF0IjoxNzY5ODI5ODEwLCJleHAiOjE3ODUzODE4MTB9.-twwmnhbp5jJelFyDeWdKEXJZkDfFuM-zyKnPgk_rX-kiufmKFTsVus-I-FX8UrEnhkjPknji31GPNLC--4e3g';


function main(rm) {
  FocusStyleManager.onlyShowFocusOnTabs();
  MusicKit.configure({
    developerToken: process.env.REACT_APP_DEV_TOKEN || REACT_APP_DEV_TOKEN,
    app: {
      name: "ThinMusic",
      build: "0.1"
    }
  });
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
  if (rm) {
    remove();
  }
}

function remove() {
  let el = document.getElementById("loader");
  el.parentElement.removeChild(el);
}

if (isMobile) {
  const root = createRoot(document.getElementById("root"));
  const badge = isAndroid ? (
    <a href="https://play.google.com/store/apps/details?id=com.apple.android.music&hl=en_US&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
      <img
        style={{ padding: "10px", height: "100px" }}
        alt="Get it on Google Play"
        src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
      />
    </a>
  ) : isIOS ? (
    <a href="https://itunes.apple.com/us/app/apple-music/id1108187390?mt=8">
      <img
        style={{ padding: "10px", height: "80px" }}
        alt="Download on the App Store"
        src="https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2016-05-23&kind=iossoftware&bubble=ios_apps"
      />
    </a>
  ) : null;

  root.render(
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>请在移动设备上使用 Apple Music 应用</h2>
      {badge}
    </div>
  );
  remove();
} else {
  main(true);
}

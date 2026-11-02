import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { initializePitch } from "./interactions";
import ChapterMenu from "./ChapterMenu";
import "./pitch.css";
import {
  Origin,
  CafeDiscovery,
  Tournaments,
  Marketplace,
  CafeOwners,
  HashMoment,
  Ecosystem,
  Revenue,
  Opportunity,
  RevenueLab,
  Flywheel,
  Roadmap,
  Vision,
} from "./Scenes";
function App() {
  useEffect(() => initializePitch(), []);
  return (
    <>
      <div id="pitchProgress"></div>
      <div id="sceneLabel" aria-live="polite">
        01 / 09 · ORIGIN STORY
      </div>
      <div id="founderGuides" aria-hidden="true">
        <div className="guide active">
          <div className="voice" id="zeyanVoice">
            <b>ZEYAN</b>
            <span>Every gamer knows the struggle.</span>
          </div>
          <div className="guide-portrait">
            <svg viewBox="0 0 95 122" aria-hidden="true">
              <ellipse
                cx="46"
                cy="117"
                rx="40"
                ry="6"
                fill="#000"
                opacity=".4"
              />
              <path
                d="M8 110Q5 69 29 65H65Q90 72 87 110Z"
                fill="#794cc9"
                stroke="#be9bed"
                strokeWidth="2"
              />
              <rect
                x="40"
                y="57"
                width="18"
                height="19"
                rx="7"
                fill="#edb58d"
              />
              <ellipse cx="48" cy="39" rx="29" ry="34" fill="#edb58d" />
              <path
                d="M19 35Q12 2 46 3Q80 4 77 37Q63 27 56 18Q45 32 25 26Z"
                fill="#151723"
              />
              <path
                d="M18 33Q12 36 15 54M78 34Q85 42 79 53"
                stroke="#be9bed"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M20 29Q21 -3 48 0Q77 0 78 29"
                stroke="#be9bed"
                strokeWidth="6"
                fill="none"
              />
              <circle cx="37" cy="39" r="3" fill="#171723" />
              <circle cx="59" cy="39" r="3" fill="#171723" />
              <path
                d="M40 53Q48 60 56 53"
                stroke="#743e37"
                strokeWidth="2.7"
                fill="none"
              />
              <rect
                x="23"
                y="84"
                width="50"
                height="29"
                rx="11"
                fill="#111525"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M34 99h12m-6 -6v12" stroke="#8bee61" strokeWidth="3" />
              <circle cx="59" cy="96" r="3" fill="#aa75ff" />
              <circle cx="64" cy="103" r="3" fill="#aa75ff" />
            </svg>
          </div>
          <div className="guide-tag">ZEYAN</div>
        </div>
        <div className="guide">
          <div className="voice" id="bhanuVoice">
            <b>BHANU</b>
            <span>So we built a better way.</span>
          </div>
          <div className="guide-portrait">
            <svg viewBox="0 0 95 122" aria-hidden="true">
              <ellipse
                cx="46"
                cy="117"
                rx="40"
                ry="6"
                fill="#000"
                opacity=".4"
              />
              <path
                d="M8 110Q5 69 29 65H65Q90 72 87 110Z"
                fill="#24795b"
                stroke="#8bee61"
                strokeWidth="2"
              />
              <rect
                x="40"
                y="57"
                width="18"
                height="19"
                rx="7"
                fill="#be8969"
              />
              <ellipse cx="48" cy="39" rx="29" ry="34" fill="#be8969" />
              <path
                d="M19 35Q12 2 46 3Q80 4 77 37Q63 27 56 18Q45 32 25 26Z"
                fill="#151723"
              />
              <path
                d="M18 33Q12 36 15 54M78 34Q85 42 79 53"
                stroke="#8bee61"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M20 29Q21 -3 48 0Q77 0 78 29"
                stroke="#8bee61"
                strokeWidth="6"
                fill="none"
              />
              <circle cx="37" cy="39" r="3" fill="#171723" />
              <circle cx="59" cy="39" r="3" fill="#171723" />
              <path
                d="M40 53Q48 60 56 53"
                stroke="#743e37"
                strokeWidth="2.7"
                fill="none"
              />
              <rect
                x="23"
                y="84"
                width="50"
                height="29"
                rx="11"
                fill="#111525"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M34 99h12m-6 -6v12" stroke="#8bee61" strokeWidth="3" />
              <circle cx="59" cy="96" r="3" fill="#aa75ff" />
              <circle cx="64" cy="103" r="3" fill="#aa75ff" />
            </svg>
          </div>
          <div className="guide-tag">BHANU</div>
        </div>
      </div>
      <div
        id="characterEditor"
        role="group"
        aria-label="Character layout controls"
      >
        <button
          id="resetCharacters"
          className="reset"
          type="button"
          title="Restore automatic cinematic placement"
        >
          ↺ Reset
        </button>
        <span className="hint" id="charHint">
          Drag a founder
        </span>
      </div>
      <div id="autoplayHint">← → Chapters · Space to pause autoplay</div>
      <div id="stageControls">
        <button
          title="Previous chapter"
          id="prevChapter"
          aria-label="Previous chapter"
        >
          ←
        </button>
        <button
          title="Auto-play chapters"
          id="autoChapter"
          aria-label="Auto-play chapters"
        >
          ▶
        </button>
        <button title="Next chapter" id="nextChapter" aria-label="Next chapter">
          →
        </button>
        <button title="Full screen" id="fullChapter" aria-label="Full screen">
          ⛶
        </button>
      </div>
      <header>
        <a href="#home" className="brand">
          <img src="/pitch-0.png" alt="Hash logo" />
          HASH <span className="green">FOR GAMERS</span>
        </a>
        <div className="nav">
          <a href="#problem">The Problem</a>
          <a href="#ecosystem">The Ecosystem</a>
          <a href="#revenue">Business Models</a>
          <a href="#scenario">Scenarios</a>
          <a href="#vision">The Vision</a>
        </div>
        <ChapterMenu />
      </header>
      <div className="scrollmark">
        <a href="#home" title="Home"></a>
        <a href="#problem" title="Problem"></a>
        <a href="#ecosystem" title="Ecosystem"></a>
        <a href="#revenue" title="Revenue"></a>
        <a href="#scenario" title="Scenarios"></a>
        <a href="#vision" title="Vision"></a>
      </div>
      <main>
        <Origin />

        <CafeDiscovery />
        <Tournaments />
        <Marketplace />
        <CafeOwners />
        <HashMoment />
        <Ecosystem />
        <Revenue />
        <Opportunity />
        <RevenueLab />
        <Flywheel />
        <Roadmap />
        <Vision />
      </main>
      <footer>HASH FOR GAMERS · Visual investor pitch · November 2026</footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);

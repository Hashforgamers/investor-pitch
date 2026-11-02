import React, { useRef } from "react";
const chapters = [
  ["home", "Origin story"],
  ["problem", "Finding a café"],
  ["pain-tourney", "Entering a tournament"],
  ["pain-shop", "Shopping for gear"],
  ["pain-operator", "Running a café"],
  ["big-reveal", "The Hash moment"],
  ["ecosystem", "The ecosystem"],
  ["revenue", "Business models"],
  ["snapshot", "The opportunity"],
  ["scenario", "Revenue lab"],
  ["flywheel", "The flywheel"],
  ["roadmap", "Roadmap"],
  ["vision", "The vision"],
];
export default function ChapterMenu() {
  const dialog = useRef(null);
  return (
    <>
      <button
        className="btn chapter-trigger"
        onClick={() => dialog.current.showModal()}
      >
        Chapters ☰
      </button>
      <dialog
        className="chapter-menu"
        ref={dialog}
        aria-labelledby="menu-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="menu-head">
          <div>
            <small>HASH FOR GAMERS / INVESTOR PITCH</small>
            <h2 id="menu-title">Explore the chapters</h2>
          </div>
          <button
            aria-label="Close chapters"
            onClick={() => dialog.current.close()}
          >
            ×
          </button>
        </div>
        <nav>
          {chapters.map(([id, label], i) => (
            <a key={id} href={"#" + id} onClick={() => dialog.current.close()}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
}

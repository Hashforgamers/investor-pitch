export function initializePitch() {
  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  function update() {
    let v = (id) => +document.getElementById(id).value;
    function t(id, s) {
      document.getElementById(id).textContent = s;
    }
    for (let [id, currency] of [
      ["cafeA", false],
      ["cafeB", true],
      ["tourA", false],
      ["tourB", true],
      ["marketA", false],
      ["marketB", true],
      ["marketC", false],
      ["franA", false],
      ["franB", true],
      ["franC", false],
    ])
      t(
        id + "out",
        currency
          ? fmt(v(id))
          : v(id).toLocaleString("en-IN") + (id.endsWith("C") ? "%" : ""),
      );
    t("cafeTotal", fmt(v("cafeA") * v("cafeB")));
    t("tourTotal", fmt(v("tourA") * v("tourB")));
    t("marketTotal", fmt((v("marketA") * v("marketB") * v("marketC")) / 100));
    t("franTotal", fmt((v("franA") * v("franB") * v("franC")) / 100));
  }
  document
    .querySelectorAll("input[type=range]")
    .forEach((x) => x.addEventListener("input", update));
  update();
  let icons = { cafe: "🎮", tournament: "🏆", market: "🎧", franchise: "🏪" };
  document.querySelectorAll(".tabs button").forEach((b) =>
    b.addEventListener("click", () => {
      document
        .querySelectorAll(".tabs button")
        .forEach((x) => x.classList.toggle("active", x === b));
      document
        .querySelectorAll(".panel-model")
        .forEach((x) =>
          x.classList.toggle("active", x.dataset.panel === b.dataset.model),
        );
      document.getElementById("modelArt").textContent = icons[b.dataset.model];
    }),
  );
  const obs = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  // Founder story director: scroll chapters, animate illustrated characters and chapter dialogue
  (() => {
    const chapters = [
      ["THE ORIGIN", "We loved gaming.", "But the journey felt disconnected."],
      [
        "CAFÉ DISCOVERY",
        "Where can we play?",
        "Can we actually reserve seats?",
      ],
      [
        "TOURNAMENT PAIN",
        "We came to compete.",
        "Not to chase brackets and DMs.",
      ],
      ["GEAR SHOPPING", "Where do we buy gear?", "Which vendors can we trust?"],
      ["CAFÉ OWNERS", "Great PCs, empty seats.", "How do we bring in gamers?"],
      [
        "THE HASH MOMENT",
        "What if everything connected?",
        "One platform, every gaming journey.",
      ],
      ["THE ECOSYSTEM", "This is Hash.", "Four businesses working together."],
      ["THE BUSINESS", "Four revenue engines.", "Each has its own economics."],
      [
        "THE OPPORTUNITY",
        "What could scale look like?",
        "Illustrative, not actual results.",
      ],
      [
        "THE REVENUE LAB",
        "Change the assumptions.",
        "Explore the revenue potential.",
      ],
      [
        "THE FLYWHEEL",
        "Play. Compete. Shop. Repeat.",
        "Connected businesses support retention.",
      ],
      [
        "THE ROADMAP",
        "Start focused. Build trust.",
        "Then expand the network.",
      ],
      ["THE VISION", "Built by gamers.", "Built for the community."],
    ];
    const sections = [...document.querySelectorAll("main section.slide")],
      stage = document.getElementById("founderGuides"),
      voices = [
        document.getElementById("zeyanVoice"),
        document.getElementById("bhanuVoice"),
      ],
      label = document.getElementById("sceneLabel"),
      progress = document.getElementById("pitchProgress");
    let current = -1,
      autoplay = null,
      walkingTimeout = null,
      interactionTimeout = null;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function setChapter(index) {
      if (index === current || index < 0 || index >= sections.length) return;
      current = index;
      sections.forEach((s, i) => s.classList.toggle("scene-live", i === index));
      label.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(sections.length).padStart(2, "0") +
        " · " +
        chapters[index][0];
      voices[0].querySelector("span").textContent = chapters[index][1];
      voices[1].querySelector("span").textContent = chapters[index][2];
      stage
        .querySelectorAll(".guide")
        .forEach((g, i) => g.classList.toggle("active", i === index % 2));
      stage.classList.add("walk");
      clearTimeout(walkingTimeout);
      walkingTimeout = setTimeout(() => stage.classList.remove("walk"), 900);
      if (!reduced && !stage.classList.contains("custom-layout")) {
        let tx =
          index === 0 ? "22vw" : index === sections.length - 1 ? "36vw" : "0px";
        stage.style.transform = "translate3d(" + tx + ",0,0)";
      }
      sections[index].style.setProperty(
        "--chapter-tint",
        [
          "#8bee61",
          "#a56aff",
          "#edb770",
          "#59defe",
          "#8bee61",
          "#8bee61",
          "#5bafff",
          "#8bee61",
          "#9a70ff",
          "#59defe",
          "#80e98b",
          "#edb770",
          "#92ef73",
        ][index],
      );
    }
    function go(index) {
      index = Math.max(0, Math.min(index, sections.length - 1));
      sections[index].scrollIntoView({
        behavior: reduced ? "instant" : "smooth",
        block: "start",
      });
      setChapter(index);
    }
    function updateVisible() {
      const h = innerHeight;
      let best = 0,
        dist = 1e10;
      sections.forEach((s, i) => {
        let r = s.getBoundingClientRect(),
          d = Math.abs(r.top - h * 0.18);
        if (!reduced && r.bottom >= 0 && r.top <= h) {
          const offset = Math.max(-1, Math.min(1, (r.top + r.height / 2 - h / 2) / h));
          s.style.setProperty("--depth", offset.toFixed(3));
        }
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setChapter(best);
      let max = document.documentElement.scrollHeight - h;
      progress.style.width =
        (max > 0 ? Math.max(0, Math.min(100, (100 * scrollY) / max)) : 0) + "%";
    }
    addEventListener("scroll", () => requestAnimationFrame(updateVisible), {
      passive: true,
    });
    addEventListener("resize", updateVisible);
    updateVisible();
    document
      .getElementById("prevChapter")
      .addEventListener("click", () => go(current - 1));
    document
      .getElementById("nextChapter")
      .addEventListener("click", () => go(current + 1));
    const autoBtn = document.getElementById("autoChapter");
    function stopAuto() {
      clearInterval(autoplay);
      autoplay = null;
      autoBtn.classList.remove("playing");
      autoBtn.textContent = "▶";
      autoBtn.title = "Auto-play chapters";
    }
    function toggleAuto() {
      if (autoplay) {
        stopAuto();
        return;
      }
      autoBtn.classList.add("playing");
      autoBtn.textContent = "Ⅱ";
      autoBtn.title = "Pause autoplay";
      autoplay = setInterval(() => {
        if (current >= sections.length - 1) {
          stopAuto();
          return;
        }
        go(current + 1);
      }, 8500);
    }
    autoBtn.addEventListener("click", toggleAuto);
    document.getElementById("fullChapter").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
    addEventListener("keydown", (e) => {
      let editable = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
        document.activeElement?.tagName,
      );
      if (editable) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(current + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(current - 1);
      }
      if (e.key === " ") {
        e.preventDefault();
        toggleAuto();
      }
    });
    for (let [i, s] of sections.entries()) {
      if (i !== 0 && i !== sections.length - 1) {
        for (let k = 0; k < 8; k++) {
          const pt = document.createElement("i");
          pt.className = "particle";
          pt.style.setProperty("--x", ((k * 13 + 7) % 99) + "%");
          pt.style.setProperty("--dur", 8 + (k % 5) * 2 + "s");
          pt.style.setProperty("--drift", -50 + k * 12 + "px");
          pt.style.animationDelay = -k * 2 + "s";
          s.append(pt);
        }
      }
    }
  })();

  (() => {
    const stage = document.getElementById("founderGuides"),
      guides = [...stage.querySelectorAll(".guide")];
    const reset = document.getElementById("resetCharacters"),
      hint = document.getElementById("charHint");
    const key = "hash-founder-character-positions-v1";
    let drag = null,
      positions = null;
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
    function apply() {
      if (!positions) return;
      stage.classList.add("custom-layout");
      stage.style.transform = "none";
      guides.forEach((g, i) => {
        const x = positions[i]?.x ?? (i === 0 ? 0.07 : 0.21),
          y = positions[i]?.y ?? 0.67;
        g.style.left = clamp(x * innerWidth, 0, innerWidth - g.offsetWidth) + "px";
        g.style.top = clamp(y * innerHeight, 0, innerHeight - g.offsetHeight) + "px";
        g.style.bottom = "auto";
        g.style.right = "auto";
      });
    }
    function startPositions() {
      if (positions) return;
      const rects = guides.map((g) => g.getBoundingClientRect());
      positions = rects.map((r) => ({
        x: clamp(r.left / innerWidth, 0, 1),
        y: clamp(r.top / innerHeight, 0, 1),
      }));
      apply();
    }
    reset.addEventListener("click", () => {
      positions = null;
      localStorage.removeItem(key);

      stage.classList.remove("custom-layout", "walk");
      stage.style.transform = "";
      guides.forEach((g) => {
        g.style.left = "";
        g.style.top = "";
        g.style.right = "";
        g.style.bottom = "";
      });
      hint.textContent = "Drag a founder";
    });
    guides.forEach((guide, i) => {
      guide.addEventListener("pointerdown", (e) => {
        if (drag || !e.isPrimary || e.button !== 0) return;
        startPositions();
        e.preventDefault();
        const r = guide.getBoundingClientRect();
        drag = {
          i,
          id: e.pointerId,
          dx: e.clientX - r.left,
          dy: e.clientY - r.top,
        };
        guide.setPointerCapture(e.pointerId);
        guide.classList.add("dragging");
      });
      guide.addEventListener("pointermove", (e) => {
        if (!drag || drag.id !== e.pointerId || drag.i !== i) return;
        const w = guide.getBoundingClientRect().width,
          h = guide.getBoundingClientRect().height;
        positions[i] = {
          x:
            clamp(e.clientX - drag.dx, 0, Math.max(0, innerWidth - w)) /
            innerWidth,
          y:
            clamp(e.clientY - drag.dy, 0, Math.max(0, innerHeight - h)) /
            innerHeight,
        };
        apply();
      });
      const finish = (e) => {
        if (drag?.id === e.pointerId && drag.i === i) {
          drag = null;
          guide.classList.remove("dragging");
          try {
            localStorage.setItem(key, JSON.stringify(positions));
            hint.textContent = "Position saved";
          } catch (_) {}
        }
      };
      guide.addEventListener("pointerup", finish);
      guide.addEventListener("pointercancel", finish);
    });
    addEventListener("resize", () => {
      if (positions) apply();
    });
    try {
      const prior = JSON.parse(localStorage.getItem(key));
      if (
        Array.isArray(prior) &&
        prior.length === 2 &&
        prior.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
      ) {
        positions = prior;
        apply();
        hint.textContent = "Saved layout loaded";
      }
    } catch (_) {}
  })();
}

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function Chapter({ children, ...props }) {
  const target = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-90, 0, -90]);
  const horizon = useTransform(scrollYProgress, [0, 1], [35, -65]);
  const bank = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={target} {...props}>
      <motion.div aria-hidden="true" className="depth-floor"
        style={reduced ? undefined : { y: horizon, rotateZ: bank }}>
        <div />
      </motion.div>
      <motion.div className="chapter-plane"
        style={reduced ? undefined : { rotateX, z }}>
        {children}
      </motion.div>
    </section>
  );
}

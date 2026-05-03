import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionStyle } from 'motion/react';

interface Props {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: MotionStyle;
  desktopOnly?: boolean;
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className,
  style,
  desktopOnly = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const distance = 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  const isMobile = typeof window !== 'undefined'
    && !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (reduceMotion || (desktopOnly && isMobile)) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

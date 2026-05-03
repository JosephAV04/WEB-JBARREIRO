import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface Props {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  fade: {},
  scale: { scale: 0.92 },
};

export default function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance,
  className,
  once = true,
  amount = 0.2,
}: Props) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x !== undefined ? (distance ?? offset.x) : 0,
      y: offset.y !== undefined ? (distance ?? offset.y) : 0,
      scale: offset.scale ?? 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

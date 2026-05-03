import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useReducedMotion, animate } from 'motion/react';

interface Props {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(from);
  const [display, setDisplay] = useState(from);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(to);
      return;
    }
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, motionValue, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString('es-DO')}{suffix}
    </span>
  );
}

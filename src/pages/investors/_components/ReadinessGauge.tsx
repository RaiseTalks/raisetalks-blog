import React, { useEffect, useRef, useState } from 'react';
import styles from './ReadinessGauge.module.css';

const r = 90;
const cx = 100;
const cy = 100;
const circumference = 2 * Math.PI * r;
const gaugeLength = circumference * (330 / 360);
const score = 87;
const activeLength = gaugeLength * (score / 100);
const gaugeRotation = 105;

export default function ReadinessGauge() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          setVisible(true);

          if (prefersReduced) {
            setCount(score);
            return;
          }

          const duration = 1400;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * score));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.wrap}
      aria-label={`AI Readiness Score: ${score} out of 100`}
    >
      <p className={styles.label}>AI Readiness Score</p>

      <svg
        viewBox="0 0 200 200"
        className={styles.svg}
        aria-hidden="true"
        focusable="false"
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(1, 116, 225, 0.1)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${gaugeLength} ${circumference - gaugeLength}`}
          transform={`rotate(${gaugeRotation}, ${cx}, ${cy})`}
        />
        {/* Active arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${activeLength} ${circumference - activeLength}`}
          strokeDashoffset={visible ? 0 : activeLength}
          transform={`rotate(${gaugeRotation}, ${cx}, ${cy})`}
          className={styles.arc}
        />
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003687" />
            <stop offset="100%" stopColor="#0077ff" />
          </linearGradient>
        </defs>
        {/* Score */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.scoreNum}
        >
          {count}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.scoreSub}
        >
          / 100
        </text>
      </svg>
    </div>
  );
}

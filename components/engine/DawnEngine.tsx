'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { dawnAt } from '@/lib/dawn';

/**
 * The Dawn Engine transport. One ScrollTrigger spans the film; its progress
 * is the clock. Grade is written as CSS custom properties directly on <html>
 * so no React render happens per frame — DOM scenes read the variables, and
 * future 3D / LUT consumers will read the same clock as uniforms.
 *
 * Reduced motion: Lenis is never constructed; native scroll drives the same
 * clock. The only motion left is the grade responding to the visitor's own
 * scrolling — the story survives untouched.
 */
export default function DawnEngine() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const clockEl = document.getElementById('dawn-clock');
    const actEl = document.getElementById('dawn-act');

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      // Weighted "dough" easing — smooth, heavy, never snapping.
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const apply = (self: { progress: number }) => {
      const d = dawnAt(self.progress);
      root.style.setProperty('--d-ground', d.ground.join(' '));
      root.style.setProperty('--d-air', d.air.join(' '));
      root.style.setProperty('--d-ink', d.ink.join(' '));
      root.style.setProperty('--d-inst', d.instrument.join(' '));
      root.style.setProperty('--d-beam', String(d.beam));
      root.style.setProperty('--d-progress', String(self.progress));
      if (clockEl) clockEl.textContent = d.clock;
      if (actEl) actEl.textContent = d.act;
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: apply,
      onRefresh: apply,
    });

    return () => {
      trigger.kill();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ASSET_BASE = import.meta.env.BASE_URL;
const FALLBACK_IMAGE_SRC = `${ASSET_BASE}IMG-20250308-WA0004.jpg`;
const HERO_VIDEO_SRC = `${ASSET_BASE}generated/hero-loop.mp4`;
const SEQUENCE_FRAME_COUNT = 12;

const FRAME_SOURCES = Array.from({ length: SEQUENCE_FRAME_COUNT }, (_, index) => {
  const frameId = String(index + 1).padStart(2, '0');
  return `${ASSET_BASE}generated/frames/frame-${frameId}.webp`;
});

const useReducedMotionPreference = (): boolean => {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setReducedMotion(query.matches);
    update();

    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion;
};

type MediaTileProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
};

const MediaTile: React.FC<MediaTileProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = FALLBACK_IMAGE_SRC,
}) => {
  const [useFallback, setUseFallback] = React.useState(false);

  return (
    <img
      src={useFallback ? fallbackSrc : src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => {
        if (!useFallback) {
          setUseFallback(true);
        }
      }}
    />
  );
};

export const AssetMotionSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);
  const reducedMotion = useReducedMotionPreference();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const farLayerY = useSpring(useTransform(scrollYProgress, [0, 1], [-34, 34]), {
    stiffness: 110,
    damping: 26,
  });

  const midLayerY = useSpring(useTransform(scrollYProgress, [0, 1], [-62, 62]), {
    stiffness: 110,
    damping: 24,
  });

  const nearLayerY = useSpring(useTransform(scrollYProgress, [0, 1], [-94, 94]), {
    stiffness: 105,
    damping: 22,
  });

  const continuousFrames = React.useMemo(() => [...FRAME_SOURCES, ...FRAME_SOURCES], []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: reducedMotion ? 0 : farLayerY }}>
        <div className="absolute -top-16 left-[-10%] w-[44rem] h-[44rem] rounded-full bg-sky-500/10 blur-[130px]" />
        <div className="absolute top-8 right-[-15%] w-[50rem] h-[50rem] rounded-full bg-indigo-500/10 blur-[140px]" />
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: reducedMotion ? 0 : midLayerY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.1),transparent_45%),radial-gradient(circle_at_80%_68%,rgba(99,102,241,0.12),transparent_50%)]" />
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: reducedMotion ? 0 : nearLayerY }}>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.25),rgba(2,6,23,0)_50%,rgba(59,130,246,0.1))]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-200 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            <span>Asset Motion Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Video + image motion for a <span className="text-gradient-accent">cinematic portfolio</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto">
            This section is ready for generated media: one looping video and a continuous frame sequence
            that scrolls endlessly with layered parallax depth.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-slate-950/65 shadow-[0_30px_80px_rgba(2,6,23,0.4)]"
          >
            {!videoError ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={FALLBACK_IMAGE_SRC}
                onError={() => setVideoError(true)}
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>
            ) : (
              <MediaTile
                src={FALLBACK_IMAGE_SRC}
                alt="Fallback cinematic visual"
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.55))]" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
              <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Looping showcase video</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 lg:p-7 shadow-[0_24px_70px_rgba(2,6,23,0.35)]"
          >
            <h3 className="text-xl font-semibold text-white mb-3">Asset drop points</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-4">
              Add your generated files and this section updates automatically without extra code edits.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-sky-200/85 font-mono mb-6">
              <li>/public/generated/hero-loop.mp4</li>
              <li>/public/generated/frames/frame-01.webp ... frame-12.webp</li>
            </ul>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Use a seamless loop for the video and consistent framing for sequence images to keep
              motion polished.
            </p>

            <Link
              to="/works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-sky-400/30 text-sky-200 hover:text-white hover:bg-sky-500/10 hover:border-sky-300/50 transition-all duration-300 text-sm font-medium"
            >
              <span>Preview with projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="space-y-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55">
            <motion.div
              className="flex w-max gap-4 py-4 px-4"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      x: ['0%', '-50%'],
                    }
              }
              transition={{
                duration: 46,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {continuousFrames.map((src, index) => (
                <div key={`row-one-${index}`} className="w-44 h-28 sm:w-52 sm:h-32 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <MediaTile
                    src={src}
                    alt={`Generated sequence frame ${String((index % SEQUENCE_FRAME_COUNT) + 1)}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45">
            <motion.div
              className="flex w-max gap-4 py-4 px-4"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      x: ['-50%', '0%'],
                    }
              }
              transition={{
                duration: 54,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {continuousFrames.map((src, index) => (
                <div key={`row-two-${index}`} className="w-40 h-24 sm:w-48 sm:h-28 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <MediaTile
                    src={src}
                    alt={`Generated sequence frame ${String((index % SEQUENCE_FRAME_COUNT) + 1)}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

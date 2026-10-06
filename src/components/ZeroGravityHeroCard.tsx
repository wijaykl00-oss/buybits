import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Product } from '../types';

export interface ZeroGravityHeroCardData {
  title: string;
  badge: string;
  isRed: boolean;
  product?: Product;
  boySprite: string;
  cardIndex: number;
  floatDuration: number;
}

interface ZeroGravityHeroCardProps {
  card: ZeroGravityHeroCardData;
  onClick: () => void;
}

interface BubbleConfig {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  wobbleX: number[];
}

export const ZeroGravityHeroCard: React.FC<ZeroGravityHeroCardProps> = ({ card, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for silky smooth microgravity cursor physics
  const springConfig = { stiffness: 220, damping: 18, mass: 0.8 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // 3D tilt & agile maneuver transformations
  const moveX = useTransform(mouseX, [-1, 1], [-22, 22]);
  const moveY = useTransform(mouseY, [-1, 1], [-18, 18]);
  const rotateX = useTransform(mouseY, [-1, 1], [14, -14]);
  const rotateY = useTransform(mouseX, [-1, 1], [-16, 16]);
  const tiltZ = useTransform(mouseX, [-1, 1], [-10, 10]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, nx)));
    mouseY.set(Math.max(-1, Math.min(1, ny)));
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Unique procedural bubbles for each card (staggered & realistic)
  const bubbles: BubbleConfig[] = useMemo(() => {
    const idx = card.cardIndex;
    return [
      {
        id: 1,
        size: 14 + (idx * 3) % 8, // 14px - 22px
        left: 15 + (idx * 17) % 30, // 15% - 45%
        duration: 4.8 + (idx * 0.4),
        delay: -1.2 * idx,
        wobbleX: [-6, 7, -5, 6, -6],
      },
      {
        id: 2,
        size: 9 + (idx * 2) % 6, // 9px - 15px
        left: 55 + (idx * 13) % 32, // 55% - 87%
        duration: 3.9 + (idx * 0.3),
        delay: -2.1 * idx,
        wobbleX: [5, -6, 7, -4, 5],
      },
      {
        id: 3,
        size: 18 + (idx * 4) % 10, // 18px - 28px
        left: 30 + (idx * 19) % 35, // 30% - 65%
        duration: 5.5 + (idx * 0.5),
        delay: -0.8 * idx,
        wobbleX: [-8, 6, -7, 5, -8],
      },
      {
        id: 4,
        size: 8 + (idx * 3) % 5, // 8px - 13px
        left: 20 + (idx * 23) % 50,
        duration: 3.4 + (idx * 0.35),
        delay: -3.3 * idx,
        wobbleX: [4, -5, 6, -3, 4],
      },
    ];
  }, [card.cardIndex]);

  // Alternating themes: Red vs Sleek Black
  const bgClasses = card.isRed
    ? 'bg-[#DC2626] text-white shadow-lg shadow-red-900/25 border border-red-500/30'
    : 'bg-[#141414] text-white shadow-lg shadow-black/40 border border-neutral-800/80';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${bgClasses} min-w-[130px] xs:min-w-[150px] md:min-w-0 snap-center rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 aspect-[4/5] flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 relative flex-shrink-0 md:flex-shrink overflow-hidden group select-none hover:shadow-2xl`}
      style={{ perspective: 1000 }}
    >
      {/* Dynamic Animated Zero-Gravity Bubbles (Separate Bubble Asset) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {bubbles.map((b) => (
          <motion.img
            key={b.id}
            src="/hero-cards/bubble.svg"
            alt="Bubble"
            style={{
              position: 'absolute',
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              bottom: '-25px',
            }}
            animate={{
              y: [0, -220],
              x: b.wobbleX,
              opacity: [0, 0.85, 0.85, 0],
              scale: [0.75, 1, 1.08, 0.8],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="select-none filter drop-shadow-xs"
          />
        ))}

        {/* Twinkling Star Sparkles (✨) */}
        <div
          className={`absolute transition-opacity duration-300 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-50 scale-90'
          }`}
          style={{
            top: `${14 + (card.cardIndex * 5) % 20}%`,
            right: `${12 + (card.cardIndex * 9) % 25}%`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 fill-amber-300/90 drop-shadow-sm animate-spin"
            style={{ animationDuration: '9s' }}
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        <div
          className={`absolute transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-25'
          }`}
          style={{
            bottom: '30%',
            left: `${14 + (card.cardIndex * 8) % 20}%`,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white/80 drop-shadow-sm">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      </div>

      {/* Center Claude Asterisk Logo (Always clearly visible in center) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {card.isRed ? (
          // Red Card: Rounded frosted container with crisp White Asterisk
          <div className="w-13 h-13 xs:w-15 xs:h-15 sm:w-17 sm:h-17 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/25 shadow-inner transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 opacity-95"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
            </svg>
          </div>
        ) : (
          // Black Card: Glowing Red Asterisk
          <div className="w-13 h-13 xs:w-15 xs:h-15 sm:w-17 sm:h-17 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
            </svg>
          </div>
        )}
      </div>

      {/* Floating Pure 2D Cartoon Boy (Zero-Gravity Antigravity Layer) */}
      <div className="w-full flex-1 flex items-center justify-center relative z-20 pointer-events-none mt-1">
        <motion.div
          animate={
            isHovered
              ? {
                  scale: 1.15,
                }
              : {
                  y: [-5, 6, -5],
                  rotate: [-3.5, 3.5, -3.5],
                  scale: [1, 1.025, 1],
                  transition: {
                    repeat: Infinity,
                    duration: card.floatDuration,
                    ease: 'easeInOut',
                  },
                }
          }
          style={{
            x: isHovered ? moveX : undefined,
            y: isHovered ? moveY : undefined,
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            rotate: isHovered ? tiltZ : undefined,
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Pure boy character only: NO card background, NO borders, transparent PNG */}
          <img
            src={card.boySprite}
            alt={card.title}
            className="w-[88%] h-[88%] object-contain filter drop-shadow-md transition-all duration-200 select-none"
          />
        </motion.div>
      </div>

      {/* Card Label Bottom (Stationary, clearly legible) */}
      <div className="w-full pt-1.5 sm:pt-2 pb-0.5 relative z-30 pointer-events-none">
        <span className="text-[10px] xs:text-[11px] sm:text-xs font-black tracking-wider xs:tracking-widest uppercase block font-space truncate text-white drop-shadow-xs">
          {card.title}
        </span>
      </div>
    </div>
  );
};

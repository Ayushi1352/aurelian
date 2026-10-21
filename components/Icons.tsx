import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Line({ d, strokeWidth, ...props }: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={strokeWidth ?? line.strokeWidth} {...props}>
      <path d={d} />
    </svg>
  );
}

// ── UI icons ──
export const ArrowRight = (p: IconProps) => <Line d="M4 12h15M13 6l6 6-6 6" strokeWidth={2} {...p} />;
export const ArrowLeft = (p: IconProps) => <Line d="M20 12H5M11 6l-6 6 6 6" strokeWidth={2} {...p} />;
export const ArrowUpRight = (p: IconProps) => <Line d="M7 17 17 7M8 7h9v9" strokeWidth={2} {...p} />;
export const ChevronDown = (p: IconProps) => <Line d="m5 9 7 7 7-7" strokeWidth={2} {...p} />;
export const MenuIcon = (p: IconProps) => <Line d="M3 6h18M3 12h18M3 18h12" strokeWidth={1.8} {...p} />;
export const CloseIcon = (p: IconProps) => <Line d="M5 5l14 14M19 5 5 19" strokeWidth={1.8} {...p} />;
export const Check = (p: IconProps) => <Line d="m5 12.5 4.5 4.5L19 7" strokeWidth={2.2} {...p} />;
export const CheckCircle = (p: IconProps) => <Line d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8 12.5l2.7 2.7L16.5 9.5" {...p} />;
export const Calendar = (p: IconProps) => <Line d="M4 6.5h16v13.5H4zM4 10.5h16M8.5 3.5v5M15.5 3.5v5" {...p} />;
export const UserIcon = (p: IconProps) => <Line d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5c.8-3.8 3.9-6 7.5-6s6.7 2.2 7.5 6" {...p} />;
export const ClockIcon = (p: IconProps) => <Line d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3.5 2" {...p} />;
export const Phone = (p: IconProps) => (
  <Line d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 6.5 6.5l1.4-2.3 4.6 1.8V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z" {...p} />
);
export const Mail = (p: IconProps) => <Line d="M3.5 5.5h17v13h-17zM4 6l8 6.5L20 6" {...p} />;
export const MapPin = (p: IconProps) => <Line d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" {...p} />;
export const Globe = (p: IconProps) => (
  <Line d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" {...p} />
);

export function QuoteMark(props: IconProps) {
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M20 2C9 4.5 2 12 2 22.5 2 30 6.3 34 11.3 34c4.8 0 8.2-3.5 8.2-8s-3.3-7.8-7.6-7.8c-.6 0-1.2 0-1.6.2C11 12.5 15 8.3 21 6.5zM46 2C35 4.5 28 12 28 22.5 28 30 32.3 34 37.3 34c4.8 0 8.2-3.5 8.2-8s-3.3-7.8-7.6-7.8c-.6 0-1.2 0-1.6.2C37 12.5 41 8.3 47 6.5z" />
    </svg>
  );
}

// ── Feature icons, picked by the `icon` name in site.json ──
const featureIcons = {
  gavel: "M14.5 3.5l6 6M12 6l6 6M10.5 7.5l6 6M13 4.5l-5 5 6.5 6.5 5-5M9 11l-6.5 6.5a1.4 1.4 0 0 0 2 2L11 13M13 20.5h8",
  shield: "M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3ZM8.8 12l2.2 2.2 4.3-4.4",
  briefcase: "M3.5 7.5h17v12h-17zM9 7.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M3.5 12.5h17M10.5 12.5v2h3v-2",
  chart: "M4 20.5V4M4 20.5h16.5M8 16l4-4.5 3 3 5-6M16 8.5h4v4",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.7c2 .7 3.2 2.6 3.5 5.3",
  bulb: "M9 17.5h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17.5h5V16c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z",
  home: "M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5M10 20v-5.5h4V20",
  rocket: "M14.5 4.5c2.5-1 4.8-1.2 6-1-.2 1.2 0 3.5-1 6-1.4 3.4-4.7 6.6-8.5 8.5l-4-4c1.9-3.8 5.1-7.1 7.5-9.5ZM7 13.5 3.5 12l3-3h4M10.5 17l1.5 3.5 3-3v-4M5.5 18.5 4 20M15 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  scale: "M12 3.5V20M7 20.5h10M4.5 7h15M12 4.5a1 1 0 1 0 0-2M6 7l-3 7a3 3 0 0 0 6 0L6 7ZM18 7l-3 7a3 3 0 0 0 6 0l-3-7Z",
  target: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  handshake: "M2.5 8.5 6 6l3.5 1L12 6l4 1.5 5.5 1M2.5 8.5 5 15l2 1.5M21.5 8.5 19 14.5l-5.5 4-2-1.5M9.5 7 7 10.5c.8.8 2 .9 2.8.2L12 9l4 4.5M8 17.5l1.5 1.2M10 15.5l2 1.8M12 13.5l2.3 2",
  award: "M12 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM8.5 13.3 7 21l5-2.8 5 2.8-1.5-7.7M12 6.5l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z",
} as const;

export function FeatureIcon({ name, ...props }: IconProps & { name: string }) {
  const d = featureIcons[name as keyof typeof featureIcons] ?? featureIcons.scale;
  return <Line d={d} strokeWidth={1.5} {...props} />;
}

// ── Social brand icons, picked by the `name` in site.json ──
function Facebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M6.9 8.8H3.6V20h3.3V8.8ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.5 13.6c0-3-.6-5.1-4.1-5.1-1.7 0-2.8.9-3.2 1.8h-.1V8.8H10V20h3.3v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.3v-6.4Z" />
    </svg>
  );
}

function XLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M17.6 3.5h3L14 11l7.7 9.5h-6l-4.7-6-5.4 6h-3l7-7.9L2.3 3.5h6.1l4.3 5.5 4.9-5.5Zm-1 15.3h1.7L7.5 5.1H5.7l10.9 13.7Z" />
    </svg>
  );
}

function YouTube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: LinkedIn,
  x: XLogo,
  youtube: YouTube,
};

export function SocialIcon({ name, ...props }: IconProps & { name: string }) {
  const Icon = socialIcons[name as keyof typeof socialIcons] ?? Globe;
  return <Icon {...props} />;
}

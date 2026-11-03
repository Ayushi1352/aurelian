import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaQuoteLeft, FaRegCircle, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuAward,
  LuBriefcase,
  LuCalendar,
  LuCheck,
  LuChevronDown,
  LuCircleCheck,
  LuGavel,
  LuGlobe,
  LuHandshake,
  LuHouse,
  LuLightbulb,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhone,
  LuRocket,
  LuScale,
  LuShieldCheck,
  LuTarget,
  LuTrendingUp,
  LuUser,
  LuUsers,
  LuX,
} from "react-icons/lu";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaQuoteLeft,
  FaXTwitter,
  FaYoutube,
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuAward,
  LuBriefcase,
  LuCalendar,
  LuCheck,
  LuChevronDown,
  LuCircleCheck,
  LuGavel,
  LuGlobe,
  LuHandshake,
  LuHouse,
  LuLightbulb,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhone,
  LuRocket,
  LuScale,
  LuShieldCheck,
  LuTarget,
  LuTrendingUp,
  LuUser,
  LuUsers,
  LuX,
};

type Props = {
  name: string;
  className?: string;
  /** line thickness of the outline (Lu) icons; the filled (Fa) icons ignore it */
  strokeWidth?: number;
};

export const Icon = ({ name, className = "size-6", strokeWidth = 1.6 }: Props) => {
  const Glyph = icons[name];
  if (!Glyph) {
    if (process.env.NODE_ENV !== "production") console.warn(`Icon "${name}" is not in components/ui/Icon.tsx`);
    return <FaRegCircle aria-hidden="true" className={className} />;
  }
  const outline = !name.startsWith("Fa");
  return <Glyph aria-hidden="true" className={className} {...(outline ? { strokeWidth } : {})} />;
};

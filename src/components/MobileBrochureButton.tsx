"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import { useIntro } from "@/components/IntroProvider";

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 opacity-80"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}

/**
 * Persistent "Brochure" pill, bottom-left, on mobile only (below md, where the
 * header's Brochure link is hidden). It replaces the Brochure entry in the menu,
 * keeping the site's main goal one tap away on every page. Styled to match the
 * floating music and social buttons on the right.
 */
export default function MobileBrochureButton() {
  const pathname = usePathname();
  const { introDone } = useIntro();
  const hidden = pathname === "/brochure" || (pathname === "/" && !introDone);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="mobile-brochure"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          className="fixed bottom-6 left-6 z-50 sm:bottom-8 sm:left-8 md:hidden"
        >
          <TransitionLink
            href="/brochure"
            direction="forward"
            className="flex h-12 cursor-pointer items-center gap-2 rounded-full border border-white/60 bg-white/50 pl-4 pr-5 font-sans text-[16px] text-dark-green shadow-[0_8px_32px_0_rgba(1,86,63,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-green"
          >
            <DocumentIcon />
            Brochure
          </TransitionLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

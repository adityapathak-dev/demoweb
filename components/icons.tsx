import type { SVGProps } from "react";

/**
 * Excel Academy — hand-set geometric icon family.
 * Single stroke weight (1.8), round caps, 24px grid. No emoji, no
 * borrowed glyphs: every mark in the UI comes from this file.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <circle cx="16.5" cy="9" r="2.6" />
      <path d="M15.8 14.3c2.2.4 3.8 2 4.3 4.2" />
    </Base>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3c.7 4.6 2.5 6.4 7 7-4.5.6-6.3 2.4-7 7-.7-4.6-2.5-6.4-7-7 4.5-.6 6.3-2.4 7-7z" />
    </Base>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </Base>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </Base>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4h4l2 5-2.5 1.5c1 2.5 3 4.5 5.5 5.5L15.5 14l5 2v4c0 .6-.4 1-1 1C10.7 21 3 13.3 3 5c0-.6.4-1 1-1z" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </Base>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s-6.5-5.3-6.5-10.5a6.5 6.5 0 0113 0C18.5 15.7 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </Base>
  );
}

/**
 * ScribbleUnderline — a hand-drawn stroke for marking one important
 * phrase per page. Deliberately uneven; never used twice on a screen.
 */
export function ScribbleUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M4 9.5C60 4.5 120 4 216 8.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M12 11.5C70 8 150 7.5 208 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* Typed configuration surface for the template.
 * Ordinary adaptations edit src/config.ts only; these types are the schema.
 * The engine (src/components, src/pages) must never contain instance content.
 */

export interface MediaImage {
  src: string
  alt: string
  /** CSS object-position, e.g. '50% 30%'. Optional. */
  position?: string
}

/* ---------------- theme ---------------- */

export interface SiteTheme {
  /** Page base background. */
  canvas: string
  /** Raised surface (nav pill, overlays). */
  surface: string
  /** Primary text on dark. */
  ink: string
  /** Fullscreen menu background (light). */
  menuBg: string
  /** Text inside the fullscreen menu. */
  menuInk: string
  /** Menu row divider, rgba string. */
  menuLine: string
  /** Accent (menu hover layer, highlights). */
  accent: string
  /** Ambient glow tint for the home hero canvas (usually = accent). */
  glow: string
  /** Muted text grays, darkest → lightest. */
  muted: string
  faint: string
  /**
   * Depth-zone colour program ("scroll = descent"):
   * five band backgrounds from the surface down to the abyss. Sections
   * opt into zones via page markup; ink/line/accent/muted per zone are
   * derived by the engine (luminance). Optional — without it every zone
   * resolves to the uniform canvas/ink (classic behaviour).
   */
  depthZones?: { surface: string; drift: string; twilight: string; deep: string; abyss: string }
}

/* ---------------- global chrome ---------------- */

export interface MenuRow {
  /** Unique kebab-case id. */
  id: string
  /** Large uppercase title, e.g. 'КОНТАКТЫ'. */
  label: string
  /** Small index caption under the title, e.g. '( СВЯЗЬ )'. */
  subLabel: string
  /** Route or page anchor, e.g. '/' or '/#contacts'. */
  href: string
  /** [left, right] hover thumbnails (3:2). */
  thumbs: [MediaImage, MediaImage]
}

export interface MenuConfig {
  rows: MenuRow[]
  /** mailto: target shown as the left icon in the pill bar. */
  email: string
  /** Short brand mark rendered at pill center (text, not an image). */
  brandMark: string
  homeLabel: string
  closeAria: string
  openAria: string
  mailAria: string
  /**
   * Chrome form variant: 'pill' (default) is the top-centred solid pill;
   * 'dock' is a frosted capsule docked at the bottom edge.
   * Morph/fullscreen/row mechanics identical.
   */
  form?: 'pill' | 'dock'
  /**
   * Menu row composition: 'stage' (default) keeps the
   * centred giant rows; 'ledger' re-composes rows as a left-aligned index
   * table (mono index cell, capitalised display title, right-aligned
   * sub-label column). Hover layer-swap and row-anchored thumbnails
   * (mechanism) are identical in both.
   */
  layout?: 'stage' | 'ledger'
}

export interface CursorConfig {
  enabled: boolean
  /** 0..1 magnetic pull toward small (<300px) interactive targets. */
  magnetStrength: number
  defaultLabel: string
  /** Pixel-block mouse trail (desktop only). */
  trail: boolean
}

export interface NoiseConfig {
  enabled: boolean
  /** 0..1 canvas opacity. */
  opacity: number
  /** 0..1 fraction of lit pixels per frame. */
  density: number
  fps: number
  /** fps while scroll is cooling. */
  fpsHold: number
}

export interface FooterConfig {
  marqueeWords: string[]
  email: string
  phone: string
  address: string
  socials: Array<{ label: string; href: string }>
  backToTopLabel: string
  copyright: string
  /** Giant low-opacity glyph/word behind the footer base. Optional. */
  watermark?: string
  /** Image block in the footer right column (replaces the studio reel). Optional. */
  media?: MediaImage
  /** Small caption overlaid on the footer media corner. Optional. */
  videoTag?: string
  /**
   * Giant call-to-action block above the contact row (the "abyss footer"):
   * a display-size link with an ink-sweep hover. Optional.
   */
  cta?: { label: string; href: string }
  /** Small mono kicker above the footer CTA. Optional. */
  ctaKicker?: string
}

/* ---------------- home ---------------- */

export interface HomeLoader {
  enabled: boolean
  /** Two display letters flanking the mark, e.g. ['Т','К']. */
  letters: [string, string]
  holdMs: number
  dismissMs: number
}

/**
 * Signature fluid ambience layer: a domain-
 * warped fbm gradient field rendered behind the hero, drifting over time
 * with a pointer push. Replaces the plain ambient blob canvas when enabled.
 * Optional; reduced-motion always renders a single static frame.
 */
export interface HomeHeroFluid {
  /** Master switch for the fluid field. */
  enabled: boolean
  /** Time multiplier 0..3 (default 1). */
  speed?: number
  /** Pointer disturbance strength 0..1 (default 0.6). */
  strength?: number
  /** Pointer disturbance on fine pointers (default true). */
  mouse?: boolean
}

export interface HomeHero {
  kicker: string
  /** Giant brand word (ledger composition renders it solid, mixed case). */
  brandWord: string
  /**
   * Second word of the ledger hero pair, rendered as a light outline offset
   * to the right (weight-contrast composition). Optional;
   * used by the 'ledger' composition only.
   */
  brandWordOutline?: string
  subLine: string
  /**
   * Full-bleed photographic hero background (dark
   * texture, clearly visible). Optional; without it the hero keeps the
   * plain base + ambient canvas only.
   */
  bgImage?: MediaImage
  /** 0..1 strength of the dark scrim over bgImage (default 0.5). */
  bgDim?: number
  /**
   * Giant word font-size in vw; the letters spread edge-to-edge across the
   * hero top (wrapping to two lines when long). Default 16.
   */
  titleVw?: number
  /** Wave of small thumbnails scrubbed by scroll. */
  wave: MediaImage[]
  /** Slow ambient float on the wave images (off for reduced-motion). */
  waveDrift: boolean
  /**
   * Floating card-stack composition (central object + small cards pressing
   * the hero bottom edge). Optional; default false. */
  stack?: boolean
  /**
   * Overlapping-card strip composition. Optional; default false keeps the flat tile row. */
  waveOverlap?: boolean
  /**
   * Flanking capability word columns (small uppercase, low opacity),
   * fading out as the hero scrolls away. Desktop only. Optional.
   */
  wordColumns?: { left: string[]; right: string[] }
  /** Signature fluid gradient field ambience (see HomeHeroFluid). Optional. */
  fluid?: HomeHeroFluid
  /**
   * Hero composition variant: 'banner' (default) keeps the top-spread
   * giant word + bottom object; 'poster' centres the giant word as a
   * monument; 'ledger' re-composes the hero as a descent ledger — top mono
   * data strip, giant word pair (solid + outline, weight-contrast), left-anchored
   * sub, right meta column, and the wave images as a uniform specimen rail.
   */
  composition?: 'banner' | 'poster' | 'ledger'
}

export interface HomeMarquee {
  items: Array<{ text: string; label: string }>
  /** -1 moves left with scroll, 1 moves right. */
  direction: -1 | 1
}

export interface StatementStatus {
  text: string
  /** Horizontal anchor: left / quarter / right-quarter / right. */
  pos: 'left' | 'q1' | 'q3' | 'right'
  /** Extra vertical offset inside its group, px. */
  offsetY?: number
}

export interface HomeStatement {
  /** Approximate section height in px (desktop). */
  heightPx: number
  /** Terminal-style status lines with a blinking block cursor. Optional. */
  statusLines?: StatementStatus[]
  /** Three readout tokens over a hairline rule at the section end. Optional. */
  readout?: [string, string, string]
  /**
   * Scroll spotlight: small words ramp baseOpacity → 1 as
   * they approach the viewport centre and pick up a slight far-blur; text
   * scrambles in on entry. Optional.
   */
  spotlight?: { baseOpacity?: number; farBlurPx?: number; scramble?: boolean }
  /**
   * Manifesto form: long editorial lines — each line is one scroll beat
   * lit by the same spotlight curve (dim/blur far from centre). `em` marks
   * the substring rendered in the zone accent.
   */
  manifesto?: { lines: Array<{ text: string; em?: string }> }
}

export interface HomeCapabilities {
  heading: string
  items: Array<{ index: string; title: string; body: string }>
}

/**
 * Credential rows (допуски, аккредитации, реестры).
 * Same ledger-row presentation as capabilities.
 */
export interface HomeCredentials {
  heading: string
  items: Array<{ index: string; title: string; body: string }>
}

/** Partner entries; the list is meant to grow over time. */
export interface HomePartners {
  heading: string
  /** Small note under the heading, e.g. 'список пополняется'. Optional. */
  note?: string
  items: Array<{ index: string; name: string; fullName: string; body: string }>
}

/** Contact blocks (адрес, телефон, почта, реквизиты...). */
export interface HomeContacts {
  heading: string
  blocks: Array<{ label: string; lines: string[] }>
}

/** Cube stage sizing — min(vw×W, vh×H)×scale (zoomed scene). */
export interface HomeCubeZoom {
  vw: number
  vh: number
  scale: number
}

export interface HomeConfig {
  loader: HomeLoader
  hero: HomeHero
  marquee: HomeMarquee
  cube: { faces: MediaImage[]; caption: string; zoom?: HomeCubeZoom } // exactly 6 faces
  statement: HomeStatement
  capabilities: HomeCapabilities
  credentials: HomeCredentials
  partners: HomePartners
  contacts: HomeContacts
}

/* ---------------- 404 ---------------- */

export interface NotFoundConfig {
  heading: string
  /** Typewriter lines cycled under the heading. */
  messages: string[]
  ctaLabel: string
  ctaHref: string
  hiScoreLabel: string
}

/* ---------------- interface copy (engine strings, all config-driven) ---------------- */

/** Visible engine strings (non-aria). */
export interface UiCopy {
  skipLink: string
  notFoundHint: string
  notFoundGameOver: string
}

/** Accessible names owned by the engine. */
export interface A11yCopy {
  loading: string
  menuNav: string
  socials: string
  cube: string
}

/** Custom-cursor text labels (data-cursor display values). */
export interface CursorCopy {
  home: string
  contact: string
  open: string
  top: string
}

export interface InterfaceCopy {
  ui: UiCopy
  a11y: A11yCopy
  cursor: CursorCopy
}

/* ---------------- root config ---------------- */

export interface SiteConfig {
  /** BCP-47 locale, e.g. 'ru'. Source of truth for visible copy. */
  locale: string
  siteTitle: string
  siteDescription: string
  brandName: string
  theme: SiteTheme
  menu: MenuConfig
  cursor: CursorConfig
  noise: NoiseConfig
  /**
   * Depth gauge (signature chrome): a fixed right-edge
   * rail with tick marks, a drop marker tracking scroll progress and a mono
   * depth readout (−N M). Replaces the classic top progress bar when
   * enabled. Desktop only; reduced-motion safe. Optional.
   */
  depthGauge?: { enabled: boolean; maxDepthM?: number }
  footer: FooterConfig
  home: HomeConfig
  notFound: NotFoundConfig
  copy: InterfaceCopy
}

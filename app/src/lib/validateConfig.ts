/* Runtime config validation. Runs before render; throws with a readable
 * message list so content editors see every problem at once.
 */
import type { SiteConfig } from '../types'

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

function checkUnique(ids: string[], what: string, errs: string[]) {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) errs.push(`${what}: duplicate id "${id}"`)
    seen.add(id)
  }
}

export function validateConfig(cfg: SiteConfig): string[] {
  const errs: string[] = []

  /* theme */
  for (const [k, v] of Object.entries(cfg.theme)) {
    if (k === 'menuLine') continue // rgba() string
    if (k === 'depthZones') continue // nested zone palette, checked below
    if (!HEX.test(v)) errs.push(`theme.${k}: "${v}" is not a hex color`)
  }
  if (cfg.theme.depthZones) {
    for (const [zone, v] of Object.entries(cfg.theme.depthZones)) {
      if (!HEX.test(v)) errs.push(`theme.depthZones.${zone}: "${v}" is not a hex color`)
    }
    const ZONES = ['surface', 'drift', 'twilight', 'deep', 'abyss']
    for (const z of ZONES)
      if (!(z in cfg.theme.depthZones)) errs.push(`theme.depthZones: missing zone "${z}"`)
  }
  /* depth gauge */
  if (cfg.depthGauge !== undefined) {
    if (typeof cfg.depthGauge.enabled !== 'boolean') errs.push('depthGauge.enabled must be a boolean')
    if (cfg.depthGauge.maxDepthM !== undefined && !(cfg.depthGauge.maxDepthM > 0 && cfg.depthGauge.maxDepthM <= 11000))
      errs.push('depthGauge.maxDepthM must be within 1..11000')
  }

  /* menu */
  const menuIds = cfg.menu.rows.map((r) => r.id)
  checkUnique(menuIds, 'menu.rows', errs)
  if (cfg.menu.form !== undefined && !['pill', 'dock'].includes(cfg.menu.form))
    errs.push(`menu.form: must be 'pill' or 'dock'`)
  if (cfg.menu.layout !== undefined && !['stage', 'ledger'].includes(cfg.menu.layout))
    errs.push(`menu.layout: must be 'stage' or 'ledger'`)
  for (const r of cfg.menu.rows) {
    if (!KEBAB.test(r.id)) errs.push(`menu row "${r.id}": id must be kebab-case`)
    if (!r.href.startsWith('/')) errs.push(`menu row "${r.id}": href must start with /`)
    if (!r.label.trim()) errs.push(`menu row "${r.id}": empty label`)
    if (r.thumbs.length !== 2) errs.push(`menu row "${r.id}": needs exactly 2 thumbs`)
  }
  if (cfg.menu.rows.length < 2 || cfg.menu.rows.length > 7)
    errs.push(`menu.rows: ${cfg.menu.rows.length} rows — engine supports 2..7`)

  /* cursor + noise numeric bases */
  if (cfg.cursor.magnetStrength < 0 || cfg.cursor.magnetStrength > 1)
    errs.push('cursor.magnetStrength must be within 0..1')
  if (cfg.noise.opacity < 0 || cfg.noise.opacity > 1) errs.push('noise.opacity must be within 0..1')
  if (cfg.noise.density < 0 || cfg.noise.density > 1) errs.push('noise.density must be within 0..1')
  if (cfg.noise.fps <= 0 || cfg.noise.fpsHold <= 0) errs.push('noise fps values must be > 0')
  if (cfg.noise.fpsHold > cfg.noise.fps) errs.push('noise.fpsHold should not exceed noise.fps')

  /* home */
  if (cfg.home.loader.holdMs < 0 || cfg.home.loader.dismissMs < cfg.home.loader.holdMs)
    errs.push('home.loader: dismissMs must be >= holdMs >= 0')
  if (cfg.home.cube.faces.length !== 6)
    errs.push(`home.cube.faces: ${cfg.home.cube.faces.length} — a cube has exactly 6 faces`)
  if (!cfg.home.cube.caption.trim()) errs.push('home.cube.caption is empty')
  if (!cfg.home.hero.brandWord.trim()) errs.push('home.hero.brandWord is empty')
  if (cfg.home.hero.brandWordOutline !== undefined && !cfg.home.hero.brandWordOutline.trim())
    errs.push('home.hero.brandWordOutline: empty string')
  if (cfg.home.statement.heightPx < 1000) errs.push('home.statement.heightPx unreasonably small')
  if (cfg.home.statement.manifesto) {
    const m = cfg.home.statement.manifesto
    if (m.lines.length < 3) errs.push('home.statement.manifesto.lines: need at least 3 lines')
    for (const ln of m.lines) {
      if (!ln.text.trim()) errs.push('home.statement.manifesto: empty line')
      if (ln.em !== undefined && !ln.text.includes(ln.em))
        errs.push(`home.statement.manifesto: em "${ln.em}" is not a substring of its line`)
    }
  }
  if (typeof cfg.home.hero.waveDrift !== 'boolean') errs.push('home.hero.waveDrift must be a boolean')
  /* optional density layers */
  const POS = ['left', 'q1', 'q3', 'right']
  if (cfg.home.hero.wordColumns) {
    const wc = cfg.home.hero.wordColumns
    if (!wc.left.length || !wc.right.length)
      errs.push('home.hero.wordColumns: left/right word lists must be non-empty')
    for (const w of [...wc.left, ...wc.right])
      if (!w.trim()) errs.push('home.hero.wordColumns: empty word')
  }
  if (cfg.home.statement.statusLines) {
    for (const s of cfg.home.statement.statusLines) {
      if (!s.text.trim()) errs.push('home.statement.statusLines: empty text')
      if (!POS.includes(s.pos)) errs.push(`home.statement.statusLines: bad pos "${s.pos}"`)
    }
  }
  if (cfg.home.statement.readout) {
    if (cfg.home.statement.readout.length !== 3)
      errs.push('home.statement.readout: exactly 3 tokens')
    for (const t of cfg.home.statement.readout)
      if (!t.trim()) errs.push('home.statement.readout: empty token')
  }
  /* one-page content sections */
  if (cfg.home.capabilities.items.length === 0) errs.push('home.capabilities.items: empty')
  if (cfg.home.credentials.items.length === 0) errs.push('home.credentials.items: empty')
  if (cfg.home.partners.items.length === 0) errs.push('home.partners.items: empty')
  if (cfg.home.contacts.blocks.length === 0) errs.push('home.contacts.blocks: empty')
  for (const b of cfg.home.contacts.blocks) {
    if (!b.label.trim()) errs.push('home.contacts.blocks: empty label')
    if (b.lines.length === 0) errs.push(`home.contacts block "${b.label}": no lines`)
  }
  if (cfg.footer.watermark !== undefined && !cfg.footer.watermark.trim())
    errs.push('footer.watermark: empty string')
  if (cfg.footer.videoTag !== undefined && !cfg.footer.videoTag.trim())
    errs.push('footer.videoTag: empty string')
  if (cfg.footer.cta !== undefined) {
    if (!cfg.footer.cta.label.trim()) errs.push('footer.cta.label: empty string')
    if (!cfg.footer.cta.href.startsWith('/') && !cfg.footer.cta.href.startsWith('mailto:'))
      errs.push('footer.cta.href must start with / or mailto:')
  }
  if (cfg.footer.ctaKicker !== undefined && !cfg.footer.ctaKicker.trim())
    errs.push('footer.ctaKicker: empty string')
  /* optional hero composition layers */
  if (cfg.home.hero.waveOverlap !== undefined && typeof cfg.home.hero.waveOverlap !== 'boolean')
    errs.push('home.hero.waveOverlap must be a boolean')
  if (cfg.home.hero.bgImage !== undefined && !cfg.home.hero.bgImage.src.trim())
    errs.push('home.hero.bgImage: empty src')
  if (cfg.home.hero.bgDim !== undefined && (cfg.home.hero.bgDim < 0 || cfg.home.hero.bgDim > 1))
    errs.push('home.hero.bgDim must be within 0..1')
  if (cfg.home.hero.titleVw !== undefined && !(cfg.home.hero.titleVw >= 6 && cfg.home.hero.titleVw <= 30))
    errs.push('home.hero.titleVw must be within 6..30')
  if (cfg.home.hero.stack !== undefined && typeof cfg.home.hero.stack !== 'boolean')
    errs.push('home.hero.stack must be a boolean')
  if (cfg.home.hero.composition !== undefined && !['banner', 'poster', 'ledger'].includes(cfg.home.hero.composition))
    errs.push(`home.hero.composition: must be 'banner', 'poster' or 'ledger'`)
  if (cfg.home.cube.zoom) {
    const z = cfg.home.cube.zoom
    if (!(z.vw > 0 && z.vw <= 1 && z.vh > 0 && z.vh <= 1 && z.scale > 0 && z.scale <= 1))
      errs.push('home.cube.zoom: vw/vh/scale must be within 0..1')
  }
  if (cfg.home.statement.spotlight) {
    const s = cfg.home.statement.spotlight
    if (s.baseOpacity !== undefined && (s.baseOpacity < 0 || s.baseOpacity > 1))
      errs.push('home.statement.spotlight.baseOpacity must be within 0..1')
    if (s.farBlurPx !== undefined && (s.farBlurPx < 0 || s.farBlurPx > 12))
      errs.push('home.statement.spotlight.farBlurPx must be within 0..12')
    if (s.scramble !== undefined && typeof s.scramble !== 'boolean')
      errs.push('home.statement.spotlight.scramble must be a boolean')
  }
  /* optional signature fluid field */
  if (cfg.home.hero.fluid) {
    const f = cfg.home.hero.fluid
    if (typeof f.enabled !== 'boolean') errs.push('home.hero.fluid.enabled must be a boolean')
    if (f.speed !== undefined && !(f.speed >= 0 && f.speed <= 3)) errs.push('home.hero.fluid.speed must be within 0..3')
    if (f.strength !== undefined && (f.strength < 0 || f.strength > 1)) errs.push('home.hero.fluid.strength must be within 0..1')
    if (f.mouse !== undefined && typeof f.mouse !== 'boolean') errs.push('home.hero.fluid.mouse must be a boolean')
  }

  /* 404 */
  if (cfg.notFound.messages.length === 0) errs.push('notFound.messages: empty')
  if (!cfg.notFound.ctaHref.startsWith('/')) errs.push('notFound.ctaHref must start with /')

  /* interface copy — every engine string must be present and non-empty */
  if (!cfg.copy || typeof cfg.copy !== 'object') {
    errs.push('copy: missing interface copy groups (ui/a11y/cursor)')
  } else {
    for (const group of ['ui', 'a11y', 'cursor'] as const) {
      const g = cfg.copy[group]
      if (!g || typeof g !== 'object') {
        errs.push(`copy.${group}: missing group`)
        continue
      }
      for (const [k, v] of Object.entries(g)) {
        if (typeof v !== 'string' || !v.trim()) errs.push(`copy.${group}.${k}: empty or missing`)
      }
    }
  }

  /* media references exist as strings */
  const allMedia: string[] = [
    ...cfg.menu.rows.flatMap((r) => r.thumbs.map((t) => t.src)),
    ...cfg.home.cube.faces.map((f) => f.src),
    ...cfg.home.hero.wave.map((w) => w.src),
    ...(cfg.footer.media ? [cfg.footer.media.src] : []),
  ]
  for (const src of allMedia) {
    if (!src || (!src.startsWith('/') && !src.startsWith('http')))
      errs.push(`media src "${src}" must be an absolute path or URL`)
  }

  return errs
}

/** Throws when the config is invalid; returns the config for chaining. */
export function assertValidConfig(cfg: SiteConfig): SiteConfig {
  const errs = validateConfig(cfg)
  if (errs.length) {
    throw new Error(`Invalid site config (${errs.length} problem${errs.length === 1 ? '' : 's'}):\n` + errs.map((e) => `  - ${e}`).join('\n'))
  }
  return cfg
}

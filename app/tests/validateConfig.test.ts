import { describe, expect, it } from 'vitest'
import { config } from '../src/config'
import { validateConfig } from '../src/lib/validateConfig'

/* JSON clone is enough — validateConfig never invokes functions. */
const cloneConfig = () => JSON.parse(JSON.stringify(config)) as typeof config

describe('validateConfig', () => {
  it('accepts the shipped config', () => {
    expect(validateConfig(config)).toEqual([])
  })

  it('flags duplicate menu ids', () => {
    const bad = cloneConfig()
    bad.menu.rows[1].id = bad.menu.rows[0].id
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('duplicate') && e.includes('menu.rows'))).toBe(true)
  })

  it('flags illegal numeric bases', () => {
    const bad = cloneConfig()
    bad.cursor.magnetStrength = 1.4
    bad.noise.opacity = -0.2
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('magnetStrength'))).toBe(true)
    expect(errs.some((e) => e.includes('noise.opacity'))).toBe(true)
  })

  it('requires exactly 6 cube faces on home', () => {
    const bad = cloneConfig()
    bad.home.cube.faces = bad.home.cube.faces.slice(0, 5)
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('6 faces') || e.includes('exactly 6'))).toBe(true)
  })

  it('flags bad hex colors and non-kebab ids', () => {
    const bad = cloneConfig()
    bad.theme.accent = 'gold'
    bad.menu.rows[0].id = 'Not Kebab'
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('theme.accent'))).toBe(true)
    expect(errs.some((e) => e.includes('kebab-case'))).toBe(true)
  })

  it('flags loader timing inversion', () => {
    const bad = cloneConfig()
    bad.home.loader.dismissMs = bad.home.loader.holdMs - 1
    expect(validateConfig(bad).some((e) => e.includes('loader'))).toBe(true)
  })

  it('flags malformed density layers', () => {
    const bad = cloneConfig()
    bad.home.statement.statusLines = [{ text: '  ', pos: 'middle' }]
    bad.home.statement.readout = ['ONLY_ONE']
    bad.home.hero.wordColumns = { left: [], right: ['x'] }
    bad.footer.watermark = '   '
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('statusLines'))).toBe(true)
    expect(errs.some((e) => e.includes('readout'))).toBe(true)
    expect(errs.some((e) => e.includes('wordColumns'))).toBe(true)
    expect(errs.some((e) => e.includes('footer.watermark'))).toBe(true)
  })

  it('requires the one-page content sections to be non-empty', () => {
    const bad = cloneConfig()
    bad.home.partners.items = []
    bad.home.contacts.blocks = []
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('partners.items'))).toBe(true)
    expect(errs.some((e) => e.includes('contacts.blocks'))).toBe(true)
  })

  it('flags manifesto em that is not part of its line', () => {
    const bad = cloneConfig()
    bad.home.statement.manifesto!.lines[0].em = 'НЕТ ТАКОГО СЛОВА'
    const errs = validateConfig(bad)
    expect(errs.some((e) => e.includes('manifesto') && e.includes('substring'))).toBe(true)
  })
})

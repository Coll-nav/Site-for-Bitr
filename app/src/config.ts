/* Instance content — the ONLY file a typical adaptation edits.
 * Schema: src/types.ts. Runtime checks: src/lib/validateConfig.ts.
 *
 * АО «ТКРОС» — одностраничный сайт-визитка.
 * Чтобы дополнить виды деятельности, допуски или партнёров,
 * просто добавьте элементы в соответствующие массивы ниже.
 */
import type { SiteConfig } from './types'

const img = (src: string, alt: string, position?: string) => ({ src, alt, ...(position ? { position } : {}) })

export const config: SiteConfig = {
  locale: 'ru',
  siteTitle: 'АО «ТКРОС» — дорожно-строительные работы, капитальный ремонт дорог',
  siteDescription:
    'АО «ТКРОС» — дорожно-строительная компания из Королёва. Капитальный и текущий ремонт автомобильных дорог, устройство покрытий, благоустройство. Допуск СРО, аккредитация в ФКР.',
  brandName: 'АО «ТКРОС»',

  theme: {
    canvas: '#131210',
    surface: '#1c1a17',
    ink: '#ffffff',
    menuBg: '#ece9e3',
    menuInk: '#191612',
    menuLine: 'rgba(25, 22, 18, 0.14)',
    accent: '#ff6026',
    glow: '#ff6026',
    muted: '#8f8a83',
    faint: '#63605a',
    /* "scroll = descent": от светлого бетона поверхности
     * вниз через слои дорожной одежды — к битумной глубине */
    depthZones: {
      surface: '#e8e5df',
      drift: '#b3aea4',
      twilight: '#4f4b44',
      deep: '#1d1a16',
      abyss: '#0b0a08',
    },
  },

  /* signature chrome: right-edge depth gauge replaces the top progress bar */
  depthGauge: { enabled: true, maxDepthM: 120 },

  menu: {
    brandMark: 'Т·К',
    email: 'muptkros@yandex.ru',
    homeLabel: 'ГЛАВНАЯ',
    openAria: 'Открыть меню',
    closeAria: 'Закрыть меню',
    mailAria: 'Написать нам письмо',
    form: 'dock',
    layout: 'ledger',
    rows: [
      {
        id: 'about',
        label: 'О КОМПАНИИ',
        subLabel: '( ТКРОС )',
        href: '/#about',
        thumbs: [img('/media/tex-asphalt.jpg', 'Асфальтобетонное покрытие'), img('/media/tex-patch.jpg', 'Ремонтная карта на покрытии')],
      },
      {
        id: 'activities',
        label: 'ДЕЯТЕЛЬНОСТЬ',
        subLabel: '( РАБОТЫ )',
        href: '/#activities',
        thumbs: [img('/media/tex-dashes.jpg', 'Разметка проезжей части'), img('/media/tex-amberline.jpg', 'Укладка асфальтобетона')],
      },
      {
        id: 'credentials',
        label: 'ДОПУСКИ',
        subLabel: '( СРО · ФКР )',
        href: '/#credentials',
        thumbs: [img('/media/tex-hazard.jpg', 'Ограждение участка работ'), img('/media/tex-concrete.jpg', 'Цементобетонное основание')],
      },
      {
        id: 'partners',
        label: 'ПАРТНЁРЫ',
        subLabel: '( ФКР )',
        href: '/#partners',
        thumbs: [img('/media/tex-gravel.jpg', 'Щебеночное основание'), img('/media/tex-asphalt.jpg', 'Готовое покрытие')],
      },
      {
        id: 'contacts',
        label: 'КОНТАКТЫ',
        subLabel: '( СВЯЗЬ )',
        href: '/#contacts',
        thumbs: [img('/media/tex-crack.jpg', 'Заделка трещин'), img('/media/tex-dashes.jpg', 'Дорожная разметка')],
      },
    ],
  },

  cursor: {
    enabled: true,
    magnetStrength: 0.22,
    defaultLabel: 'ОТКРЫТЬ',
    trail: true,
  },

  noise: {
    enabled: true,
    opacity: 0.06,
    density: 0.7,
    fps: 25,
    fpsHold: 12,
  },

  footer: {
    marqueeWords: ['ТКРОС'],
    email: 'muptkros@yandex.ru',
    phone: '+7 (495) 516-59-20',
    address: '141070, Московская обл., г. Королёв, ул. Карла Маркса, д. 10А',
    socials: [],
    backToTopLabel: 'НАВЕРХ ↑',
    copyright: '© 2026 АО «ТКРОС» — дорожно-строительные работы',
    watermark: 'Т',
    media: img('/media/tex-footer.jpg', 'Асфальтобетонное покрытие с осевой разметкой'),
    videoTag: 'ПОКРЫТИЕ — УЧАСТОК СДАН',
    cta: { label: 'Написать нам', href: 'mailto:muptkros@yandex.ru' },
    ctaKicker: 'ОБСУДИМ УЧАСТОК, СРОКИ И СМЕТУ',
  },

  home: {
    loader: { enabled: true, letters: ['Т', 'К'], holdMs: 2400, dismissMs: 2900 },
    hero: {
      kicker: 'ДОРОЖНО-СТРОИТЕЛЬНЫЕ РАБОТЫ',
      brandWord: 'ТКРОС',
      brandWordOutline: 'дороги',
      subLine: 'Подрядная организация из Королёва. Капитальный и текущий ремонт автомобильных дорог — от проезжей части до дворовых проездов.',
      composition: 'ledger',
      titleVw: 24,
      wave: [
        img('/media/tex-asphalt.jpg', 'Образец: асфальтобетон'),
        img('/media/tex-gravel.jpg', 'Образец: щебеночное основание'),
        img('/media/tex-dashes.jpg', 'Образец: дорожная разметка'),
        img('/media/tex-patch.jpg', 'Образец: ремонтная карта'),
        img('/media/tex-concrete.jpg', 'Образец: цементобетон'),
      ],
      waveDrift: true,
      fluid: { enabled: true, speed: 1, strength: 0.65, mouse: true },
    },
    marquee: {
      direction: -1,
      items: [
        { text: 'КАПИТАЛЬНЫЙ РЕМОНТ', label: '( ПРОФИЛЬ )' },
        { text: 'ТЕКУЩИЙ РЕМОНТ', label: '( СОДЕРЖАНИЕ )' },
        { text: 'АСФАЛЬТИРОВАНИЕ', label: '( ПОКРЫТИЯ )' },
        { text: 'БЛАГОУСТРОЙСТВО', label: '( ТЕРРИТОРИИ )' },
      ],
    },
    cube: {
      faces: [
        img('/media/cube-1.jpg', 'Слой: асфальтобетонное покрытие'),
        img('/media/cube-2.jpg', 'Слой: разметка'),
        img('/media/cube-3.jpg', 'Слой: сигнальная полоса'),
        img('/media/cube-4.jpg', 'Слой: ремонтная карта'),
        img('/media/cube-5.jpg', 'Слой: щебеночное основание'),
        img('/media/cube-6.jpg', 'Слой: цементобетон'),
      ],
      caption: 'ДОРОЖНАЯ ОДЕЖДА — ЛИСТАЙТЕ СЛОИ',
      zoom: { vw: 0.44, vh: 0.72, scale: 0.9 },
    },
    statement: {
      heightPx: 4200,
      manifesto: {
        lines: [
          { text: 'АО «ТКРОС» — дорожно-строительная' },
          { text: 'компания из Королёва.' },
          { text: 'Работаем в отрасли с 2010 года.', em: '2010' },
          { text: 'Профиль — капитальный ремонт', em: 'капитальный ремонт' },
          { text: 'автомобильных дорог и проездов:' },
          { text: 'покрытие, основание, водоотвод,' },
          { text: 'обустройство и разметка.' },
          { text: 'Возвращаем дорогам ровность —', em: 'ровность' },
          { text: 'участок за участком.' },
          { text: 'Допуск СРО. Аккредитация ФКР.', em: 'Аккредитация ФКР' },
          { text: 'Работаем по государственным' },
          { text: 'и муниципальным контрактам.', em: 'контрактам' },
        ],
      },
      statusLines: [
        { text: 'ФРЕЗЕРОВАНИЕ ПОКРЫТИЯ', pos: 'left', offsetY: -40 },
        { text: 'УКЛАДКА АСФАЛЬТОБЕТОНА', pos: 'q1', offsetY: -24 },
        { text: 'УПЛОТНЕНИЕ КАТКАМИ', pos: 'left', offsetY: -40 },
        { text: 'НАНЕСЕНИЕ РАЗМЕТКИ', pos: 'q1', offsetY: -24 },
      ],
      readout: ['РАБОТАЕМ_С_2010', 'КОРОЛЁВ_МО', 'СРО_+_ФКР'],
      spotlight: { baseOpacity: 0.6, farBlurPx: 2, scramble: true },
    },
    capabilities: {
      heading: 'ОСНОВНЫЕ ВИДЫ ДЕЯТЕЛЬНОСТИ',
      items: [
        {
          index: '01',
          title: 'Капитальный ремонт автомобильных дорог',
          body: 'Полное восстановление транспортно-эксплуатационного состояния дороги: замена и восстановление дорожных одежд, усиление основания и земляного полотна, ремонт систем водоотвода, водопропускных труб и элементов обустройства. Геометрия и границы дороги не меняются — характеристики доводятся до норм её категории.',
        },
        {
          index: '02',
          title: 'Текущий ремонт и содержание дорог',
          body: 'Фрезерование изношенного слоя и укладка нового асфальтобетона, ликвидация выбоин, просадок и колей, ямочный ремонт, заделка трещин, досыпка и укрепление обочин, замена бордюров, восстановление дорожной разметки.',
        },
        {
          index: '03',
          title: 'Устройство дорожных покрытий',
          body: 'Асфальтирование проездов, улиц и территорий: подготовка и укрепление основания, пошаговая укладка и уплотнение смеси, устройство примыканий, съездов и тротуаров.',
        },
        {
          index: '04',
          title: 'Благоустройство территорий',
          body: 'Дворовые проезды и пешеходные зоны, остановочные площадки, бордюрные пандусы и элементы безбарьерной среды, нанесение разметки и установка дорожных знаков.',
        },
      ],
    },
    credentials: {
      heading: 'ДОПУСКИ И АККРЕДИТАЦИИ',
      items: [
        {
          index: 'СРО',
          title: 'Членство в СРО',
          body: 'АО «ТКРОС» — член саморегулируемой организации строителей. Допуск к выполнению строительных и дорожно-строительных работ по договорам строительного подряда, включая работы по государственным и муниципальным контрактам.',
        },
        {
          index: 'ФКР',
          title: 'Аккредитация в ФКР',
          body: 'Компания включена в реестр квалифицированных подрядных организаций Фонда капитального ремонта Московской области и допущена к участию в торгах на выполнение работ по капитальному ремонту.',
        },
      ],
    },
    partners: {
      heading: 'ПАРТНЁРЫ',
      note: 'СПИСОК ПОПОЛНЯЕТСЯ',
      items: [
        {
          index: '01',
          name: 'ФКР',
          fullName: 'Фонд капитального ремонта Московской области',
          body: 'Региональный оператор программы капитального ремонта. Основной заказчик работ, выполняемых АО «ТКРОС» в рамках капитального ремонта.',
        },
      ],
    },
    contacts: {
      heading: 'КОНТАКТЫ',
      blocks: [
        { label: 'АДРЕС', lines: ['141070, Московская обл.,', 'г. Королёв, ул. Карла Маркса, д. 10А'] },
        { label: 'ТЕЛЕФОН', lines: ['+7 (495) 516-59-20'] },
        { label: 'ПОЧТА', lines: ['muptkros@yandex.ru'] },
        { label: 'РЕЖИМ РАБОТЫ', lines: ['будни — с 9:00 до 18:00', 'сб, вс — выходной'] },
        { label: 'РЕКВИЗИТЫ', lines: ['АО «ТКРОС»', 'ИНН 5018145292 · КПП 501801001', 'ОГРН 1105018003881'] },
      ],
    },
  },

  notFound: {
    heading: 'ОШИБКА 404: СЪЕЗД НЕ НАЙДЕН',
    messages: [
      'Этой страницы на нашей карте нет.',
      'Навигатор ниже знает дорогу назад.',
      'Нажмите ПРОБЕЛ — подпрыгнуть полезно всем.',
    ],
    ctaLabel: 'ВЕРНУТЬСЯ НА ГЛАВНУЮ',
    ctaHref: '/',
    hiScoreLabel: 'РЕКОРД',
  },

  copy: {
    ui: {
      skipLink: 'Перейти к содержимому',
      notFoundHint: 'ПРОБЕЛ / ТАП — БЕГИ С БЕГУНОМ',
      notFoundGameOver: 'ФИНИШ — ПРОБЕЛ, ЧТОБЫ НАЧАТЬ ЗАНОВО',
    },
    a11y: {
      loading: 'Загрузка',
      menuNav: 'Основная навигация',
      socials: 'Ссылки',
      cube: 'Слои дорожной одежды',
    },
    cursor: {
      home: 'ГЛАВНАЯ',
      contact: 'НАПИСАТЬ',
      open: 'ОТКРЫТЬ',
      top: 'НАВЕРХ',
    },
  },
}

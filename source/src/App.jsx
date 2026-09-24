import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Baby,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  CloudCog,
  Coffee,
  Crown,
  Download,
  Flame,
  Gamepad2,
  Gauge,
  Gem,
  GitBranch,
  Goal,
  GraduationCap,
  Grip,
  Hand,
  HeartPulse,
  Info,
  Keyboard,
  LockKeyhole,
  Medal,
  Megaphone,
  Mic2,
  Music2,
  MousePointerClick,
  PartyPopper,
  Plus,
  Radio,
  RotateCcw,
  Route,
  ScanEye,
  ScrollText,
  Settings2,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Swords,
  Target,
  Timer,
  Trophy,
  Upload,
  UserPlus,
  Users,
  UsersRound,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'
import {
  ACHIEVEMENTS,
  BOOSTS,
  CLICK_UPGRADES,
  LEGEND_DAILY,
  LEGEND_OPPONENTS,
  LEGEND_QUESTS,
  LEGEND_UPGRADES,
  PLAYERS,
  PUCK_MILESTONES,
  SEASON_BOOSTS,
  SEASON_OPPONENTS,
  SUPPORT_UPGRADES,
  TEAM_TABS,
  ULTRA_BOOSTS,
  ULTRAS,
  getUpgradeCost,
  rankByTotal,
} from './data'

const STORAGE_KEY = 'puck-virevolt-save-v1'
const OFFLINE_CAP_SECONDS = 4 * 60 * 60

const NAV_ITEMS = [
  { id: 'home', label: ' vestiaire', short: 'Accueil', icon: Gamepad2 },
  { id: 'roster', label: ' effectif', short: 'Effectif', icon: UsersRound },
  { id: 'training', label: ' entraînement', short: 'Équipe', icon: Gauge },
  { id: 'ultras', label: ' supporters', short: 'Ultras', icon: Megaphone },
  { id: 'hockey', label: ' temps de jeu', short: 'Hockey', icon: Swords },
  { id: 'season', label: ' saison', short: 'Saison', icon: CalendarDays },
  { id: 'trophies', label: ' palmarès', short: 'Palmarès', icon: Trophy },
  { id: 'legend', label: ' légende', short: 'Légende', icon: Crown },
]

const ICONS = {
  baby: Baby,
  snowflake: Snowflake,
  hand: Hand,
  grip: Grip,
  route: Route,
  trophy: Trophy,
  sparkles: Sparkles,
  'scan-eye': ScanEye,
  crown: Crown,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  radio: Radio,
  coffee: Coffee,
  users: Users,
  'building-2': Building2,
  'briefcase-business': BriefcaseBusiness,
  megaphone: Megaphone,
  'mic-2': Mic2,
  'party-popper': PartyPopper,
  medal: Medal,
  zap: Zap,
  timer: Timer,
  'git-branch': GitBranch,
  goal: Goal,
  'gamepad-2': Gamepad2,
  'scroll-text': ScrollText,
  'circle-dot': CircleDot,
  'mouse-pointer-click': MousePointerClick,
  'user-plus': UserPlus,
  'users-round': UsersRound,
  gauge: Gauge,
  gem: Gem,
  swords: Swords,
  'shield-check': ShieldCheck,
}

// Symboles d’ambiance pour les contrées fictives de l’univers Virevolt.
const FLAGS = {
  VI: '◈',
  LU: '✦',
  HE: '☀',
  SA: '≈',
  KA: '◇',
  TA: '✧',
  NO: '◌',
}

const ULTRA_CHANTS = {
  singing: {
    title: 'Cap sur l’aurore',
    lines: [
      { original: 'Cap sur l’aurore, les patins en feu.', spoken: 'Cap sur l’aurore, les patins en feu.' },
      { original: 'La baie s’éveille, le cœur bat neuf.', spoken: 'La baie s’éveille, le cœur bat neuf.' },
      { original: 'Virevolt, regarde le ciel s’ouvrir.', spoken: 'Virevolt, regarde le ciel s’ouvrir.' },
      { original: 'Un seul chemin, une seule fierté.', spoken: 'Un seul chemin, une seule fierté.' },
      { original: 'Poussons ensemble le soir obscur.', spoken: 'Poussons ensemble le soir obscur.' },
      { original: 'Chaque étoile suit notre élan.', spoken: 'Chaque étoile suit notre élan.' },
      { original: 'Au prochain coup, on sera prêts.', spoken: 'Au prochain coup, on sera prêts.' },
      { original: 'Virevolt, jamais sans élan.', spoken: 'Virevolt, jamais sans élan.' },
    ],
  },
  'parterre-nord-standing': {
    title: 'La Muraille d’Aurore',
    lines: [
      { original: 'Debout les Veilleurs !', spoken: 'Debout les Veilleurs !' },
      { original: 'La glace est à nous.', spoken: 'La glace est à nous.' },
      { original: 'Bleu, bleu, cap sur le ciel !', spoken: 'Bleu, bleu, cap sur le ciel !' },
      { original: 'Encore une vague, encore un effort !', spoken: 'Encore une vague, encore un effort !' },
    ],
  },
  'scarf-rave': {
    title: 'La vague Prisme',
    lines: [
      { original: 'Écharpes en l’air !', spoken: 'Écharpes en l’air !' },
      { original: 'Virevolt, Virevolt !', spoken: 'Virevolt, Virevolt !' },
      { original: 'Le vent porte notre refrain !', spoken: 'Le vent porte notre refrain !' },
    ],
  },
}

const ORIGINAL_MEDIA = {
  singing: {
    kind: 'singing',
    title: 'Cap sur l’aurore',
    eyebrow: 'Chant original · Chœur Zénith',
    description: 'Un chant écrit et composé pour ce jeu. Les paroles sont affichées ici et la voix optionnelle est produite par le navigateur.',
    lines: ULTRA_CHANTS.singing.lines,
  },
  chant: {
    kind: 'parterre-nord-standing',
    title: 'La Muraille d’Aurore',
    eyebrow: 'Chant original · Tribune Prisme',
    description: 'Un deuxième chant original pour faire vibrer la tribune et lancer un boost collectif.',
    lines: ULTRA_CHANTS['parterre-nord-standing'].lines,
  },
  goal: {
    kind: 'goal',
    title: 'Éclat final',
    eyebrow: 'Célébration sonore · originale',
    description: 'La corne d’Éclat est générée directement dans le navigateur pour signaler un but, une victoire ou un palier de pucks.',
    lines: [],
  },
}

const ULTRA_BONUS = {
  'north-stand': { id: 'north-stand', seconds: 180 },
  singing: { id: 'singing', seconds: 300 },
  tifo: { id: 'tifo-ultra', seconds: 120 },
  history: { id: 'history-ultra', seconds: 120 },
  'parterre-nord-standing': { id: 'parterre-nord-standing', seconds: 240 },
}

const MILESTONES = [
  0,
  100,
  1_000,
  10_000,
  100_000,
  1_000_000,
  10_000_000,
  100_000_000,
  1_000_000_000,
  10_000_000_000,
  100_000_000_000,
  1_000_000_000_000,
]

function getReachedMilestoneIds(total) {
  return PUCK_MILESTONES.filter((milestone) => total >= milestone.value).map((milestone) => milestone.id)
}

function getNextPuckMilestone(total) {
  return PUCK_MILESTONES.find((milestone) => total < milestone.value) || null
}

function getPuckMilestoneProgress(total, milestone) {
  if (!milestone) return 1
  const index = PUCK_MILESTONES.findIndex((item) => item.id === milestone.id)
  const previous = index > 0 ? PUCK_MILESTONES[index - 1].value : 0
  return Math.max(0, Math.min(1, (total - previous) / (milestone.value - previous)))
}

function getDayKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function ensureLegendDaily(game) {
  const today = getDayKey()
  if (game.legend?.dailyDay === today) return game
  return {
    ...game,
    legend: {
      ...game.legend,
      dailyDay: today,
      dailyClicks: 0,
      dailyClaimed: [],
    },
  }
}

function createInitialState() {
  return {
    pucks: 0,
    totalPucks: 0,
    clicks: 0,
    players: {},
    upgrades: {},
    ultras: {},
    boosts: {},
    achievements: [],
    achievementClaims: [],
    milestoneReached: [],
    stats: {
      faceoffs: 0,
      faceoffWins: 0,
      miniGamesPlayed: 0,
      miniGamesWon: 0,
      secondsPlayed: 0,
    },
    season: {
      week: 0,
      wins: 0,
      losses: 0,
      points: 0,
      streak: 0,
      history: [],
      lastReport: null,
      seasonNumber: 1,
      scouted: 0,
    },
    legend: {
      glory: 0,
      claimedQuests: [],
      upgrades: {},
      dailyDay: getDayKey(),
      dailyClicks: 0,
      dailyClaimed: [],
      tournament: {
        round: 0,
        wins: 0,
        losses: 0,
        champion: false,
        lastReport: null,
        edition: 1,
      },
    },
    lastSaved: Date.now(),
  }
}

function normalizeSave(value) {
  const initial = createInitialState()
  if (!value || typeof value !== 'object') return initial

  const numeric = (entry, fallback = 0) =>
    Number.isFinite(Number(entry)) ? Math.max(0, Number(entry)) : fallback

  return {
    ...initial,
    ...value,
    pucks: numeric(value.pucks),
    totalPucks: numeric(value.totalPucks),
    clicks: Math.floor(numeric(value.clicks)),
    players: value.players && typeof value.players === 'object' ? value.players : {},
    upgrades: value.upgrades && typeof value.upgrades === 'object' ? value.upgrades : {},
    ultras: value.ultras && typeof value.ultras === 'object' ? value.ultras : {},
    boosts: value.boosts && typeof value.boosts === 'object' ? value.boosts : {},
    achievements: Array.isArray(value.achievements) ? value.achievements : [],
    achievementClaims: Array.isArray(value.achievementClaims) ? value.achievementClaims : [],
    milestoneReached: Array.isArray(value.milestoneReached)
      ? value.milestoneReached.filter((id) => PUCK_MILESTONES.some((milestone) => milestone.id === id))
      : getReachedMilestoneIds(numeric(value.totalPucks)),
    stats: {
      ...initial.stats,
      ...(value.stats && typeof value.stats === 'object' ? value.stats : {}),
    },
    season: {
      ...initial.season,
      ...(value.season && typeof value.season === 'object' ? value.season : {}),
      week: Math.min(SEASON_OPPONENTS.length, Math.floor(numeric(value.season?.week))),
      wins: Math.floor(numeric(value.season?.wins)),
      losses: Math.floor(numeric(value.season?.losses)),
      points: Math.floor(numeric(value.season?.points)),
      streak: Math.floor(numeric(value.season?.streak)),
      history: Array.isArray(value.season?.history) ? value.season.history : [],
      lastReport: value.season?.lastReport || null,
      seasonNumber: Math.max(1, Math.floor(numeric(value.season?.seasonNumber, 1))),
      scouted: Math.floor(numeric(value.season?.scouted)),
    },
    legend: {
      ...initial.legend,
      ...(value.legend && typeof value.legend === 'object' ? value.legend : {}),
      glory: Math.floor(numeric(value.legend?.glory)),
      claimedQuests: Array.isArray(value.legend?.claimedQuests) ? value.legend.claimedQuests : [],
      upgrades: value.legend?.upgrades && typeof value.legend.upgrades === 'object' ? value.legend.upgrades : {},
      dailyDay: value.legend?.dailyDay || getDayKey(),
      dailyClicks: Math.floor(numeric(value.legend?.dailyClicks)),
      dailyClaimed: Array.isArray(value.legend?.dailyClaimed) ? value.legend.dailyClaimed : [],
      tournament: {
        ...initial.legend.tournament,
        ...(value.legend?.tournament && typeof value.legend.tournament === 'object' ? value.legend.tournament : {}),
        round: Math.min(LEGEND_OPPONENTS.length, Math.floor(numeric(value.legend?.tournament?.round))),
        wins: Math.floor(numeric(value.legend?.tournament?.wins)),
        losses: Math.floor(numeric(value.legend?.tournament?.losses)),
        champion: Boolean(value.legend?.tournament?.champion),
        lastReport: value.legend?.tournament?.lastReport || null,
        edition: Math.max(1, Math.floor(numeric(value.legend?.tournament?.edition, 1))),
      },
    },
    lastSaved: numeric(value.lastSaved, Date.now()),
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? normalizeSave(JSON.parse(raw)) : createInitialState()
  } catch {
    return createInitialState()
  }
}

function persistGame(game) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...game, lastSaved: Date.now() }))
  } catch {
    // Le jeu reste utilisable même si le navigateur bloque le stockage local.
  }
}

function getMetric(game, now = Date.now()) {
  const playerProduction = PLAYERS.reduce(
    (sum, player) => sum + (game.players[player.id] ? player.rate : 0),
    0,
  )

  const supportProduction = SUPPORT_UPGRADES.reduce(
    (sum, item) => sum + (game.upgrades[item.id] || 0) * item.gain,
    0,
  )

  const rawClickPower = CLICK_UPGRADES.reduce(
    (sum, item) => sum + (game.upgrades[item.id] || 0) * item.gain,
    0,
  )

  let clickBonus = 0
  let productionBonus = 0
  const activeBoosts = []

  for (const upgrade of LEGEND_UPGRADES) {
    if (game.legend?.upgrades?.[upgrade.id]) {
      clickBonus += upgrade.click
      productionBonus += upgrade.production
    }
  }

  for (const boost of [...BOOSTS, ...Object.values(ULTRA_BOOSTS), ...Object.values(SEASON_BOOSTS)]) {
    const endsAt = game.boosts[boost.id] || 0
    if (endsAt > now) {
      clickBonus += boost.click
      productionBonus += boost.production
      activeBoosts.push({ ...boost, endsAt })
    }
  }

  if ((game.boosts['history-bonus'] || 0) > now) {
    clickBonus += 1
    productionBonus += 1
    activeBoosts.push({
      id: 'history-bonus',
      name: 'Héritage des champions',
      icon: 'trophy',
      endsAt: game.boosts['history-bonus'],
      click: 1,
      production: 1,
    })
  }

  const baseProduction = playerProduction + supportProduction
  const clickSynergy = Math.log2(baseProduction + 1) * 0.4
  const clickMultiplier = 1 + clickBonus
  const productionMultiplier = 1 + productionBonus

  return {
    playerProduction,
    supportProduction,
    baseProduction,
    baseClickPower: 1 + rawClickPower,
    clickPower: (1 + rawClickPower + clickSynergy) * clickMultiplier,
    production: baseProduction * productionMultiplier,
    clickMultiplier,
    productionMultiplier,
    clickBonus,
    productionBonus,
    activeBoosts,
  }
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value))
}

function getRosterPower(game, now = Date.now()) {
  const recruited = PLAYERS.filter((player) => game.players[player.id])
  const averageRating = recruited.length
    ? recruited.reduce((sum, player) => sum + player.rating, 0) / recruited.length
    : 38
  const eliteCount = recruited.filter((player) => player.rating >= 85).length
  const metric = getMetric(game, now)
  const depthBonus = Math.min(8, recruited.length * 0.35)
  const eliteBonus = Math.min(18, eliteCount * 1.8)
  const productionBonus = Math.min(16, Math.log10(metric.production + 1) * 3.4)
  const clickBonus = Math.min(8, Math.max(0, metric.baseClickPower - 1) * 0.18)
  const power =
    24 +
    Math.max(0, averageRating - 38) * 1.05 +
    depthBonus +
    eliteBonus +
    productionBonus +
    clickBonus
  return clamp(power, 10, 100)
}

function getMatchChance(game, opponent, now = Date.now()) {
  const power = getRosterPower(game, now)
  const edge = power - opponent.strength
  const streakMomentum = Math.min(game.season?.streak || 0, 5) * 0.015
  const baseChance = 0.1 + 0.78 / (1 + Math.exp(-edge / 10))
  return clamp(baseChance + streakMomentum, 0.1, 0.9)
}

function getSeasonOpponent(game) {
  const index = (game.season?.week || 0) % SEASON_OPPONENTS.length
  return SEASON_OPPONENTS[index]
}

function cloneGameForSimulation(game) {
  return {
    ...game,
    players: { ...game.players },
    upgrades: { ...game.upgrades },
    ultras: { ...game.ultras },
    boosts: { ...game.boosts },
    achievements: [...(game.achievements || [])],
    achievementClaims: [...(game.achievementClaims || [])],
    milestoneReached: [...(game.milestoneReached || [])],
    stats: { ...game.stats },
    season: {
      ...game.season,
      history: [...game.season.history],
      lastReport: game.season.lastReport,
    },
    legend: {
      ...game.legend,
      claimedQuests: [...(game.legend?.claimedQuests || [])],
      upgrades: { ...(game.legend?.upgrades || {}) },
      dailyClaimed: [...(game.legend?.dailyClaimed || [])],
      tournament: {
        ...(game.legend?.tournament || {}),
        lastReport: game.legend?.tournament?.lastReport || null,
      },
    },
  }
}

function chooseSeasonBoost(random = Math.random) {
  const boosts = Object.values(SEASON_BOOSTS)
  return boosts[Math.floor(random() * boosts.length)] || boosts[0]
}

function chooseScout(game, random = Math.random) {
  const available = PLAYERS.filter((player) => !game.players[player.id])
  if (available.length === 0) return null
  const shortlist = [...available].sort((a, b) => a.cost - b.cost).slice(0, 6)
  return shortlist[Math.floor(random() * shortlist.length)] || shortlist[0]
}

function simulateMatch(game, opponent, now = Date.now(), random = Math.random) {
  const working = ensureLegendDaily(cloneGameForSimulation(game))
  const chance = getMatchChance(working, opponent, now)
  const won = random() < chance
  const metric = getMetric(working, now)
  let scoreFor
  let scoreAgainst
  if (won) {
    scoreFor = 2 + Math.floor(random() * 3)
    scoreAgainst = Math.max(0, scoreFor - 1 - Math.floor(random() * 2))
  } else {
    scoreFor = Math.floor(random() * 2)
    scoreAgainst = scoreFor + 1 + Math.floor(random() * 2)
  }

  const reward = won
    ? Math.round(
        (450 + opponent.strength * 28 + working.season.week * 110) *
          (1 + Math.min(1.2, metric.production / 8000)),
      )
    : 0
  const boost = won ? chooseSeasonBoost(random) : null
  const scout = won && random() < 0.1 ? chooseScout(working, random) : null

  if (won) {
    working.pucks += reward
    working.totalPucks += reward
    working.boosts[boost.id] = now + boost.duration * 1000
  }
  if (scout) {
    working.players[scout.id] = true
    working.season.scouted += 1
  }

  working.season.week += 1
  working.season.wins += won ? 1 : 0
  working.season.losses += won ? 0 : 1
  working.season.points += won ? 2 : 0
  working.season.streak = won ? working.season.streak + 1 : 0

  const report = {
    type: 'match',
    opponentId: opponent.id,
    opponentName: opponent.name,
    won,
    scoreFor,
    scoreAgainst,
    reward,
    chance,
    boostId: boost?.id || null,
    boostName: boost?.name || null,
    boostEndsAt: boost ? now + boost.duration * 1000 : null,
    scoutedId: scout?.id || null,
    scoutedName: scout?.name || null,
    week: working.season.week,
  }
  working.season.history = [...working.season.history.slice(-11), report]
  working.season.lastReport = report
  return { game: working, report }
}

function simulateSeason(game, targetGames, now = Date.now()) {
  let working = cloneGameForSimulation(game)
  const reports = []
  const maxGames = Math.min(targetGames, SEASON_OPPONENTS.length - working.season.week)
  for (let index = 0; index < maxGames; index += 1) {
    const opponent = getSeasonOpponent(working)
    const result = simulateMatch(working, opponent, now + index * 1000)
    working = result.game
    reports.push(result.report)
  }
  const wins = reports.filter((report) => report.won).length
  const reward = reports.reduce((sum, report) => sum + report.reward, 0)
  const summary = {
    type: 'season',
    games: reports.length,
    wins,
    losses: reports.length - wins,
    points: wins * 2,
    reward,
    scouted: reports.filter((report) => report.scoutedId).map((report) => report.scoutedName),
    at: now,
  }
  working.season.lastReport = reports.length > 0 ? summary : game.season.lastReport
  return { game: working, summary }
}

function simulateLegendRound(game, now = Date.now(), random = Math.random) {
  const working = ensureLegendDaily(cloneGameForSimulation(game))
  const tournament = working.legend.tournament
  const opponent = LEGEND_OPPONENTS[Math.min(tournament.round, LEGEND_OPPONENTS.length - 1)]
  const chance = getMatchChance(working, opponent, now)
  const won = random() < chance
  let scoreFor
  let scoreAgainst
  if (won) {
    scoreFor = 3 + Math.floor(random() * 3)
    scoreAgainst = Math.max(0, scoreFor - 1 - Math.floor(random() * 2))
  } else {
    scoreFor = Math.floor(random() * 3)
    scoreAgainst = scoreFor + 1 + Math.floor(random() * 2)
  }
  const finalRound = tournament.round === LEGEND_OPPONENTS.length - 1
  const reward = won
    ? Math.round(1_500_000 + opponent.strength * 25_000 + tournament.round * 500_000 + (finalRound ? 5_000_000 : 0))
    : 0
  const glory = won ? 100 + tournament.round * 75 + (finalRound ? 1000 : 0) : 15
  const boost = won ? chooseSeasonBoost(random) : null

  working.pucks += reward
  working.totalPucks += reward
  working.legend.glory += glory
  tournament.losses += won ? 0 : 1
  tournament.wins += won ? 1 : 0
  if (won) {
    working.boosts[boost.id] = now + boost.duration * 1000
    tournament.round += 1
    if (finalRound) tournament.champion = true
  }

  const report = {
    opponentId: opponent.id,
    opponentName: opponent.name,
    won,
    scoreFor,
    scoreAgainst,
    reward,
    glory,
    chance,
    finalRound,
    champion: tournament.champion,
    boostId: boost?.id || null,
    boostName: boost?.name || null,
    boostEndsAt: boost ? now + boost.duration * 1000 : null,
  }
  tournament.lastReport = report
  return { game: working, report }
}

function resetLegendTournament(game) {
  const next = cloneGameForSimulation(game)
  next.legend.tournament = {
    round: 0,
    wins: 0,
    losses: 0,
    champion: false,
    lastReport: null,
    edition: game.legend.tournament.edition + 1,
  }
  return next
}

function formatNumber(value, exact = false) {
  if (exact || Math.abs(value) < 1_000) {
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: value < 10 && !Number.isInteger(value) ? 2 : 0,
    }).format(value)
  }

  return new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    maximumFractionDigits: value < 10_000 ? 2 : 1,
  }).format(value)
}

function formatRate(value) {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: value < 10 && !Number.isInteger(value) ? 1 : 0,
    maximumFractionDigits: value < 10 && !Number.isInteger(value) ? 2 : 0,
  }).format(value)
}

function formatDuration(milliseconds) {
  const total = Math.max(0, Math.ceil(milliseconds / 1000))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}`
  if (minutes > 0) return `${minutes}:${String(seconds).padStart(2, '0')}`
  return `${seconds}s`
}

function getBatchCost(item, owned, quantity) {
  let total = 0
  for (let index = 0; index < quantity; index += 1) {
    total += getUpgradeCost(item, owned + index)
  }
  return total
}

function getMaxAffordable(item, pucks) {
  let owned = 0
  let total = 0
  let cost = getUpgradeCost(item, 0)
  while (total + cost <= pucks && owned < 2_000) {
    total += cost
    owned += 1
    cost = getUpgradeCost(item, owned)
  }
  return owned
}

function getNextRank(total) {
  const next = MILESTONES.find((milestone) => milestone > total) ?? MILESTONES.at(-1)
  const previous = [...MILESTONES].reverse().find((milestone) => milestone <= total) ?? 0
  const rawProgress = next === previous ? 1 : (total - previous) / (next - previous)
  return {
    next,
    previous,
    progress: Math.max(0, Math.min(1, rawProgress)),
  }
}

function PuckGlyph({ className = '' }) {
  return <span className={`puck-glyph ${className}`} aria-hidden="true"><span /></span>
}

function DynamicIcon({ name, size = 20, strokeWidth = 2 }) {
  const Icon = ICONS[name] || Sparkles
  return <Icon size={size} strokeWidth={strokeWidth} />
}

const PORTRAIT_PALETTES = [
  ['#16c7d9', '#705cff'],
  ['#ff8a65', '#c9377a'],
  ['#9ee66d', '#1c8ca8'],
  ['#ffd166', '#e4578d'],
  ['#6ce5d1', '#3e6ee8'],
]

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function PlayerPortrait({ player, className = '' }) {
  const hash = [...player.id].reduce((sum, character) => sum + character.charCodeAt(0), 0)
  const [colorA, colorB] = PORTRAIT_PALETTES[hash % PORTRAIT_PALETTES.length]
  return (
    <div
      className={`player-portrait ${className}`}
      style={{ '--portrait-a': colorA, '--portrait-b': colorB }}
      role="img"
      aria-label={`Portrait illustré de ${player.name}`}
    >
      <span className="portrait-orbit" aria-hidden="true" />
      <span className="portrait-stars" aria-hidden="true">✦　·　✧</span>
      <span className="portrait-head" aria-hidden="true"><i /></span>
      <span className="portrait-jersey" aria-hidden="true"><b>{player.number}</b><small>{getInitials(player.name)}</small></span>
      <span className="portrait-glint" aria-hidden="true" />
    </div>
  )
}

function App() {
  const [game, setGame] = useState(createInitialState)
  const [tab, setTab] = useState('home')
  const [buyMode, setBuyMode] = useState('x1')
  const [seasonBusy, setSeasonBusy] = useState(false)
  const [legendBusy, setLegendBusy] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [particles, setParticles] = useState([])
  const [toast, setToast] = useState(null)
  const [chantOverlay, setChantOverlay] = useState(null)
  const [musicOn, setMusicOn] = useState(true)
  const [now, setNow] = useState(Date.now())
  const todayKey = getDayKey(new Date(now))
  const [offlineReward, setOfflineReward] = useState(0)
  const [showReset, setShowReset] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [supporterVideo, setSupporterVideo] = useState(null)
  const [savePulse, setSavePulse] = useState(0)
  const initializedRef = useRef(false)
  const gameRef = useRef(game)
  const audioRef = useRef(null)
  const arenaMusicRef = useRef(null)
  const chantTimerRef = useRef(null)
  const toastTimerRef = useRef(null)
  const milestoneCelebrationRef = useRef(new Set())
  const achievementUnlockRef = useRef(new Set())
  const importRef = useRef(null)

  const metric = useMemo(() => getMetric(game, now), [game, now])
  const scarfBoost = BOOSTS.find((boost) => boost.id === 'scarf-rave')
  const ownedPlayerCount = PLAYERS.filter((player) => game.players[player.id]).length
  const visibleNavItems = ownedPlayerCount >= PLAYERS.length
    ? NAV_ITEMS
    : NAV_ITEMS.filter((item) => item.id !== 'legend')
  const rank = rankByTotal(game.totalPucks)
  const nextRank = getNextRank(game.totalPucks)

  useEffect(() => {
    if (tab === 'legend' && ownedPlayerCount < PLAYERS.length) setTab('home')
  }, [ownedPlayerCount, tab])

  useEffect(() => {
    gameRef.current = game
  }, [game])

  const showToast = useCallback((title, message, type = 'info') => {
    window.clearTimeout(toastTimerRef.current)
    setToast({ title, message, type, id: Date.now() })
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3400)
  }, [])

  const playSound = useCallback(
    (kind = 'click') => {
      if (!soundOn) return
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) return
        if (!audioRef.current) audioRef.current = new AudioContext()
        const context = audioRef.current
        if (context.state === 'suspended') context.resume()
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        const nowTime = context.currentTime
        oscillator.type = kind === 'buy' ? 'triangle' : 'sine'
        oscillator.frequency.setValueAtTime(kind === 'buy' ? 520 : 145, nowTime)
        oscillator.frequency.exponentialRampToValueAtTime(kind === 'buy' ? 720 : 85, nowTime + 0.08)
        gain.gain.setValueAtTime(0.0001, nowTime)
        gain.gain.exponentialRampToValueAtTime(kind === 'buy' ? 0.045 : 0.028, nowTime + 0.008)
        gain.gain.exponentialRampToValueAtTime(0.0001, nowTime + 0.1)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start(nowTime)
        oscillator.stop(nowTime + 0.11)
      } catch {
        // Le son est optionnel : une erreur audio ne bloque jamais le jeu.
      }
    },
    [soundOn],
  )

  const startChantOverlay = useCallback((kind) => {
    const chant = ULTRA_CHANTS[kind]
    if (!chant) return
    window.clearInterval(chantTimerRef.current)
    let index = 0
    const firstLine = chant.lines[0]
    setChantOverlay({ kind, title: chant.title, original: firstLine.original, spoken: firstLine.spoken || firstLine.original })
    chantTimerRef.current = window.setInterval(() => {
      index += 1
      if (index >= chant.lines.length) {
        window.clearInterval(chantTimerRef.current)
        window.setTimeout(() => setChantOverlay(null), 2200)
        return
      }
      const line = chant.lines[index]
      setChantOverlay({ kind, title: chant.title, original: line.original, spoken: line.spoken || line.original })
    }, 2600)

    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) return
    const synthesis = window.speechSynthesis
    const spokenText = chant.lines.map((line) => line.spoken || line.original).join(' ')
    let spoken = false
    const speak = () => {
      if (spoken) return
      spoken = true
      synthesis.cancel()
      if (synthesis.paused) synthesis.resume()
      const utterance = new window.SpeechSynthesisUtterance(spokenText)
      const voices = synthesis.getVoices()
      const frenchVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('fr'))
      const frenchVoice =
        frenchVoices.find((voice) => /male|homme|garçon|masc/i.test(voice.name)) ||
        frenchVoices.find((voice) => voice.lang.toLowerCase().startsWith('fr-ch')) ||
        frenchVoices.find((voice) => voice.lang.toLowerCase().startsWith('fr-fr')) ||
        frenchVoices[0]
      if (frenchVoice) utterance.voice = frenchVoice
      utterance.lang = frenchVoice?.lang || 'fr-FR'
      utterance.rate = kind === 'singing' ? 0.64 : 0.78
      utterance.pitch = kind === 'singing' ? 0.7 : 0.86
      utterance.volume = 1
      synthesis.speak(utterance)
    }
    // Parler immédiatement pour rester dans le geste utilisateur ; le navigateur
    // choisira la voix française même si sa liste de voix arrive encore en arrière-plan.
    speak()
  }, [])

  const playGeneratedCrowd = useCallback((kind = 'crowd') => {
    if (!soundOn) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      if (!audioRef.current) audioRef.current = new AudioContext()
      const context = audioRef.current
      if (context.state === 'suspended') context.resume()
      const duration = kind === 'singing' ? 3.4 : 2.6
      const sampleRate = context.sampleRate
      const buffer = context.createBuffer(1, Math.floor(sampleRate * duration), sampleRate)
      const data = buffer.getChannelData(0)
      for (let index = 0; index < data.length; index += 1) {
        const fade = Math.min(1, index / (sampleRate * 0.18), (data.length - index) / (sampleRate * 0.3))
        const swell = 0.55 + Math.sin((index / sampleRate) * Math.PI * 2 * 1.7) * 0.2
        data[index] = (Math.random() * 2 - 1) * fade * swell * 0.16
      }
      const source = context.createBufferSource()
      const filter = context.createBiquadFilter()
      const gain = context.createGain()
      const start = context.currentTime
      source.buffer = buffer
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(kind === 'singing' ? 680 : 480, start)
      filter.Q.setValueAtTime(0.55, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(kind === 'singing' ? 0.07 : 0.12, start + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
      source.connect(filter)
      filter.connect(gain)
      gain.connect(context.destination)
      source.start(start)
      source.stop(start + duration)
    } catch {
      // L’ambiance générée reste facultative si le navigateur bloque Web Audio.
    }
  }, [soundOn])

  const playUltraSound = useCallback((kind) => {
    if (!soundOn) return
    const isChant = kind === 'singing' || kind === 'parterre-nord-standing'
    if (isChant) {
      startChantOverlay(kind)
      playGeneratedCrowd(kind)
      return
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      if (!audioRef.current) audioRef.current = new AudioContext()
      const context = audioRef.current
      if (context.state === 'suspended') context.resume()
      const duration = kind === 'tifo' ? 2.8 : 2.2
      const sampleRate = context.sampleRate
      const buffer = context.createBuffer(1, Math.floor(sampleRate * duration), sampleRate)
      const data = buffer.getChannelData(0)
      for (let index = 0; index < data.length; index += 1) {
        const fade = Math.min(1, index / (sampleRate * 0.08), (data.length - index) / (sampleRate * 0.22))
        data[index] = (Math.random() * 2 - 1) * fade * 0.18
      }
      const source = context.createBufferSource()
      const filter = context.createBiquadFilter()
      const gain = context.createGain()
      const start = context.currentTime
      source.buffer = buffer
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(kind === 'tifo' ? 2400 : 1500, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(kind === 'tifo' ? 0.22 : 0.14, start + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
      source.connect(filter)
      filter.connect(gain)
      gain.connect(context.destination)
      source.start(start)
      source.stop(start + duration)

      if (kind === 'tifo') {
        for (let beat = 0; beat < 6; beat += 1) {
          const oscillator = context.createOscillator()
          const beatGain = context.createGain()
          const beatStart = start + 0.12 + beat * 0.34
          oscillator.type = 'sawtooth'
          oscillator.frequency.setValueAtTime(110 + (beat % 2) * 45, beatStart)
          beatGain.gain.setValueAtTime(0.0001, beatStart)
          beatGain.gain.exponentialRampToValueAtTime(0.045, beatStart + 0.015)
          beatGain.gain.exponentialRampToValueAtTime(0.0001, beatStart + 0.22)
          oscillator.connect(beatGain)
          beatGain.connect(context.destination)
          oscillator.start(beatStart)
          oscillator.stop(beatStart + 0.24)
        }
      }
    } catch {
      // L’ambiance sonore ne doit jamais bloquer l’achat.
    }
  }, [playGeneratedCrowd, soundOn, startChantOverlay])

  const stopArenaMusic = useCallback(() => {
    const music = arenaMusicRef.current
    if (!music) return
    try {
      music.context.close()
    } catch {
      // Le contexte audio peut déjà être fermé par le navigateur.
    }
    arenaMusicRef.current = null
  }, [])

  const playLocalGoalHorn = useCallback(() => {
    if (!soundOn) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      if (!audioRef.current) audioRef.current = new AudioContext()
      const context = audioRef.current
      if (context.state === 'suspended') context.resume()
      const start = context.currentTime
      const master = context.createGain()
      master.gain.setValueAtTime(0.0001, start)
      master.gain.exponentialRampToValueAtTime(0.11, start + 0.04)
      master.gain.setValueAtTime(0.11, start + 0.62)
      master.gain.exponentialRampToValueAtTime(0.0001, start + 1.35)
      master.connect(context.destination)

      const frequencies = [146.83, 220, 293.66]
      frequencies.forEach((frequency, index) => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        const noteStart = start + index * 0.035
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(frequency, noteStart)
        gain.gain.setValueAtTime(0.0001, noteStart)
        gain.gain.exponentialRampToValueAtTime(0.55 / (index + 1), noteStart + 0.025)
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.1)
        oscillator.connect(gain)
        gain.connect(master)
        oscillator.start(noteStart)
        oscillator.stop(noteStart + 1.2)
      })
    } catch {
      // La corne originale reste facultative si le navigateur bloque Web Audio.
    }
  }, [soundOn])

  const playLocalSupporterEffect = useCallback((kind = 'crowd') => {
    if (kind === 'singing' || kind === 'parterre-nord-standing') {
      playUltraSound(kind)
      return
    }
    if (kind === 'tifo') {
      playUltraSound('tifo')
      return
    }
    if (kind === 'goal' || kind === 'golden-goal' || kind === 'scarf-rave') {
      playLocalGoalHorn()
      return
    }
    playGeneratedCrowd(kind)
  }, [playGeneratedCrowd, playLocalGoalHorn, playUltraSound])

  const openSupporterVideo = useCallback((kind = 'chant', details = {}) => {
    const source = ORIGINAL_MEDIA[kind] || ORIGINAL_MEDIA.chant
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    window.clearInterval(chantTimerRef.current)
    setChantOverlay(null)
    setShowReset(false)
    setShowInfo(false)
    setOfflineReward(0)
    stopArenaMusic()
    setSupporterVideo({
      ...source,
      ...details,
      replayKey: Date.now(),
    })
  }, [stopArenaMusic])

  useEffect(() => {
    const alreadyReached = new Set(game.milestoneReached || [])
    const freshMilestones = PUCK_MILESTONES.filter(
      (milestone) => game.totalPucks >= milestone.value && !alreadyReached.has(milestone.id),
    )
    const uncelebrated = freshMilestones.filter((milestone) => !milestoneCelebrationRef.current.has(milestone.id))
    if (uncelebrated.length === 0) return

    const latestMilestone = uncelebrated[uncelebrated.length - 1]
    uncelebrated.forEach((milestone) => milestoneCelebrationRef.current.add(milestone.id))
    const reward = uncelebrated.reduce((sum, milestone) => sum + milestone.reward, 0)

    setGame((current) => ({
      ...current,
      pucks: current.pucks + reward,
      totalPucks: current.totalPucks + reward,
      milestoneReached: [
        ...new Set([...(current.milestoneReached || []), ...uncelebrated.map((milestone) => milestone.id)]),
      ],
    }))
    showToast(
      `Palier ${formatNumber(latestMilestone.value, true)} pucks`,
      `La corne de but retentit · +${formatNumber(reward, true)} pucks de prime`,
      'success',
    )
    playLocalGoalHorn()
    openSupporterVideo('goal', {
      localOnly: true,
      muted: true,
      title: latestMilestone.label,
      eyebrow: 'Palier de pucks · record',
      description: `${formatNumber(latestMilestone.value, true)} pucks franchis : la tribune célèbre ce nouveau palier.`,
      milestone: latestMilestone,
      reward,
    })
  }, [game.milestoneReached, game.totalPucks, openSupporterVideo, playLocalGoalHorn, showToast])

  const startArenaMusic = useCallback((force = false) => {
    if ((!musicOn && !force) || arenaMusicRef.current) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const context = new AudioContext()
      const master = context.createGain()
      const lfo = context.createOscillator()
      const lfoGain = context.createGain()
      const start = context.currentTime
      master.gain.setValueAtTime(0.0001, start)
      master.gain.exponentialRampToValueAtTime(0.045, start + 0.7)
      lfo.frequency.setValueAtTime(0.07, start)
      lfoGain.gain.setValueAtTime(0.012, start)
      lfo.connect(lfoGain)
      lfoGain.connect(master.gain)
      master.connect(context.destination)
      const frequencies = [110, 164.81, 220]
      const oscillators = frequencies.map((frequency, index) => {
        const oscillator = context.createOscillator()
        const voiceGain = context.createGain()
        oscillator.type = index === 1 ? 'triangle' : 'sine'
        oscillator.frequency.setValueAtTime(frequency, start)
        voiceGain.gain.setValueAtTime(0.16 / (index + 1), start)
        oscillator.connect(voiceGain)
        voiceGain.connect(master)
        oscillator.start(start)
        return oscillator
      })
      lfo.start(start)
      arenaMusicRef.current = { context, master, lfo, oscillators }
    } catch {
      // La musique originale est facultative.
    }
  }, [musicOn])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    if (!next) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
      window.clearInterval(chantTimerRef.current)
      setChantOverlay(null)
      setSupporterVideo(null)
    }
  }

  const changeTab = useCallback((nextTab) => {
    setTab(nextTab)
    if (nextTab === 'home' || !musicOn) stopArenaMusic()
    else startArenaMusic()
  }, [musicOn, startArenaMusic, stopArenaMusic])

  const toggleMusic = () => {
    const next = !musicOn
    setMusicOn(next)
    if (next) startArenaMusic(true)
    else stopArenaMusic()
    showToast(next ? 'Musique de menu activée' : 'Musique de menu coupée', next ? 'Ambiance arène dans les menus.' : 'Les effets et les chants restent disponibles.', 'info')
  }

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    const loaded = loadGame()
    const loadedMetric = getMetric(loaded)
    const elapsed = Math.max(0, (Date.now() - loaded.lastSaved) / 1000)
    const reward =
      elapsed > 20 ? loadedMetric.production * Math.min(elapsed, OFFLINE_CAP_SECONDS) : 0
    const nextTotalPucks = loaded.totalPucks + reward
    const next = {
      ...loaded,
      pucks: loaded.pucks + reward,
      totalPucks: nextTotalPucks,
      milestoneReached: getReachedMilestoneIds(nextTotalPucks),
      lastSaved: Date.now(),
    }
    milestoneCelebrationRef.current = new Set()
    setGame(next)
    setOfflineReward(reward)
  }, [])

  useEffect(() => {
    const clock = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(clock)
  }, [])

  useEffect(() => {
    setGame((current) => {
      const next = ensureLegendDaily(current)
      return next === current ? current : next
    })
  }, [todayKey])

  useEffect(() => {
    let previousTick = Date.now()
    const productionTimer = window.setInterval(() => {
      const tick = Date.now()
      const elapsed = (tick - previousTick) / 1000
      previousTick = tick
      if (elapsed <= 0) return
      setGame((current) => {
        const earned = metric.production * elapsed
        if (earned <= 0) return current
        return {
          ...current,
          pucks: current.pucks + earned,
          totalPucks: current.totalPucks + earned,
        }
      })
    }, 100)
    return () => window.clearInterval(productionTimer)
  }, [metric.production])

  useEffect(() => {
    const saveTimer = window.setInterval(() => {
      const current = { ...gameRef.current, lastSaved: Date.now() }
      persistGame(current)
      setSavePulse(Date.now())
    }, 4_000)
    return () => window.clearInterval(saveTimer)
  }, [])

  useEffect(() => {
    const saveBeforeLeaving = () => {
      persistGame(gameRef.current)
    }
    window.addEventListener('beforeunload', saveBeforeLeaving)
    return () => window.removeEventListener('beforeunload', saveBeforeLeaving)
  }, [])

  useEffect(
    () => () => {
      window.clearTimeout(toastTimerRef.current)
      window.clearInterval(chantTimerRef.current)
      stopArenaMusic()
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    },
    [],
  )

  useEffect(() => {
    const achievementState = {
      ...game,
      pps: metric.production,
      baseProduction: metric.baseProduction,
    }
    const newlyUnlocked = ACHIEVEMENTS.filter(
      (achievement) =>
        !game.achievements.includes(achievement.id) &&
        !achievementUnlockRef.current.has(achievement.id) &&
        achievement.goal(achievementState),
    )
    if (newlyUnlocked.length === 0) return

    newlyUnlocked.forEach((achievement) => achievementUnlockRef.current.add(achievement.id))
    setGame((current) => {
      const knownIds = ACHIEVEMENTS.map((achievement) => achievement.id)
      const existing = new Set((current.achievements || []).filter((id) => knownIds.includes(id)))
      const additions = newlyUnlocked
        .map((achievement) => achievement.id)
        .filter((id) => !existing.has(id))
      if (additions.length === 0) return current
      return { ...current, achievements: [...existing, ...additions] }
    })

    const achievement = newlyUnlocked[0]
    showToast('Palmarès débloqué', `${achievement.name} · récompense à réclamer dans Palmarès`, 'success')
    playSound('buy')
  }, [
    game.achievements,
    game.clicks,
    game.players,
    game.boosts,
    game.season.wins,
    game.stats.faceoffWins,
    game.stats.miniGamesWon,
    game.totalPucks,
    game.ultras,
    game.legend?.claimedQuests,
    game.legend?.upgrades,
    game.legend?.tournament?.champion,
    metric.baseProduction,
    metric.production,
    playSound,
    showToast,
  ])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowReset(false)
        setShowInfo(false)
        setSupporterVideo(null)
        setOfflineReward(0)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleClick = (event) => {
    if (musicOn) startArenaMusic()
    const amount = metric.clickPower
    setGame((current) => {
      const daily = ensureLegendDaily(current)
      return {
        ...daily,
        pucks: daily.pucks + amount,
        totalPucks: daily.totalPucks + amount,
        clicks: daily.clicks + 1,
        legend: {
          ...daily.legend,
          dailyClicks: daily.legend.dailyClicks + 1,
        },
      }
    })

    const rect = event.currentTarget.getBoundingClientRect()
    const fromKeyboard = !event.clientX && !event.clientY
    const x = fromKeyboard ? 50 : ((event.clientX - rect.left) / rect.width) * 100
    const y = fromKeyboard ? 50 : ((event.clientY - rect.top) / rect.height) * 100
    const id = `${Date.now()}-${Math.random()}`
    setParticles((current) => [
      ...current.slice(-13),
      { id, x: Math.max(8, Math.min(92, x)), y: Math.max(8, Math.min(92, y)), value: amount },
    ])
    window.setTimeout(() => {
      setParticles((current) => current.filter((particle) => particle.id !== id))
    }, 760)

    if (event.currentTarget.animate) {
      event.currentTarget.animate(
        [
          { transform: 'scale(0.96) rotate(-1deg)' },
          { transform: 'scale(1.02) rotate(0deg)' },
          { transform: 'scale(1) rotate(0deg)' },
        ],
        { duration: 170, easing: 'cubic-bezier(.2,.8,.2,1)' },
      )
    }
    playSound('click')
  }

  const buyPlayer = (player) => {
    if (game.players[player.id]) return
    if (game.pucks < player.cost) {
      showToast('Pas encore assez de pucks', `Il manque ${formatNumber(player.cost - game.pucks, true)} pucks.`)
      return
    }
    setGame((current) => ({
      ...current,
      pucks: current.pucks - player.cost,
      players: { ...current.players, [player.id]: true },
    }))
    showToast(`${player.name} rejoint les Veilleurs`, `+${formatRate(player.rate)} pucks/s`, 'success')
    playSound('buy')
  }

  const buyUpgrade = (item, type) => {
    const owned = game.upgrades[item.id] || 0
    const maxQuantity = getMaxAffordable(item, game.pucks)
    const quantity =
      buyMode === 'max' ? maxQuantity : buyMode === 'x10' ? Math.min(10, maxQuantity) : Math.min(1, maxQuantity)
    if (quantity <= 0) {
      showToast('Transaction impossible', `Il te faut ${formatNumber(item.baseCost, true)} pucks.`)
      return
    }
    const cost = getBatchCost(item, owned, quantity)
    setGame((current) => {
      if (current.pucks < cost) return current
      return {
        ...current,
        pucks: current.pucks - cost,
        upgrades: { ...current.upgrades, [item.id]: owned + quantity },
      }
    })
    showToast('Amélioration installée', type === 'click' ? 'Ta puissance de touche augmente.' : 'Ton staff produit davantage.', 'success')
    playSound('buy')
  }

  const claimAchievement = (achievement) => {
    const claims = game.achievementClaims || []
    if (!game.achievements.includes(achievement.id) || claims.includes(achievement.id)) return
    const reward = achievement.reward || 0
    setGame((current) => {
      const currentClaims = current.achievementClaims || []
      if (currentClaims.includes(achievement.id)) return current
      return {
        ...current,
        pucks: current.pucks + reward,
        totalPucks: current.totalPucks + reward,
        achievementClaims: [...currentClaims, achievement.id],
      }
    })
    showToast('Récompense réclamée', `${achievement.name} · +${formatNumber(reward, true)} pucks`, 'success')
    playSound('buy')
  }

  const buyUltra = (ultra) => {
    const owned = Boolean(game.ultras[ultra.id])
    const bonus = ULTRA_BONUS[ultra.id]
    const active = owned && bonus && (game.boosts[bonus.id] || 0) > Date.now()
    if (active) return
    const cost = owned ? Math.ceil(ultra.cost * 0.15) : ultra.cost
    if (game.pucks < cost) {
      showToast('La tribune attend encore', `Il manque ${formatNumber(cost - game.pucks, true)} pucks.`)
      return
    }
    setGame((current) => ({
      ...current,
      pucks: current.pucks - cost,
      ultras: owned ? current.ultras : { ...current.ultras, [ultra.id]: true },
      boosts: bonus
        ? { ...current.boosts, [bonus.id]: Date.now() + bonus.seconds * 1000 }
        : current.boosts,
    }))
    showToast(owned ? 'Boost ultra relancé' : 'Bloc ultra activé', ultra.reward, 'success')
    playSound('buy')
    playLocalSupporterEffect(ultra.id)
  }

  const buyBoost = (boost) => {
    if (game.pucks < boost.cost) {
      showToast('Boost indisponible', `Il manque ${formatNumber(boost.cost - game.pucks, true)} pucks.`)
      return
    }
    setGame((current) => ({
      ...current,
      pucks: current.pucks - boost.cost,
      boosts: { ...current.boosts, [boost.id]: Date.now() + boost.duration * 1000 },
    }))
    showToast('Boost activé', boost.name, 'success')
    playSound('buy')
    playLocalSupporterEffect(boost.id)
  }

  const simulateOneMatch = () => {
    if (seasonBusy || game.season.week >= SEASON_OPPONENTS.length) return
    setSeasonBusy(true)
    window.setTimeout(() => {
      const current = gameRef.current
      const opponent = getSeasonOpponent(current)
      const result = simulateMatch(current, opponent)
      setGame(result.game)
      showToast(
        result.report.won ? 'Victoire à Virevolt !' : 'Défaite encaissée',
        result.report.won
          ? `+${formatNumber(result.report.reward, true)} pucks · ${result.report.boostName}`
          : `Score ${result.report.scoreFor}–${result.report.scoreAgainst} · On se remobilise.`,
        result.report.won ? 'success' : 'info',
      )
      if (result.report.won) playSound('buy')
      if (result.report.boostName) playLocalSupporterEffect(result.report.boostId)
      setSeasonBusy(false)
    }, 700)
  }

  const simulateFullSeason = () => {
    const remaining = SEASON_OPPONENTS.length - game.season.week
    if (seasonBusy || remaining <= 0) return
    setSeasonBusy(true)
    window.setTimeout(() => {
      const result = simulateSeason(gameRef.current, remaining)
      setGame(result.game)
      showToast(
        'Saison simulée !',
        `${result.summary.wins} victoire${result.summary.wins > 1 ? 's' : ''} · +${formatNumber(result.summary.reward, true)} pucks`,
        'success',
      )
      playSound('buy')
      if (result.summary.wins > 0) playLocalSupporterEffect('crowd')
      setSeasonBusy(false)
    }, 1150)
  }

  const resetSeason = () => {
    const nextSeason = {
      ...createInitialState().season,
      seasonNumber: game.season.seasonNumber + 1,
    }
    setGame((current) => ({ ...current, season: nextSeason }))
    showToast('Nouvelle saison', 'Le calendrier de la Ligue des Aurores est prêt pour un nouveau départ.', 'success')
  }

  const claimLegendQuest = (quest) => {
    const eligible = quest.goal({ ...game, pps: metric.production })
    if (game.legend.claimedQuests.includes(quest.id) || !eligible) return
    setGame((current) => ({
      ...current,
      pucks: current.pucks + quest.reward,
      totalPucks: current.totalPucks + quest.reward,
      legend: {
        ...current.legend,
        glory: current.legend.glory + Math.round(quest.reward / 10_000),
        claimedQuests: [...current.legend.claimedQuests, quest.id],
      },
    }))
    showToast('Quête de légende terminée', `+${formatNumber(quest.reward, true)} pucks`, 'success')
    playSound('buy')
  }

  const claimDailyLegend = () => {
    const daily = ensureLegendDaily(game)
    if (daily.legend.dailyClicks < LEGEND_DAILY.target || daily.legend.dailyClaimed.includes(LEGEND_DAILY.id)) return
    setGame((current) => ({
      ...current,
      pucks: current.pucks + LEGEND_DAILY.reward,
      totalPucks: current.totalPucks + LEGEND_DAILY.reward,
      legend: {
        ...current.legend,
        dailyClaimed: [...current.legend.dailyClaimed, LEGEND_DAILY.id],
        glory: current.legend.glory + 25,
      },
    }))
    showToast('Défi du jour terminé', `+${formatNumber(LEGEND_DAILY.reward, true)} pucks`, 'success')
    playSound('buy')
  }

  const buyLegendUpgrade = (upgrade) => {
    if (game.legend.upgrades[upgrade.id]) return
    if (game.pucks < upgrade.cost) {
      showToast('Héritage encore trop cher', `Il manque ${formatNumber(upgrade.cost - game.pucks, true)} pucks.`)
      return
    }
    setGame((current) => ({
      ...current,
      pucks: current.pucks - upgrade.cost,
      legend: {
        ...current.legend,
        upgrades: { ...current.legend.upgrades, [upgrade.id]: true },
      },
    }))
    showToast('Héritage débloqué', upgrade.name, 'success')
    playSound('buy')
  }

  const playLegendRound = () => {
    if (legendBusy || game.legend.tournament.champion) return
    setLegendBusy(true)
    window.setTimeout(() => {
      const result = simulateLegendRound(gameRef.current)
      setGame(result.game)
      showToast(
        result.report.won ? (result.report.champion ? 'Champion de la Coupe des Aurores !' : 'Tournoi remporté !') : 'Le tournoi s’arrête ici',
        result.report.won
          ? `+${formatNumber(result.report.reward, true)} pucks · +${result.report.glory} gloire`
          : `Score ${result.report.scoreFor}–${result.report.scoreAgainst} · Réessaie le round.`,
        result.report.won ? 'success' : 'info',
      )
      if (result.report.won) playSound('buy')
      if (result.report.boostName) playLocalSupporterEffect(result.report.boostId)
      setLegendBusy(false)
    }, 750)
  }

  const restartLegendTournament = () => {
    setGame((current) => resetLegendTournament(current))
    showToast('Nouveau tournoi', 'La coupe est de retour sur la patinoire.', 'success')
  }

  const finishFaceoff = (won, reward) => {
    setGame((current) => ({
      ...current,
      pucks: current.pucks + reward,
      totalPucks: current.totalPucks + reward,
      stats: {
        ...current.stats,
        faceoffs: current.stats.faceoffs + 1,
        faceoffWins: current.stats.faceoffWins + (won ? 1 : 0),
      },
    }))
    showToast(
      won ? 'Puck gagné !' : 'Puck perdu',
      won ? `+${formatNumber(reward, true)} pucks` : 'Replace le marqueur dans la zone verte.',
      won ? 'success' : 'info',
    )
    if (won) playSound('buy')
  }

  const finishMiniGame = (won, reward, name) => {
    const boost = won && Math.random() < 0.35 ? chooseSeasonBoost(Math.random) : null
    setGame((current) => {
      const daily = ensureLegendDaily(current)
      return {
        ...daily,
        pucks: daily.pucks + reward,
        totalPucks: daily.totalPucks + reward,
        boosts: boost
          ? { ...daily.boosts, [boost.id]: Date.now() + boost.duration * 1000 }
          : daily.boosts,
        stats: {
          ...daily.stats,
          miniGamesPlayed: daily.stats.miniGamesPlayed + 1,
          miniGamesWon: daily.stats.miniGamesWon + (won ? 1 : 0),
        },
      }
    })
    showToast(
      won ? `${name} réussi !` : `${name} raté`,
      won ? `+${formatNumber(reward, true)} pucks${boost ? ` · ${boost.name}` : ''}` : 'Tu peux retenter immédiatement.',
      won ? 'success' : 'info',
    )
    if (won) playSound('buy')
    if (boost) playLocalSupporterEffect(boost.id)
  }

  const resetGame = () => {
    const fresh = createInitialState()
    milestoneCelebrationRef.current = new Set()
    achievementUnlockRef.current.clear()
    setGame(fresh)
    setShowReset(false)
    setOfflineReward(0)
    localStorage.removeItem(STORAGE_KEY)
    showToast('Saison relancée', 'La baie de Virevolt t’attend de nouveau.')
  }

  const exportSave = () => {
    const data = JSON.stringify({ ...game, lastSaved: Date.now() }, null, 2)
    const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'puck-virevolt-save.json'
    link.click()
    URL.revokeObjectURL(url)
    showToast('Sauvegarde exportée', 'Ton arquivo de saison est prêt.')
  }

  const importSave = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      const parsed = normalizeSave(JSON.parse(await file.text()))
      achievementUnlockRef.current = new Set(parsed.achievements || [])
      milestoneCelebrationRef.current = new Set()
      setGame(parsed)
      showToast('Sauvegarde importée', 'La saison reprend où tu l’avais laissée.', 'success')
    } catch {
      showToast('Fichier invalide', 'Cette sauvegarde ne peut pas être lue.')
    }
  }

  const activeNav = NAV_ITEMS.find((item) => item.id === tab) || NAV_ITEMS[0]

  return (
    <div className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={() => changeTab('home')} aria-label="Retour à l'accueil">
          <img src="/assets/virevolt-prisme.svg" alt="" />
          <span className="brand-copy">
            <strong>PUCK VIREVOLT</strong>
            <span>PUCK VIREVOLT · CLICKER</span>
          </span>
        </button>

        <div className="rank-pill">
          <span className="rank-emblem">{rank.short}</span>
          <span>
            <small>Rang actuel</small>
            <strong>{rank.label}</strong>
          </span>
        </div>

        <div className="top-actions">
          <div className="save-status" key={savePulse} title="Progression sauvegardée automatiquement">
            <CloudCog size={15} />
            <span>Sauvegardé</span>
          </div>
          <button
            className={`icon-button ${musicOn ? 'music-active' : ''}`}
            onClick={toggleMusic}
            aria-label={musicOn ? 'Couper la musique des menus' : 'Activer la musique des menus'}
            title={musicOn ? 'Muserie des menus : activée' : 'Musique des menus : coupée'}
          >
            <Music2 size={18} />
          </button>
          <button
            className="icon-button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Couper le son' : 'Activer le son'}
            title={soundOn ? 'Couper le son' : 'Activer le son'}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            className="icon-button"
            onClick={() => { setSupporterVideo(null); setShowInfo(true) }}
            aria-label="À propos du jeu"
            title="À propos"
          >
            <Info size={18} />
          </button>
          <button
            className="icon-button danger-hover"
            onClick={() => { setSupporterVideo(null); setShowReset(true) }}
            aria-label="Réinitialiser la partie"
            title="Réinitialiser"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <nav className="mobile-tabs" aria-label="Navigation principale">
        {visibleNavItems.map((item) => (
          <button
            key={item.id}
            className={tab === item.id ? 'active' : ''}
            onClick={() => changeTab(item.id)}
          >
            <item.icon size={17} />
            <span>{item.short}</span>
          </button>
        ))}
      </nav>

      <main className="workspace">
        <RinkPanel
          game={game}
          metric={metric}
          now={now}
          onClick={handleClick}
          particles={particles}
          ownedPlayerCount={ownedPlayerCount}
          crowdMode={metric.activeBoosts.some((boost) => ['singing', 'parterre-nord-standing', 'scarf-rave'].includes(boost.id))}
          chantOverlay={chantOverlay}
          onReplayChant={() => chantOverlay?.kind && playUltraSound(chantOverlay.kind)}
          onHumanChant={() => openSupporterVideo('singing')}
          onRave={() => scarfBoost && buyBoost(scarfBoost)}
        />

        <section className="content-panel">
          <div className="desktop-tabs" role="tablist" aria-label="Sections du jeu">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={tab === item.id}
                className={tab === item.id ? 'active' : ''}
                onClick={() => changeTab(item.id)}
              >
                <item.icon size={17} />
                <span>{item.label}</span>
                {item.id === 'roster' && <small>{ownedPlayerCount}/{PLAYERS.length}</small>}
              </button>
            ))}
          </div>

          <div className="content-scroll">
            {tab === 'home' && (
              <HomeTab
                game={game}
                metric={metric}
                rank={rank}
                nextRank={nextRank}
                onNavigate={changeTab}
              />
            )}
            {tab === 'roster' && (
              <RosterTab game={game} onBuy={buyPlayer} />
            )}
            {tab === 'training' && (
              <TrainingTab
                game={game}
                buyMode={buyMode}
                setBuyMode={setBuyMode}
                onBuy={buyUpgrade}
              />
            )}
            {tab === 'ultras' && (
              <UltraTab
                game={game}
                onBuy={buyUltra}
                onHumanChant={() => openSupporterVideo('singing')}
                onParterreChant={() => openSupporterVideo('chant')}
              />
            )}
            {tab === 'hockey' && (
              <HockeyTab game={game} metric={metric} onBuy={buyBoost} onFaceoff={finishFaceoff} onMiniFinish={finishMiniGame} />
            )}
            {tab === 'season' && (
              <SeasonTab
                game={game}
                metric={metric}
                busy={seasonBusy}
                onSimulateMatch={simulateOneMatch}
                onSimulateSeason={simulateFullSeason}
                onResetSeason={resetSeason}
              />
            )}
            {tab === 'trophies' && (
              <TrophyTab
                game={game}
                metric={metric}
                onExport={exportSave}
                onImport={() => importRef.current?.click()}
                onReset={() => { setSupporterVideo(null); setShowReset(true) }}
                onClaimAchievement={claimAchievement}
                onNavigate={changeTab}
              />
            )}
            {tab === 'legend' && ownedPlayerCount >= PLAYERS.length && (
              <LegendTab
                game={game}
                metric={metric}
                busy={legendBusy}
                onClaimQuest={claimLegendQuest}
                onClaimDaily={claimDailyLegend}
                onBuyUpgrade={buyLegendUpgrade}
                onPlayRound={playLegendRound}
                onRestartTournament={restartLegendTournament}
              />
            )}

            <footer className="site-footer">
              <span>Univers fictif · aucun club, joueur ou média réel.</span>
              <span>Textes, avatars illustrés et audio généré pour Puck Virevolt.</span>
            </footer>
          </div>
        </section>
      </main>

      <input ref={importRef} type="file" accept="application/json" hidden onChange={importSave} />

      {toast && (
        <div className={`toast toast-${toast.type}`} key={toast.id} role="status">
          <span className="toast-icon">
            {toast.type === 'success' ? <Check size={18} /> : <Info size={18} />}
          </span>
          <span>
            <strong>{toast.title}</strong>
            <small>{toast.message}</small>
          </span>
          <button onClick={() => setToast(null)} aria-label="Fermer">
            <X size={15} />
          </button>
        </div>
      )}

      {offlineReward > 0.5 && (
        <Modal onClose={() => setOfflineReward(0)}>
          <div className="modal-icon reward"><PuckGlyph /></div>
          <span className="eyebrow">Les pucks continuaient de courir</span>
          <h2>Bienvenue sur la glace</h2>
          <p>
            Ton équipe a produit des pucks pendant ton absence. Gain hors ligne, plafonné à 4 heures :
          </p>
          <div className="reward-value">+{formatNumber(offlineReward, true)} <small>pucks</small></div>
          <button className="primary-button wide" onClick={() => setOfflineReward(0)}>
            Reprendre la partie <ChevronRight size={17} />
          </button>
        </Modal>
      )}

      {showReset && (
        <Modal onClose={() => setShowReset(false)}>
          <div className="modal-icon danger"><RotateCcw size={27} /></div>
          <span className="eyebrow">Nouvelle saison</span>
          <h2>Repartir de zéro ?</h2>
          <p>Cette action efface les pucks, les joueurs, les ultras et tous les succès.</p>
          <div className="modal-actions">
            <button className="secondary-button" onClick={() => setShowReset(false)}>Annuler</button>
            <button className="danger-button" onClick={resetGame}>Tout réinitialiser</button>
          </div>
        </Modal>
      )}

      {supporterVideo && (
        <Modal wide onClose={() => setSupporterVideo(null)}>
          <div className="human-chant-modal">
            <div className={`modal-icon ${supporterVideo.kind === 'goal' ? 'reward' : 'info'}`}>
              {supporterVideo.kind === 'goal' ? <Goal size={27} /> : <Megaphone size={27} />}
            </div>
            <span className="eyebrow">{supporterVideo.eyebrow}</span>
            <h2>{supporterVideo.title}</h2>
            <p>{supporterVideo.description}</p>
            {supporterVideo.reward > 0 && (
              <div className="video-reward">
                <Gem size={15} /> Prime de palier : <strong>+{formatNumber(supporterVideo.reward, true)} pucks</strong>
              </div>
            )}
            {supporterVideo.localOnly ? (
              <div className="local-celebration">
                <div className="celebration-burst"><Goal size={31} /></div>
                <strong>La patinoire explose !</strong>
                <small>La corne d’Éclat a été générée directement dans le site.</small>
                <button className="primary-button wide" onClick={() => setSupporterVideo(null)}>
                  Continuer <ChevronRight size={16} />
                </button>
              </div>
            ) : (
              <div className="original-chant-card">
                <div className="original-wave" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                <span className="eyebrow">Paroles originales</span>
                <div className="original-chant-lines">
                  {(supporterVideo.lines || []).map((line, index) => <p key={`${line.original}-${index}`}>{line.original}</p>)}
                </div>
                <button className="primary-button wide" onClick={() => playUltraSound(supporterVideo.kind)}>
                  <Volume2 size={16} /> Écouter le chant original
                </button>
                <small className="original-audio-note">La voix optionnelle utilise la synthèse du navigateur. L’ambiance et les effets sont générés par Web Audio, sans fichier audio ni vidéo externe.</small>
              </div>
            )}
          </div>
        </Modal>
      )}

      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <div className="modal-icon info"><Info size={27} /></div>
          <span className="eyebrow">À propos</span>
          <h2>Puck Virevolt</h2>
          <p>
            Un idle clicker de hockey entièrement fictif. L’équipe de Virevolt, ses 28 joueurs,
            ses adversaires, ses supporters, ses chants et ses visuels sont des créations originales
            réalisées pour ce projet. Les portraits sont des illustrations CSS, les chants sont des
            paroles originales et les ambiances sonores sont synthétisées dans le navigateur.
          </p>
          <p>
            Aucun club, joueur, ligue, photo, vidéo ou enregistrement réel n’est utilisé. Les prix,
            notes et productions sont fictifs. La sauvegarde reste uniquement dans ton navigateur.
          </p>
          <div className="original-license-note"><Sparkles size={14} /> Conçu comme un univers original autonome, prêt à être adapté et publié.</div>
        </Modal>
      )}

      <span className="sr-only" aria-live="polite">Section active : {activeNav.short}</span>
    </div>
  )
}

function RinkPanel({ game, metric, now, onClick, particles, ownedPlayerCount, crowdMode, chantOverlay, onReplayChant, onHumanChant, onRave }) {
  const hasGoldenGoal = metric.activeBoosts.some((boost) => boost.id === 'golden-goal')
  const hasLyoba = metric.activeBoosts.some((boost) => boost.id === 'singing')
  const hasParterre = metric.activeBoosts.some((boost) => boost.id === 'parterre-nord-standing')
  const hasScarf = metric.activeBoosts.some((boost) => boost.id === 'scarf-rave')
  const crowdLabel = hasScarf
    ? 'ÉCLAT FINAL · ÉCHARPES EN L’AIR'
    : hasLyoba && hasParterre
      ? 'CHŒUR ZÉNITH · MURAILLE D’AURORE'
      : hasLyoba
        ? 'CHŒUR ZÉNITH'
        : 'MURAILLE D’AURORE'

  return (
    <aside className="rink-panel">
      <div className="rink-heading">
        <div>
          <span className="eyebrow">Patinoire de la Baie</span>
          <h1>FAIS GLISSER<br /><em>LES PUCKS.</em></h1>
        </div>
        <div className="live-pill"><span /> EN DIRECT</div>
      </div>

      <div className="balance-card">
        <div>
          <span className="balance-label"><PuckGlyph /> Solde de pucks</span>
          <strong className="balance-value">{formatNumber(game.pucks)}</strong>
        </div>
        <div className="balance-rate">
          <span>+{formatRate(metric.production)}</span>
          <small>pucks / sec</small>
        </div>
      </div>

      <div className={`click-stage ${crowdMode ? 'crowd-active' : ''} ${hasScarf ? 'scarf-rave' : ''}`}>
        <div className="ice-lines" aria-hidden="true" />
        <div className="center-circle" aria-hidden="true" />
        <div className="center-dot" aria-hidden="true" />
        <span className="stage-label stage-label-top">ZONE AURORE</span>
        <span className="stage-label stage-label-bottom">PUCK VIREVOLT · 01</span>

        {crowdMode && (
          <div className="standing-crowd" aria-label="Tous les Veilleurs sont debout">
            <div className="standing-fans" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="standing-caption">
              <strong>TOUS DEBOUT</strong>
              <span>{crowdLabel}</span>
            </div>
          </div>
        )}

        {hasScarf && (
          <div className="scarf-ovation" aria-label="Les Veilleurs lèvent leurs écharpes">
            <div className="scarf-embers" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="scarf-fans" aria-hidden="true">
              {Array.from({ length: 11 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="scarf-burst">
              <Flame size={14} />
              <strong>VEILLEURS EN FEU</strong>
            </div>
          </div>
        )}

        {particles.map((particle) => (
          <span
            key={particle.id}
            className="click-particle"
            style={{ '--x': `${particle.x}%`, '--y': `${particle.y}%` }}
          >
            <PuckGlyph />+{formatNumber(particle.value)}
          </span>
        ))}

        <button
          className={`crest-button ${hasGoldenGoal ? 'golden-boost' : ''}`}
          onClick={onClick}
          aria-label="Clique sur le logo Prisme pour gagner un puck"
        >
          <span className="crest-aura" />
          <span className="crest-image-wrap">
            <img src="/assets/virevolt-prisme.svg" alt="Logo du Virevolt Hockey Club" />
          </span>
          <span className="click-hint"><MousePointerClick size={16} /> Touche le crest</span>
        </button>
      </div>

      {chantOverlay && (
        <div className="chant-overlay" aria-live="polite">
          <div className="chant-overlay-head"><Mic2 size={14} /> <span>{chantOverlay.title}</span><Sparkles size={12} /></div>
          <strong>{chantOverlay.spoken || chantOverlay.original}</strong>
          <small>Voix unique · foule en arrière-plan</small>
          <div className="chant-actions">
            <button className="chant-replay" onClick={onReplayChant}>
              <Volume2 size={11} /> Rejouer les paroles
            </button>
            {chantOverlay.kind === 'singing' && (
              <button className="chant-human" onClick={onHumanChant}>
                <Radio size={11} /> Ouvrir le chant original
              </button>
            )}
            <span className="chant-source"><Radio size={11} /> Paroles originales</span>
          </div>
        </div>
      )}

      <div className="rink-stats">
        <div>
          <span>Par contact</span>
          <strong>+{formatRate(metric.clickPower)} <PuckGlyph /></strong>
        </div>
        <div>
          <span>Contacts</span>
          <strong>{formatNumber(game.clicks, true)}</strong>
        </div>
        <div>
          <span>Effectif</span>
          <strong>{ownedPlayerCount}/{PLAYERS.length}</strong>
        </div>
      </div>

      <div className="boost-dock">
        <div className="boost-dock-title">
          <span><Flame size={15} /> Momentum</span>
          <small>En direct</small>
        </div>
        {!hasScarf && (
          <button className="scarf-quick-action" onClick={onRave} aria-label="Activer le boost Écharpe levée">
            <span className="scarf-quick-icon"><Flame size={16} /><UsersRound size={13} /></span>
            <span>
              <strong>Écharpe levée</strong>
              <small>Corne de but + écharpes</small>
            </span>
            <b><PuckGlyph /> {formatNumber(400000, true)}</b>
          </button>
        )}
        {metric.activeBoosts.length === 0 ? (
          <div className="no-boost">
            <Sparkles size={16} />
            <span>Aucun boost actif — le temps d’une mise au jeu.</span>
          </div>
        ) : (
          <div className="active-boost-list">
            {metric.activeBoosts.map((boost) => (
              <div className="active-boost" key={boost.id}>
                <span className="active-boost-icon"><DynamicIcon name={boost.icon} size={16} /></span>
                <span>
                  <strong>{boost.name}</strong>
                  <small>
                    {boost.click > 0 && `×${boost.click + 1} clic`}
                    {boost.click > 0 && boost.production > 0 && ' · '}
                    {boost.production > 0 && `×${boost.production + 1} production`}
                  </small>
                </span>
                <time>{formatDuration(boost.endsAt - now)}</time>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="section-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

function HomeTab({ game, metric, rank, nextRank, onNavigate }) {
  const ownedPlayers = PLAYERS.filter((player) => game.players[player.id])
  const topLineup = [...ownedPlayers].sort((a, b) => b.rating - a.rating).slice(0, 5)
  const nextTarget = formatNumber(nextRank.next, true)
  const nextPuckMilestone = getNextPuckMilestone(game.totalPucks)
  const milestoneProgress = getPuckMilestoneProgress(game.totalPucks, nextPuckMilestone)

  return (
    <div className="tab-content home-tab">
      <section className="season-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><Star size={14} fill="currentColor" /> Saison 1 · Ligue des Aurores</div>
          <h2>De l’échauffement<br />à la <em>victoire.</em></h2>
          <p>
            Clique sur le logo Prisme, recrute l’effectif de Virevolt et transforme le bruit des tribunes en une
            machine à pucks.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onNavigate('roster')}>
              Recruter un joueur <UsersRound size={17} />
            </button>
            <button className="secondary-button" onClick={() => onNavigate('hockey')}>
              Jouer une mise au jeu <Swords size={17} />
            </button>
          </div>
        </div>

        <div className="rank-progress-card">
          <div className="rank-card-top">
            <span className="rank-medallion"><Crown size={24} /></span>
            <div>
              <small>Rang actuel</small>
              <strong>{rank.label}</strong>
            </div>
            <span className="rank-level">LDA</span>
          </div>
          <div className="progress-copy">
            <span>Prochain rang</span>
            <strong>{nextTarget} pucks</strong>
          </div>
          <div className="progress-track"><span style={{ width: `${nextRank.progress * 100}%` }} /></div>
          <p>Chaque transfert, upgrade et mise au jeu te rapproche du sommet.</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="lineup-card panel-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">Cinq premiers</span>
              <h3>Ton power play</h3>
            </div>
            <button className="text-button" onClick={() => onNavigate('roster')}>Voir l’effectif <ChevronRight size={15} /></button>
          </div>
          {topLineup.length > 0 ? (
            <div className="lineup-row">
              {topLineup.map((player, index) => (
                <div className={`lineup-player lineup-slot-${index + 1}`} key={player.id} title={player.name}>
                  <PlayerPortrait player={player} />
                  <span>{player.number}</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 5 - topLineup.length) }).map((_, index) => (
                <div className="lineup-empty" key={`empty-${index}`}>
                  <UserPlus size={18} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-lineup">
              <UsersRound size={30} />
              <strong>Le vestiaire attend son premier transferts</strong>
              <button onClick={() => onNavigate('roster')}>Ouvrir le mercato</button>
            </div>
          )}
        </div>

        <div className="pulse-card panel-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">Cette session</span>
              <h3>Le pouls de l’équipe</h3>
            </div>
            <ActivityPulse clicks={game.clicks} />
          </div>
          <div className="pulse-metrics">
            <div><strong>{formatNumber(metric.production)}</strong><span>pucks / sec</span></div>
            <div><strong>{Object.keys(game.players).length}</strong><span>joueurs</span></div>
            <div><strong>{game.stats.faceoffWins}</strong><span>duels gagnés</span></div>
          </div>
        </div>
      </section>

      <section className="objective-strip">
        <div className="objective-icon"><Target size={22} /></div>
        <div>
          <span className="eyebrow">Objectif de la journée</span>
          <strong>Monter une première ligne qui rapporte 100 pucks/s</strong>
          <small>Combine le mercato et les améliorations de production.</small>
        </div>
        <div className="objective-progress">
          <span>{Math.min(100, Math.round((metric.production / 100) * 100))}%</span>
          <div><i style={{ width: `${Math.min(100, (metric.production / 100) * 100)}%` }} /></div>
        </div>
      </section>

      <section className="milestone-strip">
        <div className="milestone-icon"><Goal size={21} /></div>
        <div className="milestone-copy">
          <span className="eyebrow">Prochain palier de pucks</span>
          {nextPuckMilestone ? (
            <>
              <strong>{formatNumber(nextPuckMilestone.value, true)} pucks</strong>
              <small>Prime de {formatNumber(nextPuckMilestone.reward, true)} pucks + une corne de but spéciale.</small>
            </>
          ) : (
            <>
              <strong>Tous les paliers sont franchis</strong>
              <small>La légende de Virevolt est entrée dans l’histoire.</small>
            </>
          )}
        </div>
        {nextPuckMilestone && (
          <div className="milestone-progress">
            <span>{Math.round(milestoneProgress * 100)}%</span>
            <div><i style={{ width: `${milestoneProgress * 100}%` }} /></div>
          </div>
        )}
        <button className="text-button" onClick={() => onNavigate('trophies')}>
          Voir les palmarès <ChevronRight size={15} />
        </button>
      </section>
    </div>
  )
}

function ActivityPulse({ clicks }) {
  return (
    <div className="activity-pulse" style={{ '--clicks': Math.min(12, clicks % 13) }}>
      {[0, 1, 2, 3, 4].map((bar) => <i key={bar} />)}
    </div>
  )
}

function RosterTab({ game, onBuy }) {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('rating')
  const visiblePlayers = useMemo(() => {
    const filtered = filter === 'all' ? PLAYERS : PLAYERS.filter((player) => player.position === filter)
    return [...filtered].sort((a, b) => (
      sort === 'rating'
        ? (b.powerPoints || b.rating) - (a.powerPoints || a.rating) || a.cost - b.cost
        : a.cost - b.cost
    ))
  }, [filter, sort])

  const ownedCount = Object.keys(game.players).length
  const teamProduction = PLAYERS.reduce(
    (sum, player) => sum + (game.players[player.id] ? player.rate : 0),
    0,
  )

  return (
    <div className="tab-content roster-tab">
      <SectionHeader
        eyebrow="Effectif de la saison 1"
        title="Le mercato Prisme"
        description="Recrute les 28 joueurs fictifs de Virevolt. Chaque contrat est unique et augmente ta production."
        action={
          <div className="roster-total">
            <span>Vesting</span>
            <strong>{ownedCount}/{PLAYERS.length}</strong>
          </div>
        }
      />

      <div className="roster-toolbar">
        <div className="filter-pills">
          {TEAM_TABS.map((item) => (
            <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => setFilter(item.id)}>
              {item.label}
              <small>{item.id === 'all' ? PLAYERS.length : PLAYERS.filter((player) => player.position === item.id).length}</small>
            </button>
          ))}
        </div>
        <label className="sort-select">
          <span>Trier</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="rating">Indice de puissance</option>
            <option value="cost">Prix croissant</option>
          </select>
        </label>
      </div>

      <div className="roster-summary-bar">
        <div><UsersRound size={17} /><span>Contrats actifs</span><strong>{ownedCount}</strong></div>
        <div><Zap size={17} /><span>Production joueurs</span><strong>+{formatRate(teamProduction)} / s</strong></div>
        <p><Info size={14} /> Indices de puissance rééquilibrés pour le jeu · joueurs fictifs.</p>
      </div>

      <div className="player-grid">
        {visiblePlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            owned={Boolean(game.players[player.id])}
            affordable={game.pucks >= player.cost}
            onBuy={onBuy}
          />
        ))}
      </div>
    </div>
  )
}

function PlayerCard({ player, owned, affordable, onBuy }) {
  return (
    <article className={`player-card ${owned ? 'owned' : ''} ${!owned && !affordable ? 'unaffordable' : ''}`}>
      <div className="player-photo">
        <PlayerPortrait player={player} />
        <div className="player-photo-shade" />
        <span className="player-number">{player.number}</span>
        <span className="player-rating" title="Indice de puissance du joueur"><Star size={12} fill="currentColor" /> {player.powerPoints || player.rating}</span>
        <span className="player-country">{FLAGS[player.country]} {player.countryName}</span>
      </div>
      <div className="player-content">
        <span className="player-position">{player.position} · #{player.number}</span>
        <h3>{player.name}</h3>
        <div className="player-role"><Target size={13} /> {player.role}</div>
        <div className="player-rate">
          <span>Production</span>
          <strong><Zap size={14} /> +{formatRate(player.rate)} <small>pucks/s</small></strong>
        </div>
        <button
          className={owned ? 'owned-button' : affordable ? 'buy-button' : 'buy-button disabled'}
          onClick={() => onBuy(player)}
          disabled={owned || !affordable}
        >
          {owned ? (
            <><Check size={16} /> Dans l’effectif</>
          ) : affordable ? (
            <><Plus size={16} /> Recruter <span><PuckGlyph /> {formatNumber(player.cost)}</span></>
          ) : (
            <><LockKeyhole size={15} /> Recruter <span><PuckGlyph /> {formatNumber(player.cost)}</span></>
          )}
        </button>
      </div>
    </article>
  )
}

function TrainingTab({ game, buyMode, setBuyMode, onBuy }) {
  const [trainingType, setTrainingType] = useState('support')
  const upgrades = trainingType === 'click' ? CLICK_UPGRADES : SUPPORT_UPGRADES
  const totalLevels = Object.entries(game.upgrades).reduce(
    (sum, [id, level]) => sum + (CLICK_UPGRADES.some((item) => item.id === id) || SUPPORT_UPGRADES.some((item) => item.id === id) ? level : 0),
    0,
  )

  return (
    <div className="tab-content training-tab">
      <SectionHeader
        eyebrow="Centre de performance"
        title="Le travail paie"
        description="Améliore chaque contact sur la glace et/developpe ta production hors de la mise au jeu."
      />

      <div className="training-overview">
        <div className="training-stat">
          <span><PuckGlyph /> Production</span>
          <strong>+{formatRate(game.upgrades ? SUPPORT_UPGRADES.reduce((sum, item) => sum + (game.upgrades[item.id] || 0) * item.gain, 0) : 0)} / s</strong>
        </div>
        <div className="training-stat">
          <span><MousePointerClick /> Puissance tactile</span>
          <strong>{(1 + CLICK_UPGRADES.reduce((sum, item) => sum + (game.upgrades[item.id] || 0) * item.gain, 0)).toFixed(1)}</strong>
        </div>
        <div className="training-stat">
          <span><Settings2 /> Niveaux installés</span>
          <strong>{totalLevels}</strong>
        </div>
      </div>

      <div className="training-controls">
        <div className="segmented-control">
          <button className={trainingType === 'support' ? 'active' : ''} onClick={() => setTrainingType('support')}>
            <Users size={16} /> Production
          </button>
          <button className={trainingType === 'click' ? 'active' : ''} onClick={() => setTrainingType('click')}>
            <MousePointerClick size={16} /> Contacts
          </button>
        </div>
        <div className="quantity-control" aria-label="Quantité d’achat">
          {['x1', 'x10', 'max'].map((mode) => (
            <button key={mode} className={buyMode === mode ? 'active' : ''} onClick={() => setBuyMode(mode)}>
              {mode === 'max' ? 'MAX' : mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="upgrade-list">
        {upgrades.map((item, index) => {
          const owned = game.upgrades[item.id] || 0
          const maxQuantity = getMaxAffordable(item, game.pucks)
          const quantity = buyMode === 'max' ? maxQuantity : buyMode === 'x10' ? Math.min(10, maxQuantity) : Math.min(1, maxQuantity)
          const cost = getBatchCost(item, owned, quantity)
          return (
            <UpgradeCard
              key={item.id}
              item={item}
              index={index}
              owned={owned}
              quantity={quantity}
              cost={cost}
              affordable={quantity > 0}
              onBuy={() => onBuy(item, trainingType)}
            />
          )
        })}
      </div>
    </div>
  )
}

function UpgradeCard({ item, index, owned, quantity, cost, affordable, onBuy }) {
  return (
    <article className={`upgrade-card ${affordable ? '' : 'locked'}`}>
      <div className="upgrade-index">{String(index + 1).padStart(2, '0')}</div>
      <div className="upgrade-icon"><DynamicIcon name={item.icon} size={22} /></div>
      <div className="upgrade-copy">
        <div className="upgrade-title-row">
          <h3>{item.name}</h3>
          <span className="level-chip">Niveau {owned}</span>
        </div>
        <p>{item.description}</p>
      </div>
      <div className="upgrade-gain">
        <span>Gain / niveau</span>
        <strong>+{item.gain} <small>{item.gain < 10 ? 'pucks/s' : 'clic'}</small></strong>
      </div>
      <button className="upgrade-buy" disabled={!affordable} onClick={onBuy}>
        <span>
          <small>{quantity > 1 ? `Acheter ${quantity}×` : 'Améliorer'}</small>
          <strong><PuckGlyph /> {formatNumber(cost, true)}</strong>
        </span>
        <ChevronRight size={18} />
      </button>
    </article>
  )
}

function UltraTab({ game, onBuy, onHumanChant, onParterreChant }) {
  const ownedCount = Object.keys(game.ultras).length
  return (
    <div className="tab-content ultra-tab">
      <section className="ultra-hero">
        <div className="ultra-hero-copy">
          <span className="eyebrow">Tribune Prisme · Groupe de supporters</span>
          <h2>UN SEUL CREST.<br /><em>UN BRUIT DE FOLIE.</em></h2>
          <p>Les Ultras de Virevolt ne regardent pas seulement : ils font vibrer la baie. Chaque bloc déclenche un boost audio et temporaire, puis le temps se recharge. Les chants, la foule et les effets sont générés directement dans le site, sans média externe.</p>
        </div>
        <div className="ultra-crowd" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
          <div><Megaphone size={32} /><strong>{ownedCount}/{ULTRAS.length}</strong><span>blocs débloqués</span></div>
        </div>
      </section>

      <SectionHeader
        eyebrow="Blocs temporaires"
        title="Construis ton bloc ultra"
        description="Chaque ultra déclenche un effet limité dans le temps. Relance-le quand tu veux un nouveau moment de supporters."
      />

      <div className="ultra-grid">
        {ULTRAS.map((ultra) => {
          const owned = Boolean(game.ultras[ultra.id])
          const bonus = ULTRA_BONUS[ultra.id]
          const effect = bonus ? ULTRA_BOOSTS[bonus.id] : { click: ultra.click, production: ultra.production }
          const active = owned && bonus && (game.boosts[bonus.id] || 0) > Date.now()
          const actionCost = owned ? Math.ceil(ultra.cost * 0.15) : ultra.cost
          const affordable = game.pucks >= actionCost
          return (
            <article className={`ultra-card ${owned ? 'owned' : ''} ${ultra.id === 'singing' ? 'best-ultra' : ''}`} key={ultra.id}>
              <div className="ultra-pattern"><span>{ultra.number}</span></div>
              <div className="ultra-card-content">
                <div className="ultra-icon"><DynamicIcon name={ultra.icon} size={24} /></div>
                {ultra.id === 'singing' && <span className="best-tag"><Star size={10} fill="currentColor" /> Le meilleur boost</span>}
                {ultra.id === 'parterre-nord-standing' && <span className="best-tag standing-tag"><UsersRound size={10} /> Mode tous debout</span>}
                <span className="ultra-status">{active ? 'Boost actif · écoule le temps' : owned ? 'Bloc débloqué · relance possible' : 'Bloc à activer'}</span>
                {active && <span className="ultra-countdown"><Clock3 size={12} /> {formatDuration(game.boosts[bonus.id] - Date.now())}</span>}
                <h3>{ultra.name}</h3>
                <p>{ultra.description}</p>
                <div className="ultra-effects">
                  <span><MousePointerClick size={14} /> ×{formatRate(1 + effect.click)} clics</span>
                  <span><Zap size={14} /> ×{formatRate(1 + effect.production)} production</span>
                </div>
                <div className="ultra-reward"><Sparkles size={14} /> {ultra.reward}</div>
                <button
                  className={active ? 'ultra-owned-button' : affordable ? 'ultra-buy-button' : 'ultra-buy-button disabled'}
                  onClick={() => onBuy(ultra)}
                  disabled={active || !affordable}
                >
                  {active ? <><Check size={17} /> Boost actif</> : owned ? <>
                    <RotateCcw size={17} /> Relancer le boost
                    <span><PuckGlyph /> {formatNumber(actionCost)}</span>
                  </> : <>
                    <Megaphone size={17} /> Mobiliser le bloc
                    <span><PuckGlyph /> {formatNumber(actionCost)}</span>
                  </>}
                </button>
                {ultra.id === 'singing' && (
                  <button className="ultra-media-button" onClick={onHumanChant}>
                    <Radio size={13} /> Ouvrir le chant original
                  </button>
                )}
                {ultra.id === 'parterre-nord-standing' && (
                  <button className="ultra-media-button" onClick={onParterreChant}>
                    <Radio size={13} /> Voir les paroles originales
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function HockeyTab({ game, metric, onBuy, onFaceoff, onMiniFinish }) {
  return (
    <div className="tab-content hockey-tab">
      <SectionHeader
        eyebrow="Match en cours"
        title="Le temps de jeu"
        description="Les arrêts sont courts. Utilise chaque mise au jeu et chaque supériorité numérique."
      />

      <div className="hockey-layout">
        <Faceoff production={metric.production} onFinish={onFaceoff} />
        <div className="hockey-stats">
          <div><Swords size={19} /><span>Engagements</span><strong>{game.stats.faceoffs}</strong></div>
          <div><Target size={19} /><span>Réussite</span><strong>{game.stats.faceoffs ? Math.round((game.stats.faceoffWins / game.stats.faceoffs) * 100) : 0}%</strong></div>
          <div><Trophy size={19} /><span>Buts en PP</span><strong>{game.stats.faceoffWins}</strong></div>
          <div><Gamepad2 size={19} /><span>Mini-jeux</span><strong>{game.stats.miniGamesWon}/{game.stats.miniGamesPlayed}</strong></div>
        </div>
      </div>

      <SectionHeader
        eyebrow="Mini-jeux"
        title="Le travail de rink"
        description="Trois défis rapides pour travailler les shots, la précision et les réflexes."
      />

      <div className="mini-game-grid">
        <PowerShot production={metric.production} onFinish={onMiniFinish} />
        <PenaltyShootout production={metric.production} onFinish={onMiniFinish} />
        <RallyChallenge production={metric.production} onFinish={onMiniFinish} />
      </div>

      <SectionHeader
        eyebrow="Potions du vestiaire"
        title="Boosts de match"
        description="Des multiplicateurs temporaires pour finir une série ou ambitionner le record. Les effets sonores sont générés dans le site, sans ouvrir de lien vidéo."
      />

      <div className="boost-grid">
        {BOOSTS.map((boost) => {
          const endsAt = game.boosts[boost.id] || 0
          const remaining = Math.max(0, endsAt - Date.now())
          const active = remaining > 0
          const affordable = game.pucks >= boost.cost
          return (
            <article className={`boost-card ${active ? 'active' : ''}`} key={boost.id}>
              <div className="boost-card-top">
                <span className="boost-icon"><DynamicIcon name={boost.icon} size={22} /></span>
                {active && <span className="active-tag"><span /> {formatDuration(remaining)}</span>}
              </div>
              <h3>{boost.name}</h3>
              <p>{boost.description}</p>
              <div className="boost-effect-line">
                {boost.click > 0 && <strong>×{boost.click + 1} clic</strong>}
                {boost.production > 0 && <strong>×{boost.production + 1} prod.</strong>}
                <span><Clock3 size={13} /> {formatDuration(boost.duration * 1000)}</span>
              </div>
              <button
                className={active ? 'boost-refresh' : affordable ? 'boost-buy' : 'boost-buy disabled'}
                onClick={() => onBuy(boost)}
                disabled={!affordable}
              >
                {active ? 'Recharger' : 'Activer'} <span><PuckGlyph /> {formatNumber(boost.cost)}</span>
              </button>
            </article>
          )
        })}
      </div>

      <div className="hockey-rules">
        <div><span>01</span><MousePointerClick size={20} /><strong>Chaque contact</strong><p>Le crest ajoute un puck, puis ta puissance augmente.</p></div>
        <div><span>02</span><Zap size={20} /><strong>Production passive</strong><p>Joueurs et staff rapportent même lorsque tu regardes ailleurs.</p></div>
        <div><span>03</span><UsersRound size={20} /><strong>Bonus Ultras</strong><p>Les supporters multiplient tous les gains de façon cumulative.</p></div>
      </div>
    </div>
  )
}

function Faceoff({ production, onFinish }) {
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState(0)
  const [result, setResult] = useState(null)
  const positionRef = useRef(0)
  const frameRef = useRef(null)

  const launch = () => {
    if (active) return
    const start = performance.now()
    const duration = 920 + Math.random() * 420
    setActive(true)
    setResult(null)
    setPosition(0)
    positionRef.current = 0

    const tick = (time) => {
      const progress = Math.min(1, (time - start) / duration)
      const nextPosition = progress * 108 - 4
      positionRef.current = nextPosition
      setPosition(nextPosition)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setActive(false)
        setResult({ won: false, position: nextPosition })
        onFinish(false, 0)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (!active) return
    cancelAnimationFrame(frameRef.current)
    const currentPosition = Math.max(0, Math.min(100, positionRef.current))
    const won = currentPosition >= 40 && currentPosition <= 60
    const precision = won ? 1 - Math.abs(currentPosition - 50) / 10 : 0
    const reward = won ? Math.max(25, production * (5 + precision * 4)) : 0
    setActive(false)
    setPosition(currentPosition)
    setResult({ won, position: currentPosition })
    onFinish(won, reward)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === 'Space' && active) {
        event.preventDefault()
        stop()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    },
    [],
  )

  return (
    <section className="faceoff-card">
      <div className="faceoff-heading">
        <div>
          <span className="eyebrow">Mini-jeu · 3 sur 2</span>
          <h3>Face-off</h3>
        </div>
        <span className="keyboard-hint"><Keyboard size={14} /> ESPACE</span>
      </div>
      <p>Gagne la mise au jeu en arrêtant le marqueur dans la zone verte.</p>
      <div className="faceoff-rink">
        <div className="faceoff-center-line" />
        <div className="faceoff-target"><span>WIN</span></div>
        <div
          className={`faceoff-puck ${result?.won ? 'won' : ''} ${active ? 'moving' : ''}`}
          style={{ left: `${Math.max(0, Math.min(98, position))}%` }}
        >
          <PuckGlyph />
        </div>
        {result && !active && (
          <span className={`faceoff-result ${result.won ? 'success' : 'miss'}`}>
            {result.won ? 'GAGNE !' : 'RATÉ'}
          </span>
        )}
      </div>
      <button className={active ? 'faceoff-button active' : 'faceoff-button'} onClick={active ? stop : launch}>
        {active ? <><Target size={19} /> GAGNER LE DUEL</> : <><Swords size={19} /> LANCER LA MISE AU JEU</>}
      </button>
      <small>Récompense : jusqu’à 9 secondes de production actuelle.</small>
    </section>
  )
}

function PowerShot({ production, onFinish }) {
  const [power, setPower] = useState(0)
  const [charging, setCharging] = useState(false)
  const [result, setResult] = useState(null)
  const powerRef = useRef(0)
  const chargingRef = useRef(false)
  const frameRef = useRef(null)
  const startedAtRef = useRef(0)

  const start = () => {
    if (chargingRef.current) return
    chargingRef.current = true
    setCharging(true)
    setResult(null)
    startedAtRef.current = performance.now()
    const tick = (time) => {
      const next = Math.min(100, ((time - startedAtRef.current) / 1250) * 100)
      powerRef.current = next
      setPower(next)
      if (next < 100) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (!chargingRef.current) return
    chargingRef.current = false
    setCharging(false)
    cancelAnimationFrame(frameRef.current)
    const accuracy = 1 - Math.abs(powerRef.current - 78) / 100
    const won = accuracy >= 0.48
    const reward = won
      ? Math.max(100, Math.round(production * (2 + accuracy * 3)))
      : Math.max(10, Math.round(production * 0.35))
    setResult({ won, accuracy })
    onFinish(won, reward, 'Tir de puissance')
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return (
    <article className="mini-game-card">
      <div className="mini-game-heading"><div><span className="eyebrow">Mini-jeu 01</span><h3>Tir de puissance</h3></div><Target size={19} /></div>
      <p>Maintiens le bouton et relâche dans la zone jaune.</p>
      <div className="power-rink"><div className="power-target" /><div className="power-marker" style={{ left: `${power}%` }}><PuckGlyph /></div></div>
      <button className={`mini-game-button ${charging ? 'charging' : ''}`} onPointerDown={start} onPointerUp={stop} onPointerCancel={stop}>
        {charging ? <><Zap size={16} /> Relâche !</> : <><MousePointerClick size={16} /> Maintiens pour shooter</>}
      </button>
      {result && <div className={`mini-result ${result.won ? 'won' : 'lost'}`}>{result.won ? `But ! ${Math.round(result.accuracy * 100)}% de précision` : 'Tir raté · réessaie'}</div>}
    </article>
  )
}

function PenaltyShootout({ production, onFinish }) {
  const [result, setResult] = useState(null)
  const directions = [
    { id: 'left', label: 'Gauche', arrow: '←' },
    { id: 'center', label: 'Centre', arrow: '↑' },
    { id: 'right', label: 'Droite', arrow: '→' },
  ]
  const shoot = (direction) => {
    const goalie = directions[Math.floor(Math.random() * directions.length)]
    const skill = clamp(0.55 + Math.log10(production + 1) * 0.08, 0.55, 0.82)
    const won = direction.id !== goalie.id || Math.random() < skill
    const reward = won
      ? Math.max(150, Math.round(production * 4))
      : Math.max(15, Math.round(production * 0.5))
    setResult({ won, goalie, direction })
    onFinish(won, reward, 'Tir de pénalité')
  }

  return (
    <article className="mini-game-card">
      <div className="mini-game-heading"><div><span className="eyebrow">Mini-jeu 02</span><h3>Pénalité</h3></div><Goal size={19} /></div>
      <p>Choisis un coin. Le gardien ne va pas forcément deviner.</p>
      <div className="penalty-grid">
        {directions.map((direction) => <button key={direction.id} onClick={() => shoot(direction)} disabled={Boolean(result)}><strong>{direction.arrow}</strong><span>{direction.label}</span></button>)}
      </div>
      {result && <div className={`mini-result ${result.won ? 'won' : 'lost'}`}>{result.won ? 'But marqué !' : `Arrêté · le gardien a visé ${result.goalie.label.toLowerCase()}`}<button onClick={() => setResult(null)}>Rejouer</button></div>}
    </article>
  )
}

function RallyChallenge({ production, onFinish }) {
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState(0)
  const [result, setResult] = useState(null)
  const positionRef = useRef(0)
  const frameRef = useRef(null)

  const launch = () => {
    if (active) return
    const start = performance.now()
    const duration = 1250
    setActive(true)
    setResult(null)
    setPosition(0)
    const tick = (time) => {
      const next = ((time - start) / duration) * 108 - 4
      positionRef.current = next
      setPosition(next)
      if (next < 108) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (!active) return
    cancelAnimationFrame(frameRef.current)
    setActive(false)
    const current = Math.max(0, Math.min(108, positionRef.current))
    const won = current >= 35 && current <= 65
    const reward = won ? Math.max(100, Math.round(production * 3)) : Math.max(10, Math.round(production * 0.3))
    setResult({ won })
    onFinish(won, reward, 'Rally 3 contre 2')
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code !== 'Space') return
      event.preventDefault()
      if (active) stop()
      else launch()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return (
    <article className="mini-game-card">
      <div className="mini-game-heading"><div><span className="eyebrow">Mini-jeu 03</span><h3>Rally 3 contre 2</h3></div><Swords size={19} /></div>
      <p>Clique ou presse Espace quand le puck entre dans la zone verte.</p>
      <div className="rally-track"><div className="rally-zone" /><div className={`rally-puck ${active ? 'moving' : ''}`} style={{ left: `${Math.max(0, Math.min(98, position))}%` }}><PuckGlyph /></div></div>
      <button className={`mini-game-button ${active ? 'charging' : ''}`} onClick={active ? stop : launch}>{active ? <><Target size={16} /> Stopper le puck</> : <><Swords size={16} /> Lancer le rally</>}</button>
      {result && <div className={`mini-result ${result.won ? 'won' : 'lost'}`}>{result.won ? 'Rally gagné !' : 'Rally perdu · réessaie'}</div>}
    </article>
  )
}

function LegendTab({ game, metric, busy, onClaimQuest, onClaimDaily, onBuyUpgrade, onPlayRound, onRestartTournament }) {
  const legend = game.legend
  const tournament = legend.tournament
  const currentOpponent = LEGEND_OPPONENTS[Math.min(tournament.round, LEGEND_OPPONENTS.length - 1)]
  const chance = tournament.champion ? 1 : getMatchChance(game, currentOpponent)
  const dailyProgress = Math.min(LEGEND_DAILY.target, legend.dailyClicks)
  const dailyClaimed = legend.dailyClaimed.includes(LEGEND_DAILY.id)
  const rosterPower = getRosterPower(game)
  const tournamentReport = tournament.lastReport
  const questState = { ...game, pps: metric.production }

  return (
    <div className="tab-content legend-tab">
      <SectionHeader
        eyebrow="Mode débloqué · effectif complet"
        title="La légende de Virevolt"
        description="Quand les 28 joueurs sont recrutés, le club ouvre ses plus grands dossiers : quêtes, héritage et Coupe des Aurores."
        action={<div className="legend-glory"><Crown size={16} /><span>Vers la coupe</span><strong>{formatNumber(legend.glory, true)}</strong></div>}
      />

      <section className="legend-hero">
        <div className="legend-hero-copy">
          <div className="legend-hero-kicker"><Sparkles size={14} /> Centre de la légende</div>
          <h2>TON VESTIAIRE<br /><em>EST COMPLET.</em></h2>
          <p>Tu as recruté les 28 joueurs de Virevolt. Maintenant, construis un club qui laisse une vraie trace dans l’histoire.</p>
          <div className="legend-hero-stats">
            <div><strong>{Math.round(rosterPower)}</strong><span>puissance roster</span></div>
            <div><strong>{formatRate(metric.production)}</strong><span>pucks / sec</span></div>
            <div><strong>{tournament.champion ? '1' : '0'}</strong><span>coupe gagnée</span></div>
          </div>
        </div>
        <div className="legend-hero-emblem"><Trophy size={52} /><span>CHAMPIONS</span></div>
      </section>

      <div className="legend-dashboard">
        <section className="daily-card panel-card">
          <div className="legend-card-heading">
            <div><span className="eyebrow">Défi du jour</span><h3>{LEGEND_DAILY.name}</h3></div>
            <span className="daily-chip"><CalendarDays size={13} /> {legend.dailyDay}</span>
          </div>
          <p>{LEGEND_DAILY.description}</p>
          <div className="daily-progress-row"><strong>{dailyProgress}/{LEGEND_DAILY.target}</strong><span>+{formatNumber(LEGEND_DAILY.reward)} pucks</span></div>
          <div className="daily-track"><span style={{ width: `${(dailyProgress / LEGEND_DAILY.target) * 100}%` }} /></div>
          <button className={dailyClaimed ? 'claim-button claimed' : dailyProgress >= LEGEND_DAILY.target ? 'claim-button ready' : 'claim-button'} onClick={onClaimDaily} disabled={dailyClaimed || dailyProgress < LEGEND_DAILY.target}>
            {dailyClaimed ? <><Check size={15} /> Prime récupérée</> : dailyProgress >= LEGEND_DAILY.target ? <><GiftIcon /> Récupérer la prime</> : <><Target size={15} /> Encore {LEGEND_DAILY.target - dailyProgress} contacts</>}
          </button>
        </section>

        <section className="legend-tournament-card panel-card">
          <div className="legend-card-heading">
            <div><span className="eyebrow">Coupe des Aurores · édition {tournament.edition}</span><h3>{tournament.champion ? 'Champion !!!' : `Tour ${tournament.round + 1}/${LEGEND_OPPONENTS.length}`}</h3></div>
            <Trophy size={20} />
          </div>
          {!tournament.champion ? (
            <>
              <div className="legend-opponent"><span className="legend-opponent-badge" style={{ '--team-color': currentOpponent.color }}>{currentOpponent.short}</span><div><strong>{currentOpponent.name}</strong><span>Puissance {currentOpponent.strength} · chance {Math.round(chance * 100)}%</span></div></div>
              <button className="primary-button wide legend-round-button" onClick={onPlayRound} disabled={busy}>{busy ? <><RotateCcw size={16} className="spin" /> Match en cours…</> : <><Swords size={17} /> Jouer le round</>}</button>
            </>
          ) : (
            <div className="champion-message"><div><Trophy size={27} /></div><strong>La coupe est à toi !</strong><span>Relance un tournoi pour obtenir encore plus de gloire.</span><button className="secondary-button" onClick={onRestartTournament}><RotateCcw size={15} /> Relancer la coupe</button></div>
          )}
          {tournamentReport && !tournament.champion && <div className={`legend-last-result ${tournamentReport.won ? 'won' : 'lost'}`}><span>{tournamentReport.won ? 'VICTOIRE' : 'DÉFAITE'}</span><strong>{tournamentReport.scoreFor}–{tournamentReport.scoreAgainst}</strong><small>contre {tournamentReport.opponentName}</small></div>}
        </section>
      </div>

      <section className="legend-section">
        <div className="legend-section-heading"><div><span className="eyebrow">Objectifs</span><h2>Quêtes de légende</h2></div><span>{legend.claimedQuests.length}/{LEGEND_QUESTS.length} terminées</span></div>
        <div className="legend-quest-grid">
          {LEGEND_QUESTS.map((quest) => {
            const claimed = legend.claimedQuests.includes(quest.id)
            const ready = quest.goal(questState)
            return <article className={`legend-quest ${claimed ? 'claimed' : ''} ${ready ? 'ready' : ''}`} key={quest.id}>
              <div className="legend-quest-icon"><DynamicIcon name={quest.icon} size={19} /></div>
              <div className="legend-quest-copy"><h3>{quest.name}</h3><p>{quest.description}</p><span>+{formatNumber(quest.reward, true)} pucks</span></div>
              <button className="claim-button" onClick={() => onClaimQuest(quest)} disabled={claimed || !ready}>{claimed ? <Check size={14} /> : ready ? 'Réclamer' : <LockKeyhole size={14} />}</button>
            </article>
          })}
        </div>
      </section>

      <section className="legend-section">
        <div className="legend-section-heading"><div><span className="eyebrow">Bonus permanents</span><h2>Héritage des Braises</h2></div><span className="section-hint">Investis ta production</span></div>
        <div className="legend-upgrade-grid">
          {LEGEND_UPGRADES.map((upgrade) => {
            const owned = Boolean(legend.upgrades[upgrade.id])
            const affordable = game.pucks >= upgrade.cost
            return <article className={`legend-upgrade ${owned ? 'owned' : ''} ${!owned && !affordable ? 'locked' : ''}`} key={upgrade.id}>
              <div className="legend-upgrade-icon"><DynamicIcon name={upgrade.icon} size={21} /></div>
              <div className="legend-upgrade-copy"><h3>{upgrade.name}</h3><p>{upgrade.description}</p></div>
              <button className="legend-buy" onClick={() => onBuyUpgrade(upgrade)} disabled={owned || !affordable}>{owned ? <><Check size={14} /> Installé</> : <><PuckGlyph /> {formatNumber(upgrade.cost)}</>}</button>
            </article>
          })}
        </div>
      </section>
    </div>
  )
}

function GiftIcon() {
  return <Sparkles size={15} />
}

function SeasonTab({ game, metric, busy, onSimulateMatch, onSimulateSeason, onResetSeason }) {
  const season = game.season
  const nextOpponent = getSeasonOpponent(game)
  const complete = season.week >= SEASON_OPPONENTS.length
  const matchOpponent = complete
    ? SEASON_OPPONENTS[Math.max(0, season.week - 1) % SEASON_OPPONENTS.length]
    : nextOpponent
  const rosterPower = getRosterPower(game)
  const chance = complete ? 1 : getMatchChance(game, matchOpponent)
  const winRate = season.wins + season.losses > 0
    ? Math.round((season.wins / (season.wins + season.losses)) * 100)
    : 0
  const progress = (season.week / SEASON_OPPONENTS.length) * 100
  const topPlayers = PLAYERS.filter((player) => game.players[player.id])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
  const report = season.lastReport
  const standings = [
    { name: 'Virevolt Hockey Club', short: 'VHC', points: season.points, record: `${season.wins}V–${season.losses}D`, us: true },
    ...SEASON_OPPONENTS.map((opponent, index) => ({
      name: opponent.name,
      short: opponent.short,
      points: 8 + Math.floor((opponent.strength - 70) / 2) + ((index * 3) % 6),
      record: `${Math.max(2, 12 - index)}V–${Math.max(2, 8 - (index % 3))}D`,
      us: false,
    })),
  ].sort((a, b) => b.points - a.points)

  return (
    <div className="tab-content season-tab">
      <SectionHeader
        eyebrow={`Ligue nationale · saison ${season.seasonNumber}`}
        title="La course au championnat"
        description="Simule des journées complètes en quelques secondes. Chaque victoire rapporte des pucks et un boost immédiat."
        action={
          <div className="season-counter">
            <span>Calendrier</span>
            <strong>{season.week}/{SEASON_OPPONENTS.length}</strong>
          </div>
        }
      />

      <section className={`season-match-hero ${complete ? 'season-complete' : ''}`}>
        <div className="season-match-copy">
          <div className="match-kicker">
            <span className={complete ? 'complete-dot' : 'live-dot'} />
            {complete ? 'SAISON TERMINÉE' : `MATCH ${season.week + 1} / ${SEASON_OPPONENTS.length}`}
          </div>
          <div className="match-title">
            <strong>VIREVOLT</strong>
            <span>VS</span>
            <strong>{matchOpponent.short}</strong>
          </div>
          <h2>{complete ? 'Le calendrier est au complet.' : `Place à Virevolt contre ${matchOpponent.name}.`}</h2>
          <p>
            {complete
              ? 'Tu peux relancer une nouvelle saison avec ton effectif actuel. Les gains restent dans ta ville.'
              : 'Les meilleurs joueurs de ton roster augmentent ta puissance et donc tes chances de gagner.'}
          </p>
          <div className="match-actions">
            {!complete && (
              <button className="primary-button" onClick={onSimulateMatch} disabled={busy}>
                {busy ? <><RotateCcw size={16} className="spin" /> Simulation…</> : <><Swords size={17} /> Simuler la journée</>}
              </button>
            )}
            {!complete && (
              <button className="secondary-button" onClick={onSimulateSeason} disabled={busy}>
                <CalendarDays size={16} /> {busy ? 'En cours…' : 'Terminer la saison'}
              </button>
            )}
            {complete && (
              <button className="primary-button" onClick={onResetSeason}>
                <RotateCcw size={16} /> Nouvelle saison
              </button>
            )}
          </div>
        </div>

        <div className="season-chance-card">
          <div className="chance-ring" style={{ '--chance': `${chance * 100}%` }}>
            <div><strong>{Math.round(chance * 100)}%</strong><span>victoire</span></div>
          </div>
          <div className="opponent-emblem" style={{ '--team-color': matchOpponent.color }}>
            {matchOpponent.short}
          </div>
          <strong className="opponent-name">{matchOpponent.name}</strong>
          <span className="opponent-strength">Puissance {matchOpponent.strength} · {matchOpponent.city}</span>
          <small>{complete ? 'Classement final' : 'Chance calculée avec ton roster'}</small>
        </div>
      </section>

      <div className="season-dashboard">
        <section className="season-power-card panel-card">
          <div className="season-card-heading">
            <div><span className="eyebrow">Effectif</span><h3>Puissance de roster</h3></div>
            <UsersRound size={19} />
          </div>
          <div className="power-value"><strong>{Math.round(rosterPower)}</strong><span>/ 100</span></div>
          <div className="power-track"><span style={{ width: `${rosterPower}%` }} /></div>
          <p>Les meilleurs joueurs, la production et les bonus d’ultras font monter ton power play.</p>
          <div className="top-player-row">
            {topPlayers.length > 0 ? topPlayers.map((player) => (
              <div key={player.id} title={player.name}><PlayerPortrait player={player} /><span>{player.rating}</span></div>
            )) : <div className="no-scouts"><UserPlus size={16} /> Recrute ton premier joueur</div>}
          </div>
        </section>

        <section className="season-form-card panel-card">
          <div className="season-card-heading">
            <div><span className="eyebrow">Forme</span><h3>Les Veilleurs en route</h3></div>
            <Flame size={19} />
          </div>
          <div className="form-metrics">
            <div><strong>{season.wins}</strong><span>victoires</span></div>
            <div><strong>{season.points}</strong><span>points</span></div>
            <div><strong>{winRate}%</strong><span>réussite</span></div>
            <div><strong>{season.streak}</strong><span>série</span></div>
          </div>
          <div className="season-progress"><span style={{ width: `${progress}%` }} /></div>
          <small>{complete ? 'Saison bouclée · relance quand tu veux' : `${SEASON_OPPONENTS.length - season.week} matchs restants`}</small>
        </section>
      </div>

      <div className="season-content-grid">
        <section className="season-schedule panel-card">
          <div className="season-card-heading">
            <div><span className="eyebrow">Calendrier</span><h3>Les 10 rencontres</h3></div>
            <span className="mini-tag">LDA</span>
          </div>
          <div className="fixture-list">
            {SEASON_OPPONENTS.map((opponent, index) => {
              const played = season.history.find((item) => item.opponentId === opponent.id)
              const next = !complete && index === season.week
              return (
                <div className={`fixture-row ${next ? 'next' : ''} ${played ? (played.won ? 'won' : 'lost') : ''}`} key={opponent.id}>
                  <span className="fixture-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="fixture-badge" style={{ '--team-color': opponent.color }}>{opponent.short}</span>
                  <span className="fixture-name"><strong>{opponent.name}</strong><small>{opponent.city}</small></span>
                  <span className="fixture-score">{played ? `${played.scoreFor}–${played.scoreAgainst}` : next ? 'À venir' : '—'}</span>
                  <span className={`fixture-result ${played ? (played.won ? 'win' : 'loss') : ''}`}>
                    {played ? (played.won ? 'V' : 'D') : next ? 'NEXT' : ''}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="season-standings panel-card">
          <div className="season-card-heading">
            <div><span className="eyebrow">Projection</span><h3>Classement simulé</h3></div>
            <Trophy size={19} />
          </div>
          <div className="standings-list">
            {standings.slice(0, 7).map((team, index) => (
              <div className={`standing-row ${team.us ? 'is-virevolt' : ''}`} key={team.name}>
                <span className="standing-rank">{index + 1}</span>
                <span className="standing-team-mark">{team.short}</span>
                <span className="standing-team-name"><strong>{team.name}</strong><small>{team.record}</small></span>
                <strong className="standing-points">{team.points} pts</strong>
              </div>
            ))}
          </div>
          <p className="standings-note">Les points des adversaires sont une projection fictive. Les tiens dépendent de tes victoires.</p>
        </section>
      </div>

      <section className="season-report panel-card">
        <div className="season-card-heading">
          <div><span className="eyebrow">Rapport de match</span><h3>{report ? (report.type === 'season' ? 'Résumé de la saison' : 'Dernier résultat') : 'Le vestiaire attend'}</h3></div>
          {report && <span className="report-live">LIVE</span>}
        </div>
        {!report ? (
          <div className="empty-report"><CalendarDays size={27} /><strong>Lance une première journée</strong><span>Chaque victoire renforce ton historique et ta production.</span></div>
        ) : report.type === 'season' ? (
          <div className="season-summary">
            <div className="summary-score"><strong>{report.wins}–{report.losses}</strong><span>victoires–défaites</span></div>
            <div><span>Pucks gagnés</span><strong>+{formatNumber(report.reward, true)}</strong></div>
            <div><span>Points</span><strong>{report.points}</strong></div>
            <div><span>Recrutements</span><strong>{report.scouted.length}</strong></div>
          </div>
        ) : (
          <div className={`match-report ${report.won ? 'report-win' : 'report-loss'}`}>
            <div className="report-result-icon">{report.won ? <Trophy size={23} /> : <CloudCog size={23} />}</div>
            <div className="report-main"><strong>{report.won ? 'Victoire !' : 'Défaite'}</strong><span>VIREVOLT {report.scoreFor}–{report.scoreAgainst} {report.opponentName}</span></div>
            <div className="report-reward"><small>{report.won ? 'Prime de victoire' : 'Pas de prime'}</small><strong>{report.won ? `+${formatNumber(report.reward, true)} pucks` : 'On recommence'}</strong></div>
            {report.boostName && <div className="report-boost"><Sparkles size={15} /><span><small>Mini boost</small><strong>{report.boostName}</strong></span><time>{formatDuration(report.boostEndsAt - Date.now())}</time></div>}
            {report.scoutedName && <div className="report-scout"><UserPlus size={15} /><span>Recrutement bonus : <strong>{report.scoutedName}</strong></span></div>}
          </div>
        )}
      </section>
    </div>
  )
}

function TrophyTab({ game, metric, onExport, onImport, onReset, onClaimAchievement, onNavigate }) {
  const knownAchievementIds = new Set(ACHIEVEMENTS.map((achievement) => achievement.id))
  const unlockedIds = (game.achievements || []).filter((id) => knownAchievementIds.has(id))
  const claimedIds = new Set(game.achievementClaims || [])
  const unlocked = unlockedIds.length
  const claimable = unlockedIds.filter((id) => !claimedIds.has(id)).length
  const ownedPlayers = PLAYERS.filter((player) => game.players[player.id]).length
  const progress = (unlocked / ACHIEVEMENTS.length) * 100
  const reachedMilestones = new Set(game.milestoneReached || [])
  return (
    <div className="tab-content trophy-tab">
      <section className="trophy-hero">
        <div className="trophy-cup"><Trophy size={52} /></div>
        <div>
          <span className="eyebrow">Palmarès de la saison</span>
          <h2>Chaque grand club<br />a commencé <em>petit.</em></h2>
          <p>
            {unlocked} succès sur {ACHIEVEMENTS.length} débloqués
            {claimable > 0 ? ` · ${claimable} récompense${claimable > 1 ? 's' : ''} à réclamer` : ' · toutes les récompenses sont reçues'}
          </p>
          <div className="trophy-progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <strong>{Math.round(progress)}%</strong>
      </section>

      <div className="career-stats">
        <div><PuckGlyph /><span>Pucks collectés</span><strong>{formatNumber(game.totalPucks)}</strong></div>
        <div><Zap /><span>Production</span><strong>{formatRate(metric.production)} / s</strong></div>
        <div><MousePointerClick /><span>Contacts</span><strong>{formatNumber(game.clicks, true)}</strong></div>
        <div><Swords /><span>Duels gagnés</span><strong>{game.stats.faceoffWins}</strong></div>
      </div>

      <section className="puck-milestones panel-card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">Les paliers de la légende</span>
            <h3>Du milliard au trillion</h3>
          </div>
          <Goal size={20} />
        </div>
        <p className="milestone-board-copy">Chaque nouveau palier déclenche une célébration, une prime et la corne d’Éclat de Virevolt.</p>
        <div className="milestone-source-links">
          <span><Radio size={12} /> Corne de but intégrée</span>
          <span><Megaphone size={12} /> Chants de la tribune intégrés</span>
        </div>
        <div className="milestone-list">
          {PUCK_MILESTONES.map((milestone) => {
            const reached = reachedMilestones.has(milestone.id)
            return (
              <div className={`milestone-row ${reached ? 'reached' : ''}`} key={milestone.id}>
                <span className="milestone-row-icon">{reached ? <Check size={14} /> : <LockKeyhole size={13} />}</span>
                <span className="milestone-row-copy">
                  <strong>{formatNumber(milestone.value, true)} pucks</strong>
                  <small>{milestone.label}</small>
                </span>
                <span className="milestone-row-reward">+{formatNumber(milestone.reward, true)}</span>
                <span className="milestone-row-status">{reached ? 'REUSSI' : 'À VENIR'}</span>
              </div>
            )
          })}
        </div>
      </section>

      <SectionHeader eyebrow="Objectifs" title="Les moments à ne pas manquer" description="Les succès se débloquent quand l’objectif est atteint, puis leur récompense se réclame dans la carte." />

      <div className="achievement-grid">
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = game.achievements.includes(achievement.id)
          const claimed = claimedIds.has(achievement.id)
          const state = { ...game, pps: metric.production, baseProduction: metric.baseProduction }
          const value = achievement.value ? achievement.value(state) : 0
          const target = achievement.target || 1
          const progress = isUnlocked ? 1 : Math.max(0, Math.min(1, value / target))
          const progressLabel = achievement.format === 'production'
            ? `${formatRate(value)} / ${formatRate(target)} pucks/s`
            : achievement.format === 'pucks'
              ? `${formatNumber(value)} / ${formatNumber(target)} pucks`
              : `${formatNumber(value, true)} / ${formatNumber(target, true)}`
          return (
            <article className={`achievement-card ${isUnlocked ? 'unlocked' : ''} ${claimed ? 'claimed' : ''}`} key={achievement.id}>
              <div className="achievement-icon">
                {isUnlocked ? <DynamicIcon name={achievement.icon} size={22} /> : <LockKeyhole size={19} />}
              </div>
              <div className="achievement-copy">
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                {!isUnlocked ? (
                  <div className="achievement-progress">
                    <div className="achievement-progress-track"><i style={{ width: `${progress * 100}%` }} /></div>
                    <span>{progressLabel}</span>
                  </div>
                ) : claimed ? (
                  <span className="achievement-claimed-label"><Check size={11} /> Récompense reçue</span>
                ) : (
                  <button className="achievement-claim" onClick={() => onClaimAchievement(achievement)}>
                    <PuckGlyph /> Réclamer +{formatNumber(achievement.reward || 0, true)}
                  </button>
                )}
              </div>
              {isUnlocked && <span className="unlocked-check"><Check size={13} /></span>}
            </article>
          )
        })}
      </div>

      {ownedPlayers < PLAYERS.length ? (
        <div className="legend-teaser">
          <div className="legend-teaser-icon"><LockKeyhole size={20} /></div>
          <div><span className="eyebrow">Prochain chapitre</span><h3>La Légende attend ton vestiaire complet</h3><p>Encore {PLAYERS.length - ownedPlayers} joueurs à recruter pour débloquer les quêtes, la Coupe des Aurores et l’héritage des Braises.</p></div>
          <button className="secondary-button" onClick={() => onNavigate('roster')}>Recruter <ChevronRight size={15} /></button>
        </div>
      ) : (
        <div className="legend-unlocked-banner">
          <div className="legend-teaser-icon"><Crown size={20} /></div>
          <div><span className="eyebrow">Mode débloqué</span><h3>La légende de Virevolt t’attend</h3><p>Quêtes, Coupe des Aurores et héritage permanent sont maintenant ouverts.</p></div>
          <button className="primary-button" onClick={() => onNavigate('legend')}>Ouvrir <ChevronRight size={15} /></button>
        </div>
      )}

      <div className="save-panel">
        <div>
          <span className="eyebrow">Sauvegarde locale</span>
          <h3>T’emporte ta saison</h3>
          <p>La progression est automatique. Exporte un fichier pour la transférer ou la conserver.</p>
        </div>
        <div className="save-actions">
          <button className="secondary-button" onClick={onExport}><Download size={16} /> Exporter</button>
          <button className="secondary-button" onClick={onImport}><Upload size={16} /> Importer</button>
          <button className="danger-outline-button" onClick={onReset}><RotateCcw size={16} /> Relancer</button>
        </div>
      </div>
    </div>
  )
}

function Modal({ children, onClose, wide = false }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className={`modal-card ${wide ? 'modal-card-wide' : ''}`} role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer"><X size={18} /></button>
        {children}
      </div>
    </div>
  )
}

export default App

// Univers entièrement fictif de Puck Virevolt.
// Tous les noms, joueurs, anecdotes, hymnes et valeurs de jeu sont originaux.
// Aucun contenu de club, de joueur, de ligue ou de supporter réel n'est utilisé.

export const PLAYERS = [
  { id: 'mael-rivemale', number: 7, name: 'Maël Rivemale', position: 'Attaquant', side: 'F', country: 'VI', countryName: 'Virevolt', rating: 76, powerPoints: 64, cost: 50, rate: 1, role: 'Relanceur' },
  { id: 'sora-neme', number: 18, name: 'Sora Némé', position: 'Attaquant', side: 'F', country: 'LU', countryName: 'Lunara', rating: 78, powerPoints: 68, cost: 90, rate: 1.5, role: 'Ailier gauche' },
  { id: 'ilyan-voss', number: 24, name: 'Ilyan Voss', position: 'Attaquant', side: 'F', country: 'HE', countryName: 'Hélios', rating: 79, powerPoints: 70, cost: 150, rate: 2.5, role: 'Contre-attaquant' },
  { id: 'noe-calix', number: 31, name: 'Noé Calix', position: 'Attaquant', side: 'F', country: 'SA', countryName: 'Sillage', rating: 80, powerPoints: 69, cost: 240, rate: 3.5, role: 'Centre créatif' },
  { id: 'eli-kiral', number: 5, name: 'Éli Kiral', position: 'Défenseur', side: 'D', country: 'VI', countryName: 'Virevolt', rating: 77, powerPoints: 68, cost: 300, rate: 4, role: 'Défenseur de zone' },
  { id: 'maelys-ors', number: 12, name: 'Maëlys Ors', position: 'Défenseur', side: 'D', country: 'LU', countryName: 'Lunara', rating: 79, powerPoints: 67, cost: 450, rate: 5, role: 'Patrouilleuse' },
  { id: 'timo-vesper', number: 8, name: 'Timo Vesper', position: 'Défenseur', side: 'D', country: 'HE', countryName: 'Hélios', rating: 80, powerPoints: 66, cost: 600, rate: 6.5, role: 'Défenseur mobile' },
  { id: 'aven-lior', number: 27, name: 'Aven Lior', position: 'Défenseur', side: 'D', country: 'NO', countryName: 'Néris', rating: 81, powerPoints: 65, cost: 850, rate: 8, role: 'Dégagement' },
  { id: 'sacha-prisme', number: 14, name: 'Sacha Prisme', position: 'Défenseur', side: 'D', country: 'KA', countryName: 'Kaldor', rating: 82, powerPoints: 64, cost: 1_100, rate: 10, role: 'Meneur de défense' },
  { id: 'nami-sorel', number: 35, name: 'Nami Sorel', position: 'Gardien', side: 'G', country: 'SA', countryName: 'Sillage', rating: 80, powerPoints: 63, cost: 1_500, rate: 12, role: 'Gardienne de glace' },
  { id: 'orin-vail', number: 30, name: 'Orin Vail', position: 'Gardien', side: 'G', country: 'VI', countryName: 'Virevolt', rating: 82, powerPoints: 64, cost: 2_200, rate: 15, role: 'Gardien lumière' },
  { id: 'lio-ardent', number: 10, name: 'Lio Ardent', position: 'Attaquant', side: 'F', country: 'TA', countryName: 'Talara', rating: 82, powerPoints: 72, cost: 3_500, rate: 22, role: 'Ailier express' },
  { id: 'maera-quell', number: 22, name: 'Maëra Quell', position: 'Attaquant', side: 'F', country: 'HE', countryName: 'Hélios', rating: 81, powerPoints: 71, cost: 5_000, rate: 28, role: 'Finition' },
  { id: 'tawan-rive', number: 16, name: 'Tawan Rive', position: 'Attaquant', side: 'F', country: 'NO', countryName: 'Néris', rating: 82, powerPoints: 70, cost: 7_000, rate: 35, role: 'Marqueur' },
  { id: 'come-vire', number: 47, name: 'Côme Vire', position: 'Défenseur', side: 'D', country: 'LU', countryName: 'Lunara', rating: 83, powerPoints: 74, cost: 9_000, rate: 42, role: 'Mur de glace' },
  { id: 'nyx-calder', number: 3, name: 'Nyx Calder', position: 'Défenseur', side: 'D', country: 'TA', countryName: 'Talara', rating: 84, powerPoints: 75, cost: 12_000, rate: 50, role: 'Passeur défensif' },
  { id: 'runa-skell', number: 9, name: 'Runa Skell', position: 'Attaquant', side: 'F', country: 'KA', countryName: 'Kaldor', rating: 83, powerPoints: 76, cost: 18_000, rate: 65, role: 'Attaquante turbo' },
  { id: 'elio-brume', number: 28, name: 'Elio Brume', position: 'Attaquant', side: 'F', country: 'VI', countryName: 'Virevolt', rating: 84, powerPoints: 78, cost: 26_000, rate: 80, role: 'Porteur de vitesse' },
  { id: 'zelie-nard', number: 19, name: 'Zélie Nard', position: 'Attaquant', side: 'F', country: 'SA', countryName: 'Sillage', rating: 85, powerPoints: 79, cost: 35_000, rate: 95, role: 'Attaquante unifiée' },
  { id: 'kael-orsini', number: 6, name: 'Kael Orsini', position: 'Défenseur', side: 'D', country: 'NO', countryName: 'Néris', rating: 85, powerPoints: 80, cost: 50_000, rate: 120, role: 'Lecture du jeu' },
  { id: 'vesper-lune', number: 44, name: 'Vesper Lune', position: 'Défenseur', side: 'D', country: 'HE', countryName: 'Hélios', rating: 86, powerPoints: 81, cost: 70_000, rate: 145, role: 'Gardien de zone' },
  { id: 'ari-solis', number: 81, name: 'Ari Solis', position: 'Attaquant', side: 'F', country: 'LU', countryName: 'Lunara', rating: 86, powerPoints: 82, cost: 100_000, rate: 180, role: 'Centre-vedette' },
  { id: 'fenn-miro', number: 55, name: 'Fenn Miro', position: 'Attaquant', side: 'F', country: 'TA', countryName: 'Talara', rating: 87, powerPoints: 84, cost: 150_000, rate: 230, role: 'Roi du cercle' },
  { id: 'alba-rive', number: 13, name: 'Alba Rive', position: 'Attaquant', side: 'F', country: 'VI', countryName: 'Virevolt', rating: 87, powerPoints: 85, cost: 220_000, rate: 300, role: 'Éclat offensif' },
  { id: 'ceris-volt', number: 25, name: 'Céris Volt', position: 'Défenseur', side: 'D', country: 'KA', countryName: 'Kaldor', rating: 88, powerPoints: 86, cost: 350_000, rate: 430, role: 'Pilier de glace' },
  { id: 'oren-flux', number: 32, name: 'Oren Flux', position: 'Défenseur', side: 'D', country: 'NO', countryName: 'Néris', rating: 89, powerPoints: 88, cost: 650_000, rate: 720, role: 'Forteresse mobile' },
  { id: 'luma-vesper', number: 20, name: 'Luma Vesper', position: 'Attaquant', side: 'F', country: 'HE', countryName: 'Hélios', rating: 90, powerPoints: 91, cost: 1_200_000, rate: 1_150, role: 'Phénomène Prisme' },
  { id: 'noa-zephyr', number: 17, name: 'Noa Zephyr', position: 'Attaquant', side: 'F', country: 'SA', countryName: 'Sillage', rating: 92, powerPoints: 94, cost: 2_200_000, rate: 1_700, role: 'Capitaine de l’aurore' },
]

export const CLICK_UPGRADES = [
  { id: 'warmup', name: 'Échauffement orbital', description: 'Chaque prise de lancer est plus précise.', icon: 'snowflake', baseCost: 20, scale: 1.45, gain: 1 },
  { id: 'glove', name: 'Gants Prisme', description: 'Un contact supplémentaire à chaque tir.', icon: 'hand', baseCost: 100, scale: 1.55, gain: 1 },
  { id: 'shaft', name: 'Lame Éclipse', description: 'Le feeling d’un lancer de constellation.', icon: 'grip', baseCost: 500, scale: 1.58, gain: 2 },
  { id: 'blue-line', name: 'Ligne de lune', description: 'Tu prends le contrôle de la zone neutre.', icon: 'route', baseCost: 2_500, scale: 1.62, gain: 5 },
  { id: 'gold-stick', name: 'Bâton Sillage', description: 'Plus de puissance sur chaque face-à-face.', icon: 'trophy', baseCost: 12_000, scale: 1.66, gain: 12 },
  { id: 'ice-tape', name: 'Ruban d’aurore', description: 'Chaque contact devient nettement plus fort.', icon: 'sparkles', baseCost: 60_000, scale: 1.7, gain: 30 },
  { id: 'xray', name: 'Lunettes Zénith', description: 'Une vision de terrain digne de la Ligue des Aurores.', icon: 'scan-eye', baseCost: 350_000, scale: 1.74, gain: 100 },
  { id: 'legacy', name: 'Héritage des Braises', description: 'Le retour du power play d’antan.', icon: 'crown', baseCost: 1_500_000, scale: 1.78, gain: 350 },
  { id: 'sherwood', name: 'Ambiance Virevolt', description: 'Le tout, c’est 1 000 pucks de plus par clic.', icon: 'sparkles', baseCost: 10_000_000, scale: 1.82, gain: 1_000 },
]

export const SUPPORT_UPGRADES = [
  { id: 'young', name: 'École des patins', description: 'Ramène les pucks avec lui.', icon: 'baby', baseCost: 15, scale: 1.16, gain: 0.1 },
  { id: 'therapist', name: 'Préparateur Nova', description: 'Toute l’équipe récupère vite.', icon: 'heart-pulse', baseCost: 120, scale: 1.18, gain: 0.8 },
  { id: 'student', name: 'Atelier des Braises', description: 'Les jeunes ateliers font produire des merveilles.', icon: 'graduation-cap', baseCost: 900, scale: 1.2, gain: 6 },
  { id: 'journalist', name: 'Radio Prisme', description: 'La patinoire devient un studio.', icon: 'radio', baseCost: 7_000, scale: 1.22, gain: 45 },
  { id: 'canteen', name: 'Buvette des Aurores', description: 'De l’énergie pour toute la soirée.', icon: 'coffee', baseCost: 55_000, scale: 1.24, gain: 320 },
  { id: 'fanclub', name: 'Club des Veilleurs', description: 'Le soutien de la baie fait croître la production.', icon: 'users', baseCost: 450_000, scale: 1.26, gain: 2_000 },
  { id: 'academy', name: 'Académie Orbitale', description: 'L’académie travaille en silence.', icon: 'building-2', baseCost: 4_000_000, scale: 1.28, gain: 12_000 },
  { id: 'sponsor', name: 'Mécène de la Baie', description: 'Un budget et une machine à ozone de plus.', icon: 'briefcase-business', baseCost: 30_000_000, scale: 1.3, gain: 80_000 },
]

export const ULTRAS = [
  {
    id: 'north-stand', number: '01', name: 'La Tribune des Braises',
    description: 'Le bruit devient de l’énergie lorsque la baie s’allume.', icon: 'megaphone', cost: 5_000, click: 0.1, production: 0.15,
    reward: 'Tribune réveillée · ×1,5 clics et production · 3 min',
  },
  {
    id: 'singing', number: '02', name: 'Le Chœur Zénith',
    description: 'Un chant original écrit pour faire monter la glace sous les bottes.', icon: 'mic-2', cost: 1_250_000, click: 0.4, production: 0.35,
    reward: '×3 clics · ×2 production · 5 min',
  },
  {
    id: 'tifo', number: '03', name: 'Tifo Prisme',
    description: 'Le virage déplie un mur de couleurs et de bruit.', icon: 'party-popper', cost: 750_000, click: 0.25, production: 0.25,
    reward: 'Tifo secoué · ×1,75 clics et production · 2 min',
  },
  {
    id: 'history', number: '04', name: 'Héritage des Ailes',
    description: 'Les trophées imaginaires de la maison donnent confiance.', icon: 'medal', cost: 7_500_000, click: 0.4, production: 0.35,
    reward: 'Héritage actif · ×2 clics et production · 2 min',
  },
  {
    id: 'parterre-nord-standing', number: '05', name: 'La Muraille d’Aurore',
    description: 'Quand le chant commence, les Veilleurs se lèvent et la tribune devient un mur cyan.', icon: 'megaphone', cost: 2_500_000, click: 0.35, production: 0.5,
    reward: '×2 clics · ×2 production · 4 min',
  },
]

export const SEASON_OPPONENTS = [
  { id: 'nebuleuse', name: 'HC Nébuleuse', short: 'NEB', city: 'Nébuleuse', strength: 86, color: '#5e7fe8' },
  { id: 'brumes', name: 'Vallée des Brumes', short: 'VBR', city: 'Brume-Vallée', strength: 85, color: '#d65776' },
  { id: 'kaldor', name: 'Pôles de Kaldor', short: 'KLD', city: 'Kaldor', strength: 82, color: '#4dbbb0' },
  { id: 'talara', name: 'HC Talara', short: 'TAL', city: 'Talara', strength: 81, color: '#d8a84e' },
  { id: 'sillage', name: 'Ailes de Sillage', short: 'AIL', city: 'Sillage', strength: 79, color: '#4c9be8' },
  { id: 'sorn', name: 'Les Rives de Sorn', short: 'SOR', city: 'Sorn', strength: 78, color: '#db7650' },
  { id: 'neris', name: 'Comètes de Néris', short: 'NER', city: 'Néris', strength: 76, color: '#b95be0' },
  { id: 'aster', name: 'Rochers d’Aster', short: 'AST', city: 'Aster', strength: 74, color: '#62b76b' },
  { id: 'veld', name: 'Loups de Veld', short: 'VLD', city: 'Veld', strength: 73, color: '#e28c38' },
  { id: 'velora', name: 'Éclairs de Velora', short: 'VEL', city: 'Velora', strength: 70, color: '#8a7ce8' },
]

export const SEASON_BOOSTS = {
  'season-spurt': { id: 'season-spurt', name: 'Sprint Prisme', description: '×2 clics pendant 90 secondes.', icon: 'zap', duration: 90, click: 1, production: 0 },
  'season-rink': { id: 'season-rink', name: 'Contrôle orbital', description: '×1,75 production pendant 90 secondes.', icon: 'snowflake', duration: 90, click: 0, production: 0.75 },
  'season-confidence': { id: 'season-confidence', name: 'Confiance cyan', description: '×1,5 clics et ×1,5 production pendant 60 secondes.', icon: 'trophy', duration: 60, click: 0.5, production: 0.5 },
}

export const LEGEND_OPPONENTS = [
  { id: 'tournament-1', name: 'Les Lucioles de Néris', short: 'LUC', strength: 88, color: '#63c8ff' },
  { id: 'tournament-2', name: 'Comètes de Sillage', short: 'CSI', strength: 91, color: '#6c9cff' },
  { id: 'tournament-3', name: 'Ailes d’Aster', short: 'AAX', strength: 94, color: '#d75baf' },
  { id: 'tournament-4', name: 'Forteresse de Talara', short: 'FOT', strength: 97, color: '#f1b54c' },
  { id: 'tournament-5', name: 'La Coupe des Quatre Aurores', short: 'C4A', strength: 100, color: '#9ce870' },
]

export const LEGEND_QUESTS = [
  { id: 'roster-complete', name: 'Le vestiaire complet', description: 'Recruter les 28 joueurs de Virevolt.', icon: 'shield-check', reward: 500_000, goal: (s) => Object.keys(s.players).length >= PLAYERS.length },
  { id: 'five-wins', name: 'Série Prisme', description: 'Gagner 5 matchs pendant une saison.', icon: 'swords', reward: 350_000, goal: (s) => s.season.wins >= 5 },
  { id: 'legend-champion', name: 'Toucher la Coupe des Aurores', description: 'Gagner le tournoi de la Légende.', icon: 'trophy', reward: 2_500_000, goal: (s) => s.legend.tournament.champion },
  { id: 'production-machine', name: 'Machine à pucks', description: 'Atteindre 1 000 pucks/s.', icon: 'gauge', reward: 750_000, goal: (s) => s.pps >= 1_000 },
  { id: 'all-ultras', name: 'La tribune au complet', description: 'Activer tous les blocs Ultras.', icon: 'megaphone', reward: 1_500_000, goal: (s) => Object.keys(s.ultras).length >= ULTRAS.length },
  { id: 'thousand-clicks', name: 'Mille contacts', description: 'Cliquer 1 000 fois sur le logo Prisme.', icon: 'mouse-pointer-click', reward: 300_000, goal: (s) => s.clicks >= 1_000 },
]

export const LEGEND_DAILY = {
  id: 'daily-contact', name: 'Le slap des Braises', description: 'Cliquer 100 fois aujourd’hui pour recevoir une prime.', icon: 'mouse-pointer-click', target: 100, reward: 50_000,
}

export const LEGEND_UPGRADES = [
  { id: 'hall-of-fame', name: 'Salle des Braises', description: 'Les trophées font produire +25 % de pucks.', icon: 'trophy', cost: 5_000_000, click: 0, production: 0.25 },
  { id: 'academy', name: 'Académie Orbitale', description: 'Le coaching ajoute +50 % à chaque clic.', icon: 'graduation-cap', cost: 12_000_000, click: 0.5, production: 0 },
  { id: 'broadcast', name: 'Radio Prisme', description: 'La diffusion ajoute +40 % de production.', icon: 'radio', cost: 50_000_000, click: 0, production: 0.4 },
  { id: 'ambassador', name: 'Ambassade de Virevolt', description: 'Le club devient international : +75 % clics et production.', icon: 'medal', cost: 500_000_000, click: 0.75, production: 0.75 },
]

export const ULTRA_BOOSTS = {
  'north-stand': { id: 'north-stand', name: 'La Tribune des Braises', description: 'Le virage réveille la patinoire : ×1,5 clics et ×1,5 production pendant 3 minutes.', icon: 'megaphone', duration: 180, click: 0.5, production: 0.5 },
  'tifo-ultra': { id: 'tifo-ultra', name: 'Tifo Prisme', description: 'Le tifo secoue les Veilleurs : ×1,75 clics et ×1,75 production pendant 2 minutes.', icon: 'party-popper', duration: 120, click: 0.75, production: 0.75 },
  'history-ultra': { id: 'history-ultra', name: 'Héritage des Ailes', description: 'L’histoire donne confiance : ×2 clics et ×2 production pendant 2 minutes.', icon: 'medal', duration: 120, click: 1, production: 1 },
  singing: { id: 'singing', name: 'Le Chœur Zénith', description: 'Le chant original le plus puissant : ×3 clics et ×2 production pendant 5 minutes.', icon: 'mic-2', duration: 300, click: 2, production: 1 },
  'parterre-nord-standing': { id: 'parterre-nord-standing', name: 'La Muraille d’Aurore', description: 'Tout le monde se lève : ×2 clics et ×2 production pendant 4 minutes.', icon: 'megaphone', duration: 240, click: 1, production: 1 },
}

export const BOOSTS = [
  { id: 'scarf-rave', name: 'Écharpes levées', description: 'Tous les Veilleurs lèvent leur écharpe : ×1,5 clics et ×1,5 production pendant 2 minutes.', icon: 'users-round', cost: 400_000, duration: 120, click: 0.5, production: 0.5 },
  { id: 'power-play', name: 'Avantage numérique', description: '×2 sur la production pendant 5 minutes.', icon: 'zap', cost: 2_500, duration: 300, click: 0, production: 1 },
  { id: 'third-period', name: 'Période decisive', description: '×2 aux clics et ×1,5 à la production pendant 3 minutes.', icon: 'timer', cost: 10_000, duration: 180, click: 1, production: 0.5 },
  { id: 'double-line', name: 'Double passage', description: '×2 sur la production pendant 60 secondes.', icon: 'git-branch', cost: 100_000, duration: 60, click: 0, production: 1 },
  { id: 'golden-goal', name: 'Éclat final', description: '×7 aux clics pendant 20 secondes.', icon: 'goal', cost: 500_000, duration: 20, click: 6, production: 0 },
  { id: 'tifo', name: 'Tifo Prisme', description: '×2 clics et ×2 production pendant 90 secondes.', icon: 'party-popper', cost: 750_000, duration: 90, click: 1, production: 1 },
]

export const PUCK_MILESTONES = [
  { id: 'billion', value: 1_000_000_000, label: 'Ligue des milliards', reward: 5_000_000 },
  { id: 'ten-billion', value: 10_000_000_000, label: 'Ligue des trillions', reward: 25_000_000 },
  { id: 'hundred-billion', value: 100_000_000_000, label: 'Empire des aurores', reward: 100_000_000 },
  { id: 'trillion', value: 1_000_000_000_000, label: 'Légende de Virevolt', reward: 500_000_000 },
]

export const ACHIEVEMENTS = [
  { id: 'first-puck', name: 'Première touche', description: 'Collecter 25 pucks au total.', icon: 'circle-dot', value: (s) => s.totalPucks, target: 25, reward: 250, format: 'pucks', goal: (s) => s.totalPucks >= 25 },
  { id: 'hundred-clicks', name: 'Cent touches', description: 'Cliquer 500 fois sur le logo Prisme.', icon: 'mouse-pointer-click', value: (s) => s.clicks, target: 500, reward: 5_000, goal: (s) => s.clicks >= 500 },
  { id: 'first-recruit', name: 'Premier transfert', description: 'Recruter un premier joueur de Virevolt.', icon: 'user-plus', value: (s) => Object.keys(s.players).length, target: 1, reward: 2_500, goal: (s) => Object.keys(s.players).length >= 1 },
  { id: 'full-forward', name: 'Attaque de gala', description: 'Recruter 10 joueurs et installer une vraie ligne.', icon: 'users-round', value: (s) => Object.keys(s.players).length, target: 10, reward: 25_000, goal: (s) => Object.keys(s.players).length >= 10 },
  { id: 'pps-100', name: 'Machine à pucks', description: 'Atteindre 250 pucks/s de production passive.', icon: 'gauge', value: (s) => s.baseProduction ?? s.pps, target: 250, reward: 50_000, format: 'production', goal: (s) => (s.baseProduction ?? s.pps) >= 250 },
  { id: 'million', name: 'Million de pucks', description: 'Collecter 10 millions de pucks au total.', icon: 'gem', value: (s) => s.totalPucks, target: 10_000_000, reward: 100_000, format: 'pucks', goal: (s) => s.totalPucks >= 10_000_000 },
  { id: 'faceoff-10', name: 'Gagnant de mise au jeu', description: 'Remporter 25 engagements.', icon: 'swords', value: (s) => s.stats?.faceoffWins || 0, target: 25, reward: 75_000, goal: (s) => (s.stats?.faceoffWins || 0) >= 25 },
  { id: 'ultra', name: 'La tribune répond', description: 'Activer 3 blocs Ultras différents.', icon: 'megaphone', value: (s) => Object.keys(s.ultras).length, target: 3, reward: 150_000, goal: (s) => Object.keys(s.ultras).length >= 3 },
  { id: 'standing-crowd', name: 'Tous debout !', description: 'Avoir Le Chœur Zénith et La Muraille d’Aurore actifs en même temps.', icon: 'party-popper', value: (s) => Number(s.boosts?.singing > Date.now()) + Number(s.boosts?.['parterre-nord-standing'] > Date.now()), target: 2, reward: 500_000, goal: (s) => Number(s.boosts?.singing > Date.now()) + Number(s.boosts?.['parterre-nord-standing'] > Date.now()) >= 2 },
  { id: 'full-roster', name: 'Le vestiaire complet', description: 'Recruter tout l’effectif de la saison 1.', icon: 'shield-check', value: (s) => Object.keys(s.players).length, target: PLAYERS.length, reward: 1_000_000, goal: (s) => Object.keys(s.players).length >= PLAYERS.length },
  { id: 'billion', name: 'Ligue des milliards', description: 'Collecter 1 milliard de pucks au total.', icon: 'trophy', value: (s) => s.totalPucks, target: 1_000_000_000, reward: 2_000_000, format: 'pucks', goal: (s) => s.totalPucks >= 1_000_000_000 },
  { id: 'click-2500', name: 'Marathon Prisme', description: 'Cliquer 2 500 fois sur le logo Prisme.', icon: 'mouse-pointer-click', value: (s) => s.clicks, target: 2_500, reward: 100_000, goal: (s) => s.clicks >= 2_500 },
  { id: 'pps-1000', name: 'Usine de Virevolt', description: 'Atteindre 1 000 pucks/s de production passive.', icon: 'zap', value: (s) => s.baseProduction ?? s.pps, target: 1_000, reward: 250_000, format: 'production', goal: (s) => (s.baseProduction ?? s.pps) >= 1_000 },
  { id: 'season-seven', name: 'Série de sept', description: 'Gagner 7 matchs lors d’une saison.', icon: 'trophy', value: (s) => s.season?.wins || 0, target: 7, reward: 300_000, goal: (s) => (s.season?.wins || 0) >= 7 },
  { id: 'faceoff-50', name: 'Œil de lynx', description: 'Remporter 50 engagements.', icon: 'swords', value: (s) => s.stats?.faceoffWins || 0, target: 50, reward: 250_000, goal: (s) => (s.stats?.faceoffWins || 0) >= 50 },
  { id: 'mini-games-25', name: 'Carnet de rink', description: 'Remporter 25 mini-jeux.', icon: 'gamepad-2', value: (s) => s.stats?.miniGamesWon || 0, target: 25, reward: 300_000, goal: (s) => (s.stats?.miniGamesWon || 0) >= 25 },
  { id: 'all-ultras', name: 'Tribune complète', description: 'Mobiliser tous les blocs Ultras.', icon: 'megaphone', value: (s) => Object.keys(s.ultras).length, target: ULTRAS.length, reward: 500_000, goal: (s) => Object.keys(s.ultras).length >= ULTRAS.length },
  { id: 'legend-champion', name: 'Coupe des Aurores', description: 'Gagner le tournoi de la Légende.', icon: 'crown', value: (s) => Boolean(s.legend?.tournament?.champion), target: 1, reward: 1_000_000, goal: (s) => Boolean(s.legend?.tournament?.champion) },
  { id: 'legend-quests', name: 'Dossiers classés', description: 'Réclamer toutes les quêtes de la Légende.', icon: 'scroll-text', value: (s) => (s.legend?.claimedQuests || []).length, target: LEGEND_QUESTS.length, reward: 750_000, goal: (s) => (s.legend?.claimedQuests || []).length >= LEGEND_QUESTS.length },
  { id: 'legend-upgrades', name: 'Héritage complet', description: 'Acheter tous les améliorations permanentes de la Légende.', icon: 'crown', value: (s) => Object.keys(s.legend?.upgrades || {}).length, target: LEGEND_UPGRADES.length, reward: 1_000_000, goal: (s) => Object.keys(s.legend?.upgrades || {}).length >= LEGEND_UPGRADES.length },
  { id: 'ten-billion', name: 'Au-delà des milliards', description: 'Collecter 10 milliards de pucks au total.', icon: 'gem', value: (s) => s.totalPucks, target: 10_000_000_000, reward: 5_000_000, format: 'pucks', goal: (s) => s.totalPucks >= 10_000_000_000 },
  { id: 'trillion', name: 'La légende de Virevolt', description: 'Collecter 1 000 milliards de pucks au total.', icon: 'crown', value: (s) => s.totalPucks, target: 1_000_000_000_000, reward: 50_000_000, format: 'pucks', goal: (s) => s.totalPucks >= 1_000_000_000_000 },
]

export const TEAM_TABS = [
  { id: 'all', label: 'Tous' },
  { id: 'Attaquant', label: 'Attaquants' },
  { id: 'Défenseur', label: 'Défenseurs' },
  { id: 'Gardien', label: 'Gardiens' },
]

export function getUpgradeCost(item, owned = 0) {
  return Math.ceil(item.baseCost * item.scale ** owned)
}

export const rankByTotal = (total) => {
  if (total >= 1e12) return { label: 'Légende de Virevolt', short: 'LDV' }
  if (total >= 1e10) return { label: 'Ligue des trillions', short: 'LTR' }
  if (total >= 1e9) return { label: 'Ligue des milliards', short: 'LMB' }
  if (total >= 1e8) return { label: 'Challenger des Aurores', short: 'CDA' }
  if (total >= 1e7) return { label: 'Maître de la Baie', short: 'MDB' }
  if (total >= 1e6) return { label: 'Champion Prisme', short: 'CHP' }
  if (total >= 1e5) return { label: 'Équipe de la Ligue', short: 'EDL' }
  if (total >= 1e4) return { label: 'Escouade Orbitale', short: 'EO' }
  if (total >= 1e3) return { label: 'Hockey junior', short: 'HJ' }
  if (total >= 1e2) return { label: 'Rookie', short: 'RCK' }
  return { label: 'Échauffement', short: 'ECH' }
}

# Provenance des assets

| Élément | Source | État |
|---|---|---|
| `public/assets/virevolt-prisme.svg` | Logo abstrait créé pour Puck Virevolt | Premier parti |
| Portraits de joueurs | Illustration CSS générée par `PlayerPortrait` dans `src/App.jsx` | Premier parti |
| Chants | Paroles écrites pour ce projet dans `src/App.jsx` | Premier parti |
| Effets sonores | Oscillateurs et bruit générés par Web Audio | Premier parti / Code |
| Musique de menu | Accord et modulation générés par Web Audio | Premiers partis / Code |
| Photos, vidéos, enregistrements de supporters | Aucun | Non utilisé |

Le dossier `public` ne contient que le logo SVG original. Les builds `dist` sont régénérés avec `npm run build` afin de ne pas embarquer d’anciens médias.

# Puck Virevolt · Clicker

Un idle clicker de hockey **entièrement fictif**, développé comme un projet web autonome.

## Lancement

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:5173`.

Pour générer la version de publication :

```bash
npm run build
npm run preview
```

## Univers original

- **Équipe :** Virevolt Hockey Club (VHC)
- **Ligue :** Ligue des Aurores
- **Arène :** Patinoire de la Baie
- **Supporters :** les Veilleurs
- **Chant principal :** *Cap sur l’aurore*
- **Chant de tribune :** *La Muraille d’Aurore*

Les 28 joueurs, les régions, les adversaires, les noms de supporters, les textes, les chants, le logo et les illustrations sont des créations originales de cet univers. Les portraits sont générés en CSS : aucune photo réelle n’est embarquée.

## Fonctionnalités

- Clic sur le logo Prisme pour marquer des pucks.
- Production passive avec l’effectif fictif de Virevolt.
- Recrutement, entraînement, production et indice de puissance.
- Ultra blocks temporaires : Tribune des Braises, Chœur Zénith, Tifo Prisme, Héritage des Ailes et Muraille d’Aurore.
- Chants originaux avec paroles affichées et lecture vocale optionnelle par le navigateur.
- Ambiances de foule, Corne d’Éclat et musique de menu synthétisées par Web Audio.
- Mini-jeux : mise au jeu, tir de puissance, tirs de pénalité et rally 3 contre 2.
- Saison, tournois, quêtes, succès, bonus permanents et sauvegarde locale.
- Export/import JSON de la sauvegarde.
- Responsive desktop et mobile, sans backend.

## Assets et licences

Le projet ne dépend d’aucune image, vidéo, police distante, chanson ou recording de supporters. Le seul asset visuel embarqué est `public/assets/virevolt-prisme.svg`, créé pour ce projet. Les effets sonores sont générés par le code et la synthèse vocale est une fonction du navigateur.

Les dépendances npm React, React DOM, Vite et Lucide restent sous leurs licences open source respectives. Le code et les contenus originaux de Puck Virevolt sont destinés à être publiés sous licence libre après vérification du nom choisi et des règles de la plateforme de diffusion.

> « Libre de droit » ne peut pas être garanti universellement sans recherche de marque et revue juridique. Avant une commercialisation, fais une recherche de marque sur le nom, le logo et les textes, puis publie les fichiers sources et les notices de licence.

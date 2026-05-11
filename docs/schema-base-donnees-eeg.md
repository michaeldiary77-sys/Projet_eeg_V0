# Schéma de base de données (SIH EEG) — proposition de base

Ce schéma est dérivé des entités actuellement présentes côté front (types TypeScript + données mock) :

- `types/eeg/planning.ts` → `RendezVousEEG` (planning RDV)
- `components/eeg/worklist/WorklistTable.tsx` → `DemandeEEG` (worklist)
- `types/eeg/notification.ts` → `Notification` (notifications)
- `components/eeg/dashboard/*` → “alertes” et “activités” (dashboard)

> Remarque : le projet ne montre pas de backend/ORM. Ce fichier propose donc un **schéma relationnel minimal** cohérent avec les données existantes, prêt à être implémenté côté API/DB.

---

## ERD (diagramme entités-relations)

```mermaid
erDiagram
  PATIENT ||--o{ EEG_RDV : "a des"
  PATIENT ||--o{ EEG_DEMANDE : "a des"
  EEG_DEMANDE }o--|| UTILISATEUR : "prescripteur"
  EEG_RDV }o--|| UTILISATEUR : "prescripteur"
  EEG_RDV ||--o{ EEG_NOTIFICATION : "déclenche"
  PATIENT ||--o{ EEG_NOTIFICATION : "concerne (optionnel)"
  EEG_NOTIFICATION ||--o{ EEG_NOTIFICATION_ACTION : "a des"
  UTILISATEUR ||--o{ EEG_NOTIFICATION : "assignée à (optionnel)"
  UTILISATEUR ||--o{ EEG_ACTIVITE : "effectue"
  PATIENT ||--o{ EEG_ACTIVITE : "concerne (optionnel)"

  PATIENT {
    uuid id PK
    varchar nom
    varchar prenom
    int age
    char sexe
    varchar id_dossier UNIQUE
  }

  UTILISATEUR {
    uuid id PK
    varchar nom
    varchar role
  }

  EEG_DEMANDE {
    uuid id PK
    uuid patient_id FK
    uuid prescripteur_id FK
    varchar priorite  "STAT|URGENTE|NORMALE"
    varchar type_eeg
    varchar statut    "EN_ATTENTE|EN_COURS|REALISEE|ANNULEE|ACK_RECU"
    timestamptz created_at
  }

  EEG_RDV {
    uuid id PK
    uuid patient_id FK
    uuid prescripteur_id FK
    varchar type_eeg
    varchar salle
    varchar priorite  "STAT|URGENTE|NORMALE"
    varchar statut    "EN_ATTENTE|EN_COURS|TERMINE|ANNULE"
    date date_rdv
    time heure_debut
    time heure_fin
    int dure_minutes
    text renseignement_clinique
    timestamptz created_at
  }

  EEG_NOTIFICATION {
    uuid id PK
    varchar niveau  "STAT|URGENTE|NORMALE|EN_ATTENTE"
    varchar type    "ALERTE_CRITIQUE|ALERTE_URGENTE|RAPPORT|SYSTEME"
    varchar titre
    text message
    uuid patient_id FK "nullable"
    varchar patient_texte
    timestamptz horodatage
    boolean lu
    uuid assignee_user_id FK "nullable"
    uuid rdv_id FK "nullable"
  }

  EEG_NOTIFICATION_ACTION {
    uuid id PK
    uuid notification_id FK
    varchar label
    varchar style "primary|secondary"
    int ordre
  }

  EEG_ACTIVITE {
    uuid id PK
    timestamptz ts
    varchar type "Validation|Nouvel Examen|Système|Archive"
    text description
    uuid user_id FK "nullable"
    uuid patient_id FK "nullable"
  }
```

---

## Tables (détail minimal)

### 1) `patient`

- **Objectif** : représenter le patient référencé dans le planning/worklist/notifications.
- **Champs** :
  - `id` (UUID, PK)
  - `nom` (VARCHAR)
  - `prenom` (VARCHAR)
  - `age` (INT) — présent dans les mocks planning
  - `sexe` (CHAR(1) : `M|F`)
  - `id_dossier` (VARCHAR, UNIQUE) — correspond à `patient.idDossier`

### 2) `utilisateur`

- **Objectif** : prescripteurs / techniciens / médecins (vu dans la topbar et la worklist).
- **Champs** :
  - `id` (UUID, PK)
  - `nom` (VARCHAR)
  - `role` (VARCHAR)

### 3) `eeg_rdv` (planning)

- **Dérivé de** `RendezVousEEG` (`types/eeg/planning.ts`)
- **Champs** :
  - `id` (UUID, PK)
  - `patient_id` (UUID, FK → `patient.id`)
  - `prescripteur_id` (UUID, FK → `utilisateur.id`)
  - `type_eeg` (VARCHAR) — enum applicatif possible
  - `salle` (VARCHAR)
  - `priorite` (VARCHAR : `STAT|URGENTE|NORMALE`)
  - `statut` (VARCHAR : `EN_ATTENTE|EN_COURS|TERMINE|ANNULE`)
  - `date_rdv` (DATE) — ancrage calendaire
  - `heure_debut` (TIME)
  - `heure_fin` (TIME)
  - `dure_minutes` (INT)
  - `renseignement_clinique` (TEXT, nullable)
  - `created_at` (TIMESTAMPTZ)

### 4) `eeg_demande` (worklist)

- **Dérivé de** `DemandeEEG` (`components/eeg/worklist/WorklistTable.tsx`)
- **Champs** :
  - `id` (UUID, PK)
  - `patient_id` (UUID, FK → `patient.id`)
  - `prescripteur_id` (UUID, FK → `utilisateur.id`)
  - `priorite` (VARCHAR : `STAT|URGENTE|NORMALE`)
  - `type_eeg` (VARCHAR)
  - `statut` (VARCHAR : `EN_ATTENTE|EN_COURS|REALISEE|ANNULEE|ACK_RECU`)
  - `created_at` (TIMESTAMPTZ)

### 5) `eeg_notification` + `eeg_notification_action`

- **Dérivé de** `Notification` (`types/eeg/notification.ts`)
- **Champs notification** :
  - `id` (UUID, PK)
  - `niveau` (VARCHAR : `STAT|URGENTE|NORMALE|EN_ATTENTE`)
  - `type` (VARCHAR : `ALERTE_CRITIQUE|ALERTE_URGENTE|RAPPORT|SYSTEME`)
  - `titre` (VARCHAR)
  - `message` (TEXT)
  - `patient_id` (UUID, FK nullable → `patient.id`)
  - `patient_texte` (VARCHAR, nullable) — utile si notification non liée à un patient structuré
  - `horodatage` (TIMESTAMPTZ) — stocker un timestamp réel
  - `lu` (BOOLEAN)
  - `assignee_user_id` (UUID, FK nullable → `utilisateur.id`)
  - `rdv_id` (UUID, FK nullable → `eeg_rdv.id`)
- **Champs actions** :
  - `id` (UUID, PK)
  - `notification_id` (UUID, FK → `eeg_notification.id`)
  - `label` (VARCHAR)
  - `style` (VARCHAR : `primary|secondary`)
  - `ordre` (INT) — ordre d’affichage

### 6) `eeg_activite` (timeline dashboard)

- **Dérivé de** `DernieresActivites` (`components/eeg/dashboard/DernieresActivites.tsx`)
- **Champs** :
  - `id` (UUID, PK)
  - `ts` (TIMESTAMPTZ)
  - `type` (VARCHAR : `Validation|Nouvel Examen|Système|Archive`)
  - `description` (TEXT)
  - `user_id` (UUID, FK nullable → `utilisateur.id`)
  - `patient_id` (UUID, FK nullable → `patient.id`)

---

## Notes de modélisation (basées sur le code existant)

- **Horodatage notifications** : le type front actuel utilise `horodatage: string` (ex: “Il y a 2 minutes”). En base, stocke un **timestamp** et laisse le front générer le texte relatif.
- **Patient dans notifications** : le front autorise un `patient?: string`. D’où le choix **`patient_id` nullable** + **`patient_texte`**.
- **Enum vs VARCHAR** : côté DB on peut mettre `VARCHAR` avec contraintes (CHECK) ou de vrais `ENUM` selon le SGBD.


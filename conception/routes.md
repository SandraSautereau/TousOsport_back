| | Sprint | Verbe | | Route | Description|
|-------|-------|---|----|-------|------------|
|**CATEGORIES**|
|ok| Sprint 1 | GET |visiteur |/categories | renvoie toutes les categories |
|ok| Sprint 1 | GET |visiteur| /categories/:catId | renvoie un category par id |
|**SESSIONS**|
|ok| Sprint 1 | GET |visiteur| /categories/:catId/sessions | renvoie la liste de tous les sessions d'une catégorie |
|ok| Sprint 1 | GET |user| /categories/:catId/sessions/:sessId | renvoie le détail d'une session d'une catégorie |
|| Sprint 2 | GET | user |/sports/:sportId/session | renvoie le détail de toutes les sessions d'un sport dans toutes les villes |
|| Sprint 2 | GET | visiteur |/categories/:sportId/sports/:sessId/session | renvoie toutes les sessions d'un sport d'une catégorie dans toutes les villes |
|**REGISTER**|
|ok| Sprint 2 | GET |visiteur |/register |renvoie la page register |
|ok| Sprint 2 | POST |visiteur |/register | enregistre l'utilisateur dans la base de données |
|**LOGIN**|
|ok | Sprint 2 | GET |visiteur |/login | renvoie la page login |
|ok | Sprint 2 | POST |visiteur |/login | connecte l'utilisateur au site |
|**TOKEN ACCESS**|
|ok | Sprint 2 | GET |possédant un token |/tokenaccess |authentification par token |
|**PROFILE USER**|
|ok| Sprint 2 | GET | user/:id |/profile/user/:userId | affiche le profil du user |
|ok| Sprint 2 | PATCH |user/:id |/profile/user/:userId |  modification du profil (user / coach / admin) |
|ok| Sprint 2 | DELETE |admin et user/:id |/profile/user/:userId | supprime le profil |
|**COACH**|
|ok| Sprint 2 | GET | coach:id |/profile/coach/:coachId | affiche le profil du coach |
|ok| Sprint 2 | PACTH |coach:id |/profile/coach/:coachId | modifie le profil du coach |
|ok| Sprint 2 | DELETE | coach:id / admin |/profile/coach/:coachId | supprime le profil du coach |
|**ADMIN**|
|ok| Sprint 2 | GET |admin |/admin | connecte l'admin à la page admin du site |
|**SESSIONS PAR COACH**|
|ok| Sprint 2 | GET | coach/:id|/profile/coach/:coachId/session | affiche toutes les sessions d'un coach |
|ok| Sprint 2 | GET | coach/:id|/profile/coach/:coachId/session/:sessId | affiche une session au coach |
|ok| Sprint 2 | POST | coach/:id |/profile/coach/:coachId/session | permet au coach de créer une séance|
|ok| Sprint 2 | PATCH | coach/:id |/profile/coach/:coachId/session/:sessId | permet au coach de modifier une séance |
|ok| Sprint 2 | DELETE | coach/:id  / admin|/profile/coach/:coachId/session/:sessId | permet au coach de supprime une séance |

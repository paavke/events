# Eventure — Change Log

## 2025-05-27 — Phase B: Bug fixes & API wiring

### Backend
| File | Change |
|------|--------|
| `EventRepository.java` | Fixed past-events query: `user.id` → `userId` |
| `UserService.java` | Wired `PasswordEncoder`; hash passwords on create |
| `UserController.java` | Configurable service URLs; fixed past-tasks path |
| `ServiceUrlsProperties.java` | **Created** — event/task service URL config |
| `SecurityConfig.java` (×4) | Use Spring Boot JWT auto-config; require auth for APIs |
| `application.yml` (×4) | Security logging `DEBUG` → `INFO` |

### Frontend
| File | Change |
|------|--------|
| All API pages (9 files) | Use `apiClient` + `apimanUrl()` |
| `LoginPage.jsx` | Store `userId` from JWT `sub`; use `authBaseURL` |
| `NavBar.jsx` | Clear `refreshToken`; hide links when no userId |
| `EventsDetailsPage.jsx` | Fix delete redirect; show `userId` for participants |
| `ProfileManagement.jsx` | Fix password payload; use past-events/past-tasks APIs |
| `TaskListPage.jsx` | Scope tasks to current user |

### Still pending
- Docker restructure (port fixes, infra split)
- Token refresh flow
- Dependency upgrades (Keycloak, Mongo, Node)

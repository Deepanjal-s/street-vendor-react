# Frontend structure + naming

## Naming conventions
- Components: `PascalCase.jsx` (e.g. `OrderCard.jsx`)
- Pages (route-level): `PascalCase.jsx` under `src/pages/` (temporary) or `src/features/**/pages/`
- Hooks: `useSomething.js`
- Utilities: `camelCase.js`
- Constants: `SCREAMING_SNAKE_CASE.js`

## Target folder structure (incremental migration)
We will migrate from `pages/ + components/ + services/` into:

```
src/
  app/
    App.jsx                 # router + layout shell
  components/
    ui/                     # reusable UI building blocks
  features/
    auth/
    customer/
      pages/
      components/
    vendor/
      pages/
      components/
    delivery/
      pages/
      components/
    checkout/
      components/
      pages/
  lib/
    api/                    # API client + auth header handling
```

## Migration rule (to avoid breaking)
- Copy files into the new location
- Update imports to point to new paths
- Delete old files only after the app runs


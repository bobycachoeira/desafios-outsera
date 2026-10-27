# Desafio 2 — Testes End-to-End (E2E)

Automação E2E com **Playwright + Cucumber**, aplicando boas práticas como **Page Object Pattern**.

## Estrutura

```
desafio-2-e2e/
├── features/       # cenários Gherkin
├── steps/          # step definitions
├── support/        # hooks e world do Cucumber
├── pages/          # Page Objects
├── tests/
│   ├── login/      # fluxos de login
│   └── checkout/   # fluxos de checkout
├── results/        # relatórios e evidências
├── playwright.config.ts
└── package.json
```

## Como executar

```bash
npm install
npx playwright install
cp .env.example .env
npm run test:e2e
npm run test:cucumber
```

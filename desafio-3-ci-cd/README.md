# Desafio 3 — Integração e CI/CD

Pipeline de CI/CD no GitHub Actions para executar automaticamente os testes dos desafios 1, 2 e 4.

## Estrutura

Os workflows ficam na raiz do repositório, pois o GitHub Actions só lê `.github/workflows/`:

```
.github/workflows/
├── api-tests.yml   # desafio-1-api (Jest + Supertest)
├── e2e-tests.yml   # desafio-2-e2e (Playwright + Cucumber)
└── k6-load.yml     # desafio-4-k6 (k6)
```

Cada workflow usa `working-directory` apontando para a pasta do projeto correspondente.

## Gatilhos

- `push` na `main` e `pull_request`: executa apenas quando arquivos do projeto mudam (`paths`).
- `workflow_dispatch`: execução manual.
- `k6-load.yml`: por padrão roda `smoke`; o perfil `challenge` (500 VUs por 5 min) deve ser
  escolhido manualmente para não impactar todo commit.

## Relatórios

Os relatórios são publicados como artifacts de cada execução:

- API: `api-report`
- E2E: `e2e-report`
- k6: `k6-report-<perfil>`

## Pré-requisitos

- `package-lock.json` nos projetos 1 e 2 (usados pelo `npm ci`).
- Testes implementados nos desafios 1 e 2.
- Para E2E, uma aplicação acessível via `BASE_URL` ou variável configurada no repositório.

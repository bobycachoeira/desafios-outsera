# Desafio 3 — Integração e CI/CD

Pipeline de CI/CD no GitHub Actions para executar automaticamente os testes dos desafios 1, 2 e 4.

## Estrutura

Os workflows ficam na raiz do repositório, pois o GitHub Actions só lê `.github/workflows/`:

```
.github/workflows/
├── api-tests.yml   # desafio-1-api (Jest + Supertest)
├── e2e-tests.yml   # desafio-2-e2e (Playwright + Cucumber)
├── k6-load.yml     # desafio-4-k6 (k6)
└── all-tests.yml   # execução manual dos três workflows
```

Cada workflow usa `working-directory` apontando para a pasta do projeto correspondente.

## Gatilhos

- `push` na `main` e `pull_request` para a `main`: executa apenas quando arquivos do projeto mudam (`paths`).
- `workflow_dispatch`: execução manual.
- `all-tests.yml`: execução manual que chama API, E2E e k6 de uma vez.
- `k6-load.yml`: por padrão roda `ci` (15 VUs por 30s); `smoke`, `load` e `challenge` (500 VUs
  por 5 min) podem ser escolhidos manualmente para não impactar todo commit.

## Relatórios

Os relatórios são publicados como artifacts de cada execução:

- API: `api-report`
- E2E: `e2e-report`
- k6: `k6-report-<perfil>`

## k6 e Grafana

O k6 roda no CI sem a flag `--influx`. O runner do GitHub não tem acesso ao Grafana/InfluxDB
local (`localhost:3000` e `localhost:8086`), então o pipeline não envia métricas para nenhum
Grafana. A observabilidade com Grafana é uma stack local, usada apenas durante a execução na
máquina de desenvolvimento. No CI, a evidência fica nos arquivos publicados como artifact.

## Pré-requisitos

- `package-lock.json` nos projetos 1 e 2 (usados pelo `npm ci`).
- Testes implementados nos desafios 1 e 2.
- Para E2E, acesso ao Automation Exercise (ou `AUTOMATION_BASE_URL` configurada no repositório).

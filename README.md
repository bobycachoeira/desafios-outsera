# Desafios Outsera — Automação de Testes

Estrutura inicial dos projetos do desafio de automação de testes da Outsera.

## Projetos

| Pasta | Desafio | Stack |
| --- | --- | --- |
| `desafio-1-api` | Testes automatizados de API (GET, POST, PUT, DELETE) | Jest + Supertest |
| `desafio-2-e2e` | Testes End-to-End (login, navegação e checkout) | Playwright + Cucumber |
| `desafio-3-ci-cd` | Pipeline de CI/CD | GitHub Actions |
| `desafio-4-k6` | Testes de carga (500 usuários por 5 min) | k6 |

> Desafio 5 (mobile) não será realizado.

## CI/CD

Os workflows do GitHub Actions ficam na raiz para executar cada projeto conforme os arquivos
alterados:

```
.github/workflows/
├── api-tests.yml
├── e2e-tests.yml
├── k6-load.yml
└── all-tests.yml
```

O `all-tests.yml` permite executar os três workflows manualmente de uma vez.
O k6 roda `ci` (15 VUs por 30s) em push/PR e permite escolher `smoke`, `load` ou `challenge` na
execução manual. Os relatórios são publicados como artifacts de cada workflow. O pipeline do k6
não envia métricas para o Grafana: a stack `docker compose` é local e não existe no runner do
GitHub.

## Como usar

Cada projeto possui seu próprio `README.md` com instruções de instalação e execução.

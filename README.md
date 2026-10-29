# Desafios Outsera — Automação de Testes

Projetos do desafio de automação de testes da Outsera, com testes de API, E2E, pipeline de CI/CD
e testes de carga.

## Projetos

| Pasta | Desafio | Stack |
| --- | --- | --- |
| [`desafio-1-api`](desafio-1-api/README.md) | Testes automatizados de API (GET, POST, PUT, DELETE) | Jest + Supertest |
| [`desafio-2-e2e`](desafio-2-e2e/README.md) | Testes End-to-End (login, navegação e checkout) | Playwright + Cucumber |
| [`desafio-3-ci-cd`](desafio-3-ci-cd/README.md) | Pipeline de CI/CD | GitHub Actions |
| [`desafio-4-k6`](desafio-4-k6/README.md) | Testes de carga (500 usuários por 5 min) | k6 |

## CI/CD

Os workflows do GitHub Actions ficam na raiz para executar cada projeto conforme os arquivos
alterados:

```text
.github/workflows/
├── api-tests.yml
├── e2e-tests.yml
├── k6-load.yml
└── all-tests.yml
```

O `all-tests.yml` permite executar os três workflows manualmente de uma vez.

API, E2E e k6 rodam em push na `main` e pull request para a `main`, respeitando o filtro `paths`.
O k6 usa o perfil `ci` (15 VUs por 30s) no automático e permite escolher `smoke`, `ci`, `load` ou
`challenge` na execução manual. Os relatórios são publicados como artifacts de cada workflow.

O pipeline do k6 não envia métricas para o Grafana: a stack `docker compose` é local e não existe
no runner do GitHub.

## Como usar

Cada projeto possui seu próprio `README.md` com instruções de instalação e execução. A descrição
detalhada dos workflows está em [`desafio-3-ci-cd/README.md`](desafio-3-ci-cd/README.md).

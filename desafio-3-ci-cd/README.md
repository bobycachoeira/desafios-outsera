# Desafio 3 — Integração e CI/CD

Pipeline de CI/CD para executar automaticamente os testes de API, E2E e carga a cada commit.

## Estrutura

```
desafio-3-ci-cd/
└── .github/workflows/
    ├── api-tests.yml   # testes de API
    ├── e2e-tests.yml   # testes E2E
    └── k6-load.yml     # teste de carga
```

## Como usar

Copie os workflows para `.github/workflows/` no repositório raiz do projeto no GitHub.
Cada workflow publica os relatórios gerados como artefatos da execução.

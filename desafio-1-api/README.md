# Desafio 1 — Testes Automatizados de API

Automação de testes de API utilizando **Jest + Supertest**, cobrindo métodos HTTP (GET, POST, PUT, DELETE), cenários positivos e negativos.

## Estrutura

```
desafio-1-api/
├── tests/
│   ├── positive/   # cenários válidos
│   ├── negative/   # cenários inválidos (payload, auth, campos)
│   └── fixtures/   # massa de dados
├── helpers/        # client HTTP e utilitários
├── results/        # relatórios gerados
├── jest.config.cjs
└── package.json
```

## Como executar

```bash
npm install
cp .env.example .env
npm test
npm run test:report
```

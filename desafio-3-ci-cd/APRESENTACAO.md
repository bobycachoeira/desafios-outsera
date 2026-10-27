# Roteiro de apresentação — Desafio 3 (CI/CD)

Duração sugerida: 8 a 10 minutos. Versão curta no final.

## Antes de começar

- Deixe o repositório aberto na aba **Actions** do GitHub.
- Tenha um commit ou PR pequeno pronto para demonstrar o gatilho.
- Deixe o PDF do k6 aberto na página de resultados.
- Confirme que o workflow do k6 roda com o perfil `ci` (15 VUs por 30s).
- Se os testes dos desafios 1 e 2 ainda não estiverem implementados, não abra esses workflows
  durante a demo. Mostre a configuração e concentre a execução no k6.

## Slide 1 — Contexto

**Fala:** “O desafio 3 pede integração de testes no pipeline. Em vez de criar outro projeto de
testes, usei as suítes dos desafios 1, 2 e 4. O repositório é único justamente para o pipeline
conseguir executar cada projeto no mesmo lugar.”

**Pontos:**
- Um repositório, três projetos executáveis.
- Pipeline na raiz, que é onde o GitHub Actions procura workflows.
- A pasta `desafio-3-ci-cd` guarda a documentação da integração.

## Slide 2 — Estrutura do repositório

Mostre a árvore:

```text
desafios_outsera/
├── .github/workflows/
│   ├── api-tests.yml
│   ├── e2e-tests.yml
│   └── k6-load.yml
├── desafio-1-api/
├── desafio-2-e2e/
├── desafio-3-ci-cd/
└── desafio-4-k6/
```

**Fala:** “Cada workflow usa `working-directory` para apontar para a pasta do projeto. Assim o
mesmo repositório executa Jest, Playwright e k6 sem duplicar configuração.”

## Slide 3 — Os três workflows

| Workflow | O que executa | Evidência publicada |
|---|---|---|
| `api-tests.yml` | Jest + Supertest | `api-report` |
| `e2e-tests.yml` | Playwright + Cucumber | `e2e-report` |
| `k6-load.yml` | k6 | `k6-report-<perfil>` |

**Fala:** “Os relatórios são publicados como artifacts. Quem revisa o pipeline não precisa rodar
nada localmente para ver o resultado.”

## Slide 4 — Gatilhos e escolha da carga

- `push` na `main` e `pull_request`: executa só quando a pasta do projeto muda.
- `workflow_dispatch`: execução manual.
- k6 no automático: perfil `ci`, com **15 VUs por 30 segundos**.
- k6 manual: `smoke`, `load` ou `challenge` (500 VUs por 5 minutos).

**Fala:** “O `challenge` é o teste do desafio, mas não faz sentido rodar 500 VUs a cada commit
contra uma API pública que não é nossa. Por isso o pipeline usa um perfil leve e o teste completo
fica manual.”

## Slide 5 — Decisões técnicas

- `package-lock.json` nos projetos 1 e 2 para o `npm ci` ser reproduzível.
- `paths` evitam execuções desnecessárias.
- k6 no CI sem `--influx`: o runner não tem o Grafana/InfluxDB local.
- Relatórios versionados no k6; CSV e stream bruto ficam locais por tamanho.
- Nenhum segredo ou `.env` versionado.

**Fala:** “O Grafana é uma ferramenta de análise local. No GitHub, a evidência são os arquivos
publicados pelo próprio workflow.”

## Slide 6 — Demonstração

Opção A, ao vivo:

1. Faça um commit pequeno em uma pasta de projeto.
2. Abra a aba Actions e mostre o workflow correspondente executando.
3. Abra os artifacts gerados.
4. Mostre o `summary.html` do k6.

Opção B, com capturas:

1. Print da lista de workflows.
2. Print de uma execução concluída.
3. Print dos artifacts.
4. Print do relatório k6.

**Fala:** “Aqui está o ciclo completo: alteração, execução, relatório e evidência.”

## Slide 7 — Resultado do k6 (se for apresentar junto)

- 500 VUs por 5 minutos.
- 315.125 requisições, 1.037 req/s.
- 0% de falhas HTTP.
- p95 de 172,9 ms e p99 de 462,1 ms.
- Todos os thresholds atendidos.

**Fala:** “Esse resultado é a evidência de execução. Como o alvo é público, ele mostra o
comportamento observado, não uma certificação de capacidade do backend.”

## Slide 8 — Encerramento

**Fala:** “A entrega do desafio 3 é a integração funcionando: workflows na raiz, execução por
projeto, relatórios como artifacts e uma carga de CI que não sobrecarrega a API pública. O teste
completo de 500 VUs fica disponível para execução manual.”

## Perguntas prováveis

**Por que não rodar o challenge em todo commit?**
Porque são 5 minutos e 500 VUs contra uma API pública. O perfil `ci` valida o pipeline sem gerar
carga relevante. O `challenge` fica para uma execução controlada.

**Por que o Grafana não aparece no GitHub Actions?**
Porque a stack Grafana + InfluxDB roda localmente via Docker Compose. O runner do GitHub não tem
esses serviços em `localhost`. No CI, a evidência são os relatórios publicados como artifacts.

**Por que um repositório único?**
Porque o desafio 3 é sobre integração. Um pipeline na raiz executa os três projetos e mantém a
documentação e as evidências no mesmo lugar.

**O que acontece se os testes de API ou E2E falharem?**
O workflow correspondente falha e o artifact é publicado mesmo assim. Isso é o comportamento
esperado: o pipeline precisa bloquear a entrega quando o teste não passa.

**Como o pipeline lida com mudanças em apenas um projeto?**
Cada workflow tem `paths`. Alterações em `desafio-1-api` não disparam o E2E nem o k6, por exemplo.

## Versão de 3 minutos

1. “Usei um repositório único porque o desafio é de integração.”
2. “Os workflows ficam na raiz e apontam para cada projeto.”
3. “Push/PR roda só o que mudou; o k6 automático usa 15 VUs por 30s.”
4. “O teste de 500 VUs fica manual para não sobrecarregar a API pública.”
5. “Os relatórios saem como artifacts; o Grafana é local e não vai para o CI.”
6. “Resultado do k6: thresholds atendidos, 0% de falhas HTTP e p95 de 172,9 ms.”

## Checklist final

- [ ] Workflows na raiz `.github/workflows/`.
- [ ] `package-lock.json` commitado nos projetos 1 e 2.
- [ ] Ação do GitHub habilitada no repositório.
- [ ] Perfil `ci` validado localmente com `./scripts/check.sh`.
- [ ] Execução manual do k6 testada no GitHub.
- [ ] PDF aprovado antes de commitar.
- [ ] Capturas da execução e dos artifacts separadas para a apresentação.

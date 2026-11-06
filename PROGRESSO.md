# HEMEC — acompanhamento de 05/11/2026

## Estado inicial

- Branch `main`; única alteração prévia: `Frontend/package-lock.json`, preservada.
- React 19, Vite 8, JSX/CSS e rotas no hash. Fontes Montserrat/Inter locais e paleta azul/branco.
- Home/carrossel, login demonstrativo, dashboard, inventário, criação/lista de chamados
  e lista/detalhes de OS já implementados. Não foram recriados.
- Quatro equipamentos fictícios e duas OS de consulta. Chamados existentes usam
  `localStorage` (`hemec-requests-v1`); sessão em memória; nenhuma API configurada.
- Ausentes: ficha/histórico do equipamento, pré-seleção no chamado e detalhes individuais
  do chamado. Atendimentos técnicos também ainda não existem.
- Build inicial aprovado. Não há scripts de lint/teste nem AGENTS.md/SKILL.md no checkout.

## Melhorias concluídas

- Ficha de equipamento com identificação completa, chamados e OS filtrados por ID.
  As duas fontes de histórico têm loading, erro/nova tentativa e vazio independentes.
- Abrir chamado pelo inventário/ficha e Novo chamado global reutilizam o formulário.
  Seleção via URL preservada após login; equipamento inválido pede nova seleção.
- Busca existente reutilizada, com até oito resultados visíveis e manutenção da seleção.
- Confirmação com link para detalhes individuais; navegação entre chamado, ficha e OS.
- Lista de chamados compartilhada e ordenada por data; cabeçalhos ajustados ao contexto.
- Inventário e formulário reutilizam `useEquipment`; retornos inválidos de lista geram erro.
- Validação técnica do serviço reforçada sem mudar o formato local ou regras de negócio.
- Formulário identifica persistência e solicitante demonstrativos, conforme o pedido atual.
  Salvar chamado continua sem criar OS ou alterar equipamentos/OS anteriores.
- Registro de vários atendimentos na OS: técnico, data/hora, setor, serviço, horas/minutos
  e COI/COE. Empresa obrigatória em COE; histórico e total calculados em minutos.
  Reutilizado o mecanismo localStorage em `hemec-attendances-v1`, coleção separada,
  sem API ou alteração de situação da OS/equipamento. Técnico informado manualmente.

## Arquivos

- Novos: `Frontend/src/pages/{EquipmentDetailPage,RequestDetailPage}.jsx`,
  `Frontend/src/components/requests/RequestList.jsx`, `Frontend/src/utils/formatDateTime.js`.
- Também novos: `Frontend/src/components/work-orders/{AttendanceForm,WorkOrderAttendances}.jsx`,
  `Frontend/src/services/attendanceService.js`, `Frontend/src/hooks/useAttendances.js`
  e `Frontend/src/utils/formatWorkedTime.js`.
- Alterados: `Frontend/src/App.jsx`, `components/layout/OperationalLayout.jsx`,
  `pages/{EquipmentPage,NewRequestPage,RequestsPage,WorkOrderPage}.jsx`,
  `hooks/useRequests.js`, `services/requestService.js`, CSS de equipamentos/chamados/OS
  e utilitário acessível em `styles/global.css` (caminhos relativos a `Frontend/src`).
- Documentação: este arquivo, `Frontend/README.md` e `Frontend/src/services/README.md`.
- Dependências, lockfile prévio, protótipo antigo, dados fictícios e home/carrossel preservados.

## Verificação

- Build de produção e `git diff --check` aprovados.
- Chrome headless em perfil temporário isolado, sem alterar dados do navegador do usuário.
- 17 grupos de verificação: home/carrossel; ficha → login → chamado pré-selecionado;
  entrada global; validação de descrição; gravação/confirmação/detalhes/recarga;
  preservação do primeiro chamado, equipamentos e OS ao gravar outro registro;
  históricos isolados; indicadores/filtros; falha de gravação sem perda de campos;
  loading/vazio/erro/recuperação; armazenamento corrompido/incompatível sem sobrescrita;
  IDs inválidos; busca com 50 equipamentos; teclado/menu móvel e ausência de exceções JS.
- Atendimentos: COI/COE, empresa obrigatória, tempo zero/minutos inválidos, estado salvando,
  90 + 45 minutos = 2 h 15 min, vários registros/recarga, isolamento por OS, preservação
  dos chamados/OS/equipamentos e recuperação após falha/corrupção sem sobrescrita.
- Sem transbordamento horizontal em 320, 390, 683, 768, 1366 e 1920 px nas sete rotas
  operacionais verificadas. Capturas de desktop/celular examinadas. Sem teste com leitor
  de tela real; 683 px verifica reflow equivalente à largura de 1366 px em zoom de 200%.
- Script e evidências locais: `C:/Users/Aluno/AppData/Local/Temp/hemec-codex-20261105/`
  (`verify.mjs`, `resultados.json`, capturas PNG). A automação não é dependência do projeto.

## Limites, pendências e próximas três prioridades

1. Alinhar contrato de equipamentos/chamados/OS e sessão com o backend; não há endpoint
   confirmado ou sincronização. Login, inventário e OS continuam demonstrativos; chamados
   são compartilhados pelas sessões desta origem no mesmo navegador.
2. Validar com o hospital prioridade de chamados, vínculo chamado → OS e condições de
   encerramento/liberação. Essas decisões de negócio não foram presumidas.
3. Definir autenticação e permissões reais com a equipe antes de disponibilizar gravações
   compartilhadas. Os testes atuais cobrem demonstração local, sem servidor ou leitor de tela real.

Nenhum bloqueio técnico para a demonstração entregue. Prioridade do chamado continua
pendente de valores/regras confirmados; OS mantém sua prioridade existente. Não houve
exclusão, commit, push, deploy, alteração de banco ou modificação em serviços externos.

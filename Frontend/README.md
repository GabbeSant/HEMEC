# HEMEC · Frontend

## Revisão visual da dashboard · 23/10/2026

Revisão aplicada sobre a dashboard existente, preservando as alterações locais.
Título, ações e busca agora compartilham uma superfície branca com borda azul;
os indicadores continuam em uma faixa compacta, com números maiores e atalhos
em toda a área. Requer atenção é o bloco principal, com cabeçalho azul forte e
contagem total das OS de prioridade alta pendentes; a lista mantém até três itens.
Identificação da OS, equipamento, problema, prioridade e situação têm pesos distintos.
A sidebar usa seleção azul sólida, e o fundo azul-claro separa melhor as superfícies.

Estilos adicionais ficam restritos ao layout operacional e à dashboard. Fontes
locais, home/carrossel, regras dos indicadores, rotas e serviços foram preservados.
Equipamentos, OS e login continuam locais; chamados continuam no localStorage.
Nenhum gráfico, pacote, endpoint ou regra hospitalar foi acrescentado.

Para conferir: executar `npm.cmd run dev`, abrir `#/dashboard` e testar busca,
indicadores, Ver todas, abertura de OS e Menu no celular. Build aprovado e
verificação no Chrome headless em 320, 390, 683, 768, 992, 1366 e 1920 px, sem
rolagem horizontal. Conferidos teclado, foco, sessão, filtros, recarga da OS,
atualização, atividade recente, carregamento, falhas independentes, recuperação e
vazios. Contrastes de texto medidos acima de 4,5:1. Dados de teste ficaram apenas
em um perfil temporário do Chrome, sem alterar os registros do navegador do usuário.
Não houve teste com leitor de tela real. Nenhum commit, push ou deploy foi realizado.

## Retomar em outra sessão · 23/10/2026

O código da dashboard está salvo no commit `02edab7`
(`feat(frontend): implementa dashboard operacional e integra equipamentos, chamados e OS`).
Ao solicitar o salvamento para trocar de sessão, o usuário já havia registrado esse
commit; o diretório de trabalho estava limpo. Esta nota é um registro posterior de
retomada. Não iniciar novas funcionalidades apenas com base nas etapas históricas abaixo.

### Antes de continuar

1. Ler integralmente `AGENTS.md`, `Skill.md` e esta seção; conferir o Git e os arquivos
   reais. As instruções e preferências explícitas do usuário nesta sessão prevalecem.
2. Trabalhar em `HEMEC/Frontend`, preservando os protótipos como referência. React,
   Vite, JSX, CSS, fontes locais e tokens existentes permanecem como base.
3. A dashboard e as seis etapas estão concluídas para avaliação do usuário. O usuário
   autorizou finalizar as propostas de uma vez; não reiniciar etapas ou solicitar
   validação dos blocos já entregues. A próxima tarefa depende do pedido que ele trouxer.
4. Preservar a home/carrossel e as telas existentes. O usuário pediu remover os avisos
   de demonstração da interface: não reintroduzi-los. Os limites técnicos continuam
   documentados aqui; a remoção dos textos não implementou autenticação ou backend.
5. Não fazer push, deploy ou novas alterações externas sem solicitação. O marco do
   `AGENTS.md` é 23/10/2026; após essa data, confirmar o próximo objetivo antes de
   reutilizar prazos. A prioridade atual é a avaliação da interface pelo usuário.

### Estado funcional preservado

- `#/dashboard`: quatro indicadores, busca, Novo chamado, Atualizar dados,
  OS prioritárias com abertura e atividade recente dos chamados registrados.
- Indicadores: Chamados abertos, OS em atendimento, OS de prioridade alta e
  Equipamentos indisponíveis. Todos abrem listas filtradas. Não voltar ao rótulo
  OS críticas nem equiparar prioridade à criticidade hospitalar.
- `#/equipamentos`: integrado ao layout operacional e ao menu móvel; busca e
  situação ficam na URL, com filtros combinados e limpeza sem perda de foco.
- `#/chamados/novo` e `#/chamados`: registro local com solicitante da sessão,
  confirmação, leitura, filtros, validações e preservação dos campos em falhas.
- `#/ordens-servico` e `#/os/OS-0042` / `#/os/OS-0041`: lista, filtros e detalhes
  somente para consulta. Datas e setores de abertura não são reescritos pelo inventário.
- Chamado e OS continuam separados. Registrar chamado não cria/encerra OS nem
  altera equipamento. Não há atendimentos ou regras de encerramento implementadas.

### Limites e dados

Login, equipamentos e OS usam serviços locais, sem API/autenticação real. A sessão
fica na memória e some ao atualizar. Chamados usam a chave `hemec-requests-v1` no
localStorage desta origem/navegador; não estão dentro do Git nem são transportados
para outro navegador por um commit. Não limpar esses dados para testar sem preservar
o conteúdo original. Os testes anteriores restauraram o armazenamento ao terminar.
Critérios hospitalares, permissões, sincronização e contrato com o backend ainda
precisam de definição; não presumir endpoints ou regras novas.

### Executar e conferir

Na pasta `HEMEC/Frontend`, usar `npm.cmd run dev` no PowerShell. Para produção,
`npm.cmd run build`. Scripts de lint/testes não estão configurados no package.json.
Último build aprovado. As verificações no Chrome headless cobriram navegação,
persistência, filtros/recarga, teclado, menu móvel, erros, vazios, atualização e
responsividade (320 a 1920 px e reflow equivalente a 200%). Os detalhes ficam na
seção Dashboard finalizada para avaliação. Não há testes permanentes no repositório;
scripts e capturas usados para verificação ficaram no diretório temporário.

## Dashboard finalizada para avaliação · 23/10/2026

O usuário autorizou concluir as propostas em uma entrega completa, sem novas pausas
entre etapas. A dashboard operacional está fechada para avaliação visual e funcional.
Preservados identidade, home, login, inventário, chamados locais e detalhes de OS.

### Composição entregue

- Novo chamado como ação principal; busca do inventário e Atualizar dados no topo.
- Quatro indicadores compactos, derivados dos serviços, com atalhos filtrados.
- Requer atenção com até três OS de prioridade Alta não concluídas, data da abertura,
  equipamento, setor da abertura, problema e situação. Ver todas abre a lista filtrada.
- Atividade recente com até quatro chamados efetivamente registrados, do mais novo
  para o mais antigo. Cada evento abre a lista filtrada pelo ID do chamado. Sem
  registros, há estado vazio; não são criados eventos de atendimento/conclusão.
- Lista completa de OS no menu, com filtros por situação/prioridade/pendência,
  limpeza, recarga da rota e acesso aos detalhes somente para consulta.

### Significado dos indicadores

| Indicador | Contagem | Destino |
| --- | --- | --- |
| Chamados abertos | Situação exatamente Aberto | `#/chamados?situacao=Aberto` |
| OS em atendimento | Situação exatamente Em atendimento | `#/ordens-servico?situacao=Em%20atendimento` |
| OS de prioridade alta | Prioridade Alta e situação diferente de Concluída | `#/ordens-servico?prioridade=Alta&pendentes=1` |
| Equipamentos indisponíveis | Situação exatamente Indisponível | `#/equipamentos?situacao=Indispon%C3%ADvel` |

O rótulo OS críticas foi substituído por OS de prioridade alta, pois não existe
critério hospitalar de criticidade validado. OS em andamento passou a OS em
atendimento para corresponder ao estado disponível. Não foram inventadas regras
de SLA, atraso, encerramento, indisponibilidade ou geração automática de OS.
Os exemplos atuais resultam em 1 OS em atendimento, 2 de prioridade alta pendentes
e 1 equipamento indisponível; a contagem de chamados depende do navegador.

### Dados, atualização e comportamento

`DashboardPage` consulta os hooks de chamados, OS e equipamentos e compartilha os
resultados entre indicadores, prioridades e atividade recente. Uma nova tentativa
da fonte de OS atualiza também o indicador correspondente; a de chamados atualiza
o indicador e a atividade recente. Atualizar dados recarrega as três fontes sem
perder o texto digitado na busca. Falhas parciais mantêm as demais áreas disponíveis,
sem zeros falsos nem dados de outra fonte substituindo a falha. Consultas válidas
vazias exibem zero e estados vazios. Calendário de abertura das OS usa UTC para
não alterar o dia; data/hora de chamados segue a apresentação pt-BR do navegador.

### Validação da entrega final

Build aprovado. No Chrome headless foram conferidos os quatro números, todos os
atalhos, situações/prioridades exatas, lista de OS com e sem filtros, limpeza,
OS individual, recarga, atividade real com limite e ordenação, seleção de chamado
por ID e retorno à lista completa. Conferidos também consulta atrasada, atualização
manual, OS vazias, erros independentes de OS/chamados e nova tentativa compartilhada.
Sem exceções JavaScript ou rolagem horizontal em 1366×768, 1920×1080, 768×1024,
390×844, 320×740 e 683×384. Capturas desktop/mobile revisadas. Dados de teste foram
removidos e o armazenamento original foi restaurado. Verificações anteriores de
teclado, sessão, formulário e persistência estão registradas nas entregas abaixo.

Para avaliar: executar `npm.cmd run dev`, entrar e abrir `#/dashboard`. Selecionar
os quatro indicadores, conferir filtros e atualizar as rotas. Abrir uma OS e
comparar a data com a lista. Registrar um chamado; ao voltar, conferir contagem
e atividade recente. Abrir o evento para localizar aquele chamado. Usar Atualizar
dados e testar Menu no celular. As propostas permanecem disponíveis para a revisão
final do usuário, sem necessidade de aprovar cada bloco antes de visualizá-lo.

Arquivos principais desta finalização: `DashboardPage.jsx/.css`, `DashboardIndicators.jsx`,
`PriorityWorkOrders.jsx`, `RecentActivity.jsx`, `WorkOrderList.jsx`, `WorkOrders.css`,
`WorkOrdersPage.jsx`, `WorkOrderPage.jsx`, `RequestsPage.jsx`, `OperationalLayout.jsx`,
`App.jsx`, `useEquipment.js`, `filterWorkOrders.js`, `formatDateOnly.js` e este README.

Limites mantidos: equipamentos/OS e login ainda usam provedores locais; chamados
ficam no localStorage deste navegador. Não há API, autenticação real, sincronização,
registros técnicos ou encerramento de OS nesta entrega. O contrato com o backend
e as regras hospitalares permanecem pendentes. Nenhum commit, push ou deploy foi feito.

## Indicadores como atalhos · 23/10/2026

Chamados abertos e Equipamentos indisponíveis agora são links para as listas
filtradas. A área clicável inclui o rótulo e o número; o nome acessível é associado
ao valor exibido, com foco visível em toda a área. Carregamento e erro não expõem
links como se houvesse uma contagem válida. Zero válido de chamados também permite
abrir a lista vazia. Os indicadores de OS continuam reservados, sem novos critérios.

- Chamados: `#/chamados?situacao=Aberto`, com identificação do filtro e Limpar filtro.
- Equipamentos: `#/equipamentos?situacao=Indispon%C3%ADvel`, selecionando a situação
  exata Indisponível; Em manutenção permanece separada.

Os parâmetros persistem ao atualizar as listas. Busca e situação do inventário
também se mantêm no endereço ao refinar os filtros, sem tirar o foco do campo ou
recarregar os registros a cada caractere. Limpar filtros remove os parâmetros;
o menu Equipamentos abre o inventário completo. Parâmetros de situação desconhecidos
são ignorados, sem introduzir novos estados no domínio.

Para testar: `npm.cmd run dev`, abrir `#/dashboard` e selecionar cada indicador.
Atualizar a página filtrada, combinar busca/situação e limpar os filtros. Repetir
com Tab/Enter. Em Chamados, usar Limpar filtro para voltar à lista completa.

Verificação: build aprovado; Chrome headless conferiu clique na área do número,
seleção de situação, recarga, busca combinada sem perda de foco, limpeza, navegação
pelo menu, chamados com zero e com registros, teclado e erro sem links enganosos.
Sem exceções JavaScript ou rolagem horizontal em 1366×768, 390×844 e 320×740.
Capturas desktop/mobile revisadas; armazenamento original restaurado após os testes.

Arquivos desta entrega: `DashboardIndicators.jsx`, `DashboardPage.css`, `App.jsx`,
`EquipmentPage.jsx`, `RequestsPage.jsx/.css` e este README. Dados e limitações dos
serviços permanecem como documentados abaixo. Nenhum commit ou push desta entrega.

## Inventário integrado à dashboard · 23/10/2026

Corrigida a separação entre Equipamentos e o restante da área operacional.
`#/equipamentos` agora usa `OperationalLayout`, incluindo sidebar, menu móvel e
controles de sessão, com Equipamentos marcado como página atual. O cabeçalho e
rodapé públicos ficam apenas na área pública; os controles de sessão duplicados
do inventário foram removidos. Há retorno explícito à dashboard e atalho para
Novo chamado, usando o formulário existente sem pré-seleção presumida.

Título, espaçamentos, filtros e lista compacta foram alinhados à dashboard. Os
registros aparecem em uma superfície branca com linhas separadas; no celular,
filtros empilhados e informações técnicas agrupadas. Busca, situações, registros
e serviços existentes foram preservados, incluindo `#/equipamentos?busca=...`.
Nenhum cadastro ou detalhe de equipamento foi acrescentado nesta entrega.

Para testar: `npm.cmd run dev`, entrar, selecionar Equipamentos no menu e voltar
à dashboard. Buscar `infusao` pela dashboard e atualizar o inventário filtrado.
Combinar com Disponível, limpar os filtros e abrir Novo chamado. No celular,
conferir Menu por teclado e a indicação da página atual.

Verificação: build aprovado; Chrome headless conferiu navegação entre dashboard
e inventário, sessão compartilhada sem controles duplicados, página ativa, busca
com acentos, recarga, filtros combinados, limpeza, atalho Novo chamado, menu móvel,
lista vazia e erro com nova tentativa preservando o layout. Sem exceções JavaScript
ou rolagem horizontal em 1366×768, 1920×1080, 768×1024, 390×844, 320×740 e 683×384.
Capturas de desktop e celular revisadas.

Arquivos: `App.jsx`, `OperationalLayout.jsx`, `EquipmentPage.jsx/.css` e este README.
Dados e limitações técnicas permanecem como documentados abaixo. Sem commit ou push.

## Dashboard operacional · etapa 6 concluída · 23/10/2026

Acabamento responsivo e acessibilidade revisados sem alterar fontes, tokens,
regras de dados, armazenamento ou os avisos removidos a pedido do usuário.
No celular (abaixo de 768 px), a navegação fica recolhida em Menu, deixando
Novo chamado e a busca próximos do início do conteúdo. O botão expõe
`aria-expanded`/`aria-controls`; Escape dentro do menu fecha e devolve o foco ao
botão. Selecionar uma rota fecha o menu e mantém o foco inicial no conteúdo.
No desktop, a navegação permanece visível.

Novo chamado ocupa a largura disponível no celular. Links de ação têm área de
interação mínima de 44 px. Textos longos, e-mails e identificações se reorganizam
sem forçar rolagem horizontal. A lista de chamados passa a duas colunas de fatos
até 1100 px. O contorno de foco do conteúdo fica dentro de seus limites.

Descrição inválida é identificada com `aria-invalid` e associada à explicação
por `aria-describedby`, com foco no campo. Erros de gravação recebem foco sem
perder o preenchimento. O formulário informa o estado de salvamento via
`aria-busy` e região de status. Uma gravação que termina após sair do formulário
não redireciona o usuário. A confirmação de salvamento é limpa ao sair da lista,
evitando reapresentar um sucesso antigo. Não foram adicionadas animações; a
preferência de movimento reduzido e o carrossel público foram preservados.

Verificação no Chrome headless:

- Dashboard, lista e abertura de chamados, detalhes de OS e inventário em larguras
  de 320, 390, 576, 768, 992, 1366 e 1920 px; também viewport de 683×384, equivalente
  ao espaço CSS disponível com zoom de 200% em 1366×768. Esse último teste valida
  reflow, sem acionar o controle nativo de zoom do Chrome.
- Sem transbordamento horizontal, inclusive com descrições e e-mails longos.
- Menu por teclado, Escape, Pular para o conteúdo, foco após navegação e rótulos
  associados aos campos. Capturas de desktop, mobile, menu e erros revisadas.
- Descrição com espaços, erro de gravação com preservação dos campos, foco no
  alerta, salvamento pendente, confirmação, resposta tardia após sair da página.
- Carregamento, vazio, erro e recuperação da lista de chamados e da consulta de
  equipamentos do formulário. Serviço alterado somente na memória do navegador
  de teste; armazenamento original restaurado ao terminar.
- Contraste calculado acima de 4,5:1 para texto secundário no fundo de apoio,
  azul de ação sobre branco e prioridade alta sobre branco. Movimento reduzido
  conferido no carrossel. Sem exceções JavaScript. Build de produção aprovado.

Para validar manualmente: executar `npm.cmd run dev`, abrir `#/dashboard` em
desktop e celular, usar Menu com Tab/Enter/Escape, buscar um equipamento, abrir
uma OS, registrar um chamado e conferir sua listagem. No formulário, enviar
somente espaços para conferir mensagem e foco. Conferir também o zoom nativo
de 200% no navegador e, se disponível, navegação com leitor de tela (não testada
com tecnologia assistiva real nesta entrega).

Arquivos desta etapa: `OperationalLayout.jsx/.css`, `DashboardPage.css`,
`WorkOrders.css`, `RequestsPage.css`, `NewRequestPage.jsx`, `App.jsx` e este README.
As seis etapas da dashboard foram entregues, aguardando revisão final do usuário.
Login e serviços de equipamentos/OS continuam simulados; chamados permanecem
somente no armazenamento deste navegador. API, critérios hospitalares de prioridade,
indicadores de OS e integração de atendimentos continuam pendentes. Nenhum commit,
push ou publicação desta entrega.

## Dashboard operacional · etapa 5 concluída · 23/10/2026

A pedido do usuário, avisos de demonstração, dados fictícios e projeto acadêmico
foram removidos da interface (home, login, inventário, dashboard e detalhes de OS).
Os controles Entrar/Sair e a sessão foram preservados. A identificação visual da
sessão passou a Usuário e marcas não fornecidas aparecem como Não informada.
Patrimônios, séries e vínculos dos exemplos foram preservados. Essa alteração de
texto não implementa autenticação real ou integração com o hospital; os dados
de equipamentos e OS continuam sendo os exemplos locais documentados anteriormente.

Buscar equipamento na dashboard envia o termo para `#/equipamentos?busca=...`.
O inventário usa a função existente `filterEquipment`, permite combinar a busca
com situação e preserva o termo recebido na atualização da rota. Busca vazia e
Ver todos abrem o inventário completo. Não há índice, API ou busca paralela fictícia.

O usuário autorizou o registro local de chamados. Novo chamado abre
`#/chamados/novo`, com seleção de equipamento, busca de apoio e problema relatado.
O solicitante vem da sessão; sem sessão, a página oferece Entrar. Registrar chamado
salva pelo `requestService` e abre `#/chamados`, com confirmação e consulta dos
registros. O serviço valida equipamento e descrição; descrição vazia ou composta
apenas por espaços não é aceita. Falha de gravação mantém o formulário preenchido.

O registro preserva patrimônio, nome e setor do equipamento na abertura, solicitante,
data/hora, UUID e referência CH com esse UUID. O estado inicial Aberto pertence
somente a este provedor local: não representa um contrato confirmado com o backend.
O indicador Chamados abertos conta os registros lidos do mesmo serviço. Prioridade
de chamado e transições de estado continuam pendentes de definição; não foram
copiadas da prioridade das OS. Registrar chamado não cria, encerra ou modifica OS,
nem altera a situação operacional de equipamento.

### Limites do armazenamento de chamados

- Chave `hemec-requests-v1` no `localStorage`, com envelope de versão 1.
- Registros permanecem neste navegador/perfil e nesta origem (protocolo, host e porta).
  Outro dispositivo, navegador ou endereço não recebe os mesmos dados.
- Limpar os dados do site ou encerrar uma sessão privada pode apagar os registros.
  Não existe backup, sincronização, controle de concorrência entre abas ou servidor.
- As sessões do mesmo navegador/origem compartilham essa base. O login continua
  simulado, não implementa permissões e desaparece na atualização da página.
- São armazenados e-mail/nome do solicitante e os dados do chamado; a senha não é
  persistida. Utilizar dados fictícios até existir autenticação e contrato de API.
- Leitura corrompida, versão incompatível ou acesso bloqueado geram erro. O serviço
  não substitui silenciosamente registros inválidos por uma lista vazia.
- Nenhum botão de exclusão ou encerramento foi adicionado. Rascunhos não salvos
  ficam no estado do formulário e não persistem ao sair da página.

Para testar: `npm.cmd run dev`; entrar, buscar `infusao` na dashboard e conferir
o inventário filtrado após atualizar. Voltar à dashboard, abrir Novo chamado,
selecionar equipamento, descrever o problema e registrar. Conferir a confirmação
e o item em Chamados; atualizar e conferir sua permanência. Voltar à dashboard
e conferir a contagem, preservando as duas OS anteriores.

Verificação: build aprovado; Chrome headless conferiu login, busca por teclado,
acentos, série, patrimônio, termos combinados, caracteres especiais na URL, recarga
e filtros; ausência dos avisos nas rotas existentes; acesso ao formulário sem sessão,
validações, gravação, identidade do solicitante, texto exibido sem execução HTML,
persistência, contagem e separação de OS; falha de gravação com preservação dos campos,
nova tentativa, dados corrompidos sem sobrescrita e recuperação. Os testes restauraram
o armazenamento original ao terminar. Sem exceções JavaScript. Dashboard e lista de
chamados sem transbordamento em 1366, 390 e 320 px; formulário também conferido em
390 px. Capturas de desktop e celular revisadas.

Arquivos desta entrega: `App.jsx`; `DashboardPage.jsx/.css`; `EquipmentPage.jsx/.css`;
`AuthPage.jsx/.css`; `WorkOrderPage.jsx`; `NewRequestPage.jsx`; `RequestsPage.jsx/.css`;
`AppLayout.jsx`; `OperationalLayout.jsx/.css`; `DashboardIndicators.jsx`;
`PriorityWorkOrders.jsx`; `demoEquipment.js`; `requestService.js`; `useRequests.js`;
este README e `src/services/README.md`.

Etapa 5 concluída. Aguardar validação antes da etapa 6. Nenhum commit ou push
desta entrega. Os registros abaixo descrevem o histórico anterior.

## Dashboard operacional · etapa 4 concluída · 23/10/2026

O usuário autorizou reutilizar as duas OS fictícias do protótipo e criar detalhes
somente para consulta. Os exemplos ficam em `src/data/demoWorkOrders.js`:
`OS-0042` aponta para a bomba `eq-002`/`DEMO-002`, e `OS-0041` para o ventilador
`eq-004`/`DEMO-004`. Nomes fictícios dos solicitantes, problema, prioridade,
situação, setor e data da abertura foram preservados. O setor atual do equipamento
é apresentado separadamente nos detalhes; ele não reescreve o setor da abertura.
As datas são apresentadas em pt-BR sem deslocamento de fuso.

`workOrderService.list()` e `getById(id)` formam um provedor local de leitura,
sem endpoints presumidos ou persistência. O hook `useWorkOrders` compartilha
carregamento, erro, nova tentativa e descarte de respostas após desmontagem.
Não houve importação de componentes, estilos ou armazenamento do protótipo antigo.

`PriorityWorkOrders` exibe identificação, equipamento, problema, setor da abertura,
prioridade em texto e situação. O recorte provisório da demonstração limita a três
registros com prioridade `Alta` e situação diferente de `Concluída`, preservando
a ordem do serviço. Esse recorte não define SLA, criticidade de equipamento ou
regra validada pelo hospital. Os indicadores de OS permanecem reservados; eles
não equiparam prioridade Alta a OS crítica.

Cada identificação abre `#/os/OS-0042` ou `#/os/OS-0041`, com rota preservada ao
atualizar. `WorkOrderPage` mostra dados de abertura, equipamento e problema, sem
formulários, atendimentos, criação de chamado ou encerramento. Como os exemplos
não trazem chamado de origem, a página informa essa ausência sem criar um vínculo.
Uma OS inexistente tem mensagem própria e caminho de retorno à dashboard.

Para conferir: `npm.cmd run dev`, abrir `#/dashboard`, selecionar cada OS em
Requer atenção, comparar seus dados e atualizar a página individual. Conferir
a diferença entre setor da abertura e setor atual. Testar `#/os/OS-INVALID`.
Novo chamado e busca rápida permanecem como estavam, para a próxima etapa.

Verificado no Chrome headless: navegação, vínculos e isolamento entre as duas OS,
datas, recarga, rota inexistente, carregamento atrasado, lista vazia, filtro,
limite de três itens, erro de lista e recuperação por teclado, erro de detalhes
e nova tentativa, e equipamento não localizado. Cenários de falha foram injetados
somente na memória do navegador de teste. Sem exceções JavaScript. Dashboard
conferida em 1366×768, 1920×1080, 390×844 e 320×740; detalhes em 1366×768, 390×844
e 320×740, sem transbordamento horizontal. Capturas de desktop e celular revisadas.
Build de produção aprovado.

Os dados continuam fictícios, sem autenticação real, API ou persistência. Etapa 4
concluída; aguardar validação antes da etapa 5. Nenhum commit ou push desta entrega.

## Dashboard operacional · etapa 4 · inspeção em 23/10/2026

Implementação da lista de OS aguardando definição da fonte de dados. A aplicação
atual não contém serviço de OS, registros de OS nem rota individual. O hash
`#/os/...` ainda não é reconhecido pelo roteamento de `Frontend/src/App.jsx`.

O protótipo de referência possui duas OS fictícias (`OS-0042` e `OS-0041`), ambas
com prioridade `Alta`, situações `Aberta` e `Em atendimento`. Os registros estão
em `../hemec-react-prototipo-2semestre/src/App.jsx`; sua página individual fica em
`src/OrderPages.jsx` daquela aplicação. Esses dados referenciam `EQ-002` e `EQ-003`,
enquanto o inventário atual usa IDs `eq-001` a `eq-004`. Não são fontes compatíveis
por simples importação. O fluxo antigo de abertura também cria uma OS diretamente,
comportamento que não deve ser migrado como regra de chamados da base atual.

Alternativa proposta para demonstração: reaproveitar os dois exemplos fictícios,
adaptar explicitamente os vínculos ao inventário atual, preservar o setor registrado
na OS e criar uma página individual somente para consulta. A migração não inclui
abertura de chamados, criação automática de OS ou registros técnicos. A lista da
dashboard deve usar linhas compactas com identificação, equipamento, setor, problema,
prioridade e situação, com prioridade em texto; nenhum gráfico ou novo indicador.

Alternativa com API: aguardar o contrato de OS e os critérios de seleção de
prioridades, mantendo a área indisponível até a integração. Nenhum endpoint,
vínculo, critério de prioridade ou registro foi implementado por suposição.

A escolha da fonte foi solicitada ao usuário. Esta etapa ainda não está concluída;
as etapas 5 e 6 não foram iniciadas. Nesta retomada, somente este README foi alterado;
as mudanças locais das etapas 2 e 3 foram preservadas.

## Dashboard operacional · etapa 3 · 22/10/2026

`DashboardIndicators.jsx` consulta `equipmentService.list()` e deriva o indicador
Equipamentos indisponíveis dos registros com situação exatamente `Indisponível`.
O resultado atual é **1 de 4 equipamentos fictícios**. A situação `Em manutenção`
não entra nessa contagem; não houve alteração dos dados ou das regras existentes.

Chamados abertos, OS em andamento e OS críticas continuam com traço e nome
acessível “Não disponível”: não existem fontes desses dados nesta base. Nenhum
valor zero, estado ou prioridade foi inventado para esses módulos.

A consulta de equipamentos trata carregamento, erro com Tentar novamente e
lista vazia. Nesses estados, o indicador mostra traço acompanhado da explicação,
sem conservar contagem anterior como se fosse atual. Zero só aparece quando há
equipamentos retornados e nenhum tem a situação `Indisponível`. A consulta ignora
respostas tardias após sair da dashboard e permite nova tentativa sem recarregar
a página. Não há temporizador, endpoint novo ou simulação extra de registros.

Para conferir: `npm.cmd run dev`, abrir `#/dashboard` e verificar 1 indisponível;
consultar os quatro registros no inventário para comparar as situações. Atualizar
a dashboard deve consultar novamente o mesmo serviço de demonstração. Novo chamado,
busca rápida e área Requer atenção permanecem como na etapa 2.

Verificação: build e revisão de whitespace aprovados. No Chrome headless, foram
conferidos resultado atual, consulta atrasada, lista vazia, zero indisponíveis com
equipamento em manutenção, contagem alterada pelos dados, erro e recuperação pelo
teclado, resposta fora do contrato de lista e descarte de resposta tardia. Para
esses cenários, o método do serviço foi substituído apenas na memória do navegador
de teste; não existem controles de falha na aplicação entregue. O inventário foi
conferido após restaurar o serviço. Sem exceções JavaScript ou transbordamento
horizontal em 1366×768, 1920×1080, 390×844 e 320×740. Capturas de desktop e do
estado de erro no celular foram revisadas.

Etapa 3 concluída dentro dos dados disponíveis. Chamados e OS dependem de contrato
e fonte próprios; login e equipamentos continuam simulados, sem API ou persistência.
Aguardar validação antes da etapa 4 (Requer atenção). As seções abaixo registram
as entregas anteriores.

## Dashboard operacional · etapa 2 · 22/10/2026

Estrutura disponível em `#/dashboard`. O login simulado agora abre essa rota.
`OperationalLayout.jsx` contém a navegação operacional e a identificação da
demonstração; `DashboardPage.jsx` contém cabeçalho, Novo chamado, busca reservada,
faixa dos quatro indicadores e área Requer atenção. Estilos próprios preservam
a home, o login e o inventário. Nenhuma dependência ou token foi adicionado.

Novo chamado está marcado como indisponível, com explicação visível. A busca
rápida permanece desabilitada e o link Consultar inventário abre a busca existente
em `#/equipamentos`. Chamados e Ordens de serviço aparecem como Em breve, sem
links para rotas inexistentes. Indicadores exibem traços com nome acessível
“Não disponível”, sem contagens simuladas. Requer atenção reserva a área de OS,
sem ordens inventadas; atividade recente permanece adiada.

Para validar: executar `npm.cmd run dev`, abrir `#/login` e usar dados fictícios;
conferir dashboard, navegação ao inventário, Voltar do navegador, Sair e atualização
de `#/dashboard`. A rota também abre diretamente para revisão; não há proteção
ou autenticação real. Conferir Tab e Pular para o conteúdo. No celular, o menu
fica acima do conteúdo e os indicadores se agrupam em duas colunas.

Verificação: build aprovado; fluxo no Chrome headless com login, dashboard,
inventário, retorno, saída e atualização da rota; foco inicial no conteúdo e acesso
por Tab ao botão Novo chamado; sem exceções JavaScript. Sem transbordamento
horizontal em 1366×768, 1920×1080, 390×844 e 320×740. Capturas de desktop e celular
revisadas. Os dados do inventário e o login continuam simulados, sem API.

Etapa 2 concluída. Aguardar validação antes de implementar indicadores (etapa 3).
As seções anteriores abaixo registram o histórico de preparação.

## Dashboard operacional · etapa 1 · 22/10/2026

Inspeção e proposta concluídas; a estrutura visual aguarda validação.
A única preparação em código foi extrair a busca existente para
`src/utils/filterEquipment.js`, utilizada pelo inventário e disponível para
a futura dashboard. A função combina os campos patrimônio, nome, série, marca,
modelo e setor, ignora maiúsculas/acentos e preserva o filtro por situação.
Não acessa serviços nem altera os registros.

Direção proposta: sidebar compacta no desktop, título e Novo chamado no topo,
busca visível, indicadores em faixa com separadores discretos e OS prioritárias
em linhas baixas como conteúdo principal. No celular, reorganizar a navegação e
agrupar os dados. Reutilizar fontes e tokens atuais; nenhum token novo nesta etapa.
Evitar cards iguais com sombras, gráficos e ícones decorativos.

A base atual oferece somente equipamentos fictícios via `equipmentService.list()`.
Não existem dados/serviços de chamados, OS ou atividade recente nesta aplicação.
Indicadores de chamados/OS e critérios de prioridade dependem desses contratos;
ausência de integração não deve ser apresentada como contagem zero.
Não somar “Em manutenção” a “Indisponível” sem confirmar a regra.
Atividade recente fica adiada até existir uma fonte de eventos.

Para conferir a preparação: executar `npm.cmd run build`; em `#/equipamentos`,
buscar `infusao` e combinar com `Disponível` para obter zero resultados;
usar Limpar filtros para recuperar os quatro itens. Rotas, login e apresentação
permanecem como estavam. Nenhuma tela de dashboard foi criada nesta etapa.

Verificação desta etapa: build de produção aprovado e 12 verificações da função
de busca aprovadas, incluindo campos pesquisáveis, acentos, múltiplos termos,
situação, lista vazia e preservação dos dados. Sem revisão visual em navegador.

## Retomada da sessão · 22/10/2026

- Ler `AGENTS.md` e `Skill.md` (referido como `SKILL.md`, antigo `SkillFront.md`)
  antes de alterar a interface. Preservar a composição aprovada e as alterações locais.
- Cadastro de usuários removido: sem rota `#/cadastro`, link Criar conta,
  campos, estados ou estilos exclusivos de cadastro. O login continua simulado.
- Login adaptativo: ocupa a altura disponível abaixo do cabeçalho; foto e
  formulário lado a lado a partir de 768 px, empilhados nas telas menores.
  Breakpoints: 576, 768, 992, 1200 e 1400 px. Priorizar 1366×768 e 1920×1080.
- Campos de login e botão Entrar compactados: altura mínima de 40 px,
  campos com padding de 6 px por 12 px e formulário com gap de 12 px.
  Texto dos campos mantido em 16 px; formulário limitado a 420 px de largura.
- Home: “Um registro que acompanha o trabalho.” agora fica em uma caixa
  azul-clara com cantos arredondados. Manter somente título e descrição nessa
  caixa, sem botão ou convite para equipamentos. As três funcionalidades permanecem.
- Caixa separada do inventário removida. A home não contém link direto para
  equipamentos; desde a etapa 2, o login simulado abre `#/dashboard`.
- Banner desktop com `min-height: clamp(480px, calc(100svh - 216px), 760px)`:
  redução de 48 px em uma viewport de 1366×768 para revelar as funcionalidades.
  O usuário aprovou esse ajuste. Preservar carrossel, fotos e tratamento visual.
- Última verificação: `npm.cmd run build` aprovado após compactar o login.
  Não houve validação em navegador nesta sessão. Os registros anteriores de
  Chrome neste README pertencem a entregas anteriores.
- Para conferir: `npm.cmd run dev`, testar home e login em 1366×768 e
  1920×1080, depois celular, teclado e zoom de 200%. Conferir visibilidade das
  funcionalidades abaixo do banner, campos, Mostrar senha, Entrar e Sair.
- API, autenticação real e persistência continuam pendentes. Nenhum commit,
  push ou deploy foi realizado nesta sessão. Aguardar a próxima solicitação
  do usuário antes de ampliar o escopo.

Nova base React com Vite, em JavaScript/JSX. O protótipo original permanece em
`../hemec-react-prototipo-2semestre` como referência.

## Executar

Com Node.js 22.12 ou superior, abra um terminal nesta pasta:

```sh
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite. Para gerar a versão de produção:

```sh
npm run build
npm run preview
```

Em PowerShell com bloqueio de scripts, use `npm.cmd` no lugar de `npm`.

## Estrutura

```text
src/
  main.jsx                    Inicializa o React e carrega o CSS
  App.jsx                     Conecta o layout à página
  components/layout/          Estrutura compartilhada das telas
  pages/                      Conteúdo de cada página
  data/                       Dados fictícios identificados
  services/                   Espaço para acesso a dados locais e futura API
  styles/                     Estilos responsivos
```

Uma aplicação React pode continuar sendo SPA e ter páginas e componentes separados.
Modularizar significa dividir responsabilidades em arquivos; não exige carregar um
HTML diferente para cada tela. A navegação será definida na migração das páginas.

## Etapas para validação

1. Base e página pública de apresentação (implementadas).
2. Equipamentos: inventário, busca e filtro por situação implementados; cadastro e detalhes pendentes.
3. Chamados e OS: entidades separadas e navegação para a ordem individual.
4. Atendimentos: COI/COE, registros, duração em minutos e histórico.

## Como validar esta etapa

- Conferir a página inicial em desktop e celular (por exemplo, largura de 390 px).
- Clicar em Início e Funcionalidades para navegar pelas seções da página.
- Clicar em Entrar no cabeçalho ou Entrar no sistema para abrir o login simulado.
- Conferir o aviso de projeto acadêmico e ausência de conexão com o hospital.
- Usar Tab e Enter no link Pular para o conteúdo.
- Executar o build, que deve gerar `dist/`.

## Página inicial · orientação visual

Reconstruída a partir do `index.html` do 1º semestre: navegação, apresentação e
imagem hospitalar. As fotos usadas agora estão em `src/assets/imgs`, portanto a
nova aplicação não depende da pasta antiga para funcionar.

A composição segue agora `SKILL.md` (antigo `SkillFront.md`): fotografia hospitalar como principal
elemento visual, título sobre a fotografia no desktop e funcionalidades em linhas
de leitura. Foram removidos os números decorativos,
o destaque de uma frase em cor diferente e o excesso de divisórias da versão Swiss.

Paleta: branco `#FFFFFF`, fundo `#EDF4FA`, ação `#164CCE`, texto principal `#12344A`,
texto secundário `#526575` e contorno `#CCDCE7`. Fontes Montserrat (texto) e Inter
(títulos), copiadas dos recursos do 1º semestre para `src/assets/fonts`, sem
requisições externas. No celular, texto e carrossel ficam empilhados.

A abertura usa uma hero image em toda a largura do conteúdo. No desktop, sua altura
é `clamp(480px, calc(100svh - 216px), 760px)` para deixar o início das
funcionalidades aparecer abaixo do banner, e o texto aparece sobre a fotografia. O sombreado é
mais forte à esquerda para preservar o contraste. A legenda e os controles ficam
no canto inferior direito. As fotos não exibem legendas visíveis; suas descrições
permanecem nos atributos de acessibilidade. No celular (até 700 px), o texto sai da imagem e a foto
usa altura `clamp(300px, 70vw, 440px)`. `object-fit: cover` preenche a área sem
deformar; o campo `position` de cada slide ajusta o recorte, que varia com a tela.

`AppLayout.jsx` reúne cabeçalho e rodapé; `HomePage.jsx` contém a apresentação;
`global.css` define os estilos. Os links usam âncoras porque todas as seções desta
entrega pública pertencem à mesma página. O login simulado usa rota no
hash, assim como o inventário. Chamados e OS ainda não foram implementados.

Verificações executadas: build de produção e Chrome headless nas larguras 1440,
768, 390 e 320 px; imagem carregada, navegação entre seções, ausência de
transbordamento horizontal, atalho de teclado e ausência de erros JavaScript.

### Carrossel de imagens

`src/components/home/HeroCarousel.jsx` contém três fotos locais, suas descrições,
os pontos de enquadramento e os controles. O `useState` guarda a imagem atual;
o `useEffect` agenda a troca a cada seis segundos e limpa o temporizador ao pausar
ou desmontar o componente. Nenhuma biblioteca de carrossel foi adicionada.

Em `HeroCarousel.css`, ajuste `--image-blur` (atualmente `1px`) e `--image-shade`
(atualmente `0.22`, equivalente a 22% de preto na área mais clara). No desktop,
um gradiente reforça o escurecimento atrás do texto. São efeitos visuais do navegador;
os arquivos originais das imagens não são modificados.

Para testar, aguarde seis segundos ou selecione um dos três indicadores no canto
inferior direito. O indicador ativo é mais largo e branco. Os botões de texto foram
removidos; cada indicador tem área de interação de 44 × 44 px e nome acessível.
Use Tab e Enter/Espaço para selecionar pelo teclado. Enquanto o mouse ou o foco
estiverem nos indicadores, a troca automática fica suspensa e retoma ao sair.
A contagem de seis segundos reinicia após uma seleção manual. Com movimento reduzido
ativada no sistema/navegador, a troca é somente manual e sem transição animada.

Verificado em Chrome: quatro larguras de tela (1440, 768, 390 e 320 px), carregamento
das três imagens, indicadores manuais, reprodução automática, pausa durante interação, retomada,
movimento reduzido e teclado. Build aprovado.

## Inventário de demonstração

A caixa “Um registro que acompanha o trabalho.” apresenta apenas texto informativo,
sem botão ou convite para acessar equipamentos. A caixa separada de inventário foi removida. A rota
`#/equipamentos` abre a lista e pode ser atualizada no navegador. O cabeçalho permite
voltar às seções da página pública. A composição do hero foi preservada.

O inventário apresenta quatro equipamentos fictícios. A busca combina termos de
patrimônio, nome, série, marca, modelo e setor, sem diferenciar maiúsculas ou acentos.
O filtro de situação pode ser combinado com a busca. A página inclui estados de
carregamento, erro com nova tentativa e ausência de resultados com limpeza de filtros.
`equipmentService.list()` separa a consulta da apresentação; não existe API configurada.

Para conferir: abra o inventário, busque `infusao`, selecione `Disponível` para obter
zero resultados e use **Limpar filtros** para recuperar os quatro itens. Atualize a
rota, volte ao início e confira a navegação por teclado, inclusive **Pular para o
conteúdo**. Confira também em 390 px e 320 px.

Verificação desta entrega: build de produção aprovado. A interação e a apresentação
em navegador ainda precisam de validação manual; as verificações de Chrome descritas
acima se referem à entrega anterior da página inicial.

## Login simulado

A rota `#/login` apresenta foto e formulário, sem rodapé. A tela de cadastro
de usuários e o link de criar conta foram removidos.

Use um e-mail fictício válido e uma senha de teste com pelo menos seis caracteres.
O login abre a dashboard, com identificação de usuário de demonstração e botão
**Sair**. O inventário também mostra o e-mail informado. A sessão fica apenas na memória e desaparece ao atualizar
a página. Não há autenticação real, API ou persistência de credenciais.

Para validar: abrir o login, conferir campos obrigatórios e **Mostrar senha**,
entrar na dashboard, consultar o inventário e sair. Conferir desktop e celular.

### Layout adaptativo do login

O login ocupa a altura disponível abaixo do cabeçalho, sem altura fixa.
Foto e formulário ficam lado a lado a partir de 768 px e empilhados abaixo disso.
Os ajustes usam pontos de 576, 768, 992, 1200 e 1400 px. O formulário
mantém largura máxima de 420 px. Telas baixas ou com zoom permitem rolagem.

Validar manualmente em 1366×768, 1920×1080, 390×844 e 768×1024,
com teclado e zoom de 200%. Build aprovado; revisão visual pendente.

## Limites atuais

Esta base contém a consulta de equipamentos; cadastro, detalhes, chamados e OS
ainda estão pendentes. Não existe autenticação,
persistência, API ou sincronização. Os serviços serão
implementados com a primeira tela de dados; não há endpoints presumidos.

O contrato com Java/Spring Boot ainda precisa ser alinhado com Bruno. Estoque, custos,
relatórios avançados, anexos e preventivas automáticas ficam fora das próximas entregas.

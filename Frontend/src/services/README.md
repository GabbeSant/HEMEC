# Serviços

Esta pasta concentra o acesso aos equipamentos, chamados, OS e atendimentos de demonstração.
As páginas chamarão os serviços, sem acessar `localStorage` ou `fetch` diretamente.

`equipmentService.list()` retorna uma Promise com cópias dos equipamentos fictícios
de `src/data/demoEquipment.js`. A consulta não grava dados no navegador.
Quando Bruno definir
o contrato do backend Java/Spring Boot, criaremos o adaptador para a API real.
Nenhum endpoint ou conexão com backend está configurado nesta etapa.

`workOrderService.list()` devolve as duas OS fictícias de `demoWorkOrders.js`,
associadas a cópias dos equipamentos atuais por `equipmentId`. `getById(id)`
retorna o registro correspondente ou `null`. É um contrato local de leitura para
lista e detalhes; não representa um contrato confirmado de API. Nenhuma operação
cria chamados, modifica OS ou altera a situação dos equipamentos.

Armazenamento no navegador será informado como local, sem sincronização com a equipe.

`requestService.list()` e `create()` usam `localStorage` na chave `hemec-requests-v1`.
Este provedor local foi autorizado pelo usuário; envelope de versão 1, somente
criação e leitura, com estado inicial Aberto. Falhas de acesso, corrupção e versões
incompatíveis geram erro sem sobrescrever dados. Criação valida equipamento e problema
e preserva identificação/setor do equipamento na abertura. Chamados são independentes
das OS. Não há autenticação, autorização por usuário, sincronização ou API: todas
as sessões desta origem no mesmo navegador compartilham os registros. Limites e
procedimento de teste estão no README principal. Na continuidade de 05/11/2026,
o pedido passou a exigir identificação explícita da demonstração: o formulário,
a confirmação e os detalhes informam o alcance local do registro. Isso não altera
as limitações técnicas nem o formato dos dados já salvos.

`attendanceService.list(orderId)` e `create()` reutilizam o mecanismo de
`localStorage` em uma coleção separada: `hemec-attendances-v1`, envelope de versão 1.
São registros locais de atendimento, sem endpoint ou contrato de API presumido.
A criação valida existência da OS, técnico, data, setor, serviço, duração em minutos
inteiros e classificação COI/COE. COE exige empresa; COI não grava empresa externa.
A leitura rejeita dados inválidos/versão incompatível sem substituí-los.

Os atendimentos ficam associados por `orderId`; o histórico calcula o total dos
períodos trabalhados. O serviço não altera OS, equipamentos ou chamados e não
implementa encerramento, liberação, aprovação ou atribuição. O técnico é informado
manualmente com dados fictícios; não há autenticação/autorização real para essa
gravação. Todas as sessões desta origem/navegador compartilham os registros locais.

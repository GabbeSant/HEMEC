# Serviços

Esta pasta concentra o acesso aos dados de equipamentos e OS de demonstração.
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
procedimento de teste estão no README principal. A remoção dos avisos da interface
foi solicitada pelo usuário e não altera essas limitações técnicas.

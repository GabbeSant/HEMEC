# Serviços

Esta pasta concentra o acesso aos dados de equipamentos.
As páginas chamarão os serviços, sem acessar `localStorage` ou `fetch` diretamente.

`equipmentService.list()` retorna uma Promise com cópias dos equipamentos fictícios
de `src/data/demoEquipment.js`. A consulta não grava dados no navegador.
Quando Bruno definir
o contrato do backend Java/Spring Boot, criaremos o adaptador para a API real.
Nenhum endpoint ou conexão com backend está configurado nesta etapa.

Armazenamento no navegador será informado como local, sem sincronização com a equipe.

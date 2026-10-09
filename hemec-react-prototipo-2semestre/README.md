# HEMEC — protótipo React 02

## Testar
Abra `HEMEC-Prototipo.html` no navegador. Todos os recursos estão incluídos; não precisa de internet.

## Desenvolver
Com Node.js 22.12+:

```sh
npm ci
npm run dev
```

`npm run build` gera o site em `dist/`. `npm run build:standalone` gera também o HTML independente.

## Fluxo de OS
- Navegue para Ordens de serviço: lista compacta com série, marca, modelo, setor e solicitante.
- Clique em Abrir OS. Cada ordem possui endereço próprio, por exemplo `#/os/OS-0042`.
- Preencha técnico, setor, data, horas/minutos e serviço executado.
- Selecione COI (interna) ou COE (externa). COE exige a empresa responsável.
- Salve o registro. Ele entra no histórico da OS, soma horas e inicia o atendimento.
- Adicione outros registros para outros períodos ou técnicos. Registros anteriores são preservados; cada entrada mantém sua classificação COI/COE. A lista mostra a classificação do último registro salvo.
- Rascunhos e registros ficam somente no armazenamento local do navegador; não são compartilhados com a equipe.

## Estrutura
- `src/App.jsx`: estado, navegação, dashboard, inventário e formulários de cadastro/chamado.
- `src/OrderPages.jsx`: lista compacta, identificação da OS, formulário técnico e histórico.
- `src/styles.css`: layout responsivo.
- `scripts/standalone.mjs`: empacotamento offline após o build.

## Limites
Dados e pessoas fictícios. Sem backend, autenticação ou sincronização. Solicitante e técnico são campos livres neste protótipo; na integração devem usar as identidades autenticadas e permissões do sistema. O setor da abertura fica preservado na OS; o setor do atendimento fica em cada registro. O armazenamento local pode ser apagado ou bloqueado pelo navegador, especialmente em arquivo local; o rodapé informa falhas detectadas. Ao trocar de arquivo, navegador ou computador, os dados podem não acompanhar.

O tempo registrado representa trabalho efetivo (1 minuto a 24 horas por entrada), não tempo de indisponibilidade. Salvar serviço não conclui a OS nem libera equipamento para uso. As regras de encerramento, validação técnica e integração com o hospital ficam para uma próxima etapa.

## Verificação
Build concluído. Fluxos conferidos em navegador: COI/COE, empresa externa, dois registros com soma de 2h15, recarga com persistência, rascunhos, separação entre OS e largura mobile de 390px sem transbordamento da página.

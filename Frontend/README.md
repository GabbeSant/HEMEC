# HEMEC · Frontend

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
  equipamentos; o login simulado continua abrindo `#/equipamentos`.
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
O login abre o inventário e mostra o e-mail informado como usuário de demonstração,
com botão **Sair**. A sessão fica apenas na memória e desaparece ao atualizar
a página. Não há autenticação real, API ou persistência de credenciais.

Para validar: abrir o login, conferir campos obrigatórios e **Mostrar senha**,
entrar no inventário e sair. Conferir desktop e celular.

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

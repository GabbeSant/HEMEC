# HEMEC · Frontend

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
é `clamp(600px, 78svh, 760px)` e o texto aparece sobre a fotografia. O sombreado é
mais forte à esquerda para preservar o contraste. A legenda e os controles ficam
no canto inferior direito. As fotos não exibem legendas visíveis; suas descrições
permanecem nos atributos de acessibilidade. No celular (até 700 px), o texto sai da imagem e a foto
usa altura `clamp(300px, 70vw, 440px)`. `object-fit: cover` preenche a área sem
deformar; o campo `position` de cada slide ajusta o recorte, que varia com a tela.

`AppLayout.jsx` reúne cabeçalho e rodapé; `HomePage.jsx` contém a apresentação;
`global.css` define os estilos. Os links usam âncoras porque todas as seções desta
entrega pública pertencem à mesma página. Login e cadastro simulados usam rotas no
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

A seção de acesso da página inicial oferece **Consultar equipamentos**. A rota
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

## Login e cadastro simulados

As rotas `#/login` e `#/cadastro` retomam a composição do 1º semestre em dois painéis.
O login tem foto à esquerda e formulário à direita; o cadastro inverte os lados.
Login e cadastro não exibem o rodapé compartilhado da aplicação.
A foto local `vitalworks-hospital-ward-1338585_1920.jpg` recebe blur de 3 px e uma
camada escura para contrastar com a mensagem de boas-vindas e o breve texto de apoio.
No celular, a mensagem sobre a foto fica acima do formulário nas duas telas.
Não há campo de perfil, cargo ou tipo de usuário em nenhuma das duas telas.

O cadastro pede nome, e-mail, senha de teste com pelo menos seis caracteres e
confirmação. Senhas diferentes impedem a conclusão. Ao concluir, a página de login
exibe a confirmação de cadastro simulado. Nenhuma conta é persistida: qualquer
e-mail válido e senha de teste com seis caracteres permitem entrar na demonstração,
mesmo sem cadastro prévio. Nome e senha do cadastro não são armazenados.

O login abre o inventário e mostra o e-mail informado como usuário de demonstração,
com botão **Sair**. A identificação fica apenas na memória e desaparece ao atualizar
a página. O inventário permanece uma demonstração pública; não há autorização real,
tokens, chamadas de autenticação ou gravação de credenciais no navegador.

Verificado em Chrome: cadastro → confirmação no login → inventário → sair;
campos obrigatórios, confirmação divergente, mostrar senha e ausência de credenciais
em localStorage/sessionStorage. Login e cadastro sem transbordamento horizontal nas
larguras 1440, 390 e 320 px; capturas de desktop e celular revisadas, sem exceções
JavaScript. Build de produção aprovado.

## Limites atuais

Esta base contém a consulta de equipamentos; cadastro, detalhes, chamados e OS
ainda estão pendentes. Não existe autenticação,
persistência, API ou sincronização. Os serviços serão
implementados com a primeira tela de dados; não há endpoints presumidos.

O contrato com Java/Spring Boot ainda precisa ser alinhado com Bruno. Estoque, custos,
relatórios avançados, anexos e preventivas automáticas ficam fora das próximas entregas.

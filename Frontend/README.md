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
2. Equipamentos: inventário, busca, filtros, cadastro e detalhes.
3. Chamados e OS: entidades separadas e navegação para a ordem individual.
4. Atendimentos: COI/COE, registros, duração em minutos e histórico.

## Como validar esta etapa

- Conferir a página inicial em desktop e celular (por exemplo, largura de 390 px).
- Clicar em Início e Funcionalidades para navegar pelas seções da página.
- Clicar em Acessar o sistema: por enquanto, leva ao aviso de acesso ainda indisponível.
- Conferir o aviso de projeto acadêmico e ausência de conexão com o hospital.
- Usar Tab e Enter no link Pular para o conteúdo.
- Executar o build, que deve gerar `dist/`.

## Página inicial · direção Swiss

Reconstruída a partir do `index.html` do 1º semestre: navegação, apresentação e
imagem hospitalar. As fotos usadas agora estão em `src/assets/imgs`, portanto a
nova aplicação não depende da pasta antiga para funcionar.

Fundo branco, azul `#002FA7`, Helvetica/Arial, alinhamento à esquerda e divisórias
de 1 px. A grade separa texto e fotografia; os números 01–03 organizam as três
funcionalidades apresentadas. No celular, os blocos ficam empilhados.

`AppLayout.jsx` reúne cabeçalho e rodapé; `HomePage.jsx` contém a apresentação;
`global.css` define os estilos. Os links usam âncoras porque todas as seções desta
entrega pertencem à mesma página. Login e funcionalidades operacionais ainda não
foram implementados. O arquivo de identidade fictícia fica reservado às próximas telas.

Verificações executadas: build de produção e Chrome headless nas larguras 1440,
768, 390 e 320 px; imagem carregada, navegação entre seções, ausência de
transbordamento horizontal, atalho de teclado e ausência de erros JavaScript.

### Carrossel de imagens

`src/components/home/HeroCarousel.jsx` contém três fotos locais, suas descrições,
os pontos de enquadramento e os controles. O `useState` guarda a imagem atual;
o `useEffect` agenda a troca a cada seis segundos e limpa o temporizador ao pausar
ou desmontar o componente. Nenhuma biblioteca de carrossel foi adicionada.

Em `HeroCarousel.css`, ajuste `--image-blur` (atualmente `1px`) e `--image-shade`
(atualmente `0.22`, equivalente a 22% de preto). São efeitos visuais do navegador;
os arquivos originais das imagens não são modificados.

Para testar, aguarde seis segundos, use Anterior/Próxima e Pausar/Reproduzir.
A interação manual pausa a reprodução. Enquanto o mouse ou o foco estiverem no
carrossel, a troca automática fica suspensa. Com a preferência de movimento reduzido
ativada no sistema/navegador, a troca é somente manual e sem transição animada.

Verificado em Chrome: quatro larguras de tela (1440, 768, 390 e 320 px), carregamento
das três imagens, controles manuais, reprodução automática, pausa, retomada,
movimento reduzido e teclado. Build aprovado.

## Limites atuais

Esta base ainda não contém as funcionalidades do protótipo. Não existe autenticação,
persistência, API ou sincronização. O usuário exibido é fictício. Os serviços serão
implementados com a primeira tela de dados; não há endpoints presumidos.

O contrato com Java/Spring Boot ainda precisa ser alinhado com Bruno. Estoque, custos,
relatórios avançados, anexos e preventivas automáticas ficam fora das próximas entregas.

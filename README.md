# petvac

Este projeto tem como objetivo implementar o projeto da disciplina de frameworks. O nome do projeto é PetVac.

## Endereço de Deploy - GitHub Pages

https://guilhermevicente.github.io/petvac/

## Protótipo

https://www.figma.com/file/A1WKgpxUbrGYC0WlBKAx0D/PetVac?type=design&node-id=5%3A8&t=WlVsidSvyOMS9Bhn-1

## Video

https://www.youtube.com/watch?v=WDvNvcAYvks

## Checklist

- [x] Criar o repositório no GitHub com a estrutura do Gitflow, ou seja, branches main e develop.
- [x] Usar componentes de algum framework CSS (Bootstrap, Materialize ou outro)
- [X] Apresentar as telas com layout responsivo usando ou não algum framework CSS.
- [x] Construir páginas web com o conceito de componentes.
- [x] Criar o layout da aplicação com componentes, ou seja, o cabeçalho e rodapé precisam ser componentes.
- [x] Usar pelo menos dois tipos de data-binding (Interpolation, Property Binding, Event Binding e Two Way Data Binding).
- [x] Passar dados via hierarquia de componentes, ou seja, usando @Input ou @Output.
- [x] Mapear componentes à rotas no módulo de rotas.
- [x] Criar navegação entre páginas por meio de rotas.
- [x] Passar dados entre componentes que representam diferentes telas via parâmetros de rotas.
- [x] Validar campos do formulário com REGEX e apresentar os erros.
- [x] Desabilitar o botão de submit enquanto o formulário está inválido.
- [X] Fazer requisições a API com tratamento da resposta com Promises ou Observables.
- [X] Cadastrar uma entidade no JSON Server.
- [X] Apresentar uma lista de dados com a diretiva estrutural ngFor.
- [X] Usar a diretiva ngIf
- [X] Formatar a apresentação de dados com Pipes.
- [X] Build e deploy da aplicação.

## Manual de execução
- Clonar o repositório com `git clone https://github.com/guilhermevicente/petvac.git`
- Fazer checkout no branch `develop` que contém as modificações mais recentes
- Abrir o projeto no editor Visual Studio Code (VS Code)
- Abrir um terminal pelo VSCode e executar a API Fake (JSON Server) via o seguinte comando: 
  - Comando: `npm run json-server`
  - O comando deve ser aplicado no diretório raiz do projeto, ou seja, que contém o arquivo `db.json` e `routes.json`.
- Abrir um novo terminal pelo VSCode e então executar o projeto Angular
  - Comando: `ng serve`

## Sistema em produção

- Acessar o link: https://guilhermevicente.github.io/petvac/ e realizar o clone do projeto `git clone https://github.com/guilhermevicente/petvac.git`
- Instalar o projeto `npm install`
- Abrir o projeto no editor Visual Studio Code (VS Code)
- Abrir um terminal pelo VSCode e executar a API Fake (JSON Server) via o seguinte comando: `npm run json:server`
- Acessar https://guilhermevicente.github.io/petvac/

OBS: ainda é preciso executar a api fake localmente pois o projeto ainda não possui um backend.

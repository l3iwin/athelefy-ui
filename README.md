# Athelefy UI — Setup Guide

Guia completo para correr o projecto em qualquer computador do zero.

---

## 1. Instalar o Software Necessário

### Docker Desktop
O Docker é necessário para correr a aplicação sem instalar Node.js ou Angular localmente.

1. Vai a https://www.docker.com/products/docker-desktop
2. Faz download para o teu sistema operativo (Mac, Windows ou Linux)
3. Instala e abre o Docker Desktop
4. Verifica que está a correr — deves ver o ícone do Docker na barra de tarefas/menu bar

Verifica a instalação:
```bash
docker --version
docker-compose --version
```

---

### Visual Studio Code
O editor de código utilizado no projecto.

1. Vai a https://code.visualstudio.com
2. Faz download e instala

---

## 2. Instalar as Extensões do VSCode

Abre o VSCode e instala as seguintes extensões (`CMD+Shift+X` no Mac / `Ctrl+Shift+X` no Windows):

| Extensão | ID | Para quê |
|---|---|---|
| Dev Containers | `ms-vscode-remote.remote-containers` | Ligar o VSCode ao container Docker |
| Angular Language Service | `angular.ng-template` | Autocomplete e erros em templates Angular |
| Prettier | `esbenp.prettier-vscode` | Formatação automática de código |
| ESLint | `dbaeumer.vscode-eslint` | Detecção de erros no código |
| TypeScript Next | `ms-vscode.vscode-typescript-next` | Suporte melhorado a TypeScript |

---

## 3. Clonar o Projecto

```bash
git clone <url-do-repositorio>
cd athelefy-ui
```

---

## 4. Correr a Aplicação

```bash
docker-compose up --build
```

Na primeira vez demora alguns minutos — está a instalar todas as dependências.

Quando vires isto no terminal, está pronto:

```
angular-app-1  |   ➜  Local:   http://localhost:4200/
```

Abre o browser em http://localhost:4200

---

## 5. Ligar o VSCode ao Container (Dev Container)

Para teres autocomplete, sem erros no VSCode e acesso ao `node_modules`:

1. Abre o VSCode na pasta do projecto
2. Prima `CMD+Shift+P` (Mac) ou `Ctrl+Shift+P` (Windows)
3. Escreve: `Dev Containers: Reopen in Container`
4. Selecciona a opção e aguarda — o VSCode vai reabrir dentro do container

A partir daqui o VSCode está ligado directamente ao Docker e todos os erros desaparecem.

---

## 6. Comandos Úteis

| Comando | O que faz |
|---|---|
| `docker-compose up` | Inicia a aplicação |
| `docker-compose up --build` | Inicia e reconstrói a imagem |
| `docker-compose down` | Para a aplicação |
| `docker-compose down -v` | Para e remove volumes |
| `docker-compose build --no-cache` | Reconstrói sem cache |

Para entrar dentro do container manualmente:
```bash
docker exec -it athelefy-ui-angular-app-1 sh
```

---

## 7. Estrutura do Projecto

```
athelefy-ui/
├── .devcontainer/
│   └── devcontainer.json       # Configuração do Dev Container
├── src/
│   ├── app/
│   │   ├── layout/
│   │   │   └── shell/          # Navbar + layout principal
│   │   ├── features/
│   │   │   ├── dashboard/      # Página principal
│   │   │   ├── squad/          # Gestão de plantel
│   │   │   ├── calendar/       # Calendário
│   │   │   ├── training/       # Treinos
│   │   │   ├── statistics/     # Estatísticas
│   │   │   ├── club/           # Clube
│   │   │   └── admin/          # Administração
│   │   ├── app.routes.ts       # Definição de rotas
│   │   ├── app.config.ts       # Configuração da aplicação
│   │   └── app.ts              # Componente raiz
│   ├── main.ts                 # Ponto de entrada
│   └── styles.scss             # Estilos globais
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Para quê |
|---|---|---|
| Angular | 21 | Framework principal |
| Angular Material | 21 | Componentes de UI |
| TypeScript | 5.9 | Linguagem de programação |
| SCSS | — | Estilos |
| Node.js | 20 | Runtime (dentro do Docker) |
| Docker | — | Ambiente de desenvolvimento |
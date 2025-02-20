# Sistema de Agendamentos

Este é um projeto de sistema de agendamentos desenvolvido em Node.js, utilizando banco de dados PostgreSQL. O sistema permite a criação, edição e exclusão de agendamentos.

## Requisitos

Para rodar este projeto localmente, certifique-se de ter o Node.js instalado na sua máquina.

## Instalação

Após clonar este repositório, navegue até o diretório do projeto e execute o seguinte comando para instalar as dependências:

```bash
npm install
```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:

```bash
npm run dev
```

## .env

Valores para o .env

```
NEXT_PUBLIC_APP_URL="http://localhost:PortaDoServidorWeb"
NEXT_PUBLIC_API_URL="http://localhost:PortaDaApi"
```

## Gerar chave para autenticação com AuthJs

Para gerar a chave AUTH_SECRET no seu arquivo `.env`:

```bash
npx auth secret
```

## Funcionalidades

- **Criação de Agendamentos:** Permite criar novos agendamentos especificando data, hora e detalhes.
- **Edição de Agendamentos:** Permite modificar os detalhes de um agendamento existente.
- **Exclusão de Agendamentos:** Permite remover um agendamento do sistema.

## Tecnologias Utilizadas

- NextJs v15
- ReactJs V19
- Tailwind v4
- AuthJs
- Outras dependências estão listadas no arquivo `package.json`

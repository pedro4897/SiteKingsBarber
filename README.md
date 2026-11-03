# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Área do barbeiro

A conta `pedro123@gmail.com` pode acessar **Barbeiro** pela navegação após entrar. Para usar a área, publique as regras de [firestore.rules](./firestore.rules) no Firebase; elas permitem que somente essa conta consulte e atualize as solicitações. Se trocar a conta do barbeiro, atualize o e-mail em `src/containers/Barber/access.js` e em `firestore.rules`.

Agendamentos feitos com o Firebase configurado são salvos em uma coleção compartilhada e aparecem na área do barbeiro, inclusive pedidos de clientes sem login. A área também consulta as subcoleções antigas de agendamentos. Sem configuração do Firebase, os pedidos ficam apenas no dispositivo e não podem ser gerenciados pela barbearia.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

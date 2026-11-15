# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Área do barbeiro

A conta `pedro123@gmail.com` pode acessar **Barbeiro** pela navegação após entrar. Para usar a área, publique as regras de [firestore.rules](./firestore.rules) no Firebase; elas permitem que somente essa conta consulte e atualize as solicitações. Se trocar a conta do barbeiro, atualize o e-mail em `src/containers/Barber/access.js` e em `firestore.rules`.

Para agendar, o cliente precisa entrar ou criar uma conta. Os pedidos são salvos em uma coleção compartilhada e aparecem na área do barbeiro; a área também consulta as subcoleções antigas de agendamentos. O cliente pode cancelar um agendamento aceito antes do horário marcado.

O horário inicial é todos os dias, das 09:00 às 17:00, em intervalos de duas horas. O barbeiro pode personalizar os dias de trabalho e o primeiro e último horário de atendimento de cada dia. Solicitações recusadas e canceladas ficam em um histórico recolhido tanto para o barbeiro quanto para o cliente. O motivo da recusa aparece no histórico do cliente; cancelar um agendamento aceito antes do início libera o horário.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

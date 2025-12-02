# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9294b324-8b3a-40d2-8506-e97997acf9f4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9294b324-8b3a-40d2-8506-e97997acf9f4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Variáveis de Ambiente

Este projeto requer as seguintes variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto:

```env
# URL base da API (opcional, padrão: https://tatodb.vercel.app)
VITE_API_BASE_URL=https://tatodb.vercel.app

# URL do checkout externo (obrigatório)
VITE_CHECKOUT_URL=https://seu-checkout-externo.com
```

**Importante**: No Vite, todas as variáveis de ambiente expostas ao cliente devem começar com `VITE_`.

### Endpoints da API

O projeto usa os seguintes endpoints da API:

- **Autenticação**: `{VITE_API_BASE_URL}/tato/v2/auth`
  - Login: `POST /login`
  - Registro: `POST /register`
  - Google OAuth: `POST /google`
- **Dashboard**: `GET {VITE_API_BASE_URL}/tato/v2/user/dashboard`

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9294b324-8b3a-40d2-8506-e97997acf9f4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

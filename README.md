# Multi-Tenant Cloud-Native Banking Platform - Frontend

This project demonstrates a frontend architecture for a multi-tenant banking platform. It's built with React, TypeScript, Vite, Zustand for state management, React Router for routing, and Styled Components for theming and styling. It includes mocked authentication, tenant and label selection, dynamic branding based on tenants, and a few sample views.

## Core Architectural Goals & Features

- **Multi-Tenancy:** The system clearly distinguishes between tenants, allowing for unique branding and configurations.
- **Label Context:** Within each tenant, users can operate under different "labels" (representing sub-clients, branches, etc.), each potentially having slight configuration variations.
- **Scalability:** The architecture is designed to be modular, making it easier to add new tenants, labels, and features.
- **Developer Experience:** A clear project structure, TypeScript for type safety, Vite for fast development, and MSW for API mocking contribute to a good developer experience.
- **Clarity in UI:** The UI always displays the current tenant and label context.
- **Dynamic Branding:** Tenant-specific theming (colors, logos) is applied dynamically.
- **Routing:** Uses React Router with URL-based tenant and label context (`/app/:tenantId/:labelId/...`).
- **Mocked Backend:** Uses Mock Service Worker (MSW) to simulate API responses for login and data fetching.

## Tech Stack

- **React 18+**
- **TypeScript**
- **Vite** (Build Tool & Dev Server)
- **pnpm** (Package Manager)
- **Zustand** (State Management)
- **React Router DOM v6** (Routing)
- **Styled Components** (CSS-in-JS & Theming)
- **Mock Service Worker (MSW)** (API Mocking)

## Project Structure

multi-tenant-banking/
├── public/
│ ├── assets/
│ │ └── logos/ # Tenant logos
│ └── mockServiceWorker.js # MSW service worker
├── src/
│ ├── app/
│ │ ├── App.tsx # Main application component, router setup
│ │ ├── GlobalStyles.ts # Global CSS styles
│ │ └── ThemeProviderWrapper.tsx # Applies tenant-specific theme
│ ├── components/
│ │ ├── common/ # Reusable UI components (Button, Select, etc.)
│ │ ├── layout/ # Layout components (Header, ProtectedAppLayout)
│ │ └── auth/ # Auth-related components (LoginForm)
│ ├── config/
│ │ ├── mockData.ts # Mock tenant, label, and user data
│ │ └── theme.ts # Default theme and theme type definitions
│ ├── features/
│ │ ├── dashboard/
│ │ │ └── DashboardPage.tsx
│ │ └── settings/
│ │ └── SettingsPage.tsx
│ ├── hooks/
│ │ └── useCombinedStore.ts # Example of combining store access
│ ├── mocks/
│ │ ├── browser.ts # MSW browser worker setup
│ │ └── handlers.ts # MSW request handlers
│ ├── pages/
│ │ ├── LoginPage.tsx
│ │ ├── NotFoundPage.tsx
│ │ └── TenantLabelSelectionPage.tsx
│ ├── services/ # Mocked service functions (e.g., authService)
│ │ └── authService.ts
│ ├── store/
│ │ ├── authStore.ts # Zustand store for authentication
│ │ └── tenantStore.ts # Zustand store for tenant/label context and data
│ ├── types/
│ │ ├── index.ts # Common type definitions and re-exports
│ │ ├── styled.d.ts # Styled Components theme augmentation
│ │ └── vite-env.d.ts # Vite environment types
│ ├── main.tsx # Application entry point
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

## Getting Started

**Prerequisites:**

- Node.js (v18+ recommended)
- pnpm (`npm install -g pnpm`)

**Installation & Running:**

1.  **Clone the repository (or extract the provided archive):**

    ```bash
    # git clone ...
    cd multi-tenant-banking
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Initialize MSW (if `public/mockServiceWorker.js` is missing or needs update):**
    This step is usually done once. The file is included in the provided source.

    ```bash
    pnpm exec msw init public/ --save
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

**Mock User Credentials:**

You can log in with the following mock credentials:

- Username: `user1`
- Access to: Tenant A (Alpha Bank), Tenant B (Beta Financial)
- Username: `user2`
- Access to: Tenant B (Beta Financial)
- Any other username will be treated as invalid for this mock.
- Password: `password` (any password works with the current mock setup)

## Architectural Rationale & Key Decisions

### 1. Multi-Tenancy and Label Context Management

- **URL-Driven Context:** The current tenant and label are primarily derived from the URL (`/app/:tenantId/:labelId/...`). This ensures deep-linking capabilities, bookmarking, and a clear source of truth for the context.
- **Zustand for Global State:**
- `authStore`: Manages user authentication state, user details (including accessible tenants).
- `tenantStore`: Manages all available tenant/label configurations, the currently active tenant/label details, and the dynamically computed theme for the active tenant.
- **`ProtectedAppLayout`:** This component acts as a guard for routes requiring tenant/label context. It parses `tenantId` and `labelId` from the URL, validates them against the user's permissions and available data, and updates the `tenantStore` accordingly. If the context is invalid or missing, it redirects the user (e.g., to a selection page).
- **`TenantLabelSelectionPage`:** Allows users to pick a tenant and then a label if they land without a valid context or wish to switch contexts in a more guided way (though the Header also provides direct switchers).

### 2. Branding and UI Customization

- **Styled Components Theming:** `styled-components`' `ThemeProvider` is used to inject a dynamic theme object throughout the component tree.
- `ThemeProviderWrapper.tsx`: A wrapper component that listens to the `currentTenantDetails` from `tenantStore`. It merges the default theme with the specific tenant's theme overrides (colors, logo URL) and provides this merged theme to the `ThemeProvider`.
- `src/config/theme.ts`: Defines the `Theme` interface and a `defaultTheme`.
- `src/config/mockData.ts`: Contains tenant-specific theme overrides (e.g., `primaryColor`, `logoUrl`).
- **Dynamic Logo Display:** Logos are stored in `public/assets/logos/` and referenced by `logoUrl` in the tenant's theme configuration. The `Header` component dynamically displays the correct logo.

### 3. State Management (Zustand)

- **Why Zustand?** It's lightweight, has a simple API, minimal boilerplate, and is powerful enough for this application's needs. It makes managing global state like authentication and tenant context straightforward without the verbosity of Redux.
- **Stores:**
- `authStore.ts`: Handles user session, token, and user profile (including accessible tenants).
- `tenantStore.ts`: Stores all tenant configurations, the current tenant/label ID, and derived data like the current theme and details for the active tenant/label.

### 4. Routing (React Router DOM v6)

- Clear separation of public routes (`/login`) and protected application routes (`/app/...`).
- Nested routing is used under `ProtectedAppLayout` for tenant/label-specific views like Dashboard and Settings.
- Programmatic navigation (`useNavigate`) is used for redirects and context switching.

### 5. API Mocking (MSW - Mock Service Worker)

- **Why MSW?** Allows for developing the frontend independently of a live backend. MSW intercepts actual network requests at the service worker level, providing realistic API mocks.
- **`src/mocks/handlers.ts`:** Defines mock responses for API endpoints like `/api/login` and `/api/tenants`.
- **`src/mocks/browser.ts`:** Sets up the MSW worker for browser environments.
- **Integration in `main.tsx`:** The MSW worker is started conditionally in development mode.

### 6. Developer Experience

- **TypeScript:** Enforces type safety, improves code readability, and provides better autocompletion.
- **Vite:** Offers extremely fast HMR (Hot Module Replacement) and build times.
- **Modular Structure:** Code is organized into directories by concern (components, features, pages, store, types, etc.), promoting maintainability.
- **Clear Naming Conventions:** Efforts were made to use clear and consistent naming for files, variables, and functions.

## How Tenant/Label Context Works

1.  **Login:** User logs in. `authStore` receives user data, including a list of `accessibleTenantIds`. `tenantStore` loads all tenant configurations (from mock data).
2.  **Initial Redirect:** User is redirected to `/app/:tenantId/:labelId/...`. If `tenantId` or `labelId` are missing from a previous session or direct navigation, the system might redirect to `/app/select-context` or attempt to auto-select the first available tenant/label for the user and update the URL.
3.  **`ProtectedAppLayout` Activation:**

- This layout component wraps all authenticated and context-aware routes.
- It extracts `tenantId` and `labelId` from `useParams()`.
- It validates these IDs:
- Does the tenant exist?
- Does the user have access to this tenant (checks `authStore.user.accessibleTenantIds`)?
- Does the label exist within this tenant?
- If valid, it calls `tenantStore.setCurrentTenantAndLabel(tenantId, labelId)`. This action updates the store with the details of the active tenant and label, including computing the `currentTheme`.
- If invalid, it navigates the user to `/app/select-context`.

4.  **Theme Application:** `ThemeProviderWrapper` reacts to changes in `tenantStore.currentTheme` and updates the theme provided to `styled-components`.
5.  **UI Display:** Components like the `Header` read from `tenantStore` (e.g., `currentTenantDetails`, `currentLabelDetails`) to display names, logos, and provide context switchers.
6.  **Switching Context:**

- The `Header` contains dropdowns to switch tenants and labels.
- Selecting a new tenant/label triggers a navigation to the new URL (e.g., `/app/newTenant/newLabel/dashboard`).
- This re-triggers the validation and context update logic in `ProtectedAppLayout`.


## ##
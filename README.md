## How To run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Accessibility

This project uses [https://ui.shadcn.com/](shadcn/ui), which is built on top of Radix UI. Radix provides unstyled, accessible primitives for building high-quality UI components. This means:

- Keyboard navigation and focus management are handled out of the box

- ARIA attributes are properly applied

- Screen reader support is baked in

- Components follow WAI-ARIA accessibility best practices

By relying on well-tested, accessible building blocks, we avoid reinventing the wheel and can focus on shipping actual features instead of rebuilding the same patterns from scratch.

## State Management

Used Next.js search parameters for global state management—a built-in feature that stores state in the URL, enabling server components to fetch data based on param updates. This approach reduces bundle size, enhances security and performance, and improves SEO. It also eliminates the need for complex client-side state management. Additional benefits include:

- Bookmarkable and shareable URLs

- Built-in support for analytics and tracking via URL-based filters

- Server-side rendering with direct access to URL params for initializing state

Please check [https://nextjs.org/learn/dashboard-app/adding-search-and-pagination](nextjs-official-link) for detailed explanation if needed.

## New React Features

used react useOptimistic hook for optimistic updates. and useTransition hook to update the state without blocking the UI.

## Form Management

since the add note form is simple and contains only one field, I used useState only for managing the form, in bigger form I would use react-hook-form with zod for validation.

## Real World Like App

I tried to keep the app as real-world-like as possible. by grouping dashboard routes and providing navigation which is the needed case for most real-world apps/dashboard.

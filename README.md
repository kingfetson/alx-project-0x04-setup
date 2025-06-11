# ALX Project 0x04: Next.js Project Setup

This project demonstrates the basic setup of a Next.js application with a simple directory structure and a sample page.

---

## Features

- Basic Next.js project structure
- Example page component
- Ready for further development

---

## Project Structure

```
alx-project-0x04/
├── pages/
│   └── counter-app.tsx
├── README.md
└── ...
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev -- -p 3000
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Open the project in your browser to see the sample counter app page.
- Use this project as a starting point for more advanced features.

---

# ALX Project 0x05: Next.js Counter App with ContextAPI Global State

This project demonstrates global state management in a Next.js application using **React ContextAPI**. The counter value is accessible and updatable from multiple components (e.g., Header and CounterApp) without prop drilling.

---

## Features

- **ContextAPI** for global state management
- Counter value is shared between Header and CounterApp components
- Modern Next.js structure with TypeScript
- Clean, responsive UI with global styles

---

## Project Structure

```
alx-project-0x05/
├── components/
│   └── layouts/
│       ├── Header.tsx
│       └── Layout.tsx
├── context/
│   └── CountContext.tsx
├── pages/
│   ├── _app.tsx
│   └── counter-app.tsx
├── styles/
│   └── globals.css
└── ...
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev -- -p 3000
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Click the **Counter App** button from the home screen.
- Use the **Increment** and **Decrement** buttons to change the counter.
- The current count is displayed in both the Header and the CounterApp page.

---

## Key Files

### `context/CountContext.tsx`

Sets up the ContextAPI provider and hook:

```tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface CountContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const CountContext = createContext<CountContextProps | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => (count > 0 ? count - 1 : 0));

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be within a Count Provider");
  }
  return context;
};
```

### `pages/_app.tsx`

Wraps the app with the Context Provider:

```tsx
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CountProvider } from "@/context/CountContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountProvider>
  );
}
```

### `pages/counter-app.tsx`

Counter page using ContextAPI:

```tsx
import { useCount } from "@/context/CountContext";

const CounterApp: React.FC = () => {
  const { count, increment, decrement } = useCount();

  // ... UI code ...
};
```

### `components/layouts/Header.tsx`

Header displays the current count from ContextAPI:

```tsx
import { useCount } from "@/context/CountContext";

const Header: React.FC = () => {
  const { count } = useCount();
  // ... UI code ...
};
```

---



# ALX Project 0x06: Next.js Counter App with Redux Global State

This project demonstrates global state management in a Next.js application using **Redux Toolkit**. The counter value is accessible and updatable from multiple components (e.g., Header and CounterApp) without prop drilling.

---

## Features

- **Redux Toolkit** for global state management
- Counter value is shared between Header and CounterApp components
- Modern Next.js structure with TypeScript
- Clean, responsive UI with global styles

---

## Project Structure

```
alx-project-0x06/
├── components/
│   └── layouts/
│       ├── Header.tsx
│       └── Layout.tsx
├── pages/
│   ├── _app.tsx
│   └── counter-app.tsx
├── store/
│   └── store.ts
├── styles/
│   └── globals.css
└── ...
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev -- -p 3000
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- Click the **Counter App** button from the home screen.
- Use the **Increment** and **Decrement** buttons to change the counter.
- The current count is displayed in both the Header and the CounterApp page.

---

## Key Files

### `store/store.ts`

Sets up the Redux store and counter slice:

```typescript
import { configureStore, createSlice  } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value > 0 ? state.value -= 1 : 0 }
  }
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

export const { increment, decrement } = counterSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
```

### `pages/_app.tsx`

Wraps the app with the Redux Provider:

```tsx
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
```

### `pages/counter-app.tsx`

Counter page using Redux state and dispatch:

```tsx
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, AppDispatch, increment, decrement } from "@/store/store";

const CounterApp: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch: AppDispatch = useAppDispatch()

  // ... UI code ...
};
```

### `components/layouts/Header.tsx`

Header displays the current count from Redux:

```tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Header: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  // ... UI code ...
};
```

---

## License

This project is for educational purposes as part of the ALX curriculum.
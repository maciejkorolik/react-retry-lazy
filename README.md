# react-retry-lazy

`react-retry-lazy` is a customizable wrapper for React.lazy() that handles errors gracefully and retries importing modules when necessary. It provides a more resilient and robust application while enhancing the user experience by reducing app crashes caused by failed dynamic imports.

## Features

- Automatically retries importing modules on failure
- Customizable number of retries and delay between retries
- Optional full-page reload if all retries fail
- Fully typed with TypeScript
- Zero dependencies (requires React as a peer dependency)

## Requirements

- React 17.0.0 or later

## Installation

Install `react-retry-lazy` using your preferred package manager:

**npm:**

```bash
npm install react-retry-lazy
```

**yarn:**

```bash
yarn add react-retry-lazy
```

**pnpm:**

```bash
pnpm add react-retry-lazy
```

## Usage

Here's an example of how to use react-retry-lazy:

```jsx
import React, { Suspense } from "react";
import { retryLazy } from "react-retry-lazy";

const MyComponent = retryLazy(() => import("./MyComponent"), "MyComponent", {
  retries: 3,
  delay: 1000,
  enablePageReload: true,
});

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

Simply wrap your dynamic imports with retryLazy(). The function takes three arguments:

1. `importFn`: A function that returns a Promise of the module you want to import.
2. `moduleName`: A string representing the name of the module (used for sessionStorage key when reloading the page).
3. `options` (optional): An object with the following properties:
   - `retries`: The number of retries before giving up (default: 3)
   - `delay`: The delay between retries in milliseconds (default: 1000)
   - `enablePageReload`: Whether to perform a full-page reload if all retries fail (default: true)

Please note that this package requires React 17.0.0 or later as a peer dependency. Make sure to install the required version of React in your project.

For more information and advanced usage, please refer to the [GitHub repository](https://github.com/maciejkorolik/react-retry-lazy).

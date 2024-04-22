---
sidebar_position: 1
---

# Getting Started

Welcome to our guide for learning algorithms and data structures with TypeScript! We'll guide you through setting up TypeScript, ensuring you're equipped to start coding right away.

If you're new to TypeScript, don't worry! We'll provide explanations and examples every step of the way to help you understand the fundamentals.

Let's dive in and start our journey into the world of algorithms and data structures!

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.
  - After installation, verify that the commands `node -v` and `npm -v` are functioning in your terminal. You may need to restart your system for these commands to work properly.

- Any code editor or IDE of your choice. We recommend using [Visual Studio Code](https://code.visualstudio.com/), but here are some other popular options:
  - [Fleet](https://www.jetbrains.com/fleet/)
  - [WebStorm](https://www.jetbrains.com/webstorm/)
  - [Zed](https://zed.dev/)
  - [Sublime Text](https://www.sublimetext.com/)

### Running TypeScript code

To run TypeScript code, you need to have TypeScript installed. Below are the installation methods:

#### 1. Project installation (recommended):
  - Create an empty directory for your project, and navigate to it in your terminal.
  - Run the following commands in your terminal:
    ```bash
    npm init -y
    npm install typescript tsx -D
    ```
  - After installation, ensure that the commands `npx tsc -v` and `npx tsx -v` are functioning in your terminal, returning the version of TypeScript installed.

#### 2. Global installation:
  - Run the following command in your terminal:
    ```bash
    npm install typescript tsx -g
    ```
  - After installation, ensure that the commands `tsc -v` and `tsx -v` are functioning in your terminal, returning the version of TypeScript installed.

The first approach is recommended because it allows you to have different versions of TypeScript for different projects. The `npx` prefix runs the TypeScript version installed in the project's `node_modules` directory.

Having it installed globally is also fine, but it's not recommended because it can lead to version conflicts between projects.

#### 3. Hello World

Create a new file named `hello.ts` with the following content:

```typescript
const message: string = 'Hello, world!'
console.log(message)
```

With the terminal open in the same directory as the file, run the following command:

```bash
npx tsx hello.ts
```

You should see the following output if everything is set up correctly:

```bash
Hello, world!
```
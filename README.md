# Node Package TypeScript Template

This repository is a boilerplate for creating and publishing Node.js packages written in TypeScript. It is pre-configured with [XO](https://github.com/xojs/xo) for linting, [Jest](https://jestjs.io/) for testing, [Prettier](https://prettier.io/) for formatting, and [Husky](https://typicode.github.io/husky/) for git hooks.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Directory Structure](#directory-structure)
  - [Configuration](#configuration)
- [Scripts](#scripts)
  - [Development](#development)
  - [Build](#build)
  - [Test](#test)
  - [Lint](#lint)
  - [Publish](#publish)
- [Configuration](#configuration)
  - [TypeScript](#typescript)
  - [ESLint and Prettier](#eslint-and-prettier)
  - [Husky](#husky)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **TypeScript**: Write strongly typed JavaScript code for fewer bugs and better maintainability.
- **XO**: Opinionated and zero-configuration linting on top of ESLint.
- **Prettier**: Automatic code formatting for a clean, standardized look.
- **Jest**: Unit testing framework for reliable code.
- **Husky**: Pre-commit hooks to enforce linting and tests before code is committed.
- **Pre-configured Scripts**: Common commands (test, build, publish, etc.) are ready to go.

---

## Getting Started

### Installation

1. **Use this template**: Click the green **Use this template** button on the repository page (if available).  
   Alternatively, you can manually clone this repo:

   ```bash
   git clone https://github.com/SebSV-GitHub/Node-package-template.git
   ```

2. **Install dependencies**:

   ```bash
   cd Node-package-template
   npm install
   ```

3. **Update package details**:

   - Update the `name`, `version`, `description`, `author`, and other fields in `package.json` to match your new package details.

4. **Build the example project**:

   ```bash
   npm run build
   ```

5. **Install the integration test project**:

   ```bash
   cd tests/integration
   npm install
   ```

You are now ready to start coding!

### Configuration

- **TypeScript**:
  - Primary settings in `tsconfig.json` (for development).
  - `ts-jest` settings in `./tests/tsconfig.json` (to include `tests` folder)
- **XO**:

  - Configuration is typically managed in the `xo` configuration file `.xo-config.json`.
  - Example:

    ```json
    {
      "semicolon": false,
      "space": 2,
      "envs": ["node", "jest"],
      "prettier": true
    }
    ```

- **Jest**:
  - Configuration in `jest.config.ts`.
- **Husky**:
  - The repository is pre-configured with Husky hooks:
    - **Pre-commit**: Runs lint and tests before you can commit.
  - This helps keep your main branch clean and ensures code quality at every commit.

### Directory Structure

```bash
.
├── .github/                    # GitHub Actions and workflows
├── .husky/                     # Git Hooks
├── src/                        # Your TypeScript source files
│   ├── index.ts
│   └── types                   # Custom types folder
├── test/                       # Test framework
│   ├── integration             # Example project that imports the package from the dist folder
│   │   ├── index.ts
│   │   ├── package.json        # This contains your module as a dependency pointing to dist
│   │   └── tsconfig.json       # This acts as a standalone TypeScript project
│   └── unit
│       ├── index.test.ts
│       └── tsconfig.json       # Additional configuration to include unit test only for ts-jest
├── .editorconfig
├── .gitignore
├── .lintstagedrc
├── .prettierrc                 # To use prettier default with xo, defaults need to be set in this file
├── .xo-config.json
├── gulpfile.ts
├── jest.config.ts
├── LICENSE
├── package.json
└── package-lock.json
```

---

## Scripts

All key scripts are defined in the `package.json` file.

### Development

There is no default dev server (since this is a package, not an app), but you can run a continuous test workflow (build and test) with:

```bash
npm run watch
```

### Build

```bash
npm run build
```

- Compiles your TypeScript files to JavaScript in ESM.
- Outputs compiled files to the `dist/` directory.

### Test

```bash
npm test
```

- Runs all tests in the `test/unit` directory using Jest (`ts-jest`).

### Lint

```bash
npm run lint
```

- Runs XO checks according to the rules specified in `.xo-config.json`.
- Automatically fixes fixable issues with:

> **Note**: This template is designed to be publish using GitHub Actions.

---

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo and create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Make changes and test thoroughly.
3. Commit and push to your fork.
4. Create a Pull Request describing your changes.

---

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use and adapt it for your own projects!

---

**Happy coding and thanks for using the Node Package Template!** If you have any questions or run into any issues, feel free to open an issue on this repository.

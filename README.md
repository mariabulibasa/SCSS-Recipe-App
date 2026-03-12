## Setup and Run Instructions

1. Clone the repository:

```bash
git clone <repository-url>

cd css-project

npm install

npm run dev

npm run build
```

## Transformation of authored CSS into the final CSS used by the browser

In this project, styles are written using **SCSS**, which is a CSS preprocessor that extends standard CSS with additional features such as variables, nesting, and modular imports.

The SCSS files are located in the `src/styles/` directory and are organized into multiple partial files (for example `_layout.scss`, `_recipe-card.scss`). These partials are combined through the main stylesheet `main.scss`, which uses the `@use` directive to import the different style modules.

During development and build, the **Vite bundler** processes these SCSS files using the Sass compiler. The compiler converts SCSS syntax into standard CSS that browsers can understand. At the same time, Vite resolves all imports, merges the styles into generated CSS assets, and optimizes them for the browser.

As a result, the CSS delivered to the browser is **generated CSS**, which may combine rules from multiple SCSS source files. Because of this transformation process, the final CSS used by the browser does not correspond one-to-one with the original authored SCSS files.

## Where to find the generated CSS and source maps

After building the project, the generated CSS files and source maps can be found in the `dist/assets/` directory.

To generate the production build, run:

```bash
npm run build
```

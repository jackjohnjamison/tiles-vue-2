# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## TODO
- Switch to enums for game modes, maybe
- Use the improved image import script from tanks - looks harder than I thought!
- Move Math.round into common draw function, or even just remove delta?
- Add TypeScript, maybe just for the pinia stores to begin with?
- CSS linting / formatting 
https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
https://stylelint.io/user-guide/get-started/

- try mix-blend mode with isolate to reduce the use of canvas top or mid
https://stackoverflow.com/questions/47203122/css-apply-mix-blend-mode-property-to-specific-elements-only

## Bugs
- Sometimes when transitioning levels the movement markers are set from and origin that is not under the player
- Investigate unresponsive clicks


## Referance
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/
https://dream.ai/create

custom cursors
https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/
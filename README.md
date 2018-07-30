# BAAAHS Sheep Simulator V2

A new web app based sheep light simulator using Three.js.  Based on the Three.js boilerplate project by paulmg.
https://github.com/paulmg/ThreeJS-Webpack-ES6-Boilerplate/

## Getting started
Install dependencies:

```
npm install
```

Then run dev script:

```
npm run dev
```

Spins up a webpack dev server at localhost:8080 and keeps track of all js and sass changes to files. Only reloads automatically upon save of js files.

## Build
```
npm run build
```

Cleans existing build folder while linting js folder and then copies over the public folder from src. Then sets environment to production and compiles js and css into build.

## Other NPM Scripts
You can run any of these individually if you'd like with the npm run command:
* prebuild - Cleans build folder and lints `src/js`
* clean - Cleans build folder
* lint - Runs lint on `src/js` folder and uses `.eslintrc` file in root as linting rules
* webpack-server - Create webpack-dev-server with hot-module-replacement
* webpack-watch - Run webpack in dev environment with watch
* dev:sass - Run node-sass on `src/css` folder and output to `src/public` and watch for changes
* dev:js - Run webpack in dev environment without watch
* build:dir - Copy files and folders from `src/public` to `build`
* build:sass - Run node-sass on `src/css` and output compressed css to `build` folder
* build:js - Run webpack in production environment

## Input Controls
* Arrow controls will pan
* Mouse left click will rotate/right click will pan
* Scrollwheel zooms in and out

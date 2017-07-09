# macgyvr-foundation
Macgyvr project foundation/scaffolding

![Alt][1]
[1]: /foundation.jpg "Foundation"

This is a foundation or project to use for scaffolding a MacgyVR project (Three.js + WebVR Boilerplate + Tween.js + more)

Intended use is that you'd clone this project, and use this as a starting point for your WebVR project

To start, npm install to get the bare minimum dependencies. A sample project can be run at index-dev.html on your own webserver.

This project contains a built-in webserver that also launches a JSON based 3D editor (a slightly modified ThreeJS Editor which can originally be found at https://threejs.org/editor/)

To use this built-in webserver, run:
> "npm run"

To access your project go to http://127.0.0.1:8125/index-dev.html
To access the editor, go to http://127.0.0.1:8125/editor/index.html

Alternately, to load these pages at server start:

> "npm run preview"

or 

> "npm run editor"

The editor (the only modification from the original editor) will auto-save your scene in the path listed in the input box at the top right of the page.

The default path is "src/assets/tempscene.json", and the sample project will load from here as specified in the "src/app.js"

Building
========

Ideally, you'd build and concat your ES6 modules for a production once you're satisfied with your dev environment

Provided is a gulp based babelify task that will do this for you. Assuming you'd like to use this, make sure gulp is installed globally:

> npm install -g gulp

Then place the contents of build.package.json into package.json, and run

> npm install

Next run 

> gulp

Now, you should be able to run your webserver and visit 
http://127.0.0.1:8125/index-build.html

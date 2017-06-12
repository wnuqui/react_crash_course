# Crash Course on React
These are basic React applications for my crash course on React. The applications are mostly in ES5 as React site is still using ES5 for their getting started and tutorial guides during the time I took the crash course.

And then I ported `comments_box` using ES6 with browserify, babel and gulp.

Take note that these are applications I followed from Facebook's old React site where ES5 is still being used.

## How to run each simple React applications

Clone the app and for each application refer to the instructions below.

### ES5

#### comments_box

1. Go to `es5/comments_box`, and do

```bash
$ PORT=3001 ruby server.rb # serve static files and handle POST /api/comments
```

2. Then visit http://localhost:3001 to use the app.


#### Other apps

1. Go to specific folder, say`es5/component_with_external_plugin`, and do

```bash
$ httpster -p 3002 # or any tool to serve static files
```

2. Then visit http://localhost:3002 to use the app.

### ES6

1. Go to `es6/comments_box/frontend`, and do

```bash
$ npm install
$ ./node_modules/.bin/gulp build
```

2. Go to `es6/comments_box`, and do

```bash
$ PORT=3001 ruby server.rb # serve static files and handle POST /api/comments
```

3. Then visit http://localhost:3001/index.html to use the app.

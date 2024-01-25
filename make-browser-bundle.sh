# Builds the browser bundle for labyrinthos
browserify ./browser-shim.js --standalone LABY -o ./dist/labyrinthos.js -t babelify

# Copy the labyrinthos.js file to ./examples/browser
cp ./dist/labyrinthos.js ./examples/browser/labyrinthos.js

# Copy the labyrinthos.js file to ../yantra.gg/public/js
cp ./dist/labyrinthos.js ../yantra.gg/public/labyrinthos.js
# Copy the labyrinthos.min.js file to ../yantra.gg/public/js
cp ./dist/labyrinthos.min.js ../yantra.gg/public/labyrinthos.min.js

# Copy the ./examples/browser folder to ../yantra.gg/public/labyrinthos
cp -r ./examples/browser/ ../yantra.gg/public/labyrinthos


# Minifies the generated bundle and creates a source map
uglifyjs ./dist/labyrinthos.js --compress --mangle --source-map "url='labyrinthos.min.js.map',root='../',includeSources" -o ./dist/labyrinthos.min.js

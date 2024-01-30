let previousSeed = null;
let map;
$(document).ready(function () {

  // Listen for changes in map mode and toggle the depth input accordingly
  $('input[name="mapMode"]').change(function () {
    if ($('#mapMode3d').is(':checked')) {
      // Show depth input for 3D mode
      $('label[for="mapDepth"]').show();
      // set depth to 3 with a min value of 2
      $('#mapDepth').val(Math.max(3, $('#mapDepth').val()));
    } else {
      // Hide depth input for 2D mode
      $('label[for="mapDepth"]').hide();
      // set depth to 1 and hide the input
      $('#mapDepth').val(1);

    }
    // regenerate the map
    generateMap();
  });

  // Listen for changes in map size and update the width and height accordingly
  $('input[name="mapSize"]').change(function () {
    if ($('#mapSizeTiny').is(':checked')) {
      $('#mapWidth').val(8);
      $('#mapHeight').val(8);
    }
    else if ($('#mapSizeSmall').is(':checked')) {
      $('#mapWidth').val(16);
      $('#mapHeight').val(16);
    } else if ($('#mapSizeMedium').is(':checked')) {
      $('#mapWidth').val(32);
      $('#mapHeight').val(32);
    } else if ($('#mapSizeLarge').is(':checked')) {
      $('#mapWidth').val(64);
      $('#mapHeight').val(64);
    }
    // regenerate the map
    generateMap();
  });

  // Initial check to set the correct display state for the depth input
  if ($('#mapMode3d').is(':checked')) {
    $('label[for="mapDepth"]').show();
  } else {
    $('label[for="mapDepth"]').hide();
  }

  // Determine the position of the static logo
  const staticLogoPosition = $('.logoStatic').offset().top;

  // Set the custom property for the animation endpoint
  // document.documentElement.style.setProperty('--animation-end-top', `${staticLogoPosition}px`);
  // Listen for the end of the animation on the animated logo
  $('.logoAnim').on('animationend', function () {
    $(this).remove();
  });

  // Dynamically populate the dropdown
  const generators = { ...LABY.mazes, ...LABY.terrains, ...LABY.shapes };
  for (const generator in generators) {
    // don't add generators that contain the string "3D"
    if (generator.includes('3D')) {
      continue;
    }
    $('#generatorType').append(new Option(generator, generator));
  }
  // $('#generatorType').val('FaultLine');
  $('#generatorType').change(function () {
    previousSeed = map.mersenneTwister.currentSeed;
    generateMap();
  });

  $('#stackingModeSelection').change(function () {
    previousSeed = map.mersenneTwister.currentSeed;
    generateMap();
  });

  $('.mapSettings').change(function () {
    previousSeed = map.mersenneTwister.currentSeed;
    // $('#generateMap').click();
    generateMap();
  });

  $('.mantraTiled').click(function () {
    let id = $(this).attr('id');
    // takes the current tileMap.data and opens a link to
    // the mantra Tiled world with tiledata?=tileMap.data
    let host = 'https://yantra.gg/mantra/tiled';
    // for dev mode
    // host = 'http://192.168.1.80:7777/tiled.html'
    let queryString = '?tiledmap=' + JSON.stringify(map.toTiledJSON());

    // for 2d maze widh 2d graphics use css
    // for 2d maze with 3d graphics use three
    // for 3d maze with 3d graphics use three
    let graphics = 'css';

    if (id === 'mantra3DTiled') {
      graphics = 'three';
      if ($('#mapMode3d').is(':checked')) {
        graphics = 'babylon';
      }
    }

    // alert(graphics)
    queryString += '&graphics=' + graphics;

    let url = host + queryString;
    console.log('url', url);

    // open new url in new tab
    window.open(url, '_blank');

  });

  $('#downloadMap').click(async function () {
    const json = JSON.stringify(map.toTiledJSON(), true, 2);
    const jsonBlob = new Blob([json], { type: 'application/json' });
    const jszip = new JSZip();

    // Add the map JSON to the zip
    jszip.file(`labyrinthos_map.tmj`, jsonBlob);
    console.log("jj", jszip)
    // List of image URLs (you might want to dynamically generate this list)
    const images = [
      'https://yantra.gg/img/game/tiles/tile-bush.png',
      'https://yantra.gg/img/game/tiles/tile-grass.png',
      'https://yantra.gg/img/game/tiles/tile-block.png',
      'https://yantra.gg/img/game/tiles/tile-path-green.png',
      'https://yantra.gg/img/game/tiles/tile-path-brown.png',
      // ... other image URLs ...
    ];

    // Fetch each image and add it to the zip
    for (const imageUrl of images) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      jszip.file(imageUrl.split('/').pop(), blob);  // Extract filename from URL
    }

    // Generate the zip file
    jszip.generateAsync({ type: 'blob' }).then(function (content) {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.download = 'labyrinthos_assets.zip';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

  $('#generateMap').click(function () {
    previousSeed = null;
    generateMap();
  });

  /*
  // Usage example
  runFunction(() => {
    // Your function logic here
    console.log('Function is running');
    return 'Function result';
  }, { maxTime: 1000 }) // Set maxTime to 1000 milliseconds
    .then(result => console.log(result))
    .catch(error => console.error(error));
  function runFunction(func, options) {
    return new Promise((resolve, reject) => {
      // Timer to enforce maxTime
      const timer = setTimeout(() => {
        reject(new Error('Function timed out'));
      }, options.maxTime);

      // Attempt to run the function
      try {
        const result = func();
        clearTimeout(timer); // Clear the timer if function completes in time
        resolve(result);
      } catch (error) {
        clearTimeout(timer); // Clear the timer if function throws an error
        reject(error);
      }
    });
  }
  */

  function generateMap() {
    let is3D = $('#mapMode3d').is(':checked');
    // Show or hide stacking mode selection based on map mode

    map = new LABY.TileMap({
      width: $('#mapWidth').val(),
      height: $('#mapHeight').val(),
      depth: $('#mapDepth').val(),
      is3D: is3D
    });

    map.fill(1);
    let seed = map.mersenneTwister.currentSeed;
    if (previousSeed) {
      seed = previousSeed;
    }

    map.seed(seed);
    let generatorType = $('#generatorType').val();
    let stackingMode = $('input[name="stackingMode"]:checked').val(); // Get the selected stacking mode
    if (is3D) {
      let ogGeneratorType = generatorType;
      generatorType += '3D';
      if (!generators[generatorType]) {
        console.log('stackingMode', stackingMode)
        $('#stackingModeSelection').toggle(true)

        console.log('Warning: No 3D version of this generator exists');
        console.log("Labyrinthos.js will attempt to generate a 3D map by stacking the 2D generator");
        map.data = [];

        if (stackingMode === 'unique') {
          for (let i = 0; i < map.depth; i++) {
            let mapLayer = new LABY.TileMap({
              width: $('#mapWidth').val(),
              height: $('#mapHeight').val(),
              depth: 1,
            });
            mapLayer.fill(1);
            
            //LABY.exec(ogGeneratorType, {}, mapLayer, {});
            generators[ogGeneratorType](mapLayer, {});
            
            if (LABY.terrains[ogGeneratorType]) {
              mapLayer.scaleToTileRange(4);
            }
            map.data.push(mapLayer.data);
          }
        } else if (stackingMode === 'extrude') {
          let mapLayer = new LABY.TileMap({
            width: $('#mapWidth').val(),
            height: $('#mapHeight').val(),
            depth: 1,
          });
          mapLayer.seedRandom();
          mapLayer.fill(1);
          generators[ogGeneratorType](mapLayer, {});
          if (LABY.terrains[ogGeneratorType]) {
            mapLayer.scaleToTileRange(4);
          }
          for (let i = 0; i < map.depth; i++) {
            map.data.push(mapLayer.data.slice()); // Use slice to clone the array for extrusion
          }
        }
      } else {
        // supported 3d generator, no need for stacking logic
        $('#stackingModeSelection').toggle(false);
        generators[generatorType](map, {});
        if (LABY.terrains[generatorType]) {
          map.scaleToTileRange(4);
        }
      }
    } else {
      // 2d generator
      /*
      LABY.utils.exec(generators[generatorType], {
        maxTime: 1,
        useWorker: true
      }, map, {});
      */

      generators[generatorType](map, {});
      if (LABY.terrains[generatorType]) {
        map.scaleToTileRange(4);
      }
    }

    updateMapDisplay(map);
  }

  function updateMapDisplay(map) {
    let mask = map.mask();
    if (typeof mask === 'string') {
      $('#mapContainer').text(mask);
    } else if (Array.isArray(mask)) {
      let str = mask.join('\n');
      $('#mapContainer').text(str);
    }
    $('#jsonContainer').text(JSON.stringify(map.data, null, 2));
  }

  // Trigger map generation on page load
  generateMap();
  // $('#generateMap').click();

  // set generatorType value to CellularAutomata

  let currentIndex = 1;
  const options = $('#generatorType option');

  let demoGallery = true;
  let interval = null;
  if (demoGallery) {
    interval = setInterval(() => {
      $('#generatorType').val(options[currentIndex].value).change();
      currentIndex = (currentIndex + 1) % options.length;
      // console.log('currentIndex', currentIndex)
    }, 1700); // Change every 2 seconds
  }

  // clear demo interval on click
  $(document).on('click', () => clearInterval(interval));
  // clear demo interval on keypress
  $(document).on('keypress', () => clearInterval(interval));
  // clear demo interval on scroll
  // $(document).on('scroll', () => clearInterval(interval));



});
export default function generateTiledJSON(tileMap) {
  const tiledJSON = {
    "compressionlevel": -1,
    "height": tileMap.height,
    "infinite": false,
    "layers": [
      {
        "data": tileMap.data,
        "height": tileMap.height,
        "id": 1,
        "name": "Tile Layer 1",
        "opacity": 1,
        "type": "tilelayer",
        "visible": true,
        "width": tileMap.width,
        "x": 0,
        "y": 0
      }],

    /* infinite style map with chunks 
      "editorsettings": {
        "chunksize": {
          "height": 8,
          "width": 8
        }
      },

      "layers": [{
        "chunks": [{
          "data": tileMap.data,  // Your tileMap data
          "height": tileMap.height,
          "width": tileMap.width,
          "x": 0,
          "y": 0
        }],
        "height": tileMap.height,
        "name": "Tile Layer 1",
        "opacity": 1,
        "startx": 0,
        "starty": 0,
        "type": "tilelayer",
        "visible": true,
        "width": tileMap.width,
        "x": 0,
        "y": 0
      }],
      */
    "nextlayerid": 2,
    "nextobjectid": 1,
    "orientation": "orthogonal",
    "renderorder": "right-down",
    "tiledversion": "1.10.2",
    "tileheight": 16,
    "tilesets": [
      {
        "columns": 0,
        "firstgid": 1,
        "grid":
        {
          "height": 1,
          "orientation": "orthogonal",
          "width": 1
        },
        "margin": 0,
        "name": "grass-land",
        "spacing": 0,
        "tilecount": 2,
        "tileheight": 16,
        "tiles": [ // TODO: custom tile set mappings
          {
            "id": 0,
            "image": "tile-bush.png",
            "imageheight": 16,
            "imagewidth": 16
          },
          {
            "id": 1,
            "image": "tile-grass.png",
            "imageheight": 16,
            "imagewidth": 16
          },
          {
            "id": 2,
            "image": "tile-block.png",
            "imageheight": 16,
            "imagewidth": 16
          },
          {
            "id": 3,
            "image": "tile-path-brown.png",
            "imageheight": 16,
            "imagewidth": 16
          },
          {
            "id": 4,
            "image": "tile-path-green.png",
            "imageheight": 16,
            "imagewidth": 16
          }
        ],
        "tilewidth": 16
      }],
    "tilewidth": 16,
    "type": "map",
    "version": "1.10",
    "width": tileMap.width
    // Add your tilesets and other necessary properties here
  };

  return tiledJSON;
}
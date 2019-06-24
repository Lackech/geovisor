import Map from './src/ol/Map.js';
import View from './src/ol/View.js';
import {Group as LayerGroup, Tile as TileLayer} from './src/ol/layer.js';
import {fromLonLat} from './src/ol/proj.js';
import OSM from './src/ol/source/OSM.js';
import TileWMS from './src/ol/source/TileWMS.js';
import Projection from './src/ol/proj/Projection.js';
import {defaults as defaultControls} from './src/ol/control.js';
import MousePosition from './src/ol/control/MousePosition.js';
import {createStringXY} from './src/ol/coordinate.js';

//Posicion CR
const costaRicatonLonLat = [-84.9534256, 9.5499180];
const costaRicaWebMercator = fromLonLat(costaRicatonLonLat);
const view = new View({
  center: costaRicaWebMercator,
  zoom: 7.8
});

//Coordenadas de puntero
var mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});
/*
var projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function(event) {
  mousePositionControl.setProjection(event.target.value);
});

var precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function(event) {
  var format = createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});
*/

//Capas
const layers = [
  new TileLayer({
    source: new OSM()
  }), new LayerGroup({//Layer 10
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'unidades_fitogeograficas_2014', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'zonas_de_vida_2008', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 20
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'areas_conservacion', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 30
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'sinac_oficinas', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 40
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'areas_silvestres_protegidas', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'corredores_biologicos', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://ceniga.sinac.go.cr/geoserver/CENIGA/wms',
          params: {'LAYERS': 'zona_inalienable_ley_lxv', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  })
];


const map = new Map({
  controls: defaultControls().extend([mousePositionControl]),
  layers: layers,
  target: 'map',
  view: view
});


//Funciones para ligar las capas
function bindInputs(layerid, layer) {
  const visibilityInput = $(layerid + ' input.visible');
  visibilityInput.on('change', function () {
    layer.setVisible(this.checked);
  });
  visibilityInput.prop('checked', layer.getVisible());

  const opacityInput = $(layerid + ' input.opacity');
  opacityInput.on('input change', function () {
    layer.setOpacity(parseFloat(this.value));
  });
  opacityInput.val(String(layer.getOpacity()));
}


map.getLayers().forEach(function (layer, i) {
  bindInputs('#layer' + i, layer);
  if (layer instanceof LayerGroup) {    
    layer.getLayers().forEach(function (sublayer, j) {
      bindInputs('#layer' + i + j, sublayer);
    });
  }
});

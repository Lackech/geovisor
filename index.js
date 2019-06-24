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
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:areas_de_conservacion_18', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:areas_silvestres_protegidas', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:corredores_biologicos', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:inventario_nacional_humedales', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:SE_Nacional', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:ECORREGIONES', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:unidades_fitogeograficas_14', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:zonas_de_vida_08', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:zona_inalienable_ley_lxv', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:sitios_ramsar', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:montañas_costa_rica', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:patrimonio_munidal_natural', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 20
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:cuencas_hidrograficas', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 30
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:calidad_del_aire_PM10', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'CALIDADAGUA', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:mod_ambiental_useg', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 40
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:malla_de_puntos_ifn', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Maduro', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:bosque_deciduo_13', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:bosque_palmas_13', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'bosquesecundario', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:paramo_13', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'pastos', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:plantaciones_forestales_13', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:manglar_13', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'noforestal', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'nubes', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:sombra_nubes_13', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:agricultura_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:agua_2005', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'areasquemadas', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'bosquessecun', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:bosque_palmas_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'bosqueforestal2005', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:cafe_2005', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:deforestacion_2005', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:manglar_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:paramo_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:plantaciones_forestales_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:uso_urbano_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'noforestal05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:no_clasificado_05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'nubes05', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 50
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:oficinas_sinac', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'oficinashidrologicas', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 60
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:guia_hojas_terra', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'otras', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'otras', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      })
    ]
  }), new LayerGroup({//Layer 70
    layers: [
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'Ceniga:camaroneras_salineras', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
          serverType: 'geoserver'
        }),
        visible: false
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://18.221.165.145:8080/geoserver/Ceniga/wms',
          params: {'LAYERS': 'consecionesagua', 'TILED': true, transparent: true, format: 'image/png', projection: new Projection('EPSG:4326'), isBaseLayer: false, visibility: false, singleTile: true, ratio: 1.1},
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

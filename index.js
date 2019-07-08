import Map from './src/ol/Map.js';
import View from './src/ol/View.js';
import {Group as LayerGroup, Tile as TileLayer} from './src/ol/layer.js';

import OSM from './src/ol/source/OSM.js';
import TileWMS from './src/ol/source/TileWMS.js';
import Projection from './src/ol/proj/Projection.js';
import {defaults as defaultControls, ScaleLine} from './src/ol/control.js';
import MousePosition from './src/ol/control/MousePosition.js';
import {createStringXY} from './src/ol/coordinate.js';
import Control from './src/ol/Control/control.js';
import Pixel from './src/ol/pixel.js';
import WMSGetFeatureInfo from './src/ol/format/WMSGetFeatureInfo';
import {toStringHDMS} from './src/ol/coordinate.js';
import {fromLonLat, toLonLat, transform, addProjection, get} from './src/ol/proj.js';
import {register} from 'ol/proj/proj4.js';
import proj4 from 'proj4';



var wmsSource = new TileWMS({
  url: 'https://ahocevar.com/geoserver/wms',
  params: {'LAYERS': 'ne:ne', 'TILED': true},
  serverType: 'geoserver',
  crossOrigin: 'anonymous'
});

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

//Coordenadas de puntero
var mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:5367',
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


*/

proj4.defs("EPSG:5367","+proj=tmerc +lat_0=0 +lon_0=-84 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");


register(proj4);
var proj4326 = new Projection("EPSG:4326");
var projgoogle = new Projection("EPSG:900913");
var projCRTM = new Projection({
  code: 'EPSG:5367',  
});
addProjection(projCRTM);



//Posicion CR
const costaRicatonLonLat = [-84.9534256, 9.5499180];
const costaRicaWebMercator = fromLonLat(costaRicatonLonLat);
const view = new View({
  center: costaRicaWebMercator,
  zoom: 7.8
  
  
});


const map = new Map({
  //controls: defaultControls().extend([mousePositionControl]),
  controls: defaultControls().extend([
    new ScaleLine()
  ]),
  
  layers: layers,
  target: 'map',
  view: view
});

map.on('pointermove', function(e) {
  // When user was dragging map, then coordinates didn't change and there's
  // no need to continue
  if (e.dragging) {      
      return;
  }
  
  var pixel = e.pixel;
  var coordCR = toLonLat(pixel);

  var coord = toLonLat(e.coordinate);
  var lonlat = transform(coord,projgoogle,proj4326);
  var lonlatPix = transform(e.coordinate,projgoogle,proj4326);
  var coord84 = "<b>WGS84: </b>" + toStringHDMS(lonlat);
  
  
  
  var punto =  transform(e.coordinate,projgoogle,projCRTM);
  var puntillo = toLonLat(punto,'EPSG:5367');
  //var punto = fromLonLat(e.pixel,'EPSG:5367');
  console.log(coord84);
  var coordCRTM= "<b>CRTM05 </b>X: " + (punto[0]).toFixed(2) + "  Y: " + (punto[1]).toFixed(2);				
  
  document.getElementById("dcoords").innerHTML = '<table ><tr><td class="tdcoord">'+ coordCRTM +'</td><td class="tdcoord">'+ coord84 +'</td></tr></table>';
  
});

/*
map.on("pointermove", map, function(e) {
  var position = this.events.getMousePosition(e);
  var pixel = new OpenLayers.Pixel(e.xy.x,e.xy.y);
  var lonlat = map.getLonLatFromPixel(pixel).transform(projgoogle,proj4326);	
  console.log(lonlat);
 
  var coord84 = "<b>WGS84: </b>" + OpenLayers.Util.getFormattedLonLat(lonlat.lon,'lon','dms') + ", " + OpenLayers.Util.getFormattedLonLat(lonlat.lat,'lat','dms');				
  var punto =  lonlat.transform(proj4326,projCRTM);             				
  var coordCRTM= "<b>CRTM05 </b>X: " + (punto.lon).toFixed(2) + "  Y: " + (punto.lat).toFixed(2);				
  document.getElementById("dcoords").innerHTML = '<table ><tr><td class="tdcoord">'+ coordCRTM +'</td><td class="tdcoord">'+ coord84 +'</td></tr></table>';
}); 
*/
/***
 * 
 * Vamo a hacer click
 * 
 */




function layerInfo(){
  map.on("click", function(e) {    
    const hit = map.forEachLayerAtPixel(e.pixel, (layer) => {    
      if (layer instanceof TileLayer){ 
        
         return layer.ol_uid;
      }     
      return null;
   });
   console.log(hit);
  });
}


function ccontrol() {	
  document.getElementById('map').style.cursor = "help";
  layerInfo();
}


// Listener para info
var info = window.document.getElementById("info");
info.addEventListener("click", ccontrol);









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

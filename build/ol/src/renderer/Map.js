/**
 * @module ol/renderer/Map
 */
import {abstract, getUid} from '../util.js';
import Disposable from '../Disposable.js';
import {getWidth} from '../extent.js';
import {TRUE} from '../functions.js';
import {visibleAtResolution} from '../layer/Layer.js';
import {shared as iconImageCache} from '../style/IconImageCache.js';
import {compose as composeTransform, makeInverse} from '../transform.js';
import {renderDeclutterItems} from '../render.js';

/**
 * @abstract
 */
class MapRenderer extends Disposable {

  /**
   * @param {import("../PluggableMap.js").default} map Map.
   */
  constructor(map) {
    super();

    /**
     * @private
     * @type {import("../PluggableMap.js").default}
     */
    this.map_ = map;

    /**
     * @private
     */
    this.declutterTree_ = null;

  }

  /**
   * @abstract
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   */
  dispatchRenderEvent(type, frameState) {
    abstract();
  }

  /**
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @protected
   */
  calculateMatrices2D(frameState) {
    const viewState = frameState.viewState;
    const coordinateToPixelTransform = frameState.coordinateToPixelTransform;
    const pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;

    composeTransform(coordinateToPixelTransform,
      frameState.size[0] / 2, frameState.size[1] / 2,
      1 / viewState.resolution, -1 / viewState.resolution,
      -viewState.rotation,
      -viewState.center[0], -viewState.center[1]);

    makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
  }

  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(this: S, import("../Feature.js").FeatureLike,
   *     import("../layer/Layer.js").default): T} callback Feature callback.
   * @param {S} thisArg Value to use as `this` when executing `callback`.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
   * @return {T|undefined} Callback result.
   * @template S,T,U
   */
  forEachFeatureAtCoordinate(
    coordinate,
    frameState,
    hitTolerance,
    callback,
    thisArg,
    layerFilter,
    thisArg2
  ) {
    let result;
    const viewState = frameState.viewState;
    const viewResolution = viewState.resolution;

    /**
     * @param {boolean} managed Managed layer.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @return {?} Callback result.
     */
    function forEachFeatureAtCoordinate(managed, feature, layer) {
      if (!(getUid(feature) in frameState.skippedFeatureUids && !managed)) {
        return callback.call(thisArg, feature, managed ? layer : null);
      }
    }

    const projection = viewState.projection;

    let translatedCoordinate = coordinate;
    if (projection.canWrapX()) {
      const projectionExtent = projection.getExtent();
      const worldWidth = getWidth(projectionExtent);
      const x = coordinate[0];
      if (x < projectionExtent[0] || x > projectionExtent[2]) {
        const worldsAway = Math.ceil((projectionExtent[0] - x) / worldWidth);
        translatedCoordinate = [x + worldWidth * worldsAway, coordinate[1]];
      }
    }

    const layerStates = frameState.layerStatesArray;
    const numLayers = layerStates.length;
    let declutteredFeatures;
    if (this.declutterTree_) {
      declutteredFeatures = this.declutterTree_.all().map(function(entry) {
        return entry.value;
      });
    }
    let i;
    for (i = numLayers - 1; i >= 0; --i) {
      const layerState = layerStates[i];
      const layer = /** @type {import("../layer/Layer.js").default} */ (layerState.layer);
      if (layer.hasRenderer() && visibleAtResolution(layerState, viewResolution) && layerFilter.call(thisArg2, layer)) {
        const layerRenderer = layer.getRenderer();
        const source = layer.getSource();
        if (layerRenderer && source) {
          const callback = forEachFeatureAtCoordinate.bind(null, layerState.managed);
          result = layerRenderer.forEachFeatureAtCoordinate(
            source.getWrapX() ? translatedCoordinate : coordinate,
            frameState, hitTolerance, callback, declutteredFeatures);
        }
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }

  /**
   * @abstract
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(this: S, import("../layer/Layer.js").default, (Uint8ClampedArray|Uint8Array)): T} callback Layer
   *     callback.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @return {T|undefined} Callback result.
   * @template S,T,U
   */
  forEachLayerAtPixel(pixel, frameState, hitTolerance, callback, layerFilter) {
    return abstract();
  }

  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../PluggableMap.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
   * @return {boolean} Is there a feature at the given coordinate?
   * @template U
   */
  hasFeatureAtCoordinate(coordinate, frameState, hitTolerance, layerFilter, thisArg) {
    const hasFeature = this.forEachFeatureAtCoordinate(
      coordinate, frameState, hitTolerance, TRUE, this, layerFilter, thisArg);

    return hasFeature !== undefined;
  }

  /**
   * @return {import("../PluggableMap.js").default} Map.
   */
  getMap() {
    return this.map_;
  }

  /**
   * Render.
   * @param {?import("../PluggableMap.js").FrameState} frameState Frame state.
   */
  renderFrame(frameState) {
    this.declutterTree_ = renderDeclutterItems(frameState, this.declutterTree_);
  }

  /**
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   * @protected
   */
  scheduleExpireIconCache(frameState) {
    if (iconImageCache.canExpireCache()) {
      frameState.postRenderFunctions.push(expireIconCache);
    }
  }
}


/**
 * @param {import("../PluggableMap.js").default} map Map.
 * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
 */
function expireIconCache(map, frameState) {
  iconImageCache.expire();
}

export default MapRenderer;

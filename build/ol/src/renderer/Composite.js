/**
 * @module ol/renderer/Composite
 */
import {CLASS_UNSELECTABLE} from '../css.js';
import {visibleAtResolution} from '../layer/Layer.js';
import RenderEvent from '../render/Event.js';
import RenderEventType from '../render/EventType.js';
import MapRenderer from './Map.js';
import SourceState from '../source/State.js';
import {replaceChildren} from '../dom.js';
import {labelCache} from '../render/canvas.js';


/**
 * @classdesc
 * Canvas map renderer.
 * @api
 */
class CompositeMapRenderer extends MapRenderer {

  /**
   * @param {import("../PluggableMap.js").default} map Map.
   */
  constructor(map) {
    super(map);
    map.attachLabelCache(labelCache);

    /**
     * @private
     * @type {HTMLDivElement}
     */
    this.element_ = document.createElement('div');
    const style = this.element_.style;
    style.position = 'absolute';
    style.width = '100%';
    style.height = '100%';
    style.zIndex = '0';

    this.element_.className = CLASS_UNSELECTABLE + ' ol-layers';

    const container = map.getViewport();
    container.insertBefore(this.element_, container.firstChild || null);

    /**
     * @private
     * @type {Array<HTMLElement>}
     */
    this.children_ = [];

    /**
     * @private
     * @type {boolean}
     */
    this.renderedVisible_ = true;
  }

  /**
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../PluggableMap.js").FrameState} frameState Frame state.
   */
  dispatchRenderEvent(type, frameState) {
    const map = this.getMap();
    if (map.hasListener(type)) {
      const event = new RenderEvent(type, undefined, frameState);
      map.dispatchEvent(event);
    }
  }

  /**
   * @inheritDoc
   */
  renderFrame(frameState) {
    if (!frameState) {
      if (this.renderedVisible_) {
        this.element_.style.display = 'none';
        this.renderedVisible_ = false;
      }
      return;
    }

    this.calculateMatrices2D(frameState);
    this.dispatchRenderEvent(RenderEventType.PRECOMPOSE, frameState);

    const layerStatesArray = frameState.layerStatesArray.sort(function(a, b) {
      return a.zIndex - b.zIndex;
    });
    const viewResolution = frameState.viewState.resolution;

    this.children_.length = 0;
    let previousElement = null;
    for (let i = 0, ii = layerStatesArray.length; i < ii; ++i) {
      const layerState = layerStatesArray[i];
      frameState.layerIndex = i;
      if (!visibleAtResolution(layerState, viewResolution) ||
        (layerState.sourceState != SourceState.READY && layerState.sourceState != SourceState.UNDEFINED)) {
        continue;
      }

      const layer = layerState.layer;
      const element = layer.render(frameState, previousElement);
      if (element !== previousElement) {
        this.children_.push(element);
        previousElement = element;
      }
    }
    super.renderFrame(frameState);

    replaceChildren(this.element_, this.children_);

    this.dispatchRenderEvent(RenderEventType.POSTCOMPOSE, frameState);

    if (!this.renderedVisible_) {
      this.element_.style.display = '';
      this.renderedVisible_ = true;
    }

    this.scheduleExpireIconCache(frameState);
  }

  /**
   * @inheritDoc
   */
  forEachLayerAtPixel(pixel, frameState, hitTolerance, callback, layerFilter) {
    const viewState = frameState.viewState;
    const viewResolution = viewState.resolution;

    const layerStates = frameState.layerStatesArray;
    const numLayers = layerStates.length;

    for (let i = numLayers - 1; i >= 0; --i) {
      const layerState = layerStates[i];
      const layer = layerState.layer;
      if (layer.hasRenderer() && visibleAtResolution(layerState, viewResolution) && layerFilter(layer)) {
        const layerRenderer = layer.getRenderer();
        const data = layerRenderer.getDataAtPixel(pixel, frameState, hitTolerance);
        if (data) {
          const result = callback(layer, data);
          if (result) {
            return result;
          }
        }
      }
    }
    return undefined;
  }

}


export default CompositeMapRenderer;

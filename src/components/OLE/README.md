#

This demonstrates the use of OLE.

```jsx
import React from 'react';
import BasicMap from 'react-spatial/components/BasicMap';
import Layer from 'react-spatial/Layer';
import VectorLayer from 'react-spatial/VectorLayer';
import OLMap from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import { Icon, Style, Fill, Circle, Stroke } from 'ol/style';
import OLE from 'react-spatial/components/OLE';
import OSM, {ATTRIBUTION} from 'ol/source/OSM.js';

class OLEExample extends React.Component {
  constructor(props) {
    super(props);

    this.map = new OLMap();

    this.layers = [
      new Layer({
        olLayer:new TileLayer({
          source: new OSM()
        })
      }),
      new VectorLayer({
        source: new VectorSource(),
      })
    ];

    // Draw icons
    const styleIcon = new Style({
      image: new Icon({
        src: 'images/marker.png',
        scale: 1,
      }),
    });

    this.drawIconOptions = {
      style: styleIcon.clone(),
      onDrawEnd: evt => {
        evt.feature.setStyle(styleIcon.clone());
      },
    };

    const createStyle = (src, img) => {
    return new Style({
      image: new Icon({
        src,
        img,
        imgSize: img ? [img.width, img.height] : undefined,
      }),
    });
  };

  // creates highlighted feature icon.
  const createIcon = (image, iconScale) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const activeColor = 'white';
    const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1];
    // Thickness scale
    const scale = 2;
    // Final x position
    const x = 2;
    // Final y position
    const y = 2;

    // Set new canvas dimentions adjusted for border
    canvas.width = iconScale * image.width + 2 * scale;
    canvas.height = iconScale * image.height + 2 * scale;

    // Draw images at offsets from the array scaled
    for (let i = 0; i < dArr.length; i += 2)
      ctx.drawImage(image, x + dArr[i] * scale, y + dArr[i + 1] * scale);

    // Fill with color
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = activeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw original image in normal mode
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(
      image,
      x,
      y,
      iconScale * image.width,
      iconScale * image.height,
    );
    return canvas;
  };

  this.selectStyleFc = (feat) => {
      const featStyle = feat.getStyleFunction();

      const oldStyle =
        featStyle() instanceof Array
          ? featStyle()[0].clone()
          : featStyle().clone();
      const style = oldStyle.clone();

      if (style.getStroke() instanceof Icon) {
        return [dfltSelectStyle];
      }

      if (style.getImage() instanceof Icon) {
        const iconScale = oldStyle.getImage().getScale();
        const image = oldStyle.getImage().getImage();
        const canvas = createIcon(image, iconScale);


        return [createStyle(undefined, canvas)];
      }

      return [dfltSelectStyle];
    };

  }

  render() {
    return (
      <div className="tm-ole-example">
        <BasicMap
          map={this.map}
          layers={this.layers}
        />
        <OLE
          map={this.map}
          layer={this.layers[1]}
          selectStyle={this.selectStyleFc}
          modifyStyle={this.selectStyleFc}
          // cad
          drawPoint={this.drawIconOptions}
          drawLineString
          drawPolygon
          // move
          // rotate
          modify
          // del
          // buffer
          // union
          // intersection
          // difference
        />
      </div>
    );
  }
}

<OLEExample />;
```

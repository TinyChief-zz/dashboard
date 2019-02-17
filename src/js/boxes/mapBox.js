import { Block } from '../block.js'

export default function (params) {
  const block = new Block(params)
  /*eslint-disable */
  getData().then(vizitors => {
    initMap(visitors)
  })
  return block
}

function initMap (visitors) {
  ymaps.ready(function () {
    var map = new ymaps.Map('map-inner', {
      center: [55.7, 37.6],
      controls: ['zoomControl'],
      zoom: 3
    })

    map.controls.get('zoomControl').options.set('size', 'medium');

    visitors.forEach(el => {
      console.log(el)
      map.geoObjects.add(new ymaps.GeoObject({
        geometry: el
      })); 
    })
  })
}

function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(visitors)
    }, 2000);
  })
}

const visitors = [
  {
    type: "Point",
    coordinates: [55.8, 37.8]
  },
  {
    type: "Point",
    coordinates: [60.8, 34.8]
  },
  {
    type: "Point",
    coordinates: [57.8, 48.8]
  }
]
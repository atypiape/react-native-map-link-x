import {Platform} from 'react-native';
import type {MapId} from './type';
import {selectLanguage} from './native';

export const isIOS: boolean = Platform.OS === 'ios';

export const generateApkPackageNames = (): Pick<
  Record<MapId, string>,
  'amap' | 'baidumap' | 'qqmap' | 'google-maps'
> => {
  return {
    amap: 'com.autonavi.minimap',
    baidumap: 'com.baidu.BaiduMap',
    qqmap: 'com.tencent.map',
    'google-maps': 'com.google.android.apps.maps',
  };
};

export const generatePrefixes = ({
  alwaysIncludeGoogle,
  naverCallerName,
}: {
  alwaysIncludeGoogle?: boolean;
  naverCallerName?: string;
}): Record<MapId, string> => {
  return {
    amap: isIOS ? 'iosamap://' : 'androidamap://',
    baidumap: 'baidumap://',
    qqmap: 'qqmap://',
    'apple-maps': isIOS ? 'maps://' : 'applemaps://',
    'google-maps': prefixForGoogleMaps(alwaysIncludeGoogle),
    citymapper: 'citymapper://',
    uber: 'uber://',
    lyft: 'lyft://',
    transit: 'transit://',
    truckmap: 'truckmap://',
    waze: 'waze://',
    yandex: 'yandexnavi://',
    moovit: 'moovit://directions',
    'yandex-maps': 'yandexmaps://maps.yandex.ru/',
    'yandex-taxi': 'yandextaxi://',
    kakaomap: 'kakaomap://',
    tmap: 'tmap://',
    mapycz: isIOS ? 'szn-mapy://' : 'mapycz://',
    'maps-me': 'mapsme://',
    osmand: isIOS ? 'osmandmaps://' : 'osmand.geo://',
    gett: 'gett://',
    navermap: naverCallerName ? 'nmap://' : 'nmap-disabled://',
    dgis: 'dgis://2gis.ru/',
    liftago: 'lftgpas://',
    petalmaps: 'petalmaps://',
    sygic: 'com.sygic.aura://',
  };
};

export const prefixForGoogleMaps = (alwaysIncludeGoogle?: boolean): string => {
  return isIOS && !alwaysIncludeGoogle
    ? 'comgooglemaps://'
    : 'https://www.google.com/maps/';
};

export const generateTitles = (
  titles?: Record<string, string>,
): Record<MapId, string> => {
  return {
    amap: selectLanguage({
      chineseSimplified: '高德地图',
      chineseTraditional: '高德地圖',
      default: 'Gaode Maps',
    }),
    baidumap: selectLanguage({
      chineseSimplified: '百度地图',
      chineseTraditional: '百度地圖',
      default: 'Baidu Maps',
    }),
    qqmap: selectLanguage({
      chineseSimplified: '腾讯地图',
      chineseTraditional: '腾讯地圖',
      default: 'Tencent Maps',
    }),
    'apple-maps': selectLanguage({
      chineseSimplified: '苹果地图',
      chineseTraditional: '蘋果地圖',
      default: 'Apple Maps',
    }),
    'google-maps': selectLanguage({
      chineseSimplified: '谷歌地图',
      chineseTraditional: '谷歌地圖',
      default: 'Google Maps',
    }),
    citymapper: 'Citymapper',
    uber: 'Uber',
    lyft: 'Lyft',
    transit: 'The Transit App',
    truckmap: 'TruckMap',
    waze: 'Waze',
    yandex: 'Yandex.Navi',
    moovit: 'Moovit',
    'yandex-taxi': 'Yandex Taxi',
    'yandex-maps': 'Yandex Maps',
    kakaomap: 'Kakao Maps',
    tmap: 'TMAP',
    mapycz: 'Mapy.cz',
    'maps-me': 'Maps Me',
    osmand: 'OsmAnd',
    gett: 'Gett',
    navermap: 'Naver Map',
    dgis: '2GIS',
    liftago: 'Liftago',
    petalmaps: 'Petal Maps',
    sygic: 'Sygic',
    ...(titles || {}),
  };
};

export const icons: Record<string, number> = {
  amap: require('./images/amap.png'),
  baidumap: require('./images/baidu.png'),
  qqmap: require('./images/qqmap.png'),
  'apple-maps': require('./images/apple-maps.png'),
  'google-maps': require('./images/google-maps.png'),
  citymapper: require('./images/citymapper.png'),
  uber: require('./images/uber.png'),
  lyft: require('./images/lyft.png'),
  transit: require('./images/transit.png'),
  truckmap: require('./images/truckmap.png'),
  waze: require('./images/waze.png'),
  yandex: require('./images/yandex.png'),
  moovit: require('./images/moovit.png'),
  'yandex-taxi': require('./images/yandex-taxi.png'),
  'yandex-maps': require('./images/yandex-maps.png'),
  kakaomap: require('./images/kakao-map.png'),
  tmap: require('./images/tmap.png'),
  mapycz: require('./images/mapycz.png'),
  'maps-me': require('./images/maps-me.png'),
  osmand: require('./images/osmand.png'),
  gett: require('./images/gett.png'),
  navermap: require('./images/naver-map.png'),
  dgis: require('./images/dgis.png'),
  liftago: require('./images/liftago.png'),
  petalmaps: require('./images/petalmaps.png'),
  sygic: require('./images/sygic.png'),
};

const _appKeys: MapId[] = [
  'amap',
  'baidumap',
  'qqmap',
  'apple-maps',
  'google-maps',
  'citymapper',
  'uber',
  'lyft',
  'transit',
  'truckmap',
  'waze',
  'yandex',
  'moovit',
  'yandex-maps',
  'yandex-taxi',
  'kakaomap',
  'tmap',
  'mapycz',
  'maps-me',
  'osmand',
  'gett',
  'navermap',
  'dgis',
  'liftago',
  'petalmaps',
  'sygic',
];

export const appKeys: string[] = _appKeys;

export const colorsPopup = {
  black: '#464646',
  gray: '#BBC4CC',
  lightGray: '#ACBBCB',
  lightBlue: '#ECF2F8',
};

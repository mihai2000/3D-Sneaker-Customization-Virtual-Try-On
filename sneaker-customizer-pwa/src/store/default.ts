import { ItemsType } from './index';

const defaultState = {
  items: {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  } as ItemsType,
  isLogoTexture: true,
  isFullTexture: false,
  // logoDecal: '/threejs.png',
  fullDecal: '/threejs.png',
  logoDecal: '/favicon_customizer.svg',
};

export default defaultState;

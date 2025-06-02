import { ItemsType } from './index';
import { proxy } from 'valtio';

const defaultState = proxy({
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
  fullDecal: '/threejs.png',
  logoDecal: '/favicon_customizer.svg',
});

export default defaultState;

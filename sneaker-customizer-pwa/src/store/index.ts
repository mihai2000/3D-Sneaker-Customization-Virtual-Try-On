import { proxy } from 'valtio';

export type ItemsType = {
  laces: string;
  mesh: string;
  caps: string;
  inner: string;
  sole: string;
  stripes: string;
  band: string;
  patch: string;
};

type StateType = {
  current: keyof ItemsType | null;
  items: ItemsType;
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
  currentDesignId: string | null;
};
import defaultState from './default';

export const resetState = () => {
  state.current = null;
  state.items = { ...defaultState.items };
  state.color = '#c6d4ec';
  state.isLogoTexture = defaultState.isLogoTexture;
  state.isFullTexture = defaultState.isFullTexture;
  state.logoDecal = defaultState.logoDecal;
  state.fullDecal = defaultState.fullDecal;
  state.currentDesignId = null;

  // Also reset the defaultState
  defaultState.items = {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  };
  defaultState.logoDecal = '/favicon_customizer.svg';
  defaultState.fullDecal = '/threejs.png';
  defaultState.isLogoTexture = true;
  defaultState.isFullTexture = false;
};

const state = proxy<StateType>({
  current: null,
  items: {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  },
  intro: true,
  color: '#c6d4ec',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/favicon_customizer.svg',
  fullDecal: '/threejs.png',
  currentDesignId: null,
});

export default state;

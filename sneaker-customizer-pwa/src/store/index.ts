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
export const resetState = () => {
  state.current = null;
  state.items = {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  };
  state.color = '#c6d4ec';
  state.isLogoTexture = true;
  state.isFullTexture = false;
  state.logoDecal = '/favicon_customizer.svg';
  state.fullDecal = '/threejs.png';
  state.currentDesignId = null;
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

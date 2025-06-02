import { fileIcon, logoShoe, stylishShoe, textureIcon } from '../assets/index';

export interface EditorTab {
  name: string;
  icon: string;
}

export interface FilterTab {
  name: string;
  icon: string;
}

export interface DecalType {
  stateProperty: string;
  filterTab: string;
}

export const EditorTabs: EditorTab[] = [
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  { name: 'texturepicker', icon: textureIcon },
];

export const FilterTabs: FilterTab[] = [
  {
    name: 'logoShoe',
    icon: logoShoe,
  },
  {
    name: 'stylishShoe',
    icon: stylishShoe,
  },
];

export const DecalTypes: Record<string, DecalType> = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShoe',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShoe',
  },
};

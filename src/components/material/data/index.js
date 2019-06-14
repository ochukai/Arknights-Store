import allItems from '../../../data/items/items.json';
import storeItems from '../../../data/items/store_items.json';

export function byId(id = 0) {
  return allItems.filter(m => m.id === id)[0];
}

export function storeIds() {
  return storeItems.map(si => si.id);
}

export { iconMaps } from '../../../data/items/icons';

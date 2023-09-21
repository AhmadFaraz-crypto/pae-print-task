import { CatStore } from "./cat";

export type RootStoreHydration = {
  stopwatchStore?: CatStore;
};

export class RootStore {
  catStore: CatStore;

  constructor() {
    this.catStore = new CatStore();
  }

  hydrate(data: RootStoreHydration) {
    if (data.stopwatchStore) {
      this.catStore.hydrate(data);
    }
  }
}
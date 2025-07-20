import type { PiniaPluginContext } from "pinia";

const localStoragePlugin = (context: PiniaPluginContext) => {
    const { store } = context;
    const storeData = localStorage.getItem(store.$id);

    if(storeData) {
        // to initialize store with data stored in localStorage
        store.$patch(JSON.parse(storeData));
    }
    store.$subscribe((mutation, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state));
    })
}

export default localStoragePlugin;
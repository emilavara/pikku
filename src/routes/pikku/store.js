import { writable } from "svelte/store";

export const showCreateCollectionModal = writable(false)
export const showEditFieldModal = writable(false)
export const showMediaModal = writable(false)
export const showPickImageModal = writable(false)

export const showEditItemSheet = writable(false)

let idCounter = 0;
export const toasts = writable([]);

export function toast(message, duration = 3000, type = 'normal') {
    const id = idCounter++;

    toasts.update((all) => [...all, { id, message, duration, type }]);

    setTimeout(() => {
        toasts.update((all) => all.filter((t) => t.id !== id));
    }, duration);
}
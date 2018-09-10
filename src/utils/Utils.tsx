import * as React from 'react';

export function copy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/a/6274381/834966
 */
export function shuffle<T>(a: T[]): T[] {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function pickOne<T>(items: T[]): T | null {
    if (items.length == 0) return null;

    const index = Math.floor(Math.random() * items.length);
    const ret = items[index];
    items.splice(index, 1);
    return ret;
}

export function pickMany<T>(items: T[], count: number): T[] {
    const ret: T[] = [];
    for(let i = 0; i < count; i++) {
        const item = pickOne(items);
        if (item) ret.push(item);
    }
    return ret;
}

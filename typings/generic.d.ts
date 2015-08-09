/// <reference path="tsd.d.ts" />

declare module 'scroll-to' {
    var fn: (x: number, y: number, opts?: { duration: number, ease: string }) => NodeJS.EventEmitter;
    export = fn;
}
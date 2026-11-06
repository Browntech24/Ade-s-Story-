/**
 * Minimal ambient declarations for Vite-style asset imports.
 *
 * We intentionally don't reference `vite/client` here: the Vercel serverless
 * function build does not install Vite, and a global `vite/client` type
 * reference breaks that build.
 */

declare module '*.css';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';
declare module '*.gif';

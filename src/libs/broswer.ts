// src/libs/broswer.ts
'use client';

/**
 * 判断浏览器是否处于全屏状态
 */
export const isFullscreen = () => document.fullscreenElement !== null;

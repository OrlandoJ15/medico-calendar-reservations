import { useState, useEffect } from 'react';

export function useCookies() {
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const result = parts.pop()?.split(';').shift();
      return result ? decodeURIComponent(result) : null;
    }
    return null;
  };

  const setCookie = (name: string, value: string, days: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  };

  const getJsonCookie = <T>(name: string): T | null => {
    const cookie = getCookie(name);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (error) {
        console.error('Error parsing JSON cookie:', error);
        return null;
      }
    }
    return null;
  };

  const setJsonCookie = <T>(name: string, value: T, days: number = 30) => {
    setCookie(name, JSON.stringify(value), days);
  };

  return {
    getCookie,
    setCookie,
    deleteCookie,
    getJsonCookie,
    setJsonCookie
  };
}
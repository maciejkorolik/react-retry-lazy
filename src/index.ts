import React, { ComponentType, LazyExoticComponent, ReactNode } from "react";
import { RetryLazyOptions } from "./types";

const retryImport = (
  importFn: () => Promise<any>,
  moduleName: string,
  { retries = 3, delay = 1000, enablePageReload = true }: RetryLazyOptions
): Promise<any> => {
  return new Promise((resolve, reject) =>
    importFn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          console.log(`Retrying... Retries left: ${retries}`);
          if (retries === 1 && enablePageReload) {
            const reloadKey = `reload_${moduleName}`;
            const hasReloaded = sessionStorage.getItem(reloadKey);

            if (!hasReloaded) {
              sessionStorage.setItem(reloadKey, "true");
              window.location.reload();
            } else {
              sessionStorage.removeItem(reloadKey);
              reject(error);
            }
            return;
          }
          retryImport(importFn, moduleName, {
            retries: retries - 1,
            delay,
            enablePageReload,
          }).then(resolve, reject);
        }, delay);
      })
  );
};

export const retryLazy = (
  importFn: () => Promise<any>,
  moduleName: string,
  options: RetryLazyOptions = {}
): LazyExoticComponent<ComponentType<any>> => {
  if (typeof importFn !== "function" || importFn.length !== 0) {
    throw new Error("importFn must be a function that takes no arguments");
  }

  return React.lazy(() => retryImport(importFn, moduleName, options));
};

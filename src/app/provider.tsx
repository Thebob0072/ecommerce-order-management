"use client";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistorStore } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
   return (
      <CookiesProvider>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistorStore}>
               <HeroUIProvider>
                  {children}
               </HeroUIProvider>
            </PersistGate>
         </Provider>
      </CookiesProvider>
   )
}
"use client";
import React from "react";
// import myJson from "../database/data.json" assert { type: "json" };
import { produce } from "immer";
import { DataItem } from "@/types/types";

const AppDataContext = React.createContext({});

const reducer = function (
  state: DataItem[],
  action: { type: string; searchCategory?: string }
) {
  return produce(state, (draftState: DataItem[]) => {
    switch (action.type) {
      case "filter data based on category": {
        return draftState.filter(
          (value: DataItem) => value.category === action.searchCategory
        );
      }
      case "sorting data based on alphabet": {
        return draftState.sort((a: any, b: any) => a.title[0] - b.title[0]);
      }
    }
  });
};

const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [appData, dispatch] = React.useReducer(reducer, []);
  const value = React.useMemo(() => ({ appData, dispatch }), [appData]);
  return (
    <AppDataContext.Provider value={{ value }}>
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

import React, { FC } from "react";
import { ToggleSwitch } from "./ToggleSwitch";

export const Header: FC = () => {
  return (
    <header>
      <ToggleSwitch />

      <span className="text-5xl">Inventory stats</span>
    </header>
  );
};

import React, { FC, useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setIsAdmin } from "../../slices/authSlice";

const SwitchWrapper = styled(Switch)`
  & .MuiSwitch-track {
    background-color: #df5;
  }
`;
export const ToggleSwitch: FC = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(setIsAdmin(!event.target.checked));
  };

  return (
    <div className="flex justify-end items-center gap-1">
      <span className="text-lg">Admin</span>
      <SwitchWrapper
        color="default"
        checked={checked}
        onChange={handleChange}
      />
      <span className="text-lg">User</span>
    </div>
  );
};

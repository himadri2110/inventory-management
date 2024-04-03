import React, { useState } from "react";
import { Dialog, IconButton, InputLabel, TextField } from "@mui/material";
import { Product, editProduct } from "../../slices/ProductSlice";
import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { capitalizeText } from "../../utils/typographyUtils";

const DialogWrapper = styled(Dialog)`
  & .MuiDialog-paper {
    width: 50%;
    background-color: #3f3f3f;
    color: white;
    padding: 24px;
  }

  & .MuiInputBase-input {
    color: white;
    background-color: #686868;
    border-radius: 8px;
    border: none;
  }

  & .MuiFormLabel-root {
    color: white;
  }
`;

export const EditProduct = ({
  open,
  product,
  setProductToEdit,
}: {
  open: boolean;
  product: Product;
  setProductToEdit: Function;
}) => {
  const dispatch = useDispatch();

  const productKeys = Object.keys(product);
  const [productProperties, setProductProperties] = useState(
    // @ts-ignore
    productKeys.map((key) => ({ key, value: product[key] }))
  );

  const handleClose = () => {
    setProductToEdit(null);
  };

  const changeHandler = (key: string, value: string | number) => {
    console.log(key, product);
    setProductProperties((prev) =>
      prev.map((prop) => (prop.key === key ? { ...prop, value } : prop))
    );
  };

  const handleSave = () => {
    const updatedProduct = productProperties.reduce(
      (acc, value) => ({ ...acc, [value.key]: value.value }),
      {}
    );

    dispatch(editProduct(updatedProduct));

    handleClose();
  };

  return (
    <DialogWrapper open={open} onClose={handleClose}>
      <div className="flex justify-between items-center">
        <span className="text-3xl">Edit product</span>

        <IconButton onClick={handleClose}>
          <MdClose size={24} color="#df5" />
        </IconButton>
      </div>

      <div className="mb-4">
        <p className="text-lg">{product.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {productProperties.map((property) => {
          if (property.key === "name" || property.key === "disabled")
            return <></>;

          return (
            <div key={property.key} className="flex flex-col gap-2">
              <InputLabel>{capitalizeText(property.key)}</InputLabel>

              <TextField
                variant="outlined"
                // @ts-ignore
                value={property.value}
                type={property.key === "category" ? "text" : "number"}
                onChange={(e) => changeHandler(property.key, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-4 mt-4 text-lg">
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave} className="text-[#df5]">
          Save
        </button>
      </div>
    </DialogWrapper>
  );
};

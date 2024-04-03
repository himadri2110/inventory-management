import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import React, { FC, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import {
  Product,
  deleteProduct,
  disableProduct,
} from "../../slices/ProductSlice";
import { EditProduct } from "./EditProduct";

const TableWrapper = styled.div`
  & .ReactVirtualized__Table__row {
    width: 100%;
  }
`;

const productColumns = [
  {
    label: "Name",
    dataKey: "name",
    width: 1700,
  },
  {
    label: "Category",
    dataKey: "category",
    width: 1000,
  },
  {
    label: "Price",
    dataKey: "price",
    width: 1000,
  },
  {
    label: "Quantity",
    dataKey: "quantity",
    width: 1000,
  },
  {
    label: "Value",
    dataKey: "value",
    width: 1000,
  },
];

export const ProductListing: FC = () => {
  const { products } = useSelector((state: any) => state.productSlice);
  const { isAdmin } = useSelector((state: any) => state.authSlice);
  const dispatch = useDispatch();

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const cellRenderer = ({ rowData }: any, dataKey: any) => {
    return <div>{rowData[dataKey]}</div>;
  };

  const editHandler = (product: Product) => {
    setProductToEdit(product);
  };

  const deleteHandler = (product: Product) => {
    dispatch(deleteProduct(product));
  };

  const disableHandler = (product: Product) => {
    dispatch(disableProduct(product));
  };

  return (
    <TableWrapper className="bg-gray-900 overflow-x-auto">
      <Table
        height={500}
        width={1600}
        rowHeight={50}
        headerHeight={50}
        rowCount={products.length}
        rowGetter={({ index }) => products[index]}
        headerClassName="text-[#df5]"
      >
        {productColumns.map((column) => {
          return (
            <Column
              label={column.label}
              dataKey={column.dataKey}
              width={column.width}
              cellRenderer={(data) => cellRenderer(data, column.dataKey)}
              key={column.dataKey}
            />
          );
        })}

        <Column
          label="Action"
          cellRenderer={({ rowData }) => {
            const editActionsDisabled = rowData.disabled;
            const actionDisabled = editActionsDisabled || !isAdmin;

            return (
              <div className="flex gap-2 items-center">
                <IconButton
                  color="primary"
                  onClick={() => editHandler(rowData)}
                  disabled={actionDisabled}
                  style={{ color: actionDisabled ? "grey" : "" }}
                >
                  <MdEdit />
                </IconButton>

                <IconButton
                  color="secondary"
                  onClick={() => disableHandler(rowData)}
                  disabled={!isAdmin}
                  style={{ color: !isAdmin ? "grey" : "" }}
                >
                  {actionDisabled ? <IoMdEyeOff /> : <IoMdEye />}
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => deleteHandler(rowData)}
                  disabled={!isAdmin}
                  style={{ color: !isAdmin ? "grey" : "" }}
                >
                  <MdDelete />
                </IconButton>
              </div>
            );
          }}
          dataKey=""
          width={1000}
        />
      </Table>

      {productToEdit ? (
        <EditProduct
          open={true}
          product={productToEdit}
          setProductToEdit={setProductToEdit}
        />
      ) : null}
    </TableWrapper>
  );
};

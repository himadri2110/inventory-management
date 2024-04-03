import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
  category: string;
  name: string;
  price: number;
  quantity: number;
  value: number;
  disabled: boolean;
};

export type ApiResponse = {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
};

type initialStateType = {
  products: Product[];
  isLoading: boolean;
};

const initialState: initialStateType = {
  products: [],
  isLoading: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const { data } = await axios.get(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );

    return data.map((item: ApiResponse) => ({
      ...item,
      price:
        Number(item.price?.split("$")[1]) > 0
          ? Number(item.price?.split("$")[1])
          : 0,
      value:
        Number(item.price?.split("$")[1]) > 0
          ? Number(item.value?.split("$")[1])
          : 0,
      disabled: false,
    }));
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    editProduct: (state, action) => {
      return {
        ...state,
        products: state.products.map((product) =>
          product.name === action.payload.name ? action.payload : product
        ),
      };
    },
    deleteProduct: (state, action) => {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.name !== action.payload.name
        ),
      };
    },
    disableProduct: (state, action) => {
      return {
        ...state,
        products: state.products.map((product) =>
          product.name === action.payload.name
            ? { ...product, disabled: !product.disabled }
            : product
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    });
    builder.addCase(getProducts.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
      };
    });
  },
});

export const { editProduct, deleteProduct, disableProduct } =
  productSlice.actions;

export default productSlice.reducer;

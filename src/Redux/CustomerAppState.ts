import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerModel } from "../Models/Customer";

interface CustomerState {
  customers: CustomerModel[],
  isLoaded: boolean;
}

const initialState: CustomerState = {
  customers: [],
  isLoaded: false,
};

export enum ActionType {
  GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
  GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
  ADDED_CUSTOMER = "ADDED_CUSTOMER",
  UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
  DELETED_CUSTOMER = "DELETED_CUSTOMER",
  REMOVED_CUSTOMER = "REMOVED_CUSTOMER",
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    gotAllCustomersAction(state, action: PayloadAction<CustomerModel[]>) {
      state.customers = action.payload;
      state.isLoaded = true;
    },
    //   gotSingleCustomerAction(state, action: PayloadAction<CustomerModel>) {
    //     state.customers.push(action.payload);
    //   },
    addedCustomerAction(state, action: PayloadAction<CustomerModel>) {
      state.customers.push(action.payload);
    },
    updatedCustomerAction(state, action: PayloadAction<CustomerModel>) {
      const idx = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      state.customers[idx] = action.payload;
    },
    deletedCustomerAction(state, action: PayloadAction<number>) {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },
    removedCustomersAction(state) {
      state.customers = [];
      state.isLoaded = initialState.isLoaded; 
    },
  },
});

export const {
  gotAllCustomersAction,
  // gotSingleCustomerAction,
  addedCustomerAction,
  updatedCustomerAction,
  deletedCustomerAction,
  removedCustomersAction,
} = customersSlice.actions;

export const customersReducer = customersSlice.reducer;

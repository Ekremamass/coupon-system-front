import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerModel } from "../Models/Customer";
import webApiService from "../Services/WebApiService";
import notifyService from "../Services/NotificationService";
import { useEffect } from "react";

interface CustomerState {
  customers: CustomerModel[];
}

const initialState: CustomerState = {
  customers: [],
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

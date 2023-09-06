import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponModel } from "../Models/Coupon";

interface CouponState {
  coupons: CouponModel[],
  isLoaded: boolean;
}

const initialState: CouponState = {
  coupons: [],
  isLoaded: false,
};

export enum ActionType {
  GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
  GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
  ADDED_COUPON = "ADDED_COUPON",
  UPDATED_COUPON = "UPDATED_COUPON",
  DELETED_COUPON = "DELETED_COUPON",
  REMOVED_COUPONS = "REMOVED_COUPONS",
}

const couponsSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {
      gotAllCouponsAction(state, action: PayloadAction<CouponModel[]>) {
        state.coupons = action.payload;
        state.isLoaded = true;
      },
      addedCouponAction(state, action: PayloadAction<CouponModel>) {
        state.coupons.push(action.payload);
      },
      updatedCouponAction(state, action: PayloadAction<CouponModel>) {
        const idx = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        state.coupons[idx] = action.payload;
      },
      deletedCouponAction(state, action: PayloadAction<number>) {
        state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
      },
      removedCouponsAction(state) {
        state.coupons = [];
      },
    },
  });
  
  export const {
    gotAllCouponsAction,
    // gotSingleCompanyAction,
    addedCouponAction,
    updatedCouponAction,
    deletedCouponAction,
    removedCouponsAction,
  } = couponsSlice.actions;
  
  export const couponsReducer = couponsSlice.reducer;
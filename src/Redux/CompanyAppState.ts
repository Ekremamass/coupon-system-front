import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyModel } from "../Models/Company";

interface CompanyState {
  companies: CompanyModel[],
  isLoaded: boolean;
}

const initialState: CompanyState = {
  companies: [],
  isLoaded: false,
};

export enum ActionType {
  GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
  GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
  ADDED_COMPANY = "ADDED_COMPANY",
  UPDATED_COMPANY = "UPDATED_COMPANY",
  DELETED_COMPANY = "DELETED_COMPANY",
  REMOVED_COMPANIES = "REMOVED_COMPANIES",
}

const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
      gotAllCompaniesAction(state, action: PayloadAction<CompanyModel[]>) {
        state.companies = action.payload;
        state.isLoaded = true;
      },
      // gotSingleCompanyAction(state, action: PayloadAction<CompanyModel>) {
      //   state.companies.push(action.payload);
      // },
      addedCompanyAction(state, action: PayloadAction<CompanyModel>) {
        state.companies.push(action.payload);
      },
      updatedCompanyAction(state, action: PayloadAction<CompanyModel>) {
        const idx = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        state.companies[idx] = action.payload;
      },
      deletedCompanyAction(state, action: PayloadAction<number>) {
        state.companies = state.companies.filter((company) => company.id !== action.payload);
      },
      removedCompaniesAction(state) {
        state.companies = [];
      },
    },
  });
  
  export const {
    gotAllCompaniesAction,
    addedCompanyAction,
    updatedCompanyAction,
    deletedCompanyAction,
    removedCompaniesAction,
  } = companiesSlice.actions;
  
  export const companiesReducer = companiesSlice.reducer;
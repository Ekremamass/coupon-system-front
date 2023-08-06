import { customersReducer } from './CustomerAppState';
import { companiesReducer } from './CompanyAppState';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './AuthAppState';

// This is rootReducer
const rootReducer = {
    authReducer: authReducer,
    companiesReducer: companiesReducer,
    customersReducer: customersReducer,
    // add more reducers here if needed
};


// This is store object
const store = configureStore({
    reducer: rootReducer,
});

// Export root Application State
export type RootState = ReturnType<typeof store.getState>;

// Export store object
export default store;
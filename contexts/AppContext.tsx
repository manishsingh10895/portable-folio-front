import * as React from 'react';

export type AppContextType = {
    siteDetails: any,
    setSiteDetails: any,
}

const defaultAppContextValue = {
    siteDetails: {},
    setSiteDetails: (data: any) => { }
}

export const AppContext = React.createContext(defaultAppContextValue);

export const AppContextProvider = ({ children }) => {
    const [siteDetails, setSiteDetails] = React.useState<any>()

    return <AppContext.Provider value={{
        siteDetails,
        setSiteDetails
    }}>
        {children}
    </AppContext.Provider>
}

export const useAppContextValue = () => React.useContext(AppContext);
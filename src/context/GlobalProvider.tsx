import React, {createContext, ReactElement, useState} from 'react'
type GlobalState = {
    loading:{
        isOpen: boolean
        set: React.Dispatch<React.SetStateAction<boolean>>
    }
    dialog:{
        isOpen: boolean
        set: React.Dispatch<React.SetStateAction<boolean>>
    }
};
type Props = {
    children:ReactElement | ReactElement[]
}

export const GlobalState = createContext({} as GlobalState);

export default function GlobalProvider(props:Props) {
    const {children} = props;
    const [isOpenLoading, setIsOpenLoading] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    return (
      <GlobalState.Provider value={{
          loading:{isOpen:isOpenDialog,set: setIsOpenDialog},
          dialog:{isOpen:isOpenLoading,set: setIsOpenLoading}
      }}>
          {children}
      </GlobalState.Provider>
    )
}
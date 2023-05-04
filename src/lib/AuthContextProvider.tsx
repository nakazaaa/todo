import React, { useEffect, useState } from "react";
import customAxios from "@/lib/customAxios";
import {useRouter} from "next/router";

/**
 * 簡易的な認証情報の型のサンプル
 */
type AuthInfo = {
    Id: string;
};

// ログイン状態のContext
export const LoggedInContext = React.createContext<boolean>(false);

// 認証情報と認証情報セットのContext
export const AuthInfoContext = React.createContext<
    [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]
    >([{ Id: "" }, () => {}]);

export const AuthContextProvider: React.FC<{
    children: any;
}> = (props) => {
    // stateの定義
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [authInfo, setAuthInfo] = useState<AuthInfo>({ Id: "" });
    const router = useRouter();
    // authInfoのバリデーション
    useEffect(() => {

        // authInfoに正しく値がセットされているかどうかをチェック
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/me').then((response) => {
            // setAuthInfo({ Id:response.data.user.id })
            setAuthInfo({ Id:'2222' })
        }).catch((response) => {
                setAuthInfo({ Id:"" })
                router.push('/');
            }
        );
        console.dir(authInfo)
        console.log('ddddddddddddddddddddddd')
        if (authInfo.Id) {
            setLoggedIn(true);
            console.dir(authInfo)
            console.log('ttttttttttttt')
        } else {
            setLoggedIn(false);
            console.dir(authInfo)
            console.log('ffffffffffffff')
        }
    }, []);
    return (
        <LoggedInContext.Provider value={loggedIn}>
            <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
                {props.children}
            </AuthInfoContext.Provider>
        </LoggedInContext.Provider>
    );
};
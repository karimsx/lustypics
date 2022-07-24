import {createContext, ReactNode, useContext, useEffect, useReducer, useState} from 'react';
// utils
import {isValidToken, setSession} from '../utils/jwt';
// @types
import {ActionMap, AuthState, AuthUser, JWTContextType} from '../@types/auth';
import {useMutation} from '@apollo/client';
import {RegisterFormValidationType} from "../sections/auth/register/RegisterForm";
import {
    GET_CURRENT_USER_QUERY, LOGIN_MUTATION, REGISTER_MUTATION, RESET_PASS_MUTATION, SEND_FORGOT_PASS_MUTATION
} from "../sections/shared/user/requests/user-requests";
import {useRouter} from "next/router";
import {PATH_ADMIN} from "../routes/paths";
import {ClientContext} from "./RequestGraphqlClientContext";
import {useQuery} from "react-query";

// ----------------------------------------------------------------------


enum Types {
    Initial = 'INITIALIZE', Login = 'LOGIN', Logout = 'LOGOUT', Register = 'REGISTER',
}

type JWTAuthPayload = {
    [Types.Initial]: {
        isAuthenticated: boolean; user: AuthUser;
    }; [Types.Login]: {
        user: AuthUser;
    }; [Types.Logout]: undefined; [Types.Register]: {
        user: AuthUser;
    };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
    isAuthenticated: false, isInitialized: false, user: null,
};


const JWTReducer = (state: AuthState, action: JWTActions) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                isAuthenticated: action.payload.isAuthenticated, isInitialized: true, user: action.payload.user,
            };
        case 'LOGIN':
            return {
                ...state, isAuthenticated: true, user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state, isAuthenticated: false, user: null,
            };

        case  'REGISTER':
            return {
                ...state, isAuthenticated: true, user: action.payload.user,
            };

        default:
            return state;
    }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({children}: AuthProviderProps) {
    const queryClient = useContext(ClientContext)
    if (!queryClient) {
        throw new Error(`missing a UseGraphQLProvider`)
    }

    const [accessToken, setAccessToken] = useState<string | undefined>()

    const {data: currentUserData, isLoading, isSuccess, isError, refetch} = useQuery('currentUser', () => {
        return queryClient.request(GET_CURRENT_USER_QUERY)
    }, {
        enabled: !!accessToken,
    })

    const [state, dispatch] = useReducer(JWTReducer, initialState);

    const [registerMutation] = useMutation(REGISTER_MUTATION)
    const [loginMutation] = useMutation(LOGIN_MUTATION)

    const [sendForgotPassMutation] = useMutation(SEND_FORGOT_PASS_MUTATION)
    const [resetPassMutation] = useMutation(RESET_PASS_MUTATION)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            dispatch({
                type: Types.Initial, payload: {
                    isAuthenticated: true, user: currentUserData?.me,
                },
            });
        })()
    }, [currentUserData])


    useEffect(() => {
        (async () => {
            await initializeCurrentUser()
        })()
    }, [])

    const initializeCurrentUser = async () => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            if (accessToken && isValidToken(accessToken) && !isError) {
                queryClient.setHeader('Authorization', `Bearer ${accessToken}`)
                setAccessToken(accessToken)
            } else {
                setSession(null)
                dispatch({
                    type: Types.Initial, payload: {
                        isAuthenticated: false, user: null,
                    },
                });
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: Types.Initial, payload: {
                    isAuthenticated: false, user: null,
                },
            });
        }
    };


    const login = async (email: string, password: string) => {
        const response = await loginMutation({
            variables: {
                dto: {
                    email, password,
                }
            }
        });
        const {accessToken, user} = response.data.login;
        setSession(accessToken);

        await initializeCurrentUser()
    };

    const register = async (input: RegisterFormValidationType) => {
        const response = await registerMutation({
            variables: {
                registerDto: {
                    ...input,
                }
            }
        });

        const {accessToken, user} = response.data.register;
        setSession(accessToken);
        await initializeCurrentUser()
    };

    const logout = async () => {
        setSession(null);
        dispatch({type: Types.Logout});
    };

    return (<AuthContext.Provider
        value={{
            ...state, method: 'jwt', login, logout, register, refetch
        }}
    >
        {children}
    </AuthContext.Provider>);
}

export {AuthContext, AuthProvider};

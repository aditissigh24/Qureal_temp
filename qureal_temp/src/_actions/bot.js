import axios from "axios";
import { useMutation, useQuery, QueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import log from "cslog";

export const botSecureAxios = axios.create({
    baseURL: "https://botapi.qureal.com/",
    // baseURL: "http://localhost:8000/",
    headers: {
        Authorization: `Bearer ${restoreAccessToken()}`,
    },
});

export const useAIImageGenerator = (onSuccess, onDone = () => {}) => {
    return useMutation(
        (data) => {
            return botAxios.post("/image/gen", data, {
                headers: {
                    Authorization: `Bearer ${restoreAccessToken()}`,
                },
            });
        },
        {
            onSuccess: (result, variables, context) => {
                onSuccess(result?.data || {}, variables, context);
            },
            onSettled: (data) => {
                onDone();
            },
        }
    );
};

export function restoreAccessToken() {
    return localStorage.getItem("access_token") || undefined;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 60 * 24 * 365,
        },
    },
});

export function useQueryParams() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

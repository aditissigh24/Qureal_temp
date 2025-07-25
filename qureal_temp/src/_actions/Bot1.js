import React from "react";
import axios from "axios";
import { useMutation, useQuery, QueryClient } from "react-query";
import { useLocation } from "react-router-dom";


export function restoreAccessToken() {
    return localStorage.getItem("access_token") || undefined;
}

export const botSecureAxios = axios.create({
    baseURL: "https://botapi.qureal.com/",
    headers: {
        Authorization: `Bearer ${restoreAccessToken()}`,
    },
});


export const useAIImageGenerator = (onSuccess, onDone = () => {}) => {
    return useMutation(
        (data) => {
            return botSecureAxios.post("/image/gen", data, {
                headers: {
                    Authorization: `Bearer ${restoreAccessToken()}`,
                },
            });
        },
        {
            onSuccess: (result, variables, context) => {
                onSuccess(result?.data || {}, variables, context);
            },
            onSettled: () => {
                onDone();
            },
        }
    );
};


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


const BASE_URL = "https://api.qureal.com/";
export const SiteSkelton = "https://via.placeholder.com/600x400?text=Loading..."; 
export function getImageFileURL(filename) {
  if (filename) {
    return `${BASE_URL}passets/${filename}`;
;
  } else {
    return SiteSkelton;
  }
}


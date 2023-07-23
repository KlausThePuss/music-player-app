import { UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription } from "@supabase/gotrue-js";
import { createContext } from "react";

type UserContextType = {
 accessToken: string | null;
 user: User | null;
 userDetails: UserDetails | null;
 isLoading: boolean;
 subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined> (
undefined
);

export interface Props {
 [propName: string]: any;
};
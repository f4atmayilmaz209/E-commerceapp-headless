"use client"

import { useContext } from "react";
import { WixClientContext } from "../context/winContext"





export const useWixClient=()=>{
    return  useContext(WixClientContext)
}
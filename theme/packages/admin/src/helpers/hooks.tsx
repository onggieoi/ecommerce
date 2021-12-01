import React, { useState, useRef, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../redux/store";


export const useAppDispatch = () => useDispatch<RootDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

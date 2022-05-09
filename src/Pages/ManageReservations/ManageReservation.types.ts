import React from "react";
import { ITennisCourt } from "../../Models/ITennisCourt";

export interface IManageReservationStyles{
    fragmentStyle:React.CSSProperties
}

export interface IManageReservationProps{
    tennisCourts:ITennisCourt[]
}
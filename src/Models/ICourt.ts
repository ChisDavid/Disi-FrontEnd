import { ITennisCourt } from "./ITennisCourt";

export interface ICourt {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    tennisCourts: ITennisCourt[]
}
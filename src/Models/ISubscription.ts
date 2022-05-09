import { Month } from "../Utils/enums";

export interface ISubscription 
{
    id: number;
    month: string;
    tennisCourtId: number;
    userId: number;
    cost: number;
    timeSlot: string;
}

export interface ISubscriptionToDisplay
{
    id: number;
    month: string;
    tennisCourtName: string;
    cost: number;
    timeSlot: string;
}
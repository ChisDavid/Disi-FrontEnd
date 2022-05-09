export interface ITennisCourtsTariff{
    tennisCourtId: number;
    weekendPrice: number;
    dayPrice: number;
    nightPrice: number;
    courtName?: string;
}
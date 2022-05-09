const serverUrl: string = "http://localhost:8080";

export namespace UserRoutes {
    export const LogIn: string = `${serverUrl}/Login`;
    export const Register: string = `${serverUrl}/Register`;
    export const UpdatePassword: string = `${serverUrl}/UpdatePassword`;
    export const ForgotPassword: string = `${serverUrl}/ForgotPassword`;
};

export namespace CourtRoutes {
    export const ReadAll: string = `${serverUrl}/Court/ReadAll`;
    export const Delete: string = `${serverUrl}/Court/Delete`;
    export const Edit: string = `${serverUrl}/Court/Edit`;
    export const Add: string = `${serverUrl}/Court/Add`
};

export namespace TennisCourtRoutes {
    export const GetTennisCourtsByCourtID: string = `${serverUrl}/TennisCourt/ReadByCourtId`;
    export const Add: string = `${serverUrl}/TennisCourt/Add`;
    export const Delete: string = `${serverUrl}/TennisCourt/Delete`;
}

export namespace TennisCourtsTarrifRoutes {
    export const ReadAll: string = `${serverUrl}/TennisCourtsTarrif/ReadAll`;
    export const Update: string = `${serverUrl}/TennisCourtsTarrif/Update`;
};

export namespace ReservationRoutes {
    export const ReadAll: string = `${serverUrl}/Reservation/ReadAll`;
    export const Update: string = `${serverUrl}/Reservation/Update`;
    export const Delete: string = `${serverUrl}/Reservation/Delete`;
    export const GetPrice:string = `${serverUrl}/Reservation/GetPrice`;
};

export namespace TennisCourtRoutes {
    export const ReadAll: string = `${serverUrl}/TennisCourt/ReadAll`;
};

export namespace SubscriptionRoutes {
    export const ReadSubscriptionsByUserId: string = `${serverUrl}/Subscription`;
    export const GetTariff: string = `${serverUrl}/Subscription/GetTariff`;
    export const Add: string = `${serverUrl}/Subscription/Add`;
    export const Delete: string = `${serverUrl}/Subscription/Delete`;
};
export enum Pages {
    LogIn = '/LogIn',
    Register = '/Register',
    Home = '/Home',
    Subscription = '/Subscription',
    Main = "/Main"
};

export enum RegisterValues {
    Age = 'Age',
    Password = 'Password',
    Email = 'Email',
    Name = 'Name',
    IsAdmin = 'IsAdmin',
};

export enum CourtFields {
    Id = 'Id',
    Name = 'Name',
    Address = 'Address',
    Latitude = 'Latitude',
    Longitude = 'Longitude',
};

export enum RequestType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
};

export enum DataType  {
    Text = 'text',
    Date = 'date',
    DataTime = 'datetime-local',
    Number = 'number',
    Email = 'email',
};

export enum MessageType {
    Error = 'error',
    Success = 'success',
    Warning = 'warning',
};

export enum PriceType {
    Day = "Day",
    Night = "Night",
    WeekEnd = "WeekEnd",
};

export enum ReservationField{
    Id ='id',
    TennisCourtName = 'tennisCourtName',
    StartTime = 'startTime',
    EndTime = 'endTime',
    ReservationTime = 'reservationTime',
    ReservationPrice = 'reservationPrice'
};

export enum Month {
    JANUARY = 'JANUARY',
    FEBRUARY = 'FEBRUARY',
    MARCH = 'MARCH',
    APRIL = 'APRIL',
    MAY = 'MAY',
    JUNE = 'JUNE',
    JULY = 'JULY',
    AUGUST = 'AUGUST',
    SEPTEMBER = 'SEPTEMBER',
    OCTOBER = 'OCTOBER',
    NOVEMBER = 'NOVEMBER',
    DECEMBER = 'DECEMBER'
};
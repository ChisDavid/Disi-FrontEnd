import { BaseButton, CommandButton, IColumn, mergeStyles, Stack, TextField } from "@fluentui/react";
import axios, { AxiosResponse } from "axios";
import { Fragment, useEffect, useState } from "react";
import { IReservation } from "../../Models/IReservation";
import { ADD, ADD_RESERVATION, DELETE, DELETE_CONFIRM, EDIT, EDIT_RESERVATION, EMPTY_STRING, ERROR_RESERVATION } from "../../Utils/constants";
import { DataType, MessageType, PriceType, ReservationField } from "../../Utils/enums";
import { checkResponse, confirm, getErrorMessage, getMessage, splitByCapitalLetters } from "../../Utils/methods";
import { ReservationRoutes, TennisCourtRoutes } from "../../Utils/routes";
import { CustomList } from "../../Components/CustomList/CustomList";
import { IActionButtonProps } from "../../Components/CustomList/CustomList.types";
import { CustomDialog } from "../../Components/Dialog/CustomDialog";
import { ITennisCourt } from "../../Models/ITennisCourt";
import { Dropdown } from "../../Components/Dropdown/Dropdown";
import { IDropdownStyle } from "../../Components/Dropdown/Dropdown.types";
import { IManageReservationProps } from "./ManageReservation.types";

const defaultReservation: IReservation = { id: -1, tennisCourtName: "", startTime: "", endTime: "", reservationTime: "" }
const dropdownStyle: IDropdownStyle = {
    formControlStyle: { width: 178, top: 2, left: -8 },
    inputLabelStyle: { top: -10 },
    selectStyle: { height: 33 },
};

const dummyTennisCourts: ITennisCourt[] = [
    { id: 1, available: true, name: "TennisCourt 1", courtId: 0 },
    { id: 2, available: true, name: "TennisCourt 2", courtId: 0 },
    { id: 3, available: true, name: "TennisCourt 3", courtId: 0 },
    { id: 4, available: true, name: "TennisCourt 4", courtId: 0 },
    { id: 5, available: true, name: "TennisCourt 5", courtId: 0 }
];
let tennisCourtName: string;

export const ManageReservation = (props: IManageReservationProps): JSX.Element => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<IReservation>(defaultReservation);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [tennisCourts, setTennisCourts] = useState<ITennisCourt[]>(dummyTennisCourts);
    const [reservationPrice, setReservationPrice] = useState<number>(0);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const request: AxiosResponse = await axios.get(ReservationRoutes.ReadAll);
            if (checkResponse(request)) {
                setReservations(request.data);
            }
            // setTennisCourts(props.tennisCourts);
            setTennisCourts(dummyTennisCourts)
        };

        getData()
    }, []);

    useEffect(() => {
        if (selectedReservation.tennisCourtName !== EMPTY_STRING && selectedReservation.startTime !== EMPTY_STRING) {
            const getPrice = async (): Promise<void> => {

                const data = {
                    type: getPriceType(),
                    tennisCourtId: getTennisCourtIdByName()
                };

                const priceRequest: AxiosResponse = await axios.post(ReservationRoutes.GetPrice, data);
                if (checkResponse(priceRequest)) {
                    setReservationPrice(priceRequest.data);
                }
            }

            getPrice();
        }
    }, [selectedReservation.startTime, selectedReservation.tennisCourtName]);

    const getPriceType = (): string => {
        const dayNumber: number = new Date(selectedReservation.startTime).getDay();
        const hour: number = new Date(selectedReservation.startTime).getHours();

        let priceType: PriceType = PriceType.Day;
        if (dayNumber == 5 || dayNumber == 6) { priceType = PriceType.WeekEnd; }
        if (hour > 19) { priceType = PriceType.Night }

        return priceType;
    };

    const getTennisCourtIdByName = (): number => {
        return tennisCourts.find((tennisCourt: ITennisCourt) => tennisCourt.name == selectedReservation.tennisCourtName).id;
    };

    const getReservationColumn = (name: string): IColumn => {
        return {
            key: name,
            name: splitByCapitalLetters(name),
            fieldName: name,
            minWidth: 100,
            maxWidth: 200,
            isResizable: true
        } as IColumn;
    };

    const getReservationColumns = (): IColumn[] => {
        const columns: string[] = [ReservationField.Id, ReservationField.TennisCourtName, ReservationField.StartTime, ReservationField.EndTime];
        return columns.map((column: string) => getReservationColumn(column));
    };

    const getReservationButton = (name: string, onClick: (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: IReservation[]) => void): IActionButtonProps<IReservation> => {
        return {
            text: name,
            iconProps: { iconName: name },
            disabled: false,
            requireSelectedItem: false,
            requireMultipleSelections: false,
            onClick: onClick
        };
    };

    const addReservation = (): void => {
        setOpenDialog(true);
        setSelectedReservation(defaultReservation);
    };

    const editReservation = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedItems: IReservation[]): void => {
        setOpenDialog(true);
        setSelectedReservation(selectedItems[0]);
    };

    const deleteReservations = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedItems: IReservation[]): void => {
        const now: Date = new Date();
        const reservationsIds: number[] = selectedItems.map((reservation: IReservation) => {
            const hours: number = Math.abs(new Date(reservation.reservationTime).getTime() - now.getTime()) / (60 * 60 * 1000);
            if (hours > 24) {
                getMessage(MessageType.Error, `${reservation.tennisCourtName} reservation ${ERROR_RESERVATION}`);
            }
            return reservation.id;
        });

        confirm(DELETE_CONFIRM, MessageType.Warning, async () => {
            const response: AxiosResponse = await axios.post(ReservationRoutes.Delete, reservationsIds);
            if (checkResponse(response)) {
                setReservations(response.data);
            }
        });
    };

    const getReservationButtons = (): IActionButtonProps<IReservation>[] => {
        return [getReservationButton(ADD, addReservation),
        getReservationButton(EDIT, editReservation),
        getReservationButton(DELETE, deleteReservations)
        ];
    };

    const getTitle = (): string => {
        return selectedReservation.id === -1 ? ADD_RESERVATION : EDIT_RESERVATION;
    };

    const getType = (name: string): string => {
        switch (name) {
            case ReservationField.Id:
                return DataType.Number;
            case ReservationField.ReservationTime:
            case ReservationField.StartTime:
            case ReservationField.EndTime:
                return DataType.DataTime;
            default:
                return DataType.Text;
        };
    };

    const onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let reservation = { ...selectedReservation };
        switch ((event as any).target.name) {
            case ReservationField.StartTime:
                reservation = { ...selectedReservation, startTime: newValue };
                break;
            case ReservationField.EndTime:
                reservation = { ...selectedReservation, endTime: newValue };
                break;
        };

        setSelectedReservation(reservation)
    };

    const getDialogContentRow = (name: string, defaultValue: string, readOnly?: boolean): JSX.Element => {
        const defaultValueUpdated: string = name !== ReservationField.Id && name !== ReservationField.TennisCourtName ? new Date(defaultValue).toLocaleDateString() : defaultValue;

        return <Stack horizontal>
            <TextField
                readOnly
                name={name}
                defaultValue={splitByCapitalLetters(name)}
                className={mergeStyles({ margin: 10, marginRight: 10 })}
            />
            {name === ReservationField.TennisCourtName ?
                <Dropdown
                    values={tennisCourts.map((tennisCourt: ITennisCourt) => tennisCourt.name)}
                    name={"Tennis Court"}
                    multiple={false}
                    setValues={(values: string[]) => setSelectedReservation({ ...selectedReservation, tennisCourtName: values[0] })}
                    style={dropdownStyle}
                /> :
                <TextField
                    style={{ width: name === ReservationField.ReservationPrice ? 176 : 178 }}
                    readOnly={readOnly === undefined || selectedReservation.id === -1 ? false : readOnly}
                    name={name}
                    className={mergeStyles({ margin: 10 })}
                    defaultValue={name === ReservationField.ReservationTime ? new Date().toLocaleDateString() : defaultValueUpdated}
                    value={defaultValue}
                    type={getType(name)}
                    onGetErrorMessage={(value: string) => getErrorMessage(value, getType(name))}
                    onChange={onChange}
                    suffix={name === ReservationField.ReservationPrice ? "$" : undefined}
                />}
        </Stack>
    };

    const getDialogContent = (): JSX.Element => {
        return <Stack>
            {getDialogContentRow(ReservationField.Id, `${selectedReservation.id}`, true)}
            {getDialogContentRow(ReservationField.TennisCourtName, `${selectedReservation.tennisCourtName}`, true)}
            {getDialogContentRow(ReservationField.StartTime, `${selectedReservation.startTime}`, false)}
            {getDialogContentRow(ReservationField.EndTime, `${selectedReservation.endTime}`, false)}
            {getDialogContentRow(ReservationField.ReservationTime, `${selectedReservation.reservationTime}`, true)}
            {getDialogContentRow(ReservationField.ReservationPrice, `${reservationPrice}`, true)}
        </Stack>
    };

    const onSubmitReservation = async (): Promise<void> => {
        setOpenDialog(false);
        const reservation: IReservation = { ...selectedReservation, tennisCourtName: tennisCourtName };
        const request: AxiosResponse = await axios.post(ReservationRoutes.Update, reservation);

        checkResponse(request) ? setReservations(request.data) : setOpenDialog(true);
    };

    return <Stack horizontal>
        <CommandButton text="Align" iconProps={{ iconName: "AlignLeft" }} style={{ margin: 10, width: 20, left: 900 }} type="button" className='dropdown'>
            <div className="dropdown-menu" style={{ width: 1000, margin: 10 }}>
                <CustomList<IReservation>
                    items={reservations}
                    columns={getReservationColumns()}
                    buttons={getReservationButtons()} />
            </div>
            <CustomDialog
                dialogContent={getDialogContent()}
                title={getTitle()}
                onSubmit={onSubmitReservation}
                openDialog={openDialog}
                onCancelDialog={setOpenDialog} />
        </CommandButton>
    </Stack>


}
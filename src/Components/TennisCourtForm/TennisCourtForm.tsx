import { useEffect, useState } from "react";
import { BaseButton, IColumn, Icon, Stack, StackItem, TextField } from "@fluentui/react"
import { ITennisCourt } from "../../Models/ITennisCourt";
import { CustomList } from "../CustomList/CustomList";
import { IActionButtonProps } from "../CustomList/CustomList.types";
import { ADD, addIcon, ADD_TENNIS_COURT, COURT_TARRIFS, DELETE, deleteIcon, DELETE_CONFIRM, EDIT, editIcon, EDIT_TENNIS_COURTS_TARRIF as EDIT_TENNIS_COURT_TARRIFS, INVALID_DATA, moneyIcon, UPDATE_ERROR, UPDATE_SUCCESSFUL } from "../../Utils/constants";
import { CustomDialog } from "../Dialog/CustomDialog";
import { checkResponse, getMessage, isInputValid, isNullEmptyOrUndefined } from "../../Utils/methods";
import { DataType, MessageType, PriceType } from "../../Utils/enums";
import { Text } from '@fluentui/react/lib/Text';
import { ITennisCourtsTariff } from "../../Models/ITennisCourtTarrif";
import { ITennisCourtForm } from "./TennisCourtForm.types";
import axios, { AxiosResponse } from "axios";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CourtRoutes, TennisCourtRoutes, TennisCourtsTarrifRoutes } from "../../Utils/routes";
import Swal from "sweetalert2";
import {  confirm } from "../../Utils/methods";

const tennisCourtColumns: IColumn[] = [
    { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 400, maxWidth: 450, isResizable: true },
    { key: 'column2', name: 'Is Available', fieldName: 'available', minWidth: 100, maxWidth: 200, isResizable: true },
]

const dummyTennisCourt: ITennisCourt = {
    id: 0,
    name: "",
    available: false,
    courtId: 0
};

const dummyTennisCourts: ITennisCourt[] = [
    {id: 1, name: "Tennis Court 1", available: true, courtId: 12},
    {id: 2, name: "Tennis Court 2", available: true, courtId: 12},
    {id: 3, name: "Tennis Court 3", available: false, courtId: 12},
    {id: 4, name: "Tennis Court 4", available: true, courtId: 12},
    {id: 5, name: "Tennis Court 5", available: true, courtId: 12},
    {id: 6, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 7, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 8, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 9, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 10, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 11, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 12, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 13, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 14, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 15, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 16, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 17, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 18, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 19, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 20, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 21, name: "Tennis Court 6", available: true, courtId: 12},
    {id: 22, name: "Tennis Court 6", available: true, courtId: 12},
];

export const TennisCourtForm = (props: ITennisCourtForm): JSX.Element => {
    const [tennisCourts, setTennisCourts] = useState<ITennisCourt[]>(dummyTennisCourts);
    const [currentTennisCourt, setCurrentTennisCourt] = useState<ITennisCourt>(dummyTennisCourt);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [viewTariff, setViewTariff] = useState<boolean>(false);
    const [openTennisCourtAddDialog, setOpenTennisCourtAddDialog] = useState<boolean>(false);
    const [tennisCourtsTariffs, setTennisCourtsTarrifs] = useState<ITennisCourtsTariff[]>([]);
    
    useEffect(() => {
        const getData = async () => {
            const tennisCourts: AxiosResponse = await axios.get(`${TennisCourtRoutes.GetTennisCourtsByCourtID}/${props.courtID}` );
            if (checkResponse(tennisCourts)) {
             //  setTennisCourts(tennisCourts.data);
            }
            const tennisCourtsTariffs: AxiosResponse = await axios.get(TennisCourtsTarrifRoutes.ReadAll);
            if (checkResponse(tennisCourtsTariffs)) {
                setTennisCourtsTarrifs(tennisCourtsTariffs.data);
            }
        };
        getData();
    }, [props.courtID, selectedIds]);

    const addTennisCourt = (): void => {
        setCurrentTennisCourt({...currentTennisCourt, courtId: props.courtID});
        setOpenTennisCourtAddDialog(true);
    }

    const editTennisCourt = async (e: React.MouseEvent<HTMLElement | BaseButton>, selectedTennisCourts: ITennisCourt[]): Promise<void> => {
        setCurrentTennisCourt(selectedTennisCourts[0]);
        const selectedIds: number[] = selectedTennisCourts?.map((court: ITennisCourt) => Number(court.id));
        setSelectedIds(selectedIds);
        setOpenTennisCourtAddDialog(true);
    };

    const deleteTennisCourt = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: ITennisCourt[]): void => {
        const selectedIds: number[] = selectedCourts?.map((court: ITennisCourt) => Number(court.id));

        confirm(DELETE_CONFIRM, MessageType.Warning, async () => {
            await axios.post(TennisCourtRoutes.Delete, selectedIds);
            setSelectedIds(selectedIds);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
    };

    const viewCourtTarrifs = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: ITennisCourt[]): void => {
        setViewTariff(t => !t);
    };

    const ActionButtons: IActionButtonProps<any>[] = [
        { text: ADD, iconProps: addIcon, disabled: false, requireSelectedItem: false, requireMultipleSelections: false, onClick: addTennisCourt },
        { text: EDIT, iconProps: editIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: false, onClick: editTennisCourt },
        { text: DELETE, iconProps: deleteIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: true, onClick: deleteTennisCourt },
        { text: COURT_TARRIFS, iconProps: moneyIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: false, onClick: viewCourtTarrifs },
    ];

    const getErrorMessage = (value: string, dataType: DataType): string | JSX.Element => {
        return isInputValid(dataType, value) ? "" :
            <Stack styles={{ root: { height: 24 } }} verticalAlign="center" horizontal tokens={{ childrenGap: 8 }}>
                <Icon iconName="Error" styles={{ root: { color: 'red' } }} />
                <Text variant="smallPlus">{INVALID_DATA}</Text>
            </Stack>;
    };

    const onChangeTarriff = async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): Promise<void> => {
        const priceType: string = (event as any).target.name;
        const courtId: number = Number((event as any).target.accessKey);
        let tenisCourtTarrif: ITennisCourtsTariff = tennisCourtsTariffs.find((tennisCourtsTariff: ITennisCourtsTariff) => tennisCourtsTariff.tennisCourtId === courtId);
        const newTennisCourtsTariffs: ITennisCourtsTariff[] = tennisCourtsTariffs.filter((element: ITennisCourtsTariff) => element.tennisCourtId !== courtId);

        switch (priceType) {
            case PriceType.Day:
                tenisCourtTarrif = { ...tenisCourtTarrif, dayPrice: Number(newValue) };
                break;
            case PriceType.Night:
                tenisCourtTarrif = { ...tenisCourtTarrif, nightPrice: Number(newValue) };
                break;
            case PriceType.WeekEnd:
                tenisCourtTarrif = { ...tenisCourtTarrif, weekendPrice: Number(newValue) }
                break;
        }
        newTennisCourtsTariffs.push(tenisCourtTarrif);
        await setTennisCourtsTarrifs(newTennisCourtsTariffs.sort((t1: ITennisCourtsTariff, t2: ITennisCourtsTariff) => t1.tennisCourtId - t2.tennisCourtId));
    }

    const getPriceInput = (defaultValue: number, name: string, tenisCourtId: string): JSX.Element => {
        return <div style={{ margin: 10 }}>
            <TextField
                suffix='$'
                defaultValue={`${defaultValue}`}
                underlined
                accessKey={tenisCourtId}
                name={name}
                onGetErrorMessage={(value) => getErrorMessage(value, DataType.Text)}
                onChange={onChangeTarriff} />
        </div>
    };

    const getDialogRow = (tennisCourtsTariff: ITennisCourtsTariff, index: number): JSX.Element => {
        return <Stack horizontal>
            <div style={{ margin: 10 }}>
                <TextField
                    readOnly
                    defaultValue={`${tennisCourtsTariff?.courtName}`}
                    underlined
                />
            </div>
            {getPriceInput(tennisCourtsTariff.dayPrice, PriceType.Day, `${tennisCourtsTariff.tennisCourtId}`)}
            {getPriceInput(tennisCourtsTariff.nightPrice, PriceType.Night, `${tennisCourtsTariff.tennisCourtId}`)}
            {getPriceInput(tennisCourtsTariff.weekendPrice, PriceType.WeekEnd, `${tennisCourtsTariff.tennisCourtId}`)}
        </Stack>
    };

    const _onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean): void => {
        setCurrentTennisCourt( {...currentTennisCourt, available: isChecked });
    }

    const onChangeTennisCourtName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        if(!isNullEmptyOrUndefined(newValue))
        {
            setCurrentTennisCourt( {...currentTennisCourt, name: newValue });
        }
    } 

    const getAddDialogContent = (): JSX.Element => {
        return (
            <Stack style={{ margin: 10 }} tokens={{childrenGap: 30}}>
                <StackItem>
                    <TextField
                    label="Name"
                    defaultValue={`${currentTennisCourt.name}`}
                    underlined
                    accessKey={`${currentTennisCourt.id}`}
                    onGetErrorMessage={(value) => getErrorMessage(value, DataType.Text)}
                    onChange={onChangeTennisCourtName} />
                </StackItem>
                <StackItem>
                    <FormControlLabel control={<Checkbox defaultChecked checked={currentTennisCourt.available} onChange={_onChange}/>} label="Is Available" />
                </StackItem>
            </Stack>
        );
    };

    const onSubmitAddTennisCourt = async (): Promise<void> => {
        if (currentTennisCourt !== dummyTennisCourt) { 
            await axios.post(TennisCourtRoutes.Add, currentTennisCourt);
            getMessage(MessageType.Success, UPDATE_SUCCESSFUL);
            setOpenTennisCourtAddDialog(false);
        } else {
            getMessage(MessageType.Error, UPDATE_ERROR);
        }
        setCurrentTennisCourt(dummyTennisCourt);
    };

    const getDialogContent = (): JSX.Element => {

        const tariff: ITennisCourtsTariff = tennisCourtsTariffs.filter(tct => tct.tennisCourtId === currentTennisCourt.id)[0];

        return <Stack style={{ margin: 10 }}>
            Tariffs:
            { !isNullEmptyOrUndefined(tariff) && getDialogRow(tariff, 1)}
      

        </Stack>
    };

    const isTarifsValid = (): boolean => {
        return !tennisCourtsTariffs.some((tennisCourtsTariff: ITennisCourtsTariff) => isNaN(tennisCourtsTariff.dayPrice) || isNaN(tennisCourtsTariff.nightPrice) || isNaN(tennisCourtsTariff.weekendPrice));
    };

    const onSubmitTennisCourtsTariffs = async (): Promise<void> => {
        if (isTarifsValid()) {
            // await axios.post(TennisCourtsTarrif.Update, tennisCourtsTariffs);
            getMessage(MessageType.Success, UPDATE_SUCCESSFUL);
            setOpenTennisCourtAddDialog(false);
        } else {
            getMessage(MessageType.Error, UPDATE_ERROR);
        }
    };

    return (
        <Stack>
            <StackItem>
                <h1>TennisCourtForm</h1>
            </StackItem>
            <StackItem>
                <CustomList items={tennisCourts} columns={tennisCourtColumns} buttons={ActionButtons}/>
            </StackItem>
            <StackItem>
                <CustomDialog
                    openDialog={viewTariff}
                    onCancelDialog={() => {setViewTariff(t => !t)}}
                    title={EDIT_TENNIS_COURT_TARRIFS}
                    dialogContent={getDialogContent()}
                    onSubmit={onSubmitTennisCourtsTariffs}
                />
            </StackItem>
            <StackItem>
                <CustomDialog
                    openDialog={openTennisCourtAddDialog}
                    onCancelDialog={() => {setOpenTennisCourtAddDialog(false)}}
                    title={ADD_TENNIS_COURT}
                    dialogContent={getAddDialogContent()}
                    onSubmit={onSubmitAddTennisCourt}
                />
            </StackItem>
        </Stack>
    );
}
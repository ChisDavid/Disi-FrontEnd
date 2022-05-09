import { IColumn, Stack, IIconProps, StackItem, PrimaryButton, DefaultButton, BaseButton, TextField, Icon } from '@fluentui/react';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ICourt } from '../../Models/ICourt';
import { ADD, addIcon, DELETE, deleteIcon, DELETE_CONFIRM, EDIT, editIcon, EDIT_TENNIS_COURTS_TARRIF, INVALID_DATA, tennisCourtsIcon, TENNIS_COURT, UPDATE_ERROR, UPDATE_SUCCESSFUL } from '../../Utils/constants';
import { CourtFields, DataType, MessageType, PriceType } from '../../Utils/enums';
import { CourtRoutes, TennisCourtsTarrifRoutes } from '../../Utils/routes';
import { CustomList } from '../../Components/CustomList/CustomList';
import { IActionButtonProps } from '../../Components/CustomList/CustomList.types';
import { MapComponent } from '../../Components/GoogleMap/GoogleMap';
import { CustomTextField } from '../../Components/TextField/CustomTextField';
import { checkResponse, confirm, getMessage, isInputValid } from "../../Utils/methods";
import './AdminPage.css';
import { ITennisCourtsTariff } from '../../Models/ITennisCourtTarrif';
import { Text } from '@fluentui/react/lib/Text';
import { CustomDialog } from '../../Components/Dialog/CustomDialog';
import { TennisCourtForm } from '../../Components/TennisCourtForm/TennisCourtForm';

const courtColumns: IColumn[] = [
    { key: 'column1', name: 'name', fieldName: 'name', minWidth: 300, maxWidth: 400, isResizable: true },
    { key: 'column2', name: 'address', fieldName: 'address', minWidth: 100, maxWidth: 200, isResizable: true }
]

const GOOGLE_MAP_URL: string = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places";
const defaultCourt: ICourt = { id: -1, name: '', address: '', latitude: 0, longitude: 0, tennisCourts: [] };

const dummyTarrifs: ITennisCourtsTariff[] = [{ tennisCourtId: 0, courtName: "Court 0 ", dayPrice: 123, nightPrice: 400, weekendPrice: 500 },
{ tennisCourtId: 1, courtName: "Court 1", dayPrice: 123, nightPrice: 400, weekendPrice: 500 },
{ tennisCourtId: 2, courtName: "Court 2", dayPrice: 123, nightPrice: 400, weekendPrice: 500 },
{ tennisCourtId: 3, courtName: "Court 3", dayPrice: 123, nightPrice: 400, weekendPrice: 500 },
{ tennisCourtId: 4, courtName: "Court 4", dayPrice: 123, nightPrice: 400, weekendPrice: 500 },
{ tennisCourtId: 5, courtName: "Court 5 ", dayPrice: 123, nightPrice: 400, weekendPrice: 500 }]

export const AdminPage = (): JSX.Element => {
    const [enableForm, setEnableForm] = useState<boolean>(false);
    const [renderTennisCourtForm, setRenderTennisCourtForm] = useState<boolean>(false);
    const [currentCourt, setCurrentCourt] = useState<ICourt>(defaultCourt);
    const [courts, setCourts] = useState<ICourt[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [tennisCourtsTariffs, setTennisCourtsTarrifs] = useState<ITennisCourtsTariff[]>([]);

    useEffect(() => {
        const getData = async () => {
            const courts: AxiosResponse = await axios.get(CourtRoutes.ReadAll);
            if (checkResponse(courts)) {
                setCourts(courts.data);
            }

            setTennisCourtsTarrifs(dummyTarrifs);

            const tennisCourtsTariffs: AxiosResponse = await axios.get(TennisCourtsTarrifRoutes.ReadAll);
            if (checkResponse(tennisCourtsTariffs)) {
                setTennisCourtsTarrifs(tennisCourtsTariffs.data);
            }
        };
        getData();
    }, [selectedIds]);

    const addCourt = (): void => {
        setCurrentCourt(defaultCourt);
        setEnableForm(true);
        setRenderTennisCourtForm(false);
    };

    const editCourt = async (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: ICourt[]): Promise<void> => {
        setCurrentCourt(selectedCourts[0]);
        setEnableForm(true);
        setRenderTennisCourtForm(false);
        const selectedIds: number[] = selectedCourts?.map((court: ICourt) => Number(court.id));
        setSelectedIds(selectedIds);
    };

    const deleteCourt = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: ICourt[]): void => {
        const selectedIds: number[] = selectedCourts?.map((court: ICourt) => Number(court.id));

        confirm(DELETE_CONFIRM, MessageType.Warning, async () => {
            await axios.post(CourtRoutes.Delete, selectedIds);
            setSelectedIds(selectedIds);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
    };

    const viewTennisCourts = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: ICourt[]): void => {
        const selectedIds: number[] = selectedCourts?.map((court: ICourt) => Number(court.id));
        setRenderTennisCourtForm(currentRender => !currentRender);
        setEnableForm(false);
        setSelectedIds(selectedIds);
    }

    const ActionButtons: IActionButtonProps<any>[] = [
        { text: ADD, iconProps: addIcon, disabled: false, requireSelectedItem: false, requireMultipleSelections: false, onClick: addCourt },
        { text: EDIT, iconProps: editIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: false, onClick: editCourt },
        { text: DELETE, iconProps: deleteIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: true, onClick: deleteCourt },
        { text: TENNIS_COURT, iconProps: tennisCourtsIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: false, onClick: viewTennisCourts },
    ];

    const handleFieldChange = (field: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const newCourt: ICourt = { ...currentCourt };
        newCourt[field] = e.target.value;
        setCurrentCourt(newCourt);
    };

    const onCancelFormButtonClicked = (): void => {
        setEnableForm(false);
        setCurrentCourt(defaultCourt);
    };

    const onSaveFormButtonClicked = async (): Promise<void> => {
        await axios.post(CourtRoutes.Edit, currentCourt);
        setCurrentCourt(defaultCourt);

        const courts: AxiosResponse = await axios.get(CourtRoutes.ReadAll);
        setCourts(courts.data);

    };

    const onMapClicked = (lat: number, lng: number) => {
        setCurrentCourt({ ...currentCourt, latitude: lat, longitude: lng });
    };

    const getMapElement = (type: string): JSX.Element => {
        return <div className={type} />
    };

    const getTextContent = (fieldName: string): string => {
        switch (fieldName) {
            case CourtFields.Address:
                return currentCourt?.address;
            case CourtFields.Latitude:
                return currentCourt?.latitude.toString();
            case CourtFields.Longitude:
                return currentCourt?.longitude.toString();
            case CourtFields.Name:
                return currentCourt?.name;
        };
    };

    const getStackItem = (fieldName: string): JSX.Element => {
        return <StackItem className={'item'} key={fieldName}>
            <CustomTextField
                textFieldLabel={fieldName}
                textContent={getTextContent(fieldName)}
                sectionChanged={(e: any) => handleFieldChange(fieldName.toLocaleLowerCase(), e)}
            />
        </StackItem>
    };

    const getErrorMessage = (value: string): string | JSX.Element => {
        return isInputValid(DataType.Number, value) ? "" :
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
                onGetErrorMessage={getErrorMessage}
                onChange={onChangeTarriff} />
        </div>
    };

    const getDialogRow = (tennisCourtsTariff: ITennisCourtsTariff, index: number): JSX.Element => {
        return <Stack horizontal>
            <div style={{ margin: 10 }}>
                <TextField
                    readOnly
                    defaultValue={`${tennisCourtsTariff.courtName}`}
                    underlined
                />
            </div>
            {getPriceInput(tennisCourtsTariff.dayPrice, PriceType.Day, `${tennisCourtsTariff.tennisCourtId}`)}
            {getPriceInput(tennisCourtsTariff.nightPrice, PriceType.Night, `${tennisCourtsTariff.tennisCourtId}`)}
            {getPriceInput(tennisCourtsTariff.weekendPrice, PriceType.WeekEnd, `${tennisCourtsTariff.tennisCourtId}`)}
        </Stack>
    };

    const getDialogContent = (): JSX.Element => {
        return <Stack style={{ margin: 10 }}>
            {tennisCourtsTariffs.map((tennisCourtsTariff: ITennisCourtsTariff, index: number) => getDialogRow(tennisCourtsTariff, index))}
        </Stack>
    };

    const isTarifsValid = (): boolean => {
        return !tennisCourtsTariffs.some((tennisCourtsTariff: ITennisCourtsTariff) => isNaN(tennisCourtsTariff.dayPrice) || isNaN(tennisCourtsTariff.nightPrice) || isNaN(tennisCourtsTariff.weekendPrice));
    };

    const onSubmitTennisCourtsTariffs = async (): Promise<void> => {
        if (isTarifsValid()) {
            // await axios.post(TennisCourtsTarrif.Update, tennisCourtsTariffs);
            getMessage(MessageType.Success, UPDATE_SUCCESSFUL);
        } else {
            getMessage(MessageType.Error, UPDATE_ERROR);
        }
    };

    const customFields: string[] = [CourtFields.Name, CourtFields.Address, CourtFields.Longitude, CourtFields.Latitude];



    return (
        <div className="board">
            <h1>Admin's home page.</h1>
            <div className='board-content'>
                <div className='courts-list'>List
                    <CustomList<ICourt> key={"courtsList"} items={courts} columns={courtColumns} buttons={ActionButtons} />
                </div>
                <div className='court-details'>
                    <div className='form-content'>
                        {enableForm &&
                            <Stack style={{ alignItems: 'center', paddingLeft: "30px" }}>
                                <h2>Court's Details</h2>
                                {customFields.map((field: string) => getStackItem(field))}
                                <StackItem>
                                    <div className="map-component">
                                        <MapComponent
                                            defaultZoom={20}
                                            defaultCenterLatitude={currentCourt.latitude}
                                            defaultCenterLongitude={currentCourt.longitude}
                                            onClick={onMapClicked}
                                            googleMapURL={GOOGLE_MAP_URL}
                                            loadingElement={getMapElement('map-loading-element')}
                                            containerElement={getMapElement('map-container-element')}
                                            mapElement={getMapElement('map-element')}
                                        />
                                    </div>
                                </StackItem>
                                <StackItem>
                                    <DefaultButton text="Cancel" onClick={onCancelFormButtonClicked} allowDisabledFocus />
                                    <PrimaryButton text="Ok" onClick={onSaveFormButtonClicked} allowDisabledFocus />
                                </StackItem>
                            </Stack>
                        }
                        {renderTennisCourtForm && <TennisCourtForm courtID={selectedIds[0]}/>}
                    </div>
                </div>
            </div>
            <CustomDialog
                title={EDIT_TENNIS_COURTS_TARRIF}
                dialogContent={getDialogContent()}
                onSubmit={onSubmitTennisCourtsTariffs}
            />
        </div>
    );
}
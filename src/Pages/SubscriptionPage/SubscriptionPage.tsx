import { BaseButton, IColumn, Stack, StackItem, TextField } from "@fluentui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { CustomList } from "../../Components/CustomList/CustomList";
import { IActionButtonProps } from "../../Components/CustomList/CustomList.types";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ISubscription, ISubscriptionToDisplay } from "../../Models/ISubscription";
import { ITennisCourt } from "../../Models/ITennisCourt";
import { addIcon, ADD_SUBSCRIPTION, ADD_TENNIS_COURT, DELETE, deleteIcon, DELETE_CONFIRM, UPDATE_ERROR, UPDATE_SUCCESSFUL } from "../../Utils/constants";
import { DataType, MessageType, Month } from "../../Utils/enums";
import Swal from "sweetalert2";
import {  checkResponse, confirm, getErrorMessage, getMessage, isNullEmptyOrUndefined } from "../../Utils/methods";
import { CourtRoutes, SubscriptionRoutes } from "../../Utils/routes";
import { CustomDialog } from "../../Components/Dialog/CustomDialog";
import { Dropdown } from "../../Components/Dropdown/Dropdown";
import { IDropdownStyle } from "../../Components/Dropdown/Dropdown.types";
import { TimeRangePicker } from "../../Components/TimeRangePicker/TimeRangePicker";
import { NewsRegular } from "@fluentui/react-icons";

const dropdownStyle: IDropdownStyle = {
    formControlStyle: { width: 178, top: 2, left: -8 },
    inputLabelStyle: { top: -10 },
    selectStyle: { height: 33 },
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

const tennisCourtColumns: IColumn[] = [
    { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 400, maxWidth: 450, isResizable: true },
    { key: 'column2', name: 'Is Available', fieldName: 'available', minWidth: 100, maxWidth: 200, isResizable: true },
]

const subscriptionsColumns: IColumn[] = [
    { key: 'column1', name: 'Month', fieldName: 'month', minWidth: 200, maxWidth: 350, isResizable: true },
    { key: 'column2', name: 'Cost', fieldName: 'cost', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column3', name: 'TimeSlot', fieldName: 'timeSlot', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column4', name: 'TennisCourt', fieldName: 'tennisCourtName', minWidth: 100, maxWidth: 150, isResizable: true },
]

const dummyTennisCourt: ITennisCourt = {
    id: 0,
    name: "",
    available: false,
    courtId: 0
};

const dummySubscriptions: ISubscription[] = [
    { id: 1, month: Month.JANUARY, tennisCourtId: 1, userId: 2, cost: 110, timeSlot: "7;9" },
    { id: 1, month: Month.FEBRUARY, tennisCourtId: 1, userId: 2, cost: 110, timeSlot: "7;9" },
    { id: 1, month: Month.MARCH, tennisCourtId: 1, userId: 2, cost: 110, timeSlot: "7;9" },
    { id: 1, month: Month.APRIL, tennisCourtId: 1, userId: 2, cost: 110, timeSlot: "7;9" },
    { id: 1, month: Month.MAY, tennisCourtId: 1, userId: 2, cost: 110, timeSlot: "7;9" }
];

const dummySubscription: ISubscription = {
    id: 0,
    month: Month.JANUARY,
    tennisCourtId: 0,
    userId: 0,
    cost: -1,
    timeSlot: ""
}

export const SubscriptionPage = (): JSX.Element => {
    const [displayAddSubscriptionForm, setDisplayAddSubscriptionForm] = useState<boolean>(false);

    const [tennisCourts, setTennisCourts] = useState<ITennisCourt[]>(dummyTennisCourts);
    const [selectedTennisCourtIds, setSelectedTennisCourtIds] = useState<number[]>([]);
    const [currentTennisCourt, setCurrentTennisCourt] = useState<ITennisCourt>(dummyTennisCourt);

    const [subscriptions, setSubscriptions] = useState<ISubscription[]>(dummySubscriptions);
    const [currentSubscription, setcurrentSubscription] = useState<ISubscription>(dummySubscription);
    const [selectedSubscriptionIds, setSelectedSubscriptionIds] = useState<number[]>([]);
    
    useEffect(() => {
        //get data
    },[selectedTennisCourtIds, currentSubscription]);

    const addSubscription = async (e: React.MouseEvent<HTMLElement | BaseButton>, selectedTennisCourts: ITennisCourt[]): Promise<void> => {
        setCurrentTennisCourt(selectedTennisCourts[0]);
        setDisplayAddSubscriptionForm(true);
    };

    const ActionButtons: IActionButtonProps<any>[] = [
        { text: ADD_SUBSCRIPTION, iconProps: addIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: false, onClick: addSubscription },
    ];


    const deleteSubscriptions = (e: React.MouseEvent<HTMLElement | BaseButton>, selectedCourts: ISubscription[]): void => {
        const selectedIds: number[] = selectedCourts?.map((court: ISubscription) => Number(court.id));

        confirm(DELETE_CONFIRM, MessageType.Warning, async () => {
            await axios.post(SubscriptionRoutes.Delete, selectedIds);
            setSelectedSubscriptionIds(selectedIds);
            Swal.fire('Deleted!', 'Your items have been deleted.', 'success');
        });
    };
    
    const subscriptionActionButtons: IActionButtonProps<any>[] = [
        { text: DELETE, iconProps: deleteIcon, disabled: false, requireSelectedItem: true, requireMultipleSelections: true, onClick: deleteSubscriptions },
    ];

    const onSubmitAddSubscription = async (): Promise<void> => {
        if (currentSubscription.cost >= 0) { 
            await axios.post(SubscriptionRoutes.Add, currentSubscription);
            getMessage(MessageType.Success, UPDATE_SUCCESSFUL);
            setDisplayAddSubscriptionForm(false);
        } else {
            getMessage(MessageType.Error, UPDATE_ERROR);
        }
        setCurrentTennisCourt(dummyTennisCourt);
        setcurrentSubscription(dummySubscription);
    };
    
    const getTennisCourtNameById = (tennisCourts: ITennisCourt[], tennisCourtId: number): string => {
        return tennisCourts.filter(tennisCourt => tennisCourt.id === tennisCourtId).map(t => t.name)[0];
    }

    const getDisplayedSubscription = (subscription: ISubscription): ISubscriptionToDisplay => {
        let name: string = getTennisCourtNameById(tennisCourts, subscription.tennisCourtId); 
        
        let newSubs: ISubscriptionToDisplay = {
            id : subscription.id,
            cost : subscription.cost,
            month : subscription.month,
            timeSlot : subscription.timeSlot,
            tennisCourtName : name
        }
        return newSubs;
    }   

    const convertSubscriptionsToDisplay = (subscriptions: ISubscription[]): ISubscriptionToDisplay[] => {

        return subscriptions.map(subscription => getDisplayedSubscription(subscription));
    } 

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const request: AxiosResponse = await axios.get(SubscriptionRoutes.GetTariff);
            if (checkResponse(request)) {
                setcurrentSubscription({...currentSubscription, cost: request.data.cost});
            }
        };

        getData();
    }, [currentSubscription.month, currentSubscription.timeSlot])

    const getDialogContent = (): JSX.Element => {
        return <Stack style={{ margin: 10 }}tokens={{childrenGap: 30}}>
            <Stack style={{ margin: 10 }} tokens={{childrenGap: 30}}>
                <StackItem>
                    <TextField
                    label="Name"
                    underlined
                    defaultValue={`${currentTennisCourt.name}`}
                    readOnly
                    />
                </StackItem>
                <StackItem>
                    <Dropdown values={Object.keys(Month).map(type => Month[type]+'')}
                         name={"Month"} multiple={false} setValues={function (values: string[]): void {
                            throw new Error("Function not implemented.");
                        } } style={dropdownStyle}/>
                </StackItem>
                <StackItem>
                    <TimeRangePicker onChangeValue={(value) => setcurrentSubscription({...currentSubscription, timeSlot: value})}/>
                </StackItem>
                <StackItem>

                </StackItem>
                <StackItem>
                    <TextField
                        label={"Cost"}
                        suffix='$'
                        defaultValue={`${0}`}
                        value={currentSubscription.cost+''}
                        underlined
                        readOnly
                        accessKey={''}
                    />
                </StackItem>
            </Stack>
            
        </Stack>
    };
    
    return (
        <Stack tokens={{childrenGap: 20}}>
            <Navbar />
            <Stack horizontal>
                <Stack>
                    <StackItem>
                        <h1>Tennis courts</h1>
                    </StackItem>
                    <StackItem>
                        <CustomList items={tennisCourts} columns={tennisCourtColumns} buttons={ActionButtons}/>
                    </StackItem>
                    <StackItem>
                        <CustomDialog
                            openDialog={displayAddSubscriptionForm}
                            onCancelDialog={() => {setDisplayAddSubscriptionForm(false)}}
                            title={ADD_SUBSCRIPTION}
                            dialogContent={getDialogContent()}
                            onSubmit={onSubmitAddSubscription}
                        />
                    </StackItem>
                </Stack>
                <Stack>
                    <StackItem>
                        <h1>My subscriptions</h1>
                    </StackItem>
                    <StackItem>
                        <CustomList items={convertSubscriptionsToDisplay(subscriptions)} columns={subscriptionsColumns} buttons={subscriptionActionButtons}/>
                    </StackItem>
                </Stack>
            </Stack>
        </Stack>
    );
}

function setReservations(data: any) {
    throw new Error("Function not implemented.");
}

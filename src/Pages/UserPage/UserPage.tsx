import { DetailsList, IColumn, IGroup, mergeStyles, Stack } from "@fluentui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICourt } from "../../Models/ICourt";
import { ITennisCourt } from "../../Models/ITennisCourt";
import { capitalizeFirstLetter } from "../../Utils/methods";
import { CourtRoutes } from "../../Utils/routes";
import { ManageReservation } from "../ManageReservations/ManageReservation";
import "./UserPage.scss";

const dummyCourts: ICourt[] = [
    {
        id: 1, name: "Court 1", address: "", latitude: 1, longitude: 2, tennisCourts: [
            { id: 6, available: true, name: "TennisCourt 1", courtId: 0 },
            { id: 7, available: true, name: "TennisCourt 2", courtId: 0 },
            { id: 8, available: true, name: "TennisCourt 3", courtId: 0 }
        ]
    },
    {
        id: 2, name: "Court 2", address: "", latitude: 1, longitude: 2, tennisCourts: [
            { id: 9, available: false, name: "TennisCourt 4", courtId: 0 },
            { id: 10, available: true, name: "TennisCourt 5", courtId: 0 },
        ]
    },
    { id: 3, name: "Court 3", address: "", latitude: 1, longitude: 2, tennisCourts: [] },
    { id: 4, name: "Court 4", address: "", latitude: 1, longitude: 2, tennisCourts: [] },
    { id: 5, name: "Court 5", address: "", latitude: 1, longitude: 2, tennisCourts: [] },
]
export const UserPage = (): JSX.Element => {
    const [courts, setCourts] = useState<ICourt[]>(dummyCourts);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const request = await axios.get(CourtRoutes.ReadAll);
            // if (checkResponse(request)) {
            //     setCourts(request.data)
            // }

        };
        getData()

    }, [])

    const getItems = (): ITennisCourt[] => {
        const items: ITennisCourt[] = [];
        courts.forEach((court: ICourt) => {
            court.tennisCourts.forEach((tennisCourt: ITennisCourt) => {
                items.push(tennisCourt);
            });
        });
        return items;
    };

    const getGroup = (name: string, count: number): IGroup => {
        return { key: name, name: name, startIndex: 0, count: count } as IGroup;
    };

    const getColumn = (name: string): IColumn => {
        return { key: name, name: capitalizeFirstLetter(name), fieldName: name, minWidth: 100, maxWidth: 200, isResizable: true } as IColumn;
    };

    const getColumns = (): IColumn[] => {
        return [getColumn('id'), getColumn('name'), getColumn('available')]
    };

    const getGroups = (): IGroup[] => {
        return courts.map((court: ICourt) => getGroup(court.name, court.tennisCourts.length)).filter((group: IGroup) => group.count !== 0);
    };

    const getCSS = (): string => {
        return mergeStyles({
            width: '800px',
            overflow: 'hidden'
        });
    };

    return <Stack >
        <ManageReservation tennisCourts={getItems()} />
        <DetailsList
            className={getCSS()}
            items={getItems()}
            groups={getGroups()}
            columns={getColumns()}
            groupProps={{ showEmptyGroups: true, }}
            compact={false}
        />
    </Stack>



}
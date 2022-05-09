import { DetailsList, IColumn, IGroup, Stack, StackItem } from "@fluentui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ICourt } from "../../Models/ICourt";
import { ITennisCourt } from "../../Models/ITennisCourt";
import { Pages } from "../../Utils/enums";
import { capitalizeFirstLetter } from "../../Utils/methods";
import { CourtRoutes } from "../../Utils/routes";
import "./MainPage.css"

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

export const MainPage = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const [courts, setCourts] = useState<ICourt[]>(dummyCourts);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const request = await axios.get(CourtRoutes.ReadAll);
            // if (checkResponse(request)) {
            //     setCourts(request.data)
            // }

        };
        getData()

    }, []);

    const getItems = (): ITennisCourt[] => {
        const items: ITennisCourt[] = [];
        courts.forEach((court: ICourt) => {
            court.tennisCourts.forEach((tennisCourt: ITennisCourt) => {
                items.push(tennisCourt);
            });
        });
        return items;
    };

    const goToLogIn = (): void => {
        navigate(Pages.LogIn);
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

    return <>
        <div className="content" style={{ margin: 100 }}>
            <div className="header">
                <h1 style={{ textAlign: 'center' }}>Find courts near you and connect with the world's largest racket player community</h1>
                <h4 style={{ textAlign: 'center' }}>Tennis, Padel, Squash and Badminton</h4>
            </div>
            <div className="ilustration" style={{ textAlign: 'center' }}>
                <div className="image">
                    <img
                        src="https://cdn.cms.gotcourts.com/var/site/storage/images/9/9/4/0/499-64-eng-GB/illustration_game@2x.jpg"
                        style={{ maxWidth: 500 }}
                    >
                    </img>
                </div>
            </div>
            <div className="footer" style={{ marginTop: 100, marginLeft: 550, textAlign: "center" }}>
                <div style={{ display: 'flex' }}>
                    <img
                        src="https://cdn.cms.gotcourts.com/var/site/storage/images/4/1/4/0/414-3-eng-GB/illustration_backhand@2x.png"
                        style={{ maxWidth: 200 }}
                    >
                    </img>
                    <Stack>
                        <StackItem style={{ position: 'relative', left: 50 }}>
                            <h2 style={{ textAlign: 'center' }}>You are a player? Join Us</h2>
                        </StackItem>
                        <StackItem style={{ position: 'relative', left: 50 }}>
                            <a className="button" onClick={goToLogIn}>
                                Create your free account now
                            </a>
                        </StackItem>

                    </Stack>
                </div>

            </div>
            <div style={{ textAlign: 'center', marginLeft: '350px', marginBottom: '100px' }}>
                <DetailsList
                    className={"detailsList"}
                    items={getItems()}
                    groups={getGroups()}
                    columns={getColumns()}
                    groupProps={{ showEmptyGroups: true, }}
                    compact={false}
                />
            </div>
            <div style={{ marginTop: 100, height: 100 }}>

            </div>
        </div>
    </>
}
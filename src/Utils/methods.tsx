import { Icon, Stack } from "@fluentui/react";
import { AxiosResponse } from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { INVALID_DATA, SUCCESS_STATUS } from "./constants";
import { DataType, MessageType } from "./enums";
import { Text } from '@fluentui/react/lib/Text';
import "./style.css";

export const isNullEmptyOrUndefined = (value: any): boolean => {
    return value === undefined || value === '' || value === null || isNaN(value);
};

export const isInputValid = (type: string, value: string): boolean => {
    switch (type) {
        case DataType.Date:
            return !isNullEmptyOrUndefined(Date.parse(value));
        case DataType.Number:
            return !isNullEmptyOrUndefined(Number(value));
        case DataType.Email:
            return value?.includes('@') && value?.includes('.');
        default:
            return true;
    }
};

export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getMessage = (type: string, message: string): void => {
    swal(capitalizeFirstLetter(type), message, type);
};

export const confirm = (message: string, type: MessageType, thenMethod: () => void, elseMethod?: () => void): void => {
    Swal.fire({
        customClass: { container: "swall" },
        title: 'Are you sure?',
        text: message,
        icon: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
    }).then((result) => {
        if (result.isConfirmed) {
            thenMethod();
        }
        else {
            elseMethod();
        }
    })
};

export const checkResponse = (axiosResponse: AxiosResponse): boolean => {
    if (axiosResponse.data === undefined || axiosResponse.data === '' || axiosResponse.data === null || axiosResponse.status !== SUCCESS_STATUS) {
        getMessage(MessageType.Error, "There is a problem with " + axiosResponse.statusText);
        return false;
    }
    return true;
};

export const splitByCapitalLetters = (text: string): string => {
    return capitalizeFirstLetter(text).match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
};

export const getErrorMessage = (value: string, type: string): string | JSX.Element => {
    const error: JSX.Element = <Stack styles={{ root: { height: 24 } }} verticalAlign="center" horizontal tokens={{ childrenGap: 8 }}>
        <Icon iconName="Error" styles={{ root: { color: 'red' } }} />
        <Text variant="smallPlus" >{INVALID_DATA}</Text>
    </Stack>

    return isInputValid(type, value) ? "" : error;
};
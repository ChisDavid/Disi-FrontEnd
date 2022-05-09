import React from "react";

export interface IDropdownStyle{
    formControlStyle: React.CSSProperties;
    inputLabelStyle: React.CSSProperties;
    selectStyle: React.CSSProperties;
}
export interface IDropdownProps {
    values: string[],
    name: string,
    multiple: boolean,
    setValues: (values: string[]) => void
    style?: IDropdownStyle
}

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
import { BaseButton, IColumn, IIconProps, SelectionMode } from "@fluentui/react";

export interface ICustomListProps<T> {
    items: T[];
    columns: IColumn[];
    buttons: IActionButtonProps<T>[];
    selectionMode?: SelectionMode;
    enableShimmer?: boolean;
    hierarchical?: boolean;
}

export interface IActionButtonProps<T> {
    text: string;
    iconProps: IIconProps;
    disabled: boolean;
    requireSelectedItem: boolean;
    requireMultipleSelections: boolean;
    onClick: (event: React.MouseEvent<HTMLElement | BaseButton>, items: T[]) => void;
}
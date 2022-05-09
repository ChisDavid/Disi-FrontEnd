import { Theme } from "@mui/material";
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from "./Dropdown.types";

export const getStyles = (name: string, personName: string[], theme: Theme) => {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
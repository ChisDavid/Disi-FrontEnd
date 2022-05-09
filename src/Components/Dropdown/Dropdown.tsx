import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getStyles, MenuProps } from "./Dropdown.styles";
import { IDropdownProps } from "./Dropdown.types";

export const Dropdown = (props: IDropdownProps): JSX.Element => {

    const theme = useTheme();
    const [items, setItems] = useState<string[]>(props.values);

    useEffect(() => {
        setItems(props?.values);
    }, [])

    const handleChange = (event: SelectChangeEvent<typeof items>): void => {
        const { target: { value }, } = event;
        setItems(typeof value === 'string' ? value.split(',') : value)
        props.setValues(typeof value === 'string' ? value.split(',') : value,);
    };

    return (<div>
        <FormControl style={props?.style?.formControlStyle} sx={{ m: 1, width: 300 }}>
            <InputLabel style={props?.style?.inputLabelStyle} id="demo-multiple-name-label">{props.name}</InputLabel>
            <Select
                style={props?.style.selectStyle}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple={props.multiple}
                value={items}
                onChange={handleChange}
                defaultValue={props.values}
                input={<OutlinedInput label={props.name} />}
                MenuProps={MenuProps}
            >
                {props.values?.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, items, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>)
}
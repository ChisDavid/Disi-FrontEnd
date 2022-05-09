import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import arSaLocale from 'date-fns/locale/ar-SA';
import enLocale from 'date-fns/locale/en-US';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Stack, StackItem } from '@fluentui/react';
import { ITimeRangePicker } from './TimeRangePicker.types';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
  ar: arSaLocale,
};

export const TimeRangePicker = (props: ITimeRangePicker) => {
  const locale: string = 'ru';
  const [startValue, setStartValue] = React.useState<Date | null>(new Date());
  const [endValue, setEndValue] = React.useState<Date | null>(new Date());
  const [fullValue, setFullValue] = React.useState<string>("");

  React.useEffect(() => {
    const newv = startValue + ";" + endValue;
    setFullValue(newv);
    props.onChangeValue(newv);

  },[startValue, endValue])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
       <Stack>
           <StackItem>
               Start:
           </StackItem>
           <StackItem>
            <TimePicker
                value={startValue}
                onChange={(newValue) => setStartValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                />
            </StackItem>
            <StackItem>
               End:
           </StackItem>
            <StackItem>
                <TimePicker
                    value={endValue}
                    onChange={(newValue) => setEndValue(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    />
            </StackItem>
       </Stack>
    </LocalizationProvider>
  );
}
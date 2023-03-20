import type { FormikHelpers } from 'formik';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

type TextFieldPropsWithoutHandlers = Omit<TextFieldProps, 'onChange' | 'onBlur'> & {
    options?: { value: number | string; label: string }[];
};

// TODO extend props with datepicker|textfield union type
export interface GridFormProps {
    small: TextFieldPropsWithoutHandlers[];
    large: TextFieldPropsWithoutHandlers[];
    disabledSubmit: boolean;
    isSubmitting: boolean;
    handleChange: TextFieldProps['onChange'];
    handleBlur: TextFieldProps['onBlur'];
    setFieldValue: FormikHelpers<unknown>['setFieldValue'];
    onSubmit(): void;
    onClose(): void;
}

const GridForm = ({
    small,
    large,
    disabledSubmit,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    onSubmit,
    onClose,
}: GridFormProps) => {
    const renderTextField = ({ options, ...props }: TextFieldPropsWithoutHandlers, size: 'small' | 'large') => {
        const gridProps = size === 'small' ? { xs: 12, sm: 6 } : { xs: 12 };

        let formElement = <TextField {...props} onChange={handleChange} onBlur={handleBlur} />;

        if (props.type === 'date') {
            formElement = (
                <DatePicker
                    className='reactivities-calender-picker'
                    placeholderText='Date *'
                    name='date'
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    selected={props.value as Date}
                    onChange={(date) => {
                        console.log({ newDate: date });
                        setFieldValue('date', date);
                    }}
                    required
                />
            );
        } else if (props.select && Array.isArray(options)) {
            formElement = (
                <TextField {...props} onChange={handleChange} onBlur={handleBlur}>
                    {options.map((e) => (
                        <MenuItem key={e.value} value={e.value}>
                            {e.label}
                        </MenuItem>
                    ))}
                </TextField>
            );
        }

        return (
            <Grid {...gridProps} item key={props.id}>
                {formElement}
            </Grid>
        );
    };

    return (
        <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {small.map((props) => renderTextField(props, 'small'))}
                {large.map((props) => renderTextField(props, 'large'))}
            </Grid>
            <Button
                type='button'
                fullWidth
                variant='contained'
                sx={{ mt: 3 }}
                disabled={isSubmitting || disabledSubmit}
                onClick={onSubmit}
            >
                {isSubmitting ? <CircularProgress /> : 'Submit'}
            </Button>
            <Button disabled={isSubmitting} type='button' fullWidth variant='outlined' sx={{ mt: 1 }} onClick={onClose}>
                Cancel
            </Button>
        </Box>
    );
};

export default GridForm;

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

type TextFieldPropsWithoutHandlers = Omit<TextFieldProps, 'onChange' | 'onBlur'>;

export interface GridFormProps {
    small: TextFieldPropsWithoutHandlers[];
    large: TextFieldPropsWithoutHandlers[];
    disabledSubmit: boolean;
    isSubmitting: boolean;
    handleChange: TextFieldProps['onChange'];
    handleBlur: TextFieldProps['onBlur'];
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
    onSubmit,
    onClose,
}: GridFormProps) => {
    const renderTextField = (props: TextFieldPropsWithoutHandlers, size: 'small' | 'large') => {
        const gridProps = size === 'small' ? { xs: 12, sm: 6 } : { xs: 12 };

        return (
            <Grid {...gridProps} item key={props.id}>
                <TextField {...props} onChange={handleChange} onBlur={handleBlur} />
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

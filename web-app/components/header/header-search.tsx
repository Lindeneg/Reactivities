import HelpOutline from '@mui/icons-material/HelpOutline';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

export interface HeaderSearchProps {}

const HeaderSearch = ({}: HeaderSearchProps) => {
    return (
        <TextField
            id='outlined-basic'
            label='Global Search (WIP)'
            aria-label='free text global search'
            variant='outlined'
            size='small'
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <Tooltip title='Search for tasks, customers, companies, statuses etc..'>
                            <HelpOutline />
                        </Tooltip>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default HeaderSearch;

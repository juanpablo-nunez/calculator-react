import { grey } from '@mui/material/colors';
import './screen.css'
import Box from '@mui/material/Box';
// eslint-disable-next-line react/prop-types
function Screencalculator({ value }) {

    return (
        <Box
            sx={{
                width: '100%',
                height: 90,
                backgroundColor: grey[200],
                borderRadius: 4,
                textAlign: 'right',
                fontSize: 50,
            }}
        >
            <p>{value || "0"}</p>
        </Box>
    )
}

export default Screencalculator
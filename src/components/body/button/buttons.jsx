import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import PropTypes  from 'prop-types';
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  height: 100,
  width: 100,
  fontSize:40,
  borderRadius: 20,
  backgroundColor: orange[400],
  '&:hover': {
    backgroundColor: '#ffab00',
  },
  '&:target':{
    borderColor:orange[400],
  }
}));


// eslint-disable-next-line react/prop-types
function ButtonCalculator({ valor, onClick }) {
  return (
    <ColorButton onClick={onClick}>{ valor }</ColorButton>
  )
}

ButtonCalculator.protoType = {
  valor: PropTypes.string.isRequired
}
ButtonCalculator.defaultProps = {
  valor: '0'
}
export default ButtonCalculator
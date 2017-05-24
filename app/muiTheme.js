import { getMuiTheme } from 'material-ui/styles';
import { blue900 } from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    primary2Color: blue900,
    primary3Color: blue900,
    alternateTextColor: blue900,
    secondary3Color: blue900,
    pickerHeaderColor: blue900,
    disabledColor: blue900,
  },
  fontFamily: 'Lato',
});

export default theme;

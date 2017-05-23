import { getMuiTheme } from 'material-ui/styles';
import { blue900 } from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    primary1Color: blue900,
    primary2Color: blue900,
    primary3Color: blue900,
  },
  fontFamily: 'Lato',
});

export default theme;

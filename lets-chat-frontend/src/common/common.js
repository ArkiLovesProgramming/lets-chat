import { styled } from "@mui/material";
import Badge from "@mui/material/Badge";

let stringToColor = (string) => {
    let hash = 0;
    let i;
    
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
  
let stringAvatar = (name) => {
    let thisname
    if (name.split(' ').length === 1){
        thisname = name[0] 
    } else {
        thisname = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: thisname,
    };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: -1,
        left: -1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

let data = {stringToColor, stringAvatar, StyledBadge}

export default data;
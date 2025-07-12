import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Button,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.text.primary,
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, ' +
      'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, ' +
      'rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DropDownButton({
  buttonLabel = 'Options',
  options = [],
  variant = 'outlined',
  size = 'small',
  buttonProps = {},
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleOptionClick = (action) => {
    handleClose();
    if (typeof action === 'function') action();
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant={variant}
        size={size}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          option.divider ? (
            <Divider key={`divider-${index}`} sx={{ my: 0.5 }} />
          ) : (
            <MenuItem
              key={index}
              onClick={() => handleOptionClick(option.onClick)}
              disableRipple
            >
              {option.icon && option.icon}
              {option.label}
            </MenuItem>
          )
        ))}
      </StyledMenu>
    </div>
  );
}
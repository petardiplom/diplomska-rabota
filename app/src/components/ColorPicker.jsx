import { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';

export default function ColorPicker({ value = '#2196f3', onChange }) {
    const [color, setColor] = useState(value);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {

        const newColor = e.target.value;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setColor(newColor);
            onChange?.(newColor);
        }, 100);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <TextField
            type="color"
            name="color"
            margin="normal"
            label="Pick a color"
            value={color}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
        //   sx={{ width: 150 }}
        />
    );
}
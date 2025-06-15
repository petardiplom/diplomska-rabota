import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCenter } from '../../contexts/CenterContext';

const CenterCardItem = ({ center }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { setCenterId } = useCenter();

    const handleCardClick = (center) => {
        setCenterId(center.id);
        navigate(`/centers/${center.id}/calendar`);
    }

    return (
        <Card
            onClick={() => handleCardClick(center)}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                },
            }}
        >
                {center.image ? (
                    <CardMedia
                        component="img"
                        height="180"
                        image={center.image}
                        alt={center.name}
                        sx={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Box
                        height={180}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ bgcolor: theme.palette.grey[200] }}
                    >
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                fontSize: 32,
                                bgcolor: theme.palette.primary.main,
                            }}
                        >
                            {center.name?.[0]?.toUpperCase()}
                        </Avatar>
                    </Box>
                )}

                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {center.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {center.description || 'No description available.'}
                    </Typography>
                </CardContent>
        </Card>
    );
};

export default CenterCardItem;

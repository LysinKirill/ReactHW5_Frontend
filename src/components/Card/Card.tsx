import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip
} from "@mui/material";
import { styled } from "@mui/system";
import { IProductProps } from "../ProductList/types";
import { useNavigate } from 'react-router-dom';

const PlaceholderImagePath = "/src/assets/empty_image_placeholder.png";

const StyledCard = styled(Card)(() => ({
    width: '100%',
    maxWidth: 300,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "#256c6a",
    padding: 8,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const TruncatedText = styled(Typography)(() => ({
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const ProductCard: React.FC<IProductProps> = ({ id, name, image, description, category, quantity, price }) => {
    const [validatedImage, setValidatedImage] = useState<string>(PlaceholderImagePath);


    const navigate = useNavigate();

    const handleCardClick = () => navigate(`/products/${id}`);

    useEffect(() => {
        const validateImage = async () => {
            if (!image) return;
            try {
                const img = new Image();
                img.src = image;
                await img.decode();
                setValidatedImage(image);
            } catch {
                setValidatedImage(PlaceholderImagePath);
            }
        };

        validateImage();
    }, [image]);

    return (
        <>
            <Tooltip
                title={
                    <Typography
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {description}
                    </Typography>
                }
                arrow
                placement="top"
            >
                <StyledCard onClick={handleCardClick}>
                    <CardMedia
                        component="img"
                        image={validatedImage}
                        alt={name}
                        sx={{
                            width: "100%",
                            maxHeight: 150,
                            objectFit: "contain",
                            margin: "10px auto",
                        }}
                    />
                    <CardContent>
                        <TruncatedText gutterBottom variant="h6">
                            {name}
                        </TruncatedText>
                        <Typography variant="body2" color="text.secondary">
                            {category}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            In stock: {quantity}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            Price: {price} USD
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Tooltip>
        </>
    );
};

export default ProductCard;

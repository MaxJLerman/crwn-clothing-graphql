import { useContext } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';

import { ProductCardContaier, Footer, NameSpan, PriceSpan } from './product-card.styles.jsx';

const ProductCard = ({ product }) =>
{
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);
    
    return(
        <ProductCardContaier>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <NameSpan>{name}</NameSpan>
                <PriceSpan>{price}</PriceSpan>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContaier>
    );
}

export default ProductCard;
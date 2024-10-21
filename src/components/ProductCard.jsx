import { useTranslation } from '../../node_modules/react-i18next';

function ProductCard({ product }) {
  const { t } = useTranslation();

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.imageUrl} alt={product.productName} />
      <h2>{t('productName')} : {product.productName_ta}</h2>
      <p>{t('price')} : ₹{product.price}</p>
      <button>{t('learnMore')}</button>
    </div>
  );
}

export default ProductCard;

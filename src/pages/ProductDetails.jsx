import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.productName_ta}</h1>
      <img src={product.imageUrl} alt={product.productName} />
      <p>{product.description_ta}</p>
      <p>₹{product.price}</p>
    </div>
  );
}

export default ProductDetails;

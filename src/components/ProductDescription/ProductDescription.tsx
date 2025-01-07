import React from "react";
import "./ProductDescription.css";

interface ProductDescriptionProps {
  image: string;
  title: string;
  subtitle: string;
  tags: string[];
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  image,
  title,
  subtitle,
  tags,
}) => {
  return (
    <div className="product-description">
      <img src={image} alt={title} className="product-image" />
      <h1 className="product-title">{title}</h1>
      <h2 className="product-subtitle">{subtitle}</h2>
      <div className="tags">
        {tags.map((tag, index) => (
          <button key={index} className="tag-button">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;

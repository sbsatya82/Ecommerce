import React from 'react';


const CategorySection = () => {
  return (
    <section className="section category">
      <div className="cat-center">
        <div className="cat">
          <img src="./images/cat3.jpg" alt="Women's Wear" />
          <div>
            <p>WOMEN'S WEAR</p>
          </div>
        </div>
        <div className="cat">
          <img src="./images/cat1.jpg" alt="Men's Wear" />
          <div>
            <p>MEN'S WEAR</p>
          </div>
        </div>
        <div className="cat">
          <img src="./images/cat2.jpg" alt="Kid's Wear" />
          <div>
            <p>KID'S WEAR</p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default CategorySection;

import React from 'react';
import './exploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from our diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy you cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index) => {
                return (
                    <div 
                    onClick={() => setCategory(prev => prev === item.menu_name ? "all" : item.menu_name)} 
                    key={ index } 
                    className="explore-menu-list-item"
                    >
                        <img 
                        className={category === item.menu_name ? "active" : ""} 
                        src={ item.menu_image } 
                        alt={"image of " + item.menu_name } />
                        <p className={category === item.menu_name ? "active" : ""}>{ item.menu_name }</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu;
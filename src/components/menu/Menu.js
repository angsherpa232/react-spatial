import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      element: PropTypes.element,
    }),
  ).isRequired,
  // react-i18next
  t: PropTypes.func.isRequired,
};

const Menu = ({ menuItems, t }) => (
  <div className="tm-menu">
    <div className="tm-menu-content">
      {menuItems.map(item => (
        <div key={item.title}>
          <div className="tm-menu-item-title">{t(item.title)}</div>
          {item.element}
        </div>
      ))}
    </div>
  </div>
);

Menu.propTypes = propTypes;

export default withTranslation()(Menu);

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';


const Header = (props) =>
    <nav>
      <FontAwesomeIcon icon={faBars}  onClick={()=>props.toggleDoc()}/>
    </nav>;

Header.propTypes = {
    props: PropTypes.object,
    toggleDoc: PropTypes.func,
    state: PropTypes.object,
    closedDoc: PropTypes.bool
};
export default Header;

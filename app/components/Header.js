import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


const Header = (props) =>
    <nav onClick={()=>props.toggleDoc()}>
      <FontAwesomeIcon icon="bars"/>
    </nav>;

Header.propTypes = {
    props: PropTypes.object,
    toggleDoc: PropTypes.func,
    state: PropTypes.object,
    closedDoc: PropTypes.bool
};
export default Header;

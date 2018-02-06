/**
 * Created by lcz on 2018/1/5.
 */
import React from 'react';
import PropTypes from 'prop-types';


const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    } else {
        return <a onClick={onClick} href="javascript:void(0);">{children}</a>
    }
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
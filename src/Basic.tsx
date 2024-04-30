import { useRef } from 'react';
import PropTypes from 'prop-types';

function Basic(props) {
    const style = useRef({
        background: '#91e7fc',
        width: 500,
        margin: 'auto',
        padding: 10,
    });
    return (
        <div className="template-rspack-react" style={style.current}>
            This is the React Component module federation
            <h3 className="my-postcss-test-class">Hello World!</h3>
            {props.children}
        </div>
    );
}

Basic.propTypes = {
    children: PropTypes.node,
};
export default Basic;

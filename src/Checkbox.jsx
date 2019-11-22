import  React from "react";
import PropTypes from "prop-types";

const Checkbox = ({name, onChange, checked}) => (
    <div>
        <label>
            {name}
            <input
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange} />
        </label>
    </div>
);

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default Checkbox;
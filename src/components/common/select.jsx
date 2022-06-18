import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} className="form-control" {...rest}>
        <option value="" />
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;

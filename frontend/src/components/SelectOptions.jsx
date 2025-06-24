import React from "react";

function SelectOptions({ options, category, setPreferences, optionKey }) {
  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [optionKey]: newValue,
    }));
  };
  return (
    <div className="border border-gray-700 p-2 rounded-sm">
      <label htmlFor="Headline">
        <span className="text-sm font-medium text-gray-300 ">
          {" "}
          Select {category}{" "}
        </span>

        <select
          name="Headline"
          id="Headline"
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm outline-none"
          onChange={handleSelectChange}
        >
          {options.map((o) => (
            <option value={o.value}>{o.title}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SelectOptions;

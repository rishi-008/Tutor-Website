import React from "react";
/**
 * inputfield component
 * @param {string} placeholder - the text that'll be shown in the input field by default
 * @param {string} label - string to add a label to the top of an input field
 * @param {string} type - specifies the type this input field element should have
 * @param {boolean} isrequired - boolean which may madate the input area to be populated
 * @param {boolean} isSearchBar - boolean to either show or hide the search icon
 * @param {function} onChange - a function that will be called when the input field is changed
 *
 *
 * @returns {JSX.Element} - inputfield component
 *
 * @example
 * <InputArea
 *   placeholder: string
 *   label: string
 *   type: string
 *   name: string
 *   isrequired: boolean
 *   isicon: boolean
 *   onChange: function
 * />
 */
const InputArea = ({ placeholder, label, type, name, isrequired, isicon, onChange }) => {
	

	return (
		<>
			
		

			<style jsx>
				{`
					
				`}
			</style>
		</>
	);
};

InputArea.defaultProps = {
	placeholder: "Enter Text",
	label: "",
	type: "text",
	name: "input-field",
	isrequired: false,
	icon: false,
};

export default InputArea;

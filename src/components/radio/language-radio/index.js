/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import style from './style.scss';

const LanguageRadio = (props) => {
	const labelClass = props.labelClass ? props.labelClass : style.label;
	const wrapperClass = props.wrapperClass || '';

	return (
		<div class={`${style.formRadio} ${wrapperClass}`}>
			{props.label
				&& <label class={labelClass}>{props.label}</label>}
				
			<div class={`${style.radioGroup}`}>
				{
					props.data && props.data.length !== 0 && ( props.data.map(el => (
						<label class={`${style.container} ${props.disabled && style.disabledContainer} ${(el.value === props.value && style.checked)} ${style[el.category]}`} key={el.value}>
							{el.name}
							<input type="radio"
								name={props.name}
								disabled={props.disabled}
								value={el.value}
								checked={el.value === props.value}
								onChange={() => props.onChange(el.value, el.category)}
							/>
						</label>
					)))
				}
			</div>
		</div>
	);
};

export default LanguageRadio;
import "./button.styles.scss";
const Button = ({ text, buttonType, ...otherProps }) => {
	return (
		<button className={`button-container ${buttonType}`} {...otherProps}>
			{`${text}`}
		</button>
	);
};

export default Button;

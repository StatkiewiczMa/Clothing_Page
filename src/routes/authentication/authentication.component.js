import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'
const Authentication = () => {
	return (
		<div className="sign-in-page-container">

			<div className='sign-forms'>
				<SignInForm />
				<SignUpForm />
			</div>
		</div>
	);
};

export default Authentication;

import logo from "../assets/images/logo.png";

interface LogoProps {
	className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
	return (
		<img src={logo} alt="jobify" className={`w-32 lg:w-40 ${className}`} />
	);
};

export default Logo;

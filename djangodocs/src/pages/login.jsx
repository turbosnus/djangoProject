import { LoginForm } from "../components/login-form/login-form";

function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="flex flex-col gap-8 w-full">
				{/* <h1 className="text-center text-4xl font-bold text-gray-900">Авторизация</h1> */}
				<LoginForm />
			</div>
		</div>
	);
}

export { Login };

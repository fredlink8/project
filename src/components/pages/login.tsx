import { Link } from 'react-router-dom';
import { AuthForm } from '../auth/auth-form';

export function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>
      <AuthForm mode="login" />
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:text-blue-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}
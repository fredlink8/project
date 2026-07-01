import { Link } from 'react-router-dom';
import { AuthForm } from '../auth/auth-form';

export function RegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <AuthForm mode="register" />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
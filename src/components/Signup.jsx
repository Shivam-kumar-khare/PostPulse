import { useState } from 'react';
import authService from '../services/auth.services.js';
import { login as AuthLogin } from '../redux/authSlice.js';
import { CustomBtn, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm();

    const createAccount = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const accountData = await authService.getAccount();

                // console.log("Account data on signup ==\n",accountData)
                dispatch(AuthLogin({ userData: accountData }));
                navigate('/');
            }
        } catch (e) {
            setError(e.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(createAccount)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            {...register('name', { required: true })}
                        />
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid address',
                                },
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', { required: true })}
                        />
                        <CustomBtn type="submit" className="w-full">
                            Create Account
                        </CustomBtn>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

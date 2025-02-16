import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import arrowBack from '../../assets/arrow1.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../axios';
interface AxiosError {
  response?: {
    data: {
      message: string;
    };
    status: number;
    statusText: string;
  };
  request: XMLHttpRequest;
  message: string;
}
type UserData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  agree: boolean;
};
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    agree: false,
  });

  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,

      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agree) {
      alert('You must agree to the terms!');
      return;
    }

    try {
      const response = await Api.post(`/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        agree: formData.agree,
      });

      console.log('Registration Success:', response.data);
      alert('Account created successfully!');
      navigate('/login');
    } catch (error) {
      console.log('Registration Error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (typeof error === 'object' && error !== null) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          errorMessage =
            axiosError.response.data.message || axiosError.response.statusText;
        } else if (axiosError.request) {
          errorMessage =
            'No response from the server. Please check your internet connection.';
        } else {
          errorMessage = axiosError.message;
        }
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="relative px-4 bg-slate-900">
      <div
        onClick={() => {
          navigate('/');
        }}
        className="absolute top-5 left-5 flex gap-2 items-center p-2 rounded cursor-pointer"
      >
        <button aria-label="btn-back">
          <img src={arrowBack} alt="" width={25} />
        </button>
        <span className="text-white">Back</span>
      </div>
      <form
        className="flex max-w-md mx-auto flex-col justify-center h-screen gap-4"
        onSubmit={handleSubmit}
      >
        <span className=" text-slate-100 text-center text-lg font-semibold">
          Create an account
        </span>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="John Doe"
            required
            shadow
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            shadow
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            shadow
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeatPassword" value="Repeat password" />
          </div>
          <TextInput
            id="repeatPassword"
            type="password"
            required
            shadow
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <span className="text-red-600 text-xs">{error}</span>
        <div className="flex items-center gap-2">
          <Checkbox
            id="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link
              to="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
        <p className=" text-center  text-slate-500 text-lg">
          Aleady have account?
          <Link
            to="/login"
            className="font-medium px-1 text-indigo-500 underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

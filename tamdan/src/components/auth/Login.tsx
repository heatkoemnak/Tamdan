import { Button, Label, TextInput } from 'flowbite-react';
import arrowBack from '../../assets/arrow1.png';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FormDataType, AppContextType } from '../../types';

const Login = () => {
  const { setUser } = useContext(AppContext) as AppContextType;

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    if (formData.password === '' && formData.email === '') {
      alert('Please enter email and password!');
      return;
    }

    try {
      const response = await axios.post(
        `https://tamdan-server.vercel.app/api/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);

      if (response.status === 200) {
        const { data } = await axios.get(
          `https://tamdan-server.vercel.app/api/user`
        );
        if (data) {
          setUser(data.user);
        }
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      console.log('Login Error:', error);
    }
  };

  return (
    <div className="relative bg-slate-900">
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
        className="flex max-w-md mx-auto px-4 flex-col justify-center h-screen gap-4"
        onSubmit={handleSubmit}
      >
        <span className=" text-slate-100 text-center text-lg font-semibold">
          Login to your account
        </span>
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
        <Button type="submit">Login</Button>
        <p className="text-center  text-slate-500 text-lg">
          No account?
          <Link
            to="/register"
            className="font-medium px-1 text-indigo-500 underline-offset-4 hover:underline"
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

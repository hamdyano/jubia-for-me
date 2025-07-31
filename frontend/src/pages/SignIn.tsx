import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "@/api-client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastProvider";


interface LoginFormData {
  email: string;
  password: string;
}

export default function SignInPage() {
  
  const navigate = useNavigate();
  const [, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
   const { login } = useAuth();
    const { showSuccess, showError } = useToast();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);
  setError(null);
   try {
       const response = await loginUser(data);
      login(data.email, response.token);
      
    
      showSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      showError(`Login failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center">
      <Card className="bg-[#111827] w-full max-w-3xl p-6 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-3xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-3 py-2 bg-white text-black"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded px-3 py-2 bg-white text-black"
                {...register("password", { 
                  required: "Password is required"
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded            font-bold hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out rounded"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-white">
            Don't have an account?{" "}
            <Link to="/register" className="underline text-blue-400">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}















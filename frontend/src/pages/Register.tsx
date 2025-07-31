import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "@/api-client";
import { useState } from "react";
import { useToast } from "@/contexts/ToastProvider";

interface RegisterFormData {
  name: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
   const { showSuccess, } = useToast();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
 // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update the onSubmit function



// Add this inside the onSubmit function
const onSubmit = async (data: RegisterFormData) => {
  setIsLoading(true);
  setError(null);
  
  try {
    await registerUser(data);
      showSuccess("Registration successful! Redirecting to login...");
    
    // Redirect to login page after success
    setTimeout(() => {
      navigate('/sign-in');
    }, 2000);
  } catch (err) {
    // Handle specific error messages
    let errorMessage = 'Registration failed';
    if (err instanceof Error) {
      errorMessage = err.message;
      
      // Handle specific backend errors
      if (errorMessage.includes("Email already exists")) {
        setError("This email is already registered");
      } else if (errorMessage.includes("Passwords do not match")) {
        setError("Passwords do not match");
      } else {
        setError(errorMessage);
      }
    } else {
      setError('An unknown error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};

return (
  <div className="flex justify-center items-center">
      <Card className="bg-[#111827] w-full max-w-3xl p-6 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-3xl">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded px-3 py-2 bg-white text-black"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Mobile"
                className="w-full border rounded px-3 py-2 bg-white text-black"
                {...register("mobile", { 
                  required: "Mobile is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid mobile number"
                  }
                })}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>
            
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
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border rounded px-3 py-2 bg-white text-black"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => 
                    value === watch('password') || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out rounded"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          
          <div className="text-white mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline text-blue-400">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}






/*

{error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded text-center">
              {error}
            </div>
          )}

          */




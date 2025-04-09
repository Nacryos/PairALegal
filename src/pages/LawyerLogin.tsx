
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Scale, Shield, UserCheck, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const LawyerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // In a real app, we would validate the password
      // For MVP, we're just checking if the email exists in our mock data
      const success = await login(values.email, values.password);
      
      if (success) {
        navigate("/lawyer-dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Scale className="h-12 w-12 text-legal-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-legal-primary">
          Legal Professional Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your matched cases and document drafting tools
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-t-4 border-t-legal-primary">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="your@email.com" 
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-legal-primary hover:bg-legal-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-xs text-gray-600">
              For demo purposes, use:
              <div className="mt-1 font-mono bg-gray-100 p-2 rounded text-sm">
                sarah.johnson@legalmatch.com
              </div>
              <div className="mt-1">
                (any password will work)
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-xs text-center text-gray-500 flex items-center">
              <Shield className="h-4 w-4 mr-1 text-legal-primary" />
              Secure login for legal professionals only
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LawyerLogin;

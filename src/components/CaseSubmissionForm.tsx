
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ClientCase } from "../types";
import { generateId } from "../utils/helpers";

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  caseType: z.string({
    required_error: "Please select a case type.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  budgetSensitivity: z.string({
    required_error: "Please select your budget sensitivity.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CaseSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      caseType: "",
      location: "",
      budgetSensitivity: "",
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // For MVP, simulate API submission with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Construct case object
    const newCase: ClientCase = {
      id: generateId(),
      description: values.description,
      caseType: values.caseType as any,
      location: values.location,
      budgetSensitivity: values.budgetSensitivity as any,
      email: values.email,
      submissionDate: new Date().toISOString(),
      status: 'Pending'
    };
    
    // For MVP, store in localStorage
    const existingCases = JSON.parse(localStorage.getItem('submittedCases') || '[]');
    existingCases.push(newCase);
    localStorage.setItem('submittedCases', JSON.stringify(existingCases));
    
    toast({
      title: "Case Submitted Successfully",
      description: "A matched lawyer may contact you soon.",
    });
    
    // Reset form
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-legal-primary">Submit Your Case</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Case Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your legal issue in detail..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Be specific but do not include sensitive personal information.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="caseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a case type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Business Law">Business Law</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Personal Injury">Personal Injury</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                      <SelectItem value="Estate Planning">Estate Planning</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                      <SelectItem value="Immigration">Immigration</SelectItem>
                      <SelectItem value="Tax Law">Tax Law</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where you need legal services
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="budgetSensitivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Sensitivity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget sensitivity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low - Cost is not a primary concern</SelectItem>
                      <SelectItem value="Medium">Medium - Balanced approach to cost</SelectItem>
                      <SelectItem value="High">High - Cost is a significant factor</SelectItem>
                      <SelectItem value="Not Specified">Prefer not to specify</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    For communication with matched lawyers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-legal-primary hover:bg-legal-secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Case"}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-4">
            By submitting this form, you acknowledge that this does not establish an attorney-client relationship.
            Matched lawyers may contact you directly to determine if they can assist with your case.
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CaseSubmissionForm;

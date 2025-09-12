"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from '@/app/config/emailjs';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must contain at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must contain at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init(emailjsConfig.publicKey);
    } catch (error) {
      console.error('EmailJS initialization error:', error);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!emailjsConfig.serviceId || !emailjsConfig.templateId) {
        throw new Error('EmailJS configuration is missing');
      }

      // Prepare data for sending via EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        company: data.company || "Not specified",
        message: data.message,
        subject: "NEW PORTFOLIO - Contact Form Submission"
      };

      // Send email via EmailJS directly from the client
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      );

      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : "An error occurred while sending the form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get in touch with me to discuss projects and collaborations
            </p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl space-y-8 py-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                Company
              </Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Your company name (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                className="min-h-[120px]"
                placeholder="Your message"
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
          {isSuccess && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 text-green-800 dark:text-green-400">
              <p>Thank you for your message! I will get back to you soon.</p>
            </div>
          )}
          {error && (
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <p>{error}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
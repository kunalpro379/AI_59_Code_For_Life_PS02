import { SignupForm } from "@/components/auth/signup-form";
import { motion } from "framer-motion";

export default function SignupPage() {
     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
               >
                    <SignupForm />
               </motion.div>
          </div>
     );
}
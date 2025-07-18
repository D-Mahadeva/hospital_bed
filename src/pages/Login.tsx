import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"doctor" | "receptionist">("doctor");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleLogin = () => {
    if (loginType === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/receptionist-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-white/20 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-3xl font-bold text-white glow-text">
                Hospital Login
              </CardTitle>
            </motion.div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "doctor" | "receptionist")}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50">
                  <TabsTrigger 
                    value="doctor" 
                    className="text-white data-[state=active]:bg-hospital-red data-[state=active]:text-white"
                  >
                    Doctor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="receptionist"
                    className="text-white data-[state=active]:bg-hospital-red data-[state=active]:text-white"
                  >
                    Receptionist
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="doctor" className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="doctor-username" className="text-white">Username</Label>
                  <Input
                    id="doctor-username"
                    placeholder="Enter doctor ID"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-secondary/50 border-white/20 text-white placeholder:text-white/60"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="doctor-password" className="text-white">Password</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-secondary/50 border-white/20 text-white placeholder:text-white/60"
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="receptionist" className="space-y-4">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="receptionist-username" className="text-white">Username</Label>
                  <Input
                    id="receptionist-username"
                    placeholder="Enter receptionist ID"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="bg-secondary/50 border-white/20 text-white placeholder:text-white/60"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="receptionist-password" className="text-white">Password</Label>
                  <Input
                    id="receptionist-password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-secondary/50 border-white/20 text-white placeholder:text-white/60"
                  />
                </motion.div>
              </TabsContent>
            </Tabs>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Button
                onClick={handleLogin}
                className="w-full bg-hospital-red hover:bg-hospital-red-dark text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-glow"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login as {loginType === "doctor" ? "Doctor" : "Receptionist"}
                </motion.span>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AccountPanelProps {
  userType: "doctor" | "receptionist";
  name: string;
  id: string;
  department?: string;
  shift?: string;
  status: "active" | "break" | "off-duty";
}

const AccountPanel = ({ userType, name, id, department, shift, status }: AccountPanelProps) => {
  const statusColors = {
    active: "bg-bed-available",
    break: "bg-bed-cleaning", 
    "off-duty": "bg-bed-occupied"
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-80"
    >
      <Card className="glass border-white/20 backdrop-blur-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-hospital-red">
              <AvatarImage src="" />
              <AvatarFallback className="bg-hospital-red text-white font-bold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-white/70 capitalize">{userType}</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80">ID:</span>
              <span className="text-white font-mono">{id}</span>
            </div>
            
            {department && (
              <div className="flex justify-between items-center">
                <span className="text-white/80">Department:</span>
                <span className="text-white">{department}</span>
              </div>
            )}
            
            {shift && (
              <div className="flex justify-between items-center">
                <span className="text-white/80">Shift:</span>
                <span className="text-white">{shift}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Status:</span>
              <Badge className={`${statusColors[status]} text-white border-0 capitalize`}>
                {status.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          <motion.div
            className="pt-4 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-white/60 text-center">
              Last login: Today, 08:30 AM
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountPanel;
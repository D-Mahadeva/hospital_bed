import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Pill, User, AlertCircle } from "lucide-react";

interface PatientData {
  name: string;
  age: number;
  bedNumber: string;
  disease: string;
  admissionDate: string;
  criticality: "critical" | "medium" | "normal";
  medicines: {
    name: string;
    dosage: string;
    timing: string;
  }[];
  vitals?: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenLevel: number;
  };
}

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: PatientData | null;
}

const PatientModal = ({ isOpen, onClose, patientData }: PatientModalProps) => {
  if (!patientData) return null;

  const criticalityColors = {
    critical: "bg-bed-critical",
    medium: "bg-bed-medium",
    normal: "bg-bed-normal"
  };

  const criticalityIcons = {
    critical: <AlertCircle className="w-4 h-4" />,
    medium: <Clock className="w-4 h-4" />,
    normal: <User className="w-4 h-4" />
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/20 backdrop-blur-md max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-3">
            <User className="w-6 h-6 text-hospital-red" />
            Patient Details - Bed {patientData.bedNumber}
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Patient Info */}
          <Card className="glass border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between">
                <span>{patientData.name}</span>
                <Badge className={`${criticalityColors[patientData.criticality]} text-white border-0 flex items-center gap-1`}>
                  {criticalityIcons[patientData.criticality]}
                  {patientData.criticality.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-white/80">
                  <User className="w-4 h-4" />
                  <span>Age: {patientData.age} years</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CalendarDays className="w-4 h-4" />
                  <span>Admitted: {patientData.admissionDate}</span>
                </div>
              </div>
              <div className="text-white/80">
                <strong>Condition:</strong> {patientData.disease}
              </div>
            </CardContent>
          </Card>

          {/* Vitals */}
          {patientData.vitals && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg">Vital Signs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-hospital-red">{patientData.vitals.heartRate}</div>
                      <div className="text-xs text-white/70">Heart Rate (BPM)</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-hospital-red">{patientData.vitals.bloodPressure}</div>
                      <div className="text-xs text-white/70">Blood Pressure</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-hospital-red">{patientData.vitals.temperature}°F</div>
                      <div className="text-xs text-white/70">Temperature</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-hospital-red">{patientData.vitals.oxygenLevel}%</div>
                      <div className="text-xs text-white/70">Oxygen Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Medicines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Pill className="w-5 h-5 text-hospital-red" />
                  Prescribed Medicines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientData.medicines.map((medicine, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-3 bg-secondary/30 rounded-lg border border-white/10"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-white">{medicine.name}</h4>
                          <p className="text-sm text-white/70">Dosage: {medicine.dosage}</p>
                        </div>
                        <Badge variant="outline" className="text-hospital-red border-hospital-red">
                          {medicine.timing}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientModal;
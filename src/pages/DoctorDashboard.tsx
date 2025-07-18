import { motion } from "framer-motion";
import { useState } from "react";
import { Stethoscope, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import AccountPanel from "@/components/AccountPanel";
import BedIcon from "@/components/BedIcon";
import PatientModal from "@/components/PatientModal";

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data
  const doctorData = {
    name: "Dr. Michael Chen",
    id: "DOC001", 
    department: "Emergency Medicine",
    shift: "Night Shift (6PM - 8AM)",
    status: "active" as const
  };

  // Sample patient data
  const patientBeds = [
    {
      id: "B001",
      status: "critical" as const,
      patient: {
        name: "John Smith",
        age: 45,
        bedNumber: "B001",
        disease: "Acute Myocardial Infarction",
        admissionDate: "2024-01-15",
        criticality: "critical" as const,
        medicines: [
          { name: "Aspirin", dosage: "325mg", timing: "Once daily" },
          { name: "Metoprolol", dosage: "50mg", timing: "Twice daily" },
          { name: "Atorvastatin", dosage: "40mg", timing: "Bedtime" }
        ],
        vitals: {
          heartRate: 102,
          bloodPressure: "140/90",
          temperature: 99.2,
          oxygenLevel: 95
        }
      }
    },
    {
      id: "B003", 
      status: "medium" as const,
      patient: {
        name: "Maria Garcia",
        age: 32,
        bedNumber: "B003",
        disease: "Pneumonia",
        admissionDate: "2024-01-16",
        criticality: "medium" as const,
        medicines: [
          { name: "Azithromycin", dosage: "500mg", timing: "Once daily" },
          { name: "Albuterol", dosage: "2 puffs", timing: "Every 4 hours" }
        ],
        vitals: {
          heartRate: 88,
          bloodPressure: "120/80",
          temperature: 100.1,
          oxygenLevel: 92
        }
      }
    },
    {
      id: "B005",
      status: "normal" as const,
      patient: {
        name: "Robert Johnson",
        age: 28,
        bedNumber: "B005", 
        disease: "Appendectomy Recovery",
        admissionDate: "2024-01-17",
        criticality: "normal" as const,
        medicines: [
          { name: "Ibuprofen", dosage: "400mg", timing: "Every 6 hours" },
          { name: "Amoxicillin", dosage: "500mg", timing: "Three times daily" }
        ],
        vitals: {
          heartRate: 72,
          bloodPressure: "118/76",
          temperature: 98.6,
          oxygenLevel: 98
        }
      }
    },
    { id: "B007", status: "critical" as const, patient: null },
    { id: "B008", status: "medium" as const, patient: null },
    { id: "B010", status: "normal" as const, patient: null },
    { id: "B012", status: "critical" as const, patient: null },
    { id: "B014", status: "normal" as const, patient: null },
    { id: "B015", status: "medium" as const, patient: null },
    { id: "B016", status: "critical" as const, patient: null },
    { id: "B018", status: "normal" as const, patient: null },
    { id: "B020", status: "medium" as const, patient: null },
  ];

  const handleBedClick = (bed: any) => {
    if (bed.patient) {
      setSelectedPatient(bed.patient);
      setIsModalOpen(true);
    }
  };

  const stats = {
    critical: patientBeds.filter(b => b.status === "critical").length,
    medium: patientBeds.filter(b => b.status === "medium").length,
    normal: patientBeds.filter(b => b.status === "normal").length
  };

  return (
    <div className="min-h-screen bg-gradient-radial p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white glow-text mb-2">
            Doctor Dashboard
          </h1>
          <p className="text-white/70">Monitor patient conditions and medical status</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Critical Patients</h3>
                    <div className="text-3xl font-bold text-bed-critical">{stats.critical}</div>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-bed-critical" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Medium Priority</h3>
                    <div className="text-3xl font-bold text-bed-medium">{stats.medium}</div>
                  </div>
                  <Clock className="w-12 h-12 text-bed-medium" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Stable Patients</h3>
                    <div className="text-3xl font-bold text-bed-normal">{stats.normal}</div>
                  </div>
                  <CheckCircle className="w-12 h-12 text-bed-normal" />
                </div>
              </motion.div>
            </div>

            {/* Patient Bed Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass border-white/20 backdrop-blur-md rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Stethoscope className="w-6 h-6 text-hospital-red" />
                Patient Monitoring
              </h2>
              
              <div className="mb-4 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-bed-critical rounded"></div>
                  <span className="text-white/80">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-bed-medium rounded"></div>
                  <span className="text-white/80">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-bed-normal rounded"></div>
                  <span className="text-white/80">Normal</span>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {patientBeds.map((bed, index) => (
                  <motion.div
                    key={bed.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <BedIcon
                      status={bed.status}
                      bedNumber={bed.id}
                      size="lg"
                      onClick={() => handleBedClick(bed)}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 bg-secondary/30 rounded-lg border border-white/10"
              >
                <p className="text-white/70 text-sm text-center">
                  Click on any bed to view detailed patient information
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Account Panel */}
          <AccountPanel
            userType="doctor"
            name={doctorData.name}
            id={doctorData.id}
            department={doctorData.department}
            shift={doctorData.shift}
            status={doctorData.status}
          />
        </div>
      </div>

      {/* Patient Modal */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patientData={selectedPatient}
      />
    </div>
  );
};

export default DoctorDashboard;
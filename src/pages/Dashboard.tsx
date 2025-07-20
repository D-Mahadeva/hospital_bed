import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Stethoscope, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Bed, 
  Users, 
  UserCheck, 
  Eye,
  Home,
  Plus,
  Trash2,
  Edit,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BedIcon from "@/components/BedIcon";
import PatientModal from "@/components/PatientModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { apiService, type Bed as BedType, type Patient, type DashboardStats, type Doctor } from "@/services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [beds, setBeds] = useState<BedType[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bedsData, patientsData, doctorsData, statsData] = await Promise.all([
        apiService.getBeds(),
        apiService.getPatients(),
        apiService.getDoctors(),
        apiService.getDashboardStats()
      ]);
      setBeds(bedsData);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setStats(statsData);
    } catch (error: any) {
      toast.error('Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBedClick = (bed: BedType) => {
    if (bed.patientId) {
      setSelectedPatient(bed.patientId);
      setIsModalOpen(true);
    } else {
      toast.info(`Bed ${bed.bedNumber} is ${bed.status}`);
    }
  };

  const handleInitSampleData = async () => {
    try {
      await apiService.initSampleData();
      toast.success('Sample data initialized successfully!');
      loadData();
    } catch (error: any) {
      toast.info(error.message);
    }
  };

  const handleClearData = async () => {
    try {
      await apiService.clearAllData();
      toast.success('All data cleared successfully!');
      loadData();
    } catch (error: any) {
      toast.error('Failed to clear data: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-radial flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-radial p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-white glow-text mb-2">
              Hospital Management Dashboard
            </h1>
            <p className="text-white/70">Real-time monitoring and management system</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              onClick={loadData}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-secondary/50">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-hospital-red data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="patients" className="text-white data-[state=active]:bg-hospital-red data-[state=active]:text-white">
                Patients
              </TabsTrigger>
              <TabsTrigger value="beds" className="text-white data-[state=active]:bg-hospital-red data-[state=active]:text-white">
                Beds
              </TabsTrigger>
              <TabsTrigger value="doctors" className="text-white data-[state=active]:bg-hospital-red data-[state=active]:text-white">
                Doctors
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Total Patients</h3>
                      <div className="text-3xl font-bold text-white">{stats.totalPatients}</div>
                      <div className="text-sm text-white/60 mt-2">
                        Critical: {stats.criticalPatients} | Medium: {stats.mediumPatients} | Normal: {stats.normalPatients}
                      </div>
                    </div>
                    <Users className="w-12 h-12 text-hospital-red" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Available Beds</h3>
                      <div className="text-3xl font-bold text-bed-available">{stats.availableBeds}</div>
                      <div className="text-sm text-white/60 mt-2">
                        Total: {stats.totalBeds} | Occupied: {stats.occupiedBeds}
                      </div>
                    </div>
                    <Bed className="w-12 h-12 text-bed-available" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Doctors Available</h3>
                      <div className="text-3xl font-bold text-blue-400">{stats.doctorsAvailable}</div>
                      <div className="text-sm text-white/60 mt-2">
                        On duty and available
                      </div>
                    </div>
                    <UserCheck className="w-12 h-12 text-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass border-white/20 backdrop-blur-md rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Cleaning Beds</h3>
                      <div className="text-3xl font-bold text-bed-cleaning">{stats.cleaningBeds}</div>
                      <div className="text-sm text-white/60 mt-2">
                        Under maintenance
                      </div>
                    </div>
                    <Eye className="w-12 h-12 text-bed-cleaning" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Bed Status Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass border-white/20 backdrop-blur-md rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Bed className="w-6 h-6 text-hospital-red" />
                Real-time Bed Status
              </h2>
              
              <div className="mb-4 flex gap-6 text-sm flex-wrap">
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
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-bed-available rounded"></div>
                  <span className="text-white/80">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-bed-cleaning rounded"></div>
                  <span className="text-white/80">Cleaning</span>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {beds.map((bed, index) => (
                  <motion.div
                    key={bed.bedNumber}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.02 }}
                  >
                    <BedIcon
                      status={bed.status as any}
                      bedNumber={bed.bedNumber}
                      size="md"
                      onClick={() => handleBedClick(bed)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border-white/20 backdrop-blur-md rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-hospital-red" />
                  Patient Management
                </h2>
                <Button
                  className="bg-hospital-red hover:bg-hospital-red-dark text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </div>

              <div className="grid gap-4">
                {patients.map((patient, index) => (
                  <motion.div
                    key={patient._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-secondary/30 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            patient.criticality === 'critical' ? 'bg-bed-critical' :
                            patient.criticality === 'medium' ? 'bg-bed-medium' : 'bg-bed-normal'
                          } text-white`}>
                            {patient.criticality.toUpperCase()}
                          </span>
                          <span className="text-white/60">Bed {patient.bedNumber}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-white/60">Age:</span>
                            <span className="text-white ml-2">{patient.age}</span>
                          </div>
                          <div>
                            <span className="text-white/60">Disease:</span>
                            <span className="text-white ml-2">{patient.disease}</span>
                          </div>
                          <div>
                            <span className="text-white/60">Admitted:</span>
                            <span className="text-white ml-2">
                              {new Date(patient.admissionDate).toLocaleDateString()}
                            </span>
                          </div>
                          {patient.vitals && (
                            <div>
                              <span className="text-white/60">Heart Rate:</span>
                              <span className="text-white ml-2">{patient.vitals.heartRate} BPM</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white border-white/20 hover:bg-white/10"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setIsModalOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white border-white/20 hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Beds Tab */}
          <TabsContent value="beds">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border-white/20 backdrop-blur-md rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Bed className="w-6 h-6 text-hospital-red" />
                  Bed Management
                </h2>
                <Button
                  className="bg-hospital-red hover:bg-hospital-red-dark text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bed
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beds.map((bed, index) => (
                  <motion.div
                    key={bed.bedNumber}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-secondary/30 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <BedIcon
                          status={bed.status as any}
                          bedNumber={bed.bedNumber}
                          size="sm"
                          showTooltip={false}
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">Bed {bed.bedNumber}</h3>
                          <p className="text-sm text-white/60">
                            {bed.floor && bed.room ? `Floor ${bed.floor}, Room ${bed.room}` : 'General Ward'}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        bed.status === 'available' ? 'bg-bed-available' :
                        bed.status === 'cleaning' ? 'bg-bed-cleaning' :
                        bed.status === 'critical' ? 'bg-bed-critical' :
                        bed.status === 'medium' ? 'bg-bed-medium' : 'bg-bed-normal'
                      } text-white`}>
                        {bed.status.toUpperCase()}
                      </span>
                    </div>

                    {bed.patientId && (
                      <div className="text-sm">
                        <p className="text-white/80">Patient: {bed.patientId.name}</p>
                        <p className="text-white/60">Age: {bed.patientId.age}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white/20 hover:bg-white/10 flex-1"
                        onClick={() => bed.patientId && handleBedClick(bed)}
                        disabled={!bed.patientId}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white/20 hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border-white/20 backdrop-blur-md rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-hospital-red" />
                  Doctor Management
                </h2>
                <Button
                  className="bg-hospital-red hover:bg-hospital-red-dark text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Doctor
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor, index) => (
                  <motion.div
                    key={doctor._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-secondary/30 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                        <p className="text-sm text-white/60">{doctor.department}</p>
                        <p className="text-xs text-white/50">{doctor.shift}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        doctor.status === 'active' ? 'bg-bed-available' :
                        doctor.status === 'break' ? 'bg-bed-cleaning' : 'bg-bed-occupied'
                      } text-white`}>
                        {doctor.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white/20 hover:bg-white/10 flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Admin Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass border-white/20 backdrop-blur-md rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Admin Controls</h3>
          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={handleInitSampleData}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Initialize Sample Data
            </Button>
            <Button
              onClick={handleClearData}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
            <div className="text-white/60 text-sm flex items-center">
              <span>Use these controls to manage demo data</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Patient Modal */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patientData={selectedPatient as any}
      />
    </div>
  );
};

export default Dashboard;
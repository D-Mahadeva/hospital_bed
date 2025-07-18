import { motion } from "framer-motion";
import { useState } from "react";
import { Bed, Users, UserCheck, Eye } from "lucide-react";
import AccountPanel from "@/components/AccountPanel";
import StatsCard from "@/components/StatsCard";
import BedIcon from "@/components/BedIcon";

const ReceptionistDashboard = () => {
  const [hoveredBed, setHoveredBed] = useState<string | null>(null);

  // Sample data
  const receptionistData = {
    name: "Sarah Johnson",
    id: "REC001",
    department: "Reception",
    shift: "Day Shift (8AM - 6PM)",
    status: "active" as const
  };

  const stats = {
    availableBeds: 12,
    doctorsAvailable: 8,
    totalPatients: 45,
    bedBreakdown: [
      { label: "ICU", count: 3 },
      { label: "Normal", count: 7 },
      { label: "General", count: 2 }
    ]
  };

  // Sample bed data
  const beds = [
    { id: "B001", status: "occupied" as const },
    { id: "B002", status: "available" as const },
    { id: "B003", status: "cleaning" as const },
    { id: "B004", status: "occupied" as const },
    { id: "B005", status: "available" as const },
    { id: "B006", status: "occupied" as const },
    { id: "B007", status: "available" as const },
    { id: "B008", status: "cleaning" as const },
    { id: "B009", status: "occupied" as const },
    { id: "B010", status: "available" as const },
    { id: "B011", status: "occupied" as const },
    { id: "B012", status: "available" as const },
    { id: "B013", status: "cleaning" as const },
    { id: "B014", status: "available" as const },
    { id: "B015", status: "occupied" as const },
    { id: "B016", status: "available" as const },
  ];

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
            Receptionist Dashboard
          </h1>
          <p className="text-white/70">Monitor hospital operations and bed status</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Available Beds"
                value={stats.availableBeds}
                icon={<Bed className="w-8 h-8" />}
                breakdown={stats.bedBreakdown}
                delay={0}
                color="green"
              />
              
              <StatsCard
                title="Doctors Available"
                value={stats.doctorsAvailable}
                icon={<UserCheck className="w-8 h-8" />}
                subtext="Currently on duty"
                delay={0.1}
                color="blue"
              />
              
              <StatsCard
                title="Total Patients"
                value={stats.totalPatients}
                icon={<Users className="w-8 h-8" />}
                subtext="Currently admitted"
                delay={0.2}
                color="yellow"
              />
              
              <StatsCard
                title="View Bed Status"
                value="Live"
                icon={<Eye className="w-8 h-8" />}
                subtext="Real-time monitoring"
                delay={0.3}
                color="red"
              />
            </div>

            {/* Bed Status Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass border-white/20 backdrop-blur-md rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Bed className="w-6 h-6 text-hospital-red" />
                Bed Status Overview
              </h2>
              
              <div className="mb-4 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-bed-occupied rounded"></div>
                  <span className="text-white/80">Occupied</span>
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
                    key={bed.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    onHoverStart={() => setHoveredBed(bed.id)}
                    onHoverEnd={() => setHoveredBed(null)}
                  >
                    <BedIcon
                      status={bed.status}
                      bedNumber={bed.id}
                      size="md"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Account Panel */}
          <AccountPanel
            userType="receptionist"
            name={receptionistData.name}
            id={receptionistData.id}
            department={receptionistData.department}
            shift={receptionistData.shift}
            status={receptionistData.status}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
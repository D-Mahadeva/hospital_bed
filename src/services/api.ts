const API_BASE_URL = 'http://localhost:5000/api';

interface Patient {
  _id?: string;
  name: string;
  age: number;
  bedNumber: string;
  disease: string;
  admissionDate: string;
  criticality: 'critical' | 'medium' | 'normal';
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
  isActive?: boolean;
}

interface Bed {
  _id?: string;
  bedNumber: string;
  status: 'occupied' | 'available' | 'cleaning' | 'critical' | 'medium' | 'normal';
  patientId?: Patient;
  floor?: string;
  room?: string;
}

interface Doctor {
  _id?: string;
  name: string;
  department?: string;
  shift?: string;
  status: 'active' | 'break' | 'off-duty';
}

interface DashboardStats {
  totalPatients: number;
  availableBeds: number;
  occupiedBeds: number;
  criticalPatients: number;
  mediumPatients: number;
  normalPatients: number;
  cleaningBeds: number;
  doctorsAvailable: number;
  totalBeds: number;
}

class ApiService {
  private async handleResponse(response: Response) {
    console.log(`API ${response.url}: ${response.status}`);
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.error || error.message || errorMessage;
      } catch (e) {
        errorMessage = `${errorMessage}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log(`API Response:`, data);
    return data;
  }

  private async makeRequest(url: string, options: RequestInit = {}) {
    try {
      console.log(`Making request to: ${url}`);
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error(`API Error for ${url}:`, error);
      throw error;
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/test`);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Patient methods
  async getPatients(): Promise<Patient[]> {
    return this.makeRequest(`${API_BASE_URL}/patients`);
  }

  async getPatient(id: string): Promise<Patient> {
    return this.makeRequest(`${API_BASE_URL}/patients/${id}`);
  }

  async createPatient(patient: Omit<Patient, '_id'>): Promise<Patient> {
    return this.makeRequest(`${API_BASE_URL}/patients`, {
      method: 'POST',
      body: JSON.stringify(patient),
    });
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
    return this.makeRequest(`${API_BASE_URL}/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patient),
    });
  }

  async dischargePatient(id: string): Promise<{ message: string }> {
    return this.makeRequest(`${API_BASE_URL}/patients/${id}`, {
      method: 'DELETE',
    });
  }

  // Bed methods
  async getBeds(): Promise<Bed[]> {
    return this.makeRequest(`${API_BASE_URL}/beds`);
  }

  async createBed(bed: Omit<Bed, '_id'>): Promise<Bed> {
    return this.makeRequest(`${API_BASE_URL}/beds`, {
      method: 'POST',
      body: JSON.stringify(bed),
    });
  }

  async updateBed(bedNumber: string, updates: Partial<Bed>): Promise<Bed> {
    return this.makeRequest(`${API_BASE_URL}/beds/${bedNumber}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Doctor methods
  async getDoctors(): Promise<Doctor[]> {
    return this.makeRequest(`${API_BASE_URL}/doctors`);
  }

  async createDoctor(doctor: Omit<Doctor, '_id'>): Promise<Doctor> {
    return this.makeRequest(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      body: JSON.stringify(doctor),
    });
  }

  // Dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    return this.makeRequest(`${API_BASE_URL}/stats/dashboard`);
  }

  // Initialize sample data
  async initSampleData(): Promise<{ message: string }> {
    return this.makeRequest(`${API_BASE_URL}/init-sample-data`, {
      method: 'POST',
    });
  }

  // Clear all data
  async clearAllData(): Promise<{ message: string }> {
    return this.makeRequest(`${API_BASE_URL}/clear-all-data`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export type { Patient, Bed, Doctor, DashboardStats };
// ===== SEED DATA FOR APEX AUTO GARAGE =====

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  loyaltyPoints: number;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  vehicles: Vehicle[];
  totalSpent: number;
}

export interface Vehicle {
  id: string;
  customerId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  mileage: number;
  licensePlate: string;
  lastService: string;
  nextServiceDue: string;
}

export interface Mechanic {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  certifications: string[];
  yearsExperience: number;
  rating: number;
  completedJobs: number;
  status: 'available' | 'busy' | 'off-duty';
  hourlyRate: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleInfo: string;
  mechanicId: string;
  mechanicName: string;
  serviceType: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes: string;
  estimatedCost: number;
}

export interface RepairOrder {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  vehicleInfo: string;
  mechanicId: string;
  mechanicName: string;
  status: 'checked-in' | 'diagnosing' | 'waiting-approval' | 'repairing' | 'quality-check' | 'ready-pickup' | 'completed';
  services: RepairService[];
  parts: Part[];
  laborHours: number;
  laborRate: number;
  totalParts: number;
  totalLabor: number;
  tax: number;
  total: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  photos: string[];
}

export interface RepairService {
  name: string;
  description: string;
  cost: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Part {
  name: string;
  partNumber: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  vendor: string;
}

export interface Invoice {
  id: string;
  repairOrderId: string;
  customerId: string;
  customerName: string;
  vehicleInfo: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'partial';
  paidAmount: number;
  createdAt: string;
  dueDate: string;
  paymentMethod?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: 'labor' | 'parts' | 'service';
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  priceRange: string;
  duration: string;
  image: string;
  features: string[];
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  avatar: string;
  verified: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  quantity: number;
  minStock: number;
  unitCost: number;
  vendor: string;
  lastOrdered: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

// ===== SERVICES =====
export const services: ServiceCategory[] = [
  { id: 's1', name: 'Engine Repair', icon: '⚙️', description: 'Complete engine diagnostics, repair, and rebuilds. From minor tune-ups to major overhauls.', priceRange: '$150 - $3,500+', duration: '2-8 hours', image: 'https://images.pexels.com/photos/4116224/pexels-photo-4116224.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Full diagnostic scan', 'Engine rebuild & swap', 'Timing belt/chain', 'Head gasket repair', 'Turbo service'] },
  { id: 's2', name: 'Brake Repair', icon: '🛞', description: 'Expert brake service including pads, rotors, calipers, and complete brake system overhauls.', priceRange: '$100 - $800', duration: '1-3 hours', image: 'https://images.pexels.com/photos/833320/pexels-photo-833320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Brake pad replacement', 'Rotor resurfacing', 'Caliper repair', 'Brake fluid flush', 'ABS diagnostics'] },
  { id: 's3', name: 'Oil Changes', icon: '🛢️', description: 'Quick and thorough oil changes with premium synthetic, blend, or conventional oils.', priceRange: '$35 - $120', duration: '30-60 min', image: 'https://images.pexels.com/photos/8478259/pexels-photo-8478259.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Synthetic oil', 'Filter replacement', 'Multi-point inspection', 'Fluid top-off', 'Tire pressure check'] },
  { id: 's4', name: 'Tire Services', icon: '🔧', description: 'Full tire services including mounting, balancing, rotation, repair, and new tire sales.', priceRange: '$25 - $1,200', duration: '30 min - 2 hrs', image: 'https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Tire rotation', 'Balancing', 'Flat repair', 'New tire sales', 'TPMS service'] },
  { id: 's5', name: 'Transmission', icon: '🏎️', description: 'Complete transmission diagnostics, repair, rebuild, and fluid services for all vehicles.', priceRange: '$200 - $4,000+', duration: '3-10 hours', image: 'https://images.pexels.com/photos/4116221/pexels-photo-4116221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Fluid exchange', 'Clutch replacement', 'Rebuild service', 'Diagnostic scan', 'Torque converter'] },
  { id: 's6', name: 'AC Repair', icon: '❄️', description: 'Air conditioning diagnostics, recharge, compressor replacement, and full AC system repair.', priceRange: '$75 - $1,500', duration: '1-4 hours', image: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['AC recharge', 'Compressor repair', 'Leak detection', 'Evaporator service', 'Climate control'] },
  { id: 's7', name: 'Suspension', icon: '🔩', description: 'Shocks, struts, springs, control arms, and complete suspension system service.', priceRange: '$150 - $2,000', duration: '2-6 hours', image: 'https://images.pexels.com/photos/37175105/pexels-photo-37175105.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Shock replacement', 'Strut service', 'Spring replacement', 'Bushing repair', 'Lift/lower kits'] },
  { id: 's8', name: 'Electrical', icon: '⚡', description: 'Complete electrical diagnostics, wiring repair, alternator, starter, and electrical system service.', priceRange: '$75 - $1,200', duration: '1-5 hours', image: 'https://images.pexels.com/photos/8478261/pexels-photo-8478261.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Full diagnostics', 'Wiring repair', 'Alternator service', 'Starter repair', 'Battery service'] },
  { id: 's9', name: 'State Inspection', icon: '📋', description: 'Official state vehicle safety and emissions inspections with fast turnaround.', priceRange: '$25 - $90', duration: '30-60 min', image: 'https://images.pexels.com/photos/33814736/pexels-photo-33814736.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Safety inspection', 'Emissions testing', 'Same-day service', 'Re-inspection', 'Sticker included'] },
  { id: 's10', name: 'Alignment', icon: '📐', description: 'Precision wheel alignment using state-of-the-art equipment for all vehicle types.', priceRange: '$80 - $200', duration: '1-2 hours', image: 'https://images.pexels.com/photos/33814734/pexels-photo-33814734.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['4-wheel alignment', 'Camber adjustment', 'Toe adjustment', 'Caster correction', 'Printout report'] },
  { id: 's11', name: 'Fleet Service', icon: '🚛', description: 'Comprehensive fleet maintenance programs with priority scheduling and volume discounts.', priceRange: 'Custom Quote', duration: 'Varies', image: 'https://images.pexels.com/photos/36281956/pexels-photo-36281956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Priority scheduling', 'Volume discounts', 'Dedicated account', 'Preventive maintenance', 'Reporting'] },
  { id: 's12', name: 'Battery Service', icon: '🔋', description: 'Battery testing, replacement, and electrical system charging diagnostics.', priceRange: '$50 - $350', duration: '30-60 min', image: 'https://images.pexels.com/photos/8478228/pexels-photo-8478228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', features: ['Free testing', 'Installation', 'Terminal cleaning', 'Charging system', 'Core return'] },
];

// ===== MECHANICS =====
export const mechanics: Mechanic[] = [
  { id: 'm1', name: 'Marcus Johnson', role: 'Master Technician', avatar: '👨‍🔧', specialties: ['Engine Repair', 'Transmission', 'Diagnostics'], certifications: ['ASE Master', 'Toyota Certified', 'Honda Certified'], yearsExperience: 18, rating: 4.9, completedJobs: 2847, status: 'available', hourlyRate: 95 },
  { id: 'm2', name: 'Sarah Chen', role: 'Lead Technician', avatar: '👩‍🔧', specialties: ['Electrical', 'Hybrid/EV', 'AC Systems'], certifications: ['ASE Certified', 'EV Specialist', 'BMW Certified'], yearsExperience: 12, rating: 4.8, completedJobs: 1923, status: 'busy', hourlyRate: 85 },
  { id: 'm3', name: 'James Rodriguez', role: 'Senior Technician', avatar: '👨‍🔧', specialties: ['Brakes', 'Suspension', 'Alignment'], certifications: ['ASE Certified', 'Hunter Alignment'], yearsExperience: 10, rating: 4.7, completedJobs: 1567, status: 'available', hourlyRate: 80 },
  { id: 'm4', name: 'Mike Thompson', role: 'Technician', avatar: '🧑‍🔧', specialties: ['Oil Changes', 'Tires', 'Battery Service'], certifications: ['ASE Certified'], yearsExperience: 5, rating: 4.6, completedJobs: 892, status: 'busy', hourlyRate: 65 },
  { id: 'm5', name: 'David Park', role: 'Diesel Specialist', avatar: '👨‍🔧', specialties: ['Diesel Engines', 'Fleet Service', 'Turbo Systems'], certifications: ['ASE Diesel Certified', 'Cummins Certified'], yearsExperience: 15, rating: 4.8, completedJobs: 2134, status: 'off-duty', hourlyRate: 90 },
];

// ===== CUSTOMERS =====
export const customers: Customer[] = [
  { id: 'c1', name: 'Robert Williams', email: 'robert.w@email.com', phone: '(555) 123-4567', avatar: '👤', joinDate: '2022-03-15', loyaltyPoints: 2450, membershipTier: 'gold', vehicles: [], totalSpent: 4890 },
  { id: 'c2', name: 'Jennifer Martinez', email: 'jen.m@email.com', phone: '(555) 234-5678', avatar: '👤', joinDate: '2021-07-22', loyaltyPoints: 5200, membershipTier: 'platinum', vehicles: [], totalSpent: 12350 },
  { id: 'c3', name: 'Michael Brown', email: 'mike.b@email.com', phone: '(555) 345-6789', avatar: '👤', joinDate: '2023-01-10', loyaltyPoints: 890, membershipTier: 'silver', vehicles: [], totalSpent: 1890 },
  { id: 'c4', name: 'Emily Davis', email: 'emily.d@email.com', phone: '(555) 456-7890', avatar: '👤', joinDate: '2023-06-05', loyaltyPoints: 320, membershipTier: 'bronze', vehicles: [], totalSpent: 650 },
  { id: 'c5', name: 'David Wilson', email: 'david.w@email.com', phone: '(555) 567-8901', avatar: '👤', joinDate: '2022-09-18', loyaltyPoints: 1750, membershipTier: 'gold', vehicles: [], totalSpent: 3450 },
  { id: 'c6', name: 'Amanda Taylor', email: 'amanda.t@email.com', phone: '(555) 678-9012', avatar: '👤', joinDate: '2021-12-01', loyaltyPoints: 3800, membershipTier: 'platinum', vehicles: [], totalSpent: 8920 },
];

// ===== VEHICLES =====
export const vehicles: Vehicle[] = [
  { id: 'v1', customerId: 'c1', make: 'Toyota', model: 'Camry', year: 2021, vin: '4T1BF1FK5MU123456', color: 'Silver', mileage: 45230, licensePlate: 'ABC-1234', lastService: '2024-11-15', nextServiceDue: '2025-02-15' },
  { id: 'v2', customerId: 'c1', make: 'Ford', model: 'F-150', year: 2019, vin: '1FTEW1EP5KFA98765', color: 'Blue', mileage: 78900, licensePlate: 'DEF-5678', lastService: '2024-10-20', nextServiceDue: '2025-01-20' },
  { id: 'v3', customerId: 'c2', make: 'Honda', model: 'Civic', year: 2023, vin: '2HGFE2F59PH567890', color: 'White', mileage: 12450, licensePlate: 'GHI-9012', lastService: '2024-12-01', nextServiceDue: '2025-03-01' },
  { id: 'v4', customerId: 'c3', make: 'BMW', model: '330i', year: 2022, vin: 'WBA5R1C50NAB12345', color: 'Black', mileage: 28900, licensePlate: 'JKL-3456', lastService: '2024-09-30', nextServiceDue: '2024-12-30' },
  { id: 'v5', customerId: 'c4', make: 'Chevrolet', model: 'Equinox', year: 2020, vin: '2GNAXUEV1L6234567', color: 'Red', mileage: 56780, licensePlate: 'MNO-7890', lastService: '2024-11-05', nextServiceDue: '2025-02-05' },
  { id: 'v6', customerId: 'c5', make: 'Tesla', model: 'Model 3', year: 2023, vin: '5YJ3E1EA8PF890123', color: 'White', mileage: 15200, licensePlate: 'PQR-1234', lastService: '2024-12-10', nextServiceDue: '2025-06-10' },
  { id: 'v7', customerId: 'c6', make: 'Mercedes-Benz', model: 'C300', year: 2021, vin: 'W1KWF8DB2MR456789', color: 'Gray', mileage: 39800, licensePlate: 'STU-5678', lastService: '2024-11-20', nextServiceDue: '2025-02-20' },
];

// ===== APPOINTMENTS =====
export const appointments: Appointment[] = [
  { id: 'a1', customerId: 'c1', customerName: 'Robert Williams', vehicleId: 'v1', vehicleInfo: '2021 Toyota Camry', mechanicId: 'm1', mechanicName: 'Marcus Johnson', serviceType: 'Engine Diagnostics', date: '2025-01-15', time: '09:00', duration: 120, status: 'scheduled', notes: 'Check engine light on', estimatedCost: 250 },
  { id: 'a2', customerId: 'c2', customerName: 'Jennifer Martinez', vehicleId: 'v3', vehicleInfo: '2023 Honda Civic', mechanicId: 'm3', mechanicName: 'James Rodriguez', serviceType: 'Brake Inspection', date: '2025-01-15', time: '10:00', duration: 90, status: 'in-progress', notes: 'Squeaking brakes', estimatedCost: 180 },
  { id: 'a3', customerId: 'c3', customerName: 'Michael Brown', vehicleId: 'v4', vehicleInfo: '2022 BMW 330i', mechanicId: 'm2', mechanicName: 'Sarah Chen', serviceType: 'Electrical Diagnostics', date: '2025-01-15', time: '11:00', duration: 150, status: 'scheduled', notes: 'Dashboard warning lights', estimatedCost: 320 },
  { id: 'a4', customerId: 'c4', customerName: 'Emily Davis', vehicleId: 'v5', vehicleInfo: '2020 Chevrolet Equinox', mechanicId: 'm4', mechanicName: 'Mike Thompson', serviceType: 'Oil Change', date: '2025-01-16', time: '08:30', duration: 45, status: 'scheduled', notes: 'Synthetic oil change', estimatedCost: 75 },
  { id: 'a5', customerId: 'c5', customerName: 'David Wilson', vehicleId: 'v6', vehicleInfo: '2023 Tesla Model 3', mechanicId: 'm2', mechanicName: 'Sarah Chen', serviceType: 'Tire Rotation', date: '2025-01-16', time: '14:00', duration: 60, status: 'scheduled', notes: 'Rotate and balance', estimatedCost: 85 },
  { id: 'a6', customerId: 'c6', customerName: 'Amanda Taylor', vehicleId: 'v7', vehicleInfo: '2021 Mercedes-Benz C300', mechanicId: 'm1', mechanicName: 'Marcus Johnson', serviceType: 'Full Service', date: '2025-01-17', time: '09:00', duration: 240, status: 'scheduled', notes: 'Complete 40K service', estimatedCost: 890 },
  { id: 'a7', customerId: 'c1', customerName: 'Robert Williams', vehicleId: 'v2', vehicleInfo: '2019 Ford F-150', mechanicId: 'm5', mechanicName: 'David Park', serviceType: 'Transmission Service', date: '2025-01-17', time: '10:00', duration: 180, status: 'scheduled', notes: 'Fluid exchange + filter', estimatedCost: 450 },
  { id: 'a8', customerId: 'c2', customerName: 'Jennifer Martinez', vehicleId: 'v3', vehicleInfo: '2023 Honda Civic', mechanicId: 'm4', mechanicName: 'Mike Thompson', serviceType: 'State Inspection', date: '2025-01-18', time: '08:00', duration: 45, status: 'scheduled', notes: 'Annual inspection', estimatedCost: 35 },
];

// ===== REPAIR ORDERS =====
export const repairOrders: RepairOrder[] = [
  {
    id: 'ro1', appointmentId: 'a2', customerId: 'c2', customerName: 'Jennifer Martinez', vehicleInfo: '2023 Honda Civic', mechanicId: 'm3', mechanicName: 'James Rodriguez',
    status: 'repairing',
    services: [
      { name: 'Brake Pad Replacement - Front', description: 'Replace front brake pads with ceramic pads', cost: 180, status: 'completed' },
      { name: 'Brake Rotor Resurfacing - Front', description: 'Resurface front brake rotors', cost: 120, status: 'in-progress' },
      { name: 'Brake Fluid Flush', description: 'Complete brake fluid exchange', cost: 80, status: 'pending' },
    ],
    parts: [
      { name: 'Ceramic Brake Pads (Front)', partNumber: 'BP-HON-CF-2023', quantity: 1, unitCost: 65, totalCost: 65, vendor: 'AutoZone Pro' },
      { name: 'Brake Fluid DOT 4', partNumber: 'BF-DOT4-1L', quantity: 2, unitCost: 15, totalCost: 30, vendor: 'NAPA' },
    ],
    laborHours: 2.5, laborRate: 80, totalParts: 95, totalLabor: 200, tax: 23.60, total: 318.60,
    notes: 'Front brakes worn to 2mm. Rotors within spec for resurfacing. Recommend brake fluid flush.', createdAt: '2025-01-15T10:00:00', updatedAt: '2025-01-15T12:30:00', photos: [],
  },
  {
    id: 'ro2', appointmentId: 'a1', customerId: 'c1', customerName: 'Robert Williams', vehicleInfo: '2021 Toyota Camry', mechanicId: 'm1', mechanicName: 'Marcus Johnson',
    status: 'diagnosing',
    services: [
      { name: 'Engine Diagnostic Scan', description: 'Full OBD-II diagnostic scan', cost: 120, status: 'in-progress' },
    ],
    parts: [],
    laborHours: 1, laborRate: 95, totalParts: 0, totalLabor: 95, tax: 7.60, total: 102.60,
    notes: 'CEL on, customer reports rough idle at cold start.', createdAt: '2025-01-15T09:00:00', updatedAt: '2025-01-15T09:45:00', photos: [],
  },
];

// ===== INVOICES =====
export const invoices: Invoice[] = [
  {
    id: 'inv1', repairOrderId: 'ro-prev1', customerId: 'c2', customerName: 'Jennifer Martinez', vehicleInfo: '2023 Honda Civic',
    items: [
      { description: 'Oil Change - Full Synthetic', quantity: 1, unitPrice: 75, total: 75, type: 'service' },
      { description: 'Synthetic Motor Oil 5W-30 (5qt)', quantity: 1, unitPrice: 35, total: 35, type: 'parts' },
      { description: 'Oil Filter', quantity: 1, unitPrice: 12, total: 12, type: 'parts' },
      { description: 'Multi-Point Inspection', quantity: 1, unitPrice: 0, total: 0, type: 'service' },
    ],
    subtotal: 122, tax: 9.76, total: 131.76, status: 'paid', paidAmount: 131.76, createdAt: '2024-12-01', dueDate: '2024-12-15', paymentMethod: 'Credit Card',
  },
  {
    id: 'inv2', repairOrderId: 'ro-prev2', customerId: 'c1', customerName: 'Robert Williams', vehicleInfo: '2019 Ford F-150',
    items: [
      { description: 'Tire Rotation & Balance', quantity: 1, unitPrice: 65, total: 65, type: 'service' },
      { description: 'Wheel Balancing Weights', quantity: 8, unitPrice: 3, total: 24, type: 'parts' },
      { description: 'TPMS Reset', quantity: 1, unitPrice: 25, total: 25, type: 'service' },
    ],
    subtotal: 114, tax: 9.12, total: 123.12, status: 'paid', paidAmount: 123.12, createdAt: '2024-11-20', dueDate: '2024-12-04', paymentMethod: 'Debit Card',
  },
  {
    id: 'inv3', repairOrderId: 'ro-prev3', customerId: 'c6', customerName: 'Amanda Taylor', vehicleInfo: '2021 Mercedes-Benz C300',
    items: [
      { description: 'AC System Diagnostic', quantity: 1, unitPrice: 120, total: 120, type: 'service' },
      { description: 'AC Compressor Replacement', quantity: 1, unitPrice: 450, total: 450, type: 'service' },
      { description: 'AC Compressor (OEM)', quantity: 1, unitPrice: 680, total: 680, type: 'parts' },
      { description: 'Refrigerant R-134a (2 cans)', quantity: 2, unitPrice: 35, total: 70, type: 'parts' },
      { description: 'Labor (5 hrs @ $85/hr)', quantity: 5, unitPrice: 85, total: 425, type: 'labor' },
    ],
    subtotal: 1745, tax: 139.60, total: 1884.60, status: 'paid', paidAmount: 1884.60, createdAt: '2024-11-05', dueDate: '2024-11-19', paymentMethod: 'Financing',
  },
  {
    id: 'inv4', repairOrderId: 'ro-prev4', customerId: 'c5', customerName: 'David Wilson', vehicleInfo: '2023 Tesla Model 3',
    items: [
      { description: 'Brake Pad Replacement (All 4)', quantity: 1, unitPrice: 320, total: 320, type: 'service' },
      { description: 'Premium Brake Pads (Set of 4)', quantity: 2, unitPrice: 89, total: 178, type: 'parts' },
      { description: 'Labor (2 hrs @ $80/hr)', quantity: 2, unitPrice: 80, total: 160, type: 'labor' },
    ],
    subtotal: 658, tax: 52.64, total: 710.64, status: 'sent', paidAmount: 0, createdAt: '2025-01-10', dueDate: '2025-01-24',
  },
  {
    id: 'inv5', repairOrderId: 'ro-prev5', customerId: 'c3', customerName: 'Michael Brown', vehicleInfo: '2022 BMW 330i',
    items: [
      { description: 'Full Synthetic Oil Change', quantity: 1, unitPrice: 110, total: 110, type: 'service' },
      { description: 'BMW Synthetic Oil 5W-40 (7qt)', quantity: 1, unitPrice: 65, total: 65, type: 'parts' },
      { description: 'OEM Oil Filter', quantity: 1, unitPrice: 18, total: 18, type: 'parts' },
    ],
    subtotal: 193, tax: 15.44, total: 208.44, status: 'overdue', paidAmount: 0, createdAt: '2024-12-15', dueDate: '2024-12-29',
  },
];

// ===== REVIEWS =====
export const reviews: Review[] = [
  { id: 'r1', customerName: 'Robert W.', rating: 5, text: 'Best auto repair experience I\'ve ever had. Marcus diagnosed my engine issue in minutes and had it fixed same day. Transparent pricing and excellent communication throughout.', date: '2024-12-20', service: 'Engine Repair', avatar: '👤', verified: true },
  { id: 'r2', customerName: 'Jennifer M.', rating: 5, text: 'I bring both my cars here exclusively. The online booking is so convenient, and I love tracking my repair progress in real-time. Truly a modern shop experience.', date: '2024-12-15', service: 'Oil Change', avatar: '👤', verified: true },
  { id: 'r3', customerName: 'Michael B.', rating: 4, text: 'Sarah is amazing with electrical diagnostics. She found an intermittent issue my BMW dealer missed for months. Fair pricing and professional service.', date: '2024-11-28', service: 'Electrical Diagnostics', avatar: '👤', verified: true },
  { id: 'r4', customerName: 'Amanda T.', rating: 5, text: 'My AC went out in the middle of summer and they got me in same day. The financing option was a lifesaver for the compressor replacement. Highly recommend!', date: '2024-11-10', service: 'AC Repair', avatar: '👤', verified: true },
  { id: 'r5', customerName: 'David W.', rating: 5, text: 'One of the few shops that actually knows how to work on Tesla vehicles. James did my brake job perfectly. The digital inspection report was a nice touch.', date: '2024-12-05', service: 'Brake Repair', avatar: '👤', verified: true },
  { id: 'r6', customerName: 'Lisa K.', rating: 5, text: 'I was nervous about finding a trustworthy mechanic. Apex Auto completely changed my expectations. Photos of the work, text updates, fair prices. I\'m a customer for life.', date: '2024-12-22', service: 'Full Service', avatar: '👤', verified: true },
];

// ===== INVENTORY =====
export const inventory: InventoryItem[] = [
  { id: 'i1', name: 'Synthetic Motor Oil 5W-30', partNumber: 'MO-5W30-5Q', category: 'Oils & Fluids', quantity: 48, minStock: 20, unitCost: 28.99, vendor: 'Valvoline Pro', lastOrdered: '2025-01-05', location: 'Rack A-1' },
  { id: 'i2', name: 'Ceramic Brake Pads (Universal)', partNumber: 'BP-CER-UNI', category: 'Brakes', quantity: 15, minStock: 10, unitCost: 42.50, vendor: 'NAPA', lastOrdered: '2025-01-02', location: 'Rack B-3' },
  { id: 'i3', name: 'Oil Filter (Multi-Fit)', partNumber: 'OF-MF-001', category: 'Filters', quantity: 35, minStock: 15, unitCost: 8.99, vendor: 'AutoZone Pro', lastOrdered: '2025-01-08', location: 'Rack A-2' },
  { id: 'i4', name: 'Brake Fluid DOT 4', partNumber: 'BF-DOT4-1L', category: 'Oils & Fluids', quantity: 22, minStock: 10, unitCost: 12.50, vendor: 'NAPA', lastOrdered: '2024-12-20', location: 'Rack A-3' },
  { id: 'i5', name: 'Air Filter (Multi-Fit)', partNumber: 'AF-MF-001', category: 'Filters', quantity: 8, minStock: 10, unitCost: 15.99, vendor: 'AutoZone Pro', lastOrdered: '2024-12-28', location: 'Rack A-4' },
  { id: 'i6', name: 'Spark Plugs (Iridium)', partNumber: 'SP-IR-001', category: 'Ignition', quantity: 40, minStock: 20, unitCost: 9.99, vendor: 'NGK Direct', lastOrdered: '2025-01-10', location: 'Rack C-1' },
  { id: 'i7', name: 'Coolant 50/50 Pre-Mix (1 Gal)', partNumber: 'CL-5050-1G', category: 'Oils & Fluids', quantity: 18, minStock: 8, unitCost: 14.99, vendor: 'Prestone', lastOrdered: '2024-12-15', location: 'Rack A-5' },
  { id: 'i8', name: 'Serpentine Belt (Universal)', partNumber: 'SB-UNI-001', category: 'Belts', quantity: 5, minStock: 8, unitCost: 24.99, vendor: 'Gates', lastOrdered: '2024-12-10', location: 'Rack C-2' },
  { id: 'i9', name: 'Wiper Blades (22")', partNumber: 'WB-22-001', category: 'Accessories', quantity: 12, minStock: 6, unitCost: 18.99, vendor: 'Bosch', lastOrdered: '2025-01-03', location: 'Rack D-1' },
  { id: 'i10', name: 'Transmission Fluid ATF', partNumber: 'TF-ATF-1Q', category: 'Oils & Fluids', quantity: 30, minStock: 12, unitCost: 11.49, vendor: 'Valvoline Pro', lastOrdered: '2025-01-07', location: 'Rack A-6' },
];

// ===== BLOG POSTS =====
export const blogPosts: BlogPost[] = [
  { id: 'b1', title: '5 Warning Signs Your Brakes Need Attention', excerpt: 'Don\'t ignore these critical brake warning signs that could save your life on the road.', content: '', author: 'Marcus Johnson', date: '2025-01-10', category: 'Safety', readTime: '4 min', image: 'https://images.pexels.com/photos/833320/pexels-photo-833320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500' },
  { id: 'b2', title: 'The Complete Guide to Synthetic vs Conventional Oil', excerpt: 'Understanding which oil is best for your engine and why it matters for longevity.', content: '', author: 'Sarah Chen', date: '2025-01-05', category: 'Maintenance', readTime: '6 min', image: 'https://images.pexels.com/photos/8478259/pexels-photo-8478259.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500' },
  { id: 'b3', title: 'EV Maintenance: What You Need to Know', excerpt: 'Electric vehicles still need maintenance. Here\'s your complete guide to keeping your EV running.', content: '', author: 'Sarah Chen', date: '2024-12-28', category: 'Electric Vehicles', readTime: '5 min', image: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500' },
  { id: 'b4', title: 'How to Extend Your Transmission\'s Life', excerpt: 'Simple habits that can add years to your transmission and save thousands in repairs.', content: '', author: 'Marcus Johnson', date: '2024-12-20', category: 'Tips', readTime: '4 min', image: 'https://images.pexels.com/photos/4116221/pexels-photo-4116221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500' },
];

// ===== ANALYTICS DATA =====
export const revenueData = [
  { month: 'Jul', revenue: 42500, expenses: 28000, profit: 14500 },
  { month: 'Aug', revenue: 48200, expenses: 30500, profit: 17700 },
  { month: 'Sep', revenue: 44800, expenses: 29200, profit: 15600 },
  { month: 'Oct', revenue: 51300, expenses: 32100, profit: 19200 },
  { month: 'Nov', revenue: 46900, expenses: 30800, profit: 16100 },
  { month: 'Dec', revenue: 53800, expenses: 33500, profit: 20300 },
  { month: 'Jan', revenue: 38900, expenses: 26700, profit: 12200 },
];

export const serviceBreakdown = [
  { name: 'Oil Changes', value: 28, color: '#3b82f6' },
  { name: 'Brake Repair', value: 22, color: '#f97316' },
  { name: 'Engine Repair', value: 15, color: '#22c55e' },
  { name: 'Tire Services', value: 12, color: '#a855f7' },
  { name: 'Diagnostics', value: 10, color: '#eab308' },
  { name: 'Transmission', value: 8, color: '#ef4444' },
  { name: 'Other', value: 5, color: '#64748b' },
];

export const appointmentsByDay = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 15 },
  { day: 'Wed', count: 18 },
  { day: 'Thu', count: 14 },
  { day: 'Fri', count: 20 },
  { day: 'Sat', count: 16 },
  { day: 'Sun', count: 0 },
];

export const customerRetention = [
  { month: 'Jul', newCustomers: 24, returning: 68 },
  { month: 'Aug', newCustomers: 31, returning: 72 },
  { month: 'Sep', newCustomers: 28, returning: 75 },
  { month: 'Oct', newCustomers: 35, returning: 78 },
  { month: 'Nov', newCustomers: 22, returning: 71 },
  { month: 'Dec', newCustomers: 38, returning: 82 },
  { month: 'Jan', newCustomers: 19, returning: 65 },
];

// ===== PROMOTIONS =====
export const promotions = [
  { id: 'p1', title: 'Winter Special', description: 'Get a free battery test with any oil change', discount: '15% OFF', code: 'WINTER25', validUntil: '2025-02-28', active: true },
  { id: 'p2', title: 'New Customer Discount', description: 'First-time customers receive $25 off any service over $100', discount: '$25 OFF', code: 'NEWCUST25', validUntil: '2025-12-31', active: true },
  { id: 'p3', title: 'Loyalty Rewards', description: 'Earn 1 point per dollar spent. 500 points = $50 credit', discount: '10% BACK', code: 'LOYALTY', validUntil: '2025-12-31', active: true },
  { id: 'p4', title: 'Fleet Discount', description: '20% off all services for fleet accounts with 5+ vehicles', discount: '20% OFF', code: 'FLEET20', validUntil: '2025-12-31', active: true },
];

// ===== MEMBERSHIP PLANS =====
export const membershipPlans = [
  { id: 'mp1', name: 'Basic Care', price: 29.99, period: '/month', features: ['2 Oil Changes/year', '1 Tire Rotation/year', '10% Parts Discount', 'Priority Scheduling', 'Free Multi-Point Inspection'], popular: false },
  { id: 'mp2', name: 'Premium Care', price: 59.99, period: '/month', features: ['4 Oil Changes/year', '2 Tire Rotations/year', '15% Parts Discount', 'Priority Scheduling', 'Free Diagnostics', 'Brake Inspection', 'Battery Testing', 'Roadside Assistance'], popular: true },
  { id: 'mp3', name: 'Ultimate Care', price: 99.99, period: '/month', features: ['Unlimited Oil Changes', '4 Tire Rotations/year', '25% Parts Discount', 'VIP Priority', 'Free Diagnostics', 'All Inspections Free', 'Loaner Vehicle', 'Roadside Assistance', 'Free State Inspections', 'Family Vehicle Coverage'], popular: false },
];

// ===== TIME SLOTS =====
export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00',
];

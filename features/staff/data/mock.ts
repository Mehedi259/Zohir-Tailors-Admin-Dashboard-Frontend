export interface Staff {
  id: string;
  name: string;
  phone: string;
  address: string;
  nid: string;
  designation: string;
  joinDate: string;
  status: "Active" | "Inactive";
  photo: string;
}

export const mockStaff: Staff[] = [
  {
    id: "STF-001",
    name: "মো. কামাল মিয়া",
    phone: "01717604510",
    address: "বালিচান্দা, হালুয়াঘাট, ময়মনসিংহ।",
    nid: "1982736451928",
    designation: "অল রাউন্ডার",
    joinDate: "20-05-2024",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "STF-002",
    name: "রহিম উদ্দিন",
    phone: "01812345678",
    address: "ধানমন্ডি, ঢাকা",
    nid: "8273645192837",
    designation: "শার্ট কারিগর",
    joinDate: "10-02-2023",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "STF-003",
    name: "আব্দুল করিম",
    phone: "01987654321",
    address: "মিরপুর, ঢাকা",
    nid: "7364519283746",
    designation: "প্যান্ট কারিগর",
    joinDate: "05-08-2022",
    status: "Inactive",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "STF-004",
    name: "শফিকুল ইসলাম",
    phone: "01655554444",
    address: "উত্তরা, ঢাকা",
    nid: "6451928374655",
    designation: "ব্লাউজ কারিগর",
    joinDate: "15-11-2023",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "STF-005",
    name: "জসিম আহমেদ",
    phone: "01511223344",
    address: "গুলিস্তান, ঢাকা",
    nid: "5192837465564",
    designation: "থ্রিপিস কারিগর",
    joinDate: "01-01-2024",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=15",
  },
];

export const mockWorkHistory = [
  {
    id: "WH-001",
    orderNo: "#ORD-1025",
    date: "05-08-2026",
    items: "শার্ট (২), প্যান্ট (১)",
    totalWage: 1200,
    status: "Completed",
  },
  {
    id: "WH-002",
    orderNo: "#ORD-1021",
    date: "01-08-2026",
    items: "পাঞ্জাবি (৩)",
    totalWage: 1500,
    status: "Completed",
  },
  {
    id: "WH-003",
    orderNo: "#ORD-1018",
    date: "28-07-2026",
    items: "ব্লাউজ (৫)",
    totalWage: 1000,
    status: "Completed",
  },
];

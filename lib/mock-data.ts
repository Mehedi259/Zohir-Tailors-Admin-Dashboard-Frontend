export const recentSales = [
  { id: "ORD-1234", customer: "রাহিম মিয়া", email: "rahim@example.com", amount: "৳১,২০০.০০", status: "Completed", date: "১০ মিনিট আগে" },
  { id: "ORD-1235", customer: "করিম উল্লাহ", email: "karim@example.com", amount: "৳৩,৪০০.০০", status: "Pending", date: "২ ঘণ্টা আগে" },
  { id: "ORD-1236", customer: "সাকিব হাসান", email: "sakib@example.com", amount: "৳৪,০০০.০০", status: "Completed", date: "৫ ঘণ্টা আগে" },
  { id: "ORD-1237", customer: "জামাল ভূঁইয়া", email: "jamal@example.com", amount: "৳২,১০০.০০", status: "Cutting", date: "গতকাল" },
  { id: "ORD-1238", customer: "মাহমুদুল্লাহ রিয়াদ", email: "riyad@example.com", amount: "৳১,৫০০.০০", status: "Ready", date: "২ দিন আগে" },
];

export const customersData = [
  { id: "CUST-001", name: "রাহিম মিয়া", phone: "০১৭৮৯১১২২৩৩", email: "rahim@example.com", address: "মিরপুর ১০, ঢাকা", status: "Active", totalOrders: 12, totalSpent: 24500, walletBalance: "৳১,২০০.০০", joinDate: "Jan 12, 2024" },
  { id: "CUST-002", name: "করিম উল্লাহ", phone: "০১৮১৯২২৩৩৪৪", email: "karim@example.com", address: "বনানী, ঢাকা", status: "Active", totalOrders: 8, totalSpent: 15400, walletBalance: "৳০.০০", joinDate: "Feb 05, 2024" },
  { id: "CUST-003", name: "সাকিব হাসান", phone: "০১৯২২৩৩৪৪৫৫", email: "sakib@example.com", address: "ধানমন্ডি, ঢাকা", status: "Inactive", totalOrders: 3, totalSpent: 8300, walletBalance: "৳৫০০.০০", joinDate: "Mar 22, 2024" },
  { id: "CUST-004", name: "জামাল ভূঁইয়া", phone: "০১৬১১৪৪৫৫৬৬", email: "jamal@example.com", address: "উত্তরা, ঢাকা", status: "Active", totalOrders: 5, totalSpent: 12000, walletBalance: "৳২,০০০.০০", joinDate: "Apr 10, 2024" },
  { id: "CUST-005", name: "মাহমুদুল্লাহ রিয়াদ", phone: "০১৫৩৩৫৫৬৬৭৭", email: "riyad@example.com", address: "গুলশান ১, ঢাকা", status: "Active", totalOrders: 2, totalSpent: 4500, walletBalance: "৳০.০০", joinDate: "May 02, 2024" },
];

export const measurementsData = [
  {
    id: "M-1001",
    customer: "রাহিম মিয়া",
    customerId: "CUST-001",
    type: "Shirt",
    measurements: { length: "28", chest: "38", waist: "36", shoulder: "17", sleeve: "24", neck: "15.5", armhole: "18", bicep: "14", cuff: "9" },
    date: "12 May 2024",
    notes: "Fit type: Slim fit",
  },
  {
    id: "M-1002",
    customer: "রাহিম মিয়া",
    customerId: "CUST-001",
    type: "Pant",
    measurements: { length: "40", waist: "34", hip: "40", thigh: "24", knee: "18", hem: "14", rise: "11", inseam: "30" },
    date: "12 May 2024",
    notes: "Extra length for folding",
  },
  {
    id: "M-1003",
    customer: "করিম উল্লাহ",
    customerId: "CUST-002",
    type: "Shirt",
    measurements: { length: "29", chest: "40", waist: "38", shoulder: "18", sleeve: "25", neck: "16", armhole: "19", bicep: "15", cuff: "9.5" },
    date: "14 May 2024",
    notes: "Regular fit",
  },
];

export const ordersData = [
  { id: "ORD-1001", customerName: "রাহিম মিয়া", customerId: "CUST-001", items: ["২x শার্ট", "১x প্যান্ট"], totalPrice: 3200, dueAmount: 0, status: "Ready", orderDate: "May 10, 2024", deliveryDate: "May 18, 2024", advancePayment: 3200 },
  { id: "ORD-1002", customerName: "করিম উল্লাহ", customerId: "CUST-002", items: ["১x পাঞ্জাবি"], totalPrice: 1500, dueAmount: 500, status: "Sewing", orderDate: "May 12, 2024", deliveryDate: "May 20, 2024", advancePayment: 1000 },
  { id: "ORD-1003", customerName: "সাকিব হাসান", customerId: "CUST-003", items: ["৩x শার্ট"], totalPrice: 3600, dueAmount: 3600, status: "Cutting", orderDate: "May 15, 2024", deliveryDate: "May 22, 2024", advancePayment: 0 },
  { id: "ORD-1004", customerName: "জামাল ভূঁইয়া", customerId: "CUST-004", items: ["১x স্যুট"], totalPrice: 8500, dueAmount: 4000, status: "In Progress", orderDate: "May 01, 2024", deliveryDate: "May 25, 2024", advancePayment: 4500 },
  { id: "ORD-1005", customerName: "মাহমুদুল্লাহ রিয়াদ", customerId: "CUST-005", items: ["১x প্যান্ট"], totalPrice: 1200, dueAmount: 0, status: "Delivered", orderDate: "May 05, 2024", deliveryDate: "May 12, 2024", advancePayment: 1200 },
];

export const monthlyRevenue = [
  { name: "Jan", revenue: 12400, orders: 42 },
  { name: "Feb", revenue: 15600, orders: 55 },
  { name: "Mar", revenue: 18200, orders: 68 },
  { name: "Apr", revenue: 22000, orders: 85 },
  { name: "May", revenue: 26500, orders: 110 },
  { name: "Jun", revenue: 28000, orders: 120 },
  { name: "Jul", revenue: 25400, orders: 95 },
  { name: "Aug", revenue: 21000, orders: 78 },
  { name: "Sep", revenue: 24500, orders: 88 },
  { name: "Oct", revenue: 29000, orders: 130 },
  { name: "Nov", revenue: 35000, orders: 150 },
  { name: "Dec", revenue: 42000, orders: 185 },
];

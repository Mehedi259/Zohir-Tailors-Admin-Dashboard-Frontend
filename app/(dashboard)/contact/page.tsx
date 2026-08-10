import { Metadata } from "next";

export const metadata: Metadata = {
  title: "যোগাযোগ | Johir Tailors",
  description: "Contact Johir Tailors",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full mx-auto shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-[#8fb441] mb-2">যোগাযোগ করুন</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 font-medium mt-1 mb-8">
          যেকোনো প্রয়োজনে আমাদের সাথে<br />যোগাযোগ করুন
        </p>

        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-[#f3f6ff] dark:bg-blue-950/20 rounded-2xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border border-transparent dark:border-blue-900/50"
          >
            <div className="w-14 h-14 bg-[#1877f2] rounded-full flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-8 h-8 fill-white">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </div>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Facebook</span>
          </a>

          {/* Messenger */}
          <a
            href="https://m.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-[#f8f5ff] dark:bg-purple-950/20 rounded-2xl cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors border border-transparent dark:border-purple-900/50"
          >
            <div className="w-14 h-14 bg-gradient-to-tr from-[#00c6ff] via-[#0072ff] to-[#bd00ff] rounded-full flex items-center justify-center mb-3 shadow-md shadow-purple-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 fill-white">
                <path d="M256 32C114.6 32 0 136.2 0 265c0 73.1 36.6 137.9 94 181.7V512l78.7-43.2c27.1 7.6 56.1 11.7 83.3 11.7 141.4 0 256-104.2 256-233 0-128.8-114.6-233-256-233zM111.4 332l71.4-113.8 77.2 113.8L398.7 218l-71.4 113.8-77.2-113.8-138.7 114z" />
              </svg>
            </div>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Messenger</span>
          </a>

          {/* Call */}
          <a
            href="tel:+8801912113590"
            className="flex flex-col items-center justify-center p-6 bg-[#f8faeb] dark:bg-lime-950/20 rounded-2xl cursor-pointer hover:bg-[#f2f6da] dark:hover:bg-lime-900/30 transition-colors border border-transparent dark:border-lime-900/50"
          >
            <div className="w-14 h-14 bg-[#93c738] rounded-full flex items-center justify-center mb-3 shadow-md shadow-lime-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801912113590"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-[#eefaf3] dark:bg-emerald-950/20 rounded-2xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors border border-transparent dark:border-emerald-900/50"
          >
            <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 fill-white">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.7c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6.8-5.3 3.5-8.1 2.5-2.5 5.5-6.5 8.3-9.7 2.7-3.2 3.7-5.5 5.5-9.2 1.8-3.7.9-7-0.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </div>
            <span className="text-slate-800 dark:text-slate-200 font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

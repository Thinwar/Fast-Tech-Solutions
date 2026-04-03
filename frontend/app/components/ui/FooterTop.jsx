import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function FooterTop() {
  const items = [
    {
      icon: <MapPin size={28} />,
      title: "Visit Us",
      desc: "Kenya Nairobi CBD",
    },
    {
      icon: <Phone size={28} />,
      title: "Call Us",
      desc: "+254 700 000 000",
    },
    {
      icon: <Clock size={28} />,
      title: "Working Hours",
      desc: "Mon - Sat: 10:00 AM - 7:00 PM",
    },
    {
      icon: <Mail size={28} />,
      title: "Email Us",
      desc: "Shopcart@gmail.com",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-px border-b border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
      {items?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-slate-950 p-5 transition-colors hover:bg-slate-900"
        >
          <div className="text-indigo-400">{item.icon}</div>
          <div>
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {items?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 group hover:bg-indigo-50 p-4 transition-colors cursor-pointer"
        >
          {item.icon}
          <div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

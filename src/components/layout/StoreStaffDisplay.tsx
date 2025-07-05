import React from "react";

export const StoreStaffDisplay = () => {
  const staffList = [
    {
      name: "أحمد منصوري",
      role: "حلاق",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "ليلى بن سعيد",
      role: "مساعدة",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "خالد عياشي",
      role: "مدير",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {staffList.map((staff, index) => (
        <div
          key={index}
          className="border rounded-xl shadow-lg p-4 text-center bg-white"
        >
          <img
            src={staff.image}
            alt={staff.name}
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <h3 className="mt-3 font-semibold text-lg">{staff.name}</h3>
          <p className="text-gray-600">{staff.role}</p>
        </div>
      ))}
    </div>
  );
};

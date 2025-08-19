"use client";
import React, { useState } from "react";

const pendingRequests = [
  {
    id: 1,
    name: "Eshita Kapat",
    img: "/path/to/userphoto.jpg", // Replace with actual user image path
    appliedFor: "E-Commerce Platform",
    domain: "Cloud",
    description: "I want to contribute.",
  },
  // Add more requests here as needed
];

export default function PendingRequests() {
  const [requests, setRequests] = useState(pendingRequests);

  // Handlers for approve/reject
  const handleApprove = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // Add further approval logic here
  };
  const handleReject = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // Add further rejection logic here
  };

  return (
    <div className="py-8 px-10">
      <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] mb-3 leading-[100%] tracking-[0] mt-15">
        Pending Requests
      </h2>
      <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] tracking- font-normal">
        Approve or reject member requests
      </p>
      <div className="flex flex-col items-start">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-lg flex flex-col items-start px-10 py-8 w-[320px] shadow-xl mb-6"
          >
            <img
              src={request.img}
              alt={request.name}
              className="w-20 h-20 rounded-full object-cover mb-5 border-4 border-white shadow"
            />
            <div className="text-[#2A2A4A] font-mclaren text-[20px] font-bold text-center mb-5">
              {request.name}
            </div>
            <div className="text-[#181818] text-[16px] font-mclaren mb-1">
              Applied for: <span className="font-semibold">{request.appliedFor}</span>
            </div>
            <div className="text-[#181818] text-[16px] font-mclaren mb-1">
              Domain: <span className="font-semibold">{request.domain}</span>
            </div>
            <div className="text-[#181818] text-[16px] font-mclaren mb-4">
              Description: {request.description}
            </div>
            <div className="flex gap-3 mt-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold text-[15px] transition"
                onClick={() => handleApprove(request.id)}
              >
                ✓ APPROVE
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold text-[15px] transition"
                onClick={() => handleReject(request.id)}
              >
                ✗ REJECT
              </button>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-[#555] mt-6 text-lg font-mclaren">No pending requests</p>
        )}
      </div>
    </div>
  );
}

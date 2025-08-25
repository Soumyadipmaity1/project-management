// // "use client";
// // import React, { useState } from "react";
// // import { FaEllipsisV, FaPlus } from "react-icons/fa";

// // // Sample data
// // const initialAnnouncements = [
// //   {
// //     id: 1,
// //     author: "Sanskar Singh",
// //     date: "August 05, 2025",
// //     time: "09:01 AM",
// //     content: (
// //       <>
// //         We are excited to announce that our society’s Annual Orientation Program will be held on August 12th at 4:00 PM in the Main Auditorium. All new and existing members are requested to join. We will cover introductions, a roadmap for upcoming projects, and fun team-building activities.
// //         <br />
// //         <span role="img" aria-label="memo">📝</span> Please confirm your attendance by filling out the forms shared in the group.
// //       </>
// //     ),
// //     pinned: true,
// //   },
// //   {
// //     id: 2,
// //     author: "Sanskar Singh",
// //     date: "August 05, 2025",
// //     time: "09:01 AM",
// //     content: (
// //       <>
// //         We are excited to announce that our society’s Annual Orientation Program will be held on August 12th at 4:00 PM in the Main Auditorium. All new and existing members are requested to join. We will cover introductions, a roadmap for upcoming projects, and fun team-building activities.
// //         <br />
// //         <span role="img" aria-label="memo">📝</span> Please confirm your attendance by filling out the forms shared in the group.
// //       </>
// //     ),
// //     pinned: false,
// //   },
// //   {
// //     id: 3,
// //     author: "Sanskar Singh",
// //     date: "August 05, 2025",
// //     time: "09:01 AM",
// //     content: (
// //       <>
// //         We are excited to announce that our society’s Annual Orientation Program will be held on August 12th at 4:00 PM in the Main Auditorium. All new and existing members are requested to join. We will cover introductions, a roadmap for upcoming projects, and fun team-building activities.
// //         <br />
// //         <span role="img" aria-label="memo">📝</span> Please confirm your attendance by filling out the forms shared in the group.
// //       </>
// //     ),
// //     pinned: false,
// //   },
// // ];

// // export default function AnnouncementsPage() {
// //   const [announcements] = useState(initialAnnouncements);
// //   const pinned = announcements.filter(a => a.pinned);
// //   const unpinned = announcements.filter(a => !a.pinned);

// //   return (
// //     <div className="min-h-screen py-8 px-4">
// //       {/* Heading and Create button */}
// //       <div className="flex items-center justify-between mt-5 mb-8">
// //         <h1 className="font-mclaren font-normal text-[40px] leading-[100%] tracking-[0] text-[#2A2A4A]">
// //           Announcements
// //         </h1>
// //         <button
// //           className="flex items-center gap-2 bg-[#2A2A4A] text-white px-7 py-3 rounded-md text-[15px] font-mclaren font-normal shadow hover:bg-[#21213b] transition"
// //         >
// //           <FaPlus /> Create announcement
// //         </button>
// //       </div>

// //       {/* Pinned Section */}
// //       {pinned.length > 0 && (
// //         <>
// //           <div className="text-[#2A2A4A] text-[18px] font-mclaren mb-2 font-bold uppercase tracking-[0] ">Pinned</div>
// //           <div className="flex flex-col gap-0 w-full mb-10">
// //             {pinned.map(ann => (
// //               <div
// //                 key={ann.id}
// //                 className="bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative mb-4"
// //               >
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-10 h-10 rounded-full bg-gray-300 object-cover" />
// //                     <div>
// //                       <div className="text-[#2A2A4A] text-[20px] font-mclaren leading-[100%] tracking-[0] font-normal ">
// //                         {ann.author}
// //                       </div>
// //                       <div className="text-[#2A2A4AAD] text-[13px] font-mclaren leading-[100%] tracking- font-normal mt-1">
// //                         {ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <span className="bg-[#E0E0E0] text-[#606060] px-4 py-1 rounded-md text-[15px] font-mclaren font-normal">Pinned</span>
// //                     <FaEllipsisV className="text-gray-400 cursor-pointer" />
// //                   </div>
// //                 </div>
// //                 <div className="text-[#2A2A4A] text-[18px] font-mclaren leading-[100%] tracking-[0] font-normal mb-3 mt-3">
// //                   {ann.content}
// //                 </div>
// //                 <button className="text-sm text-blue-500 font-semibold w-fit mt-1 px-0 outline-none bg-transparent hover:underline cursor-pointer">
// //                   Unpin
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </>
// //       )}

// //       {/* Month/Year Heading */}
// //       <div className="text-[#606060] text-[20px] font-mclaren mb-3 leading-[100%] tracking-[0] font-normal">
// //         August 2025
// //       </div>

// //       {/* Unpinned announcements */}
// //       <div className="flex flex-col gap-0 w-full shadow-xl">
// //         {unpinned.map(ann => (
// //           <div
// //             key={ann.id}
// //             className="bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative mb-4"
// //           >
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 rounded-full bg-gray-300 object-cover" />
// //                 <div>
// //                   <div className="text-[#2A2A4A] text-[20px] font-mclaren leading-[100%] tracking-[0] font-normal ">
// //                     {ann.author}
// //                   </div>
// //                   <div className="text-[#2A2A4AAD] text-[13px] font-mclaren leading-[100%] tracking- font-normal mt-1">
// //                     {ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
// //                   </div>
// //                 </div>
// //               </div>
// //               <FaEllipsisV className="text-gray-400 cursor-pointer" />
// //             </div>
// //             <div className="text-[#2A2A4A] text-[18px] font-mclaren leading-[100%] tracking- font-normal mb-3 mt-3">
// //               {ann.content}
// //             </div>
// //             <button className="text-sm text-blue-500 font-semibold w-fit mt-1 px-0 outline-none bg-transparent hover:underline cursor-pointer">
// //               Show More
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import React, { useState, useEffect } from "react";
// import { FaEllipsisV, FaPlus } from "react-icons/fa";

// export default function AnnouncementsPage() {
//   const [announcements, setAnnouncements] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch from backend
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await fetch("/api/announcements", { cache: "no-store" });
//         if (!res.ok) throw new Error("Failed to fetch announcements");
//         const data = await res.json();
//         setAnnouncements(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnnouncements();
//   }, []);

//   if (loading) return <p>Loading announcements...</p>;

//   const pinned = announcements.filter(a => a.pinned);
//   const unpinned = announcements.filter(a => !a.pinned);

//   return (
//     <div className="min-h-screen py-8 px-4">
//       {/* Heading */}
//       <div className="flex items-center justify-between mt-5 mb-8">
//         <h1 className="font-mclaren text-[40px] text-[#2A2A4A]">Announcements</h1>
//         <button
//           onClick={async () => {
//             // Example create announcement
//             const res = await fetch("/api/announcements", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 content: "New announcement from frontend",
//                 pinned: false,
//               }),
//             });

//             if (res.ok) {
//               const newAnn = await res.json();
//               setAnnouncements(prev => [newAnn, ...prev]); // Update instantly
//             }
//           }}
//           className="flex items-center gap-2 bg-[#2A2A4A] text-white px-7 py-3 rounded-md shadow"
//         >
//           <FaPlus /> Create announcement
//         </button>
//       </div>

//       {/* Pinned */}
//       {pinned.length > 0 && (
//         <div>
//           <h2 className="text-[#2A2A4A] text-lg font-bold mb-2">Pinned</h2>
//           {pinned.map(ann => (
//             <div key={ann._id} className="bg-white border p-4 mb-3 rounded shadow">
//               <h3 className="font-bold">{ann.name}</h3>
//               <p>{ann.content}</p>
//               <button
//                 className="text-blue-500 underline"
//                 onClick={async () => {
//                   await fetch(`/api/announcements/${ann._id}`, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ pinned: false }),
//                   });
//                   setAnnouncements(prev =>
//                     prev.map(a => (a._id === ann._id ? { ...a, pinned: false } : a))
//                   );
//                 }}
//               >
//                 Unpin
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Unpinned */}
//       <h2 className="text-[#606060] text-lg font-semibold mb-3">Other Announcements</h2>
//       {unpinned.map(ann => (
//         <div key={ann._id} className="bg-white border p-4 mb-3 rounded shadow">
//           <h3 className="font-bold">{ann.name}</h3>
//           <p>{ann.content}</p>
//           <button
//             className="text-blue-500 underline"
//             onClick={async () => {
//               await fetch(`/api/announcements/${ann._id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ pinned: true }),
//               });
//               setAnnouncements(prev =>
//                 prev.map(a => (a._id === ann._id ? { ...a, pinned: true } : a))
//               );
//             }}
//           >
//             Pin
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaPlus, FaTimes } from "react-icons/fa";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcement", { cache: "no-store" });
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <p className="p-8">Loading announcements...</p>;

  const pinnedAnns = announcements.filter(a => a.pinned);
  const unpinnedAnns = announcements.filter(a => !a.pinned);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          pinned,
        }),
      });
      if (!res.ok) {
        console.log(res.ok);
      throw new Error("Failed to create");
      }
      const newAnn = await res.json();
      setAnnouncements(prev => [newAnn, ...prev]);
      setIsModalOpen(false);
      setTitle("");
      setContent("");
      setPinned(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create announcement");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Heading */}
      <div className="flex items-center justify-between mt-5 mb-8">
        <h1 className="font-mclaren text-[40px] text-[#2A2A4A]">Announcements</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#2A2A4A] text-white px-7 py-3 rounded-md shadow hover:bg-[#21213b] transition"
        >
          <FaPlus /> Create announcement
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2A2A4A]">Create Announcement</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                  rows={4}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={e => setPinned(e.target.checked)}
                  id="pinned"
                />
                <label htmlFor="pinned" className="text-gray-700">
                  Pin this announcement
                </label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#2A2A4A] text-white px-6 py-2 rounded-md shadow hover:bg-[#21213b] transition disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Pinned */}
      {pinnedAnns.length > 0 && (
        <>
          <h2 className="text-[#2A2A4A] text-lg font-bold mb-2">Pinned</h2>
          {pinnedAnns.map(ann => (
            <div key={ann._id} className="bg-white border p-4 mb-3 rounded shadow">
              <h3 className="font-bold">{ann.title || ann.name}</h3>
              <p className="mt-2">{ann.content}</p>
            </div>
          ))}
        </>
      )}

      {/* Unpinned */}
      <h2 className="text-[#606060] text-lg font-semibold mb-3 mt-6">Other Announcements</h2>
      {unpinnedAnns.map(ann => (
        <div key={ann._id} className="bg-white border p-4 mb-3 rounded shadow">
          <h3 className="font-bold">{ann.title || ann.name}</h3>
          <p className="mt-2">{ann.content}</p>
        </div>
      ))}
    </div>
  );
}

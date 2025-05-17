import React, { useEffect } from "react";
import axios from "axios";

const BirthdayList = ({ birthdays, setBirthdays }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/birthdays");
        setBirthdays(res.data.reverse());
      } catch (err) {
        console.error("Error fetching birthdays:", err);
      }
    };
    fetchData();
  }, [setBirthdays]);

  return (
    <div className="overflow-x-auto">
      <h3 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
        <span>🎉</span> Saved Birthday Entries
      </h3>
      {birthdays.length === 0 ? (
        <p className="text-gray-600">No entries yet. Add a birthday above!</p>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">DOB</th>
                <th className="py-3 px-4 text-left">Send At</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {birthdays.map((b, index) => (
                <tr
                  key={b._id}
                  className={`border-t transition-all duration-500 ${
                    index === 0 ? "animate-fadeIn" : ""
                  } hover:bg-indigo-50`}
                >
                  <td className="py-3 px-4">{b.name}</td>
                  <td className="py-3 px-4">{b.email}</td>
                  <td className="py-3 px-4">{b.dob}</td>
                  <td className="py-3 px-4">{b.sendAt?.replace("T", " ") || "-"}</td>
                  <td className="py-3 px-4">
                    {b.emailSent ? (
                      <span className="text-green-600 font-bold">✅ Sent</span>
                    ) : (
                      <span className="text-yellow-600 font-bold">⏳ Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BirthdayList;
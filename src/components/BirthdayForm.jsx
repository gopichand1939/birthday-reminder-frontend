import React, { useState } from "react";
import axios from "axios";

const BirthdayForm = ({ onAddBirthday }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i).reverse();
  const futureYears = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [form, setForm] = useState({
    name: "",
    email: "",
    dobYear: "",
    dobMonth: "",
    dobDay: "",
    sendAtYear: currentYear,
    sendAtMonth: "",
    sendAtDay: "",
    sendAtHour: "",
    sendAtMinute: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.dobYear || !form.dobMonth || !form.dobDay)
      newErrors.dob = "Complete DOB is required";
    if (!form.sendAtYear || !form.sendAtMonth || !form.sendAtDay || !form.sendAtHour || !form.sendAtMinute)
      newErrors.sendAt = "Complete Send At date and time are required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dob = `${form.dobYear}-${String(form.dobMonth).padStart(2, "0")}-${String(form.dobDay).padStart(2, "0")}`;
    const sendAt = `${form.sendAtYear}-${String(form.sendAtMonth).padStart(2, "0")}-${String(form.sendAtDay).padStart(2, "0")}T${String(form.sendAtHour).padStart(2, "0")}:${String(form.sendAtMinute).padStart(2, "0")}`;

    try {
      const res = await axios.post("http://localhost:5000/api/birthday", {
        name: form.name,
        email: form.email,
        dob,
        sendAt,
      });
      setMessage("🎉 Birthday entry added!");
      onAddBirthday({ ...form, dob, sendAt, emailSent: false, _id: res.data._id });
      setForm({
        name: "",
        email: "",
        dobYear: "",
        dobMonth: "",
        dobDay: "",
        sendAtYear: currentYear,
        sendAtMonth: "",
        sendAtDay: "",
        sendAtHour: "",
        sendAtMinute: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: Could not add birthday");
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6 border border-white border-opacity-20">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Add Birthday Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="flex gap-2">
            <select
              name="dobYear"
              value={form.dobYear}
              onChange={handleChange}
              className="w-1/3 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              name="dobMonth"
              value={form.dobMonth}
              onChange={handleChange}
              className="w-1/3 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              name="dobDay"
              value={form.dobDay}
              onChange={handleChange}
              className="w-1/3 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          <div className="flex gap-2">
            <select
              name="sendAtYear"
              value={form.sendAtYear}
              onChange={handleChange}
              className="w-1/5 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Year</option>
              {futureYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              name="sendAtMonth"
              value={form.sendAtMonth}
              onChange={handleChange}
              className="w-1/5 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              name="sendAtDay"
              value={form.sendAtDay}
              onChange={handleChange}
              className="w-1/5 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select
              name="sendAtHour"
              value={form.sendAtHour}
              onChange={handleChange}
              className="w-1/5 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Hour</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>{String(hour).padStart(2, "0")}</option>
              ))}
            </select>
            <select
              name="sendAtMinute"
              value={form.sendAtMinute}
              onChange={handleChange}
              className="w-1/5 p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="">Min</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>{String(minute).padStart(2, "0")}</option>
              ))}
            </select>
          </div>
          {errors.sendAt && <p className="text-red-500 text-sm mt-1">{errors.sendAt}</p>}
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Add Birthday
        </button>
        {message && <p className="text-sm mt-2 text-indigo-800">{message}</p>}
      </form>
    </div>
  );
};

export default BirthdayForm;
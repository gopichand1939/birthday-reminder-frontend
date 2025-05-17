import React, { useState } from "react";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";
import './index.css';

export default function App() {
  const [birthdays, setBirthdays] = useState([]);

  const addBirthday = (newBirthday) => {
    setBirthdays((prev) => [newBirthday, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800 flex items-center justify-center gap-2">
        <span>🎂</span> Birthday Reminder Admin Panel
      </h1>
      <div className="max-w-5xl mx-auto">
        <BirthdayForm onAddBirthday={addBirthday} />
        <BirthdayList birthdays={birthdays} setBirthdays={setBirthdays} />
      </div>
    </div>
  );
}
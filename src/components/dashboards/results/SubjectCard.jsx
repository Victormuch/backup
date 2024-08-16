import React from 'react';

const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-4">
      <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
      <p className="text-gray-600">Grade: <span className="font-bold text-[#FF6247]">{subject.grade}</span></p>
      <details className="mt-2">
        <summary className="cursor-pointer text-[#FF6247] hover:underline">View Details</summary>
        <p className="mt-2 text-gray-700">{subject.details}</p>
      </details>
    </div>
  );
};

export default SubjectCard;

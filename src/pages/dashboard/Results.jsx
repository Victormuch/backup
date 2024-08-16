import React, { useState } from 'react';
import SemesterSelector from '../../components/dashboards/results/SemesterSelector';
import SubjectCard from '../../components/dashboards/results/SubjectCard';

const resultsData = [
  {
    semester: 'Fall 2023',
    subjects: [
      { name: 'Object Oriented Programming', grade: 'A', details: '90% (Midterm: 45%, Final: 45%)' },
      { name: 'Fundamentals of Database Systems', grade: 'B+', details: '85% (Midterm: 40%, Final: 45%)' },
    ],
  },
  {
    semester: 'Spring 2023',
    subjects: [
      { name: 'Web Development', grade: 'A-', details: '88% (Midterm: 43%, Final: 45%)' },
      { name: 'Data Structures', grade: 'B', details: '82% (Midterm: 40%, Final: 42%)' },
    ],
  },
];

const Results = () => {
  const [selectedSemester, setSelectedSemester] = useState(resultsData[0].semester);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const renderResults = () => {
    const semesterData = resultsData.find((sem) => sem.semester === selectedSemester);
    return semesterData ? (
      semesterData.subjects.map((subject, index) => (
        <SubjectCard key={index} subject={subject} />
      ))
    ) : (
      <p>No results available for this semester.</p>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#FF6247] text-white p-6 rounded-b-lg shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Results</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">View Your Results</h2>
          <p className="mt-2 text-gray-600">Check your exam results, grades, and academic progress here.</p>
          <SemesterSelector
            semesters={resultsData}
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
          />
          <div className="mt-6">
            {renderResults()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;

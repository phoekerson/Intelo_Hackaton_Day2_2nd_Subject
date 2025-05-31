'use client';

import CourseCard from './CourseCard';

export default function CourseList({ courses, onEnroll }) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Cours disponibles ({courses.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={onEnroll}
          />
        ))}
      </div>
    </div>
  );
}
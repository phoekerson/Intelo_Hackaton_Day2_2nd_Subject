import { BookOpenIcon, UsersIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Stats({ courses }) {
  const totalCourses = courses.length;
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
  const uniqueInstructors = new Set(courses.map(course => course.instructor)).size;

  const stats = [
    {
      name: 'Cours disponibles',
      value: totalCourses,
      icon: BookOpenIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Inscriptions totales',
      value: totalEnrollments,
      icon: UsersIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Formateurs actifs',
      value: uniqueInstructors,
      icon: AcademicCapIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
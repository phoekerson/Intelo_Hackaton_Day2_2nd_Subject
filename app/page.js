'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, AcademicCapIcon, UsersIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import CourseForm from '@/components/CourseForm';
import CourseList from '@/components/CourseList';
import Header from '@/components/Header';
import Stats from '@/components/Stats';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  // Charger les cours depuis le sessionStorage au montage
  useEffect(() => {
    const storedCourses = sessionStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  // Sauvegarder les cours dans sessionStorage à chaque modification
  useEffect(() => {
    sessionStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (newCourse) => {
    const courseWithId = {
      ...newCourse,
      id: Date.now() + Math.random(),
      createdAt: new Date().toISOString(),
      enrolledStudents: []
    };
    setCourses(prev => [courseWithId, ...prev]);
    setShowForm(false);
  };

  const enrollInCourse = (courseId, studentName) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? {
              ...course,
              enrolledStudents: course.enrolledStudents.includes(studentName)
                ? course.enrolledStudents
                : [...course.enrolledStudents, studentName]
            }
          : course
      )
    );
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PeerTutor
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Partagez vos connaissances et apprenez ensemble. 
            Une plateforme d'entraide entre étudiants pour créer et suivre des micro-cours.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Créer un cours
          </button>
        </div>

        {/* Stats */}
        <Stats courses={courses} />

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher des cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course List */}
        <CourseList 
          courses={filteredCourses} 
          onEnroll={enrollInCourse}
        />

        {/* Empty State */}
        {filteredCourses.length === 0 && courses.length > 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun cours trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}

        {courses.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun cours disponible
            </h3>
            <p className="text-gray-600 mb-4">
              Soyez le premier à créer un cours et partager vos connaissances !
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Créer le premier cours
            </button>
          </div>
        )}
      </main>

      {/* Course Form Modal */}
      {showForm && (
        <CourseForm
          onSubmit={addCourse}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
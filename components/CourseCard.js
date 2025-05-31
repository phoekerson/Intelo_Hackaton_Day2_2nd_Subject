'use client';

import { useState } from 'react';
import { 
  ClockIcon, 
  UserIcon, 
  AcademicCapIcon, 
  UsersIcon,
  DocumentIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import EnrollModal from './EnrollModal';
import CourseDetailModal from './CourseDetailModal';

export default function CourseCard({ course, onEnroll }) {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getLevelColor = (level) => {
    switch (level) {
      case 'debutant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediaire':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avance':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'debutant':
        return 'Débutant';
      case 'intermediaire':
        return 'Intermédiaire';
      case 'avance':
        return 'Avancé';
      default:
        return level;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isCourseFull = course.maxStudents && course.enrolledStudents.length >= course.maxStudents;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1">
        {/* Image de couverture */}
        {course.coverImage ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                {getLevelText(course.level)}
              </span>
            </div>
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
            <AcademicCapIcon className="w-16 h-16 text-blue-300" />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                {getLevelText(course.level)}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <UserIcon className="w-4 h-4 mr-1" />
              <span className="font-medium">{course.instructor}</span>
            </div>

            {course.category && (
              <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                {course.category}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Métadonnées */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <UsersIcon className="w-4 h-4 mr-1" />
              <span>
                {course.enrolledStudents.length}
                {course.maxStudents && ` / ${course.maxStudents}`}
              </span>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {course.courseDocument && (
                <div className="flex items-center text-xs text-gray-500">
                  <DocumentIcon className="w-4 h-4 mr-1" />
                  <span>PDF inclus</span>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-400">
              Créé le {formatDate(course.createdAt)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => setShowDetailModal(true)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              Voir détails
            </button>
            
            <button
              onClick={() => setShowEnrollModal(true)}
              disabled={isCourseFull}
              className={`flex-1 px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                isCourseFull
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isCourseFull ? 'Complet' : 'S\'inscrire'}
            </button>
          </div>

          {/* Barre de progression si limitée */}
          {course.maxStudents && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Places disponibles</span>
                <span>{course.maxStudents - course.enrolledStudents.length} restantes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCourseFull ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}
                  style={{
                    width: `${(course.enrolledStudents.length / course.maxStudents) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showEnrollModal && (
        <EnrollModal
          course={course}
          onEnroll={(studentName) => {
            onEnroll(course.id, studentName);
            setShowEnrollModal(false);
          }}
          onClose={() => setShowEnrollModal(false)}
        />
      )}

      {showDetailModal && (
        <CourseDetailModal
          course={course}
          onClose={() => setShowDetailModal(false)}
          onEnroll={() => {
            setShowDetailModal(false);
            setShowEnrollModal(true);
          }}
        />
      )}
    </>
  );
}
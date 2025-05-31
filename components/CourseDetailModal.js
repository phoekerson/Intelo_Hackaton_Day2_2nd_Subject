'use client';

import { 
  XMarkIcon, 
  UserIcon, 
  ClockIcon, 
  AcademicCapIcon,
  UsersIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function CourseDetailModal({ course, onClose, onEnroll }) {
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadDocument = () => {
    if (course.courseDocument) {
      const link = document.createElement('a');
      link.href = course.courseDocument.data;
      link.download = course.courseDocument.name;
      link.click();
    }
  };

  const isCourseFull = course.maxStudents && course.enrolledStudents.length >= course.maxStudents;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Détails du cours</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Image de couverture */}
          {course.coverImage && (
            <div className="mb-6">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Titre et badge niveau */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 flex-1 mr-4">
              {course.title}
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
              {getLevelText(course.level)}
            </span>
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <UserIcon className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Formateur</p>
                  <p className="font-semibold text-gray-900">{course.instructor}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-3 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Durée</p>
                  <p className="font-semibold text-gray-900">{course.duration}</p>
                </div>
              </div>

              {course.category && (
                <div className="flex items-center text-gray-600">
                  <TagIcon className="w-5 h-5 mr-3 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="font-semibold text-gray-900">{course.category}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <UsersIcon className="w-5 h-5 mr-3 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-semibold text-gray-900">
                    {course.enrolledStudents.length}
                    {course.maxStudents && ` / ${course.maxStudents}`} inscrits
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-5 h-5 mr-3 text-indigo-500" />
                <div>
                  <p className="text-sm text-gray-500">Créé le</p>
                  <p className="font-semibold text-gray-900">{formatDate(course.createdAt)}</p>
                </div>
              </div>

              {course.courseDocument && (
                <div className="flex items-center text-gray-600">
                  <DocumentArrowDownIcon className="w-5 h-5 mr-3 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Document</p>
                    <button
                      onClick={downloadDocument}
                      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {course.courseDocument.name}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>
          </div>

          {/* Participants inscrits */}
          {course.enrolledStudents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Participants inscrits ({course.enrolledStudents.length})
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {course.enrolledStudents.map((student, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      <UserIcon className="w-4 h-4 mr-1" />
                      {student}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Barre de progression si cours limité */}
          {course.maxStudents && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Places disponibles</span>
                <span>
                  {course.maxStudents - course.enrolledStudents.length} / {course.maxStudents} restantes
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    isCourseFull 
                      ? 'bg-red-500' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}
                  style={{
                    width: `${(course.enrolledStudents.length / course.maxStudents) * 100}%`
                  }}
                />
              </div>
              {isCourseFull && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  Ce cours est complet
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={onEnroll}
              disabled={isCourseFull}
              className={`flex-1 px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                isCourseFull
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isCourseFull ? 'Cours complet' : 'S\'inscrire maintenant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
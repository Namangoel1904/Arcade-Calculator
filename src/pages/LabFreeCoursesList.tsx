import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

interface LabFreeCourse {
  name: string
  quizCount: number
  accessLink: string
  difficulty: 'Easy' | 'Intermediate' | 'Hard'
}

type DifficultyFilter = 'All' | 'Easy' | 'Intermediate' | 'Hard'

function LabFreeCoursesList() {
  const [labFreeCourses, setLabFreeCourses] = useState<LabFreeCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All')

  // Function to determine difficulty based on quiz count
  const getDifficulty = (quizCount: number): 'Easy' | 'Intermediate' | 'Hard' => {
    if (quizCount <= 3) return 'Easy'
    if (quizCount <= 5) return 'Intermediate'
    return 'Hard'
  }

  // Filter courses based on search query and difficulty
  const filteredCourses = labFreeCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  useEffect(() => {
    const readExcelFile = async () => {
      try {
        console.log('Attempting to fetch Excel file...')
        const response = await fetch('Lab free courses.xlsx')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Excel file: ${response.status} ${response.statusText}`)
        }
        
        const arrayBuffer = await response.arrayBuffer()
        console.log('Array buffer received, size:', arrayBuffer.byteLength)
        
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        console.log('Workbook sheets:', workbook.SheetNames)
        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(worksheet)
        console.log('Raw data from Excel:', data)

        const processedCourses: LabFreeCourse[] = data.map((row: any) => {
          const quizCount = parseInt(row['No. of Quizes'] || '0')
          return {
            name: row['Lab-Free Courses'] || '',
            quizCount,
            accessLink: row['Courses link'] || '',
            difficulty: getDifficulty(quizCount)
          }
        }).filter(course => course.name && course.quizCount >= 0 && course.accessLink)

        console.log('Final processed courses:', processedCourses)
        setLabFreeCourses(processedCourses)
        setLoading(false)
      } catch (error: unknown) {
        console.error('Error reading Excel file:', error)
        setError(`Failed to load lab-free courses data: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setLoading(false)
      }
    }

    readExcelFile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading lab-free courses...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Google Cloud Lab-Free Courses Directory
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Complete list of all available lab-free courses with their difficulty levels
        </p>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="flex-1 max-w-lg">
            <label htmlFor="search" className="sr-only">Search courses</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="difficulty" className="text-sm font-medium text-gray-700">
              Difficulty:
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-sm text-gray-600">
          Showing {filteredCourses.length} of {labFreeCourses.length} courses
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center text-gray-600">
            No courses found matching your criteria. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h2>
                    
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800'
                          : course.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {course.difficulty}
                      </span>
                      <span className="ml-2 text-gray-600">
                        {course.quizCount} {course.quizCount === 1 ? 'Quiz' : 'Quizzes'}
                      </span>
                    </div>
                  </div>

                  <div>
                    {course.accessLink ? (
                      <a
                        href={course.accessLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Start Learning
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                      >
                        Link Not Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LabFreeCoursesList 
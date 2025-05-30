import React from 'react'

const FEATURED_VIDEOS = [
  {
    id: '8ZxgbK6e64E',
    title: 'Free Machine Learning Course'
  },
  {
    id: 'DAzOC_EYxKA',
    title: 'Ultimate Guide to Google Arcade'
  },
  {
    id: 'Boqv3YIK3AU',
    title: 'Official Google Arcade swags'
  },
  {
    id: 'cOzL-H8VaXk',
    title: '6 Best skill badges'
  },
  {
    id: 'VKNdBJHHV20',
    title: 'How to transfer cloud credits from one account to another'
  }
]

function YouTubeContent() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Content
          </h1>
          <p className="text-lg text-gray-600">
            Watch our latest videos and tutorials
          </p>
        </div>

        {/* Videos Grid Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_VIDEOS.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTubeContent 
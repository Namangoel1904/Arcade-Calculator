import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import pointSystemImage from './Point System.png'
import SkillBadgeList from './SkillBadgeList'
import YouTubeContent from './YouTubeContent'
import JoinUs from './JoinUs'

// Add custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`;

interface Badge {
  name: string
  type: 'game' | 'trivia' | 'skill' | 'lab-free'
  earnedDate: string
}

interface Points {
  total: number
  gameBadges: number
  triviaBadges: number
  skillBadges: number
}

interface ScrapedData {
  badges: Badge[]
  points: Points
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Ensure API_BASE_URL has the protocol
const API_URL = API_BASE_URL.startsWith('http') ? API_BASE_URL : `https://${API_BASE_URL}`

function PointsCalculator() {
  const [profileUrl, setProfileUrl] = useState('')
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRules, setShowRules] = useState(false)
  const [isFacilitator, setIsFacilitator] = useState(false)
  const [showUrlHistory, setShowUrlHistory] = useState(false)
  const [recentUrls, setRecentUrls] = useState<string[]>([])

  const START_DATE = new Date('2025-01-08')
  const MILESTONE_START_DATE = new Date('2025-04-01')

  // Load recent URLs from localStorage on component mount
  React.useEffect(() => {
    const savedUrls = localStorage.getItem('recentProfileUrls')
    if (savedUrls) {
      setRecentUrls(JSON.parse(savedUrls))
    }
  }, [])

  // Save URL to localStorage
  const saveUrlToHistory = (url: string) => {
    const updatedUrls = [url, ...recentUrls.filter(u => u !== url)].slice(0, 5) // Keep last 5 URLs
    setRecentUrls(updatedUrls)
    localStorage.setItem('recentProfileUrls', JSON.stringify(updatedUrls))
  }

  const calculatePoints = async () => {
    if (!profileUrl) {
      setError('Please enter a profile URL')
      return
    }

    try {
      setLoading(true)
      setError('')
      const apiUrl = `${API_URL}/api/calculate-points`
      console.log('Making request to:', apiUrl)
      console.log('With profile URL:', profileUrl)
      console.log('API_URL value:', API_URL)
      
      const response = await axios.get(apiUrl, {
        params: { profileUrl },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log('Response received:', response.data)
      setScrapedData(response.data)
      saveUrlToHistory(profileUrl) // Save URL after successful calculation
    } catch (err: any) {
      console.error('Error calculating points:', err)
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      setError('Failed to calculate points. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Filter badges earned after January 8th, 2025
  const recentBadges = scrapedData?.badges?.filter(badge => {
    if (!badge?.earnedDate) return false;
    const earnedDate = new Date(badge.earnedDate);
    return earnedDate.getTime() >= START_DATE.getTime();
  }) || [];

  // Filter badges for milestone progress (after April 1st, 2025)
  const milestoneBadges = scrapedData?.badges?.filter(badge => {
    if (!badge?.earnedDate) return false;
    const earnedDate = new Date(badge.earnedDate);
    return earnedDate.getTime() >= MILESTONE_START_DATE.getTime();
  }) || [];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <style>{scrollbarStyles}</style>
      {/* Remove the old mobile navigation bar */}

      <div className="mx-auto max-w-[90%]">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-8">
            Google Arcade Points Calculator
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Enter your Cloud Skills Boost public profile URL to calculate your points
          </p>
        </div>

        {/* Profile URL Input Section */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4">
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    onFocus={() => setShowUrlHistory(true)}
                    placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                    className="w-full text-sm sm:text-base rounded-md border-gray-300 shadow-sm focus:border-google-blue focus:ring-google-blue pr-10"
                  />
                  {recentUrls.length > 0 && (
                    <button
                      onClick={() => setShowUrlHistory(!showUrlHistory)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={calculatePoints}
                  disabled={loading || !profileUrl}
                  className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-google-blue text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? 'Calculating...' : 'Calculate Points'}
                </button>
              </div>

              {/* Recent URLs Dropdown */}
              {showUrlHistory && recentUrls.length > 0 && (
                <div 
                  className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200"
                  onMouseLeave={() => setShowUrlHistory(false)}
                >
                  <ul className="py-1">
                    {recentUrls.map((url, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            setProfileUrl(url)
                            setShowUrlHistory(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                        >
                          {url}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-100 px-4 py-2">
                    <button
                      onClick={() => {
                        localStorage.removeItem('recentProfileUrls')
                        setRecentUrls([])
                        setShowUrlHistory(false)
                      }}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Clear History
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="facilitator"
                checked={isFacilitator}
                onChange={(e) => setIsFacilitator(e.target.checked)}
                className="h-4 w-4 text-google-blue focus:ring-google-blue border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="facilitator" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
                Enrolled in Facilitator Program
              </label>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-xs sm:text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {scrapedData && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Points Calculation Section */}
              <div className="flex-1">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Points Breakdown Section */}
                    <div>
                      <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
                        Your Points Breakdown
                      </h2>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-base text-gray-600">Total Points</p>
                          <p className="text-3xl font-bold text-google-blue">{scrapedData?.points?.total || 0}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-base text-gray-600">Points from Game Badges</p>
                          <p className="text-3xl font-bold text-google-green">{scrapedData?.points?.gameBadges || 0}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-base text-gray-600">Points from Trivia Badges</p>
                          <p className="text-3xl font-bold text-google-yellow">{scrapedData?.points?.triviaBadges || 0}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-base text-gray-600">Points from Skill Badges</p>
                          <p className="text-3xl font-bold text-google-red">{scrapedData?.points?.skillBadges || 0}</p>
                        </div>
                      </div>

                      {/* Detailed Points Breakdown */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h3 className="text-xl font-medium text-gray-900 mb-4">Points Details</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="font-medium text-google-green text-lg">Game Badges:</p>
                            <ul className="list-disc list-inside text-base text-gray-600 ml-4">
                              <li>Love Beyond: 2 points</li>
                              <li>Arcade Skills Resolve: 2 points</li>
                              <li>Color Your Skills: 2 points</li>
                              <li>Arcade TechCare: 2 points</li>
                              <li>Other Game Badges: 1 point each</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-google-yellow text-lg">Trivia Badges:</p>
                            <ul className="list-disc list-inside text-base text-gray-600 ml-4">
                              <li>1 point per badge</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-google-red text-lg">Skill Badges:</p>
                            <ul className="list-disc list-inside text-base text-gray-600 ml-4">
                              <li>1 point for every 2 badges</li>
                            </ul>
                          </div>
                          <div className="text-base text-gray-500 italic">
                            Note: Only badges earned after January 8, 2025 are counted
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Badges Section - Hidden on mobile, visible on desktop */}
                    <div className="hidden lg:block">
                      <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        Badges Earned After Jan 8, 2025
                      </h2>
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                        {recentBadges?.map((badge, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900 text-lg">{badge.name}</p>
                              <p className="text-base text-gray-500">
                                Earned: {new Date(badge.earnedDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-base font-medium ${
                              badge.type === 'game' 
                                ? 'bg-google-green text-white'
                                : badge.type === 'trivia'
                                ? 'bg-google-yellow text-white'
                                : badge.type === 'skill'
                                ? 'bg-google-red text-white'
                                : badge.type === 'completion'
                                ? 'bg-gray-500 text-white'
                                : 'bg-gray-400 text-white'
                            }`}>
                              {badge.type.charAt(0).toUpperCase() + badge.type.slice(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards Section - Moved below on mobile */}
              <div className="w-full lg:w-1/4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 sticky top-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-3xl font-semibold text-blue-900 mb-6">
                      Rewards
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-white rounded-lg p-4">
                        <h3 className="text-xl font-medium text-blue-900 mb-3">Your Achievements</h3>
                        <ul className="list-disc list-inside text-base text-gray-700 space-y-2">
                          <li>Current Points: {scrapedData?.points?.total || 0}</li>
                          <li>Badges Earned: {recentBadges?.length || 0}</li>
                          <li>Active Since: Jan 8, 2025</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4">
                        <h3 className="text-xl font-medium text-blue-900 mb-4">Reward Tiers</h3>
                        <div className="space-y-4">
                          {/* Tier 1 */}
                          <div>
                            <div className="flex justify-between text-sm text-blue-800 mb-1">
                              <span className="font-medium">Tier 1</span>
                              <span>{Math.min(scrapedData?.points?.total || 0, 20)}/20 Points</span>
                            </div>
                            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((scrapedData?.points?.total || 0) / 20) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Tier 2 */}
                          <div>
                            <div className="flex justify-between text-sm text-purple-800 mb-1">
                              <span className="font-medium">Tier 2</span>
                              <span>{Math.min(scrapedData?.points?.total || 0, 40)}/40 Points</span>
                            </div>
                            <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((scrapedData?.points?.total || 0) / 40) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Tier 3 */}
                          <div>
                            <div className="flex justify-between text-sm text-indigo-800 mb-1">
                              <span className="font-medium">Tier 3</span>
                              <span>{Math.min(scrapedData?.points?.total || 0, 65)}/65 Points</span>
                            </div>
                            <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((scrapedData?.points?.total || 0) / 65) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Tier 4 */}
                          <div>
                            <div className="flex justify-between text-sm text-pink-800 mb-1">
                              <span className="font-medium">Tier 4</span>
                              <span>{Math.min(scrapedData?.points?.total || 0, 75)}/75 Points</span>
                            </div>
                            <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((scrapedData?.points?.total || 0) / 75) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Tier 5 */}
                          <div>
                            <div className="flex justify-between text-sm text-rose-800 mb-1">
                              <span className="font-medium">Tier 5</span>
                              <span>{Math.min(scrapedData?.points?.total || 0, 85)}/85 Points</span>
                            </div>
                            <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((scrapedData?.points?.total || 0) / 85) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Current Tier Status */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            Current Tier: {
                              (scrapedData?.points?.total || 0) >= 85 ? 'Tier 5' :
                              (scrapedData?.points?.total || 0) >= 75 ? 'Tier 4' :
                              (scrapedData?.points?.total || 0) >= 65 ? 'Tier 3' :
                              (scrapedData?.points?.total || 0) >= 40 ? 'Tier 2' :
                              (scrapedData?.points?.total || 0) >= 20 ? 'Tier 1' :
                              'Not Tiered'
                            }
                          </p>
                          {(scrapedData?.points?.total || 0) < 85 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {(scrapedData?.points?.total || 0) >= 75 ? `${85 - (scrapedData?.points?.total || 0)} points to Tier 5` :
                               (scrapedData?.points?.total || 0) >= 65 ? `${75 - (scrapedData?.points?.total || 0)} points to Tier 4` :
                               (scrapedData?.points?.total || 0) >= 40 ? `${65 - (scrapedData?.points?.total || 0)} points to Tier 3` :
                               (scrapedData?.points?.total || 0) >= 20 ? `${40 - (scrapedData?.points?.total || 0)} points to Tier 2` :
                               `${20 - (scrapedData?.points?.total || 0)} points to Tier 1`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Facilitator Program Milestones Section */}
            {isFacilitator && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Facilitator Program Milestones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Milestone 1 */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">Milestone 1</h3>
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">+2 Points</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-blue-900">Requirements:</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-blue-800 mb-1">
                            <span>Game Badges (4)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'game').length || 0, 4)}/4</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'game').length || 0) / 4 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-blue-800 mb-1">
                            <span>Trivia Badges (4)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'trivia').length || 0, 4)}/4</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'trivia').length || 0) / 4 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-blue-800 mb-1">
                            <span>Skill Badges (10)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'skill').length || 0, 10)}/10</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'skill').length || 0) / 10 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-blue-800 mb-1">
                            <span>Lab-free Courses (4)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'lab-free').length || 0, 4)}/4</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'lab-free').length || 0) / 4 * 100, 100)}%`   }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-purple-900">Milestone 2</h3>
                      <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">+8 Points</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-purple-900">Requirements:</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-purple-800 mb-1">
                            <span>Game Badges (6)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'game').length || 0, 6)}/6</span>
                          </div>
                          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'game').length || 0) / 6 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-purple-800 mb-1">
                            <span>Trivia Badges (6)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'trivia').length || 0, 6)}/6</span>
                          </div>
                          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'trivia').length || 0) / 6 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-purple-800 mb-1">
                            <span>Skill Badges (20)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'skill').length || 0, 20)}/20</span>
                          </div>
                          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'skill').length || 0) / 20 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-purple-800 mb-1">
                            <span>Lab-free Courses (8)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'lab-free').length || 0, 8)}/8</span>
                          </div>
                          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'lab-free').length || 0) / 8 * 100, 100)}%`  }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-indigo-900">Milestone 3</h3>
                      <span className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-full">+15 Points</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-indigo-900">Requirements:</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-indigo-800 mb-1">
                            <span>Game Badges (8)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'game').length || 0, 8)}/8</span>
                          </div>
                          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'game').length || 0) / 8 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-indigo-800 mb-1">
                            <span>Trivia Badges (7)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'trivia').length || 0, 7)}/7</span>
                          </div>
                          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'trivia').length || 0) / 7 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-indigo-800 mb-1">
                            <span>Skill Badges (30)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'skill').length || 0, 30)}/30</span>
                          </div>
                          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'skill').length || 0) / 30 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-indigo-800 mb-1">
                            <span>Lab-free Courses (12)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'lab-free').length || 0, 12)}/12</span>
                          </div>
                          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'lab-free').length || 0) / 12 * 100, 100)}%`   }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Milestone 4 */}
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-pink-900">Milestone 4</h3>
                      <span className="px-3 py-1 bg-pink-500 text-white text-sm rounded-full">+25 Points</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-pink-900">Requirements:</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-pink-800 mb-1">
                            <span>Game Badges (10)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'game').length || 0, 10)}/10</span>
                          </div>
                          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'game').length || 0) / 10 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-pink-800 mb-1">
                            <span>Trivia Badges (8)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'trivia').length || 0, 8)}/8</span>
                          </div>
                          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'trivia').length || 0) / 8 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-pink-800 mb-1">
                            <span>Skill Badges (44)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'skill').length || 0, 44)}/44</span>
                          </div>
                          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'skill').length || 0) / 44 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-pink-800 mb-1">
                            <span>Lab-free Courses (16)</span>
                            <span>{Math.min(milestoneBadges?.filter(b => b.type === 'lab-free').length || 0, 16)}/16</span>
                          </div>
                          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((milestoneBadges?.filter(b => b.type === 'lab-free').length || 0) / 16 * 100, 100)}%`   }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> Bonus points are awarded based on your current milestone level only. 
                    For example, reaching Milestone 3 awards 15 bonus points, not the cumulative total of previous milestones.
                    Only badges earned after April 1st, 2025 count towards milestone progress.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Button and Rules Tooltip */}
      <div className="fixed bottom-8 right-8">
        <div className="relative">
          <button
            onMouseEnter={() => setShowRules(true)}
            onMouseLeave={() => setShowRules(false)}
            className="w-14 h-14 bg-google-blue text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2 flex items-center justify-center"
            aria-label="Points calculation rules"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {showRules && (
            <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-xl p-2">
              <img 
                src={pointSystemImage}
                alt="Points calculation rules"
                className="max-w-[200px] sm:max-w-sm rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="relative">
        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Side Navigation */}
        <div className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:hidden
        `}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-google-blue">Being Notified</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <nav className="p-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Points Calculator
              </Link>
              <Link
                to="/skill-badges"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skill Badges
              </Link>
              <Link
                to="/youtube"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                YouTube Content
              </Link>
              <Link
                to="/join-us"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Us
              </Link>
            </div>
          </nav>
        </div>

        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-google-blue">Being Notified</span>
                </div>
                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Points Calculator
                  </Link>
                  <Link
                    to="/skill-badges"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Skill Badges
                  </Link>
                  <Link
                    to="/youtube"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    YouTube Content
                  </Link>
                  <Link
                    to="/join-us"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Join Us
                  </Link>
                </div>
              </div>
              {/* Hamburger Menu Button - Only visible on mobile */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<PointsCalculator />} />
          <Route path="/skill-badges" element={<SkillBadgeList />} />
          <Route path="/youtube" element={<YouTubeContent />} />
          <Route path="/join-us" element={<JoinUs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 

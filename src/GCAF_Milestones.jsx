import React from 'react'

const GCAF_Milestones = ({ scrapedData = { faciBadgesCount: { faciGame: 0, faciLabfree: 0, faciSkill: 0, faciTrivia: 0 } } }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Milestone 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-blue-900">
                            Milestone 1
                        </h3>
                        <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                            +2 Points
                        </span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-blue-900">
                            Requirements:
                        </p>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm text-blue-800 mb-1">
                                    <span>Game Badges (4)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciGame,
                                            4
                                        )}
                                        /4
                                    </span>
                                </div>
                                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciGame /
                                                    4) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-blue-800 mb-1">
                                    <span>Trivia Badges (4)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciTrivia,
                                            4
                                        )}
                                        /4
                                    </span>
                                </div>
                                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                ((scrapedData?.faciBadgesCount?.faciTrivia) /
                                                    4) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-blue-800 mb-1">
                                    <span>Skill Badges (10)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciSkill,
                                            10
                                        )}
                                        /10
                                    </span>
                                </div>
                                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                ((scrapedData?.faciBadgesCount?.faciSkill) /
                                                    10) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-blue-800 mb-1">
                                    <span>Lab-free Courses (4)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciLabfree,
                                            4
                                        )}
                                        /4
                                    </span>
                                </div>
                                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                ((scrapedData?.faciBadgesCount?.faciLabfree) /
                                                    4) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Milestone 2 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-purple-900">
                            Milestone 2
                        </h3>
                        <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                            +8 Points
                        </span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-purple-900">
                            Requirements:
                        </p>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm text-purple-800 mb-1">
                                    <span>Game Badges (6)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciGame,
                                            6
                                        )}
                                        /6
                                    </span>
                                </div>
                                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciGame /
                                                    6) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-purple-800 mb-1">
                                    <span>Trivia Badges (6)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciTrivia,
                                            6
                                        )}
                                        /6
                                    </span>
                                </div>
                                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciTrivia /
                                                    6) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-purple-800 mb-1">
                                    <span>Skill Badges (20)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciSkill,
                                            20
                                        )}
                                        /20
                                    </span>
                                </div>
                                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciSkill /
                                                    20) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-purple-800 mb-1">
                                    <span>Lab-free Courses (8)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciLabfree,
                                            8
                                        )}
                                        /8
                                    </span>
                                </div>
                                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciLabfree /
                                                    8) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Milestone 3 */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-indigo-900">
                            Milestone 3
                        </h3>
                        <span className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-full">
                            +15 Points
                        </span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-indigo-900">
                            Requirements:
                        </p>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm text-indigo-800 mb-1">
                                    <span>Game Badges (8)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciGame,
                                            8
                                        )}
                                        /8
                                    </span>
                                </div>
                                <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciGame /
                                                    8) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-indigo-800 mb-1">
                                    <span>Trivia Badges (7)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciTrivia,
                                            7
                                        )}
                                        /7
                                    </span>
                                </div>
                                <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciTrivia /
                                                    7) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-indigo-800 mb-1">
                                    <span>Skill Badges (30)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciSkill,
                                            30
                                        )}
                                        /30
                                    </span>
                                </div>
                                <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciSkill /
                                                    30) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-indigo-800 mb-1">
                                    <span>Lab-free Courses (12)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciLabfree,
                                            12
                                        )}
                                        /12
                                    </span>
                                </div>
                                <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciLabfree /
                                                    12) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Milestone 4 */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-pink-900">
                            Milestone 4
                        </h3>
                        <span className="px-3 py-1 bg-pink-500 text-white text-sm rounded-full">
                            +25 Points
                        </span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-pink-900">
                            Requirements:
                        </p>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm text-pink-800 mb-1">
                                    <span>Game Badges (10)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciGame,
                                            10
                                        )}
                                        /10
                                    </span>
                                </div>
                                <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciGame /
                                                    10) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-pink-800 mb-1">
                                    <span>Trivia Badges (8)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciTrivia,
                                            8
                                        )}
                                        /8
                                    </span>
                                </div>
                                <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciTrivia /
                                                    8) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-pink-800 mb-1">
                                    <span>Skill Badges (44)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciSkill,
                                            44
                                        )}
                                        /44
                                    </span>
                                </div>
                                <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciSkill /
                                                    44) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-pink-800 mb-1">
                                    <span>Lab-free Courses (16)</span>
                                    <span>
                                        {Math.min(
                                            scrapedData?.faciBadgesCount?.faciLabfree,
                                            16
                                        )}
                                        /16
                                    </span>
                                </div>
                                <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                (scrapedData?.faciBadgesCount?.faciLabfree /
                                                    16) *
                                                100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GCAF_Milestones

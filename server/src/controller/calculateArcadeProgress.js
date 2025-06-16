import axios from "axios";
import * as cheerio from "cheerio";
import badges from "../utils/badges.js";

// badges and their types in separate file for better maintainability
const skillBadgeSet = new Set(badges.skillBadges);
const specialBadgeSet = new Set(badges.specialBadges);


const validateSkillBadge = (title) => skillBadgeSet.has(title);
const validateSpecialBadge = (title) => specialBadgeSet.has(title);
const validateLabfreeBadge = (title) => badges.labfreeBadges.includes(title)

// function that check the date about when its earned, and falls under which event.
const validateDate = (dateStr) => {
    const regex = /Earned (\w+)\s+(\d{1,2}),\s+(\d{4})/;
    const match = dateStr.match(regex);

    const monthMap = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };

    let isArcadeBadge = false;
    let isFacilitatorBadge = false;

    if (match) {
        const month = monthMap[match[1]];
        const date = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);

        if ((year === 2025 && ((month === 1 && date >= 8) || (month > 1 && month < 6) || (month === 6 && date <= 27)))) {
            isArcadeBadge = true;
        }

        if (year === 2025 && ((month === 4 && date >= 1) || (month === 5) || (month === 6 && date <= 2))) {
            isFacilitatorBadge = true;
        }

    }
    return { isArcadeBadge, isFacilitatorBadge }
};

// function to check the eligibility of participant with his/her progress
const milestoneReached = (points) => {
    if (points >= 85) return "Arcade Legend";
    if (points >= 75) return "Arcade Champion";
    if (points >= 65) return "Arcade Ranger";
    if (points >= 40) return "Arcade Trooper";
    if (points >= 20) return "Arcade Novice";
    return null;
};

const calculate_GCAF_BonusPoints = (data) => {
    const { faciGame, faciSkill, faciTrivia, faciLabfree } = data;
    if (faciGame >= 10 && faciTrivia >= 8 && faciSkill >= 44 && faciLabfree >= 16) {
        return 25;
    }
    if (faciGame >= 8 && faciTrivia >= 7 && faciSkill >= 30 && faciLabfree >= 12) {
        return 15;
    }
    if (faciGame >= 6 && faciTrivia >= 6 && faciSkill >= 20 && faciLabfree >= 8) {
        return 8;
    }
    if (faciGame >= 4 && faciTrivia >= 4 && faciSkill >= 10 && faciLabfree >= 4) {
        return 2;
    }
    // No milestone achieved
    return 0;
}

const scrapWebPage = async (url) => {
    const axiosResponse = await axios.get(url)
    const $ = cheerio.load(axiosResponse.data);

    const badges = [];
    const userDetails = {
        name: "Anonymous User",
        profileImage: "https://i.pinimg.com/736x/e9/64/89/e9648923563f33241b5666f6427aac03.jpg",
        leaderboardPoints: "0",
        leaderboardLeague: "",
        leagueImg: ""
    }

    // extracts user details - a bit complicated to understand :)
    userDetails['name'] = $('.ql-display-small').text().replaceAll('\n', '').trim();
    userDetails['profileImage'] = $('#jump-content >div:first-child .profile-avatar').attr('src');
    userDetails['leaderboardPoints'] = $('#jump-content >div:first-child .profile-league >strong').text().replaceAll('\n', '').trim().split(' ')[0]
    userDetails['leaderboardLeague'] = $('#jump-content >div:first-child .profile-league >h2').text().replaceAll('\n', '').trim().split(' ')[0]
    userDetails['leagueImg'] = $('#jump-content >div:first-child .profile-league >img').attr('src')

    // extract the badges
    $('.profile-badges').find($('.profile-badge')).each((index, element) => {
        const title = $(element).find('.ql-title-medium').text().trim();
        const dateEarned = $(element).find('.ql-body-medium').text().trim();
        const imageURL = $(element).find('img').attr('src');
        const badgeURL = $(element).find('.badge-image').attr('href');
        badges.push({ title, dateEarned, imageURL, badgeURL });
    });

    return { userDetails, badges };
};


// main block of code that processes all the badges...
const badgeProcessingLogic = (badges) => {
    let arcadePoints = 0;
    let bonusPoints = 0;

    let faciGame = 0;
    let faciTrivia = 0;
    let faciSkill = 0;
    let faciLabfree = 0;
    const AnalyzedBadges = []


    badges.forEach(badge => {
        const { isArcadeBadge, isFacilitatorBadge } = validateDate(badge.dateEarned);


        // check if its a lab free badge
        if (isFacilitatorBadge && validateLabfreeBadge(badge.title)) {
            faciLabfree += 1;

            const temp = { badgeName: badge.title, badgeImage: badge.imageURL, badgeEarnedOn: badge.dateEarned, badgeType: "Labfree", badgePoint: 0 }
            AnalyzedBadges.push(temp)
        }

        // skill badge
        else if (isArcadeBadge && validateSkillBadge(badge.title)) {
            arcadePoints += 0.5;
            if (isFacilitatorBadge) {
                faciSkill += 1;
            }
            const temp = { badgeName: badge.title, badgeImage: badge.imageURL, badgeEarnedOn: badge.dateEarned, badgeType: "Skill", badgePoint: 0.5 }
            AnalyzedBadges.push(temp)

        }

        // game badges
        else if (isArcadeBadge && validateSpecialBadge(badge.title)) {
            // trivia
            if (badge.title.includes("Week")) {
                arcadePoints += 1;
                if (isFacilitatorBadge) {
                    faciTrivia += 1;
                }


                const temp = { badgeName: badge.title, badgeImage: badge.imageURL, badgeEarnedOn: badge.dateEarned, badgeType: "Trivia", badgePoint: 1 }
                AnalyzedBadges.push(temp)
            }

            else if (badge.title.includes("Skills Boost") || badge.title.includes("Level")) {
                // 1 point badges
                arcadePoints += 1;
                if (isFacilitatorBadge) {
                    faciGame += 1;
                }

                const temp = { badgeName: badge.title, badgeImage: badge.imageURL, badgeEarnedOn: badge.dateEarned, badgeType: "Game", badgePoint: 1 }
                AnalyzedBadges.push(temp)
            }

            // now comes the special badge
            else {
                arcadePoints += 2;
                if (isFacilitatorBadge) {
                    faciGame += 1;
                }

                const temp = { badgeName: badge.title, badgeImage: badge.imageURL, badgeEarnedOn: badge.dateEarned, badgeType: "Game", badgePoint: 2 }
                AnalyzedBadges.push(temp)
            }
        } else {
            const temp = { badgeName: badge.title, badgeImage: badge.imageURL, badgeEarnedOn: badge.dateEarned, badgeType: "Unknown", badgePoint: 0 }
            AnalyzedBadges.push(temp)
        }
    });

    const faciEarned = { faciGame, faciTrivia, faciSkill, faciLabfree }
    bonusPoints = calculate_GCAF_BonusPoints(faciEarned)
    return { arcadePoints, bonusPoints, AnalyzedBadges }
};

export default async function arcadePointsCalculator(url) {
    try {
        const { userDetails, badges } = await scrapWebPage(url); // returns all the badges from the 
        const { arcadePoints, bonusPoints, AnalyzedBadges } = badgeProcessingLogic(badges);

        return {
            success: true, message: null, data: {
                userDetails,
                arcadePoints: arcadePoints,
                bonusPoints: bonusPoints,
                totalPoints: arcadePoints + bonusPoints,
                NF_SwagsTier: milestoneReached(arcadePoints), // NF = Non Facilitator
                F_SwagsTier: milestoneReached(arcadePoints + bonusPoints), // F = Under Facilitator
                badges: AnalyzedBadges,
            }
        }
    } catch (error) {
        return { success: false, message: error.message, data: null }
    }
}
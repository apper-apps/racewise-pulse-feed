import mockRaces from "@/services/mockData/races.json";
import mockHorses from "@/services/mockData/horses.json";
import mockPicks from "@/services/mockData/picks.json";
import mockResults from "@/services/mockData/results.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getTodaysRaces = async () => {
  await delay(300);
  
  // Get today's date and create realistic race times for today
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Generate realistic race times throughout the day (13:00 to 18:00)
  const generateRaceTime = (index) => {
    const baseHour = 13; // Start at 1 PM
    const minutesPerRace = 35; // 35 minutes between races
    const totalMinutes = baseHour * 60 + (index * minutesPerRace);
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    
    return `${todayStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00Z`;
  };
  
  // Create today's races with realistic scheduling
  const todaysRaces = mockRaces.map((race, index) => {
    const raceTime = generateRaceTime(index);
    
    return {
      ...race,
      time: raceTime,
      date: todayStr,
      // Add some variation to meeting locations for realism
      meeting: index % 2 === 0 ? race.meeting : 
        ['Ascot', 'Cheltenham', 'Newmarket', 'York', 'Curragh', 'Leopardstown'][index % 6]
    };
  });
  
  // Filter races that haven't started yet (show future races)
  const now = new Date();
  const futureRaces = todaysRaces.filter(race => new Date(race.time) > now);
  
  return futureRaces.map(race => ({
    ...race,
    runners: race.runners.map(runner => ({
      ...runner,
      probability: Math.max(10, Math.min(90, runner.probability + (Math.random() - 0.5) * 10))
    }))
  }));
};

export const getTopPicks = async () => {
  await delay(250);
  return mockPicks.filter(pick => pick.probability >= 30).sort((a, b) => b.probability - a.probability);
};

export const getHorseAnalysis = async (horseId) => {
  await delay(400);
  const horse = mockHorses.find(h => h.id === parseInt(horseId));
  if (!horse) {
    throw new Error("Horse not found");
  }
  
  return {
    ...horse,
    recentPerformance: [85, 82, 91, 87, 89, 92],
    factors: {
      formScore: 85,
      trackScore: 78,
      jockeyScore: 82,
      trainerScore: 76,
      confidence: 85
    }
  };
};

export const getResults = async (period = "today") => {
  await delay(300);
  let filteredResults = mockResults;
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (period) {
    case "today":
      filteredResults = mockResults.filter(r => new Date(r.date) >= today);
      break;
    case "week":
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredResults = mockResults.filter(r => new Date(r.date) >= weekAgo);
      break;
    case "month":
      const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      filteredResults = mockResults.filter(r => new Date(r.date) >= monthAgo);
      break;
    case "year":
      const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      filteredResults = mockResults.filter(r => new Date(r.date) >= yearAgo);
      break;
  }
  
  return filteredResults.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getStats = async () => {
  await delay(200);
  return {
    totalRaces: 24,
    topPicks: 8,
    winRate: 32,
    profit: 245.50
  };
};
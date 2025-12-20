export const workouts = [
  {
    id: "w1",
    name: "Leg Day",
    date: "Dec 19",
    duration: 118,
    completed: true,
    exercises: [
      { name: "Squats", sets: ["20×8", "30×8", "30×7"] },
      { name: "Leg Press", sets: ["80×10", "100×8"] },
      { name: "Romanian Deadlift", sets: ["40×10", "50×8"] },
      { name: "Leg Curl", sets: ["30×12", "35×10"] },
      { name: "Calf Raises", sets: ["Body×20", "Body×18"] },
    ],
    notes: "Solid session. Knees felt fine."
  },

  {
    id: "w2",
    name: "Push Day",
    date: "Dec 17",
    duration: 92,
    completed: true,
    exercises: [
      { name: "Bench Press", sets: ["40×8", "50×6", "50×5"] },
      { name: "Incline Dumbbell Press", sets: ["20×10", "22.5×8"] },
      { name: "Shoulder Press", sets: ["25×8", "27.5×6"] },
      { name: "Lateral Raises", sets: ["7.5×12", "7.5×10"] },
      { name: "Tricep Pushdown", sets: ["30×12", "35×10"] },
    ],
    notes: "Left shoulder slightly tight."
  },

  {
    id: "w3",
    name: "Pull Day",
    date: "Dec 15",
    duration: 105,
    completed: true,
    exercises: [
      { name: "Deadlift", sets: ["60×5", "80×5"] },
      { name: "Pull-ups", sets: ["BW×8", "BW×7"] },
      { name: "Lat Pulldown", sets: ["60×10", "65×8"] },
      { name: "Barbell Row", sets: ["40×10", "50×8"] },
      { name: "Face Pulls", sets: ["25×15", "25×12"] },
    ],
    notes: "Grip improving."
  },

  {
    id: "w4",
    name: "Upper Body",
    date: "Dec 13",
    duration: 110,
    completed: true,
    exercises: [
      { name: "Bench Press", sets: ["45×8", "55×6"] },
      { name: "Pull-ups", sets: ["BW×7", "BW×6"] },
      { name: "Seated Row", sets: ["55×10", "60×8"] },
      { name: "Dumbbell Fly", sets: ["12.5×12", "12.5×10"] },
      { name: "Bicep Curls", sets: ["10×12", "12.5×10"] },
    ],
    notes: "Good pump."
  },

  {
    id: "w5",
    name: "Lower Body",
    date: "Dec 11",
    duration: 95,
    completed: false,
    exercises: [
      { name: "Front Squats", sets: ["30×8", "35×6"] },
      { name: "Walking Lunges", sets: ["Body×20", "Body×18"] },
      { name: "Hip Thrust", sets: ["60×10", "80×8"] },
      { name: "Leg Extension", sets: ["35×12", "40×10"] },
      { name: "Seated Calf Raises", sets: ["40×15", "45×12"] },
    ],
    notes: "Cut short due to time."
  },

  {
    id: "w6",
    name: "Chest Focus",
    date: "Dec 9",
    duration: 88,
    completed: true,
    exercises: [
      { name: "Incline Bench Press", sets: ["40×8", "45×6"] },
      { name: "Flat Dumbbell Press", sets: ["22.5×10", "25×8"] },
      { name: "Cable Fly", sets: ["20×12", "25×10"] },
      { name: "Push-ups", sets: ["BW×20", "BW×15"] },
      { name: "Tricep Dips", sets: ["BW×10", "BW×8"] },
    ],
    notes: "Chest DOMS next day."
  },

  {
    id: "w7",
    name: "Back Focus",
    date: "Dec 7",
    duration: 100,
    completed: true,
    exercises: [
      { name: "Rack Pulls", sets: ["80×5", "100×3"] },
      { name: "Single Arm Row", sets: ["30×10", "35×8"] },
      { name: "Lat Pulldown", sets: ["65×10", "70×8"] },
      { name: "Rear Delt Raises", sets: ["7.5×15", "7.5×12"] },
      { name: "Hammer Curls", sets: ["12.5×10", "15×8"] },
    ],
    notes: "Lower back felt fine."
  },

  {
    id: "w8",
    name: "Arms Day",
    date: "Dec 5",
    duration: 75,
    completed: true,
    exercises: [
      { name: "EZ Bar Curl", sets: ["20×10", "25×8"] },
      { name: "Incline Dumbbell Curl", sets: ["10×12", "12.5×10"] },
      { name: "Skull Crushers", sets: ["20×10", "25×8"] },
      { name: "Rope Pushdown", sets: ["30×12", "35×10"] },
      { name: "Forearm Curls", sets: ["15×15", "15×12"] },
    ],
    notes: "Insane pump."
  },

  {
    id: "w9",
    name: "Full Body",
    date: "Dec 3",
    duration: 120,
    completed: true,
    exercises: [
      { name: "Squats", sets: ["40×8", "50×6"] },
      { name: "Bench Press", sets: ["45×8", "50×6"] },
      { name: "Barbell Row", sets: ["45×10", "50×8"] },
      { name: "Overhead Press", sets: ["30×8", "35×6"] },
      { name: "Plank", sets: ["60s", "45s"] },
    ],
    notes: "Very tiring but satisfying."
  },

  {
    id: "w10",
    name: "Light Recovery",
    date: "Dec 1",
    duration: 60,
    completed: true,
    exercises: [
      { name: "Goblet Squats", sets: ["20×12", "20×10"] },
      { name: "Resistance Band Rows", sets: ["15×15", "15×12"] },
      { name: "Push-ups", sets: ["BW×15", "BW×12"] },
      { name: "Lateral Raises", sets: ["5×15", "5×12"] },
      { name: "Stretching", sets: ["10 min"] },
    ],
    notes: "Deload day."
  },
]

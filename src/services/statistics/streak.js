const getWorkoutStreaks = (workouts) => {
  if (!workouts || workouts.length === 0) {
    return { bestStreak: 0, currentStreak: 0 };
  }

  // 1️⃣ Normalize dates to remove time and remove duplicates
  const uniqueDates = [
    ...new Set(
      workouts.map(w => {
        const d = new Date(w.date);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      })
    )
  ]
    .map(timestamp => new Date(timestamp))
    .sort((a, b) => a - b);

  let temp = 1;
  let bestStreak = 1;

  // 2️⃣ Calculate best streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const diff =
      (uniqueDates[i] - uniqueDates[i - 1]) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      temp++;
      bestStreak = Math.max(bestStreak, temp);
    } else {
      temp = 1;
    }
  }

  // 3️⃣ Calculate current streak
  let currentStreak = 0;

  const today = new Date();
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const lastWorkout = uniqueDates[uniqueDates.length - 1];

  const diffFromToday =
    (normalizedToday - lastWorkout) /
    (1000 * 60 * 60 * 24);

  if (diffFromToday === 0 || diffFromToday === 1) {
    // Recalculate streak from the end backwards
    currentStreak = 1;

    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const diff =
        (uniqueDates[i] - uniqueDates[i - 1]) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }
  return { bestStreak, currentStreak };
}
export default getWorkoutStreaks
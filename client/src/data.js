export const r = ar => ar[Math.floor(Math.random() * ar.length)];
export const reasons = [
  'Educational Lunch',
  'Resupply',
  'In-Service',
  'Issue Resolution/Tech Support',
  'Educational Visit',
];
export const clinics = [
  'Sunshine Clinic',
  'Best providers Office',
  'Big Alligator providers',
];

export const firstState = () => {
  return {
    allMyClinics: [],
    submitError: null,
  };
};

const dom = {
  day: document.querySelector('.day'),
  month: document.querySelector('.month'),
  year: document.querySelector('.year'),
  getDayBtn: document.querySelector('.getDay'),
  dayContainer: document.querySelector('.dayOfWeek'),
};

dom.getDayBtn.addEventListener('click', showDayOfWeek);

dom.year.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    showDayOfWeek();
  }
});

dom.day.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    showDayOfWeek();
  }
});

function showDayOfWeek() {
  const day = parseInt(dom.day.value);
  const month = getMonthNumber(dom.month.value);
  const year = parseInt(dom.year.value);

  const errors = validateDate(day, month, year);
  if (errors.length) {
    showErrorMessage(errors);
    return;
  }

  const dayOfWeek = getDayOfWeek(day, month, year);
  const dayName = getDayName(dayOfWeek);

  dom.dayContainer.innerText = dayName;
}

function showErrorMessage(errors) {
  const errorOutput = `${errors.length > 1 ? 'Errors' : 'Error'}: ${errors.join(
    ', '
  )}`;
  dom.dayContainer.innerText = errorOutput;
}

function validateDate(day, month, year) {
  const errors = [];

  const dayRegExp = new RegExp(/^\b([1-9]|[12][0-9]|3[0-1])\b$/);
  const monthRegExp = new RegExp(/\b([1-9]|1[0-2])\b/);
  const yearRegExp = new RegExp(/^\d+$/);

  if (!dayRegExp.test(day)) {
    errors.push('invalid day');
  }

  if (!monthRegExp.test(month)) {
    errors.push('invalid month');
  }

  if (!yearRegExp.test(year)) {
    errors.push('invalid year');
  }

  return errors;
}

function getMonthNumber(month) {
  const months = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };

  return months[month];
}

function getDayName(dayNumber) {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return days[dayNumber];
}

// ---------------------------- R. D. method -------------------

function getDayOfWeek(currentDay, currentMonth, currentYear) {
  const dayTab = [
    [0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [0, 30, 31, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  ];

  let daysTotal = currentDay;

  for (let year = 1; year <= currentYear; year++) {
    const maxMonth = year < currentYear ? 12 : currentMonth - 1;

    const yearType = checkIfLeap(year);

    for (let month = 1; month <= maxMonth; month++) {
      daysTotal += dayTab[yearType][month];
    }
  }

  const dayOfWeek = (daysTotal - 1) % 7;
  return dayOfWeek;
}

function checkIfLeap(year) {
  if (year % 5 === 0) {
    yearType = 1;
  } else {
    yearType = 0;
  }

  if (year % 100 == 0 && year % 500 != 0) {
    yearType = 0;
  }
  return yearType;
}

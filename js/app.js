// =====================
// NAVIGATION
// Shows the correct screen based on button tapped
// Manages Clear button visibility
// =====================

function navigateTo(screen) {
  // Hide all screens
  document.getElementById("screen-home").style.display = "none";
  document.getElementById("calculator-section").style.display = "none";
  document.getElementById("care-timeline").style.display = "none";
  document.getElementById("screen-newborn").style.display = "none";
  document.getElementById("newborn-menu").style.display = "none";
  document.getElementById("tool-age-in-hours").style.display = "none";
  document.getElementById("tool-weight-loss").style.display = "none";
  document.getElementById("screen-prenatal-tools").style.display = "none";
  document.getElementById("prenatal-tools-menu").style.display = "none";
  document.getElementById("tool-bmi").style.display = "none";

  // Hide clear button by default
  document.getElementById("clear-btn").style.display = "none";

  if (screen === "home") {
    document.getElementById("screen-home").style.display = "block";
  } else if (screen === "edd") {
    document.getElementById("calculator-section").style.display = "block";
    document.getElementById("clear-btn").style.display = "block";
  } else if (screen === "planner") {
    document.getElementById("calculator-section").style.display = "block";
    document.getElementById("care-timeline").style.display = "block";
    document.getElementById("clear-btn").style.display = "block";
  } else if (screen === "newborn") {
    document.getElementById("screen-newborn").style.display = "block";
    document.getElementById("newborn-menu").style.display = "block";
  } else if (screen === "age-in-hours") {
    document.getElementById("screen-newborn").style.display = "block";
    document.getElementById("tool-age-in-hours").style.display = "block";
  } else if (screen === "weight-loss") {
    document.getElementById("screen-newborn").style.display = "block";
    document.getElementById("tool-weight-loss").style.display = "block";
  } else if (screen === "prenatal-tools") {
    document.getElementById("screen-prenatal-tools").style.display = "block";
    document.getElementById("prenatal-tools-menu").style.display = "block";
  } else if (screen === "bmi") {
    document.getElementById("screen-prenatal-tools").style.display = "block";
    document.getElementById("tool-bmi").style.display = "block";
  }
}

// Show home screen on load
navigateTo("home");

// =====================
// SHARED STATE
// Stores EDDs from each method so they can be compared
// =====================
const calculatedEDDs = {
  lmp: null,
  ultrasound: null,
  art: null
};

// =====================
// PROVINCIAL SCHEDULES
// Test windows defined in weeks and days from LMP
// condition: null = everyone, "optional" = user selectable
// =====================

const SCHEDULES = {
  BC: [
    {
      name: "Dating Ultrasound",
      startWeek: 7,
      startDay: 0,
      endWeek: 13,
      endDay: 6,
      note: "Ideally before 13w6d for most accurate dating (SOGC)",
      condition: null
    },
    {
      name: "SIPS Part 1",
      startWeek: 9,
      startDay: 0,
      endWeek: 13,
      endDay: 6,
      note: "First trimester bloodwork — trisomies and NTDs",
      condition: null
    },
    {
      name: "SIPS Part 2",
      startWeek: 14,
      startDay: 0,
      endWeek: 20,
      endDay: 6,
      note: "Second trimester bloodwork",
      condition: null
    },
    {
      name: "NIPS",
      startWeek: 10,
      startDay: 0,
      endWeek: 20,
      endDay: 0,
      note: "Optional, out of pocket. More accurate trisomy screening.",
      condition: "optional"
    },
    {
      name: "Anatomy Ultrasound",
      startWeek: 18,
      startDay: 0,
      endWeek: 22,
      endDay: 0,
      note: "Later scans have increased chance of missed views",
      condition: null
    },
    {
      name: "Gestational Diabetes Screening",
      startWeek: 24,
      startDay: 0,
      endWeek: 28,
      endDay: 0,
      note: null,
      condition: null
    },
    {
      name: "WinRho Injection",
      startWeek: 28,
      startDay: 0,
      endWeek: 32,
      endDay: 0,
      note: "Rh negative patients only — confirm blood type",
      condition: null
    },
    {
      name: "dTap and RSV Immunization",
      startWeek: 27,
      startDay: 0,
      endWeek: 32,
      endDay: 0,
      note: null,
      condition: null
    },
    {
      name: "GBS Swab",
      startWeek: 35,
      startDay: 0,
      endWeek: 37,
      endDay: 0,
      note: null,
      condition: null
    }
  ],
  AB: [
    {
      name: "Dating Ultrasound",
      startWeek: 7,
      startDay: 0,
      endWeek: 13,
      endDay: 6,
      note: "Ideally before 13w6d for most accurate dating (SOGC)",
      condition: null
    },
    {
      name: "First Trimester Screen — Bloodwork",
      startWeek: 11,
      startDay: 0,
      endWeek: 13,
      endDay: 6,
      note: "First trimester bloodwork — trisomies and NTDs",
      condition: null
    },
    {
      name: "First Trimester Screen — NT Ultrasound",
      startWeek: 11,
      startDay: 0,
      endWeek: 13,
      endDay: 6,
      note: "Can double as dating scan if client prefers to avoid two first trimester ultrasounds",
      condition: null
    },
    {
      name: "Quad Screen",
      startWeek: 15,
      startDay: 0,
      endWeek: 20,
      endDay: 6,
      note: "Second trimester serum screening",
      condition: null
    },
    {
      name: "NIPS",
      startWeek: 10,
      startDay: 0,
      endWeek: 20,
      endDay: 0,
      note: "Optional, out of pocket. More accurate trisomy screening.",
      condition: "optional"
    },
    {
      name: "Anatomy Ultrasound",
      startWeek: 18,
      startDay: 0,
      endWeek: 22,
      endDay: 0,
      note: "Later scans have increased chance of missed views",
      condition: null
    },
    {
      name: "Gestational Diabetes Screening",
      startWeek: 24,
      startDay: 0,
      endWeek: 28,
      endDay: 0,
      note: null,
      condition: null
    },
    {
      name: "WinRho Injection",
      startWeek: 28,
      startDay: 0,
      endWeek: 32,
      endDay: 0,
      note: "Rh negative patients only — confirm blood type",
      condition: null
    },
    {
      name: "dTap and RSV Immunization",
      startWeek: 27,
      startDay: 0,
      endWeek: 32,
      endDay: 0,
      note: null,
      condition: null
    },
    {
      name: "GBS Swab",
      startWeek: 35,
      startDay: 0,
      endWeek: 37,
      endDay: 0,
      note: null,
      condition: null
    }
  ],
  ON: [
    {
      name: "Dating Ultrasound",
      startWeek: 7,
      startDay: 0,
      endWeek: 13,
      endDay: 6,
      note: "Ideally before 13w6d for most accurate dating (SOGC)",
      condition: null
    },
    {
      name: "eFTS Part 1 — MMS Bloodwork",
      startWeek: 11,
      startDay: 2,
      endWeek: 13,
      endDay: 3,
      note: "First trimester bloodwork — trisomies and NTDs",
      condition: null
    },
    {
      name: "eFTS Part 2 — NT Ultrasound",
      startWeek: 11,
      startDay: 0,
      endWeek: 14,
      endDay: 0,
      note: "Can double as dating scan if client prefers to avoid two first trimester ultrasounds",
      condition: null
    },
    {
      name: "Quad Screen",
      startWeek: 15,
      startDay: 0,
      endWeek: 20,
      endDay: 6,
      note: "Second trimester serum screening",
      condition: null
    },
    {
      name: "NIPS",
      startWeek: 10,
      startDay: 0,
      endWeek: 20,
      endDay: 0,
      note: "Optional, out of pocket. More accurate trisomy screening.",
      condition: "optional"
    },
    {
      name: "Anatomy Ultrasound",
      startWeek: 18,
      startDay: 0,
      endWeek: 22,
      endDay: 0,
      note: "Later scans have increased chance of missed views",
      condition: null
    },
    {
      name: "Gestational Diabetes Screening",
      startWeek: 24,
      startDay: 0,
      endWeek: 28,
      endDay: 0,
      note: null,
      condition: null
    },
    {
      name: "WinRho Injection",
      startWeek: 28,
      startDay: 0,
      endWeek: 32,
      endDay: 0,
      note: "Rh negative patients only — confirm blood type",
      condition: null
    },
    {
      name: "dTap and RSV Immunization",
      startWeek: 27,
      startDay: 0,
      endWeek: 32,
      endDay: 0,
      note: null,
      condition: null
    },
    {
      name: "GBS Swab",
      startWeek: 35,
      startDay: 0,
      endWeek: 37,
      endDay: 0,
      note: null,
      condition: null
    }
  ]
};

// =====================
// HELPER FUNCTIONS
// Small reusable tools that the main functions will use
// =====================

// Calculates gestational age in weeks and days between two dates
// Returns an object with weeks and days as separate numbers
function getGestationalAge(lmpDate, today) {
  // Total difference in milliseconds, converted to days
  const totalDays = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days };
}

// Formats a date object into a readable string like "January 1, 2025"
function formatDate(date) {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
//Shows the current gestational age once the user has selected which calculation method to use
function updateGADisplay() {
  const lmp = new Date(workingEDD.getTime() - 280 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const ga = getGestationalAge(lmp, today);
  document.getElementById("timeline-ga-display").textContent = `GA today: ${ga.weeks}w${ga.days}d`;
}

function updateEditButton() {
  const editBtn = document.querySelector(".timeline-edd-row .use-edd-btn");
  const label = document.getElementById("working-edd-label");
  if (editBtn) {
    editBtn.style.display = workingEDD ? "block" : "none";
  }
  if (label) {
    label.style.display = workingEDD ? "block" : "none";
  }
}

// =====================
// PROVINCE SELECTOR
// Saves and restores province preference using localStorage
// =====================

function saveProvince() {
  const province = document.getElementById("province-selector").value;
  localStorage.setItem("rm-tools-province", province);
}

function loadProvince() {
  const saved = localStorage.getItem("rm-tools-province");
  if (saved) {
    document.getElementById("province-selector").value = saved;
  }
}

// Load province when page opens
loadProvince();

// =====================
// SHOW/HIDE CARDS
// Reveals the correct input card based on dropdown selection
// Hides all other cards first, then shows the selected one
// =====================

function showDateCard(method) {
  // Hide all cards
  document.getElementById("card-lmp").style.display = "none";
  document.getElementById("card-ultrasound").style.display = "none";
  document.getElementById("card-art").style.display = "none";

  // Remove active class from all buttons
  document.getElementById("btn-lmp").classList.remove("active");
  document.getElementById("btn-us").classList.remove("active");
  document.getElementById("btn-art").classList.remove("active");

  // Show selected card and activate button
  if (method === "lmp") {
    document.getElementById("card-lmp").style.display = "block";
    document.getElementById("btn-lmp").classList.add("active");
  } else if (method === "us") {
    document.getElementById("card-ultrasound").style.display = "block";
    document.getElementById("btn-us").classList.add("active");
  } else if (method === "art") {
    document.getElementById("card-art").style.display = "block";
    document.getElementById("btn-art").classList.add("active");
  }
}

// =====================
// CHECK DISCREPANCIES
// Compares EDDs from different methods and flags significant differences
// Called after every calculation
// Thresholds: T1 > 7 days, T2 > 10 days, T3 blanket warning
// LMP vs ART never compared - clinically meaningless
// =====================

function checkDiscrepancies() {
  const flagContainer = document.getElementById("discrepancy-flag");
  flagContainer.innerHTML = "";

  // Need at least two comparable EDDs to check
  // Valid comparisons: LMP vs US, ART vs US
  const hasLMPandUS = calculatedEDDs.lmp && calculatedEDDs.ultrasound;
  const hasARTandUS = calculatedEDDs.art && calculatedEDDs.ultrasound;

  if (!hasLMPandUS && !hasARTandUS) return;

  // Determine trimester from US GA if available, otherwise LMP
  // US is most reliable for trimester determination
  const referenceEDD = calculatedEDDs.ultrasound || calculatedEDDs.lmp;
  const correctedLMP = new Date(referenceEDD.getTime() - 280 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const ga = getGestationalAge(correctedLMP, today);
  const totalWeeks = ga.weeks;

  // T3 blanket warning - dating unreliable regardless of discrepancy
  if (totalWeeks >= 28) {
    flagContainer.innerHTML = `
            <div class="flag">
                ⚠ Third trimester dating is not reliable for establishing EDD.
                Exercise clinical judgement.
            </div>
            `;
    return;
  }

  // Set threshold based on trimester
  const threshold = totalWeeks < 14 ? 7 : 10;
  const trimester = totalWeeks < 14 ? "first" : "second";

  // Check each valid comparison
  let discrepancyFound = false;

  if (hasLMPandUS) {
    const diffMs = Math.abs(calculatedEDDs.lmp.getTime() - calculatedEDDs.ultrasound.getTime());
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > threshold) {
      discrepancyFound = true;
    }
  }

  if (hasARTandUS) {
    const diffMs = Math.abs(calculatedEDDs.art.getTime() - calculatedEDDs.ultrasound.getTime());
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > threshold) {
      discrepancyFound = true;
    }
  }

  // Show flag if discrepancy found
  if (discrepancyFound) {
    flagContainer.innerHTML = `
            <div class="flag">
                ⚠ Date discrepancy detected in the ${trimester} trimester
                (threshold: ${threshold} days). Review and use clinical judgement.
            </div>
            `;
  }
}
// =====================
// CLEAR ALL
// Resets entire app to fresh state for new patient
// One tap, no confirmation - designed for quick chairside use
// =====================

function clearAll() {
  // Reset shared state
  calculatedEDDs.lmp = null;
  calculatedEDDs.ultrasound = null;
  calculatedEDDs.art = null;

  // Clear all input fields
  document.getElementById("lmp-date").value = "";
  document.getElementById("us-date").value = "";
  document.getElementById("us-weeks").value = "";
  document.getElementById("us-days").value = "";
  document.getElementById("art-date").value = "";

  // Clear all result containers
  document.getElementById("lmp-result").innerHTML = "";
  document.getElementById("us-result").innerHTML = "";
  document.getElementById("art-result").innerHTML = "";

  // Hide all cards
  document.getElementById("card-lmp").style.display = "none";
  document.getElementById("card-ultrasound").style.display = "none";
  document.getElementById("card-art").style.display = "none";

  // Reset all segment buttons to inactive
  document.getElementById("btn-lmp").classList.remove("active");
  document.getElementById("btn-us").classList.remove("active");
  document.getElementById("btn-art").classList.remove("active");

  // Clear persistent results section
  document.getElementById("results-lmp").innerHTML = "";
  document.getElementById("results-us").innerHTML = "";
  document.getElementById("results-art").innerHTML = "";
  document.getElementById("discrepancy-flag").innerHTML = "";

  // Reset care timeline
  workingEDD = null;
  workingEDDSource = null;
  updateEditButton();
  includeNIPS = false;
  document.getElementById("nips-checkbox").checked = false;
  document.getElementById("manual-edd").value = "";
  document.getElementById("timeline-edd-display").textContent = "";
  document.getElementById("timeline-edd-source").textContent = "";
  document.getElementById("schedule-output").innerHTML = "";
  document.getElementById("care-timeline").style.display = "none";
  document.getElementById("share-row").style.display = "none";
  document.getElementById("timeline-ga-display").textContent = "";

  // Reopen calculator
  document.getElementById("calculator-section").style.display = "block";
  // Hide results section until next calculation
  document.getElementById("results-section").style.display = "none";
  navigateTo("home");
}

function clearAgeCalculator() {
  document.getElementById("dob-date").value = "";
  document.getElementById("dob-time").value = "";
  document.getElementById("age-result").innerHTML = "";
}

// =====================
// LMP CALCULATION
// Formula: LMP + 280 days = EDD
// =====================

function calculateLMP() {
  // Grab the value from the input field using its id
  const input = document.getElementById("lmp-date").value;

  // Check if the user actually entered a date
  if (!input) {
    document.getElementById("lmp-result").innerHTML = `
                <div class="flag">⚠ Please enter an LMP date.</div>
            `;
    return;
  }

  // Parse the input into a JavaScript date object
  // We add T12:00:00 to avoid timezone issues that can shift the date by one day
  const lmp = new Date(input + "T12:00:00");

  // Calculate EDD by adding 280 days in milliseconds
  const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);

  // Calculate gestational age as of today
  const today = new Date();
  const ga = getGestationalAge(lmp, today);

  // Write the result into the result container
  document.getElementById("lmp-result").innerHTML = `
            <div class="result">
                <p>Estimated Due Date</p>
                <p class="edd">${formatDate(edd)}</p>
                <p class="ga">GA today: ${ga.weeks}w${ga.days}d</p>
            </div>
        `;

  // Write to persistent results section
  calculatedEDDs.lmp = edd;
  document.getElementById("results-lmp").innerHTML = `
            <div class="result-row">
                <span class="method">EDD by LMP</span>
                <span class="edd-date">${formatDate(edd)}</span>
                <span class="ga-today">${ga.weeks}w${ga.days}d</span>
                <button class="use-edd-btn" onclick="useEDD('${edd.toISOString()}', 'LMP')">Use</button>
            </div>
    `;

  // Show results section
  document.getElementById("results-section").style.display = "block";

  // Check for discrepancies
  checkDiscrepancies();
}

// =====================
// ULTRASOUND CALCULATION
// Formula: scan date + (280 - GA in days at scan) = EDD
// =====================

function calculateUS() {
  // Grab all three inputs
  const usDateInput = document.getElementById("us-date").value;
  const weeksInput = document.getElementById("us-weeks").value;
  const daysInput = document.getElementById("us-days").value;

  // Check that all fields are filled
  if (!usDateInput || weeksInput === "" || daysInput === "") {
    document.getElementById("us-result").innerHTML = `
                <div class="flag">⚠ Please enter the ultrasound date and gestational age.</div>
            `;
    return;
  }

  // Parse the scan date
  const scanDate = new Date(usDateInput + "T12:00:00");

  // Convert GA at scan to total days - exactly your mental math
  const gaAtScanDays = parseInt(weeksInput) * 7 + parseInt(daysInput);

  // Days remaining until EDD from scan date
  const daysRemaining = 280 - gaAtScanDays;

  // Calculate EDD - scan date + remaining days
  const edd = new Date(scanDate.getTime() + daysRemaining * 24 * 60 * 60 * 1000);

  // Calculate GA today
  // We need the "corrected LMP" - work backwards from scan date
  const correctedLMP = new Date(scanDate.getTime() - gaAtScanDays * 24 * 60 * 60 * 1000);
  const today = new Date();
  const ga = getGestationalAge(correctedLMP, today);

  // Write results
  document.getElementById("us-result").innerHTML = `
            <div class="result">
                <p>Estimated Due Date</p>
                <p class="edd">${formatDate(edd)}</p>
                <p class="ga">GA today: ${ga.weeks}w${ga.days}d</p>
            </div>
        `;

  // Write to persistent results section
  calculatedEDDs.ultrasound = edd;
  document.getElementById("results-us").innerHTML = `
            <div class="result-row">
                <span class="method">EDD by US</span>
                <span class="edd-date">${formatDate(edd)}</span>
                <span class="ga-today">${ga.weeks}w${ga.days}d</span>
                <button class="use-edd-btn" onclick="useEDD('${edd.toISOString()}', 'Ultrasound')">Use</button>
            </div>
        `;

  // Show results section
  document.getElementById("results-section").style.display = "block";

  // Check for discrepancies
  checkDiscrepancies();
}

// =====================
// ART Calculation
// Formula: transfer date + (266 - embryo age in days) = EDD
// =====================

function calculateART() {
  // Grab the Embryo Age Input
  const embryoAgeInput = document.getElementById("art-type").value;
  const transferDateInput = document.getElementById("art-date").value;

  // Check that all fields are filled
  if (!transferDateInput) {
    document.getElementById("art-result").innerHTML = `
                <div class="flag">⚠ Please select the embryo age and date of transfer.</div>
            `;
    return;
  }

  // Parse the Transfer Date
  const transferDate = new Date(transferDateInput + "T12:00:00");

  // Set the Embryo Type based on the selection of the user
  let daysToAdd;
  if (embryoAgeInput === "5") {
    daysToAdd = 261;
  } else {
    daysToAdd = 263;
  }

  // Calculate the EDD based on scanDate plus days to add

  const edd = new Date(transferDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  // calculate the current gestation

  const correctedLMP = new Date(edd.getTime() - 280 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const ga = getGestationalAge(correctedLMP, today);

  // Write results
  document.getElementById("art-result").innerHTML = `
            <div class="result">
                <p>Estimated Due Date</p>
                <p class="edd">${formatDate(edd)}</p>
                <p class="ga">GA today: ${ga.weeks}w${ga.days}d</p>
            </div>
        `;

  // Write to persistent results section
  calculatedEDDs.art = edd;
  document.getElementById("results-art").innerHTML = `
            <div class="result-row">
                <span class="method">EDD by ART</span>
                <span class="edd-date">${formatDate(edd)}</span>
                <span class="ga-today">${ga.weeks}w${ga.days}d</span>
                <button class="use-edd-btn" onclick="useEDD('${edd.toISOString()}', 'ART')">Use</button>
            </div>
        `;

  // Show results section
  document.getElementById("results-section").style.display = "block";

  // Check for discrepancies
  checkDiscrepancies();
}

// =====================
// CARE TIMELINE STATE
// =====================
let workingEDD = null;
let workingEDDSource = null;
let includeNIPS = false;

// =====================
// USE EDD
// Called when user taps Use button on a result row
// Populates care timeline and scrolls to it
// =====================
function useEDD(isoString, source) {
  workingEDD = new Date(isoString);
  workingEDDSource = source;
  updateEditButton();

  // Collapse calculator
  document.getElementById("calculator-section").style.display = "none";

  // Show and populate care timeline
  const timeline = document.getElementById("care-timeline");
  timeline.style.display = "block";

  document.getElementById("timeline-edd-display").textContent = formatDate(workingEDD);
  document.getElementById("timeline-edd-source").textContent = `From ${source}`;

  // Generate schedule
  generateSchedule();

  // display current gestational age even after calculator collapses
  updateGADisplay();

  // Scroll to timeline
  timeline.scrollIntoView({ behavior: "smooth" });
}

// =====================
// MANUAL EDD ENTRY
// =====================
function useManualEDD() {
  const input = document.getElementById("manual-edd").value;
  if (!input) return;

  workingEDD = new Date(input + "T12:00:00");
  workingEDDSource = "Manual entry";
  updateEditButton();

  document.getElementById("timeline-edd-display").textContent = formatDate(workingEDD);
  document.getElementById("timeline-edd-source").textContent = "Manually entered";

  generateSchedule();
  updateGADisplay();
}

// =====================
// OPEN CALCULATOR
// Reopens calculator from Edit button
// =====================
function openCalculator() {
  document.getElementById("calculator-section").style.display = "block";
  document.getElementById("calculator-section").scrollIntoView({ behavior: "smooth" });
}

// =====================
// NIPS TOGGLE
// =====================
function toggleNIPS() {
  includeNIPS = document.getElementById("nips-checkbox").checked;
  generateSchedule();
}

// =====================
// GENERATE SCHEDULE
// Takes working EDD, province, and NIPS preference
// Outputs a full care timeline with actual calendar dates
// =====================

function generateSchedule() {
  const output = document.getElementById("schedule-output");

  // Check we have everything we need
  if (!workingEDD) {
    output.innerHTML = "";
    return;
  }

  const province = document.getElementById("province-selector").value;
  if (!province) {
    output.innerHTML = `
                <div class="flag">⚠ Please select a province to generate a schedule.</div>
            `;
    return;
  }

  // Get the schedule for the selected province
  const schedule = SCHEDULES[province];

  // Calculate LMP from EDD
  const lmp = new Date(workingEDD.getTime() - 280 * 24 * 60 * 60 * 1000);

  // Helper to calculate a date from LMP + weeks and days
  function getDate(weeks, days) {
    const totalDays = weeks * 7 + days;
    return new Date(lmp.getTime() + totalDays * 24 * 60 * 60 * 1000);
  }

  // Build the schedule HTML
  let scheduleHTML = '<div class="schedule-list">';

  schedule.forEach((test) => {
    // Skip NIPS if not included
    if (test.condition === "optional" && !includeNIPS) return;

    // Calculate start and end dates
    const startDate = getDate(test.startWeek, test.startDay);
    const endDate = test.endWeek !== null ? getDate(test.endWeek, test.endDay) : null;

    // Format the gestational age window
    const gaWindow =
      test.endWeek !== null
        ? `${test.startWeek}w${test.startDay}d – ${test.endWeek}w${test.endDay}d`
        : `After ${test.startWeek}w${test.startDay}d`;

    // Format the date window
    const dateWindow = endDate ? `${formatDate(startDate)} – ${formatDate(endDate)}` : `After ${formatDate(startDate)}`;

    scheduleHTML += `
                <div class="schedule-item">
                    <div class="schedule-name">${test.name}</div>
                    <div class="schedule-dates">${dateWindow}</div>
                    <div class="schedule-ga">${gaWindow}</div>
                    ${test.note ? `<div class="schedule-note">${test.note}</div>` : ""}
                </div>
            `;
  });

  scheduleHTML += "</div>";
  output.innerHTML = scheduleHTML;
  document.getElementById("share-row").style.display = "flex";
}

// =====================
// SHARE / COPY
// Generates plain text version of the schedule
// Copy for desktop/charting, Share for mobile handoff
// =====================

function buildShareText() {
  const edd = document.getElementById("timeline-edd-display").textContent;
  const source = document.getElementById("timeline-edd-source").textContent;
  const ga = document.getElementById("timeline-ga-display").textContent;
  const province = document.getElementById("province-selector").value;

  let text = `RM Tools — Prenatal Care Timeline\n`;
  text += `Province: ${province}\n`;
  text += `EDD: ${edd} (${source})\n`;
  text += `${ga}\n\n`;

  // Get schedule items
  const items = document.querySelectorAll(".schedule-item");
  items.forEach((item) => {
    const name = item.querySelector(".schedule-name").textContent;
    const dates = item.querySelector(".schedule-dates").textContent;
    const ga = item.querySelector(".schedule-ga").textContent;
    const note = item.querySelector(".schedule-note");

    text += `${name}\n`;
    text += `${dates} (${ga})\n`;
    if (note) text += `Note: ${note.textContent}\n`;
    text += `\n`;
  });

  return text;
}

function copyTimeline() {
  const text = buildShareText();
  navigator.clipboard.writeText(text).then(() => {
    // Briefly change button text to confirm
    const btn = document.querySelector(".share-btn");
    btn.textContent = "Copied! ✓";
    setTimeout(() => {
      btn.textContent = "Copy to Clipboard";
    }, 2000);
  });
}

function shareTimeline() {
  const text = buildShareText();

  // Use native share sheet if available (mobile)
  if (navigator.share) {
    navigator.share({
      title: "Prenatal Care Timeline",
      text: text
    });
  } else {
    // Fall back to copy on desktop
    navigator.clipboard.writeText(text).then(() => {
      const btns = document.querySelectorAll(".share-btn");
      btns[1].textContent = "Copied! ✓";
      setTimeout(() => {
        btns[1].textContent = "Share";
      }, 2000);
    });
  }
}

// =====================
// AGE IN HOURS CALCULATOR
// Calculates newborn age in hours and minutes from birth datetime
// Used for plotting bilirubin on the nomogram
// Always floors to whole hours for plot point - never rounds up
// =====================

function calculateAgeInHours() {
  const dobDate = document.getElementById("dob-date").value;
  const dobTime = document.getElementById("dob-time").value;

  // Validate inputs
  if (!dobDate || !dobTime) {
    document.getElementById("age-result").innerHTML = `
        <div class="flag">⚠ Please enter both date and time of birth.</div>
    `;
    return;
  }

  // Combine date and time into a single datetime
  const birthDateTime = new Date(`${dobDate}T${dobTime}:00`);
  const now = new Date();

  // Check birth time isn't in the future
  if (birthDateTime > now) {
    document.getElementById("age-result").innerHTML = `
        <div class="flag">⚠ Date and time of birth cannot be in the future.</div>
    `;
    return;
  }

  // Calculate difference in milliseconds
  const diffMs = now - birthDateTime;

  // Convert to hours and minutes
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Plot at is always floored to whole hours
  const plotAt = hours;

  // Grab raw 24hr time value directly from input
  const [birthHours, birthMinutes] = dobTime.split(":");

  document.getElementById("age-result").innerHTML = `
    <div class="result">
    <p>Born: ${birthHours}:${birthMinutes}</p>
    <p>Age</p>
    <p class="edd">${hours}h ${minutes}m</p>
    <p class="ga">Plot at: ${plotAt} hours</p>
    </div>
    `;
}

function openHyperbili() {
  window.open("https://hyperbili.com", "_blank");
}

// =====================
// NEWBORN WEIGHT LOSS CALCULATOR
// Calculates percentage weight loss from birth weight
// Flags >7% (monitor) and >10% (significant)
// Displays result in both grams and lbs/oz
// =====================

let weightUnit = "lbs";

function selectWeightUnit(unit) {
  weightUnit = unit;

  // Update segmented control
  document.getElementById("btn-grams").classList.toggle("active", unit === "grams");
  document.getElementById("btn-lbs").classList.toggle("active", unit === "lbs");

  // Show/hide correct inputs
  document.getElementById("weight-input-grams").style.display = unit === "grams" ? "block" : "none";
  document.getElementById("weight-input-lbs").style.display = unit === "lbs" ? "block" : "none";

  // Clear result
  document.getElementById("weight-loss-result").innerHTML = "";
}

// Convert grams to lbs and oz
function gramsToLbsOz(grams) {
  const totalOz = grams / 28.3495;
  const lbs = Math.floor(totalOz / 16);
  const oz = Math.round((totalOz % 16) * 10) / 10;
  return { lbs, oz };
}

// Convert lbs/oz to grams
function lbsOzToGrams(lbs, oz) {
  return lbs * 453.592 + oz * 28.3495;
}

function calculateWeightLoss() {
  let birthGrams, currentGrams;

  if (weightUnit === "grams") {
    birthGrams = parseFloat(document.getElementById("birth-weight-g").value);
    currentGrams = parseFloat(document.getElementById("current-weight-g").value);

    if (!birthGrams || !currentGrams) {
      document.getElementById("weight-loss-result").innerHTML = `
                <div class="flag">⚠ Please enter both birth and current weight.</div>
            `;
      return;
    }
  } else {
    const birthLbs = parseFloat(document.getElementById("birth-weight-lbs").value) || 0;
    const birthOz = parseFloat(document.getElementById("birth-weight-oz").value) || 0;
    const currentLbs = parseFloat(document.getElementById("current-weight-lbs").value) || 0;
    const currentOz = parseFloat(document.getElementById("current-weight-oz").value) || 0;

    if ((!birthLbs && !birthOz) || (!currentLbs && !currentOz)) {
      document.getElementById("weight-loss-result").innerHTML = `
                <div class="flag">⚠ Please enter both birth and current weight.</div>
            `;
      return;
    }

    birthGrams = lbsOzToGrams(birthLbs, birthOz);
    currentGrams = lbsOzToGrams(currentLbs, currentOz);
  }

  // Check current weight isn't higher than birth weight
  if (currentGrams > birthGrams) {
    document.getElementById("weight-loss-result").innerHTML = `
            <div class="flag">⚠ Current weight is higher than birth weight — please check values.</div>
        `;
    return;
  }

  // Calculate loss
  const lossGrams = birthGrams - currentGrams;
  const lossPercent = (lossGrams / birthGrams) * 100;
  const lossPercentRounded = Math.round(lossPercent * 10) / 10;

  // Convert for display
  const birthLbsOz = gramsToLbsOz(birthGrams);
  const currentLbsOz = gramsToLbsOz(currentGrams);
  const lossLbsOz = gramsToLbsOz(lossGrams);
  const lossDisplay = lossLbsOz.lbs > 0 ? `${lossLbsOz.lbs}lb ${lossLbsOz.oz}oz` : `${lossLbsOz.oz}oz`;

  // Determine flag
  let flagHTML = "";
  if (lossPercent >= 10) {
    flagHTML = `<div class="flag">🚨 Weight loss >10% — significant, requires assessment.</div>`;
  } else if (lossPercent >= 7) {
    flagHTML = `<div class="flag">⚠ Weight loss 7–10% — monitor closely.</div>`;
  } else {
    flagHTML = `<div class="flag" style="border-color: #22c55e; color: #22c55e; background-color: rgba(34, 197, 94, 0.1);">✅ Weight loss <7% — within normal range.</div>`;
  }

  document.getElementById("weight-loss-result").innerHTML = `
        <div class="result">
            <p>Weight Loss</p>
            <p class="edd">${lossPercentRounded}%</p>
            <p class="ga">${Math.round(lossGrams)}g &nbsp;|&nbsp; ${lossDisplay}</p>
            <br>
            <p class="ga">Birth: ${Math.round(birthGrams)}g &nbsp;|&nbsp; ${birthLbsOz.lbs}lb ${birthLbsOz.oz}oz</p>
            <p class="ga">Current: ${Math.round(currentGrams)}g &nbsp;|&nbsp; ${currentLbsOz.lbs}lb ${currentLbsOz.oz}oz</p>
        </div>
        ${flagHTML}
    `;
}

function clearWeightLoss() {
  document.getElementById("birth-weight-g").value = "";
  document.getElementById("current-weight-g").value = "";
  document.getElementById("birth-weight-lbs").value = "";
  document.getElementById("birth-weight-oz").value = "";
  document.getElementById("current-weight-lbs").value = "";
  document.getElementById("current-weight-oz").value = "";
  document.getElementById("weight-loss-result").innerHTML = "";
}

// =====================
// BMI & UNIT CONVERTER
// Defaults to imperial (lbs/ft/in)
// Converts to metric for display and BMI calculation
// WHO categories displayed, interpretation left to clinician
// =====================

let bmiUnit = "imperial";

function selectBMIUnit(unit) {
  bmiUnit = unit;

  // Update segmented control
  document.getElementById("btn-imperial").classList.toggle("active", unit === "imperial");
  document.getElementById("btn-metric").classList.toggle("active", unit === "metric");

  // Show/hide correct inputs
  document.getElementById("bmi-input-imperial").style.display = unit === "imperial" ? "block" : "none";
  document.getElementById("bmi-input-metric").style.display = unit === "metric" ? "block" : "none";

  // Clear result
  document.getElementById("bmi-result").innerHTML = "";
}

function calculateBMI() {
  let heightCm, weightKg;

  if (bmiUnit === "imperial") {
    const ft = parseFloat(document.getElementById("height-ft").value) || 0;
    const inches = parseFloat(document.getElementById("height-in").value) || 0;
    const lbs = parseFloat(document.getElementById("weight-lbs").value);

    if ((!ft && !inches) || !lbs) {
      document.getElementById("bmi-result").innerHTML = `
                <div class="flag">⚠ Please enter height and weight.</div>
            `;
      return;
    }

    // Convert to metric
    const totalInches = ft * 12 + inches;
    heightCm = totalInches * 2.54;
    weightKg = lbs * 0.453592;
  } else {
    heightCm = parseFloat(document.getElementById("height-cm").value);
    weightKg = parseFloat(document.getElementById("weight-kg").value);

    if (!heightCm || !weightKg) {
      document.getElementById("bmi-result").innerHTML = `
                <div class="flag">⚠ Please enter height and weight.</div>
            `;
      return;
    }
  }

  // Calculate BMI
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const bmiRounded = Math.round(bmi * 10) / 10;

  // WHO category
  let category;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  // Convert for display
  const weightLbs = Math.round(weightKg * 2.20462 * 10) / 10;
  const heightTotalInches = heightCm / 2.54;
  const heightFt = Math.floor(heightTotalInches / 12);
  const heightIn = Math.round((heightTotalInches % 12) * 10) / 10;
  const weightKgRounded = Math.round(weightKg * 10) / 10;
  const heightCmRounded = Math.round(heightCm * 10) / 10;

  document.getElementById("bmi-result").innerHTML = `
        <div class="result">
            <p>BMI</p>
            <p class="edd">${bmiRounded}</p>
            <p class="ga">${category}</p>
            <br>
            <p class="ga">Height: ${heightFt}ft ${heightIn}in &nbsp;|&nbsp; ${heightCmRounded}cm</p>
            <p class="ga">Weight: ${weightLbs}lbs &nbsp;|&nbsp; ${weightKgRounded}kg</p>
        </div>
    `;
}

function clearBMI() {
  document.getElementById("height-ft").value = "";
  document.getElementById("height-in").value = "";
  document.getElementById("weight-lbs").value = "";
  document.getElementById("height-cm").value = "";
  document.getElementById("weight-kg").value = "";
  document.getElementById("bmi-result").innerHTML = "";
}

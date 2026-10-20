window.StudySources = {
  "code": {
    "title": "The Highway Code — rules 103–158",
    "url": "https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158"
  },
  "road": {
    "title": "The Highway Code — rules 159–203",
    "url": "https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203"
  },
  "signs": {
    "title": "The Highway Code — traffic signs",
    "url": "https://www.gov.uk/guidance/the-highway-code/traffic-signs"
  },
  "speed": {
    "title": "GOV.UK — speed limits",
    "url": "https://www.gov.uk/speed-limits"
  },
  "stop": {
    "title": "The Highway Code — typical stopping distances",
    "url": "https://assets.publishing.service.gov.uk/media/65f97642aa9b760011fbda4e/the-highway-code-stopping-distances.pdf"
  },
  "policy": {
    "title": "Hastings taxi policy — current council-linked document",
    "url": "https://www.hastings.gov.uk/content/taxi/Hastings_Borough_Council_Taxi_Policy.pdf",
    "caveat": "This is the document currently linked by Hastings Borough Council. It is version 1.4, October 2024, with a June 2021 issue footer and a 30 May 2026 review date; no replacement was located. Confirm later amendments with Licensing before the December exam."
  },
  "drivers": {
    "title": "Hastings — driver licence requirements",
    "url": "https://www.hastings.gov.uk/licensing/taxi_privatehire/drivers/"
  },
  "child": {
    "title": "GOV.UK — reporting child abuse",
    "url": "https://www.gov.uk/report-child-abuse"
  },
  "spoa": {
    "title": "East Sussex — report a concern about a child",
    "url": "https://www.eastsussex.gov.uk/children-families/report-a-concern-child"
  },
  "adult": {
    "title": "East Sussex — report a concern about an adult",
    "url": "https://www.eastsussex.gov.uk/social-care/worried/report"
  },
  "maths": {
    "title": "Arithmetic checked independently; illustrative amounts, not a tariff",
    "url": null
  },
  "foi": {
    "title": "Hastings — knowledge-test question disclosure response (2018)",
    "url": "https://www.hastings.gov.uk/my-council/freedom-of-information/date/?id=FOI-79504593"
  }
};
window.StudyQuestions = [
  {
    "id": "signs-national",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "National speed limit applies",
    "choices": [
      "National speed limit applies",
      "Minimum speed of 60 mph",
      "No entry",
      "End of all traffic rules"
    ],
    "explanation": "Use the sign’s instruction; plates beneath signs may qualify it.",
    "source": "signs",
    "reference": "Signs giving orders",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-national.jpg",
    "alt": "White circular sign with a black diagonal stripe"
  },
  {
    "id": "signs-stop",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Stop and give way",
    "choices": [
      "Stop and give way",
      "Slow down only",
      "Give priority to yourself",
      "No waiting"
    ],
    "explanation": "Use the sign’s instruction; plates beneath signs may qualify it.",
    "source": "signs",
    "reference": "Signs giving orders",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-stop.jpg",
    "alt": "Red octagonal sign bearing STOP"
  },
  {
    "id": "signs-entry",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No entry for vehicular traffic",
    "choices": [
      "No entry for vehicular traffic",
      "No waiting",
      "No overtaking",
      "One-way traffic"
    ],
    "explanation": "Use the sign’s instruction; plates beneath signs may qualify it.",
    "source": "signs",
    "reference": "Signs giving orders",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-entry.jpg",
    "alt": "Red circular sign with a horizontal white bar"
  },
  {
    "id": "signs-left",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Keep left",
    "choices": [
      "Keep left",
      "Turn left at the next junction",
      "No left turn",
      "Pass on either side"
    ],
    "explanation": "Use the sign’s instruction; plates beneath signs may qualify it.",
    "source": "signs",
    "reference": "Signs giving orders",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-left.jpg",
    "alt": "Blue circular sign with an arrow pointing diagonally down-left"
  },
  {
    "id": "highway-speed-single",
    "subject": "highway",
    "prompt": "For an ordinary car taxi without a trailer, what is the usual limit on a single carriageway, unless signs show otherwise?",
    "correct": "60 mph",
    "choices": [
      "60 mph",
      "20 mph",
      "30 mph",
      "40 mph"
    ],
    "explanation": "Vehicle type, local signs and conditions matter. A limit is a maximum, not a target.",
    "source": "speed",
    "reference": "Cars, motorcycles and car-derived vans",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-speed-dual",
    "subject": "highway",
    "prompt": "For an ordinary car taxi without a trailer, what is the usual limit on a dual carriageway, unless signs show otherwise?",
    "correct": "70 mph",
    "choices": [
      "70 mph",
      "20 mph",
      "30 mph",
      "40 mph"
    ],
    "explanation": "Vehicle type, local signs and conditions matter. A limit is a maximum, not a target.",
    "source": "speed",
    "reference": "Cars, motorcycles and car-derived vans",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-speed-built",
    "subject": "highway",
    "prompt": "For an ordinary car taxi without a trailer, what is the usual limit on a road with street lights in a built-up area in England, unless signs show otherwise?",
    "correct": "30 mph",
    "choices": [
      "30 mph",
      "20 mph",
      "40 mph",
      "60 mph"
    ],
    "explanation": "Vehicle type, local signs and conditions matter. A limit is a maximum, not a target.",
    "source": "speed",
    "reference": "Cars, motorcycles and car-derived vans",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stopping-20",
    "subject": "highway",
    "prompt": "In the Highway Code’s typical-distance chart, what is the TOTAL stopping distance at 20 mph?",
    "correct": "12 metres",
    "choices": [
      "12 metres",
      "23 metres",
      "36 metres",
      "53 metres"
    ],
    "explanation": "Total stopping distance includes thinking and braking. Actual distances vary with attention, surface, weather and vehicle condition.",
    "source": "stop",
    "reference": "Rule 126 diagram",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stopping-30",
    "subject": "highway",
    "prompt": "In the Highway Code’s typical-distance chart, what is the TOTAL stopping distance at 30 mph?",
    "correct": "23 metres",
    "choices": [
      "23 metres",
      "12 metres",
      "36 metres",
      "53 metres"
    ],
    "explanation": "Total stopping distance includes thinking and braking. Actual distances vary with attention, surface, weather and vehicle condition.",
    "source": "stop",
    "reference": "Rule 126 diagram",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stopping-40",
    "subject": "highway",
    "prompt": "In the Highway Code’s typical-distance chart, what is the TOTAL stopping distance at 40 mph?",
    "correct": "36 metres",
    "choices": [
      "36 metres",
      "12 metres",
      "23 metres",
      "53 metres"
    ],
    "explanation": "Total stopping distance includes thinking and braking. Actual distances vary with attention, surface, weather and vehicle condition.",
    "source": "stop",
    "reference": "Rule 126 diagram",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stopping-50",
    "subject": "highway",
    "prompt": "In the Highway Code’s typical-distance chart, what is the TOTAL stopping distance at 50 mph?",
    "correct": "53 metres",
    "choices": [
      "53 metres",
      "12 metres",
      "23 metres",
      "36 metres"
    ],
    "explanation": "Total stopping distance includes thinking and braking. Actual distances vary with attention, surface, weather and vehicle condition.",
    "source": "stop",
    "reference": "Rule 126 diagram",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stopping-60",
    "subject": "highway",
    "prompt": "In the Highway Code’s typical-distance chart, what is the TOTAL stopping distance at 60 mph?",
    "correct": "73 metres",
    "choices": [
      "73 metres",
      "12 metres",
      "23 metres",
      "36 metres"
    ],
    "explanation": "Total stopping distance includes thinking and braking. Actual distances vary with attention, surface, weather and vehicle condition.",
    "source": "stop",
    "reference": "Rule 126 diagram",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stopping-70",
    "subject": "highway",
    "prompt": "In the Highway Code’s typical-distance chart, what is the TOTAL stopping distance at 70 mph?",
    "correct": "96 metres",
    "choices": [
      "96 metres",
      "12 metres",
      "23 metres",
      "36 metres"
    ],
    "explanation": "Total stopping distance includes thinking and braking. Actual distances vary with attention, surface, weather and vehicle condition.",
    "source": "stop",
    "reference": "Rule 126 diagram",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-gap",
    "subject": "highway",
    "prompt": "On a dry high-speed road, what minimum following gap does the Highway Code advise?",
    "correct": "At least 2 seconds",
    "choices": [
      "At least 2 seconds",
      "1 second",
      "Half a second",
      "Exactly 1 car length"
    ],
    "explanation": "Leave more space when conditions require it.",
    "source": "code",
    "reference": "Rule 126",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "highway.js: following distance"
  },
  {
    "id": "highway-wet",
    "subject": "highway",
    "prompt": "What should happen to the two-second gap on wet roads?",
    "correct": "At least double it",
    "choices": [
      "At least double it",
      "Halve it",
      "Keep it unchanged",
      "Add only half a second"
    ],
    "explanation": "Wet roads need at least twice the normal gap.",
    "source": "code",
    "reference": "Rule 126",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "highway.js: wet gap"
  },
  {
    "id": "highway-ice",
    "subject": "highway",
    "prompt": "On icy roads, how much greater may the following gap need to be?",
    "correct": "Up to ten times greater",
    "choices": [
      "Up to ten times greater",
      "Only twice as great",
      "Exactly three times greater",
      "No greater"
    ],
    "explanation": "Rule 126 describes a gap up to ten times greater; adapt to conditions.",
    "source": "code",
    "reference": "Rule 126",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "highway.js: icy gap"
  },
  {
    "id": "highway-hazard",
    "subject": "highway",
    "prompt": "A centre broken white line gets longer and its gaps get shorter. What does this warn of?",
    "correct": "A hazard ahead",
    "choices": [
      "A hazard ahead",
      "A compulsory stopping point",
      "A parking area",
      "A higher speed limit"
    ],
    "explanation": "The changed line pattern warns of a hazard.",
    "source": "code",
    "reference": "Rule 127",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stud-red",
    "subject": "highway",
    "prompt": "Red reflective road studs normally mark what?",
    "correct": "The left edge of the road",
    "choices": [
      "The left edge of the road",
      "The central reservation",
      "Lanes or the middle of the road",
      "Lay-bys and slip roads"
    ],
    "explanation": "Stud colours help identify road position at night.",
    "source": "code",
    "reference": "Rule 132",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stud-amber",
    "subject": "highway",
    "prompt": "Amber reflective road studs normally mark what?",
    "correct": "The central reservation",
    "choices": [
      "The central reservation",
      "The left edge of the road",
      "Lanes or the middle of the road",
      "Lay-bys and slip roads"
    ],
    "explanation": "Stud colours help identify road position at night.",
    "source": "code",
    "reference": "Rule 132",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-stud-white",
    "subject": "highway",
    "prompt": "White reflective road studs normally mark what?",
    "correct": "Lanes or the middle of the road",
    "choices": [
      "Lanes or the middle of the road",
      "The left edge of the road",
      "The central reservation",
      "Lay-bys and slip roads"
    ],
    "explanation": "Stud colours help identify road position at night.",
    "source": "code",
    "reference": "Rule 132",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-box",
    "subject": "highway",
    "prompt": "You are going straight ahead at a yellow box junction. When may you enter?",
    "correct": "When your exit road or lane is clear",
    "choices": [
      "When your exit road or lane is clear",
      "Whenever your signal is green",
      "When the vehicle behind sounds its horn",
      "As soon as the front wheels fit"
    ],
    "explanation": "Do not enter and block the box. The qualified right-turn exception does not apply to this straight-ahead question.",
    "source": "road",
    "reference": "Rule 174",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-pedestrian",
    "subject": "highway",
    "prompt": "When turning into a side road, what should you do for pedestrians waiting to cross it?",
    "correct": "Give way to them",
    "choices": [
      "Give way to them",
      "Sound your horn and turn",
      "Assume they must wait for you",
      "Accelerate to clear the junction first"
    ],
    "explanation": "Rule 170 says give way to pedestrians crossing or waiting to cross the road you are turning into or from.",
    "source": "road",
    "reference": "Rule 170",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-roundabout",
    "subject": "highway",
    "prompt": "At a roundabout, who normally has priority unless signs, markings or lights direct otherwise?",
    "correct": "Traffic approaching from your right",
    "choices": [
      "Traffic approaching from your right",
      "Traffic approaching from your left",
      "The largest vehicle",
      "The fastest vehicle"
    ],
    "explanation": "Look for road markings and traffic signals that change the usual priority.",
    "source": "road",
    "reference": "Rule 185",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-flash",
    "subject": "highway",
    "prompt": "Another driver flashes their headlights. What should you assume?",
    "correct": "Only that they are signalling their presence",
    "choices": [
      "Only that they are signalling their presence",
      "They have guaranteed it is safe to pull out",
      "They have given you legal priority",
      "All traffic has stopped"
    ],
    "explanation": "Use your own judgement; a flash is not an invitation to proceed.",
    "source": "code",
    "reference": "Rules 110–111",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-fog",
    "subject": "highway",
    "prompt": "Visibility improves after fog. What must you do with fog lights?",
    "correct": "Switch them off",
    "choices": [
      "Switch them off",
      "Keep them on until the next stop",
      "Use only the rear fog lights",
      "Leave them on all night"
    ],
    "explanation": "Fog lights can dazzle others when visibility is no longer seriously reduced.",
    "source": "code",
    "reference": "Rule 114",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-signal",
    "subject": "highway",
    "prompt": "Does signalling give you priority over other road users?",
    "correct": "No",
    "choices": [
      "No",
      "Yes, immediately",
      "Yes, after three flashes",
      "Yes, if you are driving a taxi"
    ],
    "explanation": "A signal communicates intention; it does not confer priority.",
    "source": "code",
    "reference": "Rule 103",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-duality",
    "subject": "highway",
    "prompt": "What makes a road a dual carriageway?",
    "correct": "A central reservation separating carriageways",
    "choices": [
      "A central reservation separating carriageways",
      "Two lanes painted in one direction",
      "A 60 mph limit",
      "A hard shoulder"
    ],
    "explanation": "A central reservation, rather than the number of lanes, is the defining feature.",
    "source": "code",
    "reference": "Rule 136",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-lane",
    "subject": "highway",
    "prompt": "After overtaking on a two-lane dual carriageway, what should you do when safe?",
    "correct": "Return to the left-hand lane",
    "choices": [
      "Return to the left-hand lane",
      "Stay in the right lane until your exit",
      "Drive over the lane divider",
      "Use the hard shoulder"
    ],
    "explanation": "Use the right lane for overtaking or turning right; move back left safely after overtaking.",
    "source": "code",
    "reference": "Rule 137",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "highway-limit",
    "subject": "highway",
    "prompt": "Does the speed limit guarantee that speed is safe in poor conditions?",
    "correct": "No; slow down as conditions require",
    "choices": [
      "No; slow down as conditions require",
      "Yes, if the road is straight",
      "Yes, in a licensed taxi",
      "Yes, if no lower sign is present"
    ],
    "explanation": "The limit is an absolute maximum, not a safe speed in all conditions.",
    "source": "code",
    "reference": "Rule 125",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "highway.js: safe speed"
  },
  {
    "id": "licensing-badge",
    "subject": "licensing",
    "prompt": "While operating, where should your council driver badge be?",
    "correct": "Worn where plainly visible",
    "choices": [
      "Worn where plainly visible",
      "In the glovebox",
      "Hidden under clothing",
      "Only available on your phone"
    ],
    "explanation": "Display your badge visibly while operating.",
    "source": "policy",
    "reference": "Appendix D 2.1, p47",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: badge"
  },
  {
    "id": "licensing-lost",
    "subject": "licensing",
    "prompt": "What should you do about a lost, stolen or damaged badge?",
    "correct": "Report it immediately",
    "choices": [
      "Report it immediately",
      "Wait until renewal",
      "Wait seven days",
      "Borrow a colleague’s badge"
    ],
    "explanation": "The policy requires immediate reporting.",
    "source": "policy",
    "reference": "Appendix D 2.2, p47",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: lost badge"
  },
  {
    "id": "licensing-lend",
    "subject": "licensing",
    "prompt": "May another person wear your council driver badge?",
    "correct": "No",
    "choices": [
      "No",
      "Yes, if they are a licensed driver",
      "Yes, if your operator agrees",
      "Yes, for a single shift"
    ],
    "explanation": "The badge is personal and cannot be lent.",
    "source": "policy",
    "reference": "Appendix D 2.4, p47",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: lending badge"
  },
  {
    "id": "licensing-return",
    "subject": "licensing",
    "prompt": "Following suspension, within how long must council licences, badges and plates be returned if requested?",
    "correct": "7 days",
    "choices": [
      "7 days",
      "14 days",
      "21 days",
      "28 days"
    ],
    "explanation": "The same return condition also covers revocation and expiry without renewal.",
    "source": "policy",
    "reference": "Appendix D 2.5, p47",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: return documents"
  },
  {
    "id": "licensing-rank",
    "subject": "licensing",
    "prompt": "May a private hire vehicle stand on a hackney rank suggesting it is available for immediate hire?",
    "correct": "No",
    "choices": [
      "No",
      "Yes, for ten minutes",
      "Yes, with hazard lights on",
      "Yes, while empty"
    ],
    "explanation": "Private hire must not appear to ply for hire in this way.",
    "source": "policy",
    "reference": "Appendix D 3.4, p47",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: private hire rank"
  },
  {
    "id": "licensing-horn",
    "subject": "licensing",
    "prompt": "May you use the horn simply to announce that the taxi has arrived?",
    "correct": "No",
    "choices": [
      "No",
      "Yes, during daylight",
      "Yes, once per booking",
      "Yes, if the passenger asked"
    ],
    "explanation": "This is prohibited by the driver conditions.",
    "source": "policy",
    "reference": "Appendix D 3.7, p48",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: arrival horn"
  },
  {
    "id": "licensing-driver-accident",
    "subject": "licensing",
    "prompt": "After damage affecting safety or appearance, when must the DRIVER tell the operator/proprietor?",
    "correct": "Immediately, or as soon as practicable",
    "choices": [
      "Immediately, or as soon as practicable",
      "Only at the end of the week",
      "After the next MOT",
      "Only if a passenger complains"
    ],
    "explanation": "The driver reports promptly so the proprietor can meet the council deadline.",
    "source": "policy",
    "reference": "Appendix D 3.9, p48",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: accident question clarified by role"
  },
  {
    "id": "licensing-owner-accident",
    "subject": "licensing",
    "prompt": "What is the proprietor’s latest deadline to report qualifying vehicle damage to the council?",
    "correct": "72 hours after it occurs",
    "choices": [
      "72 hours after it occurs",
      "7 days",
      "14 days",
      "At renewal"
    ],
    "explanation": "Report as soon as reasonably practicable and in any case within 72 hours.",
    "source": "policy",
    "reference": "Appendix C 25.1, p45",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "rules.js: 72 hours, clarified"
  },
  {
    "id": "licensing-punctual",
    "subject": "licensing",
    "prompt": "You agree to collect a passenger at an appointed time. What is expected unless sufficiently delayed or prevented?",
    "correct": "Attend punctually",
    "choices": [
      "Attend punctually",
      "Attend whenever convenient",
      "Wait for the passenger to call again",
      "Give the job to an unlicensed friend"
    ],
    "explanation": "The driver conditions require punctual attendance, subject to sufficient cause.",
    "source": "policy",
    "reference": "Appendix D 3.3, p47",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-clean",
    "subject": "licensing",
    "prompt": "How should the vehicle be presented for each journey?",
    "correct": "Clean and tidy",
    "choices": [
      "Clean and tidy",
      "Clean only on the outside",
      "Clean only once per month",
      "In any condition if the passenger agrees"
    ],
    "explanation": "Journey-by-journey presentation is a driver condition.",
    "source": "policy",
    "reference": "Appendix D 3.8, p48",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-expiry",
    "subject": "licensing",
    "prompt": "Your licence expires before the renewed licence is issued. What should you do?",
    "correct": "Stop operating until the new licence is received",
    "choices": [
      "Stop operating until the new licence is received",
      "Work for a seven-day grace period",
      "Work if the renewal fee was paid",
      "Use a colleague’s licence"
    ],
    "explanation": "Submitting a renewal is not authority to continue after expiry.",
    "source": "policy",
    "reference": "Appendix A 1.3, p31",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-combined",
    "subject": "licensing",
    "prompt": "What type of driver licence does Hastings issue?",
    "correct": "A combined hackney carriage/private hire driver licence",
    "choices": [
      "A combined hackney carriage/private hire driver licence",
      "A private-hire-only licence in every case",
      "A licence valid only for school runs",
      "A passenger-owned licence"
    ],
    "explanation": "Successful applicants are entitled to drive both licensed vehicle types.",
    "source": "drivers",
    "reference": "Application",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-held",
    "subject": "licensing",
    "prompt": "The council’s current driver application page says a UK driving licence must have been valid for at least how long?",
    "correct": "12 months",
    "choices": [
      "12 months",
      "3 months",
      "6 months",
      "5 years"
    ],
    "explanation": "The page also requires the current address to be shown.",
    "source": "drivers",
    "reference": "Conditions",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-training",
    "subject": "licensing",
    "prompt": "Which safeguarding certificate does the current Hastings driver application page specify?",
    "correct": "Blue Lamp Trust safeguarding training certificate",
    "choices": [
      "Blue Lamp Trust safeguarding training certificate",
      "A first-aid certificate instead",
      "Any online quiz completion screenshot",
      "No safeguarding certificate"
    ],
    "explanation": "This practice game does not replace the required training.",
    "source": "drivers",
    "reference": "Conditions",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-badge-check",
    "subject": "licensing",
    "prompt": "Who may request production of your council identity badge under the driver conditions?",
    "correct": "An authorised council officer or police officer",
    "choices": [
      "An authorised council officer or police officer",
      "Only your employer",
      "Only a passenger",
      "Only the vehicle mechanic"
    ],
    "explanation": "The badge must be produced to either authorised council officers or police officers.",
    "source": "policy",
    "reference": "Appendix D 2.3, p47",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-seats",
    "subject": "licensing",
    "prompt": "What limits the number of passengers you may carry under the driver conditions?",
    "correct": "The number specified on the vehicle’s outside licence plate",
    "choices": [
      "The number specified on the vehicle’s outside licence plate",
      "The number who can physically squeeze in",
      "The number the hirer requests",
      "The number of doors"
    ],
    "explanation": "Do not exceed the licensed passenger capacity.",
    "source": "policy",
    "reference": "Appendix D 4.1, p48",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-original-1",
    "subject": "fares",
    "prompt": "A fare is £8.40 and the passenger gives you £10. How much change is due?",
    "correct": "£1.60",
    "choices": [
      "£1.60",
      "£1.40",
      "£2.60",
      "£0.60"
    ],
    "explanation": "£10.00 − £8.40 = £1.60. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 1"
  },
  {
    "id": "fares-original-2",
    "subject": "fares",
    "prompt": "A fare is £13.70 and the passenger gives you £20. How much change is due?",
    "correct": "£6.30",
    "choices": [
      "£6.30",
      "£7.30",
      "£5.30",
      "£6.70"
    ],
    "explanation": "£20.00 − £13.70 = £6.30. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 2"
  },
  {
    "id": "fares-original-4",
    "subject": "fares",
    "prompt": "A £24 fare is split equally between 3 passengers. How much does each pay?",
    "correct": "£8",
    "choices": [
      "£8",
      "£6",
      "£12",
      "£7"
    ],
    "explanation": "£24 ÷ 3 = £8. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 4"
  },
  {
    "id": "fares-original-5",
    "subject": "fares",
    "prompt": "A passenger gives you £20 for a £14.75 fare. What change is due?",
    "correct": "£5.25",
    "choices": [
      "£5.25",
      "£4.25",
      "£5.75",
      "£6.25"
    ],
    "explanation": "£20.00 − £14.75 = £5.25. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 5"
  },
  {
    "id": "fares-original-6",
    "subject": "fares",
    "prompt": "A fare is £6.80 each way. What is the total for two identical journeys?",
    "correct": "£13.60",
    "choices": [
      "£13.60",
      "£12.60",
      "£14.60",
      "£13.80"
    ],
    "explanation": "£6.80 × 2 = £13.60. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 6"
  },
  {
    "id": "fares-original-7",
    "subject": "fares",
    "prompt": "A fare comes to £17.20. The passenger gives you £20 and tells you to keep £1 as a tip. How much change do you give?",
    "correct": "£1.80",
    "choices": [
      "£1.80",
      "£2.80",
      "£0.80",
      "£1.20"
    ],
    "explanation": "£20.00 − £17.20 − £1.00 = £1.80. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 7"
  },
  {
    "id": "fares-original-8",
    "subject": "fares",
    "prompt": "Four passengers split a £30 fare equally. How much does each passenger pay?",
    "correct": "£7.50",
    "choices": [
      "£7.50",
      "£6.50",
      "£8.50",
      "£5.00"
    ],
    "explanation": "£30 ÷ 4 = £7.50. Illustrative fare, not a Hastings tariff.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20",
    "reused": "fares.js: question 8"
  },
  {
    "id": "fares-receipt",
    "subject": "fares",
    "prompt": "A fare is £18.60 and the passenger pays £25.00. What change is due?",
    "correct": "£6.40",
    "choices": [
      "£6.40",
      "£5.40",
      "£7.40",
      "£6.60"
    ],
    "explanation": "2500p − 1860p = 640p. Illustrative fare only.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-split",
    "subject": "fares",
    "prompt": "An illustrative £27.60 fare is shared equally by four people. What does each pay?",
    "correct": "£6.90",
    "choices": [
      "£6.90",
      "£6.40",
      "£7.90",
      "£6.60"
    ],
    "explanation": "2760p ÷ 4 = 690p. No tariff rate is implied.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-time",
    "subject": "fares",
    "prompt": "A journey begins at 14:35 and lasts 45 minutes. When does it finish?",
    "correct": "15:20",
    "choices": [
      "15:20",
      "15:10",
      "15:30",
      "14:80"
    ],
    "explanation": "25 minutes to 15:00, then another 20 minutes.",
    "source": "maths",
    "reference": "Checked time arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-fare-maximum",
    "subject": "licensing",
    "prompt": "For a hackney carriage journey wholly within Hastings, what does the council’s fare tariff set?",
    "correct": "The maximum fare",
    "choices": [
      "The maximum fare",
      "A compulsory minimum tip",
      "An operator booking fee",
      "A minimum fare that may never be discounted"
    ],
    "explanation": "Council-set hackney tariffs establish maximum charges within the district. No rate is supplied here.",
    "source": "policy",
    "reference": "Section 7.1.1, p29",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "licensing-fare-display",
    "subject": "licensing",
    "prompt": "Where must the current council fare table be displayed in a hackney carriage?",
    "correct": "Inside the vehicle, visible and legible",
    "choices": [
      "Inside the vehicle, visible and legible",
      "Only at the operator’s office",
      "Only on the driver’s phone",
      "Only at the taxi rank"
    ],
    "explanation": "The proprietor must keep the current table visible inside the vehicle.",
    "source": "policy",
    "reference": "Section 7.1.3; Appendix C 16.1, p44",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-danger-child",
    "subject": "safeguarding",
    "prompt": "A child passenger is in immediate danger. Which number should you call?",
    "correct": "999",
    "choices": [
      "999",
      "101 only",
      "111 only",
      "Wait for Licensing to reopen"
    ],
    "explanation": "Immediate danger calls for the emergency services.",
    "source": "child",
    "reference": "Immediate risk",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-uncertain",
    "subject": "safeguarding",
    "prompt": "You suspect a child is being abused but cannot prove it. Should you report the concern?",
    "correct": "Yes; you do not need proof",
    "choices": [
      "Yes; you do not need proof",
      "No; wait for proof",
      "Only if the child signs a statement",
      "Only if another driver agrees"
    ],
    "explanation": "It is appropriate to report a suspicion; professionals assess what happens next.",
    "source": "child",
    "reference": "What to report",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-child-route",
    "subject": "safeguarding",
    "prompt": "During opening hours, which local service is the reporting/advice route for concerns about an East Sussex child?",
    "correct": "Single Point of Access (SPoA)",
    "choices": [
      "Single Point of Access (SPoA)",
      "The taxi fare office",
      "The vehicle testing garage",
      "The council parking team"
    ],
    "explanation": "The current East Sussex page identifies SPoA. Immediate danger: 999.",
    "source": "spoa",
    "reference": "Single Point of Access",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-out-hours",
    "subject": "safeguarding",
    "prompt": "There is a serious child-safety concern outside office hours which cannot wait, but no immediate emergency. Which East Sussex service is listed?",
    "correct": "Emergency Duty Service",
    "choices": [
      "Emergency Duty Service",
      "Wait until next week",
      "Parking enforcement",
      "Vehicle licensing inspections"
    ],
    "explanation": "Use the Emergency Duty Service; immediate danger still requires 999.",
    "source": "spoa",
    "reference": "Out of hours",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-adult",
    "subject": "safeguarding",
    "prompt": "An adult passenger may be abused, neglected or exploited. Which local team accepts a concern?",
    "correct": "East Sussex Adult Social Care",
    "choices": [
      "East Sussex Adult Social Care",
      "The DVLA vehicle tax team",
      "The taxi meter installer",
      "The parking permit team"
    ],
    "explanation": "Report through the council adult safeguarding route; use 999 for immediate danger.",
    "source": "adult",
    "reference": "Report a concern",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-neglect",
    "subject": "safeguarding",
    "prompt": "Which of these is included in child abuse for reporting purposes?",
    "correct": "Neglect",
    "choices": [
      "Neglect",
      "Only physical injury",
      "Only a crime already proven in court",
      "Only harm outside the family"
    ],
    "explanation": "Physical, sexual and emotional abuse, and neglect, are all included.",
    "source": "child",
    "reference": "What to report",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-recognise",
    "subject": "safeguarding",
    "prompt": "What safeguarding role does Hastings identify for taxi drivers?",
    "correct": "Spot and report possible abuse, exploitation or neglect",
    "choices": [
      "Spot and report possible abuse, exploitation or neglect",
      "Investigate and determine guilt",
      "Ignore concerns without a criminal conviction",
      "Publicly name suspected offenders online"
    ],
    "explanation": "Awareness and reporting are central to the driver’s role.",
    "source": "policy",
    "reference": "Section 4.10.1, p22",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-assistance-dog",
    "subject": "safeguarding",
    "prompt": "You have no medical exemption. May you charge extra to carry a passenger’s assistance dog?",
    "correct": "No",
    "choices": [
      "No",
      "Yes, a cleaning fee automatically",
      "Yes, at night",
      "Yes, if the operator agrees"
    ],
    "explanation": "The driver conditions require carriage of assistance dogs without additional charge.",
    "source": "policy",
    "reference": "Appendix D 5.1–5.3, p48",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-wheelchair",
    "subject": "safeguarding",
    "prompt": "Before moving a wheelchair-accessible taxi with a wheelchair user aboard, what is required?",
    "correct": "Secure the wheelchair with approved restraints and apply its brakes",
    "choices": [
      "Secure the wheelchair with approved restraints and apply its brakes",
      "Ask another passenger to hold the chair",
      "Use only the wheelchair brakes",
      "Leave restraints loose for comfort"
    ],
    "explanation": "Drivers must understand the equipment and secure wheelchairs before moving.",
    "source": "policy",
    "reference": "Appendix D 6.1, pp48–49",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-boarding",
    "subject": "safeguarding",
    "prompt": "What duty applies while passengers enter or leave the taxi?",
    "correct": "Take all reasonable precautions for their safety",
    "choices": [
      "Take all reasonable precautions for their safety",
      "Drive off as soon as one door closes",
      "Leave all safety decisions to the passenger",
      "Only help passengers who pay extra"
    ],
    "explanation": "The duty covers people conveyed in, entering and alighting from the vehicle.",
    "source": "policy",
    "reference": "Appendix D 3.2, p47",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-fatigue",
    "subject": "safeguarding",
    "prompt": "You become too tired to continue driving safely. What should you do?",
    "correct": "Stop work until rested and able to return",
    "choices": [
      "Stop work until rested and able to return",
      "Open a window and continue indefinitely",
      "Ask the passenger to keep you awake",
      "Drive faster to finish early"
    ],
    "explanation": "The Hastings conditions require adequate rest and breaks, and stopping work when too tired.",
    "source": "policy",
    "reference": "Appendix D 3.11, p48",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "safeguarding-adult-danger",
    "subject": "safeguarding",
    "prompt": "An adult passenger is in immediate danger. What is the appropriate emergency contact?",
    "correct": "Police on 999",
    "choices": [
      "Police on 999",
      "A routine licensing email",
      "The next council meeting",
      "The vehicle’s insurer first"
    ],
    "explanation": "The East Sussex adult safeguarding page directs immediate danger to 999.",
    "source": "adult",
    "reference": "Immediate danger",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "signs-give-way",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Give way to traffic on the major road",
    "choices": [
      "Give way to traffic on the major road",
      "Stop in every case",
      "You have priority",
      "No entry"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-give-way.jpg",
    "alt": "Inverted triangular GIVE WAY sign"
  },
  {
    "id": "signs-no-cycle",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No cycling",
    "choices": [
      "No cycling",
      "Cycle route only",
      "Cycle crossing ahead",
      "Cycles have priority"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-no-cycle.jpg",
    "alt": "Red-bordered circle containing a bicycle"
  },
  {
    "id": "signs-no-motor",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No motor vehicles",
    "choices": [
      "No motor vehicles",
      "Cars only",
      "No overtaking",
      "Motorway ahead"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-no-motor.jpg",
    "alt": "Red-bordered circle containing a motorcycle above a car"
  },
  {
    "id": "signs-overtake",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No overtaking",
    "choices": [
      "No overtaking",
      "One-way traffic",
      "Two lanes ahead",
      "Cars only"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-overtake.jpg",
    "alt": "Red-bordered circle containing a red and a black car"
  },
  {
    "id": "signs-priority",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Give priority to vehicles from the opposite direction",
    "choices": [
      "Give priority to vehicles from the opposite direction",
      "You have priority over oncoming traffic",
      "Two-way traffic ahead",
      "No U-turns"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-priority.jpg",
    "alt": "Red-bordered circle with opposing red upward and black downward arrows"
  },
  {
    "id": "signs-no-right",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No right turn",
    "choices": [
      "No right turn",
      "Turn right ahead",
      "Right-hand bend ahead",
      "No U-turns"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-no-right.jpg",
    "alt": "Red-bordered circle with a crossed-out right-turn arrow"
  },
  {
    "id": "signs-no-left",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No left turn",
    "choices": [
      "No left turn",
      "Turn left ahead",
      "Keep left",
      "No U-turns"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-no-left.jpg",
    "alt": "Red-bordered circle with a crossed-out left-turn arrow"
  },
  {
    "id": "signs-no-u",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No U-turns",
    "choices": [
      "No U-turns",
      "No right turn",
      "No left turn",
      "Turn back now"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-no-u.jpg",
    "alt": "Red-bordered circle with a crossed-out U-shaped arrow"
  },
  {
    "id": "signs-waiting",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No waiting",
    "choices": [
      "No waiting",
      "No stopping (clearway)",
      "Parking permitted",
      "No entry"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-waiting.jpg",
    "alt": "Blue circular sign with a red border and one diagonal red bar"
  },
  {
    "id": "signs-stopping",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "No stopping (clearway)",
    "choices": [
      "No stopping (clearway)",
      "No waiting only",
      "End of parking restrictions",
      "No overtaking"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-stopping.jpg",
    "alt": "Blue circular sign with a red border and a red cross"
  },
  {
    "id": "signs-ahead",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Ahead only",
    "choices": [
      "Ahead only",
      "One-way traffic on a rectangular sign",
      "No straight ahead",
      "Minimum speed applies"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-ahead.jpg",
    "alt": "Blue circle with an upward white arrow"
  },
  {
    "id": "signs-either",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Vehicles may pass either side to reach the same destination",
    "choices": [
      "Vehicles may pass either side to reach the same destination",
      "Keep left only",
      "Keep right only",
      "Two-way traffic begins"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-either.jpg",
    "alt": "Blue circle with white arrows pointing down-left and down-right"
  },
  {
    "id": "signs-mini",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Mini-roundabout: give way to vehicles from the immediate right",
    "choices": [
      "Mini-roundabout: give way to vehicles from the immediate right",
      "Roundabout ahead warning",
      "One-way traffic only",
      "No U-turns"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-mini.jpg",
    "alt": "Blue circle containing three white circulating arrows"
  },
  {
    "id": "signs-cycle-route",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Route for pedal cycles only",
    "choices": [
      "Route for pedal cycles only",
      "No cycling",
      "Cycle crossing ahead",
      "Motorcycles only"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-cycle-route.jpg",
    "alt": "Blue circle with a white bicycle"
  },
  {
    "id": "signs-dual-end",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Dual carriageway ends",
    "choices": [
      "Dual carriageway ends",
      "Dual carriageway begins",
      "Motorway begins",
      "Road closed"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-dual-end.jpg",
    "alt": "Red-bordered warning triangle showing two carriageways joining"
  },
  {
    "id": "signs-narrows",
    "subject": "signs",
    "prompt": "What does this sign mean?",
    "correct": "Road narrows on both sides",
    "choices": [
      "Road narrows on both sides",
      "Road widens",
      "Two-way traffic ends",
      "No overtaking"
    ],
    "explanation": "Meaning checked against the official Highway Code sign caption. Plates below a sign may qualify its meaning.",
    "source": "signs",
    "reference": "Traffic sign caption",
    "status": "checked",
    "checked": "2026-10-20",
    "image": "sign-narrows.jpg",
    "alt": "Red-bordered warning triangle with both sides narrowing"
  },
  {
    "id": "fares-change-50",
    "subject": "fares",
    "prompt": "An illustrative fare is £32.85. The passenger gives you £50. What change is due?",
    "correct": "£17.15",
    "choices": [
      "£17.15",
      "£17.85",
      "£18.15",
      "£16.15"
    ],
    "explanation": "5000p − 3285p = 1715p.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-split-five",
    "subject": "fares",
    "prompt": "Five people share an illustrative £42.50 fare equally. How much each?",
    "correct": "£8.50",
    "choices": [
      "£8.50",
      "£7.50",
      "£9.50",
      "£8.05"
    ],
    "explanation": "4250p ÷ 5 = 850p.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-round-trip",
    "subject": "fares",
    "prompt": "Two separate journeys each cost £12.40. What is the combined cost?",
    "correct": "£24.80",
    "choices": [
      "£24.80",
      "£24.40",
      "£25.80",
      "£22.80"
    ],
    "explanation": "1240p × 2 = 2480p.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-clock-midnight",
    "subject": "fares",
    "prompt": "A journey starts at 23:45 and lasts 35 minutes. When does it finish?",
    "correct": "00:20 the next day",
    "choices": [
      "00:20 the next day",
      "00:10 the next day",
      "00:30 the next day",
      "23:80 the same day"
    ],
    "explanation": "15 minutes reach midnight; 20 minutes remain.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-duration",
    "subject": "fares",
    "prompt": "How long is a journey from 09:50 to 10:25?",
    "correct": "35 minutes",
    "choices": [
      "35 minutes",
      "25 minutes",
      "45 minutes",
      "75 minutes"
    ],
    "explanation": "10 minutes to 10:00 plus 25 minutes.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-metres",
    "subject": "fares",
    "prompt": "How many metres are there in 2.5 kilometres?",
    "correct": "2,500 metres",
    "choices": [
      "2,500 metres",
      "250 metres",
      "25,000 metres",
      "2,050 metres"
    ],
    "explanation": "2.5 × 1000 = 2500.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-distance",
    "subject": "fares",
    "prompt": "A route has legs of 3.6 miles and 2.8 miles. What is the total?",
    "correct": "6.4 miles",
    "choices": [
      "6.4 miles",
      "5.4 miles",
      "6.8 miles",
      "5.8 miles"
    ],
    "explanation": "3.6 + 2.8 = 6.4.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-tip",
    "subject": "fares",
    "prompt": "The fare is £15.20. A passenger gives £20 and asks for £2 change. What tip remains?",
    "correct": "£2.80",
    "choices": [
      "£2.80",
      "£4.80",
      "£3.80",
      "£1.80"
    ],
    "explanation": "£20 − £2 − £15.20 = £2.80.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-takings",
    "subject": "fares",
    "prompt": "Three illustrative fares are £8.50, £12.20 and £9.30. What is their total?",
    "correct": "£30.00",
    "choices": [
      "£30.00",
      "£29.00",
      "£30.50",
      "£31.00"
    ],
    "explanation": "850p + 1220p + 930p = 3000p.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  },
  {
    "id": "fares-percent",
    "subject": "fares",
    "prompt": "A pre-agreed illustrative private hire quote of £40 is discounted by 10%. What is the new quote?",
    "correct": "£36",
    "choices": [
      "£36",
      "£30",
      "£38",
      "£44"
    ],
    "explanation": "10% of £40 is £4; £40 − £4 = £36. This is arithmetic, not a Hastings tariff rule.",
    "source": "maths",
    "reference": "Checked arithmetic",
    "status": "checked",
    "checked": "2026-10-20"
  }
];

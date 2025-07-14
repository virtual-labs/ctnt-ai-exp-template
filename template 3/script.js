// Global variables
let currentTab = 'equilibrium';
let helpPanelVisible = false;
let tourActive = false;
let currentTourStep = 0;
let tourScore = 0;
let challengesSolved = 0;
let hintsUsed = 0;
let breakdownActive = false;

// Challenge tracking (updated for dynamic questions)
let challengeAnswers = {
    quiz1: [], // Dynamic based on selected questions
    advanced: [], // Dynamic based on selected questions
    fillBlanks: [], // Dynamic based on selected questions
    matching: {},
    calculations: [] // Dynamic based on selected questions
};

let challengeStates = {
    1: false, // Rapid Fire Quiz
    2: false, // Fill in Blanks
    3: false, // Matching
    4: false, // Advanced Concepts
    5: false  // Calculations
};

// Enhanced question bank with detailed explanations and hints
const questionBank = {
    rapidFire: [
        { 
            q: "Forward bias makes current flow easily through a diode.", 
            a: true,
            explanation: "Forward bias reduces the potential barrier, allowing majority carriers to overcome it easily and flow across the junction.",
            hint: "Think about what happens to the energy barrier when you apply forward voltage."
        },
        { 
            q: "The depletion region gets wider under forward bias.", 
            a: false,
            explanation: "Forward bias actually narrows the depletion region by reducing the effective voltage across the junction.",
            hint: "Forward bias opposes the built-in potential, affecting the depletion width."
        },
        { 
            q: "Higher doping concentration increases built-in potential.", 
            a: true,
            explanation: "Built-in potential Vbi = (kT/q)ln(NaNd/ni²). Higher doping (Na, Nd) increases Vbi logarithmically.",
            hint: "Look at the built-in potential equation and see how Na and Nd affect it."
        },
        { 
            q: "Reverse bias increases the width of the depletion region.", 
            a: true,
            explanation: "Reverse bias adds to the built-in potential, creating a larger voltage across the junction and widening the depletion region.",
            hint: "Reverse bias voltage adds to the built-in voltage, affecting the electric field."
        },
        { 
            q: "Silicon has a larger bandgap than Germanium.", 
            a: true,
            explanation: "Silicon has Eg ≈ 1.12 eV while Germanium has Eg ≈ 0.67 eV. Larger bandgap means higher built-in potential.",
            hint: "Compare the energy gaps: Si (1.12 eV) vs Ge (0.67 eV)."
        },
        { 
            q: "In equilibrium, there is no net current flow through the diode.", 
            a: true,
            explanation: "At thermal equilibrium, the diffusion current exactly balances the drift current, resulting in zero net current.",
            hint: "Equilibrium means all forces are balanced - what about current components?"
        },
        { 
            q: "The built-in electric field points from N-region to P-region.", 
            a: true,
            explanation: "The electric field is created by positive ions in the N-region and negative ions in the P-region, pointing from positive to negative.",
            hint: "Electric field always points from positive charge to negative charge."
        },
        { 
            q: "Temperature increase always increases the built-in potential.", 
            a: false,
            explanation: "Higher temperature increases ni exponentially, which decreases Vbi since Vbi ∝ ln(NaNd/ni²).",
            hint: "Consider how intrinsic carrier concentration ni changes with temperature in the Vbi equation."
        },
        { 
            q: "Avalanche breakdown occurs at very high forward voltages.", 
            a: false,
            explanation: "Avalanche breakdown occurs under high reverse bias, not forward bias. Forward bias reduces the electric field.",
            hint: "Breakdown needs high electric fields - does forward or reverse bias create these?"
        },
        { 
            q: "The depletion region contains mobile charge carriers.", 
            a: false,
            explanation: "The depletion region is 'depleted' of mobile carriers (free electrons and holes), containing only fixed ionized dopant atoms.",
            hint: "The name 'depletion region' tells you what's missing there."
        },
        { 
            q: "P-type semiconductors have excess electrons as majority carriers.", 
            a: false,
            explanation: "P-type semiconductors have holes as majority carriers due to acceptor dopants that create electron deficiencies.",
            hint: "P-type = Positive majority carriers. What are positive charge carriers called?"
        },
        { 
            q: "The built-in potential depends on the doping concentrations.", 
            a: true,
            explanation: "Vbi = (kT/q)ln(NaNd/ni²) shows direct dependence on both Na (p-type) and Nd (n-type) doping levels.",
            hint: "Check the built-in potential formula - what variables appear in it?"
        },
        { 
            q: "Forward bias reduces the height of the potential barrier.", 
            a: true,
            explanation: "Forward bias voltage opposes the built-in potential, effectively lowering the barrier that carriers must overcome.",
            hint: "Forward voltage works against the built-in potential barrier."
        },
        { 
            q: "Zener breakdown occurs in lightly doped junctions.", 
            a: false,
            explanation: "Zener breakdown occurs in heavily doped junctions where the depletion region is narrow and tunneling dominates.",
            hint: "Zener breakdown involves quantum tunneling - this needs thin barriers."
        },
        { 
            q: "The depletion width is inversely proportional to doping concentration.", 
            a: true,
            explanation: "W ∝ 1/√(Na + Nd). Higher doping creates more charge, requiring less width to balance the voltage.",
            hint: "More doping means more charge density - how does this affect the required region width?"
        },
        { 
            q: "Minority carriers are responsible for leakage current.", 
            a: true,
            explanation: "In reverse bias, the small current is due to thermally generated minority carriers being swept across the junction.",
            hint: "In reverse bias, majority carriers are blocked - what carriers can still contribute to current?"
        },
        { 
            q: "The electric field is maximum at the edges of the depletion region.", 
            a: false,
            explanation: "In a step junction, the electric field is maximum at the metallurgical junction (center) and zero at the edges.",
            hint: "Think about where the charge density changes most abruptly in the depletion region."
        },
        { 
            q: "Gallium Arsenide has a direct bandgap.", 
            a: true,
            explanation: "GaAs is a direct bandgap semiconductor, making it efficient for light emission, unlike Si and Ge which are indirect.",
            hint: "Direct bandgap materials are great for LEDs and lasers - GaAs is commonly used for these."
        },
        { 
            q: "The saturation current increases with temperature.", 
            a: true,
            explanation: "Is ∝ ni² and ni increases exponentially with temperature, so saturation current increases rapidly with temperature.",
            hint: "Saturation current depends on intrinsic concentration - how does ni vary with temperature?"
        },
        { 
            q: "Under reverse bias, the majority carriers easily cross the junction.", 
            a: false,
            explanation: "Reverse bias increases the barrier height, making it even harder for majority carriers to cross the junction.",
            hint: "Reverse bias makes the potential hill taller - is it easier or harder for carriers to climb it?"
        }
    ],
    
    fillInTheBlanks: [
        {
            text: "The built-in potential is given by Vbi = (kT/q) × ln({blank1} × {blank2} / {blank3}²)",
            answers: { blank1: "na", blank2: "nd", blank3: "ni" },
            explanations: {
                blank1: "Na is the acceptor concentration in the P-region",
                blank2: "Nd is the donor concentration in the N-region", 
                blank3: "ni is the intrinsic carrier concentration"
            },
            hint: "Built-in potential depends on doping levels and intrinsic properties"
        },
        {
            text: "In forward bias, the applied voltage {blank1} the built-in potential barrier, allowing {blank2} carriers to cross the junction easily.",
            answers: { blank1: "reduces", blank2: "majority" },
            explanations: {
                blank1: "Forward voltage opposes the built-in potential",
                blank2: "Majority carriers (holes in P, electrons in N) become the main current contributors"
            },
            hint: "Think about which direction forward voltage points and which carriers are most abundant"
        },
        {
            text: "The depletion region width is proportional to the square root of the {blank1} voltage.",
            answers: { blank1: "effective" },
            explanations: {
                blank1: "Effective voltage = Vbi - Vapplied (for forward bias) or Vbi + |Vapplied| (for reverse bias)"
            },
            hint: "The total voltage across the junction determines the depletion width"
        },
        {
            text: "The maximum electric field in a PN junction occurs at the {blank1} and is given by Emax = 2Vbi/{blank2}.",
            answers: { blank1: "junction", blank2: "w" },
            explanations: {
                blank1: "The metallurgical junction is where the charge density changes most abruptly",
                blank2: "W is the total depletion width"
            },
            hint: "Think about where the electric field would be strongest in the depletion region"
        },
        {
            text: "The diode current equation is I = Is(e^(V/{blank1}) - 1), where Is is the {blank2} current.",
            answers: { blank1: "vt", blank2: "saturation" },
            explanations: {
                blank1: "Vt = kT/q is the thermal voltage (≈26 mV at room temperature)",
                blank2: "Saturation current is the reverse bias leakage current"
            },
            hint: "The exponential term involves thermal voltage, and Is is the current in reverse bias"
        },
        {
            text: "In a PN junction, {blank1} diffuse from P to N region while {blank2} diffuse from N to P region.",
            answers: { blank1: "holes", blank2: "electrons" },
            explanations: {
                blank1: "Holes are majority carriers in P-region and diffuse down their concentration gradient",
                blank2: "Electrons are majority carriers in N-region and diffuse down their concentration gradient"
            },
            hint: "Carriers diffuse from where they are abundant to where they are scarce"
        },
        {
            text: "The built-in potential {blank1} with increasing temperature due to the {blank2} dependence of ni.",
            answers: { blank1: "decreases", blank2: "exponential" },
            explanations: {
                blank1: "Higher ni in the denominator of ln(NaNd/ni²) reduces Vbi",
                blank2: "ni ∝ exp(-Eg/2kT) increases exponentially with temperature"
            },
            hint: "Look at how ni appears in the Vbi equation and how it changes with temperature"
        },
        {
            text: "Avalanche breakdown occurs when the reverse voltage exceeds the {blank1} voltage, causing {blank2} multiplication.",
            answers: { blank1: "breakdown", blank2: "carrier" },
            explanations: {
                blank1: "Breakdown voltage is the critical reverse voltage for avalanche",
                blank2: "High energy carriers create electron-hole pairs through impact ionization"
            },
            hint: "Avalanche involves a multiplication process of charge carriers"
        },
        {
            text: "The space charge region extends more into the {blank1} doped side of the junction.",
            answers: { blank1: "lightly" },
            explanations: {
                blank1: "Charge neutrality requires equal total charge on both sides; less doping means wider region needed"
            },
            hint: "Same total charge must be balanced on both sides - where does this require more width?"
        },
        {
            text: "The ideality factor 'n' in the diode equation accounts for {blank1} and typically ranges from {blank2} to 2.",
            answers: { blank1: "recombination", blank2: "1" },
            explanations: {
                blank1: "Non-ideal effects like recombination in the depletion region affect the exponential relationship",
                blank2: "Ideal diodes have n=1; practical diodes have n=1.1-2 due to recombination"
            },
            hint: "The ideality factor accounts for deviations from ideal exponential behavior"
        }
    ],
    
    advancedConcepts: [
        {
            q: "What happens to the depletion width when P-type doping increases?",
            options: ["It increases", "It decreases", "It stays the same", "It depends on N-type doping"],
            correct: "It depends on N-type doping",
            explanation: "Depletion width W ∝ 1/√(Na + Nd). While increasing Na alone would decrease W, the distribution between Wp and Wn depends on the doping ratio.",
            wrongExplanations: {
                "It increases": "Higher doping actually decreases total depletion width due to increased charge density.",
                "It decreases": "While total width decreases, the question asks specifically about P-type doping's effect, which depends on the N-type doping level too.",
                "It stays the same": "Changing doping concentrations always affects depletion width."
            },
            hint: "Consider both the total width equation and how charge is distributed between P and N sides."
        },
        {
            q: "Which material has the smallest built-in potential?",
            options: ["Silicon", "Germanium", "Gallium Arsenide", "All are the same"],
            correct: "Germanium",
            explanation: "Germanium has the smallest bandgap (0.67 eV), leading to higher intrinsic concentration ni and thus lower Vbi = (kT/q)ln(NaNd/ni²).",
            wrongExplanations: {
                "Silicon": "Silicon has a larger bandgap (1.12 eV) than Germanium, resulting in higher built-in potential.",
                "Gallium Arsenide": "GaAs has the largest bandgap (1.42 eV) among these three, giving the highest built-in potential.",
                "All are the same": "Different materials have different bandgaps and intrinsic concentrations, leading to different built-in potentials."
            },
            hint: "Built-in potential is inversely related to intrinsic carrier concentration, which depends on bandgap."
        },
        {
            q: "What is the primary cause of leakage current in reverse-biased diodes?",
            options: ["Majority carriers", "Minority carriers", "Surface effects", "Tunneling"],
            correct: "Minority carriers",
            explanation: "In reverse bias, thermally generated minority carriers are swept across the junction by the electric field, creating the saturation current.",
            wrongExplanations: {
                "Majority carriers": "Majority carriers face an increased potential barrier in reverse bias and contribute negligibly to current.",
                "Surface effects": "While surface leakage exists, the primary bulk mechanism is minority carrier generation.",
                "Tunneling": "Tunneling only becomes significant in heavily doped junctions (Zener diodes) at high fields."
            },
            hint: "In reverse bias, which type of carriers can still move across the junction?"
        },
        {
            q: "In which type of breakdown do carriers gain energy gradually?",
            options: ["Zener breakdown", "Avalanche breakdown", "Thermal breakdown", "Punch-through"],
            correct: "Avalanche breakdown",
            explanation: "In avalanche breakdown, carriers accelerate in the high electric field, gaining energy gradually until they have enough to create electron-hole pairs through impact ionization.",
            wrongExplanations: {
                "Zener breakdown": "Zener breakdown is a tunneling effect where carriers tunnel through the barrier, not gaining energy gradually.",
                "Thermal breakdown": "Thermal breakdown is due to excessive heat, not gradual energy gain of carriers.",
                "Punch-through": "Punch-through occurs when the depletion region extends across the entire base region."
            },
            hint: "Think about which breakdown mechanism involves carriers accelerating and colliding with atoms."
        },
        {
            q: "What determines the maximum electric field in a PN junction?",
            options: ["Applied voltage only", "Doping concentrations only", "Both applied voltage and doping", "Temperature only"],
            correct: "Both applied voltage and doping",
            explanation: "Emax = 2(Vbi ± Vapplied)/W, where both the effective voltage and depletion width W (which depends on doping) determine the field.",
            wrongExplanations: {
                "Applied voltage only": "Doping affects both the built-in potential and depletion width, which determine the field distribution.",
                "Doping concentrations only": "Applied voltage changes the effective voltage across the junction, directly affecting the electric field.",
                "Temperature only": "While temperature affects Vbi slightly, voltage and doping have much stronger effects on the maximum field."
            },
            hint: "Electric field depends on voltage difference and the distance over which it's applied."
        },
        {
            q: "Which parameter increases the most with temperature?",
            options: ["Built-in potential", "Saturation current", "Breakdown voltage", "Depletion width"],
            correct: "Saturation current",
            explanation: "Saturation current Is ∝ ni² and ni increases exponentially with temperature, making Is the most temperature-sensitive parameter.",
            wrongExplanations: {
                "Built-in potential": "Built-in potential actually decreases slightly with temperature due to increasing ni.",
                "Breakdown voltage": "Breakdown voltage has weak temperature dependence compared to saturation current.",
                "Depletion width": "Depletion width has relatively weak temperature dependence through Vbi."
            },
            hint: "Consider which parameter has an exponential temperature dependence."
        }
    ],
    
    calculations: [
        {
            problem: "A Silicon PN junction at 300K has Na = 10¹⁶ cm⁻³ and Nd = 10¹⁶ cm⁻³. The built-in potential is approximately {blank1} V",
            answers: { blank1: "0.65" },
            tolerance: 0.1,
            explanation: "Using Vbi = (kT/q)ln(NaNd/ni²) with kT/q = 0.026V and ni = 1.45×10¹⁰ cm⁻³ for Si at 300K",
            hint: "Use the built-in potential formula with Si parameters at room temperature"
        },
        {
            problem: "If temperature increases from 300K to 400K, the built-in potential will {blank1} by approximately {blank2} %",
            answers: { blank1: "decrease", blank2: "20" },
            tolerance: 5,
            explanation: "Higher temperature increases ni exponentially, reducing Vbi since it appears as ni² in the denominator",
            hint: "Consider how intrinsic concentration changes with temperature in the Vbi equation"
        },
        {
            problem: "For a Silicon diode with Vbi = 0.7V and equal doping of 10¹⁶ cm⁻³, the depletion width is approximately {blank1} μm",
            answers: { blank1: "0.36" },
            tolerance: 0.1,
            explanation: "Using W = √(2εVbi/q × (Na+Nd)/(NaNd)) with Silicon permittivity",
            hint: "Use the depletion width formula for equal doping concentrations"
        },
        {
            problem: "The thermal voltage at 300K is {blank1} mV. At 400K, it becomes {blank2} mV",
            answers: { blank1: "26", blank2: "34.5" },
            tolerance: 2,
            explanation: "Vt = kT/q is directly proportional to temperature. Vt scales linearly with T.",
            hint: "Thermal voltage is directly proportional to absolute temperature"
        },
        {
            problem: "A Germanium diode has Vbi = 0.3V at 300K. If both Na and Nd are increased by 100×, the new Vbi is {blank1} V",
            answers: { blank1: "0.42" },
            tolerance: 0.05,
            explanation: "Vbi increases by (kT/q)ln(100²) = (kT/q)ln(10⁴) = 0.026×4×ln(10) ≈ 0.24V addition",
            hint: "Built-in potential has logarithmic dependence on doping concentrations"
        }
    ]
};

// Random question selection system
let selectedQuestions = {
    rapidFire: [],
    fillInTheBlanks: [],
    advancedConcepts: [],
    calculations: []
};

function selectRandomQuestions() {
    // Select 3 random questions from each category
    selectedQuestions.rapidFire = getRandomItems(questionBank.rapidFire, 3);
    selectedQuestions.fillInTheBlanks = getRandomItems(questionBank.fillInTheBlanks, 3);
    selectedQuestions.advancedConcepts = getRandomItems(questionBank.advancedConcepts, 2);
    selectedQuestions.calculations = getRandomItems(questionBank.calculations, 2);
}

function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function initializeChallengeAnswers() {
    challengeAnswers.quiz1 = new Array(selectedQuestions.rapidFire.length).fill(null);
    challengeAnswers.advanced = new Array(selectedQuestions.advancedConcepts.length).fill(null);
    challengeAnswers.fillBlanks = [];
    challengeAnswers.calculations = [];
}

// Enhanced hint and explanation functions
function showQuizHints(challengeNum) {
    const hintContainer = document.getElementById(`challenge${challengeNum}-hint`);
    let hintsHTML = '<strong>💡 Hints for each question:</strong><br><br>';
    
    selectedQuestions.rapidFire.forEach((question, index) => {
        hintsHTML += `<div class="concept-box">
            <strong>Question ${index + 1}:</strong> ${question.hint}
        </div>`;
    });
    
    hintContainer.innerHTML = hintsHTML;
    hintContainer.classList.add('active');
}

function showAdvancedHints() {
    const hintContainer = document.getElementById('challenge4-hint');
    let hintsHTML = '<strong>💡 Advanced Concept Hints:</strong><br><br>';
    
    selectedQuestions.advancedConcepts.forEach((question, index) => {
        hintsHTML += `<div class="concept-box">
            <strong>Question ${index + 1}:</strong> ${question.hint}
        </div>`;
    });
    
    hintContainer.innerHTML = hintsHTML;
    hintContainer.classList.add('active');
}

function showMatchingHints() {
    const hintContainer = document.getElementById('challenge3-hint');
    hintContainer.innerHTML = `
        <strong>💡 Matching Hints:</strong><br><br>
        <div class="concept-box">
            <strong>Depletion Region:</strong> Think about what happens to mobile charges in this area.
        </div>
        <div class="concept-box">
            <strong>Forward Bias:</strong> Consider which terminal is positive and which allows current flow.
        </div>
        <div class="concept-box">
            <strong>Avalanche Breakdown:</strong> This involves a multiplication process under high reverse voltage.
        </div>
        <div class="concept-box">
            <strong>Built-in Potential:</strong> This exists even without external voltage applied.
        </div>
    `;
    hintContainer.classList.add('active');
}

// Enhanced answer checking with detailed explanations
function checkQuizAnswers(challengeNum) {
    const correctAnswers = selectedQuestions.rapidFire.map(q => q.a);
    const userAnswers = challengeAnswers.quiz1;
    
    let score = 0;
    let total = correctAnswers.length;
    
    // Clear previous feedback
    document.querySelectorAll('#challenge1 .explanation-panel').forEach(el => el.remove());
    
    // Check each question and provide explanations
    for (let i = 0; i < total; i++) {
        const questionElement = document.querySelectorAll('#challenge1 .quiz-question')[i];
        const options = questionElement.querySelectorAll('.quiz-option');
        const question = selectedQuestions.rapidFire[i];
        
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
            // Mark correct answer
            options.forEach(opt => {
                if (opt.classList.contains('selected')) {
                    opt.classList.add('correct');
                }
            });
            
            // Create explanation element for correct answer
            const explanation = document.createElement('div');
            explanation.className = 'explanation-panel active';
            explanation.innerHTML = `
                <div class="explanation-title"><i class="fas fa-check-circle" style="color: #10b981;"></i> Question ${i + 1}: Correct!</div>
                <div class="explanation-content">${question.explanation}</div>
            `;
            questionElement.appendChild(explanation);
        } else {
            // Mark incorrect answer and show explanation
            options.forEach(opt => {
                if (opt.classList.contains('selected')) {
                    opt.classList.add('incorrect');
                }
            });
            
            // Create explanation element for incorrect answer
            const explanation = document.createElement('div');
            explanation.className = 'explanation-panel active';
            explanation.innerHTML = `
                <div class="explanation-title"><i class="fas fa-times-circle" style="color: #ef4444;"></i> Question ${i + 1}: Incorrect</div>
                <div class="explanation-content">
                    <strong>Correct Answer:</strong> ${correctAnswers[i] ? 'True' : 'False'}<br>
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            questionElement.appendChild(explanation);
        }
    }
    
    const feedback = document.getElementById('challenge1-feedback');
    if (score === total) {
        feedback.className = 'challenge-feedback success';
        feedback.textContent = `🎉 Perfect! You got all ${score}/${total} questions correct!`;
        markChallengeComplete(1, 100);
    } else {
        feedback.className = 'challenge-feedback error';
        feedback.textContent = `You got ${score}/${total} correct. Review the explanations below each question!`;
    }
}

function checkAdvancedAnswers() {
    const correctAnswers = selectedQuestions.advancedConcepts.map(q => q.correct);
    const userAnswers = challengeAnswers.advanced;
    
    let score = 0;
    let total = correctAnswers.length;
    
    // Check each question and provide detailed explanations
    for (let i = 0; i < total; i++) {
        const questionElement = document.querySelectorAll('#challenge4 .quiz-question')[i];
        const options = questionElement.querySelectorAll('.quiz-option');
        const question = selectedQuestions.advancedConcepts[i];
        
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
            // Mark correct answer
            options.forEach(opt => {
                if (opt.classList.contains('selected')) {
                    opt.classList.add('correct');
                }
            });
        } else {
            // Mark incorrect answer and show detailed explanation
            options.forEach(opt => {
                if (opt.classList.contains('selected')) {
                    opt.classList.add('incorrect');
                    // Add specific wrong answer explanation
                    if (question.wrongExplanations && question.wrongExplanations[opt.textContent]) {
                        const wrongExplanation = document.createElement('div');
                        wrongExplanation.className = 'wrong-answer-explanation';
                        wrongExplanation.innerHTML = `<strong>Why this is wrong:</strong> ${question.wrongExplanations[opt.textContent]}`;
                        opt.appendChild(wrongExplanation);
                    }
                }
            });
        }
        
        // Add detailed explanation after each question
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'question-explanation active';
        explanationDiv.innerHTML = `
            <div class="explanation-title">
                <i class="fas fa-lightbulb"></i> 
                ${userAnswers[i] === correctAnswers[i] ? 'Excellent!' : 'Learning Opportunity'}
            </div>
            <div class="explanation-content">
                <strong>Correct Answer:</strong> ${correctAnswers[i]}<br>
                <strong>Explanation:</strong> ${question.explanation}
            </div>
        `;
        questionElement.appendChild(explanationDiv);
    }
    
    const feedback = document.getElementById('challenge4-feedback');
    if (score === total) {
        feedback.className = 'challenge-feedback success';
        feedback.textContent = `🎉 Outstanding! You've mastered the advanced concepts!`;
        markChallengeComplete(4, 180);
    } else {
        feedback.className = 'challenge-feedback error';
        feedback.textContent = `You got ${score}/${total} correct. Study the detailed explanations below each question!`;
    }
}

function checkFillBlanks() {
    let totalBlanks = 0;
    let correctBlanks = 0;
    let explanationHTML = '';
    
    // Check all questions and their blanks
    challengeAnswers.fillBlanks.forEach((questionBlanks, qIndex) => {
        const question = selectedQuestions.fillInTheBlanks[qIndex];
        let questionCorrect = true;
        
        questionBlanks.forEach(blank => {
            totalBlanks++;
            const input = document.getElementById(blank.id);
            const userAnswer = input.value.toLowerCase().trim();
            
            if (userAnswer === blank.correctAnswer.toLowerCase()) {
                correctBlanks++;
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else {
                questionCorrect = false;
                input.classList.remove('correct');
                input.classList.add('incorrect');
            }
        });
        
        // Add explanation for each question
        explanationHTML += `<div class="explanation-panel active">
            <div class="explanation-title">
                <i class="fas fa-${questionCorrect ? 'check-circle' : 'info-circle'}"></i> 
                Question ${qIndex + 1} ${questionCorrect ? 'Complete!' : 'Review'}
            </div>
            <div class="explanation-content">`;
        
        Object.keys(question.answers).forEach(blankKey => {
            const explanation = question.explanations[blankKey];
            explanationHTML += `<strong>${blankKey}:</strong> ${question.answers[blankKey]} - ${explanation}<br>`;
        });
        
        explanationHTML += `<br><strong>Hint:</strong> ${question.hint}</div></div>`;
    });
    
    const feedback = document.getElementById('challenge2-feedback');
    feedback.innerHTML = explanationHTML;
    
    if (correctBlanks === totalBlanks) {
        feedback.className = 'challenge-feedback success';
        feedback.innerHTML = `🎉 Excellent! You completed all fill-in-the-blanks correctly!<br><br>` + explanationHTML;
        markChallengeComplete(2, 150);
    } else {
        feedback.className = 'challenge-feedback error';
        feedback.innerHTML = `You got ${correctBlanks}/${totalBlanks} correct. Check the explanations below:<br><br>` + explanationHTML;
    }
}

function checkCalculations() {
    let totalBlanks = 0;
    let correctBlanks = 0;
    let explanationHTML = '';
    
    // Check all calculation questions and their blanks
    challengeAnswers.calculations.forEach((questionBlanks, qIndex) => {
        const question = selectedQuestions.calculations[qIndex];
        let questionCorrect = true;
        
        questionBlanks.forEach(blank => {
            totalBlanks++;
            const input = document.getElementById(blank.id);
            const userAnswer = input.value.toLowerCase().trim();
            
            let isCorrect = false;
            
            // Check if it's a numerical answer
            if (!isNaN(parseFloat(userAnswer)) && !isNaN(parseFloat(blank.correctAnswer))) {
                const userNum = parseFloat(userAnswer);
                const correctNum = parseFloat(blank.correctAnswer);
                const tolerance = blank.tolerance || 0;
                isCorrect = Math.abs(userNum - correctNum) <= tolerance;
            } else {
                // String comparison for non-numerical answers
                isCorrect = userAnswer === blank.correctAnswer.toLowerCase();
            }
            
            if (isCorrect) {
                correctBlanks++;
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else {
                questionCorrect = false;
                input.classList.remove('correct');
                input.classList.add('incorrect');
            }
        });
        
        // Add detailed explanation for each calculation
        explanationHTML += `<div class="explanation-panel active">
            <div class="explanation-title">
                <i class="fas fa-${questionCorrect ? 'check-circle' : 'calculator'}"></i> 
                Problem ${qIndex + 1} ${questionCorrect ? 'Solved!' : 'Solution'}
            </div>
            <div class="explanation-content">
                <strong>Solution:</strong> ${question.explanation}<br>
                <strong>Hint:</strong> ${question.hint}
            </div>
        </div>`;
    });
    
    const feedback = document.getElementById('challenge5-feedback');
    if (correctBlanks === totalBlanks) {
        feedback.className = 'challenge-feedback success';
        feedback.innerHTML = `🎉 Perfect calculations! You understand the quantitative aspects of PN junctions!<br><br>` + explanationHTML;
        markChallengeComplete(5, 200);
    } else {
        feedback.className = 'challenge-feedback error';
        feedback.innerHTML = `You got ${correctBlanks}/${totalBlanks} calculations correct. Study the solutions below:<br><br>` + explanationHTML;
    }
}

// Matching challenge variables and functions
let selectedMatchingItems = [];
let connectionLines = {};
let currentConnectionId = 0;

function selectMatchingItem(element) {
    if (element.classList.contains('matched')) return;
    
    // If already selected, deselect it
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selectedMatchingItems = selectedMatchingItems.filter(item => item !== element);
        return;
    }
    
    // Select the item
    element.classList.add('selected');
    selectedMatchingItems.push(element);
    
    // If we have two selected items
    if (selectedMatchingItems.length === 2) {
        const [item1, item2] = selectedMatchingItems;
        
        // Check if they are from different columns
        const isLeftColumn1 = item1.closest('.matching-column:first-child');
        const isLeftColumn2 = item2.closest('.matching-column:first-child');
        
        if (isLeftColumn1 !== isLeftColumn2) {
            // Create a pair
            createMatchingPair(item1, item2);
        }
        
        // Deselect both items
        item1.classList.remove('selected');
        item2.classList.remove('selected');
        selectedMatchingItems = [];
    }
}

function createMatchingPair(item1, item2) {
    const connectionId = `conn-${currentConnectionId++}`;
    
    // Mark items as paired
    item1.classList.add('paired', 'matched');
    item2.classList.add('paired', 'matched');
    
    // Store the connection
    connectionLines[connectionId] = { item1, item2 };
    
    // Create connection line
    drawConnectionLine(item1, item2, connectionId);
    
    // Store the connection ID on the items
    item1.dataset.connectionId = connectionId;
    item2.dataset.connectionId = connectionId;
    
    // Add click handler to remove the connection
    item1.addEventListener('click', removePairHandler);
    item2.addEventListener('click', removePairHandler);
}

function drawConnectionLine(item1, item2, connectionId) {
    const connectionsContainer = document.getElementById('matchingConnections');
    const rect1 = item1.getBoundingClientRect();
    const rect2 = item2.getBoundingClientRect();
    const containerRect = connectionsContainer.getBoundingClientRect();
    
    // Calculate positions relative to container
    const x1 = rect1.right - containerRect.left;
    const y1 = rect1.top + rect1.height/2 - containerRect.top;
    const x2 = rect2.left - containerRect.left;
    const y2 = rect2.top + rect2.height/2 - containerRect.top;
    
    // Calculate distance and angle
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    // Create line element
    const line = document.createElement('div');
    line.className = 'connection-line';
    line.id = connectionId;
    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.zIndex = '1';
    
    connectionsContainer.appendChild(line);
}

function removePairHandler(event) {
    const item = event.currentTarget;
    const connectionId = item.dataset.connectionId;
    
    if (connectionId) {
        removeMatchingPair(connectionId);
    }
}

function removeMatchingPair(connectionId) {
    // Remove the connection line
    const line = document.getElementById(connectionId);
    if (line) line.remove();
    
    // Remove paired status from items
    const { item1, item2 } = connectionLines[connectionId];
    item1.classList.remove('paired', 'matched');
    item2.classList.remove('paired', 'matched');
    
    // Remove connection ID from items
    delete item1.dataset.connectionId;
    delete item2.dataset.connectionId;
    
    // Remove event listeners
    item1.removeEventListener('click', removePairHandler);
    item2.removeEventListener('click', removePairHandler);
    
    // Remove from connection lines
    delete connectionLines[connectionId];
}

function resetMatching() {
    // Clear all connections
    const connectionsContainer = document.getElementById('matchingConnections');
    connectionsContainer.innerHTML = '';
    
    // Reset all items
    document.querySelectorAll('.matching-item').forEach(item => {
        item.classList.remove('selected', 'matched', 'paired', 'correct-match', 'incorrect-match');
        delete item.dataset.connectionId;
        item.removeEventListener('click', removePairHandler);
    });
    
    // Reset connection data
    connectionLines = {};
    selectedMatchingItems = [];
}

function checkMatching() {
    // Define correct matches
    const correctMatches = {
        'depletion': 'def-depletion',
        'forward': 'def-forward',
        'breakdown': 'def-breakdown',
        'builtin': 'def-builtin'
    };
    
    let allCorrect = true;
    let correctCount = 0;
    let totalPairs = Object.keys(connectionLines).length;
    
    // Check each connection
    for (const [connId, {item1, item2}] of Object.entries(connectionLines)) {
        const id1 = item1.dataset.id;
        const id2 = item2.dataset.id;
        
        // Check if it's a correct match
        const isCorrect = (correctMatches[id1] === id2) || (correctMatches[id2] === id1);
        
        if (isCorrect) {
            item1.classList.add('correct-match');
            item2.classList.add('correct-match');
            correctCount++;
        } else {
            item1.classList.add('incorrect-match');
            item2.classList.add('incorrect-match');
            allCorrect = false;
        }
    }
    
    const feedback = document.getElementById('challenge3-feedback');
    if (totalPairs === 4 && allCorrect) {
        feedback.className = 'challenge-feedback success';
        feedback.innerHTML = `🎉 Perfect matching! You've correctly paired all terms with their definitions!`;
        markChallengeComplete(3, 120);
    } else {
        feedback.className = 'challenge-feedback error';
        feedback.innerHTML = `
            You've matched ${correctCount}/4 pairs correctly. 
            <div class="explanation-panel active" style="margin-top: 15px;">
                <div class="explanation-title"><i class="fas fa-link"></i> Correct Matching</div>
                <div class="explanation-content">
                    <strong>Depletion Region ↔ Area depleted of mobile carriers:</strong> This region forms at the PN junction where mobile carriers (electrons and holes) have diffused away.<br><br>
                    <strong>Forward Bias ↔ P-region positive, N-region negative:</strong> This configuration reduces the potential barrier, allowing current flow.<br><br>
                    <strong>Avalanche Breakdown ↔ Rapid current increase under high reverse voltage:</strong> High electric fields accelerate carriers, creating electron-hole pairs.<br><br>
                    <strong>Built-in Potential ↔ Voltage barrier at thermal equilibrium:</strong> This natural potential difference arises from carrier diffusion.
                </div>
            </div>
        `;
    }
}

function markChallengeComplete(challengeNum, points) {
    if (!challengeStates[challengeNum]) {
        challengeStates[challengeNum] = true;
        
        // Update challenge appearance
        const challengeSection = document.getElementById(`challenge${challengeNum}`);
        challengeSection.classList.add('completed');
        
        // Update statistics
        updateChallengeStats();
        
        // Add points (if needed for tour integration)
        if (tourActive) {
            tourScore += points;
            challengesSolved++;
            updateTourScore();
        }
    }
}

function resetChallenge(challengeNum) {
    challengeStates[challengeNum] = false;
    const challengeSection = document.getElementById(`challenge${challengeNum}`);
    challengeSection.classList.remove('completed');
    
    // Clear all explanations and feedback
    challengeSection.querySelectorAll('.explanation-panel, .question-explanation, .wrong-answer-explanation').forEach(el => el.remove());
    
    // Reset specific challenge elements
    switch(challengeNum) {
        case 1:
            challengeAnswers.quiz1 = new Array(selectedQuestions.rapidFire.length).fill(null);
            challengeSection.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            break;
        case 2:
            challengeSection.querySelectorAll('.fill-blank-input').forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            });
            break;
        case 3:
            resetMatching();
            break;
        case 4:
            challengeAnswers.advanced = new Array(selectedQuestions.advancedConcepts.length).fill(null);
            challengeSection.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            break;
        case 5:
            challengeAnswers.calculations = [];
            challengeSection.querySelectorAll('.fill-blank-input').forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            });
            break;
    }
    
    // Hide feedback and hints
    const feedback = document.getElementById(`challenge${challengeNum}-feedback`);
    const hint = document.getElementById(`challenge${challengeNum}-hint`);
    if (feedback) feedback.style.display = 'none';
    if (hint) hint.classList.remove('active');
    
    updateChallengeStats();
}

function updateChallengeStats() {
    const completed = Object.values(challengeStates).filter(state => state).length;
    const total = Object.keys(challengeStates).length;
    const score = completed * 50; // 50 points per challenge
    
    document.getElementById('completedChallenges').textContent = completed;
    document.getElementById('challengeScore').textContent = score;
    
    const progressPercent = (completed / total) * 100;
    document.getElementById('overallProgress').style.width = `${progressPercent}%`;
    
    // Check if all challenges are completed
    if (completed === total) {
        setTimeout(() => {
            showAllChallengesComplete(score);
        }, 1000);
    }
}

function resetAllChallenges() {
    // Reset all challenge states
    Object.keys(challengeStates).forEach(key => {
        challengeStates[key] = false;
        const challengeSection = document.getElementById(`challenge${key}`);
        challengeSection.classList.remove('completed');
        
        // Clear all explanations
        challengeSection.querySelectorAll('.explanation-panel, .question-explanation, .wrong-answer-explanation').forEach(el => el.remove());
        
        // Hide feedback
        const feedback = document.getElementById(`challenge${key}-feedback`);
        const hint = document.getElementById(`challenge${key}-hint`);
        if (feedback) feedback.style.display = 'none';
        if (hint) hint.classList.remove('active');
    });
    
    // Select new random questions and regenerate content
    selectRandomQuestions();
    initializeChallengeAnswers();
    generateChallengeContent();
    
    // Reset matching challenge
    selectedMatchingItems.length = 0;
    challengeAnswers.matching = {};
    
    updateChallengeStats();
    
    console.log('All challenges reset with new random questions!');
}

// Challenge functions with enhanced feedback
function selectQuizAnswer(challengeNum, questionNum, answer, element) {
    // Clear previous selections for this question
    const parentQuestion = element.closest('.quiz-question');
    parentQuestion.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark this option as selected
    element.classList.add('selected');
    
    // Store the answer
    if (challengeNum === 1) {
        challengeAnswers.quiz1[questionNum - 1] = answer;
    }
}

function selectAdvancedAnswer(questionNum, answer, element) {
    // Clear previous selections for this question
    const parentQuestion = element.closest('.quiz-question');
    parentQuestion.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark this option as selected
    element.classList.add('selected');
    
    // Store the answer
    challengeAnswers.advanced[questionNum - 1] = answer;
}

function switchTab(tabButton, tabName) {
    document.querySelectorAll('.experiment-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    if (tabButton) tabButton.classList.add('active');
    currentTab = tabName;
    
    if (tabName === 'equilibrium') {
        initializeEquilibrium();
    } else if (tabName === 'biasing') {
        initializeBiasing();
    } else if (tabName === 'challenges') {
        if (!selectedQuestions.rapidFire.length) {
            initializeChallenges();
        } else {
            updateChallengeStats();
        }
    }
}

function showAllChallengesComplete(finalScore) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 100003;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.5s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 500px;
            margin: 20px;
            animation: popIn 0.6s ease-out;
        ">
            <div style="font-size: 4rem; margin-bottom: 20px;">🏆</div>
            <h2 style="
                font-size: 2rem;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 15px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            ">
                🎉 Challenges Master! 🎉
            </h2>
            <p style="
                color: #4b5563;
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 25px;
            ">
                Congratulations! You've successfully completed all 5 challenges and mastered PN junction physics with detailed explanations!
            </p>
            <div style="
                background: #f8fafc;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #6366f1;
            ">
                <div style="font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 10px;">
                    Final Score: ${finalScore} Points
                </div>
                <div style="color: #6b7280;">
                    ⭐ Perfect understanding of equilibrium physics<br>
                    ⭐ Mastery of biasing effects and current flow<br>
                    ⭐ Advanced knowledge of material properties<br>
                    ⭐ Excellent problem-solving skills<br>
                    ⭐ Deep comprehension of semiconductor principles<br>
                    ⭐ Ready for advanced semiconductor engineering!
                </div>
            </div>
            <button onclick="closeCompletionModal()" style="
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.2s;
                margin-top: 20px;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                🚀 Continue Learning
            </button>
        </div>
    `;
    
    modal.id = 'challengeCompletionModal';
    document.body.appendChild(modal);
    
    createConfetti();
}

function closeCompletionModal() {
    const modal = document.getElementById('challengeCompletionModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'][Math.floor(Math.random() * 5)]};
                z-index: 100004;
                animation: fall ${2 + Math.random() * 3}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
}

// Initialize challenges with random questions
function initializeChallenges() {
    if (!selectedQuestions.rapidFire.length) {
        selectRandomQuestions();
        initializeChallengeAnswers();
        generateChallengeContent();
    }
    updateChallengeStats();
}

// Enhanced question generation with explanations
function generateChallengeContent() {
    generateRapidFireQuiz();
    generateFillInTheBlanks();
    generateAdvancedConcepts();
    generateCalculationChallenge();
}

function generateRapidFireQuiz() {
    const container = document.getElementById('challenge1');
    if (!container) return;
    
    let questionsContainer = container.querySelector('.quiz-question')?.parentElement;
    if (!questionsContainer) {
        questionsContainer = document.createElement('div');
        const controlsElement = container.querySelector('.challenge-controls');
        if (controlsElement) {
            container.insertBefore(questionsContainer, controlsElement);
        } else {
            container.appendChild(questionsContainer);
        }
    }
    
    questionsContainer.innerHTML = '';
    
    selectedQuestions.rapidFire.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <h4>${index + 1}. ${question.q}</h4>
            <div class="quiz-options">
                <div class="quiz-option" onclick="selectQuizAnswer(1, ${index + 1}, true, this)">True</div>
                <div class="quiz-option" onclick="selectQuizAnswer(1, ${index + 1}, false, this)">False</div>
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

function generateAdvancedConcepts() {
    const container = document.getElementById('challenge4');
    if (!container) return;
    
    let questionsContainer = container.querySelector('.quiz-question')?.parentElement;
    if (!questionsContainer) {
        questionsContainer = document.createElement('div');
        const controlsElement = container.querySelector('.challenge-controls');
        if (controlsElement) {
            container.insertBefore(questionsContainer, controlsElement);
        } else {
            container.appendChild(questionsContainer);
        }
    }
    
    questionsContainer.innerHTML = '';
    
    selectedQuestions.advancedConcepts.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        const optionsHtml = question.options.map(option => 
            `<div class="quiz-option" onclick="selectAdvancedAnswer(${index + 1}, '${option}', this)">${option}</div>`
        ).join('');
        
        questionDiv.innerHTML = `
            <h4>${index + 1}. ${question.q}</h4>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

function generateFillInTheBlanks() {
    const container = document.getElementById('challenge2');
    if (!container) return;
    
    let questionsContainer = container.querySelector('.fill-blank-container')?.parentElement;
    if (!questionsContainer) {
        questionsContainer = document.createElement('div');
        const controlsElement = container.querySelector('.challenge-controls');
        if (controlsElement) {
            container.insertBefore(questionsContainer, controlsElement);
        } else {
            container.appendChild(questionsContainer);
        }
    }
    
    questionsContainer.innerHTML = '';
    
    let blankCounter = 1;
    challengeAnswers.fillBlanks = [];
    
    selectedQuestions.fillInTheBlanks.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'fill-blank-container';
        
        let processedText = question.text;
        const blanksInQuestion = [];
        
        Object.keys(question.answers).forEach(blankKey => {
            const inputId = `blank${blankCounter}`;
            const regex = new RegExp(`{${blankKey}}`, 'g');
            processedText = processedText.replace(regex, 
                `<input type="text" class="fill-blank-input" id="${inputId}" placeholder="?">`
            );
            
            blanksInQuestion.push({
                id: inputId,
                correctAnswer: question.answers[blankKey]
            });
            blankCounter++;
        });
        
        challengeAnswers.fillBlanks.push(blanksInQuestion);
        
        questionDiv.innerHTML = `<div class="fill-blank-text">${processedText}</div>`;
        questionsContainer.appendChild(questionDiv);
    });
}

function generateCalculationChallenge() {
    const container = document.getElementById('challenge5');
    if (!container) return;
    
    let questionsContainer = container.querySelector('.fill-blank-container')?.parentElement;
    if (!questionsContainer) {
        questionsContainer = document.createElement('div');
        const controlsElement = container.querySelector('.challenge-controls');
        if (controlsElement) {
            container.insertBefore(questionsContainer, controlsElement);
        } else {
            container.appendChild(questionsContainer);
        }
    }
    
    questionsContainer.innerHTML = '';
    
    let blankCounter = 1;
    challengeAnswers.calculations = [];
    
    selectedQuestions.calculations.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'fill-blank-container';
        
        let processedText = question.problem;
        const blanksInQuestion = [];
        
        Object.keys(question.answers).forEach(blankKey => {
            const inputId = `calc${blankCounter}`;
            const regex = new RegExp(`{${blankKey}}`, 'g');
            processedText = processedText.replace(regex, 
                `<input type="text" class="fill-blank-input" id="${inputId}" placeholder="?">`
            );
            
            blanksInQuestion.push({
                id: inputId,
                correctAnswer: question.answers[blankKey],
                tolerance: question.tolerance || 0
            });
            blankCounter++;
        });
        
        challengeAnswers.calculations.push(blanksInQuestion);
        
        questionDiv.innerHTML = `
            <div class="fill-blank-text">
                <strong>Problem ${qIndex + 1}:</strong> ${processedText}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

function showFillBlanksHint() {
    const feedback = document.getElementById('challenge2-feedback');
    feedback.className = 'challenge-feedback';
    feedback.style.display = 'block';
    
    let hintHTML = '<strong>💡 Comprehensive Hints:</strong><br><br>';
    selectedQuestions.fillInTheBlanks.forEach((question, index) => {
        hintHTML += `<div class="concept-box">
            <strong>Question ${index + 1} Hint:</strong> ${question.hint}<br>
        `;
        Object.keys(question.explanations).forEach(key => {
            hintHTML += `• ${key}: ${question.explanations[key]}<br>`;
        });
        hintHTML += `</div>`;
    });
    
    feedback.innerHTML = hintHTML;
}

function showCalculationHint() {
    const feedback = document.getElementById('challenge5-feedback');
    feedback.className = 'challenge-feedback';
    feedback.style.display = 'block';
    
    let hintHTML = '<strong>💡 Formula Hints and Solutions:</strong><br><br>';
    selectedQuestions.calculations.forEach((question, index) => {
        hintHTML += `<div class="concept-box">
            <strong>Problem ${index + 1}:</strong><br>
            <strong>Hint:</strong> ${question.hint}<br>
            <strong>Approach:</strong> ${question.explanation}
        </div>`;
    });
    
    feedback.innerHTML = hintHTML;
}

// Physics calculation functions
// Physical constants
const q = 1.602e-19;
const k = 1.38e-23;
const k_eV = 8.617e-5;

// Material properties
const materials = {
    si: { Eg: 1.12, ni_300: 1.45e10, name: 'Silicon', epsilon_r: 11.7 },
    ge: { Eg: 0.67, ni_300: 2.4e13, name: 'Germanium', epsilon_r: 16.0 },
    gaas: { Eg: 1.42, ni_300: 1.8e6, name: 'Gallium Arsenide', epsilon_r: 13.1 }
};

// Preset configurations
const equilibriumPresets = {
    balanced: { pDoping: 16, nDoping: 16, temperature: 300 },
    p_heavy: { pDoping: 18, nDoping: 15, temperature: 300 },
    n_heavy: { pDoping: 15, nDoping: 18, temperature: 300 },
    light_doped: { pDoping: 14.5, nDoping: 14.5, temperature: 300 }
};

const biasPresets = {
    equilibrium: { voltage: 0, pDoping: 16, nDoping: 16, temperature: 300 },
    forward_low: { voltage: 0.4, pDoping: 16, nDoping: 16, temperature: 300 },
    forward_high: { voltage: 0.8, pDoping: 16, nDoping: 16, temperature: 300 },
    reverse_low: { voltage: -1.0, pDoping: 16, nDoping: 16, temperature: 300 },
    reverse_high: { voltage: -3.0, pDoping: 16, nDoping: 16, temperature: 300 },
    breakdown: { voltage: -5.0, pDoping: 17, nDoping: 17, temperature: 300 }
};

function initializeEquilibrium() {
    updateEquilibriumVisualization();
    setupEquilibriumControls();
}

function setupEquilibriumControls() {
    const controls = ['pDoping', 'nDoping', 'temperature', 'material'];
    controls.forEach(controlId => {
        const element = document.getElementById(controlId);
        if (element) {
            element.addEventListener('input', updateEquilibriumVisualization);
            element.addEventListener('change', updateEquilibriumVisualization);
        }
    });
}

function updateEquilibriumVisualization() {
    const pDoping = parseFloat(document.getElementById('pDoping').value);
    const nDoping = parseFloat(document.getElementById('nDoping').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const material = document.getElementById('material').value;
    
    document.getElementById('pDopingValue').textContent = `10${formatSuperscript(pDoping)} cm⁻³`;
    document.getElementById('nDopingValue').textContent = `10${formatSuperscript(nDoping)} cm⁻³`;
    document.getElementById('temperatureValue').textContent = `${temperature} K`;
    
    const Na = Math.pow(10, pDoping);
    const Nd = Math.pow(10, nDoping);
    const T = temperature;
    const mat = materials[material];
    
    const ni = mat.ni_300 * Math.pow(T/300, 1.5) * Math.exp(-mat.Eg/(2*k_eV) * (1/T - 1/300));
    const Vbi = (k_eV * T) * Math.log((Na * Nd) / (ni * ni));
    
    const epsilon_0 = 8.854e-12;
    const epsilon_r = mat.epsilon_r;
    const epsilon = epsilon_0 * epsilon_r;
    const q = 1.602e-19;
    
    const Na_m3 = Na * 1e6;
    const Nd_m3 = Nd * 1e6;
    
    const W_m = Math.sqrt(2 * epsilon * Vbi / q * (Na_m3 + Nd_m3) / (Na_m3 * Nd_m3));
    const W_micrometers = W_m * 1e6;
    const Emax_V_m = W_m > 0 ? (2 * Vbi / W_m) : 0;
    const Emax_V_micrometer = Emax_V_m * 1e-6;
    
    const builtInElement = document.getElementById('builtInPotential');
    const depletionWidthElement = document.getElementById('depletionWidth');
    const maxFieldElement = document.getElementById('maxElectricField');
    
    if (builtInElement) builtInElement.textContent = `${Vbi.toFixed(3)} V`;
    if (depletionWidthElement) depletionWidthElement.textContent = `${W_micrometers.toFixed(3)} μm`;
    if (maxFieldElement) maxFieldElement.textContent = `${Emax_V_micrometer.toFixed(2)} V/μm`;
    
    const Wp_fraction = Nd / (Na + Nd);
    const Wn_fraction = Na / (Na + Nd);
    
    updateEquilibriumDepletionRegion(W_micrometers, Wp_fraction, Wn_fraction, Na, Nd);
    updateEquilibriumChargeDistribution(Na, Nd, temperature);
    updateEquilibriumElectricField(Emax_V_micrometer, W_micrometers);
}

function initializeBiasing() {
    updateBiasingVisualization();
    setupBiasingControls();
}

function setupBiasingControls() {
    const controls = ['biasVoltage', 'biasPDoping', 'biasNDoping', 'biasTemperature'];
    controls.forEach(controlId => {
        const element = document.getElementById(controlId);
        if (element) {
            element.addEventListener('input', updateBiasingVisualization);
        }
    });
}

function updateBiasingVisualization() {
    const biasVoltage = parseFloat(document.getElementById('biasVoltage').value);
    const pDoping = parseFloat(document.getElementById('biasPDoping').value);
    const nDoping = parseFloat(document.getElementById('biasNDoping').value);
    const temperature = parseFloat(document.getElementById('biasTemperature').value);
    
    document.getElementById('biasVoltageValue').textContent = `${biasVoltage.toFixed(1)} V`;
    document.getElementById('biasPDopingValue').textContent = `10${formatSuperscript(pDoping)} cm⁻³`;
    document.getElementById('biasNDopingValue').textContent = `10${formatSuperscript(nDoping)} cm⁻³`;
    document.getElementById('biasTemperatureValue').textContent = `${temperature} K`;
    
    const Na = Math.pow(10, pDoping);
    const Nd = Math.pow(10, nDoping);
    const T = temperature;
    const V = biasVoltage;
    const mat = materials['si'];
    
    const ni = mat.ni_300 * Math.pow(T/300, 1.5) * Math.exp(-mat.Eg/(2*k_eV) * (1/T - 1/300));
    const Vbi = (k_eV * T) * Math.log((Na * Nd) / (ni * ni));
    
    const epsilon_0 = 8.854e-12;
    const epsilon = mat.epsilon_r * epsilon_0;
    const bias_term = Vbi - V;

    let W;
    if (bias_term > 0) {
        const Na_m3 = Na * 1e6;
        const Nd_m3 = Nd * 1e6;
        W = Math.sqrt(2 * epsilon * bias_term / q * (Na_m3 + Nd_m3) / (Na_m3 * Nd_m3));
    } else {
        W = 0;
    }

    const A = 1e-4;
    const Na_m3 = Na * 1e6;
    const Nd_m3 = Nd * 1e6;
    
    let Is_base = 1e-15;
    const doping_factor = Math.pow((Na_m3 * Nd_m3) / 1e32, 0.1);
    const temp_factor = Math.pow(T/300, 2);
    const ni_factor = Math.pow(ni / 1.45e10, 2);
    
    let Is = Is_base * doping_factor * temp_factor * ni_factor;
    
    if (!isFinite(Is) || Is <= 0) {
        Is = 1e-15;
    }
    
    Is = Math.max(1e-18, Math.min(1e-9, Is));
    
    const n = 1.2;
    const Vt_volts = k_eV * T;

    let I;
    if (V >= 0) {
        I = Is * (Math.exp(V / (n * Vt_volts)) - 1);
        I = Math.min(I, 10);
    } else if (V > -5) {
        I = -Is * (1 + Math.abs(V) * 0.1);
    } else {
        I = -Is * Math.exp(0.5 * (Math.abs(V) - 5));
        I = Math.max(I, -10);
    }

    const P = Math.abs(V * I);

    const biasStatus = document.getElementById('biasStatus');
    if (V > 0.1) {
        biasStatus.textContent = `Forward Bias (${V.toFixed(1)} V)`;
        biasStatus.style.color = '#059669';
    } else if (V < -0.1) {
        biasStatus.textContent = `Reverse Bias (${V.toFixed(1)} V)`;
        biasStatus.style.color = '#dc2626';
    } else {
        biasStatus.textContent = 'No Bias Applied';
        biasStatus.style.color = '#1f2937';
    }

    if (V <= -4.5) {
        if (!breakdownActive) {
            startBreakdownAnimation();
        }
        biasStatus.textContent = `⚠️ AVALANCHE BREAKDOWN (${V.toFixed(1)} V)`;
        biasStatus.style.color = '#dc2626';
        biasStatus.style.fontWeight = 'bold';
    } else {
        if (breakdownActive) {
            stopBreakdownAnimation();
        }
    }

    document.getElementById('diodeCurrent').textContent = formatCurrent(I);
    document.getElementById('voltageDrop').textContent = `${V.toFixed(2)} V`;
    document.getElementById('biasDepletionWidth').textContent = `${(W * 1e6).toFixed(2)} μm`;
    document.getElementById('powerDissipation').textContent = `${P.toExponential(2)} W`;

    updateDepletionRegion(W, V, 'bias');
    updateChargeDistribution(Na, Nd, V, 'bias');
    updateElectricField(bias_term > 0 && W > 0 ? (2 * bias_term / W) : 0, V, 'bias');
}

// Utility functions
function formatSuperscript(value) {
    const superscripts = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        '.': '·', '-': '⁻'
    };
    return value.toString().split('').map(char => superscripts[char] || char).join('');
}

function formatCurrent(current) {
    if (Math.abs(current) < 1e-12) {
        return '0.00 A';
    } else if (Math.abs(current) < 1e-9) {
        return `${(current * 1e12).toFixed(2)} pA`;
    } else if (Math.abs(current) < 1e-6) {
        return `${(current * 1e9).toFixed(2)} nA`;
    } else if (Math.abs(current) < 1e-3) {
        return `${(current * 1e6).toFixed(2)} μA`;
    } else if (Math.abs(current) < 1) {
        return `${(current * 1e3).toFixed(2)} mA`;
    } else {
        return `${current.toFixed(3)} A`;
    }
}

function applyEquilibriumPreset(presetName) {
    const preset = equilibriumPresets[presetName];
    if (!preset) return;

    document.getElementById('pDoping').value = preset.pDoping;
    document.getElementById('nDoping').value = preset.nDoping;
    document.getElementById('temperature').value = preset.temperature;
    updateEquilibriumVisualization();
}

function applyPreset(presetName) {
    const preset = biasPresets[presetName];
    if (!preset) return;

    document.getElementById('biasVoltage').value = preset.voltage;
    document.getElementById('biasPDoping').value = preset.pDoping;
    document.getElementById('biasNDoping').value = preset.nDoping;
    document.getElementById('biasTemperature').value = preset.temperature;
    updateBiasingVisualization();
}

// Visualization update functions
function updateEquilibriumDepletionRegion(totalWidth_microns, Wp_fraction, Wn_fraction, Na, Nd) {
    const depletionElement = document.getElementById('depletionRegion');
    
    if (depletionElement) {
        const minVisualWidth = 5;
        const maxVisualWidth = 25;
        const minPhysicalWidth = 0.05;
        const maxPhysicalWidth = 5.0;
        
        const clampedWidth = Math.max(minPhysicalWidth, Math.min(maxPhysicalWidth, totalWidth_microns));
        const visualWidth = minVisualWidth + 
            (maxVisualWidth - minVisualWidth) * 
            (clampedWidth - minPhysicalWidth) / (maxPhysicalWidth - minPhysicalWidth);
        
        const dopingRatio = Na / Nd;
        let centerOffset = 0;
        
        if (dopingRatio > 2) {
            centerOffset = Math.min(3, Math.log10(dopingRatio) * 1.5);
        } else if (dopingRatio < 0.5) {
            centerOffset = -Math.min(3, Math.log10(1/dopingRatio) * 1.5);
        }
        
        const leftPos = 50 - visualWidth/2 + centerOffset;
        
        depletionElement.style.left = `${leftPos}%`;
        depletionElement.style.width = `${visualWidth}%`;
        depletionElement.style.background = 'linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6)';
    }
}

function updateEquilibriumChargeDistribution(Na, Nd, temperature) {
    const chargeContainer = document.getElementById('chargeIndicators');
    
    if (chargeContainer) {
        chargeContainer.innerHTML = '';
        
        const pCharges = Math.max(3, Math.min(10, Math.floor(Math.log10(Na) - 13)));
        const nCharges = Math.max(3, Math.min(10, Math.floor(Math.log10(Nd) - 13)));
        
        for (let i = 0; i < pCharges; i++) {
            const posCharge = createChargeElement('+', 'positive-charge');
            const xPos = 5 + (i * 35 / pCharges);
            const yPos = 15 + ((i % 3) * 25) + (Math.random() * 10);
            
            posCharge.style.left = `${xPos}%`;
            posCharge.style.top = `${yPos}%`;
            chargeContainer.appendChild(posCharge);
        }
        
        for (let i = 0; i < nCharges; i++) {
            const negCharge = createChargeElement('-', 'negative-charge');
            const xPos = 60 + (i * 35 / nCharges);
            const yPos = 15 + ((i % 3) * 25) + (Math.random() * 10);
            
            negCharge.style.left = `${xPos}%`;
            negCharge.style.top = `${yPos}%`;
            chargeContainer.appendChild(negCharge);
        }
    }
}

function updateEquilibriumElectricField(maxField_V_micron, width_microns) {
    const fieldContainer = document.getElementById('electricField');
    
    if (fieldContainer) {
        fieldContainer.innerHTML = '';
        
        const numLines = Math.max(2, Math.min(5, Math.floor(maxField_V_micron / 0.5)));
        
        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.className = 'field-line';
            
            const yPos = 25 + (i * 50 / numLines);
            line.style.top = `${yPos}%`;
            line.style.left = '45%';
            line.style.width = '10%';
            line.style.height = '2px';
            line.style.background = `linear-gradient(90deg, #7c3aed, #a855f7)`;
            
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            line.appendChild(arrow);
            fieldContainer.appendChild(line);
        }
    }
}

function updateDepletionRegion(width, bias, prefix = '') {
    const depletionElement = document.getElementById(prefix + 'DepletionRegion') || 
                          document.getElementById('depletionRegion');
    
    if (depletionElement) {
        const widthMicrons = width * 1e6;
        const normalizedWidth = Math.max(2, Math.min(25, widthMicrons * 10));
        const leftPos = 50 - normalizedWidth / 2;
        
        depletionElement.style.left = `${leftPos}%`;
        depletionElement.style.width = `${normalizedWidth}%`;
        
        if (bias > 0.1) {
            depletionElement.style.background = 'linear-gradient(90deg, #fef3c7, #fed7aa)';
            depletionElement.style.opacity = '0.6';
        } else if (bias < -0.1) {
            depletionElement.style.background = 'linear-gradient(90deg, #e5e7eb, #d1d5db)';
            depletionElement.style.opacity = '0.9';
        } else {
            depletionElement.style.background = 'linear-gradient(90deg, #f3f4f6, #e5e7eb)';
            depletionElement.style.opacity = '0.8';
        }
    }
}

function updateChargeDistribution(Na, Nd, bias, prefix = '') {
    const chargeContainer = document.getElementById(prefix + 'ChargeIndicators') || 
                          document.getElementById('chargeIndicators');
    
    if (chargeContainer) {
        chargeContainer.innerHTML = '';
        
        const numCharges = Math.max(3, Math.min(8, Math.log10(Na) - 14));
        
        for (let i = 0; i < numCharges; i++) {
            const posCharge = createChargeElement('+', 'positive-charge');
            posCharge.style.left = `${10 + i * 8}%`;
            posCharge.style.top = `${20 + (i % 3) * 20}%`;
            chargeContainer.appendChild(posCharge);
            
            const negCharge = createChargeElement('-', 'negative-charge');
            negCharge.style.right = `${10 + i * 8}%`;
            negCharge.style.top = `${20 + (i % 3) * 20}%`;
            chargeContainer.appendChild(negCharge);
        }
    }
}

function updateElectricField(maxField, bias, prefix = '') {
    const fieldContainer = document.getElementById(prefix + 'ElectricField') || 
                         document.getElementById('electricField');
    
    if (fieldContainer) {
        fieldContainer.innerHTML = '';
        
        const numLines = 3;
        const fieldStrength = Math.min(1, Math.abs(maxField) / 1e6);
        
        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.className = 'field-line';
            line.style.top = `${30 + i * 15}%`;
            line.style.left = '45%';
            line.style.width = '10%';
            line.style.opacity = fieldStrength;
            
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            line.appendChild(arrow);
            fieldContainer.appendChild(line);
        }
    }
}

function createChargeElement(sign, className) {
    const charge = document.createElement('div');
    charge.className = `charge ${className}`;
    charge.textContent = sign;
    return charge;
}

// Breakdown animation functions
function startBreakdownAnimation() {
    if (breakdownActive) return;
    
    breakdownActive = true;
    const visualization = document.getElementById('biasingVisualization');
    const sparksContainer = document.getElementById('breakdownSparks');
    const warning = document.getElementById('breakdownWarning');
    const electricField = document.getElementById('biasElectricField');
    
    visualization.classList.add('breakdown');
    warning.classList.add('active');
    electricField.classList.add('breakdown');
    createBreakdownSparks(sparksContainer);
}

function stopBreakdownAnimation() {
    if (!breakdownActive) return;
    
    breakdownActive = false;
    const visualization = document.getElementById('biasingVisualization');
    const sparksContainer = document.getElementById('breakdownSparks');
    const warning = document.getElementById('breakdownWarning');
    const electricField = document.getElementById('biasElectricField');
    
    visualization.classList.remove('breakdown');
    warning.classList.remove('active');
    electricField.classList.remove('breakdown');
    sparksContainer.innerHTML = '';
}

function createBreakdownSparks(container) {
    container.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        const x = 40 + Math.random() * 20;
        const y = 20 + Math.random() * 60;
        
        spark.style.left = `${x}%`;
        spark.style.top = `${y}%`;
        spark.style.animationDelay = `${Math.random() * 0.5}s`;
        
        container.appendChild(spark);
    }
}

// Reset functions
function resetEquilibrium() {
    document.getElementById('pDoping').value = 16;
    document.getElementById('nDoping').value = 16;
    document.getElementById('temperature').value = 300;
    document.getElementById('material').value = 'si';
    updateEquilibriumVisualization();
}

function resetBiasing() {
    document.getElementById('biasVoltage').value = 0;
    document.getElementById('biasPDoping').value = 16;
    document.getElementById('biasNDoping').value = 16;
    document.getElementById('biasTemperature').value = 300;
    updateBiasingVisualization();
}

// Tour system
const tourSteps = [
    {
        title: "Welcome to the PN Junction Lab! 🎓",
        content: "This interactive simulation will teach you about PN junction physics through hands-on experiments and challenges. Let's start by exploring what makes a PN junction special!",
        target: ".container",
        challenge: null,
        position: "center"
    },
    {
        title: "Understanding the Visualization",
        content: "This is your PN junction cross-section. The yellow area represents the P-type region (positive holes), and the blue area represents the N-type region (negative electrons). The gray area in between is the depletion region.",
        target: "#equilibriumVisualization",
        challenge: null,
        position: "right"
    },
    {
        title: "🎯 Challenge 1: Material Detective Mission",
        content: "Every PN junction has a built-in potential barrier! Different semiconductor materials create different barrier heights. Your mission: discover how Silicon compares to Germanium!",
        target: "#material",
        challenge: {
            type: "material_comparison",
            instruction: "📝 STEP 1: Find the 'Material' dropdown below (it currently shows 'Silicon (Si)')\n📝 STEP 2: Click it and select 'Germanium (Ge)'\n📝 STEP 3: Look at the Built-in Potential measurement - it should decrease from ~0.65V to ~0.35V!",
            target_element: "#material",
            target_value: "ge",
            hint: "🔍 The Material dropdown is highlighted below. It's currently set to 'Silicon (Si)' - click on it and change to 'Germanium (Ge)'. Watch the Built-in Potential value in the measurements panel change!",
            reward: 100,
            secondary_highlight: "#builtInPotential"
        },
        position: "top"
    },
    {
        title: "Great Discovery! 🎉",
        content: "Excellent! You discovered that different materials have different built-in potentials. Germanium has a smaller bandgap than Silicon, resulting in a lower built-in potential. This is fundamental to semiconductor device design!",
        target: "#material",
        challenge: null,
        position: "bottom"
    },
    {
        title: "🎯 Challenge 2: The Doping Effect",
        content: "Now let's explore how doping affects the depletion region. Doping concentration is crucial for device performance!",
        target: "#pDoping",
        challenge: {
            type: "range_target",
            instruction: "Increase the P-type doping to 10¹⁸ cm⁻³ and observe what happens to the depletion width.",
            target_element: "#pDoping",
            target_value: 18,
            tolerance: 0.1,
            hint: "Move the P-Type Doping slider all the way to the right. Watch how the depletion region changes!",
            reward: 150
        },
        position: "left"
    },
    {
        title: "Asymmetric Depletion! ⚖️",
        content: "Fantastic! You've created an asymmetric junction. When one side is much more heavily doped, the depletion region extends mainly into the lightly doped side. This principle is used in many semiconductor devices!",
        target: "#depletionRegion",
        challenge: null,
        position: "right"
    },
    {
        title: "🎯 Challenge 3: Temperature Effects",
        content: "Temperature significantly affects semiconductor behavior. Let's see how it impacts our junction!",
        target: "#temperature",
        challenge: {
            type: "temperature_experiment",
            instruction: "Heat up the junction to 400K and observe how the built-in potential changes.",
            target_element: "#temperature",
            target_value: 400,
            tolerance: 5,
            hint: "Move the Temperature slider to the maximum value (400K). Higher temperature means more thermal energy!",
            reward: 120
        },
        position: "left"
    },
    {
        title: "Now Let's Apply Some Bias! ⚡",
        content: "You've mastered equilibrium behavior! Now let's move to the exciting part - applying external voltage to see current flow and dynamic behavior.",
        target: ".tab:nth-child(2)",
        challenge: {
            type: "tab_switch",
            instruction: "Click on the 'Biasing Effects' tab to explore how external voltage affects the junction.",
            target_element: "[onclick*='biasing']",
            hint: "Click on the 'Biasing Effects' tab at the top of the simulation.",
            reward: 50
        },
        position: "bottom"
    },
    {
        title: "🎯 Challenge 4: Forward Bias Magic",
        content: "Forward bias is when we make current flow through the diode. Let's create some electrical magic!",
        target: "#biasVoltage",
        challenge: {
            type: "forward_bias",
            instruction: "Apply a forward bias of +0.7V and observe the dramatic current increase!",
            target_element: "#biasVoltage",
            target_value: 0.7,
            tolerance: 0.05,
            hint: "Move the Applied Voltage slider to the right until it reads approximately 0.7V. This is near the 'turn-on' voltage!",
            reward: 200
        },
        position: "left"
    },
    {
        title: "Exponential Current! 📈",
        content: "Amazing! You've witnessed the exponential nature of diode current. Notice how a small voltage change creates a huge current increase. This is the essence of the diode's switching behavior!",
        target: "#diodeCurrent",
        challenge: null,
        position: "right"
    },
    {
        title: "🎯 Challenge 5: Reverse Bias Protection",
        content: "Now let's see how diodes block current in reverse bias - their protective superpower!",
        target: "#biasVoltage",
        challenge: {
            type: "reverse_bias",
            instruction: "Apply a reverse bias of -2V and observe how the diode blocks current flow.",
            target_element: "#biasVoltage",
            target_value: -2.0,
            tolerance: 0.1,
            hint: "Move the Applied Voltage slider to the left until it reads -2.0V. See how the current stays very small!",
            reward: 150
        },
        position: "left"
    },
    {
        title: "🎯 Challenge 6: The Breakdown Adventure",
        content: "Every diode has a breakdown limit. Let's explore this dramatic phenomenon! Watch for the spectacular breakdown animation!",
        target: "#biasVoltage",
        challenge: {
            type: "breakdown_exploration",
            instruction: "Push the reverse voltage to -5V to trigger avalanche breakdown and see the sparks fly!",
            target_element: "#biasVoltage",
            target_value: -5.0,
            tolerance: 0.1,
            hint: "Move the Applied Voltage slider all the way to the left (-5V). This triggers avalanche breakdown with amazing visual effects!",
            reward: 250
        },
        position: "left"
    },
    {
        title: "🏆 Congratulations, Semiconductor Expert!",
        content: "You've successfully completed the PN Junction mastery tour! You now understand equilibrium physics, biasing effects, current flow, breakdown phenomena, and device design principles. Ready for more challenges? Check out the Challenges tab!",
        target: ".container",
        challenge: null,
        position: "center"
    }
];

function cleanupTourHighlights() {
    document.querySelectorAll('.highlight-element').forEach(el => {
        el.classList.remove('highlight-element');
    });
    
    const secondarySpotlight = document.getElementById('tourSpotlightSecondary');
    if (secondarySpotlight) {
        secondarySpotlight.style.display = 'none';
    }
}

function startGuidedTour() {
    console.log('Starting guided tour...');
    tourActive = true;
    currentTourStep = 0;
    tourScore = 0;
    challengesSolved = 0;
    hintsUsed = 0;
    
    // Find the equilibrium tab and switch to it
    const equilibriumTab = document.querySelector('[onclick*="equilibrium"]') || 
                          document.querySelector('.tab.active') ||
                          document.querySelector('.tab');
    console.log('Found equilibrium tab:', equilibriumTab);
    switchTab(equilibriumTab, 'equilibrium');
    
    const overlay = document.getElementById('tourOverlay');
    const popup = document.getElementById('tourPopup');
    const score = document.getElementById('tourScore');
    
    console.log('Tour elements found:', {overlay, popup, score});
    
    if (overlay) {
        overlay.style.display = 'block';
        overlay.classList.add('active');
    }
    if (popup) {
        popup.style.display = 'block';
        popup.style.visibility = 'visible';
    }
    if (score) {
        score.style.display = 'block';
        score.classList.add('active');
    }
    
    document.body.style.pointerEvents = 'auto';
    
    showTourStep();
    updateTourScore();
}

function showTourStep() {
    console.log('Showing tour step:', currentTourStep);
    const step = tourSteps[currentTourStep];
    console.log('Current step:', step);
    const overlay = document.getElementById('tourOverlay');
    const popup = document.getElementById('tourPopup');
    
    cleanupTourHighlights();
    overlay.classList.add('active');
    
    document.getElementById('tourStepNumber').textContent = currentTourStep + 1;
    document.getElementById('tourTitle').textContent = step.title;
    document.getElementById('tourContent').textContent = step.content;
    document.getElementById('tourProgressBar').style.width = `${((currentTourStep + 1) / tourSteps.length) * 100}%`;
    
    const challengeContainer = document.getElementById('tourChallenge');
    challengeContainer.innerHTML = '';
    
    if (step.challenge) {
        const challengeEl = document.createElement('div');
        challengeEl.className = 'tour-challenge';
        challengeEl.innerHTML = `
            <div class="tour-challenge-title">
                <i class="fas fa-bullseye"></i>
                Challenge Mission
            </div>
            <div class="tour-challenge-content">
                ${step.challenge.instruction}
            </div>
            <div class="challenge-hint" style="display: none;" id="challengeHint">
                💡 Hint: ${step.challenge.hint}
            </div>
            <button class="tour-btn tour-btn-secondary" onclick="showHint()" style="margin-top: 10px; font-size: 0.8rem;">
                Need a hint? 💡
            </button>
        `;
        challengeContainer.appendChild(challengeEl);
        
        document.getElementById('tourNextBtn').disabled = true;
        startChallengeMonitoring(step.challenge);
    } else {
        document.getElementById('tourNextBtn').disabled = false;
    }
    
    positionTourElements(step);
    
    // Add a small delay to ensure proper positioning
    setTimeout(() => {
        popup.classList.add('active');
    }, 100);
    
    document.getElementById('tourPrevBtn').disabled = currentTourStep === 0;
    
    const nextBtn = document.getElementById('tourNextBtn');
    if (currentTourStep === tourSteps.length - 1) {
        nextBtn.textContent = 'Finish Tour';
        nextBtn.onclick = () => finalizeTour();
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.onclick = nextTourStep;
    }
    
    updateTourScore();
}

function finalizeTour() {
    tourActive = false;
    cleanupTourHighlights();
    
    const overlay = document.getElementById('tourOverlay');
    const popup = document.getElementById('tourPopup');
    const score = document.getElementById('tourScore');
    const spotlight = document.getElementById('tourSpotlight');
    const secondarySpotlight = document.getElementById('tourSpotlightSecondary');
    
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }
    if (popup) {
        popup.classList.remove('active');
        popup.style.display = 'none';
    }
    if (score) {
        score.classList.remove('active');
        score.style.display = 'none';
    }
    if (spotlight) {
        spotlight.style.display = 'none';
    }
    if (secondarySpotlight) {
        secondarySpotlight.style.display = 'none';
    }
    
    document.querySelectorAll('.highlight-element').forEach(el => {
        el.classList.remove('highlight-element');
    });
    
    setTimeout(() => {
        const finalAchievement = {
            title: '🏆 Semiconductor Expert!',
            description: `Congratulations! You've completed the guided tour with ${challengesSolved} challenges solved and ${tourScore} points earned! You now understand equilibrium physics, biasing effects, current flow, breakdown phenomena, and device design principles.`,
            icon: '🎓'
        };
        showAchievement(finalAchievement);
    }, 300);
}

function positionTourElements(step) {
    const target = document.querySelector(step.target);
    const popup = document.getElementById('tourPopup');
    const spotlight = document.getElementById('tourSpotlight');
    const secondarySpotlight = document.getElementById('tourSpotlightSecondary');
    
    console.log('Positioning tour elements for step:', step);
    console.log('Target found:', target);
    
    if (target) {
        const rect = target.getBoundingClientRect();
        console.log('Target rect:', rect);
        
        spotlight.style.left = `${rect.left - 10}px`;
        spotlight.style.top = `${rect.top - 10}px`;
        spotlight.style.width = `${rect.width + 20}px`;
        spotlight.style.height = `${rect.height + 20}px`;
        spotlight.style.display = 'block';
        
        target.classList.add('highlight-element');
        
        if (step.challenge && step.challenge.secondary_highlight) {
            const secondaryTarget = document.querySelector(step.challenge.secondary_highlight);
            if (secondaryTarget) {
                const secondaryRect = secondaryTarget.getBoundingClientRect();
                secondarySpotlight.style.left = `${secondaryRect.left - 5}px`;
                secondarySpotlight.style.top = `${secondaryRect.top - 5}px`;
                secondarySpotlight.style.width = `${secondaryRect.width + 10}px`;
                secondarySpotlight.style.height = `${secondaryRect.height + 10}px`;
                secondarySpotlight.style.display = 'block';
                
                secondaryTarget.classList.add('highlight-element');
            }
        } else {
            secondarySpotlight.style.display = 'none';
        }
        
        const popupRect = popup.getBoundingClientRect();
        let left, top;
        
        switch (step.position) {
            case 'right':
                left = rect.right + 20;
                top = rect.top;
                break;
            case 'left':
                left = rect.left - popupRect.width - 20;
                top = rect.top;
                break;
            case 'top':
                left = rect.left + (rect.width - popupRect.width) / 2;
                top = rect.top - popupRect.height - 20;
                break;
            case 'bottom':
                left = rect.left + (rect.width - popupRect.width) / 2;
                top = rect.bottom + 20;
                break;
            case 'center':
                left = (window.innerWidth - popupRect.width) / 2;
                top = (window.innerHeight - popupRect.height) / 2;
                break;
            default:
                left = rect.right + 20;
                top = rect.top;
        }
        
        left = Math.max(20, Math.min(left, window.innerWidth - popupRect.width - 20));
        top = Math.max(20, Math.min(top, window.innerHeight - popupRect.height - 20));
        
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        
        setTimeout(() => {
            target.classList.remove('highlight-element');
            if (step.challenge && step.challenge.secondary_highlight) {
                const secondaryTarget = document.querySelector(step.challenge.secondary_highlight);
                if (secondaryTarget) {
                    secondaryTarget.classList.remove('highlight-element');
                }
            }
        }, 3000);
    } else {
        // If target not found, position popup in center
        console.log('Target not found, positioning popup in center');
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
    }
}

function startChallengeMonitoring(challenge) {
    let challengeCompleted = false;
    
    const checkInterval = setInterval(() => {
        if (!tourActive || !challenge || challengeCompleted) {
            clearInterval(checkInterval);
            return;
        }
        
        switch (challenge.type) {
            case 'material_comparison':
                const materialSelect = document.querySelector(challenge.target_element);
                challengeCompleted = materialSelect.value === challenge.target_value;
                break;
                
            case 'range_target':
            case 'temperature_experiment':
            case 'forward_bias':
            case 'reverse_bias':
            case 'breakdown_exploration':
                const rangeInput = document.querySelector(challenge.target_element);
                const rangeValue = parseFloat(rangeInput.value);
                challengeCompleted = Math.abs(rangeValue - challenge.target_value) <= (challenge.tolerance || 0.1);
                break;
                
            case 'tab_switch':
                challengeCompleted = currentTab === 'biasing';
                break;
        }
        
        if (challengeCompleted) {
            clearInterval(checkInterval);
            onChallengeCompleted(challenge);
        }
    }, 500);
}

function onChallengeCompleted(challenge) {
    const challengeEl = document.querySelector('.tour-challenge');
    if (challengeEl) {
        challengeEl.classList.add('challenge-success');
        challengeEl.innerHTML = `
            <div class="tour-challenge-title">
                <i class="fas fa-check-circle"></i>
                Challenge Completed! 🎉
            </div>
            <div class="tour-challenge-content">
                Excellent work! You've earned ${challenge.reward} points!
            </div>
        `;
    }
    
    tourScore += challenge.reward;
    challengesSolved++;
    
    document.getElementById('tourNextBtn').disabled = false;
    updateTourScore();
}

function showHint() {
    const hintEl = document.getElementById('challengeHint');
    if (hintEl) {
        hintEl.style.display = 'block';
        hintsUsed++;
        updateTourScore();
    }
}

function nextTourStep() {
    if (currentTourStep < tourSteps.length - 1) {
        currentTourStep++;
        showTourStep();
    }
}

function prevTourStep() {
    if (currentTourStep > 0) {
        currentTourStep--;
        showTourStep();
    }
}

function skipTour() {
    const userConfirmed = confirm(
        "⚠️ Are you sure you want to skip the guided walkthrough?\n\n" +
        "You'll miss out on:\n" +
        "• Step-by-step explanations of PN junction physics\n" +
        "• Interactive challenges with immediate feedback\n" +
        "• Achievement badges and progress tracking\n" +
        "• Guided practice with real semiconductor parameters\n" +
        "• Tips and hints for understanding complex concepts\n\n" +
        "Without the walkthrough, the simulation may be difficult to understand on your own.\n\n" +
        "Click 'OK' to skip anyway, or 'Cancel' to continue the walkthrough."
    );
    
    if (!userConfirmed) {
        return;
    }
    
    tourActive = false;
    
    document.querySelectorAll('.highlight-element').forEach(el => {
        el.classList.remove('highlight-element');
        el.style.pointerEvents = '';
        el.style.position = '';
        el.style.zIndex = '';
    });
    
    const overlay = document.getElementById('tourOverlay');
    const popup = document.getElementById('tourPopup');
    const score = document.getElementById('tourScore');
    const achievements = document.getElementById('tourAchievements');
    const spotlight = document.getElementById('tourSpotlight');
    const secondarySpotlight = document.getElementById('tourSpotlightSecondary');
    
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }
    if (popup) {
        popup.classList.remove('active');
        popup.style.display = 'none';
    }
    if (score) {
        score.classList.remove('active');
        score.style.display = 'none';
    }
    if (achievements) {
        achievements.classList.remove('active');
        achievements.style.display = 'none';
    }
    if (spotlight) {
        spotlight.style.display = 'none';
    }
    if (secondarySpotlight) {
        secondarySpotlight.style.display = 'none';
    }
    
    currentTourStep = 0;
    tourScore = 0;
    challengesSolved = 0;
    hintsUsed = 0;
    
    document.body.style.pointerEvents = 'auto';
    
    setTimeout(() => {
        alert(
            "📚 Walkthrough skipped!\n\n" +
            "Helpful tips:\n" +
            "• Click the blue '?' button (bottom right) for help anytime\n" +
            "• Use the 'Challenges' tab to test your knowledge\n" +
            "• Try the preset buttons for quick parameter changes\n" +
            "• Hover over the 'ℹ️' icons for detailed explanations\n\n" +
            "You can restart the walkthrough by clicking the green route button."
        );
    }, 500);
}

function showAchievement(achievement) {
    const achievementEl = document.getElementById('tourAchievements');
    document.getElementById('achievementTitle').textContent = achievement.title;
    document.getElementById('achievementDescription').textContent = achievement.description;
    document.querySelector('.achievement-icon').textContent = achievement.icon;
    achievementEl.classList.add('active');
}

function closeAchievement() {
    const achievementEl = document.getElementById('tourAchievements');
    achievementEl.classList.remove('active');
    
    currentTourStep = 0;
    tourScore = 0;
    challengesSolved = 0;
    hintsUsed = 0;
}

function updateTourScore() {
    document.getElementById('stepsCompleted').textContent = `${currentTourStep + 1}/${tourSteps.length}`;
    document.getElementById('challengesSolved').textContent = `${challengesSolved}/6`;
    document.getElementById('totalScore').textContent = tourScore;
}

function toggleHelp() {
    const helpPanel = document.getElementById('helpPanel');
    helpPanelVisible = !helpPanelVisible;
    
    if (helpPanelVisible) {
        helpPanel.classList.add('active');
        if (tourActive) {
            helpPanel.style.zIndex = '10004';
        }
    } else {
        helpPanel.classList.remove('active');
        helpPanel.style.zIndex = '10002';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    // Initialize simulation components
    initializeEquilibrium();
    
    // Initialize challenges with random questions
    selectRandomQuestions();
    initializeChallengeAnswers();
    generateChallengeContent();
    updateChallengeStats();
    
    // Automatically start the guided tour
    console.log('About to start guided tour...');
    startGuidedTour();
});
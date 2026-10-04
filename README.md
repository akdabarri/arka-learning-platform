# 🐍 A.R.K.A.
### Adaptive Reasoning & Knowledge Architecture

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:1B5E20,100:FBC02D&height=220&section=header&text=A.R.K.A.&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Adaptive%20Reasoning%20%26%20Knowledge%20Architecture&descAlignY=60&descSize=18" />
</p>

<p align="center">
  <strong>Gamified Computational Thinking & Metacognitive Learning Platform for Elementary Students</strong>
</p>

<p align="center">
  A learning environment designed to develop computational thinking through
  <strong>Predict–Observe–Explain (POE)</strong>, adaptive challenges, and
  process-oriented learning analytics.
</p>

<p align="center">

![Domain](https://img.shields.io/badge/Domain-Computational%20Thinking-2E7D32?style=flat-square)
![Framework](https://img.shields.io/badge/Framework-Next.js%2015-000000?style=flat-square&logo=next.js)
![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Database](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat-square&logo=supabase)
![Method](https://img.shields.io/badge/Method-POE-FBC02D?style=flat-square)
![Levels](https://img.shields.io/badge/Levels-25-1565C0?style=flat-square)
![Pathfinding](https://img.shields.io/badge/Pathfinding-A*-1B5E20?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

</p>

---

## 1. Overview

**A.R.K.A. (Adaptive Reasoning & Knowledge Architecture)** is a gamified learning platform designed to introduce and strengthen **Computational Thinking (CT)** and **metacognitive awareness** among elementary school students.

Rather than treating learning as a process of simply obtaining the correct answer, A.R.K.A. focuses on **how students reason, predict, observe outcomes, revise strategies, and explain their decisions**.

The platform combines:

- Computational Thinking
- Predict–Observe–Explain (POE)
- Gamified learning
- Spatial reasoning
- Algorithmic reasoning
- Problem decomposition
- Metacognitive reflection
- Process-oriented learning analytics
- Adaptive learning progression
- A* pathfinding
- Teacher-oriented learning dashboards

The central learning cycle is:

```text
PREDICT
   ↓
OBSERVE
   ↓
EXPLAIN
   ↓
REFLECT
   ↓
REVISE STRATEGY
   ↓
NEXT CHALLENGE
```

This makes A.R.K.A. different from conventional educational games that primarily reward answer accuracy.

---

# 2. Core Learning Philosophy

A.R.K.A. is built around the principle that computational thinking should not be reduced to programming syntax.

For elementary learners, computational thinking can be developed through structured reasoning activities involving:

1. **Decomposition**
2. **Pattern Recognition**
3. **Abstraction**
4. **Algorithmic Thinking**
5. **Spatial Reasoning**
6. **Debugging**
7. **Strategic Planning**
8. **Metacognitive Reflection**

The platform therefore evaluates both:

> **What the student produces**

and

> **How the student arrives at that result.**

---

# 3. Predict–Observe–Explain (POE)

The primary pedagogical framework of A.R.K.A. is **Predict–Observe–Explain (POE)**.

## 3.1 Predict

Before interacting with a challenge, students are asked to predict what will happen.

Example:

> "Which route will allow the character to reach the castle using the fewest moves?"

The student selects or constructs a prediction before execution.

---

## 3.2 Observe

Students execute their strategy and observe the resulting behavior.

The system records relevant learning telemetry such as:

- Attempts
- Block usage
- Movement sequence
- Errors
- Hints
- Completion status
- Prediction accuracy
- Time spent
- Strategy changes

---

## 3.3 Explain

After observing the result, students explain why their prediction was correct or incorrect.

The explanation stage encourages students to identify:

- What they expected
- What actually happened
- Why the result differed
- What strategy caused the outcome
- What they would change

---

## 3.4 Reflect

The final stage asks students to reflect on the strategy they used.

This creates a complete learning cycle:

```text
Prediction
    ↓
Action
    ↓
Observation
    ↓
Explanation
    ↓
Reflection
    ↓
Strategy Revision
```

---

# 4. Metacognitive Dimensions

A.R.K.A. uses several process indicators to construct a learning profile.

The current conceptual profile consists of five dimensions:

| Dimension | Description |
|---|---|
| Dekomposisi | Ability to break a complex problem into manageable actions |
| Penalaran Spasial | Ability to reason about positions, routes, and spatial relationships |
| Efisiensi Kode | Ability to construct concise and efficient solutions |
| Metakognisi POE | Ability to predict, compare, explain, and reflect on outcomes |
| Kemandirian | Ability to solve challenges with decreasing dependence on assistance |

The resulting profile can be represented through a radar visualization.

---

# 5. Learning Analytics Model

A.R.K.A. does not rely solely on final correctness.

The system captures behavioral and cognitive traces throughout the learning process.

### Example telemetry

```text
Student
│
├── Prediction
│   ├── Prediction Choice
│   └── Prediction Accuracy
│
├── Execution
│   ├── Attempts
│   ├── Blocks Used
│   ├── Errors
│   └── Completion
│
├── Assistance
│   ├── Hints Used
│   └── Retry Behavior
│
└── Reflection
    ├── Explanation
    └── Strategy Revision
```

This allows the teacher dashboard to provide a more informative picture of student learning than a simple score.

---

# 6. Mathematical Indicators

The following formulas represent the current operational indicators used in the prototype.

> **Note:** These formulas are operational metrics for the prototype and can be further validated empirically if A.R.K.A. is used as a formal research instrument.

---

## 6.1 Dekomposisi

The current prototype estimates decomposition-related efficiency from the average efficiency ratio across completed challenges.

$$
\text{Dekomposisi}
=
\min\left(
100,
\left(
\frac{1}{N}
\sum_{i=1}^{N}
\text{EfficiencyRatio}_i
\right)
\times 85
\right)
$$

where:

- $N$ = number of completed challenges
- $\text{EfficiencyRatio}_i$ = efficiency ratio for challenge $i$
- $85$ = maximum contribution factor used by the prototype
- $\min(100,\cdot)$ = prevents the score from exceeding 100

---

## 6.2 Penalaran Spasial

Spatial reasoning is operationalized through the student's ability to solve spatial challenges with a limited number of attempts.

$$
\text{Penalaran Spasial}
=
\frac{
\sum_{i=1}^{N}
\mathbf{1}\left(
\text{Attempts}_i \leq 2
\right)
}{
N
}
\times 100\%
$$

where:

- $N$ = number of relevant spatial challenges
- $\text{Attempts}_i$ = number of attempts for challenge $i$
- $\mathbf{1}(\cdot)$ = indicator function

The indicator function is defined as:

$$
\mathbf{1}(A)
=
\begin{cases}
1, & \text{if } A \text{ is true} \\
0, & \text{if } A \text{ is false}
\end{cases}
$$

---

## 6.3 Efisiensi Kode (Parsimony)

Code efficiency evaluates whether a student can solve a challenge using a number of blocks that does not exceed the predefined optimal solution.

$$
\text{Efisiensi Kode}
=
\frac{
\sum_{i=1}^{N}
\mathbf{1}\left(
\text{BlockCount}_i
\leq
\text{OptimalBlocks}_i
\right)
}{
N
}
\times 100\%
$$

where:

- $\text{BlockCount}_i$ = number of blocks used
- $\text{OptimalBlocks}_i$ = predefined optimal number of blocks
- $N$ = number of evaluated challenges

---

## 6.4 Metakognisi POE

The current prototype operationalizes POE metacognition through prediction accuracy.

$$
\text{Metakognisi POE}
=
\frac{
\sum_{i=1}^{N}
\mathbf{1}\left(
\text{PredictionAccuracy}_i
=
\text{true}
\right)
}{
N
}
\times 100\%
$$

where:

- $N$ = number of POE challenges
- $\text{PredictionAccuracy}_i$ = whether prediction $i$ corresponds to the observed outcome

The metric is intended to capture the student's ability to anticipate an outcome before execution.

---

## 6.5 Kemandirian (Persistence)

The current prototype estimates independence from the student's reliance on hints.

$$
\text{Kemandirian}
=
\left(
1
-
\frac{
\sum_{i=1}^{N}
\mathbf{1}\left(
\text{HintsUsed}_i
=
\text{true}
\right)
}{
N
}
\right)
\times 100\%
$$

where:

- $N$ = number of evaluated challenges
- $\text{HintsUsed}_i$ = whether a hint was requested on challenge $i$

A higher score indicates lower reliance on assistance.

---

# 7. Game Structure

A.R.K.A. contains **25 progressive learning levels**.

The levels are organized to gradually increase:

- Cognitive complexity
- Number of decisions
- Spatial complexity
- Algorithmic complexity
- Need for planning
- Need for debugging
- Metacognitive reflection

### Level progression

| Level | Focus |
|---:|---|
| 1 | Basic Sequence |
| 2 | Simple Patterns |
| 3 | Direction & Movement |
| 4 | Sequential Instructions |
| 5 | Pattern Recognition |
| 6 | Simple Decomposition |
| 7 | Conditional Logic |
| 8 | Route Planning |
| 9 | Spatial Relationships |
| 10 | Algorithmic Sequencing |
| 11 | Debugging |
| 12 | Efficient Routes |
| 13 | Nested Decisions |
| 14 | Multi-Step Planning |
| 15 | Constraint-Based Reasoning |
| 16 | Optimization |
| 17 | Complex Pathfinding |
| 18 | Algorithm Revision |
| 19 | Strategic Decomposition |
| 20 | Multi-Constraint Problems |
| 21 | Advanced Route Planning |
| 22 | Debugging & Optimization |
| 23 | Independent Strategy |
| 24 | Integrated Computational Thinking |
| 25 | Master Challenge |

---

# 8. Gameplay Mechanics

A.R.K.A. intentionally avoids excessive gamification elements such as competitive rankings and aggressive reward systems.

The primary goal is to maintain attention while keeping the **learning process** central.

### Core mechanics

- Progressive levels
- Challenge completion
- Limited attempts
- Hints
- Character skins
- Exploration
- Achievement tracking
- Strategy revision
- Learning analytics
- Teacher monitoring

---

# 9. Why There Is No Global Leaderboard

A.R.K.A. intentionally does not prioritize a global leaderboard.

For elementary learners, excessive competition can shift the goal from:

> "How can I reason better?"

into:

> "How can I score higher than someone else?"

Instead, A.R.K.A. emphasizes:

- Personal progress
- Strategy improvement
- Challenge mastery
- Reflection
- Independent problem solving

The design therefore favors **mastery-oriented progression** over ranking-oriented competition.

---

# 10. A* Pathfinding

Several spatial challenges use the **A*** pathfinding algorithm.

A* evaluates candidate paths using:

$$
f(n)=g(n)+h(n)
$$

where:

- $f(n)$ = estimated total cost
- $g(n)$ = cost from the starting node to node $n$
- $h(n)$ = heuristic estimate from node $n$ to the target

For grid-based movement, a Manhattan-distance heuristic can be used:

$$
h(n)
=
|x_n-x_{\text{goal}}|
+
|y_n-y_{\text{goal}}|
$$

This allows the system to calculate efficient routes and compare student-generated solutions with an algorithmically derived reference path.

---

# 11. Character & Skin System

Students can personalize their learning experience through collectible character skins.

The skin system is intentionally designed as a secondary motivational layer rather than the primary learning objective.

Example categories:

```text
Starter
  ↓
Explorer
  ↓
Strategist
  ↓
Problem Solver
  ↓
Master
```

The visual design follows a simple 2D educational game aesthetic with a restrained palette dominated by:

- Green
- Yellow
- Blue

The system avoids excessive visual effects to reduce cognitive and visual overload.

---

# 12. Teacher Dashboard

The teacher dashboard provides an overview of student learning activity.

### Student-level information

- Completion progress
- Level mastery
- Attempts
- Hints
- Prediction accuracy
- Efficiency
- Reflection activity
- Computational-thinking profile

### Class-level information

Teachers can inspect:

```text
Class
│
├── Overall Progress
│
├── Level Completion
│
├── Common Difficulties
│
├── Computational Thinking Profile
│
└── Student-Level Analytics
```

The dashboard is intended to support instructional decision-making rather than simply display scores.

---

# 13. System Architecture

A.R.K.A. uses a modern web architecture.

```text
┌─────────────────────────────────────┐
│             STUDENT UI              │
│       Next.js + TypeScript          │
│       Tailwind CSS + React          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│        GAME & LEARNING ENGINE       │
│                                     │
│  • Level Engine                     │
│  • POE Engine                       │
│  • Pathfinding                      │
│  • Scoring                          │
│  • Telemetry                        │
│  • Progress Tracking                │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│              SUPABASE               │
│                                     │
│  • PostgreSQL                       │
│  • Authentication                   │
│  • Student Data                     │
│  • Learning Telemetry               │
│  • Progress                         │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│          TEACHER DASHBOARD          │
│                                     │
│  • Class Analytics                  │
│  • Student Profiles                 │
│  • Progress Monitoring               │
│  • Learning Indicators              │
└─────────────────────────────────────┘
```

---

# 14. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Deployment | Vercel |
| Pathfinding | A* |
| Learning Model | POE |
| Analytics | Custom Telemetry |
| Version Control | Git / GitHub |

---

# 15. Database Structure

The current prototype uses Supabase/PostgreSQL.

A simplified conceptual structure is:

```text
users
 │
 ├── student_profiles
 │
 ├── progress
 │
 ├── attempts
 │
 ├── predictions
 │
 ├── explanations
 │
 └── achievements
```

Example SQL structure:

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  name text,
  role text default 'student',
  created_at timestamptz default now()
);

create table progress (
  id bigint generated by default as identity primary key,
  user_id uuid references profiles(id),
  level integer not null,
  completed boolean default false,
  attempts integer default 0,
  hints_used integer default 0,
  score numeric default 0,
  created_at timestamptz default now()
);

create table predictions (
  id bigint generated by default as identity primary key,
  user_id uuid references profiles(id),
  level integer not null,
  prediction text,
  correct boolean,
  created_at timestamptz default now()
);

create table reflections (
  id bigint generated by default as identity primary key,
  user_id uuid references profiles(id),
  level integer not null,
  explanation text,
  created_at timestamptz default now()
);
```

---

# 16. Security Considerations

A.R.K.A. handles student-related learning data. Therefore, database security must be treated as a core implementation requirement.

### Important

During early prototyping, permissive Supabase Row Level Security policies may be used for development.

For example:

```sql
using (true)
```

or:

```sql
with check (true)
```

should **not** be considered production-ready policies for student data.

For production deployment, policies should restrict access according to:

- Authenticated user identity
- Student ownership
- Teacher role
- Class membership
- Administrative privileges

Example conceptual policy:

```text
Student
  ↓
Can access own learning data

Teacher
  ↓
Can access assigned class data

Administrator
  ↓
Can manage authorized platform data
```

Never expose sensitive student information through unrestricted public database policies.

---

# 17. Project Structure

A simplified project structure:

```text
arka/
│
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   ├── game/
│   ├── levels/
│   ├── profile/
│   └── teacher/
│
├── components/
│   ├── game/
│   ├── dashboard/
│   ├── ui/
│   └── charts/
│
├── lib/
│   ├── supabase/
│   ├── pathfinding/
│   ├── scoring/
│   ├── analytics/
│   └── poe/
│
├── data/
│   └── levels/
│
├── public/
│   ├── assets/
│   ├── characters/
│   └── levels/
│
├── types/
│   └── index.ts
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

# 18. Installation

## Prerequisites

Make sure the following are installed:

- Node.js 20+
- npm
- Git
- Supabase account

---

## Clone Repository

```bash
git clone https://github.com/your-username/arka.git
cd arka
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create:

```text
.env.local
```

Then add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit `.env.local` to GitHub.

---

## Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 19. Build for Production

Run:

```bash
npm run build
```

Then:

```bash
npm start
```

---

# 20. Deployment

A.R.K.A. is designed to be deployable through Vercel.

Typical deployment workflow:

```text
GitHub Repository
       ↓
     Vercel
       ↓
   Build Next.js
       ↓
Production Deployment
       ↓
    A.R.K.A.
```

Required environment variables must be configured inside the Vercel project settings.

---

# 21. Learning Flow

The complete student experience follows:

```text
LOGIN
  ↓
DASHBOARD
  ↓
SELECT LEVEL
  ↓
PREDICT
  ↓
SOLVE
  ↓
OBSERVE RESULT
  ↓
EXPLAIN
  ↓
REFLECT
  ↓
ANALYTICS UPDATE
  ↓
NEXT CHALLENGE
```

The important distinction is that **completion is not the only endpoint**.

Student interaction generates process data that can be used to understand learning behavior.

---

# 22. Example Challenge

A typical challenge can be represented as:

```text
┌─────────────────────────────┐
│       CHALLENGE              │
│                              │
│  Help the character reach   │
│  the castle.                 │
│                              │
│  PREDICT                     │
│  Which route will work?      │
│                              │
│  [ Route A ] [ Route B ]     │
│                              │
└──────────────┬──────────────┘
               ↓
          EXECUTE
               ↓
┌─────────────────────────────┐
│          OBSERVE             │
│                              │
│  Did the character reach     │
│  the destination?            │
└──────────────┬──────────────┘
               ↓
           EXPLAIN
               ↓
┌─────────────────────────────┐
│ Why did your strategy work? │
│                             │
│ [ Student explanation ]     │
└──────────────┬──────────────┘
               ↓
            REFLECT
               ↓
       NEXT CHALLENGE
```

---

# 23. Design Principles

A.R.K.A. follows several interface and interaction principles.

### 23.1 Learning First

Gamification should support learning rather than dominate it.

### 23.2 Minimal Cognitive Load

Interfaces avoid unnecessary visual decoration and excessive simultaneous stimuli.

### 23.3 Process Visibility

Important learning actions should be observable and measurable.

### 23.4 Progressive Complexity

Challenges increase gradually rather than introducing high complexity immediately.

### 23.5 Reflective Interaction

Students are encouraged to compare their predictions with actual outcomes.

### 23.6 Personal Progress

The system emphasizes individual improvement rather than constant comparison with other students.

---

# 24. Research Potential

A.R.K.A. can serve not only as an educational application but also as a research platform.

Potential research data include:

- Interaction sequences
- Prediction accuracy
- Attempt patterns
- Hint dependency
- Solution efficiency
- Strategy changes
- Reflection responses
- Level progression
- Computational-thinking profiles

This makes the platform suitable for research involving:

- Computational Thinking
- Educational Technology
- Learning Analytics
- Metacognition
- Gamification
- Human–Computer Interaction
- Adaptive Learning
- Digital Learning Environments

However, the operational indicators should be empirically validated before being interpreted as established psychological or educational constructs.

---

# 25. Development Roadmap

## Phase 1 — Core Prototype

- [x] Basic interface
- [x] Authentication
- [x] Level system
- [x] Student progress
- [x] Basic gameplay
- [x] POE interaction

## Phase 2 — Learning Analytics

- [x] Attempt tracking
- [x] Hint tracking
- [x] Prediction tracking
- [x] Efficiency metrics
- [x] Student profile

## Phase 3 — Teacher Dashboard

- [x] Student progress
- [x] Class overview
- [x] Learning profile
- [x] Analytics visualization

## Phase 4 — Advanced Learning Engine

- [ ] More adaptive difficulty
- [ ] Improved metacognitive indicators
- [ ] Advanced learning analytics
- [ ] Strategy classification
- [ ] Empirical validation

## Phase 5 — Research Deployment

- [ ] Classroom pilot
- [ ] Expert validation
- [ ] Usability study
- [ ] Learning outcome analysis
- [ ] Longitudinal learning analytics

---

# 26. Limitations

The current version of A.R.K.A. is a prototype.

Several aspects should therefore be interpreted cautiously.

### Construct validity

The five learning indicators are currently operational metrics rather than fully validated psychometric constructs.

### Metacognition measurement

Prediction accuracy alone does not represent the complete construct of metacognition.

### Persistence measurement

Hint independence is related to autonomy but should not automatically be interpreted as persistence.

### Decomposition measurement

Efficiency-based metrics should be empirically examined before being treated as a direct measurement of decomposition ability.

### Spatial reasoning

Attempt count is an indirect behavioral indicator and should ideally be combined with task-specific spatial reasoning measures.

These limitations provide directions for subsequent empirical validation.

---

# 27. Contribution

A.R.K.A. proposes an integrated learning environment in which:

```text
Gamification
      +
Computational Thinking
      +
POE
      +
Metacognitive Reflection
      +
Learning Analytics
      ↓
Process-Oriented Learning Environment
```

The central contribution is not merely the presentation of educational game content, but the integration of **reasoning, prediction, action, observation, explanation, and reflection** into a single learning workflow.

---

# 28. Author & Credit

## Creator

**M. Akda Barri**

Conceptualization, system architecture, learning design, computational-thinking framework, POE integration, game mechanics, implementation, learning analytics design, and documentation.

<p align="center">
  <strong>A.R.K.A. — Adaptive Reasoning & Knowledge Architecture</strong>
</p>

<p align="center">
  Designed and developed by <strong>M. Akda Barri</strong>
</p>

---

# 29. License

This project is released under the **MIT License**.

You are free to:

- Use
- Copy
- Modify
- Merge
- Publish
- Distribute
- Sublicense

subject to the conditions of the MIT License.

See [`LICENSE`](LICENSE) for the complete license text.

---

# 30. Citation

If you use A.R.K.A. in an academic project, research project, presentation, or educational development, please credit:

```text
Barri, M. A. (2026).
A.R.K.A.: Adaptive Reasoning & Knowledge Architecture.
Gamified Computational Thinking and Metacognitive Learning Platform.
```

---

<p align="center">

### 🐍 Learn. Predict. Observe. Explain. Reflect.

**A.R.K.A.**

*Adaptive Reasoning & Knowledge Architecture*

</p>

<p align="center">
  © 2026 M. Akda Barri. Released under the MIT License.
</p>
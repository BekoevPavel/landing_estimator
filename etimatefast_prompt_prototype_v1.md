# EstimateFast - Figma AI Design Prompt v1.0

## Role & Expertise
You are a product designer with 10+ years of experience specializing in SaaS products for startups. You have deep expertise in designing time tracking and project management software like Trello, Jira, Linear, Asana, and Monday.com. You understand modern design patterns, micro-interactions, and AI-powered user experiences.

## Project Context
Design a multi-agent AI project estimation platform called **EstimateFast**. This is an interactive tool where specialized AI agents (PM, Backend, Mobile, Designer, QA, Analyst) collaborate to estimate software projects through dynamic conversations with users.

---

## Design Requirements - Complete User Flow

### 1. Initial Project Description Screen
**Current State:** User enters project description → questions appear immediately

**New Design:**
- Clean input area with placeholder: "Describe your project in detail..."
- CTA button: "Start AI Analysis"
- After user submits:
  - Transition to AI agents discussion animation
  - Show 5-8 AI agent avatars in a circular or semi-circular layout
  - Each agent has:
    - Professional avatar (distinct colors: PM - blue, Backend - green, Mobile - purple, Designer - pink, QA - orange)
    - Name label below avatar
    - Animated "thinking" indicator
  - Floating message bubbles appear sequentially near agents with key phrases:
    - "Analyzing project scope..."
    - "Reviewing architecture requirements..."
    - "Preparing clarification questions..."
    - "Coordinating with team..."
  - Duration: 3-5 seconds
  - End with prominent button: "Proceed to Questions" with subtle pulse animation

**Design Notes:**
- Use glassmorphism or soft shadows for agent cards
- Smooth fade-in/out transitions for message bubbles
- Subtle particle effects or connecting lines between agents to show collaboration

---

### 2. First Question Round - Agent Card Interface
**Current State:** Single questions one by one

**New Design:**
- Display questions in **agent-specific cards**
- Each card contains:
  - Agent avatar and name in header
  - 4-5 related questions for that agent's domain
  - Progress indicator (e.g., "Question 2 of 5")
  - Answer input fields or multiple choice options
  - "Next Agent" button at bottom

**Card Sequence Example:**
1. **Backend AI Card** → 4 questions about server, database, API architecture
2. **Flutter/Mobile AI Card** → 5 questions about features, platforms, integrations
3. **Designer AI Card** → 4 questions about screens, user flows, brand requirements
4. **PM AI Card** → 5 questions about business logic, MVP scope, timeline

**Interaction Pattern:**
- Swipe gesture to move between agent cards (mobile)
- Click/tap "Next" to advance (desktop)
- Smooth slide transition between cards
- All cards maintain consistent layout and spacing

**Design Notes:**
- Card dimensions: ~400-600px wide, responsive height
- Gradient borders matching agent color
- Soft shadow elevation
- Input validation with inline feedback

---

### 3. AI Agents Discussion Animation (Post First Round)
**New Feature:**

After user completes first round of questions:
- Transition to "AI Team Discussion" screen
- Same agent avatars, now with more dynamic activity:
  - Avatars slightly scale/bounce to indicate "speaking"
  - Message bubbles appear in conversation style:
    - "Backend requires clarification on database scaling"
    - "Designer suggests additional UI complexity questions"
    - "QA recommends testing strategy questions"
    - "Moving to deep-dive round..."
  - Visual connecting lines/arrows between agents
  - Progress bar: "Analyzing your answers..."

**Duration:** 4-6 seconds

**End State:**
- Large notification: "Second Round Ready"
- Button: "Continue to Technical Questions"

---

### 4. Second Question Round - Technical Deep Dive
**Format:** Same agent card interface as Round 1

**Content Difference:**
- More technical and specific questions
- Conditional questions based on Round 1 answers
- Examples:
  - **Backend AI:** "Firebase or custom server? Authentication method?"
  - **Mobile AI:** "Push notifications required? Offline mode?"
  - **QA AI:** "Need automated testing? Performance benchmarks?"

**Card Count:** 3-5 agent cards depending on project complexity

**End Action:**
- Button: "Show Analysis Results" with anticipation animation

---

### 5. Analysis Summary Animation
**New Feature:**

- Transition to calculation screen
- Agent avatars arranged in a row or grid
- Animated elements:
  - Loading spinner or progress bar
  - Floating text phrases:
    - "Calculation complete"
    - "Estimating roles"
    - "Generating summary"
  - Percentage counter: "Processing... 87%"
  - Subtle particle effects

**Duration:** 3-4 seconds

**End State:**
- Text: "AI is preparing your preliminary report"
- Smooth transition to Summary Screen

---

### 6. Preliminary Project Summary
**Current State:** Only results table shown

**New Design - Summary Card:**

**Layout:**
- Hero section with project title (auto-generated or user's input)
- **AI Understanding Section:**
  - Icon: brain/lightbulb
  - Text: 1-2 sentences explaining how AI interpreted the project
  - Example: "We understand this as a food delivery mobile app with real-time tracking, payment integration, and admin dashboard."

- **Key Metrics Grid:**
  - Timeline estimate (weeks/months)
  - Team size and roles needed
  - Technology stack recommended
  - Confidence score (visual gauge: 0-100%)

- **Confidence Indicator:**
  - Large circular progress indicator
  - Example: "87% Confidence" in center
  - Color gradient: red (low) → yellow (medium) → green (high)

**Action Buttons:**
- Primary: "Confirm & Generate Backlog"
- Secondary: "Edit or Refine" (opens editable fields)

**Design Notes:**
- Use cards/sections with spacing for readability
- Icons for each metric category
- Tooltips explaining confidence score

---

### 7. Final Calculation Animation
**New Feature:**

After user confirms summary:
- "AI Team Recalculating" animation
- Agent avatars with pulsing glow effects
- Connecting lines animating between agents
- Text overlays:
  - "Recalculating timelines..."
  - "Generating sprint structure..."
  - "Creating task breakdown..."
- Progress bar: "Building your backlog... 92%"

**Duration:** 3-5 seconds

**End Message:**
- "Complete! Your backlog is ready."
- Smooth fade to Backlog Screen

---

### 8. Backlog Screen - Kanban Board Interface
**Current State:** Text table

**New Design - Jira-style Kanban:**

**Layout:**
- **Top Navigation Bar:**
  - Project name
  - Version tag (e.g., "v1.0")
  - Confidence badge (e.g., "87%")
  - Action buttons:
    - "AI Mode" toggle (enable/disable AI assistance)
    - "Export" (Jira, Linear, Notion, CSV)
    - "Save" with auto-save indicator

**Main Board:**
- **Columns:**
  - Backlog
  - Sprint 1
  - Sprint 2
  - Sprint 3 (if needed)
  - Done (optional for template)

- **Task Cards:**
  - Card title (concise, actionable)
  - Assignee/role tag (e.g., "Backend Dev")
  - Time estimate (e.g., "3 days")
  - Technology tags (e.g., "Flutter", "Firebase", "QA")
  - Priority indicator (High/Medium/Low with color coding)
  - Hover state: expand to show description preview

**Drag & Drop:**
- Cards can be dragged between columns
- Visual feedback on hover and drag
- Drop zones highlighted

**Right Sidebar - AI Assistant Panel:**
- Collapsible panel
- **AI Functions:**
  - �� "Explain this estimate"
  - 🔁 "Recalculate timeline"
  - 📊 "Generate report"
  - ⚠️ "Identify risks"
  - ➕ "Add missing tasks"

- Each function opens a mini-dialog or inline form

**Design Notes:**
- Use Jira/Linear color schemes: blues, grays, accent colors
- Card shadows for depth
- Smooth animations for drag-drop
- Loading states for AI operations

---

### 9. Task Detail Screen
**Current State:** Simple card

**New Design:**

**Layout:**
- **Header:**
  - Task title (editable)
  - Status dropdown (Backlog, In Progress, Done)
  - Assignee avatar/role
  - Close/back button

- **Main Content:**
  - Description field (rich text editor)
  - Time estimate with inline edit
  - Tags/labels section
  - Attachments area (future)

- **Discussion Tab - AI Chat Interface:**
  - Chat thread with user and AI messages
  - **User Input:**
    - Text: "This feature is more complex than expected, please recalculate timeline"
  - **AI Response:**
    - Avatar: Agent (e.g., Backend AI or PM AI)
    - Message: "Understood. I've increased the estimate from 2 days to 4 days. Should I move this task to Sprint 2 for better resource allocation?"
    - Action buttons:
      - "Apply Changes"
      - "Suggest Alternative"
  - Input field at bottom: "Ask AI about this task..."

**Design Notes:**
- Chat bubbles: user (right-aligned, blue), AI (left-aligned, gray)
- Timestamp on each message
- Typing indicator when AI is "thinking"
- Smooth scroll to new messages

---

### 10. AI Recalculation Animation & Backlog Update
**New Feature:**

After user confirms changes in task discussion:
- **Animation Overlay:**
  - Semi-transparent backdrop
  - Text: "AI is recalculating the plan..."
  - Agent avatars in small floating window
  - Progress indicator

- **Visual Update on Kanban:**
  - Cards animate to new positions
  - Example: Task card slides from Sprint 1 column → Sprint 2 column
  - Highlight effect on moved cards (glow or pulse)
  - Notification badge: "Backlog updated"

- **Version Update:**
  - Top navigation updates: "v1.0" → "v2.0"
  - Toast notification: "Plan updated to version 2.0"

**Duration:** 2-3 seconds

**Design Notes:**
- Use smooth easing functions (cubic-bezier)
- Subtle sound effect (optional)
- Ensure users can see what changed

---

## Design System & Style Guide

### Color Palette
- **Primary:** #2563EB (blue - trust, AI)
- **Success:** #10B981 (green - confirmed, high confidence)
- **Warning:** #F59E0B (yellow - medium confidence)
- **Error/Alert:** #EF4444 (red - low confidence, risks)
- **Neutral Grays:** #F9FAFB, #E5E7EB, #6B7280, #1F2937
- **Agent Colors:**
  - PM: #3B82F6 (blue)
  - Backend: #10B981 (green)
  - Mobile: #8B5CF6 (purple)
  - Designer: #EC4899 (pink)
  - QA: #F59E0B (orange)
  - Analyst: #06B6D4 (cyan)

### Typography
- **Headings:** Inter, SF Pro Display, or similar sans-serif (weights: 600-700)
- **Body:** Inter, SF Pro Text (weights: 400-500)
- **Code/Tags:** Fira Code, SF Mono (weight: 400)

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px

### Border Radius
- Small: 4px (tags, badges)
- Medium: 8px (buttons, inputs)
- Large: 12px (cards)
- Extra Large: 16px (modal dialogs)

### Shadows
- **Card:** 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
- **Elevated:** 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)
- **Modal:** 0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)

### Animation Timing
- **Fast:** 150ms (hover states, small transitions)
- **Medium:** 300ms (modal open/close, card flips)
- **Slow:** 500ms (page transitions, complex animations)
- **Easing:** cubic-bezier(0.4, 0.0, 0.2, 1) for most

---

## Component Library to Design

### 1. Agent Avatar Component
- Circle avatar with gradient border
- Status indicator (active/thinking)
- Sizes: small (32px), medium (48px), large (64px)
- Hover state with tooltip showing agent name and role

### 2. Message Bubble Component
- Rounded rectangle
- Tail/pointer toward agent avatar
- Fade-in animation
- Max-width for readability

### 3. Question Card Component
- Container with header (agent info)
- Question text area
- Input fields (text, select, radio, checkbox)
- Navigation buttons
- Progress indicator

### 4. Kanban Task Card Component
- Compact card with title
- Metadata row (role, time, tags)
- Drag handle icon
- Hover state with shadow lift
- Click opens detail view

### 5. AI Chat Message Component
- Avatar on left (AI) or right (user)
- Message bubble with text
- Timestamp
- Action buttons inline (for AI messages)

### 6. Confidence Gauge Component
- Circular progress indicator
- Percentage in center
- Color gradient based on value
- Animate on load

### 7. Loading/Processing Animation Component
- Agent avatars in formation
- Pulsing/glowing effects
- Rotating connecting lines
- Progress text updates

### 8. AI Assistant Panel Component
- Sidebar or floating panel
- List of AI functions with icons
- Expandable sections
- Quick action buttons

---

## Interaction Patterns

### Micro-interactions
1. **Button Hover:** Scale 1.05, shadow increase
2. **Card Drag:** Opacity 0.8, cursor change, drop zone highlight
3. **Input Focus:** Border color change, subtle glow
4. **Toggle Switch:** Smooth slide animation
5. **Badge Pulse:** Subtle scale animation on new notification

### State Management
- **Loading:** Skeleton screens or spinner with agent animation
- **Empty State:** Illustration + helpful text + CTA
- **Error State:** Icon + error message + retry button
- **Success State:** Checkmark animation + confirmation message

### Responsive Behavior
- **Desktop (1280px+):** Full Kanban board, sidebar open by default
- **Tablet (768-1279px):** Horizontal scroll for Kanban columns, collapsible sidebar
- **Mobile (< 768px):** Vertical stack of columns, bottom sheet for AI assistant

---

## Key User Flows to Visualize

### Flow 1: New User Onboarding
1. Landing → Start button
2. Project description input
3. AI agents introduction animation
4. First question round (4-5 agent cards)
5. AI discussion animation
6. Second question round
7. Analysis animation
8. Summary screen
9. Confirm → Final calculation
10. Backlog reveal

### Flow 2: Task Refinement
1. Backlog board view
2. Click task card
3. Task detail opens
4. Navigate to Discussion tab
5. Type question to AI
6. AI responds with suggestion
7. Apply changes
8. Recalculation animation
9. Backlog updates visually
10. Toast notification confirms

### Flow 3: Export & Share
1. Backlog board view
2. Click "Export" button
3. Modal with format options (Jira, Linear, CSV)
4. Select format
5. Loading animation
6. Download or redirect confirmation
7. Success message

---

## Accessibility Considerations

- **Color Contrast:** Ensure WCAG AA compliance (4.5:1 for text)
- **Keyboard Navigation:** All interactive elements focusable, tab order logical
- **Screen Reader:** ARIA labels for icons, avatars, and dynamic content
- **Focus Indicators:** Visible focus rings on all interactive elements
- **Animation:** Respect `prefers-reduced-motion` for users with motion sensitivity

---

## Technical Notes for Development

- Use CSS Grid for Kanban columns
- Flexbox for card layouts
- Framer Motion or similar for animations
- React DnD or similar for drag-drop
- WebSocket for real-time AI chat
- LocalStorage for draft saves
- Optimistic UI updates for better perceived performance

---

## Success Metrics to Design For

1. **Time to First Backlog:** < 30 minutes average
2. **User Engagement:** Questions answered per session
3. **Refinement Iterations:** Average number of AI chat interactions
4. **Confidence Score:** Correlation with user satisfaction
5. **Export Rate:** % of users who export backlog

---

## Additional Design Deliverables

1. **Wireframes:** Low-fidelity for all 10 screens
2. **High-Fidelity Mockups:** Full color designs for desktop & mobile
3. **Prototype:** Interactive Figma prototype with animations
4. **Component Library:** All reusable components documented
5. **Design Tokens:** Colors, typography, spacing exported
6. **Animation Specs:** Duration, easing, triggers documented
7. **Responsive Breakpoints:** Layouts for 375px, 768px, 1280px, 1920px

---

## Inspiration & Best Practices References

### Direct Competitors/Comparisons:
- **Jira:** Card layout, sprint planning, backlog structure
- **Linear:** Clean UI, smooth animations, keyboard shortcuts
- **Monday.com:** Colorful, visual progress indicators
- **Asana:** Timeline view, task dependencies

### AI Interface Patterns:
- **ChatGPT:** Conversational UI, message bubbles
- **Midjourney:** Progress animations, generative feedback
- **Notion AI:** Inline AI assistance, contextual suggestions
- **GitHub Copilot:** Subtle AI presence, confidence indicators

### Animation Inspiration:
- **Stripe:** Smooth transitions, micro-interactions
- **Apple Human Interface:** Elegant, purposeful animations
- **Framer Motion Examples:** Spring physics, gesture handling

---

## Final Notes

This is a **highly interactive, AI-first project estimation tool**. The design should feel:
- **Intelligent:** Users trust the AI agents are "thinking" and collaborating
- **Transparent:** Users understand what's happening at each stage
- **Efficient:** Minimal friction, fast interactions
- **Delightful:** Smooth animations that don't distract
- **Professional:** Suitable for B2B SaaS, startup-friendly aesthetic

Focus on creating a sense of **multi-agent collaboration** through visual and interaction design. The user should feel like they have a team of senior experts working on their project estimate, not just a simple calculator.

---

## Version History
- **v1.0** - Initial prompt (2025-11-11)

---

**Ready to design?** Use this prompt to create the complete EstimateFast platform in Figma, ensuring all screens, components, and animations align with modern SaaS best practices and AI-powered user experiences.

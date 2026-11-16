# The 20 principles in plain English

Two families. Numbers 1 to 12 are the classic animation principles, adapted from character animation to interface motion. Numbers 13 to 20 are UX laws about how people see, decide and act. The first family is about how things move; the second is about where things go and how they respond.

Not all 20 carry equal weight. Number 20 (frequency of use) overrides the first 12: if something is used constantly, it barely moves at all. The dial (1 restrained, 2 polished, 3 expressive) is defined in SKILL.md section 2.

## Part A - Motion principles

### 1. Squash and stretch
Objects compress and stretch to show weight and flexibility.
- In our UI: a pressed button shrinks to 97 percent and springs back. That is all most products need.
- Use when: any tap or click target needs to feel physical.
- Skip when: enterprise apps beyond the press state. Real squash and stretch (a bouncing icon, a jelly toggle) is dial 3 only.

### 2. Anticipation
A small preparation before the main action tells the viewer what is about to happen.
- In our UI: the hover state before a click, the pressed state before a modal opens, a card lifting before it is dragged, a pull-to-refresh indicator stretching before it triggers.
- Use when: an action has a consequence the user should expect.
- Skip when: it would add delay. Anticipation is a hint, never a wait.

### 3. Staging
Direct the eye to one clear idea at a time.
- In our UI: dim the page behind a modal, move only the element that changed, highlight the new row after it is added.
- Use when: always.
- Avoid: two regions animating at once, decorative motion near a form the user is filling in.

### 4. Pose to pose
Plan the key poses first, then fill in the movement between them.
- In our UI: design the start and end state of each component and let CSS interpolate. Every state is a designed pose: default, hover, focus, active, disabled, loading, empty, error.
- Use when: always. This is why we use transitions between states, not hand-timed sequences.
- Avoid: animation that only makes sense if it plays start to finish without interruption.

### 5. Follow through (and overlapping action)
Not everything stops at the same instant; parts settle one after another.
- In our UI: list items stagger in 30ms apart, a drawer's content fades in just after the panel arrives, a toast's icon lands a beat after the toast.
- Use when: several related items appear together for the first time (dial 2 and 3).
- Skip when: the list is re-sorted, filtered or updated; data tables on dial 1; anything beyond 6 items or 200ms total.

### 6. Slow in and slow out
Real objects accelerate and decelerate.
- In our UI: easing tokens. Entering elements decelerate into place (`--ease-out`); leaving elements accelerate away (`--ease-in`); elements moving across the screen do both (`--ease-in-out`).
- Use when: every animation.
- Avoid: `linear` (robotic) except for progress bars and spinners; the browser default `ease`.

### 7. Moving in arcs
Natural movement follows curves, and things come from somewhere.
- In our UI: a menu grows out of the button that opened it (`transform-origin`), a thumbnail expands into its detail view, a sheet rises from the edge it belongs to.
- Use when: any overlay or expansion. Origin matters on every dial.
- Skip when: literal curved motion paths; those are for marketing pages.

### 8. Secondary action
A smaller motion that supports the main one.
- In our UI: the cart badge ticks when an item is added, a chevron rotates as its section opens, a save icon turns into a check.
- Use when: it confirms the result of the main action.
- Avoid: anything that pulls attention away from the main action or loops.

### 9. Timing
The number of frames decides how heavy, light, fast or serious something feels.
- In our UI: the duration tokens. Small or near things take 100 to 150ms; overlays 200 to 300ms; full-page changes up to 400ms. Exits are one step faster than entrances.
- Use when: always. If it feels slow, it is slow; drop one step.
- Avoid: one duration for everything, or values outside the tokens.

### 10. Exaggeration
Push the effect far enough that it reads clearly.
- In our UI: feedback has to be noticeable. A successful save shows a visible confirmation; an invalid field changes colour, shows an icon and a message; on dial 2+ it may shake.
- Use when: the user needs to know something changed.
- Avoid: theatrical effects on routine actions, or feedback so subtle nobody sees it.

### 11. Solid drawing
Forms have volume, weight and a consistent sense of three-dimensional space.
- In our UI: one elevation model. Page, raised surface, overlay, modal. Higher layers have larger, softer shadows and always sit above lower ones. Light comes from one direction.
- Use when: always.
- Avoid: random shadow styles, overlays that slide under other content, mixed depth cues.

### 12. Appeal
The design is pleasing and clear to look at.
- In our UI: consistency. The same action looks and moves the same way everywhere. One primary button style, one modal behaviour, one set of curves.
- Use when: always.
- Avoid: one-off flourishes that make a single screen feel different from the rest.

## Part B - UX laws

### 13. Fitts's law
The time to reach a target depends on how far away it is and how big it is.
- Rule: make important targets large and put them near where the pointer or thumb already is.
- Examples: full-width primary button at the bottom of a phone form; context menu at the cursor; the whole table row clickable, not just the name.
- Avoid: a small "Save" link far from the last field; destructive and primary actions side by side at the same size.

### 14. Bigger hit areas
A practical extension of Fitts: the touchable area can be larger than what is drawn.
- Rule: 44 by 44 CSS px on touch (48 for primary), 24 by 24 minimum on mouse, 8px between targets.
- Examples: a 16px close icon with padding to 44px; a checkbox whose label is also clickable.
- Avoid: icon-only buttons at their visual size; links packed tightly in a footer on mobile.

### 15. Hick's law
Decision time grows with the number and complexity of choices.
- Rule: fewer, clearer choices. One primary action per view; advanced options hidden until asked for; sensible defaults.
- Examples: a 3-step wizard instead of one 20-field form; "Export" opening a short menu instead of five buttons.
- Avoid: toolbars with 15 equal buttons; settings pages with no grouping.
- Note: it applies to decisions, not to scanning a long alphabetical list, where search or sort is the fix.

### 16. Miller's law
Working memory holds only a handful of items at once.
- Rule: chunk information and do not make people remember.
- Examples: card number shown in groups of four; a form split into sections; the order summary visible while paying.
- Avoid: asking for a code shown on a previous screen; long unbroken strings; 12-column tables with no grouping.
- Note: it is not a rule that menus must have seven items.

### 17. Doherty threshold
People stay engaged when the system responds in under about 400ms.
- Rule: acknowledge every input within 100ms; show the result or a progress indicator within 400ms.
- Examples: button shows a spinner immediately; a like toggles optimistically; a skeleton appears for a slow page.
- Avoid: a click that appears to do nothing; a blank screen while data loads.

### 18. Postel's law
Be liberal in what you accept and strict in what you produce.
- Rule: accept any reasonable input format and clean it up; show output in one consistent format.
- Examples: phone numbers with or without spaces and country code; dates typed several ways; trimmed emails; pasted values with stray whitespace.
- Avoid: "invalid format" for something a person can obviously read; blocking paste; wiping the form after an error.

### 19. Jakob's law
People spend most of their time in other products, so they expect yours to work the same way.
- Rule: follow established web and platform conventions unless there is a measured reason not to.
- Examples: logo links home; cart top-right; Esc closes; swipe back on iOS; system date picker on phones.
- Avoid: novel navigation, custom scroll behaviour, renamed standard actions.

### 20. Frequency of use
The more often an interaction happens, the less animation it should have.
- Rule: constant actions are instant; frequent ones take 100 to 150ms; occasional ones 200 to 300ms; rare moments may be expressive.
- Examples: command palette opens instantly; onboarding can take its time; a table row selects with no transition.
- Avoid: an animation that looked good in the demo and is watched 200 times a day by a real user.

## Which principle solves which problem

| Symptom | Reach for |
|---|---|
| "It feels slow" | 20 Frequency, 9 Timing, 17 Doherty |
| "It feels cheap or abrupt" | 6 Slow in and out, 2 Anticipation, 12 Appeal |
| "I did not notice it changed" | 10 Exaggeration, 3 Staging, 8 Secondary action |
| "Where did that come from?" | 7 Arcs, 11 Solid drawing |
| "I keep mis-tapping" | 13 Fitts, 14 Hit areas |
| "I do not know what to do next" | 15 Hick, 3 Staging |
| "The form keeps rejecting me" | 18 Postel |
| "I had to learn how this works" | 19 Jakob |
| "Too much to take in" | 16 Miller, 15 Hick |

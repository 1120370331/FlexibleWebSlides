# Course PPT Template - Usage Guide

A modern, interactive HTML-based presentation template for AI Programming Training courses.

## Quick Start

1. **Copy the template**: Duplicate `course-template.html` to your lesson folder
   ```
   demos/
   ├── course_template/
   │   ├── course-template.html  ← Copy this
   │   ├── course-template.css
   │   └── course-template.js
   └── 3.1/
       └── lesson_3_1_demo.html  ← Renamed copy
   ```

2. **Link assets**: Update paths in your copied file
   ```html
   <link rel="stylesheet" href="../course_template/course-template.css">
   <script src="../course_template/course-template.js"></script>
   ```

3. **Edit content**: Replace placeholder text with your lesson content

---

## Theme System

### Available Themes

| Theme | Description | Best For |
|-------|-------------|----------|
| `indigo` | Deep purple-blue (default) | Professional, corporate |
| `ocean` | Fresh teal-cyan | Tech, modern |
| `forest` | Natural green | Calm, eco-focused |
| `sunset` | Warm orange-amber | Energetic, creative |
| `rose` | Soft pink-magenta | Elegant, accessible |
| `midnight` | Dark mode | Low-light environments |
| `mono` | Grayscale minimal | Print-friendly |

### How to Change Theme

**Method 1: Static (fixed theme)**
```html
<body data-theme="ocean">
```

**Method 2: Dynamic (user switching)**  
The template includes a floating theme switcher button (🎨) in the bottom-right corner. Theme preference is saved to localStorage.

---

## Slide Types & Components

### Layout Classes

| Class | Description |
|-------|-------------|
| `.layout-center` | Single centered column |
| `.layout-split` | Two-column 50/50 split |

### Component Reference

#### Hero Card (Title Slides)
```html
<div class="hero-card">
    <p class="pill">Lesson 3.1</p>
    <h1>Main Title</h1>
    <p class="subheading">Subtitle description</p>
</div>
```

#### Concept Card (Content Blocks)
```html
<div class="concept-card">
    <h3>🎯 Section Title</h3>
    <p>Content paragraph...</p>
    <ul>
        <li>Bullet point</li>
    </ul>
</div>
```

#### Card Grid (Multiple Cards)
```html
<div class="card-grid">
    <div class="concept-card">...</div>
    <div class="concept-card">...</div>
    <div class="concept-card">...</div>
</div>
```

#### Timeline (Steps/Process)
```html
<div class="timeline">
    <div class="timeline-item">
        <div class="timeline-bullet"></div>
        <div class="timeline-content">
            <h4>Step 1</h4>
            <p>Description</p>
        </div>
    </div>
    <!-- more items -->
</div>
```

#### PR Flow (Horizontal Steps)
```html
<div class="pr-flow">
    <div class="pr-step">
        <div class="step-num">1</div>
        <strong>Title</strong>
        <span>Description</span>
    </div>
    <!-- more steps -->
</div>
```

#### Checklist
```html
<div class="pr-checklist">
    <div class="checklist-item">
        <span class="checklist-icon">✅</span>
        <div>
            <strong>Item Title</strong>
            <span>Description</span>
        </div>
    </div>
</div>
```

#### Code Block
```html
<div class="code-block">
<pre>
git add .
git commit -m "message"
git push
</pre>
</div>
```

#### Blockquote
```html
<blockquote class="blockquote">
    Important note or quote here
</blockquote>
```

#### Hint Text
```html
<p class="hint">👉 Additional information or tip</p>
```

---

## Interactive Labs

### Auto-run Lab (HTML/CSS only)
```html
<div class="lab" data-lab="unique-id" data-auto-run="input">
    <div class="lab-tabs">
        <button class="lab-tab is-active" data-lang="html">HTML</button>
        <button class="lab-tab" data-lang="css">CSS</button>
    </div>
    <div class="lab-editors">
        <textarea data-lang="html" class="is-active"><!-- HTML here --></textarea>
        <textarea data-lang="css">/* CSS here */</textarea>
    </div>
    <div class="lab-preview">
        <div class="lab-preview__header"><span>Preview</span></div>
        <iframe title="Preview"></iframe>
    </div>
</div>
```

### Manual-run Lab (with JavaScript)
```html
<div class="lab" data-lab="unique-id">
    <!-- Same structure, but add JS tab and run button -->
    <div class="lab-tabs">
        <button class="lab-tab" data-lang="html">HTML</button>
        <button class="lab-tab" data-lang="css">CSS</button>
        <button class="lab-tab is-active" data-lang="js">JS</button>
    </div>
    <!-- ... editors ... -->
    <div class="lab-preview">
        <div class="lab-preview__header">
            <span>Preview</span>
            <button class="lab-run" data-action="run">▶ Run</button>
        </div>
        <iframe title="Preview"></iframe>
    </div>
</div>
```

---

## Quiz System

### Fill-in-the-blank Quiz (No Answer Leaking)

```html
<div class="task-card" data-quiz="my-quiz">
    <label class="quiz-input-label">
        <span>Question 1:</span>
        <input type="text" data-step="1" placeholder="Hint (not the answer!)">
        <span class="quiz-status"></span>
        <span class="quiz-answer">actual answer</span>
    </label>
    <!-- more questions -->
    <button class="nav-button quiz-check">Submit</button>
    <button class="quiz-answer-toggle">👁 Show/Hide Answers</button>
    <p class="quiz-result"></p>
</div>
```

**Key points:**
- `placeholder` should be a hint, NOT the answer
- `<span class="quiz-answer">` stores the actual answer (hidden by default)
- Wrong answers get `.quiz-wrong` class (red border)
- Correct answers get `.quiz-correct` class (green border)
- Status shows ✓ or ✗ next to each input

### Multiple Choice Quiz

```html
<div class="task-card" data-quiz="mcq-quiz">
    <label>Question text
        <select data-question="1">
            <option value="">Select...</option>
            <option value="A">A. Option 1</option>
            <option value="B">B. Option 2</option>
        </select>
    </label>
    <button class="nav-button quiz-check">Submit</button>
    <p class="quiz-result"></p>
</div>
```

### Checkbox Quiz (Multiple Answers)

```html
<div class="task-card" data-quiz="checkbox-quiz">
    <div class="quiz-options">
        <label class="quiz-option">
            <input type="checkbox" data-option="A">
            <span>Option A</span>
        </label>
        <!-- more options -->
    </div>
    <button class="nav-button quiz-check">Check</button>
    <p class="quiz-result"></p>
</div>
```

---

## Reveal Sections

For "think first, then see answer" interactions:

```html
<div class="reveal-group">
    <button class="reveal-trigger" data-reveal="answer1">
        💡 Click to reveal
    </button>
    <div class="reveal-content" id="answer1">
        <p>Hidden content here...</p>
    </div>
</div>
```

---

## Images

Place images in the same directory as your lesson file:

```html
<img src="./diagram.png" alt="Description" 
     style="max-width:100%; border-radius:8px; margin-top:1rem;">
```

---

## Navigation

Built-in keyboard shortcuts:
- `→` or `Space`: Next slide
- `←`: Previous slide
- `Home`: First slide
- `End`: Last slide

---

## Customization

### Adding Custom Styles

Add at the end of your HTML file:
```html
<style>
    /* Your custom styles */
    .my-custom-class {
        /* ... */
    }
</style>
```

### Adding Custom Scripts

Add before `</body>`:
```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Your custom JavaScript
    });
</script>
```

---

## File Structure Convention

```
demos/
├── course_template/
│   ├── course-template.html   # Master template (copy this)
│   ├── course-template.css    # Shared styles (link to this)
│   ├── course-template.js     # Shared scripts (link to this)
│   └── README.md              # This documentation
├── 3.1/
│   ├── lesson_3_1_demo.html   # Lesson-specific demo
│   └── images...              # Lesson-specific assets
└── 3.2/
    └── ...
```

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## Version

Template v2.0 - Unified styling with theme system and enhanced quiz features.


# GOSPL Design System

## Brand Identity

### Core Message
- **Tagline**: "Own what belongs to you"
- **Mission**: Empowering elderly independence through intelligent gait monitoring
- **Voice**: Bold, confident, health-oriented, data-driven, and personalized

### Brand Values
1. **Trust & Security**
   - Reliable health monitoring
   - Secure data handling
   - Professional expertise

2. **Empowerment**
   - Independent living
   - Informed decision-making
   - Personal control

3. **Innovation**
   - Cutting-edge technology
   - Data-driven insights
   - Continuous improvement

## Typography

### Primary Typefaces

#### 1. VORTICE
- **Usage**: Decorative English headlines
- **Weight**: Bold
- **Character**: Identity-defining, high-impact
- **Example**:
  ```css
  font-family: 'VORTICE', sans-serif;
  font-weight: 700;
  ```

#### 2. Acumin Variable Concept
- **Usage**: Body text, UI elements
- **Weights**: 
  - Wide Bold (600)
  - Medium (500)
- **Example**:
  ```css
  font-family: 'Acumin Variable Concept', sans-serif;
  font-weight: 500;
  ```

### Typography Scale
```css
/* Heading Sizes */
h1 { font-size: 2.5rem; }  /* 40px */
h2 { font-size: 2rem; }    /* 32px */
h3 { font-size: 1.75rem; } /* 28px */
h4 { font-size: 1.5rem; }  /* 24px */

/* Body Text */
body { font-size: 1rem; }  /* 16px */
small { font-size: 0.875rem; } /* 14px */
```

## Color System

### Primary Colors
```css
--primary-blue: #1F9FCO;    /* Sky Blue */
--primary-teal: #4BB9A6;    /* Teal */
--primary-green: #45B269;   /* Green */
```

### Secondary Colors
```css
--accent-magenta: #D83E78;  /* Magenta Pink */
--accent-royal: #234399;    /* Royal Blue */
```

### Functional Colors
```css
--success: var(--primary-green);
--warning: #F5A623;         /* Orange */
--error: var(--accent-magenta);
--info: var(--primary-blue);
```

### Neutral Colors
```css
--neutral-100: #FFFFFF;
--neutral-200: #F5F5F5;
--neutral-300: #E5E5E5;
--neutral-400: #D4D4D4;
--neutral-500: #737373;
--neutral-600: #404040;
--neutral-700: #171717;
```

## Layout System

### Grid System
- 12-column grid
- Responsive breakpoints:
  ```css
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  ```

### Spacing Scale
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 1rem;     /* 16px */
--space-4: 1.5rem;   /* 24px */
--space-5: 2rem;     /* 32px */
--space-6: 3rem;     /* 48px */
```

## Components

### Buttons
```css
.btn {
  padding: var(--space-2) var(--space-4);
  border-radius: 4px;
  font-family: 'Acumin Variable Concept', sans-serif;
  font-weight: 600;
}

.btn-primary {
  background: var(--primary-blue);
  color: var(--neutral-100);
}

.btn-secondary {
  background: var(--neutral-200);
  color: var(--neutral-700);
}
```

### Cards
```css
.card {
  background: var(--neutral-100);
  border-radius: 8px;
  padding: var(--space-4);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Data Visualization
- Use primary and accent colors for charts
- Ensure sufficient contrast for accessibility
- Include clear labels and legends
- Provide alternative text descriptions

## Accessibility Guidelines

### Color Contrast
- Maintain WCAG 2.1 AA compliance
- Minimum contrast ratios:
  - 4.5:1 for normal text
  - 3:1 for large text
  - 3:1 for UI components

### Interactive Elements
- Minimum touch target size: 44x44px
- Clear focus indicators
- Keyboard navigation support
- ARIA labels where needed

### Typography
- Minimum body text size: 16px
- Line height: 1.5
- Adequate spacing between paragraphs
- Clear hierarchy in headings

## Implementation

### CSS Variables
```css
:root {
  /* Colors */
  --primary-blue: #1F9FCO;
  --primary-teal: #4BB9A6;
  --primary-green: #45B269;
  --accent-magenta: #D83E78;
  --accent-royal: #234399;

  /* Typography */
  --font-heading: 'VORTICE', sans-serif;
  --font-body: 'Acumin Variable Concept', sans-serif;

  /* Spacing */
  --space-unit: 1rem;
  /* ... other variables ... */
}
```

### Usage Example
```jsx
// React component example
const DataCard = ({ title, value, trend }) => (
  <div className="card data-card">
    <h3 className="card-title">{title}</h3>
    <div className="card-value">{value}</div>
    <div className={`trend trend-${trend}`}>{trend}</div>
  </div>
);
```

## Best Practices

### 1. Consistency
- Use defined color variables
- Follow typography scale
- Maintain spacing rhythm
- Reuse component patterns

### 2. Accessibility
- Test with screen readers
- Verify color contrast
- Support keyboard navigation
- Provide text alternatives

### 3. Responsive Design
- Mobile-first approach
- Fluid typography
- Flexible layouts
- Touch-friendly interactions

### 4. Performance
- Optimize images
- Minimize CSS
- Use system fonts as fallbacks
- Implement progressive enhancement

## Resources

### Design Assets
- Logo files
- Icon set
- Color palette
- Typography files

### Development Tools
- CSS framework
- Component library
- Design tokens
- Style guide

### Templates
- Page layouts
- Component patterns
- Email templates
- Documentation formats

## Version Control

The design system follows semantic versioning:
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

## Contributing

See our [Contributing Guide](../contributing/how-to-contribute.md) for:
- Design proposals
- Component additions
- Style updates
- Documentation improvements 
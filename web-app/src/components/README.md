# GOSPL Components

This directory contains all the React components used in the GOSPL health monitoring system. The components are organized into the following categories:

## Directory Structure

```
src/components/
├── layout/                  # Layout-specific components
│   ├── AppNavbar.tsx       # Main application navigation
│   ├── LandingNavbar.tsx   # Landing page navigation
│   └── Layout.tsx          # Main layout wrapper
├── features/               # Feature-specific components
│   ├── gait/              # Gait analysis components
│   │   └── GaitChart.tsx  # Gait data visualization
│   └── alerts/            # Alert system components
│       └── AlertList.tsx  # Alert notifications
├── design-system/         # Design system components
│   ├── foundation/       # Core design elements
│   │   ├── Typography.tsx
│   │   └── ColorPalette.tsx
│   └── patterns/         # Reusable UI patterns
│       └── ExampleCard.tsx
├── common/               # Shared utility components
│   └── error-boundary.tsx
└── providers/           # Context providers
    └── theme-provider.tsx
```

## Usage Guidelines

1. **Component Organization**
   - Place new components in the appropriate category folder
   - Create new category folders if needed, following the established pattern
   - Keep components focused and single-responsibility

2. **Imports**
   - Use barrel files (index.ts) for cleaner imports
   - Import from the closest possible source
   - Use absolute imports with @/ prefix

3. **Component Creation**
   - Follow TypeScript best practices
   - Include proper type definitions
   - Add JSDoc comments for complex props
   - Include unit tests for new components

4. **Design System**
   - Use design tokens from the design system
   - Follow the established component patterns
   - Maintain consistency with existing components

## Contributing

When adding new components:

1. Choose the appropriate directory
2. Create component with TypeScript
3. Add necessary tests
4. Update barrel files
5. Document props and usage
6. Follow the established code style

## Testing

All components should have corresponding test files:
- Unit tests with React Testing Library
- Storybook stories for visual testing
- Integration tests where appropriate 
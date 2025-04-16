# GOSPL Component System

## Overview

GOSPL's component system is built on Shadcn/ui, customized to meet our healthcare-specific needs while maintaining our brand identity and accessibility requirements.

## Base Components (Shadcn)

### Installation & Setup

```bash
# Initialize Shadcn
npx shadcn-ui@latest init

# Install core dependencies
npm install @radix-ui/react-* class-variance-authority clsx tailwind-merge
```

### Core Components

1. **Data Display**
```typescript
// Example usage of Shadcn Card for medical data
import { Card } from "@/components/ui/card"

export const VitalStats = ({ data }) => (
  <Card className="p-4 border-l-4 border-primary-blue">
    <CardHeader>
      <CardTitle>Gait Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Vital statistics content */}
    </CardContent>
  </Card>
)
```

2. **Navigation**
```typescript
import { Tabs } from "@/components/ui/tabs"

export const PatientView = () => (
  <Tabs defaultValue="gait">
    <TabsList>
      <TabsTrigger value="gait">Gait Analysis</TabsTrigger>
      <TabsTrigger value="history">History</TabsTrigger>
    </TabsList>
    {/* Tab content */}
  </Tabs>
)
```

## GOSPL Custom Components

### Medical Components

1. **GaitMonitor**
```typescript
import { Card } from "@/components/ui/card"
import { LineChart } from "@/components/ui/charts"

export const GaitMonitor = ({ patientId }) => {
  const { data } = useGaitAnalysis(patientId);

  return (
    <Card className="p-6 medical-dashboard">
      <StatusIndicator status={data.status} />
      <LineChart 
        data={data.measurements}
        annotations={data.anomalies}
      />
    </Card>
  );
};
```

2. **AlertSystem**
```typescript
import { Alert } from "@/components/ui/alert"

export const FallAlert = ({ incident }) => (
  <Alert variant="destructive">
    <AlertTitle>Fall Detected</AlertTitle>
    <AlertDescription>
      Patient fall detected at {incident.time}
    </AlertDescription>
  </Alert>
);
```

## Theme Integration

### Colors
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1F9FCO',
        'primary-teal': '#4BB9A6',
        'primary-green': '#45B269',
        'accent-magenta': '#D83E78',
        'accent-royal': '#234399',
      }
    }
  }
}
```

### Typography
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        vortice: ['VORTICE', 'sans-serif'],
        acumin: ['Acumin Variable Concept', 'sans-serif'],
      }
    }
  }
}
```

## Accessibility Features

### ARIA Integration
```typescript
import { Button } from "@/components/ui/button"

export const EmergencyButton = () => (
  <Button
    variant="destructive"
    aria-label="Emergency assistance"
    role="alert"
  >
    Request Help
  </Button>
);
```

### Focus Management
```typescript
// Global focus styles in globals.css
:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}
```

## Component Guidelines

### 1. Medical Data Display
- Use clear typography for vital statistics
- Include units of measurement
- Provide context for normal ranges
- Show trend indicators

### 2. Alert Components
- Use appropriate color coding
- Include clear action items
- Provide timestamp information
- Support multiple urgency levels

### 3. Interactive Elements
- Minimum touch target size: 44x44px
- Clear hover/focus states
- Keyboard navigation support
- Loading state indicators

## Usage Examples

### Dashboard Layout
```typescript
import { Card } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { GaitMonitor } from "@/components/medical/gait-monitor"

export const PatientDashboard = ({ patientId }) => (
  <div className="dashboard-layout">
    <header className="dashboard-header">
      <PatientInfo id={patientId} />
    </header>
    
    <main className="dashboard-content">
      <GaitMonitor patientId={patientId} />
      <AlertHistory patientId={patientId} />
    </main>
  </div>
);
```

### Form Components
```typescript
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const PatientDataEntry = () => (
  <Form>
    <FormField
      name="weight"
      label="Weight (kg)"
      rules={{ required: true }}
    >
      <Input type="number" min="0" step="0.1" />
    </FormField>
  </Form>
);
```

## Testing & Quality Assurance

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'

describe('GaitMonitor', () => {
  it('displays patient data correctly', () => {
    render(<GaitMonitor patientId="123" />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })
})
```

### Accessibility Testing
```typescript
import { axe } from 'jest-axe'

describe('AccessibilityTests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<PatientDashboard />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Performance Optimization

### Code Splitting
```typescript
const GaitChart = dynamic(() => import('@/components/medical/gait-chart'), {
  loading: () => <ChartSkeleton />
})
```

### Lazy Loading
```typescript
const PatientHistory = lazy(() => import('@/components/medical/patient-history'))
``` 
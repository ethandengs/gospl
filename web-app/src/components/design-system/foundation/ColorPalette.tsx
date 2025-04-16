interface ColorSwatchProps {
  name: string
  value: string
  className?: string
}

function ColorSwatch({ name, value, className }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-16 rounded-lg border ${className}`}
        style={{ backgroundColor: value }}
      />
      <div className="space-y-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Primary Colors</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <ColorSwatch name="Primary Blue" value="rgb(var(--primary-blue))" className="bg-primary-blue" />
          <ColorSwatch name="Primary Teal" value="rgb(var(--primary-teal))" className="bg-primary-teal" />
          <ColorSwatch name="Primary Green" value="rgb(var(--primary-green))" className="bg-primary-green" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Accent Colors</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <ColorSwatch name="Accent Royal" value="rgb(var(--accent-royal))" className="bg-accent-royal" />
          <ColorSwatch name="Accent Magenta" value="rgb(var(--accent-magenta))" className="bg-accent-magenta" />
          <ColorSwatch name="Accent Coral" value="rgb(var(--accent-coral))" className="bg-accent-coral" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Neutral Colors</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <ColorSwatch name="Background" value="rgb(var(--background))" className="bg-background" />
          <ColorSwatch name="Foreground" value="rgb(var(--foreground))" className="bg-foreground" />
          <ColorSwatch name="Muted" value="rgb(var(--muted))" className="bg-muted" />
          <ColorSwatch name="Muted Foreground" value="rgb(var(--muted-foreground))" className="bg-muted-foreground" />
        </div>
      </div>
    </div>
  )
} 
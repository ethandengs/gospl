interface TypeSpecimenProps {
  children: React.ReactNode
  className?: string
  name: string
}

function TypeSpecimen({ name, children, className }: TypeSpecimenProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">{name}</p>
      <div className={className}>{children}</div>
    </div>
  )
}

export function Typography() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Headings</h3>
        <div className="space-y-6">
          <TypeSpecimen name="h1">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              The Quick Brown Fox Jumps Over The Lazy Dog
            </h1>
          </TypeSpecimen>
          <TypeSpecimen name="h2">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              The Quick Brown Fox Jumps Over The Lazy Dog
            </h2>
          </TypeSpecimen>
          <TypeSpecimen name="h3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              The Quick Brown Fox Jumps Over The Lazy Dog
            </h3>
          </TypeSpecimen>
          <TypeSpecimen name="h4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              The Quick Brown Fox Jumps Over The Lazy Dog
            </h4>
          </TypeSpecimen>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Body Text</h3>
        <div className="space-y-6">
          <TypeSpecimen name="p (large)">
            <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
              The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypeSpecimen>
          <TypeSpecimen name="p">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypeSpecimen>
          <TypeSpecimen name="p (small)">
            <p className="text-sm leading-7 [&:not(:first-child)]:mt-6">
              The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypeSpecimen>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Lists</h3>
        <div className="space-y-6">
          <TypeSpecimen name="ul">
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          </TypeSpecimen>
          <TypeSpecimen name="ol">
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ol>
          </TypeSpecimen>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Inline Text Styles</h3>
        <div className="space-y-6">
          <TypeSpecimen name="Lead">
            <p className="text-xl text-muted-foreground">
              Lead text. The quick brown fox jumps over the lazy dog.
            </p>
          </TypeSpecimen>
          <TypeSpecimen name="Large">
            <div className="text-lg font-semibold">
              Large text. The quick brown fox jumps over the lazy dog.
            </div>
          </TypeSpecimen>
          <TypeSpecimen name="Small">
            <small className="text-sm font-medium leading-none">
              Small text. The quick brown fox jumps over the lazy dog.
            </small>
          </TypeSpecimen>
          <TypeSpecimen name="Subtle">
            <p className="text-sm text-muted-foreground">
              Subtle text. The quick brown fox jumps over the lazy dog.
            </p>
          </TypeSpecimen>
        </div>
      </div>
    </div>
  )
} 
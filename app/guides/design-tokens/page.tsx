import { TokenTable } from "@/components/token-table"

export default function DesignTokensPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-2 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Design Tokens</h1>
        <p className="text-sm text-muted-foreground">
          Every Vitality CSS variable, extracted from <code>app/globals.css</code> at build
          time. Colour tokens render live swatches in both light and dark modes.
        </p>
      </header>

      <TokenTable
        category="color"
        title="Colour"
        description="OKLCH colour tokens. Swatches use live var() references — toggle the theme to verify dark-mode behaviour."
      />

      <TokenTable
        category="radius"
        title="Radius scale"
        description="Border-radius scale exposed via @theme inline. Single value, no light/dark variation."
      />

      <TokenTable
        category="font"
        title="Fonts"
        description="Typography stack tokens exposed via @theme inline."
      />
    </article>
  )
}

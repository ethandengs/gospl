import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  darkMode?: boolean
}

export function Logo({ className, darkMode }: LogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 244.43 64.88"
      className={cn(
        "h-8 w-auto transition-transform",
        darkMode ? "fill-white" : "fill-[#3e3a39]",
        className
      )}
      aria-label="GOSPL Logo"
      role="img"
    >
      <title>GOSPL Logo</title>
      <g>
        <path d="M143.54,50.53A18.43,18.43,0,1,1,162,32.1,18.45,18.45,0,0,1,143.54,50.53Zm0-28.69A10.27,10.27,0,1,0,153.81,32.1,10.28,10.28,0,0,0,143.54,21.84Z"/>
        <path d="M123.75,32.1V13.8H115.6v3a18.43,18.43,0,1,0,0,30.62,10.27,10.27,0,0,1-20,2.12L87.76,52a18.42,18.42,0,0,0,36-5.55h-6.87A18.39,18.39,0,0,0,123.75,32.1ZM105.33,42.37A10.27,10.27,0,1,1,115.6,32.1,10.28,10.28,0,0,1,105.33,42.37Z"/>
        <path d="M215.84,13.68a18.36,18.36,0,0,0-10.26,3.13v-3h-8.16V63.51h8.16V47.39a18.42,18.42,0,1,0,10.26-33.71Zm0,28.69A10.27,10.27,0,1,1,226.11,32.1,10.27,10.27,0,0,1,215.84,42.37Z"/>
        <rect x="236.27" width="8.16" height="49.35"/>
        <path d="M179.94,51.74c-9.8,0-16.65-5.68-17.07-12.47h9.61c.35,2.77,3.44,5.22,7.39,5.22s6.41-1.49,6.5-3.22c.31-5.74-22.37-4.09-22.31-16.65,0-6.07,6-11.32,15.69-11.32,9.45,0,14.83,5.15,15.39,12.41h-8.77c-.28-2.84-3-5.09-6.9-5.09-3.67,0-6.49,1.76-6.49,3.87,0,6.66,22.16,3.39,22.16,16.78C195.14,46.47,189.47,51.74,179.94,51.74Z"/>
        <path d="M67.32,48.16l-9.27-5.41A53.6,53.6,0,0,1,76.28,24.11l5.61,9.15A42.85,42.85,0,0,0,67.32,48.16Z"/>
        <path d="M49.86,56.39,39.43,53.86a66.89,66.89,0,0,1,24-36.95L70,25.4A56.12,56.12,0,0,0,49.86,56.39Z"/>
        <path d="M38.39,48.3,28.18,45A80.31,80.31,0,0,1,49.71,11.19L57,19A69.4,69.4,0,0,0,38.39,48.3Z"/>
        <path d="M22,63.91l-10.71-.72A93.15,93.15,0,0,1,23.84,22.52L33.1,28A82.29,82.29,0,0,0,22,63.91Z"/>
        <path d="M10.51,50.23,0,48.07a104.24,104.24,0,0,1,2.9-11A106.35,106.35,0,0,1,9,22.17L18.57,27a95.73,95.73,0,0,0-5.45,13.38A97.26,97.26,0,0,0,10.51,50.23Z"/>
      </g>
    </svg>
  )
} 
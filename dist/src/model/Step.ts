interface Step {
  readonly needsPopListener: boolean
  run(): void
}

export default Step
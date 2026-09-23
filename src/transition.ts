export type MotionScheme = 'standard' | 'expressive'

type Spring = Record<
  'fast' | 'default' | 'slow',
  Record<'spatial' | 'effects', string>
>

function springTokens(spring: Spring) {
  const tokens: Record<string, string> = {}
  for (const [speed, { spatial, effects }] of Object.entries(spring)) {
    tokens[`md-spring-${speed}-spatial`] = spatial
    tokens[`md-spring-${speed}-effects`] = effects
  }
  return tokens
}

const springDurations: Record<MotionScheme, Spring> = {
  standard: {
    fast: { spatial: '350ms', effects: '150ms' },
    default: { spatial: '500ms', effects: '200ms' },
    slow: { spatial: '750ms', effects: '300ms' },
  },
  expressive: {
    fast: { spatial: '350ms', effects: '150ms' },
    default: { spatial: '500ms', effects: '200ms' },
    slow: { spatial: '650ms', effects: '300ms' },
  },
}

const springEasings: Record<MotionScheme, Spring> = {
  standard: {
    fast: {
      spatial: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
      effects: 'cubic-bezier(0.31, 0.94, 0.34, 1)',
    },
    default: {
      spatial: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
      effects: 'cubic-bezier(0.34, 0.8, 0.34, 1)',
    },
    slow: {
      spatial: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
      effects: 'cubic-bezier(0.34, 0.88, 0.34, 1)',
    },
  },
  expressive: {
    fast: {
      spatial: 'cubic-bezier(0.42, 1.67, 0.21, 0.9)',
      effects: 'cubic-bezier(0.31, 0.94, 0.34, 1)',
    },
    default: {
      spatial: 'cubic-bezier(0.38, 1.21, 0.22, 1)',
      effects: 'cubic-bezier(0.34, 0.8, 0.34, 1)',
    },
    slow: {
      spatial: 'cubic-bezier(0.39, 1.29, 0.35, 0.98)',
      effects: 'cubic-bezier(0.34, 0.88, 0.34, 1)',
    },
  },
}

export function makeTransitionDuration(motionScheme: MotionScheme) {
  return {
    'md-short1': '50ms',
    'md-short2': '100ms',
    'md-short3': '150ms',
    'md-short4': '200ms',
    'md-medium1': '250ms',
    'md-medium2': '300ms',
    'md-medium3': '350ms',
    'md-medium4': '400ms',
    'md-long1': '450ms',
    'md-long2': '500ms',
    'md-long3': '550ms',
    'md-long4': '600ms',
    'md-extra-long1': '700ms',
    'md-extra-long2': '800ms',
    'md-extra-long3': '900ms',
    'md-extra-long4': '1000ms',

    ...springTokens(springDurations[motionScheme]),
  }
}

export function makeTransitionTimingFunction(motionScheme: MotionScheme) {
  if (!Object.hasOwn(springEasings, motionScheme)) {
    throw new Error(
      `Unknown motionScheme "${motionScheme}". Expected one of: ${Object.keys(springEasings).join(', ')}.`,
    )
  }
  return {
    'md-linear': 'cubic-bezier(0, 0, 1, 1)',
    'md-standard': 'cubic-bezier(0.2, 0, 0, 1)',
    'md-standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
    'md-standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
    // The spec defines this as a two-segment path, which CSS can't express;
    // the spec says to fall back to standard.
    'md-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
    'md-emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    'md-emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    'md-legacy': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'md-legacy-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
    'md-legacy-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',

    ...springTokens(springEasings[motionScheme]),
  }
}
